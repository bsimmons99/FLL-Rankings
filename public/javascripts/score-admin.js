const app = new Vue({
    el: '#app',
    data: {
        scores: [],
        teams: [],
        rounds: [],
        options: {
            show_date: false,
            conflicts_only: false
        }
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
        },
        formatTime: function (time) {
            if (this.options.show_date) {
                return time.toLocaleString();
            } else {
                return time.toLocaleTimeString();
            }
        },
        compareDate: function (d1, d2) {
            if (d1 < d2) {
                return -1;
            } else if (d1 > d2) {
                return 1;
            } else {
                return 0;
            }
        },
        edit_score: function (id) {
            // :href="'/scoresheet?edit='+score.id"
            window.location.href = `/scoresheet?edit=${id}`;
        },
        delete_score: async function (id) {
            if (!confirm(`Are you sure you wish to delete ID: ${id}`)) {
                return;
            }
            const result = await fetch('/delete_score', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: id
                })
            });
            await load();
        },
        rescore_event: async function() {
            if (!confirm('Are you sure you wish to rescore the event?')) {
                return;
            }
            const result = await fetch('/rescore_event', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            await load();
        }
    }
});

//Prevent FOUC
document.body.hidden = false;


async function load() {
    app.teams = await (await fetch('/teams')).json();
    app.rounds = await (await fetch('/rounds')).json();
    const scores = await (await fetch('/all_scores')).json();

    for (const score of scores) {
        score.submit_time = new Date(score.submit_time);
        score.update_time = new Date(score.update_time);
    }
    markDuplicates(scores);
    app.scores = scores;
}

document.body.onload = async function () {
    await load();
};

let fetching = false;
setInterval(async () => {
    if (fetching) {
        console.warn('Previous fetch is taking longer than expected. Skipping this fetch');
        return;
    }
    // console.log('Fetching!');
    fetching = true;
    await load();
    fetching = false;
}, 5000);

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
    // console.log(r);
}
