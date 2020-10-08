

import { MOBaza } from './MOBaza.js';


export class PSave extends MOBaza {
  	constructor(par,fun) {  
        super(par,fun);
  		this.type="PSave";

  		var self=this;
        this.fun=fun

        this._index=-1;

        this._indexSah=-1;
        this.otstup=20
        this._active=undefined
        this.dCont=new DCont(par.dCont);
        
        if(mainBig.debug==false)return
        if(mainBig.debugDev==true){
            new DLabel(par.dCont,22,5,"vers: 1.10")
            
        }
  
        
        par.par.locSave.activFun=function(){            
            self.active=true;
        }
        

/*
        this.button=new DButton(this.dCont,0,0,"SAVE",function(){
            self.active = false
            self.par.par.locSave.save1();
        })
        this.button.width=150;
        this.button.height=50;
        this.button.glowSah=5
        this.button.label.bold=true*/


        this.active=false;
        this.sizeWindow = function(w,h,s) { 
            //this.dCont.x=w/s-this.button.width-this.otstup
            //this.dCont.y=h/s-this.button.height-102-this.otstup
        }

  	}

    set active(value) {
        if (this._active != value) {
            this._active = value;
           /* this.button.activMouse = value
            if(this._active==true){
                this.button.alpha =1;  
                this.button.color="#8ac649";  
                this.button.colorText="#ffffff";
            }else{
                this.button.alpha =0.5; 
                this.button.color="#f3f1f2";
                this.button.colorText="#000000"; 
            }*/
        }        
            
    }
    get active() { return this._active; }


    set indexSah(value) {
        if (this._indexSah != value) {
            this._indexSah = value; 
                    
        }            
    }
    get indexSah() { return this._indexSah; }
}



