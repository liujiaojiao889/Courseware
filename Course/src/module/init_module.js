
import { MessageCenterModule } from './com/messageCenter';
import { ObserverModule } from './com/observer';
import { SceneManagerModule } from './com/sceneManager';

import RoomScene from '../mainscene/room';

// 进房间
function enterRoom(messageCenter) {
    let roomscene = RoomScene.getInstance(messageCenter);
    
    // 直接进房间
    if(sceneManager.currentScene !== roomscene){
        sceneManager.loadScene(roomscene);
    }
}

// 错误信息处理
function conError(data) {
    switch (Number(data.res.code)) {
        // 异地登陆
        case 1003:
            let reload = () => { window.location.reload() };

            // 断开连接
            messageCenter.disconnectSocket();        

            // 提示弹层
            observer.publish('common::tips', '异地登录，请刷新页面', reload, reload);

            break;       
    }
}

// 模块初始化


// 通信
export const messageCenter = new MessageCenterModule();

// 绑定消息
messageCenter.initAction = function() {
    //一切请求等待首次连接后在发出 
    this.registerAction("conn::init", () => {
        // 进房间
        enterRoom(this);

    });

    // 连接错误信息处理
    this.registerAction('conn::error', (data) => {
        conError(data);

    });
}

// 场景切换的观察者
export const observer = new ObserverModule();

// 场景切换
export const sceneManager = new SceneManagerModule();

// 设置视图居中
export function setViewCenter() {
    let _height = Laya.stage.height;
    let currentView = sceneManager.currentScene;
    if (currentView) {
        currentView.height = _height;
    }
}
