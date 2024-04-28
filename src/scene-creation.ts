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

        let skybox = createSkybox(scene);
        let foo = shiftingMaterial(scene);

        var update = function() {
            (skybox.material as BABYLON.ShaderMaterial).setVector3("cameraPosition", camera.position);
            foo = foo();
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

    const shiftingMaterial = (scene: BABYLON.Scene) => {
        let ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 12, height: 6, subdivisions: 1000}, scene);
        ground.position.y = 0;


        let texture1 = new BABYLON.Texture("./assets/heightmaps/Heightmap_01_Mountain.png", scene);

        let texture2 = new BABYLON.Texture("./assets/heightmaps/Heightmap_06_Canyon.png", scene);

        let texture3 = new BABYLON.Texture("./assets/heightmaps/Heightmap_02_Hills.png", scene);
        let texture4 = new BABYLON.Texture("./assets/heightmaps/Heightmap_09_Archipelago.png", scene);

        let material = MaterialModule.slopeHeight(scene);
        material.setFloat("hs1", 15.0);
        material.setFloat("hs2", 15.0);
        material.setTexture("hm1", texture1);
        material.setTexture("hm2", texture2);
        material.setFloat("blend", 1.0);
        material.backFaceCulling = false;

        let texArray = [texture1, texture2, texture3, texture4];
        let hs = [10.0, 12.0, 15.0, 20.0];
        let b = 0.0;
        ground.material = material;

        let foo = function(m: BABYLON.ShaderMaterial, texArray: BABYLON.Texture[], hs: number[], b: number) {
            let curry = function(b: number) {
                let doubleCurry = function() {
                    let b2 = b;
                    let t = texArray.length;

                    b2 = b % 1.0;

                    let t1 = Math.floor(b / 1) % t;
                    let t2 = Math.floor((b / 1) + 1) % t;

                    m.setTexture("hm1", texArray[t2]);
                    m.setTexture("hm2", texArray[t1]);
                    m.setFloat("hs1", hs[t2]);
                    m.setFloat("hs2", hs[t1]);
                
                    m.setFloat("blend", b2);
                    return curry(b + 0.005);
                }
                return doubleCurry;
            }
            console.log("curry");
            return curry(0);
        }
        return foo(material, texArray, hs, b);
    }
        
}
