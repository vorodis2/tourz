

//import { SpherDeb } from './SpherDeb.js';
export class TVSigment  {
  	constructor(par,fun) {  		
  		this.type="TView";
  		var self=this;
        this.fun=fun; 
        this.par=par;

        this._typ="null"   

        this._stepWidth= 1; 
        this._stepHeight= 1;   
        this._link = "null";   
       
        this.sig=11
        this.radius=300//par.radius/2-100;

        this.content3d = new THREE.Object3D();
        par.content3d.add(this.content3d);
        this.content3d.rotation.x=-Math.PI/2
        this.content3d.visible=false;
        this.array=[];

       // this.spherDeb=new SpherDeb(par.content3d);

        this.image = new Image();
        this.image.ondragstart = function() { return false; };
        this.loadComplit = function (e) {
            trace(this.src+"       "+self._link)
            if(this.src.indexOf(self._link)!=-1){
                self.dragImag();
                self.fun("complite");
                self.content3d.visible=true;
            }
        }
        self.image.crossOrigin = "";
        this.image.onload = self.loadComplit;

        this.video= document.createElement("VIDEO");

    
        this.video.oncanplaythrough = function(e){
            self.video.play();
            self.content3d.visible=true;
            self.fun("complite");
            self.dragVideo();

            trace(">>>>>>>>>>>>>>>>>>>oncanplaythrough>>>>>>>>>>>>>>>",self.video.videoWidth)
            //Событие отправляется, когда состояние готовности изменяется к CAN_PLAY_THROUGH. Указывает, что медиа может быть полностью воспроизведено без перерыва, предполагая, что скорость загрузки остается, по крайней мере на нынешнем уровне. Примечание: Ручная установка CURRENTTIME вызовет событие canplaythrough в Firefox. В других браузерах это может не произойти.
        }

        /*this.video.style.position = 'fixed';
        this.video.style.top = '0px';
        this.video.style.left = '0px';

        this.par.div.appendChild(this.video);*/




        this.setLink=function(type,link){            
            
            if(type=="pic"){
                this._link=link;
                this.image.src = this._link;
                self.content3d.visible=false;
            }

            if(type =="video"){
                self.video.src = link;
                self.video.play();
               
            }

            this.typ=type

        }

        this.dragVideo = function() {
            this.stepWidth=Math.ceil(sself.video.videoWidth/512);
            this.stepHeight=Math.ceil(self.video.videoHeight/512);
            /*for (var i = 0; i < this.array.length; i++) {
                for (var j = 0; j < this.array[i].length; j++) {
                   // this.array[i][j].setImage(this.image)
                }
            }*/
        }

        this.dragImag=function() {
            this.stepWidth=Math.ceil(self.image.naturalWidth/512);
            this.stepHeight=Math.ceil(self.image.naturalHeight/512);
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


        this.upDate=function(){
            
            if(this._typ=="video"){
                self.par.render()
                for (var i = 0; i < this._stepWidth; i++) {
                    for (var j = 0; j < this._stepHeight; j++) {
                        this.array[i][j].upVideo(self.video)
                    }
                }                
            }
        }


  	} 
    set typ(value) {
        if (this._typ != value) {
            this._typ = value; 
                                                  
        }             
    }
    get typ() { return this._typ; } 



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

        this._xx=0
        this._xx1=Math.PI*2
        this._yy=0
        this._yy1=Math.PI


        this._sig=par.sig
        this._radius=par.radius


        var canvas = document.createElement('canvas')
        var ctx = canvas.getContext('2d');


            
        var texture = new THREE.CanvasTexture(canvas);
        this.material= new THREE.MeshBasicMaterial({
            map: texture,
            side:THREE.DoubleSide
        });
        

        var geometry;
        
        this.setUV=function(x,y,w,h){
            if(x!=this.rect.x ||y!=this.rect.y ||w!=this.rect.w ||h!=this.rect.h){
                this.rect.x=x;
                this.rect.y=y;
                this.rect.w=w;
                this.rect.h=h;

                let xx=this.rect.x*Math.PI*2
                let xx1=this.rect.w*Math.PI*2
                let yy=this.rect.y*Math.PI
                let yy1=this.rect.h*Math.PI
                

                this._xx=xx;
                this._xx1=xx1;
                this._yy=yy;
                this._yy1=yy1;
                this.redrag(this._xx,this._xx1,this._yy,this._yy1); 
            }
            this.active=true
        }


        this.redrag=function(xx,xx1,yy,yy1){
            geometry = new SphereBG( 
                this._radius, 
                this._sig, 
                this._sig, 
                xx,
                xx1,
                yy,
                yy1
            );
            if(this.mesh==undefined){
                this.mesh = new THREE.Mesh(geometry, this.material);
                this.par.content3d.add(this.mesh);
                this.mesh.paramMy=this;
            }else{
                this.mesh.geometry.dispose();
                this.mesh.geometry=geometry;
            } 

        }


        this.upVideo=function(video){ 


            self.picWidth = video.videoWidth*this.rect.w;
            self.picHeight = video.videoHeight*this.rect.h;




            canvas.width = 512;
            canvas.height = 512; 
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(video,-this.rect.x*video.videoWidth,-video.videoHeight*this.rect.y)       

            texture.needsUpdate = true;
        }




        this.setImage=function(image){          

            self.picWidth = image.naturalWidth*this.rect.w;
            self.picHeight = image.naturalHeight*this.rect.h; 
            canvas.width = image.naturalWidth*this.rect.w;
            canvas.height = image.naturalHeight*this.rect.h; 
            ctx.clearRect(0, 0, canvas.width, canvas.height);
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


    set xx(value) {
        if (this._xx != value) {
            this._xx = value;             
            this.redrag(this._xx,this._xx1,this._yy,this._yy1);                                   
        }             
    }
    get xx() { return this._xx; }


    set xx1(value) {
        if (this._xx1 != value) {
            this._xx1 = value;             
            this.redrag(this._xx,this._xx1,this._yy,this._yy1);                                   
        }             
    }
    get xx1() { return this._xx1;}

    set yy(value) {
        if (this._yy != value) {
            this._yy = value;             
            this.redrag(this._xx,this._xx1,this._yy,this._yy1);                                   
        }             
    }
    get yy() { return this._yy; }

    set yy1(value) {
        if (this._yy1 != value) {
            this._yy1 = value;             
            this.redrag(this._xx,this._xx1,this._yy,this._yy1);                                   
        }             
    }
    get yy1() { return this._yy1; }


}




export class SphereBG extends THREE.BufferGeometry {

    constructor( radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength ) {

        super();
        this.type = 'SphereBufferGeometry';

        this.parameters = {
            radius: radius,
            widthSegments: widthSegments,
            heightSegments: heightSegments,
            phiStart: phiStart,
            phiLength: phiLength,
            thetaStart: thetaStart,
            thetaLength: thetaLength
        };

        radius = radius || 1;

        widthSegments = Math.max( 3, Math.floor( widthSegments ) || 8 );
        heightSegments = Math.max( 2, Math.floor( heightSegments ) || 6 );

        phiStart = phiStart !== undefined ? phiStart : 0;
        phiLength = phiLength !== undefined ? phiLength : Math.PI * 2;

        thetaStart = thetaStart !== undefined ? thetaStart : 0;
        thetaLength = thetaLength !== undefined ? thetaLength : Math.PI;

        const thetaEnd = Math.min( thetaStart + thetaLength, Math.PI );

        let index = 0;
        const grid = [];

        const vertex = new THREE.Vector3();
        const normal = new THREE.Vector3();

        // buffers

        const indices = [];
        const vertices = [];
        const normals = [];
        const uvs = [];

        // generate vertices, normals and uvs

        for ( let iy = 0; iy <= heightSegments; iy ++ ) {

            const verticesRow = [];

            const v = iy / heightSegments;

            // special case for the poles

            let uOffset = 0;

            if ( iy == 0 && thetaStart == 0 ) {

                uOffset = 0.5 / widthSegments;

            } else if ( iy == heightSegments && thetaEnd == Math.PI ) {

                uOffset = - 0.5 / widthSegments;

            }

            for ( let ix = 0; ix <= widthSegments; ix ++ ) {

                const u = ix / widthSegments;

                // vertex

                vertex.x = - radius * Math.cos( phiStart + u * phiLength ) * Math.sin( thetaStart + v * thetaLength );
                vertex.y = radius * Math.cos( thetaStart + v * thetaLength );
                vertex.z = radius * Math.sin( phiStart + u * phiLength ) * Math.sin( thetaStart + v * thetaLength );

                vertices.push( vertex.x, vertex.y, vertex.z );

                // normal

                normal.copy( vertex ).normalize();
                normals.push( normal.x, normal.y, normal.z );

                // uv

                uvs.push( u + uOffset, 1 - v );

                verticesRow.push( index ++ );

            }

            grid.push( verticesRow );

        }

        // indices

        for ( let iy = 0; iy < heightSegments; iy ++ ) {

            for ( let ix = 0; ix < widthSegments; ix ++ ) {

                const a = grid[ iy ][ ix + 1 ];
                const b = grid[ iy ][ ix ];
                const c = grid[ iy + 1 ][ ix ];
                const d = grid[ iy + 1 ][ ix + 1 ];

                if ( iy !== 0 || thetaStart > 0 ) indices.push( a, b, d );
                if ( iy !== heightSegments - 1 || thetaEnd < Math.PI ) indices.push( b, c, d );

            }

        }

        // build geometry

        this.setIndex( indices );
        this.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );
        this.setAttribute( 'normal', new THREE.Float32BufferAttribute( normals, 3 ) );
        this.setAttribute( 'uv', new THREE.Float32BufferAttribute( uvs, 2 ) );

    }

}

