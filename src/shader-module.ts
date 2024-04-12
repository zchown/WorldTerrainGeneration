import * as BABYLON from 'babylonjs';

export module ShaderModule {
    export function hexToVec3(hex: string): BABYLON.Vector3 {
    return BABYLON.Vector3.FromArray(BABYLON.Color3.FromHexString(hex).toLinearSpace().asArray());
}


    
}
