



import {DebbugPixi,XZImage} from './DebbugPixi.js';
import {MBlok} from './MBlok.js';

export class Map  {
  	constructor(par, fun) {          
        this.type="Map";
        var self=this;

        this.par=par;
        this.fun=fun;
        this._index=-1;
        this._boolPanel=false;

        this.confScane=mainBig.objectBase.scene;
        this.arrFoto=mainBig.objectBase.scene.arrFoto;

        this._indent=mainBig.objectBase.settings.indent;
        this._sizeBase=mainBig.objectBase.settings.sizeBase;


        this.width=100;
        this.height=100;
        this.arrayCech=[];

        this._mashtab=1;    
        

        //this.dCont=new DCont(this.par.dCont);   

        this._tipPosit=0;

        this.content2d = new PIXI.Container();
        this.graphicsPanel = new PIXI.Graphics();  
        this.content2d.addChild(this.graphicsPanel);
       

        this.scalMi=1;
        /*if(dcmParam.mobile==true){ 
            this.scalMi=0.75
            this.content2d.scale.x=this.scalMi
            this.content2d.scale.y=this.scalMi
        }*/

        this.c2dMap = new PIXI.Container();
        this.c2dGiro = new PIXI.Container();

        
        this.hiro=new Hiro(function(s,p){
            if(s=="draw"){
                for (var i = 0; i < self.arrayCech.length; i++) {  
                    self.arrayCech[i].draw()
                }
            }
        })

        basaComp.addComp(this.hiro,true);
        //this.c2dGiro.addChild(this.hiro.content2d) 



        this.arrImeg=[];
        this.array=[];

        this.init=function(){
           
            this.arrImeg[0]=new XZImage(this.content2d,0,0,this.confScane.bottom.src,function(){                
                self.width=this.picWidth*self.scalMi
                this.width=this.picWidth;               
                self.height=this.picHeight*self.scalMi
                this.height=this.picHeight;                
                self.sizeWindow();
                self.fun("sizeWindow");
                self.content2d.addChild(self.c2dMap);                
                self.init1();
            })

        }
        this.init1=function(){
            /*this.arrImeg[1]=new XZImage(this.content2d,0,0,this.confScane.point.src,function(){
                this.width=this.picWidth;
                this.height=this.picHeight;
                
            })*/
            self.init2();
        }

        this.init2=function(){//персонаж
            self.content2d.addChild(self.hiro.content2d); 
            self.sizeWindow(); 
            self.dragboolPanel();
            self.init3(); 

            /*this.arrImeg[2]=new XZImage(this.c2dGiro,0,0,this.confScane.hero.src,function(){
                this.width=this.picWidth;
                this.height=this.picHeight;
                this.x =-this.width/2;
                this.y =-this.height/2;                
                self.sizeWindow(); 
                self.dragboolPanel();
                self.init3();                
            })*/


        }


        this.uploadMapBottom= function () { 
            this.arrImeg[0].fun=function(){  
                self.width=this.picWidth*self.scalMi
                this.width=this.picWidth;               
                self.height=this.picHeight*self.scalMi
                this.height=this.picHeight;                
                self.sizeWindow();
                self.fun("sizeWindow");
            }
            this.arrImeg[0].link=this.confScane.bottom.src
        }


        this.fun_rotationZ = function () {
            this.hiro.rotation=visi3D.rotationZ //          
            //this.c2dGiro.rotation=visi3D.rotationZ
            //this.fun("intRend")
        }



        this.sobBlok=function(s,p){
            self.fun(s,p)
        }


        
        this.init3=function(){
           /* for (var i = 0; i < this.confScane.array.length; i++) {  
                this.arrayCech              
                this.array[i]=new MBlok(this, this.confScane.array[i], this.sobBlok, i )
            } */
            this.resetPoint()
            this.dragIndex();            
           /* this.fun("intRend");
            self.sizeWindow();*/
        }

        this.resetPoint=function(){
            for (var i = 0; i < this.array.length; i++) {
                this.array[i].life=false;
            }
            this.array=[]
            var point
            for (var i = 0; i < this.confScane.array.length; i++) {  
                if(this.arrayCech[i]==undefined)this.arrayCech[i]=new MBlok(this, this.confScane.array[i], this.sobBlok, i)                
                this.array[i] = this.arrayCech[i] 
                this.array[i].setObject(this.confScane.array[i]);
                this.array[i].life=true;
            }
            
            this.fun("intRend");
            self.sizeWindow();
        }


        this.creatVector=function(){            
            for (var i = 0; i < this.confScane.array.length; i++) {                 
                if(this.array[i]){
                    this.array[i].redragVector();
                }
            }
        }
        this.otstup=5;
        this.dragboolPanel=function(){
            this.graphicsPanel.clear();
            

            if(this._boolPanel){
                //this.graphicsPanel.beginFill(0xf6f4f5, 0); 
                //this.graphicsPanel.drawRect(-9999,-9999,9999*2,9999*2)
           

                this.graphicsPanel.beginFill(0xf6f4f5, 0.5); 
                this.graphicsPanel.drawRect(-this.otstup,-this.otstup,this.width+this.otstup*2,this.height+this.otstup*2)
                //this.graphicsPanel.interactive = true;
            }else{
                //this.graphicsPanel.interactive = false;
            }
        }

     



        this.getSprite = function(p){
            for (var i = 0; i < this.array.length; i++) {
                if(this.array[i].getSprite(p)!==null)return this.array[i]
            }
            return null
        }


 

        this.dragIndex= function () {
            for (var i = 0; i < this.array.length; i++) {
                if(i==this.index){
                    this.array[i].active=true
                   // this.c2dGiro.x=this.array[i].obj.x-15;
                    //this.c2dGiro.y=this.array[i].obj.y-15;

                    this.hiro.x=this.array[i].obj.x
                    this.hiro.y=this.array[i].obj.y
                    this.hiro.content2d.visible=true
                    this.hiro.setMBlok(this.array[i])
                    this.hiro.rotation=this.hiro._rotation
                    this.fun_rotationZ();
                }else{
                    this.array[i].active=false;
                }                
            }
        }


        this.init();


        //ап дете сцена деленая на 2 в мейне
        this.update = function () {
           
        }

        var w,h,s


        this.sizeWindow = function(_w,_h,_s){ 
            if(_w){
                w=_w;
                h=_h;
                s=_s;
            }
            let ss=1;
            
            if(this._tipPosit == 0){
                if(mainBig.debug==true){
                    
                    let www=this._indent*2.5+this._sizeBase*3;

                    if(this.width>w/2-www-this._indent)ss=(w/2-www-this._indent)/this.width;
                    if(ss<0.2)ss=0.2;




                    //this.content2d.scale.x=ss
                    //this.content2d.scale.y=ss
                    this.mashtab=ss

                    this.content2d.y=this._indent;

                    if(ss==1){
                        this.content2d.x= w - this.width-this._indent;                        
                    }else{
                        this.content2d.x= w /2+www;
                        //this._indent=mainBig.objectBase.settings.indent;
                        //this._sizeBase
                    }

                }else{
                    this.content2d.y=this._indent;
                    this.content2d.x= w - this.width-this._indent;
                }               
            }
            if(this._tipPosit == 1){
                if(mainBig.debug==true){
                    
                    ss=1;
                    let www=this._indent*3+this._sizeBase*4*1.5;
                    
                    //if(this.width>w/2-www-this._indent)
                    ss=www/this.width*s;                 



                    //this.content2d.scale.x=ss
                    //this.content2d.scale.y=ss
                    this.mashtab=ss

                    this.content2d.y=this._indent;


                    this.content2d.x=( w)/2-this.width*ss/2;
                    this.content2d.y=( h)/2-this.height*ss/2;  


                }else{
                    this.content2d.x=( w -  this.width)/2;
                    this.content2d.y=( h -  this.height)/2;

                }
                
            }

            
        }  		
  	}
    set tipPosit(value) {
        if (this._tipPosit != value) {
            this._tipPosit = value;  
            this.sizeWindow()      
            
        }
    }
    get tipPosit() { return this._tipPosit; } 


    set mashtab(value) {
        if (this._mashtab != value) {
            this._mashtab = value;  
            this.content2d.scale.x=value;
            this.content2d.scale.y=value;
            this.hiro.mashtab=value;
            for (var i = 0; i < this.arrayCech.length; i++) {
                this.arrayCech[i].mashtab=this._mashtab
            }           
        }
    }
    get mashtab() { return this._mashtab; } 



    set index(value) {
        if (this._index != value) {
            this._index = value;  
            this.dragIndex()       
            
        }
    }
    get index() { return this._index; } 

    set boolPanel(value) {
        if (this._boolPanel != value) {
            this._boolPanel = value;  
            this.dragboolPanel()       
            
        }
    }
    get boolPanel(){ return this._boolPanel; } 


    set visible(value) {
        if (this._visible != value) {
            this._visible = value;  
            this.content2d.visible = value;            
        }
    }
    get visible() { return this._visible; } 
    

}




export class Hiro  {
    constructor(fun) {          
        this.type="Hiro";
        var self=this;
        this.link="resources/image/shadow.png"
        this.fun=fun


        this._glowSah=mainBig.objectBase.settings.glowSah;
        this._radius=mainBig.objectBase.settings.radius;
        this._color=mainBig.objectBase.settings.color;
        this._glowColor=mainBig.objectBase.settings.glowColor;

        this.radius0=this._radius;
        this.radius1=this._radius*1.5;
        this.radius2=this._radius*4;
        this.radius3=this.radius1+this._glowSah*10;
        this.radiusPoint=this._radius/2;

        this._mashtab=1


        var bitmap=undefined //new DBitmapData(this.image.picWidth, this.image.picHeight)  

        this.content2d = new PIXI.Container();
        this.content2d.visible=false

        this.bitmapPoint=undefined;    
        this.linkPic=undefined; 

        var image = new Image();
        image.onload = function(){ 
            bitmap=new DBitmapData(this.naturalWidth, this.naturalHeight);
            self.bitmapPoint=new DBitmapData(2, 2); 
            self.draw()  
        }
        image.src ="resources/image/shadow.png"

        this.image=new XZImage(this.content2d,0,0,null,function(){           
                        
        })
        this.image.width=this.image.height=this.radius2;
        this.image.x=-this.image.width/2;
        this.image.y=-this.image.height;



        this.image1=new XZImage(this.content2d, 0, 0, null, function(){           
                           
        })
        this.image1.width=this.image1.height=this.radius3;
        this.image1.x=-this.image1.width/2;
        this.image1.y=-this.image1.height/2;



        this.graphics = new PIXI.Graphics();  
        this.content2d.addChild(this.graphics);

        this._x=0;
        this._y=0;
        this._rotation=0;


        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');

        

        this.draw=function(){

            this.radius0=this._radius;
            this.radius1=this._radius*1.5;
            this.radius2=this._radius*4;
            this.radius3=this.radius1+this._glowSah*10;
            this.radiusPoint=this._radius/2;



            this._glowSah=mainBig.objectBase.settings.glowSah;
            this._glowColor=mainBig.objectBase.settings.glowColor;

            this.image.width=this.image.height=this.radius2;
            this.image.x=-this.image.width/2;
            this.image.y=-this.image.height;


            this.image1.width=this.image1.height=this.radius3;
            this.image1.x=-this.image1.width/2;
            this.image1.y=-this.image1.height/2;


            this.canvas.width = this.radius3;
            this.canvas.height = this.radius3;
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.filter = 'blur('+this._glowSah+'px)';
            this.ctx.fillStyle =mainBig.objectBase.settings.glowColor;

            this.ctx.beginPath();
            this.ctx.arc(this.radius3/2,this.radius3/2,this.radius1,0,Math.PI*2,true); // Внешняя окружность
            this.ctx.stroke();

            this.ctx.fillStyle = this._glowColor;
            this.ctx.fill();    
            this.ctx.lineWidth = 0;
            this.image1.link = this.canvas.toDataURL("image/png");


            if(bitmap){
                let aC= this.parseColor(this._glowColor)
                let am= [aC.r,aC.g,aC.b,0];
                bitmap.ctx.clearRect(0, 0, bitmap.width, bitmap.height);
                bitmap.ctx.drawImage(image, 0, 0);
                bitmap.imgData = bitmap.ctx.getImageData(0, 0, bitmap.width, bitmap.height); 
                let a=[]
                for (var i = 0; i < bitmap.width; i++) {
                    for (var j = 0; j < bitmap.width; j++) {
                        a=bitmap.getPixel(i, j)
                        am[3]=a[3];
                        bitmap.setPixel(i, j, am);
                    }
                }
                bitmap.upDate();
                this.image.link=bitmap.canvas.toDataURL("image/png");
            



                /////////////////////////
                let wh=this.radiusPoint*2+this._glowSah*4;
                this.bitmapPoint.width=wh
                this.bitmapPoint.height=wh
                this.bitmapPoint.ctx.clearRect(0, 0, this.bitmapPoint.width, this.bitmapPoint.height);
                this.bitmapPoint.ctx.filter = 'blur('+this._glowSah+'px)';
                this.bitmapPoint.ctx.fillStyle =mainBig.objectBase.settings.glowColor;

                this.bitmapPoint.ctx.beginPath();
                this.bitmapPoint.ctx.arc(wh/2,wh/2,this.radiusPoint,0,Math.PI*2,true); // Внешняя окружность
                this.bitmapPoint.ctx.stroke();
                this.bitmapPoint.ctx.fillStyle = this._glowColor;
                this.bitmapPoint.ctx.fill();    
                this.bitmapPoint.ctx.lineWidth = 0;

                this.linkPic = this.bitmapPoint.canvas.toDataURL("image/png");
            }
            //////////////////////////

/*

            

            this.canvas.width = this.image.picWidth;               
            this.canvas.height = this.image.picHeight;

            this.ctx.drawImage(this.image.image, 0, 0);
            this.imgData = this.canvas.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height); 
            let  a=[]
            for (var i = 0; i < this.canvas.width; i++) {
                for (var j = 0; j < this.canvas.width; j++) {
                    a=this.canvas.getPixel(i, j)
                    am[3]=am[3];
                    this.canvas.setPixel(i, j, am);
                }
            }
            this.canvas.upDate();
            this.image.link=this.canvas.canvas.toDataURL("image/png");*/










            this.graphics.clear();
            let c=this.parseColor(mainBig.objectBase.settings.color)
            let c1="0x"+c.r.toString(16)+c.g.toString(16)+c.b.toString(16)
            this.graphics.beginFill(c1, 1); 
            this.graphics.drawCircle(0,0,this.radius1)

            c=this.parseColor(mainBig.objectBase.settings.colorAct)
            c1="0x"+c.r.toString(16)+c.g.toString(16)+c.b.toString(16)
            this.graphics.beginFill(c1, 1); 
            this.graphics.drawCircle(0,0,this.radius0);

            this.fun("draw")
            visi3D.intRend=1

        }


        this.blok=undefined
        this.setMBlok= function (blok) {
            this.blok=blok
        }
        


        this.compToHex = function (c) {
            var hex = c.toString(16);
            return hex.length == 1 ? '0' + hex : hex;
        };

        this.corectForBtn = function (_val) {
            var m=[];
            m[0] = Math.floor(_val / (256 * 256));
            m[1] = Math.floor(_val / 256) % 256;
            m[2] = _val % 256;
            return m;       
        };

        this.parseColor = function (color) {
            var cache = /^#([\da-fA-F]{2})([\da-fA-F]{2})([\da-fA-F]{2})/.exec(color);
            return {r: parseInt(cache[1], 16), g: parseInt(cache[2], 16), b: parseInt(cache[3], 16)};
        }
       // this.draw()
    }

    set mashtab(value) {
        if (this._mashtab != value) {
            this._mashtab = value;  
            this.content2d.scale.x=1/value;
            this.content2d.scale.y=1/value;                  
        }
    }
    get mashtab() { return this._mashtab; } 

    set glowSah(value) {
        //if (this._glowSah != value) {
            this._glowSah = value; 
            this.draw() 
        //}        
    }
    get glowSah() { return this._glowSah; } 

    set glowColor(value) {
        //if (this._glowColor != value) {
            this._glowColor = value; 
            this.draw() 
        //}        
    }
    get glowColor() { return this._glowColor; } 

    set radius(value) {
        this._radius = value; 
        this.draw()         
    }
    get radius() { return this._radius; } 

    set color(value) {
       // if (this._color != value) {
            this._color = value; 
            this.draw()
       // }         
    }
    get color() { return this._color; } 

    set colorAct(value) {
       // if (this._color != value) {
            this._color = value; 
            this.draw()
       // }         
    }
    get colorAct() { return this._color; } 



    set rotation(value) {
        //if (this._rotation != value) {
            this._rotation = value;
            let r=0;
            if(this.blok && this.blok.obj && this.blok.obj.turn)  r=this.blok.obj.turn
            
            this.content2d.rotation = value+r;                  
        //}
    }
    get rotation() { return this._rotation;} 


    set x(value) {
        if (this._x != value) {
            this._x = value;  
            this.content2d.x = value;            
        }
    }
    get x() { return this._x; } 

    set y(value) {
        if (this._y != value) {
            this._y = value;  
            this.content2d.y = value;            
        }
    }
    get y() { return this._y; } 


    
}    





