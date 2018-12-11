
export class squareScene {
	constructor(){
		super();
		this.init();
	}
	init(){
		 //添加照相机
		var scene = Laya.stage.addChild(new Laya.Scene());
        var camera = (scene.addChild(new Laya.Camera(0, 0.1, 100)));
        camera.transform.translate(new Laya.Vector3(0, 3, 3));
        camera.transform.rotate(new Laya.Vector3(-30, 0, 0), true, false);
        camera.clearColor = null;

        //添加方向光
        var directionLight = scene.addChild(new Laya.DirectionLight());
        directionLight.color = new Laya.Vector3(0.9, 0.9, 0.9);
        directionLight.direction = new Laya.Vector3(-1, -1, 1);
        //添加自定义模型
        var box = scene.addChild(new Laya.MeshSprite3D(new Laya.BoxMesh(1, 1, 1)));
        box.transform.rotate(new Laya.Vector3(0, 45, 0), false, false);
        var material = new Laya.StandardMaterial();
        //material.diffuseTexture = Laya.Texture2D.load("res/ww.png");
        material.ambientColor =new Laya.Vector3(2,2,2);
        box.meshRender.material = material;

        box.addComponent(BoxControlScript);



        var cube1 = scene.addChild(new Laya.MeshSprite3D(new Laya.BoxMesh(1, 1, 0.02)));
        cube1.transform.translate(new Laya.Vector3(0, 0.5, 0));
        material = new Laya.StandardMaterial();
        //material.diffuseTexture = Laya.Texture2D.load("res/dr.png");
        material.ambientColor =new Laya.Vector3(2,2,2);
        cube1.meshRender.material = material;
        //box.addChild(cube1);
        cube1.addComponent(Cube1Script);

        var cube1Pt = scene.addChild(new Laya.MeshSprite3D(new Laya.BoxMesh(0.01, 0.01, 0.01)));
        cube1Pt.transform.translate(new Laya.Vector3(0.5, 0.5, 0));
        box.addChild(cube1Pt);
        cube1Pt.addChild(cube1);

       // Laya.timer.once(4000,this,onLoop);

        var sp = new Laya.Sprite();
        Laya.stage.addChild(sp);
        //画直线
        sp.graphics.drawLine(10, 58, 446, 468, "#ff0000", 3);

        var sphereMesh =new Laya.SphereMesh(0.5,50,50);
        //创建模型显示对象
        var sphere3D =new Laya.MeshSprite3D(sphereMesh);
        //x轴上移动-3米（世界座标 向左）
        sphere3D.transform.translate(new Laya.Vector3(-1.5,0,0),false);


        var materialBall = new Laya.StandardMaterial();
       //  materialBall.diffuseTexture = Laya.Texture2D.load("res/dr.png");
        sphere3D.meshRender.material = materialBall;
        scene.addChild(sphere3D);


        //创建圆柱体模型(参数为：半径、高、圆截面线段数)
        var cylinderMesh =new Laya.CylinderMesh(0.5,2,16);
        //创建模型显示对象
        var cylinder3D =new Laya.MeshSprite3D(cylinderMesh);
        //x轴上移动3米（世界座标 向右）
        cylinder3D.transform.translate(new Laya.Vector3(1.5,0,0),false);
        //scene.addChild(cylinder3D);

        box.addChild(cylinder3D);


	}

	
	//4秒后回调函数，移除脚本组件
	onLoop(){
		//移除BoxControlScript类型脚本组件
		this.box.removeComponentsByType(BoxControlScript);
		//移除所有组件
		// this.box.removeAllComponent();
		//如果不想移除组件，可设置为不启用能达到同样效果（组件_update方法将不会被更新）
		// this.boxScript.enable = false;
	}
	
}
    

var Cube1Script = (function(_super){

    var angle = 0;
    function BoxControlScript(){
        BoxControlScript.super(this);
    }
    Laya.class(BoxControlScript,"Cube1Script",_super);
    /*3D对象加载组件时的执行方法
    owner加载此组件的3D对象
    */
    BoxControlScript.prototype._load = function(owner){
        //获取脚本所属对象
        this.box = owner;
    }
    /*覆写组件所属3D对象实例化完成后，第一次更新时的执行方法*/
    BoxControlScript.prototype._start = function(state){
        //获取模型上的材质
        var material = this.box.meshRender.material;
        //修改材质的反射率颜色，让模型偏红
       // material.albedo = new Laya.Vector4(1,0,0,1);
       //this.box.transform.rotate(new Laya.Vector3(0,0.5,0),false,false);
    }
    /*覆写组件更新方法（相当于帧循环）
    *state渲染状态
    */
    BoxControlScript.prototype._update = function(state){
        //所属脚本对象旋转更新
        if(angle <90)
        {
            angle +=1;
            this.box.transform.rotate(new Laya.Vector3(0,0,1),false,false);
        }
        
    }
    return BoxControlScript;
})(Laya.Script);


var BoxControlScript = (function(_super){
    function BoxControlScript(){
        BoxControlScript.super(this);
    }
    Laya.class(BoxControlScript,"BoxControlScript",_super);
    /*3D对象加载组件时的执行方法
    owner加载此组件的3D对象
    */
    BoxControlScript.prototype._load = function(owner){
        //获取脚本所属对象
        this.box = owner;
    }
    /*覆写组件所属3D对象实例化完成后，第一次更新时的执行方法*/
    BoxControlScript.prototype._start = function(state){
        //获取模型上的材质
        var material = this.box.meshRender.material;
        //修改材质的反射率颜色，让模型偏红
       // material.albedo = new Laya.Vector4(1,0,0,1);
       this.box.transform.rotate(new Laya.Vector3(0,0.5,0),false,false);
    }
    /*覆写组件更新方法（相当于帧循环）
    *state渲染状态
    */
    BoxControlScript.prototype._update = function(state){
        //所属脚本对象旋转更新
       // this.box.transform.rotate(new Laya.Vector3(0.5,0.5,0.5),false,false);
    }
    return BoxControlScript;
})(Laya.Script);





