

import { MOBaza } from './MOBaza.js';


import { TVector } from './t3d/TVector.js';

import { Map } from '../scane/Map.js';
import { ButTu} from './ButTu.js';

export class PMap extends MOBaza {
  	constructor(par,fun) {  
        super(par,fun);
  		this.type="PMap";
        this.linkIcon = "resources/image/pic2.png";
        this.text="CAM POSITION";

  		var self=this;

        this._open=false;
        this._active=false;

        this._indent=mainBig.objectBase.settings.indent;
        this._sizeBase=mainBig.objectBase.settings.sizeBase;

        this.dCont=new DCont(par.dCont);
        this.dCont.visible=this._active

        this.content2d = new PIXI.Container();
        this.par.par.content2dMap.addChild(this.content2d);
        



        this._index=-1;

  

        this.arrConf=[];

       /* let b=false
        if(mainBig.objectBase.scene==undefined){mainBig.objectBase.scene={};b=true}
        if(mainBig.objectBase.scene.arrFoto==undefined){
            mainBig.objectBase.scene.arrFoto=["resources/image/pic.png","resources/image/pic.png","resources/image/pic.png","resources/image/pic.png"];
            b=true;
        }
        if(mainBig.objectBase.scene.array==undefined){
            mainBig.objectBase.scene.array=[];
            b=true
        }
        if(mainBig.objectBase.scene.bottom==undefined){
            mainBig.objectBase.scene.bottom={}
            mainBig.objectBase.scene.bottom.src=mainBig.objectBase.scene.arrFoto[0];

            mainBig.objectBase.scene.point={}
            mainBig.objectBase.scene.point.src=mainBig.objectBase.scene.arrFoto[1];

            mainBig.objectBase.scene.hero={}
            mainBig.objectBase.scene.hero.src=mainBig.objectBase.scene.arrFoto[2];
            b=true
        }



        if(b)self.par.par.locSave.saveTime();*/

        this.arrConf=mainBig.objectBase.scene.array;
        this.arrFoto=mainBig.objectBase.scene.arrFoto;


        this.panel=undefined;
        this.map=undefined;
        this.mapFunStart=undefined;


        this.point=new Position()
        this.point1=new Position()

        this.korectPoint=function(p){
            
            if(p.x >= 0 &&p.x <= self.map.width && p.y >= 0 &&p.y <= self.map.height){
                
            }else{
                this.point1.x=self.map.width/2;
                this.point1.y=self.map.height/2;
                let ppp=calc.getPointOfIntersection(p,this.point1,new Position(0,0),new Position(0,self.map.height))
                if(ppp!=null){
                    p.x=ppp.x;
                    p.y=ppp.y;
                    return
                }
                ppp=calc.getPointOfIntersection(p,this.point1,new Position(0,0),new Position(self.map.width,0))
                if(ppp!=null){
                    p.x=ppp.x;
                    p.y=ppp.y;
                    return
                }
                ppp=calc.getPointOfIntersection(p,this.point1,new Position(self.map.width,0),new Position(self.map.width,self.map.height))
                if(ppp!=null){
                    p.x=ppp.x;
                    p.y=ppp.y;
                    return
                }

                ppp=calc.getPointOfIntersection(p,this.point1,new Position(0,self.map.height),new Position(self.map.width,self.map.height))
                if(ppp!=null){
                    p.x=ppp.x;
                    p.y=ppp.y;
                    return
                }


            }
            //if(p)
        }


        this.mouseMove=function(e){
            
            let xx=(e.clientX-(w/2))/self.map.content2d.scale.x+self.map.width/2;//(w/2)//-e.clientX/self.map.content2d.scale.x)//+self.map.width/2/self.map.content2d.scale.x
            let yy=(e.clientY-(h/2))/self.map.content2d.scale.x+self.map.height/2;

            
            self.point.x=xx
            self.point.y=yy
            self.korectPoint(self.point)


            self.object.x=self.point.x;
            self.object.y=self.point.y;


            self.map.hiro.content2d.visible=true;
            self.map.hiro.x=self.point.x;
            self.map.hiro.y=self.point.y;

            self.map.resetPoint();
        }

        this.mouseup=function(e){
            
            dcmParam.removeFunMove(self.mouseMove)
            if(dcmParam.mobile==false){            
                document.removeEventListener("mouseup", self.mouseup);
            }else{                  
                document.removeEventListener("touchend", self.mouseup);                    
            }
        }


        this.mapFunNew=function(s,p){
            
            if(s=="setIndex"){
                if(self.gall){
                    self.gall.index= p
                    self.redragGal(p)  
                }
                if(aBut1 ==true){                   
                    mainBig.objectBase.scene.array.splice(p,1)                   
                    self.par.par.locSave.saveTime();
                    self.map.resetPoint();                    
                    return;
                }
                self.openObj(mainBig.objectBase.scene.array[p])
                if(aBut1 ==false && aBut ==false){                   
                    self.startDrag();                   
                } 

                self.fun(s,p)

                self.par.pLoader.stop(0) 

            }
            if(s=="intRend"){
                visi3D.intRend=1
            }
            if(s=="onDownMB"){                
                self.mousedown(p);
            }            
        }

        this.startDrag=function(){
            dcmParam.addFunMove(self.mouseMove)
            if(dcmParam.mobile==false){            
                document.addEventListener("mouseup", self.mouseup);
            }else{                  
                document.addEventListener("touchend", self.mouseup);                        
            }
        }



        this.initMap= function(n){            
            if(this.panel!=undefined)return 
            this.map =this.par.par.scane.map;
            this.mapFunStart=this.map.fun;
        }

        this.aP=[]
        this.addPoint= function(p){


        }

        this.clearPoints= function(){


        }
        

        this.clinerPoint= function(n){
            let p=-1;
            
            for (var i = 0; i < mainBig.objectBase.points.array.length; i++) {
                if(mainBig.objectBase.points.array[i].room==n){
                    mainBig.objectBase.points.array.splice(i,1)
                    i=0;                    
                }
               
            }
            self.par.par.locSave.saveTime();
            self.fun("dragPoint");
        }
        




        var aBut=false
        var aBut1=false

        this.wh=100
        this.whBut=50

        this.dCMenu=undefined;
        if(mainBig.debug==true){

            this.dContB=new DCont(this.dCont);



            this.clik1=function(){
                
            }

            this.drag1=function(){               
                if(self.gall.array[self.gall.index].object.active == true)return
                self.gall.array[self.gall.index].object.active=true;
                self.gall.array[self.gall.index].redtagActiv()
                self.bs.activMouse=true;
                self.openObj(self.gall.array[self.gall.index].object)
                self.startDrag(); 
                self.map.resetPoint();
            }



            this.redragGal=function(num){
                this.gall.start(this.arrConf); 
                if(this.arrConf.length==0){
                    this.bs.activMouse=false;
                    if(this.bs1){
                        this.bs1.activMouse=false;
                        this.bs3.activMouse=false;
                    }
                }else{
                    
                    if(num!=undefined && self.gall.array[num].object){
                        self.openObj(self.gall.array[num].object);
                        self.gall.index=num;


                        if(this.bs1){
                            this.bs1.activMouse=true;
                            this.bs3.activMouse=true;
                        }
                        this.bs.activMouse=self.gall.array[num].object.active;
                        self.map.hiro.content2d.visible=self.gall.array[num].object.active;

                        if(self.gall.array[num].object.active){
                            self.map.hiro.x=self.gall.array[num].object.x;
                            self.map.hiro.y=self.gall.array[num].object.y;
                        } 
                    }                                       
                }
                visi3D.intRend=1
            }


            this.wh=this._sizeBase;
            this.whBut=this._sizeBase/2;


            this.gall=new GalleryXZ(this.dContB,this._indent,0,function(){  
                aBut=true;
                self.mapFunNew("setIndex",this.index)              
                self.redragGal(this.index)
                self.ddragPic.testDrag(35, self.clik1, self.drag1); 
                self.openObj(this.obj);
                aBut=false
            });
            this.gall.height=this.wh; 

            this.gall.widthPic=this.gall.heightPic=this.wh-2*2;
            this.gall.color=mainBig.objectBase.settings.color;
            this.gall.color1=mainBig.objectBase.settings.colorAct;                      
            this.gall.kolII=222;



            this.ddragPic=new DDragPic(this.dContB)
            this.bs=new DButton(this.dContB,this._indent,-this._indent-this.whBut,"CLEAR",function(){               
                self.map.hiro.content2d.visible=false;
                self.gall.array[self.gall.index].object.active=false;  
                self.gall.array[self.gall.index].redtagActiv()
                self.bs.activMouse=false;
                self.openObj(self.gall.array[self.gall.index].object)
               
                self.map.resetPoint();  
            },"resources/image/eyedelete.png")
            this.bs.boolDrahVert=false
            this.bs.borderRadius=10;
            //this.bs.notPic=true
            this.bs.width = this.whBut;
            this.bs.height = this.whBut;            
            basaComp.addComp(this.bs);
            this.bs.label.glowSah=this.bs.glowSah;
            this.bs.label.glowColor=this.bs.glowColor            
            this.bs.setActive(true);

     

          /*  this.bs4=new DButton(this.dContB,this._indent,-(this._indent+this.whBut)*2,"TURN",function(){               
                
                if(self.gall.array[self.gall.index].object.turn==undefined){
                    self.gall.array[self.gall.index].object.turn=0;

                }

                self.gall.array[self.gall.index].object.turn+=5;
                
                let r=self.map.hiro._rotation
                self.map.hiro._rotation++;
                self.map.hiro.rotation=r;
                self.par.par.locSave.saveTime();
                visi3D.intRend=1
            },"resources/image/turn.png")
            this.bs4.boolDrahVert=false
            this.bs4.borderRadius=10;
            this.bs4.notPic=true
            this.bs4.width = this.whBut;
            this.bs4.height = this.whBut;            
            basaComp.addComp(this.bs4);
            this.bs4.label.glowSah=this.bs.glowSah;
            this.bs4.label.glowColor=this.bs.glowColor            
            this.bs4.setActive(true);*/




            if(mainBig.debugDev!=false){
                var bitmap=new DBitmapData(200,200) 

                this.bs1=new DButton(this.dContB,this._indent,-(this._indent+this.whBut)*2,"LOAD",function(s){                
                    
                    if(this.files[0]){
                        let a=this.files[0].name.split(".")
                        let n=new Date().getTime()+"."+a[a.length-1]
                        uploadFile("./../resources/d/"+n,this.files[0],function(sob){                        
                            self.object.src="resources/d/"+n;
                            creatIcon(s,200,200,function(ss){
                                let n = new Date().getTime()+"_.png";
                                let json=ss
                                  php.savePhoto("./../resources/d/"+n, json, function () {
                                    self.gall.array[self.gall.index].image.link=s
                                    self.object.pre="resources/d/"+n;  
                                    self.redragGal(self.gall.index) 
                                    self.par.par.locSave.saveTime();
                                });
                            })

                            /*bitmap.fun=function(){
                                bitmap.width=200;
                                bitmap.height=200;                                
                                let n = new Date().getTime()+"_.png";
                                let json=bitmap.canvas.toDataURL("image/png")
                                  php.savePhoto("./../resources/d/"+n, json, function () {
                                    self.gall.array[self.gall.index].image.link=s
                                    self.object.pre="resources/d/"+n;  
                                    self.redragGal(self.gall.index) 
                                    self.par.par.locSave.saveTime();
                                });
                            }                            
                            bitmap.load(s,true) */                           
                        }) 
                    }
                },"resources/image/load.png")
                this.bs1.boolDrahVert=false
                this.bs1.borderRadius=10;
                //this.bs1.notPic=true
                this.bs1.width = this.whBut;
                this.bs1.height = this.whBut;            
                basaComp.addComp(this.bs1);
                this.bs1.label.glowSah=this.bs.glowSah;
                this.bs1.label.glowColor=this.bs.glowColor;
                this.bs1.startFile("image/*");
                this.bs1.setActive(true);

              /*  this.bs1LLL=new DButton(this.dContB,this._indent+100,-(this._indent+this.whBut)*2,"CreatIcon",function(s){ 
                    trace(self.gall.array[self.gall.index])
                    creatIcon(self.gall.array[self.gall.index].object.src,200,200,function(ss){
                        
                        self.gall.array[self.gall.index].image.link=s
                        self.object.pre="resources/d/"+n;  
                        self.redragGal(self.gall.index) 
                        self.par.par.locSave.saveTime();
                        //new DImage(self.dContB,400,-200,ss)

                        let n = self.gall.array[self.gall.index].object.pre//new Date().getTime()+"_.png";
                        let json=ss
                        php.savePhoto("./../"+n, json, function () {
                            //self.gall.array[self.gall.index].image.link=s
                            //self.object.pre="resources/d/"+n;  
                            self.redragGal(self.gall.index) 
                            //self.par.par.locSave.saveTime();
                        });
                    })
                }) */

                function creatIcon(_link,_w,_h,_f){
                    var ii = new Image();
                    ii.onload = function(){
                        let canvas = document.createElement('canvas');
                        canvas.width=_w;
                        canvas.height=_h;
                        let ctx = canvas.getContext('2d'); // контекст картинки
                        ctx.drawImage(this,0,0, _w, _h);

                        _f(canvas.toDataURL("image/png"))


                    };    
                    ii.src = _link;
                }
                

                 




                this.bs2=new DButton(this.dContB,this._indent,-(this._indent+this.whBut)*3,"ADD",function(){
                    self.arrConf.push({
                        time:new Date().getTime(),
                        id:new Date().getTime(), 
                        src:"null",
                        pre:"resources/image/pic.png",                
                        x:100,
                        y:100,
                        active:false,
                        title:"null",
                        key:"null"
                    })
                    self.par.par.locSave.saveTime();
                    self.redragGal(self.arrConf.length-1);
                },"resources/image/add.png");
                this.bs2.boolDrahVert=false
                this.bs2.borderRadius=10;
                //this.bs2.notPic=true
                this.bs2.width = this.whBut;
                this.bs2.height = this.whBut;            
                basaComp.addComp(this.bs2);
                this.bs2.label.glowSah=this.bs.glowSah
                this.bs2.label.glowColor=this.bs.glowColor;
                this.bs2.setActive(true);    



                this.bs3=new DButton(this.dContB,this._indent,-(this._indent+this.whBut)*4,"REMOVE",function(){                
                    if(self.arrConf[self.gall.index]){
                        self.map.hiro.content2d.visible=false;
                        let s=self.gall.index-1
                        if(s<0)s=0
                        self.arrConf.splice(self.gall.index,1)
                        self.gall.start(self.arrConf);
                        self.par.par.locSave.saveTime();
                        self.gall.index=s
                        self.redragGal(s)
                        self.map.resetPoint();
                    } 
                },"resources/image/remove.png")
                this.bs3.boolDrahVert=false
                this.bs3.borderRadius=10;
                //this.bs3.notPic=true
                this.bs3.width = this.whBut;
                this.bs3.height = this.whBut;            
                basaComp.addComp(this.bs3);
                this.bs3.label.glowSah=this.bs.glowSah
                this.bs3.label.glowColor=this.bs.glowColor
                this.bs3.setActive(true);









/*

                this.dCMenu=new DCont(this.dCont);
                this.dCMenu.visible=false;
                this.tv=new TVector();

                this.tv.sah=2;


                
                this.battonLoad1=new DButton(this.window.content, 5, sy, "load Mask Room",function(){
                    if(this.files[0]){
                        let a=this.files[0].name.split(".");
                        let n=new Date().getTime()+"."+a[a.length-1];
                        uploadFile("./../resources/d/"+n,this.files[0],function(s){                        
                            self.object.src1="resources/d/"+n;
                            self.gallery.start([])
                            self.gallery.start(self.arrConf)
                            self.par.par.locSave.saveTime();
                            self.loadVector();
                        })
                    }
                })
                this.battonLoad1.width=this.window.width-10;
                this.battonLoad1.startFile("image/*");
               



                self.loadVector=function(){
                    self.tv.wh = 1000
                    self.tv.setLink(
                        self.object.src1,//"resources/image/map11111.png",//"resources/image/pic.png",//
                        function(){
                            trace(self.tv)
                            

                            self.object.vector=[] 
                            for (var i = 0; i < self.tv.points.array.length; i++) {
                                self.object.vector[i]=[]
                                for (var j = 0; j < self.tv.points.array[i].length; j++) {
                                    self.object.vector[i].push({x:self.tv.points.array[i][j].x,y:self.tv.points.array[i][j].y})
                                }
                            }
                            self.par.par.locSave.save();  
                            self.fun("creatVector")

                        },
                        true);
                }

            }
            */
            }


            this.mousedown=function(_e){
                if(this._active==false) return
                let e=_e.data.originalEvent;                 
                if(aBut ==true){
                    let xx=-(w/2-e.clientX)+self.map.width/2
                    let yy=-(h/2-e.clientY)+self.map.height/2

                    
                    var o={
                        time:new Date().getTime(),
                        src:"null",
                        src1:"null",
                        src2:"null",
                        x:xx,
                        y:yy,
                        title:"xzTitle",
                        key:"xzKey"
                    }
                    self.arrConf.push(o);
                    self.map.resetPoint();

                    if(self.gallery){
                        self.gallery.start(self.arrConf);
                        self.openObj(self.gallery.array[self.gallery.array.length-1].object);
                        self.gallery.index=self.gallery.array.length-1;                                                
                    }

                    self.par.par.locSave.saveTime(); 
                    setTimeout(function() {
                        visi3D.intRend=1
                    }, 100); 
                    setTimeout(function() {
                        visi3D.intRend=1
                    }, 10); 
                }             
            }       


            this.redragGal()

        }


        this.setObjEvent= function(obj){ 
            if(mainBig.debug==false)return
            trace("setObjEvent")    
            if(dcmParam.mobile==false){  
                obj.on('mousedown', self.mousedown);                    
            }else{
                //self.map.graphicsPanel
                obj.on('touchstart', self.onDown);                     
            }
        }



        this.object=undefined    
        this.openObj= function(obj){ 
            if(obj.time==undefined){
                obj.time=new Date().getTime();
                self.par.par.locSave.saveTime();
            }
            this.object=obj; 
            self.bs.activMouse=this.object.active;
        }


        function uploadFile(dest, file,  fun) {
            let serverURL =  "src/phpBase.php";
            let data = new FormData();
            data.append('tip', 'saveFile');
            data.append('file', file);
            data.append('dest', dest);              
            $.ajax({
                url: serverURL,
                dataType: 'text',
                cache: false,
                contentType: false,
                processData: false,
                data: data,
                type: 'post',
                success: (function(data) {                    
                    fun(data);                   
                })
            });
        }

  

        var w,h,s
        this.sizeWindow = function(_w,_h,_s){ 
            
            if(_w){
                w=_w;
                h=_h;
                s=_s;
            }

            
            if(mainBig.debug==true){
                this.dContB.y=(h/s-this.wh)-this._indent; 
                this.gall.width=w/s-this._indent*2
            }


            if(this.dCMenu){
                this.dCMenu.x=w/s/2+300
                this.dCMenu.y=h/s/2-200
            }

            if(this.map==undefined)return
            this.content2d.x=( w / s -  this.map.width)/2;
            this.content2d.y=( h / s -  this.map.height)/2;
        }
  	}

    set index(value) {
        if (this._index != value) {
            this._index = value; 
            if(this.map!=undefined) this.map.index=value;          
        }        
            
    }
    get index() { return this._index; }

    set open(value) {
        if(this._open!=value){
            this._open= value; 
            if(value)this.batton.loadImeg("resources/image/button0_.png");
            else this.batton.loadImeg("resources/image/button0.png");                      
        }
    }    
    get open() { return  this._open;} 


    set active(value) {
        if (this._active != value) {
            this._active = value;            
            if(mainBig.debug==true) {
                if(this._active==true){
                    if(this.dCMenu) this.dCMenu.visible=true;
                    this.initMap()
                    this.map.tipPosit=1;
                    this.map.boolPanel=true;
                    this.map.fun=this.mapFunNew                    
                }else{
                    if(this.dCMenu) this.dCMenu.visible=false;
                    this.map.tipPosit=0;
                    this.map.boolPanel=false;
                    this.map.fun=this.mapFunStart;
                }
            }

            if(this.dCont) {
                if(this._active==true){
                    this.dCont.visible=true;
                }else{
                    this.dCont.visible=false;
                }
            }

        } 


            
    }
    get active() { return this._active; }

}



//////////////////////////////////




//////////////////////////


























function GalleryXZ(dCont, _x, _y, _fun) {
    DGallery.call(this, dCont, _x, _y, _fun);               
    this.type="GalleryXZ"; 
    this.createZamen=function(){            
        var r=new BoxXZ(this.content, 0, 0, this.downBtn);            
        return r;
    }    
}
GalleryXZ.prototype = Object.create(DGallery.prototype);
GalleryXZ.prototype.constructor = GalleryXZ;

Object.defineProperties(GalleryXZ.prototype, {
    index: {// Активный элемент
        set: function (value) {
            this._index = value; 
            for (var i = 0; i < this.array.length; i++) {
                if (this._index == i) this.array[i].activ = true;
                else this.array[i].activ = false;
            }

        },
        get: function () {
            return this._index;
        }
    },

})


function BoxXZ(dCont, _x, _y, _fun) {
    DBox.call(this, dCont, _x, _y, _fun);
    this.type = 'BoxXZ';
    var self=this

    this.label.div.style.pointerEvents="none";
    this.label.textAlign="center";
    this.label.color="#000000"


    this.redtagActiv= function () { 
        
        if(this.object.active==false){
            this.panel.color1=this._color;    
        }else{
            this.panel.color1=this._color1;
        }
    }
    

    this.startLoad = function (_obj) {        
        this.label.visible=true
        if(this.object!=undefined) {
            self.funLoad();
            return   
        }        

        this.object = _obj;
        this.redtagActiv()

        if (_obj.title) {
            this.label.text = _obj.title;
            this.label.value = _obj.title;
            this.label.visible = true;
        }
        if (_obj.pre) {
            //this.image.visible = true;
            if (this.image.link == _obj.pre) {
                if (self.funLoad) self.funLoad();
            } else {
                this.image.width = 100;
                this.image.height = 100;
                this.image.link = _obj.pre;
            }
        }else{
            if (self.funLoad) self.funLoad();
        }
        this.draw();



        /*if(this.object!=undefined) {
            self.funLoad();
            return   
        }  
        

        this.object = _obj;

        if (_obj.title) {
            this.label.text = _obj.title;
            this.label.value = _obj.title;
            this.label.visible = true;
        }
        if (_obj.src) {
            //this.image.visible = true;
            if (this.image.link == _obj.src) {
                if (self.funLoad) self.funLoad();
            } else {
                this.image.width = 100;
                this.image.height = 100;
                this.image.link = _obj.src;
            }
        }else{
            if (self.funLoad) self.funLoad();
        }
        this.draw();*/


    };
    var ss
    this.draw = function () {
        let hh=this._height-30
        ss = (this._width - this._otstup * 2) / this.image.picWidth;
        if (ss > (hh - this._otstup * 2) / this.image.picHeight)ss = (hh - this._otstup * 2) / this.image.picHeight;
        this.image.x = 0;
        this.image.width=this.image.picWidth*ss;
        this.image.height=this.image.picHeight*ss;

        this.image.x = (this._width - this.image.picWidth * ss) / 2;
        this.image.y = (this._height - this.image.picHeight * ss) / 2-10;

        this.label.x = 2//(this._width - this.label.curW) / 2;
        this.label.y = this._height - 20;

        this.label.width=this.panel.width

        if (this.postDraw) this.postDraw();
    };



    if(dcmParam.mobile==false){

        this.panel.div.removeEventListener("mouseout", this.mouseOut);
        this.image.image.removeEventListener("mouseout", this.mouseOut);

        this.panel.div.removeEventListener("mouseover", this.mouseOver);
        this.image.image.removeEventListener("mouseover", this.mouseOver); 
    }

}
BoxXZ.prototype = Object.create(DBox.prototype);
BoxXZ.prototype.constructor = BoxXZ;

Object.defineProperties(BoxXZ.prototype, {
    activ: { // активный элемент
        set: function (value) {
            if (this._activ == value) return;
            this._activ = value;
            //if(this._activ==false)this.panel.color1=this._color1;
            //else this.panel.color1=this._color;
            if(this._activ==false)this.alpha=1;
            else this.alpha=0.5;
        },
        get: function () {
            return this._activ;
        }
    },
})
