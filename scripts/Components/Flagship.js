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
MyGame.components.Flagship = function(spec) {
    'use strict';
    let that = MyGame.components.Entity(spec, 'flagship');
    that.lives = 2;
    that.rotation = 0;
    that.path = spec.line;
    that.pathIndex = 0;

    that.attacking = false;
    let attackPath = [
        { x: 300, y: 300 },
        { x: 300, y: 600 },
        that.path[that.path.length - 1]
    ];
    let attackIndex = 0;

    that.attack = function() {
        that.attacking = true;
    }

    Object.defineProperty(that, 'type', {
        get: function() { return MyGame.components.Types.Flagship; },
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
        else if (that.attacking && attackIndex < attackPath.length - 1) {
            // Attack
            let distTraveled = that.velocity * elapsedTime;

            let distRemaining = MyGame.utilities.math.computeDistance(that.center.x, that.center.y, attackPath[attackIndex + 1].x, attackPath[attackIndex +1].y);
            if (distTraveled > distRemaining) {
                distTraveled -= distRemaining;

                //Move the ship to the end of the current line segment
                that.center.x = attackPath[attackIndex + 1].x;
                that.center.y = attackPath[attackIndex + 1].y;

                attackIndex += 1;
                if (attackIndex === 1){
                    spec.reportEvent({
                        type: MyGame.enums.Event.EnemyMissileFired,
                        center: {x: that.center.x, y: that.center.y + (that.size.height / 2)},
                        target: {x: 300, y: 850}
                    });
                }
            }

            if (attackIndex < attackPath.length - 1) {
                // Now, handle the distance along the current line segment
                // Start by computing the direction vector of the line
                let dirX = attackPath[attackIndex + 1].x - that.center.x;
                let dirY = attackPath[attackIndex + 1].y - that.center.y;

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

                that.rotation = MyGame.utilities.math.computeRotation(that.center.x, that.center.y, attackPath[attackIndex + 1].x, attackPath[attackIndex + 1].y)
            }
        }
        else {
            if (that.attacking) {
                that.attacking = false;
                attackIndex = 0;
            }
            // For now, just set the rotation to 0
            that.rotation = 0;
        }
    }

    return that;
};