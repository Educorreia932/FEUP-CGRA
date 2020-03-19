class MyTangram extends CGFobject {
	constructor(scene) {
        super(scene);
        
        this.diamond = new MyDiamond(scene);
        this.triangle = new MyTriangle(scene);
        this.trianglesmall = new MyTriangleSmall(scene);
        this.trianglebig = new MyTriangleBig(scene);
        this.paralellogram = new MyParallelogram(scene);

        // Materials
        this.materialGreen = new CGFappearance(this.scene);
        this.materialGreen.setAmbient(0.0, 1.0, 0.0, 1.0);
        this.materialGreen.setDiffuse(0.0, 0.0, 0.0, 1.0);
        this.materialGreen.setSpecular(1.0, 0.61, 0.82, 1.0);
        this.materialGreen.setShininess(10.0);
        
        this.materialPink = new CGFappearance(this.scene);
        this.materialPink.setAmbient(1.0, 0.61, 0.82, 1.0);
        this.materialPink.setDiffuse(0.0, 0.0, 0.0, 1.0);
        this.materialPink.setSpecular(1.0, 0.61, 0.82, 1.0);
        this.materialPink.setShininess(10.0);

        this.materialYellow = new CGFappearance(this.scene);
        this.materialYellow.setAmbient(1.0, 1.0, 0.0, 1.0);
        this.materialYellow.setDiffuse(0.0, 0.0, 0.0, 1.0);
        this.materialYellow.setSpecular(1.0, 0.61, 0.82, 1.0);
        this.materialYellow.setShininess(10.0);

        this.materialPurple = new CGFappearance(this.scene);
        this.materialPurple.setAmbient(0.59, 0.31, 0.75, 1.0);
        this.materialPurple.setDiffuse(0.0, 0.0, 0.0, 1.0);
        this.materialPurple.setSpecular(1.0, 0.61, 0.82, 1.0);
        this.materialPurple.setShininess(10.0);

        this.materialRed = new CGFappearance(this.scene);
        this.materialRed.setAmbient(1.0, 0.0, 0.0, 1.0);
        this.materialRed.setDiffuse(0.0, 0.0, 0.0, 1.0);
        this.materialRed.setSpecular(1.0, 0.61, 0.82, 1.0);
        this.materialRed.setShininess(10.0);

        this.materialBlue = new CGFappearance(this.scene);
        this.materialBlue.setAmbient(0.0, 0.61, 1.0, 1.0);
        this.materialBlue.setDiffuse(0.0, 0.0, 0.0, 1.0);
        this.materialBlue.setSpecular(1.0, 0.61, 0.82, 1.0);
        this.materialBlue.setShininess(10.0);

        this.materialOrange = new CGFappearance(this.scene);
        this.materialOrange.setAmbient(1.0, 0.61, 0.0, 1.0);
        this.materialOrange.setDiffuse(0.0, 0.0, 0.0, 1.0);
        this.materialOrange.setSpecular(1.0, 0.61, 0.82, 1.0);
        this.materialOrange.setShininess(10.0);
    }
    
    display() {
        var diamondTranslate = [1.0, 0.0, 0.0, 0.0,
                                0.0, 1.0, 0.0, 0.0,
                                0.0, 0.0, 1.0, 0.0,
                                1.5, 2.5, 0.0, 1.0];

        this.scene.pushMatrix();
        this.scene.multMatrix(diamondTranslate);
        this.materialGreen.apply();

        this.diamond.display();

        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate((Math.sqrt(2)-1) + 0.6, -(Math.sqrt(2) + 1) + 0.6 , 0);
        this.scene.rotate(Math.PI, 0, 0, 1);
        this.materialPink.apply();

        this.triangle.display();

        this.scene.popMatrix();    
            
        this.scene.pushMatrix();
        this.scene.scale(1, -1, 1);
        this.scene.translate(-2, -0.3, 0);
        this.scene.rotate(Math.PI * 4 / 7, 0, 0, 1);
        this.materialYellow.apply();

        this.paralellogram.display();

        this.scene.popMatrix();  

        this.scene.pushMatrix();
        this.scene.translate(2.5, 3.5, 0);
        this.scene.rotate(Math.PI, 0, 0, 1);
        this.materialPurple.apply();

        this.trianglesmall.display();

        this.scene.popMatrix();

        this.scene.pushMatrix();

        this.scene.translate(-0.6 - (Math.sqrt(2)- 1), -0.6 - Math.sqrt(2.0), 0);
        this.scene.rotate(Math.PI/2.0, 0, 0, 1);
        this.materialRed.apply();

        this.trianglesmall.display();

        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.6,0.6,0);
        this.scene.rotate(-135.0 * Math.PI / 180.0, 0, 0, 1);    
        this.materialBlue.apply();

        this.trianglebig.display();

        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.6,-0.6,0);
        this.scene.rotate(45.0 * Math.PI / 180.0, 0, 0, 1);    
        this.materialOrange.apply();

        this.trianglebig.display();

        this.scene.popMatrix();
    }

    updateBuffers(complexity) {
    
    }

    enableNormalViz() {
        this.diamond.enableNormalViz();
        this.paralellogram.enableNormalViz();
        this.triangle.enableNormalViz();
        this.trianglesmall.enableNormalViz();
        this.trianglebig.enableNormalViz(); 
    }
}
