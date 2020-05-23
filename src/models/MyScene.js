/**
* MyScene
* @constructor
*/
class MyScene extends CGFscene {
    constructor() {
        super();

        this.earthTexture = null;
		this.appearance = null;
        this.selectedObject = 0;
    }

    init(application) {
        super.init(application);
        this.initCameras();
        this.initLights();

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        this.setUpdatePeriod(50);
        
        this.enableTextures(true);

        //this.setGlobalAmbientLight(0.6, 0.6, 0.6, 1.0);

        //Initialize scene objects
        this.axis = new CGFaxis(this);

        this.objects = [
             new MyCylinder(this, 6),
             new MySphere(this, 16, 8),
        ];

        this.objectList = {
            'None': 0,
			'Cylinder': 1,
            'Sphere': 2,
        }

        this.cubeIds = { 'Sky': 0, 'Test': 1};

        this.cubeMap = new MyCubeMap(this);

        this.vehicle = new MyVehicle(this);
        this.terrain = new MyTerrain(this);
        this.billboard = new MyBillboard(this);

        this.supplies = [];
        
        for(var i = 0; i < 5; ++i) {
            this.supplies[i] = new MySupply(this);
        }

        this.nSupplies = 0;

        this.appearance = new CGFappearance(this);
		this.appearance.setAmbient(0.1, 0.1, 0.1, 1);
        this.appearance.setDiffuse(0.9, 0.9, 0.9, 1);
        this.appearance.setSpecular(0.1, 0.1, 0.1, 1);
        this.appearance.setShininess(10.0);
        
        this.earthTexture = new CGFtexture(this, "images/earth.jpg");
        
		this.appearance.setTexture(this.earthTexture);
		this.appearance.setTextureWrap('REPEAT', 'REPEAT');
        
        //Objects connected to MyInterface
        this.displayAxis = false;
        this.numSlices = 6;
        this.selectedCube = 0;
        this.displayNormals = false;
        this.vehicleScaleFactor = 1.0;

        this.testPlane = new MyPlane(this, 5, 0, 1 , 0 ,1);
    }

    initLights() {
        this.lights[0].setPosition(15, 20, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].setAmbient(0.5, 0.5, 0.5, 1.0);
        this.lights[0].enable();
        this.lights[0].update();

        this.lights[1].setPosition(-15, 20, 5, 1);
        this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[1].setAmbient(0.5, 0.5, 0.5, 1.0);
        this.lights[1].enable();
        this.lights[1].update();
    }
    
    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(50, 50, 50), vec3.fromValues(0, 0, 0));
    }
    
    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
    }

    // called periodically (as per setUpdatePeriod() in init())
    update(t) {
        //To be done...
        this.checkKeys();
        this.vehicle.update(t);
        for(var i = 0; i < 5; ++i) {
            this.supplies[i].update(t);
        }
        this.billboard.updateSupplies();
    }

    checkKeys() {
        var text="Keys pressed: ";
        var keysPressed=false;
        // Check for key codes e.g. in https://keycode.info/
        if(!this.vehicle.autoPilot) {
            if (this.gui.isKeyPressed("KeyW")) {
                text+=" W ";
                this.vehicle.accelerate(0.01);
                keysPressed=true;
            }
            if (this.gui.isKeyPressed("KeyS")) {
                text+=" S ";
                this.vehicle.accelerate(-0.01);
                keysPressed=true;
            }
            if (this.gui.isKeyPressed("KeyA")) {
                text+=" A ";
                this.vehicle.turn(Math.PI/12);
                keysPressed=true;
            }
            if (this.gui.isKeyPressed("KeyD")) {
                text+=" D ";
                this.vehicle.turn(-Math.PI/12);
                keysPressed=true;
            }
            
        }
        if (this.gui.isKeyPressed("KeyR")) {
            this.reset();
            text+=" R ";
            keysPressed=true;
        }
        if (this.gui.isKeyPressed("KeyL")) {
            text+=" L ";
            if(this.nSupplies < 5) {
                this.supplies[this.nSupplies].drop(this.vehicle.pos, this.vehicle.direction);
                this.nSupplies++;
            }
            keysPressed=true;
        }
        if (this.gui.isKeyPressed("KeyP")) {
            text+=" P ";
            this.vehicle.startAutoPilot();
            
            keysPressed=true;
        }
        
        if (keysPressed)
            console.log(text);
    }

    reset() {
        this.vehicle.reset();
        for(var i = 0; i < 5; ++i) {
            this.supplies[i].reset();
        }
        this.nSupplies = 0;
        this.billboard.reset();
    }
        
    updateCubeTexture() {
        this.cubeMap.updateTexture(this.selectedCube);
    }

    display() {
        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();
        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();
        
        // Draw axis
        if (this.displayAxis)
            this.axis.display();

        // Skybox
        this.cubeMap.display();

        this.setDefaultAppearance();

        if (this.displayNormals)
            this.vehicle.enableNormalViz();

        else
            this.vehicle.disableNormalViz();

        // ---- BEGIN Primitive drawing section
        this.vehicle.display();

        this.pushMatrix();
        this.translate(0, 0, 0);
        this.terrain.display();
        this.popMatrix();

        for(var i = 0; i < 5; ++i) {
            this.supplies[i].display();
        }

        this.pushMatrix();
        //this.translate(5, 10, 5);
        //this.translate(6, 0.5, -15);
        this.translate(18, 4, 5);
        this.rotate(Math.PI/4, 0, 1, 0);
        this.billboard.display();
        this.popMatrix();

        this.appearance.setTexture(this.earthTexture);
        this.appearance.apply();

        if(this.selectedObject != 0)
            this.objects[this.selectedObject - 1].display();

        // ---- END Primitive drawing section
    }

    updateComplexity() {
        this.objects[this.selectedObject - 1].updateBuffers(this.numSlices);
    }
}