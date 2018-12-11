/**
 * 课后报告
 */
import { observer,messageCenter,setViewCenter,sceneManager } from '../../module/init_module';
import RoomScene from '../room';
export default class afterReport extends afterReportUI {
    constructor() {
        super();
        this.studentAnswerList = []; //答题list
        this.reportList = null;
        this.rolebox = null; //学生视角box
        this.roleBtnArr = []; //学生视角button
        this.init();     
    }
    registerAction({ messageCenter, observer }) {
        // 订阅弹层出现
         observer.subscribe("getReport",this.getReportHandler.bind(this));
         observer.subscribe("closeReport",this.myClose.bind(this));
    }

    init(data){   
        if(GM.classMode === "1v6"){
            //添加学生视角box
            this.rolebox = new Laya.Sprite();
            this.addChild(this.rolebox);
            this.rolebox.pos(10,235);
            this.rolebox.size(40,300);  
        }
            
        // 知识点list  
        this.nickName.text = "";
        this.level.text = ""; 
        this.knowledgeList0.array = [];  
        this.knowledgeList0.vScrollBarSkin = ""; 
        this.knowledgeList1.array = [];  
        this.knowledgeList1.vScrollBarSkin = ""; 
        this.anserList.vScrollBarSkin= "res/commonn/vscroll.png";
        this.anserList.vScrollBar.width = 15;
        this.backBtn.visible = false;
        if(GM.AJAX && GM.IsToken){
            if(GM.AJAX.name || GM.AJAX.level_1){
                this.reTitle.text = GM.AJAX.name;
                this.level.text =  GM.AJAX.level_1;
            }         
            // 知识点总结  
            if(GM.AJAX.keywords){
                this.knowledgeAll.text = GM.AJAX.keywords.replace(/,/g, "  ");
            }
            
            if(GM.AJAX.topicExtensions || GM.AJAX.topics){
                this.knowledgeListHandler(GM.AJAX.topicExtensions,0);
                this.knowledgeListHandler(GM.AJAX.topics,1);
            }
        }      
        if(GM.role === 0){
             this.backBtn.visible = true;
             this.backBtn.on(Laya.Event.CLICK,this,()=>{
                messageCenter.emit("optClose",{senderId:GM.senderId});
                this.myClose();
            });
        }
    }
   
    //获取课后报告数据 
    getReportHandler(data){
        this.popup();
        // 存放所有学生课后报告数据
        this.reportList = data;    
        //给老师添加切换视角按钮
        if(GM.classMode === "1v6" && GM.role === 0){
            this.addStudentroleBtn();  
        }
        if(Object.keys(data).length>0){
            this.norecode.visible = false;  
            this.head.visible = true;
            this.levimg.visible = true;         
            console.log("课后报告",data);
            //根据学生ID存储自己的课后报告数据
            //老师随机展示 传入不同学生的id
            console.log("当前所有学生",RoomScene.getInstance().stuIDs);               
            if(GM.role === 1){
                this.reportDataHandler(data,GM.senderId);
            }else{
                let randomitemId = Object.keys(this.reportList)[0]
                this.reportDataHandler(data,randomitemId);
                this.InitGreen(randomitemId);                   
            }          
           
        }else{
            this.norecode.visible = true;
            this.head.visible = false;
            this.levimg.visible = false;
        }    
    }

    //添加1v6学生视角按钮
    addStudentroleBtn(){
        let list = Object.keys(this.reportList);
        if(list.length > 0){
            for(let i = 0; i<list.length;i++){
                let sp = new roleIconUI();       
                sp.txtNum.text = i+1;
                sp.studentId = list[i];
                sp.x = 4;
                sp.y = 56*i;
                this.roleBtnArr.push(sp);
                this.rolebox.addChild(sp);         
                sp.on(Laya.Event.CLICK,this,this.roleBtnEvent.bind(this),[sp,i]);
            }

        }
    }

    //初始化按钮变绿
    InitGreen(id){    
        for(let i in this.roleBtnArr){
            if(id === this.roleBtnArr[i].studentId ){
                this.roleBtnArr[i].bg.skin =  "res/reports/icon_number1.png";
            }
        }    
    }
   
    //给1v6学生视角icon绑定事件
    roleBtnEvent(item,index){
        for(let i in this.roleBtnArr){
            this.roleBtnArr[i].bg.skin = "res/reports/icon_number.png";
        }
        item.bg.skin = "res/reports/icon_number1.png";
          
        this.reportDataHandler(this.reportList,item.studentId);   
    }

    // 根据id处理不同的学生数据
    reportDataHandler(data,senderId){
        //先清空之前的数据
        this.studentAnswerList = [];
        this.anserList.removeChildren();
        let myreport;
        for(let i in data){
            myreport = data[senderId];                
        }

        for(let j in myreport){                  
            this.proloadHandler(myreport[j]);
        } 

        this.anserListHandler();    
    }

    //处理课后报告每页数据 ，取完成度最高的
    proloadHandler(list){
        this.nickName.text = list[0].nickName;
        let pageName;
        // 将数组第一个元素的值赋给max  
        let max = list[0].proload;
        let time = list[0].usertime;
        for (var i = 0; i < list.length; i++) {
             pageName = list[i].pageName;
            // 如果元素当前值大于max,就把这个当前值赋值给max
            if (list[i].proload > max) {
                max = list[i].proload;
                time = list[i].usertime;
            }  
        }
        let item = {
            usertime:time,
            proload:max,
            title:pageName

        }
        this.studentAnswerList.push(item);
        
    }

    //答题list添加panel
    anserListHandler(){
        for(let i in this.studentAnswerList){
            let pan = new reportPanel(this.studentAnswerList[i]);   
            pan.x = 0;
            pan.y = 90*i;
            this.anserList.addChild(pan);
        }        
    }

    //处理知识点list  
    knowledgeListHandler(res,listType){    	
		let result = [];
		res.forEach((item,index) => {          
                result.push({
                    kPoint : item,        
                });         		
		});   
        
        if(listType === 0){
            this.knowledgeList0.array = result;
        }else if(listType === 1){
            this.knowledgeList1.array = result;
        }
    }

    //删除课后报告切换but
    roleBtnArrDis(){
        for(let i = 0; i<this.roleBtnArr.length;i++){
            this.removeChild(this.roleBtnArr[i]);
            this.roleBtnArr[i].destroy();          
        }
    }

    myClose(){
        this.roleBtnArrDis();
        this.studentAnswerList = [];
        this.anserList.removeChildren();
        this.close();
    }
}

/**
 * 答题完成度面板
 */
class reportPanel extends reportPanelUI{
    constructor(data){
        super();
        this.init(data);
    }

    init(data){
        if(data.title != null){
            this.quesTitle.text = data.title; 
        }else{
            this.quesTitle.text = "闯关题";
        }
            
        if(data.usertime > 0){
             this.userTime.text = this.formatSeconds(data.usertime);
        }else{
            this.userTime.text = "多练练~";
        }
       
        console.log("课后报告每题目",data)
        // 进度条默认50%  大于50% 正常显示  错误默认50%
        if(data.proload > 0.5){
            this.proload.width = 317*data.proload;
            this.pre.text = parseInt(data.proload*100) + "%";

        }else{
            this.proload.width = 158.5;
            this.pre.text ="50%";       
        }
    }

    formatSeconds(value) {
        var secondTime = parseInt(value);// 秒
        var minuteTime = 0;// 分
        var hourTime = 0;// 小时
        if(secondTime > 60) {//如果秒数大于60，将秒数转换成整数
            //获取分钟，除以60取整数，得到整数分钟
            minuteTime = parseInt(secondTime / 60);
            //获取秒数，秒数取佘，得到整数秒数
            secondTime = parseInt(secondTime % 60);
            //如果分钟大于60，将分钟转换成小时
            if(minuteTime > 60) {
                //获取小时，获取分钟除以60，得到整数小时
                hourTime = parseInt(minuteTime / 60);
                //获取小时后取佘的分，获取分钟除以60取佘的分
                minuteTime = parseInt(minuteTime % 60);
            }
        }
        var result = "" + parseInt(secondTime) + "秒";

        if(minuteTime > 0) {
            result = "" + parseInt(minuteTime) + "分" + result;
        }
        if(hourTime > 0) {
            result = "" + parseInt(hourTime) + "小时" + result;
        }
        return result;
    }

    dispose(){
        this.destory();
    }


    

}