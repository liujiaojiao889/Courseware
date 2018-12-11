/**
 * 倒计时 @param {*liujiaojiao}
 */
import { observer,messageCenter,setViewCenter,sceneManager } from '../../module/init_module';
import RoomScene from '../room';

export default class countDownView extends Laya.Sprite{
    constructor(countDownValue){
        super();
        this.countDownValue = countDownValue;   //时间 
        this.countUI = null;
        this.useTime = 0;
        this.init();

    }

    init(){
        if(this.countDownValue == undefined){
            this.countDownValue = 0;
        }
        if(this.countDownValue != 0){
            // 老师0  学生1 
            let count,countUI;
            if(GM.role == 0){
                this.countUI = new window.countDownUI();
                this.countUI.pos(Laya.stage.width/2 - this.countUI.width/2,10);   
                this.addChild(this.countUI);         
            }else if(GM.role == 1){
                this.countUI = new window.countDown1UI();
                this.countUI.pos(Laya.stage.width - this.countUI.width -150,10);   
            }
            this.beginCountDown(this.countDownValue);
        }else{
            this.useTime = 0;
            Laya.timer.loop(1000, this, this.countTime);
        }
    }
    countTime (){
        this.useTime += 1;
    }
     /**
     * 开始倒计时
     */
    beginCountDown(count){
        if( !count ) return; 
        this.countUI.count.text = count;
        let duration = 1000;      
        this.countDownValue = count;    
        Laya.timer.loop(duration, this, this.countDownaction);
    }
    //继续倒计时
    timeContinue(){
        if(this.countDownValue != 0){
            Laya.timer.loop(1000, this, this.countDownaction);
        }
        else{
            Laya.timer.loop(1000, this, this.countTime);
        }
    }
    //停止倒计时
    timeStop(){
        Laya.timer.clear(this,this.countDownaction);   
        Laya.timer.clear(this,this.countTime);  
    }

    countDownaction(){
        Laya.Tween.to(this.countUI.count, {value:this.countDownValue--},1000);
        if(GM.role === 1){
            Laya.SoundManager.playSound('sound/countdown.mp3');
        }
        this.countUI.count.changeText(this.countDownValue);
        if(this.countDownValue <= 10 && GM.role == 1)
            this.addChild(this.countUI);      
        if(this.countDownValue <= 0){
            if(GM.role === 0){
                this.countFinsh();
                this.emitStudent();
            }   
        }
    }
    countFinsh(stat){            
        if(GM.role === 1){
            //学生端没有答对则发送超时
            // if(!RoomScene.getInstance().pagebox.isWined){
                if(RoomScene.getInstance().audioItem){
                    RoomScene.getInstance().audioItem.visible = false;
                }
                
                //老师掉线传入stat = 1，不能走这个地方
                if(stat == undefined){
                    let alltime = Number(RoomScene.getInstance().countTimer);  
                    // 结束答题和倒计时结束发送log告知答题过程
                    RoomScene.getInstance().pagebox.sendFeedLog(-1,alltime,RoomScene.getInstance().pagebox.sendFeedArr);
                    RoomScene.getInstance().pagebox.proloadHandler(-1,RoomScene.getInstance().pagebox.sendFeedArr);
                }
                //学生取消事件
                RoomScene.getInstance().pagebox.timeOutFrameLoopEvent(true);
            // }
        }
        else{
            //老师端发送关闭弹层
            // observer.publish('rank:close');
            //messageCenter.emit("rankView",{stat : "Close"  , time : 0});
            //将没有答对的学生状态设置为超时
            RoomScene.getInstance().answerStuOverTime();
            //老师重新绑定事件
            RoomScene.getInstance().pagebox.pictureEvent();
        }
      
        if(RoomScene.getInstance().countAnimation){
             RoomScene.getInstance().countAnimation.destroy();
             RoomScene.getInstance().countAnimation = null;
        }
      
        RoomScene.getInstance().answering = true;
        RoomScene.getInstance().answerFlag = true;
        //RoomScene.getInstance().teacherAnswer = false;
        RoomScene.getInstance().changeAnswerBtn('finish');
        if(this.countUI){
          this.countUI.visible = false;  
          this.countUI.count.text = 0;
        }
        Laya.timer.clear(this,this.countDownaction);   
        Laya.timer.clear(this,this.countTime);  
        Laya.SoundManager.stopMusic("sound/answering.mp3"); 
        if(stat == undefined){
            Laya.SoundManager.playSound('sound/newsound/countdown.mp3');
            let timeDown = new window.timeEndUI(); 
            this.addChild(timeDown);     
            Laya.timer.once(2000,this,()=>{
                this.removeChild(timeDown);
                timeDown.destroy();         
            });
         
        }
        else if(stat == 1){
            //经过事件的元素 状态反一下
            RoomScene.getInstance().pagebox.returnitems();
            //将所有可动的元素归还原位
            RoomScene.getInstance().pagebox.resetState(); 
        }
        if(GM.role == 0){
            if(RoomScene.getInstance().pagebox.pageChild.length > 0){
                RoomScene.getInstance().btnNext.disabled = false;
            }
            if(RoomScene.getInstance().pagebox.OperationIndex > 0){
                RoomScene.getInstance().cancel.disabled = false;
            }
        }
    }

    emitStudent(){
        let data = {answerstate:2, senderId : GM.senderId,page:RoomScene.getInstance().pageNum}
        messageCenter.emit("answerFinish",data);
    }
   
}   