// const debug = require('debug')('fll-rankings:scorer');

function refactorScoreSheet(scoreSheet) {
    let newSheet = {};
    for (const mission of scoreSheet) {
        newSheet[mission.id] = mission.answer;
    }
    return newSheet;
}

function score(scoresheet) {
    return score_new(refactorScoreSheet(scoresheet.answers));
}

function parseIntNaN(s) {
    // let i = parseInt(s);
    // return isNaN(i) ? 0 : i;
    return parseInt(s) || 0;
}

function score_new(answers) {
    let points = 0;

    if (answers['m00a'] === 'Yes') points += 20;

    // if (answers['m01a'] === 'Yes' && answers['m01b'] === 'Yes') points += 20;
    if (answers['m01a'] === 'Yes') points += 20;

    if (answers['m02a'] === 'Yes' && answers['m02b'] === '1-5') points += 20;
    else if (answers['m02a'] === 'Yes' && answers['m02b'] === '6') points += 30;

    if (answers['m03a'] === 'Yes') points += 20;
    if (answers['m03b'] === 'Yes') points += 10;

    if (answers['m04a'] === 'Yes') points += 10;
    if (answers['m04b'] === 'Yes') points += 10;
    if (answers['m04a'] === 'Yes' && answers['m04b'] === 'Yes') points += 10;

    if (answers['m05a'] === 'Yes') points += 20;

    if (answers['m06a'] === 'Yes' && answers['m06c'] === 'No' && answers['m06b'] === 'No') points += 20;
    if (answers['m06a'] === 'Yes' && answers['m06c'] === 'No' && answers['m06b'] === 'Yes') points += 30;

    if (answers['m07a'] === 'Yes') points += 20;
    if (answers['m07b'] === 'Yes') points += 10;

    if (answers['m08a'] === 'Yes') points += 20;
    if (answers['m08b'] === 'Yes') points += 10;
    if (answers['m08c'] === 'Yes') points += 10;

    if (answers['m09a'] === 'Yes') points += 20;
    if (answers['m09b'] === 'Yes') points += 20;

    if (answers['m10a'] === 'Yes') points += 20;

    if (answers['m11a'] === 'Partly') points += 20;
    else if (answers['m11a'] === 'Completely') points += 30;

    if (answers['m12a'] === 'The Mat') points += 20;
    else if (answers['m12a'] === 'Nothing Else') points += 30;
    if (answers['m12b'] === 'Partly') points += 5;
    else if (answers['m12b'] === 'Completely') points += 10;

    if (answers['m13a'] === 'Yes') points += 10;
    if (answers['m13b'] === 'Yes') points += 10;
    if (answers['m13a'] === 'Yes' && answers['m13b'] === 'Yes') points += 10;

    if (answers['m14a'] === '1') points += 10;
    else if (answers['m14a'] === '2') points += 20;
    
    if (answers['m15a'] !== '0' || answers['m15b'] !== '0' || answers['m15b'] !== '0') {
        let truck = Math.min(parseIntNaN(answers['m15a']), 2);
        let train = Math.min(parseIntNaN(answers['m15b']), 2);
        let ship = Math.min(parseIntNaN(answers['m15c']), 2);
        // truck = isNaN(truck) ? 0 : truck;
        // train = isNaN(train) ? 0 : train;
        // ship = isNaN(ship) ? 0 : ship;
        points += truck*10;
        points += train*20;
        points += ship*30;
    }

    if (answers['m16a'] !== '0' || answers['m16b'] !== '0' || answers['m16e'] !== '0') {
        let partly = parseIntNaN(answers['m16a']);
        let completely = parseIntNaN(answers['m16b']);
        let atLeastOne = parseIntNaN(answers['m16e']);
        if (answers['m16c'] === 'Yes') points += 20;
        if (answers['m16d'] === 'Yes') points += 20;
        points += partly*5;
        points += completely*10;
        points += atLeastOne*10;
    }

    if (answers['m17a'] === '0') points += 0;
    else if (answers['m17a'] === '1') points += 10;
    else if (answers['m17a'] === '2') points += 15;
    else if (answers['m17a'] === '3') points += 25;
    else if (answers['m17a'] === '4') points += 35;
    else if (answers['m17a'] === '5') points += 50;
    else if (answers['m17a'] === '6') points += 50;

    return points;
}

//module.exports is available in other files using require(...)
module.exports = {
    score: score
};
