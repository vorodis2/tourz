



export class AMBaza  {
  	constructor(par,fun) {  		
  		this.type="AMBaza";
        this.typeNa="xz";
  		var self=this;
        this.par=par;
        this.fun=fun;

        this._active= false;       
        this.otstup=2//this.par.otstup;
        this.otstup1=10//this.par.otstup1;
        this.wh=100//this.par.wh;
        //this.width=100//this.par.width;
        this.whSize=100//this.par.whSize;


        this.indent=par.indent;
        this.sizeBase=par.sizeBase;

        this.init=undefined

        this.dCont=new DCont(par.dCont);
        this.dCont.visible=this._active
        this.object=undefined;
        this.postSO=undefined;
        this.postIn=undefined;

        this.init=function(){
            /*if(this.window!=undefined)return
            this.whSize=100//this.par.whSize;
            this.window=new DWindow(this.dCont,0,0,"xz");
            this.window.width=this.width;
            this.window.hasMinimizeButton=false;
            this.window.dragBool=false;
            if(this.postIn!=undefined)this.postIn();*/
        }

        this.setObject=function(obj){
            this.object=obj
            this.active=true;
            this.init()
            if(this.postSO!=undefined)this.postSO();
        }


        this.drag=function(){

        }
        this.clear=function(){
            this.active=false
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

    set active(value) {
        if(this._active!=value){
            this._active= value;
            this.dCont.visible= value; 
            if(this.init!=undefined)    this.init();
        }
    }    
    get active() { return  this._active;}
   

}
