/**
 * MyPropeller
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyPropeller extends CGFobject {
	constructor(scene) {
        super(scene);
                
        this.sphere = new MySphere(scene, 50, 50); 
	}

    display() {
        this.scene.pushMatrix();

        this.scene.scale(0.12, 0.12, 0.12);

        this.scene.pushMatrix();

        this.scene.scale(1, 0.6, 1.7);
        this.sphere.display();

        this.scene.popMatrix();

        this.scene.pushMatrix();

        // this.scene.rotate(Math.PI / 3, 0, 0, 1);

        this.scene.pushMatrix();

        this.scene.translate(0, 0, -1.9);
        this.scene.scale(0.2, 0.2, 0.2);
        this.sphere.display();

        this.scene.popMatrix();

        this.scene.pushMatrix();

        this.scene.translate(0, 0.7, -1.7);
        this.scene.scale(0.2, 0.7, 0.1);
        this.sphere.display();

        this.scene.popMatrix();

        this.scene.pushMatrix();
        
        this.scene.rotate(Math.PI, 0, 0, 1);
        this.scene.translate(0, 0.7, -1.7);
        this.scene.scale(0.2, 0.7, 0.1);
        this.sphere.display();

        this.scene.popMatrix();

        this.scene.popMatrix();

        this.scene.popMatrix();
    }
}

