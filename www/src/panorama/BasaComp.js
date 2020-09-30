


export class BasaComp  {
  	constructor(par, fun) {  		
  		this.type="BasaComp";
  		var self=this;
  		global.basaComp=this;

        this.par=par;
        this.fun=fun;        

        var b=false;

        //this.par.objectBase=null

        if(this.par.objectBase==null){
            this.par.objectBase = {};
            b=true;
        }
        var ob=this.par.objectBase;

        //сцены
        if(ob.scene==undefined){ob.scene={};b=true} 
        if(ob.scene.bottom==undefined){
            ob.scene.bottom={}
            ob.scene.bottom.src="resources/image/plus.png";

            ob.scene.point={}
            ob.scene.point.src="resources/image/picPoint.png";

            ob.scene.hero={}
            ob.scene.hero.src="resources/image/picHero.png";
            b=true
        }
        //понорамы
        if(ob.scene.array==undefined){
            ob.scene.array=[];
            b=true
        }



        //наполнение тегов
        if(ob.teg==undefined){ob.teg=[];b=true}




        //точки на понорамах
        if(ob.points==undefined){ob.points={};b=true}
        if(ob.points.array==undefined){
            ob.points.array=[];
            b=true
        }
        //if(ob.points.link==undefined){ 
            ob.points.link="resources/image/eye.png";
        //b=true}

        if(ob.points.at==undefined){

           /* ob.points.at=[]
            ob.points.at.push({ wh:40, radius:18, aPic:["resources/image/b0.png","resources/image/b1.png","resources/image/b2.png","resources/image/b3.png"]});
            ob.points.at.push({ wh:20, radius:8, aPic:["resources/image/b0.png","resources/image/b1.png","resources/image/b2.png","resources/image/b3.png"]});
            ob.points.at.push({ wh:20, radius:8, aPic:["resources/image/b0.png","resources/image/b1.png","resources/image/b2.png","resources/image/b3.png"]}); */           
            //b=true;
        }


        if(ob.settings==undefined){ob.settings={};b=true}
        if(ob.settings.zume==undefined){ob.settings.zume=2500;b=true}
        if(ob.settings.indent==undefined){ob.settings.indent=5;b=true}
        if(ob.settings.sizeBase==undefined){ob.settings.sizeBase=100;b=true}

        if(ob.settings.glowSah==undefined){ob.settings.glowSah=5;b=true}
        if(ob.settings.fontSize==undefined){ob.settings.fontSize=14;b=true}
        if(ob.settings.radius==undefined){ob.settings.radius=10;b=true}
        if(ob.settings.color==undefined){ob.settings.color="#f6f4f5";b=true}
        if(ob.settings.colorText==undefined){ob.settings.colorText="#000000";b=true}
        if(ob.settings.colorAct==undefined){ob.settings.colorAct="#93c32f";b=true}
        if(ob.settings.colorTextAct==undefined){ob.settings.colorTextAct="#f6f4f5";b=true} 

        if(ob.settings.glowColor==undefined){ob.settings.glowColor="#000000";b=true}  




        if(b){//конфиг недополнен либо отсутствует
            setTimeout(function() {                
                self.fun("saveTime")
            }, 1);
        }








        this.arrComp=[]
        this.addComp=function(comp, bool){
            this.arrComp.push(comp);
            
            if(bool)return;
            comp.color=ob.settings.color;
            comp.colorText=ob.settings.colorText;            

            comp.fontSize=ob.settings.fontSize;

            comp.glowColor=ob.settings.glowColor
            comp.boolLine=false
            comp.glowSah=ob.settings.glowSah;

            

            comp.image2=new DImage(comp.dCont)
            comp.image2.visible=false;
            comp.image2.div.style.pointerEvents="none";
            comp.funLoadImag=function(){
                self.drawPic(this)
                // this.image2.width=this.image.width;
                // this.image2.height=this.image.height;
                // this.image2.x=this.image.x;
                // this.image2.y=this.image.y; 
                
                // var bitmap=new DBitmapData(this.image.picWidth, this.image.picHeight)               
                
                // bitmap.ctx.drawImage(this.image.image, 0, 0);
                // bitmap.imgData = bitmap.ctx.getImageData(0, 0, bitmap.width, bitmap.height); 
                // let a
                // let b=[255,255,255,255];

                // for (var i = 0; i < bitmap.width; i++) {
                //     for (var j = 0; j < bitmap.width; j++) {
                //         a=bitmap.getPixel(i, j)
                //         b[3]=a[3];
                //         bitmap.setPixel(i, j, b);
                //     }
                // }
                // bitmap.upDate();
                // this.image2.link=bitmap.canvas.toDataURL("image/png");


                comp.funLoadImag=undefined;
            }

            comp.funReDrag=function(){
                if(this.image){
                    this.image2.width=this.image.width;
                    this.image2.height=this.image.height;
                    this.image2.x=this.image.x;
                    this.image2.y=this.image.y;
                }
                
            }

            comp._activeVisi=false;

            comp.setActive = function(_activeVisi){
                if(_activeVisi!==this._activeVisi){
                    this._activeVisi=_activeVisi;
                    this.glowSah=ob.settings.glowSah;
                    this.fontSize=ob.settings.fontSize;                                       
                    if(this._activeVisi==true){                        
                        this.color=ob.settings.colorAct;
                        this.colorText=ob.settings.colorTextAct;
                        
                    }else{
                        this.color=ob.settings.color;
                        this.colorText=ob.settings.colorText;
                    }                    
                    if(this.image!=undefined){
                        if(comp.notPic)return
                        this.image2.visible=this._activeVisi
                        this.image.visible=!this._activeVisi
                    }

                }
            }
        }


        this.parseColor = function (color) {
            var cache = /^#([\da-fA-F]{2})([\da-fA-F]{2})([\da-fA-F]{2})/.exec(color);           
            return {r: parseInt(cache[1], 16), g: parseInt(cache[2], 16), b: parseInt(cache[3], 16)};
        }

        var bitmap=new DBitmapData(2,2) 

        var aCol=this.parseColor(ob.settings.color)

        this.drawPic=function(comp){
            if(comp.notPic)return

            if(comp.image)if(comp.image2){
                comp.image2.width=comp.image.width;
                comp.image2.height=comp.image.height;
                comp.image2.x=comp.image.x;
                comp.image2.y=comp.image.y; 
                
                //var bitmap=new DBitmapData(comp.image.picWidth, comp.image.picHeight) 
                bitmap.width= comp.image.picWidth;
                bitmap.height= comp.image.picHeight;             
                bitmap.ctx.clearRect(0, 0, bitmap.width, bitmap.height);
                bitmap.ctx.drawImage(comp.image.image, 0, 0);
                bitmap.imgData = bitmap.ctx.getImageData(0, 0, bitmap.width, bitmap.height); 
                let a;
                aCol=self.parseColor(ob.settings.color)
                let b=[aCol.r,aCol.g,aCol.b,255];

                for (var i = 0; i < bitmap.width; i++) {
                    for (var j = 0; j < bitmap.width; j++) {
                        a=bitmap.getPixel(i, j)
                        b[3]=a[3];
                        bitmap.setPixel(i, j, b);
                    }
                }
                bitmap.upDate();
                comp.image2.link=bitmap.canvas.toDataURL("image/png");
            }
        }


        this.setParebComp=function(s,p){            
            ob.settings[s]=p;
            for (var i = 0; i < this.arrComp.length; i++) {
                if(this.arrComp[i]._activeVisi!=undefined){
                    let b=this.arrComp[i]._activeVisi
                    this.arrComp[i]._activeVisi="f";
                    this.arrComp[i].setActive(b)
                }                
            }

            //trace(s,p)
            if(s=="color"){
                for (var i = 0; i < this.arrComp.length; i++) {
                    if(this.arrComp[i].type=="DButton"){
                        this.drawPic(this.arrComp[i])
                    }
                } 
            }
            if(s=="indent"||s=="sizeBase")sizeWindow()
            

            
        }

        this.setPInComp=function(s,p){            
            ob.settings[s]=p;
            for (var i = 0; i < this.arrComp.length; i++) {
                if(this.arrComp[i][s])this.arrComp[i][s]=p  


            }
            this.setParebComp(s,p)



            self.fun("saveTime")
            self.fun("render")
            


            


            setTimeout(function() {
                self.fun("render")
            }, 100);
        }


  	}
}


