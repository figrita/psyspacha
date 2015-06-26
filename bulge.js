function BulgePinchFilter()
{
    PIXI.filters.AbstractFilter.call(this,
        // vertex shader
        null,
        // fragment shader
        [
            'precision mediump float;',
            'uniform float radius;',
            'uniform float strength;',
            'uniform vec2 center;',
            'uniform sampler2D uSampler;',
            'uniform vec2 texSize;',
            'varying vec2 vTextureCoord;',

            'void main()',
            '{',
            'vec2 coord = vTextureCoord * texSize;',
            'coord -= center;',
            'float distance = length(coord);',
            'if (distance < radius) {',
            'float percent = distance / radius;',
            'if (strength > 0.0) {',
            'coord *= mix(1.0, smoothstep(0.0, radius /     distance, percent), strength * 0.75);',
            '} else {',
            'coord *= mix(1.0, pow(percent, 1.0 + strength * 0.75) * radius / distance, 1.0 - percent);',
            '}',
            '}',
            'coord += center;',
            'gl_FragColor = texture2D(uSampler, coord / texSize);',
            'vec2 clampedCoord = clamp(coord, vec2(0.0), texSize);',
            'if (coord != clampedCoord) {',
            'gl_FragColor.a *= max(0.0, 1.0 - length(coord - clampedCoord));',
            '}',
            '}'
        ].join('\n'),
        // custom uniforms
        {
            radius: { type: '1f', value: 500 },
            strength: { type: '1f', value: 0.30 },
            center: { type: 'v2', value: {x: GWIDTH/2, y: GHEIGHT/2} },
            texSize: { type: 'v2', value: {x: GWIDTH, y:GHEIGHT } }
        }
    );
};

BulgePinchFilter.prototype = Object.create(PIXI.filters.AbstractFilter.prototype);
BulgePinchFilter.prototype.constructor = BulgePinchFilter;

Object.defineProperties(BulgePinchFilter.prototype, {
    radius: {
        get: function ()
        {
            return this.uniforms.radius.value;
        },
        set: function (value)
        {
            this.uniforms.radius.value = value;
        }
    },
    strength: {
        get: function ()
        {
            return this.uniforms.strength.value;
        },
        set: function (value)
        {
            this.uniforms.strength.value = value;
        }
    }
});
