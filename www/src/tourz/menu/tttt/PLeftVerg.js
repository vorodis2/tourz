

import { MOBaza } from './MOBaza.js';


export class PLeftVerg extends MOBaza {
  	constructor(par,fun) {  
        super(par,fun);
  		this.type="PLeftVerg";

        this._indent=mainBig.objectBase.settings.indent;
        this._sizeBase=mainBig.objectBase.settings.sizeBase;
        this.prosent=1.5;
  		var self=this;
        basaComp.addComp(this,true);

        this.dCont=new DCont(par.dCont);

        this.batton=new DButton(this.dCont,0,0,"",function(){
            fun("downPLeftVerg");

        },"resources/image/logo_ludwig_since-2x.png")
        this.batton.width=this._sizeBase*this.prosent;
        this.batton.height=this._sizeBase;
        this.batton.color="#ffffff";

        this.batton.funLoadImag=function(){
            self.prosent=this.image.picWidth/this.image.picHeight
            self.sizeWindow()
        }
        

        var w,h,s
        this.sizeWindow = function(_w,_h,_s){ 
            if(_w){
                w=_w;
                h=_h;
                s=_s;
            }
            
            this.dCont.x=this._indent;
            this.batton.width=this._sizeBase*this.prosent;
            this.batton.height=this._sizeBase; 
            trace("@@@@@@@@@@@@@@@@",this.dCont.x)     
        }

  	}

    set indent(value) {
        if (this._indent != value) {
            this._indent = value;
        }
    }
    get indent() { return this._indent;}


    set sizeBase(value) {
        if (this._sizeBase != value) {
            this._sizeBase = value;                      
        }
    }
    get sizeBase() { return this._sizeBase;}
}
