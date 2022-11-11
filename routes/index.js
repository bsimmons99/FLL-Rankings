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
    const teams = await conn.query('SELECT team.id, team.number, team.name, team.affiliation, MAX(score.score) as highscore FROM team LEFT JOIN score ON score.team = team.id WHERE team.event = ? GROUP BY team.id ORDER BY highscore DESC, team.number ASC;', [evt]);

    // console.log(teams);
    let ranks = [];
    let rank = 1;
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
            rank: team.highscore ? rank++ : '-',
            scores: team_scores,
            team: team
        });
    }

    res.json(ranks);
    await conn.release();
});

module.exports = router;
