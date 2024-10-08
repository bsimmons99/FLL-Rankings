const express = require('express');
const router = express.Router();
// const scorer = require('../2022-scorer');
const debug = require('debug')('fll-rankings:index');
const debug_req = require('debug')('fll-rankings:index-request');
const timer = require('../timerctl');
const fs = require('fs/promises');

const default_event = 3;

let scorer;
(async () => {
    scorer = await import('../public/javascripts/scorer-2023.mjs');
})();

// const challenges = require('../challenges/2022-superpowered.json');

router.use(function (req, res, next) {
    // Set CORS Headers
    const origin = req.get('origin');
    if (check_value(origin, ['https://live.roboroos.org.au'])) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    next();
});

router.get('/scoring_import.csv', async function (req, res, next) {
    try {
        const data = await fs.readFile('scoring_import.csv', 'utf8');
        res.send(data);
    } catch (error) {
        res.sendStatus(500);
    }
});

router.get('/timer_running', async function (req, res, next) {
    const cached_start_time = await req.pool.query('SELECT timer_start_cache FROM event WHERE id = ?;', [req.query.event ?? default_event]);
    res.json(cached_start_time[0].timer_start_cache.valueOf() !== 0);
});

router.get('/teams', async function (req, res) {
    // res.json(schedule.teams.teamList);
    // if (!check_valid(req.query, ['event'])) return res.sendStatus(400);
    res.json(await req.pool.query('SELECT id, number, name, affiliation FROM team WHERE team.event = ? ORDER BY team.number ASC;', [req.query.event ?? default_event]));
});

router.get('/rounds', function (req, res) {
    res.json([
        { name: 'Practice 1', number: 0 },
        { name: 'Ranking 1', number: 1 },
        { name: 'Ranking 2', number: 2 },
        { name: 'Ranking 3', number: 3 }//,
        // { name: 'Ranking 4', number: 4 },
        // { name: 'Ranking 5', number: 5 },
        // { name: 'Ranking 6', number: 6 },
        // { name: 'Ranking 7', number: 7 },
        // { name: 'Ranking 8', number: 8 },
        // { name: 'Ranking 9', number: 9 },
        // { name: 'Ranking 10', number: 10 }
    ]);
});

router.get('/current_round', async function (req, res) {
    // if (!check_valid(req.query, ['event'])) return res.sendStatus(400);
    res.json((await req.pool.query('SELECT current_round AS round FROM event WHERE event.id = ?;', [req.query.event ?? default_event]))[0]);
});

router.post('/update_round', async function (req, res) {
    if (!check_valid(req.body, ['round'])) return res.sendStatus(400);
    await req.pool.query('UPDATE event SET current_round = ? WHERE event.id = ?;', [req.body.round, req.body.event ?? default_event]);
    res.sendStatus(204);
});

router.get('/all_scores', async function (req, res) {
    // if (!check_valid(req.query, ['event'])) {
    //     return res.sendStatus(400);
    // }
    res.json(await req.pool.query('SELECT * FROM score WHERE score.event = ?;', [req.query.event ?? default_event]));
});

router.get('/single_score', async function (req, res) {
    if (!check_valid(req.query, ['id'])) {
        return res.sendStatus(400);
    }

    const score = await req.pool.query('SELECT team, user, round, result AS answers FROM score WHERE id = ?;', [req.query.id]);

    if (score.length !== 1) {
        return res.sendStatus(404);
    }

    res.json(score[0]);
});

router.delete('/delete_score', async function (req, res) {
    if (!check_valid(req.body, ['id'])) {
        return res.sendStatus(400);
    }
    await req.pool.query('DELETE FROM score WHERE score.id=?;', [req.body.id]);
    res.sendStatus(204);
});

router.post('/submit_score', async function (req, res) {
    if (!check_valid(req.body, ['team', 'round', 'answers'])) {
        return res.sendStatus(400);
    }

    await req.pool.query('INSERT INTO score (event, team, round, user, result, score) VALUE (?, ?, ?, ?, ?, ?);', [req.body.event ?? default_event, req.body.team, req.body.round, null, req.body.answers, scorer.score(req.body.answers)]);

    res.sendStatus(204);
});

router.post('/change_score', async function (req, res) {
    if (!check_valid(req.body, ['id', 'round', 'team', 'answers'])) {
        return res.sendStatus(400);
    }

    await req.pool.query('UPDATE score SET team=?, round=?, user=?, result=?, score=?, update_time=NOW() WHERE score.id = ?;', [req.body.team, req.body.round, req.body.user, req.body.answers, scorer.score(req.body.answers), req.body.id]);

    res.sendStatus(204);
});

router.post('/rescore_event', async function (req, res) {
    // if (!check_valid(req.body, ['event'])) {
    //     return res.sendStatus(400);
    // }

    const conn = await req.pool.getConnection();
    conn.beginTransaction();

    const rows = await conn.query('SELECT * FROM score WHERE score.event = ?', [req.body.event ?? default_event]);
    
    for (const row of rows) {
        await conn.query('UPDATE score SET score=? WHERE id = ?;', [scorer.score(row.result), row.id]);
    }

    conn.commit();
    conn.release();

    res.sendStatus(204);
});

let lut = 0;
router.get('/ranks', async function (req, res) {
    // if (!('event' in req.query)) return res.sendStatus(400);
    const evt = req.query.event ?? default_event;

    const conn = await req.pool.getConnection();

    const lastUpdate = lut++;
    // const lastUpdate = (await conn.query('SELECT MAX(update_time) as time FROM score WHERE event = ?;', [evt]))[0].time.getTime();
    // const lastUpdateTime = lastUpdate[0].time.getTime();
    if ('lastUpdate' in req.query && req.query.lastUpdate == lastUpdate) {
        res.sendStatus(304);
        await conn.release();
        return;
    }

    // Get event details
    const event_params = (await conn.query('SELECT * FROM event WHERE id = ?;', [evt]))[0];
    if (!event_params) {
        return res.sendStatus(404);
    }
    const round_offset_low = event_params.stage ? event_params.rounds_practice : 0;
    const round_offset_high = event_params.stage ? round_offset_low + event_params.rounds_ranked : event_params.rounds_practice;

    // Get list of all teams and their highest score
    const teams = await conn.query('SELECT team.id, team.number, team.name, team.affiliation, MAX(score.score) as highscore FROM team LEFT JOIN (SELECT * FROM score WHERE score.event = ? AND score.round >= ? AND score.round < ?) as score ON score.team = team.id WHERE team.event = ? GROUP BY team.id ORDER BY team.number ASC;', [evt, round_offset_low, round_offset_high, evt]);

    let ranks = [];
    for (const team of teams) {
        let team_scores = [];
        let team_gpas = [];
        // If they have a high score (have a played a match)
        if (team.highscore !== null) {
            // Get all the scores of this team...
            const score_query = await conn.query('SELECT score, round, result FROM score WHERE score.event = ? AND score.team = ? AND score.round >= ? AND score.round < ? ORDER BY score.round ASC;', [evt, team.id, round_offset_low, round_offset_high]);
            // ...And add them to an array
            for (const score of score_query) {
                team_scores[score.round - round_offset_low] = score.score;
                team_gpas[score.round - round_offset_low] = score.result['gpa'];
            }
        }
        // Add this team's scores to the list of all rankings
        // Also add a sorted score array for ranking against other teams later
        ranks.push({
            highest: team.highscore,
            rank: '-',
            scores: team_scores,
            scoresSorted: [...team_scores].sort((a, b)=>b-a),
            gpas: req.query['gpaxj'] !== undefined ? team_gpas : [],
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

        // Assign rank numbers to the teams if any teams have a rank
        if (ranks[0].highest !== null) {
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

function check_valid(object, keys) {
    for (const key of keys) {
        if (!(key in object) || object[key] === null) {
            return false;
        }
    }
    return true;
}

function check_value(str, opts) {
    for (const opt of opts) {
        if (opt === str) {
            return true;
        }
    }
    return false;
}

module.exports = router;
