/**
 * @param {*liujiaojiao}
 *roomscene  舞台
 */

import { observer,messageCenter,setViewCenter,sceneManager } from '../module/init_module'
import { createSkeleton } from '../module/com/laya.custom'
import LoadingScene from './loading'
import Page from './element/page'
import MenuUIView from './element/menu'
import countDownView from './element/countDown'
import bulletView from './element/bulletView'
import audioIcon from './media/audioIcon'
import vedioIcon from './media/vedioIcon'
import mousePass from './Events/mousePass'
export default class RoomScene extends Laya.Sprite{
    constructor(){
        super();
        this.sceneName = 'roomScene';
        this.pagebox  = null; //页面box
        this.btnLeft = null;  //上一页按钮
        this.btnRight = null; //下一页按钮
        this.pageNum = 0;  //页面默认值
        this.cancel = null; //上一步
        this.btnNext = null; //下一步
        this.menu = null;  //菜单栏按钮
        this.bottom = null; //底部
        this.answerBtn = null; //答题按钮
        this.answering = true; //终止答题
        this.listlength = null; //菜单栏length     
        this.countTimer = null; //倒计时
        this.skeleton_ = null; //过场动画
        this.countUI = null;  //倒计时UI
        this.next = true;    //判断是否是切下一页
        this.oldbox = null;  //过场动画存储上一页
        this.oldMenuItem = null;//menu中上一次选中元素
        this.creatmenuFlag = false;  //菜单栏在设置页码第一次 为flase
        this.bgMusic = null;
        this.trueNum = 0; //答对题目的学生个数
        this.bulletpan = null; //子弹面板
        this.allStuState = []; //答题过程中答对学生的数组，内部记录学生对象存放答对题目的次数
        this.bulletViewData = [] //每次学生答题后放入数组
        this.stuIDs = []; //所有在教室内的学生id和nickname
        this.rightStu = []; //临时数组记录当前答题过程中答对的学生ID
        this.auditorStus = []; //旁听生数组
        this.auditorTrueNum = 0; //旁听生答对个数
        this.allAuditorStuState = [];//答题过程中答对旁听生的数组，内部记录旁听生对象存放答对题目的次数
        this.stepOuts = []; //答题过程中掉线学生
        this.closeCanLeft = null;
        this.closeCanRight = null;
        this.answerFinsihLengths  = []; //数组内存放对应学生的 当前答对题目的长度
        this.mouseStat = false;  // true为按下 false为抬起
        this.pageDone = false;//page是否加载完成
        this.bullentViewRights = [];//bulletView中 取得数据中对的学生
        this.pageAnswwerall = []  //存放当前页所有的答题过程
        this.pageName = null;  //上一页的名字
        this.dest = [];//答题面板中的数据数组
        this.audioItem = null;
        this.figureMoveWithItem = null;  //点击小手指
        this.curpageNum = null;
        this.mouseP = null;//鼠标传递类
        this.vedioBtn = null; //页面视频icon   
        this.mousePos = new Laya.Point(0,0); //鼠标位置
        this.Sounduration = null; //存放声音
        this.startani = null; //开始暂停动画
        this.answerFinishFlag = false;
        this.changeroleStudentId = null; //切换视角的id
        this.ElementIndex = 0;  //1v6学生答题次数
        this.init(messageCenter);
        RoomScene.instance = this;
    }
    static getInstance(messageCenter) {
        return this.instance || new this(messageCenter);
    }

    init(messageCenter){
        this.size(Laya.stage.width, Laya.stage.height);  
        observer.subscribe(this.sceneName + "_enter", this.onEnter.bind(this));  
        //断线停止倒计时
        observer.subscribe('countDownTimeStat', this.countDownTimeStat.bind(this));
        //画板提示
        observer.subscribe('canvasStat', this.canvasStatHandler.bind(this));
        //监听学生进入和离开
        observer.subscribe('stuIdChange', this.stuIdChangeHandler.bind(this));
        //设置页码
        observer.subscribe('Page', this.setPageHandler.bind(this));
        //答题开始
        observer.subscribe("answerStart",this.startAnswer.bind(this));
        //答题结束
        observer.subscribe("answerFinish",this.answerFinish.bind(this));
        //子弹面板数据
        observer.subscribe("bulletView",this.initbulletView.bind(this));
        //mousemove函数监听
        observer.subscribe('mousemove',this.getMouseMove.bind(this));
        // 当前答题状态
        observer.subscribe('getAnswerState',this.getAnswerState.bind(this));
        //当前答题数据
        observer.subscribe('getAnswerList',this.getAnswerList.bind(this));  
         //切换视角
        observer.subscribe('changeRole',this.changeRole.bind(this));
              
        //添加鼠标传递函数
        this.mouseP = new mousePass();
        this.addChild(this.mouseP);

        Laya.stage.on(Laya.Event.MOUSE_DOWN,this,()=>{        
            this.mouseStat = true;
        });

        Laya.stage.on(Laya.Event.MOUSE_UP,this,()=>{         
            this.mouseStat = false;
        });

        Laya.stage.on(Laya.Event.MOUSE_OUT,this,()=>{
            this.mouseStat = false;
        });

        // 初始化页面按钮
        this.buttonInit();    
        //初始化翻页按钮
        this.leftrightBtnInit();
        // 初始化画板浮层
        this.canvasPanelInit();
        //给老师绑定事件
        if(GM.role === 0){
            this.btnEvent();            
        }
         //创建子弹面板
        if(GM.classMode === "1v1"){
           this.bottom.buttetBtn.visible = false;
        }
        else{   
            this.creatBulletPanel();
        }       
    }

    /**
     * 左右翻页按钮以及按钮move事件
     *
     */
    leftrightBtnInit(){
        //添加左右翻页按钮
        let btnLeft = new Laya.Image('res/commonn/last_page_light.png');
        btnLeft.size(72,72);     
        btnLeft.anchorX = 0.5;
        btnLeft.anchorY = 0.5;
        btnLeft.y = Laya.stage.height/2;
        btnLeft.left = 20;      
        this.btnLeft = btnLeft;

        let btnRight = new Laya.Image('res/commonn/next_page_light.png');
        btnRight.size(72,72);
        btnRight.anchorX = 0.5;
        btnRight.anchorY = 0.5;      
        btnRight.y = Laya.stage.height/2;
        btnRight.right = 20;
        this.btnRight = btnRight;

        this.btnRight.gray =  true;
        this.btnRight.alpha = 0.4;
        this.btnRight.on(Laya.Event.MOUSE_OVER,this,this.btnChange,[this.btnRight]);   
        this.btnRight.on(Laya.Event.MOUSE_OUT,this,this.btnChange,[this.btnRight]);   

        this.btnLeft.gray =  true;
        this.btnLeft.alpha = 0.4;
        this.btnLeft.on(Laya.Event.MOUSE_OVER,this,this.btnChange,[this.btnLeft]);   
        this.btnLeft.on(Laya.Event.MOUSE_OUT,this,this.btnChange,[this.btnLeft]); 

    }

    /**
     * 
     * 画板浮层初始化
     */
    canvasPanelInit(){
        //添加画板浮层
        this.closeCanRight = new canvasbgUI(); 
        this.closeCanRight.y = Laya.stage.height/2;
        this.closeCanRight.right = 10;

        this.closeCanLeft = new canvasbgUI(); 
        this.closeCanLeft.y = Laya.stage.height/2;
        this.closeCanLeft.left = 10; 
    }

    /**
     * 初始化页面其他button
     *
     */
    buttonInit(){
        //初始化头部
        this.btnTop = new Laya.Image('res/commonn/menu0.png');
        this.btnTop.size(96,96);
        this.btnTop.pos(5,10);
        //初始化bottom
        this.bottom = new window.bottomUI();
        this.cancel = this.bottom.btnCancel;      
        this.btnNext = this.bottom.btnNext;
        this.answerBtn = this.bottom.answerBtn;           
        this.bottom.bottom = 0;
        this.bottom.x = 0;
        this.bottom.centerX = 0;
        //默认隐藏页面视频按钮   
        this.vedioBtn = new vedioBtnUI();
        this.vedioBtn.right = 100;
        this.vedioBtn.top = 50;
        this.addChild(this.vedioBtn);
        this.vedioBtn.visible = false; 
        // 初始化页面视频控件 
        this.videoObj = new vedioIcon();
        //初始化点击小手
        this.figureMoveWithItem = new Laya.Image('res/commonn/xscz_ydxs_01.png');
        this.figureMoveWithItem.visible = false;
        this.addChild(this.figureMoveWithItem);
        //添加移动的手，默认隐藏
        this.mouseFiger = new Laya.Image("res/commonn/stuhands.png");
        this.mouseFiger.scale(0.3,0.3);
        this.addChild(this.mouseFiger);
        this.mouseFiger.visible = false;
        // this.mouseFiger.anchorX = 0.5;this.mouseFiger.anchorY = 0.5;
    }

    /**
     * 鼠标移动接收处理函数
     *
     */
    getMouseMove(data){
        //第一次进入显示小手，并转移位置
        if(!this.mouseFiger.visible){
            this.mouseFiger.pos(data.x,data.y);
            this.mouseFiger.visible = true;
        }
        else{
            //移动小手
            //(x1 - x2)平方 + (y1 - y2)平方  最后开根号
            let num = parseInt((Math.sqrt(Math.pow((data.x - this.mouseFiger.x),2) + Math.pow((data.y - this.mouseFiger.y),2))) / 5);
            
            //舍弃起点位置，到达终点位置
            for (let i = 1; i <= num; i++) { 
                Laya.timer.once(1 * i,this,()=>{
                    let x = ((data.x * i) + (this.mouseFiger.x * (num - i))) / num; 
                    let y = ((data.y * i) + (this.mouseFiger.y * (num - i))) / num; 
                    this.mouseFiger.pos(x,y);
                });
            }
        }
    }

    /**
     * 创建菜单栏目
     * 
    */
    creatmenu(){
        let jsonArr = [];
        for(let i in GM.LIBRARY){
            jsonArr.push(GM.LIBRARY[i]);
        }
         this.listlength = jsonArr.length;    
         this.menu = new MenuUIView(jsonArr);
         this.addChild(this.menu);  
         this.menu.cacheAs = "normal";
         this.menu.visible = false;
    }
 
    /**
     * 添加声音icon
     */  
    creatIcon(HasAutoPrompt,url){  
        this.audioItem = new audioIcon(null,url,null);
        this.addChild(this.audioItem);
        this.audioItem.visible = false;   
        if(HasAutoPrompt){
            this.audioItem.type = 1;
            this.audioItem.playAudio(url);  
        }
        if(GM.role === 0 ){
            this.audioItem.visible = true;
        }         
    }
       
    /**
    * 创建子弹面板
    */
    creatBulletPanel(){
        this.bulletpan = new bulletView();
        this.bulletpan.visible = false;
        this.addChild(this.bulletpan);
    }
    
    /**
     *  点击事件
    */
    btnEvent(){ 
        if(GM.role == 0){
            this.addChildren(this.btnLeft,this.btnRight,this.bottom,this.btnTop,this.menu,this.closeCanRight , this.closeCanLeft);   
            this.closeCanRight.visible = false;
            this.closeCanLeft.visible = false;
        }
        Laya.stage.on(Laya.Event.MOUSE_MOVE,this,()=>{
            let mous = new Laya.Point(Laya.stage.mouseX,Laya.stage.mouseY);
            // console.log(this.mousePos.distance(mous.x,mous.y));
            if(this.mousePos.distance(mous.x,mous.y) > 10){
                this.mousePos = mous;
                //传送数据
                // console.log("传输位置");
                //GM.role 0 为老师 判断一下
                messageCenter.emit("mousemove",{sendId:GM.senderId, role : GM.role ,x:this.mousePos.x , y:this.mousePos.y});
            }
        });
        //上一页
        this.btnLeft.on(Laya.Event.CLICK,this,()=>{        
            let i = this.pageNum - 1; 
            if(this.nextJujed(i))return;
            observer.publish('Page',{page:i});
            messageCenter.emit('setPage',{page:i,senderId:GM.senderId});
        });                                                                                                                                               
         //下一页
        this.btnRight.on(Laya.Event.CLICK,this,()=>{       
            //判断下一元素按钮是否禁用
            if(this.btnNext.disabled === true){
                this.nextPageTurn(this);
            }else{
                observer.publish("nextpage" , {func : this.nextPageTurn , type : this});
            }
        });  

        // 上一步
        this.cancel.on(Laya.Event.CLICK,this,()=>{   
            if(this.pagebox.OperationIndex === 0){
               this.cancel.disabled = true;
               return;
            }            
            observer.publish('updateStep',{opt:'undo'});       
            messageCenter.emit('updateStep',{senderId:GM.senderId,opt:'undo'});                               
        });

         // 下一步
        this.btnNext.on(Laya.Event.CLICK,this,()=>{ 
             observer.publish('updateStep',{opt:'next'});  
             messageCenter.emit('updateStep',{senderId:GM.senderId,opt:'next'});            
        });

        this.btnTop.on(Laya.Event.CLICK,this,()=>{    
            if(this.menu){
                if(this.menu.visible){
                    this.menu.visible = false;
                    this.btnTop.skin = 'res/commonn/menu0.png';
                }else{
                    this.menu.visible = true;
                    this.btnTop.skin = 'res/commonn/menu1.png';
                }
            }  
            
        });
       
        this.answerBtn.on(Laya.Event.CLICK,this,()=>{
            if(this.pagebox.targetTypelength===0 && !this.pagebox.puzzleFlag)return;       
            if(!this.answering){
               console.log("暂停答题");     
               this.answering = true;        
               this.changeAnswerBtn('start');               
               observer.publish('answerStart',{senderId : GM.senderId ,type : "pause",role : 0,timer : this.countTimer,teachArray:this.pagebox.answerArray}); 
               messageCenter.emit("answerPause",{senderId : GM.senderId ,page:this.pageNum,type : "pause",role : 0,timer : this.countTimer,teachArray:this.pagebox.answerArray});
            }else{
               console.log("开始答题")    
            //    if(GM.classMode === "1v6"  || GM.classMode === "1v1" || GM.flag == 0){
                    //给讲师端发送全部答题
                    messageCenter.emit("reanswer"); 
                    //提取学生
                    this.answerForStu(0);
                    //直接所有学生全部答题
                    let tempArr = [...GM.stuNum, ...this.auditorStus];
                    if(tempArr.length > 0  || GM.flag == 0){                   
                        this.answering = false;
                        this.changeAnswerBtn('pause');
                        observer.publish('answerStart',{senderId : GM.senderId ,page:this.pageNum,type : "open",role : 1,timer : this.countTimer,answerIds : tempArr,teachArray:this.pagebox.answerArray}); 
                        messageCenter.emit("answerStart",{senderId : GM.senderId ,type : "open",role : 1,timer : this.countTimer,answerIds : tempArr,teachArray:this.pagebox.answerArray})
                    }
                    else{
                        //弹出文案 没有学生在线
                        observer.publish('techtip');

                    }
                }
     
        });

        //子弹面板
        this.bottom.buttetBtn.on(Laya.Event.CLICK,this,()=>{
             if(this.bulletpan.visible){
                 this.bulletpan.closeTime();
            }else{           
                this.bulletpan.showtime();           
            }
        });
        // 刷新
        this.bottom.resetBtn.on(Laya.Event.CLICK,this,()=>{
             observer.publish('Page',{page:this.pageNum});
             messageCenter.emit('setPage',{page:this.pageNum,senderId:GM.senderId});
             messageCenter.emit('answerRefresh',{page:this.pageNum,senderId:GM.senderId});
        });

        // 页面视频点击事件  
        this.vedioBtn.on(Laya.Event.CLICK,this,()=>{
            if(this.pagebox.CourseVideoURL != null){
                this.videoObj.init(this.pagebox.CourseVideoURL);
            }
        });
      
        //声音控制按钮
        this.bottom.bgsoundBtn.on(Laya.Event.CLICK,this,()=>{       
            if(this.bottom.bgsoundBtn.index === 1){
                  Laya.SoundManager.musicMuted = true;
                 messageCenter.emit("optStart",{type:"bgMusic",statu:"close",senderId:GM.senderId,url:this.url});
                 this.bottom.bgsoundBtn.index = 0;       
            }else{
                this.bottom.bgsoundBtn.index = 1;
                Laya.SoundManager.musicMuted = false;
                if(this.pagebox &&　this.pagebox.bgmAudio){
                     messageCenter.emit("optStart",{type:"bgMusic",statu:"open",senderId:GM.senderId,url:this.url});
                     Laya.SoundManager.playMusic(this.pagebox.bgmAudio);
                }
               
            }
            
        });
    }

    /**
     * 开始答题
     */
    startAnswer(data){
        //解绑当前所有事件
        this.pagebox.timeOutFrameLoopEvent(true);
        // 添加动画
        this.addstartAnimation(data.type);  
        if(data.type === "open"){
            // 1v1模式下答题中学生audio按钮可见
            if(GM.role === 1 && this.audioItem && GM.classMode=== "1v1"){
                this.audioItem.visible = data.type;
            }      

            //将答对学生个数置为0
            this.trueNum = 0;
            this.auditorTrueNum = 0;
            //清空所有学生答题状态
            this.allStuState = [];
            this.allAuditorStuState = [];  
            //禁用上一元素下一元素
            this.cancel.disabled = true;      
            this.btnNext.disabled = true     
        }else if(data.type === "pause"){
              //上一元素下一元素判断状态                 
              this.pagebox.jujedButtondisable();   
              if(GM.classMode === "1v6" &&　GM.role === 1){
                 this.pauseHandler(data);
              }  
        }
        
        // 开放角色权限  
        if(GM.role === data.role){              
            this.pagebox.pictureEvent();  
        }
    }

    /**
     * 
     * 开始答题和暂停动画以及倒计时动画
     */
    addstartAnimation(data){ 
        // 开始答题和暂停动画      
        if(data === "open"){
            this.startani = new createSkeleton('res/newani/dabans');
            this.startani.pos(Laya.stage.width/2,Laya.stage.height/2);
            Laya.SoundManager.playSound("sound/ready.mp3"); 
            this.startani.on(Laya.Event.STOPPED,this,this.stopAnimation);
        }else if(data === "pause"){
            Laya.SoundManager.playSound("sound/newsound/pause.mp3"); 
            this.startani = new createSkeleton('res/newani/stop');
            this.startani.scale(0.5,0.5);
            this.startani.pos(100,1000);
            Laya.Tween.to(this.startani,{y:780},500,Laya.Ease.circIn,Laya.Handler.create(this,()=>{
                Laya.Tween.to(this.startani,{y:780},1500,Laya.Ease.linearIn,Laya.Handler.create(this,()=>{
                    Laya.Tween.to(this.startani,{y:1000},500,Laya.Ease.linearIn,Laya.Handler.create(this,()=>{
                        this.stopAnimation();
                    }),0,true);
                }),0,true);
            }),0,true)
        }

        this.addChild(this.startani);     
        this.startani.play(0,false);    
        this.bottom.answerBtn.disabled = true;
        
        //倒计时
        if(this.countUI){
            this.countUI.destroy();
        }
        // if(data.timer > 0){
            this.countUI = new countDownView(data.timer);
            this.addChild(this.countUI);   
        // }
       
     
    }

    /**
     * 销毁开始和暂停动画
     */
    stopAnimation(){
        this.bottom.answerBtn.disabled = false;
        this.removeChild(this.startani);
        this.startani.destroy();
        this.startani = null;
    }

    /**
     * 1v6暂停模式 
     */
    pauseHandler(data){
        //讲师点击“暂停答题”后，已答对学生的排名框消失，所有学生的页面会与讲师当前页面的答题步骤同步
        console.log("老师答题数据",data.teachArray);
        //发送关闭答题结束弹层
        messageCenter.emit("rankView",{stat : "Close"  , time : 0});
        //解绑老师操作
        this.pagebox.timeOutFrameLoopEvent();
        //解绑所有event、画线、粒子等元素
        this.pagebox.returnitems();
        this.pagebox.unEvents();    
        //将所有可动的元素归还原位
        this.pagebox.resetState(); 
        //1v6清除index
        this.pagebox.answerparamreset();    
        //重现老师步骤
        if(data.teachArray && data.teachArray.length>0){
            for(let i in data.teachArray){
                this.answerOneToOne(data.teachArray[i]);
            }
        }
      
    }
 
    /**
     *  断线时停止倒计时和音效播放
    */

    countDownTimeStat(type){
        if(this.countUI){
             if(this.countUI.countDownValue > 0){
                if(type == "on"){
                    this.countUI.timeContinue();
                }
                else{
                    this.countUI.timeStop();
                }
            }
        }
    }

     /**
     * 画板提示按钮状态
     */ 
    canvasStatHandler(data){
        if(data == "open")
        {
            this.closeCanRight.visible = true;
            this.closeCanLeft.visible = true;
        }
        else{
            this.closeCanRight.visible = false;
            this.closeCanLeft.visible = false;
        }
    }
   
    /*
     学生进入和离开时的ID和nickname修改
    */
    stuIdChangeHandler(data){     
        if(data.type === 0){
            //要清除学生的身份
            let clearRole;
            // 判断data.role  如果是学生 提取this.stuIDs 所有的旁听生  再重新加入学生
            if(data.role == "student"){
                clearRole = "0";  
            }
            else {
                 clearRole = "1";
            }
            let tempstus = [];
            for(let k in this.stuIDs){
                if(this.stuIDs[k].roleType != clearRole){
                    //只保留另外一部分学生
                    tempstus.push(this.stuIDs[k]);
                }
            }
            this.stuIDs = tempstus;
            //加入学生
            for(let i in data.res){
                if(data.res[i].role == "teacher" || data.res[i].c == 0){
                    //直接进入下一次循环，排除老师自己
                    continue;   
                }   
                //roleType 0为学生  1为旁听生
                let roleT = data.res[i].role == "student" ? "0" : "1";
                let da = {
                    id : data.res[i].senderId,
                    nickName : data.res[i].name,
                    roleType : roleT
                };
                //存入id和nickname
                this.stuIDs.push(da);
            }
           
            if(GM.role == 0){
                //请求当前页的数据
                messageCenter.emit("bulletView",{senderId:GM.senderId,page:this.pageNum});
            }
           
        }
        else{
            //删除学生
            for(let i in data.res){
                for(let j in this.stuIDs){
                    if(this.stuIDs[j].id === data.res[i].senderId){
                        this.stuIDs.splice(j,1);
                        //内循环进来一次后，就可以退出内循环，进入下次外循环
                        break;
                    }
                }
            }
            //答题过程中判断是学生还是旁听生，然后对应从数组中删除，再刷新答题状态
            for(let i in data.res){
                let temps = [];
                if(data.res[i].role == "student"){
                    temps = GM.stuNum;
                }
                else{
                    temps = this.auditorStus
                }
                for(let j in temps){
                    if(temps[j].id === data.res[i].senderId){
                        //记录掉线学生
                        //this.stepOuts.push(temps[j]);
                        temps.splice(j,1);
                        // this.refreshStat("off");
                        //内循环进来一次后，就可以退出内循环，进入下次外循环
                        break;
                    }
                }
            }
            //确认在线学生
            this.confirmBullentInfo(false);
        }
        this.answerForStu(0);
    }

    /**
     * 监听设置页码回调
    */
    setPageHandler(data){      
        // if(GM.flag != 0){
        //      //相同页面不处理
        //     if(Number(data.page)>0 &&　Number(data.page) === this.pageNum){
        //         return;
        //     }
        // }
        // 存放课后报告数据
        if(GM.role === 1){
            this.afterreportData();
        }
        //一轮答题未结束
        if(this.pagebox){
            if(!this.answerFinishFlag && GM.role=== 1&& this.pagebox.sendFeedArr.length>0 ){ 
                // 结束答题和倒计时结束发送log告知答题过程          
                RoomScene.getInstance().pagebox.sendFeedLog(-1,null,this.pagebox.sendFeedArr);
            }
        }
        
        
        // 存放上一页的pageName以及pageNum
        this.curpageNum = this.pageNum;
        this.pageName = GM.LIBRARY[this.pageNum].Name;
        this.resetPageElement(data);
         //第一次初始化菜单栏
        if(!this.creatmenuFlag){
             this.creatmenu();   
             this.creatmenuFlag = true; 
        }
        //存放页码   
        this.pageNum = Number(data.page) ; 
        // 给web端备课界面传输hash页码
        location.hash = Number(data.page);
        // 页面大于最后一页则重置为最后一页
        if(this.pageNum >= GM.LIBRARY.length){
            this.pageNum = GM.LIBRARY.length-1;
            messageCenter.emit('setPage',{senderId:GM.senderId,page:this.pageNum});
        } 
        // 存放倒计时时间
        if(GM.LIBRARY[this.pageNum]){
            this.countTimer = GM.LIBRARY[this.pageNum].Timer;
        }     
       
        // 实例化page      
        this.pagebox = new Page(GM.LIBRARY[this.pageNum]);      
        // 判断是否有圆柱体正方体
        this.findMode(GM.LIBRARY[this.pageNum]);  
        // 修改菜单页码
        observer.publish("bgcolor",this.pageNum);
        this.addChild(this.pagebox);
        this.setChildIndex(this.pagebox,0);     
        //1v1学生切页面发送上一页面的答题结果      
        if(GM.role === 1){
            if(this.pageAnswwerall.length>0){           
                this.anserResult();
            }        
        }       
    }

    /**
     * 页面重置
     */
    resetPageElement(data){
        observer.publish('clearanimation');
        //停止所有声音但是不包括背景音乐
        Laya.SoundManager.stopAllSound();
        //特殊圆柱体和正方体清除
        if(this.sceneMode){
             this.closeSquareMode();
        }
        // 声音按钮销毁
        if(this.audioItem){ 
           observer.publish("stopAudio");  
           this.removeChild(this.audioItem);
           this.audioItem = null;
        }
        //停止播放提示音
        if(this.pagebox){         
            if(this.pagebox.Prompt != null || this.pagebox.elementAudio!= null){
                 observer.publish("stopAudio"); 
            }        
        }
        
        //答题记录清空
        this.answerFinsihLengths  = [];  
        //重置答题完成标志
        this.answerFinishFlag = false;
        this.trueNum = 0;
        this.auditorTrueNum = 0;
        //清空所有学生答题状态
        this.allStuState = [];
        this.allAuditorStuState = [];
        //重置答题按钮初始状态
        this.answering = true;
        this.changeAnswerBtn('start');
        //清空子弹面板的list
        observer.publish("diposeList");   
        // 清除答对学生数据
        if(GM.role == 0){
            this.rightStu = [];//切页清除答对学生数据
            //发送关闭答题结束弹层
            messageCenter.emit("rankView",{stat : "Close"  , time : 0});
            messageCenter.emit("bulletView",{senderId:GM.senderId,page:Number(data.page)});
        }
        // 重置菜单
        if(this.creatmenuFlag){
            if(this.menu.visible){
                this.menu.visible = false;
                this.btnTop.skin = 'res/commonn/menu0.png';
            }
        }
        //重置子单面板
        if(this.bulletpan){
             if(this.bulletpan.visible){
                 this.bulletpan.closeTime();
            }
        }
        //销毁上一页
        if(data.page - this.pageNum === 1){
            this.next  = true;
        }else{
            this.next  = false;
        } 

        if(this.pagebox){
            this.pagebox.unSubscribe();
            if(this.oldbox){
                this.oldbox.dispose();
                this.oldbox = null;  
            }

            if(this.next){
                this.oldbox = this.pagebox;
                this.setChildIndex(this.oldbox,0);
            }else{
                this.pagebox.dispose();
            }
        }else{
            //如果没有之前的pagebox存在，直接将next改为false。使得page中判断更简易
            this.next = false;
        }
        
        //销毁倒计时
        if(this.countUI){
            Laya.timer.clearAll(this.countUI);        
            this.removeChild(this.countUI);  
            this.countUI.destroy();
            Laya.SoundManager.stopMusic("sound/answering.mp3");      
        }

    }

    /**
     * 切页存放课后报告数据
     */
    afterreportData(){
        if(this.countUI &&　this.pagebox.sendFeedArr.length > 0 && this.pagebox.rightlength != this.pagebox.targetTypelength){
            if(this.countUI.countDownValue === 0){
                this.pagebox.proloadHandler(-1,this.pagebox.sendFeedArr);  
            }     
        }          
    }

    /**
     *  特殊圆柱体和正方体 
     */
    findMode(list){
        for(let i in list.ElementList){
             if(list.ElementList[i].Name == "Cube3D"){
                this.creatSquareMode();
             }else if(list.ElementList[i].Name == "Cylinder3D"){
                 this.creatCylinderMode();
             }
        }    
    }

   /**
   * 切页子弹面板显示
    */
    initbulletView(data){  
        // 切页时清除子弹面板存储数据
        this.bulletViewData = [];
        let newtext,res; 
        if(data.length>0){
            for(let i in data){
                res = data[i] || [];
                // 使用时间大于0 说明是答题正确的
                if(data[i].usertime > 0){
                    newtext = "全部答对";                        
                }else{
                    newtext = "超时"            
                }            
                res.progress.push({senderId:res.senderId,roleType:res.roleType, nickName:res.nickName,eventType:"",startname:"",tagname:"",answerstate:"",allstate:newtext});
                //this.bulletViewData = res.progress;  
                this.bulletViewData = this.bulletViewData.concat(res.progress);   
            }
            this.updataBullets(this.bulletViewData);
        }  
    }

    /**
     * 左右翻页事件
    */
    btnChange(obj,e){
        switch(e.type){
            case "mouseover" : 
                obj.gray =  false;
                obj.alpha = 1;
            break;
            case "mouseout":
                obj.gray =  true;
                obj.alpha = 0.4;
            break;
            default:
                console.log("出现一个神奇的错误，快去看看~乖")
            break;
        }
    }

    /**
     * 答题结果处理(发送课后报告数据)
     */  
    anserResult(){
        // 将数组第一个元素的值赋给max  
        let max = this.pageAnswwerall[0].proload;
        let time = this.pageAnswwerall[0].usertime;
        for (var i = 0; i < this.pageAnswwerall.length; i++) {
            // 如果元素当前值大于max,就把这个当前值赋值给max
            if (this.pageAnswwerall[i].proload > max) {
                max = this.pageAnswwerall[i].proload;
                time = this.pageAnswwerall[i].usertime;
            }  
        }

        let data = {
                pageNum: this.curpageNum,
                pageName:this.pageName,
                senderId: GM.senderId,
                nickName: GM.nickName,
                proload:max,  
                usertime:time 
        }
        messageCenter.emit("report",data);
        this.pageAnswwerall = [];   
       
    }

    /**
     * 替换答题按钮
     */
    changeAnswerBtn(type){
        if(type === 'start'){
             this.bottom.answerBtn.skin = "res/commonn/start_answer_select.png"; 
        }else if(type === 'pause'){
             this.bottom.answerBtn.skin = "res/commonn/start_answer_stop_s.png";
        }else if(type === 'finish'){
             this.bottom.answerBtn.skin = "res/commonn/start_answer_select.png";
             this.answerFinishFlag = true;
             this.answerBtn.disabled = true;
             //解绑老师操作
             this.pagebox.timeOutFrameLoopEvent(true);
             //将默认状态设置为暂停  但受到次指令不做操作
             messageCenter.emit("answerPause",{senderId : GM.senderId ,page:this.pageNum,type : "pause",role : 0,timer : this.countTimer,teachArray:this.pagebox.answerArray,endingType:"ending"});
        }
    }

    /**
     *  next 判断下一元素按钮是否禁用
    */
    nextPageTurn(type){
        let i = type.pageNum + 1; 
        if(type.nextJujed(i))return;
        observer.publish('Page',{page:i});
        messageCenter.emit('setPage',{senderId:GM.senderId,page:i});
    }

 
    /**
     *  判断是否最后一页
    */
    nextJujed(pageNum){
         if(pageNum < 0){         
            this.pageNum = 0;
            return true;
        }
        else if(pageNum >= this.listlength){
            this.pageNum = this.listlength-1;
            return true;
        }
    }

    /**
     *  1v6 学生答题时 提取出id和nickname值存放于GM.stuNum
    */
    answerForStu(type){
        //清空
        this.rightStu = [];        
        //type 0为全部，1为答错部分
        //掉线学生数组
        //this.stepOuts = [];
        //学生数组
        GM.stuNum = [];  //所有答题过程中的学生
        //旁听生数组
        this.auditorStus = [];  //所有答题过程中的旁听生数组
        if(type === 0){
            // GM.stuNum =  this.stuIDs;//不能是引用复制，因为在答题过程中this.stuIDs内的值会变            
            for(let i in this.stuIDs){
                let data = {
                    id : this.stuIDs[i].id,
                    nickName : this.stuIDs[i].nickName,
                    roleType : this.stuIDs[i].roleType
                }
                if(this.stuIDs[i].roleType === "0"){
                    GM.stuNum.push(data);
                }
                else{
                    this.auditorStus.push(data);
                }
            }
        } 
        //在开始答题时 传入1，来判断错误学生答题按钮是否置灰
        else if(type === 1){
            //去bulletview里面取数据
            for(let i in this.bullentViewRights){
                this.rightStu.push(this.bullentViewRights[i]);
            }

            for(let i in this.stuIDs){
                let stat = 0; //0为没有答对
                for(let j in this.rightStu)
                {
                    if(this.rightStu[j] === this.stuIDs[i].id)
                    {
                        stat = 1;
                        break;
                    }
                }
                if(stat === 0){
                    let data = {
                        id : this.stuIDs[i].id,
                        nickName : this.stuIDs[i].nickName
                    }
                    if(this.stuIDs[i].roleType === "0"){
                        GM.stuNum.push(data);
                    }
                    else{
                        this.auditorStus.push(data);
                    }
                }
            }
            //如果为0 说明没有答错学生，则将答错学生开始答题按钮置灰
            if(GM.stuNum.length == 0){
                return true;
            }
        }  
        return false;
    }


    /**
     *  每次答题结束
    */ 
    answerFinish(data){
        //超时命令一定是单条，答题过程不会包含answerstate = 2的情况 所以单独放外面
        if(data.answerstate == 2 && GM.role === 1){
            if(!RoomScene.getInstance().pagebox.isWined && this.countUI){
                this.countUI.countFinsh();
            }
        }

        let once = false;//记录外循环是否已经进入一次
        //判断答对次数和传过来的数组，如果相等退出循环
        for(let i in data){
            //1v6学生端数据是其他学生时不用走进来
            if(GM.classMode === "1v6" &&  GM.role === 1 && data[i].role === 1 &&  GM.senderId !== data[i].senderId){
                break;
            }
            if(!once){
                once = true;
                //判断当前学生是否有过记录
                let isHave = false;
                for(let j in this.answerFinsihLengths){
                    //j对应的是senderID
                    if(j == data[i].senderId){
                        isHave = true;
                        break;
                    }
                }
                if(!isHave){
                    this.answerFinsihLengths[data[i].senderId] = 0;
                }
            }
            
            if(data.length <= this.answerFinsihLengths[data[i].senderId]){
                break;
            }
            if(Number(i) < this.answerFinsihLengths[data[i].senderId]){
                continue;
            }
            //排除了自己
            if(GM.senderId != data[i].senderId && data[i].eventType){
                //为了排除1v6中学生发finsh给老师时，不播放答对音效
                if((GM.classMode === "1v1") || (GM.role === 0 && data[i].role === 1 && GM.classMode === "1v6" && !this.pagebox.puzzleFlag) ){
                    if(data[i].answerstate == 1 ){
                        Laya.SoundManager.playSound('sound/Events/smallErrorWithThing.mp3');
                    }else{
                        Laya.SoundManager.playSound('sound/Events/smallWin.mp3'); 
                    }
                }
                this.answerFinsihLengths[data[i].senderId]++;
                //判断1v1还是1v6
                //是学生并且是1v6的时候，老师演示学生同步演示            
                if(GM.classMode === "1v1" || (data[i].role === 0 && GM.classMode === "1v6")){
                    this.answerOneToOne(data[i]);
                }
                else if(GM.classMode === "1v6" && GM.role === 0){                    
                    //等于3的时候是学生全部答对
                    if(data[i].answerstate === 3){                
                        this.answerChoseRoleType(data[i]);                    
                    } else{
                        //其他需要更新子弹面板
                        if(data[i].nickName){
                            this.bulletViewData.push(data[i]);
                            //更新子弹面板数据
                            this.updataBullets(this.bulletViewData);
                        }
                    }  
                    // 1v6切换视角后如果当前答题学生等于切换视角学生id 则同步演示                  
                    if(this.changeroleStudentId && data[i].senderId === this.changeroleStudentId){
                        this.answerOneToOne(data[i],"changerole");
                    }                       
                }
                //this.answerOne(data[this.answerFinsihLength]);
            }
        }
    }
    
    /**
     *  1v1的答题结束反馈 初始化答题数据init
    */ 
    answerOneToOne(data,init){
        // let _childs = this.pagebox.pictureItem;
        let startPostionobj,tagobj,startposX,startposY,obj,TagEventList;       
        if(data.eventType == "drop"){           
            obj = this.findTagandItem(data);
            startPostionobj = obj.startPostionobj;
            tagobj = obj.tagobj;
            startposX = Number(startPostionobj.Position.split(',')[0]) + startPostionobj.itemWidth/2;
            startposY = Number(startPostionobj.Position.split(',')[1]) + startPostionobj.itemHeight/2;  
            this.pagebox.answerIndexChange(obj.startPostionobj);
            this.figureMoveWithItem.visible = true;
            this.figureMoveWithItem.pos(obj.startPostionobj.x,obj.startPostionobj.y);
            if(data.answerstate == 0){                                      
                Laya.Tween.to(startPostionobj,{x:data.mouseUpPosX,y:data.mouseUpPosY},500,Laya.linearIn,Laya.Handler.create(this,()=>{        
                    this.pagebox.listshiftfirst(tagobj,startPostionobj,data);                  
                }),0,true);
                //手的移动
                Laya.Tween.to(this.figureMoveWithItem,{x:data.mouseUpPosX,y:data.mouseUpPosY},500,Laya.linearIn,Laya.Handler.create(this,   ()=>{   
                        this.figureMoveWithItem.visible = false;                    
                }),0,true);
            }else if(data.answerstate == 1){
                Laya.Tween.to(startPostionobj,{x:data.mouseUpPosX,y:data.mouseUpPosY},500,Laya.linearIn,
                    Laya.Handler.create(this,()=>{Laya.Tween.to(startPostionobj,{x:startposX,y:startposY},500,Laya.linearIn,null,0,true);})
                ,0,true);
                //手的移动
                Laya.Tween.to(this.figureMoveWithItem,{x:data.mouseUpPosX,y:data.mouseUpPosY},500,Laya.linearIn,
                    Laya.Handler.create(this,()=>{Laya.Tween.to(this.figureMoveWithItem,{x:startposX,y:startposY},500,Laya.linearIn,         Laya.Handler.create(this,()=>{ 
                            this.figureMoveWithItem.visible = false;
                        })
                    ,0,true);})
                ,0,true);
            }

        }else if(data.eventType == "click"){         
            obj = this.findTagandItem(data);
            startPostionobj = obj.startPostionobj;
            tagobj = obj.tagobj;
            if(data.answerstate == 0){  
                // if(GM.classMode === "1v6"){
                //       this.figureMoveWithItem.visible = true;
                //       this.figureMoveWithItem.pos(obj.startPostionobj.x,obj.startPostionobj.y);
                // }    
                //答题正确，显示答题正确弹窗                                                  
                this.pagebox.listshiftfirst(tagobj,startPostionobj,data);                                                     
            }
        }
        else if(data.eventType == "ligature"){         
            obj = this.findTagandItem(data);
            startPostionobj = obj.startPostionobj;
            tagobj = obj.tagobj;
            //画一条直线
            let startpostionX = Number(startPostionobj.Position.split(',')[0]) + startPostionobj.itemWidth/2;  
            let startpostionY = Number(startPostionobj.Position.split(',')[1]) + startPostionobj.itemHeight/2;   
            let endpostionX , endpostionY;
            if(tagobj){
                endpostionX = Number(tagobj.Position.split(',')[0]) + tagobj.itemWidth/2;  
                endpostionY = Number(tagobj.Position.split(',')[1]) + tagobj.itemHeight/2;
            }       
            let ligatureTemp = new Laya.Sprite();	
            Laya.stage.addChild(ligatureTemp);
            if(data.answerstate == 0){          
                if(tagobj.answertagArray.length > 0){
                    TagEventList = tagobj.answertagArray[0];
                };  
                this.pagebox.listshiftfirst(tagobj,startPostionobj,data);            
                this.pagebox.imageLigatures.push(ligatureTemp);
                ligatureTemp.graphics.drawLine(startpostionX,startpostionY,endpostionX,endpostionY ,"#8ccfd5", 8);
                ligatureTemp.graphics.drawCircle(startpostionX,startpostionY, 10, "#8ccfd5");
                ligatureTemp.graphics.drawCircle(endpostionX ,endpostionY, 10, "#8ccfd5");              
            }else if(data.answerstate == 1){
                ligatureTemp.graphics.drawLine(startpostionX,startpostionY,data.mouseUpPosX,data.mouseUpPosY ,"#fccccc", 8);
                ligatureTemp.graphics.drawCircle(startpostionX,startpostionY, 10, "#fccccc");
                ligatureTemp.graphics.drawCircle(data.mouseUpPosX ,data.mouseUpPosY, 10, "#fccccc");                
                Laya.timer.once(1000,this,()=>{
                    ligatureTemp.destroy();
                })
            }
        }else if(data.eventType == "puzzle"){           
            obj = this.findTagandItem(data);
            startPostionobj = obj.startPostionobj;
            if(data.tagname != null){
                 startPostionobj.rotation = data.tagname;
            }else{
                Laya.Tween.to(startPostionobj,{x:data.mouseUpPosX,y:data.mouseUpPosY},500,null,0,true); 
            }   
        }    
    }

    /**
     * 查找item和目标tag
     */
    findTagandItem(data){
        let _childs = this.pagebox.pictureItem;
        let startPostionobj,tagobj,startposX,startposY;  
        for(let i = 0; i<_childs.length;i++){
            if(_childs[i].name == data.startname){
                startPostionobj = _childs[i];
            }
            if(_childs[i].name == data.tagname){
               if(data.tagname != "背景"){
                   tagobj = _childs[i];
               }  
            }
        } 
       
        let obj = {startPostionobj:startPostionobj,tagobj:tagobj};
        return obj;
    }

    /**
     *   1v6答题, 确认是学生还是旁听生，走不同的数组
    */    
    answerChoseRoleType(data){
        //allState :  this.allStuState  || this.allAuditorStuState
        //stus     :  GM.stuNum         || this.auditorStus
        //trueNum  :  this.trueNum      || this.auditorTrueNum
        if(data.roleType === "0"){
            this.answerOneToSix(data , this.allStuState , GM.stuNum , this.trueNum);
        }
        else{
            this.answerOneToSix(data , this.allAuditorStuState , this.auditorStus , this.auditorTrueNum);
        }
    }

    /**
     *  1v6答题，学生答对的处理函数
    */   
    answerOneToSix(data , allState , stus , trueNum){
        let statHave = false;
        let studentAnswerstatu;
        for(let j in allState){
            if(allState[j].senderId  === data.senderId){
                statHave = true;
                break;
            }
        }
        //只有当前学生还没有存在于数组中时创建这个学生对象
        if(!statHave){
            let stuObj = {
                senderId:data.senderId,
            };
            allState.push(stuObj);
        }
        
        for(let i in allState){
            //如果学生已经存在，则+1答对次数
            if(allState[i].senderId === data.senderId){          
                //此学生全部答对则进入                             
                //判断当前有几个学生答对，如果没有全部答对则反馈给学生，否则关闭所有学生的等待弹层
                trueNum++;
                //值类型，将修改后的值再赋值回去
                if(data.roleType === "0"){
                    this.trueNum = trueNum ;
                }
                else{
                    this.auditorTrueNum = trueNum ;
                }
                this.bulletViewData.push({senderId:data.senderId,roleType:data.roleType,nickName:data.nickName,eventType:"",startname:"",tagname:"",
                answerstate:"",allstate:"全部答对"});

                //更新子弹面板数据
                this.updataBullets(this.bulletViewData);
                //记录答对学生的Id 
                this.rightStu.push(data.senderId);
                if(this.countUI){
                    messageCenter.emit("sendAnswer",{senderId:data.senderId,anserState:0 , usetime : this.countUI.useTime});
                }          
                //GM.stuNum.length 开始答题时的学生个数
                // 5 6名显示“你真棒！”，需要修改UI！
                //最后一个人或者一个学生时，不用显示dialog面板文字
                let showD = -1;
                if(stus.length == 1 || trueNum >= stus.length){
                    showD = 0;
                }
                //广播时带上id，rankpage中判断id相同则显示弹层
                messageCenter.emit("rankView",{ranknum : trueNum , showDialog:showD,stuId : data.senderId , stat : "Open"});

                this.refreshStat();

                //如果能进入if 那后面的新建对象就不需要再走了，直接return退出这个函数
                return;
            }
        }
    }


    /**
     *   1v6答题，学生答完题目后/或者掉线   重置老师答题按钮状态
    */ 
    refreshStat(){
         if(this.trueNum >= GM.stuNum.length){
            //你赢了动画占用3秒，所以总共要有6秒，才能让排名面板显示3秒
            messageCenter.emit("rankView",{stat : "Close" , time : 6});          
            //学生和旁听生都答完题目后重置老师答题按钮状态
            if(this.auditorTrueNum  >= this.auditorStus.length){       
                //修改开始答题按钮
                this.changeAnswerBtn('finish');
                this.pagebox.answerArray = [];
                Laya.SoundManager.stopMusic("sound/answering.mp3"); 
                this.answering = true;            
                //取消countDownView
                if(this.countUI){   
                    Laya.timer.clearAll(this.countUI);
                    this.removeChild(this.countUI);  
                }
            }
        }
    }

    /**
     *   1v6答题 超时函数
    */ 
    answerStuOverTime(){
        //学生，旁听生，答题过程中掉线学生
        //let arrTemp = [...GM.stuNum, ...this.auditorStus, ...this.stepOuts];
        //掉线学生直接删除
        let arrTemp = [...GM.stuNum, ...this.auditorStus];
        for(let i in arrTemp){
            let stat = 0; //0为没有答对
            for(let j in this.rightStu){
                if(this.rightStu[j] === arrTemp[i].id){
                    //如果有相同，说明这个学生全部答对，则跳出内循环,进入下一次循环
                    stat = 1;
                    break;
                }
            }
            if(stat === 0){         
                this.bulletViewData.push({senderId:arrTemp[i].id , roleType:arrTemp[i].roleType,nickName:arrTemp[i].nickName  ,eventType:"",startname:"",tagname:"" , answerstate:"" , allstate:"超时"});
                messageCenter.emit("sendAnswer",{senderId:arrTemp[i].id , anserState:1 , usetime : 0})
                //更新子弹面板数据
                this.updataBullets(this.bulletViewData);
            }
        }
    }

  
    /**
     *   1v6答题更新子弹面板数据
    */ 
    updataBullets(arr){
        //将过来的数据筛选出来成一个按照sendId走的数据
        var map = {};
        this.dest = [];
        for(let i = 0; i < arr.length; i++){
            let ai = arr[i];
            if(!map[ai.senderId]){
                this.dest.push({
                    senderId: ai.senderId,
                    roleType:ai.roleType,
                    nickName:ai.nickName,
                    data: [ai]
                });
                map[ai.senderId] = ai;
            }else{
                for(let j = 0; j < this.dest.length; j++){
                    let dj = this.dest[j];
                    if(dj.senderId == ai.senderId){
                        dj.data.push(ai);
                        break;
                    }
                }
            }
        }
        //确认在线学生
        this.confirmBullentInfo(true);
    }

    /**
     *  1v6答题子弹面板数据筛选在线学生
     */
    confirmBullentInfo(type){
        //type true 需要按顺序排列
        //筛选在线学生
        let arrs = [];
        for(let i in this.dest){
            for(let j in this.stuIDs){
                if(this.dest[i].senderId == this.stuIDs[j].id){
                    arrs.push(this.dest[i]);
                }
            }
        }
        this.dest = arrs;
        let temparr = [];
        if(type){
            //去按顺序排列
            for(let a in this.stuIDs){
                if(this.stuIDs[a].roleType == "0"){
                    for(let b in this.dest){
                        if(this.dest[b].senderId == this.stuIDs[a].id){
                            temparr.push(this.dest[b]);
                            //同时删除dest中的这个学生。
                            this.dest.splice(b,1);
                        }
                    }
                }
            }
        }

        this.dest = [...temparr , ...this.dest];
        //最后拼接传入
        observer.publish("bulletList" , this.dest);
    }

   
    /**
     * 初始化当前页答题状态
     */
    getAnswerState(data){
        console.log("初始化当前页答题状态",data);
        // 看进入的人是老师还是学生 
        // 如果是老师 开始答题状态 需要按钮改变为暂停答题 并且解绑老师事件
        // 如果是学生开始答题状态 则需要添加事件 
         if(data.answerState === "start"){
            // 按钮变成暂停答题  按钮变成暂停答题可点  
            if(GM.role === 0){
                 this.answering = false;
                 this.changeAnswerBtn('pause');
                 this.pagebox.timeOutFrameLoopEvent();
            }
            else if(GM.role === 1){
                if(this.pagebox.rightlength != this.pagebox.targetTypelength){
                     this.pagebox.pictureEvent(); 
                }               
            }        
        }
    }
     /**
     * 初始化获取当前答题数据
     */
    getAnswerList(data){
        console.log("当前答题数据",data);
        let teacherAnswerList;
        if(data.senderId === GM.senderId){
            if(GM.role === 0){
                teacherAnswerList = data.teacherAnswerList.list
                if(GM.classMode === "1v6" && teacherAnswerList != undefined){
                    if(teacherAnswerList.length > 0){             
                        this.changroleListHandler(teacherAnswerList);
                    
                    }
                }else{
                    this.changroleAnswerList(1,data);
                }
                
            }else{
                //只有在开始答题状态 学生同步老师+学生数据 其他情况 
                // if(!this.answering){
                     this.changroleAnswerList(1,data);
                // }
               
            }
        }
    }

    /**
     * changeRole 收到切换视角指令
     */
    changeRole(data){
        console.log("收到切换视角指令",data);
        // 切换视角关闭bottom以及左右切换按钮  当学生id为自己的id的时候
        if(data.studentId === GM.senderId){
            this.pagebox.timeOutFrameLoopEvent();
            this.pagebox.returnitems();       
            this.pagebox.resetState();          
            this.pagebox.unEvents();
            // 老师视角
            if(this.answering){
               this.pagebox.pictureEvent();
            }
            // 清空存放的学生视角id
            this.changeroleStudentId = null;       
            this.pagebox.answerparamreset();
            this.changroleAnswerList(0,data);
            this.bottom.visible = true;
            this.btnLeft.visible = true;
            this.btnRight.visible = true;
        }else{
            // 还原页面所有操作
            this.pagebox.timeOutFrameLoopEvent();
            this.pagebox.returnitems();   
            this.pagebox.resetState();       
            this.pagebox.unEvents();
            this.pagebox.answerparamreset();
            // 学生视角
            this.changroleAnswerList(1,data);
            this.bottom.visible = false;
            this.btnLeft.visible = false;
            this.btnRight.visible = false;
            this.pagebox.rightlength = 0;
            this.changeroleStudentId = data.studentId;       
        }
    }

    /**
     * 1v6 视角切换存放老师学生答题步骤
     */
    changroleAnswerList(type,data){
        let studentAnswerList,teacherAnswerList;
        let allAnswerLists = [];
        let teachAnswerList = [];
        //老师数据是自己要的也是学生要的
        if(data.teacherAnswerList.list){
            teacherAnswerList = data.teacherAnswerList.list;
            for(let j in teacherAnswerList){
                teachAnswerList.push(teacherAnswerList[j]);
                allAnswerLists.push(teacherAnswerList[j]);
            }
        }

        // 根据type 0 老师 1 是学生
        if(type === 0){
            // 老师视角 只渲染老师数据            
            this.changroleListHandler(teachAnswerList);
        }else if(type === 1){
            // 学生视角  渲染老师加上学生数据
            if(data.studentAnswerList.list){
                studentAnswerList = data.studentAnswerList.list;
                for(let i in studentAnswerList){
                    allAnswerLists.push(studentAnswerList[i]);
                }
            }

            if(allAnswerLists.length > 0){
                this.changroleListHandler(allAnswerLists);
            }   
       
        }
    }

    /**
     * 1v6切换视角后数据渲染
     */
    changroleListHandler(list){
         for(let i = 0; i<list.length;i++){
             if(list[i].answerstate != 3){
                 this.answerOneToOne(list[i],"init");
             }       
         }
    }
   
    /**
     * @param 入场 
     */
    onEnter() {
        // 视图居中
        setViewCenter();
        // UTILS.log(this.sceneName + " enter");
        // 取消订阅时不用传递回调函数
        observer.unsubscribe(this.sceneName + "_enter");
        this.dispatchAction();  
    }

    /**
     * @param 触发
     */
    dispatchAction() { 
        //  初始化发送 senderId 课程id，和相关的那个名字，还有课件页面总数 GM.LIBRARY.length    
        let data = {
            senderId:GM.senderId,
            roomId:GM.roomId,
            allPageNum:GM.LIBRARY.length,
            courseID:GM.cwId
        }
        console.log(GM.senderId,GM.roomId,GM.LIBRARY.length);
        messageCenter.emit("init",data);
        // 备课以及本地使用
        if(GM.flag === 0){          
            this.pageNum = GM.PageNum -1;          
            observer.publish("Page",{page:this.pageNum});  
        } 
             
        // 获取当前page和步骤 以及当前学生list
        messageCenter.emit("getPage",{senderId:GM.senderId});   
        messageCenter.emit("getStep",{senderId:GM.senderId}); 
        messageCenter.emit("getStudents",{senderId:GM.senderId});
        messageCenter.emit("getUserList",{senderId:GM.senderId});
        //获取当前页答题数据以及答题状态包括断线
        messageCenter.emit("getAnswerList",{senderId:GM.senderId});
        messageCenter.emit("getAnswerState",{senderId:GM.senderId});
    }
   
    /**
     * @param 退出
     */
    onExit() {
        // UTILS.log(this.sceneName + " exit");
        // 取消所有注册
        // this.unRegisterAction();
        //发布退出事件
        observer.publish(this.sceneName + "_exit");
        this.clear();
    }

     /**
     * @param 自定义方法，场景退出的时候是销毁还是removeSelf请自行抉择
     */
    clear() {
        this.destroy();
     }
     //3d元素
    creatCylinderMode(){
        var scene = this.addChild(new Laya.Scene());
        this.sceneMode = scene;
        //添加照相机
        var camera = (scene.addChild(new Laya.Camera(0, 0.3, 100)));
        camera.transform.translate(new Laya.Vector3(1, 2, 4));
        camera.transform.rotate(new Laya.Vector3(-30, 0, 0), true, false);
        camera.clearColor = null;

        //添加方向光
        var directionLight = scene.addChild(new Laya.DirectionLight());
        directionLight.color = new Laya.Vector3(0.9, 0.9, 0.9);
        directionLight.direction = new Laya.Vector3(1, -1, 1); 

         var directionLight2 = scene.addChild(new Laya.DirectionLight());
        directionLight2.color = new Laya.Vector3(54.0/255.0,175.0/255.0,205.0/255.0);
        directionLight2.direction = new Laya.Vector3(-1, 1,- 1); 

        
        //创建圆柱体模型(参数为：半径、高、圆截面线段数)
        var cylinderMesh =new Laya.CylinderMesh(0.5,2,16);
        //创建模型显示对象
        var cylinder3D =new Laya.MeshSprite3D(cylinderMesh);
        //x轴上移动3米（世界座标 向右）
        cylinder3D.transform.translate(new Laya.Vector3(0,0,0),false);
        //scene.addChild(cylinder3D);

        var material = new Laya.StandardMaterial(); 
        material.ambientColor =new Laya.Vector3(54.0/255.0,175.0/255.0,205.0/255.0); 

        cylinder3D.meshRender.material = material;

        cylinder3D.addComponent(BoxControlScript);
        scene.addChild(cylinder3D);
    }

    creatSquareMode(){
        //添加3D场景
        var scene = this.addChild(new Laya.Scene());
        this.sceneMode = scene;
        //添加照相机
        var camera = (scene.addChild(new Laya.Camera(0, 0.3, 100)));
        camera.transform.translate(new Laya.Vector3(-1, 2, 4));
        camera.transform.rotate(new Laya.Vector3(-30, 0, 0), true, false);
        camera.clearColor = null;

        //添加方向光
        var directionLight = scene.addChild(new Laya.DirectionLight());
        directionLight.color = new Laya.Vector3(0.5, 0.5, 0.5);
        directionLight.direction = new Laya.Vector3(-1, -1, 1); 

        //添加方向光
        var directionLight2 = scene.addChild(new Laya.DirectionLight());
        directionLight2.color = new Laya.Vector3(0.3, 0.3, 0.3);
        directionLight2.direction = new Laya.Vector3(1, 1, -1); 

        //添加自定义模型
        var box = scene.addChild(new Laya.MeshSprite3D(new Laya.BoxMesh(0, 0, 0)));
        box.transform.rotate(new Laya.Vector3(0, 45, 0), false, false);
        var material = new Laya.StandardMaterial();
        //material.diffuseTexture = Laya.Texture2D.load("res/ww.png"); 
        material.ambientColor =new Laya.Vector3(2,2,2);
        box.meshRender.material = material;

       // box.addComponent(BoxControlScript);


        //顶部
        var cube1 = scene.addChild(new Laya.MeshSprite3D(new Laya.BoxMesh(1, 1, 0.02)));
        cube1.transform.translate(new Laya.Vector3(0.5, 0, 0));
        material = new Laya.StandardMaterial();
        material.diffuseTexture = Laya.Texture2D.load("res/sceneMode/numberF.png");
        material.ambientColor =new Laya.Vector3(2,2,2);
        cube1.meshRender.material = material;

       
        //box.addChild(cube1);
       

        var cube1Pt = scene.addChild(new Laya.MeshSprite3D(new Laya.BoxMesh(0, 0, 0)));
        cube1Pt.transform.translate(new Laya.Vector3(0.5, 0.5, 0));
        box.addChild(cube1Pt);
        cube1Pt.addChild(cube1);
       // cube1Pt.transform.rotate(new Laya.Vector3(0,0,-180),false,false);


        //前面
        var cube2Pt = scene.addChild(new Laya.MeshSprite3D(new Laya.BoxMesh(0, 0, 0)));
        cube2Pt.transform.translate(new Laya.Vector3(-0.5, -0.5, 0));
        box.addChild(cube2Pt);

        var cube2 = scene.addChild(new Laya.MeshSprite3D(new Laya.BoxMesh(1, 1, 0.02)));
        cube2.transform.translate(new Laya.Vector3(0.5, 0, 0));
        material = new Laya.StandardMaterial();
        material.diffuseTexture = Laya.Texture2D.load("res/sceneMode/numberD.png");
        material.ambientColor =new Laya.Vector3(2,2,2);
        cube2.meshRender.material = material;
        cube2Pt.addChild(cube2);
      //  cube2Pt.addComponent(Cube2Script);


        //右面
        var cube3Pt = scene.addChild(new Laya.MeshSprite3D(new Laya.BoxMesh(0, 0, 0)));
        cube3Pt.transform.translate(new Laya.Vector3(0.0, -0.5, 0.5));
        box.addChild(cube3Pt);

        var cube3 = scene.addChild(new Laya.MeshSprite3D(new Laya.BoxMesh(1, 1, 0.02)));
        cube3.transform.translate(new Laya.Vector3(0, 0, 0.5));
        material = new Laya.StandardMaterial();
        material.diffuseTexture = Laya.Texture2D.load("res/sceneMode/numberE.png");
        material.ambientColor =new Laya.Vector3(2,2,2);
        cube3.meshRender.material = material;
        cube3Pt.addChild(cube3);
      //  cube3Pt.addComponent(Cube3Script);

         //左面
        var cube4Pt = scene.addChild(new Laya.MeshSprite3D(new Laya.BoxMesh(0, 0, 0)));
        cube4Pt.transform.translate(new Laya.Vector3(0.0, -0.5, -0.5));
        box.addChild(cube4Pt);

        var cube4 = scene.addChild(new Laya.MeshSprite3D(new Laya.BoxMesh(1, 1, 0.02)));
        cube4.transform.translate(new Laya.Vector3(0, 0, 0.5));
        material = new Laya.StandardMaterial();
        material.diffuseTexture = Laya.Texture2D.load("res/sceneMode/numberC.png");
        material.ambientColor =new Laya.Vector3(2,2,2);
        cube4.meshRender.material = material;
        cube4Pt.addChild(cube4);
      //  cube4Pt.addComponent(Cube4Script);

        //后面
        var cube5Pt = scene.addChild(new Laya.MeshSprite3D(new Laya.BoxMesh(0, 0, 0)));
        cube5Pt.transform.translate(new Laya.Vector3(0.5, -0.5, 0));
        box.addChild(cube5Pt);

        var cube5 = scene.addChild(new Laya.MeshSprite3D(new Laya.BoxMesh(1, 1, 0.02)));
        cube5.transform.translate(new Laya.Vector3(0.5, 0, 0));
        material = new Laya.StandardMaterial();
        material.diffuseTexture = Laya.Texture2D.load("res/sceneMode/numberB.png");
        material.ambientColor =new Laya.Vector3(2,2,2);
        cube5.meshRender.material = material;

        //cube5.transform.rotate(new Laya.Vector3(0,00,90),false,false);

        cube5Pt.addChild(cube5);
       // cube5Pt.addComponent(Cube5Script);

         //底面
        var cube6Pt = scene.addChild(new Laya.MeshSprite3D(new Laya.BoxMesh(0, 0, 0)));
        cube6Pt.transform.translate(new Laya.Vector3(0.0, -0.5, 0));
        box.addChild(cube6Pt);

        var cube6 = scene.addChild(new Laya.MeshSprite3D(new Laya.BoxMesh(1, 1, 0.02)));
        cube6.transform.translate(new Laya.Vector3(0, 0, 0));
        material = new Laya.StandardMaterial();
        material.diffuseTexture = Laya.Texture2D.load("res/sceneMode/numberA.png");
        material.ambientColor =new Laya.Vector3(2,2,2);
        cube6.meshRender.material = material;
        cube6Pt.addChild(cube6);
     
        
        //cube1Pt.transform.rotate(new Laya.Vector3(0,0,-180),false,false);
        cube1Pt.addComponent(Cube1Script);
        cube2Pt.addComponent(Cube2Script);
        cube3Pt.addComponent(Cube3Script);
        cube4Pt.addComponent(Cube4Script);
        cube5Pt.addComponent(Cube5Script);
    }

    closeSquareMode(){     
        this.sceneMode.removeSelf();       
    }
 
}

//3d脚本
var Cube1Script = (function(_super){
    var flag = true;
    var angle = -180;
    function BoxControlScript(){
        BoxControlScript.super(this);
    }
    Laya.class(BoxControlScript,"Cube1Script",_super);
    BoxControlScript.prototype._load = function(owner){
        this.box = owner;
    }
    BoxControlScript.prototype._start = function(state){
        var material = this.box.meshRender.material;
        //修改材质的反射率颜色，让模型偏红
       // material.albedo = new Laya.Vector4(1,0,0,1);
        flag = true;
        angle = -180;
        //this.angle = 90;
        var material = this.box.meshRender.material;
        this.box.transform.rotate(new Laya.Vector3(0,0,-180),false,false);
    }
    BoxControlScript.prototype._update = function(state){
        if(flag ==true && angle <-90)
        {
            angle +=1;
            this.box.transform.rotate(new Laya.Vector3(0,0,-1),false,false);
        }
        else if(flag ==false && angle >-180)
        {
                angle -=1;
                this.box.transform.rotate(new Laya.Vector3(0,0,1),false,false);
        }
        if(angle  ==  -180)
        {
            flag = true;
        }
        if(angle  ==  -90)
        {
            flag = false;
        }
        
    }
    return BoxControlScript;
})(Laya.Script);

var Cube2Script = (function(_super){

    var flag = true;
    var angle = 90;
    function BoxControlScript(){
        BoxControlScript.super(this);
    }
    Laya.class(BoxControlScript,"Cube2Script",_super);
    BoxControlScript.prototype._load = function(owner){
        this.box = owner;
    }
    BoxControlScript.prototype._start = function(state){

        this.flag = true;
        this.angle = 90;

        var material = this.box.meshRender.material;
        //修改材质的反射率颜色，让模型偏红
       // material.albedo = new Laya.Vector4(1,0,0,1);
       this.box.transform.rotate(new Laya.Vector3(0,0,angle),false,false);
    }
    BoxControlScript.prototype._update = function(state){
        if(flag ==true && angle <180)
        {
            angle +=1;
            this.box.transform.rotate(new Laya.Vector3(0,0,1),false,false);
        }
        else if(flag ==false && angle >90)
        {
            angle -=1;
            this.box.transform.rotate(new Laya.Vector3(0,0,-1),false,false);
        }
         if(angle  ==  90)
        {
            flag = true;
        }
        if(angle  ==  180)
        {
            flag = false;
        }
        
    }
    return BoxControlScript;
})(Laya.Script);

var Cube3Script = (function(_super){


    var flag = true;
    var angle = -90;
    function BoxControlScript(){
        BoxControlScript.super(this);
    }
    Laya.class(BoxControlScript,"Cube3Script",_super);
    BoxControlScript.prototype._load = function(owner){
        this.box = owner;
    }
    BoxControlScript.prototype._start = function(state){

        this.flag = true;
        this.angle = -90;
        var material = this.box.meshRender.material;
        //修改材质的反射率颜色，让模型偏红
       // material.albedo = new Laya.Vector4(1,0,0,1);
       this.box.transform.rotate(new Laya.Vector3(angle,0,0),false,false);
    }
    BoxControlScript.prototype._update = function(state){
        if(flag ==true && angle <0)
        {
            angle +=1;
            this.box.transform.rotate(new Laya.Vector3(1,0,0),false,false);
        }
        else if(flag ==false && angle >-90)
        {
            angle -=1;
            this.box.transform.rotate(new Laya.Vector3(-1,0,0),false,false);
        }
        if(angle  ==  -90)
        {
            flag = true;
        }
        if(angle  ==  0)
        {
            flag = false;
        }
        
    }
    return BoxControlScript;
})(Laya.Script);

var Cube4Script = (function(_super){

    var flag = true;
    var angle = 270;
    function BoxControlScript(){
        BoxControlScript.super(this);
    }
    Laya.class(BoxControlScript,"Cube4Script",_super);
    BoxControlScript.prototype._load = function(owner){
        this.box = owner;
    }
    BoxControlScript.prototype._start = function(state){
        this.flag = true;
        this.angle = 270;
        var material = this.box.meshRender.material;
        //修改材质的反射率颜色，让模型偏红
       // material.albedo = new Laya.Vector4(1,0,0,1);
       this.box.transform.rotate(new Laya.Vector3(angle,0,0),false,false);
    }
    BoxControlScript.prototype._update = function(state){
        if(flag ==true && angle >180)
        {
            angle -=1;
            this.box.transform.rotate(new Laya.Vector3(-1,0,0),false,false);
        }
        else if(flag ==false && angle <270)
        {
            angle +=1;
            this.box.transform.rotate(new Laya.Vector3(1,0,0),false,false);
        }
        if(angle  ==  270)
        {
            flag = true;
        }
        if(angle  ==  180)
        {
            flag = false;
        }
    }
    return BoxControlScript;
})(Laya.Script);

var Cube5Script = (function(_super){

    var angle = 90;
    function BoxControlScript(){
        BoxControlScript.super(this);
    }
    Laya.class(BoxControlScript,"Cube5Script",_super);
    BoxControlScript.prototype._load = function(owner){
        this.box = owner;
    }
    BoxControlScript.prototype._start = function(state){

       // flag = true;
        angle = 90;

        var material = this.box.meshRender.material;
        //修改材质的反射率颜色，让模型偏红
       // material.albedo = new Laya.Vector4(1,0,0,1);
       this.box.transform.rotate(new Laya.Vector3(0,0,angle),false,false);
    }
    BoxControlScript.prototype._update = function(state){
        //if(angle <180)
        {
            // angle +=1;
            // this.box.transform.rotate(new Laya.Vector3(0,0,1),false,false);
        }
        
    }
    return BoxControlScript;
})(Laya.Script);


var BoxControlScript = (function(_super){
    function BoxControlScript(){
        BoxControlScript.super(this);
    }
    Laya.class(BoxControlScript,"BoxControlScript",_super);
    /*3D对象加载组件时的执行方法
    owner加载此组件的3D对象
    */
    BoxControlScript.prototype._load = function(owner){
        //获取脚本所属对象
        this.box = owner;
    }
    /*覆写组件所属3D对象实例化完成后，第一次更新时的执行方法*/
    BoxControlScript.prototype._start = function(state){
        //获取模型上的材质
        var material = this.box.meshRender.material;
        //修改材质的反射率颜色，让模型偏红
       // material.albedo = new Laya.Vector4(1,0,0,1);
       this.box.transform.rotate(new Laya.Vector3(0,0.5,0),false,false);
    }
    /*覆写组件更新方法（相当于帧循环）
    *state渲染状态
    */
    BoxControlScript.prototype._update = function(state){
        //所属脚本对象旋转更新
        this.box.transform.rotate(new Laya.Vector3(0.5,0.5,0.5),false,false);
    }
    return BoxControlScript;
})(Laya.Script);
 
   