const websockets = require('ws');
const debug = require('debug')('fll-rankings:timer');
const betterIntervals = require('./betterintervals');
const mariadb = require('mariadb');

const this_event = 3;

const game_time = 150;
const warn_time = 30;


let wss = null;
let wsockets = [];

let start_time = 0;
let current_time = game_time;
let current_state = 'primed';
let timer_id = null;

const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    connectionLimit: 2,
    database: process.env.DB_DB
});


async function bootTimer() {
    // This has the odd effect of, if the `started` time is in the future, it boots the timer
    // such that it will end `game_time` after the `started` time. Left in as feature
    const started = await readTimerCache();

    // Nothing running
    if (started === 0) return;

    const diff = Math.floor((Date.now() - started*1000)/1000);
    // debug('diff', diff);

    // Past end of game
    if (diff > game_time) {
        // Clear the cache
        updateTimerCache(0);
        return;
    };

    startTimerAt(game_time - diff, true);
}
bootTimer();

async function readTimerCache() {
    const cached_time = await pool.query('SELECT timer_start_cache FROM event WHERE id = ?;', [this_event]);
    // console.log('tsc', cached_time[0].timer_start_cache)
    return cached_time[0].timer_start_cache;
}

async function updateTimerCache(time) {
    await pool.query('UPDATE event SET timer_start_cache = ? WHERE id = ?;', [Math.floor(time/1000), this_event]);
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
            incrementRound();
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

async function incrementRound() {
    await pool.query('UPDATE event SET current_round = current_round + 1 WHERE event.id = ?;', [this_event]);
}

function clearTimer() {
    updateTimerCache(0);
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