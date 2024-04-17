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
            attributes: ["position", "uv"],
            uniforms: ["worldViewProjection", "heightScale"],
            samplers: ["heightMap"]
        });

        return heightMapMaterial;
    }

    export function heightMapTextureColor(scene: BABYLON.Scene) {
        let heightMapMaterial = new BABYLON.ShaderMaterial("heightMapMaterial", scene, {
            vertexSource: VertexModule.heightMap,
            fragmentSource: FragmentModule.heightDebug,
        },
        {
            attributes: ["position", "uv"],
            uniforms: ["worldViewProjection", "heightScale"],
            samplers: ["heightMap"]
        });

        return heightMapMaterial;

    }

    export function createHeightMapColorDebug(scene: BABYLON.Scene) {
        let material = new BABYLON.ShaderMaterial("heightMapDebug", scene, {
            vertexSource: VertexModule.standard,
            fragmentSource: FragmentModule.heightDebug,
        },
        {
            attributes: ["position", "uv"],
            uniforms: ["worldViewProjection", "heightScale"],
            samplers: ["heightMap"]
        });   
        return material;
    }

    export function createSkyboxMaterial(scene: BABYLON.Scene) {
        var shaderMaterial = new BABYLON.ShaderMaterial('myMaterial', scene, { 
            vertexSource: VertexModule.skyboxVert, 
            fragmentSource: FragmentModule.skyboxFrag,
        },
        {
            attributes: ["position", "normal"], 
            uniforms: ["world", "view", "projection", "viewPosition"],
            samplers: ["skyboxTexture"]
        });

        return shaderMaterial;
    }
}
