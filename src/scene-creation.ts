import * as BABYLON from 'babylonjs'
import { MaterialModule } from '../src/materials'


export module SceneCreation {
    export function createScene(engine: BABYLON.Engine, canvas: HTMLCanvasElement) {
        let scene = new BABYLON.Scene(engine);
        let camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);
        camera.setTarget(BABYLON.Vector3.Zero());
        camera.attachControl(canvas, true);
        let light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
        light.intensity = 0.7;

        let ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 6, height: 6, subdivisions: 500}, scene);

        let material = MaterialModule.heightMapTextureColor(scene);
        ground.material = material;

        let texture = new BABYLON.Texture("./assets/worldHeightMap.jpg", scene);
        material.setTexture("heightMap", texture);
        material.setFloat("heightScale", 0.25);

        let lightBlue = MaterialModule.hexToVec3("#ADD8E6");
        material.setVector3("color", lightBlue);
        ground.position.y = 0;
        
        let skyboxTexture = new BABYLON.CubeTexture("./assets/skybox", scene);
        let skyboxMaterial = MaterialModule.createSkyboxMaterial(scene);
        skyboxMaterial.setTexture("skyboxTexture", skyboxTexture);


        let skybox = BABYLON.MeshBuilder.CreateBox("skyBox", {size: 4.0, sideOrientation: BABYLON.Mesh.BACKSIDE}, scene);
        skybox.material = skyboxMaterial;


        return scene;
    };
}
