/**
 * 学生1v6答题结果等待页面 @param {*liujiaojiao}
 */
import { observer,messageCenter,setViewCenter,sceneManager } from '../../module/init_module';
import {createSkeleton} from '../../module/com/laya.custom';
import RoomScene from '../room'
export default class rankView extends window.rankpageUI {
    constructor() {
        super();        
    }

    registerAction({ messageCenter, observer }) {
        // 订阅弹层出现
        // observer.subscribe('rank:open', this.myShow.bind(this));
        // 随机的订阅弹层出现
        observer.subscribe('rank:open', this.show.bind(this));
        observer.subscribe('rank:close', this.myClose.bind(this));
    }

    showPop(msg){
        if(GM.classMode === "1v1" || GM.roleType ===  "1"){
            // if(this.winani){
            //     this.removeChild(this.winani);
            //     this.winani.destroy();
            //     this.winani = null;
            // }
            this.close();
            return;
        }
        //if(RoomScene.getInstance().pagebox.isWined){
            // this.winani.visible = false;
            // this.winani.stop();
            this.box.visible = true;
            this.popup(); 
            if(msg.showDialog == 0){
                this.ranText.text = "";
            }
            else{
                this.ranText.text = "其他小朋友还没有完成答题哦，让我们耐心等待他们吧。";
            }
       
            //默认金牌
            if(msg.ranknum === 1){
                this.backGround.skin = "res/rankpage/img_firstPage.png";
                this.term.skin = "res/rankpage/word_first.png";
            }
            else if(msg.ranknum === 2 ){
                this.backGround.skin = "res/rankpage/img_secondPage.png";
                this.term.skin = "res/rankpage/word_second.png";
            }
            else if(msg.ranknum === 3){
                this.backGround.skin = "res/rankpage/img_thirdPage.png";
                this.term.skin = "res/rankpage/word_third.png";
            }else if(msg.ranknum > 3){
                this.backGround.skin = "res/rankpage/img_secondPage.png";
                this.term.visible = false;

            }
           
            
        //}
    }
    show(msg, confirmCallBack, cancelCallBack) {
        // if(msg.stuId  == GM.senderId || GM.role == 0){
        //     this.show();   
            // this.box.visible = false;
        //     this.winani.visible = true;
        //     // Laya.SoundManager.playSound('sound/Events/largeWin.mp3');       
        //     this.winani.play(0, false);  
            
            //1v6中老师传给学生弹层
            Laya.timer.once(2000,this,this.showPop,[msg]);
        // }
    }

    // 回答正确的随机动画
    randomMyShow(msg, confirmCallBack, cancelCallBack) {
        if(msg.stuId  == GM.senderId || GM.role == 0){ 
            // this.show();              
            // // this.randomInit();
            // this.box.visible = false;
            // // this.winani.visible = true;
            // // Laya.SoundManager.playSound('sound/Events/largeWin.mp3');       
            // // this.winani.play(0, false);  
           
            // //1v6中老师传给学生弹层
            // let times;
            // if(this.random === 1){
            //     times = 3000;
            // }else{
            //     times = 2000;
            // }
            Laya.timer.once(2000,this,this.showPop,[msg]);
        }
    }

    myClose(msg, confirmCallBack, cancelCallBack) {
        if(msg.time != 0){
            Laya.timer.once(msg.time * 1000, this, this.clo);
        }
        else{
            this.clo();
        }
       
    }
    clo(){
        Laya.timer.clear(this,this.showPop);
        this.box.visible = false;
        this.close();
    }

    

}
