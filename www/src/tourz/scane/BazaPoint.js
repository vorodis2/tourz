
import {BDIco} from './BDIco.js';
import {BPBlok} from './BPBlok.js';

export class BazaPoint  {
  	constructor(par, fun) {          
        this.type="BazaPoint";
        var self=this;
        basaComp.addComp(this,true);
        this.par=par;
        this.fun=fun;

        this._glowSah=mainBig.objectBase.settings.glowSah;
        this._radius=mainBig.objectBase.settings.radius;
        this._color=mainBig.objectBase.settings.color;
        this._glowColor=mainBig.objectBase.settings.glowColor;


        this.visi3D= this.par.par.visi3D;
        this._indexBasa=-1

        this.content3d = new THREE.Object3D();
        this.par.content3d.add(this.content3d);

        this.c2d = new THREE.Object3D();
        this.visi3D.gpObject.add(this.c2d);
        


        this.content2d = new PIXI.Container();
        this.par.par.content2d.addChild(this.content2d);
        //this.content2d.interactive = true;

        global.bazaPoint=this

        

        this.arrConf=mainBig.objectBase.points.array

        this.arrayCach=[];
        this.array=[];        

        this.bdIco=new BDIco(this, mainBig.objectBase.points.at);


     


        this.dCont=new DCont(this.par.dCont);   

        this.fun_rotationZ = function () { 
            this.drag2d()
        }

        this.drag2d = function () {
            this.c2d.updateWorldMatrix(true, true);
            for (var i = 0; i < this.array.length; i++) {
                this.array[i].drag2d();
            }
        }



        this.dragPoint = function () {             
            this.dragIndex();
        }

        this.draw = function () { 
            
            this.bdIco.draw()
            
        } 
        this.draw1 = function () {
            for (var i = 0; i < this.arrayCach.length; i++) {
                this.arrayCach[i].draw()
            }
        }


        this.sobPoint = function (s,p) { 
            trace(s,p)
            if(s=="indexBasa"){
                self.indexBasa=p.idArr;
            }
            
            mainBig.glaf.scPixi.render(); 
            self.fun(s,p)
        }



        this.clean = function(){
            this.indexBasa=-1;
            for (var i = 0; i < this.arrayCach.length; i++) {
                this.arrayCach[i].life=false;
            }
            this.array=[];
        }


        this.getPoint = function(o){
            for (var i = 0; i < this.arrayCach.length; i++) {
                if(this.arrayCach[i].life==false){
                    if(this.arrayCach[i].ico==o.ico){
                        this.arrayCach[i].life=true
                        this.array.push(this.arrayCach[i]);
                        return this.arrayCach[i];
                    }
                }
            }

            this.arrayCach.push(new BPBlok(this,o,this.sobPoint))
            this.arrayCach[this.arrayCach.length-1].idArr=this.arrayCach.length-1;

            this.array.push(this.arrayCach[this.arrayCach.length-1]);
            this.arrayCach[this.arrayCach.length-1].life=true;

            this.arrayCach[this.arrayCach.length-1].draw()

            return this.arrayCach[this.arrayCach.length-1];
        }


        this.dragIndex= function (o) {        
            this.clean()            
            for (var i = 0; i < this.arrConf.length; i++) {
                if(this.arrConf[i].room==this._index){                    
                    let p=this.getPoint(this.arrConf[i]);
                    p.setObject(this.arrConf[i])
                }
            }
            this.drag2d();
        }


        this.debagDragPoint = function (num,w,r) {
            for (var i = 0; i < this.arrayCach.length; i++) {
                this.arrayCach[i].debagDragPoint(num,w,r)
            }

        }


        //ап дете сцена деленая на 2 в мейне
        this.update = function () {
            
        }


        this.width=100;
        this.height=100;
        var w,h,s
        this.sizeWindow = function(_w,_h,_s){ 
            if(_w){
                w=_w;
                h=_h;
                s=_s;
            }
            this.width=w;
            this.height=h;
        }  		
  	} 

    set index(value) {
        if (this._index != value) {
            this._index = value;  
            this.dragIndex()       
            
        }
    }
    get index() { return this._index; } 

    set indexBasa(value) {
        if (this._indexBasa != value) {
            this._indexBasa = value; 
            trace("this._indexBasa  ",this._indexBasa) 
            for (var i = 0; i < this.arrayCach.length; i++) {
                if(i==this._indexBasa){
                    this.arrayCach[i].active=true
                }else{
                    this.arrayCach[i].active=false
                }
            }     
            
        }
    }
    get indexBasa() { return this._indexBasa; } 




        set glowSah(value) {
        //if (this._glowSah != value) {
            this._glowSah = value; 
            this.draw() 
        //}        
    }
    get glowSah() { return this._glowSah; } 

    set glowColor(value) {
        //if (this._glowColor != value) {
            this._glowColor = value; 
            this.draw() 
        //}        
    }
    get glowColor() { return this._glowColor; } 

    set radius(value) {
        this._radius = value; 
        this.draw()         
    }
    get radius() { return this._radius; } 

    set color(value) {
       // if (this._color != value) {
            this._color = value; 
            this.draw()
       // }         
    }
    get color() { return this._color; } 

    set colorAct(value) {
       // if (this._color != value) {
            this._color = value; 
            this.draw()
       // }         
    }
    get colorAct() { return this._color; } 

}






