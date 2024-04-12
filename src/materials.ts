import * as BABYLON from 'babylonjs';
import { VertexModule, FragmentModule} from '../src/shaders'

export module MaterialModule {
    export function hexToVec3(hex: string): BABYLON.Vector3 {
        let color = BABYLON.Color3.FromHexString(hex);
        return BABYLON.Vector3.FromArray(color.toLinearSpace().asArray());
    }

    export function createDefaultMaterial(scene: BABYLON.Scene) {
        let defaultMaterial = new BABYLON.ShaderMaterial("defaultMaterial", scene, {
            vertexSource: VertexModule.standard,
            fragmentSource: FragmentModule.flat,
        },
        {
            attributes: ["position"],
            uniforms: ["worldViewProjection", "color"]
        });

        return defaultMaterial;

    }

    export function createHeightMapMaterial(scene: BABYLON.Scene) {
        let heightMapMaterial = new BABYLON.ShaderMaterial("heightMapMaterial", scene, {
            vertexSource: VertexModule.heightMap,
            fragmentSource: FragmentModule.heightShading,
        },
        {
            attributes: ["position"],
            uniforms: ["worldViewProjection", "heightMap", "heightScale"]
        });

        return heightMapMaterial;
    }
    
}
