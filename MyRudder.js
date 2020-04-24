/**
 * MyRudder
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyRudder extends CGFobject {
	constructor(scene, coords) {
        super(scene);
                
        this.quad = new MyQuad(scene);   
        this.triangle = new MyTriangle(scene); 
	}

    display() {
        this.scene.pushMatrix();
        
        this.scene.scale(0.75, 0.75, 0.75);
        this.scene.translate(0, 0, 1);
        this.scene.rotate(Math.PI / 2, 1, 0, 0)
        this.quad.display();
        
        this.scene.pushMatrix()
        
        this.scene.scale(0.5, 0.5, 0.5);
        this.scene.rotate(Math.PI / 2, 0, 0, 1);
        this.scene.translate(0, 2, 0);
        this.triangle.display();

        this.scene.popMatrix();
        this.scene.popMatrix();
    }

    enableNormalViz() {
        this.quad.enableNormalViz();
        this.triangle.enableNormalViz();
    }

    disableNormalViz() {
        this.quad.disableNormalViz();
        this.triangle.disableNormalViz();
    }
}

