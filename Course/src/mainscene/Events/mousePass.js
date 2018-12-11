/**
 * 鼠标传递
 */
import RoomScene from '../room'
//io模块 && 顶层观察者，各模块间可以通过观察者来通信 && 场景管理器
import { messageCenter, observer, sceneManager, setViewCenter } from '../../module/init_module';
import { createSkeleton } from '../../module/com/laya.custom'
export default class mousePass extends Laya.Sprite{
    constructor(){
        super();
        //鼠标点击位置发送
        observer.subscribe('mouseclick',this.mouseClick.bind(this))
        //添加交互小手和波浪
        this.waves = new createSkeleton("res/animate/skeleton");
        this.figer = new createSkeleton("res/animate/figerChange");
        this.addChildren(this.waves,this.figer);
        this.waves.visible = false;
        this.figer.visible = false;
    }
    /**
     * 发送点击指令 自身播放自身的点击特效动画
     */
     sendMouseclick(){  
        this.mouseClick();
        for(let i in  RoomScene.getInstance().pagebox.itemDic){  
            if(RoomScene.getInstance().pagebox.itemDic[i].hitTestPoint(Laya.stage.mouseX,Laya.stage.mouseY) && (RoomScene.getInstance().pagebox.itemDic[i].TagType == 1 || RoomScene.getInstance().pagebox.itemDic[i].TagType == 4)){
                //不往下执行
                return;
            } 
        }
        //GM.role 0 为老师 判断一下
        messageCenter.emit("mouseclick",{sendId:GM.senderId, role : GM.role ,x:Laya.stage.mouseX , y:Laya.stage.mouseY});
     }
    /**
     * 交互双方点击不同特效
     */
     mouseClick(data){ 
         if(data){
             if(data.senderId != GM.senderId){    
                 if(GM.role == 0){
                    //播放小手特效               
                    this.figer.pos(data.x+20,data.y+60);
                    this.figer.play(0,true);
                    this.figer.visible = true;                          
                    Laya.timer.clear(this,this.visibleFiger);
                    Laya.timer.once(1000,this,this.visibleFiger);
                 }  
                 else{
                    //播放波纹               
                    this.waves.pos(data.x,data.y);
                    this.waves.play(0,true);
                    this.waves.visible = true;                          
                    Laya.timer.clear(this,this.visibleWave);
                    Laya.timer.once(1000,this,this.visibleWave);
                 }        
            }
         }else{
            //播放特殊波浪特效
            console.log("播放特殊波浪特效")
             this.waves.x = Laya.stage.mouseX;
             this.waves.y = Laya.stage.mouseY;    
             this.waves.visible = true;  
             this.waves.play(0,true);
             Laya.timer.clear(this,this.visibleWave);
             Laya.timer.once(1000,this,this.visibleWave);
         }

     }
     //隐藏波浪
     visibleWave(){
         if(this.waves){
            this.waves.stop(0,true);
            this.waves.visible = false;
        }
     }

    //隐藏小手
    visibleFiger(){
        if(this.figer){
            this.figer.stop(0,true);
            this.figer.visible = false;
        }
    }
    dispose(){
        observer.unsubscribe("mouseclick"); 
        this.removeSelf();
        this.destroy();
    }
}



 