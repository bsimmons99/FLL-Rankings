const timer = new Timer();

const app = new Vue({
    el: '#app',
    data: {
        time: 0,
        state: 'unknown',
        muted: false,
        color: sessionStorage.getItem('colour') ?? '#ffffff',
        latency: 0,
        connected: false,
        show_controls: sessionStorage.getItem('show_controls') == 'true'
    },
    computed: {
        clock: function() {
            return timer.toClock(this.time);
        }
    },
    watch: {
        muted: function(value) {
            start_audio.muted = value;
            end_audio.muted = value;
            warn_audio.muted = value;
            abort_audio.muted = value;
            sessionStorage.setItem('muted', value);
        },
        color: function(value) {
            sessionStorage.setItem('colour', value);
        }
    }
});

const start_audio = new Audio('/sounds/start.mp3');
const end_audio = new Audio('/sounds/end.mp3');
const warn_audio = new Audio('/sounds/end-game.mp3');
const abort_audio = new Audio('/sounds/stop.mp3');

app.muted = sessionStorage.getItem('muted') == 'true'
document.body.hidden = false;

timer.onLatency = (latency) => {
    app.latency = latency;
}
timer.onUpdate = (update) => {
    app.time = update.time;
    app.state = update.state;
}
timer.onCommand = (command) => {
    switch (command) {
        case 'start':
            start_audio.play();
            break;
        case 'endgame':
            warn_audio.play();
            break;
        case 'finished':
            end_audio.play();
            break;
        case 'abort':
            abort_audio.play();
            break;
        default:
            break;
    }
}
timer.initialise();

function timer_ctl(command) {
    timer.sendCommand(command);
}

function keypress(evt) {
    if (evt.code !== 'KeyQ' && evt.code !== 'KeyC') return;
    app.show_controls = !app.show_controls;
    sessionStorage.setItem('show_controls', app.show_controls);
}
