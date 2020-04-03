class MyUnitQuadCube extends CGFobject {
	constructor(scene) {
		super(scene);
        this.initBuffers();
        this.square = new MyQuad(scene);
    }
    
	display() {
        this.scene.pushMatrix();
        this.square.display(); 

        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.scene.rotate(-Math.PI / 2, 0, 0, 1); 
        this.square.display(); 

        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.scene.rotate(Math.PI / 2, 0, 0, 1); 
        this.square.display(); 
        
        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.scene.rotate(Math.PI / 2, 1, 0, 0); 
        this.square.display(); 

        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.scene.rotate(-Math.PI / 2, 1, 0, 0); 
        this.square.display(); 

        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.scene.translate(0, 1, 0);
        this.square.display(); 
    }
}

