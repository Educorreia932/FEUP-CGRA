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
    vec3 offset=vec3(0.0, 0.0, 0.0);
    float PI = 3.14159265359;
    vTextureCoord = aTextureCoord;

    //vec3 offset = vec3(0.0, 0.0, cos(aVertexPosition.x + timeFactor) * 3.0 * (aVertexPosition-0.5));//cos((aVertexPosition.x + timeFactor + 0.5*velocity) * 3.0) * 0.5 * (aVertexPosition.x - 0.5));
    if(aTextureCoord.x > 0.001)
        offset = vec3(0.0, 0.0, sin(aTextureCoord.x*6.0*PI + timeFactor) * 0.01);
	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offset, 1.0);
}