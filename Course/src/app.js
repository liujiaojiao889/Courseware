/*
入口文件 @param {*liujiaojiao}
*/

import {LIBRARY, GAME_VERSION} from './resource';

//io模块 && 顶层观察者，各模块间可以通过观察者来通信 && 场景管理器
import { messageCenter, observer, sceneManager, setViewCenter } from './module/init_module';
import LoadingScene from './mainscene/loading';
import RoomScene from './mainscene/room';
import afterReport from './mainscene/element/afterReport';
import MessageDialog from './mainscene/alert/tips';
import RankView from './mainscene/alert/rankpage';
import answerTips from './mainscene/alert/answerTips';      
import netTip from './mainscene/alert/netTip';
import techTip from './mainscene/alert/techTip';
import flipJudgment from './mainscene/alert/flipJudgment';
// import {GETJSON} from './data';
let IMAGE = Laya.Loader.IMAGE;
let ATLAS = Laya.Loader.ATLAS;
let SOUND = Laya.Loader.SOUND;

/**
 * 初始化基本配置
 */
{   
    // Laya3D.init(1200, 900, true);
    Laya.init(1200, 900,Laya.WebGL);//配置宽高以及启用webgl(如果浏览器支持)
    if(GM.From === 0){      
        Laya.URL.version = GAME_VERSION; // 版本号
        Laya.Stat.show();
    }   
    // Laya.Stat.show();    
    Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_WIDTH; // 设置适配模式
    Laya.stage.screenMode = Laya.Stage.SCREEN_HORIZONTAL;// 设置适配模式
    Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;// 设置适配模式
    Laya.stage.alignV = Laya.Stage.ALIGN_MIDDLE;// 设置适配模式
    Laya.stage.bgColor = "#ffffff";// 设置bgColor
    Laya.URL.basePath = GM.CDNURL;  //设置basepath 
    Laya.UIConfig.popupBgAlpha = 0;
    //背景音乐失去焦点后 继续播,一定要放在loading的页面前。。。不然soundManager中的事件会将_isActive改为false
    Laya.SoundManager.autoStopMusic = false;
    Laya.SoundManager.musicVolume = 0.25;
    Laya.SoundManager.soundVolume = 1;    
}

/**
 *  loading页优先加载并渲染
 */ 
{ 
    // console.log([...LIBRARY.LoadingLIBRARY, ...LIBRARY.Common]);
    Laya.loader.load([...LIBRARY.LoadingLIBRARY, ...LIBRARY.Common], Laya.Handler.create(this, () => {  
        messageCenter.emit("startLoad");
        if(GM.From === 0){
            resourceHandle();
        }
        else{
            messageCenter.emitAjax("library");
            messageCenter.registerAction("library",resourceHandle); 
        }
  
        // loading场景
        sceneManager.loadScene(LoadingScene.getInstance());     
        // 浏览器窗口大小变化
        Laya.stage.on(Laya.Event.RESIZE, this,setViewCenter);
        // 绑定消息
        messageCenter.initAction(); 
        new MessageDialog().registerAction({messageCenter, observer});
        new netTip().registerAction({messageCenter, observer});
        if(Laya.Browser.onIPhone || Laya.Browser.onAndroid){
            document.addEventListener("message",onMessage,false);
        }else{
            window.addEventListener("message",onMessage,false);
        }

        //socket连接和断开的监听
        observer.subscribe("socket",function(data){
            if(data === 'on'){
                console.log("socket重连成功");
                observer.publish("countDownTimeStat",'on');
                //socket 连接成功
                messageCenter.socketOnOperation();
                observer.publish("netTip",'close');
                //防止有排名弹层存在。关闭一下
                observer.publish('rank:close',{time : 0});
            }else if(data === 'off'){
                console.log("socket连接断开");
                observer.publish("countDownTimeStat",'off');
                //socket 连接失败
                messageCenter.socketOffWait();        
                observer.publish("netTip",'open');
            }

        });
        observer.subscribe("ack",function(data){
            console.log("有回应，发送下一条数据");
            messageCenter.ackOperation();
        });

        // 原生安卓和ios的调用的
        window.postMessageIpad = function(e){       
             var message = JSON.parse(e);          
               if(GM.role === 1){
                    postMessageStudent(message.cmd,message.data);
               }else if(GM.role === 0){
                    postMessageTeach(message.cmd,message.data)
               }
            //  console.log(message);
             return message;
        };
        //判断是否为安卓ipad以及
       
    }),null,false);
}

/**
 * socket监听回调
 */
function onMessage(e){
    // console.log("接受数据",e); 
    if(e.source && e.origin && (e.data === "first") ){
        GM.rootWindow = e.source;
        GM.rootURL = e.origin;
        GM.isFrameInWeb = true; 
        e.source.postMessage('getMessage',e.origin);
    }
    else{
        var message = JSON.parse(e.data);
        // 如果是老师不监听翻页步骤事件  监听学生的答题事件
        // 学生不监听answerFinsh答题事件 
        // 老师学生需要同时监听getpage和getstep 重连需要
        if(GM.role === 1){
            postMessageStudent(message.cmd,message.data);
        }else if(GM.role === 0){          
            postMessageTeach(message.cmd,message.data);        
        }        
    }    
}

/**
 * 监听所有的外部事件，并且通知其他模块进行相应的操作
 */        

/**
 * 老师
 */
function postMessageTeach(cmd,data){
     switch(cmd){
        case "getPage":
            observer.publish('Page',data);         
            break;
            
        case "getStep":
            observer.publish('getStep',data);
            break;

        case "answerFinish":
            observer.publish('answerFinish',data.list);
            break;
        case "canvas":
            observer.publish('canvasStat',data);
            break;
        case "mouseclick":
            if(GM.classMode === "1v1"){
                observer.publish('mouseclick',data);
            }
            break;
        //鼠标移动监听
        // case "mousemove":
        //     if(GM.classMode === "1v1" && data.senderId != GM.senderId){
        //         observer.publish('mousemove',data);
        //     }
        // break;
        case "socket":
            observer.publish('socket',data);
            break;
        case "ack":
            //排除鼠标点击传送的ack
            if(typeof data != 'object'){
                data = JSON.parse(data);
            }
            if(data.cmd != "mouseclick" || data.cmd != "sendAnswer"  || data.cmd != "reanswer" ){
                observer.publish('ack',data);
            }
            break;
        case "joinClass": //0是进入 1是离开
            if(GM.classMode === "1v1"){
                observer.publish("netTip",'close');
                observer.publish("countDownTimeStat",'on');
            }
            messageCenter.emit("getStudents",{senderId:GM.senderId});
            messageCenter.emit("getUserList",{senderId:GM.senderId});                   
            break;
        case "leaveClass":
            if(GM.classMode === "1v1"){
                observer.publish("netTip", {stat :'open' , senderId : data.senderId});
                observer.publish("countDownTimeStat",'off');
            }
            
            observer.publish('stuIdChange',{res : [data] ,type : 1});
            break;
        case "rankView":
            if(GM.classMode === "1v1"){
                if(data.stat === "Open"){           
                    observer.publish("winwin");    
                }
            }
            else{
                 //开启状态 。并且是 。老师发过来的
                 if(data.stat === "Open" &&　data.stuId == GM.senderId){                 
                    observer.publish("winwin");                    
                }
            }
            break;
        //排除学生
        case "getUserList": 
            let temparr = [];
            for(let i in data.list){
                if(data.list[i].c == 1 && data.list[i].role != "student"){
                    temparr.push(data.list[i]);
                }
            }
            //  发布旁听生 type 0 进入 1 是离开
            observer.publish('stuIdChange',{res : temparr ,type : 0,role:"observer"}); 
            break;

        case "getStudents": //进入Room后主动请求一次
            //  只有学生
            observer.publish('stuIdChange',{res : data.list ,type : 0,role:"student"});
            break;
        case "bulletView": //子弹面板切页接受数据
            observer.publish("bulletView",data);
            break;
        case "getReport": //课后报告
            observer.publish("getReport",data);
            break;
        case "optStart": //声音
            if(data.type === "Prompt" &&　data.senderId != GM.senderId){
                 observer.publish("playSound",data.url,data.id,data.type);
            } 
                      
            break;
        case "getAnswerList":
            observer.publish("getAnswerList",data);
            break;
        case "changeRole":
            observer.publish("changeRole",data);
            break;    
        case "getAnswerState":
            observer.publish("getAnswerState",data);
            break;
      
        case "Eerror":
            console.log("Eerror",data);
            break;    
     }
}

/**
 * 学生
 */
function postMessageStudent(cmd,data){
     switch(cmd){
        case "getPage":
            observer.publish('Page',data);
            break;
        case "setPage":
            observer.publish('Page',data);   
            break;
        case "updateStep":
            observer.publish('updateStep',data);
            break;
        case "getStep":
            observer.publish('getStep',data);
            break;
        case "answerStart":
            observer.publish('answerStart',data);
            break;
        case "answerPause":
            if(data.endingType){
                return;
            }
            observer.publish('answerStart',data);
            break;
        case "answerFinish":
            observer.publish('answerFinish',data.list);
            break;
        case "mouseclick":
            if(data.role == 0){
                observer.publish('mouseclick',data);
            }
        break;
        //鼠标移动监听
        case "mousemove":
            if(data.role == 0){
                observer.publish('mousemove',data);
            }
        break;
        case "socket":
            observer.publish('socket',data);
        break;
        case "ack":
           if(typeof data != 'object'){
                data = JSON.parse(data);
            }
            if(data.cmd != "mouseclick" || data.cmd != "sendAnswer"  || data.cmd != "reanswer" ){
                observer.publish('ack',data);
            }
        break;
        case "rankView":
            if(data.stat === "Open"){
                if(GM.classMode === "1v1" && data.ranknum === 0 ){
                     observer.publish("winwin"); 
                }else{
                    if(data.stuId  == GM.senderId){ 
                        observer.publish("winwin");  
                        observer.publish('rank:open',data); 
                    }    
                }      
            }
            else{
                observer.publish('rank:close',data);
            }

        break;

        case "joinClass": //0是进入 1是离开
            if(GM.classMode === "1v1"){
                observer.publish("countDownTimeStat",'on');
            }
            if(data.role == "teacher"){
                observer.publish("netTip",'close');          
            }
        break;
        case "leaveClass":
            if(GM.classMode === "1v1"){
                observer.publish("countDownTimeStat",'off');
            }
            if(data.role == "teacher"){
                //老师掉线，如果在答题阶段，学生自动结束答题
                if(RoomScene.getInstance().countUI && !RoomScene.getInstance().answering){

                     RoomScene.getInstance().countUI.countFinsh(1);//传入参数，就不会弹时间到了弹层
                }
                observer.publish("netTip",  {stat :'open' , senderId : data.senderId});         
            }           
        break;
        case "getReport": //课后报告
            observer.publish("getReport",data);
        break;
        case "optClose": //课后报告
            observer.publish("closeReport");
        break;
        case "optStart": //声音
            if(data.type === "bgMusic"){
                observer.publish("bgMusic",data);
            }else{
                observer.publish("playSound",data.url,data.id,data.type);
            }           
        break;
        case "getAnswerList":
            observer.publish("getAnswerList",data);
            break;
        case "getAnswerState":
            observer.publish("getAnswerState",data);
            break;
        case "soundList":
            GM.soundFlag = true;         
            for(let i in data){
                 GM.soundList[data[i].id] = data[i];
            };       
            messageCenter.emit("soundsuccess",data);
            break;
        case "soundLoad":
            if(!GM.soundFlag){
                // messageCenter.emit("console",data);       
                observer.publish("soundLoad",data);
            }      
            break;
    }
}

/**
 * 存储资源
 */
function resourceHandle(data){
    console.log(data);       
    let pagelist,imageresoure,imageTemp;
    let ImageLibrary = [];   
    let soundList = [];
    if(data){       
           if(GM.location === "location"){
                GM.AJAX = data.data  //存放ajax接口数据  
                pagelist = data.data.pageList;   //本地测试正式服接口使用 
                imageresoure = data.data.library.materials;//本地测试正式服接口使用 
            }else{
                //s端传入的是字符串 需要转换
                let tempdata = JSON.parse(data.data);
                GM.AJAX = tempdata.msg.data  //存放ajax接口数据  
                pagelist = tempdata.msg.data.pageList;     
                imageresoure = tempdata.msg.data.library.materials;
            }    
    }
    else{
        // alert("data数据为空，走Naughty");
        pagelist = window.GETJSON.pageList;     
        imageresoure = window.GETJSON.library.materials;
    }
    //根据PageNum排序
    GM.LIBRARY = pagelist.sort(compare('PageNum'));     
    for(let i= 0; i< imageresoure.length; i++){  
        if(GM.From === 0){
            if(imageresoure[i].SourceType == 0){
                console.log(imageresoure[i]);
                if(imageresoure[i].width > 0){
                     imageresoure[i].url = imageresoure[i].url + "?imageView/2/w/"+parseInt(imageresoure[i].width*0.75)+"/h/"+ parseInt(imageresoure[i].height*0.75);
                }
               
                imageTemp = {url: imageresoure[i].url ,type: IMAGE};
               
            }else if(imageresoure[i].SourceType == 1){
                imageTemp = {url: imageresoure[i].url,type: SOUND};      
                ImageLibrary.push(imageTemp);       
            } 
            if(imageresoure[i].type!="dragonBone"){
                GM.ImageLibrary[imageresoure[i]._id] = {Url:imageresoure[i].url,type:imageresoure[i].type}
            }else{
                GM.ImageLibrary[imageresoure[i]._id] = {Url:imageresoure[i].url,type:imageresoure[i].type,jsonFileUrl:imageresoure[i].jsonFileUrl ,width :imageresoure[i].width , height :imageresoure[i].height}; 
            }      
        }
        else{
            if(imageresoure[i].type == "image"){           
                imageresoure[i].Url = imageresoure[i].Url + "?imageView/2/w/"+parseInt(imageresoure[i].width*0.75)+"/h/"+ parseInt(imageresoure[i].height*0.75);
                imageTemp = {url: imageresoure[i].Url,type: IMAGE};   
                ImageLibrary.push(imageTemp);          
            }
            else if(imageresoure[i].type == "audio"){
                if(messageCenter.soundoutPlay()){
                    soundList.push({id:imageresoure[i]._id,url:imageresoure[i].Url})
                }else{           
                    imageTemp = {url: imageresoure[i].Url,type: SOUND};  
                    ImageLibrary.push(imageTemp);      
                }               
            } 
            if(imageresoure[i].type!="dragonBone"){
                GM.ImageLibrary[imageresoure[i]._id] = {Url:imageresoure[i].Url,type:imageresoure[i].type}
            }else{
                GM.ImageLibrary[imageresoure[i]._id] = {Url:imageresoure[i].Url,type:imageresoure[i].type,jsonFileUrl:imageresoure[i].jsonFileUrl,width:imageresoure[i].width,height:imageresoure[i].height}; 
            }      
        }              
    }   
    //ios pad以及手机发送声音
    if(messageCenter.soundoutPlay()){
         messageCenter.emit("soundList",soundList);
    }
    
    loadImages([...ImageLibrary, ...LIBRARY.RoomLIBRARY]);  
}

/**
 * 元素比较
 */ 
function compare(property){
    return function(a,b){
        var value1 = a[property];
        var value2 = b[property];
        return value1 - value2;
    }
}

/**
 * 资源加载
 */
function loadImages(IMAGERESOURCE){
    // 资源加载完毕后
    let onLoaded = () => {
        console.warn('大厅&房间————资源加载完成');
        // 初始化公共提示      
        new flipJudgment().registerAction({messageCenter, observer});
        new RankView().registerAction({messageCenter, observer});
        new answerTips().registerAction({messageCenter, observer});
        new afterReport().registerAction({messageCenter, observer});
        new techTip().registerAction({messageCenter, observer});
        
        Laya.timer.loop(1,this,loadroomScene);      
    }
    var loadView = LoadingScene.getInstance();    
    // 加载资源
     Laya.loader.load(
        IMAGERESOURCE,
        Laya.Handler.create(this, onLoaded) ,
        Laya.Handler.create(loadView, loadView.loadImages, null, false)
    );
}

/**
 * 进入room
 */
function loadroomScene(){  
    //判断是否外部播放
    if(messageCenter.soundoutPlay()){                   
        if(GM.soundFlag){     
          //缓冲白屏幕     
          LoadingScene.getInstance().ProgressBar.width+=1;
           if(LoadingScene.getInstance().ProgressBar.width - 100 > 0 ){
                LoadingScene.getInstance().Cat.x = LoadingScene.getInstance().ProgressBar.width-30 ;
            }
          if(LoadingScene.getInstance().ProgressBar.width>=770){
                Laya.timer.clear(this,loadroomScene);  
                LoadingScene.getInstance().ProgressBar.width = 770;
                LoadingScene.getInstance().Cat.x = 700;
                sceneManager.loadScene(RoomScene.getInstance(messageCenter));                         
           }       
        }     
    }else{
        sceneManager.loadScene(RoomScene.getInstance(messageCenter));
        Laya.timer.clear(this,loadroomScene);
    }
     
}


