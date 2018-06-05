(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/RainFelt.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'd3cb3/VX8dOgYWVSBEEOUPZ', 'RainFelt', __filename);
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
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=RainFelt.js.map
        