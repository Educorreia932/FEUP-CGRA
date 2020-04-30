/**
* MyVehicle
* @constructor
*/
class MyVehicle extends CGFobject {
    constructor(scene) {
        super(scene);
        
        this.balloon = new MySphere(scene, 50, 50);

        this.pos = vec3.fromValues(0.0, 10.0, 0.0); //x, y, z
        this.velocity = 0.0;
        this.direction = 0.0;
        this.speedFactor = 1.5;
        this.vehicleFriction = false;
        this.scaleFactor = 1.0;
 
        this.rudder = new MyRudder(scene);
        this.gondola = new MyGondola(scene);
        this.propeller = new MyPropeller(scene);

        this.rudderAngle = 0;

        this.material = new CGFappearance(this.scene);
		this.material.setAmbient(0.1, 0.1, 0.1, 1);
        this.material.setDiffuse(0.9, 0.9, 0.9, 1);
        this.material.setSpecular(0.1, 0.1, 0.1, 1);
        this.material.setShininess(10.0);
        
        this.balloonTexture = new CGFtexture(this.scene, "images/balloonTexture.jpg");
        this.gondolaTexture = new CGFtexture(this.scene, "images/gondolaTexture.jpg");
        this.rudderTexture = new CGFtexture(this.scene, "images/rudderTexture.jpg");
		
    }

    initBuffers() {
       
    }

    update() {
        if (this.vehicleFriction && this.velocity != 0) 
            this.velocity *= 0.95;
    
        var x = this.pos[0] + this.velocity * this.speedFactor * Math.sin(this.direction);
        var z = this.pos[2] + this.velocity * this.speedFactor * Math.cos(this.direction);
        var y = this.pos[1];

        this.pos = vec3.fromValues(x, y, z);
        
        if (this.scene.gui.isKeyPressed("KeyW")) 
            console.log(this.direction);

        if(this.rudderAngle > 0) {
            if((this.rudderAngle -= 0.1)<0)
                this.rudderAngle = 0;
        }
        else if(this.rudderAngle < 0) {
            if((this.rudderAngle += 0.1)>0)
                this.rudderAngle = 0;
        }

        this.propeller.update(this.velocity);
    }

    reset() {
        this.pos = vec3.fromValues(0.0, 10.0, 0.0);
        this.velocity = 0.0;
        this.direction = 0.0;
    }

    turn(val) {
        this.direction += val;

        if((this.rudderAngle += val*0.5) > Math.PI/6)
            this.rudderAngle = Math.PI/6;
        else if(this.rudderAngle < -Math.PI/6)
            this.rudderAngle = -Math.PI/6;
    }

    accelerate(val) {
        if ((this.velocity += val) < 0)
            this.velocity = 0;
    }

    display() {
        
        this.scene.pushMatrix();

        this.scene.translate(this.pos[0], this.pos[1], this.pos[2]);
        this.scene.rotate(this.direction, 0, 1, 0);
        

        //Balloon
        this.scene.pushMatrix();
        
        this.material.setTexture(this.balloonTexture);
        this.material.apply();
        this.scene.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor * 2);
        this.balloon.display();

        this.scene.popMatrix();

        //Rudders
        this.material.setTexture(this.rudderTexture);
        this.material.apply();
        this.scene.pushMatrix();

        this.scene.translate(0, 0, -2);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);

        for (var i = 0; i < 4; i++) {
            if (i == 1) {
                this.scene.pushMatrix();
                this.scene.rotate(this.rudderAngle, 0, 0, 1);
                this.rudder.display();
                this.scene.popMatrix();
            }
            else if(i == 3) {
                this.scene.pushMatrix();
                this.scene.rotate(-this.rudderAngle, 0, 0, 1);
                this.rudder.display();
                this.scene.popMatrix();
            }
            else
            {
                this.rudder.display();
            }
            this.scene.rotate(Math.PI / 2, 1, 0, 0);
        }

        this.scene.popMatrix();

        //Gondola, propellers
        this.scene.pushMatrix();
        //this.scene.translate(0, -4, 0);
        this.material.setTexture(this.gondolaTexture);
        this.material.apply();
        
        this.gondola.display();

        for (var i = 0; i < 2; i++) {
            this.scene.pushMatrix();
            this.scene.translate(0.2 * (i == 0? 1 : -1), -1.05, -0.7);
            this.propeller.display(i);
            this.scene.popMatrix();
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