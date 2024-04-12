import * as BABYLON from 'babylonjs'

export module VertexModule {
    export let standard = `
        precision highp float;
        attribute vec3 position;
        uniform mat4 worldViewProjection;
        void main() {
            gl_Position = worldViewProjection * vec4(position, 1.0);
        }
    `;

    export let heightMap = `
        precision highp float;

        attribute vec3 position;

        uniform mat4 worldViewProjection;
        uniform sampler2D heightMap;
        uniform float heightScale;

        varying vec3 vPositionW;

        void main() {
            vec3 pos = position;
            pos.y += texture2D(heightMap, vec2(pos.x, pos.z)).r * heightScale;
            vPositionW = pos;
            gl_Position = worldViewProjection * vec4(pos, 1.0);
        }
    `;

}

export module FragmentModule {
    export let flat = `
    precision highp float;
    uniform vec3 color;
    void main(void) {
        gl_FragColor = vec4(color, 1.0);
    }
    `;

    export let heightShading = `
        precision highp float;
        varying vec3 vPositionW;
        
        void main(void) {
            gl_FragColor = vec4(vPositionW, 1.0);
        }

    `;

}
