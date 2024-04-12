import * as BABYLON from 'babylonjs'
import  {SceneCreation} from '../src/scene-creation'

export class AppOne {
    engine: BABYLON.Engine;
    scene: BABYLON.Scene;
    constructor(readonly canvas: HTMLCanvasElement) {
        this.engine = new BABYLON.Engine(canvas)
        window.addEventListener('resize', () => {
            this.engine.resize();
        });
        this.scene = SceneCreation.createScene(this.engine, this.canvas)
    }
    debug(debugOn: boolean = true) {
        if (debugOn) {
            this.scene.debugLayer.show({ overlay: true });
        } else {
            this.scene.debugLayer.hide();
        }
    }
    run() {
        this.debug(true);
        this.engine.runRenderLoop(() => {
            this.scene.render();
        });
    }
}


