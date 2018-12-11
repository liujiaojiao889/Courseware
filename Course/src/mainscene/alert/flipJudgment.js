/**
 * 老师点击答题提示
 */
import { observer,messageCenter,setViewCenter,sceneManager } from '../../module/init_module';
import RoomScene from '../room';
export default class flipJudgment extends flipJudgmentUI {
    constructor() {
        super();  
        this.init();   
        this.func =  null;
        this.type =  null;
    }
    init(){
        //继续停留
        this.stay.on(Laya.Event.CLICK,this,()=>{     
            this.myClose();
        });  
        //翻页
        this.flip.on(Laya.Event.CLICK,this,()=>{    
            this.func(this.type);
            this.myClose();
        });  
        this.nextBtn.on(Laya.Event.CLICK,this,()=>{    
             observer.publish('updateStep',{opt:'next'});  
             messageCenter.emit('updateStep',{senderId:GM.senderId,opt:'next'});  
             this.myClose();
        });
    }
    registerAction({ messageCenter, observer }) {
        // 订阅弹层出现
        observer.subscribe('nextpage', this.myShow.bind(this));
    }

    myShow(msg, confirmCallBack, cancelCallBack) {

        this.func = msg.func;
        this.type = msg.type;
        this.popup();
    }
    myClose() {
        this.close();
    }

    

}
