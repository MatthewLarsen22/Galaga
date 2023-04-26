// ------------------------------------------------------------------
//
// This namespace holds the rotate to point demo model.
//
// ------------------------------------------------------------------
MyGame.model = (function(input, components, renderer, assets) {
    'use strict';
    let background = null;
    let character = null;
    let characterHandlerIds = undefined;
    let nextEntityId = 0;
    let entities = {};
    let myKeyboard = input.Keyboard();

    let nextLifeId = 0;
    let lives = {};

    let stage = null;
    let stageNumber = 0;
    let score = 0;
    let gameOver = false;
    let shotsFired = 0;
    let hits = 0;
    function reset() {
        MyGame.assets['audio-music-background'].pause();
        MyGame.assets['audio-music-background'].currentTime = 0;

        background = null;
        character = null;
        characterHandlerIds = undefined;
        nextEntityId = 0;
        entities = {};
        myKeyboard = input.Keyboard();

        nextLifeId = 0;
        lives = {};

        stage = null;
        stageNumber = 0;
        score = 0;
        gameOver = false;
        shotsFired = 0;
        hits = 0;

        unregisterCharacterKeyboardEvents();
    }

    // ------------------------------------------------------------------
    //
    // This function initializes the model.
    //
    // ------------------------------------------------------------------
    function initialize() {
        //
        // Get our spaceship model and renderer created
        character = components.Character({
            size: { width: 32, height: 32 },
            center: { x: (renderer.core.canvas.width / 2), y: (renderer.core.canvas.height - 56) },
            velocity: 300/1000,
            reportEvent
        });
        entities[nextEntityId++] = {
            model: character,
            renderer: renderer.Character
        };
        characterHandlerIds = registerCharacterKeyboardEvents(character);

        let life = components.Character({
            size: {width: 32, height: 32 },
            center: { x: 20, y: (renderer.core.canvas.height - 20) },
            velocity: 0,
            reportEvent: null
        });
        lives[nextLifeId++] = {
            model: life,
            renderer: renderer.Character
        }

        let life2 = components.Character({
            size: {width: 32, height: 32 },
            center: { x: 56, y: (renderer.core.canvas.height - 20) },
            velocity: 0,
            reportEvent: null
        });
        lives[nextLifeId++] = {
            model: life2,
            renderer: renderer.Character
        }

        stage = MyGame.stages.Stage1({
            createBee,
            createButterfly,
            createFlagship,
            reportEvent,
            enemiesKilled
        });


        // Start the background music.
        MyGame.assets['audio-music-background'].loop = true;
        MyGame.assets['audio-music-background'].volume = 0.5;
        MyGame.assets['audio-music-background'].play();
    }

    // ------------------------------------------------------------------
    //
    // Process all input for the model here.
    //
    // ------------------------------------------------------------------
    function processInput(elapsedTime) {
        myKeyboard.update(elapsedTime);
    }

    // ------------------------------------------------------------------
    //
    // This function is used to update the state of the demo model.
    //
    // ------------------------------------------------------------------
    function update(elapsedTime) {
        if (gameOver) {
            return;
        }

        components.ParticleSystem.update(elapsedTime);

        if (stage) {
            stage.update(elapsedTime);
        }

        for (let entityId in entities) {
            if(entities.hasOwnProperty(entityId)) {
                let entity = entities[entityId];
                entity.model.update(elapsedTime);
                if (entity.renderer.update) {
                    entity.renderer.update(entity.model, elapsedTime);
                }
            }
        }

        // Check to see if anybody was hit by a missile.
        const entityArray = Object.entries(entities);
        const filteredArray = entityArray.filter(([entityId, entity]) => entity.model.type > 3);
        let enemies = Object.fromEntries(filteredArray);
        for (let entityId in entities) {
            if(entities.hasOwnProperty(entityId)) {
                let entity = entities[entityId];
                if(entity.model.type === MyGame.components.Types.Missile){
                    entity.model.checkForCollisions(enemies);
                }
                if (entity.model.type === MyGame.components.Types.EnemyMissile) {
                    entity.model.checkForCollisions(character);
                }
            }
        }
    }

    // ------------------------------------------------------------------
    //
    // This function renders the demo model.
    //
    // ------------------------------------------------------------------
     function render(elapsedTime) {
        if (gameOver){
            MyGame.renderer.GameOver.render(shotsFired, hits);
            return;
        }

        MyGame.renderer.Score.render(score);

        for (let lifeId in lives) {
            if (lives.hasOwnProperty(lifeId)){
                let life = lives[lifeId];
                life.renderer.render(life.model, elapsedTime);
            }
        }

        for (let entityId in entities) {
            if(entities.hasOwnProperty(entityId)) {
                let entity = entities[entityId];
                entity.renderer.render(entity.model, elapsedTime);
            }
        }

        renderer.ParticleSystem.render(components.ParticleSystem);
    }

    // --------------------------------------------------------------
    //
    // Interface that allows systems to report events back to the overall
    // game model for processing.
    //
    // --------------------------------------------------------------
    function reportEvent(info) {
        let entityArray;
        let filteredArray;
        switch (info.type) {
            case MyGame.enums.Event.MissileFired:
                shotsFired += 1;

                const soundEffect = new Audio(MyGame.assets['missile-launched'].src);
                soundEffect.volume = 0.2;
                soundEffect.play();

                createMissile(info);
                break;
            case MyGame.enums.Event.MissileExitedScreen || MyGame.enums.Event.EnemyMissileExitedScreen:
                // Remove missiles that have left the screen
                entityArray = Object.entries(entities);
                filteredArray = entityArray.filter(([entityId, entity]) => entity.model !== info.model);
                entities = Object.fromEntries(filteredArray);
                break;
            case MyGame.enums.Event.MissileCollided:
                hits += 1;

                // Remove the missile and the enemy that it collided with
                if (info.entity.model.type === MyGame.components.Types.Flagship && info.entity.model.lives === 2) {
                    // If this was a flagship on their first life, simply take a life away and remove the missile
                    info.entity.model.lives -= 1;

                    entityArray = Object.entries(entities);
                    filteredArray = entityArray.filter(([entityId, entity]) => entity.model !== info.model);
                    entities = Object.fromEntries(filteredArray);
                }
                else {
                    if (info.entity.model.attacking){
                        switch (info.entity.model.type){
                            case MyGame.components.Types.Bee:
                                score += 100;
                                break;
                            case MyGame.components.Types.Butterfly:
                                score += 160;
                                break;
                            case MyGame.components.Types.Flagship:
                                score += 400;
                                break;
                        }
                    }
                    else {
                        switch (info.entity.model.type){
                            case MyGame.components.Types.Bee:
                                score += 50;
                                break;
                            case MyGame.components.Types.Butterfly:
                                score += 80;
                                break;
                            case MyGame.components.Types.Flagship:
                                score += 150;
                                break;
                        }
                    }

                    // Otherwise, remove the missile and the enemy
                    entityArray = Object.entries(entities);
                    filteredArray = entityArray.filter(([entityId, entity]) => entity.model !== info.model && entity.model !== info.entity.model);
                    entities = Object.fromEntries(filteredArray);

                    const soundEffect = new Audio(MyGame.assets['explosion'].src);
                    soundEffect.volume = 0.2;
                    soundEffect.play();

                    MyGame.components.ParticleSystem.enemyDeath({
                        center: info.entity.model.center,
                        howMany: 250
                    });
                }
                break;
            case MyGame.enums.Event.EnemyMissileFired:
                createEnemyMissile(info);
                break;
            case MyGame.enums.Event.EnemyMissileCollided:
                unregisterCharacterKeyboardEvents();
                // Otherwise, remove the missile and the character
                entityArray = Object.entries(entities);
                filteredArray = entityArray.filter(([entityId, entity]) => entity.model !== info.model && entity.model !== info.entity);
                entities = Object.fromEntries(filteredArray);

                const se = new Audio(MyGame.assets['explosion'].src);
                se.volume = 0.2;
                se.play();

                MyGame.components.ParticleSystem.playerDeath({
                    center: info.entity.center,
                    howMany: 250
                });

                if (lives['1']) {
                    delete lives['1'];

                    character = components.Character({
                        size: { width: 32, height: 32 },
                        center: { x: (renderer.core.canvas.width / 2), y: (renderer.core.canvas.height - 56) },
                        velocity: 300/1000,
                        reportEvent
                    });
                    entities[nextEntityId++] = {
                        model: character,
                        renderer: renderer.Character
                    };
                    characterHandlerIds = registerCharacterKeyboardEvents(character);
                }
                else if (lives[0]) {
                    delete lives['0'];

                    character = components.Character({
                        size: { width: 32, height: 32 },
                        center: { x: (renderer.core.canvas.width / 2), y: (renderer.core.canvas.height - 56) },
                        velocity: 300/1000,
                        reportEvent
                    });
                    entities[nextEntityId++] = {
                        model: character,
                        renderer: renderer.Character
                    };
                    characterHandlerIds = registerCharacterKeyboardEvents(character);
                }
                else {
                    gameOver = true;

                    let highScores = localStorage.getItem("high-scores");
                    if (highScores) {
                        highScores = highScores.split(",");
                        for (let i = highScores.length - 1; i > -1; i--){
                            if (parseInt(highScores[i]) > score){
                                highScores.splice(i + 1, 0, score.toString())
                                break;
                            }
                        }
                        let newHighScores = ""
                        for (let i = 0; i < highScores.length; i++) {
                            if (i === 0){
                                newHighScores = newHighScores.concat(highScores[i]);
                            }
                            else {
                                newHighScores = newHighScores.concat(",", highScores[i]);
                            }
                        }
                        localStorage.setItem("high-scores", newHighScores);
                    }
                    else {
                        localStorage.setItem("high-scores", score.toString());
                    }
                }

                break;
            case MyGame.enums.Event.StageComplete:
                nextStage(info);
                break;
            case MyGame.enums.Event.Attack:
                attack(info);
                break;

        }
    }

    function attack(info) {
        let count = 0;
        for (let entityId in entities) {
            if(entities.hasOwnProperty(entityId)) {
                let entity = entities[entityId];
                if(entity.model.type > 3 && count < info.count){
                    entity.model.attack();
                    count++;
                }
            }
        }
    }

    function enemiesKilled() {
        for (let entityId in entities) {
            if(entities.hasOwnProperty(entityId)) {
                let entity = entities[entityId];
                if(entity.model.type > 3){
                    return false;
                }
            }
        }
        return true;
    }

    function clearEnemies() {
        const entityArray = Object.entries(entities);
        const filteredArray = entityArray.filter(([entityId, entity]) => entity.model.type < 4);
        entities = Object.fromEntries(filteredArray);
    }

    function nextStage(info) {
        if (stageNumber % 3 === 0) {
            stage = MyGame.stages.Stage2({
                createBee,
                createButterfly,
                createFlagship,
                reportEvent,
                enemiesKilled
            });
        }
        else if (stageNumber % 3 === 1) {
            stage = MyGame.stages.ChallengingStage({
                createBee,
                createButterfly,
                createFlagship,
                reportEvent
            });
        }
        else {
            clearEnemies();
            stage = MyGame.stages.Stage1({
                createBee,
                createButterfly,
                createFlagship,
                reportEvent,
                enemiesKilled
            });
        }
        stageNumber += 1;
    }

    function createMissile(info) {
        let missile = components.Missile({
            size: { width: 32, height: 32 },
            center: { x: info.center.x, y: info.center.y },
            velocity: 800/1000,
            reportEvent
        });
        entities[nextEntityId++] = {
            model: missile,
            renderer: renderer.Missile
        };
    }

    function createEnemyMissile(info) {
        let enemyMissile = components.EnemyMissile({
            size: { width: 32, height: 32 },
            center: { x: info.center.x, y: info.center.y },
            velocity: 400/1000,
            reportEvent
        });
        entities[nextEntityId++] = {
            model: enemyMissile,
            renderer: renderer.EnemyMissile
        };
    }

    function createButterfly(entryPattern, finalPosition) {
        let line = [...entryPattern];
        line.push({x: (finalPosition.x * 40) + 120, y: (finalPosition.y * 40) + 120})
        let butterfly = MyGame.components.Butterfly({
            size: {width: 32, height: 32},
            center: {x: line[0].x, y: line[0].y},
            velocity: 300 / 1000,
            line,
            reportEvent
        });
        entities[nextEntityId++] = {
            model: butterfly,
            renderer: MyGame.renderer.Butterfly
        };
    }

    function createBee(entryPattern, finalPosition) {
        let line = [...entryPattern];
        line.push({x: (finalPosition.x * 40) + 120, y: (finalPosition.y * 40) + 120})
        let bee = MyGame.components.Bee({
            size: {width: 32, height: 32},
            center: {x: line[0].x, y: line[0].y},
            velocity: 300 / 1000,
            line,
            reportEvent
        });
        entities[nextEntityId++] = {
            model: bee,
            renderer: MyGame.renderer.Bee
        };
    }

    function createFlagship(entryPattern, finalPosition) {
        let line = [...entryPattern];
        line.push({x: (finalPosition.x * 40) + 120, y: (finalPosition.y * 40) + 120})
        let flagship = MyGame.components.Flagship({
            size: {width: 32, height: 32},
            center: {x: line[0].x, y: line[0].y},
            velocity: 300 / 1000,
            line,
            reportEvent
        });
        entities[nextEntityId++] = {
            model: flagship,
            renderer: MyGame.renderer.Flagship
        };
    }

    // ------------------------------------------------------------------
    //
    // Unregister the various keyboard events.
    //
    // ------------------------------------------------------------------
    function unregisterCharacterKeyboardEvents() {
        for (let item in characterHandlerIds) {
            if (characterHandlerIds.hasOwnProperty(item)) {
                let entry = characterHandlerIds[item];
                myKeyboard.unregisterHandler(entry.key, entry.handlerId);
            }
        }
    }

    // ------------------------------------------------------------------
    //
    // Register the various keyboard events.
    //
    // ------------------------------------------------------------------
    function registerCharacterKeyboardEvents(character) {
        let handlerIds = [];
        let handlerId;

        let leftKey = localStorage.getItem("left-key");
        let rightKey = localStorage.getItem("right-key");
        let fireKey = localStorage.getItem("fire-key");

        if (!leftKey) {
            leftKey = 'ArrowLeft'
        }
        if (!rightKey) {
            rightKey = 'ArrowRight'
        }
        if (!fireKey) {
            fireKey = ' ';
        }

        handlerId = myKeyboard.registerHandler(function(elapsedTime) {
            character.moveLeft(elapsedTime);
        }, leftKey, true);
        handlerIds.push({ key: leftKey, handlerId: handlerId });

        handlerId = myKeyboard.registerHandler(function(elapsedTime) {
            character.moveRight(elapsedTime);
        }, rightKey, true);
        handlerIds.push({ key: rightKey, handlerId: handlerId });

        handlerId = myKeyboard.registerHandler(function() {
            character.fireMissile();
        }, fireKey, true);
        handlerIds.push({ key: fireKey, handlerId: handlerId });

        return handlerIds;
    }

    return {
        initialize: initialize,
        processInput: processInput,
        update: update,
        render: render,
        reset: reset
    };

}(MyGame.input, MyGame.components, MyGame.renderer, MyGame.assets));