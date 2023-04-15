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

    let gameOver = false;

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

        handlerId = myKeyboard.registerHandler(function(elapsedTime) {
            character.moveLeft(elapsedTime);
        }, 'a', true);
        handlerIds.push({ key: 'a', handlerId: handlerId });

        handlerId = myKeyboard.registerHandler(function(elapsedTime) {
            character.moveRight(elapsedTime);
        }, 'd', true);
        handlerIds.push({ key: 'd', handlerId: handlerId });

        handlerId = myKeyboard.registerHandler(function(elapsedTime) {
            character.moveLeft(elapsedTime);
        }, 'ArrowLeft', true);
        handlerIds.push({ key: 'ArrowLeft', handlerId: handlerId });

        handlerId = myKeyboard.registerHandler(function(elapsedTime) {
            character.moveRight(elapsedTime);
        }, 'ArrowRight', true);
        handlerIds.push({ key: 'ArrowRight', handlerId: handlerId });

        return handlerIds;
    }

    // ------------------------------------------------------------------
    //
    // This function initializes the model.
    //
    // ------------------------------------------------------------------
    function initialize() {
        // let backgroundKey = 'background';
        //
        // // Define the TiledImage model we'll be using for our background.
        // background = components.TiledImage({
        //     pixel: { width: assets[backgroundKey].width, height: assets[backgroundKey].height },
        //     size: { width: world.width, height: world.height },
        //     tileSize: assets[backgroundKey].tileSize,00
        //     assetKey: backgroundKey
        // });

        //
        // Get our spaceship model and renderer created
        character = components.Character({
            size: { width: 20, height: 20 },
            center: { x: (renderer.core.canvas.width / 2), y: (renderer.core.canvas.height - 20) },
            velocity: { x: 5, y: 0 }
        });
        entities[nextEntityId++] = {
            model: character,
            renderer: renderer.Character
        };
        characterHandlerIds = registerCharacterKeyboardEvents(character);


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

    function reset() {
        MyGame.assets['audio-music-background'].pause();
        MyGame.assets['audio-music-background'].currentTime = 0;

        background = null;
        character = null;
        characterHandlerIds = undefined;
        nextEntityId = 0;
        entities = {};
        myKeyboard = input.Keyboard();

        unregisterCharacterKeyboardEvents();
    }

    return {
        initialize: initialize,
        processInput: processInput,
        update: update,
        render: render,
        reset: reset
    };

}(MyGame.input, MyGame.components, MyGame.renderer, MyGame.assets));