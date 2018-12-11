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
        this.catIndex = 0;
        this.waveIndex = 1;
        this.progressValue = 0;
        this.newValue = 0;
        this.catAni = null;       
        this.Library = null; //存储图片资源
        this.pageAll = null; //存储每页数据
        this.loadIndex = null;
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
        this.loadIndex = Math.ceil(Math.random()*4);
        Laya.timer.loop(3000,this,this.changeText.bind(this));
        if(this.loadIndex == 0){
            this.loadIndex = 1;
        }
        if(this.loadIndex > 3){
            this.loadingText.y =-64;
        }else{
            this.loadingText.y = 0;
        }
        
        this.loadingUIvisible(this.loadIndex);
        
    }

    // 根据index 变换不同的loading页面
    loadingUIvisible(index){
        switch(index){
            case 1:
                this.loadBox0.visible = true;
                break;
            case 2:
                this.loadBox1.visible = true;
                break;
            case 3:
                this.loadBox2.visible = true;
                break;
            case 4:
                this.loadBox3.visible = true;
                break;
        }
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
        let w = num  * 770;
        w = w < 40 ? 40 : w;
        // //修改进度值
        // this.ProgressBar.width = w;
        // //位置跟随
        // if(this.ProgressBar.width - 100 > 0 ){
        //     this.Cat.x = this.ProgressBar.width-30 ;;
        // }
        if(this.loadIndex === 1){
             this.changeProgressbar(this.loadBox0,w);
        }else if(this.loadIndex === 2){
            this.changeProgressbar(this.loadBox1,w);
        }else if(this.loadIndex === 3){
            this.changeProgressbar(this.loadBox2,w);
        }else if(this.loadIndex === 4){
           
            this.changeProgressbar(this.loadBox3,w);
        }
        if(num === 1){
            Laya.timer.clear(this,this.changeText);
        }
    }
    //根据index不同 progressBar不同
    changeProgressbar(item,width){       
        item.find("ProgressBar").width = width;
        if(item.find("ProgressBar").width - 100 > 0 ){
            item.find("Cat").x = item.find("ProgressBar").width-30 ;;
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
        this.catIndex = null;
        this.waveIndex = null;
        this.progressValue = null;
        this.newValue = null;
        this.catAni = null;       
        this.Library = null; //存储图片资源
        this.pageAll = null; //存储每页数据
        this.loadIndex = null;
        
        this.destroy(true);  
    }

}
