// ------------------------------------------------------------------
//
// Rendering function for the background
//
// ------------------------------------------------------------------
MyGame.renderer.core.drawBackground = function() {
    'use strict';
    let core = MyGame.renderer.core;

    core.drawImage(
        MyGame.assets['background'],
        0,
        0,
        core.canvas.width, core.canvas.height);
};