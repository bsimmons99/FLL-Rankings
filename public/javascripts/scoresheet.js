import * as scorer from './scorer-2024.mjs';

// console.log('ss', scorer.challenges);

const urlParams = new URLSearchParams(window.location.search);
const edit_existing_id = urlParams.get('edit');
// console.log('edit', edit_existing_id);

const timer = new Timer(false);

const app = new Vue({
    el: '#app',
    data: {
        modalData: {
            active: false,
            actionButton: {
                text: '',
                action: function () { }
            },
            content: ''
        },
        status: {
            connectionStatus: 2
        },
        challenges: scorer.challenges,
        gameName: scorer.name,
        answers: {},
        defaults: scorer.defaults,
        teams: [],
        rounds: [],
        user: null,
        selectedTeam: null,
        selectedRound: null,
        time: 0,
        public: false
    },
    computed: {
        score: function () {
            // return score_new(this.answers);
            return scorer.score(this.answers);
        },
        statusInfo: function () {
            switch (this.status.connectionStatus) {
                case 0:
                    return { 'colour': 'red', 'message': '⦻ Offline' };
                case 1:
                    return { 'colour': 'orange', 'message': '⦾ Connecting' };
                case 2:
                    return { 'colour': 'green', 'message': '⦿ Online' };
            }
        },
        valid: function () {
            return this.selectedTeam !== null && this.selectedRound !== null && Object.keys(this.answers).length >= Object.keys(scorer.defaults).length;
        },
        clock: function () {
            return timer.toClock(this.time);
        }
    },
    watch: {
        // answers: {
        //     handler: function () {
        //         this.generateBarCode(this.answers);
        //     },
        //     deep: true
        // }
    },
    methods: {
        hideModal: function () {
            this.modalData.active = false;
        },
        showModal: function (message, confirmMessage, confirmAction) {
            this.modalData.content = message;
            this.modalData.actionButton.text = confirmMessage;
            this.modalData.actionButton.action = confirmAction;
            this.modalData.active = true;
        },
        showStatusInfo: function () {
            this.showModal(
                `Connection Information<br>
                <br>
                Connection: ${this.statusInfo.message}<br>
                Authenticated: No`
            );
        },
        clearScoresheet: function () {
            this.showModal(
                `Are you sure you want to clear the scoresheet?<br>
                <br>
                This action cannot be undone`,
                'Clear',
                () => {
                    app.answers = {};
                    app.selectedTeam = null;
                    app.selectedRound = null;
                    this.hideModal();
                }
            );
        },
        defaultScoresheet: function () {
            this.showModal(
                `Are you sure you want to set the scoresheet to defaults?<br>
                <br>
                This action cannot be undone`,
                'Set to Defaults',
                () => {
                    app.answers = scorer.defaults;
                    this.hideModal();
                }
            );
        },
        // generateBarCode: function (answers) {
        //     let data = 0;
        //     data += app.selectedRound * 2 ** 0;
        //     data += app.selectedTeam * 2 ** 4;
        //     data += compressor(answers, 12);
        //     let encoded = data.toString(36).toUpperCase();
        //     // console.log('sss', encoded);
        //     JsBarcode("#barcode", encoded, {
        //         format: "CODE128",
        //         lineColor: "#000000",
        //         background: "#00000000",
        //         width: 4,
        //         height: 40,
        //         displayValue: true
        //     });
        // },
        submitScores: async function () {
            if (!this.valid) {
                return;
            }
            console.log(this.answers);
            const destination = edit_existing_id ? '/change_score' : '/submit_score';
            const result = await fetch(destination, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: edit_existing_id,
                    user: this.user,
                    team: this.selectedTeam,
                    round: this.selectedRound,
                    answers: this.answers
                })
            });
            if (result.status === 204) {
                if (edit_existing_id) {
                    window.location.replace('/score-admin');
                }
                app.answers = {};
                app.selectedTeam = null;
                app.selectedRound = null;
            }
        }
    }
});

//Prevent FOUC
document.body.hidden = false;

document.body.onload = async function () {
    //Manage header sticky for scrolling
    const header = document.getElementById('header');
    setTimeout(()=>{
        document.getElementById('scoresheet').style.marginTop = header.offsetHeight +10+ 'px';
    }, 100);

    app.teams = await (await fetch('/teams')).json();
    app.rounds = await (await fetch('/rounds')).json();
    if (edit_existing_id) {
        const to_edit = await (await fetch(`/single_score?id=${edit_existing_id}`)).json();
        console.log(to_edit);
        app.selectedTeam = to_edit.team;
        app.selectedRound = to_edit.round;
        app.answers = to_edit.answers;
    }

    // app.generateBarCode(app.answers);
}

timer.onUpdate = (update) => {
    app.time = update.time;
}
timer.initialise();

// function compressor(answers, o) {
//     let c = 0;
//     if (answers['m00a'] === 'Yes') c += 2**(0+o);

//     if (answers['m01a'] === 'Yes') c += 2**(1+o);

//     if (answers['m02a'] === '1') c += 2**(2+o);
//     if (answers['m02a'] === '2') c += 2**(3+o);
//     if (answers['m02a'] === '3') c += 2**(2+o) + 2**(3+o);

//     if (answers['m02b' === 'Yes']) c += 2**(4+o);

//     if (answers['m03a'] === '1') c += 2**(5+o);
//     if (answers['m03a'] === '2') c += 2**(6+o);
//     if (answers['m03a'] === '3+') c += 2**(5+o) + 2**(6+o);

//     if (answers['m03b'] === 'Yes') c += 2**(7+o);

//     if (answers['m04a'] === '1') c += 2**(8+o);
//     if (answers['m04a'] === '2') c += 2**(9+o);
//     if (answers['m04a'] === '3') c += 2**(8+o) + 2**(9+o);

//     if (answers['m05a'] === 'Yes') c += 2**(10+o);
    
//     if (answers['m05b'] === 'Yes') c += 2**(11+o);

//     if (answers['m06a'] === 'Yes') c += 2**(12+o);
    
//     if (answers['m06b'] === 'Yes') c += 2**(13+o);

//     if (answers['m07a'] === '1') c += 2**(14+o);
//     if (answers['m07a'] === '2') c += 2**(15+o);
//     if (answers['m07a'] === '3') c += 2**(14+o) + 2**(15+o);

//     if (answers['m08a'] === 'Yes') c += 2**(16+o);
    
//     if (answers['m08b'] === 'Yes') c += 2**(17+o);
    
//     if (answers['m09a'] === 'Yes') c += 2**(18+o);
    
//     if (answers['m09b'] === 'Energy Unit') c += 2**(19+o);
//     if (answers['m09b'] === 'Rechargeable Battery') c += 2**(20+o);

//     if (answers['m10a'] === '1') c += 2**(21+o);
//     if (answers['m10a'] === '2') c += 2**(22+o);
//     if (answers['m10a'] === '3') c += 2**(21+o) + 2**(22+o);
    
//     if (answers['m11a'] === 'Yes') c += 2**(23+o);

//     if (answers['m12a'] === '1') c += 2**(24+o);
//     if (answers['m12a'] === '2') c += 2**(25+o);
//     if (answers['m12a'] === '3') c += 2**(24+o) + 2**(25+o);

//     if (answers['m12b'] === '1') c += 2**(26+o);
//     if (answers['m12b'] === '2') c += 2**(27+o);

//     if (answers['m13a'] === '1') c += 2**(28+o);
//     if (answers['m13a'] === '2') c += 2**(29+o);
//     if (answers['m13a'] === '3+') c += 2**(28+o) + 2**(29+o);

//     if (answers['m14a'] === '1') c += 2**(30+o);
//     if (answers['m14a'] === '2') c += 2**(31+o);
//     if (answers['m14a'] === '3+') c += 2**(30+o) + 2**(31+o);
    
//     if (answers['m14b'] === 'Yes') c += 2**(32+o);

//     if (answers['m15a'] === '1') c += 2**(33+o);
//     if (answers['m15a'] === '2') c += 2**(34+o);
//     if (answers['m15a'] === '3+') c += 2**(33+o) + 2**(34+o);

//     if (answers['m16a'] === '1') c +=                 2**(35+o);
//     if (answers['m16a'] === '2') c +=         2**(36+o)        ;
//     if (answers['m16a'] === '3') c +=         2**(36+o) + 2**(35+o);
//     if (answers['m16a'] === '4') c += 2**(37+o)                ;
//     if (answers['m16a'] === '5') c += 2**(37+o) +         2**(35+o);
//     if (answers['m16a'] === '6') c += 2**(37+o) + 2**(36+o) + 2**(35+o);

//     if (answers['gpa'] === 'Developing 2')   c += 2**(38+o);
//     if (answers['gpa'] === 'Accomplished 3') c += 2**(39+o);
//     if (answers['gpa'] === 'Exceeds 4')      c += 2**(38+o) + 2**(39+o);


//     return c;
// }
