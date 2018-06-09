(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/RainMaterial.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '6e131fojNlHErjR/ZVwKu6c', 'RainMaterial', __filename);
// RainMaterial.js

'use strict';

var renderEngine = cc.renderer.renderEngine;
var math = cc.vmath;
var renderer = renderEngine.renderer;
var gfx = renderEngine.gfx;
var Material = renderEngine.Material;

// Require to load the shader to program lib
var RainShader = require('RainShader');

function RainMaterial() {
    Material.call(this, false);

    var pass = new renderer.Pass('rainheart');
    pass.setDepth(false, false);
    pass.setCullMode(gfx.CULL_NONE);
    pass.setBlend(gfx.BLEND_FUNC_ADD, gfx.BLEND_SRC_ALPHA, gfx.BLEND_ONE_MINUS_SRC_ALPHA, gfx.BLEND_FUNC_ADD, gfx.BLEND_SRC_ALPHA, gfx.BLEND_ONE_MINUS_SRC_ALPHA);

    var mainTech = new renderer.Technique(['transparent'], [{ name: 'iTexture', type: renderer.PARAM_TEXTURE_2D }, { name: 'texSize', type: renderer.PARAM_FLOAT2 }, { name: 'iResolution', type: renderer.PARAM_FLOAT3 }, { name: 'iTime', type: renderer.PARAM_FLOAT }], [pass]);

    this._texture = null;
    this._resolution = math.vec3.create();
    this._texSize = math.vec2.create();
    this._time = 0.0;

    // need _effect to calculate hash
    this._effect = this.effect = new renderer.Effect([mainTech], {
        'iResolution': this._resolution,
        'texSize': this._texSize
    }, [{ name: 'HAS_HEART', value: true }, { name: 'USE_POST_PROCESSING', value: true }]);

    this._mainTech = mainTech;
}
cc.js.extend(RainMaterial, Material);

cc.js.mixin(RainMaterial.prototype, {
    getTexture: function getTexture() {
        return this._texture;
    },
    setTexture: function setTexture(val) {
        if (this._texture !== val) {
            this._texture = val;
            this._texture.update({
                // Adapt to shader
                flipY: true,
                // For load texture
                mipmap: true
            });
            this.effect.setProperty('iTexture', val.getImpl());
            this._texIds['iTexture'] = val.getId();

            this._texSize.x = this._texture.width;
            this._texSize.y = this._texture.height;
        }
    },
    setResolution: function setResolution(w, h) {
        this._resolution.x = w;
        this._resolution.y = h;
    },
    setTime: function setTime(time) {
        this._time = time;
        this.effect.setProperty('iTime', this._time);
    },
    setHasHeart: function setHasHeart(value) {
        this.effect.define('HAS_HEART', !!value);
    },
    usePostProcessing: function usePostProcessing(value) {
        this.effect.define('USE_POST_PROCESSING', !!value);
    }
});

module.exports = RainMaterial;

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
        //# sourceMappingURL=RainMaterial.js.map
        