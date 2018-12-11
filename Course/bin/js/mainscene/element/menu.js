

/**
 * Menu ui visualization of the data that model contains.
 * 菜单
 * @class      MenuUIView (name)
 */
import { observer } from '../../module/init_module';
import menuPanel from './menupanel';

export default class MenuUIView extends window.ui.menuUI {
    constructor(courceList) {
        super();
        this.pan = [];
        this.init(courceList);
      
    }

    init(courceList) {
         //设置选中背景色
        observer.subscribe("bgcolor",this.changeBgcolor.bind(this));
        this.pos(0,120);
        // this.panelBox.vScrollBarSkin = '';   
        for(let i = 0;i< courceList.length;i++){     
            let pan = new menuPanel(courceList[i].Name,courceList[i].Background,courceList[i].PageNum,i);           
            pan.y = 110*i;
            pan.x = 0;
            this.pan.push(pan);
            this.panelBox.addChild(pan);
        } 
    }
   
     //设置页码也需要改变panel选中背景色
    changeBgcolor(pageNum){
         console.log("changeBgcolor",pageNum);
         for(let i in this.pan){
             if(i == pageNum){
                 this.pan[i].changeBgcolor("green");
             }else{
                  this.pan[i].changeBgcolor();
             }

         }
         
    }


}
