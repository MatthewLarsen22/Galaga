// ------------------------------------------------------------------
//
// Rendering function for an /Components/Sprite object.
//
// ------------------------------------------------------------------
MyGame.renderer.AnimatedModel = (function(core) {
    'use strict';
    let that = {};

    that.render = function(sprite, row, col, rows, cols) {
        //
        // Pick the selected sprite from the sprite sheet to render
        core.drawImage(
            sprite.image,
            col * sprite.image.width / cols,
            row * sprite.image.height / rows,
            sprite.image.width / cols,
            sprite.image.height / rows,
            sprite.center.x - sprite.width / 2,        // Where to draw the sprite
            sprite.center.y - sprite.height / 2,
            sprite.width, sprite.height);

        // core.drawRectangle(
        //     '#FF0000',
        //     sprite.center.x - sprite.width / 2,
        //     sprite.center.y - sprite.height / 2,
        //     sprite.width, sprite.height, true);
    };

    return that;
}(MyGame.renderer.core));

//     function render(model) {
//         if (isReady) {
//             graphics.drawSubTexture(image, actionIndex, frameIndex, subTextureWidth, subTextureHeight, model.center, model.rotation, model.size);
//         }
//     }