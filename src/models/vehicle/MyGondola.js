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

        this.material = new CGFappearance(this.scene);
		this.material.setAmbient(0.3, 0.3, 0.3, 1);
        this.material.setDiffuse(0.9, 0.9, 0.9, 1);
        this.material.setSpecular(0.1, 0.1, 0.1, 1);
        this.material.setShininess(10.0);

        this.gondolaTexture = new CGFtexture(this.scene, "images/gondolaTexture.jpg");
        this.gondolaFrontTexture = new CGFtexture(this.scene, "images/gondolasphere1.jpg");
	}

    display() {
        this.scene.pushMatrix();
        this.material.setTexture(this.gondolaTexture);
        this.material.apply();

        this.scene.scale(0.2, 0.2, 0.2);
        this.scene.translate(0, -5, 0)

        this.scene.pushMatrix();

        this.scene.scale(1, 1, 6);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.cylinder.display();
        
        this.scene.popMatrix();

        for (var i = 0; i < 2; i++) {
            var z = i < 1? -3: 3;

            this.scene.pushMatrix();

            this.scene.translate(0, 0, z);
            this.sphere.display();
    
            this.scene.popMatrix();
            this.material.setTexture(this.gondolaFrontTexture);
            this.material.apply();
        }
        
        this.scene.popMatrix();
    }
}

