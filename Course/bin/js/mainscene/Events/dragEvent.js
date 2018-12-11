/**
 * 拖拽题
 */
import RoomScene from '../room'
export default class DragEvent extends Laya.Sprite{
    constructor(pictureItem,item,width,height){
        super();
        this.pictureItem = pictureItem;    
        this.item = item;         
        this.DragStat = 0; //0为down后有up   1为只有down没有up
        this.tweenObj = null;
        this.itemindex = null;
        this.itemani = item.find("spineani");
        this.postionX = null;
        this.postionY = null;
        this.dragHandle(item);
    }    
     //拖拽事件
    dragHandle(item){     
        let postionX = Number(item.Position.split(',')[0]) + item.itemWidth/2;
        let postionY = Number(item.Position.split(',')[1]) + item.itemHeight/2;  
        this.postionX = postionX;
        this.postionY = postionY;
        let rectangle1 = new Laya.Rectangle(0, 0,Laya.stage.width,Laya.stage.height);//978
        //console.log(rectangle1);
        //绑定事件改为drag中的
        item.on(Laya.Event.MOUSE_DOWN,this,this.itemMouseDown,[item,rectangle1,postionX,postionY]);
        item.on(Laya.Event.MOUSE_UP,this,this.itemMouseUp,[item,rectangle1,postionX,postionY]);
        //错误检测
        //Laya.stage.on(Laya.Event.MOUSE_OUT,this,this.errorDetection,[item,postionX,postionY]);
    }
    errorDetection(item,postionX,postionY){  
        //console.log(RoomScene.getInstance().mouseStat);
        if(this.DragStat === 1 && !RoomScene.getInstance().mouseStat){
            Laya.timer.clear(this,this.errorDetection);
            item.off(Laya.Event.DRAG_MOVE,this,this.dragLimit);
            Laya.Tween.to(item,{x:postionX,y:postionY},300,Laya.Ease.linearIn); 
            RoomScene.getInstance().pagebox.sendAnswer(1,item.name,"背景",item.nickName,"背景",Laya.stage.mouseX,Laya.stage.mouseY,1);
            if(this.itemani){        
                this.itemani.scaleX = 1; this.itemani.scaleY = 1; 
            }else{
                item.scaleX = 1; item.scaleY = 1; 
            }
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
            if(this.itemani){        
                this.itemani.scaleX = 1; this.itemani.scaleY = 1; 
            }else{
                item.scaleX = 1; item.scaleY = 1; 
            }
            Laya.Tween.to(item,{x:postionX,y:postionY},300,Laya.Ease.linearIn,null,0,true);  
            item.off(Laya.Event.DRAG_MOVE,this,this.dragLimit);
        }
    }


    //item鼠标按下事件
    itemMouseDown(item,rectangle1,postionX,postionY){
        this.DragStat = 1;
        this.itemindex =  RoomScene.getInstance().pagebox.getChildIndex(item);
        let index = RoomScene.getInstance().pagebox._childs.length -1;
        RoomScene.getInstance().pagebox.setChildIndex(item,index);
       
        item.startDrag();  
        if(this.itemani){        
            this.itemani.scaleX = 1.2; this.itemani.scaleY = 1.2; 
        }else{
            item.scaleX = 1.2; item.scaleY = 1.2; 
        }
      
        // item.spec.visible = false;
        
        Laya.timer.frameLoop(1,this,this.errorDetection,[item,postionX,postionY]);
    }
    //item鼠标松开事件
    itemMouseUp(item,rectangle1,postionX,postionY){ 
        item.on(Laya.Event.DRAG_MOVE,this,this.dragLimit,[rectangle1,item,postionX,postionY,Laya.stage.mouseX,Laya.stage.mouseY]);
        // RoomScene.getInstance().pagebox.setChildIndex(item,this.itemindex);
        Laya.timer.clear(this,this.errorDetection);
        // item.off(Laya.Event.DRAG_MOVE,this,this.dragLimit);
        item.stopDrag();
        // item.spec.visible = true;
        if(this.tweenObj){
            this.tweenObj.complete(); 
        }
        this.DragStat = 0;     
        let flag = false;
        let colliderObj = "背景"; //碰撞对象
        let tagname;
        let mouseUpPosX;let mouseUpPosY,picItem,TagEventList;
        if(this.itemani){        
            this.itemani.scaleX = 1; this.itemani.scaleY = 1; 
        }else{
            item.scaleX = 1; item.scaleY = 1; 
        }
        mouseUpPosX = Laya.stage.mouseX;
        mouseUpPosY = Laya.stage.mouseY;
        for(let i = 0;i < this.pictureItem.length;i++){  
            //判断碰到到的元素
            if(this.pictureItem[i].hitTestPoint(Laya.stage.mouseX,Laya.stage.mouseY) && item != this.pictureItem[i]){
                //修改item的位置，并记录位置
                item.x = Laya.stage.mouseX;
                item.y = Laya.stage.mouseY;
                colliderObj = this.pictureItem[i];  
                // 判断是否是答案区
                if( this.pictureItem[i].answertagArray.length > 0 &&　this.pictureItem[i].TagType === 2 ){
                     TagEventList = this.pictureItem[i].answertagArray[0];
                     if(RoomScene.getInstance().pagebox.OrderIndex === TagEventList.index){
                        if( this.pictureItem[i].answertagArray.length > 0 ){                       
                            flag = RoomScene.getInstance().pagebox.listshiftfirst(this.pictureItem[i],item);
                              if(flag){
                                tagname = this.pictureItem[i];  
                                item.offAll();
                                break;
                              }
                        }                      
                    }
                }

            }
        } 
        if(flag){          
            this.answerResult(flag,item,tagname,mouseUpPosX,mouseUpPosY,postionX,postionY); 
        }else{
            this.answerResult(flag,item,colliderObj,mouseUpPosX,mouseUpPosY,postionX,postionY);  
        }
          
    }

    answerResult(flag,item,colliderObj,mouseUpPosX,mouseUpPosY,postionX,postionY){ 
        //  RoomScene.getInstance().pagebox.setChildIndex(item,this.itemindex);     
         if(!flag){
             // 回答错误
            RoomScene.getInstance().pagebox.answerErrorAnimation();
            if(colliderObj != "背景")
            {
                Laya.SoundManager.playSound('sound/Events/smallErrorWithThing.mp3');
                RoomScene.getInstance().pagebox.sendAnswer("drop",item.name,colliderObj.name,item.nickName,colliderObj.nickName,mouseUpPosX,mouseUpPosY,1);
                
            }
            else{
                Laya.SoundManager.playSound('sound/Events/smallErrorOutThing.mp3');
                RoomScene.getInstance().pagebox.sendAnswer("drop",item.name,"背景",item.nickName,"背景",mouseUpPosX,mouseUpPosY,1);
            }
           
            this.tweenObj = Laya.Tween.to(item,{x:this.postionX,y:this.postionY},300,Laya.Ease.linearIn,null,0,true);   
        } 
        else{     
             RoomScene.getInstance().pagebox.sendAnswer("drop",item.name,colliderObj.name,item.nickName,colliderObj.nickName,mouseUpPosX,mouseUpPosY,0);
             RoomScene.getInstance().pagebox.showParticle(Laya.stage.mouseX,Laya.stage.mouseY,'WinParticle.part');
        }
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