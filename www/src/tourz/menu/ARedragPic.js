



import { AMBaza } from './AMBaza.js';


export class ARedragPic extends AMBaza {
  	constructor(par,fun) {  
        super(par,fun);     
  		this.type="ARedragPic";
  		var self=this;
        this.fun=fun;

        this._index=-1;
        this.otstup=12
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

            this.button=new DButton(this.panel.content, 0,0,"SAVE",function(s){
                trace(self.object)
                self.object.link.rect.x=self.dHole.rect.x;
                self.object.link.rect.y=self.dHole.rect.y;
                self.object.link.rect.width=self.dHole.rect.width;
                self.object.link.rect.height=self.dHole.rect.height;


                self.fun("save",self.object)
                self.active=false; 
            });
            this.button.width=160;        
            this.button.color="#222222";
            this.button.borderRadius=this.minBR;
            

            
            this.image=new DImage(this.panel.content,this.otstup,this.otstup,null,this.complitImage)
            
            this.dHole=new DHole(this.panel.content,this.otstup,this.otstup,null,this.dragObj)
            this.dHole.colorButton="#222222";
            this.dHole.colorAct="#222222";
            this.dHole.borderRadius=this.bRadius;
        } 

        this.dragObj= function(){ 

        }

        this.complitImage= function(){ 
            this.width=this.picWidth;
            this.height=this.picHeight;

           

            self.panel.width= this.width+self.otstup*2;
            self.panel.height= this.height+self.otstup*3+self.button.height;
            self.button.x=self.panel.width-self.otstup-self.button.width;
            self.button.y=self.panel.height-self.otstup-self.button.height;


            self.dHole.width= this.width;
            self.dHole.height= this.height;

            if(self.object.link.rect == undefined){
                self.object.link.rect={x:0,y:0,width:this.width,height:this.height};
                
            }
            self.dHole.setRect(
                self.object.link.rect.x,
                self.object.link.rect.y,
                self.object.link.rect.width,
                self.object.link.rect.height
            )

            self.sizeWindow();
        }


        this.link
        this.object=undefined
        this.setLink = function(_obj){ 
            this.object=_obj
            this.init(); 

            this.link=this.object.link.src;
            this.image._link="nullXZ"
            this.image.link=this.link;
             
            this.active=true;            
            this.sizeWindow();
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
