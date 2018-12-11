var CLASS$=Laya.class;
var STATICATTR$=Laya.static;
var View=laya.ui.View;
var Dialog=laya.ui.Dialog;
var afterReportUI=(function(_super){
		function afterReportUI(){
			
		    this.reTitle=null;
		    this.allTimer=null;
		    this.knowledgeList0=null;
		    this.knowledgeList1=null;
		    this.knowledgeAll=null;
		    this.anserList=null;
		    this.head=null;
		    this.nickName=null;
		    this.levimg=null;
		    this.level=null;
		    this.backBtn=null;
		    this.norecode=null;

			afterReportUI.__super.call(this);
		}

		CLASS$(afterReportUI,'ui.afterReportUI',_super);
		var __proto__=afterReportUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(afterReportUI.uiView);
		}

		STATICATTR$(afterReportUI,
		['uiView',function(){return this.uiView={"type":"Dialog","props":{"width":1200,"height":900},"child":[{"type":"Box","props":{"y":0,"x":-10,"width":919,"scaleY":1.35,"scaleX":1.355,"height":684},"child":[{"type":"Image","props":{"x":5,"width":914,"skin":"res/reports/img_bookbg.png","height":684}},{"type":"Label","props":{"y":73,"x":136,"width":307,"var":"reTitle","text":"识数环游识数 — 课后报告","height":24,"fontSize":18,"font":"Microsoft YaHei","color":"#333333","bold":true,"align":"center"}},{"type":"Label","props":{"y":106,"x":172,"width":235,"visible":false,"var":"allTimer","text":"课程总时长：29分14秒","height":18,"fontSize":14,"font":"Microsoft YaHei","color":"#333333","align":"center"}},{"type":"List","props":{"y":125,"x":489,"width":290,"var":"knowledgeList0","spaceY":7,"repeatY":5,"height":126},"child":[{"type":"Box","props":{"y":0,"x":26,"name":"render"},"child":[{"type":"Label","props":{"y":1,"x":-1,"width":266,"text":"课程总时长：29分14秒","name":"kPoint","height":18,"fontSize":17,"font":"Microsoft YaHei","color":"#64505D","align":"left"}},{"type":"Image","props":{"y":5,"x":-18,"width":10,"skin":"res/reports/icon_pink.png","height":10}}]}]},{"type":"List","props":{"y":306,"x":489,"width":290,"var":"knowledgeList1","spaceY":7,"repeatY":5,"height":126},"child":[{"type":"Box","props":{"y":0,"x":26,"name":"render"},"child":[{"type":"Label","props":{"y":1,"x":-1,"width":266,"text":"课程总时长：29分14秒","name":"kPoint","height":18,"fontSize":17,"font":"Microsoft YaHei","color":"#64505D","align":"left"}},{"type":"Image","props":{"y":5,"x":-18,"width":10,"skin":"res/reports/icon_blue.png","height":10}}]}]},{"type":"Label","props":{"y":487,"x":494,"wordWrap":true,"width":270,"var":"knowledgeAll","text":"视听说表达、颜色分辨、听力协调力、数理逻","height":54,"fontSize":17,"font":"Microsoft YaHei","color":" #64505D","align":"left"}},{"type":"Panel","props":{"y":169,"x":118,"width":330,"var":"anserList","height":398}},{"type":"Image","props":{"y":134,"x":131,"var":"head","skin":"res/reports/icon_boy.png"}},{"type":"Label","props":{"y":135,"x":160,"width":112,"var":"nickName","text":"我家轩哥最帅","height":26,"fontSize":18,"font":"Microsoft YaHei","color":"#333333","bold":true,"align":"left"}},{"type":"Image","props":{"y":137,"x":349,"var":"levimg","skin":"res/reports/icon_grade.png"}},{"type":"Label","props":{"y":138,"x":370,"width":79,"var":"level","text":"大班","height":19,"fontSize":14,"font":"Microsoft YaHei","color":"#333333","align":"left"}},{"type":"Label","props":{"y":49,"x":567,"width":130,"text":"本节课知识","height":25,"fontSize":16,"font":"Microsoft YaHei","color":"#ffffff","align":"center"}},{"type":"Image","props":{"y":-3,"x":2,"var":"backBtn","skin":"res/commonn/last_page.png"}},{"type":"Image","props":{"y":297,"x":147,"var":"norecode","skin":"res/reports/img_bitmap@2x.png"}}]}]};}
		]);
		return afterReportUI;
	})(Dialog);
var answerTipsUI=(function(_super){
		function answerTipsUI(){
			
		    this.closeBtn=null;
		    this.answerAll=null;
		    this.answerPart=null;

			answerTipsUI.__super.call(this);
		}

		CLASS$(answerTipsUI,'ui.answerTipsUI',_super);
		var __proto__=answerTipsUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(answerTipsUI.uiView);
		}

		STATICATTR$(answerTipsUI,
		['uiView',function(){return this.uiView={"type":"Dialog","props":{"width":336,"height":254},"child":[{"type":"Image","props":{"y":0,"x":0,"width":336,"skin":"res/bulletViews/alertbg.png","height":254}},{"type":"Image","props":{"y":11,"x":301,"var":"closeBtn","skin":"res/bulletViews/close.png"}},{"type":"Image","props":{"y":129,"x":55,"var":"answerAll","skin":"res/bulletViews/icon base.png"}},{"type":"Image","props":{"y":185,"x":55,"var":"answerPart","skin":"res/bulletViews/icon base.png"}},{"type":"Label","props":{"y":138,"x":112,"width":111,"text":"全部重新答题","height":18,"fontSize":18,"font":"SimHei","color":"#ffffff"}},{"type":"Label","props":{"y":195,"x":95,"width":146,"text":"答错学生重新答题","height":18,"fontSize":18,"font":"SimHei","color":"#ffffff"}},{"type":"Label","props":{"y":78,"x":65,"width":206,"text":"请重新选择答题的学生","height":18,"fontSize":20,"font":"SimHei","color":"#333333"}}]};}
		]);
		return answerTipsUI;
	})(Dialog);
var audioPlayIconUI=(function(_super){
		function audioPlayIconUI(){
			
		    this.audioPlay=null;

			audioPlayIconUI.__super.call(this);
		}

		CLASS$(audioPlayIconUI,'ui.audioPlayIconUI',_super);
		var __proto__=audioPlayIconUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(audioPlayIconUI.uiView);
		}

		STATICATTR$(audioPlayIconUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":200,"height":200},"child":[{"type":"Image","props":{"y":100,"x":100,"width":200,"skin":"res/commonn/audioPlayIcon/musicPlay0.png","height":200,"anchorY":0.5,"anchorX":0.5},"compId":2},{"type":"Image","props":{"y":101,"x":136,"width":30,"skin":"res/commonn/audioPlayIcon/whiteMusic.png","height":30,"anchorY":0.5,"anchorX":0.5},"compId":3}],"animations":[{"nodes":[{"target":2,"keyframes":{"skin":[{"value":"res/commonn/audioPlayIcon/musicPlay0.png","tweenMethod":"linearNone","tween":false,"target":2,"key":"skin","index":0},{"value":"res/commonn/audioPlayIcon/musicPlay1.png","tweenMethod":"linearNone","tween":false,"target":2,"key":"skin","index":5},{"value":"res/commonn/audioPlayIcon/musicPlay2.png","tweenMethod":"linearNone","tween":false,"target":2,"key":"skin","index":10},{"value":"res/commonn/audioPlayIcon/musicPlay3.png","tweenMethod":"linearNone","tween":false,"target":2,"key":"skin","index":15},{"value":"res/commonn/audioPlayIcon/musicPlay4.png","tweenMethod":"linearNone","tween":false,"target":2,"key":"skin","index":20},{"value":"res/commonn/audioPlayIcon/musicPlay0.png","tweenMethod":"linearNone","tween":false,"target":2,"key":"skin","index":25},{"value":"res/commonn/audioPlayIcon/musicPlay1.png","tweenMethod":"linearNone","tween":false,"target":2,"label":null,"key":"skin","index":30},{"value":"res/commonn/audioPlayIcon/musicPlay2.png","tweenMethod":"linearNone","tween":false,"target":2,"label":null,"key":"skin","index":35},{"value":"res/commonn/audioPlayIcon/musicPlay3.png","tweenMethod":"linearNone","tween":false,"target":2,"label":null,"key":"skin","index":40},{"value":"res/commonn/audioPlayIcon/musicPlay4.png","tweenMethod":"linearNone","tween":false,"target":2,"label":null,"key":"skin","index":45},{"value":"res/commonn/audioPlayIcon/musicPlay0.png","tweenMethod":"linearNone","tween":false,"target":2,"label":null,"key":"skin","index":50}]}},{"target":3,"keyframes":{"y":[{"value":101,"tweenMethod":"linearNone","tween":true,"target":3,"key":"y","index":0},{"value":100,"tweenMethod":"linearNone","tween":true,"target":3,"key":"y","index":50}],"rotation":[{"value":0,"tweenMethod":"linearNone","tween":true,"target":3,"key":"rotation","index":0},{"value":72,"tweenMethod":"linearNone","tween":true,"target":3,"key":"rotation","index":10},{"value":144,"tweenMethod":"linearNone","tween":true,"target":3,"key":"rotation","index":20},{"value":216,"tweenMethod":"linearNone","tween":true,"target":3,"key":"rotation","index":30},{"value":288,"tweenMethod":"linearNone","tween":true,"target":3,"key":"rotation","index":40},{"value":360,"tweenMethod":"linearNone","tween":true,"target":3,"key":"rotation","index":50}]}}],"name":"audioPlay","id":1,"frameRate":24,"action":0}]};}
		]);
		return audioPlayIconUI;
	})(View);
var bottomUI=(function(_super){
		function bottomUI(){
			
		    this.btnCancel=null;
		    this.btnNext=null;
		    this.answerBtn=null;
		    this.buttetBtn=null;
		    this.bgsoundBtn=null;
		    this.resetBtn=null;

			bottomUI.__super.call(this);
		}

		CLASS$(bottomUI,'ui.bottomUI',_super);
		var __proto__=bottomUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(bottomUI.uiView);
		}

		STATICATTR$(bottomUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":1200,"height":80},"child":[{"type":"Box","props":{"x":0,"width":1203,"height":80,"bottom":0},"child":[{"type":"Image","props":{"y":1,"x":-4,"width":1200,"skin":"res/commonn/lsd_xldc_01.png","sizeGrid":"9,7,7,5","height":80,"alpha":0.3}},{"type":"Image","props":{"y":3,"x":707,"width":176,"var":"btnCancel","skin":"res/commonn/last_element_select.png","height":72}},{"type":"Image","props":{"y":3,"x":888,"width":178,"var":"btnNext","skin":"res/commonn/next_element_select.png","rotation":360,"height":72}},{"type":"Image","props":{"y":4,"x":-1,"width":176,"var":"answerBtn","skin":"res/commonn/icon_start_answer_stop.png","height":72}},{"type":"Image","props":{"y":4,"x":203,"width":176,"var":"buttetBtn","skin":"res/bulletViews/viewBtn.png","height":72}},{"type":"Clip","props":{"y":4,"x":407,"width":176,"var":"bgsoundBtn","skin":"res/medias/clip_play.png","index":1,"height":72,"clipY":1,"clipX":2}},{"type":"Image","props":{"y":2,"x":1071,"var":"resetBtn","skin":"res/commonn/icon_next_refres.png"}}]}]};}
		]);
		return bottomUI;
	})(View);
var bulletpanelUI=(function(_super){
		function bulletpanelUI(){
			
		    this.writebg=null;
		    this.Sname=null;
		    this.answerList=null;

			bulletpanelUI.__super.call(this);
		}

		CLASS$(bulletpanelUI,'ui.bulletpanelUI',_super);
		var __proto__=bulletpanelUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(bulletpanelUI.uiView);
		}

		STATICATTR$(bulletpanelUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":180,"height":300},"child":[{"type":"Image","props":{"y":0,"x":-2,"width":180,"var":"writebg","skin":"res/bulletViews/title.png","height":40}},{"type":"Label","props":{"y":8,"x":-2,"width":180,"var":"Sname","valign":"middle","text":"夏天同学","height":30,"fontSize":18,"font":"SimHei","color":"#333333","align":"center"}},{"type":"List","props":{"y":42,"x":-2,"width":180,"var":"answerList","vScrollBarSkin":"res/comp/vscroll.png","spaceY":2,"height":259},"child":[{"type":"Box","props":{"y":0,"x":0,"width":180,"name":"render","height":30},"child":[{"type":"Image","props":{"x":0,"width":180,"skin":"res/bulletViews/bg_white.png","name":"writeBg","height":30}},{"type":"Label","props":{"y":0,"x":0,"width":137,"valign":"middle","text":"夏天答错了答错了错了","overflow":"hidden","name":"progress","height":30,"fontSize":17,"font":"SimHei","color":"#000000","align":"center"}},{"type":"Label","props":{"y":0,"x":141,"width":17,"valign":"middle","text":"对","name":"answerstate","height":30,"fontSize":16,"font":"SimHei","color":"#27AB38","align":"right"}},{"type":"Label","props":{"y":0,"x":1,"width":165,"valign":"middle","name":"allstate","height":30,"fontSize":16,"font":"SimHei","color":"#27AB38","align":"center"}}]}]}]};}
		]);
		return bulletpanelUI;
	})(View);
var bulletsViewUI=(function(_super){
		function bulletsViewUI(){
			
		    this.closeBtn=null;
		    this.rankTab=null;
		    this.rankView=null;
		    this.directBox=null;
		    this.pangTinBox=null;

			bulletsViewUI.__super.call(this);
		}

		CLASS$(bulletsViewUI,'ui.bulletsViewUI',_super);
		var __proto__=bulletsViewUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(bulletsViewUI.uiView);
		}

		STATICATTR$(bulletsViewUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":1133,"height":403},"child":[{"type":"Image","props":{"y":0,"x":0,"width":1133,"skin":"res/bulletViews/zidbg.png","height":403}},{"type":"Image","props":{"y":14,"x":1074,"var":"closeBtn","skin":"res/bulletViews/navi_close.png"}},{"type":"Tab","props":{"y":16,"x":17,"var":"rankTab","selectedIndex":0},"child":[{"type":"Button","props":{"y":-4,"x":4,"stateNum":2,"skin":"res/bulletViews/zhibo1.png","name":"item0"}},{"type":"Button","props":{"y":-4,"x":72,"stateNum":2,"skin":"res/bulletViews/pangting1.png","name":"item1"}}]},{"type":"ViewStack","props":{"y":59,"x":9,"var":"rankView","selectedIndex":0},"child":[{"type":"Box","props":{"y":0,"x":0,"name":"item0"},"child":[{"type":"Panel","props":{"width":1113,"var":"directBox","height":328,"hScrollBarSkin":"res/comp/hscroll.png"}}]},{"type":"Box","props":{"y":0,"x":0,"name":"item1"},"child":[{"type":"Panel","props":{"y":0,"x":0,"width":1113,"var":"pangTinBox","height":328,"hScrollBarSkin":"res/comp/hscroll.png"}}]}]}]};}
		]);
		return bulletsViewUI;
	})(View);
var canvasbgUI=(function(_super){
		function canvasbgUI(){
			
		    this.closeCantext=null;

			canvasbgUI.__super.call(this);
		}

		CLASS$(canvasbgUI,'ui.canvasbgUI',_super);
		var __proto__=canvasbgUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(canvasbgUI.uiView);
		}

		STATICATTR$(canvasbgUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"y":250,"x":55,"width":110,"height":500,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":0,"x":0,"width":110,"skin":"res/commonn/canvasbg.png","height":500}},{"type":"Label","props":{"y":55,"x":4,"width":98,"var":"closeCantext","text":"关\\n画\\n笔\\n再\\n翻\\n页","leading":10,"height":390,"fontSize":55,"font":"SimHei","color":"#ffffff","align":"center"}}]};}
		]);
		return canvasbgUI;
	})(View);
var catMaskUI=(function(_super){
		function catMaskUI(){
			
		    this.catMaskAni=null;
		    this.BG=null;
		    this.catimage=null;

			catMaskUI.__super.call(this);
		}

		CLASS$(catMaskUI,'ui.catMaskUI',_super);
		var __proto__=catMaskUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(catMaskUI.uiView);
		}

		STATICATTR$(catMaskUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"y":0,"width":1200,"height":900},"child":[{"type":"Image","props":{"y":0,"x":0,"width":1200,"var":"BG","skin":"res/loading/bg.png","height":900},"child":[{"type":"Image","props":{"y":451,"x":601,"width":258,"var":"catimage","skin":"res/commonn/cat.png","renderType":"mask","height":224,"anchorY":0.5,"anchorX":0.5},"compId":32}]}],"animations":[{"nodes":[{"target":32,"keyframes":{"scaleY":[{"value":1,"tweenMethod":"linearNone","tween":true,"target":32,"key":"scaleY","index":0},{"value":4,"tweenMethod":"linearNone","tween":true,"target":32,"key":"scaleY","index":15}],"scaleX":[{"value":1,"tweenMethod":"linearNone","tween":true,"target":32,"key":"scaleX","index":0},{"value":4,"tweenMethod":"linearNone","tween":true,"target":32,"key":"scaleX","index":15}]}}],"name":"catMaskAni","id":1,"frameRate":24,"action":1},{"nodes":[],"name":"ani2","id":2,"frameRate":24,"action":0}]};}
		]);
		return catMaskUI;
	})(View);
var clickfigerUI=(function(_super){
		function clickfigerUI(){
			

			clickfigerUI.__super.call(this);
		}

		CLASS$(clickfigerUI,'ui.clickfigerUI',_super);
		var __proto__=clickfigerUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(clickfigerUI.uiView);
		}

		STATICATTR$(clickfigerUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":0,"height":0}};}
		]);
		return clickfigerUI;
	})(View);
var countDownUI=(function(_super){
		function countDownUI(){
			
		    this.count=null;

			countDownUI.__super.call(this);
		}

		CLASS$(countDownUI,'ui.countDownUI',_super);
		var __proto__=countDownUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(countDownUI.uiView);
		}

		STATICATTR$(countDownUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":80,"height":114},"child":[{"type":"Image","props":{"y":0,"x":0,"width":80,"skin":"res/commonn/lsd_mz_01.png","height":114}},{"type":"Label","props":{"y":79,"x":1,"width":74,"var":"count","text":"60","height":45,"font":"num","color":"#3b3b3b","align":"center"}}]};}
		]);
		return countDownUI;
	})(View);
var countDown1UI=(function(_super){
		function countDown1UI(){
			
		    this.count=null;

			countDown1UI.__super.call(this);
		}

		CLASS$(countDown1UI,'ui.countDown1UI',_super);
		var __proto__=countDown1UI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(countDown1UI.uiView);
		}

		STATICATTR$(countDown1UI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":108,"height":108},"child":[{"type":"Image","props":{"y":0,"x":0,"width":108,"skin":"res/commonn/xscz_szdp_01.png","height":108}},{"type":"Label","props":{"y":34,"x":16,"width":74,"var":"count","text":"60","height":45,"font":"num","color":"#3b3b3b","align":"center"}}]};}
		]);
		return countDown1UI;
	})(View);
var curAniUI=(function(_super){
		function curAniUI(){
			
		    this.fly=null;

			curAniUI.__super.call(this);
		}

		CLASS$(curAniUI,'ui.curAniUI',_super);
		var __proto__=curAniUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(curAniUI.uiView);
		}

		STATICATTR$(curAniUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":1200,"height":900},"child":[{"type":"Image","props":{"y":-2,"x":0,"skin":"res/animate/anibg.png"},"compId":2},{"type":"Image","props":{"y":227,"x":6,"skin":"res/animate/es.png"},"compId":3},{"type":"Image","props":{"y":-16,"x":56,"skin":"res/animate/sky.png"},"compId":4},{"type":"Image","props":{"y":220,"x":1023,"skin":"res/animate/fly.png","rotation":30,"anchorY":0.5,"anchorX":0.5},"compId":5},{"type":"Image","props":{"x":0,"skin":"res/animate/anibg.png","alpha":1},"compId":6}],"animations":[{"nodes":[{"target":4,"keyframes":{"y":[{"value":911,"tweenMethod":"linearNone","tween":true,"target":4,"key":"y","index":0},{"value":911,"tweenMethod":"linearNone","tween":true,"target":4,"key":"y","index":10},{"value":911,"tweenMethod":"linearNone","tween":true,"target":4,"key":"y","index":20},{"value":-16,"tweenMethod":"linearNone","tween":true,"target":4,"key":"y","index":30}],"x":[{"value":85,"tweenMethod":"linearNone","tween":true,"target":4,"key":"x","index":0},{"value":85,"tweenMethod":"linearNone","tween":true,"target":4,"key":"x","index":10},{"value":85,"tweenMethod":"linearNone","tween":true,"target":4,"key":"x","index":20},{"value":56,"tweenMethod":"linearNone","tween":true,"target":4,"key":"x","index":30}]}},{"target":5,"keyframes":{"y":[{"value":1058,"tweenMethod":"linearNone","tween":true,"target":5,"key":"y","index":0},{"value":1085,"tweenMethod":"linearNone","tween":true,"target":5,"key":"y","index":10},{"value":220,"tweenMethod":"linearNone","tween":true,"target":5,"key":"y","index":20},{"value":220,"tweenMethod":"linearNone","tween":true,"target":5,"key":"y","index":30},{"value":220,"tweenMethod":"linearNone","tween":true,"target":5,"key":"y","index":60},{"value":110,"tweenMethod":"linearNone","tween":true,"target":5,"key":"y","index":105},{"value":220,"tweenMethod":"linearNone","tween":true,"target":5,"key":"y","index":145}],"x":[{"value":185,"tweenMethod":"linearNone","tween":true,"target":5,"key":"x","index":0},{"value":185,"tweenMethod":"linearNone","tween":true,"target":5,"key":"x","index":10},{"value":159,"tweenMethod":"linearNone","tween":true,"target":5,"key":"x","index":20},{"value":159,"tweenMethod":"linearIn","tween":true,"target":5,"key":"x","index":30},{"value":160,"tweenMethod":"linearNone","tween":true,"target":5,"key":"x","index":60},{"value":620,"tweenMethod":"linearIn","tween":true,"target":5,"key":"x","index":105},{"value":1023,"tweenMethod":"linearNone","tween":true,"target":5,"key":"x","index":145}],"rotation":[{"value":-28,"tweenMethod":"linearNone","tween":true,"target":5,"key":"rotation","index":0},{"value":-28,"tweenMethod":"linearNone","tween":true,"target":5,"key":"rotation","index":10},{"value":-28,"tweenMethod":"linearNone","tween":true,"target":5,"key":"rotation","index":20},{"value":-28,"tweenMethod":"linearNone","tween":true,"target":5,"key":"rotation","index":30},{"value":-28,"tweenMethod":"linearNone","tween":true,"target":5,"key":"rotation","index":60},{"value":5,"tweenMethod":"linearNone","tween":true,"target":5,"key":"rotation","index":120},{"value":30,"tweenMethod":"linearNone","tween":true,"target":5,"key":"rotation","index":150}],"anchorY":[{"value":0.5,"tweenMethod":"linearNone","tween":true,"target":5,"key":"anchorY","index":0}],"anchorX":[{"value":0.5,"tweenMethod":"linearNone","tween":true,"target":5,"key":"anchorX","index":0}]}},{"target":3,"keyframes":{"y":[{"value":996,"tweenMethod":"linearNone","tween":true,"target":3,"key":"y","index":0},{"value":227,"tweenMethod":"linearNone","tween":true,"target":3,"key":"y","index":10}],"x":[{"value":18,"tweenMethod":"linearNone","tween":true,"target":3,"key":"x","index":0},{"value":6,"tweenMethod":"linearNone","tween":true,"target":3,"key":"x","index":10}]}},{"target":6,"keyframes":{"x":[{"value":0,"tweenMethod":"linearNone","tween":true,"target":6,"key":"x","index":0}],"alpha":[{"value":0,"tweenMethod":"linearNone","tween":true,"target":6,"key":"alpha","index":0},{"value":0,"tweenMethod":"linearNone","tween":true,"target":6,"key":"alpha","index":185},{"value":1,"tweenMethod":"linearNone","tween":true,"target":6,"key":"alpha","index":220}]}},{"target":2,"keyframes":{"x":[{"value":0,"tweenMethod":"linearNone","tween":true,"target":2,"key":"x","index":0}]}}],"name":"fly","id":1,"frameRate":24,"action":1}]};}
		]);
		return curAniUI;
	})(View);
var figeReportUI=(function(_super){
		function figeReportUI(){
			
		    this.ani=null;

			figeReportUI.__super.call(this);
		}

		CLASS$(figeReportUI,'ui.figeReportUI',_super);
		var __proto__=figeReportUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(figeReportUI.uiView);
		}

		STATICATTR$(figeReportUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"y":-17,"x":9,"width":150,"height":150},"child":[{"type":"Image","props":{"y":110,"x":34,"width":127,"skin":"res/reports/fi.png","scaleY":0.5,"scaleX":0.5,"height":89},"compId":3},{"type":"Image","props":{"y":30,"x":-4,"width":279,"skin":"res/reports/tex.png","scaleY":0.5,"scaleX":0.5,"height":140,"alpha":0.35}},{"type":"Label","props":{"y":45,"x":12,"width":115,"text":"请点击展开","height":39,"fontSize":22,"font":"Microsoft YaHei","color":"#ffffff"}}],"animations":[{"nodes":[{"target":3,"keyframes":{"y":[{"value":110,"tweenMethod":"linearNone","tween":true,"target":3,"key":"y","index":0},{"value":120,"tweenMethod":"linearNone","tween":true,"target":3,"key":"y","index":15},{"value":110,"tweenMethod":"linearNone","tween":true,"target":3,"key":"y","index":30}],"x":[{"value":34,"tweenMethod":"linearNone","tween":true,"target":3,"key":"x","index":0},{"value":34,"tweenMethod":"linearNone","tween":true,"target":3,"key":"x","index":15},{"value":34,"tweenMethod":"linearNone","tween":true,"target":3,"key":"x","index":30}]}}],"name":"ani","id":1,"frameRate":24,"action":2}]};}
		]);
		return figeReportUI;
	})(View);
var figerUI=(function(_super){
		function figerUI(){
			
		    this.movefig=null;
		    this.clickfig=null;

			figerUI.__super.call(this);
		}

		CLASS$(figerUI,'ui.figerUI',_super);
		var __proto__=figerUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(figerUI.uiView);
		}

		STATICATTR$(figerUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":0,"height":0},"child":[{"type":"Image","props":{"y":292,"x":284,"skin":"res/commonn/xscz_padd_01.png"}},{"type":"Image","props":{"y":363,"x":315,"skin":"res/commonn/xscz_djqq_01.png"},"compId":4},{"type":"Image","props":{"y":389,"x":326,"skin":"res/commonn/xscz_ydxs_01.png","rotation":10},"compId":3}],"animations":[{"nodes":[{"target":3,"keyframes":{"y":[{"value":365,"tweenMethod":"linearNone","tween":true,"target":3,"key":"y","index":0},{"value":384,"tweenMethod":"linearNone","tween":true,"target":3,"key":"y","index":10},{"value":372,"tweenMethod":"linearNone","tween":true,"target":3,"key":"y","index":20}],"x":[{"value":323,"tweenMethod":"linearNone","tween":true,"target":3,"key":"x","index":0},{"value":386,"tweenMethod":"linearNone","tween":true,"target":3,"key":"x","index":10},{"value":472,"tweenMethod":"linearNone","tween":true,"target":3,"key":"x","index":20}]}}],"name":"movefig","id":1,"frameRate":24,"action":0},{"nodes":[{"target":3,"keyframes":{"y":[{"value":432,"tweenMethod":"linearNone","tween":true,"target":3,"key":"y","index":0},{"value":440,"tweenMethod":"linearNone","tween":true,"target":3,"key":"y","index":10}],"x":[{"value":365,"tweenMethod":"linearNone","tween":true,"target":3,"key":"x","index":0},{"value":365,"tweenMethod":"linearNone","tween":true,"target":3,"key":"x","index":10}],"scaleY":[{"value":1,"tweenMethod":"linearNone","tween":true,"target":3,"key":"scaleY","index":0},{"value":1.2,"tweenMethod":"linearNone","tween":true,"target":3,"key":"scaleY","index":10}],"scaleX":[{"value":1,"tweenMethod":"linearNone","tween":true,"target":3,"key":"scaleX","index":0},{"value":1.2,"tweenMethod":"linearNone","tween":true,"target":3,"key":"scaleX","index":10}],"anchorY":[{"value":0.5,"tweenMethod":"linearNone","tween":true,"target":3,"key":"anchorY","index":0}],"anchorX":[{"value":0.5,"tweenMethod":"linearNone","tween":true,"target":3,"key":"anchorX","index":0}]}},{"target":4,"keyframes":{"y":[{"value":397,"tweenMethod":"linearNone","tween":true,"target":4,"key":"y","index":0}],"x":[{"value":349,"tweenMethod":"linearNone","tween":true,"target":4,"key":"x","index":0}],"scaleY":[{"value":1,"tweenMethod":"linearNone","tween":true,"target":4,"key":"scaleY","index":0},{"value":1.1,"tweenMethod":"linearNone","tween":true,"target":4,"key":"scaleY","index":5},{"value":1,"tweenMethod":"linearNone","tween":true,"target":4,"key":"scaleY","index":8},{"value":1,"tweenMethod":"linearNone","tween":true,"target":4,"key":"scaleY","index":10}],"scaleX":[{"value":1,"tweenMethod":"linearNone","tween":true,"target":4,"key":"scaleX","index":0},{"value":1.1,"tweenMethod":"linearNone","tween":true,"target":4,"key":"scaleX","index":5},{"value":1,"tweenMethod":"linearNone","tween":true,"target":4,"key":"scaleX","index":8},{"value":1,"tweenMethod":"linearNone","tween":true,"target":4,"key":"scaleX","index":10}],"anchorY":[{"value":0.5,"tweenMethod":"linearNone","tween":true,"target":4,"key":"anchorY","index":0}],"anchorX":[{"value":0.5,"tweenMethod":"linearNone","tween":true,"target":4,"key":"anchorX","index":0}],"alpha":[{"value":0.5,"tweenMethod":"linearNone","tween":true,"target":4,"key":"alpha","index":0},{"value":1,"tweenMethod":"linearNone","tween":true,"target":4,"key":"alpha","index":5},{"value":0.2,"tweenMethod":"linearNone","tween":true,"target":4,"key":"alpha","index":10}]}}],"name":"clickfig","id":2,"frameRate":24,"action":0}]};}
		]);
		return figerUI;
	})(View);
var flipJudgmentUI=(function(_super){
		function flipJudgmentUI(){
			
		    this.stay=null;
		    this.flip=null;
		    this.nextBtn=null;

			flipJudgmentUI.__super.call(this);
		}

		CLASS$(flipJudgmentUI,'ui.flipJudgmentUI',_super);
		var __proto__=flipJudgmentUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(flipJudgmentUI.uiView);
		}

		STATICATTR$(flipJudgmentUI,
		['uiView',function(){return this.uiView={"type":"Dialog","props":{"y":0,"x":0,"width":1200,"height":900},"child":[{"type":"Box","props":{"width":291,"right":177,"height":277,"bottom":88},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"res/commonn/bg_tanchuang.png"}},{"type":"Image","props":{"y":186,"x":153,"width":120,"var":"stay","skin":"res/commonn/icon_tingliu.png","height":45}},{"type":"Image","props":{"y":186,"x":21,"width":120,"var":"flip","skin":"res/commonn/icon_fanye.png","height":45}},{"type":"Image","props":{"y":284,"x":150,"skin":"res/commonn/icon_next_dotted_line.png","scaleY":1.5,"scaleX":1.5}},{"type":"Image","props":{"y":290,"x":150,"width":178,"var":"nextBtn","skin":"res/commonn/next_element_select.png","rotation":360,"height":72,"alpha":1}}]}]};}
		]);
		return flipJudgmentUI;
	})(Dialog);
var loadUI=(function(_super){
		function loadUI(){
			
		    this.loadBox0=null;
		    this.loadBox1=null;
		    this.loadBox2=null;
		    this.loadBox3=null;
		    this.loadingText=null;

			loadUI.__super.call(this);
		}

		CLASS$(loadUI,'ui.loadUI',_super);
		var __proto__=loadUI.prototype;
		__proto__.createChildren=function(){
		    			View.regComponent("SkeletonPlayer",laya.ani.bone.Skeleton);

			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(loadUI.uiView);
		}

		STATICATTR$(loadUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"y":0,"width":1200,"height":900},"child":[{"type":"Box","props":{"y":469,"x":598,"visible":false,"var":"loadBox0"},"child":[{"type":"SkeletonPlayer","props":{"y":0,"x":0,"url":"res/loading/loading_yellow/jiazai.sk"}},{"type":"Image","props":{"y":150,"x":-374,"width":770,"skin":"res/loading/loading_yellow/yellowbg.png"},"child":[{"type":"Image","props":{"y":0,"x":0,"width":0,"skin":"res/loading/loading_yellow/yellowbar.png","sizeGrid":"0,25,0,25","name":"ProgressBar","height":60}},{"type":"Box","props":{"y":-64,"x":16,"width":120,"name":"Cat","height":150},"child":[{"type":"SkeletonPlayer","props":{"url":"res/loading/loading_yellow/dengpao.sk"}}]}]}]},{"type":"Box","props":{"y":450,"x":600,"visible":false,"var":"loadBox1"},"child":[{"type":"SkeletonPlayer","props":{"y":0,"x":0,"url":"res/loading/loading_green/lvse.sk"}},{"type":"Image","props":{"y":150,"x":-374,"width":770,"skin":"res/loading/loading_green/greenbg.png"},"child":[{"type":"Image","props":{"y":0,"x":0,"width":0,"skin":"res/loading/loading_green/greenbar.png","sizeGrid":"0,25,0,25","name":"ProgressBar","height":60}},{"type":"Box","props":{"y":-75,"x":30,"width":120,"skewY":180,"scaleY":0.3,"scaleX":0.3,"name":"Cat","height":150},"child":[{"type":"SkeletonPlayer","props":{"url":"res/loading/loading_green/dawang_zoupao.sk"}}]}]}]},{"type":"Box","props":{"y":495,"x":618,"visible":false,"var":"loadBox2"},"child":[{"type":"SkeletonPlayer","props":{"y":-46,"x":-18,"url":"res/loading/loading_blue/lanse.sk"}},{"type":"Image","props":{"y":150,"x":-374,"width":770,"skin":"res/loading/loading_blue/bluebg.png","height":61},"child":[{"type":"Image","props":{"y":0,"x":0,"width":0,"skin":"res/loading/loading_blue/bluebar.png","sizeGrid":"0,25,0,25","name":"ProgressBar","height":60}},{"type":"Box","props":{"y":-54,"x":136,"width":120,"name":"Cat","height":150},"child":[{"type":"SkeletonPlayer","props":{"y":-42,"x":-78,"url":"res/loading/loading_blue/xaiochuan.sk"}}]}]}]},{"type":"Box","props":{"y":0,"x":0,"width":1200,"visible":false,"var":"loadBox3","height":900},"child":[{"type":"SkeletonPlayer","props":{"y":438,"x":600,"url":"res/loading/loading_fengche/qidong.sk"}},{"type":"Image","props":{"y":780,"x":250,"width":770,"skin":"res/loading/loading_fengche/barbg.png","height":60},"child":[{"type":"Image","props":{"y":0,"x":0,"width":0,"skin":"res/loading/loading_fengche/bar.png","sizeGrid":"0,25,0,25","name":"ProgressBar","height":60}},{"type":"Box","props":{"y":15,"x":31,"width":120,"name":"Cat","height":150},"child":[{"type":"SkeletonPlayer","props":{"y":13,"x":0,"url":"res/loading/loading_fengche/fengche.sk","scaleY":1.5,"scaleX":1.5}}]}]}]},{"type":"Image","props":{"y":1,"x":-13,"var":"loadingText","skin":"res/loading/texts/text10.png"}}]};}
		]);
		return loadUI;
	})(View);
var menuUI=(function(_super){
		function menuUI(){
			
		    this.panelBox=null;

			menuUI.__super.call(this);
		}

		CLASS$(menuUI,'ui.menuUI',_super);
		var __proto__=menuUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(menuUI.uiView);
		}

		STATICATTR$(menuUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":160,"height":612},"child":[{"type":"Image","props":{"y":-23,"x":1,"width":160,"skin":"res/commonn/Mask.png","height":636}},{"type":"Panel","props":{"y":-6,"x":0,"width":170,"var":"panelBox","vScrollBarSkin":"res/comp/vscroll.png","height":612}}]};}
		]);
		return menuUI;
	})(View);
var menupanelUI=(function(_super){
		function menupanelUI(){
			
		    this.bgLabel=null;
		    this.url=null;
		    this.name=null;
		    this.pageNum=null;

			menupanelUI.__super.call(this);
		}

		CLASS$(menupanelUI,'ui.menupanelUI',_super);
		var __proto__=menupanelUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(menupanelUI.uiView);
		}

		STATICATTR$(menupanelUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":152,"height":98},"child":[{"type":"Label","props":{"y":0,"x":5,"width":147,"var":"bgLabel","height":98,"color":"#4a4848"}},{"type":"Image","props":{"y":4,"x":25,"width":120,"var":"url","height":90}},{"type":"Label","props":{"y":10,"x":29,"wordWrap":true,"width":118,"var":"name","valign":"middle","height":82,"fontSize":22,"font":"Arial","align":"center"}},{"type":"Label","props":{"y":75,"x":1,"width":29,"var":"pageNum","text":"10","scaleY":0.8,"scaleX":0.8,"height":26,"fontSize":18,"color":"#ffffff","align":"center"}}]};}
		]);
		return menupanelUI;
	})(View);
var netTipUI=(function(_super){
		function netTipUI(){
			
		    this.popBg=null;
		    this.popLabel=null;

			netTipUI.__super.call(this);
		}

		CLASS$(netTipUI,'ui.netTipUI',_super);
		var __proto__=netTipUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(netTipUI.uiView);
		}

		STATICATTR$(netTipUI,
		['uiView',function(){return this.uiView={"type":"Dialog","props":{"width":1200,"height":900},"child":[{"type":"Box","props":{"y":277,"x":432,"scaleY":1.2,"scaleX":1.2},"child":[{"type":"Image","props":{"y":0,"x":0,"var":"popBg","skin":"res/commonn/popteach.png"}},{"type":"Label","props":{"y":64,"x":54,"wordWrap":true,"width":227,"var":"popLabel","valign":"top","text":"学生稍稍掉线\\n让我们耐心地等等吧~","leading":5,"height":45,"fontSize":20,"font":"Microsoft YaHei","color":"#ffffff","align":"center"}}]}]};}
		]);
		return netTipUI;
	})(Dialog);
var rankpageUI=(function(_super){
		function rankpageUI(){
			
		    this.showguang=null;
		    this.box=null;
		    this.backGround=null;
		    this.term=null;
		    this.ranText=null;

			rankpageUI.__super.call(this);
		}

		CLASS$(rankpageUI,'ui.rankpageUI',_super);
		var __proto__=rankpageUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(rankpageUI.uiView);
		}

		STATICATTR$(rankpageUI,
		['uiView',function(){return this.uiView={"type":"Dialog","props":{"width":1200,"height":900},"child":[{"type":"Box","props":{"y":74,"x":150,"width":900,"var":"box","height":752},"child":[{"type":"Image","props":{"y":376,"x":450,"width":1100,"skin":"res/rankpage/bg_light.png","rotation":360,"pivotY":301,"pivotX":275,"height":1100,"anchorY":0.5,"anchorX":0.5},"compId":14},{"type":"Image","props":{"y":30,"x":5,"width":878,"var":"backGround","skin":"res/rankpage/img_firstpage.png","height":752}},{"type":"Image","props":{"y":-51,"x":277,"width":346,"var":"term","skin":"res/rankpage/word_first.png","height":146}},{"type":"Label","props":{"y":648,"x":213,"wordWrap":true,"width":480,"var":"ranText","text":"其他小朋友们还没有完成答题哦， 让我们耐心地等等他们吧！","height":88,"fontSize":32,"font":"Microsoft YaHei","color":" #6C2F2F","align":"center"}}]}],"animations":[{"nodes":[{"target":14,"keyframes":{"y":[{"value":376,"tweenMethod":"linearNone","tween":true,"target":14,"key":"y","index":0},{"value":376,"tweenMethod":"linearNone","tween":true,"target":14,"key":"y","index":65}],"x":[{"value":450,"tweenMethod":"linearNone","tween":true,"target":14,"key":"x","index":0},{"value":450,"tweenMethod":"linearNone","tween":true,"target":14,"key":"x","index":65}],"rotation":[{"value":0,"tweenMethod":"linearNone","tween":true,"target":14,"key":"rotation","index":0},{"value":360,"tweenMethod":"linearNone","tween":true,"target":14,"key":"rotation","index":65}],"anchorY":[{"value":0.5,"tweenMethod":"linearNone","tween":true,"target":14,"key":"anchorY","index":0}],"anchorX":[{"value":0.5,"tweenMethod":"linearNone","tween":true,"target":14,"key":"anchorX","index":0}]}}],"name":"showguang","id":1,"frameRate":24,"action":2}]};}
		]);
		return rankpageUI;
	})(Dialog);
var reportPanelUI=(function(_super){
		function reportPanelUI(){
			
		    this.quesTitle=null;
		    this.userTime=null;
		    this.proload=null;
		    this.pre=null;

			reportPanelUI.__super.call(this);
		}

		CLASS$(reportPanelUI,'ui.reportPanelUI',_super);
		var __proto__=reportPanelUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(reportPanelUI.uiView);
		}

		STATICATTR$(reportPanelUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":317,"height":60},"child":[{"type":"Label","props":{"y":10,"x":1,"width":103,"var":"quesTitle","text":"【制作鸡腿汉堡】","height":18,"fontSize":14,"font":"Microsoft YaHei","color":"#333333","align":"left"}},{"type":"Label","props":{"y":10,"x":270,"width":45,"var":"userTime","text":"1分12秒","height":18,"fontSize":12,"font":"Microsoft YaHei","color":"#333333","align":"left"}},{"type":"Image","props":{"y":36,"x":0,"width":317,"skin":"res/reports/img_chenghui.png","height":24}},{"type":"Image","props":{"y":36,"x":0,"width":158.5,"var":"proload","skin":"res/reports/img_cheng.png","height":24}},{"type":"Label","props":{"y":41,"x":158,"width":39,"var":"pre","text":"50%","height":14,"fontSize":14,"font":"Arial","color":"#333333","align":"center"}},{"type":"Label","props":{"y":39,"x":115,"width":43,"text":"参与度","height":18,"fontSize":14,"font":"Microsoft YaHei","color":"#333333","align":"left"}}]};}
		]);
		return reportPanelUI;
	})(View);
var roadUI=(function(_super){
		function roadUI(){
			
		    this.car=null;

			roadUI.__super.call(this);
		}

		CLASS$(roadUI,'ui.roadUI',_super);
		var __proto__=roadUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(roadUI.uiView);
		}

		STATICATTR$(roadUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":1200,"height":900},"child":[{"type":"Image","props":{"y":1,"x":0,"skin":"res/animate/sky1.png"},"compId":2},{"type":"Image","props":{"y":157,"x":0,"skin":"res/animate/bg.png"},"compId":3},{"type":"Image","props":{"y":356,"x":1222,"skin":"res/animate/car.png"},"compId":9},{"type":"Image","props":{"y":475,"x":800,"skin":"res/animate/board.png"},"compId":4},{"type":"Image","props":{"y":739,"x":-3,"width":390,"skin":"res/animate/tree0.png","height":266},"compId":7},{"type":"Image","props":{"y":790,"x":948,"width":260,"skin":"res/animate/tree1.png","height":142},"compId":5}],"animations":[{"nodes":[{"target":3,"keyframes":{"y":[{"value":930,"tweenMethod":"linearNone","tween":true,"target":3,"key":"y","index":0},{"value":157,"tweenMethod":"linearNone","tween":true,"target":3,"key":"y","index":10}],"x":[{"value":4,"tweenMethod":"linearNone","tween":true,"target":3,"key":"x","index":0},{"value":0,"tweenMethod":"linearNone","tween":true,"target":3,"key":"x","index":10},{"value":0,"tweenMethod":"linearNone","tween":true,"target":3,"key":"x","index":55}]}},{"target":7,"keyframes":{"y":[{"value":963,"tweenMethod":"linearNone","tween":true,"target":7,"key":"y","index":0},{"value":963,"tweenMethod":"linearNone","tween":true,"target":7,"label":null,"key":"y","index":10},{"value":739,"tweenMethod":"linearNone","tween":true,"target":7,"key":"y","index":15}],"x":[{"value":7,"tweenMethod":"linearNone","tween":true,"target":7,"key":"x","index":0},{"value":7,"tweenMethod":"linearNone","tween":true,"target":7,"label":null,"key":"x","index":10},{"value":-3,"tweenMethod":"linearNone","tween":true,"target":7,"key":"x","index":15}]}},{"target":5,"keyframes":{"y":[{"value":1030,"tweenMethod":"linearNone","tween":true,"target":5,"key":"y","index":0},{"value":1030,"tweenMethod":"linearNone","tween":true,"target":5,"label":null,"key":"y","index":10},{"value":790,"tweenMethod":"linearNone","tween":true,"target":5,"key":"y","index":15}],"x":[{"value":910,"tweenMethod":"linearNone","tween":true,"target":5,"key":"x","index":0},{"value":910,"tweenMethod":"linearNone","tween":true,"target":5,"label":null,"key":"x","index":10},{"value":948,"tweenMethod":"linearNone","tween":true,"target":5,"key":"x","index":15}]}},{"target":4,"keyframes":{"y":[{"value":959,"tweenMethod":"linearNone","tween":true,"target":4,"key":"y","index":0},{"value":959,"tweenMethod":"linearNone","tween":true,"target":4,"label":null,"key":"y","index":10},{"value":475,"tweenMethod":"linearNone","tween":true,"target":4,"key":"y","index":15}],"x":[{"value":798,"tweenMethod":"linearNone","tween":true,"target":4,"key":"x","index":0},{"value":789,"tweenMethod":"linearNone","tween":true,"target":4,"label":null,"key":"x","index":10},{"value":800,"tweenMethod":"linearNone","tween":true,"target":4,"key":"x","index":15}]}},{"target":9,"keyframes":{"y":[{"value":364,"tweenMethod":"linearNone","tween":true,"target":9,"key":"y","index":0},{"value":364,"tweenMethod":"linearNone","tween":true,"target":9,"label":null,"key":"y","index":10},{"value":364,"tweenMethod":"linearNone","tween":true,"target":9,"label":null,"key":"y","index":15},{"value":364,"tweenMethod":"linearNone","tween":true,"target":9,"key":"y","index":35},{"value":364,"tweenMethod":"linearNone","tween":true,"target":9,"key":"y","index":55},{"value":364,"tweenMethod":"linearNone","tween":true,"target":9,"label":null,"key":"y","index":60},{"value":356,"tweenMethod":"linearNone","tween":true,"target":9,"key":"y","index":65},{"value":356,"tweenMethod":"linearNone","tween":true,"target":9,"label":null,"key":"y","index":66}],"x":[{"value":-466,"tweenMethod":"linearNone","tween":true,"target":9,"key":"x","index":0},{"value":-565,"tweenMethod":"linearNone","tween":true,"target":9,"label":null,"key":"x","index":10},{"value":-619,"tweenMethod":"linearNone","tween":true,"target":9,"label":null,"key":"x","index":15},{"value":-43,"tweenMethod":"quintIn","tween":true,"target":9,"key":"x","index":35},{"value":-43,"tweenMethod":"linearIn","tween":true,"target":9,"label":null,"key":"x","index":55},{"value":-43,"tweenMethod":"linearNone","tween":true,"target":9,"key":"x","index":60},{"value":1222,"tweenMethod":"linearIn","tween":true,"target":9,"key":"x","index":65},{"value":1222,"tweenMethod":"linearIn","tween":true,"target":9,"label":null,"key":"x","index":66}],"alpha":[{"value":1,"tweenMethod":"linearNone","tween":true,"target":9,"key":"alpha","index":0},{"value":1,"tweenMethod":"linearNone","tween":true,"target":9,"key":"alpha","index":65},{"value":0,"tweenMethod":"linearNone","tween":true,"target":9,"key":"alpha","index":66}]}},{"target":2,"keyframes":{"skin":[{"value":"res/animate/sky1.png","tweenMethod":"linearNone","tween":false,"target":2,"key":"skin","index":0},{"value":"res/animate/sky1.png","tweenMethod":"linearNone","tween":false,"target":2,"key":"skin","index":55}]}}],"name":"car","id":1,"frameRate":24,"action":1}]};}
		]);
		return roadUI;
	})(View);
var roleIconUI=(function(_super){
		function roleIconUI(){
			
		    this.bg=null;
		    this.txtNum=null;
		    this.studentId=null;

			roleIconUI.__super.call(this);
		}

		CLASS$(roleIconUI,'ui.roleIconUI',_super);
		var __proto__=roleIconUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(roleIconUI.uiView);
		}

		STATICATTR$(roleIconUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":48,"height":48},"child":[{"type":"Image","props":{"y":0,"x":0,"var":"bg","skin":"res/reports/icon_number.png"}},{"type":"Label","props":{"y":0,"x":0,"width":49,"var":"txtNum","valign":"middle","text":"1","height":49,"fontSize":22,"font":"Arial","color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":0,"x":0,"wordWrap":false,"width":49,"var":"studentId","valign":"middle","height":49,"fontSize":22,"font":"Arial","color":"#ffffff","align":"center"}}]};}
		]);
		return roleIconUI;
	})(View);
var techtipUI=(function(_super){
		function techtipUI(){
			
		    this.closeBtn=null;

			techtipUI.__super.call(this);
		}

		CLASS$(techtipUI,'ui.techtipUI',_super);
		var __proto__=techtipUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(techtipUI.uiView);
		}

		STATICATTR$(techtipUI,
		['uiView',function(){return this.uiView={"type":"Dialog","props":{"width":336,"height":254},"child":[{"type":"Image","props":{"y":0,"x":0,"width":336,"skin":"res/bulletViews/alertbg.png","height":254}},{"type":"Label","props":{"y":111,"x":12,"wordWrap":true,"width":310,"valign":"middle","text":"当前教室没有学生，\\n无法点击“开始答题”","leading":10,"height":74,"fontSize":28,"font":"SimHei","color":"#666666","bold":false,"align":"center"}},{"type":"Image","props":{"y":-5,"x":280,"width":29,"var":"closeBtn","skin":"res/bulletViews/close.png","scaleY":2,"scaleX":2,"height":29}}]};}
		]);
		return techtipUI;
	})(Dialog);
var testUI=(function(_super){
		function testUI(){
			

			testUI.__super.call(this);
		}

		CLASS$(testUI,'ui.testUI',_super);
		var __proto__=testUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(testUI.uiView);
		}

		STATICATTR$(testUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":0,"height":0}};}
		]);
		return testUI;
	})(View);
var timeDownUI=(function(_super){
		function timeDownUI(){
			
		    this.start=null;

			timeDownUI.__super.call(this);
		}

		CLASS$(timeDownUI,'ui.timeDownUI',_super);
		var __proto__=timeDownUI.prototype;
		__proto__.createChildren=function(){
		    			View.regComponent("SkeletonPlayer",laya.ani.bone.Skeleton);

			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(timeDownUI.uiView);
		}

		STATICATTR$(timeDownUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"y":0,"x":0,"width":600,"height":600},"child":[{"type":"Box","props":{"y":250,"x":320},"child":[{"type":"SkeletonPlayer","props":{"var":"start","url":"res/animate/daojishi.sk"}}]}]};}
		]);
		return timeDownUI;
	})(View);
var timeEndUI=(function(_super){
		function timeEndUI(){
			
		    this.timedown=null;

			timeEndUI.__super.call(this);
		}

		CLASS$(timeEndUI,'ui.timeEndUI',_super);
		var __proto__=timeEndUI.prototype;
		__proto__.createChildren=function(){
		    			View.regComponent("SkeletonPlayer",laya.ani.bone.Skeleton);

			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(timeEndUI.uiView);
		}

		STATICATTR$(timeEndUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":1200,"height":900},"child":[{"type":"Box","props":{"y":150,"x":300,"width":600,"height":600},"child":[{"type":"SkeletonPlayer","props":{"y":300,"x":300,"var":"timedown","url":"res/animate/czb_jishi_jieshunaozhong.sk"}}]}]};}
		]);
		return timeEndUI;
	})(View);
var tipsUI=(function(_super){
		function tipsUI(){
			

			tipsUI.__super.call(this);
		}

		CLASS$(tipsUI,'ui.tipsUI',_super);
		var __proto__=tipsUI.prototype;
		__proto__.createChildren=function(){
		    			View.regComponent("SkeletonPlayer",laya.ani.bone.Skeleton);

			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(tipsUI.uiView);
		}

		STATICATTR$(tipsUI,
		['uiView',function(){return this.uiView={"type":"Dialog","props":{"width":1200,"height":900},"child":[{"type":"SkeletonPlayer","props":{"y":469,"x":577,"url":"res/animate/duanwang.sk"}}]};}
		]);
		return tipsUI;
	})(Dialog);
var vedioBtnUI=(function(_super){
		function vedioBtnUI(){
			

			vedioBtnUI.__super.call(this);
		}

		CLASS$(vedioBtnUI,'ui.vedioBtnUI',_super);
		var __proto__=vedioBtnUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(vedioBtnUI.uiView);
		}

		STATICATTR$(vedioBtnUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":54,"height":54},"child":[{"type":"Image","props":{"y":0,"x":0,"width":54,"skin":"res/medias/icon_video.png","height":54}}]};}
		]);
		return vedioBtnUI;
	})(View);