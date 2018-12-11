/**
 * 连线题
 */
import RoomScene from '../room'
export default class LigatureEvent extends Laya.Sprite{
    constructor(pictureItem,item){
        super();
        this.pictureItem = pictureItem;  
        this.name = item.name;
        this.DragStat = 0; //0为down后有up  1为只有down没有up
        this.imageLigature = null;//画线组件
        this.startPoint = [];
        this.endPoint = [];      
        this.ligatureHandle(item);
    }
    
    //画线事件
    ligatureHandle(item){
        let startpostionX = Number(item.Position.split(',')[0]) + item.itemWidth/2;  
        let startpostionY = Number(item.Position.split(',')[1]) + item.itemHeight/2;   
        this.startPoint.push(startpostionX,startpostionY);
        //限制画线区域
        let rectangle1 = new Laya.Rectangle(0, 0,Laya.stage.width,Laya.stage.height);
        //绑定事件改为drag中的
        item.on(Laya.Event.MOUSE_DOWN,this,this.itemMouseDown,[item,rectangle1]);
        //错误检测
        //Laya.stage.on(Laya.Event.MOUSE_OUT,this,this.errorDetection,[item]);

    }
    errorDetection(rectangle1,item){   
        if(this.DragStat === 1 && !RoomScene.getInstance().mouseStat){
            this.imageLigature.graphics.clear();
            Laya.timer.clear(this,this.outScreen);
            Laya.timer.clear(this,this.errorDetection);
            //Laya.stage.off(Laya.Event.MOUSE_OUT,this,this.errorDetection);
            Laya.stage.off(Laya.Event.MOUSE_MOVE,this,this.dragLimit);
            //清除这个货的Laya事件
            Laya.stage.off(Laya.Event.MOUSE_UP,this,this.itemMouseUp);
            item.on(Laya.Event.MOUSE_DOWN,this,this.itemMouseDown,[item,rectangle1]);
            RoomScene.getInstance().pagebox.sendAnswer(2,item.name,"背景",Laya.stage.mouseX,Laya.stage.mouseY,1);
            this.DragStat = 0;
        }
    }
    outScreen(rectangle1,item){
        if(Laya.stage.mouseX <= rectangle1.x ||Laya.stage.mouseX >= rectangle1.width || Laya.stage.mouseY <= rectangle1.y || Laya.stage.mouseY >= rectangle1.height){
            RoomScene.getInstance().pagebox.sendAnswer(2,item.name,"背景",Laya.stage.mouseX,Laya.stage.mouseY,1);
            this.imageLigature.graphics.clear();
            Laya.timer.clear(this,this.outScreen);
            Laya.timer.clear(this,this.errorDetection);
            //Laya.stage.off(Laya.Event.MOUSE_OUT,this,this.errorDetection);
            Laya.stage.off(Laya.Event.MOUSE_MOVE,this,this.dragLimit);
            //清除这个货的Laya事件
            Laya.stage.off(Laya.Event.MOUSE_UP,this,this.itemMouseUp);
            item.on(Laya.Event.MOUSE_DOWN,this,this.itemMouseDown,[item,rectangle1]);
        
        }
    }
    
    //item鼠标按下事件
    itemMouseDown(item,rectangle1){      
        this.DragStat = 1;
        if(!this.imageLigature){
            // this.imageLigature.destroy();
            //创建画线组件，并且设定初值
            this.imageLigature = new Laya.Sprite();	
            RoomScene.getInstance().pagebox.addChild(this.imageLigature);
        }        
        Laya.stage.on(Laya.Event.MOUSE_MOVE,this,this.dragLimit,[item]);
        Laya.stage.on(Laya.Event.MOUSE_UP,this,this.itemMouseUp,[item,rectangle1]);     
          
        //判断鼠标是否超出屏幕
        Laya.timer.frameLoop(1,this,this.outScreen,[rectangle1,item]);
        Laya.timer.frameLoop(1,this,this.errorDetection,[rectangle1,item]);
    }
    //鼠标移动画线
    dragLimit(item){
        item.off(Laya.Event.MOUSE_DOWN,this,this.itemMouseDown);
        this.endPoint[0] = Laya.stage.mouseX;
        this.endPoint[1] = Laya.stage.mouseY;    
		this.imageLigature.graphics.clear();
        //画直线
		this.imageLigature.graphics.drawLine(this.startPoint[0],this.startPoint[1],this.endPoint[0] ,this.endPoint[1] ,"#8ccfd5", 8);
        this.imageLigature.graphics.drawCircle(this.startPoint[0],this.startPoint[1], 10, "#8ccfd5");
        this.imageLigature.graphics.drawCircle(this.endPoint[0] ,this.endPoint[1], 10, "#8ccfd5");
    }
    //item鼠标松开事件
    itemMouseUp(item,rectangle1){ 
        this.DragStat = 0;
        Laya.timer.clear(this,this.outScreen);
        Laya.timer.clear(this,this.errorDetection);
        //Laya.stage.off(Laya.Event.MOUSE_OUT,this,this.errorDetection);
        Laya.stage.off(Laya.Event.MOUSE_MOVE,this,this.dragLimit);
        //清除这个货的Laya事件
        Laya.stage.off(Laya.Event.MOUSE_UP,this,this.itemMouseUp);
        let flag = false;
        let colliderObj = "背景"; //碰撞对象
        let mouseUpPosX;let mouseUpPosY,TagEventList;
        let picItem,tagname;
        mouseUpPosX = Laya.stage.mouseX;
        mouseUpPosY = Laya.stage.mouseY;
        for(let i = 0;i < this.pictureItem.length;i++){  
            //判断碰到到的元素
            if(this.pictureItem[i].hitTestPoint(Laya.stage.mouseX,Laya.stage.mouseY) && item != this.pictureItem[i]){  
                //记录碰撞对象  
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
             this.answerResult(flag,item,tagname,mouseUpPosX,mouseUpPosY,rectangle1);   
        }else{
             this.answerResult(flag,item,colliderObj,mouseUpPosX,mouseUpPosY,rectangle1);
        }
       
     
    }

    answerResult(flag,item,colliderObj,mouseUpPosX,mouseUpPosY,rectangle1){
        let TagName = colliderObj.name;       
        if(!flag){
            //回答错误
            RoomScene.getInstance().pagebox.answerErrorAnimation();
            //线性插值
            let lateTime = 50;
            for (let i = 0; i < 5; i++) { 
                Laya.timer.once(lateTime * i,this,()=>{
                    let v = i / 5;
                    v = this.smoothstep(v); 
                    let x = (this.startPoint[0] * v) + (this.endPoint[0] * (1 - v)); 
                    let y = (this.startPoint[1] * v) + (this.endPoint[1] * (1 - v)); 
                    this.imageLigature.graphics.clear();
                    this.imageLigature.graphics.drawLine(this.startPoint[0],this.startPoint[1],x,y ,"#8ccfd5", 8);
                    this.imageLigature.graphics.drawCircle(this.startPoint[0],this.startPoint[1], 10, "#8ccfd5");
                    this.imageLigature.graphics.drawCircle(x ,y, 10, "#8ccfd5");
                })
            }
            Laya.timer.once((5) * lateTime,this,()=>{
                this.imageLigature.graphics.clear();
                item.on(Laya.Event.MOUSE_DOWN,this,this.itemMouseDown,[item,rectangle1]);
            });

            if(colliderObj != "背景"){
                Laya.SoundManager.playSound('sound/Events/smallErrorWithThing.mp3');
                RoomScene.getInstance().pagebox.sendAnswer("ligature",item.name,TagName,item.nickName,colliderObj.nickName,mouseUpPosX,mouseUpPosY,1);       
            }
            else{
                RoomScene.getInstance().pagebox.sendAnswer("ligature",item.name,TagName,item.nickName,"背景",mouseUpPosX,mouseUpPosY,1);       
                Laya.SoundManager.playSound('sound/Events/smallErrorOutThing.mp3');
            }
            // RoomScene.getInstance().pagebox.sendAnswer("ligature",item.name,TagName,item.nickName,colliderObj.nickName,mouseUpPosX,mouseUpPosY,1);                      
        } 
        else{
            let picItem = colliderObj;          
             //画一条直线
            this.imageLigature.graphics.clear();
            let endpostionX = Number(picItem.Position.split(',')[0]) + picItem.itemWidth/2;  
            let endpostionY = Number(picItem.Position.split(',')[1]) + picItem.itemHeight/2;   
            this.imageLigature.graphics.drawLine(this.startPoint[0],this.startPoint[1],endpostionX,endpostionY, "#8ccfd5", 8);
            this.imageLigature.graphics.drawCircle(this.startPoint[0],this.startPoint[1], 10, "#8ccfd5");
            this.imageLigature.graphics.drawCircle(endpostionX,endpostionY, 10, "#8ccfd5");
            RoomScene.getInstance().pagebox.sendAnswer("ligature",item.name,TagName,item.nickName,colliderObj.nickName,mouseUpPosX,mouseUpPosY,0);
             //(x1 - x2)平方 + (y1 - y2)平方  最后开根号
            let num = parseInt((Math.sqrt(Math.pow((endpostionX - this.startPoint[0]),2) + Math.pow((endpostionY - this.startPoint[1]),2))) / 60);            
            for (let i = 0; i < num; i++) { 
                Laya.timer.once(10 * i,this,()=>{
                    let x = ((endpostionX * i) + (this.startPoint[0] * (num - i))) / num; 
                    let y = ((endpostionY * i) + (this.startPoint[1] * (num - i))) / num;                  
                    RoomScene.getInstance().pagebox.showParticle(x,y,"lianxianWin.part");
                });
            }
          
        }
    }

    smoothstep(x) { 
        return x * x * x * (x * (x * 6 - 15) + 10);
    }
    
    destroyimageLigature(){
        if(this.imageLigature){
            this.imageLigature.destroy();
        }
    }

    dispose()
    {
        if(this.imageLigature){
            this.imageLigature.destroy();
        }
        //Laya.stage.off(Laya.Event.MOUSE_OUT,this,this.errorDetection);
        Laya.stage.off(Laya.Event.MOUSE_MOVE,this,this.dragLimit);
        Laya.stage.off(Laya.Event.MOUSE_UP,this,this.itemMouseUp);      
        Laya.timer.clearAll(this);
        this.pictureItem = [];      
        this.destroy();
    }
}