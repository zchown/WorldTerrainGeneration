import * as BABYLON from 'babylonjs';

export module ShaderModule {
    export function hexToVec3(hex: string): BABYLON.Vector3 {
        let color = BABYLON.Color3.FromHexString(hex);
        return BABYLON.Vector3.FromArray(color.toLinearSpace().asArray());
    }

    let defaultVertexShader = `
        precision highp float;
        attribute vec3 position;
        uniform mat4 worldViewProjection;
        void main() {
            gl_Position = worldViewProjection * vec4(position, 1.0);
        }
    `;

    let defaultFragmentShader = `
        precision highp float;
        uniform vec3 color;
        void main(void) {
            gl_FragColor = vec4(color, 1.0);
        }
    `;

    export function createDefaultMaterial(scene: BABYLON.Scene) {
        let defaultMaterial = new BABYLON.ShaderMaterial("defaultMaterial", scene, {
            vertexSource: defaultVertexShader,
            fragmentSource: defaultFragmentShader,
        },
        {
            attributes: ["position"],
            uniforms: ["worldViewProjection", "color"]
        });

        return defaultMaterial;

    }
    
}
