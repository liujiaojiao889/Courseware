
/**
 * Menu ui visualization of the data that model contains.
 * 菜单panel
 * @class      menuPanel (name)
 */
//io模块 && 顶层观察者，各模块间可以通过观察者来通信 && 场景管理器
import { messageCenter, observer, sceneManager, setViewCenter } from '../../module/init_module';
import RoomScene from '../room';
import LoadingScene from '../loading';

export default class menuPanel extends window.ui.menupanelUI{
    constructor(name,Background,pageNum,index){
        super();
        this.labelname = name;
        this.Background = Background;
        this.pageNum.text = pageNum;
        this.page = parseInt(pageNum)-1;
        this.init();
    }

    init(){    
        this.name.text = "";     
        if(this.Background){
            this.url.skin = GM.ImageLibrary[this.Background].Url; 
        }
                 
        this.url.size(120,90);     
        if(this.labelname){
            this.name.text = this.labelname;
        } 
          
        if(this.page === RoomScene.getInstance().pageNum){
            //直接调用的话，由于在这里时当前场景没有加载完成，所以调用this.bgLabel会报错
            Laya.timer.frameOnce(1,this,()=>{
                this.bgLabel.bgColor = "#27AB38";
                RoomScene.getInstance().oldMenuItem = this.bgLabel;
            });
        }

        this.on(Laya.Event.CLICK,this,()=>{     
            //判断下一元素按钮是否禁用
            if(RoomScene.getInstance().btnNext.disabled === true){
                this.gnextpagetHandler(this);
            }else{
                observer.publish("nextpage" , {func : this.gnextpagetHandler , type : this});
            }
        });
    }
    
    gnextpagetHandler(type){
        if(RoomScene.getInstance().oldMenuItem){
            RoomScene.getInstance().oldMenuItem.bgColor = null;
        }
        type.bgLabel.bgColor = "#27AB38";
        RoomScene.getInstance().oldMenuItem = type.bgLabel;        
        messageCenter.emit('setPage',{page:type.page});
        observer.publish('Page',{page:type.page});  
    }
    changeBgcolor(type){
        if(type === "green"){
            this.bgLabel.bgColor = "#27AB38";
        }else{
            this.bgLabel.bgColor = "#4a4848";
        }
        
    }
  

}