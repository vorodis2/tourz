


import { Calc } from './Calc.js';
/*import { MInfo } from './menu/MInfo.js';



import { Grid } from './Grid.js';
import { Stairs } from './stairs/Stairs.js';*/

import { AMenu } from './menu/AMenu.js';

/*

import { MVisi3D } from '../libMy/visi3D/MVisi3D.js';
import { SceneSB } from '../libMy/visi3D/SceneSB.js';

import { Scane } from './scane/Scane.js';

import { DebbugPixi } from './scane/DebbugPixi.js';*/





export class Glaf  {
  	constructor(main) {  		
  		this.type="Glaf";
  		var self=this;
        this.version="1.01";
        
  		
        this._indexSah=-1;
        this._index=-1; 
        this.debug=main.debug;
        

        this.mobile= dcmParam.mobile
        this.scale=1;
		this.dCont=new DCont(document.body);   
        this.main=main
        this.par=main
        this.otstup=5;
        global.calc=new Calc();



        this.menu = new AMenu(this,function(s,p){               
           /* if(s=="indexSah"){
                self.indexSah = p;
                self.saveLoacal.save()

            } */
        })


        let w,h,s
        this.sizeWindow=function(_w,_h,_s){
            if(_w!=undefined){
                w=_w;
                h=_h;
                s=_s;
            }           
          
            this.dCont.scale=s;
            this.menu.sizeWindow(w,h,s); 
           /* this.scane.sizeWindow(w,h,s);
            this.visi3D.sizeWindow(0,0,w,h);

            self.scPixi.width=w;
            self.scPixi.height=h;           
            self.scPixi.render()*/
                      
        }

        this.update = function () { 

        }

        this.menu.index=0


       
  	} 
}