

import { MOBaza } from './MOBaza.js';
export class PCentorVerg extends MOBaza {
  	constructor(par,fun) {  
        super(par,fun);
  		this.type="PLeftVerg";
  		var self=this;

        this.width=100
        this.height=100
        this._indexSah=-1

        this.dCont=new DCont(par.dCont);
        this.otstup=12;

        this._indent=mainBig.objectBase.settings.indent;
        this._sizeBase=mainBig.objectBase.settings.sizeBase;
        basaComp.addComp(this,true);
        
        this.arrayMenu=[];
        this.array=[]; 

        this.activBut=function(){
            self.fun("indexSah",self.arrayMenu[this.idArr].type);
        }

        this.addMenu=function(menu){
            this.arrayMenu.push(menu);
            let b=new DButton(this.dCont,0,0,menu.text+"",this.activBut);            
            b.idArr=this.array.length;
            this.array.push(b)
            b.width=this._sizeBase*1.5;
            b.height=this._sizeBase;
            basaComp.addComp(b)
            b.loadImeg(menu.linkIcon)
            this.sizeWindow(); 
        }


        var d=100
        var w,h,s
        this.sizeWindow = function(_w,_h,_s){ 
            if(_w){
                w=_w;
                h=_h;
                s=_s;
            }
           
            for (var i = 0; i < this.array.length; i++) {
                this.array[i].x=i*(this._sizeBase*1.5+this._indent);
                this.array[i].y=0;
            }
            d=((this.array.length)*1.5*this._sizeBase)+(this.array.length-1)*this._indent 
            this.dCont.x=(w/s-d)/2;
            this.dCont.y=0;          
        }
        this.sizeWindow()
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
            for (var i = 0; i < this.array.length; i++) {
                this.array[i].width=this._sizeBase*1.5;
                this.array[i].height=this._sizeBase;
            }           
        }
    }
    get sizeBase() { return this._sizeBase;}


    set indexSah(value) {
        if (this._indexSah != value) {
            this._indexSah = value;
                       
            if(this.array){
                for (var i = 0; i < this.arrayMenu.length; i++) {
                    if(this.arrayMenu[i].type==this._indexSah){  
                        this.array[i].setActive(true);
                        this.arrayMenu[i].active = true;
                    }else{
                        this.array[i].setActive(false);
                        this.arrayMenu[i].active = false;
                    }                    
                }
            }
        }
    }
    get indexSah() { return this._indexSah; }
}
