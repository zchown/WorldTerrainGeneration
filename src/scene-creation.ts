import * as BABYLON from 'babylonjs'
import * as SHADERS from './shader-module'

export module SceneCreation {
    export function createScene(engine: BABYLON.Engine, canvas: HTMLCanvasElement) {
        let scene = new BABYLON.Scene(engine);
        let camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);
        camera.setTarget(BABYLON.Vector3.Zero());
        camera.attachControl(canvas, true);
        let light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
        light.intensity = 0.7;

    let ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 6, height: 6, subdivisions: 500}, scene);



        return scene;
    };
}
