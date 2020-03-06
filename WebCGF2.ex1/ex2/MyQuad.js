class MyQuad extends CGFobject {
	constructor(scene) {
		super(scene);
        this.initBuffers();
    }
    
	initBuffers() {
		this.vertices = [
            0.5, -0.5, 0.5,     // 0
            0.5, -0.5, -0.5,    // 1
            -0.5, -0.5, -0.5,    // 2
            -0.5, -0.5, 0.5,   // 3
		];

		//Counter-clockwise reference of vertices
		this.indices = [
            0, 1, 2,
            0, 2, 3,
            0, 3, 2,
            0, 2, 1
        ];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;
		
		this.initGLBuffers();
    }
}

