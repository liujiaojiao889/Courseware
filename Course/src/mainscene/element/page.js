/**
 * 存放页面所有的图片box  包括图片文本之间的交互 @param {*liujiaojiao}
 */

// TagType  事件类型
// TagType = {
 // Normal : 0,
//   Drag  : 1,
//   Drop  : 2,  
//   Click : 3, 
//   line  : 4,
//   aside : 5,
//   Play  : 999
// }
//OpAnimationType  过场动画
// OpAnimationType = {
//     Default,
//     Road,
//     Fly,
//     Walk,
//     擦除,
// }
import { observer,messageCenter } from '../../module/init_module'
import {createSkeleton} from '../../module/com/laya.custom'
import LoadingScene from '../loading'
import RoomScene from '../room'

import Picture  from './picture'
import SaveBeforeInfo from './SaveBeforeInfo'
import Label  from './label'
import combinationbox  from './combinationbox'

import DragEvent from '../events/dragEvent'
import ClickEvent from '../events/clickEvent'
import LigatureEvent from '../events/ligatureEvent'

import puzzleEvent from '../events/puzzleEvent'
import Animation from '../animat/anmation'
import spineAnimation from '../animat/spineAnimation'
import bgAnimation from '../animat/bgAnimation'
import audioIcon from '../media/audioIcon'
import gifElement from '../media/gifElement'

export default class Page extends Laya.Sprite{
    constructor(data){
        super();
        this.pictureItem = []; //需要点击播放的
        this.indexarray = [] //存放播放的index
        this.pageChild = [];//判断下一个的数组
        this.dicname = []; //存放name的数组
        this.objPool = [];//存放上一元素下一元素对象
        this.bgurl = null; //背景图url
        this.OperationIndex = 0; //操作步数，到0为第一步
        this.targetTypelength = 0; //答案区的个数    
        this.itemDic = []; //字典
        this.particels = []; //所有粒子效果
        this.events = []; //收集所有事件对象的数组
        this.OpAnimationType = 0; //默认过场动画      
        this.imageLigatures = []; //画线的数组元素
        this.bgmAudio = null; //声音
        this.eventItems = [];//通过event完成了事件的元素      
        this.musicTime = 0; //播放进度
        this.sendFeedArr = []; //答题过程时间记录
        this.allanswerTimer  = null; //答题耗时
        this.PageNum = null; //当前页码
        this.answerArray = [];  //存放每次答题的数组
        this.reportBtn = null; //报告按钮
        this.elementVisible = []; //和元素
        this.answerVisible = false;
        this.answerArea = [] //答案区
        this.bg = null; //背景
        this.CourseVideoURL = null;  //页面视频
        this.Prompt = null;  //页面提示音
        this.elementAudio = null; //元素提示音链接
        this.ElementIdAction = []; //旁白元素数组
        this.answererroyNum = 0; // 回答的错误次数
        this.nextAnswererroyNumNum = 3; // 下一次连续回答 3 或者 5 次错误出来的动画
        this.aniArray = []; //存放页面所有的答错动画
        this.puzzleFlag = false; //是否是拼图题型
        this.soundflage = true; ///确认声音只播放一次
        this.ElementGroup = null  //元素组
        this.OrderIndex = 0;   //答案组满足次数
        this.ElementIndex = 0; //元素组序号对比
        this.AnswerSatisfyNum = null; //元素组满足次数以及触发事件
        this.isElementGroupNum = 0;  //元素组满足要求
        this.isElementGroupFlag = false; //元素组满足一次之后 不会再次出现
        this.douzi = null; //正确豆子动画
        this.zhihuicao = null; //正确智慧草动画
        this.winjinyu = null;//正确鲸鱼动画
        this.isWined = false;
        this.bgmusicId = null;
        this.init(data);
    }
    //初始化
    init(data){
        // messageCenter.emit("console",{text:"收到setpage"});     
        this.size(1200,900);
        this.pageHandle(data); 
        // 初始化答题内置动画
        this.douzi = new createSkeleton("res/newani/douzi");
        this.zhihuicao = new createSkeleton("res/newani/zhihuicao"); 
        this.winjinyu = new createSkeleton("res/newani/xiaojingyus");       
        // 监听更新步骤
        observer.subscribe("updateStep",this.updataStepHandler.bind(this));
        // 监听获取步骤
        observer.subscribe("getStep",this.getStepHandler.bind(this));    
        // 监听背景音乐
        observer.subscribe("bgMusic",this.bgmusicPlay.bind(this));
        observer.subscribe("winwin",this.answercorrectAnimation.bind(this));     
    }

    // 实例化并且存放当前页面所有元素
    pageHandle(data){    
        this.pageData = data;        
        //添加背景图
        // alert(data);
        if(data.Background){
            console.log(data);
            this.bgurl = GM.ImageLibrary[data.Background].Url;
            //是否背景循环
            if(data.CirculationMode > 0){
                this.bg = new bgAnimation(this.bgurl,data.CirculationMode,data.CirculationSpeed);
            }else{
                this.bg = new Laya.Image(this.bgurl);
            }
           
            this.bg.size(1200,900);
            this.addChild(this.bg);
        }

        if(data.ElementGroup){
            this.ElementGroup = data.ElementGroup;
        }
        // 存放页码
        this.PageNum = data.PageNum;
     
        //判断页面视频
        if(data.CourseVideo){
            if(GM.ImageLibrary[data.CourseVideo]){
                this.CourseVideoURL = GM.ImageLibrary[data.CourseVideo].Url;
                if(this.CourseVideoURL  && GM.role === 0){
                     RoomScene.getInstance().videoObj.init(this.CourseVideoURL);
                }
               
            }
            RoomScene.getInstance().vedioBtn.visible = true;        
        }else{
            this.CourseVideoURL = null;
            RoomScene.getInstance().vedioBtn.visible = false;
        }
        //页面背景音乐
        if(GM.ImageLibrary[data.BGM]){
            this.bgmusicId = data.BGM;
            this.bgmAudio  = GM.ImageLibrary[data.BGM].Url;
        }

        //页面提示音和提示音播放状态
        if(data.Prompt)
        {
            this.Prompt = GM.ImageLibrary[data.Prompt].Url;
            RoomScene.getInstance().creatIcon(data.HasAutoPrompt,this.Prompt,data.Prompt);
        }
        
        //过场动画
        this.OpAnimationType = data.OpAnimationType;  
        let oldbox = RoomScene.getInstance().oldbox;
        //添加背景音乐
        if(oldbox && this.bgmAudio === oldbox.bgmAudio){
            if(RoomScene.getInstance().bgMusic){
                this.musicTime = RoomScene.getInstance().bgMusic.position;
            }
        }

        RoomScene.getInstance().bgMusic = null;   
        Laya.SoundManager.stopMusic();
        //暂时不确定，json中有没有OpAnimationType属性，以后将this.OpAnimationType条件去掉   
        if(RoomScene.getInstance().next && this.OpAnimationType){
            RoomScene.getInstance().bottom.disabled = true;
            RoomScene.getInstance().btnLeft.disabled = true;
            RoomScene.getInstance().btnRight.disabled = true;
            RoomScene.getInstance().btnTop.disabled = true;
            oldbox.unEvents();
            oldbox.timeOutFrameLoopEvent();
            if(this.OpAnimationType === 4){
                //擦除动画
                let catM = new window.catMaskUI();
                catM.BG.skin =  this.bgurl;
                oldbox.addChild(catM);
                catM.catMaskAni.on(Laya.Event.COMPLETE,this,()=>{
                    oldbox.dispose();
                    this.showSceneItem(data);                   
                });
            }
            else if(this.OpAnimationType === 3){
                Laya.SoundManager.playSound("sound/walk.mp3");
                //走路动画
                Laya.Tween.from(this,{x:this.x + 1200},1800,Laya.Ease.linearIn,null,0,true);
                Laya.Tween.to(oldbox,{x:oldbox.x - 1200},1800,Laya.Ease.linearIn,Laya.Handler.create(this,()=>{
                    oldbox.dispose();
                    this.showSceneItem(data);      
                    Laya.SoundManager.stopSound("sound/walk.mp3");
                }),0,true);
            }
            else if(this.OpAnimationType === 2){
                let flyUI = new window.curAniUI();
                oldbox.addChild(flyUI);
                flyUI.fly.addLabel('move', 1);
                flyUI.fly.addLabel('move', 11);
                flyUI.fly.addLabel('move', 20);
                flyUI.fly.addLabel('fly', 35);
                flyUI.fly.addLabel('flyend', 150);
                flyUI.fly.addLabel('white', 185);
                flyUI.fly.on(Laya.Event.LABEL,this,(ev)=>{
                    if(ev === 'move'){
                        Laya.SoundManager.playSound("sound/fly/move.mp3");
                    }
                    else if(ev === 'fly'){
                        Laya.SoundManager.playSound("sound/fly/fly.mp3");       
                    }
                    else if(ev === 'flyend'){
                        Laya.SoundManager.stopSound("sound/fly/fly.mp3");   
                    }
                    else if(ev === 'white'){                       
                        Laya.SoundManager.playSound("sound/fly/white.mp3"); 
                    }
                });
                flyUI.fly.on(Laya.Event.COMPLETE,this,()=>{
                    let whitebg = new Laya.Image("res/animate/anibg.png");
                    this.addChild(whitebg);
                    oldbox.dispose();                  
                    Laya.Tween.to(whitebg,{alpha:0},2000,Laya.Ease.linearIn,Laya.Handler.create(this,()=>{
                        this.showSceneItem(data);
                        this.removeChild(whitebg);
                    }),0,true);
                }); 
            }else if(this.OpAnimationType === 1){
                let roadUI = new window.ui.roadUI();
                oldbox.addChild(roadUI);
                roadUI.car.addLabel('carShow', 50);
                roadUI.car.addLabel('move', 2);
                roadUI.car.addLabel('move', 15);
                roadUI.car.on(Laya.Event.LABEL,this,(ev)=>{
                    if(ev === 'carShow'){
                        Laya.SoundManager.playSound("sound/carShow.mp3");
                    }else if(ev === 'move'){
                        Laya.SoundManager.playSound("sound/fly/move.mp3");
                    }
                });

                roadUI.car.on(Laya.Event.COMPLETE,this,()=>{
                    Laya.timer.once(700,this,()=>{
                        Laya.Tween.from(this,{x:this.x + 1200},1800,Laya.Ease.linearIn,null,0,true);
                        Laya.Tween.to(oldbox,{x:oldbox.x - 1200},1800,Laya.Ease.linearIn,Laya.Handler.create(this,()=>{
                            oldbox.dispose();
                            this.showSceneItem(data);
                        }),0,true);
                    });                  
                }); 

            }else{
                //只要前面动画进不去，那就是播放默认
                //无动画，直接往下走
                oldbox.dispose();
                this.showSceneItem(data);
            }
        }
        else{
            //由于前面暂时加的this.OpAnimationType条件，有可能导致oldbox还存在
            if(oldbox){
                oldbox.dispose();
            }
            this.showSceneItem(data);
        }             
    }
  
    //添加页面元素    
    showSceneItem(data){    
        //添加背景音乐以及按钮状态
        this.buttonInit();
        let picList = data.ElementList;
        let item;
        for(let i= 0; i < picList.length; i++ ){ 
            if(picList[i].NickName == "dian_gif" || picList[i].NickName === "feng_gif" || picList[i].NickName === "qing_gif" ||  picList[i].NickName === "xue_gif" || picList[i].NickName === "yu_gif")
            {
                //特殊gif
                item = new gifElement(picList[i]);
            }else{
    
                if(picList[i].TypeElement === 0){
                    item = new Picture(picList[i]); 
                    
                }
                else if(picList[i].TypeElement === 3){
                    item = new Label(picList[i]); 
                }
                else if(picList[i].TypeElement === 4){
                    // console.log("我是骨骼动画");
                    item = new spineAnimation(picList[i]);
                }
                else if(picList[i].TypeElement === 5){
                    item = new combinationbox(picList[i]);
                }
            }  
            
            this.dicname[item.name] = item; 
            this.pictureItem.push(item);   
            //console.log(this.pictureItem.length);
            this.addChild(item);          
            item.visible = false;             
            // 出现顺序 按index出现 0的直接出现
            if(item.DriveType == 0 && item.index == 0){ 
                //判断是否老师可见                      
                this.IsStudentsInvisible(item);
                if(item.Animation){
                    let animation = new Animation(item,item.Animation);     
                }                         
            }else if(item.DriveType == 0){
                //DriveType 为1 是不根据index出现的 不需要放入pagechild
                this.pageChild.push(item); 
            }  
            // 存放答案区
            if(item.TagType === 2 ){
                this.answerArea.push(item);
                this.targetTypelength++;
                // 答案组里面的表标签排序
                this.storeAnswerlabels(item.EventList,item);
            }
            if(item.TagType === 5){
               this.ElementIdAction.push(item);
            } 
    
            //存放事件元素
            if(item.TagType === 1 || item.TagType === 3 || item.TagType === 4){
                 this.elementVisible.push(item);
            }
             //判断是否有元素视频 音频
            if(item.MediaId != null && GM.ImageLibrary[item.MediaId]){         
                  this.addElementMedia(item);
            }                                   
        }

        //判断上一步下一步按钮是否置灰          
        this.jujedButtondisable();  
        if(GM.role === 0){
            this.pictureEvent();
            // this.elelmentControl();
        }
        //根据答案区判断答题按钮和子弹面板按钮
        this.jujedAnswerbtn();
        //判断答案qu和元素是否可见
        this.jujdeanswerPoint();
        //1v1老师最后一页添加课后报告按钮
        //  && GM.From != 0
        if(data.PageNum === GM.LIBRARY.length && GM.role === 0){
            this.addAfterreport();
        }  

        //给room添加mouseclick
        this.on(Laya.Event.MOUSE_DOWN,RoomScene.getInstance().mouseP,RoomScene.getInstance().mouseP.sendMouseclick); 

        //添加旁白功能      
        if(this.ElementIdAction.length>0){  
             for(let i = 0;i < this.ElementIdAction.length;i++){
                 //驱动方式为自动时  直接出现  
                 if(this.ElementIdAction[i].DriveType === 0 && this.ElementIdAction[i].visible){                       
                     this.asideHandler(this.ElementIdAction[i])                     
                 }              
             }                  
        }
        //在元素组中的答案组添加顺序以及添加出现消失事件
        if(this.ElementGroup){
             if(this.ElementGroup.ElementInfoList.length > 0){
                this.Answergroup(this.ElementGroup);
             }  
        }
       
    }

    //初始化背景音乐以及按钮状态
    buttonInit(){
        if(this.bgmAudio){
            RoomScene.getInstance().bottom.bgsoundBtn.visible = true;
            console.log(Laya.SoundManager.musicMuted);
            if(!Laya.SoundManager.musicMuted){
                if(messageCenter.soundoutPlay()){ 
                    messageCenter.emit("playmusic",{id:this.bgmusicId,statu:"open"});      
                }else{
                    RoomScene.getInstance().bgMusic = Laya.SoundManager.playMusic(this.bgmAudio,0,null,this.musicTime);
                }
            }      
        }else{
            RoomScene.getInstance().bottom.bgsoundBtn.visible = false;
        }
        //按钮状态
        RoomScene.getInstance().bottom.disabled = false;
        RoomScene.getInstance().btnRight.disabled = false;    
        RoomScene.getInstance().btnLeft.disabled = false;   
        RoomScene.getInstance().btnTop.disabled = false;      
        RoomScene.getInstance().btnRight.gray = true;
        RoomScene.getInstance().btnLeft.gray = true;   
        RoomScene.getInstance().cancel.disabled = true;
    }

    //添加元素多媒体状态(包括元素的视频以及音频)
    addElementMedia(item){
        //在元素左上角添加打开按钮
        let itemMedieButton;
        let mediaurl = GM.ImageLibrary[item.MediaId].Url;
        if(GM.ImageLibrary[item.MediaId].type === "audio"){          
            itemMedieButton = new audioIcon(item.MediaMode,GM.ImageLibrary[item.MediaId].Url,item.MediaDelay,item.MediaId);  
            itemMedieButton.name = "audio";
            this.elementAudio = GM.ImageLibrary[item.MediaId].Url;
            itemMedieButton.visible = false;
            item.addChild(itemMedieButton);   
            if(item.visible && GM.ImageLibrary[item.MediaId].type === "audio"){                       
                if(GM.role === 0){                         
                    if(itemMedieButton.MediaMode != 1){
                        itemMedieButton.visible = true;  
                    }                                            
                }
                item.find("audio").constrolMediaMode();  
            }     
                
        }
        else if(GM.ImageLibrary[item.MediaId].type === "video"){                  
            itemMedieButton = new Laya.Image('res/commonn/icon_vd.png');               
            itemMedieButton.on(Laya.Event.CLICK,this,()=>{                 
                RoomScene.getInstance().videoObj.init(mediaurl);                       
            });     
            if(GM.role === 0){
                itemMedieButton.visible = true;  
                item.addChild(itemMedieButton); 
            }            
        }
      
        itemMedieButton.size(30,30);
        if(item.find("spineani")){
            itemMedieButton.scale(itemMedieButton.scaleX/itemMedieButton.globalScaleX,itemMedieButton.scaleY/itemMedieButton.globalScaleY);        
        }
        itemMedieButton.anchorX = 0.5;
        itemMedieButton.anchorY = 0.5;
        itemMedieButton.x = item.width/2;  
        if(item.MirrorX == -1){
            itemMedieButton.skewY =  180; 
        }        
        if(item.MirrorY == -1){
            itemMedieButton.y =  item.height;
            itemMedieButton.skewX =  180;
        }    
        else{
            itemMedieButton.y = -10;               
        }                      
    }

    //元素老师可见功能
    IsStudentsInvisible(item){
        if(item.IsStudentsInvisible === true){
            if(GM.role === 0 ){
                item.visible = true;
            }
        }else{
            item.visible = true;
        }
    }
            
    //添加课后报告
    addAfterreport(){
        this.reportBtn = new Laya.Image("res/reports/baogao.png");
        this.addChild(this.reportBtn);
        this.reportBtn.right = 50;
        this.reportBtn.bottom = 100;
        this.reportBtn.on(Laya.Event.CLICK,this,()=>{
            console.log("课后报告");
            messageCenter.emit("getReport");
        });
        let figerreport = new figeReportUI();
        this.reportBtn.addChild(figerreport);
        figerreport.bottom = this.reportBtn.height +10;
        figerreport.left = - figerreport.width/2+45;
    }

    //根据答案组判断答题按钮和子弹面板按钮
    jujedAnswerbtn(){
        if(this.targetTypelength === 0 &&　!this.puzzleFlag){           
            RoomScene.getInstance().answerBtn.disabled = true;
            RoomScene.getInstance().bottom.buttetBtn.disabled = true;          
        }else{
            RoomScene.getInstance().answerBtn.disabled = false; 
            RoomScene.getInstance().bottom.buttetBtn.disabled = false;  
        }
    }
   
    //页面旁白元素
    asideHandler(item){ 
        // 0点击  1出场 2  出场点击并存
        let obj,sounda;
        if(item.MediaMode === 1 || item.MediaMode === 2){    
            if(item.find("audio")){
                let sounda = item.find("audio").sounda;
                //学生旁白根据声音时长走          
                if(messageCenter.soundoutPlay()){
                    if(sounda){
                        // messageCenter.emit("console",{text:"app播放"});     
                        let time = item.find("audio").sounduration; 
                        // messageCenter.emit("console",time);       
                        if(item.EventList.length > 0 ){
                            // for(let i in item.EventList){        
                                obj = item.EventList[0]; 
                            // }
                        }
                        // messageCenter.emit("console",obj); 
                        Laya.timer.once(time*1000,this,this.showClearEventList,[obj]);
                    }
                    
                }else{                   
                      if(sounda){
                            if(sounda.duration!= 0){
                                RoomScene.getInstance().Sounduration = sounda.duration;      
                            }                  
                            if(item.EventList.length > 0 ){
                                // for(let i in item.EventList){        
                                    obj = item.EventList[0]; 
                                // }
                            }         
                            console.log(RoomScene.getInstance().Sounduration);            
                            Laya.timer.once(RoomScene.getInstance().Sounduration*1000,this,this.showClearEventList,[obj]);
                      }          
                }               
            } 
        }  
    }
   
    //页面答案组初始化
    storeAnswerlabels(EventList,item){     
        // 按照OrderIndex进行标签排序
        if(EventList){
               item.answertagArray = [];
               let list = this.Answerlabelssort(EventList);
               for(let i = 0;i<list.length;i++){
                    item.answertagArray.push({index:i,EventList:list[i]});
               }
        }   
    }

    //页面答案组里面的标签排序
    Answerlabelssort(list){     
        var listArr = [];
        list.forEach((el,index) => {
              for(var i=0;i<listArr.length;i++){
                // 对比相同的字段key，相同放入对应的数组
                if(listArr[i].OrderIndex == el.OrderIndex){
                    listArr[i].listInfo.push({
                        EventTag: el.EventTag,
                        EventList: el
                    });
                    return;
                }
            }
            // 第一次对比没有参照，放入参照
            listArr.push({
                OrderIndex: el.OrderIndex,
                listInfo: [{
                    EventTag: el.EventTag,
                    EventList: el
                }]
            }); 
        })
       
        return listArr.sort(this.compare('OrderIndex'));
    }

    //页面元素组初始化
    Answergroup(ElementGroup){
        console.log("ElementGroup",ElementGroup);       
        //根据index给相同index的元素归类
        let list = this.acordNumsort(ElementGroup.ElementInfoList);
        console.log(list);
        // 确定满足次数  等于0 以及大于元素组length的 满足次数等于length
        if(ElementGroup.SatisfyNum > 0 &&　ElementGroup.SatisfyNum < ElementGroup.ElementInfoList.length){
            this.AnswerSatisfyNum = {
                SatisfyNum:ElementGroup.SatisfyNum,
                CEvent:ElementGroup.CEvent
            }
        }else{
             this.AnswerSatisfyNum = {
                SatisfyNum:ElementGroup.ElementInfoList.length,
                CEvent:ElementGroup.CEvent
            }
        }
        console.log("全部答对次数以及答对的效果",this.AnswerSatisfyNum);
        //给相同元素组合进行排序
        for(let i = 0;i< list.length;i++){
            this.addelementparamandIndex(list[i].listInfo,i)
        }
        
    }
    //页面元素组元素排序
    addelementparamandIndex(list,index){
        for(let i = 0;i < list.length;i++){    
            if(this.dicname[list[i].Name]){
                this.dicname[list[i].Name].isElementGroup = {index:index}; 
                this.dicname[list[i].Name].isElementSame = true;
                console.log(this.dicname[list[i].Name])  ;  
            }     
        }
    }

    // 页面元素中相同元素归类
    acordNumsort(list){     
        var listArr = [];
        list.forEach((el,index) => {
              for(var i=0;i<listArr.length;i++){
                // 对比相同的字段key，相同放入对应的数组
                if(listArr[i].Num == el.Num){
                    listArr[i].listInfo.push({
                        Num: el.Num,
                        Name: el.Name
                    });
                    return;
                }
            }
            // 第一次对比没有参照，放入参照
            listArr.push({
                Num: el.Num,
                listInfo: [{
                    Num: el.Num,
                    Name: el.Name
                }]
            }); 
        })
       
        return listArr.sort(this.compare('Num'));
    }

    // 按照OrderIndex进行标签排序
    compare(property){
        return function(a,b){
            var value1 = a[property];
            var value2 = b[property];
            if(value1 === value2){

            }
            return value1 - value2;
        }
    }

    // 答案区满足的Eventlist
    showClearEventList(EventList){
        let ElementId, ClearElementId    
        let delay = EventList.Delay*1000; 
        // 元素的name有可能有好几个放一个数组里
        if(EventList.ElementId != "" && EventList.ElementId != null){
            ElementId = EventList.ElementId.split(',');
            Laya.timer.once(delay,this,()=>{
                // 元素出现
                this.showClearElement(ElementId,0);  
            });        
        }
        if(EventList.ClearElementId != "" && EventList.ClearElementId != null){
            ClearElementId =  EventList.ClearElementId.split(',');
            Laya.timer.once(delay,this,()=>{        
                // 元素消失
                this.showClearElement(ClearElementId,1);  
            });       
        }
        if(EventList.SwitchBoneId){
             // 切换动画
            this.switchSpineani(EventList.SwitchBoneId);
        }
       
    }

    //骨骼动画切换
    switchSpineani(res){
        console.log(SwitchBoneId);
        // 判断出现消失里面是否有SwitchBoneId字段
        let Element;
        let SwitchBoneId = JSON.parse(res);
        if(SwitchBoneId.length > 0 ){
            for(let i = 0;i<SwitchBoneId.length;i++){
                Element = this.dicname[SwitchBoneId[i].Id];
                Element.visible = true;
                Element.changePlaystyle(SwitchBoneId[i].Action);
            }

        }   

    }


    //答案区满足的Eventlist元素出现或者消失
    showClearElement(name,type){
        // 0是出现 1 是消失
        let ElementId;
        let sta = false;
        for(let j = 0; j < name.length; j++ ){
            ElementId = this.dicname[name[j]];          
            if(ElementId){              
                if(type == 0){ 
                    sta = true;   
                    this.IsStudentsInvisible(ElementId)    
                    let animation = new Animation(ElementId,ElementId.Animation);                                                 
                    //带出元素事旁白并且有声音的则设置出场方式为自动
                    let showaudio = ElementId.find("audio");
                    if(showaudio){     
                        showaudio.MediaMode = 1;                       
                        showaudio.constrolMediaMode();                                        
                    }                                           
                }else if(type == 1){
                    sta = false;    
                    ElementId.visible = false;    
                    if(ElementId.TagType === 4){
                        console.log("消失的元素是连线",ElementId);
                        //消失的元素如果是可连线的
                        for(let i in this.events){
                            if( ElementId.name === this.events[i].name){
                                this.events[i].destroyimageLigature();
                            }
                        }
                        console.log(this.events);
                    }           
                                             
                }    
                let obj = {
                    element : ElementId,
                    stat : sta
                };
                this.eventItems.push(obj); 
            }      
        }

        //出现和消失都需要判断开始答题按钮是否可答题状态
        this.jujdeanswerPoint();

    }

    //判断上一步下一步按钮是否置灰
    jujedButtondisable(){    
        if(this.pageChild.length === 0){
            observer.unsubscribe("updateStep");
            RoomScene.getInstance().btnNext.disabled = true;
        }
        else{
            RoomScene.getInstance().btnNext.disabled = false;
        }
    }
   
    // 背景音乐交互 
    bgmusicPlay(data){  
        if(data.statu === "close"){
            //手机端背景音乐外放
            Laya.SoundManager.musicMuted = true;
            if(messageCenter.soundoutPlay()){
                messageCenter.emit("playmusic",{id:this.bgmusicId,statu:"close"});              
            }       
        }else if(data.statu === "open"){
            Laya.SoundManager.musicMuted = false;
            if(messageCenter.soundoutPlay()){
                messageCenter.emit("playmusic",{id:this.bgmusicId,statu:"open"});              
            }else{             
                if(this.bgmAudio){
                    Laya.SoundManager.playMusic(this.bgmAudio);
                }
            }            
        }   
    }

    // 根据TagType事件类型绑定事件
    pictureEvent(){ 
        this.itemDic = [];
        for (let i = 0;i<this.pictureItem.length;i++){
            let temp;
            if(this.pictureItem[i].TagType == 1)
            {
                temp = new DragEvent(this.pictureItem,this.pictureItem[i]);
                //字典
                this.itemDic[this.pictureItem[i].name]  = this.pictureItem[i];
            }else if(this.pictureItem[i].TagType == 3)
            {   
                temp = new ClickEvent(this.pictureItem,this.pictureItem[i]);
                this.itemDic[this.pictureItem[i].name]  = this.pictureItem[i];

            }else if(this.pictureItem[i].TagType == 4)
            {   
                temp = new LigatureEvent(this.pictureItem,this.pictureItem[i]);
                //字典
                this.itemDic[this.pictureItem[i].name]  = this.pictureItem[i];
            }
             else if(this.pictureItem[i].TagType == 6){
                this.puzzleFlag = true;
                // console.log("我是 拼图");
                let  temp = new puzzleEvent(this.pictureItem,this.pictureItem[i]);
                //字典
                this.itemDic[this.pictureItem[i].name]  = this.pictureItem[i];
            }    
          
            //销毁时遍历所有temp内的dispose函数
            if(temp){
                this.events.push(temp);
            }     
        }

    }

    //判断答案区和可点可拖元素是否可见
    jujdeanswerPoint(){
        //遍历所有答案区和元素是否可见 
        let index = 0;
        let flag = false;
        if(this.answerArea.length>0){
            for(let i in this.elementVisible){
            //元素可见  并且 这个元素的答案区也在
                for(let j in this.answerArea){
                    if(this.elementVisible[i].visible && this.answerArea[j].visible){
                        if(this.answerArea[j].EventList != null){
                            for(let k = 0; k<this.answerArea[j].EventList.length;k++){
                                if(this.elementVisible[i].Tag === this.answerArea[j].EventList[k].EventTag){
                                    index++;
                                    break;
                                }
                            }      
                        }
                           
                    }
                }
            }
            if(index > 0 ){
                this.answerVisible = true;
            }
            else{
                this.answerVisible = false;
            }

            if(this.answerVisible && !RoomScene.getInstance().answerFinishFlag){
                RoomScene.getInstance().answerBtn.disabled = false;
            }else{
                if(!this.puzzleFlag){
                     RoomScene.getInstance().answerBtn.disabled = true;
                }
               
            }

        }
    }
   
    //设置层级
    answerIndexChange(item){
        let index = this._childs.length -1;
        this.setChildIndex(item,index);
    }

    //重置位置
    resetState(){
        this.resetAnswerbox();
        for(let i in this.pictureItem){     
            if(this.puzzleFlag){
                this.pictureItem[i].rotation = this.pictureItem[i].Rotation;
            }
            let postionX = Number(this.pictureItem[i].Position.split(',')[0])  + this.pictureItem[i].width/2;  
            let postionY = Number(this.pictureItem[i].Position.split(',')[1])  + this.pictureItem[i].height/2;    
            if(this.pictureItem[i].x != postionX || this.pictureItem[i].y != postionY){
                    this.pictureItem[i].x = postionX;
                    this.pictureItem[i].y = postionY;
            } 
        }
    }

    //重置答案组
    resetAnswerbox(){
       for(let i in this.answerArea){
           this.storeAnswerlabels(this.answerArea[i].EventList,this.answerArea[i]);
       }      
    }

    //解绑以及销毁事件
    timeOutFrameLoopEvent(destroyEvent){       
         //console.log("取消事件");
        for(let i in this.itemDic){
            this.offEvent(this.itemDic[i]);
        }   

        if(destroyEvent === undefined){
            //将事件中所有实例化的对象销毁掉
            for(let i in this.events){
                this.events[i].dispose();
            }
            this.events = [];
        }  
    }

    //解绑事件
    offEvent(item){
        item.offAll();
    }

    //元素状态还原
    returnitems(){
        this.eventItems = this.eventItems.reverse();
        for(let i in this.eventItems){
            this.eventItems[i].element.visible = !this.eventItems[i].stat;
        }
        this.eventItems = [];
    }
    
    //判断tag是否相同
    listshiftfirst(Tag,item,data){
        let flag = false;
        let list;
        if(Tag.answertagArray.length > 0 ){
              if(Tag.answertagArray[0].EventList){
                list = Tag.answertagArray[0].EventList.listInfo;
              }        
        }
        if(list){
              for(let i = 0;i<list.length;i++){
                if(item.Tag === list[i].EventTag){
                    flag = true;             
                    this.stsicAnswerone(Tag,list[i],item);                                   
                    //根据index删除里面tag标签
                    let index = list.indexOf(list[i]); 
                    list.splice(index,1)
                    if(list.length === 0){  
                        this.OrderIndex++;                      
                        Tag.answertagArray.shift();
                        this.stsicAnswergroup(Tag,data);             
                    } 
                    break;                 
                }
            }
            // 返回true
            if(flag){
                return flag;
            }
        }        
    }

    //满足其中一个答案区
    stsicAnswerone(Tag,TagEventList,item,data){               
        //展示出现消失元素
        Laya.SoundManager.playSound('sound/Events/smallWin.mp3'); 
        this.showClearEventList(TagEventList.EventList);   
    }
 
    // 满足其中一个答案组
    stsicAnswergroup(Tag,data){
        if(Tag.answertagArray.length === 0){
            this.ElementIndex++;
            this.OrderIndex = 0;
            if(Tag.isElementGroup){
                this.isElementGroupNum ++;
            } 
        }    
        this.bringOutElement(data);               
     }
   
    //答题组以及元素组判对
    bringOutElement(data){ 
        let rightFlag = false;
        // 答案组满足
        if(this.ElementIndex === this.answerArea.length){
            rightFlag = true;
        }
        //元素组存在 && 元素组满足次数SatisfyNum达到
        if(this.ElementGroup.ElementInfoList.length > 0 &&　!this.isElementGroupFlag ){
            if(this.isElementGroupNum === this.AnswerSatisfyNum.SatisfyNum){
                if(this.ElementGroup.ElementInfoList.length === this.targetTypelength){
                     rightFlag = true;                 
                }
                //元素组只满足一次
                this.isElementGroupFlag = true;
                this.showClearEventList(this.AnswerSatisfyNum.CEvent);
            }
        }
       //判断答题次数是否等于答案组次数
       if(rightFlag){ 
            if(GM.role === 1 && GM.classMode === "1v6" && data === undefined){
                //1v6情况 学生答对告诉告诉老师答题正确
                this.sendAnswer("allright",null,null,null,null,null,null,3);   
            }
            //学生视角则只播放动画，无需重置 无排名
            //老师视角 老师自己显示 并且发送
            if(GM.role === 0 && RoomScene.getInstance().changeroleStudentId){      
                // observer.publish("winwin");
            }else{
                this.answerCorrect(data);
            }        
        }
        else{
            Laya.SoundManager.playSound('sound/Events/smallWin.mp3'); 
        }      
    }

    //答题正确后处理
    answerCorrect(data){     
        //答题正确后重置参数
        this.isWined = true;
        this.answerparamreset();
        RoomScene.getInstance().answering = true; 
        // 开始答题按钮置灰
        if(GM.role === 0){
            RoomScene.getInstance().changeAnswerBtn('finish');
        }    
        //上一元素下一元素判断状态   
        this.jujedButtondisable();   
        // 如果背景音乐存在则播放，不存在则停止答题音效
        // if(this.bgmAudio){
        //     RoomScene.getInstance().bgMusic = Laya.SoundManager.playMusic(this.bgmAudio);           
        // }else{
        //     Laya.SoundManager.stopMusic();  
        // }     
        if(GM.flag === 0){
            observer.publish("winwin");
        } 
          
        // data.role不为空，说明是room里面进来的，然后自己又是老师那么发送你赢了弹层。
        if(GM.role === 0){
            //你赢了弹层开启
            messageCenter.emit("rankView",{ranknum : 0 , showDialog :true  , stuId : GM.senderId, stat : "Open"});  
        }
        // 答题结束后,如果有提示音按钮则置为false
        if(GM.role === 1){
            if(RoomScene.getInstance().audioItem){
                RoomScene.getInstance().audioItem.visible = false;
            }
        }
        //取消countDownView   
        if(RoomScene.getInstance().countUI){   
            //发送学生答题过程
            Laya.timer.once(1000,this,()=>{
                //学生自己答题data是undefined,老师答题学生通过answerfinsh进入这个函数data一定不为空，那就不走下面的if
                if(GM.role === 1){
                    let userTime = 0;
                    let alltime  = 999;
                    if(RoomScene.getInstance().countUI.countUI){
                        let timertext = Number(RoomScene.getInstance().countUI.countUI.count.text);
                        alltime = Number(RoomScene.getInstance().countTimer)
                        userTime = alltime - timertext-1;     
                    }   
                    else{
                        userTime = Number(RoomScene.getInstance().countUI.useTime)-1; 
                    }
                 
                    this.proloadHandler(userTime,this.sendFeedArr);       
                    
                    this.sendFeedLog(userTime,alltime,this.sendFeedArr);  
                                                    
                }         
                Laya.timer.clearAll(RoomScene.getInstance().countUI);
                RoomScene.getInstance().removeChild(RoomScene.getInstance().countUI);  
            });
            
        }
        //解绑所有事件，无需销毁
        this.timeOutFrameLoopEvent(true);
        this.soundflage = true;

    }

    answerparamreset(){
        this.ElementIndex = 0;
        this.OrderIndex = 0;     
        this.isElementGroupNum = 0;
    }

     // 答题正确随机动画
    answercorrectAnimation() {   
        this.randoma = Math.ceil(Math.random()*3);  
        if(this.randoma === 1 ){
                if(this.soundflage){
                    this.soundflage = false;
                    Laya.SoundManager.playSound("sound/newsound/wincao.mp3");  
                }                         
                this.zhihuicao.pos(-100,1000);  
                this.addChild(this.zhihuicao); 
                this.zhihuicao.play(0,false);
                Laya.Tween.to(this.zhihuicao,{x:90,y:800,rotation:45,scaleX:0.7,scaleY:0.7},500,Laya.Ease.linearIn,Laya.Handler.create(this,()=>{
                    Laya.Tween.to(this.zhihuicao,{x:90,y:800,rotation:45,scaleX:0.7,scaleY:0.7},1000,Laya.Ease.linearIn,Laya.Handler.create(this,()=>{
                       Laya.Tween.to(this.zhihuicao,{x:-100,y:1000,rotation:45,scaleX:0.7,scaleY:0.7},500,Laya.Ease.linearIn,Laya.Handler.create(this,()=>{               
                            this.removeChild(this.zhihuicao);
                            this.zhihuicao.destroy();
                    }),0,true);
                    }),0,true);
                }),0,true);
        }else if(this.randoma === 2){         
             Laya.SoundManager.playSound("sound/newsound/windou.mp3");          
             this.douzi.scale(0.7, 0.7)
             this.douzi.pos(100,800);
             this.douzi.play(0,false);
             this.addChild(this.douzi);
             this.douzi.on(Laya.Event.STOPPED,this,() => {
               this.removeChild(this.douzi);
               this.douzi.destroy();
             });    
            
        }else if(this.randoma === 3){     
            Laya.SoundManager.playSound("sound/newsound/winfish.mp3");           
            this.winjinyu.scale(0.4, 0.4)
            this.winjinyu.pos(1200,970);
            this.winjinyu.play(0,false);
            this.addChild(this.winjinyu);
            this.winjinyu.on(Laya.Event.STOPPED,this,() => {
                this.removeChild(this.winjinyu);
                this.winjinyu.destroy();
            });         
        }  
    }
  
    // 回答错误的随机动画提示  点击题，拖拽题，连线题都用了    
    answerErrorAnimation(){
        this.random = null;
        this.answererroyNum++;
        // 本次连续3次错误提醒，下一次连续5次错误提醒，3 跟 5 循环出现
        if ((this.answererroyNum == 3 && this.nextAnswererroyNumNum == 3) || (this.answererroyNum == 5 && this.nextAnswererroyNumNum == 5)) {
            this.random = Math.ceil(Math.random()*2);
            this.nextAnswererroyNumNum = this.nextAnswererroyNumNum == 3 ? 5 : 3                
        }
        if(this.random) {
            let errani;
            switch(this.random)
            {
                case 1:
                    errani = new createSkeleton("res/newani/dawang_sikao");
                    Laya.SoundManager.playSound("sound/newsound/errorhead.mp3"); 
                    errani.scale(0.4, 0.4);
                    break;
                default:                   
                    Laya.SoundManager.playSound("sound/newsound/errorlook.mp3"); 
                    errani = new createSkeleton("res/newani/guancha");
                    errani.scale(0.3, 0.3);
            }
            errani.pos(-100,800);
            Laya.Tween.to(errani,{x:300,y:800},500,Laya.Ease.linearIn,null,500,false);
            errani.name = "errani";
            errani.play(0,false);
            this.addChild(errani);
            this.errani = errani;
            // 有个一问题，点击太快，动画出来后就不会消失了
            errani.on(Laya.Event.STOPPED,this,() => {
                this.destroyAni("errani");
                this.errani = null;
                this.answererroyNum = 0;
            });          
        }
    }
    //销毁动画
    destroyAni(name){
        let aniArray = this.find(name);
        this.aniArray.push(aniArray);
        for(let i in this.aniArray){
            this.removeChild(this.aniArray[i]);
            this.aniArray[i].destroy();
        }
    }

    //处理完成度  分析超时答对
    proloadHandler(usertime,arr){
        let data;
        let index = 0;
        if(usertime > 0){
            // 全部答对
             data = {
                    usertime:usertime,
                    proload:1
                }

        }else{
            //超时
             for(let i in arr){
                if(arr[i].answerstate === 0){
                    index++;
                }
             }
             let pre = index/this.targetTypelength;
             data = {
                 usertime:-1,
                 proload:pre
             }
            
        }
        RoomScene.getInstance().pageAnswwerall.push(data);
    }

    //发送学生答题过程
    sendFeedLog(usertime,alltime,progress){
        console.log("log11111111111111",progress);
        messageCenter.emit("log",{nickName:GM.nickName,senderId:GM.senderId,roleType:GM.roleType,pageNum:this.PageNum-1,usertime:usertime,alltime:alltime,progress:progress});
        // 每次答完题目发送数据后把数组清空
        this.sendFeedArr = [];        
    }

     //粒子特效 
    showParticle(x,y,name){
        let settings = Laya.loader.getRes(name);
        let sp = new Laya.Particle2D(settings);
        sp.emitter.start();
        sp.play();
        Laya.stage.addChild(sp);
        this.particels.push(sp);
        sp.x = x
        sp.y = y;
        Laya.timer.once(1000,this,()=>{
            sp.stop();
            sp.destroy();
        });  
	}
  
    //下一步
    showItem(){       
        if(this.pageChild.length === 0){
            return;
        }
        //老师和学生的记录全部清除
        RoomScene.getInstance().answerFinsihLengths  = [];
        let indexarray = this.pageChild[0].index; 
        let index = 0;
        let allRemoveObj = []; //所有删除的元素集合
        let removeIndex =[];   //所有删除的Index索引
        let postionX,postionY;
       
        for(let k = 1; k < this.pageChild.length; k++)
        {
             if(this.pageChild[k].DriveType == 0){
             
                if(indexarray > this.pageChild[k].index){
                    indexarray = this.pageChild[k].index;           
                }    
             }
                  
        } 
        
        for(let i = 0 ; i < this.pageChild.length; i++)
        {
             if(indexarray == this.pageChild[i].index){               
                 this.IsStudentsInvisible(this.pageChild[i])
                 //console.log(this.pageChild[i].index);
                 postionX = Number(this.pageChild[i].Position.split(',')[0]);  
                 postionY = Number(this.pageChild[i].Position.split(',')[1]);  
                 let animation = new Animation(this.pageChild[i],this.pageChild[i].Animation);  
                 if(this.pageChild[i].action){
                    this.pageChild[i].playandStop(0);
                 }  
                 if(this.pageChild[i].find("audio")){    
                        this.pageChild[i].find("audio").constrolMediaMode();                                                     
                 }    
                  //记录下删除的对象
                 removeIndex.push(i);
           }           
        } 

        for(let j = 0 ;j < removeIndex.length; j++)
        {
            let removetemp =  this.pageChild.splice(removeIndex[j] - j,1);

            allRemoveObj.push(removetemp[0]);
        }

        if(allRemoveObj.length == 1){
                //每次点击下一步时保存之前的所有信息
                let sBFI = new SaveBeforeInfo(allRemoveObj[0],index,null);           
               //将数据对用OperationIndex步数放入objPool列表
                this.objPool[this.OperationIndex] = sBFI;
        }else{
               //每次点击下一步时保存之前的所有信息
                let sBFI = new SaveBeforeInfo(null,index,allRemoveObj);
               //将数据对用OperationIndex步数放入objPool列表
                this.objPool[this.OperationIndex] = sBFI;
        }
        
        this.OperationIndex++;  

        //this.pageChild长度变0，说明没有下一步，下一步按钮置灰
        if(this.pageChild.length === 0){
            RoomScene.getInstance().btnNext.disabled = true;
        }
        //CourseVideo
        if(RoomScene.getInstance().cancel.disabled){
            RoomScene.getInstance().cancel.disabled = false;
        }
        this.jujdeanswerPoint();
    }
 
    //返回上一步：
    returnBefore(){ 
        //老师和学生的记录全部清除
        RoomScene.getInstance().answerFinsihLengths  = []; 
        this.answerArray = [];   
        //当没有在答题时才可以重新添加事件
        //将事件中消失和隐藏的元素相反          
        this.returnitems();
        //解绑所有事件 防止重复添加
        this.timeOutFrameLoopEvent();
        this.unEvents();    
        //清空itemDic，然后添加事件
        this.resetState();
        //答题开启后 给学生添加上事件 否则给老师添加上事件
        //false代表开始答题
        if(RoomScene.getInstance().answering){
            if(GM.role === 0){
                this.pictureEvent();
            } 
        }else{       
            if(GM.role === 1){
                this.pictureEvent();
            }  
        }
        this.OperationIndex--;
        if(this.objPool[this.OperationIndex].TempData != null){
            //将对应的元素再放入数组
            this.pageChild.splice(this.objPool[this.OperationIndex].PageChildIndex,0,this.objPool[this.OperationIndex].TempData);if(this.pageChild[this.objPool[this.OperationIndex].PageChildIndex].action){
                this.pageChild[this.objPool[this.OperationIndex].PageChildIndex].playandStop(1);
            }                          
            this.pageChild[this.objPool[this.OperationIndex].PageChildIndex].visible = false;
            //再将数组中最后一个元素删除
            this.objPool.pop();

        }else{             
            for(let i in this.objPool[this.OperationIndex].pageChildbox){
                this.pageChild.splice(this.objPool[this.OperationIndex].PageChildIndex,0,this.objPool[this.OperationIndex].pageChildbox[i]);       
                this.pageChild[this.objPool[this.OperationIndex].PageChildIndex].visible = false;
                if(this.pageChild[this.objPool[this.OperationIndex].PageChildIndex].action){
                    this.pageChild[this.objPool[this.OperationIndex].PageChildIndex].playandStop(1);
                }
            }

              //再将数组中最后一个元素删除
              this.objPool.pop();
        }     
        //OperationIndex为0 说明是到达第一步了
        if(this.OperationIndex === 0){
            //到了第一步，将上一步按钮置灰
            RoomScene.getInstance().cancel.disabled = true;
        }
        //往上走一步后，下一步按钮激活
        if(RoomScene.getInstance().btnNext.disabled){
            RoomScene.getInstance().btnNext.disabled = false;
        }
        this.jujdeanswerPoint();
    }
   
    // 获取步骤
    getStepHandler(data){
        // console.log("获取当前步骤",data);
        for(let i = 0; i < data; i++){
            this.showItem();
        }
    }

    //下一步操作
    updataStepHandler(data){ 
        // console.log(11111111);           
        if(data.opt == "next"){             
            this.showItem();
        }else if(data.opt == "undo"){
            this.returnBefore();
            
        }   
    }
    //   RoomScene.getInstance().pagebox.sendAnswer("drop",item.name,colliderObj.name,mouseUpPosX,mouseUpPosY,1);
    // 发送答题反馈 // eventType 0 click 1 drop 2 ligature
    sendAnswer(eventType,startname,tagname,startnickname,tagnickname,mouseUpPosX,mouseUpPosY,answerstate,allright){    
        let data = {
                    senderId:GM.senderId,
                    page:this.PageNum,
                    nickName:GM.nickName,
                    role  : GM.role,
                    roleType:GM.roleType,  
                    eventType:eventType,
                    mouseUpPosX:mouseUpPosX,
                    mouseUpPosY:mouseUpPosY,
                    startname:startname,
                    tagname:tagname,
                    startnickname:startnickname,
                    tagnickname:tagnickname,
                    answerstate:answerstate
            }
        // 学生为1并且没有完全答对
        if(GM.role === 1 && !allright){
            //将每次答题的过程放入sendfeedback中
            this.sendFeedArr.push(data);
        }
        this.answerArray.push(data);
        console.log("传输答题反馈",this.answerArray);
        messageCenter.emit("answerFinish",{senderId:GM.senderId,page:this.PageNum-1,list:this.answerArray});        
    }
  

    //销毁，回收资源
    dispose(){      
        observer.publish("closeMask");
        observer.publish("gifdis");     
        Laya.timer.clearAll(this);  
        this.timeOutFrameLoopEvent();
        this.answerparamreset();
        // 销毁事件
        this.unEvents();
        // 销毁元素
        this.destroyallSprite();   
        this.pageData = null;
        this.sendFeedArr = null; //答题过程时间记录
        this.indexarray = null; //存放播放的index
        this.pageChild = null;//判断下一个的数组
        this.dicname = null; //存放name的数组
        this.objPool = null;//存放上一元素下一元素对象
        this.eventItems = null;//通过event完成了事件的元素   
        this.ElementIdAction = null; //旁白元素数组
        this.aniArray = null; //存放页面所有的答错动画
        this.answerArray = null;  //存放每次答题的数组
        this.itemDic = null; //字典
        this.elementVisible = null; //和元素
        this.answerArea = null; //答案区
        this.answererroyNum = null; // 回答的错误次数
        this.nextAnswererroyNumNum = null; // 下一次连续回答 3 或者 5 次错误出来的动画
        this.isElementGroupNum = null;  //元素组满足要求
        this.ElementIndex = null; //元素组序号对比
        this.OrderIndex = null;   //答案组满足次数
        this.OperationIndex = null; //操作步数，到0为第一步
        this.musicTime = null; //播放进度
        this.targetTypelength = null; //答案区的个数         
        this.OpAnimationType = null; //默认过场动画    
        this.answerVisible = null;
        this.puzzleFlag = null; //是否是拼图题型
        this.soundflage = null; ///确认声音只播放一次
        this.isElementGroupFlag = null; //元素组满足一次之后 不会再次出现
        this.isWined = null;
        this.bgmAudio = null; //声音
        this.bgurl = null; //背景图url
        this.allanswerTimer  = null; //答题耗时
        this.PageNum = null; //当前页码    
        this.reportBtn = null; //报告按钮   
        this.bg = null; //背景
        this.CourseVideoURL = null;  //页面视频
        this.Prompt = null;  //页面提示音
        this.elementAudio = null; //元素提示音链接
        this.ElementGroup = null  //元素组
        this.AnswerSatisfyNum = null; //元素组满足次数以及触发事件 
        this.douzi = null; //正确豆子动画
        this.zhihuicao = null; //正确智慧草动画
        this.winjinyu = null;//正确鲸鱼动画          
        this.destroy(true);
    }

    //清除页面所有item 元素
    destroyallSprite(){
        for(let i in this.pictureItem){
            if(this.pictureItem[i].find("audio")){
                this.pictureItem[i].find("audio").dispose();
            }
            this.pictureItem[i].dispose();
        }
        this.pictureItem = []; 
    }

    //解除updateStep监听
    unSubscribe(){
         observer.unsubscribe("bgMusic");
         observer.unsubscribe("updateStep"); 
         observer.unsubscribe("winwin");
    }
    
    //解绑所有画线、例子
    unEvents(){
        let i = 0;
        for(i in this.imageLigatures){
            console.log(this.imageLigatures);
            this.imageLigatures[i].destroy();
        }
        this.imageLigatures = [];

        i = 0;
        for(i in this.particels){
            if(this.particels[i]){
                this.particels[i].destroy();
            }
            
        }   
        this.particels = [];
    }
  
}


// TypeElement 4骨骼动画
// Element  属性中 1、IsStudentsInvisible 是否为老师可见，2、AngleGroup    角度组

// 答案组 在eventlist

// ElementGroup 元素组

// CEvent  
//     ClearElementId 消失
//     Delay 时间
//     ElementId  出现
//     EventTag  标签
//     OrderIndex  序号

 
// ElementInfoList  参与元素   
// SatisfyNum  满足条件