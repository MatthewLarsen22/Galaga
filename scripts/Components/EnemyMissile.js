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
MyGame.components.EnemyMissile = function(spec) {
    'use strict';
    let that = MyGame.components.Entity(spec, 'enemy-missile');
    that.rotation = Math.PI;

    Object.defineProperty(that, 'type', {
        get: function() { return MyGame.components.Types.EnemyMissile; },
        enumerable: true,
        configurable: false
    });

    that.update = function(elapsedTime) {
        let dy = spec.velocity * elapsedTime;
        if ((that.center.y + dy) < MyGame.renderer.core.canvas.height + spec.size.height){
            that.center.y += dy;
        }
        else {
            spec.reportEvent({
                type: MyGame.enums.Event.EnemyMissileExitedScreen,
                model: that
            });
        }
    }

    that.checkForCollisions = function(entity) {
        if (that.intersects(entity)){
            spec.reportEvent({
                type:MyGame.enums.Event.EnemyMissileCollided,
                model: that,
                entity: entity
            })
        }
    }

    return that;
};