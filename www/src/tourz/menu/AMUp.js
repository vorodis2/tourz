/**

*/

export class AMUp  {
    constructor(par,fun) {       
        this.type="PMap";
        var self=this;//Переключение
        this.fun=fun;
        this.par=par
        this._open=false;
        this._index=-1;
        this.otstup=par.otstup
        this.time=this.par.time//ереход с одной какртинке к другой
        this.bRadius=this.par.bRadius
        this.colorAct=this.par.colorAct
        this.indent=par.indent//Расстояние между блоками;
        this.sizeBase=par.sizeBase//Размер картинки;
        this.widthBlok=this.sizeBase*1.33//Ширина блока;

        this.pBig=new DPanel(par.dCont)
        //this.pBig.alpha=0
        this.pBig.color="#fafafa"

        this.dCont = new DCont(par.dCont);// Блоки, контент
        this.dCont1 = new DCont(this.dCont);// Блоки, контент
        this.tween = new TWEEN.Tween(this.dCont1);



        // Массив блоков      
        var arr=[
            {src:"resources/image/y0.png",src1:"resources/image/y0_.png",text:"Choose Floorplan"},
            {src:"resources/image/y1.png",src1:"resources/image/y1_.png",text:"Upload Panoramas"},
            {src:"resources/image/y2.png",src1:"resources/image/y2_.png",text:"Assign Panoramas"},
            {src:"resources/image/y3.png",src1:"resources/image/y3_.png",text:"Publish"}
        ]

        
        //pic3 - Картинка, которой уже нет
        this.sob = function(s, p){  
            self.fun("index",this.idArr)/*Переключение 3-ей картинки между контентом*/
        } 
        this.pBig.div.addEventListener("mousedown", function(){ 
            self.fun("animatActiv")
        })    

        

        this.array=[]
        for (var i = 0; i < arr.length; i++) {
            this.array[i]=new AMUButton(this,i,arr[i],this.sob);//Отображение блоков
        }

       

        this.animatActiv=function(){
            for (var i = 0; i < this.array.length; i++) {   
                if(this.array[i].active==true)continue
                this.array[i].animat()   
            }
        }

        var w,h,s;
        this.sizeWindow = function(_w,_h,_s){             
            if(_w){
                w=_w;//Ширина экрана
                h=_h;//Высотаа экрана
                s=_s;//Диагональ экрана
            }

            this.dCont.x= (w / 2/s-this.widthBlok/2)
            //this.button.panel.color1 = "#585858"; //Цвет блока
            //this.button.label.colorText1 = "black";//Цвет шрифта

            this.pBig.width=w/s;
            this.pBig.height=h/s;
        }
    }


    set index(value) {
        if (this._index != value) { //Настройка картинки. Если не выбрано.
            this._index = value; //Настройка картинки. Если выбрано.
            let p = 0;
            for (var i = 0; i < this.array.length; i++) {               
                if(i==value){
                    this.array[i].active=true;
                    p=i;
                }
                else this.array[i].active=false;            
            }
           
            this.tween.stop();
            this.tween.to({x:-(this.widthBlok+this.indent)*p},this.time).start();
        }
    }
    get index() { return this._index; }
}

/**

*/
class AMUButton  {
    constructor(par,idArr,obj,fun) {  
        this.type="AMUButton";
        this.par=par;
        this.idArr=idArr;//Счётчик комитов
        this.fun=fun;
        this.obj=obj;
        var self=this;
        var ss=this.par.bRadius
        this.colorAct=this.par.colorAct
        this.time=this.par.time*2
        this._active=false;

        this.sizeBase=par.sizeBase;//Высота синих блоков
        this.widthBlok=par.widthBlok;//Ширина синих блоков
        this.indent=par.indent;//Расстояние между блоками
        /**
        & обьявление класса кнопки
        * dCont : контейнер куда цепляем нашу кнопку //par.dCont1 - это штука в другом контейнере по середине
        * x : положение по х
        */
        trace("this.par.otstup",this.par)
        this.dCont=new DCont(par.dCont1)
        this.dCont.x=idArr*(this.widthBlok+this.par.otstup)

        this.panel=new DPanel(this.dCont);
        this.panel.alpha=0

        this.button=new FDButton(this.dCont,0,0,obj.text,function(){
            self.fun();/*Создание button*/
        }/*,obj.src*/);/*Добавление функции*/


      
        this.button.loadImeg(obj.src)


        this.button.width=this.widthBlok;
        this.button.height=this.sizeBase;

        this.panel.width=this.widthBlok;
        this.panel.height=this.sizeBase;
        this.panel.boolLine = false;
        this.panel.color=this.colorAct

        this.button.panel.dCont.div.style.borderRadius="0 0 "+ss+"px "+ss+"px";
        this.button.panel1.dCont.div.style.borderRadius="0 0 "+ss+"px "+ss+"px";
        this.panel.div.style.borderRadius="0 0 "+ss+"px "+ss+"px";

        
        this.button.boolFond=false     
        this.button.color = "#222222"; //Цвет поля
        this.button.colorText = dcmParam.colorText1; 
        this.button.boolLine = false;
        this.button.label.bold=false
        this.button.label.fontSize=15


        

        this.tween = new TWEEN.Tween(this.panel);


        this.animat=function(){
            this.panel.alpha=1;
            this.tween.stop();       
            this.tween.to({alpha:0},this.time).start();       
        }
    }

    set active(value) {
        if (this._active != value) {//Если картинка не выбрана
            this._active = value;//Если картинка выбрана
            this.tween.stop()
   

      
            
            if(value){                
                this.button.loadImeg(this.obj.src1); //Картинка
                //this.button.color = "#222222"; //Цвет шрифта
                this.button.colorText = "#ffffff";
                this.button.label.bold=true
                this.button.boolFond=true 
            }else {
                this.button.loadImeg(this.obj.src); //Картинка
                //this.button.color = "#ffffff"; //Цвет поля
                this.button.colorText = dcmParam.colorText1;  
                this.button.label.bold=false
                this.button.boolFond=false    
                
            } 
                                    
        }
    }
    get active() { return this._active;}//Читаю this._active    

}


export class FDButton extends DButton  {//Объект
    constructor(dCont, x, y, text, fun, _link) { //Функция   
        super(dCont, x, y, text, fun, _link);
        
        var self=this
        var sp=5;

        var otI=20;

        var ww,ww1
        //this.image=undefined;
        this.reDrag=function(){
            this.panel.width=this._width-1;
            this.panel1.width=this._width+1;

            this.panel.height=this._height-1;
            this.panel1.height=this._height+1;
            
           
            sp=5
            var s
            if(this.image!=undefined){                
                s=this._height/(this.image.picHeight-otI*2);
                if(this._width/(this.image.picWidth-otI*2)<s)s=(this._width/this.image.picWidth-otI*2)

                this.image.height=this.image.picHeight*s;
                this.image.width=this.image.picWidth*s;                 
                sp=this.image.width+5
                if(self.label.value.length>=1){
                    this.image.x= 0;          
                    this.image.y= 0;                    
                }else{
                    this.image.x= (this._width-this.image.width)/2;          
                    this.image.y= (this._height-this.image.height)/2;
                }       
            }
            let b=true;

            if(this.image!=undefined){
                if(this._height>self.label.fontSize*3){
                    if(self.label.value.length>=1){
                        b=false;
                    }                   
                }
            }
            if(this.boolDrahVert==false)b=true;
           
            if(b){
                this.label.width=this._width-sp;
                self.label.y = (this._height-this._fontSize)/2
                self.label.x = sp;
            }else{

                s=(this._height-self.label.fontSize*2-otI*2)/(this.image.picHeight);
                if((this._width-otI*2)/this.image.picWidth<s)s=(this._width-otI*2)/this.image.picWidth

               /* s=(this._height-self.label.fontSize*2)/this.image.picHeight;
                if(this._width/this.image.picWidth<s)s=this._width/this.image.picWidth*/

                this.image.height=this.image.picHeight*s;
                this.image.width=this.image.picWidth*s; 

                this.image.x= (this._width-this.image.width)/2;
                this.image.y= otI ; 

                this.label.width=this._width;
                self.label.y = this._height-this._fontSize*1.5
                self.label.x = 0;
                    
                
            }   
            
            this.dragCanvas();
            if(this.funReDrag!=undefined)this.funReDrag()
        }


     

    }
}