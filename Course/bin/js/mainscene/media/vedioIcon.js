/**
 * vedioicon 视频控制
 */
import { observer,messageCenter } from '../../module/init_module'; 
import RoomScene from '../room'
export default class vedioIcon extends Laya.Sprite{
    constructor(){
        super();
    }
    init(url){
        messageCenter.emit("playVideo",{senderId:GM.senderId,type:"open",url:url})
        //创建div放置视频和关闭按钮
        let divElement = Laya.Browser.createElement("div");
        divElement.className = "div";
        Laya.Browser.document.body.appendChild(divElement); 
        Laya.Utils.fitDOMElementInArea(divElement,RoomScene.getInstance() , 0, 0, RoomScene.getInstance().width, RoomScene.getInstance().height); 
        // 创建Video元素
        let videoElement = Laya.Browser.createElement("video");
        // videoElement.muted = true;
        divElement.appendChild(videoElement);   
         // 设置Video元素地样式和属性
        videoElement.style.zInddex = Laya.Render.canvas.style.zIndex + 1;
        videoElement.src = url;   
        videoElement.type = "vedio/mp4";
        // let sourceElement = Laya.Browser.createElement("source"); 
        // sourceElement.type = "vedio/mp4";
        // sourceElement.src = url;   
        // videoElement.appendChild(sourceElement);      
        videoElement.play();    
        Laya.Utils.fitDOMElementInArea(videoElement,RoomScene.getInstance() , 0, 0, RoomScene.getInstance().width, RoomScene.getInstance().height); 
        // videoElement.addEventListener("ended",function(){
        //      Laya.Browser.document.body.removeChild(divElement);         
        // },false);

        // 创建关闭按钮
        let buttonElement = Laya.Browser.createElement("div");
        buttonElement.className = "button";    
        divElement.appendChild(buttonElement);
        buttonElement.onclick = ()=>{
            Laya.Browser.document.body.removeChild(divElement);
            messageCenter.emit("playVideo",{senderId:GM.senderId,type:"close",url:url});
        }
        videoElement.style.transform=videoElement.style.webkitTransform="scale(1,1)";
        Laya.Utils.fitDOMElementInArea(buttonElement,RoomScene.getInstance(), 20, 20, 96, 96);    
    }

  
   
}

      
       
       