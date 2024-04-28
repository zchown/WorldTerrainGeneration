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
            uniforms: ["worldViewProjection", "color", "pos"]
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

    export function morphMaterial(scene: BABYLON.Scene) {
        let material = new BABYLON.ShaderMaterial("morphMaterial", scene, {
            vertexSource: VertexModule.morphVert,
            fragmentSource: FragmentModule.hDebug,
        },
        {
            attributes: ["position", "uv"],
            uniforms: ["worldViewProjection", "hs1", "hs2", "blend"],
            samplers: ["hm1", "hm2"]
        });
        return material;
    }

    export function morphSlope(scene: BABYLON.Scene) {
        let material = new BABYLON.ShaderMaterial("morphMaterial", scene, {
            vertexSource: VertexModule.morphVert,
            fragmentSource: FragmentModule.slopeShading,
        },
        {
            attributes: ["position", "uv"],
            uniforms: ["worldViewProjection", "hs1", "hs2", "blend"],
            samplers: ["hm1", "hm2"]
        });
        return material;
    }

    export function slopeHeight(scene: BABYLON.Scene) {
        let material = new BABYLON.ShaderMaterial("slopeHeight", scene, {
            vertexSource: VertexModule.morphVert,
            fragmentSource: FragmentModule.slopeHeightShading,
        },
        {
            attributes: ["position", "uv"],
            uniforms: ["worldViewProjection", "hs1", "hs2", "blend"],
            samplers: ["hm1", "hm2"]
        });
        return material;
    }

    export function blinnMorph(scene: BABYLON.Scene) {
        let material = new BABYLON.ShaderMaterial("blinnHeight", scene, {
            vertexSource: VertexModule.morphBlinn,
            fragmentSource: FragmentModule.blinnMorph,
        },
        {
            attributes: ["position", "uv", "normal"],
            uniforms: ["projection", "world", "view", "inverseTranspose", "worldNormal", "worldPos", "hs1", "hs2", "blend"],
            samplers: ["hm1", "hm2"]
        });
        return material;
    }

    export function lightBall(scene: BABYLON.Scene) {
        let material = new BABYLON.ShaderMaterial("lightBall", scene, {
            vertexSource: VertexModule.lightVert,
            fragmentSource: FragmentModule.flat,
        },
        {
            attributes: ["position"],
            uniforms: ["myWorld", "world", "view", "projection", "color"],
        });
        return material;
    }
}
