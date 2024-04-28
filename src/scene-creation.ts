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
        // let foo = shiftingMaterial(scene);
        let foo = blinnMorph(scene, camera);

        var update = function() {
            (skybox.material as BABYLON.ShaderMaterial).setVector3("cameraPosition", camera.position);
            //foo = foo();
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
            return curry(0);
        }
        return foo(material, texArray, hs, b);
    }
        
    const blinnMorph = (scene: BABYLON.Scene, camera: BABYLON.ArcRotateCamera) => {
        let ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 12, height: 6, subdivisions: 1000}, scene);

        // let ground= BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 2});
        ground.position.y = 1;
        ground.position.x = 1.5;



        // morph stuff
        let texture1 = new BABYLON.Texture("./assets/heightmaps/Heightmap_01_Mountain.png", scene);
        let texture2 = new BABYLON.Texture("./assets/heightmaps/Heightmap_06_Canyon.png", scene);
        let texture3 = new BABYLON.Texture("./assets/heightmaps/Heightmap_02_Hills.png", scene);
        let texture4 = new BABYLON.Texture("./assets/heightmaps/Heightmap_09_Archipelago.png", scene);
        let material = MaterialModule.blinnMorph(scene);
        material.setFloat("hs1", 15.0);
        material.setFloat("hs2", 15.0);
        material.setTexture("hm1", texture1);
        material.setTexture("hm2", texture2);
        material.setFloat("blend", 1.0);
        material.backFaceCulling = false;
        let texArray = [texture1, texture2, texture3, texture4];
        let hs = [10.0, 12.0, 15.0, 20.0];
        let b = 0.0;

        // blinn stuff
        const lightIntensity = 3.0;
        const lightDirection = new BABYLON.Vector3(-0.5, -1, 0.7);
        const surfaceColor = ColorModule.hexToVec3("#892bb6");
        const lightColor = ColorModule.hexToVec3("#f4f39d");
        const ambientIntensity = 0.8;
        const ambientLightColor = ColorModule.hexToVec3("#892bb6");
        const specularColor = ColorModule.hexToVec3("#FFFFFF");
        let world4x4 = ground.getWorldMatrix();
        let normalMatrix4x4 = new BABYLON.Matrix();
        world4x4.toNormalMatrix(normalMatrix4x4);
        let inverseTranspose3x3 = BABYLON.Matrix.GetAsMatrix3x3(world4x4);
        material.setMatrix3x3("inverseTranspose", inverseTranspose3x3);
        material.setVector3("surfaceColor", surfaceColor);
        material.setVector3("lightDirection", lightDirection);
        material.setFloat("lightIntensity", lightIntensity);
        material.setVector3("lightColor", lightColor);
        material.setVector3("ambientLightColor", ambientLightColor);
        material.setFloat("ambientIntensity", ambientIntensity);
        material.setVector3("viewPosition", camera.position);
        material.setVector3("specularColor", specularColor);
        material.setFloat("specularIntensity", 0.0);

        ground.material = material;

        let foo = function(m: BABYLON.ShaderMaterial, texArray: BABYLON.Texture[], hs: number[], b: number, camera: BABYLON.ArcRotateCamera) {
            let curry = function(b: number) {
                let doubleCurry = function() {
                    // morph stuff
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

                    // blinn stuff
                    m.setVector3("viewPosition", camera.position);


                    return curry(b + 0.005);
                }
                return doubleCurry;
            }
            return curry(0);
        }
        return foo(material, texArray, hs, b, camera);
    }
}
