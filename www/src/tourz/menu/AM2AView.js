



import { AMBaza } from './AMBaza.js';


import { TView } from '../tView/TView.js';

export class AM2AView extends AMBaza {
  	constructor(par,fun) {  
        super(par,fun);     
  		this.type="AM2AView";
  		var self=this;
        this.fun=fun;
        this.wh=32
        this.par=par
        this._width =100;
        this._height =100; 

        this.dCont = new DCont(par.dContXZ)
      //this.dCont.y=this._width

       /* this.panel=new DPanel(this.dCont,0,this.wh)
        this.panel.color="#cccccc";
        this.panel.height=this._height-this.wh;*/

        


        this.tView = new TView(function(s,p){
            //trace(">>>>>>>>>>>>",s,p);
            if(s=="fun_rotationZ")self.fun(s,p);
        });
        this.tView.setDragLine(true)
        this.dCV = new DCont(this.dCont)
        this.dCV.y=20
        this.dCV.div.appendChild(this.tView.div);
        this.tView.active=false;

        this.label=new DLabel(this.dCont,0,0)
        this.label.width=this._width;
        this.label.textAlign='center';

       

        this.image=new DImage(this.dCV,-5,-5,"resources/image/w3.png",function(){
            this.width=this.picWidth;
            this.height=this.picHeight;
            self.tView.sizeWindow(this.width-10, this.height-10);

            self.dCont.x=-(this.width-self.par.widthMenu/2)
            self._height=this.height;
            self._width=this.width;

            self.button.x=self._width-self.button.width-20;
            self.button.y=self._height+20;
            self.label.width=self._width;
        })
        this.image.div.style.pointerEvents="none";


        this.button = new DButton(this.dCont,0,0,"Zurück",function(){
            self.fun("index",self.par.index-1);
        });
        this.button.width=160;        
        this.button.color="#222222";
        this.button.borderRadius=this.minBR;

        this.resaz = function(argument) {            
          /*  this.panel.width=this._width;
            this.panel.height=this._height-this.wh; 
            this.label.width=this._width;

            this.button.x=0;
            this.button.y=this._height+20;
            this.tView.sizeWindow(this._width,this._height-this.wh);*/

        }


        this.setObj = function(obj) {            
            this.label.text=obj.text;            
            this.tView.link=obj.pic;
            this.tView.rotation=obj.rotation*Math.PI/180
            

        }




  	}

    set active(value) {
        if(this._active!=value){
            this._active= value;
            this.dCont.visible= value; 
            this.tView.active=value;            
        }
    }    
    get active() { return  this._active;}



    set width(value) {
        if (this._width != value) {
            this._width = value;             
            this.resaz();                                        
        }             
    }
    get width() { return this._width; }  

    set height(value) {
        if (this._height != value) {
            this._height = value;  
            this.resaz();                                        
        }             
    }
    get height() { return this._height; }    
}



