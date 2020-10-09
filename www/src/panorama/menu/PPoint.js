

import { MOBaza } from './MOBaza.js';
import { ButTu } from './ButTu.js';
import { MInfo } from './MInfo.js';

export class PPoint extends MOBaza {
  	constructor(par,fun) {  
        super(par,fun);
  		this.type="PPoint";
        this.linkIcon = "resources/image/pic0.png";
        this.text="TAGPOSITIONS";

  		var self=this;
        this.fun=fun

        this._index=-1;

        this._open=false;
        this._active = false; 
        this._boolArrow=false
        var bad=false
        this._indent=mainBig.objectBase.settings.indent;
        this._sizeBase=mainBig.objectBase.settings.sizeBase;
        this.wh=this._sizeBase;
        this.whBut=this._sizeBase/2;


        this.dCont=new DCont(par.dCont);
        
        this.visi3D= this.par.par.visi3D;
        this.dCont.visible=this._active;

        this.pOpen = new PPointOpen(this,function(s,p){

        })

        var aBut=false
        var aBut1=false
        this.arrConf=[];

        var blok,blok1
        var arKu

        ////////////////
        this.arrAt=[];
        this.atBut;
        this.panel1
        this.panel2
        this.setIndexAt=function(num, idArr){
            this.atBut=undefined
            for (var i = 0; i < this.arrAt.length; i++) {
                if(num==i){
                    this.arrAt[i].alpha=0.5
                    this.atBut=this.arrAt[i];
                    this.panel1.visible=true
                }
                else this.arrAt[i].alpha=1;
            }

            if(this.atBut){
                this.atS.value=this.atBut.objMy.wh;
                this.atS1.value=this.atBut.objMy.radius;
            }

        }

        this.setBlok=function(blok){
            if(this.panel2){
                blok1=blok
                this.setIndexAt(blok.ico);
                this.panel2.visible=true;
            }
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

        var rot
        var rot1
        //////////////
        if(mainBig.debug==true){


            if(mainBig.debugDev==true){
   
            } 




            /////////////////////////////

            this.dContB=new DCont(this.dCont);
            

            this.dContArrow=new DCont(this.dContB);

            this.imegeArrow=new DImage(this.dContArrow,this._sizeBase*2,-25,null)
            this.imegeArrow.width=this._sizeBase*1.5;
            this.imegeArrow.height=this._sizeBase;
            this.imegeArrow.div.style.pointerEvents="none";
            this.imegeArrow.alpha=0.6

            this.imegeArrow1=new DImage(this.dContArrow,this._sizeBase*5,-25,null)
            this.imegeArrow1.width=this._sizeBase*1.5;
            this.imegeArrow1.height=this._sizeBase;
            this.dContArrow.visible=this._boolArrow;
            this.imegeArrow1.div.style.pointerEvents="none";
            this.imegeArrow1.alpha=0.6

            
            var bitmap=new DBitmapData(2,2,null,function(){ 
                let oo=dcmParam.parseColor(mainBig.objectBase.settings.color)       
                let colorAct=[oo.r,oo.g,oo.b,111];
                

                let aa=[]
                let xx
                for (let i = 0; i < this._width; i++) {
                    aa[i]=[]
                    for (let j = 0; j < this._height; j++) {
                        xx=this.getPixel(i,j);
                        aa[0]=colorAct[0];
                        aa[1]=colorAct[1];
                        aa[2]=colorAct[2];
                        aa[3]=xx[3];
                        this.setPixel(i,j,aa)     
                        //aa[i].push([colorAct[0],colorAct[1],colorAct[2],xx[3]])
                    }
                }
               
                this.upDate(); 
                self.imegeArrow1.link=this.canvas.toDataURL("image/png"); 




                aa=[]                
                for (let i = 0; i < this._width; i++) {
                    aa[i]=[]
                    for (let j = 0; j < this._height; j++) {
                        xx=this.getPixel(i,j);

                        aa[i].push([xx[0],xx[1],xx[2],xx[3]])
                    }
                }
                for (let i = 0; i < this._width; i++) {
                    for (let j = 0; j < this._height; j++) {
                        this.setPixel(i,j,aa[this._width-i-1][j])                        
                    }
                }
                this.upDate(); 

                self.imegeArrow.link=this.canvas.toDataURL("image/png"); 
            }) 
            bitmap.load("resources/image/vector-arrow.png", true)




            

            this.upup=function(){
                
                self.bs2.setActive(true);
            }

            this.drag1=function(){               
                
            }

            this.drag=function(){              
                
                let pp=-this.point.y*0.01

                glafBig.scane.map.hiro.blok.obj.turn=rot1-pp;
                visi3D.rotationZ=rot+pp
                self.par.par.locSave.saveTime();
                
                //glafBig.scane.map.hiro._rotation+=1;
                //glafBig.scane.map.hiro.rotation-=1;

            }

            this.ddragPic=new DDragPic(this.dContB)


            this.wh=this._sizeBase;
            this.whBut=this._sizeBase/2;

            this.bs=new DButton(this.dContB,this._indent,(this.whBut+this._indent)/2,"REMOVE",function(){               
              /*self.map.hiro.content2d.visible=false;
                self.gall.array[self.gall.index].object.active=false;  
                self.gall.array[self.gall.index].redtagActiv()
                self.bs.activMouse=false;
                self.openObj(self.gall.array[self.gall.index].object)
               
                self.map.resetPoint();  */                
                
                if(this._activeVisi==false){
                    self.dragSah()
                    return
                }
                self.bs1.setActive(true);
                self.bs.setActive(false);
                aBut1=true;
                aBut=false;
                self.boolArrow=false

            },"resources/image/eyedelete.png")
            this.bs.boolDrahVert=false
            this.bs.borderRadius=10;
            //this.bs.notPic=true
            this.bs.width = this.whBut;
            this.bs.height = this.whBut;            
            basaComp.addComp(this.bs);
            this.bs.label.glowSah=this.bs.glowSah;
            this.bs.label.glowColor=this.bs.glowColor            
            self.bs.setActive(true);


            this.bs1=new DButton(this.dContB,this._indent, -(this.whBut+this._indent)/2,"ADD",function(){               
                if(this._activeVisi==false){
                    self.dragSah()
                    return
                }
                aBut1=false
                aBut=true
                self.bs1.setActive(false);
                self.bs.setActive(true);
                self.boolArrow=false
            },"resources/image/eyeadd.png")
            this.bs1.boolDrahVert=false
            this.bs1.borderRadius=10;
            //this.bs1.notPic=true
            this.bs1.width = this.whBut;//this._indent
            this.bs1.height = this.whBut;            
            basaComp.addComp(this.bs1);
            this.bs1.label.glowSah=this.bs1.glowSah;
            this.bs1.label.glowColor=this.bs1.glowColor 
            self.bs1.setActive(true);

            this.mInfo = new MInfo(this.par.par.dCont);//окно поверх с инпутами

            this.bs2=new DButton(this.dContB,this._indent, -(this.whBut+this._indent)/2,"",function(){ 
                var b=this._activeVisi;
                bad=false; 
                self.boolArrow=b;
                

            },"resources/image/turn.png")
           /* this.bs2.fun_mousedown=function(){ 
                
                rot=visi3D.rotationZ;
                rot1=glafBig.scane.map.hiro.blok.obj.turn;
                if(rot1==undefined)rot1=0;

                this.setActive(false);
                self.ddragPic.testDrag(50000,self.upup,self.drag1,self.drag)
            }*/

            this.bs2.boolDrahVert=false
            this.bs2.borderRadius=10;
            //this.bs2.notPic=true
            this.bs2.width = this.whBut;
            this.bs2.height = this.whBut;            
            basaComp.addComp(this.bs2);
            this.bs2.label.glowSah=this.bs2.glowSah;
            this.bs2.label.glowColor=this.bs2.glowColor
            this.bs2.label.x=-50 
            self.bs2.setActive(true);



            this.bs3=new DButton(this.dContB,this._indent, (this.whBut+this._indent)/2,"",function(){               
                self.mInfo.setFun(
                    "Delete all points",
                    "Delete all points?",
                    function(){
                        
                        self.killAll()
                    });
            },"resources/image/musor.png")
            this.bs3.boolDrahVert=false
            this.bs3.borderRadius=10;
            //this.bs3.notPic=true
            this.bs3.width = this.whBut;
            this.bs3.height = this.whBut;            
            basaComp.addComp(this.bs3);
            this.bs3.label.glowSah=this.bs3.glowSah;
            this.bs3.label.glowColor=this.bs3.glowColor
            this.bs3.label.x=-50 
            self.bs3.setActive(true);






            this.visi3D.utility.sky.mesh.name="skyMesh"
            this.visi3D.addChildMouse(this.visi3D.utility.sky.mesh)
            this.visi3D.addEvent("down",function(e){ 
                                      
                if(aBut)
                if(e!=null&&e.target){
                    if(e.target.uuid==self.visi3D.utility.sky.mesh.uuid){                        
                        var o={
                            time:new Date().getTime(),
                            x:e.point.x,
                            y:e.point.z,
                            z:-e.point.y,
                            ico:0,
                            teg:"null",
                            info:{
                                demo:"resources/image/demo.png"
                            },
                            room:self.index
                        };

                        mainBig.objectBase.points.array.push(o);
                        self.par.par.locSave.saveTime();
                        self.fun("dragPoint");
                        mainBig.glaf.scPixi.render(); 
                        visi3D.intRend=-50
                        setTimeout(function() {
                            visi3D.intRend=1
                        }, 100);
                        setTimeout(function() {
                            visi3D.intRend=1
                        }, 1000);
                    } 
                    return;                  
                }                

            })

            var bbbb=false
            this.move=function(e){                
                if(e!=null&&e.target){
                    if(e.target.uuid==self.visi3D.utility.sky.mesh.uuid){
                        if(bbbb==false){
                            bbbb=true
                            return
                        }
                        

                        blok.object.x=e.point.x;
                        blok.object.y=e.point.z;
                        blok.object.z=-e.point.y;
                        
                        blok.setObject(blok.object);
                        self.visi3D.intRend = 1;
                        blok.par.drag2d();
                        self.par.par.locSave.saveTime();
                        self.pOpen.active=false;
                    }
                }
            }

            this.mouseup=function(e){
                self.visi3D.removeEvent("move",self.move);
                self.visi3D.position3d.pause=false
                self.visi3D.event3DArr.poiskName='xzPoisk'
                blok=undefined;
                              
                if(dcmParam.mobile==false){            
                    document.removeEventListener("mouseup", self.mouseup);
                }else{                  
                    document.removeEventListener("touchend", self.mouseup);                    
                }
            }
        }


        this.mU=function(e){
            bad=false;  
        }
        this.mD=function(e){
            bad=true;  
            rot=visi3D.rotationZ;
            if(glafBig.scane.map.hiro.blok.obj.turn==undefined)glafBig.scane.map.hiro.blok.obj.turn=0
            rot1=glafBig.scane.map.hiro.blok.obj.turn;


            trace(">>>>>>>>>>>>>>>>>",glafBig.scane.map.hiro.blok.obj)   
        }


        this.killAll=function(){    
            for (var i = 0; i < mainBig.objectBase.points.array.length; i++) {
                if(mainBig.objectBase.points.array[i].room==this._index){
                    mainBig.objectBase.points.array.splice(i,1)
                    this.killAll() 
                    return  
                }                
            }
            self.par.par.locSave.saveTime();
            self.fun("dragPoint");/**/

        }


        this.setIndexBasa= function(objB) {             
            if(mainBig.debug==true){
                if(aBut1){//удоляшка                                    
                    let p=-1;
                    for (var i = 0; i < mainBig.objectBase.points.array.length; i++) {
                        if(mainBig.objectBase.points.array[i].time==objB.object.time)p=i
                    }
                    if(p!=-1){
                        mainBig.objectBase.points.array.splice(p,1)
                        self.par.par.locSave.saveTime();
                        self.fun("dragPoint");
                    } 
                    return;                 
                }

                if(self._active==true){
                    if(aBut1==false&&aBut==false){
                        let p=-1;
                        for (var i = 0; i < mainBig.objectBase.points.array.length; i++) {
                            if(mainBig.objectBase.points.array[i].time==objB.object.time)p=i
                        }
                        arKu=mainBig.objectBase.points.array[p];

                        blok=objB 
                        self.setBlok(blok);
                        self.visi3D.event3DArr.poiskName=self.visi3D.utility.sky.mesh.name;
                        bbbb=false;
                        self.visi3D.position3d.pause=true;
                        self.visi3D.addEvent("move",self.move);
                        if(dcmParam.mobile==false){            
                            document.addEventListener("mouseup", self.mouseup);
                        }else{                  
                            document.addEventListener("touchend", self.mouseup);                        
                        }                                      
                    }
                }                
            } 

            let tipOpen=undefined;

            if(mainBig.debug == false)tipOpen=0;
            else{
                if(glafBig.indexSah=="PNiz")tipOpen=1;
            }

            this.pOpen.setIndexBasa(objB,tipOpen)
        }

        this.fun_rotationZ= function() {          
            this.pOpen.active=false
            if(self._boolArrow==true&&bad==true){
                let pp=rot-visi3D.rotationZ;                
                glafBig.scane.map.hiro.blok.obj.turn=rot1+pp;                
                glafBig.scane.map.hiro.rotation=glafBig.scane.map.hiro._rotation               
                self.par.par.locSave.saveTime();
            }
        }

        var w,h,s
        this.sizeWindow = function(_w,_h,_s){ 
            if(_w){
                w=_w;
                h=_h;
                s=_s;
            }
            if(this.dContB ){
                this.dContB.y=(h/s)/2
                this.bs3.x=this.bs2.x=w/s-this.whBut-this._indent
                this.mInfo.sizeWindow(w,h,s);

                if(this.boolArrow==true){
                    this.imegeArrow1.x=w/s-this._sizeBase*3.5;                    
                }
            }

            

            this.pOpen.sizeWindow(w,h,s);

            if(this.button){
                this.button.x=w/s-this.button.width-20
                this.button.y=h/s-this.button.height-192 
            }
            
        }

        this.dragSah = function(){ 
            //self.but1.active=false
            //self.but0.active=false
            //this.dragAct()
            self.bs.setActive(true);
            self.bs1.setActive(true);
            aBut=false;
            aBut1=false;
            self.boolArrow=false;
        }

  	}

    set index(value) {
        if (this._index != value) {
            this._index = value;            
        }        
            
    }
    get index() { return this._index; }

    set boolArrow(value) {
        if (this._boolArrow != value) {
            this._boolArrow = value; 
            this.dContArrow.visible=value;
            this.bs2.setActive(!value);            
            this.sizeWindow() 
            trace("boolArrow ",visi3D.rotationX)
            trace("boolArrow ",visi3D.position3d.minMaxX)
            visi3D.rotationX=Math.PI/2
            if(value==false){
                visi3D.position3d.minMaxX.x=0
                visi3D.position3d.minMaxX.y=3.14
                document.removeEventListener("mouseup", this.mU);
                document.removeEventListener("mousedown", this.mD);
            }else{
                visi3D.position3d.minMaxX.x=Math.PI/2
                visi3D.position3d.minMaxX.y=Math.PI/2
                document.addEventListener("mouseup", this.mU);
                document.addEventListener("mousedown", this.mD);
            }
            
        }        
            
    }
    get boolArrow() { return this._boolArrow; }



  /*  set indexSah(value) {
        if (this._indexSah != value) {
            this._indexSah = value; 
            if(this.dCont) {
            if(this._indexSah==0){
                    this.dCont.visible=true;
                }else{
                    this.dCont.visible=false;
                }
            }
            this.dragSah()
        }

            
    }
    get indexSah() { return this._indexSah; }*/


    set active(value) {
        if (this._active != value) {
            this._active = value;           
            this.pOpen.active=false;
            this.pOpen.active1=false;
            if(this.dCont) {
                if(this._active==true){
                    this.dCont.visible=true;
                }else{
                    this.dCont.visible=false;
                }
            }

            this.dragSah()
        } 

            
    }
    get active() { return this._active; }
}





export class PPointOpen extends MOBaza {
    constructor(par,fun) {  
        super(par,fun);
        var self=this;
        this.type="PPointOpen";
        this.dCont=new DCont(par.par.dCont);
        this.dCont1=new DCont(par.par.dCont);
        this._active1=false;
        this.dCont1.visible = this._active1;
        this._active=false
        this.dCont.visible = this._active;

       
        this._width=800
        this._height=600

        this.image=new DImage(this.dCont,0,0,null,function(){
            this.visible=true;
            this.width=this.picWidth;
            this.height=this.picHeight;
            this.y=-this.height/2;            
        })
        this.image.visible=false;



        this.panel=new DPanel(this.dCont,30,-300);
        this.panel.width=this._width;
        this.panel.height=this._height;


        this.iframe = document.createElement("IFRAME");        
        this.iframe.style.position = 'fixed';
        this.iframe.style.top = '0px';
        this.iframe.style.left = '0px';
        this.iframe.style.width=(this._width-2)+"px";
        this.iframe.style.height=(this._height-2)+"px";
        this.iframe.style.border= '0px solid';         
        this.panel.div.appendChild(this.iframe)





        this.panel=new DPanel(this.dCont1,30,-(32+10)/2);
        this.panel.width=800;
        this.panel.height=32+10;

        this.input=new DInput(this.panel,5,5,"null",function(){
            self.objB.object.info.link=this.value
            self.iframe.src=this.value
            self.par.par.par.locSave.saveTime();
            //self.fun()
        })
        this.input.width=this.panel.width-10

        this.objB;

        this.setIndexBasa= function(objB, tipOpen) {  
            this.objB=objB
            
            if(tipOpen==undefined)return;

            if(tipOpen==0){//открывваем ифрейм
                if(objB.object.info.link==undefined){
                    objB.object.info.link="https://www.gartenmoebel-ludwig.de/grill/gasgrill/napoleon-gasgrill-prestige-500-edelstahl-mit-safety-glow";
                    self.par.par.par.locSave.saveTime();
                }                
                this.active = true;
                this.dCont.x=objB.content2d.x;
                this.dCont.y=objB.content2d.y;   

                this.iframe.src=objB.object.info.link;

            }

            if(tipOpen==1){//открывваем запись в ифрейм
                this.active1 = true;
                if(objB.object.info.link==undefined){
                    objB.object.info.link="https://www.gartenmoebel-ludwig.de/grill/gasgrill/napoleon-gasgrill-prestige-500-edelstahl-mit-safety-glow";
                    self.par.par.par.locSave.saveTime();
                }
                
                this.active1=true;
                this.dCont1.x=objB.content2d.x/s;
                this.dCont1.y=objB.content2d.y/s;
                this.input.text=objB.object.info.link;


                if(objB.object.info.link==undefined){
                    objB.object.info.link="https://www.gartenmoebel-ludwig.de/grill/gasgrill/napoleon-gasgrill-prestige-500-edelstahl-mit-safety-glow";
                    self.par.par.par.locSave.saveTime();
                }                
                this.active = true;
                this.dCont.x=objB.content2d.x/s;
                this.dCont.y=objB.content2d.y/s+30+this._height/2;
                this.iframe.src=objB.object.info.link;
            } 
        }

        var w,h,s
        this.sizeWindow = function(_w,_h,_s){ 
            if(_w){
                w=_w;
                h=_h;
                s=_s;
            }
            if(this._active)this.active=false
            if(this._active1)this.active1=false   
        }
    }
    set active(value) {
        if(value==false)this.active1=false
        if (this._active != value) {
            this._active = value;
            this.dCont.visible = value;            
        } 

    }
    get active() { return this._active; }

    set active1(value) {
        if (this._active1 != value) {
            this._active1 = value;
            this.dCont1.visible = value
        } 

    }
    get active1() { return this._active1; }
}