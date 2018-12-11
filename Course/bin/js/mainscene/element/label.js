
/**
 * label  文本
 */

import LoadingScene from '../loading';
import Animation from '../animat/anmation'
export default class label extends Laya.Label{
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
        this.init();  
    }
    //初始化图片和位置并且绑定相应的事件
    init(){               
        this.pos(Number(this.Position.split(',')[0]),Number(this.Position.split(',')[1]));
        this.size(this.itemWidth,this.itemHeight+20 );  
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

        this.mouseEnabled = true;    
        this.wordWrap = true;
        this.text = this.DefText.Text;
        this.bold = this.DefText.IsBold;
        this.italic = this.DefText.Italic;

        //下划线位置修改 在 laya.core.js   17434行
        this.underline = this.DefText.UnderLine;
        let alistr = "left";

        //0 左  1中 2右
        if(this.DefText.Alignment ===1)
        {
            alistr = "center";
        }
        else if(this.DefText.Alignment === 2)
        {
            alistr = "right";
        }
        this.align = alistr;

        //颜色和透明度
        if(this.DefText.Color === "#000000")
        {
            this.color = this.DefText.Color;
        }
        else{
            let rgb = this.DefText.Color.substring(3);
            rgb = "#" + rgb;
            this.color = rgb;
            let alp = this.DefText.Color.substring(1,3);
            alp = parseInt(alp,16);
            alp = alp / 255;      
            this.alpha = alp;
        }
        if(this.DefText.Fonts === "微软雅黑"){
            this.font = "Microsoft YaHei";
            
        }
        this.padding = "9,5,5,5";
        this.fontSize = this.DefText.FtSize -10;
        this.leading = 10;

    }
    // dispose(){
    //     this.destroy(true);
    // }
    
}
