export module ShaderModule {
    export let defaultVertexShader = `
        precision highp float;
        attribute vec3 position;
        uniform mat4 worldViewProjection;
        void main() {
            gl_Position = worldViewProjection * vec4(position, 1.0);
        }
    `;

    export let defaultFragmentShader = `
        precision highp float;
        uniform vec3 color;
        void main(void) {
            gl_FragColor = vec4(color, 1.0);
        }
    `;
}
