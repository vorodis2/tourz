



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

        this.button=new DButton(this.dContXZ, 0,0,"Datei auswählen",function(){
            
        });
        this.button.width=160;        
        this.button.color="#222222";
        this.button.borderRadius=2;


        this.gallary = new DGT(this.dContXZ,0,60,this.down,this)
        this.gallary.widthMenu=this.widthMenu
        this.gallary.kolII=4;
        this.gallary.widthPic=160//this.widthMenu/this.gallary.kolII-4;
        this.gallary.heightPic=120;
        this.gallary.width=this.widthMenu;
        this.gallary.height=500;            
        this.gallary.otstup=2;  
        this.gallary.panel.visible=false; 
        this.gallary.bRadius=this.par.bRadius


        /*__________________________________________*/ 
            


        this.i=new DInput(this.dContXZ, 200,0,"resources/image/t0.jpg",function(){
            
        });
        this.i.width=200

        this.i1=new DInput(this.dContXZ, 400,0,"resources/image/p0.png",function(){
            
        });
        this.i1.width=200

        this.i2=new DInput(this.dContXZ, 600,0,"nameRoom",function(){
            
        });
        

        this.b=new DButton(this.dContXZ, 700,0,"<",function(){
                self.oB.array.push({
                text:self.i2.text,
                icon:self.i1.text,
                pic:self.i.text
            });
            self.oB=self.oB
            
            self.fun("saveTime")
        });
        this.b.width=this.b.height
        

        ///////////////////////
        

        this.setObj=function(o){
            this.objBase=o;           
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

    set indexId(value) {
        if (this._indexId != value) {
            this._indexId = value;  
            this.oB=undefined;

            for (var i = 0; i < this.objBase.array.length; i++) {                
                if(this.objBase.array[i].id==this._indexId){                   
                    this.oB=this.objBase.array[i];
                    return
                }
            }                              
        }             
    }
    get indexId() { return this._indexId; }  

    set oB(value) {
        if(this._oB==undefined&&value==undefined)return       
        this._oB = value; 
        if( this._oB !=undefined){
            this.gallary.start(this._oB.array);  
        }else{
            this.gallary.clear();
        }
                                      
                    
    }
    get oB() { return this._oB; }
}






function DGT(dCont, _x, _y, _fun,par) {
    DGallery.call(this, dCont, _x, _y, _fun);              
    this.type="DGT";
    this.bRadius=4

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
    this.label.textAlign="center";
    this.label.color="#000000";
    
    this.label.x=this.par.wPlus+148
    this.label.y=10
    this.panel.boolLine=false

    this.panel.borderRadius =this.par.bRadius;

    var ss=42; 
    var s=this.par.bRadius//ss
    this.image.image.style.borderRadius=""+s+"px "+s+"px 0 0";
    var sss="rect(0px "+this.par.widthMenu+"px "+(this.par.heightPic-24)+"px 0px)";
    this.image.div2.style.clip = sss;

   //div2.

    this.startLoad = function (_obj) {  
       
        this.object = _obj;
        this.label.text= _obj.text;
        this.label.visible=true;


        this.image.link = _obj.icon;

        self.funLoad();

       


   

       /* this.label.visible=true
        if(this.object!=undefined) {
            self.funLoad();
            return   
        }        

        this.object = _obj;

        if (_obj.title) {
            this.label.text = _obj.title;
            this.label.value = _obj.title;
            this.label.visible = true;
        }
        if (_obj.src1) {
            //this.image.visible = true;
            if (this.image.link == _obj.src1) {
                if (self.funLoad) self.funLoad();
            } else {
                this.image.width = 100;
                this.image.height = 100;
                this.image.link = _obj.src1;
            }
        }else{
            if (self.funLoad) self.funLoad();
        }*/
        this.draw();

        self.funLoad();
    };

    var ss
    this.draw = function () {
        this.image.visible=false;
        this.label.x=100
        this.label.y=10
 
        let hh=this._height-30
        ss = (this._width - this._otstup * 4) / this.image.picWidth;
        //if (ss > (hh - this._otstup * 2) / this.image.picHeight)ss = (hh - this._otstup * 2) / this.image.picHeight;
        this.image.x = 0;
        this.image.width=this.image.picWidth*ss;
        this.image.height=this.image.picHeight*ss;

        this.image.x = (this._width - this.image.picWidth * ss) / 2;
        this.image.y = this._otstup//(this._height - this.image.picHeight * ss) / 2-10;

        this.label.x = 2//(this._width - this.label.curW) / 2;
        this.label.y = this._height - 20;

        this.label.width=this.panel.width

        

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
                this.label.color="#93c32f"
            }else{
                //this.image.link=this.object.src1;
                this.label.color="#000000"
            }

            if(this._activ==false)this.panel.color1=this._color1;
            else this.panel.color1=this._color;

        },
        get: function () {
            return this._activ;
        }
    },
})
