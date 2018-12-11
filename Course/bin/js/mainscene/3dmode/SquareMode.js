/*
    SquareMode 正方体
*/


class CylinderMode extends Laya.Scene{
    constructor(){
        super();
        this.init();
    }
    init(){
        //添加3D场景
        var scene = this.addChild(new Laya.Scene());
        this.sceneMode = scene;
        //添加照相机
        var camera = (scene.addChild(new Laya.Camera(0, 0.3, 100)));
        camera.transform.translate(new Laya.Vector3(-1, 2, 4));
        camera.transform.rotate(new Laya.Vector3(-30, 0, 0), true, false);
        camera.clearColor = null;

        //添加方向光
        var directionLight = scene.addChild(new Laya.DirectionLight());
        directionLight.color = new Laya.Vector3(0.5, 0.5, 0.5);
        directionLight.direction = new Laya.Vector3(-1, -1, 1); 

        //添加方向光
        var directionLight2 = scene.addChild(new Laya.DirectionLight());
        directionLight2.color = new Laya.Vector3(0.3, 0.3, 0.3);
        directionLight2.direction = new Laya.Vector3(1, 1, -1); 

        //添加自定义模型
        var box = scene.addChild(new Laya.MeshSprite3D(new Laya.BoxMesh(0, 0, 0)));
        box.transform.rotate(new Laya.Vector3(0, 45, 0), false, false);
        var material = new Laya.StandardMaterial();
        //material.diffuseTexture = Laya.Texture2D.load("res/ww.png"); 
        material.ambientColor =new Laya.Vector3(2,2,2);
        box.meshRender.material = material;

       // box.addComponent(BoxControlScript);


        //顶部
        var cube1 = scene.addChild(new Laya.MeshSprite3D(new Laya.BoxMesh(1, 1, 0.02)));
        cube1.transform.translate(new Laya.Vector3(0.5, 0, 0));
        material = new Laya.StandardMaterial();
        material.diffuseTexture = Laya.Texture2D.load("res/sceneMode/numberF.png");
        material.ambientColor =new Laya.Vector3(2,2,2);
        cube1.meshRender.material = material;

       
        //box.addChild(cube1);
       

        var cube1Pt = scene.addChild(new Laya.MeshSprite3D(new Laya.BoxMesh(0, 0, 0)));
        cube1Pt.transform.translate(new Laya.Vector3(0.5, 0.5, 0));
        box.addChild(cube1Pt);
        cube1Pt.addChild(cube1);
       // cube1Pt.transform.rotate(new Laya.Vector3(0,0,-180),false,false);


        //前面
        var cube2Pt = scene.addChild(new Laya.MeshSprite3D(new Laya.BoxMesh(0, 0, 0)));
        cube2Pt.transform.translate(new Laya.Vector3(-0.5, -0.5, 0));
        box.addChild(cube2Pt);

        var cube2 = scene.addChild(new Laya.MeshSprite3D(new Laya.BoxMesh(1, 1, 0.02)));
        cube2.transform.translate(new Laya.Vector3(0.5, 0, 0));
        material = new Laya.StandardMaterial();
        material.diffuseTexture = Laya.Texture2D.load("res/sceneMode/numberD.png");
        material.ambientColor =new Laya.Vector3(2,2,2);
        cube2.meshRender.material = material;
        cube2Pt.addChild(cube2);
      //  cube2Pt.addComponent(Cube2Script);


        //右面
        var cube3Pt = scene.addChild(new Laya.MeshSprite3D(new Laya.BoxMesh(0, 0, 0)));
        cube3Pt.transform.translate(new Laya.Vector3(0.0, -0.5, 0.5));
        box.addChild(cube3Pt);

        var cube3 = scene.addChild(new Laya.MeshSprite3D(new Laya.BoxMesh(1, 1, 0.02)));
        cube3.transform.translate(new Laya.Vector3(0, 0, 0.5));
        material = new Laya.StandardMaterial();
        material.diffuseTexture = Laya.Texture2D.load("res/sceneMode/numberE.png");
        material.ambientColor =new Laya.Vector3(2,2,2);
        cube3.meshRender.material = material;
        cube3Pt.addChild(cube3);
      //  cube3Pt.addComponent(Cube3Script);

         //左面
        var cube4Pt = scene.addChild(new Laya.MeshSprite3D(new Laya.BoxMesh(0, 0, 0)));
        cube4Pt.transform.translate(new Laya.Vector3(0.0, -0.5, -0.5));
        box.addChild(cube4Pt);

        var cube4 = scene.addChild(new Laya.MeshSprite3D(new Laya.BoxMesh(1, 1, 0.02)));
        cube4.transform.translate(new Laya.Vector3(0, 0, 0.5));
        material = new Laya.StandardMaterial();
        material.diffuseTexture = Laya.Texture2D.load("res/sceneMode/numberC.png");
        material.ambientColor =new Laya.Vector3(2,2,2);
        cube4.meshRender.material = material;
        cube4Pt.addChild(cube4);
      //  cube4Pt.addComponent(Cube4Script);

        //后面
        var cube5Pt = scene.addChild(new Laya.MeshSprite3D(new Laya.BoxMesh(0, 0, 0)));
        cube5Pt.transform.translate(new Laya.Vector3(0.5, -0.5, 0));
        box.addChild(cube5Pt);

        var cube5 = scene.addChild(new Laya.MeshSprite3D(new Laya.BoxMesh(1, 1, 0.02)));
        cube5.transform.translate(new Laya.Vector3(0.5, 0, 0));
        material = new Laya.StandardMaterial();
        material.diffuseTexture = Laya.Texture2D.load("res/sceneMode/numberB.png");
        material.ambientColor =new Laya.Vector3(2,2,2);
        cube5.meshRender.material = material;

        //cube5.transform.rotate(new Laya.Vector3(0,00,90),false,false);
        cube5Pt.addChild(cube5);
       // cube5Pt.addComponent(Cube5Script);
         //底面
        var cube6Pt = scene.addChild(new Laya.MeshSprite3D(new Laya.BoxMesh(0, 0, 0)));
        cube6Pt.transform.translate(new Laya.Vector3(0.0, -0.5, 0));
        box.addChild(cube6Pt);

        var cube6 = scene.addChild(new Laya.MeshSprite3D(new Laya.BoxMesh(1, 1, 0.02)));
        cube6.transform.translate(new Laya.Vector3(0, 0, 0));
        material = new Laya.StandardMaterial();
        material.diffuseTexture = Laya.Texture2D.load("res/sceneMode/numberA.png");
        material.ambientColor =new Laya.Vector3(2,2,2);
        cube6.meshRender.material = material;
        cube6Pt.addChild(cube6);
         
        //cube1Pt.transform.rotate(new Laya.Vector3(0,0,-180),false,false);
        cube1Pt.addComponent(Cube1Script);
        cube2Pt.addComponent(Cube2Script);
        cube3Pt.addComponent(Cube3Script);
        cube4Pt.addComponent(Cube4Script);
        cube5Pt.addComponent(Cube5Script);
    }
}
