

import { MOBaza } from './MOBaza.js';
import { Hole } from './Hole.js';

export class PAddFloor extends MOBaza {
  	constructor(par,fun) {  
        super(par,fun);
  		this.type="PAddFloor";
        this.linkIcon = "resources/image/pic.png";
        this.text="ADD FLOORPLAN";


        this.fun=fun;
  		var self=this;
       
        this._active=false;

        this.dCont=new DCont(par.dCont);
        this.dCont.visible=this._active;


        this._color=mainBig.objectBase.settings.color;
        this._glowColor=mainBig.objectBase.settings.glowColor;
        this._glowSah=mainBig.objectBase.settings.glowSah;
        this._indent=mainBig.objectBase.settings.indent;
        this._sizeBase=mainBig.objectBase.settings.sizeBase;
        
        this._width=900;
        this._height=700;

        this.otstup=this._indent;
        basaComp.addComp(this,true);


        this._hP=40;
        this.maxWH=500;

        this.p = new DPanel(this.dCont,0,0);
        this.p.width=3000;
        this.p.height=3000;
        this.p.color=this._color;
       // this.p.alpha=0.5

        this.dCont1=new DCont(this.dCont);


        this.glow = new DGlow(this.dCont1,0,0);
        this.glow.width=this._width;
        this.glow.height=this._height;

        this.glow.glowColor=this._glowColor;
        this.glow.glowSah=this._glowSah;


        this.panel = new DPanel(this.dCont1,0,0);
        this.panel.width=this._width;
        this.panel.height=this._height;
        this.panel.color=this._color;


        this.panel1 = new DPanel(this.dCont1,this.otstup,this.otstup);
        this.panel1.width=this._width;
        this.panel1.height=this._height;
        this.panel1.color=this._color;





        this.image=new DImage(this.panel1, 0, 0, null, function(){            
            self.dragPic()
        })


        this.button=new DButton(this.panel, 0, this._height-this._hP-this.otstup, "Upload",function(s){
            self.image.link=s;
            if(this.files)if(this.files.length>=1){
                self.button1.visible=true;
            }
        })
        this.button.width=170;
        this.button.height=this._hP;
        this.button.x=(this._width-this.button.width)/2
        //this.button.color="#8ac649";  
        //this.button.colorText="#ffffff";
        this.button.startFile("image/*");

        basaComp.addComp(this.button);
        this.button.setActive(true);
        //this.button.colorAct=true



        this.button1=new DButton(this.panel, 0, this._height-this._hP-this.otstup, " ",function(s){
            this.visible=false;
            self.savePic();
        },"resources/image/load.png");
        this.button1.width=170;
        this.button1.height=this.button1.width=this._hP;
        this.button1.x=this._width-this.button1.width-this.otstup
        this.button1.visible=false;
        basaComp.addComp(this.button1);
        this.button1.setActive(true)



        this.hole=new Hole(this.panel1, function(s,p){
            if(s=="dragXY"){
                self.button1.visible=true;
            }
        });
        this.button1.visible=false;

        this.dragPic=function(){

            let ww=this._width-this.otstup*2
            let hh=this._height-this.otstup*3-this._hP;

            let s=   ww / this.image.picWidth;
            let s1=  hh / this.image.picHeight;

            if(s>s1)s=s1; 
            if(s>1) s = 1; 



            let ww1=Math.round(this.image.picWidth*s);
            let hh1=Math.round(this.image.picHeight*s);


            this.panel1.width=ww1;
            this.panel1.height=hh1;

            this.image.width=ww1;
            this.image.height=hh1;            
            

            this.hole.setRect(0,0,ww1,hh1,false);
            this.hole.width=ww1;            
            this.hole.height=hh1;            
            this.hole.setRect(0,0,ww1,hh1);
            this.panel1.x=(this._width-ww1)/2;
            this.panel1.y=(hh-hh1)/2+this.otstup;            
        }
        this.dragPic()



        this.canvas = document.createElement('canvas'); // канвас для картинки
        this.ctx = this.canvas.getContext('2d');
        this.savePic=function(){
            this.canvas.width=Math.round(this.hole.rect.width);
            this.canvas.height=Math.round(this.hole.rect.height);
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);            
            this.ctx.drawImage(this.image.image, -this.hole.rect.x, -this.hole.rect.y,this.image.width, this.image.height);
            this.image.link=this.canvas.toDataURL("image/png");            

           
            let n=new Date().getTime()+".png";           
            let ll=""+n;
            mainBig.objectBase.scene.bottom.src="resources/d/"+n;                    
            self.par.par.locSave.save1();
            
            
            php.savePhoto("./../resources/d/"+n, this.image.link, function (e) {  
                self.fun("uploadMapBottom");                
            });
        }





        function uploadFile(dest, file,  fun) {
            let serverURL =  "src/phpBase.php";
            let data = new FormData();
            data.append('tip', 'saveFile');
            data.append('file', file);
            data.append('dest', dest);              
            $.ajax({
                url: serverURL,
                dataType: 'text',
                cache: false,
                contentType: false,
                processData: false,
                data: data,
                type: 'post',
                success: (function(data) {                    
                    fun(data);                   
                })
            });
        }


        this.image.link=mainBig.objectBase.scene.bottom.src;



        var w,h,s

        this.sizeWindow = function(_w,_h,_s){ 
            if(_w){
                w=_w;
                h=_h;
                s=_s;
            }

            this.p.width=_w/s;
            this.p.height=_h/s;

            let dd=this._sizeBase+this._indent*2
            let ss1=(_h/s-dd)/this._height
            let ss=ss1
            if(ss>1){
                ss=1;
            }            

            this.dCont1.x=(_w/s-this._width*ss)/2/ss;
            this.dCont1.y=(this._sizeBase+this._indent)/ss;
            if(ss1>1){
                this.dCont1.y-=(this._height-(_h/s-dd))/2
            }

            this.dCont1.scale=ss;
        }
  	}


    set indent(value) {
        if (this._indent != value) {
            this._indent = value; 
            
            
        }           
    }
    get indent() { return this._indent; }

    set sizeBase(value) {
        if (this._sizeBase != value) {
            this._sizeBase = value; 
                      
        }           
    }
    get sizeBase() { return this._sizeBase; }




    set glowColor(value) {
        if (this._glowColor != value) {
            this._glowColor = value; 
            this.glow.glowColor=this._glowColor
            
        }           
    }
    get glowColor() { return this._glowColor; }

    set glowSah(value) {
        if (this._glowSah != value) {
            this._glowSah = value; 
            this.glow.glowSah=this._glowSah
           
        }           
    }
    get glowSah() { return this._glowSah; }

    set color(value) {
        if (this._color != value) {
            this._color = value; 
            this.panel.color=this._color;
            this.panel1.color=this._color;
            this.p.color=this._color;
        }           
    }
    get color() { return this._color; }

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
