const express = require('express');
const router = express.Router();
// const scorer = require('../2022-scorer');
const debug = require('debug')('fll-rankings:index');
const debug_req = require('debug')('fll-rankings:index-request');

let scorer;
async function init() {
    scorer = await import('../public/javascripts/test.mjs');
}
init();


// const challenges = require('../challenges/2022-superpowered.json');

router.get('/teams', async function (req, res) {
    // res.json(schedule.teams.teamList);
    if (!('event' in req.query)) return res.sendStatus(400);
    res.json(await req.pool.query('SELECT id, number, name, affiliation FROM team WHERE team.event = ? ORDER BY team.number ASC;', [req.query.event]));
});

router.get('/rounds', function (req, res) {
    res.json([
        { name: 'Practice 1', number: 0 },
        { name: 'Ranking 1', number: 1 },
        { name: 'Ranking 2', number: 2 },
        { name: 'Ranking 3', number: 3 }
    ]);
});

router.post('/submit_score', async function (req, res) {
    // console.log(req.body);

    if (!('team' in req.body && 'round' in req.body && 'answers' in req.body) ||
         (req.body.team === null || req.body.round === null || req.body.answers === null)) {
        return res.sendStatus(400);
    }

    await req.pool.query('INSERT INTO score (event, team, round, user, result, score) VALUE (?, ?, ?, ?, ?, ?);', [1, req.body.team, req.body.round, null, req.body.answers, scorer.score(req.body.answers)]);

    res.sendStatus(200);
});

router.get('/ranks', async function (req, res) {
    if (!('event' in req.query)) return res.sendStatus(400);
    const evt = req.query.event;

    const conn = await req.pool.getConnection();

    const lastUpdate = (await conn.query('SELECT MAX(update_time) as time FROM score WHERE event = ?;', [evt]))[0].time.getTime();
    // const lastUpdateTime = lastUpdate[0].time.getTime();
    if ('lastUpdate' in req.query && req.query.lastUpdate == lastUpdate) {
        await conn.release();
        res.sendStatus(304);
        return;
    }

    const teams = await conn.query('SELECT team.id, team.number, team.name, team.affiliation, MAX(score.score) as highscore FROM team LEFT JOIN score ON score.team = team.id WHERE team.event = ? GROUP BY team.id ORDER BY team.number ASC;', [evt]);

    // console.log(teams);
    let ranks = [];
    for (const team of teams) {
        let team_scores = [];
        if (team.highscore !== null) {
            const score_query = await conn.query('SELECT score, round FROM score WHERE score.event = ? AND score.team = ? ORDER BY score.round ASC;', [evt, team.id]);
            for (const score of score_query) {
                team_scores[score.round-1] = score.score;
            }
            // console.log(team_scores);
        }
        ranks.push({
            highest: team.highscore,
            rank: '-',
            scores: team_scores,
            scoresSorted: [...team_scores].sort((a, b)=>b-a),
            team: team
        });
    }

    if (ranks.length > 1) {
        ranks.sort((a, b) => {
            let sa = a.scoresSorted;
            let sb = b.scoresSorted;
            for (let i=0; i < Math.max(sa.length, sb.length); i++) {
                if (i > sa.length) return 1;
                if (i > sb.length) return -1;
                if (sa[i] > sb[i]) return -1;
                if (sa[i] < sb[i]) return 1;
            }
            return 0;
        });

        let rank = 1;
        ranks[0].rank = rank++;
        for (let i = 1; i < ranks.length; i++) {
            // console.log(rank);
            if (!ranks[i].highest) break;
            // console.log(scores_equal(ranks[i-1], ranks[i]));
            if (scores_equal(ranks[i-1], ranks[i])) {
                ranks[i].rank = rank;
            } else {
                rank = i+1;
                ranks[i].rank = rank;
            }
        }
    }

    // console.log('a', lastUpdate);
    res.json({
        'lastUpdate': lastUpdate,
        'ranks': ranks
    });
    await conn.release();
});

function scores_equal(a, b) {
    let sa = a.scoresSorted;
    let sb = b.scoresSorted;
    // console.log(sa, sb);
    for (let i=0; i < Math.max(sa.length, sb.length); i++) {
        if (sa[i] !== sb[i]) return false;
    }
    return true;
}


let timer_queriers = [];
router.get('/timer/query', async function (req, res) {
    // await delay(2000);
    // const commands = ['play', 'end', 'warn', 'abort'];
    timer_queriers.push(res);
    req.on('close', ()=>{
        timer_queriers.splice(timer_queriers.indexOf(res))
    });
    // res.json(commands[Math.floor(Math.random()*commands.length)]);
});

const game_time = 150;
// const game_time = 40;
const warn_time = 30;
let current_time = 0;
let timer_id = null;

let start_time = null;

router.get('/timer/time', function (req, res) {
    res.json(current_time);
});

router.post('/timer/control', async function (req, res) {
    time_action(req.body.cmd);
    res.end();
});

function run_timer() {
    current_time -= 1;
    if (current_time === warn_time) {
        time_action('warn');
    } 
    else if (current_time === 0) {
        time_action('end');
    }
}

function time_action(action) {
    switch (action) {
        case 'prime':
            if (timer_id) return;
            current_time = game_time;
            return;

        case 'start':
            if (timer_id) return;
            time_action('prime');
            timer_id = setInterval(run_timer, 1000);
            break;

        case 'warn':
            if (!timer_id) return;
            break;

        case 'end':
            if (!timer_id) return;
            clearInterval(timer_id);
            timer_id = null;
            break;

        case 'abort':
            if (!timer_id) return;
            clearInterval(timer_id);
            timer_id = null;
            time_action('prime');
            break;

        default:
            return;
    }
    for (const res of timer_queriers) {
        res.json(action);
    }
}

// function delay(ms) {
//     return new Promise((resolve) => {
//         setTimeout(resolve, ms);
//     });
// }

// setInterval(()=>{
//     console.log(timer_queriers.length);
// }, 1000);

module.exports = router;
