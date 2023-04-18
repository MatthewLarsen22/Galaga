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
        get Butterfly() { return 3; }
    };

    return that;
}());