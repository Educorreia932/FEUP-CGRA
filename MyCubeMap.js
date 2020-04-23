

class MyCubeMap extends CGFobject {
	constructor(scene) {
		super(scene);
		this.quad = new MyQuad(scene);

		
		this.material = new CGFappearance(this.scene);	
		
		this.back = new CGFtexture(this.scene, "images/split_cubemap/back.png");
		this.bottom = new CGFtexture(this.scene, "images/split_cubemap/bottom.png");
		this.front = new CGFtexture(this.scene, "images/split_cubemap/front.png");
		this.left = new CGFtexture(this.scene, "images/split_cubemap/left.png");
		this.right = new CGFtexture(this.scene, "images/split_cubemap/right.png");
		this.top = new CGFtexture(this.scene, "images/split_cubemap/top.png");

	}

	display() {
		this.scene.pushMatrix();
		this.scene.scale(50, 50, 50);

		this.scene.pushMatrix(); 
		this.scene.rotate(-Math.PI/2, 1, 0, 0);
		this.scene.translate(0, 0, 0.5);
		this.material.setTexture(this.top);
		this.material.apply();
		this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
		this.quad.display();
		this.scene.popMatrix();

		this.scene.pushMatrix(); 
		this.scene.translate(0, 0, 0.5);
		this.material.setTexture(this.back);
		this.material.apply();
		this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
		this.quad.display();
		this.scene.popMatrix();

		this.scene.pushMatrix(); 
		this.scene.rotate(Math.PI/2, 1, 0, 0);
		this.scene.translate(0, 0, 0.5);
		this.material.setTexture(this.bottom);
		this.material.apply();
		this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
		this.quad.display();
		this.scene.popMatrix();

		this.scene.pushMatrix(); 
		this.scene.rotate(Math.PI, 0, 1, 0);
		this.scene.translate(0, 0, 0.5);
		this.material.setTexture(this.front);
		this.material.apply();
		this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
		this.quad.display();
		this.scene.popMatrix();

		this.scene.pushMatrix(); 
		this.scene.rotate(Math.PI/2, 0, 1, 0);
		this.scene.translate(0, 0, 0.5);
		this.material.setTexture(this.right);
		this.material.apply();
		this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
		this.quad.display();
		this.scene.popMatrix();

		this.scene.pushMatrix(); 
		this.scene.rotate(-Math.PI/2, 0, 1, 0);
		this.scene.translate(0, 0, 0.5);
		this.material.setTexture(this.left);
		this.material.apply();
		this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
		this.quad.display();
		this.scene.popMatrix();

		this.scene.popMatrix();
	}
}

