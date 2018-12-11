/**
 * 动画Animation
 */
// Gradual  //渐进
// Zoom     //缩放
// Bounce   //弹跳
// Included //划入
// FloatIn  //浮入
// const AntType = {
//     0:Gradual,
//     1:Zoom,
//     2:Bounce,
//     3:Included,
//     4:FloatIn
//     5:擦除  0 1 2 3
// }
// // IcdType 出现方式 
// const IcdType = {
//     {0:left},
//     {1:right},
//     {2:top},
//     {3:bottom}
// }
// // ZoomType缩放方式
// const ZoomType = {
//     {0:Self},
//     {1:Center}
// }
// 滑入起始点



import { observer,messageCenter,setViewCenter,sceneManager } from '../../module/init_module';
export default class Animation extends Laya.Sprite{
     constructor(item,Animation){
        super();
        this.item = item;
        this.name = item.name;
        this.postionX = this.item.x;
        this.postionY = this.item.y;
        this.AntType = Animation.AntType;
        this.IcdType = Animation.IcdType;
        this.ZoomType = Animation.ZoomType;
        this.Timer = Animation.Timer*1000;
        this.maskTime = Animation.Timer;
        this.FloatInType = null; //浮入动画
        this.mask = null; //擦除遮罩
        this.MatlabType = [];
        this.itemalpha = 0;
        this.itemani = item.find("spineani");
        this.init();
    }

    init(){
       // 监听关闭mask
       observer.subscribe('closeMask', this.destroyMask.bind(this));  
        observer.subscribe('clearanimation', this.clearanimation.bind(this));  
       // 时长大于0  无需动画
       if(this.Timer > 0 ){
            switch(this.AntType){         
                case 0:
                    this.GradualTween();
                    break;
                case 1:
                    this.zoomTween();
                    break;
                case 2:
                    this.BounceTween();
                    break;
                case 3:             
                    this.Included();
                    break;
                case 4:
                    this.FloatIn();
                    break;
                case 5:
                    this.Matlabsky();
                    break;

            }  
       }
         
    }

    // Gradual渐进
    GradualTween(){
        // console.log("渐进");         
        let itemRotation = 0;
        console.log(this.item.rotation);
        if(this.name === "shun" || this.name === "ni"){         
            if(this.name === "shun"){
                itemRotation = 360;
            }else if(this.name === "ni"){
                itemRotation = -360;
            }           
           this.Timer = 3000;      
           this.item.anchorY = 0.9;
           this.item.y = this.item.y + (this.item.height/2)*0.8;
           Laya.Tween.from(this.item,{rotation:0},this.Timer/6,Laya.Ease.backIn,Laya.Handler.create(this,()=>{ 
                Laya.Tween.to(this.item,{rotation:itemRotation},this.Timer/2,Laya.Ease.linearIn,null,0,true);           
           }));
        }else{
             this.item.alpha = 0;  
            Laya.Tween.to(this.item,{alpha:0},this.Timer/2,Laya.Ease.backIn,Laya.Handler.create(this,()=>{          
                Laya.Tween.to(this.item,{alpha:this.item.Transparent ? this.item.Transparent : 1},this.Timer/2,Laya.Ease.linearIn,null);
            }),false)
        
        }     
    }

    //zoom缩放
    zoomTween(){
        // a.从对象中心 缩放。即以该元素为中心点从小到大出现
        // b.从课件中心 缩放。即该元素以舞台为中心点从小到大出现，最终处于指定位置
        //  console.log("缩放");   
         let zoomOriginx = this.postionX ;
         let zoomOriginY = this.postionY;
         if(this.itemani && this.item.child === null){
              zoomOriginx = this.itemani.x + this.itemani.width/2;
              zoomOriginY = this.itemani.y;
         }
         this.ztype = [
             {scaleX:0,scaleY:0,x:zoomOriginx,y:zoomOriginY},
             {scaleX:0,scaleY:0,x:Laya.stage.width/2,y:Laya.stage.height/2}
         ]

        if(this.itemani && this.item.child === null){
            Laya.Tween.from(this.itemani,this.ztype[this.ZoomType],this.Timer,Laya.Ease.linearIn,Laya.Handler.create(this,()=>{   
                Laya.Tween.to(this.itemani,{scaleX:1,scaleY:1,x:this.itemani.x,y:this.itemani.y},this.Timer,Laya.Ease.linearIn,null,0,true); 
            }),0,true);

        }else{
            Laya.Tween.from(this.item,this.ztype[this.ZoomType],this.Timer,Laya.Ease.linearIn,Laya.Handler.create(this,()=>{    
                Laya.Tween.to(this.item,{scaleX:1,scaleY:1,x:this.postionX,y:this.postionY},this.Timer,Laya.Ease.linearIn,null,0,true);  
            }),0,true);
        }
     
     }

    
    //  Bounce   //弹跳原有的高度加60  到100
    BounceTween(){
        // console.log("弹跳");     
        let delay = this.Timer/4;
        Laya.Tween.to(this.item,{y:this.item.y-60},delay,Laya.Ease.linearIn,Laya.Handler.create(this,()=>{
            Laya.Tween.to(this.item,{y:this.postionY},delay,Laya.Ease.linearIn,Laya.Handler.create(this,()=>{
                Laya.Tween.to(this.item,{y:this.item.y-30},delay,Laya.Ease.linearIn,Laya.Handler.create(this,()=>{
                    Laya.Tween.to(this.item,{y:this.postionY},delay,Laya.Ease.linearIn,null,0,true);
                }),0,true);
            }),0,true);
        }),0,true);
    }

    //  Included 滑入
    Included(){
        let IncludedType = [
            {x:-1200},
            {x:1200},
            {y:-900},
            {y:900},
        ]

        let originX =  Number(this.item.Position.split(',')[0]) + this.item.itemWidth/2;
        let originY = Number(this.item.Position.split(',')[1]) + this.item.itemHeight/2;
        console.log(this.postionX);
        Laya.Tween.from(this.item,IncludedType[this.IcdType],this.Timer/2,Laya.Ease.linearIn,Laya.Handler.create(this,()=>{
            Laya.Tween.to(this.item,{x:originX,y:originY},this.Timer/2,Laya.Ease.linearIn,null,0,true);
        }),0,true);
         
        // 0左 1 右  
        // console.log("划入");           
    }

    // FloatIn  浮入
    FloatIn(){
        // console.log("浮入");        
        this.FloatInType = [
             {x:this.item.x-100,alpha:0},
             {x:this.item.x+100,alpha:0},
             {y:this.item.y-100,alpha:0},
             {y:this.item.y+100,alpha:0},
        ]
        let originX =  Number(this.item.Position.split(',')[0]) + this.item.itemWidth/2;
        let originY = Number(this.item.Position.split(',')[1]) + this.item.itemHeight/2;
        Laya.Tween.from(this.item,this.FloatInType[this.IcdType],this.Timer/2,Laya.Ease.linearIn,Laya.Handler.create(this,()=>{
            Laya.Tween.to(this.item,{x:originX,y:originY,alpha:1},this.Timer/2,Laya.Ease.linearIn,null,0,true);
        }),0,true);
    } 
    // 擦除动画
    Matlabsky(){
        let mask = new Laya.Sprite();
        this.MatlabType = [
            {x:-this.item.width,y:0,maskX:5,maskY:0},
            {x:this.item.width,y:0,maskX:-5,maskY:0},
            {x:0,y:-this.item.height,maskX:0,maskY:-5},
            {x:0,y:this.item.height,maskX:0,maskY:5}
        ]
        mask.graphics.drawRect(this.MatlabType[this.IcdType].x,this.MatlabType[this.IcdType].y,this.item.width,this.item.height,"ff0000");
        // test数据
        // this.IcdType = 2;
        // if(this.IcdType === 0){
        //     mask.graphics.drawRect(-this.item.width,0,this.item.width,this.item.height,"ff0000");
        // }else if(this.IcdType === 1){
        //     mask.graphics.drawRect(this.item.width,0,this.item.width,this.item.height,"ff0000");
        // }
        // else if(this.IcdType === 2){
        //     mask.graphics.drawRect(0,-this.item.height,this.item.width,this.item.height,"ff0000");
        // }
        // else if(this.IcdType === 3){
        //     mask.graphics.drawRect(0,this.item.height,this.item.width,this.item.height,"ff0000");
        // }
        
        this.item.mask = mask;  
        this.item.alpha = 0.2;
        Laya.timer.loop(1,this,this.MaskPostion,[mask]);
        
    }
   
    MaskPostion(mask){  
        // console.log("擦除方式",this.IcdType);
        this.itemalpha+=0.2; 
        this.item.alpha = 1;
        
        // 0左边 1右边 2上 3下
        // console.log(this.item.width,this.maskTime);
        let le = this.item.width/this.Timer;
        console.log(le);
        switch(this.IcdType){
            case 0:
                le = ((this.item.width/this.Timer)*this.item.width)/10;
                mask.x+=le;         
                if(mask.x>=this.item.width){
                    this.closeMask();   
                }
                break;
            case 1:
                le = ((this.item.width/this.Timer)*this.item.width)/10;
                mask.x-=le;                
                if(mask.x<=-this.item.width ){
                    this.closeMask();
                }       
                break;
            case 2:
                le = ((this.item.height/this.Timer)*this.item.height)/10;
                mask.y+=le;              
                if(mask.y>=this.item.height){
                    this.closeMask();
                }
            break;
            case 3:
                 le = ((this.item.height/this.Timer)*this.item.height)/10;
                 mask.y-=le;
                 if(mask.y<=-this.item.height){
                    this.closeMask();
                 }
            break;
            

        }
        // console.log(this.IcdType,mask.x,this.item.width)
        // mask.x<=-this.item.width 右
        // mask.x>=this.item.width 左
        // mask.y>=this.item.height 上
        // mask.y<=-this.item.height 下
   
    }

    closeMask(){
         Laya.timer.clear(this,this.MaskPostion);  
         this.item.mask = null;
         this.item.alpha = 1; 
    }

    destroyMask(){
         Laya.timer.clear(this,this.MaskPostion);  
         this.mask = null;
         this.item = null;     
    }

    clearanimation(){
        Laya.Tween.clearAll(this.item);
    }



}