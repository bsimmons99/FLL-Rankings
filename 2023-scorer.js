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

    if (answers['eib'] === 'Yes') points += 20;

    if (answers['m01a'] === 'Yes') points += 10;

         if (answers['m02a'] === 'No') points += 0;
    else if (answers['m02a'] === 'Blue') points += 10;
    else if (answers['m02a'] === 'Pink') points += 20;
    else if (answers['m02a'] === 'Orange') points += 30;
    if (answers['m02b'] === 'Yes') {
               if (answers['m02a'] === 'Blue') points += 20;
          else if (answers['m02a'] === 'Pink') points += 30;
          else if (answers['m02a'] === 'Orange') points += 10;
    }

    if (answers['m03a'] === 'Yes') points += 20;

    if (answers['m04a'] === 'Yes') points += 10;
    if (answers['m04b'] === 'Yes') points += 20;

    if (answers['m05a'] === 'Yes') points += 30;

    if (answers['m06a'] === 'Yes') points += 10;
    if (answers['m06b'] === 'Yes') points += 10;

    if (answers['m07a'] === 'Yes') points += 20;

         if (answers['m08a'] === 'Dark blue') points += 10;
    else if (answers['m08a'] === 'Medium blue') points += 20;
    else if (answers['m08a'] === 'Light blue') points += 30;

    if (answers['m09a'] === 'Yes') points += 10;
    if (answers['m09b'] === 'Yes') points += 10;

         if (answers['m10a'] === '1') points += 10;
    else if (answers['m10a'] === '2') points += 20;
    else if (answers['m10a'] === '3') points += 30;

         if (answers['m11a'] === 'Yellow') points += 10;
    else if (answers['m11a'] === 'Green') points += 20;
    else if (answers['m11a'] === 'Blue') points += 30;

    if (answers['m12a'] === 'Yes') points += 10;
    if (answers['m12b'] === 'Yes') points += 20;

    if (answers['m13a'] === 'Yes') points += 10;
    if (answers['m13b'] === 'Yes') points += 20;

         if (answers['m14a'] === '1') points += 5;
    else if (answers['m14a'] === '2') points += 10;
    else if (answers['m14a'] === '3') points += 15;
    else if (answers['m14a'] === '4') points += 20;
    else if (answers['m14a'] === '5') points += 25;
    else if (answers['m14a'] === '6') points += 30;
    else if (answers['m14a'] === '7') points += 35;
         if (answers['m14b'] === '1') points += 5;
    else if (answers['m14b'] === '2') points += 10;
    else if (answers['m14b'] === '3') points += 15;
    else if (answers['m14b'] === '4') points += 20;
    else if (answers['m14b'] === '5') points += 25;
    else if (answers['m14b'] === '6') points += 30;
    else if (answers['m14b'] === '7') points += 35;

         if (answers['m15a'] === '1') points += 10;
    else if (answers['m15a'] === '2') points += 20;
    else if (answers['m15a'] === '3') points += 30;
    else if (answers['m15a'] === '4') points += 40;
    else if (answers['m15a'] === '5') points += 50;

         if (answers['pt'] === '1') points += 10;
    else if (answers['pt'] === '2') points += 15;
    else if (answers['pt'] === '3') points += 25;
    else if (answers['pt'] === '4') points += 35;
    else if (answers['pt'] === '5') points += 50;
    else if (answers['pt'] === '6') points += 50;

    return points;
}

//module.exports is available in other files using require(...)
module.exports = {
    score: score
};
