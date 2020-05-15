/**
 * MyFlag
 * @constructor
 */
class MyFlag extends CGFobject {
    constructor(scene) {
        super(scene);
        this.flag = new MyFlagPlane(scene, 30, 0, 1, 0, 1);
        this.ropes = new MyQuad(scene);

        this.flagTexture = new CGFtexture(this.scene, "images/flag.png");
        this.material = new CGFappearance(this.scene);	
        this.material.setAmbient(0.9, 0.9, 0.9, 1);
        this.material.setDiffuse(0.9, 0.9, 0.9, 1);
        this.material.setSpecular(0.1, 0.1, 0.1, 1);
        this.material.setShininess(10.0);
        this.material.setTexture(this.flagTexture);
        this.material.setTextureWrap('REPEAT', 'REPEAT');

        this.ropeTexture = new CGFtexture(this.scene, "images/ropeTexture.jpg");
        this.material2 = new CGFappearance(this.scene);	
        this.material2.setAmbient(0.9, 0.9, 0.9, 1);
        this.material2.setDiffuse(0.9, 0.9, 0.9, 1);
        this.material2.setSpecular(0.1, 0.1, 0.1, 1);
        this.material2.setShininess(10.0);
        this.material2.setTexture(this.ropeTexture);
        this.material2.setTextureWrap('REPEAT', 'REPEAT');

        this.flagShader = new CGFshader(this.scene.gl, "shaders/flag.vert", "shaders/flag.frag");
    }

    display() {
        this.scene.setActiveShader(this.flagShader);
        this.material.apply();

        this.scene.pushMatrix();

        //this.scene.translate(0, 0, -4);
        //this.scene.rotate(Math.PI/2, 0, 1, 0);
        //this.scene.scale(1.5, 1, 1);
        this.scene.scale(2, 1, 1);
        
        this.flag.display();
        
        this.scene.popMatrix();
        
        this.scene.setActiveShader(this.scene.defaultShader);

        this.material2.apply();
        this.scene.pushMatrix();
        this.scene.translate(-1.5, 0.45, 0);
        this.scene.scale(1, 0.05, 1);

        this.ropes.display();

        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-1.5, -0.45, 0);
        this.scene.scale(1, 0.05, 1);

        this.ropes.display();

        this.scene.popMatrix();

    }
}