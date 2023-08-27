const debug = require('debug')('fll-rankings:betterIntervals');

let betterIntervals = [];
function setBetterInterval(func, interval, immediate) {
    if (interval <= 0) {
        console.error('Interval must be >0');
        return;
    }
    const now = Date.now();
    if (immediate) func();

    const thisId = betterIntervals.length;
    betterIntervals.push({
        startTime: now,
        lastCall: now,
        interval: interval,
        count: 1,
        func: func,
        timeoutId: setTimeout(runBetterInterval, interval, thisId)
    });
    return thisId;
}

function runBetterInterval(id) {
    const now = Date.now();
    const betterInterval = betterIntervals[id];
    const interval = betterInterval.interval;
    const timeSinceLast = now - betterInterval.lastCall;
    const timeSinceStart = now - betterInterval.startTime;

    // Adjust the interval: Are we early or late?
    const skew = timeSinceStart - (interval * betterInterval.count++);
    const nextInterval = interval - skew;

    // debug(now, timeSinceLast, nextInterval, skew, timeSinceStart);

    // Check to see if we have missed more than 1 interval
    if (nextInterval <= 0) {
        console.error('Timeout took too long!');
    }

    betterInterval.timeoutId = setTimeout(runBetterInterval, nextInterval, id);
    betterInterval.lastCall = now;
    betterInterval.func();
}

function clearBetterInterval(id) {
    clearTimeout(betterIntervals[id].timeoutId);
    betterIntervals.splice(id);
}

module.exports = {
    setBetterInterval: setBetterInterval,
    clearBetterInterval: clearBetterInterval
}
