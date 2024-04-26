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


        let texture1 = new BABYLON.Texture("./assets/heightmaps/Heightmap_01_Mountain.png", scene);
        // let texture1 = new BABYLON.Texture("./assets/heightmaps/worldHeightMap.jpg", scene);

        let texture2 = new BABYLON.Texture("./assets/heightmaps/Heightmap_06_Canyon.png", scene);

        let material = MaterialModule.morphSlope(scene);
        material.setFloat("hs1", 12.0);
        material.setFloat("hs2", 15.0);
        material.setTexture("hm1", texture1);
        material.setTexture("hm2", texture2);
        material.setFloat("blend", 1.0);

        ground.material = material;

        let skybox = createSkybox(scene);
        let c = -0.01;
        let b = 1.0;
        
        var update = function() {
            (skybox.material as BABYLON.ShaderMaterial).setVector3("cameraPosition", camera.position);
            b += c;
            if (b <= 0 || b >= 1) {
                c = c * -1;
            }
            material.setFloat("blend", b);
        }
        scene.registerBeforeRender(update);

        return scene;
    };
    
    const createMaterial = (scene: BABYLON.Scene) => {
        let material = MaterialModule.worldMaterial(scene);
        let texture = new BABYLON.Texture("./assets/heightmaps/worldHeightMap.jpg", scene);

        material.setTexture("heightMap", texture);
        material.setVector3("color", ColorModule.lightBlue);
        material.setVector3("waterColor", ColorModule.lightBlue);
        material.setVector3("terrainColor", ColorModule.grass);
        material.setVector3("darkTerrainColor", ColorModule.darkGrass);
        material.setVector3("mountainColor", ColorModule.mountain);
        material.setVector3("snowColor", ColorModule.snow);
        return material;
    }

    const createSkybox = (scene: BABYLON.Scene) => {
        let skyboxTexture = new BABYLON.CubeTexture("./assets/skybox/skybox", scene);
        let skyboxMaterial = MaterialModule.createSkyboxMaterial(scene);
        skyboxMaterial.setTexture("skyboxTexture", skyboxTexture);

        let skybox = BABYLON.MeshBuilder.CreateBox("skyBox", {size: 4.0, sideOrientation: BABYLON.Mesh.BACKSIDE}, scene);
        skybox.material = skyboxMaterial;
        return skybox;
    }
        
}
