const timer = new Timer();

const app = new Vue({
    el: '#app',
    data: {
        time: 0,
        state: 'unknown',
        muted: false,
        color: localStorage.getItem('colour') ?? '#ffffff',
        latency: 0,
        connected: false,
        show_controls: localStorage.getItem('show_controls') ?? 'true' == 'true'
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
            localStorage.setItem('muted', value);
        },
        color: function(value) {
            localStorage.setItem('colour', value);
        },
        show_controls: function(value) {
            localStorage.setItem('show_controls', value);
            console.log(value);
        }
    }
});

const start_audio = new Audio('/sounds/start.mp3');
const end_audio = new Audio('/sounds/end.mp3');
const warn_audio = new Audio('/sounds/end-game.mp3');
const abort_audio = new Audio('/sounds/stop.mp3');

app.muted = localStorage.getItem('muted') == 'true'
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
    if (command === 'abort' && !confirm('Are you sure you want to abort?')) return;
    timer.sendCommand(command);
}

function keypress(evt) {
    if (evt.code !== 'KeyQ' && evt.code !== 'KeyC') return;
    app.show_controls = !app.show_controls;
    localStorage.setItem('show_controls', app.show_controls);
}
