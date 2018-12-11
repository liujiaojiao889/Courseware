
//io

import { observer } from '../init_module';

export class MessageCenterModule {
    constructor() {
        this.ajaxTimeout = 30000;       
        this.registedAction = {};
        this.sendSucess = true; //发送成功
        this.tryNum = 0;//尝试次数
    }

    //注册
    registerAction(key, callback) {
        if (typeof callback === "function") {
            this.registedAction[key] = callback;
        }

        return this;
    }

    //取消注册
    unRegisterAction(key) {
        if (typeof this.registedAction[key] !== "undefined") {
            delete this.registedAction[key];
        }

        return this;
    }

    //触发
    dispatchAction(key, data, type) {
        let callback = this.registedAction[key];
        if (typeof callback === "function") {
            callback(data);
        } else {
            //未注册过的行为静默失败，给出提示
            console.log("未注册行为：" + key, data);
        }
    }

    //获取数据
    emit(key, type, params, callback) {
        // 说明未登录
        if (typeof type === 'function') {
            callback = type;
        }
        if (typeof type === 'object') {
            params = type;
        }
        //注册
        this.registerAction(key, callback);

        if (type === "ajax") {
            this.emitAjax(key, params);
        } else {   
            let msg;   
            if(key === "startLoad"){
                 msg = "startLoad"; 
                 this.poststartLoad(msg)
            }else{   
                 msg = JSON.stringify({cmd: key,data: params});
                 if(key === "mousemove" || key === "mouseclick" || key === "sendAnswer" || key === "reanswer"){
                    this.postMessageApp(msg); 
                 } 
                 else{
                    //this.postMessageApp(msg); 
                    //将数据存入列表
                    GM.messageList.push(msg);
                    console.log("推入数据", GM.messageList)
                    //查看当前是否有消息正在发送，如果没有则立即开启发送数据
                    if(this.sendSucess){
                        Laya.timer.clear(this,this.sendMessage);
                        this.sendMessage(GM.messageList.shift());
                    }
                 }
                 
            }   
        }
    }
    //取出列表中的第一条并发送
    //每次发送第一条数据，如果3秒后没有回复，则再发一次(最好能通知外端，检测网络)。如果还没有则丢弃不管。但在这个过程中socket断了的话，先停止发送，等连上了继续发送
    //发送数据
    sendMessage(msg){
        this.sendSucess = false;
        this.tryNum++;
        console.log("发送数据：" , msg);
        this.postMessageApp(msg); 
        
        if(this.tryNum >= 2){
            this.sendSucess = true;
            this.tryNum = 0;
            //开启下一条的数据发送
            Laya.timer.clear(this,this.sendMessage);
            if(GM.messageList.length != 0){
                this.sendMessage(GM.messageList.shift());
            }
        }
        else{
            //如果中途socket没有断掉，则自己再尝试一次
            Laya.timer.once(3000,this,this.sendMessage,[msg]);
        }
    }
    //ack回应函数
    ackOperation(data){
        //只要有ack回应，直接去发送下一条
        //当前简易操作，不需要多余操作了
        this.socketOnOperation();
    }

    //socket断掉后的等待
    socketOffWait(){
        //停止发送
        this.sendSucess = false;
        Laya.timer.clear(this,this.sendMessage);
    }
    //socket连接后重新发送
    socketOnOperation(){
        //开始发送
        this.sendSucess = true;
        this.tryNum = 0;
        Laya.timer.clear(this,this.sendMessage);
        //开启下一条的数据发送
        if(GM.messageList.length != 0){
            this.sendMessage(GM.messageList.shift());
        }
    }

    //获取ajax数据
    emitAjax(key, params) {
        let self = this;     
        window.$.ajax({
            type:'GET',
            url:GM._url,
            headers: {
              Authorization:GM.token,
              vsFrom: GM.vsFrom,
              userType: GM.userType,         
            },
            timeout: this.ajaxTimeout,
            success: function(response) {
                // console.log(_url, response);
                if(response.result === "success"){
                     response = response || {};
                     self.dispatchAction(key, response, "ajax");
                     
                }else if(GM.From != 0){
                     observer.publish('common::tips');
                     
                }
              
            },
            error: function() {
               //异常处理
               observer.publish('common::tips');
            }
        });
    }

    postMessageApp(msg){     
        // try{                  
            if(GM.isFrameInWeb){    
                let source = GM.rootWindow;
                let origin = GM.rootURL;
                if(source && origin){
                    source.postMessage(msg,origin);
                    console.log("this is Web");
                }else{
                    console.log("source is undefined")
                }
            }else{
                if(GM.vsFrom === "apad"){
                    window.czb.callAndroid(msg)        
                }else if(GM.vsFrom === "ipad"){                
                    window.webkit.messageHandlers.jsCallNative.postMessage(msg);   
                }else if(GM.vsFrom === "IosApp" ||　GM.vsFrom === "AndroidApp"){
                    window.postMessage(msg,'*');                                         
                }
            }

        // }catch(e){
        //     console.log(e);
        // }
    }
    poststartLoad(msg){
          if(Laya.Browser.onAndriod){
                window.czb.startLoad(msg);
          }else if(Laya.Browser.onIOS){   
              if(GM.vsFrom === "ipad"){                                
                window.webkit.messageHandlers.jsCallNative.postMessage({'name':'startLoad'}); 
              } 
                
          }
        
    }
    

}
