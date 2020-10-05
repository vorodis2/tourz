





export class AMDebag  {
  	constructor(par,fun) {  
          
  		this.type="AMDebag";
  		var self=this;
        this.fun=fun;
        this.par=par

        this.width=220

        this.dCont = new DCont(this.par.dCont) 
        this.dCont.y=200;


        this.init=function(){
            if(this.window!=undefined)return
            this.window=new DWindow(this.dCont,0,0,"AMDebag");
            this.window.width=this.width;
            this.window.hasMinimizeButton=false;
            this.window.dragBool=false;

            this.textArea=new DTextArea(this.window.content,2,2," ")
            this.textArea.fontSize=10;
            this.textArea.width= this.width-4;
            this.textArea.height=400;
            this.textArea.textAlign="left"
            this.window.height=this.textArea.x+this.textArea.height+34

        }

        this.getLocMoel=function(o){    
            if(this.window==undefined)return false
            if(this.par.par.par.localStorage.object==undefined)return false
            if(this.par.par.par.localStorage.object.model==undefined)return  false

            return this.par.par.par.localStorage.object.model;    
        }

        this.save=function(o){            
            this.textArea.text=JSON.stringify(o,null,null,2)           
            this.par.par.par.localStorage.object.model=o;
            this.par.par.par.localStorage.save();
        }
      
        if(this.par.par.par.localStorage.object.debug)this.init()
        


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





