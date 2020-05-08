attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec2 vTextureCoord;

uniform float normScale;
uniform float timeFactor;
uniform float velocity;

uniform sampler2D uSampler2;

void main() {
    vec3 offset=vec3(0.0, 0.0, 1.0);
    
    vTextureCoord = aTextureCoord;

    offset *= cos((aVertexPosition.x + timeFactor + velocity) * 3.0) * 0.5 * (aVertexPosition.x - 0.5);

	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offset, 1.0);
}