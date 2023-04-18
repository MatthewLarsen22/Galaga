//------------------------------------------------------------------
//
// Defines a Character component.  A Character contains a sprite.
// The spec is defined as:
//    {
//        center: { x: , y: }          // In world coordinates
//        size: { width: , height: }   // In world coordinates
//        velocity:        // In world coordinates
//    }
//
//------------------------------------------------------------------
MyGame.components.Butterfly = function(spec) {
    'use strict';
    let that = MyGame.components.Entity(spec, 'butterfly');

    Object.defineProperty(that, 'type', {
        get: function() { return MyGame.components.Types.Butterfly; },
        enumerable: true,
        configurable: false
    });

    that.update = function(elapsedTime) {
        //Do nothing for now
    }

    return that;
};