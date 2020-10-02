



import { AMBaza } from './AMBaza.js';

export class AM2APlan extends AMBaza {
  	constructor(par,fun) {  
        super(par,fun);     
  		this.type="AM2Assign";
  		var self=this;
        this.fun=fun;

        this._active=false;
        this.widthMenu=par.widthMenu 

        this.array=[];       
        this.arrayCh=[]; 

        this.dCont = new DCont(par.dContXZ)
        this.panel=new DPanel(this.dCont,0,0)
        this.panel.color="#dddddd";


        this.image=new DImage(this.dCont,0,0,null,function(){
            this.width=this.picWidth
            this.height=this.picHeight
            self.panel.width=this.picWidth
            self.panel.height=this.picHeight
        });
      

        this.down=function(){
            self.remuveObj(this.object)
            self.par.dragO(this.object)
        }




        this.getBut=function(){
            for (var i = 0; i < this.arrayCh.length; i++) {
                if(this.arrayCh[i].visible==true)continue

             
                return this.arrayCh[i]   
            }
            this.arrayCh[this.arrayCh.length]=new BX(this,this.down,this.arrayCh.length);
            trace("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",this.arrayCh.length)
            return this.arrayCh[this.arrayCh.length-1];
        }

        this.addObj = function(obj,_p){
            this.remuveObj(obj)
            let bx=this.getBut();
            bx.setObj(obj); 
            bx.dCont.x=_p.x-w/2;
            bx.dCont.y=_p.y-150;


            trace(_p)
        }

        this.remuveObj = function(obj){
            for (var i = 0; i < this.arrayCh.length; i++) {
                if(this.arrayCh[i].visible==true){
                    if(this.arrayCh[i].object.id==obj.id){
                        this.arrayCh[i].visible=false
                        return this.arrayCh[i]
                    }
                }
            }
            return false
        }


        this.setPic = function(link){ 
            this.image.link=link;

        }


        var w,h,s;
        this.sizeWindow = function(_w,_h,_s){             
            if(_w){
                w=_w;
                h=_h;
                s=_s;
            }                       
        }
  	}
}


export class BX {
    constructor(par,fun,idArr) {
        this.type="BX";
        var self=this;
        this.par=par;
        this.fun=fun;
        this.idArr=idArr;
        this.object=undefined
        this._visible=false;

        this.dCont = new DCont(par.dCont)
        this.dCont.visible=this._visible
        var wh=36
        this.b=new DButton(this.dCont,-wh/2,-wh/2,"",function(){
            
        },"resources/image/dragPint.png");
        this.b.fun_mousedown=function(){
            self.fun()
        }
        this.b.width=this.b.height=wh
        this.b.boolFond=false;
        this.b.borderRadius=wh;

        this.setObj = function(obj){
            this.object=obj;
            this.visible=true;
        }

    }
    set visible(value) {
        if (this._visible != value) {
            this._visible = value;  
            this.dCont.visible=this._visible    

            if(this._visible==false) this.object=undefined                        
        }             
    }
    get visible() { return this._visible; }  
}



