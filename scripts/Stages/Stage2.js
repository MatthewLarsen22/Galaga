MyGame.stages.Stage2 = function(spec) {
    let that = {};
    let stageTime = 0;
    let attackCount = 0;

    that.entryPatterns = {
        entries: [{
            "beginTime": 2000,
            "pattern": [
                { x: 350, y: -16 },
                { x: 350, y: 40 },
                { x: 332, y: 100 },
                { x: 280, y: 160 },
                { x: 220, y: 220 },
                { x: 150, y: 260 },
                { x: 92, y: 280 },
                { x: 54, y: 320 },
                { x: 30, y: 400 },
                { x: 54, y: 448 },
                { x: 92, y: 482 },
                { x: 150, y: 500 },
                { x: 208, y: 482 },
                { x: 256, y: 448 },
                { x: 270, y: 400 },
                { x: 270, y: 350 }
            ],
            "enemyPositions": [{x: 4, y: 1}, {x: 5, y: 1}, {x: 4, y: 2}, {x: 5, y: 2}],
            "enemyType": MyGame.components.Types.Butterfly,
            "delayBetween": 150
        }, {
            "beginTime": 2000,
            "pattern": [
                { x: 250, y: -16 },
                { x: 250, y: 40 },
                { x: 268, y: 100 },
                { x: 320, y: 160 },
                { x: 380, y: 220 },
                { x: 450, y: 260 },
                { x: 508, y: 280 },
                { x: 556, y: 320 },
                { x: 570, y: 400 },
                { x: 556, y: 448 },
                { x: 508, y: 482 },
                { x: 450, y: 500 },
                { x: 392, y: 482 },
                { x: 344, y: 448 },
                { x: 330, y: 400 },
                { x: 330, y: 350 }
            ],
            "enemyPositions": [{x: 4, y: 3}, {x: 5, y: 3}, {x: 4, y: 4}, {x: 5, y: 4}],
            "enemyType": MyGame.components.Types.Bee,
            "delayBetween": 150
        }, {
            "beginTime": 7000,
            "pattern": [
                { x: -16, y: 700 },
                { x: 40, y: 680 },
                { x: 120, y: 640 },
                { x: 200, y: 580 },
                { x: 240, y: 540 },

                { x: 290, y: 450 },
                { x: 264, y: 386 },
                { x: 200, y: 360 },
                { x: 136, y: 386 },
                { x: 110, y: 450 },
                { x: 136, y: 514 },
                { x: 200, y: 540 },
                { x: 264, y: 514 },

                { x: 320, y: 400 },
                { x: 330, y: 350 }
            ],
            "enemyPositions": [{x: 3, y: 0}, {x: 4, y: 0}, {x: 5, y: 0}, {x: 6, y: 0}],
            "enemyType": MyGame.components.Types.Flagship,
            "delayBetween": 150
        }, {
            "beginTime": 7000,
            "pattern": [
                { x: -16, y: 650 },
                { x: 40, y: 630 },
                { x: 120, y: 580 },
                { x: 200, y: 520 },
                { x: 242, y: 492 },

                { x: 260, y: 450 },
                { x: 242, y: 408 },
                { x: 200, y: 390 },
                { x: 158, y: 408 },

                { x: 140, y: 450 },
                { x: 158, y: 492 },
                { x: 200, y: 510 },
                { x: 242, y: 492 },
                { x: 260, y: 450 },

                { x: 270, y: 330 },
                { x: 270, y: 300 }
            ],
            "enemyPositions": [{x: 3, y: 1}, {x: 6, y: 1}, {x: 3, y: 2}, {x: 6, y: 2}],
            "enemyType": MyGame.components.Types.Butterfly,
            "delayBetween": 150
        }, {
            "beginTime": 12000,
            "pattern": [
                { x: 616, y: 700 },
                { x: 560, y: 680 },
                { x: 480, y: 640 },
                { x: 400, y: 580 },
                { x: 360, y: 540 },

                { x: 310, y: 450 },
                { x: 336, y: 386 },
                { x: 400, y: 360 },
                { x: 464, y: 386 },
                { x: 490, y: 450 },
                { x: 464, y: 514 },
                { x: 400, y: 540 },
                { x: 336, y: 514 },

                { x: 280, y: 400 },
                { x: 270, y: 350 }
            ],
            "enemyPositions": [{x: 1, y: 1}, {x: 2, y: 1}, {x: 1, y: 2}, {x: 2, y: 2}],
            "enemyType": MyGame.components.Types.Butterfly,
            "delayBetween": 150
        }, {
            "beginTime": 12000,
            "pattern": [
                { x: 616, y: 650 },
                { x: 560, y: 630 },
                { x: 480, y: 580 },
                { x: 400, y: 520 },
                { x: 358, y: 492 },

                { x: 340, y: 450 },
                { x: 358, y: 408 },
                { x: 400, y: 390 },
                { x: 442, y: 408 },

                { x: 460, y: 450 },
                { x: 442, y: 492 },
                { x: 400, y: 510 },
                { x: 358, y: 492 },
                { x: 340, y: 450 },

                { x: 330, y: 330 },
                { x: 330, y: 300 }
            ],
            "enemyPositions": [{x: 7, y: 1}, {x: 8, y: 1}, {x: 7, y: 2}, {x: 8, y: 2}],
            "enemyType": MyGame.components.Types.Butterfly,
            "delayBetween": 150
        }, {
            "beginTime": 17000,
            "pattern": [
                { x: 350, y: -16 },
                { x: 350, y: 40 },
                { x: 330, y: 110 },
                { x: 270, y: 170 },

                { x: 210, y: 230 },
                { x: 150, y: 280 },
                { x: 100, y: 310 },
                { x: 70, y: 350 },

                { x: 60, y: 400 },
                { x: 75, y: 450 },
                { x: 100, y: 475 },
                { x: 150, y: 490 },
                { x: 200, y: 475 },
                { x: 225, y: 450 },
                { x: 240, y: 400 },

                { x: 270, y: 350 }
            ],
            "enemyPositions": [{x: 2, y: 3}, {x: 3, y: 3}, {x: 2, y: 4}, {x: 3, y: 4}],
            "enemyType": MyGame.components.Types.Bee,
            "delayBetween": 150
        }, {
            "beginTime": 17000,
            "pattern": [
                { x: 300, y: -16 },
                { x: 300, y: 40 },
                { x: 282, y: 100 },
                { x: 230, y: 160 },

                { x: 170, y: 220 },
                { x: 120, y: 260 },
                { x: 60, y: 300 },
                { x: 40, y: 340 },

                { x: 30, y: 400 },
                { x: 50, y: 467 },
                { x: 83, y: 500 },
                { x: 150, y: 520 },
                { x: 217, y: 500 },
                { x: 250, y: 467 },
                { x: 290, y: 400 },

                { x: 330, y: 350 }
            ],
            "enemyPositions": [{x: 6, y: 3}, {x: 7, y: 3}, {x: 6, y: 4}, {x: 7, y: 4}],
            "enemyType": MyGame.components.Types.Bee,
            "delayBetween": 150
        }, {
            "beginTime": 22000,
            "pattern": [
                { x: 250, y: -16 },
                { x: 250, y: 40 },
                { x: 270, y: 110 },
                { x: 330, y: 170 },

                { x: 390, y: 230 },
                { x: 450, y: 280 },
                { x: 500, y: 310 },
                { x: 530, y: 350 },

                { x: 540, y: 400 },
                { x: 525, y: 450 },
                { x: 500, y: 475 },
                { x: 450, y: 490 },
                { x: 400, y: 475 },
                { x: 375, y: 450 },
                { x: 360, y: 400 },

                { x: 330, y: 350 }
            ],
            "enemyPositions": [{x: 8, y: 3}, {x: 9, y: 3}, {x: 8, y: 4}, {x: 9, y: 4}],
            "enemyType": MyGame.components.Types.Bee,
            "delayBetween": 150
        }, {
            "beginTime": 22000,
            "pattern": [
                { x: 300, y: -16 },
                { x: 300, y: 40 },
                { x: 318, y: 100 },
                { x: 370, y: 160 },

                { x: 430, y: 220 },
                { x: 480, y: 260 },
                { x: 540, y: 300 },
                { x: 560, y: 340 },

                { x: 570, y: 400 },
                { x: 550, y: 467 },
                { x: 517, y: 500 },
                { x: 450, y: 520 },
                { x: 383, y: 500 },
                { x: 350, y: 467 },
                { x: 310, y: 400 },

                { x: 270, y: 350 }
            ],
            "enemyPositions": [{x: 0, y: 3}, {x: 1, y: 3}, {x: 0, y: 4}, {x: 1, y: 4}],
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
        if (stageTime > 30000 && spec.enemiesKilled()){
            spec.reportEvent({
                type: MyGame.enums.Event.StageComplete
            });
        }
        else if (stageTime > (30000 + 5000 * attackCount)) {
            spec.reportEvent({
                type: MyGame.enums.Event.Attack,
                count: 2
            });
            attackCount += 1;
        }
    }

    return that;
}