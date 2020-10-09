



import { AMBaza } from './AMBaza.js';

export class AM0Base extends AMBaza {
  	constructor(par,fun) {  
        super(par,fun);     
  		this.type="AM0Base";
  		var self=this;
        this.fun=fun;

        this._active=false;
        this._indexId=-1;
        this.button=undefined;

        this.widthMenu=par.widthMenu
        this.objBase=undefined
        var wPlus=2200;
        this.kolSig=12; 

        this.dpB=undefined


        this.down= function(s,p){  
                                               
            if(s=="completed")self.fun(s,p.id);//self.indexId=p.id;
            if(s=="preview")self.fun(s,p);
            if(s==undefined){
                self.fun("completed",this.array[this.index].object.id);                
            }
        } 



        

        this.redragProdukts= function(){
            this.gallary.start(this.array);
            let kk=this.array.length
            if(kk>this.kolSig)kk=this.kolSig
            let yy=kk*(this.gallary.heightPic+this.gallary.otstup)+this.gallary.otstup*2           
            this.gallary.height=yy
            if(this.dpB)this.dpB.y=this.gallary.y+this.gallary.height+10

            if(kk!=0)this.indexId=this.array[0].id
            this.sizeWindow();                  
        }


        this.dContXZ=undefined;   
        this.init= function(){
            if(this.dContXZ!=undefined)return;

            



            this.dContXZ = new DCont(this.dCont) 
            this.dContXZ.y=this.indent+this.sizeBase+45;

            
           
            


            let xs=40;

            new DLabel(this.dContXZ,xs,6,"id:")
            this.input=new DInput(this.dContXZ,xs+30,0,"",function(){

            })
            this.input.height=26;
            this.input.width=160
            this.input.timeFun=1;

            let l=new DLabel(this.dContXZ,this.input.x+this.input.width+this.indent+20,6,"Grundrissname:")

            this.input1 = new DInput(this.dContXZ,l.x+130,0,"",function(){

            });
            this.input1.height=26;
            this.input1.width=160
            this.input1.timeFun=1;
            this.button=new DButton(this.dContXZ,this.input1.x+this.input1.width+this.indent+25,0,"Suchen",function(){         
                let ap=[]
                if(self.input.value && self.input.value.length>=1 &&self.input.value!="null"){
                    ap.push("id",self.input.value)
                }
                if(self.input1.value && self.input1.value.length>=1 &&self.input1.value!="null"){
                    ap.push("grundrissname",self.input1.value)
                }
                self.array=self.par.svasBd.getPar(ap) 
                
                self.redragProdukts()
                /*self.objBase.array.push({id:self.input.text*1,grundrissname:self.input1.text,link:{src:"resources/image/startImage.png"},array:[]})
                self.redragProdukts();
                self.fun("saveTime")*/
            });
            this.button.height=26;
            this.button.color="#222222"
            
            this.button.width=160;
            
            this.input.borderRadius=this.input1.borderRadius=this.button.borderRadius=this.minBR

            let siZet=10
            let yy=45
            
            let xs1=191;
            l=new DLabel(this.dContXZ,xs+xs1*0,yy,"ID");
            l.fontSize=siZet
            l=new DLabel(this.dContXZ,xs+115,yy,"GRUNDRISSNAME");
            l.fontSize=siZet
            l=new DLabel(this.dContXZ,xs+345,yy,"STETUS");
            l.fontSize=siZet
            l=new DLabel(this.dContXZ,xs+512,yy,"AKTIONEN");
            l.fontSize=siZet

           

            this.gallary = new DGallT(this.dCont,0,this.dContXZ.y+60,this.down,this)
            this.gallary.widthMenu=this.widthMenu
            this.gallary.kolII=1;
            this.gallary.widthPic=this.widthMenu+wPlus*2-4;
            this.gallary.heightPic=34;
            this.gallary.width=this.widthMenu+wPlus*2;
            this.gallary.height=500;            
            this.gallary.otstup=2; 
            this.gallary.wPlus=wPlus; 
            //this.gallary.panel.visible=false;  
            this.gallary.minBR=this.minBR


            let kk=Math.ceil(this.par.svasBd.getKol()/this.kolSig);           
            if(kk>=2){
                this.dpB = new DPanel(this.dCont,0,0);
                this.dpB.borderRadius=this.minBR;
                this.dpB.height=360
                var sb=[]
                for (var i = 0; i < kk; i++) {
                    sb[i]=this.button=new DButton(this.dpB.content,34*i,2,""+i,function(){         
                        self.open(this.text*self.kolSig)
                        for (var j = 0; j< sb.length; j++) {
                            sb[j].alpha=1
                        }
                        this.alpha=0.75
                    });              
                    this.button.color="#222222"
                    this.button.borderRadius=this.minBR
                    this.button.width=this.button.height=32;
                } 
                this.dpB.height=36
                this.dpB.width=34*kk+2

            }

            this.open(0);
            
        }


         
        this.array=[]
        this.open=function(sah){
            this.array=this.par.svasBd.getArr(sah, this.kolSig)            
            this.redragProdukts()

        }


        

        




        var w,h,s;
        this.sizeWindow = function(_w,_h,_s){             
            if(_w){
                w=_w;
                h=_h;
                s=_s;
            }  
            this.gallary.x=-wPlus+(w/s-this.widthMenu)/2;
            this.dContXZ.x=(w/s-this.widthMenu)/2;

            if(this.dpB)this.dpB.x=(w/s-this.dpB.width)/2;
                    
        }
  	}

    set indexId(value) {
        if (this._indexId != value) {
            this._indexId = value;  
          
            for (var i = 0; i < this.array.length; i++) {
                
                if(this.array[i].id==this._indexId){
                    this._index=-1;
                    this.par.setObj(this.array[i])
                    this.index=i;
                    return
                }
            }                               
        }             
    }
    get indexId() { return this._indexId; }  

    set index(value) {
        if (this._index != value) {
            this._index = value;  
            this.gallary.index=value                               
        }             
    }
    get index() { return this._index; }
}






function DGallT(dCont, _x, _y, _fun,par) {
    DGallery.call(this, dCont, _x, _y, _fun);
    this.widthMenu=par.widthMenu;               
    this.type="DGallT"; 
    this.wPlus=0
    this.minBR=4
    this.createZamen=function(){            
        var r=new BoxXZ(this.content, 0, 0, this.downBtn, this);            
        return r;
    }    
}
DGallT.prototype = Object.create(DGallery.prototype);
DGallT.prototype.constructor = DGallT;

Object.defineProperties(DGallT.prototype, {

   /* index: {// Активный элемент
        set: function (value) {
            
            if (this.array[value] != undefined) {
                this.korektPoIndex(value);
            }
            
            this._index = value;
           

            for (var i = 0; i < this.array.length; i++) {
                if (this._index == i) this.array[i].activ = true;
                else this.array[i].activ = false;
            }

        },
        get: function () {
            return this._index;
        }
    },*/
})



function BoxXZ(dCont, _x, _y, _fun, par) {
    DBox.call(this, dCont, _x, _y, _fun);
    this.type = 'BoxXZ';
    var self=this;
    this.par=par;

    this.label.div.style.pointerEvents="none";
    this.label.textAlign="center";
    this.label.color="#000000"
    
    this.label.x=this.par.wPlus+148
    this.label.y=10
    this.panel.boolLine=false

    this.chek=new DCheckBox(this.content, this.par.wPlus,0," ",function(){

    });
    this.chek.label.x=40;
    this.chek.label.color="#000000"
    this.label.color="#000000"

    this.chek.panel.dCont.div.style.border= '2px solid #222222';
    this.chek.remove(this.chek.panel1)
    this.chek.panel1=new DImage(this.chek,4,8,"resources/image/galka.png",function(){

    })
    this.chek.panel1.width=23*0.7
    this.chek.panel1.height=18*0.7
    this.chek.panel1.alpha=0.2
    this.chek.panel1.div.style.cursor="pointer";






    this.button=new DButton(this.content, this.par.wPlus+320,2,"completed",function(){
        self.par.fun("completed",self.object)
    });
    this.button.width=160;
    this.button.color="#10bf10";
    this.button.borderRadius=this.par.minBR
    

    this.l=new DLabel(this.content, 0,8,"Preview") 
    this.l.color="#000000";
    this.l.dCT.div.style.contenteditable="true" 



    this.button1=new DButton(this.content, 0,2,"",function(){
        self.par.fun("preview",self.object)
    });
    this.button1.width=160;
    
    //this.button1.label.color="#000000"
    
    this.label.color=dcmParam.colorText1;
    this.button1.x=this.par.wPlus+this.par.widthMenu-this.button1.width+30;
    this.button.height=this.button1.height=par.heightPic-8;
    this.l.x= this.button1.x+20
    
    //this.button1.panel.visible=false
    this.button1.alpha = 0.01;

    let pp=new DPanel(this.content, this.l.x,this.l.y+18) 
    pp.width=65;
    pp.height=3
    pp.color="#000000";
    pp.boolLine=false

    this.startLoad = function (_obj) {  
        
        this.object = _obj;
        this.label.text= _obj.grundrissname
        this.label.visible=true
        this.chek.text=_obj.id+"";
        this.draw();
        self.funLoad();
    };
    var ss
    this.draw = function () {
        this.image.visible=false;

    };



    if(dcmParam.mobile==false){

        this.panel.div.removeEventListener("mouseout", this.mouseOut);
        this.image.image.removeEventListener("mouseout", this.mouseOut);

        this.panel.div.removeEventListener("mouseover", this.mouseOver);
        this.image.image.removeEventListener("mouseover", this.mouseOver); 
    }

   /* this.mouseOver = function (e) {
        self.boolOut = false;
        
        if(self._activ==false)self.panel.color1=dcmParam.compToHexArray(dcmParam.hexDec(self._color1), -5);
        else self.panel.color1=dcmParam.compToHexArray(dcmParam.hexDec(self._color), -5);
        if (self.funOver) self.funOver(self);
    };
    this.mouseOut = function (e) {      
        
        if(self._activ==false)self.panel.color1=self._color1;
        else self.panel.color1=self._color;

        if (self.funOut) self.funOut(self);
    };



    if(dcmParam.mobile==false){

        this.panel.div.addEventListener("mouseout", this.mouseOut);
        this.image.image.addEventListener("mouseout", this.mouseOut);

        this.panel.div.addEventListener("mouseover", this.mouseOver);
        this.image.image.addEventListener("mouseover", this.mouseOver);  

    }*/




}
BoxXZ.prototype = Object.create(DBox.prototype);
BoxXZ.prototype.constructor = BoxXZ;

Object.defineProperties(BoxXZ.prototype, {
    activ: { // активный элемент
        set: function (value) {
            if (this._activ == value) return;
            this._activ = value;
           // this._color=this._color1;
          

            if(this._activ){
                //this.image.link=this.object.src;
                //this.label.color="#93c32f"
            }else{
                //this.image.link=this.object.src1;
                //this.label.color="#000000"
            }

            if(this._activ==false)this.panel.color1=this._color1;
            else this.panel.color1=this._color;

        },
        get: function () {
            return this._activ;
        }
    },
})
