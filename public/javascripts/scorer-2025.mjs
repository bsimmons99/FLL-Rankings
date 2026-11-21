const name = "Unearthed";

const challenges = {
    "missions": [
        {
            "mission": "EI",
            "description": "Equipment Inspection",
            "equipment_constraint": false,
            "quests": [
                {
                    "id": "ei",
                    "description": "All team equipment fits in one launch area and under 12 in. (305 mm)",
                    "options": ["No", "Yes"]
                }
            ]
        },
        {
            "mission": "M01",
            "description": "Surface Brushing",
            "equipment_constraint": true,
            "quests": [
                {
                    "id": "m01a",
                    "description": "Soil deposits completely cleared, touching the mat",
                    "options": ["0", "1", "2"]
                },
                {
                    "id": "m01b",
                    "description": "Archaeologist's brush is not touching the dig site",
                    "options": ["No", "Yes"]
                }
            ]
        },
        {
            "mission": "M02",
            "description": "Map Reveal",
            "equipment_constraint": false,
            "quests": [
                {
                    "id": "m02a",
                    "description": "Topsoil sections completely cleared",
                    "options": ["0", "1", "2", "3"]
                }
            ]
        },
        {
            "mission": "M03",
            "description": "Mineshaft Explorer",
            "equipment_constraint": false,
            "quests": [
                {
                    "id": "m03a",
                    "description": "Your team's minecart is on the opposing team's field",
                    "options": ["No", "Yes"]
                },
                {
                    "id": "m03b",
                    "description": "Bonus: and the opposing team's minecart is on your team's field",
                    "options": ["No", "Yes"]
                }
            ]
        },
        {
            "mission": "M04",
            "description": "Careful Recovery",
            "equipment_constraint": true,
            "quests": [
                {
                    "id": "m04a",
                    "description": "Precious artifact is not touching the mine",
                    "options": ["No", "Yes"]
                },
                {
                    "id": "m04b",
                    "description": "Both support structures are standing",
                    "options": ["No", "Yes"]
                }
            ]
        },
        {
            "mission": "M05",
            "description": "Who Lived Here?",
            "equipment_constraint": true,
            "quests": [
                {
                    "id": "m05a",
                    "description": "Structure floor is completely upright",
                    "options": ["No", "Yes"]
                }
            ]
        },
        {
            "mission": "M06",
            "description": "Forge",
            "equipment_constraint": false,
            "quests": [
                {
                    "id": "m06a",
                    "description": "Ore blocks not touching the forge",
                    "options": ["0", "1", "2", "3"]
                }
            ]
        },
        {
            "mission": "M07",
            "description": "Heavy Lifting",
            "equipment_constraint": false,
            "quests": [
                {
                    "id": "m07a",
                    "description": "Millstone is no longer touching its base",
                    "options": ["No", "Yes"]
                }
            ]
        },
        {
            "mission": "M08",
            "description": "Silo",
            "equipment_constraint": false,
            "quests": [
                {
                    "id": "m08a",
                    "description": "Preserved pieces outside the silo",
                    "options": ["0", "1", "2", "3"]
                }
            ]
        },
        {
            "mission": "M09",
            "description": "What's On Sale?",
            "equipment_constraint": true,
            "quests": [
                {
                    "id": "m09a",
                    "description": "Roof is completely raised",
                    "options": ["No", "Yes"]
                },
                {
                    "id": "m09b",
                    "description": "Market wares are raised",
                    "options": ["No", "Yes"]
                }
            ]
        },
        {
            "mission": "M10",
            "description": "Tip The Scales",
            "equipment_constraint": false,
            "quests": [
                {
                    "id": "m10a",
                    "description": "Scale is tipped and touching the mat",
                    "options": ["No", "Yes"]
                },
                {
                    "id": "m10b",
                    "description": "Scale pan is completely removed",
                    "options": ["No", "Yes"]
                }
            ]
        },
        {
            "mission": "M11",
            "description": "Angler Artifacts",
            "equipment_constraint": true,
            "quests": [
                {
                    "id": "m11a",
                    "description": "Artifacts are raised above the ground layer",
                    "options": ["No", "Yes"]
                },
                {
                    "id": "m11b",
                    "description": "Bonus: and the crane flag is at least partly lowered",
                    "options": ["No", "Yes"]
                }
            ]
        },
        {
            "mission": "M12",
            "description": "Salvage Operation",
            "equipment_constraint": true,
            "quests": [
                {
                    "id": "m12a",
                    "description": "Sand is completely cleared",
                    "options": ["No", "Yes"]
                },
                {
                    "id": "m12b",
                    "description": "Ship is completely raised",
                    "options": ["No", "Yes"]
                }
            ]
        },
        {
            "mission": "M13",
            "description": "Statue Rebuild",
            "equipment_constraint": true,
            "quests": [
                {
                    "id": "m13a",
                    "description": "Statue is completely raised",
                    "options": ["No", "Yes"]
                }
            ]
        },
        {
            "mission": "M14",
            "description": "Forum",
            "equipment_constraint": true,
            "hint": "Artifacts: Brush, Topsoil, Precious Artifact, Opposing Team's Minecart, Ore with Fossilized Artifact, Millstone, & Scale Pan",
            "quests": [
                {
                    "id": "m14a",
                    "description": "Artifacts touching the mat and at least partly in the forum",
                    "options": ["0", "1", "2", "3", "4", "5", "6", "7"]
                }
            ]
        },
        {
            "mission": "M15",
            "description": "Site Marking",
            "equipment_constraint": false,
            "quests": [
                {
                    "id": "m15a",
                    "description": "Sites with a flag at least partly inside and touching the mat",
                    "options": ["0", "1", "2", "3"]
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
                    "description": "1x Brush, 1x Topsoil, 1x Precious Artifact, 1x Opposing Team's Minecart, 1x Ore with Fossilized Artifact, 1x Millstone, 1x Scale Pan, 3x Flags, 6x Precision Tokens",
                    "options": [],
                    // "display": {"multi_line": true}
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
                    "options": ["Developing 2", "Accomplished 3", "Exceeds 4"],
                    "display": {"multi_line": true}
                }
            ]
        }
    ]
};

const defaults = {
    "ei": "No",
    "m01a": "0",
    "m01b": "No",
    "m02a": "0",
    "m03a": "No",
    "m03b": "No",
    "m04a": "No",
    "m04b": "No",
    "m05a": "No",
    "m06a": "0",
    "m07a": "No",
    "m08a": "0",
    "m09a": "No",
    "m09b": "No",
    "m10a": "No",
    "m10b": "No",
    "m11a": "No",
    "m11b": "No",
    "m12a": "No",
    "m12b": "No",
    "m13a": "No",
    "m14a": "0",
    "m15a": "0",
    "pt": "6",
    "gpa": "Accomplished 3"
};

function score(answers) {
    let points = 0;

    if (answers['eib'] === 'Yes') points += 20;

         if (answers['m01a'] === '1') points += 10;
    else if (answers['m01a'] === '2') points += 20;
    if (answers['m01b'] === 'Yes') points += 10;

         if (answers['m02a'] === '1') points += 10;
    else if (answers['m02a'] === '2') points += 20;
    else if (answers['m02a'] === '3') points += 30;

    if (answers['m03a'] === 'Yes') points += 30;
    if (answers['m03a'] === 'Yes' && answers['m03b'] === 'Yes') points += 10;

    if (answers['m04a'] === 'Yes') points += 30;
    if (answers['m04b'] === 'Yes') points += 10;

    if (answers['m05a'] === 'Yes') points += 30;

         if (answers['m06a'] === '1') points += 10;
    else if (answers['m06a'] === '2') points += 20;
    else if (answers['m06a'] === '3') points += 30;

    if (answers['m07a'] === 'Yes') points += 30;

         if (answers['m08a'] === '1') points += 10;
    else if (answers['m08a'] === '2') points += 20;
    else if (answers['m08a'] === '3') points += 30;

    if (answers['m09a'] === 'Yes') points += 20;
    if (answers['m09b'] === 'Yes') points += 10;

    if (answers['m10a'] === 'Yes') points += 20;
    if (answers['m10b'] === 'Yes') points += 10;

    if (answers['m11a'] === 'Yes') points += 20;
    if (answers['m11a'] === 'Yes' && answers['m11b'] === 'Yes') points += 10;

    if (answers['m12a'] === 'Yes') points += 20;
    if (answers['m12b'] === 'Yes') points += 10;

    if (answers['m13a'] === 'Yes') points += 30;

         if (answers['m14a'] === '1') points += 5;
    else if (answers['m14a'] === '2') points += 10;
    else if (answers['m14a'] === '3') points += 15;
    else if (answers['m14a'] === '4') points += 20;
    else if (answers['m14a'] === '5') points += 25;
    else if (answers['m14a'] === '6') points += 30;
    else if (answers['m14a'] === '7') points += 35;

         if (answers['m15a'] === '1') points += 10;
    else if (answers['m15a'] === '2') points += 20;
    else if (answers['m15a'] === '3') points += 30;

         if (answers['pt'] === '1') points += 10;
    else if (answers['pt'] === '2') points += 15;
    else if (answers['pt'] === '3') points += 25;
    else if (answers['pt'] === '4') points += 35;
    else if (answers['pt'] === '5') points += 50;
    else if (answers['pt'] === '6') points += 50;

    return points;
}

export { name, challenges, defaults, score };
