/**
 * 龙骨人物动画
 */
import {createSkeleton} from '../../module/com/laya.custom';

export default class spineAnimation extends Laya.Box{
    constructor(data){
        super();  
        this.name = data.Name; //元素id
        this.nickName = data.NickName //元素名称
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
        this.IsStudentsInvisible = data.IsStudentsInvisible;  //是否老师可见
        this.skbox = null;
        this.answertagArray = [];  //存放答案区的标签
        this.isElementGroup = null;　//是否在元素组以及index
        this.spinAni = null;
        this.init();
    }

    init(){
        console.log(this.action,"我是骨骼动画");
        // this.skin = "res/animate/bus.png";
        this.Source =  GM.ImageLibrary[this.ImgId];
        this.skpng = this.Source.Url;
        this.skurl = this.Source.jsonFileUrl;
        this.pos(Number(this.Position.split(',')[0]),Number(this.Position.split(',')[1]));
        this.size(this.itemWidth,this.itemHeight);  
        if(this.TagType === 5){
            this.MediaMode = 1;
        }  
        this.anchorX = 0.5; this.anchorY = 0.5;
        this.pos(this.x + this.width/2 , this.y + this.height/2);
        if(this.Rotation){
             this.rotation = this.Rotation;
        }   
       
        if(this.MirrorY && this.MirrorX){
            this.skew(this.MirrorY == -1 ? 180 : 0,this.MirrorX == -1 ? 180 : 0);
        }
        if(this.Transparent){
             this.alpha = this.Transparent;
        }

    
        let res = [
            {url: this.skpng,type: Laya.Loader.IMAGE},
            {url: this.skurl,type: Laya.Loader.BUFFER}
        ]
        let skbox = new Laya.Box();
        skbox.name = "spineani"
        skbox.size(this.width,this.height);
     
        // skbox.pos(skbox.x + skbox.width/2 , skbox.y + skbox.height/2);
        this.itemscaleX = this.itemWidth/this.Source.width;
        this.itemscaleY = this.itemHeight/this.Source.height;
        this.scale(this.itemscaleX,this.itemscaleY);
        this.addChild(skbox);
        Laya.loader.load(res, Laya.Handler.create(this, () => {
            let spinAni = new createSkeleton(this.skurl,null,null,this.skpng);   
            this.spinAni = spinAni;
            spinAni.pos(skbox.width/2,skbox.height/2);
            spinAni.play(this.action,true);
            skbox.addChild(spinAni);
          
        }),null,false);

      
    }
    playandStop(type){
        if(type === 0){
            this.spinAni.play(this.action,true);
        }else{
            this.spinAni.stop();
        }
        
    }

    // dispose(){
    //     this.destroy(true);
    // }

   
   
}

// miaomiao-idle
// dawang-idle
// houzi-idle
// huli-idle
