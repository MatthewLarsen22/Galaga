MyGame.stages.ChallengingStage = function(spec) {
    let that = {};
    let stageTime = 0;

    that.entryPatterns = {
        entries: [{
            "beginTime": 2000,
            "pattern": [
                { x: 250, y: -16 },
                { x: 250, y: 40 },
                { x: 280, y: 300 },
                { x: 300, y: 430 },
                { x: 320, y: 500 },

                { x: 350, y: 567 },
                { x: 383, y: 600 },
                { x: 450, y: 620 },

                { x: 517, y: 600 },
                { x: 550, y: 567 },
                { x: 570, y: 500 },

                { x: 550, y: 433 },
                { x: 517, y: 400 },
                { x: 450, y: 370 },

                { x: 300, y: 350 },
                { x: -100, y: 300 },
                { x: -100, y: 300 }
            ],
            "enemyPositions": [{x: -6, y: 3}, {x: -6, y: 3}, {x: -6, y: 4}, {x: -6, y: 4}],
            "enemyType": MyGame.components.Types.Bee,
            "delayBetween": 150
        }, {
            "beginTime": 2000,
            "pattern": [
                { x: 350, y: -16 },
                { x: 350, y: 40 },
                { x: 320, y: 300 },
                { x: 300, y: 430 },
                { x: 280, y: 500 },

                { x: 250, y: 567 },
                { x: 217, y: 600 },
                { x: 150, y: 620 },

                { x: 83, y: 600 },
                { x: 50, y: 567 },
                { x: 30, y: 500 },

                { x: 50, y: 433 },
                { x: 83, y: 400 },
                { x: 150, y: 370 },

                { x: 300, y: 350 },
                { x: 700, y: 300 },
                { x: 700, y: 300 }
            ],
            "enemyPositions": [{x: 15, y: 3}, {x: 15, y: 3}, {x: 15, y: 4}, {x: 15, y: 4}],
            "enemyType": MyGame.components.Types.Bee,
            "delayBetween": 150
        }, {
            "beginTime": 7000,
            "pattern": [
                { x: -16, y: 700 },
                { x: 200, y: 650 },
                { x: 350, y: 600 },
                { x: 440, y: 550 },
                { x: 490, y: 500 },
                { x: 510, y: 450 },

                { x: 510, y: 300 },
                { x: 492, y: 258 },
                { x: 450, y: 240 },
                { x: 408, y: 258 },
                { x: 390, y: 300 },

                { x: 390, y: 450 },
                { x: 408, y: 492 },
                { x: 450, y: 510 },

                { x: 520, y: 450 },
                { x: 550, y: 400 },
                { x: 580, y: 320 },
                { x: 616, y: 200 },
                { x: 616, y: 200 }
            ],
            "enemyPositions": [{x: 3, y: 0}, {x: 4, y: 0}, {x: 5, y: 0}, {x: 6, y: 0}],
            "enemyType": MyGame.components.Types.Flagship,
            "delayBetween": 300
        }, {
            "beginTime": 7150,
            "pattern": [
                { x: -16, y: 700 },
                { x: 200, y: 650 },
                { x: 350, y: 600 },
                { x: 440, y: 550 },
                { x: 490, y: 500 },
                { x: 510, y: 450 },

                { x: 510, y: 300 },
                { x: 492, y: 258 },
                { x: 450, y: 240 },
                { x: 408, y: 258 },
                { x: 390, y: 300 },

                { x: 390, y: 450 },
                { x: 408, y: 492 },
                { x: 450, y: 510 },

                { x: 520, y: 450 },
                { x: 550, y: 400 },
                { x: 580, y: 320 },
                { x: 616, y: 200 },
                { x: 616, y: 200 }
            ],
            "enemyPositions": [{x: 3, y: 1}, {x: 6, y: 1}, {x: 3, y: 2}, {x: 6, y: 2}],
            "enemyType": MyGame.components.Types.Bee,
            "delayBetween": 300
        }, {
            "beginTime": 12000,
            "pattern": [
                { x: 616, y: 700 },
                { x: 400, y: 650 },
                { x: 250, y: 600 },
                { x: 160, y: 550 },
                { x: 110, y: 500 },
                { x: 90, y: 450 },

                { x: 90, y: 300 },
                { x: 108, y: 258 },
                { x: 150, y: 240 },
                { x: 192, y: 258 },
                { x: 210, y: 300 },

                { x: 210, y: 450 },
                { x: 192, y: 492 },
                { x: 150, y: 510 },

                { x: 80, y: 450 },
                { x: 50, y: 400 },
                { x: 20, y: 320 },
                { x: -16, y: 200 },
                { x: -16, y: 200 }
            ],
            "enemyPositions": [{x: 1, y: 1}, {x: 2, y: 1}, {x: 7, y: 1}, {x: 8, y: 1}, {x: 1, y: 2}, {x: 2, y: 2}, {x: 7, y: 2}, {x: 8, y: 2}],
            "enemyType": MyGame.components.Types.Bee,
            "delayBetween": 150
        }, {
            "beginTime": 17000,
            "pattern": [
                { x: 350, y: -16 },
                { x: 350, y: 40 },
                { x: 320, y: 300 },
                { x: 300, y: 430 },
                { x: 280, y: 500 },

                { x: 250, y: 567 },
                { x: 217, y: 600 },
                { x: 150, y: 620 },

                { x: 83, y: 600 },
                { x: 50, y: 567 },
                { x: 30, y: 500 },

                { x: 50, y: 433 },
                { x: 83, y: 400 },
                { x: 150, y: 370 },

                { x: 300, y: 350 },
                { x: 700, y: 300 },
                { x: 700, y: 300 }
            ],
            "enemyPositions": [{x: 2, y: 3}, {x: 3, y: 3}, {x: 6, y: 3}, {x: 7, y: 3}, {x: 2, y: 4}, {x: 3, y: 4}, {x: 6, y: 4}, {x: 7, y: 4}],
            "enemyType": MyGame.components.Types.Bee,
            "delayBetween": 150
        }, {
            "beginTime": 22000,
            "pattern": [
                { x: 250, y: -16 },
                { x: 250, y: 40 },
                { x: 280, y: 300 },
                { x: 300, y: 430 },
                { x: 320, y: 500 },

                { x: 350, y: 567 },
                { x: 383, y: 600 },
                { x: 450, y: 620 },

                { x: 517, y: 600 },
                { x: 550, y: 567 },
                { x: 570, y: 500 },

                { x: 550, y: 433 },
                { x: 517, y: 400 },
                { x: 450, y: 370 },

                { x: 300, y: 350 },
                { x: -100, y: 300 },
                { x: -100, y: 300 }
            ],
            "enemyPositions": [{x: 0, y: 3}, {x: 1, y: 3}, {x: 8, y: 3}, {x: 9, y: 3}, {x: 0, y: 4}, {x: 1, y: 4}, {x: 8, y: 4}, {x: 9, y: 4}],
            "enemyType": MyGame.components.Types.Bee,
            "delayBetween": 150
        }]
    }

    that.update = function(elapsedTime) {
        stageTime += elapsedTime;
        for (let entryId in that.entryPatterns.entries) {
            if (that.entryPatterns.entries.hasOwnProperty(entryId)) {
                let entry = that.entryPatterns.entries[entryId];
                if (stageTime >= entry.beginTime) {
                    if (!entry.enemyIndex){
                        entry.enemyIndex = 0;
                    }
                    if (entry.enemyIndex < entry.enemyPositions.length && stageTime >= entry.beginTime + (entry.enemyIndex * entry.delayBetween)){
                        switch (entry.enemyType){
                            case MyGame.components.Types.Bee:
                                spec.createBee(entry.pattern, entry.enemyPositions[entry.enemyIndex]);
                                break;
                            case MyGame.components.Types.Butterfly:
                                spec.createButterfly(entry.pattern, entry.enemyPositions[entry.enemyIndex]);
                                break;
                            case MyGame.components.Types.Flagship:
                                spec.createFlagship(entry.pattern, entry.enemyPositions[entry.enemyIndex]);
                                break;
                            default:
                                break;
                        }
                        entry.enemyIndex++;
                    }

                }
            }
        }
        if (stageTime > 30000){
            spec.reportEvent({
                type: MyGame.enums.Event.StageComplete
            });
        }
    }

    return that;
}