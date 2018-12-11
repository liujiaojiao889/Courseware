/**
 * 断网提示
 */
import { observer,messageCenter,setViewCenter,sceneManager } from '../../module/init_module';
export default class netTip extends netTipUI {
    constructor() {
        super();
       
          
    }
 
    registerAction({ messageCenter, observer }) {
        // 订阅弹层出现
        observer.subscribe('netTip', this.myShow.bind(this));
    }

    myShow(msg) {
        if(msg.stat === "open"){
            if(msg.senderId == GM.senderId){
                this.popBg.skin = "res/commonn/popteach.png";
                this.popLabel.text = "网络有点堵车\n让我们稍歇片刻加速前进!";
            }
            else{
                if(GM.role === 0){
                    this.popBg.skin = "res/commonn/popteach.png";
                    this.popLabel.text = "学生稍稍掉线\n让我们耐心地等等吧~";
                }else{
                    this.popBg.skin = "res/commonn/popstud.png";
                    this.popLabel.text = "老师稍稍掉线\n让我们耐心地等等吧~";
                }
            } 
            this.popup();
        }else{
            this.close();
        }
       
    }


    

}
