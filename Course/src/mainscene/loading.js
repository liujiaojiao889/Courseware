                                                                                 /**
 * loading页
 */
import {LIBRARY, GAME_VERSION} from '../resource';
import { observer,messageCenter,setViewCenter,sceneManager } from '../module/init_module';
import RoomScene from './room';
export default class LoadingScene extends window.loadUI {
    constructor() {
        super();
        this.sceneName = "loadingScene";  
        this.loadsoundflag = false;
        this.init();
        LoadingScene.instance = this;       
    }

    static getInstance(){
        return this.instance || new this();
    }

    //初始化
    init() {     
        //订阅场景加载事件，请注意bind方法似乎会改变function，导致取消订阅的时候判断的回调函数和绑定的回调函数不相同
        observer.subscribe(this.sceneName + "_enter", this.onEnter.bind(this));
        observer.subscribe("soundLoad",this.loadsound.bind(this));
        Laya.timer.loop(3000,this,this.changeText.bind(this));
       
        
    }
    //文案更换
    changeText(){
        let randNum =  Math.ceil(Math.random()*14);
        if(randNum > 0){
             this.loadingText.skin = "res/loading/texts/text" + randNum + ".png";
        }else{
             this.loadingText.skin = "res/loading/texts/text1.png";
        }
    }
  
    //资源加载
    loadImages(num){
        // with为770 由于要加载声音变成700 仅限于学生
        let loadwidth;
        GM.vsFrom != "web"?loadwidth=500:loadwidth=770;
        let w = num  * loadwidth;
        w = w < 40 ? 40 : w;
        //修改进度值
        this.ProgressBar.width = w;
        //位置跟随
        if(this.ProgressBar.width - 100 > 0 ){
            this.Cat.x = this.ProgressBar.width-30 ;
        }
        
        if(num === 1){
            this.loadsoundflag = true;
            Laya.timer.clear(this,this.changeText);
        }
    }
    loadsound(data){
        let pro = (data.current/data.total)*231;
        // messageCenter.emit("console",{pro:pro});       
        if(this.loadsoundflag){          
            this.ProgressBar.width = 539+pro;
            // messageCenter.emit("console",{ProgressBar:this.ProgressBar.width});      
            //位置跟随
            if(this.ProgressBar.width - 100 > 0 ){
                this.Cat.x = this.ProgressBar.width-30 ;
            }
            if(this.ProgressBar.width>=731){
                this.ProgressBar.width = 731;
                // messageCenter.emit("console",{Cat:this.Cat.x}); 
                this.Cat.x = 700;
            }
        }
    }
   
  
    onEnter() {      
        // 视图居中
        setViewCenter();
        console.log(this.sceneName + " enter");
        //取消订阅时不用传递回调函数
        observer.unsubscribe(this.sceneName + "_enter");
    }

  
    // 退出场景
    onExit() {
        console.log(this.sceneName + " exit");
        //发布退出事件
        observer.publish(this.sceneName + "_exit");
        this.clear();
    }

    //自定义方法，场景退出的时候是销毁还是removeself请自行抉择
    clear() {
        this.loadsoundflag = null;
        this.clearloadingres();   
        this.destroy(true);  
    }

    //清理load资源
    clearloadingres(){
        let res = LIBRARY.LoadingLIBRARY;
        for(let i = 0;i<res.length;i++){
            let asset = res[i].url;
            //查看log，清理前资源一直在内存中
            // console.log(Laya.loader.getRes(asset));
            //调用清理方法
            Laya.loader.clearRes(asset);
            //查看log，清理后，资源被卸载
            // console.log(Laya.loader.getRes(asset));
        }
       
    }

}
