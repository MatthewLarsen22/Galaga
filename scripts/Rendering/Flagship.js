// ------------------------------------------------------------------
//
// Rendering function for a /Components/Butterfly object.
//
// ------------------------------------------------------------------
MyGame.renderer.Flagship = (function(core) {
    'use strict';
    let that = {};

    let rows = 2;
    let cols = 2;
    let animationTimes = [[500, 500], [500, 500]]

    let col = 0;
    let animationTime = 0;

    that.update = function(model, elapsedTime) {
        animationTime += elapsedTime;
        if (animationTime >= animationTimes[2 - model.lives][col]) {
            animationTime -= animationTimes[2 - model.lives][col];
            col++;
            if (col === cols) {
                col = 0;
            }
        }
    }

    // ------------------------------------------------------------------
    //
    // Renders a Butterfly model.
    //
    // ------------------------------------------------------------------
    that.render = function(model) {
        core.saveContext();
        core.rotateCanvas(model.center, model.orientation);

        MyGame.renderer.AnimatedModel.render(model.sprite, 2 - model.lives, col, rows, cols);



        // This undoes the rotation very quickly
        core.restoreContext();
    };

    return that;
}(MyGame.renderer.core));