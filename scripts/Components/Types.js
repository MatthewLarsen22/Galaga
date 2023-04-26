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
        get EnemyMissile() { return 3; },
        get Bee() { return 4; },
        get Butterfly() { return 5; },
        get Flagship() { return 6; }
    };

    return that;
}());