export module VertexModule {
    export const standard = `
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

    export const heightMap = `
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

    export const skyboxVert = `
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
    export const groundVertTest = `
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

    export const morphVert = `
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

    export const morphBlinn = `
        precision highp float;

        //shared
        attribute vec3 position;
        uniform mat4 projection;

        // Blinn-Phong shading
        attribute vec3 normal;
        uniform mat4 world;
        uniform mat4 view;
        uniform mat3 inverseTranspose;
        varying vec3 worldNormal;
        varying vec3 worldPos;

        // Morphing
        attribute vec2 uv;
        uniform float hs1;
        uniform float hs2;
        uniform sampler2D hm1;
        uniform sampler2D hm2;
        uniform float blend;
        varying vec2 vUV;
        varying vec3 vPositionW;
                
        void main() {
            // Morphing
            float h1 = texture2D(hm1, uv).r * hs1;
            float h2 = texture2D(hm2, uv).r * hs2;
            float height = ((h1 * blend) + h2 * (1.0 - blend)) / 2.0;
            vec3 newPosition = position + vec3(0.0, height, 0.0);
            vUV = uv;
            vPositionW = newPosition;

            // Blinn
            vec4 localPosition = vec4(newPosition, 1.);
            vec4 worldPosition = world * localPosition;     
            vec4 viewPosition  = view * worldPosition;
            vec4 clipPosition  = projection * viewPosition;
            worldPos = worldPosition.xyz;
            worldNormal = inverseTranspose * normal;

            gl_Position = clipPosition;


        }
    `;

    export let lightVert = `
        precision highp float;
        attribute vec3 position;
        uniform mat4 world;
        uniform mat4 view;
        uniform mat4 projection;
        uniform vec3 pos;
                
        void main() {
            vec4 localPosition = vec4(position, 1.);
            vec4 worldPosition = world * localPosition;     
            vec4 viewPosition  = view * worldPosition;
            vec4 clipPosition  = projection * viewPosition;
            gl_Position = clipPosition;
        }
    `;

}

export module FragmentModule {
    export const flat = `
    precision highp float;
    uniform vec3 color;

    void main(void) {
        gl_FragColor = vec4(color, 1.0);
    }
    `;

    export const heightShading = `
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

    export const heightDebug = `
        precision highp float;

        varying sampler2D heightMap;
        
        varying vec2 vUV;

        void main() {
            vec4 color = texture2D(heightMap, vUV);
            gl_FragColor = (color);

        }
    `;

    export const hDebug = `
        precision highp float;

        varying vec3 vPositionW;

        void main() {
            float height = (vPositionW.y);
            gl_FragColor = vec4(height, height, height, 1.0);
        }
    `;

    export const skyboxFrag= `
         uniform samplerCube skyboxTexture;

        varying vec3 vPos;

        void main() {
            vec3 reflectionColor = textureCube(skyboxTexture, vPos).rgb;
            gl_FragColor = vec4(reflectionColor,1);
        }
    `;

    export const slopeShading= `
        precision highp float;

        uniform sampler2D hm1;
        uniform sampler2D hm2;

        uniform float blend;
        uniform float hs1;
        uniform float hs2;

        varying vec2 vUV;

        void main() {

            float step = 0.001;
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

    export const slopeHeightShading = `
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

    export const blinnMorph = `
        precision highp float;
        uniform vec3 surfaceColor;
        uniform vec3 lightDirection;
        uniform float lightIntensity;
        uniform vec3 lightColor;
        uniform vec3 ambientLightColor;
        uniform float ambientIntensity;
        uniform vec3 specularColor;
        uniform float specularIntensity;
        uniform vec3 viewPosition;

        varying vec3 worldNormal;
        varying vec3 worldPos;

        // morphing
        uniform float hs1;
        uniform float hs2;
        uniform sampler2D hm1;
        uniform sampler2D hm2;
        uniform float blend;
        varying vec2 vUV;

        void main() {
            // recalc normal
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


            // magic happens here
            vec3 normal = normalize(cross(vec3(0.0, rightHeight - leftHeight, step), vec3(step, upHeight - downHeight, 0.0))) / 2.0;

            vec3 normalizedLightDirection = normalize(lightDirection - worldPos);
            vec3 normalizedNormal = normalize(normal);
            vec3 normalizedViewDirection = normalize(viewPosition - worldPos);
            vec3 normalizedhalfVector = normalize(normalizedViewDirection + normalizedLightDirection);

            // def working
            float cosTheta = dot(normalizedNormal, normalizedLightDirection);
            float cosRho = max(0.0, dot(normalizedNormal, normalizedhalfVector));
            vec3 specularTerm = (pow(cosRho, specularIntensity)) * specularColor;
            vec3 diffuseTerm = lightIntensity * lightColor * surfaceColor * cosTheta;
            vec3 ambientTerm = ambientIntensity * ambientLightColor;
            vec3 pixelColor;
            if (cosTheta > 0.0) {
                pixelColor = diffuseTerm + specularTerm + ambientTerm;
            }
            else {
                pixelColor = ambientTerm;
            }
            gl_FragColor = vec4(pixelColor, 1);
        }

    `;

    export const morphTextureColor = `
        precision highp float;

        uniform sampler2D hm1;
        uniform sampler2D hm2;

        uniform float blend;
        uniform float hs1;
        uniform float hs2;

        uniform sampler2D grass;
        uniform sampler2D rock;
        uniform sampler2D snow;
        uniform sampler2D rnoise;
        uniform sampler2D rnoise2;
        uniform sampler2D tree;
        uniform sampler2D noise;

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
            xSlope = xSlope * 5.0;
            xSlope = xSlope / (3.14159265359 / 2.0); // Normalize to [0, 1] range
            ySlope = ySlope * 5.0;
            ySlope = ySlope / (3.14159265359 / 2.0); // Normalize to [0, 1] range
            float height = (vPositionW.y);

            float n1 = texture2D(noise, vUV * 2.0).r;

            float h = height;
            if (hs1 > hs2) {
                h = hs1;
            } else {
                h = hs2;
            }
            if (height * h >(13.0 + n1)) {
                gl_FragColor = texture2D(snow, vUV);
            }
            else if ((height * h > (11.5 - (n1 * 4.0))) || max(xSlope, ySlope) > 0.4) {
                gl_FragColor = texture2D(rock, vUV * 10.0) + n1 * 0.05;
            }
            else {
                if (texture2D(rnoise, vUV).y > 0.2) {
                    if (texture2D(rnoise2, vUV).x > (0.45 + (0.1 * n1))) {
                        gl_FragColor = texture2D(tree, vUV * 10.0);
                    }
                    else {
                        vec4 g = texture2D(grass, vUV * 3.0);
                        vec4 t = texture2D(tree, vUV * 5.0);
                        gl_FragColor = mix(g, t, 0.5);
                    }
                } else {
                    gl_FragColor = texture2D(grass, vUV * 10.0);

                }
            }
        }
    `;

    export const allOfIt = `
        precision highp float;

        uniform sampler2D hm1;
        uniform sampler2D hm2;

        uniform float blend;
        uniform float hs1;
        uniform float hs2;

        uniform sampler2D grass;
        uniform sampler2D rock;
        uniform sampler2D snow;
        uniform sampler2D rnoise;
        uniform sampler2D rnoise2;
        uniform sampler2D tree;
        uniform sampler2D noise;

        uniform vec3 lightDirection;
        uniform float lightIntensity;
        uniform vec3 lightColor;
        uniform vec3 ambientLightColor;
        uniform float ambientIntensity;
        uniform vec3 specularColor;
        uniform float specularIntensity;
        uniform vec3 viewPosition;

        varying vec3 worldNormal;
        varying vec3 worldPos;


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
            xSlope = xSlope * 5.0;
            xSlope = xSlope / (3.14159265359 / 2.0); // Normalize to [0, 1] range
            ySlope = ySlope * 5.0;
            ySlope = ySlope / (3.14159265359 / 2.0); // Normalize to [0, 1] range
            float height = (vPositionW.y);

            float n1 = texture2D(noise, vUV * 2.0).r;

            vec4 sc = vec4(0.0, 0.0, 0.0, 1.0);

            float h = height;
            if (hs1 > hs2) {
                h = hs1;
            } else {
                h = hs2;
            }
            if (height * h >(13.0 + n1)) {
                sc = texture2D(snow, vUV);
            }
            else if ((height * h > (11.5 - (n1 * 4.0))) || max(xSlope, ySlope) > 0.4) {
                sc = texture2D(rock, vUV * 10.0) + n1 * 0.05;
            }
            else {
                if (texture2D(rnoise, vUV).y > 0.2) {
                    if (texture2D(rnoise2, vUV).x > (0.45 + (0.1 * n1))) {
                        sc = texture2D(tree, vUV * 10.0);
                    }
                    else {
                        vec4 g = texture2D(grass, vUV * 3.0);
                        vec4 t = texture2D(tree, vUV * 5.0);
                        sc = mix(g, t, 0.5);
                    }
                } else {
                    sc = texture2D(grass, vUV * 10.0);

                }
            }
            vec3 surfaceColor = sc.rgb;
            // magic happens here
            vec3 normal = normalize(cross(vec3(0.0, rightHeight - leftHeight, step), vec3(step, upHeight - downHeight, 0.0))) / 2.0;

            vec3 normalizedLightDirection = normalize(lightDirection - worldPos);
            vec3 normalizedNormal = normalize(normal);
            vec3 normalizedViewDirection = normalize(viewPosition - worldPos);
            vec3 normalizedhalfVector = normalize(normalizedViewDirection + normalizedLightDirection);

            // def working
            float cosTheta = dot(normalizedNormal, normalizedLightDirection);
            float cosRho = max(0.0, dot(normalizedNormal, normalizedhalfVector));
            vec3 specularTerm = (pow(cosRho, specularIntensity)) * specularColor;
            vec3 diffuseTerm = lightIntensity * lightColor * surfaceColor * cosTheta;
            vec3 ambientTerm = ambientIntensity * ambientLightColor;
            vec3 pixelColor;
            if (cosTheta > 0.0) {
                pixelColor = diffuseTerm + specularTerm + ambientTerm;
            }
            else {
                pixelColor = ambientTerm;
                // pixelColor = vec3(1.0, 0.0, 0.0);
            }

            pixelColor = pixelColor * sc.rgb;
            gl_FragColor = vec4(pixelColor, 1);
            // gl_FragColor = vec4(sc.rgb, 1);
        }

    `;

}
