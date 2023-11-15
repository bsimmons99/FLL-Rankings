const app = new Vue({
    el: '#app',
    data: {
        rankings: [],
        lastUpdate: 0
    },
    computed: {
        rounds: function() {
            let max = 0;
            for (const team of this.rankings) {
                max = Math.max(max, team.scores.length);
            }
            return max;
        }
    }
});

let container = document.getElementById('team_list');
let index = 0;

// fetch('https://live.roboroos.org.au/FLL/rankings.json').then(res => {
fetch('/ranks').then(res => {
    return res.json();
}).then(res => {
    app.rankings = res.ranks;
    app.lastUpdate = res.lastUpdate;

    setInterval(() => {
        if (container.children.item((index+1)%container.children.length).getClientRects()[0]['y'] < container.getClientRects()[0]['y']) {
            container.children.item((index)%container.children.length).style.order = index + 1;
            index++;
        }
    
        container.scrollBy(0, 1);
        // container.children.item(0).style.marginTop -= 1;
    }, 75);
});

let fetching = false;
setInterval(async () => {
    if (fetching) {
        console.warn('Previous fetch is taking longer than expected. Skipping this fetch');
        return;
    }
    console.log('Fetching!');
    fetching = true;
    const res = await fetch(`/ranks?lastUpdate=${app.lastUpdate}`);
    if (res.status !== 200) return;
    const data = await res.json();
    app.rankings = data.ranks;
    app.lastUpdate = data.lastUpdate;
    fetching = false;
}, 5000);
