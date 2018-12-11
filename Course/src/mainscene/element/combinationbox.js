
/**
 * combinationbox 组合
 */
import Picture  from './picture'
import Label  from './label'
import spineAnimation from '../animat/spineAnimation'

export default class combinationbox extends Laya.Box{
    constructor(data){
        super();     
        this.url = null;  //元素路径
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
        this.Tag = data.Tag;  //答案区
        this.index = data.Index;  //元素索引
        this.DriveType = data.DriveType; //元素事件机制
        this.DefText = data.DefText; //文字
        this.MirrorX = data.MirrorX; //左右镜像
        this.MirrorY = data.MirrorY; //竖直镜像
        this.Transparent = data.Transparent / 100; //透明度 1-100
        this.MediaId = data.MediaId; //元素视频链接
        this.MediaMode = data.MediaMode  //元素多媒体出现状态
        this.MediaDelay = data.MediaDelay;
        this.MediaUrl = null;
        this.AngleGroup = data.AngleGroup ;//旋转角度组
        this.IsStudentsInvisible = data.IsStudentsInvisible;  //是否老师可见
        this.answertagArray = [];  //存放答案区的标签
        this.isElementGroup = null;　//是否在元素组以及index
        this.isElementSame = null;  //有其他相同的   
        this.child = data.Children;    
        this.init();  
    }
    //初始化
    init(){               
        this.pos(Number(this.Position.split(',')[0]),Number(this.Position.split(',')[1]));
        console.log(this.itemWidth,this.itemHeight);
        this.size(this.itemWidth,this.itemHeight);  
        this.anchorX = 0.5; this.anchorY = 0.5;
        this.pos(this.x +this.width/2 , this.y +this.height/2);
        // this.pivot(this.itemWidth/2,this.itemHeight/2);
        if(this.Rotation){
             this.rotation = this.Rotation;
        }   
       
        if(this.MirrorY && this.MirrorX){
            this.skew(this.MirrorY == -1 ? 180 : 0,this.MirrorX == -1 ? 180 : 0);
        }
        if(this.Transparent){
             this.alpha = this.Transparent;
        }
        //初始化box里面的元素
        if(this.child.length > 0){
           let element;
           this.child.forEach((item,index)=>{
                if(item.TypeElement === 0){
                    element = new Picture(item);                
                }
                else if(item.TypeElement === 3){
                    element = new Label(item); 
                }
                else if(item.TypeElement === 4){
                    // console.log("我是骨骼动画");
                    element = new spineAnimation(item);
                }
                this.addChild(element);
           });

        }

    }
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


