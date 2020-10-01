

import { MOBaza } from './MOBaza.js';


export class PCamPositions extends MOBaza {
  	constructor(par,fun) {  
        super(par,fun);
  		this.type="PCamPositions";
        this.linkIcon = "resources/image/pic4.png";
        this.linkIcon1 = "resources/image/pic4_.png";
        this.text="xzxz11";

  		var self=this;

       
        this._active=false;

        this.dCont=new DCont(par.dCont);
        this.dCont.visible=this._active;

        var w,h,s

        this.sizeWindow = function(_w,_h,_s){ 
            if(_w){
                w=_w;
                h=_h;
                s=_s;
            }
        }
  	}

    set index(value) {
        if (this._index != value) {
            this._index = value;            
        }        
            
    }
    get index() { return this._index; }

    set active(value) {
        if (this._active != value) {
            this._active = value; 
            
            if(this.dCont) {
                if(this._active==true){
                        this.dCont.visible=true;
                    }else{
                        this.dCont.visible=false;
                    }
                }
            }          
            
    }
    get active() { return this._active; }

}







function GalleryXZ(dCont, _x, _y, _fun) {
    DGallery.call(this, dCont, _x, _y, _fun);               
    this.type="GalleryXZ"; 
    this.createZamen=function(){            
        var r=new BoxXZ(this.content, 0, 0, this.downBtn);            
        return r;
    }    
}
GalleryXZ.prototype = Object.create(DGallery.prototype);
GalleryXZ.prototype.constructor = GalleryXZ;

Object.defineProperties(GalleryXZ.prototype, {

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
