attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec2 vTextureCoord;

uniform float normScale;

//uniform float timeFactor;

varying vec4 textx;

uniform sampler2D uSampler;

void main() {

    vTextureCoord = aTextureCoord;

	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);

    textx = vec4(aVertexPosition, 1.0);
}