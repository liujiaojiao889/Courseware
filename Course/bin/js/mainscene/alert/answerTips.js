/**
 * 老师点击答题提示
 */
import { observer,messageCenter,setViewCenter,sceneManager } from '../../module/init_module';
import RoomScene from '../room';
export default class answerTips extends answerTipsUI {
    constructor() {
        super();  
        this.init();    
    }
    init(){
        //关闭
        this.closeBtn.on(Laya.Event.CLICK,this,()=>{       
            this.myClose();
        });  
        //全部开始答题
        this.answerAll.on(Laya.Event.CLICK,this,()=>{     
            RoomScene.getInstance().answerStartPanelButton(0);  
            this.myClose();
        });  
        //答错开始答题
        this.answerPart.on(Laya.Event.CLICK,this,()=>{    
            //修改为在弹这个时就有做答错判断了。所以不需要走学生剔除了。
            RoomScene.getInstance().answerStartPanelButton();  
            this.myClose();
        });  
    }

    registerAction({ messageCenter, observer }) {
        // 订阅弹层出现
        observer.subscribe('answerTips', this.myShow.bind(this));
    }

    myShow(msg, confirmCallBack, cancelCallBack) {
        if(msg.bb){
            this.answerPart.disabled = true;
        }
        else{
            this.answerPart.disabled = false;
        }
        this.popup();
    }
    myClose() {
        this.close();
    }

    

}
