class MyTriangle extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
            -1, -1, 0,
            -1, 1 ,0,
			1, -1, 0,
			
			-1, -1, 0,
            -1, 1 ,0,
            1, -1, 0
		];

		//Counter-clockwise reference of vertices
		this.indices = [
            0, 2, 1,
            3, 4, 5
		];

		// Generating normals
        this.normals = [];

        for (var i = 0; i < 7; i++) {
			var z = i < 3? 1 : -1;

            this.normals.push(0, 0, z);
		}
		
		this.texCoords = [
			0, 0.5,
			0, 0,
			1, 0.5,

			0, 0.5,
			0, 0,
			1, 0.5
		];
		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}