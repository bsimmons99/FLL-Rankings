const websockets = require('ws');
const debug = require('debug')('fll-rankings:timer');
const betterIntervals = require('./betterintervals');
const fs = require('fs');


const save_file = 'timer-save.txt';

const game_time = 150;
const warn_time = 30;


let wss = null;
let wsockets = [];

let start_time = 0;
let current_time = game_time;
let current_state = 'primed';
let timer_id = null;

fs.readFile(save_file, null, (err, data) => {
    if (err) {
        debug('Error Reading File:', err);
        return;
    }

    const started = Number.parseInt(data);

    // Nothing running
    if (started === 0) return;

    const diff = Math.floor((Date.now() - started)/1000);
    debug(diff);

    // Past end of game
    if (diff > game_time) return;

    startTimerAt(game_time - diff, true);
});

function updateTimerCache(time) {
    fs.writeFile(save_file, time.toString(), (err) => {
        if (err) {
            debug('Error Saving File:', err);
        }
    });
}

let wsid = 0;

function initialise(server) {
    wss = new websockets.WebSocketServer({server});    

    wss.on('connection', (ws) => {
        let id = wsid++;
        ws.on('error', (err) => {
            debug('WS Error:', id, err);
        });
        
        debug('Socket Opened', id);
        ws.send(JSON.stringify(generateUpdate()));
        wsockets.push({ws:ws, open:true, lastPong:0});

        // Latency measurements
        ws['latency'] = 0;
        ws.send(JSON.stringify({type: 'latency-ping', value: Date.now()}));
        setInterval(()=>{
            const timeNow = Date.now();
            // Check we have had a pong recently
            if (wsockets[id].lastPong !== 0 && timeNow - wsockets[id].lastPong > 30000) {
                // Close the socket, but warn for now
                debug('Warning! Socket has timed out!', id);
            }
            ws.send(JSON.stringify({type: 'latency-ping', value: timeNow}));
        }, 10000);
    
        ws.on('close', ()=>{
            debug('Socket Closed', id);
            wsockets[id].open = false;
            wsockets[id].ws = null;
        });

        ws.on('message', (data) => {
            const message = JSON.parse(data);

            switch (message.type) {
                case 'command':
                    switch (message.value) {
                        case 'prime':
                            primeTimer();
                            break;
                        case 'start':
                            startTimer();
                            break;
                        case 'abort':
                            abortTimer();
                            break;
                        default:
                            break;
                    }
                    break;
                case 'latency-ping':
                    ws.send(JSON.stringify({type: 'latency-pong', value: message.value}));
                    break;
                case 'latency-pong':
                    const timeNow = Date.now();
                    ws['latency'] = (timeNow - message.value) / 2;
                    wsockets.lastPong = timeNow;
                    break;
                default:
                    break;
            }
        });
    });
}

function primeTimer() {
    // Check timer isn't running
    if (timer_id !== null) return;

    current_time = game_time;
    current_state = 'primed';
    sendUpdate();
}

function startTimer() {
    startTimerAt(game_time);
}

function startTimerAt(time_left, restarted) {
    // Check timer isn't running
    if (timer_id !== null) return;

    start_time = Date.now();
    current_time = time_left;

    timer_id = betterIntervals.setBetterInterval(()=>{
        current_time--;
        if (current_time === warn_time) {
            current_state = 'endgame';
            sendCommand('endgame');
        }
        if (current_time === 0) {
            current_state = 'finished';
            clearTimer();
            sendCommand('finished');
            updateTimerCache(0);
        }
        sendUpdate();
    }, 1000);

    current_state = 'running';
    sendCommand('start');
    sendUpdate();
    if (!restarted) {
        updateTimerCache(start_time);
    }
}

function clearTimer() {
    betterIntervals.clearBetterInterval(timer_id);
    timer_id = null;
}

function abortTimer() {
    // Check timer is running
    if (timer_id === null) return;

    current_time = 0;
    current_state = 'aborted'
    clearTimer();
    sendCommand('abort');
    sendUpdate();
}

function sendCommand(command) {
    const cmd_string = JSON.stringify({
        type: 'command',
        value: command
    });
    for (const socket of wsockets) {
        if (!socket.open) continue;
        socket.ws.send(cmd_string);
    }
}

function generateUpdate() {
    return {
        type: 'update',
        value: {
            time: current_time,
            state: current_state
        }
    }
}

function sendUpdate() {
    const update = generateUpdate();
    // debug(update);
    const update_string = JSON.stringify(update);
    for (const socket of wsockets) {
        if (!socket.open) continue;
        socket.ws.send(update_string);
    }
}

module.exports = {
    initialise: initialise,
    primeTimer: primeTimer,
    abortTimer: abortTimer,
    startTimer: startTimer
};