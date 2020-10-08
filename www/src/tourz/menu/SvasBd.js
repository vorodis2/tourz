/**

*/

export class SvasBd  {
    constructor(par,fun) {       
        this.type="SvasBd";
        var self=this;//Переключение
        this.fun=fun;
        this.par=par

        this.arrBd=[];

        this.arrBd[0]=  {id:63773,grundrissname:"Eichest. 1OG",link:{src:"resources/image/startImage.png"},
                            array:[
                                {text:"name 1",icon:"resources/image/p0.png",pic:"resources/image/t0.jpg"},
                                {text:"name 2",icon:"resources/image/360.png",pic:"resources/image/t0.png"},
                                {text:"name 3",icon:"resources/image/36110.png",pic:"resources/image/t0.jpg"},
                                {text:"name 4",icon:"resources/image/pic.jpg",pic:"resources/image/t0.png"},
                                {text:"name 5",icon:"resources/image/p0.png",pic:"resources/image/t0.jpg"},
                                {text:"name 6",icon:"resources/image/360.png",pic:"resources/image/t0.png"}
                        ]}

        this.arrBd[1]=  {id:63772,grundrissname:"Eichest. 1EG",link:{src:"resources/image/startImage.png"},
                            array:[
                            {text:"name 1",icon:"resources/image/p0.png",pic:"resources/image/t0.jpg"},
                            {text:"name 2",icon:"resources/image/360.png",pic:"resources/image/t0.png"}
                        ]}

        this.arrBd[2]=  {id:63771,grundrissname:"Пустой",link:{src:"resources/image/startImage.png"},
                            array:[]}  

        this.arrBd[3]=  {id:63770,grundrissname:"Дофига",link:{src:"resources/image/startImage.png"},
                            array:[]}   
                                               
        for (var i = 0; i <30; i++) {
            this.arrBd[3].array.push({text:"name 2",icon:"resources/image/360.png",pic:"resources/image/t0.png"})
        }                   




        let kol=20+Math.round(Math.random()*50);
        for (var i = 4; i < kol; i++) {
            this.arrBd[i]=  { id:(63+""+Math.round(Math.random()*1000))*1,
                                grundrissname:"Eic.. "+Math.round(Math.random()*1000),
                                link:{src:"resources/image/startImage.png"},
                                array:[
                                {text:"name 1",icon:"resources/image/p0.png",pic:"resources/image/t0.jpg"},
                                {text:"name 2",icon:"resources/image/360.png",pic:"resources/image/t0.png"}
                            ]}

        }



        this.getPar=function(arr) {
            let a=[]
            let ss
            let r
            let s
            trace(arr)
            for (var i = 0; i < this.arrBd.length; i++) {
                for (var j = 0; j < arr.length; j+=2) {

                    if(this.arrBd[i][arr[j]]){
                        ss=(this.arrBd[i][arr[j]]+"")
                        s=arr[j+1]
                        r=ss.indexOf(s+"")

                        if(r!=-1){
                            a.push(this.arrBd[i])
                            j=9999
                        }
                    }
                }
            }



            return a
        }   

        
        this.getKol=function() {
            return this.arrBd.length;
        }


        this.getArr=function(sah, kol) {
            let a=[]
            for (var i = sah; i < sah+kol; i++) {
                if(this.arrBd[i])a.push(this.arrBd[i])
            }
            return a
        }



      
    }


    set index(value) {
        if (this._index != value) { //Настройка картинки. Если не выбрано.
            this._index = value; //Настройка картинки. Если выбрано.
            
        }
    }
    get index() { return this._index; }
}
