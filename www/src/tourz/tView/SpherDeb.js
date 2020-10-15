

/*
*/


export class SpherDeb  {
  	constructor(c3d) {  		
  		this.type="SpherDeb";
  		var self=this;
        this.c3d=c3d;         
        this._link="null";

        this._radius=100;
        this._widthSegments=2;
        this._heightSegments=32;
        this._phiStart=0;
        this._phiLength=360;
        this._thetaStart=0;
        this._thetaLength=180;





        this.content3d = new THREE.Object3D();
        c3d.add(this.content3d);






        this.image = new Image();
        this.image.ondragstart = function() { return false; };
        this.loadComplit = function (e) {
            self.dragImag();
        }
        self.image.crossOrigin = "";
        this.image.onload = self.loadComplit;  


        this.dragImag=function() {
                  
        }






        this.dragWH=function(){

        }
          


       
  	} 



    set link(value) {
        if (this._link != value) {
            this._link = value;  

            this.image.src = this._link;
            this.spherDeb.link= this._link;                                 
        }             
    }
    get link() { return this._link; } 


   set radius(value) {
        if (this._radius != value) {
            this._radius = value;             
            this.dragWH();                                      
        }             
    }
    get radius() { return this._radius; }

    set widthSegments(value) {
        if (this._widthSegments != value) {
            this._widthSegments = value;             
            this.dragWH();                                      
        }             
    }
    get widthSegments() { return this._widthSegments; }

    set heightSegments(value) {
        if (this._heightSegments != value) {
            this._heightSegments = value;             
            this.dragWH();                                      
        }             
    }
    get heightSegments() { return this._heightSegments; }

    set phiStart(value) {
        if (this._phiStart != value) {
            this._phiStart = value;             
            this.dragWH();                                      
        }             
    }
    get phiStart() { return this._phiStart; }

    set phiLength(value) {
        if (this._phiLength != value) {
            this._phiLength = value;             
            this.dragWH();                                      
        }             
    }
    get phiLength() { return this._phiLength; }

    set thetaStart(value) {
        if (this._thetaStart != value) {
            this._thetaStart = value;             
            this.dragWH();                                      
        }             
    }
    get thetaStart() { return this._thetaStart; }

    set thetaLength(value) {
        if (this._thetaLength != value) {
            this._thetaLength = value;             
            this.dragWH();                                      
        }             
    }
    get thetaLength() { return this._thetaLength; }
}


class SphereBG extends BufferGeometry {

    constructor( radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength ) {

        super();
        this.type = 'SphereBufferGeometry';
        this._radius=radius||100;
        this._widthSegments=widthSegments||32;
        this._heightSegments=heightSegments||32;
        this._phiStart=phiStart||0;
        this._phiLength=phiLength||360;
        this._thetaStart=thetaStart||0;
        this._thetaLength=thetaLength||180;



        this.drag=function(){

        }

    }


    set radius(value) {
        if (this._radius != value) {
            this._radius = value;             
            this.dragWH();                                      
        }             
    }
    get radius() { return this._radius; }

    set widthSegments(value) {
        if (this._widthSegments != value) {
            this._widthSegments = value;             
            this.dragWH();                                      
        }             
    }
    get widthSegments() { return this._widthSegments; }

    set heightSegments(value) {
        if (this._heightSegments != value) {
            this._heightSegments = value;             
            this.dragWH();                                      
        }             
    }
    get heightSegments() { return this._heightSegments; }

    set phiStart(value) {
        if (this._phiStart != value) {
            this._phiStart = value;             
            this.dragWH();                                      
        }             
    }
    get phiStart() { return this._phiStart; }

    set phiLength(value) {
        if (this._phiLength != value) {
            this._phiLength = value;             
            this.dragWH();                                      
        }             
    }
    get phiLength() { return this._phiLength; }

    set thetaStart(value) {
        if (this._thetaStart != value) {
            this._thetaStart = value;             
            this.dragWH();                                      
        }             
    }
    get thetaStart() { return this._thetaStart; }

    set thetaLength(value) {
        if (this._thetaLength != value) {
            this._thetaLength = value;             
            this.dragWH();                                      
        }             
    }
    get thetaLength() { return this._thetaLength; }




}