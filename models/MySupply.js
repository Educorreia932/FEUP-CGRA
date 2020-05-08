
const SupplyStates = {
		INACTIVE: 0,
		FALLING: 1,
		LANDED: 2
};

class MySupply extends CGFobject {

	constructor(scene) {
		super(scene);
		this.quad = new MyQuad(scene);

		this.state = SupplyStates.INACTIVE;

		this.pos = vec3.fromValues(0.0,0.0,0.0);

		this.speed = 0.0;

		this.timeCount = 0.0;

		
		this.materialSide = new CGFappearance(this.scene);
		this.materialSide.setAmbient(0.1, 0.1, 0.1, 1);
        this.materialSide.setDiffuse(0.9, 0.9, 0.9, 1);
        this.materialSide.setSpecular(0.1, 0.1, 0.1, 1);
        this.materialSide.setShininess(10.0);
		this.materialSide.loadTexture('images/bigmac.jpg');		
		
		this.materialTop = new CGFappearance(this.scene);
		this.materialTop.setAmbient(0.1, 0.1, 0.1, 1);
        this.materialTop.setDiffuse(0.9, 0.9, 0.9, 1);
        this.materialTop.setSpecular(0.1, 0.1, 0.1, 1);
        this.materialTop.setShininess(10.0);
		this.materialTop.loadTexture('images/bigmac.jpg');	

		this.materialBottom = new CGFappearance(this.scene);
		this.materialBottom.setAmbient(0.1, 0.1, 0.1, 1);
        this.materialBottom.setDiffuse(0.9, 0.9, 0.9, 1);
        this.materialBottom.setSpecular(0.1, 0.1, 0.1, 1);
        this.materialBottom.setShininess(10.0);
		this.materialBottom.loadTexture('images/bigmac.jpg');	
	}

	drop(dropPosition) {
		this.pos = dropPosition;
		this.speed = (this.pos[1] - 0.01) / 3.0;
		this.state = SupplyStates.FALLING;
		console.log(this.speed);
	}

	update(t) {
		var x = this.pos[0];
		var y = this.pos[1];
		var z = this.pos[2];

		var tSeconds = (t/1000.0);
		var left = 0;
		
		if(this.state == SupplyStates.FALLING) {
			this.timeCount += tSeconds;
			if(this.timeCount >= 3.0) {
				left = this.timeCount - 3.0;
				this.timeCount = 3.0;
				this.land();
			}

			y -= (tSeconds-left) * this.speed;
			this.pos = vec3.fromValues(x, y, z);
		}
		
	}

	land() {
		if(this.pos[1] <= 0.1)
			this.state = SupplyStates.LANDED;
	}

	reset() {
		this.pos = vec3.fromValues(0.0, 0.0, 0.0);
		this.speed = 0.0;
		this.state = SupplyStates.INACTIVE;
	}

	display() {
		if(this.state == SupplyStates.FALLING) 
			this.displayFall();
		else if(this.state == SupplyStates.LANDED) 
			this.displayLand();
	}

	displayFall() {
		this.scene.pushMatrix();
		this.scene.translate(this.pos[0], this.pos[1], this.pos[2]);


		this.scene.pushMatrix(); 
		this.scene.rotate(-Math.PI/2, 1, 0, 0);
		this.scene.translate(0, 0, 0.5);
		this.materialTop.apply();
		this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
		this.quad.display();
		this.scene.popMatrix();

		this.scene.pushMatrix(); 
		this.scene.translate(0, 0, 0.5);
		this.materialSide.apply();
		this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
		this.quad.display();
		this.scene.popMatrix();

		this.scene.pushMatrix(); 
		this.scene.rotate(Math.PI/2, 1, 0, 0);
		this.scene.translate(0, 0, 0.5);
		this.materialBottom.apply();
		this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
		this.quad.display();
		this.scene.popMatrix();

		this.scene.pushMatrix(); 
		this.scene.rotate(Math.PI, 0, 1, 0);
		this.scene.translate(0, 0, 0.5);
		this.materialSide.apply();
		this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
		this.quad.display();
		this.scene.popMatrix();

		this.scene.pushMatrix(); 
		this.scene.rotate(Math.PI/2, 0, 1, 0);
		this.scene.translate(0, 0, 0.5);
		this.materialSide.apply();
		this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
		this.quad.display();
		this.scene.popMatrix();

		this.scene.pushMatrix(); 
		this.scene.rotate(-Math.PI/2, 0, 1, 0);
		this.scene.translate(0, 0, 0.5);
		this.materialSide.apply();
		this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
		this.quad.display();
		this.scene.popMatrix();

		this.scene.popMatrix();
	}

	displayLand() {
		this.scene.pushMatrix();
		this.scene.translate(this.pos[0], this.pos[1], this.pos[2]);

		this.scene.pushMatrix();
		this.scene.translate(2, 0, 0);
		this.scene.rotate(Math.PI/2, 1, 0, 0);
		this.materialTop.apply();
		this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
		this.quad.display();
		this.scene.popMatrix();

		this.scene.pushMatrix(); 
		this.scene.translate(-1, 0, 0);
		this.scene.rotate(Math.PI/2, 0, 0, 1);
		this.scene.rotate(Math.PI/2, 0, 1, 0);
		this.materialSide.apply();
		this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
		this.quad.display();
		this.scene.popMatrix();

		this.scene.pushMatrix(); 
		this.scene.translate(0, 0, 0);
		this.scene.rotate(Math.PI/2, 1, 0, 0);
		this.materialBottom.apply();
		this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
		this.quad.display();
		this.scene.popMatrix();

		this.scene.pushMatrix(); 
		this.scene.translate(1, 0, 0);
		this.scene.rotate(-Math.PI/2, 0, 0, 1);
		this.scene.rotate(Math.PI/2, 0, 1, 0);
		this.materialSide.apply();
		this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
		this.quad.display();
		this.scene.popMatrix();

		this.scene.pushMatrix(); 
		this.scene.translate(0, 0, -1);
		this.scene.rotate(-Math.PI/2, 1, 0, 0);
		this.materialSide.apply();
		this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
		this.quad.display();
		this.scene.popMatrix();

		this.scene.pushMatrix(); 
		this.scene.translate(0, 0, 1);
		this.scene.rotate(Math.PI/2, 1, 0, 0);
		this.materialSide.apply();
		this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
		this.quad.display();
		this.scene.popMatrix();

		this.scene.popMatrix();
	}
	
	
}

