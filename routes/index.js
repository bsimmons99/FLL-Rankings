const express = require('express');
const router = express.Router();
// const scorer = require('../2022-scorer');
const debug = require('debug')('fll-rankings:index');
const debug_req = require('debug')('fll-rankings:index-request');
const timer = require('../timerctl');

let scorer;
(async () => {
    scorer = await import('../public/javascripts/scorer-2023.mjs');
})();

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

let lut = 0;
router.get('/ranks', async function (req, res) {
    if (!('event' in req.query)) return res.sendStatus(400);
    const evt = req.query.event;

    const conn = await req.pool.getConnection();

    const lastUpdate = lut++;
    // const lastUpdate = (await conn.query('SELECT MAX(update_time) as time FROM score WHERE event = ?;', [evt]))[0].time.getTime();
    // const lastUpdateTime = lastUpdate[0].time.getTime();
    if ('lastUpdate' in req.query && req.query.lastUpdate == lastUpdate) {
        res.sendStatus(304);
        await conn.release();
        return;
    }

    // Get list of all teams and their highest score
    const teams = await conn.query('SELECT team.id, team.number, team.name, team.affiliation, MAX(score.score) as highscore FROM team LEFT JOIN (SELECT * FROM score WHERE score.event = ?) as score ON score.team = team.id WHERE team.event = ? GROUP BY team.id ORDER BY team.number ASC;', [evt, evt]);

    let ranks = [];
    for (const team of teams) {
        let team_scores = [];
        // If they have a high score (have a played a match)
        if (team.highscore !== null) {
            // Get all the scores of this team...
            const score_query = await conn.query('SELECT score, round FROM score WHERE score.event = ? AND score.team = ? ORDER BY score.round ASC;', [evt, team.id]);
            // ...And add them to an array
            for (const score of score_query) {
                team_scores[score.round-1] = score.score;
            }
        }
        // Add this team's scores to the list of all rankings
        // Also add a sorted score array for ranking against other teams later
        ranks.push({
            highest: team.highscore,
            rank: '-',
            scores: team_scores,
            scoresSorted: [...team_scores].sort((a, b)=>b-a),
            team: team
        });
    }

    // Now sort the teams by their scores
    if (ranks.length > 1) {
        ranks.sort((a, b) => {
            // The scores ordered by score rather than round
            const sa = a.scoresSorted;
            const sb = b.scoresSorted;
            for (let i=0; i < Math.max(sa.length, sb.length); i++) {
                // If this condition is true, we are about to overrun the array
                // Which means the other team has more matches
                if (i === sa.length) return 1;
                if (i === sb.length) return -1;
                // Who has the highest score for this "round" of comparison
                if (sa[i] > sb[i]) return -1;
                if (sa[i] < sb[i]) return 1;
            }
            // They have the same numer of scores and all scores are equal
            return 0;
        });

        // Assign rank numbers to the teams
        let rank = 1;
        ranks[0].rank = rank;
        for (let i = 1; i < ranks.length; i++) {
            // If this team has no hiscore, this and none of the following teams have played yet
            // Leave all their ranks as the default '-' by breaking out of the loop
            if (!ranks[i].highest) break;
            // If this teams score is the same as the previous team, they share the same rank number
            if (scores_equal(ranks[i-1], ranks[i])) {
                ranks[i].rank = rank;
            } else {
                // If 2 teams are tied, rank number should skip over the tied teams eg ranks: 1,2,2,4,5
                // This ties a teams rank to their place in the array, not the previous rank number
                // We also save the rank number in case the next team are tied with this one
                rank = i+1;
                ranks[i].rank = rank;
            }
        }
    }

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

module.exports = router;
