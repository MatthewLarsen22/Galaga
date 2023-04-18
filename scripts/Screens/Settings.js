// ----------------------------------------------------------------------------
//
// This file contains the settings page. It should allow the user to configure
// different settings such as gameplay controls and audio volume.
//
// ----------------------------------------------------------------------------
MyGame.screens['settings'] = (function(manager) {
    'use strict';

    // ------------------------------------------------------------------
    //
    // Called when the 'keyup' event is fired from the browser.  When
    // a key is released, we want to remove it from the set of keys currently
    // indicated as down.
    //
    // ------------------------------------------------------------------
    function setMoveLeftControl(event) {
        window.removeEventListener('keyup', setMoveLeftControl);
        window.localStorage.setItem("left-key", event.key);
        document.getElementById('id-settings-left-key').innerText = "'" + event.key + "'";
    }

    function setMoveRightControl(event) {
        window.removeEventListener('keyup', setMoveRightControl);
        window.localStorage.setItem("right-key", event.key);
        document.getElementById('id-settings-right-key').innerText = "'" + event.key + "'";
    }

    function setFireControl(event) {
        window.removeEventListener('keyup', setFireControl);
        window.localStorage.setItem("fire-key", event.key);
        document.getElementById('id-settings-fire-key').innerText = "'" + event.key + "'";
    }

    function initialize() {
        document.getElementById('id-settings-left-key').addEventListener(
            'click',
            function() { window.addEventListener('keyup', setMoveLeftControl); },
            {once: true});
        document.getElementById('id-settings-right-key').addEventListener(
            'click',
            function() { window.addEventListener('keyup', setMoveRightControl); },
            {once: true});
        document.getElementById('id-settings-fire-key').addEventListener(
            'click',
            function() { window.addEventListener('keyup', setFireControl); },
            {once: true});

        document.getElementById('id-settings-back').addEventListener(
            'click',
            function() {
                manager.showScreen('main-menu');
            });
    }

    function run() {
        //
        // I know this is empty, there isn't anything to do.
        let leftKey = window.localStorage.getItem("left-key");
        let rightKey = window.localStorage.getItem("right-key");
        let fireKey = window.localStorage.getItem("fire-key");

        document.getElementById('id-settings-left-key').innerText = "'" + (leftKey? leftKey: "ArrowLeft") + "'";
        document.getElementById('id-settings-right-key').innerText = "'" + (rightKey? rightKey: "ArrowRight") + "'";
        document.getElementById('id-settings-fire-key').innerText = "'" + (fireKey? fireKey: " ") + "'";
    }

    return {
        initialize : initialize,
        run : run
    };
}(MyGame.manager));
