/**
* MyInterface
* @constructor
*/
class MyInterface extends CGFinterface {
    constructor() {
        super();
    }

    init(application) {
        // call CGFinterface init
        super.init(application);
        // init GUI. For more information on the methods, check:
        // http://workshop.chromeexperiments.com/examples/gui
        this.gui = new dat.GUI();
        
        var obj = this;

        //Checkbox element in GUI
        this.gui.add(this.scene, 'displayAxis').name('Display Axis');
        this.gui.add(this.scene, 'numSlices').name('Number of Slices').onChange(this.scene.updateComplexity.bind(this.scene));
        this.gui.add(this.scene, 'selectedObject', this.scene.objectList).name('Selected Object');

        return true;
    }
}