'use strict';

function getPersistantStorage() {
    let stored = JSON.parse(sessionStorage.getItem('fllScheduleData'));
    if (stored) {
        app.myTeam = stored.myTeam;
        app.showTables = stored.showTables;
    }
}

function savePersistantStorage() {
    sessionStorage.setItem('fllScheduleData', JSON.stringify({
        myTeam: app.myTeam,
        showTables: app.showTables
    }));
}

var app = new Vue({
    el: '#app',
    data: {
        showScheduleInput: false,
        imported: undefined,
        myTeam: '',
        currentMatch: 0,
        timerRunning: false,
        showTables: false,
        showJudgeStartTime: true,
        showJudgeEndTime: false,
        showMatchStartTime: true,
        showMatchEndTime: false,
        timeFormat: 'HH:mm a'
    },
    watch: {
        myTeam: savePersistantStorage,
        showTables: savePersistantStorage
    },
    computed: {
        teamListAlpha: function() {
            if (this.imported) {
                let teamList = this.imported.teamList;
                console.log(teamList);
                return sort(teamList, (a, b) => {
                    if (a.name < b.team) return -1;
                    if (a.name > b.team) return 1;
                    return 0;
                });
            }
            return null;
        }
    },
    methods: {
        nameFromNumber: function(tno) {
            // console.log(this.imported.teams.teamList);
            for (let x=0; x < this.imported.teams.teamList.length; x++) {
                // console.log('searching for', tno, 'in', team);
                let team = this.imported.teams.teamList[x];
                // console.log(x, team);
                if (team.number === tno) {
                    // console.log('found', team.name);
                    return team.name;
                }
            }
            // console.log('found NULL');
            return null;
        },
        parse: function (data) {
            console.log('Running!');
            // this.imported = data;
            // console.table(data);
            this.imported = {};
            let mode = -1;
            let first = false;
            let i = 0; //start at -1 to prevent skipping schedule version
            while (++i < data.length) {
                if (data[i].length === 0) continue;
                if (data[i].length === 1 && data[i][0] === '') continue;
                if (data[i][0] === 'Block Format') {
                    mode = data[i][1];
                    first = true;
                    continue;
                }
                switch (mode) {
                    case '1': //Team list
                        if (first) {
                            this.imported.teams = {
                                teamList: [],
                                numTeams: parseInt(data[i][1])
                            };
                            i += 1; //Read 1 extra rows
                        }
                        this.imported.teams.teamList.push({
                            number: data[i][0],
                            name: data[i][1],
                            affiliation: data[i][2],
                            pit: data[i][3]
                        });
                        break;

                    case '2': //Ranked match schedule
                        if (first) {
                            let _tableNames = [];
                            for (let x = 1; x < parseInt(data[i + 1][1]) + 1; x++) {
                                _tableNames.push(data[i + 4][x]);
                            }
                            this.imported.rankedMatches = {
                                matchList: [],
                                numMatches: parseInt(data[i + 0][1]),
                                numSumultaneousTables: parseInt(data[i + 3][1]),
                                numTeamsPerTable: parseInt(data[i + 2][1]),
                                numTables: parseInt(data[i + 1][1]),
                                tableNames: _tableNames
                            };
                            i += 5; //Read 5 extra rows
                        }
                        let _rankedTeams = [];
                        for (let x = 3; x < this.imported.rankedMatches.numTables + 3; x++) {
                            _rankedTeams.push(data[i][x]);
                        }

                        this.imported.rankedMatches.matchList.push({
                            number: parseInt(data[i][0]),
                            start: moment(data[i][1], 'HH:mm:ss A'),
                            end: moment(data[i][2], 'HH:mm:ss A'),
                            teams: _rankedTeams
                        });
                        break;

                    case '3': //Judging schedule
                        if (first) {
                            let _roomNames = [];
                            for (let x = 1; x < parseInt(data[i + 2][1]) + 1; x++) {
                                _roomNames.push(data[i + 4][x]);
                            }
                            this.imported.judging = {
                                sessionList: [],
                                numSessions: parseInt(data[i + 1][1]),
                                numRooms: parseInt(data[i + 2][1]),
                                roomNames: _roomNames
                            };
                            i += 5; //Read 5 extra rows
                        }
                        let _judgingTeams = [];
                        for (let x = 3; x < this.imported.judging.numRooms + 3; x++) {
                            _judgingTeams.push(data[i][x]);
                        }

                        this.imported.judging.sessionList.push({
                            number: data[i][0],
                            start: moment(data[i][1], 'HH:mm:ss A'),
                            end: moment(data[i][2], 'HH:mm:ss A'),
                            teams: _judgingTeams
                        });
                        break;

                    case '4': //Practice match schedule
                        if (first) {
                            let _tableNames = [];
                            for (let x = 1; x < parseInt(data[i + 1][1]) + 1; x++) {
                                _tableNames.push(data[i + 4][x]);
                            }
                            this.imported.practiceMatches = {
                                matchList: [],
                                numMatches: parseInt(data[i + 0][1]),
                                numSumultaneousTables: parseInt(data[i + 3][1]),
                                numTeamsPerTable: parseInt(data[i + 2][1]),
                                numTables: parseInt(data[i + 1][1]),
                                tableNames: _tableNames
                            };
                            i += 5; //Read 5 extra rows
                        }
                        let _practiceTeams = [];
                        for (let x = 3; x < this.imported.practiceMatches.numTables + 3; x++) {
                            _practiceTeams.push(data[i][x]);
                        }

                        this.imported.practiceMatches.matchList.push({
                            number: parseInt(data[i][0]),
                            start: moment(data[i][1], 'HH:mm:ss A'),
                            end: moment(data[i][2], 'HH:mm:ss A'),
                            teams: _practiceTeams
                        });
                        break;

                    default:
                        console.log('Something went wrong...');
                        break;
                }
                first = false;
            }
        }
    }
});

// let input = document.getElementById('scheduleInput');
// input.addEventListener('change', scheduleInputChange);
function scheduleInputChange(input) {
    if (input.files && input.files[0]) {
        var myFile = input.files[0];
        var reader = new FileReader();
        reader.addEventListener('load', function(e) {
            parseCSV(e.target.result);
        });
        reader.readAsBinaryString(myFile);
    }
}

function parseCSV (csvdata) {

    //if (this.files && this.files[0]) {

        //var myFile = this.files[0];
        //var reader = new FileReader();

        //reader.addEventListener('load', function (e) {
            // console.log(e.target.result);
            //let csvdata = e.target.result;
            let parsedata = [];
            let newLinebrk = csvdata.split("\n");
            for (let i = 0; i < newLinebrk.length; i++) {

                parsedata.push(newLinebrk[i].split(","))
            }
            app.parse(parsedata);
        //});

        //reader.readAsBinaryString(myFile);
    }


fetch('/scoring_import.csv')
   .then(response => response.text())
   .then(v => parseCSV(v))
   .catch(err => console.log(err));

document.getElementById('app').hidden = false;

getPersistantStorage();

async function updateCurrentRound() {
    const round = await (await fetch('/current_round')).json();
    const running = await (await fetch('/timer_running')).json();
    app.currentMatch = round.round;
    app.timerRunning = running;
}
updateCurrentRound();
setInterval(updateCurrentRound, 5000);
