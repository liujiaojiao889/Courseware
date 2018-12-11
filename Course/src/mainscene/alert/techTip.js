/**
 * 答题提示
 */
import { observer,messageCenter,setViewCenter,sceneManager } from '../../module/init_module';
export default class techTip extends techtipUI {
    constructor() {
        super(); 
        this.init(); 
    }
    init(){
        this.closeBtn.on(Laya.Event.CLICK,this,()=>{
           this.close();
        });       
    }
 
    registerAction({ messageCenter, observer }) {
        
        // 订阅弹层出现
        observer.subscribe('techtip', this.myShow.bind(this));
    }

    myShow(msg, confirmCallBack, cancelCallBack) {
         this.popup();
         Laya.timer.once(2500, this, this.myClose);
    }
    myClose() {
        this.close();
        Laya.timer.clear(this, this.myClose);
    }

    

}
