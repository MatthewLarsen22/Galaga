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

    that.rotation = 0;
    that.path = spec.line;
    that.pathIndex = 0;

    Object.defineProperty(that, 'type', {
        get: function() { return MyGame.components.Types.Butterfly; },
        enumerable: true,
        configurable: false
    });

    that.update = function(elapsedTime) {
        if (that.pathIndex < that.path.length - 1) {
            let distTraveled = that.velocity * elapsedTime;

            let distRemaining = MyGame.utilities.math.computeDistance(that.center.x, that.center.y, that.path[that.pathIndex + 1].x, that.path[that.pathIndex +1].y);
            if (distTraveled > distRemaining) {
                distTraveled -= distRemaining;

                //Move the ship to the end of the current line segment
                that.center.x = that.path[that.pathIndex + 1].x;
                that.center.y = that.path[that.pathIndex + 1].y;

                that.pathIndex += 1;
            }

            if (that.pathIndex < that.path.length - 1) {
                // Now, handle the distance along the current line segment
                // Start by computing the direction vector of the line
                let dirX = that.path[that.pathIndex + 1].x - that.center.x;
                let dirY = that.path[that.pathIndex + 1].y - that.center.y;

                //Normalize the vector
                let dirMag = Math.sqrt(dirX * dirX + dirY * dirY);
                dirX /= dirMag;
                dirY /= dirMag;

                // See how far along that vector the ship moved
                let moveX = distTraveled * dirX;
                let moveY = distTraveled * dirY;

                // Update the ship position with the movement distance
                that.center.x += moveX;
                that.center.y += moveY;

                that.rotation = MyGame.utilities.math.computeRotation(that.center.x, that.center.y, that.path[that.pathIndex + 1].x, that.path[that.pathIndex + 1].y)
            }
        }
        else {
            // For now, just set the rotation to 0
            that.rotation = 0;
        }
    }

    return that;
};