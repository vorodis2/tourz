

/*
*/
import { MVisi3D } from './visi3D/MVisi3D.js';
import { SceneSB } from './visi3D/SceneSB.js';

import { TVSigment } from './TVSigment.js';
import { TVPreLoader } from './TVPreLoader.js';

export class TView  {
  	constructor(fun,linkPreload) {  		
  		this.type="TView";
  		var self=this;
        this.fun=fun;    
        this._active = true; 
        this._link = "null";



        this.div= document.createElement('div');
        this.div.style.position = 'fixed';
        this.div.style.top = '0px';
        this.div.style.left = '0px';



        let mobile=false

        this.content3d = new THREE.Object3D();
        //порезаный от пикси вювер
        this.visi3D = new MVisi3D(this.div, null, mobile, true, false, true, true);     
        //this.visi3D.yes3d = true;           
        this.visi3D.groupObject.add(this.content3d);        
        //global.visi3D=this.visi3D;

        //хрень принемашка ресурсов и настроек камеры для 
        var o='{"ambient":{"works":true,"active":true,"color":"#fdffff","intensity":0.71},"shadow":{"works":true,"active":true,"mapSize":4096,"color":"#8c8c8c","bias":-0.0014,"intensity":1.01,"radius":1.27,"bAlphaForCoating":false,"fixation":true,"rotationX":0.93,"rotationZ":0.73,"distance":500,"cubWidth":1000,"cubHeight":1000,"distanceUpdateShadow":65.41},"sky":{"works":true,"active":true,"color":"#ffffff","link":"null","rotZ":2.73,"radius":7008,"x":0,"y":0,"z":0},"mirror":{"works":true,"link":"resources/scane/sky/fon1.jpg","exposure":1.44,"gamma":2.87,"xz":"reflect","link1":"resources/scane/sky/fon1.jpg","exposure1":-1,"gamma1":-1},"visi3D":{"works":true,"alwaysRender":false,"fov":60,"far":47175,"minZum":0,"maxZum":10942,"zume":2500,"minRotationX":3.14,"maxRotationX":0,"rotationX":0.94,"rotationZ":0.17,"debug":false,"isDragPan":false,"alphaAd":false,"globZ":0,"powerZum":1},"fog":{"works":true,"active":false,"color":"#ffffff","near":0,"far":0},"effect":{"works":true,"active":false,"edgeStrength":3,"edgeGlow":0,"pulsePeriod":0,"linkTextur":"null","visibleEdgeColor":"#ffffff","hiddenEdgeColor":"#190a05"}}'
        var scene=JSON.parse(o)
        this.radius=scene.sky.radius

        this.sigment=new TVSigment(this,function(s,p){
            trace(">>>>>>>>>>>>>",s,p)
            if(s=="complite"){                
                self.preLoader.active=false
            }
        });
        

        this.preLoader=new TVPreLoader(this,linkPreload,function(s,p){
            
        });

        
        
        this.sceneSB=new SceneSB(this.visi3D);
        for (var i = 0; i <  this.sceneSB.array.length; i++) {
            if (scene[this.sceneSB.array[i].name] === undefined) {
                scene[this.sceneSB.array[i].name] = {};                
            }            
            this.sceneSB.array[i].setBasa(scene[this.sceneSB.array[i].name]);
        }

        this.visi3D.zume=2100;//this.par.objectBase.settings.zume
       

        this.setDragLine= function (b) {    
            if(b){
                this.visi3D.position3d.minMaxX.x=Math.PI/2
                this.visi3D.position3d.minMaxX.y=Math.PI/2
                this.visi3D.rotationX=Math.PI/2
            }else{
                this.visi3D.position3d.minMaxX.x=3.14;
                this.visi3D.position3d.minMaxX.y=0;
            }

        }

        this.visi3D.fun_rotationZ = function () {             
            self.fun("fun_rotationZ",self.visi3D._rotationZ)            
        }
        this.visi3D.fun_rotationX = function () {             
            self.fun("fun_rotationX",self.visi3D._rotationX)            
        }

        this.setLink=function(type,link,boolPreLoad,boolPreLink){
            trace("setLink===",type,link,boolPreLoad,boolPreLink);
            if(boolPreLoad==true){
                this.preLoader.active=true;
            }
            if(boolPreLink!=null)this.visi3D.utility.sky.link=boolPreLink;

                           
            this.sigment.setLink(type,link)
           
            
            
        }


        this.render=function(){
            this.visi3D.intRend=1
        }

        this.w=100;
        this.h=100;
        this.s=100;
        this.sizeWindow=function(w,h,s){
            this.w=w;
            this.h=h;
            this.s=s;
            this.visi3D.sizeWindow(0,0,w,h);
            this.preLoader.sizeWindow(w,h,s);
        }



        function animate() {
            requestAnimationFrame( animate );
            self.preLoader.upDate();
            if(self._active == true){                
                self.visi3D.upDate();
                self.sigment.upDate();
            }

        }
        animate();
       


  	} 



    set active(value) {
        if (this._active != value) {
            this._active = value;             
            //if(value==false)this.preLoader.active = value;                                      
        }             
    }
    get active() { return this._active; }  


    set link(value) {
        if (this._link != value) {
            this._link = value;             
            this.setLink("pic",value,true,null)                                      
        }             
    }
    get link() { return this._link; }  

    set rotation(value) {
        if (this._rotation != value) {
            this._rotation = value;             
            this.visi3D.rotationZ= value;
            this.visi3D.intRend = 1;                                    
        }             
    }
    get rotation() { return this._rotation; }  
 

}

