/**
* MyVehicle
* @constructor
*/
class MyVehicle extends CGFobject {
    constructor(scene) {
        super(scene);
        this.mesh = new MyPyramid(scene, 3, 1);
        this.posX = 0.0;
        this.posY = 0.0;
    }

    initBuffers() {
       
    }

    display() {
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.scene.translate(0, -0.5, 0);
        this.mesh.display();
        this.scene.popMatrix();
    }
}