



import { AMBaza } from './AMBaza.js';
import { AM2APlan } from './AM2APlan.js';
import { AM2AView } from './AM2AView.js';

export class AM2Assign extends AMBaza {
  	constructor(par,fun) {  
        super(par,fun);     
  		this.type="AM2Assign";
  		var self=this;
        this.fun=fun;

        this._active=false;
        this._indexId=-1;
        this.button=undefined;

        this.widthMenu=par.widthMenu
        this.objBase=undefined
        this._oB=undefined;

        this.ddragPic=par.ddragPic;
        
        

        this.dContXZ = new DCont(this.dCont) 
        this.dContXZ.y=this.indent+this.sizeBase+45;

      

        this.am2aPlan = new AM2APlan(this,function(s,p){
            if(s=="index")self.index=p;
            if(s=="saveTime")self.fun("saveTime")
        });
        this.am2aPlan.dCont.x =this.widthMenu/2;

        this.am2aView = new AM2AView(this,function(s,p){
            if(s=="index")self.index=p;
            if(s=="fun_rotationZ")self.am2aPlan.setRotation(p)
        });
        this.am2aView.width=this.widthMenu/2-5;
        this.am2aView.height=this.widthMenu/2-5;






        this.up=function(){
            let o=self.par.fXYP(self.am2aPlan.dCont);
            let o1={}
            o1.x=(self.ddragPic.dCont.x*self.ddragPic.oSc.s-o.x)/self.ddragPic.oSc.s
            o1.y=(self.ddragPic.dCont.y*self.ddragPic.oSc.s-o.y)/self.ddragPic.oSc.s    
            o1.s= self.ddragPic.oSc.s    
            self.am2aPlan.addObj(self.ddragPic.object,o1)
            self.openArrId();
        }

        this.down=function(){
            self.dragO(this.array[this.index].object);             
        }
        this.dragO=function(o){
            self.ddragPic.start(32,"resources/image/dragPint.png",o,self.up) 
            self.am2aPlan.remuveObj(o); 
            self.openArrId();
        }
       

        this.gallary = new DGT1(this.dContXZ,0,0,this.down,this)
        this.gallary.widthMenu=this.widthMenu;
        this.gallary.kolII=2;
        this.gallary.widthPic=160//this.widthMenu/this.gallary.kolII-4;
        this.gallary.heightPic=120;
        this.gallary.width=this.widthMenu;
        this.gallary.height=500;            
        this.gallary.otstup=2;       
        this.gallary.panel.visible=false;
        

        ///////////////////////
        

        this.setObj=function(o){
            this.objBase=o;  
                  
        }
        var aaa
        this.openArrId=function(a){
            if(a==undefined)a=aaa;
            aaa=a;    
            for (var i = 0; i < a.length; i++) {                
                if(a[i].active==undefined)a[i].active=false;
                if(a[i].position==undefined)a[i].position={x:0,y:0};
                if(a[i].rotation==undefined)a[i].rotation=0;
                if(a[i].id==undefined)a[i].id=Math.round(Math.random()*9999999);
                if(a[i].rotation==undefined)a[i].rotation=0;
                if(a[i].rPlus==undefined)a[i].rPlus=0;
            }
            this.gallary.start(a); 
            this.am2aPlan.start(a);  
        }


        this.dragIndex= function(){
            let b=false;
            this.am2aPlan.index=this._index;
            if(this._index!=-1){
                this.am2aView.setObj(this.am2aPlan.array[this._index].object)
                this.am2aView.active=true;
                this.gallary.visible=false;
            }else{
                this.am2aView.active=false;
                this.gallary.visible=true;
            }
        }

        var w,h,s;
        this.sizeWindow = function(_w,_h,_s){             
            if(_w){
                w=_w;
                h=_h;
                s=_s;
            }  
            this.dContXZ.x=_w/2/_s-this.widthMenu/2; 
            this.am2aPlan.sizeWindow(_w,_h,_s); 



        }
  	}

    //index
    set index(value) {
        if (this._index != value) {
            this._index = value;  
            this.dragIndex();                                        
        }             
    }
    get index() { return this._index; }  


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
            this.openArrId(this._oB.array)
            
            this.am2aPlan.setPic(this._oB.link.src)   
            
        }else{
            this.gallary.clear();
        }
                                      
                    
    }
    get oB() { return this._oB; }
}






function DGT1(dCont, _x, _y, _fun,par) {
    DGallery.call(this, dCont, _x, _y, _fun);              
    this.type="DGT1";
    this.createZamen=function(){            
        var r=new BXZ1(this.content, 0, 0, this.downBtn, this);            
        return r;
    }    
}
DGT1.prototype = Object.create(DGallery.prototype);
DGT1.prototype.constructor = DGT1;


function BXZ1(dCont, _x, _y, _fun, par) {
    DBox.call(this, dCont, _x, _y, _fun);
    this.type = 'BXZ1';
    var self=this;
    this.par=par;

    this.label.div.style.pointerEvents="none";
    this.label.textAlign="center";
    this.label.color="#000000";
    
    this.label.x=this.par.wPlus+148
    this.label.y=10
    //this.panel.boolLine=false
    var wh=24
    var ot=4

    this.imege=new DImage(this,this.par.widthPic-wh-ot,this.par.heightPic-wh-ot,"resources/image/eyeadd.png")
    this.imege.width=this.imege.height=wh;

    this.imege1=new DImage(this,this.par.widthPic-wh-ot,this.par.heightPic-wh-ot,"resources/image/eyedelete.png")
    this.imege1.width=this.imege1.height=wh;



    this.startLoad = function (_obj) {        
        this.object = _obj;
        this.label.text= _obj.text;
        this.label.visible=true;
        if(this.image.link!=_obj.icon)this.image.link = _obj.icon;

        
        this.imege.visible=  _obj.active 
        this.imege1.visible=  !_obj.active  

        self.funLoad();
        this.draw();
        self.funLoad();
    };

    if(dcmParam.mobile==false){
        this.panel.div.removeEventListener("mouseout", this.mouseOut);
        this.image.image.removeEventListener("mouseout", this.mouseOut);

        this.panel.div.removeEventListener("mouseover", this.mouseOver);
        this.image.image.removeEventListener("mouseover", this.mouseOver); 
    }
}
BXZ1.prototype = Object.create(DBox.prototype);
BXZ1.prototype.constructor = BXZ1;

Object.defineProperties(BXZ1.prototype, {
    activ: { // активный элемент
        set: function (value) {
            if (this._activ == value) return;
            this._activ = value;
            if(this._activ){
                this.label.color="#93c32f"
            }else{
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