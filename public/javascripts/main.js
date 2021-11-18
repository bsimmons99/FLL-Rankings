var app = new Vue({
    el: '#app',
    data: {
        status: {
            connectionStatus: 0
        },
        challenges: null,
        answers: {},
        teams: [
            {name: 'RoboRoos Rangers'},
            {name: 'RoboRoos West'},
            {name: 'Pultney Pro Programmers'},
            {name: 'Zathura'},
        ],
        rounds: [
            {name: 'Practice 1'},
            {name: 'Ranking 1'},
            {name: 'Ranking 2'},
            {name: 'Ranking 3'}
        ],
        modalData: {
            active: false,
            actionButton: {
                text: '',
                action: function() {}
            },
            content: ''
        }
    },
    computed: {
        score: function() {
            return score_new(this.answers);
        },
        statusInfo: function() {
            switch (this.status.connectionStatus) {
                case 0:
                    return {'colour':'red', 'message':'⦻ Offline'};
                case 1:
                    return {'colour':'orange', 'message':'⦾ Connecting'};
                case 2:
                    return {'colour':'green', 'message':'⦿ Online'};
            }
        }
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
                    app.answers = {'m00a':'Yes','m01a':'No','m02a':'Yes','m02b':'0','m03a':'No','m03b':'No','m04a':'No','m04b':'No','m05a':'No','m06a':'No','m06b':'No','m06c':'No','m07a':'No','m07b':'No','m08a':'No','m08b':'No','m09a':'No','m09b':'No','m08c':'No','m10a':'No','m11a':'No','m12a':'No','m12b':'Completely','m13a':'No','m13b':'No','m14a':'0','m15a':'0','m15b':'0','m15c':'0','m16a':'0','m16b':'0','m16c':'No','m16d':'No','m16e':'0','m17a':'6','gpa':'Accomplished 3'};
                    this.hideModal();
                }
            );
        }
    }
});

async function start() {
    app.challenges = await (await fetch('/challenges')).json();
}
start();

//Prevent FOUC
document.getElementsByTagName('body')[0].hidden = false;

//Manage header sticky for scrolling
const headerHeight = document.getElementById('header').offsetHeight;
window.onscroll = stickyHeader;
function stickyHeader() {
    let header = document.getElementById('header');
    let scoresheet = document.getElementById('scoresheet');
    let sticky = header.offsetTop;
    if (window.scrollY > sticky) {
        header.classList.add('sticky-header');
        scoresheet.style.paddingTop = headerHeight;
    } else {
        header.classList.remove('sticky-header');
        scoresheet.style.paddingTop = null;
    }
    console.log();
}
