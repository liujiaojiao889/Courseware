
/**
 * bulletpanel ui visualization of the data that model contains.
 * bulletpanel
 * @class      bulletpanel (name)
 */
import RoomScene from '../room';
import LoadingScene from '../loading';
//io模块 && 顶层观察者，各模块间可以通过观察者来通信 && 场景管理器
import { messageCenter, observer, sceneManager, setViewCenter } from '../../module/init_module';
export default class bulletView extends window.bulletsViewUI{
    constructor(){
        super();
        this.pan = [];
        this.bulletviewAllData = [];
        this.init();
    }

    init(){ 
        this.x = Laya.stage.width/2-this.width/2;   
        this.bottom = -300;
        //tab和View 关联
        this.rankTab.selectHandler = this.rankView.setIndexHandler;
        //去除panel的滚动条
     
        //直播六个学生 旁听生           
        //子弹弹窗关闭按钮
        this.closeBtn.on(Laya.Event.CLICK,this,()=>{
            if(this.visible){            
                this.closeTime();
            }
        });       
        // tab切换
		this.rankTab.selectHandler = new Laya.Handler(this, this.onTabSelected);
        //监听子弹面板数据    
        observer.subscribe('bulletList', this.initBuletView.bind(this));  
        //切页时将list清空
        observer.subscribe("diposeList",this.diposeList.bind(this));   
        
    }
   
    onTabSelected(index){
        if(index==-1){
			return;
		}  	
        this.rankView.selectedIndex = index;
    }

    initBuletView(data){  
        RoomScene.getInstance().bullentViewRights = [];//清空之前数据
        console.log("子弹面板数据",data);
        this.diposeList();
        let index = -1;
        let indexi = -1;
        for(let i in data){  
            if(data[i].roleType === "0"){
                //type 0直播
                index++;
                this.creatdirectBox(data[i],index,"0");
            }else if(data[i].roleType === "1"){
                //type 1旁听生
                indexi++;
                this.creatdirectBox(data[i],indexi,"1");
            }             
        }          
    }
    creatdirectBox(data,index,type){
        let pan = new bulletpanel(data);   
        pan.x = 190*index;
        pan.y = 0;
        this.pan.push(pan); 
        if(type === "0"){
            this.directBox.addChild(pan);
        }else if(type === "1"){
            this.pangTinBox.addChild(pan);
        }      

    }
    
    diposeList(){
         for(let i in this.pan){
             this.pan[i].diposeList();
         }
         this.pan = [];
    }

    showtime(){
        Laya.Tween.to(this,{bottom:100},500,Laya.Ease.linearIn,Laya.Handler.create(this,()=>{
             this.visible = true;           
             RoomScene.getInstance().bottom.buttetBtn.skin = 'res/bulletViews/viewBtn1.png'; 
        }),0,true);
    }
    closeTime(){
        Laya.Tween.to(this,{bottom:-300},500,Laya.Ease.linearIn,Laya.Handler.create(this,()=>{
            this.visible = false;
            RoomScene.getInstance().bottom.buttetBtn.skin = 'res/bulletViews/viewBtn.png';
        }),0,true);
    }
   

}
//每个同学答题显示的面板
class bulletpanel extends bulletpanelUI{
	constructor(data){
		super();
		this.init(data);
	}
	init(data){     
        this.answerList.array = [];  
        this.answerList.vScrollBarSkin = "";     
		let arrayList = data.data;
		let result = [];
		arrayList.forEach((item,index) => {
            this.Sname.text = item.nickName;
            if(item.allstate){
                result.push({
                        writeBg : {visible : index % 2 == 1 ? true : false},
                        progress  : "", 
                        answerstate:"", 
                        allstate:{text:item.allstate,visible:item.allstate ? true:false}         
                });         
            }else{
                result.push({
                    writeBg : {visible : index % 2 == 1 ? true : false},
                    progress  : item.startnickname +"=>"+ item.tagnickname, 
                    answerstate:{color:item.answerstate == 0 ?"#27AB38" : "#FB4D3D",text:item.answerstate == 0? "对" : "错"},   
                    allstate:""     
                });
             
            }
			
		});   
        let tempArr =  result.reverse();
		this.answerList.array = tempArr;
        if(tempArr[0].allstate.text == "全部答对"){
            RoomScene.getInstance().bullentViewRights.push(data.senderId);
        }
	}
    diposeList(){
          this.answerList.array = [];  
          this.destroy();   
          
    }

   
   
}