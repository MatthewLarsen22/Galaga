// ------------------------------------------------------------------
//
// Rendering function for a /Components/SpaceShip object.
//
// ------------------------------------------------------------------
MyGame.renderer.EnemyMissile = (function(core) {
    'use strict';
    let that = {};

    // ------------------------------------------------------------------
    //
    // Renders a Character model.
    //
    // ------------------------------------------------------------------
    that.render = function(model) {
        core.saveContext();
        core.rotateCanvas(model.center, model.rotation);

        MyGame.renderer.Sprite.render(model.sprite);

        // This undoes the rotation very quickly
        core.restoreContext();
    };

    return that;
}(MyGame.renderer.core));