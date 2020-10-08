


export class ButTu  {
    constructor(dC,a,t,fun,wh) {          
        this.type="ButTu";
        var self=this;
        this.fun=fun
        this.arr=a;

        this.wh=wh;
        this._active=false;
        this.dCont=new DCont(dC);

        

        this.batton=new DButton(this.dCont,0,0," ",function(){
            self.active=!self.active;
            self.fun()
        },this.arr[0])
        this.batton.width=this.batton.height=this.wh

        this.batton.panel1.alpha=0;
        this.batton.panel.alpha=0;


        


        this.label=new DLabel(this.dCont,this.wh+5,(this.wh-18)/2,t)
        this.label.width=200
        this.label.div.style.pointerEvents="none";
        this.label.color="#ffffff"

        this.label.glowSah=3
        this.label.glowColor="#000001"
        //this.label.bold=true


    }
    set active(value) {
        if (this._active != value) {
            this._active = value;
            if(value){
                this.batton.loadImeg(this.arr[1])
            }else{
                this.batton.loadImeg(this.arr[0])
            }
        } 
    }
    get active() { return this._active; }
}

