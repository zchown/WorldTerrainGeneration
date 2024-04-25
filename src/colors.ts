import * as BABYLON from 'babylonjs';

export module ColorModule {
    export function hexToVec3(hex: string): BABYLON.Vector3 {
        let color = BABYLON.Color3.FromHexString(hex);
        return BABYLON.Vector3.FromArray(color.toLinearSpace().asArray());
    }

    export let lightBlue = hexToVec3('#ADD8E6')
    export let grass = hexToVec3('#24A532')
    export let darkGrass = hexToVec3('#1D7C2E')
    export let mountain = hexToVec3('#AAAAAA')
    export let snow = hexToVec3('#EEEEEE')
}

