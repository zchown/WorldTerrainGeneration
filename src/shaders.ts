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
        attribute vec3 normal;

        uniform mat4 worldViewProjection;
        uniform sampler2D heightMap;
        uniform float heightScale;
        uniform mat3 inverseTranspose;

        varying vec3 vPositionW;
        varying vec2 vUV;
        varying vec3 norms;

        void main() {
            vUV = uv;
            norms = inverseTranspose * normal;
            float height = texture2D(heightMap, uv).r * heightScale;
            vec3 newPosition = position + vec3(0.0, height, 0.0);
            vPositionW = newPosition;
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

    export var groundVertTest = `
        precision highp float;

        // Attributes
        attribute vec3 position;
        attribute vec3 normal;
        attribute vec2 uv;
        
        // Uniforms
        uniform mat4 world;
        uniform mat4 worldView;
        uniform mat4 worldViewProjection;
        uniform mat4 view;
        uniform mat4 projection;
        
        // Varying
        varying vec3 vPositionW;
        varying vec2 vUV;
        
        void main(void) {
            gl_Position = worldViewProjection * vec4(position, 1.0);
            vPositionW = (world * vec4(position, 1.0)).xyz;
            vUV = uv;
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
            float height = (vPositionW.y);
            vec3 color;
            if (height < 0.06) {
                color = vec3(0.0, 0.0, 1.0); // Blue
            } else if (height < 0.1) {
                color = vec3(0.0, 1.0, 0.0); //  Green
            } else if (height < 0.5) {
                // Interpolate between green and yellow
                color = mix(vec3(0.0, 1.0, 0.0), vec3(.5, .5, .5), smoothstep(0.1, 0.5, height));
            } else {
                color = vec3(1.0, 1.0, 1.0); // White
            }
            
            float posX = (vPositionW.z);
            if (posX > 2.9) {
                color = color = vec3(1.0, 1.0, 1.0);
            }

            if (posX < -2. && height > 0.06) {
                
                color = mix(vec3(0.5, 0.5, 0.5), vec3(1.0, 1.0, 1.0), smoothstep(0.07, 0.2, height));
            }
            gl_FragColor = vec4(color, 1.0);
        }

    `;

    export let heightDebug = `
        precision highp float;
        varying vec2 vUV;

        uniform sampler2D heightMap;
        
        void main() {
            vec4 color = texture2D(heightMap, vUV);
            
            gl_FragColor = (color);

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

    export var groundFragTest = `
        precision highp float;

        // Varying
        varying vec3 vPositionW;
        varying vec2 vUV;
        
        // Uniforms
        uniform sampler2D heightmap;
        
        void main(void) {
            // Sample the heightmap texture
            float height = texture2D(heightmap, vUV).r;
        
            // Color the pixel based on its height
            vec3 color;
            if (height < 0.05) {
                color = vec3(0.0, 0.0, 1.0); // Blue
            } else if (height < 0.5) {
                color = vec3(0.0, 1.0, 0.0); // Green
            } else if (height < 0.75) {
                color = vec3(1.0, 1.0, 0.0); // Yellow
            } else {
                color = vec3(1.0, 1.0, 1.0); // White
            }
        
            // Output the final color
            gl_FragColor = vec4(color, 1.0);
        }


    `;
    export var normalShading = `
        precision highp float;
        varying vec3 norms;

        void main() {
            float yy = norms.y;
            gl_FragColor = vec4(0, 0, yy * 0.5, 1.0);
            
        }

    `;

}
