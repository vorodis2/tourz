

import { MOBaza } from './MOBaza.js';

export class PSetings extends MOBaza {
    constructor(par,fun) {  
        super(par,fun);
        this.type="PSetings";

        var self=this;

        
        if(mainBig.debugDev==false)return

        this.dCont=new DCont(par.dCont);

        this.window=new DWindow(this.dCont,20,100,"PSetings",function(){

        })
        this.window.width=200;
        

        var yy=this.otstup;
        this.array=[]

        this.array[ this.array.length]=new DSliderBig(this.window.content,this.otstup,yy,function(){
            visi3D.zume=this.value
            basaComp.setPInComp("zume", this.value);
        },"zume", 0,10000);
        this.array[ this.array.length-1].okrug=1
        this.array[ this.array.length-1].width=this.window.width-this.otstup*2
        this.array[ this.array.length-1].value=visi3D.zume;
        yy+=45;


        this.array[ this.array.length]=new DSliderBig(this.window.content,this.otstup,yy,function(){
            basaComp.setPInComp("indent", this.value);
        },"indent", 1,25);
        this.array[ this.array.length-1].okrug=1
        this.array[ this.array.length-1].width=this.window.width-this.otstup*2
        this.array[ this.array.length-1].value=mainBig.objectBase.settings.indent;
        yy+=45;


        this.array[ this.array.length]=new DSliderBig(this.window.content,this.otstup,yy,function(){
            basaComp.setPInComp("sizeBase", this.value);
        },"sizeBase", 24,200);
        this.array[ this.array.length-1].okrug=1
        this.array[ this.array.length-1].width=this.window.width-this.otstup*2
        this.array[ this.array.length-1].value=mainBig.objectBase.settings.sizeBase;
        yy+=45;     


        this.array[ this.array.length]=new DSliderBig(this.window.content,this.otstup,yy,function(){           
            basaComp.setPInComp("glowSah", this.value);
        },"glowSah", 0,20);
        this.array[ this.array.length-1].okrug=1
        this.array[ this.array.length-1].width=this.window.width-this.otstup*2
        this.array[ this.array.length-1].value=mainBig.objectBase.settings.glowSah
        yy+=45;

        this.array[ this.array.length]=new DSliderBig(this.window.content,this.otstup,yy,function(){           
            basaComp.setPInComp("fontSize", this.value);
        },"fontSize", 10,32);
        this.array[ this.array.length-1].okrug=1
        this.array[ this.array.length-1].width=this.window.width-this.otstup*2
        this.array[ this.array.length-1].value=mainBig.objectBase.settings.fontSize
        yy+=45;

        this.array[ this.array.length]=new DSliderBig(this.window.content,this.otstup,yy,function(){           
            basaComp.setPInComp("radius", this.value);
        },"radius", 1,50);
        this.array[ this.array.length-1].okrug=1
        this.array[ this.array.length-1].width=this.window.width-this.otstup*2
        this.array[ this.array.length-1].value=mainBig.objectBase.settings.radius
        yy+=45;


        this.array[ this.array.length]=new DColor(this.window.content,this.otstup,yy, mainBig.objectBase.settings.color,function(){
            basaComp.setPInComp("color", this.value);
        });
        this.array[ this.array.length-1].width=this.window.width-this.otstup*2
        yy+=34;


        this.array[ this.array.length]=new DColor(this.window.content,this.otstup,yy, mainBig.objectBase.settings.colorText,function(){            
            basaComp.setPInComp("colorText", this.value);
        });
        this.array[ this.array.length-1].width=this.window.width-this.otstup*2
        //this.array[ this.array.length-1].value=visi3D.zume
        yy+=34;

        this.array[ this.array.length]=new DColor(this.window.content,this.otstup,yy, mainBig.objectBase.settings.colorAct,function(){            
            basaComp.setPInComp("colorAct", this.value);
        });
        this.array[ this.array.length-1].width=this.window.width-this.otstup*2
        //this.array[ this.array.length-1].value=visi3D.zume
        yy+=34;

        this.array[ this.array.length]=new DColor(this.window.content,this.otstup,yy, mainBig.objectBase.settings.colorTextAct,function(){            
            basaComp.setPInComp("colorTextAct", this.value);
        });
        this.array[ this.array.length-1].width=this.window.width-this.otstup*2
        //this.array[ this.array.length-1].value=visi3D.zume
        yy+=34;

        this.array[ this.array.length]=new DColor(this.window.content,this.otstup,yy, mainBig.objectBase.settings.glowColor,function(){            
            basaComp.setPInComp("glowColor", this.value);
        });
        this.array[ this.array.length-1].width=this.window.width-this.otstup*2
        //this.array[ this.array.length-1].value=visi3D.zume
        yy+=34;


        this.window.height=32+yy;
        this.window.minimize=true;


    }
}

