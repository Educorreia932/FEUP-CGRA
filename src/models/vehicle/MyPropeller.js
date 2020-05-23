/**
 * MyPropeller
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyPropeller extends CGFobject {
	constructor(scene) {
        super(scene);
                
        this.sphere = new MySphere(scene, 50, 50); 

        this.propellerAngle = 0;

        this.material = new CGFappearance(this.scene);
		this.material.setAmbient(0.1, 0.1, 0.1, 1);
        this.material.setDiffuse(0.9, 0.9, 0.9, 1);
        this.material.setSpecular(0.5, 0.5, 0.5, 1);
        this.material.setShininess(12.0);
        this.propellerTexture = new CGFtexture(this.scene, "images/propellerTexture.jpg");
        this.propellerTexture2 = new CGFtexture(this.scene, "images/propellerTexture2.jpg");
        this.engineTexture = new CGFtexture(this.scene, "images/engineTexture.jpg");
    }
    
    update(vehicleVelocity) {
        this.propellerAngle += 10 * vehicleVelocity + 0.1;
    }

    display(num) {
        this.scene.pushMatrix();

        this.scene.scale(0.12, 0.12, 0.12);

        //Engine
        this.material.setTexture(this.engineTexture);
        this.material.apply();
        this.scene.pushMatrix();

        this.scene.scale(1, 0.6, 1.7);
        this.sphere.display();

        this.scene.popMatrix();

        //Propeller
        this.material.setTexture(this.propellerTexture2);
        this.material.apply();
        this.scene.pushMatrix();

        this.scene.rotate(this.propellerAngle + num, 0, 0, 1);

        this.scene.pushMatrix();

        this.scene.translate(0, 0, -1.9);
        this.scene.scale(0.2, 0.2, 0.2);
        this.sphere.display();

        this.scene.popMatrix();

        this.material.setTexture(this.propellerTexture);
        this.material.apply();
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

