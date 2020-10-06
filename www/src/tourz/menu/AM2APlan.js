



import { AMBaza } from './AMBaza.js';

export class AM2APlan extends AMBaza {
  	constructor(par,fun) {  
        super(par,fun);     
  		this.type="AM2Assign";
  		var self=this;
        this.fun=fun;
        this._index=-1;
        this.otstup=7
        this._active=false;
        this.widthMenu=par.widthMenu 

        this.array=[];       
        this.arrayCh=[]; 

        this.dCont = new DCont(par.dContXZ)

        setTimeout(function() {
            self.dCont.x=self.widthMenu/2+self.otstup*2//+Math.random()*111
        }, 10);




        this.panel=new DPanel(this.dCont,-this.otstup,-this.otstup)
        this.panel.boolLine=false
        this.panel.borderRadius =this.bRadius;
        this.panel.glowSah=3;


        this.dCont1 = new DCont(par.dContXZ)
       
        new DPanel(this.dCont1,0,0)




        this.button = new DButton(this.dCont,0,0,"Weiter",function(){
            self.fun("index",self.index+1)
        })


        this.image=new DImage(this.dCont,0,0,null,function(){
            this.width=this.picWidth
            this.height=this.picHeight
            self.panel.width=this.picWidth+self.otstup*2
            self.panel.height=this.picHeight+self.otstup*2
            self.dragIndex()
        });
        this.image.div.style.pointerEvents="none";
        //this.dCont.div.style.pointerEvents="none";   

        this.dCBut = new DCont(this.dCont);

        this.dCBNa = new DCont(this.dCont);
        this.dCBNa1 = new DCont(this.dCBNa);

        this.image1=new DImage(this.dCBNa1,0,0,"resources/image/picHero.png",function(){
            this.width=this.picWidth;
            this.height=this.picHeight;
            this.x=-this.width/2;
            this.y=-this.height/2;            
        });
        this.dCBNa.visible=false;

      
        this.setRotation=function(n){            
            if(this.array[this._index]&&this.array[this._index].visible==true){
                let rot=n*180/Math.PI %360;
                let deg=rot+this.array[this._index].object.rPlus;
                let dd=this.dCBNa1.div;
                dd.style.webkitTransform = 'rotate('+deg+'deg)'; 
                dd.style.mozTransform    = 'rotate('+deg+'deg)'; 
                dd.style.msTransform     = 'rotate('+deg+'deg)'; 
                dd.style.oTransform      = 'rotate('+deg+'deg)'; 
                dd.style.transform       = 'rotate('+deg+'deg)';                
                this.array[this._index].object.rotation=Math.round(rot*100)/100;
                self.fun("saveTime");
            }

        }


        //////////////////////////////////////////////

        this.getAngle = function (a, b) {
            b = b || rezNull;
            a = a || rezNull;
            return Math.atan2(b.y - a.y, b.x - a.x);
        };

        var xy={x:0,y:0,s:1}
        function mousemove(e){ 
            trace(">>mousemove>>",e)
            let xx
            let yy
            
            xy.x=e.clientX
            xy.y=e.clientY
            if(sp==undefined){
                sp={
                    x:e.clientX,
                    y:e.clientY,
                    a:0
                };
                sp.a=self.getAngle(pp,sp)
            }

            dCDObject.rPlus=as-(sp.a-self.getAngle(pp,xy))*180/Math.PI;
            self.setRotation(dCDObject.rotation*Math.PI/180);
            
            //trace(pp)

                
          
        }

        function mouseup(e){             
            if(dcmParam.mobile==false){                
                document.removeEventListener("mouseup", mouseup);
                dcmParam.removeFunMove(mousemove)
            }else{                    
                document.removeEventListener("touchend", mouseup);

            }
        }

        var dCD,sp,dCDObject,as
        var pp={x:0,y:0,s:1}
        function mousedown(e){ 
            trace("#####",e)
            if(self.array[self._index]&&self.array[self._index].visible==true){
                dCD= self.array[self._index].dCont;
                dCDObject=self.array[self._index].object;
                as=self.array[self._index].object.rPlus
                let ooo=self.par.par.fXYP(dCD)
                pp.x=ooo.x;
                pp.y=ooo.y;
                pp.s=ooo.s;
               
                if(dcmParam.mobile==false){                
                    document.addEventListener("mouseup", mouseup);
                    dcmParam.addFunMove(mousemove)
                }else{                    
                    document.addEventListener("touchend", mouseup);

                }
            }     
            /*if(dcmParam.mobile==false){
                if(sp==undefined){
                    sp={
                        x:e.clientX,                        
                        value:self.panel.x,
                        b:false
                    };
                }               
                ss=(e.clientX-sp.x)/self.scaleDrag.s        
            }else{
                if(sp==undefined){
                    sp={
                        x:e.targetTouches[0].clientX,                       
                        value:self.panel.x,
                    };
                }               
                ss=(e.targetTouches[0].clientX-sp.x)/self.scaleDrag.s                           
            }*/

        }

        this.panel.dCont.div.addEventListener("mousedown", mousedown)
        //--------------------------------------








        this.down=function(){
            if(self._index!=-1){
                self.fun("index",this.idArr)
                return
            }
            self.remuveObj(this.object);          
            self.par.dragO(this.object);
            self.fun("saveTime")
        }

        this.clear=function(a){
            for (var i = 0; i < this.arrayCh.length; i++) {
                this.arrayCh[i].visible=false                  
            }
            this.array.length=0;

        }

        this.start=function(a){
            this.clear()
            for (var i = 0; i < a.length; i++) {                
                if(a[i].active==false)continue;
                let bx=this.getBut();
                bx.setObj(a[i]);
                this.array.push(bx);                
                bx.setXY(a[i].position.x,a[i].position.y);
            }

            this.korIdArr()
        }


        this.getBut=function(){
            for (var i = 0; i < this.arrayCh.length; i++) {
                if(this.arrayCh[i].visible==true)continue             
                return this.arrayCh[i]   
            }
            this.arrayCh[this.arrayCh.length]=new BX(this,this.down,this.arrayCh.length);           
            return this.arrayCh[this.arrayCh.length-1];
        }

        this.addObj = function(obj,_p){
            if(this.remuveObj(obj)!=false){
                self.fun("saveTime")
            }

            if(_p.x>0&&_p.y>0&&_p.x<self.panel.width*_p.s&&_p.y<self.panel.height*_p.s){
                let bx=this.getBut();
                bx.setObj(obj);
                this.array.push(bx);
                this.korIdArr()
                bx.setXY(_p.x,_p.y)
                obj.active= true;
                self.fun("saveTime")
            }
        }
        this.remuveObj = function(obj){            
            for (var i = 0; i < this.array.length; i++) {
                if(this.array[i].visible==true){
                    if(this.array[i].object.id==obj.id){
                        this.array[i].visible = false;
                        this.array[i].object.active = false;
                        let r=this.array.splice(i,1);
                        this.korIdArr()
                        return r[0];
                    }
                }
            }
            return false
        }

        this.korIdArr = function(){
            for (var i = 0; i < this.array.length; i++) {
                this.array[i].idArr=i
            }

            if(this._index==-1) {
                for (var i = 0; i < this.array.length; i++) {
                    this.array[i].vb=0
                }
            }else{
                for (var i = 0; i < this.array.length; i++) {
                    if(i<=this._index)this.array[i].vb=1
                    else this.array[i].vb=2
                }
            }

        }

        


        this.setPic = function(link){ 
            this.image.link=link;
        }


        this.dragIndex= function(){
            let b=false;
            if(this.array[this._index]&&this.array[this._index].visible==true)b=true;

            /*this.button.x= b==true ? self.panel.x : self.panel.width-this.button.width;  */ 
            if(b==false){
                this.button.x=self.panel.width-this.button.width;                
            }else{
                this.button.x=self.panel.x;  
                this.dCBNa.x=this.array[this._index].dCont.x;
                this.dCBNa.y=this.array[this._index].dCont.y;              
            }
            this.dCBNa.visible=b;
            this.button.y=self.panel.height+20;
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


    //index
    set index(value) {
        if (this._index != value) {
            this._index = value;           
            this.dragIndex();
            this.korIdArr(); 

        }             
    }
    get index() { return this._index; }  
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
        this._vb=0

        this.dCont = new DCont(par.dCBut)
        this.dCont.visible=this._visible
        var wh=36;

        this.array=[];
        for (var i = 0; i < 3; i++) {
            this.array[i]=new DImage(this.dCont,-wh/2,-wh/2,"resources/image/d"+i+".png")
            this.array[i].width=this.array[i].height=wh;
            this.array[i].visible=i==this._vb?true:false;
        }

        



        this.b=new DButton(this.dCont,-wh/2,-wh/2,"",function(){
            
        });
        this.b.fun_mousedown=function(){
            self.fun()
        }
        this.b.width=this.b.height=wh
        this.b.boolFond=false;
        this.b.borderRadius=wh;

        this.setXY = function(x,y){
            this.dCont.x=x;
            this.dCont.y=y;
            this.object.position.x=Math.round(x*100)/100;
            this.object.position.y=Math.round(y*100)/100;
        }


        this.setObj = function(obj){
            this.object=obj;
            this.visible=true;
        }

    }
    set visible(value) {
        if (this._visible != value) {
            this._visible = value;  
            this.dCont.visible=this._visible                      
        }             
    }
    get visible() { return this._visible; } 

    set vb(value) {
        if (this._vb != value) {
            this._vb = value;  
            for (var i = 0; i < this.array.length; i++) { 
                this.array[i].visible=i==this._vb?true:false;
            }                   
        }             
    }
    get vb() { return this._vb; } 



}



