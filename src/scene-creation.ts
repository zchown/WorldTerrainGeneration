import * as BABYLON from 'babylonjs'
import { MaterialModule } from '../src/materials'

export module SceneCreation {
    export function createScene(engine: BABYLON.Engine, canvas: HTMLCanvasElement) {
        let scene = new BABYLON.Scene(engine);
        let camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI/2, 1, 10, new BABYLON.Vector3(0, 0, 0), scene);
        camera.attachControl(canvas, true);
        let light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
        light.intensity = 0.7;

        let ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 6, height: 6, subdivisions: 500}, scene);
        ground.position.y = 0;

        let material = MaterialModule.slopeShading(scene);
        ground.material = material;

        let texture = new BABYLON.Texture("./assets/worldHeightMap.jpg", scene);
        material.setTexture("heightMap", texture);
        material.setFloat("heightScale", 1.0);

        let lightBlue = MaterialModule.hexToVec3("#ADD8E6");
        material.setVector3("color", lightBlue);
        
        let skyboxTexture = new BABYLON.CubeTexture("./assets/skybox", scene);
        let skyboxMaterial = MaterialModule.createSkyboxMaterial(scene);
        skyboxMaterial.setTexture("skyboxTexture", skyboxTexture);


        let skybox = BABYLON.MeshBuilder.CreateBox("skyBox", {size: 4.0, sideOrientation: BABYLON.Mesh.BACKSIDE}, scene);
        skybox.material = skyboxMaterial;


        var update = function() {
            skyboxMaterial.setVector3("cameraPosition", camera.position);
            let world4x4 = ground.getWorldMatrix();
            let normalMatrix4x4 = new BABYLON.Matrix();
            world4x4.toNormalMatrix(normalMatrix4x4);
            let inverseTranspose3x3 = BABYLON.Matrix.GetAsMatrix3x3(normalMatrix4x4);
            material.setMatrix3x3("inverseTranspose", inverseTranspose3x3);

        }
        scene.registerBeforeRender(update);


        return scene;
    };
}
