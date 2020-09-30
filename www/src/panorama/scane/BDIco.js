



export class BDIco  {
  	constructor(par,arr) {          
        this.type="BDIco";
        var self=this;
        this.scale=0.0068;
        this.par=par;


        this.textureLoader=new THREE.TextureLoader();

        this.mDebag = new THREE.MeshBasicMaterial({color:0xff0000,transparent:true, opacity:0.5}) 
        this.gSphere = new THREE.SphereBufferGeometry( 20, 32, 32 );
        this.gPlan = new THREE.PlaneBufferGeometry( 1, 1, 1, 1);
        this.gCylinder = new THREE.CylinderBufferGeometry( 1, 1, 1, 32 );



        this.wh=40;
        this.link=null;
        this.link1=null;
        this.loadBool=false;

        var image = new Image();
        var image1 = new Image();
        var bitmap,bitmap1,bitmap2,bitmapGlaf;


        this._glowSah=mainBig.objectBase.settings.glowSah;
        this._radius=mainBig.objectBase.settings.radius;
        this._color=mainBig.objectBase.settings.color;
        this._glowColor=mainBig.objectBase.settings.glowColor;

        this.draw=function(){

            this.loadBool=true;
            this._glowSah=mainBig.objectBase.settings.glowSah;
            this._radius=mainBig.objectBase.settings.radius;
            this._color=mainBig.objectBase.settings.color;
            this._glowColor=mainBig.objectBase.settings.glowColor;

            this._rB=this._radius*3

            this.rC=this._radius*6;
            this.wh=this._radius*8;

            bitmap2.width=this.wh;
            bitmap2.height=this.wh;

            bitmap2.ctx.clearRect(0, 0, bitmap2.width, bitmap2.height);
            bitmap2.ctx.filter = 'blur('+this._glowSah+'px)';
            bitmap2.ctx.fillStyle =mainBig.objectBase.settings.glowColor;

            bitmap2.ctx.beginPath();
            bitmap2.ctx.arc(this.wh/2,this.wh/2,this.rC/2,0,Math.PI*2,true); // Внешняя окружность
            bitmap2.ctx.stroke();

            bitmap2.ctx.fillStyle = this._glowColor;
            bitmap2.ctx.fill();    
            bitmap2.ctx.lineWidth = 0;

            //bitmap2.upDate();

            image1.src=bitmap2.canvas.toDataURL("image/png");


        }  

        this.draw1=function(){    


            bitmapGlaf.width=this.wh;
            bitmapGlaf.height=this.wh;
            bitmapGlaf.ctx.clearRect(0, 0, bitmapGlaf.width, bitmapGlaf.height);
            bitmapGlaf.ctx.drawImage(image1, 0, 0);

            //bitmapGlaf.ctx.fillStyle =mainBig.objectBase.settings.color;
            bitmapGlaf.ctx.beginPath();
            bitmapGlaf.ctx.arc(this.wh/2,this.wh/2,this.rC/2,0,Math.PI*2,true); // Внешняя окружность
            bitmapGlaf.ctx.stroke();
            bitmapGlaf.ctx.fillStyle = mainBig.objectBase.settings.colorAct;
            bitmapGlaf.ctx.lineWidth = 1;
            bitmapGlaf.ctx.strokeStyle = mainBig.objectBase.settings.colorAct;
            bitmapGlaf.ctx.fill();
            

           /* bitmapGlaf.ctx.beginPath();
            bitmapGlaf.ctx.arc(this.wh/2,this.wh/2,this.rC/2-this._radius/2,0,Math.PI*2,true); // Внешняя окружность
            bitmapGlaf.ctx.stroke();
            bitmapGlaf.ctx.fillStyle = mainBig.objectBase.settings.color;
            bitmapGlaf.ctx.lineWidth = 0;
            bitmapGlaf.ctx.strokeStyle = mainBig.objectBase.settings.color;
            bitmapGlaf.ctx.fill();*/

            bitmapGlaf.ctx.drawImage(image, this._radius*1.5, this._radius*1.5,this.rC-this._radius,this.rC-this._radius);








            this.link=bitmapGlaf.canvas.toDataURL("image/png");

            //////////////
            let aC= this.parseColor(mainBig.objectBase.settings.colorAct)
            let b= [aC.r,aC.g,aC.b,0];
            let a
            for (var i = 0; i < bitmap.width; i++) {
                for (var j = 0; j < bitmap.width; j++) {
                    a=bitmap.getPixel(i, j)
                    b[3]=a[3];
                    bitmap1.setPixel(i, j, b);
                }
            }
            bitmap1.upDate();
            /////////////



            bitmapGlaf.ctx.clearRect(0, 0, bitmapGlaf.width, bitmapGlaf.height);
            bitmapGlaf.ctx.drawImage(image1, 0, 0);

            //bitmapGlaf.ctx.fillStyle =mainBig.objectBase.settings.color;
            bitmapGlaf.ctx.beginPath();
            bitmapGlaf.ctx.arc(this.wh/2,this.wh/2,this.rC/2,0,Math.PI*2,true); // Внешняя окружность
            bitmapGlaf.ctx.stroke();
            bitmapGlaf.ctx.fillStyle = mainBig.objectBase.settings.colorAct;
            bitmapGlaf.ctx.lineWidth = 0;
            bitmapGlaf.ctx.strokeStyle = mainBig.objectBase.settings.colorAct;
            bitmapGlaf.ctx.fill();
            

            bitmapGlaf.ctx.beginPath();
            bitmapGlaf.ctx.arc(this.wh/2,this.wh/2,this.rC/2-this._radius/2,0,Math.PI*2,true); // Внешняя окружность
            bitmapGlaf.ctx.stroke();
            bitmapGlaf.ctx.fillStyle = mainBig.objectBase.settings.color;
            bitmapGlaf.ctx.lineWidth = 1;
            bitmapGlaf.ctx.strokeStyle = mainBig.objectBase.settings.color;
            bitmapGlaf.ctx.fill();

            

            bitmapGlaf.ctx.drawImage(bitmap1.canvas, this._radius*1.5, this._radius*1.5,this.rC-this._radius,this.rC-this._radius);


            this.link1=bitmapGlaf.canvas.toDataURL("image/png");           
            this.par.draw1()
        } 

        this.complit=function(){
            this.draw()
        }  

        image1.onload = function(){ 
            self.draw1()
        }


        image.onload = function(){ 
            bitmap=new DBitmapData(this.naturalWidth, this.naturalHeight);
            bitmap1=new DBitmapData(this.naturalWidth, this.naturalHeight);
            bitmap2=new DBitmapData(this.naturalWidth, this.naturalHeight);
            bitmapGlaf=new DBitmapData(2, 2); 

            bitmap.ctx.drawImage(image, 0, 0);
            bitmap.imgData = bitmap.ctx.getImageData(0, 0, bitmap.width, bitmap.height); 

            /*let a
            let b=[255,255,255,255];

            for (var i = 0; i < bitmap.width; i++) {
                for (var j = 0; j < bitmap.width; j++) {
                    a=bitmap.getPixel(i, j)
                    b[3]=a[3];
                    bitmap.setPixel(i, j, b);
                }
            }*/
            

            self.complit()  
        }
        image.src =mainBig.objectBase.points.link;




       /* this.array=[];

        for (var i = 0; i < arr.length; i++) {
            this.array[i]=new BDBlok(this,arr[i]);
        }*/

        this.parseColor = function (color) {
            var cache = /^#([\da-fA-F]{2})([\da-fA-F]{2})([\da-fA-F]{2})/.exec(color);
            return {r: parseInt(cache[1], 16), g: parseInt(cache[2], 16), b: parseInt(cache[3], 16)};
        }

  	} 
}

export class BDBlok  {
    constructor(par, obj) { 
        this.obj=obj;
        this.wh=obj.wh;
        this.radius=obj.radius;

        this.textur= par.textureLoader.load(obj.aPic[0]);
        this.textur1= par.textureLoader.load(obj.aPic[1]);
        this.textur2= par.textureLoader.load(obj.aPic[2]);
        this.textur3= par.textureLoader.load(obj.aPic[3]);

        this.material = new THREE.MeshBasicMaterial({map:this.textur})  
        this.material1 = new THREE.MeshBasicMaterial({map:this.textur1}) 
        this.material2 = new THREE.MeshBasicMaterial({map:this.textur2})  
        this.material3 = new THREE.MeshBasicMaterial({map:this.textur3}) 

        this.aM=[this.material,this.material1,this.material2,this.material3]

    }
}


