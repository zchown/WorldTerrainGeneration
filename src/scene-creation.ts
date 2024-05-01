import * as BABYLON from 'babylonjs'
import { MaterialModule } from '../src/materials'
import { ColorModule } from '../src/colors'

export module SceneCreation {
    export function createScene(engine: BABYLON.Engine, canvas: HTMLCanvasElement) {
        let scene = new BABYLON.Scene(engine);
        let camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI/2, 1, 10, new BABYLON.Vector3(0, 0, 0), scene);
        camera.attachControl(canvas, true);


        let skybox = createSkybox(scene);

        // let foo = mophingTextures(scene);

        // let foo = shiftingMaterial(scene);
        // let foo = blinnMorph(scene, camera);
        let foo = bigScene(scene, camera);
        let bar = createWater(scene, camera);
        let foo2 = lightTest(scene);


        var update = function() {
            (skybox.material as BABYLON.ShaderMaterial).setVector3("cameraPosition", camera.position);
            foo = foo();
            bar = bar();
            foo2 = foo2();
            
        }

        scene.registerBeforeRender(update);

        return scene;
    };

    const lightTest = (scene: BABYLON.Scene) => {
        let material = MaterialModule.lightBall(scene);
        let sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 0.5}, scene);
        material.setVector3("color", ColorModule.hexToVec3("#f4f39d"));

        sphere.material = material;
        sphere.position.y = 0;
        sphere.position.x = 0;
        sphere.position.z = 0;

        const curry = function(m: BABYLON.ShaderMaterial, t: number) {
            let doubleCurry = function() {
                m.setFloat("time", t);
                return curry(m, t + 0.01);
            }
            return doubleCurry;
        }
        return curry(material, 0);
    }

    const createWater = (scene: BABYLON.Scene, camera: BABYLON.ArcRotateCamera) => {
        let water = BABYLON.MeshBuilder.CreateBox("water", {width: 12, height: 12, depth: 0.1}, scene);
        water.subdivide(1000);
        water.position.y = 0.3;
        water.rotation.x = Math.PI / 2;
        let material = MaterialModule.waterMaterial(scene);
        water.material = material;
        let tex = new BABYLON.Texture("./assets/textures/water.jpg", scene);
        material.setTexture("heightMap", tex);
        material.setFloat("heightScale", 1.5);
        material.alpha = 0.5;
        const lightIntensity = 0.7;
        let lightDirection = new BABYLON.Vector3(0, 0, 0);
        const ambientIntensity = 0.5;
        const lightColor = ColorModule.hexToVec3("#f4f39d");
        const ambientLightColor = ColorModule.hexToVec3("#FFFFFF");
        const specularColor = ColorModule.hexToVec3("#FFFFFF");
        material.setVector3("lightDirection", lightDirection);
        material.setFloat("lightIntensity", lightIntensity);
        material.setVector3("lightColor", lightColor);
        material.setVector3("ambientLightColor", ambientLightColor);
        material.setFloat("ambientIntensity", ambientIntensity);
        material.setVector3("viewPosition", camera.position);
        material.setVector3("specularColor", specularColor);
        material.setFloat("specularIntensity", 2);
        material.setVector3("surfaceColor", ColorModule.hexToVec3("#325dad"));
        material.setFloat("time", 0.0);

        const foo = function(m: BABYLON.ShaderMaterial) {
            const curry = function(t: number) {
                const doubleCurry = function() {
                    m.setFloat("time", t)
                    return curry(t + 0.0001);
                }
                return doubleCurry
            }
            return curry(0.0)
        }
        return foo(material);

    }

    
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
        let hs = [10.0, 10.0, 10.0, 10.0];
        let b = 0.0;

        // blinn stuff
        const lightIntensity = 10
        let lightDirection = new BABYLON.Vector3(5, 3, 0.7);
        let lightBall = BABYLON.MeshBuilder.CreateSphere("ball", {diameter: 0.2}, scene);
        lightBall.position = lightDirection;
        lightBall.material = MaterialModule.lightBall(scene);
        const surfaceColor = ColorModule.hexToVec3("#892bb6");
        const lightColor = ColorModule.hexToVec3("#FFFFFF");
        (lightBall.material as BABYLON.ShaderMaterial).setVector3("color", lightColor);
        (lightBall.material as BABYLON.ShaderMaterial).setVector3("pos", lightDirection);
        lightBall.material.backFaceCulling = false;
        const ambientIntensity = 0.0;
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
        material.setFloat("specularIntensity", 50.0);

        ground.material = material;

        let foo = function(m: BABYLON.ShaderMaterial, texArray: BABYLON.Texture[], hs: number[], camera: BABYLON.ArcRotateCamera, lb: BABYLON.Mesh, ld: BABYLON.Vector3) {
            let curry = function(b: number, ld: BABYLON.Vector3) {
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
                    let s = new BABYLON.Vector3(-0.005, 0, 0);
                    (lb.material as BABYLON.ShaderMaterial).setVector3("pos", ld);
                    lb.position = ld;
                    m.setVector3("lightDirection", ld);
                    

                    return curry(b + 0.005, ld.add(s));
                }
                return doubleCurry;
            }
            return curry(0, ld);
        }
        return foo(material, texArray, hs, camera, lightBall, lightDirection);
    }

     const mophingTextures = (scene: BABYLON.Scene) => {
        let ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 12, height: 6, subdivisions: 2000}, scene);
        ground.position.y = 0;


        let texture1 = new BABYLON.Texture("./assets/heightmaps/Heightmap_01_Mountain.png", scene);
        let texture2 = new BABYLON.Texture("./assets/heightmaps/Heightmap_06_Canyon.png", scene);
        let texture3 = new BABYLON.Texture("./assets/heightmaps/Heightmap_02_Hills.png", scene);
        let texture4 = new BABYLON.Texture("./assets/heightmaps/new.png", scene);

        let noise = new BABYLON.Texture("./assets/textures/noisy.png", scene);
        let grass = new BABYLON.Texture("./assets/textures/grass.jpg", scene);
        let rock = new BABYLON.Texture("./assets/textures/rock.jpg", scene);
        let snow = new BABYLON.Texture("./assets/textures/snow.jpg", scene);
        let r = new BABYLON.Texture("./assets/textures/random.png", scene);
        let tree = new BABYLON.Texture("./assets/textures/tree.jpg", scene);
        let r2 = new BABYLON.Texture("./assets/textures/random2.jpg", scene);
    

        let material = MaterialModule.morphTexture(scene);
        material.setTexture("grass", grass);
        material.setTexture("rock", rock);
        material.setTexture("snow", snow);
        material.setTexture("rnoise", r);
        material.setTexture("rnoise2", r2);
        material.setTexture("tree", tree);
        material.setTexture("noise", noise);
        material.setFloat("hs1", 15.0);
        material.setFloat("hs2", 15.0);
        material.setTexture("hm1", texture1);
        material.setTexture("hm2", texture2);
        material.setFloat("blend", 1.0);
        material.backFaceCulling = false;

        let texArray = [texture1, texture2, texture3, texture4];
        let hs = [10.0, 10.0, 10.0, 2.0];
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
    const bigScene = (scene: BABYLON.Scene, camera: BABYLON.ArcRotateCamera) => {
        let ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 12, height: 12, subdivisions: 2000}, scene);
        ground.position.y = 0;

        let texture1 = new BABYLON.Texture("./assets/heightmaps/Heightmap_01_Mountain.png", scene);
        let texture2 = new BABYLON.Texture("./assets/heightmaps/Heightmap_06_Canyon.png", scene);
        let texture3 = new BABYLON.Texture("./assets/heightmaps/Heightmap_02_Hills.png", scene);
        let texture4 = new BABYLON.Texture("./assets/heightmaps/new.png", scene);

        let noise = new BABYLON.Texture("./assets/textures/noisy.png", scene);
        let grass = new BABYLON.Texture("./assets/textures/grass.jpg", scene);
        let rock = new BABYLON.Texture("./assets/textures/rock.jpg", scene);
        let snow = new BABYLON.Texture("./assets/textures/snow.jpg", scene);
        let r = new BABYLON.Texture("./assets/textures/random.png", scene);
        let tree = new BABYLON.Texture("./assets/textures/tree.jpg", scene);
        let r2 = new BABYLON.Texture("./assets/textures/random2.jpg", scene);


        let material = MaterialModule.morphTextureBlinn(scene);
        material.setTexture("grass", grass);
        material.setTexture("rock", rock);
        material.setTexture("snow", snow);
        material.setTexture("rnoise", r);
        material.setTexture("rnoise2", r2);
        material.setTexture("tree", tree);
        material.setTexture("noise", noise);
        material.setFloat("hs1", 15.0);
        material.setFloat("hs2", 15.0);
        material.setTexture("hm1", texture1);
        material.setTexture("hm2", texture2);
        material.setFloat("blend", 1.0);
        material.backFaceCulling = false;

        let texArray = [texture1, texture2, texture3, texture4];
        let hs = [10.0, 10.0, 10.0, 2.0];
        let b = 0.0;
        const lightIntensity = 0.7;
        let lightDirection = new BABYLON.Vector3(0, 0, 0);
        const ambientIntensity = 0.3;
        const lightColor = ColorModule.hexToVec3("#f4f39d");
        const ambientLightColor = ColorModule.hexToVec3("#FFFFFF");
        const specularColor = ColorModule.hexToVec3("#FFFFFF");
        let world4x4 = ground.getWorldMatrix();
        let normalMatrix4x4 = new BABYLON.Matrix();
        world4x4.toNormalMatrix(normalMatrix4x4);
        let inverseTranspose3x3 = BABYLON.Matrix.GetAsMatrix3x3(world4x4);
        material.setMatrix3x3("inverseTranspose", inverseTranspose3x3);
        material.setVector3("lightDirection", lightDirection);
        material.setFloat("lightIntensity", lightIntensity);
        material.setVector3("lightColor", lightColor);
        material.setVector3("ambientLightColor", ambientLightColor);
        material.setFloat("ambientIntensity", ambientIntensity);
        material.setVector3("viewPosition", camera.position);
        material.setVector3("specularColor", specularColor);
        material.setFloat("specularIntensity", 2.0);
        material.setFloat("time", 0.0);


        ground.material = material;

        let foo = function(m: BABYLON.ShaderMaterial, texArray: BABYLON.Texture[], hs: number[], b: number) {
            let curry = function(b: number, time: number) {
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
                    m.setFloat("time", time);

                    m.setFloat("blend", b2);
                    return curry(b + 0.005, time + 0.01);
                }
                return doubleCurry;
            }
            return curry(0, 0.0);
        }
        return foo(material, texArray, hs, b);
    }

}
