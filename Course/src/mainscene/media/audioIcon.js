/**
 * 声音icon
 */
import { observer,messageCenter,setViewCenter,sceneManager } from '../../module/init_module';
import RoomScene from '../room'
export default class audioIcon extends Laya.Image {
    constructor(MediaMode,url,MediaDelay,MediaId) {
        super();   
        this.MediaMode = MediaMode;
        this.MediaDelay = MediaDelay;
        this.url = url;
        this.MediaId = MediaId; //声音id
        this.sounduration = null;
        this.sounda = null;
        this.type = null;  //0 元素音乐icon  1提示音
        this.playtype = null;
        this.sAudioicon = null;  
        this.init();
       
    }
    init(){
        //只有sounlist存在 才可以拿到时间
        if(GM.soundList){
            if(messageCenter.soundoutPlay()){
                this.sounduration = GM.soundList[this.MediaId].soundLength;
            }
        }
            
        // 元素音乐icon
        if(this.MediaMode != null){
            //  this.scale(1.2,1.2)
             this.skin = 'res/medias/icon_music.png';
             this.type = 0;
             this.playtype = "Element";
                       
        }else{
            // 提示音icon
            if(GM.role === 0){
                this.skin = "res/medias/icon_tips_s.png";
                this.right = 50;
                this.top = 50;
                this.size(40,40);
                this.on(Laya.Event.CLICK,this,this.onClick.bind(this));
            }
            else{
                this.sAudioicon = new audioPlayIconUI();
                this.right = 2;
                this.top = 2;
                this.size(200,200);
                this.sAudioicon.on(Laya.Event.CLICK,this,this.onClick.bind(this));
                this.addChild(this.sAudioicon);
              
            }
            
            this.type = 1;
            this.playtype = "Prompt";
           
        }
        observer.subscribe("playSound",this.playAudio.bind(this));  
      
    }
   
    //元素播放方式 
    constrolMediaMode(){
        //  0 点击  1播放 2  出场播放 并且点击也可以播放    
        if(this.MediaMode === 1 || this.MediaMode === 2){
            console.log("console",{text:"出场自动播放"});
            //  stat 表示是自动或者出场播放   
            this.playAudio(this.url,this.MediaId,this.MediaMode,"stat");                          
        }
        if(this.MediaMode === 0 || this.MediaMode === 2){
            this.visible = true;
            this.on(Laya.Event.CLICK,this,this.onClick.bind(this));           
        }
     
    }
    onClick(){              
        messageCenter.emit("optStart",{type:this.MediaMode,id:this.MediaId,statu:"open",senderId:GM.senderId,url:this.url});
        // messageCenter.emit("playsound",{id:this.MediaId,type:"sound",isloop:false});
        this.playAudio(this.url,this.MediaId,this.MediaMode);
    }
    // 提示音和本地播放
    playAudio(url,MediaId,MediaMode,stat){ 
        if(this._parent){
            if(this._parent.TagType === 5){           
                this.visible = false;
            }
        }          
        if(this.sounda == null || this.sounda.isStopped){    
            // 学生老师区分开  学生没有元素音频是能播放 
            // MediaMode = null 是提示音 
            if(MediaMode != null){
                this.skin = 'res/medias/icon_music0.png';
                // this.disabled = true;          
            }else{
                if(RoomScene.getInstance().audioItem.visible){
                    if(GM.role === 0){
                         this.skin = 'res/medias/icon_tips_n.png';
                        //  RoomScene.getInstance().audioItem.disabled = true; 
                    }else{                      
                        this.sAudioicon.audioPlay.play(0);                  
                    }                
                }                   
            }       
            if(this.MediaDelay && stat){        
                Laya.timer.once(this.MediaDelay*1000,this,()=>{
                   this.jujdefromplay(url,MediaId);           
                });
            }else{
               this.jujdefromplay(url,MediaId);
            }       
        }

    }
    //播放声音
    jujdefromplay(url,MediaId){
        // 学生声音ipad和appple手机app播放
        if(messageCenter.soundoutPlay()){     
           messageCenter.emit("playsound",{id:MediaId});
           Laya.timer.once(this.sounduration*1000,this,()=>{
                this.sounda = "appsound";
                this.jujdeparentTagType();
           });
        }else{           
            this.sounda = Laya.SoundManager.playSound(url);
            this.completeHandler();           
        }
    }
    //如果声音元素存在父元素并且是旁白 则展示下一个元素
    jujdeparentTagType(){ 
        if(this._parent){
            if(this._parent.TagType === 5){
                let obj;
                if(this._parent.EventList.length > 0 ){                     
                    obj = this._parent.EventList[0];                
                }      
                RoomScene.getInstance().pagebox.showClearEventList(obj);
            }
        } 
        // 手机端声音播放
               
        if(RoomScene.getInstance().audioItem && this.sAudioicon){             
            this.sAudioicon.audioPlay.play(0);
            this.sAudioicon.audioPlay.stop();                
        }  
                 
    }
  
    // 播放完成回调
    completeHandler(type){     
        this.sounda.completeHandler = Laya.Handler.create(this,()=>{
           //声音播放完毕出现下一个元素
           this.jujdeparentTagType();          
           if(this.type === 0){
                this.skin = 'res/medias/icon_music.png';              
                // this.disabled = false;             
           }else if(this.type === 1){
                if(RoomScene.getInstance().audioItem){
                    if(GM.role === 0){                 
                        if(RoomScene.getInstance().audioItem.visible){
                            this.skin = 'res/medias/icon_tips_s.png';
                            // RoomScene.getInstance().audioItem.disabled = false;  
                        }                       
                    }else{
                        if(this.sAudioicon.audioPlay){
                             this.sAudioicon.audioPlay.play(0);
                             this.sAudioicon.audioPlay.stop();
                        }
                       
                    }           
                }  
            }
        });    
    }

    stopSound(){
        if(this.sounda){
            this.sounda.stop();
            this.sounda = null;      
        }    
      
        this.dispose();   
    }
   
    dispose(){     
        // observer.unsubscribe("stopAudio"); 
        // observer.unsubscribe("optStart"); 
        // this.removeChild(this.sAudioicon);
        // this.sAudioicon = null;
        this.sounda = null;
        this.url = null;
        this.destroy(true);
    }  

}
