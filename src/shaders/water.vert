attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec2 vTextureCoord;

uniform float normScale;

uniform float timeFactor;

uniform sampler2D uSampler2;

void main() {

    vec3 offset=vec3(0.0,0.0,0.0);
    
    //vec4 color = texture2D(uSampler2, vTextureCoord);
    vTextureCoord = aTextureCoord + vec2(0.01*timeFactor, 0.01*timeFactor);

    offset = aVertexNormal*0.05*(texture2D(uSampler2, vTextureCoord).b);

	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offset, 1.0);

	
}