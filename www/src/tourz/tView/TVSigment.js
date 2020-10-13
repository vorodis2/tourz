


export class TVSigment  {
  	constructor(par,fun) {  		
  		this.type="TView";
  		var self=this;
        this.fun=fun; 
        this.par=par;  

        this._stepWidth= 1; 
        this._stepHeight= 1;   
        this._link = "null";   
       
        this.sig=11
        this.radius=1555

        this.content3d = new THREE.Object3D();
        par.content3d.add(this.content3d);
        this.content3d.rotation.x=-Math.PI/2

        this.content3d.visible=false

        this.array=[];

        this.image = new Image();
        this.image.ondragstart = function() { return false; };
        this.loadComplit = function (e) {
            self.dragImag();
        }
        self.image.crossOrigin = "";
        this.image.onload = self.loadComplit;  


        this.dragImag=function() {
            for (var i = 0; i < this.array.length; i++) {
                for (var j = 0; j < this.array[i].length; j++) {
                    this.array[i][j].setImage(this.image)
                }
            }
        }



        this.clear=function() {
            for (var i = 0; i < this.array.length; i++) {
                for (var j = 0; j < this.array[i].length; j++) {
                    this.array[i][j].active=false
                }            
            }
        }

        this.dragWH=function() {
            this.clear()
            let sahI,sahJ
            sahI=1/this._stepWidth;
            sahJ=1/this._stepHeight;
            for (var i = 0; i < this._stepWidth; i++) {
                
                if(this.array[i]==undefined)this.array[i]=[]                
                for (var j = 0; j < this._stepHeight; j++) {
                    if(this.array[i][j]==undefined){
                        this.array[i][j]=new BS(this)
                        this.array[i][j].iArr=i;
                        this.array[i][j].jArr=j;                        
                    }
                    this.array[i][j].setUV(sahI*i,sahJ*j,sahI,sahJ); 
                    //this.array[i][j].mesh.position.x=i*this.radius*2  
                    //this.array[i][j].mesh.position.z=j*this.radius*2    
                }
            }
            if(this.par.render)this.par.render()
        }
        this.dragWH();
  	} 

    set link(value) {
        if (this._link != value) {
            this._link = value;  

            this.image.src = this._link;                                   
        }             
    }
    get link() { return this._link; } 


    set stepWidth(value) {
        if (this._stepWidth != value) {
            this._stepWidth = value;             
            this.dragWH();                                     
        }             
    }
    get stepWidth() { return this._stepWidth; }  

    set stepHeight(value) {
        if (this._stepHeight != value) {
            this._stepHeight = value;             
            this.dragWH();                                      
        }             
    }
    get stepHeight() { return this._stepHeight; }  

}


export class BS  {
    constructor(par) {       
        this.type="BS";
        this.par=par;
        this.rect={x:0,y:0,w:0,h:0}
        this.mesh = undefined;
        this._active=false;

        this.iArr=-1;
        this.jArr=-1;


        var canvas = document.createElement('canvas')
        var ctx = canvas.getContext('2d');


        /*var geometry = new THREE.SphereBufferGeometry( 500, par.sig, par.sig );
        var material = new THREE.MeshBasicMaterial( {color: 0xffffff*Math.random(),wireframe:true} );
        
        this.mesh = new THREE.Mesh(geometry, material );
        
        this.par.content3d.add(sphere);*/

        //this.material = new THREE.MeshBasicMaterial( {color: 0xffffff*Math.random(),wireframe:true} );
            
        var texture = new THREE.CanvasTexture(canvas);
        this.material= new THREE.MeshBasicMaterial({
            map: texture,
            side:THREE.DoubleSide
        });
        

        var geometry
        
        this.setUV=function(x,y,w,h){
            if(x!=this.rect.x ||y!=this.rect.y ||w!=this.rect.w ||h!=this.rect.h){
                this.rect.x=x;
                this.rect.y=y;
                this.rect.w=w;
                this.rect.h=h;
                let xx=this.rect.x*Math.PI*2
                let xx1=this.rect.w*Math.PI*2
                let yy=this.rect.y*Math.PI*2
                let yy1=this.rect.h*Math.PI
                /*,
                    this.rect.y*Math.PI*2,
                    this.rect.h*Math.PI*2*/
                geometry = new THREE.SphereBufferGeometry( 
                    par.radius, 
                    par.sig, 
                    par.sig, 
                    xx,
                    xx1,
                    -yy,
                    yy1
                    );

                if(this.mesh==undefined){
                    this.mesh = new THREE.Mesh(geometry, this.material);
                    this.par.content3d.add(this.mesh);
                }else{
                    this.mesh.geometry.dispose();
                    this.mesh.geometry=geometry;
                }
           
            }
            this.active=true
        }



        this.setImage=function(image){          

            self.picWidth = image.naturalWidth*this.rect.w;
            self.picHeight = image.naturalHeight*this.rect.h;   

            canvas.width = image.naturalWidth*this.rect.w;
            canvas.height = image.naturalHeight*this.rect.h; 

            
            let xx=this.rect.x*image.naturalWidth
            let ww=canvas.width //-this.rect.x*image.naturalWidth+canvas.width 



            ctx.clearRect(0, 0, canvas.width, canvas.height);
           /* ctx.drawImage(image, 
                -xx, 
                0,
                ww,
                canvas.height
            );*/

            ctx.drawImage(image,-this.rect.x*image.naturalWidth,-image.naturalHeight*this.rect.y)
    
        

            texture.needsUpdate = true;
        }


    }
    set active(value) {
        if (this._active != value) {
            this._active = value;             
            this.mesh.visible= value                                      
        }             
    }
    get active() { return this._active; } 
}

