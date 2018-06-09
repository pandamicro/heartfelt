const renderEngine = cc.renderer.renderEngine;
const math = cc.vmath;
const renderer = renderEngine.renderer;
const gfx = renderEngine.gfx;
const Material = renderEngine.Material;

// Require to load the shader to program lib
const RainShader = require('RainShader');

function RainMaterial () {
    Material.call(this, false);

    var pass = new renderer.Pass('rainheart');
    pass.setDepth(false, false);
    pass.setCullMode(gfx.CULL_NONE);
    pass.setBlend(
        gfx.BLEND_FUNC_ADD,
        gfx.BLEND_SRC_ALPHA, gfx.BLEND_ONE_MINUS_SRC_ALPHA,
        gfx.BLEND_FUNC_ADD,
        gfx.BLEND_SRC_ALPHA, gfx.BLEND_ONE_MINUS_SRC_ALPHA
    );

    let mainTech = new renderer.Technique(
        ['transparent'],
        [
            { name: 'iTexture', type: renderer.PARAM_TEXTURE_2D },
            { name: 'texSize', type: renderer.PARAM_FLOAT2 },
            { name: 'iResolution', type: renderer.PARAM_FLOAT3 },
            { name: 'iTime', type: renderer.PARAM_FLOAT },
        ],
        [
            pass
        ]
    );

    this._texture = null;
    this._resolution = math.vec3.create();
    this._texSize = math.vec2.create();
    this._time = 0.0;

    // need _effect to calculate hash
    this._effect = this.effect = new renderer.Effect(
        [
            mainTech,
        ],
        {
            'iResolution': this._resolution,
            'texSize': this._texSize
        },
        [
            { name: 'HAS_HEART', value: true },
            { name: 'USE_POST_PROCESSING', value: true }
        ]
    );
    
    this._mainTech = mainTech;
}
cc.js.extend(RainMaterial, Material);

cc.js.mixin(RainMaterial.prototype, {
    getTexture () {
        return this._texture;
    },

    setTexture (val) {
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
    
    setResolution (w, h) {
        this._resolution.x = w;
        this._resolution.y = h;
    },

    setTime (time) {
        this._time = time;
        this.effect.setProperty('iTime', this._time);
    },

    setHasHeart (value) {
        this.effect.define('HAS_HEART', !!value);
    },

    usePostProcessing (value) {
        this.effect.define('USE_POST_PROCESSING', !!value);
    }
});

module.exports = RainMaterial;