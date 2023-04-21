// ------------------------------------------------------------------
//
// This namespace holds the type enumerations for the different components
// used by the gameplay code.
//
// ------------------------------------------------------------------
MyGame.components.Types = (function() {
    'use strict';
    let that = {
        get Undefined() { return 0; },
        get Character() { return 1; },
        get Missile() { return 2; },
        get Bee() { return 3; },
        get Butterfly() { return 4; },
        get Flagship() { return 5; }
    };

    return that;
}());