/**
 * MyFlag
 * @constructor
 */
class MyFlag extends CGFobject {
    constructor(scene) {
        super(scene);
        this.plane = new MyPlane(scene, 30, 0, 1, 0, 1);

        this.flagTexture = new CGFtexture(this.scene, "images/flag.png");
        this.material = new CGFappearance(this.scene);	
        this.material.setAmbient(0.1, 0.1, 0.1, 1);
        this.material.setDiffuse(0.9, 0.9, 0.9, 1);
        this.material.setSpecular(0.1, 0.1, 0.1, 1);
        this.material.setShininess(10.0);
        this.material.setTexture(this.flagTexture);
        // this.material.setTextureWrap('REPEAT', 'REPEAT');

        this.flagShader = new CGFshader(this.scene.gl, "shaders/flag.vert", "shaders/flag.frag");
    }

    display() {
        this.material.apply();
        // this.scene.setActiveShader(this.flagShader);
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.scene.scale(20, 20, 20);
        this.plane.display();
        this.scene.popMatrix();
    }
}