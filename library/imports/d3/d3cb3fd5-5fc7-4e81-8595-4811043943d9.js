"use strict";
cc._RF.push(module, 'd3cb3/VX8dOgYWVSBEEOUPZ', 'RainFelt');
// RainFelt.js

'use strict';

var RainMaterial = require('RainMaterial');

cc.Class({
    extends: cc.Component,

    properties: {
        target: cc.Sprite
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        cc.dynamicAtlasManager.enabled = false;
        this._material = new RainMaterial();
    },
    start: function start() {
        this._start = Date.now();

        if (this.target) {
            var texture = this.target.spriteFrame.getTexture();
            this._material.setTexture(texture);
            this._material.setResolution(this.target.node.width, this.target.node.height);
            this._material.updateHash();
            this.target._material = this._material;
            this.target._renderData._material = this._material;
        }
    },
    update: function update(dt) {
        var now = Date.now();
        var time = (now - this._start) / 1000;
        this._material.setTime(time);
    }
});

cc._RF.pop();