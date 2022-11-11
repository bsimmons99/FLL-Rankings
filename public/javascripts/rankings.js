const app = new Vue({
    el: '#app',
    data: {
        rankings: []
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
fetch('/ranks?event=1').then(res => {
    return res.json()
}).then(res => {
    app.rankings = res;

    setInterval(() => {
        if (container.children.item((index+1)%container.children.length).getClientRects()[0]['y'] < container.getClientRects()[0]['y']) {
            container.children.item((index)%container.children.length).style.order = index + 1;
            index++;
        }
    
        container.scrollBy(0, 1);
    }, 75);
});
