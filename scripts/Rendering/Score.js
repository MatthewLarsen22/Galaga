// ------------------------------------------------------------------
//
// Rendering function for a /Components/Text object.
//
// ------------------------------------------------------------------
MyGame.renderer.Score = (function(core) {
    'use strict';
    let that = {};

    that.render = function(score) {
        core.drawText({
            font: "30px Trebuchet MS",
            fill: "rgb(255, 255, 255)",
            text: "Score: " + score,
            position: {x: 400, y: 0 }
        });
    };

    return that;
}(MyGame.renderer.core));