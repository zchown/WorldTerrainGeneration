import * as BABYLON from 'babylonjs'
import { MaterialModule } from '../src/materials'
import { ColorModule } from '../src/colors'

export module SceneCreation {
    export function createScene(engine: BABYLON.Engine, canvas: HTMLCanvasElement) {
        let scene = new BABYLON.Scene(engine);
        let camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI/2, 1, 10, new BABYLON.Vector3(0, 0, 0), scene);
        camera.attachControl(canvas, true);
        let light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
        light.intensity = 0.7;

        let ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 12, height: 6, subdivisions: 1000}, scene);
        ground.position.y = 0;

        ground.material = createMaterial(scene);
        let skybox = createSkybox(scene);
        
        var update = function() {
            (skybox.material as BABYLON.ShaderMaterial).setVector3("cameraPosition", camera.position);
            // let world4x4 = ground.getWorldMatrix();
            // let normalMatrix4x4 = new BABYLON.Matrix();
            // world4x4.toNormalMatrix(normalMatrix4x4);
            // let inverseTranspose3x3 = BABYLON.Matrix.GetAsMatrix3x3(normalMatrix4x4);
            // material.setMatrix3x3("inverseTranspose", inverseTranspose3x3);
        }
        scene.registerBeforeRender(update);


        return scene;
    };
    
    const createMaterial = (scene: BABYLON.Scene) => {
        let material = MaterialModule.heightMapTextureColor(scene);
        let texture = new BABYLON.Texture("./assets/worldHeightMap.jpg", scene);
        material.setTexture("heightMap", texture);
        material.setFloat("heightScale", 1.0);

        material.setVector3("color", ColorModule.lightBlue);
        material.setVector3("waterColor", ColorModule.lightBlue);
        material.setVector3("terrainColor", ColorModule.grass);
        material.setVector3("darkTerrainColor", ColorModule.darkGrass);
        material.setVector3("mountainColor", ColorModule.mountain);
        material.setVector3("snowColor", ColorModule.snow);
        return material;
    }

    const createSkybox = (scene: BABYLON.Scene) => {
        let skyboxTexture = new BABYLON.CubeTexture("./assets/skybox", scene);
        let skyboxMaterial = MaterialModule.createSkyboxMaterial(scene);
        skyboxMaterial.setTexture("skyboxTexture", skyboxTexture);

        let skybox = BABYLON.MeshBuilder.CreateBox("skyBox", {size: 4.0, sideOrientation: BABYLON.Mesh.BACKSIDE}, scene);
        skybox.material = skyboxMaterial;
        return skybox;
    }
        
}
