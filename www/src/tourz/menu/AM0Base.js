



import { AMBaza } from './AMBaza.js';

export class AM0Base extends AMBaza {
  	constructor(par,fun) {  
        super(par,fun);     
  		this.type="AM0Base";
  		var self=this;
        this.fun=fun;

        this._active=false;

        this.button=undefined;


        this.down= function(){


        }    

        var arrDubag=[]
        this.setProdukts= function(){
            arrDubag.push({
                id:63772,
                grundrissname:"Eichest. 1EG",
                link:{
                    src:"resources/image/startImage.png"
                }
            })
            arrDubag.push({
                id:63772,
                grundrissname:"Eichest. 1EG",
                link:{
                    src:"resources/image/startImage.png"
                }
            })
            
        }


        this.dContXZ=undefined//new DCont(this.dCont)    
        this.init= function(){
            if(this.dContXZ!=undefined)return;



            this.dContXZ = new DCont(this.dCont) 
            this.dContXZ.y=this.indent+this.sizeBase;

            new DLabel(this.dContXZ,0,0,"id:")
            this.input=new DInput(this.dContXZ,40,0," ",function(){

            })
            let l=new DLabel(this.dContXZ,this.input.x+this.input.width+this.indent,0,"Grundrissname:")
            this.input1 = new DInput(this.dContXZ,l.x+140,0," ",function(){

            });
            this.button=new DButton(this.dContXZ,this.input1.x+this.input1.width+this.indent,0,"Grundrissname:")

            let yy=40
            let xs=10
            let xs1=300
            l=new DLabel(this.dContXZ,xs+xs1*0,yy,"ID");
            l=new DLabel(this.dContXZ,xs+xs1*1,yy,"GRUNDRISSNAME");
            l=new DLabel(this.dContXZ,xs+xs1*2,yy,"STETUS");
            l=new DLabel(this.dContXZ,xs+xs1*3,yy,"AKTIONEN");

            var wPlus=1000;
            var widthPic=1000;

            this.gallary = new DGallT(this.dCont,0,this.dContXZ.y+100,this.down)
            this.gallary.kolII=1;
            this.gallary.widthPic=widthPic;
            this.gallary.heightPic=48;
            this.gallary.width=wPlus*2+widthPic;
            this.gallary.height=48;            
            this.gallary.otstup=2; 
            
           // this.gallary.start(this.arrayBD); 
            //this.gallary.panel.visible=false;


        }


        this.init();



        var w,h,s;
        this.sizeWindow = function(_w,_h,_s){             
            if(_w){
                w=_w;
                h=_h;
                s=_s;
            }  
            trace("###",_w)          
        }
  	}

    set index(value) {
        if (this._index != value) {
            this._index = value;                                 
        }             
    }
    get index() { return this._index; }
}






function DGallT(dCont, _x, _y, _fun) {
    DGallery.call(this, dCont, _x, _y, _fun);               
    this.type="DGallT"; 
    this.createZamen=function(){            
        var r=new BoxXZ(this.content, 0, 0, this.downBtn);            
        return r;
    }    
}
DGallT.prototype = Object.create(DGallery.prototype);
DGallT.prototype.constructor = DGallT;

Object.defineProperties(DGallT.prototype, {

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



function BoxXZ(dCont, _x, _y, _fun) {
    DBox.call(this, dCont, _x, _y, _fun);
    this.type = 'BoxXZ';
    var self=this

    this.label.div.style.pointerEvents="none";
    this.label.textAlign="center";
    this.label.color="#000000"
    

    this.startLoad = function (_obj) {        
        this.label.visible=true
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
        }
        this.draw();
    };
    var ss
    this.draw = function () {
        let hh=this._height-30
        ss = (this._width - this._otstup * 2) / this.image.picWidth;
        if (ss > (hh - this._otstup * 2) / this.image.picHeight)ss = (hh - this._otstup * 2) / this.image.picHeight;
        this.image.x = 0;
        this.image.width=this.image.picWidth*ss;
        this.image.height=this.image.picHeight*ss;

        this.image.x = (this._width - this.image.picWidth * ss) / 2;
        this.image.y = (this._height - this.image.picHeight * ss) / 2-10;

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

   /* this.mouseOver = function (e) {
        self.boolOut = false;
        
        if(self._activ==false)self.panel.color1=dcmParam.compToHexArray(dcmParam.hexDec(self._color1), -5);
        else self.panel.color1=dcmParam.compToHexArray(dcmParam.hexDec(self._color), -5);
        if (self.funOver) self.funOver(self);
    };
    this.mouseOut = function (e) {      
        
        if(self._activ==false)self.panel.color1=self._color1;
        else self.panel.color1=self._color;

        if (self.funOut) self.funOut(self);
    };



    if(dcmParam.mobile==false){

        this.panel.div.addEventListener("mouseout", this.mouseOut);
        this.image.image.addEventListener("mouseout", this.mouseOut);

        this.panel.div.addEventListener("mouseover", this.mouseOver);
        this.image.image.addEventListener("mouseover", this.mouseOver);  

    }*/




}
BoxXZ.prototype = Object.create(DBox.prototype);
BoxXZ.prototype.constructor = BoxXZ;

Object.defineProperties(BoxXZ.prototype, {
    activ: { // активный элемент
        set: function (value) {
            if (this._activ == value) return;
            this._activ = value;
           // this._color=this._color1;
          

            if(this._activ){
                this.image.link=this.object.src;
                this.label.color="#93c32f"
            }else{
                this.image.link=this.object.src1;
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
