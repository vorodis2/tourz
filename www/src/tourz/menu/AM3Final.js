



import { AMBaza } from './AMBaza.js';

export class AM3Final extends AMBaza {
  	constructor(par,fun) {  
        super(par,fun);     
  		this.type="AM3Final";
  		var self=this;
        this.fun=fun;

        this._active=false;
        this._indexId=-1;
        this.button=undefined;

        this.widthMenu=par.widthMenu
        this.objBase=undefined
        this._oB=undefined;

 
        var wPlus=2200;
        

        this.dContXZ = new DCont(this.dCont) 
        this.dContXZ.y=this.indent+this.sizeBase+245;

        this.input=new DInput(this.dContXZ, 0,0,"thtps://ivdtour.325.A27...",function(){
            
        });
        this.input.width=this.widthMenu;
        this.input.borderRadius=this.bRadius;

        this.button=new DButton(this.dContXZ, 0,42,"copy Link",function(){      
            dcmParam.ctrlCV.saveText(self.input.text)
        });
        this.button.width=160;
        this.button.x=(this.input.width-this.button.width)/2;
  
        this.button.borderRadius=this.bRadius;;
        this.button.color= "#222222";   


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
}


