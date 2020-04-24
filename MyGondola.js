/**
 * MyGondola
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyGondola extends CGFobject {
	constructor(scene) {
        super(scene);
                
        this.cylinder = new MyCylinder(scene, 50);   
        this.sphere = new MySphere(scene, 50, 50); 
	}

    display() {
        this.scene.pushMatrix();

        this.scene.scale(0.2, 0.2, 0.2);
        this.scene.translate(0, -5, 0)

        this.scene.pushMatrix();

        this.scene.scale(1, 1, 6);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.cylinder.display();
        
        this.scene.popMatrix();

        for (var i = 0; i < 2; i++) {
            var z = i < 1? 3: -3;

            this.scene.pushMatrix();

            this.scene.translate(0, 0, z);
            this.sphere.display();
    
            this.scene.popMatrix();
        }
        
        this.scene.popMatrix();
    }
}

