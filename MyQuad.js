/**
 * MyQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyQuad extends CGFobject {
	constructor(scene, coords) {
		super(scene);
		this.initBuffers();
		// if (coords != undefined)
		// 	this.updateTexCoords(coords);
	}
	
	initBuffers() {
		this.vertices = [
			-0.5, -0.5, 0,	//0
			0.5, -0.5, 0,	//1
			-0.5, 0.5, 0,	//2
			0.5, 0.5, 0,  	//3
			
			-0.5, -0.5, 0,	//0
			0.5, -0.5, 0,	//1
			-0.5, 0.5, 0,	//2
			0.5, 0.5, 0		//3
		];

		// Counter-clockwise reference of vertices
		this.indices = [
			0, 2, 1,
			1, 2, 3,

			4, 5, 6,
			5, 7, 6
		];

		this.normals = [];

		for (var i = 0; i < 8; i++) {
			var z = i < 4? -1 : 1;

			this.normals.push(0, 0, z);
		}
		
		/*
		Texture coords (s,t)
		+----------> s
        |
        |
		|
		v
        t
        */

		this.texCoords = [
			1, 1,
			0, 1,
			1, 0.5,
			0, 0.5,

			1, 1,
			0, 1,
			1, 0.5,
			0, 0.5
		]
		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}

	/**
	 * @method updateTexCoords
	 * Updates the list of texture coordinates of the quad
	 * @param {Array} coords - Array of texture coordinates
	 */
	// updateTexCoords(coords) {
	// 	this.texCoords = [...coords];
	// 	this.updateTexCoordsGLBuffers();
	// }

}

