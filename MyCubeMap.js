class MyCubeMap extends CGFobject {
	constructor(scene, nDivs) {
		super(scene);
        this.initBuffers();
        
        nDivs = typeof nDivs !== 'undefined' ? nDivs : 1;

        this.nDivs = nDivs;
        this.patchLength = 1.0 / nDivs;

        this.material = new CGFappearance(this.scene);
        this.material.setAmbient(1.0, 1.0, 1.0, 1.0);
        this.material.setDiffuse(0.5, 0.5, 0.5, 0.5);
        this.material.setSpecular(0.0, 0.0, 0.0, 1.0);
        this.material.loadTexture("images/cubemap.png")
    }
    
	initBuffers() {
        this.vertices = [ 
            // X Plane = 0.5
            0.5, -0.5, 0.5, 
            0.5, -0.5, -0.5, 
            0.5, 0.5, 0.5, 
            0.5, 0.5, -0.5, 

            // X Plane = -0.5
            -0.5, -0.5, 0.5,
            -0.5, -0.5, -0.5,
            -0.5, 0.5, 0.5,
            -0.5, 0.5, -0.5,

            // Y Plane = -0.5
            -0.5, -0.5, 0.5,
            0.5, -0.5, 0.5,
            -0.5, -0.5, -0.5,
            0.5, -0.5, -0.5,

            // Y Plane = 0.5
            -0.5, 0.5, 0.5,
            -0.5, 0.5, -0.5,
            0.5, 0.5, 0.5,
            0.5, 0.5, -0.5,

            // Z Plane = 0.5 
            -0.5, -0.5, 0.5,
            -0.5, 0.5, 0.5,
            0.5, -0.5, 0.5,
            0.5, 0.5, 0.5,

            // Z Plane = -0.5
            -0.5, -0.5, -0.5,
            0.5, -0.5, -0.5,
            -0.5, 0.5, -0.5,
            0.5, 0.5, -0.5,
        ]

		//Counter-clockwise reference of vertices
        this.indices = [
            // X Plane = 0.5
            1, 2, 3,
            0, 2, 1,

            // X Plane = -0.5
            4, 5, 6,
            5, 7, 6,

            // Y Plane = -0.5
            8, 9, 10,
            9, 11, 10,  

            // Y Plane = 0.5
            12, 13, 14,
            13, 15, 14,

            // Z Plane = 0.5 
            16, 17, 18,
            17, 19, 18,

            // Z Plane = -0.5
            20, 21, 22,
            21, 23, 22
        ];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
        this.primitiveType = this.scene.gl.TRIANGLES;
        
        // Generating normals
        this.normals = [];

        for (var i = 0; i < 8; i++) {
            var x = i < 2 || (i < 6 && i > 3) ? 1 : -1;

            this.normals.push(-x, 0, 0);
        }

        for (var i = 0; i < 8; i++) {
            var y = i < 4 ? -1 : 1;

            this.normals.push(0, -y, 0);
        }

        for (var i = 0; i < 8; i++) {
            var z = i == 0 || i == 3 || i == 4 || i == 7 ? 1 : -1;

            this.normals.push(0, 0, -z);
        }

        this.texCoords = [
            
		]

        this.initGLBuffers();
    }

    display() {
        this.scene.pushMatrix();

        this.scene.scale(5, 5, 5);
        this.material.apply();
        super.display();

        this.scene.popMatrix();  
    }

    updateBuffers(complexity){
        
    }
}
