/**
 * 点击题 @param {*liujiaojiao}
 */
import RoomScene from '../room'
export default class ClickEvent extends Laya.Sprite{
    constructor(pictureItem,item){
        super();
        this.pictureItem = pictureItem;
        this.item = item;    
        this.clickHandle(item);
    }
     // 绑定点击事件 并且监听事件    
    clickHandle(item){
        item.on(Laya.Event.CLICK,this,this.itemMouseClick,[item]);
    }

     //点击事件
    itemMouseClick(item){
        //console.log("点击事件" + item)
        let flag = false;
        let colliderObj = item; 
        let tagname;
        let TagEventList;   
        for(let i = 0;i < this.pictureItem.length;i++){           
            //检测标签相同       
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
        if(flag){          
            this.answerResult(flag,item,tagname); 
        }else{
            this.answerResult(flag,item,colliderObj);  
        }
        
       
    }
    answerResult(flag,item,colliderObj){
         if(!flag){
             // 回答错误
            RoomScene.getInstance().pagebox.answerErrorAnimation();
            Laya.SoundManager.playSound('sound/Events/smallErrorWithThing.mp3');
            RoomScene.getInstance().pagebox.sendAnswer("click",item.name,colliderObj.name,item.nickName,colliderObj.nickName,0,0,1);
              
            Laya.Tween.to(item,{rotation:10},100,Laya.Ease.linearIn,Laya.Handler.create(this,()=>{
                item.rotation = item.Rotation;
            }),0,true);   
        }
        else{
            RoomScene.getInstance().pagebox.sendAnswer("click",item.name,colliderObj.name,item.nickName,colliderObj.nickName,0,0,0);     
            RoomScene.getInstance().pagebox.showParticle(Laya.stage.mouseX,Laya.stage.mouseY,"WinParticle.part");
            
        }
     
    } 

    dispose()
    {
        Laya.timer.clearAll(this);
        this.pictureItem = [];
       
        this.destroy();
    }
}