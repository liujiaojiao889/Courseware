/**
 * gifElement 播放控制
 */

import { observer,messageCenter } from '../../module/init_module'; 
import RoomScene from '../room'
export default class gifElement extends Laya.Sprite{
    constructor(data){
        super();
        this.name = data.Name; //元素名称   
        this.NickName = data.NickName       
        this.Animation = data.Animation; //动画  
        this.EventList = data.EventList;  //元素带出  
        this.Position = data.Position; //位置
        this.Rotation = data.Rotation; //角度
        this.itemWidth = data.Width; //宽
        this.itemHeight = data.Height; //高
        this.ImgId = data.ImgId; //对应的图片ID
        this.TagType = data.TagType;  //元素本身事件
        this.Tag = data.Tag; //答案区
        this.index = data.Index; //index属性
        this.DriveType = data.DriveType; //出场属性
        this.MirrorX = data.MirrorX; //左右镜像
        this.MirrorY = data.MirrorY; //竖直镜像
        this.Transparent = data.Transparent / 100; //透明度 1-100
        this.MediaId = data.MediaId; //元素视频链接
        this.MediaMode = data.MediaMode  //元素多媒体出现状态
        this.MediaDelay = data.MediaDelay;
        this.MediaUrl = null;
        this.itemscaleX = null;
        this.itemscaleY = null;
        this.skpng = null; //龙骨图片
        this.skurl = null; //龙骨json
        this.action = data.DefaultAction;
        this.Source = null;//数组内的对象
        this.AngleGroup = data.AngleGroup ;//旋转角度组
        this.gifx = null;
        this.gifY = null;
        this.imageElement = null;
        this.init();    
    }
    init(){   

        observer.subscribe("gifdis",this.dispose.bind(this));
        this.gifx = Number(this.Position.split(',')[0]);
        this.gifY = Number(this.Position.split(',')[1])
        this.imageElement = Laya.Browser.createElement("img");
        // imageElement.src = "res/gif/" + this.NickName + ".gif";
        if(this.NickName === "dian_gif"){
            // this.imageElement.src = "res/gif/dian_gif.gif";
            this.imageElement.src = "https://cdn.czbapp.com/multimedia/www/courseware/res/gif/dian_gif.gif";
        }else if(this.NickName === "feng_gif"){
            // this.imageElement.src = "res/gif/feng_gif.gif";
            this.imageElement.src = "https://cdn.czbapp.com/multimedia/www/courseware/res/gif/feng_gif.gif";
        }else if(this.NickName === "qing_gif"){
            // this.imageElement.src = "res/gif/qing_gif.gif";
            this.imageElement.src = "https://cdn.czbapp.com/multimedia/www/courseware/res/gif/qing_gif.gif";
        }
        else if(this.NickName === "xue_gif"){
            // this.imageElement.src = "res/gif/xue_gif.gif";
             this.imageElement.src = "https://cdn.czbapp.com/multimedia/www/courseware/res/gif/xue_gif.gif";
        }
        else if(this.NickName === "yu_gif"){
            // this.imageElement.src = "res/gif/yu_gif.gif";
             this.imageElement.src = "https://cdn.czbapp.com/multimedia/www/courseware/res/gif/yu_gif.gif";
        }
        
        // this.imageElement.src = "https://cdn.czbapp.com/multimedia/www/courseware/res/gif/qing_gif.gif";
        console.log(this.imageElement.src) 
        Laya.Browser.document.body.appendChild(this.imageElement); 
        Laya.Utils.fitDOMElementInArea(this.imageElement,Laya.stage ,this.gifx,this.gifY, this.itemWidth ,  this.itemHeight); 
      
    }
   

    dispose(){
        if(this.imageElement){
          Laya.Browser.document.body.removeChild(this.imageElement);
          this.imageElement = null; 
        }
         
    }

  
   
}


       
       