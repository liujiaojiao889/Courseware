/**
 * 断网提示
 */
import { observer,messageCenter,setViewCenter,sceneManager } from '../../module/init_module';
export default class MessageDialog extends tipsUI {
    constructor() {
        super();
        this.confirmCallBack = null;
        this.cancelCallBack = null;
       
    }
 
    registerAction({ messageCenter, observer }) {
        // 订阅弹层出现
        observer.subscribe('common::tips', this.myShow.bind(this));
    }

    myShow(msg, confirmCallBack, cancelCallBack) {
        this.popup();
    }
    myClose() {
        this.close();
        Laya.timer.clear(this, this.myClose);
    }

    

}
