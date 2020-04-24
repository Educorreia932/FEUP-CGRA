/**
* MyVehicle
* @constructor
*/
class MyVehicle extends CGFobject {
    constructor(scene) {
        super(scene);
        //this.mesh = new MyPyramid(scene, 3, 1);
        this.ellipsoid = new MySphere(scene, 50, 50);

        this.pos = vec3.fromValues(0.0,0.0,0.0); //x, y, z
        this.velocity = 0.0;
        this.direction = 0.0;
        this.speedFactor = 1.5;
        this.vehicleFriction = false;
        this.scaleFactor = 1.0;
 
        this.rudder = new MyRudder(scene);
    }

    initBuffers() {
       
    }

    update() {
        if (this.vehicleFriction && this.velocity != 0) 
            this.velocity *= 0.95;
    
        var x = this.pos[0] + this.velocity * this.speedFactor * Math.sin(this.direction);
        var z = this.pos[2] + this.velocity * this.speedFactor * Math.cos(this.direction);

        this.pos = vec3.fromValues(x, 0, z);
        
        if (this.scene.gui.isKeyPressed("KeyW")) 
            console.log(this.direction);
    }

    reset() {
        this.pos = vec3.fromValues(0.0, 0.0, 0.0);
        this.velocity = 0.0;
        this.direction = 0.0;
    }

    turn(val) {
        this.direction += val;
    }

    accelerate(val) {
        if ((this.velocity += val) < 0)
            this.velocity = 0;
    }

    display() {
        this.scene.pushMatrix();

        this.scene.translate(0, 10, 0);
        this.scene.translate(this.pos[0], -this.pos[1], this.pos[2]);
        this.scene.rotate(this.direction, 0, 1, 0);
        
        this.scene.pushMatrix();
        this.scene.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor * 2);
        this.ellipsoid.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 0, -2);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);

        for (var i = 0; i < 4; i++) {
            if (i == 1 || i == 3) {
                // Vertical
            }

            this.rudder.display();

            this.scene.rotate(Math.PI / 2, 1, 0, 0);
        }

        this.scene.popMatrix();

        this.scene.popMatrix();
    }

    enableNormalViz() {
        this.rudder.enableNormalViz();
    }

    disableNormalViz() {
        this.rudder.disableNormalViz();
    }
}