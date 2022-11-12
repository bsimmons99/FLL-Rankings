const app = new Vue({
    el: '#app',
    data: {
        clock: '00:00'
    }
});

const start_audio = new Audio('/sounds/start.mp3');
const end_audio = new Audio('/sounds/end.mp3');
const warn_audio = new Audio('/sounds/end-game.mp3');
const abort_audio = new Audio('/sounds/stop.mp3');
const music_audio = new Audio('/sounds/undertale.mp3');

// music_audio.play();

async function timer_ctl(cmd) {
    await fetch('/timer/control', {
        method: 'POST',
        body: JSON.stringify({cmd:cmd}),
        headers: {
            'CONTENT-TYPE': 'application/json'
        }
    });
}

let timer_id = null;
async function audio_poll() {
    while (true) {
        try {
            const command = await (await fetch('/timer/query')).json();
            // console.log(command);
            switch (command) {
                case 'start':
                    start_audio.play();
                    if (timer_id) clearInterval(timer_id);
                    timer_id = setInterval(timer_poll, 200);
                    timer_poll();
                    break;

                case 'end':
                    end_audio.play();
                    clearInterval(timer_id);
                    timer_id = null;
                    timer_poll();
                    break;

                case 'abort':
                    abort_audio.play();
                    clearInterval(timer_id);
                    timer_id = null;
                    timer_poll();
                    break;

                case 'warn':
                    warn_audio.play();
                    break;

                default:
                    break;
            }
        } catch (error) {
            await delay(2000);
        }
        await delay(100);
    }
}
audio_poll();

async function timer_poll() {
    app.clock = await (await fetch('/timer/time')).json();
}

function delay(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}