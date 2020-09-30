



import {DebbugPixi,XZImage} from './DebbugPixi.js';

export class MBlok  {
    constructor(par,obj,fun,idArr) {
        var self=this
        this.type="MBlok";
        this.par=par;
        this.obj=obj;
        this.fun=fun;
        this.idArr=idArr;
        this._active=false;
        this._life=true;

        this.content2d = new PIXI.Container();
        this.par.c2dMap.addChild(this.content2d);

        this.arrImeg=[]; 

        this.bLoad=false
        self.bitmapData;
        



        this.arrImeg[0]=new XZImage(this.content2d,0,0,null,function(){
            this.width=this.picWidth;
            this.height=this.picHeight;
            self.par.intRend=0
        })


        this.graphics = new PIXI.Graphics();
        this.content2d.addChild(this.graphics);
        
        this.graphics.interactive = true;
        this.graphics.buttonMode = true;
        this.graphics.alpha=0.01;

        this.graphics1 = new PIXI.Graphics();
        this.content2d.addChild(this.graphics1);
        
        this.graphics1.interactive = true;
        this.graphics1.buttonMode = true;
        this.graphics1.alpha=0.01;



        

        this.c2d = new PIXI.Container();
        this.content2d.addChild(this.c2d);

        this.arrImeg[1]=new XZImage(this.c2d,0,0,null,function(){
            this.width=this.picWidth;
            this.height=this.picHeight;
            
            this.x= - this.width/2;
            this.y= - this.height/2;
            self.par.intRend=0;
        })


        this.graph = new PIXI.Graphics();
        this.c2d.addChild(this.graph);

        this.draw = function(){
            this.radius1=this.par.hiro.radiusPoint*2;

            this.graph.clear()
            let c=this.par.hiro.parseColor(mainBig.objectBase.settings.colorAct)
            let c1="0x"+c.r.toString(16)+c.g.toString(16)+c.b.toString(16)
            this.graph.beginFill(c1, 1); 
            this.graph.drawCircle(0,0,this.radius1)    

            if(this.par.hiro.linkPic!=undefined){
                this.arrImeg[1].link=this.par.hiro.linkPic
            }
            if(this.par.hiro._glowSah!=0)this.arrImeg[1].visible=true
            else this.arrImeg[1].visible=false
        }

        this.draw()





        this.setObject = function (o) {
            this.obj=o;
            this.c2d.x=self.obj.x
            this.c2d.y=self.obj.y
            //this.arrImeg[2].x=self.obj.x - this.arrImeg[2].width/2;
            //this.arrImeg[2].y=self.obj.y - this.arrImeg[2].height/2;
            this.content2d.visible=o.active;
            //this.graphics1.visible=o.active;
            this.redragVector();
        }


        this.mouseOut = function (e) {
            self.content2d.alpha=1
            mainBig.glaf.scPixi.render(); 
        }

        this.mouseOver = function (e) {
            self.content2d.alpha=0.75
            mainBig.glaf.scPixi.render(); 
        }


        this.onDown = function(e){            
            fun("setIndex",self.idArr);
            fun("onDownMB",e);
        }

        if(dcmParam.mobile==false){ 
            this.graphics.on('mousedown', this.onDown);
            this.graphics.on('mouseout', this.mouseOut);
            this.graphics.on('mouseover', this.mouseOver);

            this.graphics1.on('mousedown', this.onDown);
            this.graphics1.on('mouseout', this.mouseOut);
            this.graphics1.on('mouseover', this.mouseOver);

        }else{
            this.graphics.on('touchstart', self.onDown);
            this.graphics1.on('touchstart', self.onDown);
        }


        var rad=this.par.hiro.radiusPoint*2

        this.redragVector=function(){
            this.graphics.clear()
            this.graphics.beginFill(0xffffff, 0.3); 

            this.graphics1.clear()
            this.graphics1.beginFill(0xffffff, 0.3); 
            this.arrImeg[0].visible=false
            if(this.obj.vector){
                for (var i = 0; i < this.obj.vector.length; i++) {                   
                    this.graphics1.moveTo(this.obj.vector[i][0].x,this.obj.vector[i][0].y)
                    for (var j = 1; j < this.obj.vector[i].length; j++) {
                        this.graphics1.lineTo(this.obj.vector[i][j].x,this.obj.vector[i][j].y)
                    }                    
                }
                this.arrImeg[0].link=obj.src1;
                this.arrImeg[0].visible=true
            }
            this.graphics.drawCircle(this.obj.x,this.obj.y,rad);    

        }   
        this.redragVector();


        this.getSprite = function(p){
            if(this.bLoad==false)return null

            let i=Math.round(p.x)
            if(i<0) i=0
            if(i>self.bitmapData.width-1) i=self.bitmapData.width-1;

            let j=Math.round(p.y)
            if(j<0) j=0
            if(j>self.bitmapData.height-1) j=self.bitmapData.height-1;

            let a=self.bitmapData.getPixel(i,j)            
            if(a[3]!=0)return this            
            return null
        }




    }

    set mashtab(value) {
        if (this._mashtab != value) {
            this._mashtab = value;  
            this.c2d.scale.x=1/value;
            this.c2d.scale.y=1/value;                  
        }
    }
    get mashtab() { return this._mashtab; } 

    set active(v) {
        if(this._active!=v){
            this._active = v;  
                  
           // this.arrImeg[0].visible=!v;
            //this.arrImeg[1].visible=v;
            
            if(v){
                this.graphics.alpha=1;
                this.graphics1.alpha=1; 
            } 
            else{
                this.graphics.alpha=0.01;
                this.graphics1.alpha=0.01;
            } 
            this.par.intRend=0;
        }       
    }   
    get active() { return  this._active;} 

    set life(v) {
        if(this._life!=v){
            this._life = v;  
                  
            if(this._life){
                this.par.c2dMap.addChild(this.content2d);
                this.redragVector()
            }else{
                this.par.c2dMap.removeChild(this.content2d);
            }
        }       
    }   
    get life() { return  this._life;} 




}

