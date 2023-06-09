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
MyGame.components.Missile = function(spec) {
    'use strict';
    let that = MyGame.components.Entity(spec, 'missile');

    Object.defineProperty(that, 'type', {
        get: function() { return MyGame.components.Types.Missile; },
        enumerable: true,
        configurable: false
    });

    that.update = function(elapsedTime) {
        let dy = spec.velocity * elapsedTime;
        if ((that.center.y - dy) > 0 - spec.size.height){
            that.center.y -= dy;
        }
        else {
            spec.reportEvent({
                type: MyGame.enums.Event.MissileExitedScreen,
                model: that
            });
        }
    }

    that.checkForCollisions = function(entities) {
        for (let entityId in entities) {
            if(entities.hasOwnProperty(entityId)) {
                let entity = entities[entityId];
                if (that.intersects(entity.model)){
                    spec.reportEvent({
                        type:MyGame.enums.Event.MissileCollided,
                        model: that,
                        entity: entity
                    })
                }
            }
        }
    }

    return that;
};