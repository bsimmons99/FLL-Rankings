const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mariadb = require('mariadb');
// const debug = require('debug')('fll-rankings:app');
const fs = require('fs/promises');

const indexRouter = require('./routes/index');

const app = express();

{
    const env_keys = ['DB_HOST', 'DB_USER', 'DB_PASS', 'DB_DB'];
    const env_ok = env_keys.every(i => process.env.hasOwnProperty(i));
    if (!env_ok) {
        console.error('Missing one or more environment variables:', env_keys);
        process.exit(1);
    }
}

const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    connectionLimit: 5,
    database: process.env.DB_DB
});


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'), {'extensions': ['html']}));

app.use(function (req, res, next) {
    req.pool = pool;
    next();
});

app.use('/', indexRouter);

module.exports = app;

//Schedule Parsing and loading
function parseSchedule(data) {
    // console.log('Running!');
    // this.imported = data;
    // console.table(data);
    let imported = {};
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
                    imported.teams = {
                        teamList: [],
                        numTeams: parseInt(data[i][1])
                    };
                    i += 1; //Read 1 extra rows
                }
                imported.teams.teamList.push({
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
                    imported.rankedMatches = {
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
                for (let x = 3; x < imported.rankedMatches.numTables + 3; x++) {
                    _rankedTeams.push(data[i][x]);
                }

                // console.log(data[i]);
                imported.rankedMatches.matchList.push({
                    number: parseInt(data[i][0]),
                    // start: moment(data[i][1], 'HH:mm:ss A'),
                    // end: moment(data[i][2], 'HH:mm:ss A'),
                    start: Date.parse('1970-01-01T'+data[i][1].substr(0, 8)),
                    end: Date.parse('1970-01-01T'+data[i][2].substr(0, 8)),
                    teams: _rankedTeams
                });
                break;

            case '3': //Judging schedule
                if (first) {
                    let _roomNames = [];
                    for (let x = 1; x < parseInt(data[i + 2][1]) + 1; x++) {
                        _roomNames.push(data[i + 4][x]);
                    }
                    imported.judging = {
                        sessionList: [],
                        numSessions: parseInt(data[i + 1][1]),
                        numRooms: parseInt(data[i + 2][1]),
                        roomNames: _roomNames
                    };
                    i += 5; //Read 5 extra rows
                }
                let _judgingTeams = [];
                for (let x = 3; x < imported.judging.numRooms + 3; x++) {
                    _judgingTeams.push(data[i][x]);
                }

                imported.judging.sessionList.push({
                    number: data[i][0],
                    // start: moment(data[i][1], 'HH:mm:ss A'),
                    // end: moment(data[i][2], 'HH:mm:ss A'),
                    start: Date.parse('1970-01-01T'+data[i][1].substr(0, 8)),
                    end: Date.parse('1970-01-01T'+data[i][2].substr(0, 8)),
                    teams: _judgingTeams
                });
                break;

            case '4': //Practice match schedule
                if (first) {
                    let _tableNames = [];
                    for (let x = 1; x < parseInt(data[i + 1][1]) + 1; x++) {
                        _tableNames.push(data[i + 4][x]);
                    }
                    imported.practiceMatches = {
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
                for (let x = 3; x < imported.practiceMatches.numTables + 3; x++) {
                    _practiceTeams.push(data[i][x]);
                }

                imported.practiceMatches.matchList.push({
                    number: parseInt(data[i][0]),
                    // start: moment(data[i][1], 'HH:mm:ss A'),
                    // end: moment(data[i][2], 'HH:mm:ss A'),
                    start: Date.parse('1970-01-01T'+data[i][1].substr(0, 8)),
                    end: Date.parse('1970-01-01T'+data[i][2].substr(0, 8)),
                    teams: _practiceTeams
                });
                break;

            default:
                console.log('Something went wrong...');
                break;
        }
        first = false;
    }
    return imported;
}

function parseCSV(csvdata) {
    let parsedata = [];
    let newLinebrk = csvdata.split("\n");
    for (let i = 0; i < newLinebrk.length; i++) {

        parsedata.push(newLinebrk[i].split(","))
    }
    return parsedata;
}

async function initSchedule() {
    const schedule = parseSchedule(parseCSV(await fs.readFile('/home/bryce/FLL-Rankings/scoring_import.csv', 'utf8')));
    console.log(schedule.teams);

    const evtNum = 3;
    const conn = await pool.getConnection();
    await conn.beginTransaction();
    for (const team of schedule.teams.teamList) {
        await conn.query('INSERT INTO `team` (`event`, `number`, `name`, `affiliation`, `pit`) VALUES (?, ?, ?, ?, ?);', [evtNum, team.number, team.name, team.affiliation.length ? team.affiliation : null, team.pit.length ? team.pit : null]);
    }
    await conn.commit();
    await conn.release();
}
// initSchedule();
