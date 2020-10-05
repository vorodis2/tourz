

/*

import { MVisi3D } from './visi3D/MVisi3D.js';
import { SceneSB } from './visi3D/SceneSB.js';

*/


export class TView  {
  	constructor() {  		
  		this.type="TView";
  		var self=this;
        trace("ver>>>1.02");
  		
 /*       this._indexSah=-1
        this._index=-1 
        this.debug=main.debug;
        

        this.mobile= dcmParam.mobile
        this.scale=1;
		this.dCont=undefined;
        this.main=main
        this.par=main
        this.otstup=5;
        this._free=true;


        global.glafBig=this;

        this.content3d = new THREE.Object3D();

        this.dCont=new DCont(document.body);        
        this.dCV=new DCont();

        this.dCVisi= new DCont(main.contentHTML)
        this.dCVisi.visible=false;
        this.dCPixi= new DCont(main.contentHTML)
        this.dCPixi.visible=false;


        

        this.locSave=new LocSave(this)
        this.saveLoacal=new SaveLoacal(this)
     

        this.ser = window.location.href;
        var arrParams = this.ser.split("?");   
        var aa=arrParams[0].split("index");

        this.resurs="resources/";         
        global.calc=new Calc();    

        this.scPixi=new DebbugPixi();
        //this.scPixi.deb.drawPoint(255,255,22);
        main.contentHTML.appendChild(this.scPixi.div);
        this.content2d = new PIXI.Container();
        this.scPixi.content2d.addChild(this.content2d);

        this.content2dMap = new PIXI.Container();
        this.scPixi.content2d.addChild(this.content2dMap);

*/

/*
        //порезаный от пикси вювер
        this.visi3D = new MVisi3D(main.contentHTML, this.content2d, dcmParam.mobile, true, false, true, true);     
        //this.visi3D.yes3d = true;           
        this.visi3D.groupObject.add(this.content3d);
        global.visi3D=this.visi3D;


*/
/*
        //ловим и откидываем на сцену изменение камеры
        this.visi3D.fun_rotationZ = function () {             
            if(self.scane){
                self.scane.fun_rotationZ();
                self.menu.fun_rotationZ();
            }
        }

        this.rec=function(c){            
            if(c.parent)this.rec(c.parent)
        }

        this.visi3D.arrayDoRender.push(function(){
            self.scane.bazaPoint.drag2d()
            self.scPixi.render(); 
         
        })


*/

/*
        //хрень принемашка ресурсов и настроек камеры для 
        var o='{"ambient":{"works":true,"active":true,"color":"#fdffff","intensity":0.71},"shadow":{"works":true,"active":true,"mapSize":4096,"color":"#8c8c8c","bias":-0.0014,"intensity":1.01,"radius":1.27,"bAlphaForCoating":false,"fixation":true,"rotationX":0.93,"rotationZ":0.73,"distance":500,"cubWidth":1000,"cubHeight":1000,"distanceUpdateShadow":65.41},"sky":{"works":true,"active":true,"color":"#ffffff","link":"null","rotZ":2.73,"radius":7008,"x":0,"y":0,"z":0},"mirror":{"works":true,"link":"resources/scane/sky/fon1.jpg","exposure":1.44,"gamma":2.87,"xz":"reflect","link1":"resources/scane/sky/fon1.jpg","exposure1":-1,"gamma1":-1},"visi3D":{"works":true,"alwaysRender":false,"fov":16,"far":47175,"minZum":0,"maxZum":10942,"zume":2500,"minRotationX":3.14,"maxRotationX":0,"rotationX":0.94,"rotationZ":0.17,"debug":false,"isDragPan":false,"alphaAd":false,"globZ":0,"powerZum":1},"fog":{"works":true,"active":false,"color":"#ffffff","near":0,"far":0},"effect":{"works":true,"active":false,"edgeStrength":3,"edgeGlow":0,"pulsePeriod":0,"linkTextur":"null","visibleEdgeColor":"#ffffff","hiddenEdgeColor":"#190a05"}}'

        var scene=JSON.parse(o)
        this.sceneSB=new SceneSB(this.visi3D);
        for (var i = 0; i <  this.sceneSB.array.length; i++) {
            if (scene[this.sceneSB.array[i].name] === undefined) {
                scene[this.sceneSB.array[i].name] = {};                
            }            
            this.sceneSB.array[i].setBasa(scene[this.sceneSB.array[i].name]);
        }

        this.visi3D.zume=this.par.objectBase.settings.zume

*/










/*
        this.menu = new PMenu(this,function(s,p){               
            if(s=="indexSah"){
                self.indexSah = p;
                self.saveLoacal.save()

            } 
            if(s=="dragPoint"){
                self.scane.dragPoint(p)
            }  
            if(s=="indexTag"){
                if(p<2){
                    self.index=p;
                    self.saveLoacal.save();    
                }
                
            } 
            if(s=="creatVector"){
                self.scane.map.creatVector();
            }

            if(s=="mapVisible"){
                self.scane.map.visible=p
            }

            if(s=="uploadMapBottom"){
                self.scane.map.uploadMapBottom();
            }

            if(s=="setIndex"){                
                self.index=p;
                self.saveLoacal.save() 
            }

            self.visi3D.intRend=1

                  
        });

        this.scane=new Scane(this,function(s,p){             
            if(s=="setIndex"){                
                self.index=p;
                self.saveLoacal.save();
            }
            if(s=="indexBasa"){  
                self.menu.setIndexBasa(p);
            }                     
        })

        if(this.menu.pMap.setObjEvent)this.menu.pMap.setObjEvent(self.scane.map.graphicsPanel)



  		//ап дете сцена деленая на 2 в мейне
		this.update = function () {			
            //this.stairs.update();
            this.scane.update();
            this.visi3D.upDate();
            this.menu.update();
		}

        //расчет окна
  		this.sizeWindow = function(w,h,s){    			
  			this.scale=s;
            this.dCont.scale=s;
            this.menu.sizeWindow(w,h,s); 
            this.scane.sizeWindow(w,h,s);
            this.visi3D.sizeWindow(0,0,w,h);

            self.scPixi.width=w;
            self.scPixi.height=h;           
            self.scPixi.render()
                      
  		}

        this.getObj= function(){          
            //return this.stairs.getObj();
        }

        this.setObj= function(o){
            //this.stairs.setObj(o)
            //this.menu.setObj(o)                      
        }

        if(mainBig.debug==true){
            this.indexSah = 0;
            this.saveLoacal.init();
        }else{
            let p=-1
            for (var i = 0; i < this.par.objectBase.scene.array.length; i++) {
                if(this.par.objectBase.scene.array[i].active==true){
                    p=i
                    break;
                }
            }
            if(p!=-1)this.index = p;
            
        }*/
  	} 



}

