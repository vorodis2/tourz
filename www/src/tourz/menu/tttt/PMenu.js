/*import { MLeft } from './MLeft.js';
import { MVerh } from './MVerh.js';
import { MObject } from './MObject.js';
import { DragPic } from './DragPic.js';
import { MProdject } from './MProdject.js';
import MStepInfo from './MStepInfo'
import MTipVisi from './MTipVisi'


import { MInfo } from './MInfo.js';*/


import {PLeftVerg } from './PLeftVerg.js';
import {PCentorVerg } from './PCentorVerg.js';

import {PNiz} from './PNiz.js';
import {PMap} from './PMap.js';
import {PPoint} from './PPoint.js';
import {PAddFloor} from './PAddFloor.js';
import {PCamPositions} from './PCamPositions.js';

import {PSave} from './PSave.js';
import {PSetings} from './PSetings.js';

export class PMenu  {
  	constructor(par,fun) {  		
  		this.type="PMenu";
  		var self=this;
        this.par=par
        this.fun=fun
        this._index=-1;
        this._id=-1;
        this.debug=par.debug
        this.otstup=4;
        this.otstup1=10;
        this.wh=100;

        this._indexSah=-1;

        this.array=[]

        this.dCont=new DCont(par.dCont);

        this.dCont1=new DCont(this.dCont);


        this.array[this.array.length]=this.pMap=new PMap(this, function(s,p){
            self.fun(s,p);
        });   

        this.array[this.array.length]=this.pNiz=new PNiz(this, function(s,p){
            self.fun(s,p);
        });

      

        this.array[this.array.length]=this.pPoint=new PPoint(this, function(s,p){
            self.fun(s,p);
        });

        this.array[this.array.length]=this.pAddFloor=new PAddFloor(this, function(s,p){
            self.fun(s,p);
        });

        this.array[this.array.length]=this.pCamPositions=new PCamPositions(this, function(s,p){
            self.fun(s,p);
        });

        this.array[this.array.length]=this.pLeftVerg=new PLeftVerg(this, function(s,p){
            self.fun(s,p);
        });    

        this.array[this.array.length]=this.pSave=new PSave(this, function(s,p){
            self.fun(s,p);
        });


        this.array[this.array.length]=this.pSetings=new PSetings(this, function(s,p){
            self.fun(s,p);
        });

        this.array[this.array.length]=this.pCentorVerg=new PCentorVerg(this, function(s,p){
            self.fun(s,p);
        });

        this.array[this.array.length]=this.pLoader=new PLoader(this, function(s,p){
            self.fun(s,p);
        });

        if(mainBig.debug==true){
            this.pCentorVerg.addMenu(this.pAddFloor);
            this.pCentorVerg.addMenu(this.pMap);
            //this.pCentorVerg.addMenu(this.pCamPositions)
            this.pCentorVerg.addMenu(this.pPoint);
            this.pCentorVerg.addMenu(this.pNiz);
            
        }



        this.setIndexBasa= function(p) {          
            this.pPoint.setIndexBasa(p) 
        }

        this.fun_rotationZ= function() {          
            this.pPoint.fun_rotationZ() 
        }

        this.update = function () { 
            this.pLoader.update()
        }

    
  		this.sizeWindow = function(w,h,s) { 
            
            for (var i = 0; i < this.array.length; i++) {
               // trace(i+" ::  "+this.array[i].type)
                if(this.array[i])if(this.array[i].sizeWindow){
                    this.array[i].sizeWindow(w,h,s)
                    //trace(i+"   "+this.array[i].type)
                }
            }          
  		}

        this.setObj= function(o){
            //this.mLeft.setObj(o);                                
        }

  	}

    set index(value) {
        if (this._index != value) {
            this._index = value; 
            this.pPoint.index = value;
            this.pMap.index = value; 



        }        
            
    }
    get index() { return this._index; }

    


    set indexSah(value) {
        if (this._indexSah != value) {
            this._indexSah = value; 
            this.pCentorVerg.indexSah=value;
           // this.pNiz.indexSah=value;
           // this.pMap.indexSah=value;
            //this.pPoint.indexSah=value;
        }        
            
    }
    get indexSah() { return this._indexSah; }
}



import { MOBaza } from './MOBaza.js';

export class PLoader extends MOBaza {
    constructor(par,fun) {  
        super(par,fun);
        this.type="PLoader";
        this._active=false
        var self=this;

        this.dCont=new DCont();
        //this.dCont.visible=this._active;

        this.panel=new DPanel(this.dCont);
        
        //this.panel.div.


        this.panel.alpha=0.7;
        this.dCL11=new DCont(this.dCont);
        this.dCL=new DCont(this.dCL11);
       
        this.time=500;
        this.image=new DImage(this.dCL, -50,-50,"resources/image/pre.png");

        if(mainBig.debugDev==true){
           /* this.window=new DWindow(par.par.dCont,200,20,"xz")
            this.bb=new DButton(this.window.content, 0,0,"start",function(){
                self.start(self.time);
            })
            this.bb1=new DButton(this.window.content, 0,32,"stop",function(){
                self.stop(self.time);
            })

            this.slid=new DSliderBig(this.window.content, 0,64,function(){
               self.time=this.value;
            },"time",0,2000);

            this.slid.value=self.time*/
        }

        var p={n:0}
        this.drar = function () {  
            self.dCont.alpha=p.n+0.5
        }

        this.tween = new TWEEN.Tween(p);
        this.tween.onUpdate(function(){
            self.drar()
        })
        this.tween.onComplete(function(){            
            if(bStart==false){
                self.active=false;
            }
        })

        var bStart=false
        this.start = function (time) { 
            console.warn(">>start::",time);  
            this.tween.stop()
            if(bStart == false){
                bStart = true;
                this.active=true;
                if(time==0){
                    p.n=1
                    this.drar()
                } else{
                    p.n=0
                    this.tween.to({n:1},time).start();
                    this.drar()
                }
            }
        }

        visi3D.utility.sky.onLoad=function(){            
            self.start(self.time)
        }
        visi3D.utility.sky.onComplete=function(){           
            self.stop(self.time)
        }


        this.stop = function (time) { 
            trace(">>stop::",time);  
            this.tween.stop()
            bStart=false;
            if(time==0){
                this.active=false;
            } else{
                this.tween.to({n:0},time).start();
                this.drar()
            }

        }
        //this.start(0)

        var deg =0
        this.update = function () { 
            if (this._active == false) return           
            deg+=2;
            this.dCL.div.style.webkitTransform = 'rotate('+deg+'deg)'; 
            this.dCL.div.style.mozTransform    = 'rotate('+deg+'deg)'; 
            this.dCL.div.style.msTransform     = 'rotate('+deg+'deg)'; 
            this.dCL.div.style.oTransform      = 'rotate('+deg+'deg)'; 
            this.dCL.div.style.transform       = 'rotate('+deg+'deg)'; 

            visi3D.intRend=1          
        }


        var w,h,s

        this.sizeWindow = function(_w,_h,_s){ 
            if(_w){
                w=_w;
                h=_h;
                s=_s;
            }

           // if(this._active==true){
               this.panel.width=w/s;
                this.panel.height=h/s;
                this.dCL11.x=w/s/2;
                this.dCL11.y=h/s/2;   
           /* }else{
                this.dCL11.x=-22222;
            }*/
            

        }




    }

    set active(value) {
        if (this._active != value) {
            this._active = value;  
            visi3D.alwaysRender= value; 
            this.dCont.visible=value;            
            if(value){
                this.par.dCont.add(this.dCont)
                this.panel.x=0;
            } else{
                this.par.dCont.remove(this.dCont)
            }   /**/ 
            
        }
    }
    get active() { return this._active; } 


}