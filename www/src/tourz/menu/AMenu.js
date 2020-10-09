
import {AMUp} from './AMUp.js';
import {AM0Base} from './AM0Base.js';
import {AM1Gal} from './AM1Gal.js';
import {AM2Assign} from './AM2Assign.js';
import {AM3Final} from './AM3Final.js';

import {AMDebag} from './AMDebag.js';

import {SvasBd} from './SvasBd.js';

import {ACreatPic} from './ACreatPic.js';

import {ARedragPic} from './ARedragPic.js';

export class AMenu  {
  	constructor(par,fun) {  		
  		this.type="AMenu";
  		var self=this;
        this.par=par
        this.fun=fun
        this._index=-1;

        this.bRadius=8;
        this.minBR=4;
        this.colorAct="#c7edfc"
        this.time=500
        this.glowColor="#dddddd"

        dcmParam.color="#dddddd";
        dcmParam.colorText1="#222222";
        dcmParam.fontFamily="Montserrat";


        

       /* this.objBase=undefined
        var objBase={}
        objBase.array=[            
            {id:63773,grundrissname:"Eichest. 1OG",link:{src:"resources/image/startImage.png"},array:[
                {text:"name 1",icon:"resources/image/p0.png",pic:"resources/image/t0.jpg"},
                {text:"name 2",icon:"resources/image/360.png",pic:"resources/image/t0.png"},
                {text:"name 3",icon:"resources/image/36110.png",pic:"resources/image/t0.jpg"},
                {text:"name 4",icon:"resources/image/pic.jpg",pic:"resources/image/t0.png"},
                {text:"name 5",icon:"resources/image/p0.png",pic:"resources/image/t0.jpg"},
                {text:"name 6",icon:"resources/image/360.png",pic:"resources/image/t0.png"}
            ]},
            {id:63772,grundrissname:"Eichest. 1EG",link:{src:"resources/image/startImage.png"},array:[
                {text:"name 1",icon:"resources/image/p0.png",pic:"resources/image/t0.jpg"},
                {text:"name 2",icon:"resources/image/360.png",pic:"resources/image/t0.png"}
            ]}
        ];*/




        this.widthMenu=660;
        this.indent=mainBig.objectBase.settings.indent;
        this.sizeBase=mainBig.objectBase.settings.sizeBase;

        this.array=[];
        this.arrB=[];
        this.dCont=new DCont(par.dCont);

        
        this.ddragPic=new DDragPic(this.dCont);
        this.ddragPic.pointZdvig.x=0
        
        this.dCont1=new DCont(this.dCont);

        this.svasBd=new SvasBd(this)
        
        this.array[this.array.length]=this.aMUp=new AMUp(this, function(s,p){            
            if(s=="index")self.index=p;
            if(s=="saveTime")self.saveTime();
            if(s=="animatActiv")self.animatActiv();    
        });

        this.arrB[0]=this.array[this.array.length]=this.aM0Base=new AM0Base(this, function(s,p){            
            
            if(s=="preview")self.aRedragPic.setLink(p);
            if(s=="index")self.index=p;
            if(s=="completed")self.indexId=p;
            if(s=="saveTime")self.saveTime()
        });

        this.arrB[1]=this.array[this.array.length]=this.aM1Gal=new AM1Gal(this, function(s,p){            

            if(s=="saveTime")self.saveTime()          
        });


        this.arrB[2]=this.array[this.array.length]=this.aM2Assign=new AM2Assign(this, function(s,p){            

            if(s=="saveTime")self.saveTime()
            
        });

        this.arrB[3]=this.array[this.array.length]=this.aM3Final=new AM3Final(this, function(s,p){            

            if(s=="saveTime")self.saveTime()           
        });

        this.array[this.array.length]=this.aCreatPic=new ACreatPic(this, function(s,p){            

            if(s=="saveTime")self.saveTime()           
        });

        this.array[this.array.length]=this.aRedragPic=new ARedragPic(this, function(s,p){            
            if(s=="save"){
                self.aM2Assign.testObj(p)
            }

            //if(s=="saveTime")self.saveTime()           
        });


       /* this.array[this.array.length]=this.aMDebag=new AMDebag(this, function(s,p){            
            
        });
        if(this.aMDebag.getLocMoel()!=false){
            //this.objBase=objBase=this.aMDebag.getLocMoel()
        }*/





        this.save1=function(){  
         
            this.aMDebag.save(this.objBase);
        } 
        this.sah=0;
        this.saveTime=function(){
            this.sah++;
            var s=this.sah;
            setTimeout(function() {
                if(self.sah==s)self.save1()
            }, 500);
        } 

        
        this.setObj=function(o){
            this.objBase=o            
            this.aM1Gal.setObj(o);
            this.aM2Assign.setObj(o); 
        }

        this.aM0Base.init() 
/*
        this.setObj(objBase)
        this.indexId=objBase.array[0].id*/



        this.sizeWindow = function(w,h,s) {             
            for (var i = 0; i < this.array.length; i++) {              
                if(this.array[i])if(this.array[i].sizeWindow){
                    this.array[i].sizeWindow(w,h,s)             
                }
            }                 
        }

        this.xyp={x:0,y:0,s:1}
        this.fXYP=function(c){
            this.xyp.x=this.xyp.y=0;
            this.xyp.s=1
            this.fXYS(c,this.xyp)
            return this.xyp; 
        }
        this.fXYS=function(c,o){
            o.x*=c._scale;
            o.y*=c._scale;
            o.s*=c._scale;
            
            o.x+=c.position._x;
            o.y+=c.position._y;
            if(c.visible==false)o.y+=99999;
        
            if(c.parent!=undefined){                
                self.fXYS(c.parent, o)              
            }
        }


        this.animatActiv=function(){
            for (var i = 0; i < this.array.length; i++) {  
                if(this.array[i])if(this.array[i].animatActiv){
                    this.array[i].animatActiv();
                }
            }
        }

    }

    set index(value) {
        if (this._index != value) {
            this._index = value;             
            this.aMUp.index = value;
            for (var i = 0; i < this.arrB.length; i++) {
                if(this.arrB[i]!=undefined){
                    if(value==i)this.arrB[i].active=true;
                    else this.arrB[i].active=false;
                }
            }
        }            
    }
    get index() { return this._index; } 

    set indexId(value) {
        if (this._indexId != value) {
            this._indexId = value; 
            trace("@@@",value);            
            this.aM0Base.indexId=value;
            /*this.aM1Gal.indexId=value; 
            this.aM2Assign.indexId=value;*/                                         
        }             
    }
    get indexId() { return this._indexId; }    
}


