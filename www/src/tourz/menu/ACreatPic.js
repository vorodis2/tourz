



import { AMBaza } from './AMBaza.js';
import { TView } from '../tView/TView.js';

export class ACreatPic extends AMBaza {
  	constructor(par,fun) {  
        super(par,fun);     
  		this.type="AM2Assign";
  		var self=this;
        this.fun=fun;
        this._index=-1;
        this.otstup=7
        this._active=false;
        this.widthMenu=par.widthMenu 

        this.array=[];       
        this.arrayCh=[]; 

        this.dCont = new DCont(par.dCont)

        this.panel=undefined

        this.init=function(){
            if(this.panel!=undefined)return

            this.panel1=new DPanel(this.dCont,0,0) 
            this.panel1.color="#222222";  
            this.panel1.alpha=0.7; 



            this.panel=new DPanel(this.dCont,0,0)
            this.panel.boolLine=false
            this.panel.borderRadius =this.bRadius;
            this.panel.glowSah=1;
            this.panel.glowColor=this.glowColor;
            this.panel.color="#fafafa";



            

            this.tView = new TView(function(s,p){            
            
            });
            this.dCV = new DCont(this.panel.content) 
            this.dCV.x= this.otstup+5
            this.dCV.y= this.otstup+5       
            this.dCV.div.appendChild(this.tView.div);
            this.tView.active=false;
            this.dCV.x= self.bRadius;
            this.dCV.y= self.bRadius; 

            this.button=new DButton(this.panel.content, 0,0,"SAVE",function(s){
                self.seve()
            });
            this.button.width=160;        
            this.button.color="#222222";
            this.button.borderRadius=this.minBR;
            this.button.visible=false


            this.image = new DImage(this.panel.content, this.otstup, this.otstup,"resources/image/w3.png",function(){
                this.width=this.picWidth;
                this.height=this.picHeight;
                self.tView.sizeWindow(this.width-10, this.height-10);

                

                self.panel.width=this.width+self.bRadius*2
                self.panel.height=this.height+self.bRadius*2+52

                self.button.visible=true
                self.button.x=self.panel.width-10-self.button.width-12
                self.button.y=self.panel.height-55


                
                self.sizeWindow()
            })
            this.image.div.style.pointerEvents="none";

        } 


        this.seve=function(){
            var w=self.tView.w;
            var h=self.tView.h;


            var ww=160*2
            var hh=130*2

            self.tView.sizeWindow(ww, hh);
            self.tView.visi3D.render();
            var b64=self.tView.visi3D.renderer.domElement.toDataURL("image/png");


            self.tView.sizeWindow(w, h);
            self.tView.visi3D.render();

            if(self.funSF!=undefined){
                self.funSF(b64,self.base64)
                self.active=false;
                self.tView.active=false;
            }
        }



        this.funSF=undefined
        this.file=undefined
        this.base64=undefined


        this.setFile = function(_file,_base64, _fun){ 
            this.funSF=_fun
            this.file=_file
            this.base64=_base64
            this.init()  
            this.active=true;
            
            this.sizeWindow();
            this.tView.active=true;
            this.tView.link=_base64;
        }



        var w,h,s;
        this.sizeWindow = function(_w,_h,_s){             
            if(_w){
                w=_w;
                h=_h;
                s=_s;
            } 
            if(this.panel!=undefined){
                this.dCont.x=(w/s-this.panel.width)/2;
                this.dCont.y=(h/s-this.panel.height)/2;

                this.panel1.width=(w/s);
                this.panel1.x=-(w/s)/2+this.panel.width/2;

                this.panel1.height=(h/s);
                this.panel1.y=-(h/s)/2+this.panel.height/2;

            }                      
        }
  	}


    //index
    set index(value) {
        if (this._index != value) {
            this._index = value;           
       

        }             
    }
    get index() { return this._index; }  
}
