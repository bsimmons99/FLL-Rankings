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

function score_new(answers) {
    let points = 0;

    if (answers['m00a'] === 'Yes') points += 20;

    if (answers['m01a'] === 'Yes') points += 10;

         if (answers['m02a'] === '0') points += 0;
    else if (answers['m02a'] === '1') points += 5;
    else if (answers['m02a'] === '2') points += 10;
    else if (answers['m02a'] === '3') points += 15;
    if (answers['m02a'] !== '0' && answers['m02b'] === 'Yes') points += 10;

         if (answers['m03a'] === '1') points += 10;
    else if (answers['m03a'] === '2') points += 20;
    else if (answers['m03a'] === '3+') points += 30;
    if (answers['m03b'] === 'Yes') points += 5;

         if (answers['m04a'] === '1') points += 5;
    else if (answers['m04a'] === '2') points += 10;
    else if (answers['m04a'] === '3') points += 20;

    if (answers['m05a'] === 'Yes') points += 20;
    if (answers['m05b'] === 'Yes') points += 10;

    if (answers['m06a'] === 'Yes') points += 10;
    if (answers['m06b'] === 'Yes') points += 10;

         if (answers['m07a'] === '1') points += 10;
    else if (answers['m07a'] === '2') points += 20;
    else if (answers['m07a'] === '3') points += 30;

    if (answers['m08a'] === 'Yes') points += 10;
    if (answers['m08b'] === 'Yes') points += 10;

    if (answers['m09a'] === 'Yes') points += 10;
         if (answers['m09b'] === 'Energy Unit') points += 10;
    else if (answers['m09b'] === 'Rechargeable Battery') points += 20;

         if (answers['m10a'] === '1') points += 5;
    else if (answers['m10a'] === '2') points += 10;
    else if (answers['m10a'] === '3') points += 25;

    if (answers['m11a'] === 'Yes') points += 20;

         if (answers['m12a'] === '1') points += 5;
    else if (answers['m12a'] === '2') points += 10;
    else if (answers['m12a'] === '3') points += 15;
         if (answers['m12b'] === '1') points += 10;
    else if (answers['m12b'] === '2') points += 20;

         if (answers['m13a'] === '1') points += 5;
    else if (answers['m13a'] === '2') points += 10;
    else if (answers['m13a'] === '3+') points += 15;

         if (answers['m14a'] === '1') points += 5;
    else if (answers['m14a'] === '2') points += 10;
    else if (answers['m14a'] === '3+') points += 15;
    if (answers['m14b'] === 'Yes') points += 10;

         if (answers['m15a'] === '1') points += 5;
    else if (answers['m15a'] === '2') points += 10;
    else if (answers['m15a'] === '3+') points += 15;

         if (answers['m16a'] === '1') points += 10;
    else if (answers['m16a'] === '2') points += 15;
    else if (answers['m16a'] === '3') points += 25;
    else if (answers['m16a'] === '4') points += 35;
    else if (answers['m16a'] === '5') points += 50;
    else if (answers['m16a'] === '6') points += 50;

    return points;
}

//module.exports is available in other files using require(...)
module.exports = {
    score: score
};
