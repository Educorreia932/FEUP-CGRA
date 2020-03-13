class MyUnitCube extends CGFobject {
	constructor(scene, nDivs) {
		super(scene);
        this.initBuffers();
        
        nDivs = typeof nDivs !== 'undefined' ? nDivs : 1;

        this.nDivs = nDivs;
        this.patchLength = 1.0 / nDivs;
    }
    
	initBuffers() {
        this.vertices = [ 
            0.5, -0.5, 0.5,     // 0
            0.5, -0.5, -0.5,    // 1
            -0.5, -0.5, -0.5,   // 2
            -0.5, -0.5, 0.5,    // 3
            0.5, 0.5, 0.5,      // 4
            0.5, 0.5, -0.5,     // 5
            -0.5, 0.5, -0.5,    // 6 
            -0.5, 0.5, 0.5,      // 7

            0.5, -0.5, 0.5,     // 0
            0.5, -0.5, -0.5,    // 1
            -0.5, -0.5, -0.5,   // 2
            -0.5, -0.5, 0.5,    // 3
            0.5, 0.5, 0.5,      // 4
            0.5, 0.5, -0.5,     // 5
            -0.5, 0.5, -0.5,    // 6 
            -0.5, 0.5, 0.5,      // 7

            0.5, -0.5, 0.5,     // 0
            0.5, -0.5, -0.5,    // 1
            -0.5, -0.5, -0.5,   // 2
            -0.5, -0.5, 0.5,    // 3
            0.5, 0.5, 0.5,      // 4
            0.5, 0.5, -0.5,     // 5
            -0.5, 0.5, -0.5,    // 6 
            -0.5, 0.5, 0.5,      // 7
        ]

		//Counter-clockwise reference of vertices
        this.indices = [
            0, 2, 1,
            0, 3, 2,
            7, 4, 6,
            4, 5, 6,
        ];

        for (var i = 0; i < 4; i++) {
            this.indices.push(i);
            this.indices.push((i + 1) % 4);
            this.indices.push(i + 4);
      
            this.indices.push((i + 1) % 4);
            this.indices.push(((i + 1) % 4) + 4);
            this.indices.push(i + 4);
        }

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
        this.primitiveType = this.scene.gl.TRIANGLES;
        
        // Generating normals
        this.normals = [];

        for (var i = 0; i < 8; i++) {
            var x = i < 2 || (i < 6 && i > 3) ? 1 : -1;

            this.normals.push(x, 0, 0);
        }

        for (var i = 0; i < 8; i++) {
            var y = i < 4 ? -1 : 1;

            this.normals.push(0, y, 0);
        }

        for (var i = 0; i < 8; i++) {
            var z = i == 0 || i == 3 || i == 4 || i == 7 ? 1 : -1;

            this.normals.push(0, 0, z);
        }

        this.primitiveType = this.scene.gl.TRIANGLE_STRIP;
        this.initGLBuffers();
    }

    updateBuffers(complexity){
    
    }
}
