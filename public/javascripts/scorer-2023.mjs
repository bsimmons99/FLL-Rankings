const name = "Masterpiece";

const challenges = {
    "missions": [
        {
            "mission": "EIB",
            "description": "Equiptment Inspection Bonus",
            "quests": [
                {
                    "id": "eib",
                    "description": "All team equipment fits in one launch area and under 12 in. (305 mm)",
                    "options": ["No", "Yes"]
                }
            ]
        },
        {
            "mission": "M01",
            "description": "3D Cinema",
            "quests": [
                {
                    "id": "m01a",
                    "description": "The 3D cinema's red beam is completely to the right of the black frame",
                    "options": ["No", "Yes"]
                }
            ]
        },
        {
            "mission": "M02",
            "description": "Theater Scene Chage",
            "quests": [
                {
                    "id": "m02a",
                    "description": "Your theater's red flag is down and the active scene color is",
                    "options": ["No", "Blue", "Pink", "Orange"]
                },
                {
                    "id": "m02b",
                    "description": "Both teams' active scenes match",
                    "options": ["No", "Yes"]
                }
            ]
        },
        {
            "mission": "M03",
            "description": "Immersive Experience",
            "quests": [
                {
                    "id": "m03a",
                    "description": "The three immersive experience screens are raised",
                    "options": ["No", "Yes"]
                }
            ]
        },
        {
            "mission": "M04",
            "description": "Masterpiece",
            "quests": [
                {
                    "id": "m04a",
                    "description": "Your team's LEGO® art piece is at least partly in the museum target area",
                    "options": ["No", "Yes"]
                },
                {
                    "id": "m04b",
                    "description": "The art piece is completely supported by the pedestal",
                    "options": ["No", "Yes"]
                }
            ]
        },
        {
            "mission": "M05",
            "description": "Augmented Reality Statue",
            "quests": [
                {
                    "id": "m05a",
                    "description": "The augmented reality statue's orange lever is rotated completely to the right",
                    "options": ["No", "Yes"]
                }
            ]
        },
        {
            "mission": "M06",
            "description": "Music Concert Lights and Sounds",
            "quests": [
                {
                    "id": "m06a",
                    "description": "The lights' orange lever is rotated completely downwards",
                    "options": ["No", "Yes"]
                },
                {
                    "id": "m06b",
                    "description": "The speakers' orange lever is rotated completely to the left",
                    "options": ["No", "Yes"]
                }
            ]
        },
        {
            "mission": "M07",
            "description": "Hologram Performer",
            "quests": [
                {
                    "id": "m07a",
                    "description": "The hologram performer's orange push activator is completely past the black stage set line",
                    "options": ["No", "Yes"]
                }
            ]
        },
        {
            "mission": "M08",
            "description": "Rolling Camera",
            "quests": [
                {
                    "id": "m08a",
                    "description": "The rolling camera's white pointer is left of",
                    "options": ["None", "Dark blue", "Medium blue", "Light blue"]
                }
            ]
        },
        {
            "mission": "M09",
            "description": "Movie Set",
            "quests": [
                {
                    "id": "m09a",
                    "description": "The boat is touching the mat and is completely past the black scene line",
                    "options": ["No", "Yes"]
                },
                {
                    "id": "m09b",
                    "description": "The camera is touching the mat and is at least partly in the camera target area",
                    "options": ["No", "Yes"]
                }
            ]
        },
        {
            "mission": "M10",
            "description": "Sound Mixer",
            "quests": [
                {
                    "id": "m10a",
                    "description": "Number of sound mixer sliders that are raised",
                    "options": ["0", "1", "2", "3"]
                }
            ]
        },
        {
            "mission": "M11",
            "description": "Light Show",
            "quests": [
                {
                    "id": "m11a",
                    "description": "The light show's white pointer is within zone",
                    "options": ["None", "Yellow", "Green", "Blue"]
                }
            ]
        },
        {
            "mission": "M12",
            "description": "Virtual Reality Artist",
            "quests": [
                {
                    "id": "m12a",
                    "description": "The chicken is intact and has moved from its starting position",
                    "options": ["No", "Yes"]
                },
                {
                    "id": "m12b",
                    "description": "The chicken is over or completely past the lavender dot",
                    "options": ["No", "Yes"]
                }
            ]
        },
        {
            "mission": "M13",
            "description": "Craft Creator",
            "quests": [
                {
                    "id": "m13a",
                    "description": "The craft machine's orange and white lid is completely open",
                    "options": ["No", "Yes"]
                },
                {
                    "id": "m13b",
                    "description": "The craft machine's light pink latch is pointing straight down",
                    "options": ["No", "Yes"]
                }
            ]
        },
        {
            "mission": "M14",
            "description": "Audience Delivery",
            "quests": [
                {
                    "id": "m14a",
                    "description": "Number of audience members completely in a target destination",
                    "options": ["0", "1", "2", "3", "4", "5", "6", "7"]
                },
                {
                    "id": "m14b",
                    "description": "Number of target destinations with at least one audience member completely in it",
                    "options": ["0", "1", "2", "3", "4", "5", "6", "7"]
                }
            ]
        },
        {
            "mission": "M15",
            "description": "Expert Delivery",
            "quests": [
                {
                    "id": "m15a",
                    "description": "Number of experts at least partly in their target destinations",
                    "options": ["0", "1", "2", "3", "4", "5"]
                }
            ]
        },
        {
            "mission": "PT",
            "description": "Precision Tokens",
            "quests": [
                {
                    "id": "pt",
                    "description": "Number of precision tokens remaining",
                    "options": ["0", "1", "2", "3", "4", "5", "6"]
                }
            ]
        },
        {
            "mission": "",
            "description": "Return Loose Items",
            "quests": [
                {
                    "id": "x1",
                    "description": "7x Audience Members, 5x Experts, 6x Precision Tokens, 1x Pedestal",
                    "options": []
                }
            ]
        },
        {
            "mission": "GP",
            "description": "Gracious Professionalism",
            "quests": [
                {
                    "id": "gpa",
                    "description": "Gracious Professionalism® displayed at the robot game table",
                    "options": ["Developing 2", "Accomplished 3", "Exceeds 4"]
                }
            ]
        }
    ]
};

const defaults = {
    'eib': 'No',
    'm01a': 'No',
    'm02a': 'No',
    'm02b': 'No',
    'm03a': 'No',
    'm04a': 'No',
    'm04b': 'No',
    'm05a': 'No',
    'm06a': 'No',
    'm06b': 'No',
    'm07a': 'No',
    'm08a': 'None',
    'm09a': 'No',
    'm09b': 'No',
    'm10a': '0',
    'm11a': 'None',
    'm12a': 'No',
    'm12b': 'No',
    'm13a': 'No',
    'm13b': 'No',
    'm14a': '0',
    'm14b': '0',
    'm15a': '0',
    'pt': '6',
    'gpa': 'Accomplished 3'
};

function score(answers) {
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
    if (answers['m04a'] === 'Yes' && answers['m04b'] === 'Yes') points += 20;

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

export { name, challenges, defaults, score };
