

/*
*/
import { TView } from './TView.js';

export class TVDebug  {
  	constructor(fun) {  		
  		this.type="TVDebug";
  		var self=this;
        this.fun=fun;         


        window.dcmParam = new DCM();

       


        this.dCont=new DCont(document.body);

        this.tView = new TView(function(s,p){            
            if(s=="fun_rotationZ")self.fun(s,p);
        });
        
        this.dCV = new DCont(this.dCont)
        this.dCV.y=20
        this.dCV.div.appendChild(this.tView.div);



        this.menu=new TVDMenu(this,this.tView)


        this.sizeWindow = function(w,h,s) {  

            this.menu.sizeWindow(w,h,s)
        }        
  	} 
}

export class TVDMenu {
    constructor(par,tView,fun) {          
        this.type="TVDebug";
        var self=this;
        this.par=par;  
        this.tView=tView;  
        this.fun=fun; 

        this.widthMenu=250;
        this.otstup=10;
        this.wh=64;

        this.dCont=new DCont(par.dCont);
        this.window=new DWindow(this.dCont,this.widthMenu+this.otstup*2,this.otstup,"TView");
        this.window.content.div.appendChild(this.tView.div);



        this.pObject=new DParamObject(par.dCont,2,this.otstup,function(){         
         
        });
        this.pObject.width=  this.widthMenu
        this.pObject.addObject(tView); 




        var yy=200;
        for (var i = 0; i < 3; i++) {
            let b= new DButton(this.pObject.w.content,4+(this.wh+4)*i,yy,"",function(){
                self.tView.link="resources/image/ponoram/"+this.idArr+".jpg";
            },"resources/image/ponoram/"+i+".png");
            b.idArr=i
            b.width=b.height=this.wh
        }

        yy+=(this.wh+6);

        var slid=new DSliderBig(this.pObject.w.content,2,yy,function(){
            self.tView.sigment.stepWidth=this.value;
        },"stepWidth",1,10)
        slid.value=self.tView.sigment.stepWidth
        slid.okrug=1
        slid.width=this.widthMenu-6
        yy+=50;

        var slid1=new DSliderBig(this.pObject.w.content,2,yy,function(){
            self.tView.sigment.stepHeight=this.value;
        },"stepHeight",1,10)
        slid1.value=self.tView.sigment.stepHeight
        slid1.okrug=1
        slid1.width=this.widthMenu-6;
        yy+=50;

        this.pObject.w.height=yy+32  




        this.sizeWindow = function(w,h,s) { 
            this.window.x=this.widthMenu+this.otstup;
            this.window.y=this.otstup;
            this.window.width=w-this.widthMenu-this.otstup*2;
            this.window.height=h-this.otstup*2;
            this.tView.sizeWindow(this.window.width, this.window.height-32);

        }        


    }
}