/**
 * 学生超时提示
 */
import { observer,messageCenter,setViewCenter,sceneManager } from '../../module/init_module';
export default class TimeDown extends timeDownUI{
    constructor(){
        super();
        this.init();
    }
    init(){
        this.timedown.play(0,false);

    }
   
    registerAction({ messageCenter, observer }) {
        // 订阅弹层出现
        observer.subscribe('common::timedown', this.myShow.bind(this));
    }

    myShow() {
        this.popup();
        Laya.timer.once(2000, this, this.myClose);

    }
    myClose() {
        this.close();
        Laya.timer.clear(this, this.myClose);
    }

} 