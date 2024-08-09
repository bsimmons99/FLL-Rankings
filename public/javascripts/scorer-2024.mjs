const name = "Submerged";

const challenges = {
    "missions": [
        {
            "mission": "EIB",
            "description": "Equipment Inspection Bonus",
            "equipment_constraint": false,
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
            "description": "Coral Nursery",
            "equipment_constraint": true,
            "quests": [
                {
                    "id": "m01a",
                    "description": "The coral tree is hanging on the coral tree support",
                    "options": ["No", "Yes"]
                },
                {
                    "id": "m01b",
                    "description": "The bottom of the coral tree is in its holder",
                    "options": ["No", "Yes"]
                },
                {
                    "id": "m01c",
                    "description": "The coral buds are flipped up",
                    "options": ["No", "Yes"]
                }
            ]
        },
        {
            "mission": "M02",
            "description": "Shark",
            "equipment_constraint": false,
            "quests": [
                {
                    "id": "m02a",
                    "description": "The shark is no longer touching the cave",
                    "options": ["No", "Yes"]
                },
                {
                    "id": "m02b",
                    "description": "The shark is touching the mat at least partly in the shark habitat",
                    "options": ["No", "Yes"]
                }
            ]
        },
        {
            "mission": "M03",
            "description": "Coral Reef",
            "equipment_constraint": true,
            "quests": [
                {
                    "id": "m03a",
                    "description": "The coral reef is flipped up, not touching the mat",
                    "options": ["No", "Yes"]
                },
                {
                    "id": "m03b",
                    "description": "Number of reef segments standing upright, outside of home, and touching the mat",
                    "options": ["0", "1", "2", "3"]
                }
            ]
        },
        {
            "mission": "M04",
            "description": "SCUBA Diver",
            "equipment_constraint": false,
            "hint": "The \"coral nursery\" includes any part of the Mission 01 mission model.",
            "quests": [
                {
                    "id": "m04a",
                    "description": "The scuba diver is no longer touching the coral nursery",
                    "options": ["No", "Yes"]
                },
                {
                    "id": "m04b",
                    "description": "The scuba diver is hanging on the coral reef support",
                    "options": ["No", "Yes"]
                }
            ]
        },
        {
            "mission": "M05",
            "description": "Angler Fish",
            "equipment_constraint": false,
            "quests": [
                {
                    "id": "m05a",
                    "description": "The angler fish is latched within the shipwreck",
                    "options": ["No", "Yes"]
                }
            ]
        },
        {
            "mission": "M06",
            "description": "Raise the Mast",
            "equipment_constraint": true,
            "hint": "The shipwreck's mast is considered raised when the latch prevents it from returning to its starting position.",
            "quests": [
                {
                    "id": "m06a",
                    "description": "The shipwreck's mast is completely raised",
                    "options": ["No", "Yes"]
                }
            ]
        },
        {
            "mission": "M07",
            "description": "Kracken's Treasure",
            "equipment_constraint": true,
            "quests": [
                {
                    "id": "m07a",
                    "description": "The treasure chest is completely outside the kraken's nest",
                    "options": ["No", "Yes"]
                }
            ]
        },
        {
            "mission": "M08",
            "description": "Artifical Habitat",
            "equipment_constraint": true,
            "hint": "There are four segments of the artificial habitat stack, each defined by its yellow base. A segment is considered upright when the crab is above its yellow base.",
            "quests": [
                {
                    "id": "m08a",
                    "description": "Number of artificial habitat stack segments completely flat and upright",
                    "options": ["0", "1", "2", "3", "4"]
                }
            ]
        },
        {
            "mission": "M09",
            "description": "Unexpected Encounter",
            "equipment_constraint": false,
            "quests": [
                {
                    "id": "m09a",
                    "description": "The unknown creature is released",
                    "options": ["No", "Yes"]
                },
                {
                    "id": "m09b",
                    "description": "The unknown creature is at least partly in the cold seep",
                    "options": ["No", "Yes"]
                }
            ]
        },
        {
            "mission": "M10",
            "description": "Send Over the Submersible",
            "equipment_constraint": true,
            "hint": "Teams may not block the opposing team. It is not possible to earn the bonus in remote competitions or if there is no opposing team.",
            "quests": [
                {
                    "id": "m10a",
                    "description": "Your team's yellow flag is down",
                    "options": ["No", "Yes"]
                },
                {
                    "id": "m10b",
                    "description": "The submersible is clearly closer to the opposing field",
                    "options": ["No", "Yes"]
                }
            ]
        },
        {
            "mission": "M11",
            "description": "Sonar Discovery",
            "equipment_constraint": false,
            "quests": [
                {
                    "id": "m11a",
                    "description": "Number of whales revealed",
                    "options": ["0", "1", "2"]
                }
            ]
        },
        {
            "mission": "M12",
            "description": "Feed the Whale",
            "equipment_constraint": true,
            "quests": [
                {
                    "id": "m12a",
                    "description": "Number of krill at least partly in the whale's mouth",
                    "options": ["0", "1", "2", "3", "4", "5"]
                }
            ]
        },
        {
            "mission": "M13",
            "description": "Changing Shipping Lanes",
            "equipment_constraint": false,
            "quests": [
                {
                    "id": "m13a",
                    "description": "The ship is in the new shipping lane, touching the mat",
                    "options": ["No", "Yes"]
                }
            ]
        },
        {
            "mission": "M14",
            "description": "Sample Collection",
            "equipment_constraint": false,
            "quests": [
                {
                    "id": "m14a",
                    "description": "The water sample is completely outside the water sample area",
                    "options": ["No", "Yes"]
                },
                {
                    "id": "m14b",
                    "description": "The seabed sample is no longer touching the seabed",
                    "options": ["No", "Yes"]
                },
                {
                    "id": "m14c",
                    "description": "The plankton sample is no longer touching the kelp forest",
                    "options": ["No", "Yes"]
                },
                {
                    "id": "m14d",
                    "description": "Number of trident pieces no longer touching the shipwreck",
                    "options": ["0", "1", "2"]
                }
            ]
        },
        {
            "mission": "M15",
            "description": "Research Vessel",
            "equipment_constraint": true,
            "quests": [
                {
                    "id": "m15a",
                    "description": "Number of samples, trident part(s), or treasure chest at least partly in the research vessel's cargo area",
                    "options": ["0", "1", "2", "3", "4", "5", "6"]
                },
                {
                    "id": "m15b",
                    "description": "The ports latch is at least partly in the research vessel's loop",
                    "options": ["No", "Yes"]
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
                    "description": "1x Coral Tree, 1x Shark, 3x Reef Segments, 1x SCUBA Diver, 1x Treasure Chest, 1x Unknown Creature, 5x Krill, 3x Samples (Water, Seabed, Plankton), 2x Trident Parts, 1x Research Vessel, 6x Precision Tokens",
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
    'm01b': 'No',
    'm01c': 'No',
    'm02a': 'No',
    'm02b': 'No',
    'm03a': 'No',
    'm03b': '0',
    'm04a': 'No',
    'm04b': 'No',
    'm05a': 'No',
    'm06a': 'No',
    'm07a': 'No',
    'm08a': '0',
    'm09a': 'No',
    'm09b': 'No',
    'm10a': 'No',
    'm10b': 'No',
    'm11a': '0',
    'm12a': '0',
    'm13a': 'No',
    'm14a': 'No',
    'm14b': 'No',
    'm14c': 'No',
    'm14d': '0',
    'm15a': '0',
    'm15b': 'No',
    'pt': '6',
    'gpa': 'Accomplished 3'
};

function score(answers) {
    let points = 0;

    if (answers['eib'] === 'Yes') points += 20;

    if (answers['m01a'] === 'Yes') points += 20;
    if (answers['m01a'] === 'Yes' && answers['m01b'] === 'Yes') points += 10;
    if (answers['m01c'] === 'Yes') points += 20;

    if (answers['m02a'] === 'Yes') points += 20;
    if (answers['m02c'] === 'Yes') points += 10;

    if (answers['m03a'] === 'Yes') points += 20;
         if (answers['m03b'] === '1') points += 5;
    else if (answers['m03b'] === '2') points += 10;
    else if (answers['m03b'] === '3') points += 15;

    if (answers['m04a'] === 'Yes') points += 20;
    if (answers['m04b'] === 'Yes') points += 20;

    if (answers['m05a'] === 'Yes') points += 30;

    if (answers['m06a'] === 'Yes') points += 30;

    if (answers['m07a'] === 'Yes') points += 20;

         if (answers['m08a'] === '1') points += 10;
    else if (answers['m08a'] === '2') points += 20;
    else if (answers['m08a'] === '3') points += 30;
    else if (answers['m08a'] === '4') points += 40;

    if (answers['m09a'] === 'Yes') points += 20;
    if (answers['m09b'] === 'Yes') points += 10;

    if (answers['m10a'] === 'Yes') points += 30;
    if (answers['m10b'] === 'Yes') points += 10;

         if (answers['m11a'] === '1') points += 20;
    else if (answers['m11a'] === '2') points += 30;

         if (answers['m12a'] === '1') points += 10;
    else if (answers['m12a'] === '2') points += 20;
    else if (answers['m12a'] === '3') points += 30;
    else if (answers['m12a'] === '4') points += 40;
    else if (answers['m12a'] === '5') points += 50;

    if (answers['m13a'] === 'Yes') points += 20;

    if (answers['m14a'] === 'Yes') points += 5;
    if (answers['m14b'] === 'Yes') points += 10;
    if (answers['m14c'] === 'Yes') points += 10;
         if (answers['m14d'] === '1') points += 20;
    else if (answers['m14d'] === '2') points += 30;

         if (answers['m15a'] === '1') points += 5;
    else if (answers['m15a'] === '2') points += 10;
    else if (answers['m15a'] === '3') points += 15;
    else if (answers['m15a'] === '4') points += 20;
    else if (answers['m15a'] === '5') points += 25;
    else if (answers['m15a'] === '6') points += 30;
    if (answers['m15b'] === 'Yes') points += 20;

         if (answers['pt'] === '1') points += 10;
    else if (answers['pt'] === '2') points += 15;
    else if (answers['pt'] === '3') points += 25;
    else if (answers['pt'] === '4') points += 35;
    else if (answers['pt'] === '5') points += 50;
    else if (answers['pt'] === '6') points += 50;

    return points;
}

export { name, challenges, defaults, score };
