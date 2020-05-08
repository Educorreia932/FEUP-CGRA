class MyTerrain extends CGFobject {
	constructor(scene) {
		super(scene);
		this.plane = new MyPlane(scene, 20, 0, 1, 0, 1);

        this.material = new CGFappearance(this.scene);	
                
        this.terrainTexture = new CGFtexture(this.scene, "textures/map1.png");
        this.material.setTexture(this.terrainTexture);

        this.terrainMap = new CGFtexture(this.scene, "textures/map1height2.png");

        this.terrainShader = new CGFshader(this.scene.gl, "shaders/terrain.vert", "shaders/terrain.frag");
        //this.terrainShader.setUniformsValues({ normScale: 50 });
        this.terrainShader.setUniformsValues({ uSampler2: 1 });
	}

	display() { 
        this.material.apply();
        this.scene.setActiveShader(this.terrainShader);
        this.terrainMap.bind(1);
        
        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.scene.scale(50, 50, 50);
        this.plane.display();
        this.scene.popMatrix(); 
        
        this.scene.setActiveShader(this.scene.defaultShader);
	}
}