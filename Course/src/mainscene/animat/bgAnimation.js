/**
 * 背景循环
 */
import { observer,messageCenter,setViewCenter,sceneManager } from '../../module/init_module';

const bg2postion = [
    {x:1200,y:0},  //从右到左
    {x:-1200,y:0}, //从左到右
    {x:0,y:-900},
    {x:0,y:900},
]
const aniSpeed = [5000,3000,7000];
export default class bgAnimation extends Laya.Sprite{
    constructor(bgurl,CirculationMode,CirculationSpeed){
        super();
        this.bg1 = null;
        this.bg2 = null;
        this.bgurl = bgurl;
        this.CirculationSpeed = CirculationSpeed; //循环速度
        this.CirculationMode = CirculationMode; //循环模式 
        this.init();
    }

    init(){
        //创建背景1
        this.bg1 = new Laya.Image(this.bgurl);
        this.bg1.size(1200,900);
        //加载并显示背景图
        // this.bg1.loadImage(this.bgurl);
        //把背景图显示在容器内
        this.addChild(this.bg1);
        //创建背景2
        this.bg2 = new Laya.Image(this.bgurl);
        //加载并显示背景图
        this.bg2.loadImage(this.bgurl);
        // bg2的位置四个地方都不同
        this.bg2.size(1200,900);     
        //把背景图显示在容器内
        this.addChild(this.bg2); 
        //根据动画方式  pos到不同位置
        let bgpo = bg2postion[this.CirculationMode-1];
        // console.log(bgpo,"weizhi")
        this.bg2.pos(bgpo.x,bgpo.y);
        
        //创建一个帧循环，更新容器的位置  
        Laya.timer.loop(1,this,this.accordAnimode); 
    }
    //根据动画模式修改动画
    accordAnimode(){
        let speed = aniSpeed[this.CirculationSpeed]
        switch(this.CirculationMode){
            case 2: //从左到右 。
                this.x+=speed/1200
                if(this.bg1.x+this.x>=1200){
                    this.bg1.x-=1200*2;
                   
                }
                if(this.bg2.x+this.x>=1200){
                    this.bg2.x-=1200*2;
                }  
             break
            case 1: //从右边到
                this.x-=speed/1200
                if(this.bg1.x+this.x<=-1200){
                    this.bg1.x+=1200*2;
                   
                }
                // 1200 
                if(this.bg2.x+this.x<=-1200){
                    this.bg2.x+=1200*2;
                }  
             break
            case 3:
                this.y+=speed/900
                if(this.bg1.y+this.y>=900){
                    this.bg1.y-=900*2;
                }
                if(this.bg2.y+this.y>=900){
                    this.bg2.y-=900*2;
                }  
             break
             case 4:
                this.y-=speed/900
                if(this.bg1.y+this.y<=-900){
                    this.bg1.y+=900*2;
                   
                }
                if(this.bg2.y+this.y<=-900){
                    this.bg2.y+=900*2;
                }  
             break
        }
    }

    stopbgAnimation(){
        Laya.timer.clear(this,this.accordAnimode);
    }






}
// 动画方式 。以及 时间 
/// <summary>
    /// 背景循环模式
    /// </summary>
//     public enum CirculationMode
//     {
//         Static, //静止 。0
//         RightToLeft,//从 右到左1
//         LeftToRight,//从左到右2
//         TopToDown,  //从上到下3
//         DownToTop, //从下到上4
//     }
// 王玮  10:27:20
//   public enum CirculationSpeed
//     {
//         Normal,   //正常 。0 。 5
//         Slow,//慢 。1 。7
//         Fast,//快 。2  3
//     }