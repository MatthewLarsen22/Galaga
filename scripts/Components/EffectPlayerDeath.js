//------------------------------------------------------------------
//
// Creates an explosion effect used when an enemy explodes.
// The spec is defined as:
// {
//        center: { x: , y: },
//        howMany:                 // How many particles to emit
// }
//
//------------------------------------------------------------------
MyGame.components.ParticleSystem.playerDeath = function(spec) {
    'use strict';
    let effect = { };

    effect.update = function() {
        for (let particle = 0; particle < spec.howMany; particle += 1) {
            let size = Random.nextGaussian(10, 3)
            // Create a new explosion particle
            MyGame.components.ParticleSystem.createParticle({
                image: MyGame.assets['red-particle'],
                center: { x: spec.center.x, y: spec.center.y},
                size: size,
                direction: Random.nextCircleVector(),
                speed: (1 / size) - 0.025,
                rateRotation: (2 * Math.PI) / 1000,    // Radians per millisecond
                rotation: 0,
                lifetime: Random.nextGaussian(600, 150),
                alive: 0
            });
        }

        return false    // One time emit!
    };

    return MyGame.components.ParticleSystem.addEffect(effect);
};