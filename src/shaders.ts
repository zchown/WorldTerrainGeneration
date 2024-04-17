export module VertexModule {
    export let standard = `
        precision highp float;
        
        attribute vec2 uv;

        varying vec2 vUV;

        attribute vec3 position;
        uniform mat4 worldViewProjection;

        void main() {
            vUV = uv;
            gl_Position = worldViewProjection * vec4(position, 1.0);
        }
    `;

    export let heightMap = `
        precision highp float;

        attribute vec3 position;
        attribute vec2 uv;

        uniform mat4 worldViewProjection;
        uniform sampler2D heightMap;
        uniform float heightScale;

        varying vec3 vPositionW;
        varying vec2 vUV;

        void main() {
            vUV = uv;
            vPositionW = position;
            float height = texture2D(heightMap, uv).r * heightScale;
            vec3 newPosition = position + vec3(0.0, height, 0.0);
            gl_Position = worldViewProjection * vec4(newPosition, 1.0);
        }
    `;

    export var skyboxVert = `
        attribute vec3 position;

        uniform mat4 view;
        uniform mat4 projection;
        
        varying vec3 vPos;

        void main() {
            vec4 localPosition = vec4(position, 1.); 
            mat4 skyboxView = view;

            // remove translation data from view matrix
            skyboxView[3].x = 0.0;
            skyboxView[3].y = 0.0;
            skyboxView[3].z = 0.0;
            vec4 viewPosition  = skyboxView * localPosition;
            vec4 clipPosition  = projection * viewPosition;

            clipPosition.z = clipPosition.w; // make sure depth is maxed out

            vPos = position.xyz;

            gl_Position = clipPosition;
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
        
        void main() {
            gl_FragColor = vec4(vPositionW, 1.0);
        }

    `;

    export let heightDebug = `
        precision highp float;
        varying vec2 vUV;

        uniform sampler2D heightMap;
        
        void main() {
            vec4 color = texture2D(heightMap, vUV);
            gl_FragColor = color;

        }
    `;

    export var skyboxFrag= `
         uniform samplerCube skyboxTexture;

        varying vec3 vPos;

        void main() {
            vec3 reflectionColor = textureCube(skyboxTexture, vPos).rgb;
            gl_FragColor = vec4(reflectionColor,1);
        }

    `;

}
