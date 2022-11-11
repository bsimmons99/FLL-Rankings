const challenges = {
    "missions": [
        {
            "mission": "M00",
            "description": "Equiptment Inspection",
            "quests": [
                {
                    "id": "m00a",
                    "description": "All team equipment fits in one launch area and under 12 in. (305 mm)",
                    "options": ["No", "Yes"]
                }
            ]
        },
        {
            "mission": "M01",
            "description": "Innovation Project Model",
            "quests": [
                {
                    "id": "m01a",
                    "description": "The Innovation Project model is: Made of at least two white LEGO® pieces. Measures at least as long as 4 LEGO studs in some direction. Is at least partly in the hydrogen plant target area.",
                    "options": ["No", "Yes"]
                }
            ]
        },
        {
            "mission": "M02",
            "description": "Oil Platform",
            "quests": [
                {
                    "id": "m02a",
                    "description": "Number of fuel units in the fuel truck",
                    "options": ["0", "1", "2", "3"]
                },
                {
                    "id": "m02b",
                    "description": "The fuel truck is at least partly over the fueling station target",
                    "options": ["No", "Yes"]
                }
            ]
        },
        {
            "mission": "M03",
            "description": "Energy Storage",
            "quests": [
                {
                    "id": "m03a",
                    "description": "Number of energy units completely in the energy storage bin",
                    "options": ["0", "1", "2", "3+"]
                },
                {
                    "id": "m03b",
                    "description": "The energy unit is completely removed from the energy storage tray",
                    "options": ["No", "Yes"]
                }
            ]
        },
        {
            "mission": "M04",
            "description": "Solar Farm",
            "quests": [
                {
                    "id": "m04a",
                    "description": "Number of energy units completely removed from their starting circles",
                    "options": ["0", "1", "2", "3"]
                }
            ]
        },
        {
            "mission": "M05",
            "description": "Smart Grid",
            "quests": [
                {
                    "id": "m05a",
                    "description": "Your field's orange connector is completely raised",
                    "options": ["No", "Yes"]
                },
                {
                    "id": "m05b",
                    "description": "Both team's orange connectors are completely raised",
                    "options": ["No", "Yes"]
                }
            ]
        },
        {
            "mission": "M06",
            "description": "Hybrid Car",
            "quests": [
                {
                    "id": "m06a",
                    "description": "The hybrid car is no longer touching the ramp",
                    "options": ["No", "Yes"]
                },
                {
                    "id": "m06b",
                    "description": "The hybrid unit is in the hybrid car",
                    "options": ["No", "Yes"]
                }
            ]
        },
        {
            "mission": "M07",
            "description": "Wind Turbine",
            "quests": [
                {
                    "id": "m07a",
                    "description": "Number of energy units no longer touching the wind turbine",
                    "options": ["0", "1", "2", "3"]
                }
            ]
        },
        {
            "mission": "M08",
            "description": "Watch Television",
            "quests": [
                {
                    "id": "m08a",
                    "description": "The television is completely raised",
                    "options": ["No", "Yes"]
                },
                {
                    "id": "m08b",
                    "description": "There is an energy unit completely in the green television slot",
                    "options": ["No", "Yes"]
                }
            ]
        },
        {
            "mission": "M09",
            "description": "Dinosaur Toy",
            "quests": [
                {
                    "id": "m09a",
                    "description": "The dinosaur toy is completely in the left home area",
                    "options": ["No", "Yes"]
                },
                {
                    "id": "m09b",
                    "description": "The dinosaur toy lid is completely closed with the following inside",
                    "options": ["Nothing or Not Closed", "Energy Unit", "Rechargeable Battery"]
                }
            ]
        },
        {
            "mission": "M10",
            "description": "Power Plant",
            "quests": [
                {
                    "id": "m10a",
                    "description": "Number of energy units no longer touching the power plant",
                    "options": ["0", "1", "2", "3"]
                }
            ]
        },
        {
            "mission": "M11",
            "description": "Hydroelectric Dam",
            "quests": [
                {
                    "id": "m11a",
                    "description": "The energy unit is no longer touching the hydroelectric dam",
                    "options": ["No", "Yes"]
                }
            ]
        },
        {
            "mission": "M12",
            "description": "Water Reservoir",
            "quests": [
                {
                    "id": "m12a",
                    "description": "Number of looped water units completely in the water reservoir, touching the mat",
                    "options": ["0", "1", "2", "3"]
                },
                {
                    "id": "m12b",
                    "description": "Number looped water units placed on a single red hook (max of 1 per hook)",
                    "options": ["0", "1", "2"]
                }
            ]
        },
        {
            "mission": "M13",
            "description": "Power-To-X",
            "quests": [
                {
                    "id": "m13a",
                    "description": "Number of energy units completely in the hydrogen plant target area",
                    "options": ["0", "1", "2", "3+"]
                }
            ]
        },
        {
            "mission": "M14",
            "description": "Toy Factory",
            "quests": [
                {
                    "id": "m14a",
                    "description": "Number of energy units at least partly in the slot in the back of the toy factory (or in the red hopper)",
                    "options": ["0", "1", "2", "3+"]
                },
                {
                    "id": "m14b",
                    "description": "The mini dinosaur toy has been released",
                    "options": ["No", "Yes"]
                }
            ]
        },
        {
            "mission": "M15",
            "description": "Rechargable Battery",
            "quests": [
                {
                    "id": "m15a",
                    "description": "Number of energy units completely in the rechargeable battery target area",
                    "options": ["0", "1", "2", "3+"]
                }
            ]
        },
        {
            "mission": "M16",
            "description": "Precision Tokens",
            "quests": [
                {
                    "id": "m16a",
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
                    "description": "LIST, OF, LOOSE, ITEMS",
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
    'm00a': 'No',
    'm01a': 'No',
    'm02a': '0',
    'm02b': 'No',
    'm03a': '0',
    'm03b': 'No',
    'm04a': '0',
    'm05a': 'No',
    'm05b': 'No',
    'm06a': 'No',
    'm06b': 'No',
    'm07a': '0',
    'm08a': 'No',
    'm08b': 'No',
    'm09a': 'No',
    'm09b': 'Nothing or Not Closed',
    'm10a': '0',
    'm11a': 'No',
    'm12a': '0',
    'm12b': '0',
    'm13a': '0',
    'm14a': '0',
    'm14b': 'No',
    'm15a': '0',
    'm16a': '6',
    'gpa': 'Accomplished 3'
};

function score(answers) {
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

export { challenges, defaults, score };
