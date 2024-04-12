import * as BABYLON from 'babylonjs';
import { ShaderModule } from '../src/shaders'

export module MaterialModule {
    export function hexToVec3(hex: string): BABYLON.Vector3 {
        let color = BABYLON.Color3.FromHexString(hex);
        return BABYLON.Vector3.FromArray(color.toLinearSpace().asArray());
    }

    export function createDefaultMaterial(scene: BABYLON.Scene) {
        let defaultMaterial = new BABYLON.ShaderMaterial("defaultMaterial", scene, {
            vertexSource: ShaderModule.defaultVertexShader,
            fragmentSource: ShaderModule.defaultFragmentShader,
        },
        {
            attributes: ["position"],
            uniforms: ["worldViewProjection", "color"]
        });

        return defaultMaterial;

    }
    
}
