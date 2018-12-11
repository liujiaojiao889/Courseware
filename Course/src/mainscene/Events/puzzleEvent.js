/**
 * 拼图题目
 */
import RoomScene from '../room'
export default class puzzleEvent extends Laya.Sprite{
    constructor(pictureItem,item,width,height){
        super();
        this.pictureItem = pictureItem;    
        this.item = item;         
        this.DragStat = 0; //0为down后有up   1为只有down没有up
        this.tweenObj = null;
        this.hasMove = false;  //全局标识，初始化标识元素没有发生mousemove
        this.firstTime = null; //按下时间
        this.clickTimes = -1;
        this.dragHandle(item);
    }    
     //拖拽事件
    dragHandle(item){     
        let postionX = Number(item.Position.split(',')[0]) + item.itemWidth/2;
        let postionY = Number(item.Position.split(',')[1]) + item.itemHeight/2;  
        let rectangle1 = new Laya.Rectangle(0, 0,Laya.stage.width,Laya.stage.height);//978
        //console.log(rectangle1);
        //绑定事件改为drag中的
        item.on(Laya.Event.MOUSE_DOWN,this,this.itemMouseDown,[item,rectangle1,postionX,postionY]);
        item.on(Laya.Event.MOUSE_UP,this,this.itemMouseUp,[item,postionX,postionY]);
        item.on(Laya.Event.CLICK,this,this.angleHandler,[item]);
        //错误检测
        // Laya.stage.on(Laya.Event.MOUSE_OUT,this,this.errorDetection,[item,postionX,postionY]);
    }
   
    //点击旋转角度
    angleHandler(item){
        if(this.hasMove && item.AngleGroup.length >0){
            console.log("点击");
            this.hasMove = false;
            let AngleGroup = [];
            this.clickTimes++;
            for(let i in item.AngleGroup){
                if(item.AngleGroup[i]>0){
                    AngleGroup.push(item.AngleGroup[i]);
                }
            }
            let itemangle = AngleGroup.sort(this.sequence);
            if(this.clickTimes >= itemangle.length){
                this.clickTimes = -1;
                item.rotation = 0;
            }else{
                item.rotation = itemangle[this.clickTimes];
            }
            this.itemrotation = item.rotation;
            console.log(this.itemrotation);  
            Laya.SoundManager.playSound('sound/Events/smallErrorWithThing.mp3');
            RoomScene.getInstance().pagebox.sendAnswer("puzzle",item.name,item.rotation,null,null,null,null,4);
            
        }    
       
    }
    // 排序函数
    sequence(a,b){
        if (a>b) {
            return 1;
        }else if(a<b){
            return -1
        }else{
            return 0;
        }
    }

    errorDetection(item,postionX,postionY){  
        //console.log(RoomScene.getInstance().mouseStat);
        if(this.DragStat === 1 && !RoomScene.getInstance().mouseStat){
            Laya.timer.clear(this,this.errorDetection);
            item.off(Laya.Event.DRAG_MOVE,this,this.dragLimit);
            Laya.Tween.to(item,{x:postionX,y:postionY},300,Laya.Ease.linearIn); 
            RoomScene.getInstance().pagebox.sendAnswer(1,item.name,"背景",null,null,Laya.stage.mouseX,Laya.stage.mouseY,1);
            // item.scaleX = 1; item.scaleY = 1;
            this.DragStat = 0;
            // item.spec.visible = true;
        }
    }
    //拖拽是否到屏幕边缘的判断
    dragLimit(rectangle1,item,postionX,postionY,mouX,mouY){
        //console.log(item.x,item.y);
        //计算四个顶点
        let angle = Math.PI /180 * item.Rotation;
        let tempXS = [];
        let tempYS = [];    
        tempXS[0] = (item.width/2)*Math.cos(angle) - (item.height/2)*Math.sin(angle) + item.x;
        tempXS[1] = (-item.width/2)*Math.cos(angle) - (-item.height/2)*Math.sin(angle) + item.x;
        tempYS[0] = (item.width/2)*Math.sin(angle) + (item.height/2)*Math.cos(angle) + item.y;
        tempYS[1] = (-item.width/2)*Math.sin(angle) + (-item.height/2)*Math.cos(angle) + item.y;
        let angle2 = Math.PI /180 * -item.Rotation;
        tempXS[2] = (item.width/2)*Math.cos(angle2) - (item.height/2)*Math.sin(angle2) + item.x;
        tempXS[3] = (-item.width/2)*Math.cos(angle2) - (-item.height/2)*Math.sin(angle2) + item.x;
        tempYS[2] = (item.width/2)*Math.sin(angle2) + (item.height/2)*Math.cos(angle2) + item.y;
        tempYS[3] = (-item.width/2)*Math.sin(angle2) + (-item.height/2)*Math.cos(angle2) + item.y;
        //从小到大排序
        tempXS = tempXS.sort();
        tempYS = tempYS.sort();
        if(tempXS[3] >= (rectangle1.width+item.width/2) || tempYS[3] >= (rectangle1.height+item.height/2) || tempXS[0]  <= (rectangle1.x+item.width/2)  || tempYS[0] <= (rectangle1.y+item.height/2)){
            //console.log("超出屏幕范围");
            item.stopDrag();
            // item.scaleX = 1; item.scaleY = 1;
            Laya.Tween.to(item,{x:postionX,y:postionY},300,Laya.Ease.linearIn,null,0,true);  
            item.off(Laya.Event.DRAG_MOVE,this,this.dragLimit);
        }
    }


    //item鼠标按下事件
    itemMouseDown(item,rectangle1,postionX,postionY){
        this.firstTime = new Date().getTime();
        this.DragStat = 1;
        let index = RoomScene.getInstance().pagebox._childs.length -1;
        RoomScene.getInstance().pagebox.setChildIndex(item,index);
        item.startDrag();  
        // item.scaleX = 1.2; item.scaleY = 1.2; 
        // item.spec.visible = false;
        // item.on(Laya.Event.DRAG_MOVE,this,this.dragLimit,[rectangle1,item,postionX,postionY,Laya.stage.mouseX,Laya.stage.mouseY]);
        // Laya.timer.frameLoop(1,this,this.errorDetection,[item,postionX,postionY]);
    }
   
    //item鼠标松开事件
    itemMouseUp(item,postionX,postionY){ 
        let lastTime = new Date().getTime();
        if( (lastTime - this.firstTime) < 200){
            this.hasMove = true;
        }
        // Laya.timer.clear(this,this.errorDetection);
        // item.off(Laya.Event.DRAG_MOVE,this,this.dragLimit);
        item.stopDrag();
        // this.hasMove = false;
        // item.spec.visible = true;
        if(this.tweenObj){
            this.tweenObj.complete(); 
        }
        this.DragStat = 0;
        
        let flag = false;
        let colliderObj = "背景"; //碰撞对象
        let mouseUpPosX;let mouseUpPosY;
        // item.scaleX = 1; item.scaleY = 1;
        mouseUpPosX = Laya.stage.mouseX;
        mouseUpPosY = Laya.stage.mouseY;
        // for(let i = 0;i < this.pictureItem.length;i++){  
        //     //判断碰到到的元素
        //     if(this.pictureItem[i].hitTestPoint(Laya.stage.mouseX,Laya.stage.mouseY) && item != this.pictureItem[i]){
        //         //修改item的位置，并记录位置
        //         item.x = Laya.stage.mouseX;
        //         item.y = Laya.stage.mouseY;
        //         colliderObj = this.pictureItem[i].name;                 
        //         if(this.pictureItem[i].TagType == 2 && this.pictureItem[i].Tag == item.Tag){  
        //             flag = true;    
        //             item.offAll();
        //             // item.spec.visible = false;
        //             RoomScene.getInstance().pagebox.bringOutElement(this.pictureItem[i].EventList,item,{senderId:GM.senderId});   
        //             //有可能会出现有底图存在的情况，所以需要循环遍历，等到这个if进来那就一定是碰撞到了，那也就可以退出for了
        //             break;   
        //         }
        //     }  
        // }   
        // if(!flag){
        //     if(colliderObj != "背景")
        //     {
               
        //     }
        //     else{
        //         Laya.SoundManager.playSound('sound/Events/smallErrorOutThing.mp3');
        //     }
        //     // RoomScene.getInstance().pagebox.sendAnswer(1,item.name,colliderObj,mouseUpPosX,mouseUpPosY,1);
        //     // this.tweenObj = Laya.Tween.to(item,{x:postionX,y:postionY},300,Laya.Ease.linearIn,null,0,true);   
        // } 
        // else{      
             RoomScene.getInstance().pagebox.sendAnswer("puzzle",item.name,null,null,null,item.x,item.y,4);
            //  RoomScene.getInstance().pagebox.showParticle(Laya.stage.mouseX,Laya.stage.mouseY,'WinParticle.part');
        // }
    }
    
    dispose()
    {
        //Laya.timer.clear(this,this.errorDetection);
        //Laya.stage.off(Laya.Event.MOUSE_OUT,this,this.errorDetection);
        Laya.timer.clearAll(this);
        this.pictureItem = [];
        this.destroy();
    }
}


// WEBPACK FOOTER //
// Course/src/mainscene/events/puzzleEvent.js