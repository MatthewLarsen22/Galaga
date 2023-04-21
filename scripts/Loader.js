let MyGame = {
    screens : {},
    input: {},
    components: {},
    renderer: {},
    utilities: {},
    assets: {},
    enums: {}
};

//------------------------------------------------------------------
//
// Purpose of this code is to bootstrap (maybe I should use that as the name)
// the rest of the application.  Only this file is specified in the index.html
// file, then the code in this file gets all the other code and assets
// loaded.
//
//------------------------------------------------------------------


// <script src="scripts/Screens/Manager.js"></script>
//
// <script src="scripts/Screens/Credits.js"></script>
// <script src="scripts/Screens/GamePlay.js"></script>
// <script src="scripts/Screens/HighScores.js"></script>
// <script src="scripts/Screens/MainMenu.js"></script>

MyGame.loader = (function() {
    'use strict';
    let scriptOrder = [{
        scripts: ['Utilities/Math', 'Utilities/Random'],
        message: 'Utilities loaded',
        onComplete: null
    }, {
        scripts: ['Enums'],
        message: 'Enums loaded',
        onComplete: null
    }, {
        scripts: ['Input/Keyboard'],
        message: 'Inputs loaded',
        onComplete: null
    }, {
        scripts: ['Components/Types'],
        message: 'Core Components loaded',
        onComplete: null
    },{
        scripts: ['Components/Text', 'Components/Sprite', 'Components/ParticleSystem'],
        message: 'Game Components loaded',
        onComplete: null
    }, {
        scripts: ['Components/Entity'],
        message: 'Base Entity class loaded',
        onComplete: null
    }, {
        scripts: ['Components/Bee', 'Components/Butterfly', 'Components/Character', 'Components/Flagship', 'Components/Missile'],
        message: 'Gameplay Components loaded',
        onComplete: null
    }, {
        scripts: ['Components/EffectEnemyDeath'],
        message: 'Particle Effect Components loaded',
        onComplete: null
    }, {
        scripts: ['Rendering/Core'],
        message: 'Rendering core loaded',
        onComplete: null
    }, {
        scripts: ['Rendering/AnimatedModel', 'Rendering/Background', 'Rendering/Text', 'Rendering/Sprite', 'Rendering/ParticleSystem'],
        message: 'Core Components Rendering loaded',
        onComplete: null
    }, {
        scripts: ['Rendering/Bee', 'Rendering/Butterfly', 'Rendering/Character', 'Rendering/Flagship', 'Rendering/Missile'],
        message: 'Gameplay Components Rendering loaded',
        onComplete: null
    }, {
        scripts: ['Model'],
        message: 'Model loaded',
        onComplete: null
    }, {
        scripts: ['Screens/Manager'],
        message: 'Screen Manager loaded',
        onComplete: null
    }, {
        scripts: ['Screens/Credits', 'Screens/GamePlay', 'Screens/HighScores', 'Screens/Settings', 'Screens/MainMenu'],
        message: 'Screens loaded',
        onComplete: null
    }];
    let assetOrder = [{
        key: 'character',
        source: './assets/graphics/Galaga_Fighter.png'
    }, {
        key: 'missile',
        source: './assets/graphics/Galaga_Missile.png'
    }, {
        key: 'bee',
        source: './assets/graphics/Galaga_Bee.png'
    }, {
        key: 'butterfly',
        source: './assets/graphics/Galaga_Butterfly.png'
    }, {
        key: 'flagship',
        source: './assets/graphics/Galaga_Flagship.png'
    }, {
        key: 'particle',
        source: './assets/graphics/particle.png'
    }, {
        key: 'background',
        source: './assets/graphics/background.jpg'
    }, {
        key: 'missile-launched',
        source: './assets/audio/missile-launched.mp3'
    }, {
        key: 'explosion',
        source: './assets/audio/explosion.mp3'
    }, {
        key: 'audio-music-background',
        source: './assets/audio/Eggsplosion.mp3'
    }];

    //------------------------------------------------------------------
    //
    // Helper function used to load scripts in the order specified by the
    // 'scripts' parameter.  'scripts' expects an array of objects with
    // the following format...
    //    {
    //        scripts: [script1, script2, ...],
    //        message: 'Console message displayed after loading is complete',
    //        onComplete: function to call when loading is complete, may be null
    //    }
    //
    //------------------------------------------------------------------
    function loadScripts(scripts, onComplete) {
        //
        // When we run out of things to load, that is when we call onComplete.
        if (scripts.length > 0) {
            let entry = scripts[0];
            require(entry.scripts, function() {
                console.log(entry.message);
                if (entry.onComplete) {
                    entry.onComplete();
                }
                scripts.splice(0, 1);
                loadScripts(scripts, onComplete);
            });
        } else {
            onComplete();
        }
    }

    //------------------------------------------------------------------
    //
    // Helper function used to load assets in the order specified by the
    // 'assets' parameter.  'assets' expects an array of objects with
    // the following format...
    //    {
    //        key: 'asset-1',
    //        source: 'asset/url/asset.png'
    //    }
    //
    // onSuccess is invoked per asset as: onSuccess(key, asset)
    // onError is invoked per asset as: onError(error)
    // onComplete is invoked once per 'assets' array as: onComplete()
    //
    //------------------------------------------------------------------
    function loadAssets(assets, onSuccess, onError, onComplete) {
        let entry = 0;
        //
        // When we run out of things to load, that is when we call onComplete.
        if (assets.length > 0) {
            entry = assets[0];
            loadAsset(entry.source,
                function(asset) {
                    onSuccess(entry, asset);
                    assets.splice(0, 1);
                    loadAssets(assets, onSuccess, onError, onComplete);
                },
                function(error) {
                    onError(error);
                    assets.splice(0, 1);
                    loadAssets(assets, onSuccess, onError, onComplete);
                });
        } else {
            onComplete();
        }
    }

    //------------------------------------------------------------------
    //
    // This function is used to asynchronously load image and audio assets.
    // On success the asset is provided through the onSuccess callback.
    // Reference: http://www.html5rocks.com/en/tutorials/file/xhr2/
    //
    //------------------------------------------------------------------
    function loadAsset(source, onSuccess, onError) {
        let xhr = new XMLHttpRequest();
        let fileExtension = source.substr(source.lastIndexOf('.') + 1);    // Source: http://stackoverflow.com/questions/680929/how-to-extract-extension-from-filename-string-in-javascript

        if (fileExtension) {
            xhr.open('GET', source, true);
            xhr.responseType = (fileExtension === 'txt') ? 'text' : 'blob';

            xhr.onload = function() {
                let asset = null;
                if (xhr.status === 200) {
                    if (fileExtension === 'png' || fileExtension === 'jpg') {
                        asset = new Image();
                    } else if (fileExtension === 'mp3') {
                        asset = new Audio();
                    } else if (fileExtension === 'txt') {
                        if (onSuccess) { onSuccess(xhr.responseText); }
                    }
                    else {
                        if (onError) { onError('Unknown file extension: ' + fileExtension); }
                    }
                    if (xhr.responseType === 'blob') {
                        if (fileExtension === 'mp3') {
                            asset.oncanplaythrough = function() {
                                window.URL.revokeObjectURL(asset.src);
                                if (onSuccess) { onSuccess(asset); }
                            };
                        }
                        else {  // not terrific assumption that it has an 'onload' event, but that is what we are doing
                            asset.onload = function() {
                                window.URL.revokeObjectURL(asset.src);
                                if (onSuccess) { onSuccess(asset); }
                            };
                        }
                        asset.src = window.URL.createObjectURL(xhr.response);
                    }
                } else {
                    if (onError) { onError('Failed to retrieve: ' + source); }
                }
            };
            xhr.send();
        } else {
            if (onError) { onError('Unknown file extension: ' + fileExtension); }
        }
    }

    //------------------------------------------------------------------
    //
    // Called when all the scripts are loaded, it kicks off the demo app.
    //
    //------------------------------------------------------------------
    function mainComplete() {
        console.log('it is all loaded up');
        MyGame.manager.initialize();
    }

    //
    // Start with loading the assets, then the scripts.
    console.log('Starting to dynamically load project assets');
    loadAssets(assetOrder,
        function(source, asset) {    // Store it on success
            MyGame.assets[source.key] = asset;
        },
        function(error) {
            console.log(error);
        },
        function() {
            console.log('All audio assets loaded');
            console.log('Starting to dynamically load project scripts');
            loadScripts(scriptOrder, mainComplete);
        }
    );
}());