



import { AMBaza } from './AMBaza.js';

export class AM1Gal extends AMBaza {
  	constructor(par,fun) {  
        super(par,fun);     
  		this.type="AM1Gal";
  		var self=this;
        this.fun=fun;
        this.par=par;

        this._active=false;
        this._indexId=-1;
        this.button=undefined;

        this.widthMenu=par.widthMenu
        this.objBase=undefined
        this._oB=undefined;

 
        var wPlus=2200;
        

        this.dContXZ = new DCont(this.dCont) 
        this.dContXZ.y=this.indent+this.sizeBase+45;

        this.button=new DButton(this.dContXZ, this.otstup1,0,"Datei auswählen",function(s){
            self.par.aCreatPic.setFile(this.files[0],s,function(b,b1){
                self.objBase.array.push({
                    text:"name",
                    icon:b,
                    pic:b1
                });
                self.gallary.start(self.objBase.array); 
                self.par.aM2Assign.openArrId()
            });
        });
        this.button.width=160;        
        this.button.color="#222222";
        this.button.borderRadius=this.minBR;
        this.button.startFile()

        this.down=function(s,p){
            if(s=="kill"){
                self.objBase.array.splice(p,1);
                self.setObj(self.objBase);              
                self.fun("saveTime");
            }
        }

        this.gallary = new DGT(this.dContXZ,0,60,this.down,this)
        this.gallary.widthMenu=this.widthMenu
        this.gallary.otstup=this.otstup1;
        this.gallary.kolII=4;
        this.gallary.widthPic=160
        this.gallary.heightPic=130;
        this.gallary.width=(this.gallary.widthPic+this.gallary.otstup)*this.gallary.kolII+this.gallary.otstup;
        this.gallary.height=(this.gallary.heightPic+this.gallary.otstup)*3+this.gallary.otstup;            
        

        this.gallary.panel.visible=false; 
        this.gallary.bRadius=this.par.bRadius

        this.gallary.boolPositOtctup=false
        this.gallary.zScrol=-12

        /*__________________________________________*/ 
            
/*
        this.i=new DInput(this.dContXZ, 200,0,"resources/image/t0.jpg",function(){
            
        });
        this.i.width=200

        this.i1=new DInput(this.dContXZ, 400,0,"resources/image/p0.png",function(){
            
        });
        this.i1.width=200

        this.i2=new DInput(this.dContXZ, 600,0,"nameRoom",function(){
            
        });
        

        this.b=new DButton(this.dContXZ, 700,0,"<",function(){
                self.objBase.array.push({
                text:self.i2.text,
                icon:self.i1.text,
                pic:self.i.text
            });
            self.gallary.start(self.objBase.array);  
            
            self.fun("saveTime")
        });
        this.b.width=this.b.height*/
        

        ///////////////////////
        

        this.setObj=function(o){
            this.objBase=o; 
            this.gallary.start(this.objBase.array);             
            
        }




        var w,h,s;
        this.sizeWindow = function(_w,_h,_s){             
            if(_w){
                w=_w;
                h=_h;
                s=_s;
            }  
            this.dContXZ.x=_w/2/_s-this.widthMenu/2;                    
        }
  	}

}






function DGT(dCont, _x, _y, _fun,par) {
    DGallery.call(this, dCont, _x, _y, _fun);              
    this.type="DGT";
    this.bRadius=4
    this.color='#ffffff'
    this.par=par
    this.createZamen=function(){            
        var r=new BXZ(this.content, 0, 0, this.downBtn, this);            
        return r;
    }    
}
DGT.prototype = Object.create(DGallery.prototype);
DGT.prototype.constructor = DGT;

Object.defineProperties(DGT.prototype, {

   /* index: {// Активный элемент
        set: function (value) {
            
            if (this.array[value] != undefined) {
                this.korektPoIndex(value);
            }
            
            this._index = value;
           

            for (var i = 0; i < this.array.length; i++) {
                if (this._index == i) this.array[i].activ = true;
                else this.array[i].activ = false;
            }

        },
        get: function () {
            return this._index;
        }
    },*/
})



function BXZ(dCont, _x, _y, _fun, par) {
    DBox.call(this, dCont, _x, _y, _fun);
    this.type = 'BXZ';
    var self=this;
    this.par=par;

    this.label.div.style.pointerEvents="none";
    //this.label.textAlign="center";
    this.label.color="#000000";
    
    this.label.x=this.par.wPlus+148
    this.label.y=10
    this.panel.boolLine=false;
    this.label.bold = true;
    this.label.fontSize=12;



    this.panel.borderRadius =this.par.bRadius;
    this.panel.glowSah=1;
    this.panel.glowColor=par.par.glowColor
    var wh=32
    var ss=42; 
    var s=this.par.bRadius//ss

   // var rh=new DCont(this);    
    //rh.add(this.image)


    this.image.image.style.borderRadius=""+s+"px "+s+"px 0 0";
    var sss="rect(0px "+this.par.widthMenu+"px "+(this.par.heightPic-wh)+"px 0px)";
    this.image.div2.style.clip = sss;



    this.input = new DInput(this,4,0," ",function(){
        self.setTT(this.text);
        self.par.par.fun("saveTime");
    });
    this.input.height=22;
    this.input.width=85;
    this.input.textAlign="left";
    this.input.borderRadius =this.par.bRadius;
    this.input.fontSize=12;
    this.input.visible=false



    this.batton=new DButton(this,0,0,"",function(){
        self.par.fun("kill",self.idArr)
        self.par.par.fun("saveTime");
    },"resources/image/dd2.png")
    this.batton.width=this.batton.height=this.batton.borderRadius=wh*0.8
    this.batton.boolFond=false;

    this.batton1=new DButton(this,0,0,"",function(){
        self.input.visible=!self.input.visible
        this.alpha=self.input.visible==true ? 0.5 : 1
        self.par.par.fun("saveTime");
    },"resources/image/dd3.png")
    this.batton1.width=this.batton1.height=this.batton1.borderRadius=wh*0.8
    this.batton1.boolFond=false;

   //div2.

    this.setTT=function(s){
        let kk=12
        if(s.length<=kk){
            this.label.text=s
            return
        }
        let ss=""
        for (var i = 0; i < 12; i++) {
            if(s[i])ss+=s[i]
        }

        this.label.text= ss+".."  
    }

    this.startLoad = function (_obj) {  
        this.input.visible=false;
        this.batton1.alpha=1
        this.object = _obj;
        this.input.text=_obj.text
        this.setTT(_obj.text)
        this.label.visible=true;
        this.label.bould = true;
        this.image.link = _obj.icon;

        self.funLoad();
      
        this.draw();

        self.funLoad();
    };

    var ss
    this.draw = function () {
        this.image.visible=true;
       /* this.label.x=100
        this.label.y=10*/
 
        let hh=this._height-wh
        ss = (this._width ) / this.image.picWidth;
        //if (ss > (hh - this._otstup * 2) / this.image.picHeight)ss = (hh - this._otstup * 2) / this.image.picHeight;
       
        this.image.width=this.image.picWidth*ss;
        this.image.height=this.image.picHeight*ss;

        this.image.x = 0//(this._width - this.image.picWidth * ss) / 2;
        this.image.y = 0//(this._height - this.image.picHeight * ss) / 2-10;

        this.label.x = 10//(this._width - this.label.curW) / 2;
        this.label.y = this._height - 24;

        this.label.width=this.panel.width*2;

        this.batton.x= this._width-this.batton.width-wh*0.1  
        this.batton.y= this._height-this.batton._height-wh*0.1 

        this.batton1.x= this._width-this.batton.width*2-wh*0.3  
        this.batton1.y= this._height-this.batton._height-wh*0.1  

        this.input.y= this.batton1.y;        

        var s=Math.round(this.par.bRadius/ss)
  
        //this.image.image.style.borderRadius=""+s+"px "+s+"px 0 0";    

        if (this.postDraw) this.postDraw();
    };



    if(dcmParam.mobile==false){

        this.panel.div.removeEventListener("mouseout", this.mouseOut);
        this.image.image.removeEventListener("mouseout", this.mouseOut);

        this.panel.div.removeEventListener("mouseover", this.mouseOver);
        this.image.image.removeEventListener("mouseover", this.mouseOver); 
    }





}
BXZ.prototype = Object.create(DBox.prototype);
BXZ.prototype.constructor = BXZ;

Object.defineProperties(BXZ.prototype, {
    activ: { // активный элемент
        set: function (value) {
            if (this._activ == value) return;
            this._activ = value;
           // this._color=this._color1;
          

            if(this._activ){
                //this.image.link=this.object.src;
                //this.label.color="#93c32f"
            }else{
                //this.image.link=this.object.src1;
                //this.label.color="#000000"
            }

            if(this._activ==false)this.panel.color1=this._color1;
            else this.panel.color1=this._color;

        },
        get: function () {
            return this._activ;
        }
    },
})
