class MyCylinder extends CGFobject {
    /**
	 * @method constructor
	 * @param  {CGFscene} scene - MyScene object
	 * @param  {integer} slices - number of slices around Y axis
	 */
    constructor(scene, slices) {
		super(scene);
        this.longDivs = slices;

		this.initBuffers();
    }
    
    /**
	 * @method initBuffers
	 * Initializes the sphere buffers
	 */
	initBuffers() {
        this.vertices = [];
		this.indices = [];
		this.normals = [];
		this.texCoords = [];

		var theta = 0;
		var thetaInc = (2 * Math.PI) / this.longDivs;

        for (let i = 0; i < 2; i++) {
            for (let longitude = 0; longitude <= this.longDivs; longitude++) {
                //--- Vertices coordinates
                var x = Math.cos(theta);
                var y = i;
                var z = Math.sin(theta);

                this.vertices.push(x, y, z);
    
                //--- Normals
                this.normals.push(-Math.cos(theta), 0, Math.sin(theta))

                theta += thetaInc;
            }
        }
        
        //--- Indices
        for (let i = 0; i <= this.longDivs; i++) {
            var first = i + 1;
            var second = (i + 1 + this.longDivs - 2) % this.longDivs + this.longDivs + 1;
            var third = i + 1 + this.longDivs;

            this.indices.push(first);
            this.indices.push(second);
            this.indices.push(third);

            var fourth = i + 1
            var sixth = (i + 1 + this.longDivs - 2) % this.longDivs + this.longDivs + 1;
            var fifth = sixth - this.longDivs;

            this.indices.push(fourth);
            this.indices.push(fifth);
            this.indices.push(sixth);
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
    }
}