let IMAGE = Laya.Loader.IMAGE;
let ATLAS = Laya.Loader.ATLAS;
let BUFFER = Laya.Loader.BUFFER;
let SOUND = Laya.Loader.SOUND;
let FONT = Laya.Loader.FONT;
let LIBRARY = {};

const GAME_VERSION = {};
const LoadingLIBRARY = [ 
    {url: 'res/loading/bg.png',type: IMAGE},
    {url: 'res/loading/loading_fengche/qidong.png', type: IMAGE },
    {url: 'res/loading/loading_fengche/qidong.sk', type: BUFFER },
    {url: 'res/loading/loading_fengche/fengche.png', type: IMAGE },
    {url: 'res/loading/loading_fengche/fengche.sk', type: BUFFER },
    {url: 'res/loading/loading_fengche/barbg.png', type: IMAGE },
    {url: 'res/loading/loading_fengche/bar.png', type: IMAGE },
    
    {url: 'res/loading/loading_blue/bluebar.png', type: IMAGE },
    {url: 'res/loading/loading_blue/bluebg.png', type: IMAGE },
    {url: 'res/loading/loading_blue/lanse.png', type: IMAGE },
    {url: 'res/loading/loading_blue/lanse.sk', type: BUFFER },
    {url: 'res/loading/loading_blue/xaiochuan.png', type: IMAGE },
    {url: 'res/loading/loading_blue/xaiochuan.sk', type: BUFFER },

    {url: 'res/loading/loading_green/greenbar.png', type: IMAGE },
     {url: 'res/loading/loading_green/greenbg.png', type: IMAGE },
    {url: 'res/loading/loading_green/dawang_zoupao.png', type: IMAGE },
    {url: 'res/loading/loading_green/dawang_zoupao.sk', type: BUFFER },
    {url: 'res/loading/loading_green/lvse.png', type: IMAGE },
    {url: 'res/loading/loading_green/lvse.sk', type: BUFFER },

    {url: 'res/loading/loading_yellow/yellowbar.png', type: IMAGE },
    {url: 'res/loading/loading_yellow/yellowbg.png', type: IMAGE },
    {url: 'res/loading/loading_yellow/jiazai.png', type: IMAGE },
    {url: 'res/loading/loading_yellow/jiazai.sk', type: BUFFER },
    {url: 'res/loading/loading_yellow/dengpao.png', type: IMAGE },
    {url: 'res/loading/loading_yellow/dengpao.sk', type: BUFFER },

    {url: 'res/loading/texts/text1.png',type: IMAGE},
    {url: 'res/loading/texts/text2.png',type: IMAGE},
    {url: 'res/loading/texts/text3.png',type: IMAGE},
    {url: 'res/loading/texts/text4.png',type: IMAGE},
    {url: 'res/loading/texts/text5.png',type: IMAGE},
    {url: 'res/loading/texts/text6.png',type: IMAGE},
    {url: 'res/loading/texts/text7.png',type: IMAGE},
    {url: 'res/loading/texts/text8.png',type: IMAGE},
    {url: 'res/loading/texts/text9.png',type: IMAGE},
    {url: 'res/loading/texts/text10.png',type: IMAGE},   
    {url: 'res/loading/texts/text11.png',type: IMAGE},
    {url: 'res/loading/texts/text12.png',type: IMAGE},
    {url: 'res/loading/texts/text13.png',type: IMAGE},
    {url: 'res/loading/texts/text14.png',type: IMAGE},
   
    {url: 'res/commonn.json',type: ATLAS},
    {url: 'res/animate/skeleton.png', type: IMAGE },
    {url: 'res/animate/skeleton.sk', type: BUFFER },
    {url: 'res/animate/figerChange.png', type: IMAGE },
    {url: 'res/animate/figerChange.sk', type: BUFFER },
    {url: 'res/medias.json', type: ATLAS }, 
]
const RoomLIBRARY = [
    {url: 'res/commonn/audioPlayIcon/musicPlay0.png', type: IMAGE },
    {url: 'res/commonn/audioPlayIcon/musicPlay1.png', type: IMAGE },
    {url: 'res/commonn/audioPlayIcon/musicPlay2.png', type: IMAGE },
    {url: 'res/commonn/audioPlayIcon/musicPlay3.png', type: IMAGE },
    {url: 'res/commonn/audioPlayIcon/musicPlay4.png', type: IMAGE },
    {url: 'res/commonn/audioPlayIcon/whiteMusic.png',type: IMAGE},     
    {url: 'res/comp.json',type: ATLAS},      
    {url: 'res/commonn/Mask.png', type: IMAGE },
    {url: 'res/commonn/num.fnt',type: FONT},
    {url: 'res/commonn/num.png',type: IMAGE},  
    {url: 'res/animate/anibg.png',type: IMAGE},
    {url: 'res/animate/es.png',type: IMAGE},
    {url: 'res/animate/sky.png',type: IMAGE},     
    {url: 'res/animate/bg.png', type: IMAGE },
    {url: 'res/animate/sky1.png', type: IMAGE }, 
    {url: 'texture.png', type: IMAGE },
    {url: 'res/animate/daduitaibangle.png', type: IMAGE },
    {url: 'res/animate/daduitaibangle.sk', type: BUFFER },
    {url: 'res/animate/czb_jishi_jieshunaozhong.png', type: IMAGE },
    {url: 'res/animate/czb_jishi_jieshunaozhong.sk', type: BUFFER },
    {url: 'res/animate/daojishi.png', type: IMAGE },
    {url: 'res/animate/daojishi.sk', type: BUFFER },

    {url: 'res/bulletViews.json', type: ATLAS },
    {url: 'res/bulletViews/position_vertical.png', type: IMAGE },
    {url: 'res/bulletViews/zidbg.png', type: IMAGE },
    {url: 'res/rankpage.json', type: ATLAS },
    {url: 'res/rankpage/bg_light.png', type: IMAGE },
    {url: 'res/rankpage/img_firstpage.png', type: IMAGE },
    {url: 'res/rankpage/img_secondpage.png', type: IMAGE },
    {url: 'res/rankpage/img_thirdpage.png', type: IMAGE },
    {url: 'res/reports/img_bookbg.png', type: IMAGE },
    {url: 'res/reports.json', type: ATLAS },
    {url: 'lianxianWin.part', type: Laya.Loader.JSON },
    {url: 'WinParticle.part', type: Laya.Loader.JSON },

    //临时添加内置正方体
    {url: 'res/sceneMode/numberA.png', type: IMAGE },
    {url: 'res/sceneMode/numberB.png', type: IMAGE },
    {url: 'res/sceneMode/numberC.png', type: IMAGE },
    {url: 'res/sceneMode/numberD.png', type: IMAGE },
    {url: 'res/sceneMode/numberE.png', type: IMAGE },
    {url: 'res/sceneMode/numberF.png', type: IMAGE },
    //sound
    {url: 'sound/answering.mp3', type: SOUND },
    {url: 'sound/carShow.mp3', type: SOUND },
    {url: 'sound/countdown.mp3', type: SOUND },
    {url: 'sound/ready.mp3', type: SOUND },
    {url: 'sound/timedown.mp3', type: SOUND },
    {url: 'sound/walk.mp3', type: SOUND },
    {url: 'sound/fly/fly.mp3', type: SOUND },
    {url: 'sound/fly/move.mp3', type: SOUND },
    {url: 'sound/fly/white.mp3', type: SOUND },
    {url: 'sound/Events/largeWin.mp3', type: SOUND },
    {url: 'sound/Events/smallErrorOutThing.mp3', type: SOUND },
    {url: 'sound/Events/smallErrorWithThing.mp3', type: SOUND },
    {url: 'sound/Events/smallWin.mp3', type: SOUND },
    //newani
    {url: 'res/newani/dabans.png', type: IMAGE },
    {url: 'res/newani/dabans.sk', type: BUFFER }, 
    {url: 'res/newani/dawang_sikao.png', type: IMAGE },
    {url: 'res/newani/dawang_sikao.sk', type: BUFFER }, 
    {url: 'res/newani/douzi.png', type: IMAGE },
    {url: 'res/newani/douzi.sk', type: BUFFER }, 
    {url: 'res/newani/guancha.png', type: IMAGE },
    {url: 'res/newani/guancha.sk', type: BUFFER }, 
    {url: 'res/newani/stop.png', type: IMAGE },
    {url: 'res/newani/stop.sk', type: BUFFER }, 
    {url: 'res/newani/xiaojingyus.png', type: IMAGE },
    {url: 'res/newani/xiaojingyus.sk', type: BUFFER }, 
    {url: 'res/newani/zhihuicao.png', type: IMAGE },
    {url: 'res/newani/zhihuicao.sk', type: BUFFER }, 

    // new sound
    {url: 'sound/newsound/countdown.mp3', type: SOUND },
    {url: 'sound/newsound/errorhead.mp3', type: SOUND },
    {url: 'sound/newsound/errorlook.mp3', type: SOUND },
    {url: 'sound/newsound/pause.mp3', type: SOUND },
    {url: 'sound/newsound/start.mp3', type: SOUND },
    {url: 'sound/newsound/wincao.mp3', type: SOUND },
    {url: 'sound/newsound/windou.mp3', type: SOUND },
    {url: 'sound/newsound/winfish.mp3', type: SOUND },
           

]

let loop = (arr) => {
    if (typeof arr !== 'object') {
        return;
    }
    for(let i in arr){
        arr[i].forEach(function(item, i) {
        let newUrl;
        let jsonIndex;
        let fntIndex;
        let atlasIndex;
        let pngIndex;
        if (typeof item.url === 'string') {
            // 若加载后缀有 .json 和.fnt 的, 则连它们对应的 png一起添加了
            jsonIndex = item.url.indexOf('.json');
            fntIndex = item.url.indexOf('.fnt');
            atlasIndex = item.url.indexOf('.atlas');
             pngIndex = item.url.indexOf('.png');
            if (jsonIndex > -1) {
                newUrl = item.url.substr(0, jsonIndex) + '.png';
            } else if (fntIndex > -1) {
                newUrl = item.url.substr(0, fntIndex) + '.png';
            }else if (atlasIndex > -1) {
                newUrl = item.url.substr(0, atlasIndex) + '.png';
            }

            if (newUrl) {
                 GAME_VERSION[newUrl] =  GM.VERSION;
               
            }
          
            GAME_VERSION[item.url] = GM.VERSION;
        } else {
            loop(item);
        }
    });
    }
}
LIBRARY = {
    LoadingLIBRARY:LoadingLIBRARY ,RoomLIBRARY:RoomLIBRARY 
};

loop(LIBRARY);


export { LIBRARY, GAME_VERSION };