//------------------------------------------------------------------
//
// Defines a Character component.  A Character contains a sprite.
// The spec is defined as:
//    {
//        center: { x: , y: }          // In world coordinates
//        size: { width: , height: }   // In world coordinates
//        velocity:                    // In world coordinates
//    }
//
//------------------------------------------------------------------
MyGame.components.Character = function(spec) {
    'use strict';
    let that = MyGame.components.Entity(spec, 'character');
    let missileCooldown = 0;

    Object.defineProperty(that, 'type', {
        get: function() { return MyGame.components.Types.Character; },
        enumerable: true,
        configurable: false
    });

    that.moveLeft = function(elapsedTime) {
        let dx = (elapsedTime / spec.velocity )
        if (that.center.x - dx > that.size.width / 2){
            that.center.x -= dx;
        }
    }

    that.moveRight = function(elapsedTime) {
        let dx = (elapsedTime / spec.velocity )
        if ((that.center.x +  dx) < MyGame.renderer.core.canvas.width - that.size.width / 2){
            that.center.x += dx;
        }
    }

    that.fireMissile = function() {
        if (missileCooldown <= 0) {
            missileCooldown = 250;
            spec.reportEvent({
                type: MyGame.enums.Event.MissileFired,
                center: {x: that.center.x, y: that.center.y - (that.size.height / 2)}
            });
        }
    }

    that.update = function(elapsedTime) {
        missileCooldown -= elapsedTime;
    }

    return that;
};