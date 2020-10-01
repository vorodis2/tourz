


export class AMUp  {
  	constructor(par,fun) {       
  		this.type="PMap";
  		var self=this;
        this.fun=fun;

        this._open=false;
        this._index=-1;

        this.indent=par.indent//mainBig.objectBase.settings.indent;
        this.sizeBase=par.sizeBase//mainBig.objectBase.settings.sizeBase;
        this.widthBlok=this.sizeBase*1.2

        this.dCont=new DCont(par.dCont);
 

        var arr=[
            {src:"resources/image/pic1.png",src1:"resources/image/pic3.png",text:"xz"},
            {src:"resources/image/pic2.png",src1:"resources/image/pic3.png",text:"xz1"},
            {src:"resources/image/pic1.png",src1:"resources/image/pic3.png",text:"xz2"},
            {src:"resources/image/pic2.png",src1:"resources/image/pic3.png",text:"xz3"}
        ]


        this.sob = function(s, p){  
            
            self.fun("index",this.idArr)
           
        }   
        trace("$$$$$$$$$$$$$$",mainBig.objectBase)

        this.array=[]
        for (var i = 0; i < arr.length; i++) {
            this.array[i]=new AMUButton(this,i,arr[i],this.sob);
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

    set index(value) {
        if (this._index != value) {
            this._index = value;        
            for (var i = 0; i < this.array.length; i++) {
               // if(this.array[i]!=undefined){
                    if(i==value)this.array[i].active=true
                    else this.array[i].active=false
                //}
            }                      
        }        
            
    }
    get index() { return this._index; }
}



export class AMUButton  {
    constructor(par,idArr,obj,fun) {  
        this.type="AMUButton";
        this.par=par;
        this.idArr=idArr;
        this.fun=fun;
        this.obj=obj;
        var self=this;

        this._active=false;

        this.sizeBase=par.sizeBase;
        this.widthBlok=par.widthBlok;
        this.indent=par.indent;

        this.button=new DButton(par.dCont,idArr*(this.widthBlok+this.indent),0,obj.text,function(){
            self.fun();
        },obj.src);
        this.button.width=this.widthBlok;
        this.button.height=this.sizeBase;

    }

    set active(value) {
        if (this._active != value) {
            this._active = value;
            if(value){
                this.button.alpha=0.5;
                this.button.loadImeg(this.obj.src1);
            }
            else {
                this.button.alpha=1;
                this.button.loadImeg(this.obj.src);
            }

                              
        }        
            
    }
    get active() { return this._active; }

}