import * as BABYLON from 'babylonjs';
import { VertexModule, FragmentModule} from '../src/shaders'

export module MaterialModule {
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
            fragmentSource: FragmentModule.heightDebug,
        },
        {
            attributes: ["position", "uv"],
            uniforms: ["worldViewProjection", "heightScale"],
            samplers: ["heightMap"]
        });

        return heightMapMaterial;
    }

    export function worldMaterial(scene: BABYLON.Scene) {
        let heightMapMaterial = new BABYLON.ShaderMaterial("heightMapMaterial", scene, {
            vertexSource: VertexModule.heightMap,
            fragmentSource: FragmentModule.heightShading,
        },
        {
            attributes: ["position", "uv"],
            uniforms: ["worldViewProjection", "heightScale", "waterColor", "terrainColor", "mountainColor", "snowColor"],
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

    export function slopeShading(scene: BABYLON.Scene) {
        let material = new BABYLON.ShaderMaterial("slopeShading", scene, {
            vertexSource: VertexModule.heightMap,
            fragmentSource: FragmentModule.normalShading
        },
        {
            attributes: ["position", "uv", "normal"],
            uniforms: ["worldViewProjection", "heightScale", "inverseTranspose"],
            samplers: ["heightMap"]
        });

        return material;
    }

    export function morphMaterial(scene: BABYLON.Scene) {
        let material = new BABYLON.ShaderMaterial("morphMaterial", scene, {
            vertexSource: VertexModule.morphVert,
            fragmentSource: FragmentModule.hDebug,
        },
        {
            attributes: ["position", "uv"],
            uniforms: ["worldViewProjection", "heightScale", "blend"],
            samplers: ["hm1", "hm2"]
        });
        return material;
    }
}
