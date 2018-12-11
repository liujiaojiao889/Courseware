
/**
 * picture 图片元素
 */
import { createSkeleton } from '../../module/com/laya.custom'

export default class Picture extends Laya.Image{
    constructor(data){
        super();     
        this.url = null; //元素skin
        this.name = data.Name; //元素id
        this.nickName= data.NickName //元素名称
        this.Animation = data.Animation; //动画
        this.Position = data.Position; //位置
        this.Rotation = data.Rotation; //角度
        this.EventList = data.EventList;  //元素带出
        this.itemWidth = data.Width; //宽
        this.itemHeight = data.Height; //高
        this.ImgId = data.ImgId; //对应的图片ID
        this.TagType = data.TagType;  //元素本身事件
        this.Tag = data.Tag; //答案区
        this.index = data.Index; //index属性
        this.DriveType = data.DriveType; //出场属性
        this.DefText = data.DefText; //文字
        this.MirrorX = data.MirrorX; //左右镜像
        this.MirrorY = data.MirrorY; //竖直镜像
        this.Transparent = data.Transparent / 100; //透明度 1-100
        this.MediaId = data.MediaId; //元素视频链接
        this.MediaMode = data.MediaMode  //元素多媒体出现状态
        this.MediaDelay = data.MediaDelay  //元素播放音乐延迟时间
        this.MediaUrl = null;
        // this.spec = null; //特效
        this.AngleGroup = data.AngleGroup ;//旋转角度组
        this.IsStudentsInvisible = data.IsStudentsInvisible;  //是否老师可见
        this.answertagArray = [];  //存放答案区的标签
        this.isElementGroup = null;　//是否在元素组以及index
        this.child = null;    
        this.init();  
    }
   
    init(){       
         //将this.ImgId对应传过来的资源路径               
         this.url = GM.ImageLibrary[this.ImgId].Url;
         console.log(this.url);
         if(GM.ImageLibrary[this.MediaId]){
             this.MediaUrl = GM.ImageLibrary[this.MediaId].Url;
         }    
         this.creatElement();     
    }
    creatElement(){    
         //图片的位置大小角度
         this.skin =  this.url;  
        //  console.log("图片的初始位置",this.width,this.height);
         this.mouseEnabled = true;    
         this.pos(Number(this.Position.split(',')[0]),Number(this.Position.split(',')[1]));
         this.size(this.itemWidth,this.itemHeight);  
        //  console.log("图片的位置大小",this.width,this.height);
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
    }

    // //给元素添加特殊动效
    // addelementSpecial(){    
    //     this.spec = new createSkeleton("res/animate/figerChange");
    //     this.addChild(this.spec);
    //     this.spec.visible = false;
    //     this.spec.play(0,true);
    //     this.spec.pos(this.width/2,this.height/2);
    // }

    dispose(){
        this.name = null; //元素id
        this.nickName = null; //元素名称
        this.Animation = null; //动画  
        this.EventList = null;  //元素带出  
        this.Position = null; //位置
        this.Rotation = null; //角度
        this.itemWidth = null; //宽
        this.itemHeight = null; //高
        this.ImgId = null; //对应的图片ID
        this.TagType = null;  //元素本身事件
        this.Tag = null; //答案区
        this.index = null; //index属性
        this.DriveType = null; //出场属性
        this.MirrorX = null; //左右镜像
        this.MirrorY = null; //竖直镜像
        this.Transparent = null; //透明度 1-100
        this.MediaId = null; //元素视频链接
        this.MediaMode = null;  //元素多媒体出现状态
        this.MediaDelay = null;
        this.MediaUrl = null; 
        this.Source = null;//数组内的对象
        this.AngleGroup = null;//旋转角度组
        this.IsStudentsInvisible = null;  //是否老师可见    
        this.answertagArray = [];  //存放答案区的标签
        this.isElementGroup = null;　//是否在元素组以及index 
        this.destroy();
    }
    

}

// HasAutoPrompt  提示音 默认不播放  false
// "Prompt": "5b028bb673235a2120d52468",  提示音
// "TeacherVideo": null,   讲师视频
// "CourseVideo": "5b4ef545f6aa61475f78744b",  课件视频
// "HasOpAnimationAudio": true,  过场动画是否播放默认是false
// 元素
// "MediaId": null,
// "MirrorX": 1, 水平反转
// "MirrorY": 1,垂直反转
// "MediaMode": 0,     0点击  1出场 2  出场点击并存
// "MediaDelay": 0.0,  视频延迟播放
// "Transparent": 100  透明度 0 -1 
// this.canvas = Laya.Render.canvas;
// this.context = this.canvas.getContext('2d');
// var my_gradient = this.context.createLinearGradient(0,0,0,1136); //创建一个线性渐变
// my_gradient.addColorStop(0,"#FF0000");
// my_gradient.addColorStop(1,"#0000FF");
// let sprite = new Laya.Sprite();
// Laya.stage.addChild(sprite);
// sprite.graphics.drawRect(0,0,640,1136,my_gradient);