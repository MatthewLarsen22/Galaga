// ------------------------------------------------------------------
//
// Rendering function for a /Components/Text object.
//
// ------------------------------------------------------------------
MyGame.renderer.GameOver = (function(core) {
    'use strict';
    let that = {};

    that.render = function(shotsFired, hits) {
        core.drawText({
            font: "30px Trebuchet MS",
            fill: "rgb(255, 0, 0)",
            text: "Game Over",
            position: {x: 260, y: 300 }
        });

        core.drawText({
            font: "20px Trebuchet MS",
            fill: "rgb(255, 255, 255)",
            text: "Shots Fired: " + shotsFired,
            position: {x: 260, y: 330 }
        });

        core.drawText({
            font: "20px Trebuchet MS",
            fill: "rgb(255, 255, 255)",
            text: "Number of Hits: " + hits,
            position: {x: 260, y: 360 }
        });

        core.drawText({
            font: "20px Trebuchet MS",
            fill: "rgb(255, 255, 255)",
            text: "Hit/Miss: " + Math.round(100 * hits/(shotsFired - hits)) + "%",
            position: {x: 260, y: 390 }
        });
    };

    return that;
}(MyGame.renderer.core));