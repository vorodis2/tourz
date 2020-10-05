



import { AMBaza } from './AMBaza.js';


import { TView } from '../tView/TView.js';

export class AM2AView extends AMBaza {
  	constructor(par,fun) {  
        super(par,fun);     
  		this.type="AM2AView";
  		var self=this;
        this.fun=fun;
        this.wh=32

        this._width =100;
        this._height =100; 

        this.dCont = new DCont(par.dContXZ)
        //this.dCont.x=-this._width

        this.panel=new DPanel(this.dCont,0,this.wh)
        this.panel.color="#cccccc";
        this.panel.height=this._height-this.wh;

        this.label=new DLabel(this.dCont,0,0)
        this.label.width=this._width;
        this.label.textAlign='center';


        this.tView = new TView(function(s,p){
            //trace(">>>>>>>>>>>>",s,p);
            if(s=="fun_rotationZ")self.fun(s,p);
        });
        this.dCV = new DCont(this.dCont)
        this.dCV.y=this.wh;
        this.dCV.div.appendChild(this.tView.div);
        this.tView.active=false;


        this.button = new DButton(this.dCont,0,0,"Zurück",function(){
            self.fun("index",self.par.index-1);
        })

        this.resaz = function(argument) {            
            this.panel.width=this._width;
            this.panel.height=this._height-this.wh; 
            this.label.width=this._width;

            this.button.x=0;
            this.button.y=this._height+20;
            this.tView.sizeWindow(this._width,this._height-this.wh);

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



