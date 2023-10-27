const event_id = 2;

const app = new Vue({
    el: '#app',
    data: {
        scores: [],
        teams: [],
        rounds: [],
        conflicts_only: false
    },
    computed: {
        filtered_scores: function() {
            let filtered = [];
            
            for (const score of this.scores) {
                filtered.push(score);
            }

            return filtered;
        }
    },
    watch: {
    },
    methods: {
        findTeam: function (id) {
            for (const team of this.teams) {
                if (team.id === id) {
                    return team;
                }
            }
            console.error('Could not find team:', id);
            return {'id': -1, 'number': -1, 'name': '', 'affiliation': null};
        }
    }
});

//Prevent FOUC
document.body.hidden = false;

document.body.onload = async function () {
    app.teams = await (await fetch(`/teams?event=${event_id}`)).json();
    app.rounds = await (await fetch('/rounds')).json();
    const scores = await (await fetch(`/all_scores?event=${event_id}`)).json();

    for (const score of scores) {
        score.submit_time = new Date(score.submit_time);
        score.update_time = new Date(score.update_time);
    }
    markDuplicates(scores);
    app.scores = scores;
};

function markDuplicates(scores) {
    let r = 0;
    for (let index = 0; index < scores.length; index++) {
        const score = scores[index];
        // // Check if we have found this score as a conflict previously
        // if ('conflicts' in score) {
        //     continue;
        // }
        score.conflicts = [];

        // Search for conflicts
        for (let sub_index = 0; sub_index < scores.length; sub_index++) {
            if (index === sub_index) continue;
            r++;
            const comp_score = scores[sub_index];
            if (score.team === comp_score.team && score.round === comp_score.round) {
                score.conflicts.push({id: comp_score.id, index: sub_index});
            }
        }

        // // Update all the found conflicts to match the first
        // for (const conflict_id of score.conflicts) {
        //     scores[conflict_id.index].conflicts = score.conflicts;
        // }
    }
    console.log(r);
}
