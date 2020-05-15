/**
* MyBillboard
* @constructor
*/
class MyBillboard extends CGFobject {
    constructor(scene) {
        super(scene);
        this.supplies = 0.0;
        this.base = new MyQuad(scene, 
            [0, 1,
             1, 1,
             0, 0.5,
             1, 0.5,
             
             0, 0.5, 
             1, 0.5, 
             0, 0, 
             1, 0]);
        this.beam = new MyQuad(scene);
        this.bar = new MyPlane(scene, 100, 0, 1, 0, 1);

        this.material = new CGFappearance(this.scene);
		this.material.setAmbient(0.1, 0.1, 0.1, 1);
        this.material.setDiffuse(0.9, 0.9, 0.9, 1);
        this.material.setSpecular(0.1, 0.1, 0.1, 1);
        this.material.setShininess(10.0);

        this.material2 = new CGFappearance(this.scene);
		this.material2.setAmbient(0.1, 0.1, 0.1, 1);
        this.material2.setDiffuse(0.9, 0.9, 0.9, 1);
        this.material2.setSpecular(0.1, 0.1, 0.1, 1);
        this.material2.setShininess(10.0);
        
        this.baseTexture = new CGFtexture(this.scene, "images/billboard.png");
        this.beamTexture = new CGFtexture(this.scene, "images/beamTexture.png");

        this.progressShader = new CGFshader(this.scene.gl, "shaders/progress.vert", "shaders/progress.frag");
        this.progressShader.setUniformsValues({uSampler : 2});
        this.progressShader.setUniformsValues({nSupplies: this.scene.nSupplies});
        
    }

    updateSupplies() {
        this.progressShader.setUniformsValues({nSupplies: this.scene.nSupplies});
    }

    reset() {
        this.supplies = 0;
        this.updateSupplies();
    }

    display() {
        this.material.setTexture(this.beamTexture); 
        this.material.apply();
        this.scene.pushMatrix();
        this.scene.translate(-0.95, 0, 0);
        this.scene.scale(0.1, 1, 1); 
        this.beam.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.95, 0, 0);
        this.scene.scale(0.1, 1, 1); 
        this.beam.display();
        this.scene.popMatrix();
       
        this.material.setTexture(this.baseTexture); 
        this.material.apply();
        this.scene.pushMatrix();
        this.scene.scale(2, 1, 1);
        this.scene.translate(0, 1, 0);
        this.base.display();
        this.scene.popMatrix();

 
        
        this.material2.apply();
        this.scene.pushMatrix();
        this.scene.translate(0, 0.9, 0.005);
        this.scene.scale(1.5, 0.2, 1); 
        this.scene.setActiveShader(this.progressShader);
        this.bar.display();
        this.scene.popMatrix();
        this.scene.setActiveShader(this.scene.defaultShader);
    }
}
