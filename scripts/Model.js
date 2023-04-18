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

    let butterfly = null;
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
            velocity: 5,
            reportEvent
        });
        entities[nextEntityId++] = {
            model: character,
            renderer: renderer.Character
        };
        characterHandlerIds = registerCharacterKeyboardEvents(character);

        butterfly = components.Butterfly({
            size: { width: 32, height: 32 },
            center: { x: (renderer.core.canvas.width / 2), y: (renderer.core.canvas.height / 2) },
            velocity: 5,
            reportEvent
        });
        entities[nextEntityId++] = {
            model: butterfly,
            renderer: renderer.Butterfly
        };


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

        for (let entityId in entities) {
            if(entities.hasOwnProperty(entityId)) {
                let entity = entities[entityId];
                entity.model.update(elapsedTime);
                if (entity.renderer.update) {
                    entity.renderer.update(entity.model, elapsedTime);
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
        switch (info.type) {
            case MyGame.enums.Event.MissileFired:
                createMissile(info);
                break;
            case MyGame.enums.Event.MissileExitedScreen:
                // Remove missiles that have left the screen
                const entityArray = Object.entries(entities);
                const filteredArray = entityArray.filter(([entityId, entity]) => entity.model !== info.model)
                entities = Object.fromEntries(filteredArray);
                break;
        }
    }

    function createMissile(info) {
        let missile = components.Missile({
            size: { width: 32, height: 32 },
            center: { x: info.center.x, y: info.center.y },
            velocity: 2,
            reportEvent
        });
        entities[nextEntityId++] = {
            model: missile,
            renderer: renderer.Missile
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