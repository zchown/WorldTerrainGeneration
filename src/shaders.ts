export module VertexModule {
    export let standard = `
        precision highp float;
        
        attribute vec2 uv;
        attribute vec3 position;

        uniform mat4 worldViewProjection;

        varying vec2 vUV;

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
        varying float hs;

        void main() {
            vUV = uv;
            hs = heightScale;
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

    // this is very custom to the world map
    // does not work with other height maps
    export var groundVertTest = `
        precision highp float;

        attribute vec3 position;
        attribute vec3 normal;
        attribute vec2 uv;
        
        uniform mat4 world;
        uniform mat4 worldView;
        uniform mat4 worldViewProjection;
        uniform mat4 view;
        uniform mat4 projection;
        
        varying vec3 vPositionW;
        varying vec2 vUV;
        
        void main(void) {
            gl_Position = worldViewProjection * vec4(position, 1.0);
            vPositionW = (world * vec4(position, 1.0)).xyz;
            vUV = uv;
        }
    `;

    export var morphVert = `
        precision highp float;

        attribute vec3 position;
        attribute vec2 uv;

        uniform float hs1;
        uniform float hs2;
        uniform sampler2D hm1;
        uniform sampler2D hm2;
        uniform float blend;
        uniform mat4 worldViewProjection;

        varying vec3 vPositionW;
        varying vec2 vUV;

        void main() {
            float h1 = texture2D(hm1, uv).r * hs1;
            float h2 = texture2D(hm2, uv).r * hs2;
            float height = ((h1 * blend) + h2 * (1.0 - blend)) / 2.0;
            vec3 newPosition = position + vec3(0.0, height, 0.0);
            vPositionW = newPosition;
            vUV = uv;
            gl_Position = worldViewProjection * vec4(newPosition, 1.0);
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

        uniform vec3 waterColor;
        uniform vec3 terrainColor;
        uniform vec3 darkTerrainColor;
        uniform vec3 mountainColor;
        uniform vec3 snowColor;

        varying vec3 vPositionW;
        varying float hs;
        
        void main() {
            float height = (vPositionW.y) / hs;
            vec3 color;
            if (height < 0.055) {
                color = waterColor;
            } else if (height < 0.1) {
                color = mix(darkTerrainColor, terrainColor, smoothstep(0.001, 0.5, height));
            } else if (height < 0.5) {
                color = mix(terrainColor, mountainColor, smoothstep(0.1, 0.5, height));
            } else {
                color = snowColor;
            }
            
            float lat = vPositionW.z;
            float lon = vPositionW.x;

            // Add snow to the poles
            if (lat > 2.9) {
                color = color = vec3(1.0, 1.0, 1.0);
            }

            if (lat < -2. && height > 0.06) {
                color = mix(vec3(0.5, 0.5, 0.5), vec3(1.0, 1.0, 1.0), smoothstep(0.07, 0.2, height));
            }

            gl_FragColor = vec4(color, 1.0);
        }
    `;

    export let heightDebug = `
        precision highp float;

        varying sampler2D heightMap;
        
        varying vec2 vUV;

        void main() {
            vec4 color = texture2D(heightMap, vUV);
            gl_FragColor = (color);

        }
    `;

    export let hDebug = `
        precision highp float;

        varying vec3 vPositionW;

        void main() {
            float height = (vPositionW.y);
            gl_FragColor = vec4(height, height, height, 1.0);
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

    export var slopeShading= `
        precision highp float;

        uniform sampler2D hm1;
        uniform sampler2D hm2;

        uniform float blend;
        uniform float hs1;
        uniform float hs2;

        varying vec2 vUV;

        void main() {

            float step = 0.01;
            float left1 = texture2D(hm1, vec2(vUV.x - step, vUV.y)).r * hs1;
            float right1 = texture2D(hm1, vec2(vUV.x + step, vUV.y)).r * hs1;
            float up1 = texture2D(hm1, vec2(vUV.x, vUV.y - step)).r * hs1;
            float down1 = texture2D(hm1, vec2(vUV.x, vUV.y + step)).r * hs1;
            float left2 = texture2D(hm2, vec2(vUV.x - step, vUV.y)).r * hs2;
            float right2 = texture2D(hm2, vec2(vUV.x + step, vUV.y)).r * hs2;
            float up2 = texture2D(hm2, vec2(vUV.x, vUV.y - step)).r * hs2;
            float down2 = texture2D(hm2, vec2(vUV.x, vUV.y + step)).r * hs2;

            float rightHeight = ((right1 * blend) + right2 * (1.0 - blend)) / 2.0;
            float leftHeight = ((left1 * blend) + left2 * (1.0 - blend)) / 2.0;
            float upHeight = ((up1 * blend) + up2 * (1.0 - blend)) / 2.0;
            float downHeight = ((down1 * blend) + down2 * (1.0 - blend)) / 2.0;

            // float dx = abs((rightHeight - leftHeight) / step);
            // float dy = abs((upHeight - downHeight) / step);
            // float slope = sqrt(dx * dx + dy * dy); 
            // slope = slope / 0.5;
            // gl_FragColor = vec4(slope, slope, slope, 1.0);


            float dx = (rightHeight - leftHeight);
            float dy = (upHeight - downHeight);
            float slope = atan(length(vec2(dx, dy))); // Calculate slope angle

            // Normalize the slope to the range [0, 1]
            slope = slope * 5.0;
            slope = slope / (3.14159265359 / 2.0); // Normalize to [0, 1] range

            gl_FragColor = vec4(slope, slope, slope, 1.0);
        }
    `;

    export var slopeHeightShading = `
        precision highp float;

        uniform sampler2D hm1;
        uniform sampler2D hm2;

        uniform float blend;
        uniform float hs1;
        uniform float hs2;

        varying vec2 vUV;
        varying vec3 vPositionW;

        void main() {

            float step = 0.01;
            float left1 = texture2D(hm1, vec2(vUV.x - step, vUV.y)).r * hs1;
            float right1 = texture2D(hm1, vec2(vUV.x + step, vUV.y)).r * hs1;
            float up1 = texture2D(hm1, vec2(vUV.x, vUV.y - step)).r * hs1;
            float down1 = texture2D(hm1, vec2(vUV.x, vUV.y + step)).r * hs1;
            float left2 = texture2D(hm2, vec2(vUV.x - step, vUV.y)).r * hs2;
            float right2 = texture2D(hm2, vec2(vUV.x + step, vUV.y)).r * hs2;
            float up2 = texture2D(hm2, vec2(vUV.x, vUV.y - step)).r * hs2;
            float down2 = texture2D(hm2, vec2(vUV.x, vUV.y + step)).r * hs2;

            float rightHeight = ((right1 * blend) + right2 * (1.0 - blend)) / 2.0;
            float leftHeight = ((left1 * blend) + left2 * (1.0 - blend)) / 2.0;
            float upHeight = ((up1 * blend) + up2 * (1.0 - blend)) / 2.0;
            float downHeight = ((down1 * blend) + down2 * (1.0 - blend)) / 2.0;

            float dx = (rightHeight - leftHeight);
            float dy = (upHeight - downHeight);

            float xSlope = atan(dx);
            float ySlope = atan(dy);

            // normalize to [0, 1]
            xSlope = xSlope * 5.0;
            xSlope = xSlope / (3.14159265359 / 2.0); // Normalize to [0, 1] range
            ySlope = ySlope * 5.0;
            ySlope = ySlope / (3.14159265359 / 2.0); // Normalize to [0, 1] range


            float height = (vPositionW.y);

            gl_FragColor = vec4(xSlope, ySlope, height, 1.0);
        }
    `;

}
