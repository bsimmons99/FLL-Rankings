class Timer {
    constructor(enable_latency=true) {
        // this.#openSocket();
        this.#enable_latency = enable_latency;
    }

    onCommand = ()=>{};
    onUpdate = ()=>{};
    onLatency = ()=>{};

    sendCommand(cmd) {
        if (this.#webSocket === null || this.#webSocket.readyState !== 1) {
            console.error('Not Open');
            return;
        }
        this.#webSocket.send(JSON.stringify({
            type: 'command',
            value: cmd
        }));
    }

    toClock(time) {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    }

    initialise() {
        if (this.#webSocket !== null) return;
        this.#openSocket();
    }


    #webSocket = null;
    #enable_latency = true;

    #openSocket() {
        this.#webSocket = new WebSocket(`ws://${location.host}`);
        this.#webSocket.onopen = () => {
            console.log('WEBSOCKET OPEN');
            app.connected = true;
    
            if (this.#enable_latency) {
                this.#webSocket.send(JSON.stringify({type: 'latency-ping', value: Date.now()}));
                this.#webSocket['pingId'] = setInterval(()=>{
                    this.#webSocket.send(JSON.stringify({type: 'latency-ping', value: Date.now()}));
                }, 5000);
            }
        };
    
        this.#webSocket.onmessage = (data) => {
            const message = JSON.parse(data.data);
            switch (message.type) {
                case 'update':
                    this.onUpdate(message.value);
                    break;
                case 'command':
                    this.onCommand(message.value);
                    break;
                case 'latency-ping':
                    this.#webSocket.send(JSON.stringify({type:'latency-pong', value: message.value}));
                    break;
                case 'latency-pong':
                    this.onLatency((Date.now() - message.value) / 2);
                    break;
                default:
                    break;
            }
        }
    
        this.#webSocket.onclose = () => {
            app.connected = false;
            if (this.#enable_latency) {
                app.latency = 0;
                clearInterval(this.#webSocket['pingId']);
            }
            console.log('WEBSOCKET CLOSED');
            setTimeout(()=>{
                console.log('Retrying');
                openSocket();
            }, 2000);
        }
    }
}
