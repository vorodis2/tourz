

//import { SpherDeb } from './SpherDeb.js';
export class TVPreLoader  {
  	constructor(par,linkPreload,fun) {  		
  		this.type="TVPreLoader";
  		var self=this;
        this.fun=fun; 
        this.par=par; 
        this.linkPreload=linkPreload;  

        this._active=false;
        this._visible=false;
        this._alpha=0;
        this._color="#222222";

        this.div= document.createElement('div');
        this.div.style.position = 'fixed';
        this.div.style.top = '0px';
        this.div.style.left = '0px';
        this.par.div.appendChild(this.div);
        this.div.style.visibility =  'hidden';


        this.divFon= document.createElement('div');
        this.divFon.style.position = 'fixed';
        this.divFon.style.top = '0px';
        this.divFon.style.left = '0px';        
        this.div.appendChild(this.divFon);

        this.w=100;
        this.h=100;
        this.s=100;



        this.divFon.style.width=(this.w-2)+"px";
        this.divFon.style.height=(this.h-2)+"px";
        this.divFon.style.background=this._color;
        this.divFon.style.opacity = 0.75;
        this.div.style.pointerEvents="none"; 


        trace("---",this.linkPreload) 
        if(this.linkPreload!=undefined){
            
            this.div2= document.createElement('div');
            this.div2.style.position = 'fixed';
            this.div2.style.top = '0px';
            this.div2.style.left = '0px';
            this.div.appendChild(this.div2);

            this.div3= document.createElement('div');
            this.div3.style.position = 'fixed';
            this.div3.style.top = '0px';
            this.div3.style.left = '0px';
            this.div2.appendChild(this.div3);



            this.img = new Image();
            this.img.style.position = 'fixed';
            this.img.style.pointerEvents = 'none';
            this.img.width=64;
            this.img.height=64;
            self.img.style.top = '-32px';
            self.img.style.left = '-32px';
            this.div3.appendChild(this.img);           
            this.img.src = this.linkPreload;



           
            
            

        } 



        var deg=0

        this.upDate=function(){
            let bb=false
            if(this._active==true){
                if(this._alpha<1){
                    this.alpha+=0.05
                }

                if(this.linkPreload!=undefined){
                    if(this.linkPreload!=undefined){
                        bb=true                                  
                    }
                }
            }else{
                if(this._alpha>0){
                    bb=true;   
                    this.alpha-=0.05;
                    if(this.alpha<=0){
                        this.visible=false;
                    }
                }
            }

            if(bb){
                deg+=1
                self.div3.style.webkitTransform = 'rotate('+deg+'deg)'; 
                self.div3.style.mozTransform    = 'rotate('+deg+'deg)'; 
                self.div3.style.msTransform     = 'rotate('+deg+'deg)'; 
                self.div3.style.oTransform      = 'rotate('+deg+'deg)'; 
                self.div3.style.transform       = 'rotate('+deg+'deg)';   
            }
        }

        var _mat
        this.sizeWindow=function(w,h,s){
            if(w){
                this.w=w;
                this.h=h;
                this.s=s;
            }
            this.divFon.style.width=(this.w)+"px";
            this.divFon.style.height=(this.h)+"px";

            if(this.linkPreload!=undefined){
                _mat = 'scaleX(1) scaleY(1) translate('+Math.round(this.w/2)+'px, '+Math.round(this.h/2)+'px)';
                self.div2.style["transform"] = _mat;
                self.div2.style["ms-transform"] = _mat;
                self.div2.style["webkit-transform"] = _mat;               
            }
        }


  	} 

    set active(value) {
        if (this._active != value) {
            this._active = value; 
            trace(">>>>>>>>>>>>>>>",this._active)
            if(this._active==true){
                this.alpha=0;
                this.visible=true
            }                              
        }             
    }
    get active() { return this._active; } 

    set alpha(value) {
        if (this._alpha != value) {
            this._alpha = value; 
            this.div.style.opacity = value;                              
        }             
    }
    get alpha() { return this._alpha; } 

    set visible(value) {
        if (this._visible != value) {
            this._visible = value;
            this.div.style.visibility ='visible'
           // this.div.style.visibility = value ? 'visible ' : 'hidden'; 
                                          
        }             
    }
    get visible() { return this._visible; } 
}

