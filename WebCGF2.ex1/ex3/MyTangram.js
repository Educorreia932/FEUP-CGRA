class MyTangram extends CGFobject {
	constructor(scene) {
        super(scene);
        
        this.diamond = new MyDiamond(scene);
        this.triangle = new MyTriangle(scene);
        this.trianglesmall = new MyTriangleSmall(scene);
        this.trianglebig = new MyTriangleBig(scene);
        this.paralellogram = new MyParallelogram(scene);
    }
    
    display() {
        var diamondTranslate = [1.0, 0.0, 0.0, 0.0,
                                0.0, 1.0, 0.0, 0.0,
                                0.0, 0.0, 1.0, 0.0,
                                1.5, 2.5, 0.0, 1.0];

        this.scene.pushMatrix();
        this.scene.multMatrix(diamondTranslate);

        this.diamond.display();

        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate((Math.sqrt(2)-1) + 0.6, -(Math.sqrt(2) + 1) + 0.6 , 0);
        this.scene.rotate(Math.PI, 0, 0, 1);

        this.triangle.display();

        this.scene.popMatrix();    
            
        this.scene.pushMatrix();
        this.scene.scale(1, -1, 1);
        this.scene.translate(-2, -0.3, 0);
        this.scene.rotate(Math.PI * 4 / 7, 0, 0, 1);

        this.paralellogram.display();

        this.scene.popMatrix();  

        this.scene.pushMatrix();
        this.scene.translate(2.5, 3.5, 0);
        this.scene.rotate(Math.PI, 0, 0, 1);

        this.trianglesmall.display();

        this.scene.popMatrix();

        this.scene.pushMatrix();

        this.scene.translate(-0.6 - (Math.sqrt(2)- 1), -0.6 - Math.sqrt(2.0), 0);
        this.scene.rotate(Math.PI/2.0, 0, 0, 1);

        this.trianglesmall.display();

        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.6,0.6,0);
        this.scene.rotate(-135.0 * Math.PI / 180.0, 0, 0, 1);    

        this.trianglebig.display();

        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.6,-0.6,0);
        this.scene.rotate(45.0 * Math.PI / 180.0, 0, 0, 1);    

        this.trianglebig.display();

        this.scene.popMatrix();
    }

    updateBuffers(complexity){
    
    }

    enableNormalViz = function enameNormalViz() {
        this.diamond.enableNormalViz();
        // paralellogram.enableNormalViz();
        // triangle.enableNormalViz();
        // trianglesmall.enableNormalViz();
        // trianglebig.enableNormalViz(); 
    }
}
