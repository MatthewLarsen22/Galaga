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

    let stage = null;
    let gameOver = false;
    function reset() {
        MyGame.assets['audio-music-background'].pause();
        MyGame.assets['audio-music-background'].currentTime = 0;

        background = null;
        character = null;
        characterHandlerIds = undefined;
        nextEntityId = 0;
        entities = {};
        myKeyboard = input.Keyboard();

        let gameOver = false;

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
            center: { x: (renderer.core.canvas.width / 2), y: (renderer.core.canvas.height - 50) },
            velocity: 300/1000,
            reportEvent
        });
        entities[nextEntityId++] = {
            model: character,
            renderer: renderer.Character
        };
        characterHandlerIds = registerCharacterKeyboardEvents(character);

        stage = MyGame.stages.Stage1({
            createBee,
            createButterfly,
            createFlagship
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

        // Check to see if any enemies were hit by a missile.
        const entityArray = Object.entries(entities);
        const filteredArray = entityArray.filter(([entityId, entity]) => entity.model.type > 2);
        let enemies = Object.fromEntries(filteredArray);
        for (let entityId in entities) {
            if(entities.hasOwnProperty(entityId)) {
                let entity = entities[entityId];
                if(entity.model.type === MyGame.components.Types.Missile){
                    entity.model.checkForCollisions(enemies);
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
                const soundEffect = new Audio(MyGame.assets['missile-launched'].src);
                soundEffect.volume = 0.2;
                soundEffect.play();

                createMissile(info);
                break;
            case MyGame.enums.Event.MissileExitedScreen:
                // Remove missiles that have left the screen
                entityArray = Object.entries(entities);
                filteredArray = entityArray.filter(([entityId, entity]) => entity.model !== info.model);
                entities = Object.fromEntries(filteredArray);
                break;
            case MyGame.enums.Event.MissileCollided:
                // Remove the missile and the enemy that it collided with
                if (info.entity.model.type === MyGame.components.Types.Flagship && info.entity.model.lives === 2) {
                    // If this was a flagship on their first life, simply take a life away and remove the missile
                    info.entity.model.lives -= 1;

                    entityArray = Object.entries(entities);
                    filteredArray = entityArray.filter(([entityId, entity]) => entity.model !== info.model);
                    entities = Object.fromEntries(filteredArray);
                }
                else {
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
        }
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
            leftKey = 'ArrowRight'
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