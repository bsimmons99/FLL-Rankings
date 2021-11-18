const express = require('express');
const router = express.Router();
const https = require('https');
const scorer = require('../scorer');
const debug = require('debug')('fll-rankings:index');
const debug_req = require('debug')('fll-rankings:index-request');

const challenges = require('../challenges/2021-cargoconnect.json');

const TOURNAMENT_NAME = process.env.TOURNAMENT_NAME;
const TOURNAMENT_CACHE_TIME = parseInt(process.env.TOURNAMENT_CACHE_TIME);
const SCORES_CACHE_TIME = parseInt(process.env.SCORES_CACHE_TIME);


function get(url) {
    return new Promise((resolve, reject) => {
        const req = https.request(url, function(resb) {
            // debug('statusCode:', resb.statusCode);
            let data = '';
            resb.on('data', function (stream) {
                data += stream;
            });
            resb.on('end', async function () {
                resolve(data);
                // data = JSON.parse(data);
            });
        });
        debug_req(url);
        req.end();
    });
}

function findTeamInCompetes(competes, team_id, tournament_id) {
    for (const competitor of competes) {
        if (competitor.team_id === team_id && competitor.tournament_id === tournament_id) return competitor._id;
    }
    return null;
}

function generateTeamInfo(competes, tournament, tournament_id) {
    let teamInfo = {
        fromCompetes: {},
        fromTeam: {}
    };
    for (const team of tournament) {
        let this_competitor = findTeamInCompetes(competes, team._id, tournament_id);
        teamInfo.fromCompetes[this_competitor] = team;
        teamInfo.fromTeam[team._id] = team;
        teamInfo.fromTeam[team._id].competitor = this_competitor;
    }
    return teamInfo;
}

function findTournament(tournaments, name) {
    for (const tournament of tournaments) {
        if (tournament.name === name) return tournament;
    }
    return null;
}


var blockRequests = true;

var lastTorunamentRefresh = 0;
var tournamentID = null;
var teamInfo = null;

var lastScoresRefresh = 0;
var scoreSheets = null;

async function refreshTeamsCache() {
    let timeNow = Date.now();
    if (lastTorunamentRefresh+TOURNAMENT_CACHE_TIME > timeNow) return;
    lastTorunamentRefresh = timeNow;
    debug('Refreshing Teams Cache');

    const tournaments = JSON.parse(await get('https://firstaustralia.systems/api/tournaments'));
    const competes = JSON.parse(await get('https://firstaustralia.systems/api/competes'));

    tournamentID = findTournament(tournaments, TOURNAMENT_NAME)._id;
    const tournament = JSON.parse(await get(`https://firstaustralia.systems/api/team/tournament/${tournamentID}`));


    // debug(TOURNAMENT_NAME, tournamentID);

    teamInfo = generateTeamInfo(competes, tournament, tournamentID);

    await refreshScoresCache();
    blockRequests = false;
}

async function refreshScoresCache() {
    let timeNow = Date.now();
    if (lastScoresRefresh+SCORES_CACHE_TIME > timeNow) return;
    lastScoresRefresh = timeNow;
    debug('Refreshing Scores Cache');

    scoreSheets = JSON.parse(await get(`https://firstaustralia.systems/api/scoresheets/${tournamentID}`));
}

function calcScores() {
    refreshTeamsCache();
    refreshScoresCache();

    let allScores = {};

    scoreSheets.forEach(sheet => {
        let team = teamInfo.fromCompetes[sheet.compete_id];
        // debug(team);
        if (!(team._id in allScores)) {
            // debug('Adding team', team.team_name, team._id);
            allScores[team._id] = {};
        }
        if (!(sheet.round in allScores[team._id])) {
            // debug('Adding round', sheet.round, 'for', team.team_name, team._id);
            allScores[team._id][sheet.round] = [];
        }
        allScores[team._id][sheet.round].push({
            time: Date.parse(sheet.timestamp),
            score: scorer.score(sheet)
        })
        // debug(team.team_name, sheet.round, scorer.score(sheet));
    });
    // debug(allScores);

    //Use only most recent score, flatten, log highscore
    for (const team in allScores) {
        for (const round in allScores[team]) {
            //Find most recent
            let mostRecent = {time: 0};
            for (const score of allScores[team][round]) {
                if (score.time > mostRecent.time) mostRecent = score;
            }
            allScores[team][round] = mostRecent.score;
        }
        //Flatten
        let scoreList = [];
        for (const round in allScores[team]) {
            scoreList.push(allScores[team][round]);
        }
        allScores[team]['rounds'] = scoreList;
        //Find highest score
        allScores[team]['highest'] = Math.max(...scoreList);
    }
    // debug(allScores);

    let rankings = [];
    for (const team in teamInfo.fromTeam) {
        // debug(teamInfo.fromTeam[team]);
        let teamEntry = {
            rank: '-',
            scores: [],
            team: {
                name: teamInfo.fromTeam[team].team_name,
                number: teamInfo.fromTeam[team].team_number
            }
        }
        // debug(team, team in allScores);
        if (team in allScores) {
            teamEntry.scores = allScores[team].rounds;
            teamEntry.highest = allScores[team].highest;
        }
        rankings.push(teamEntry);
    }
    // debug(rankings);

    //Sort Rankings
    rankings.sort(function(a, b) {
        // if ('highest' in a && 'highest' in b) {
        //     if (a.highest > b.highest) return -1;
        //     else if (a.highest < b.highest) return 1;
        //     else if (a.highest == b.highest) return 0;
        // }
        // else if ('highest' in a) return -1;
        // else if ('highest' in b) return 1;
        // else {
        //     if (a.team.number < b.team.number) return -1;
        //     else if (a.team.number > b.team.number) return 1;
        //     else if (a.team.number == b.team.number) return 0; //Should never hit this case
        // }
        // //Something went very wrong
        // debug('Sorting error', a, b);
        // return 0;

        //New sorting procedure
        let orderedScoresA = [...a.scores].reverse();
        let orderedScoresB = [...b.scores].reverse();
        for (let i=0; i < Math.min(orderedScoresA.length, orderedScoresB.length); i++) {
            if (orderedScoresA > orderedScoresB) return -1;
            else if (orderedScoresA < orderedScoresB) return 1;
        }
        return 0;
    });
    // debug(rankings);

    //Fill in rankings
    lastScore = Infinity;
    lastRank = 0;
    for (const team in rankings) {
        if ('highest' in rankings[team]) {
            if (rankings[team].highest === lastScore) {
                rankings[team].rank = lastRank;
            } else if (rankings[team].highest < lastScore) {
                lastScore = rankings[team].highest;
                // lastRank++;
                rankings[team].rank = ++lastRank;
            }
        }
    }
    // debug(rankings);
    return rankings;
}

refreshTeamsCache();

router.get('/rankings.json', async function (req, res) {
    if (blockRequests) return res.sendStatus(500);
    // if (blockRequests) {
    //     setTimeout(async () => { res.json(await calcScores()); }, 5000);
    // }
    res.json(await calcScores());
});

router.get('/challenges', function (req, res) {
    res.json(challenges);
});

module.exports = router;
