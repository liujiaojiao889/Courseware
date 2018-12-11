
/*
    CylinderMode 圆柱形
*/
class CylinderMode extends Laya.Scene{
    constructor(){
        super();
        this.init();
    }
    init(){
         //添加照相机
        let camera = (this.addChild(new Laya.Camera(0, 0.3, 100)));
        camera.transform.translate(new Laya.Vector3(1, 2, 4));
        camera.transform.rotate(new Laya.Vector3(-30, 0, 0), true, false);
        camera.clearColor = null;

        //添加方向光
        let directionLight = this.addChild(new Laya.DirectionLight());
        directionLight.color = new Laya.Vector3(0.9, 0.9, 0.9);
        directionLight.direction = new Laya.Vector3(1, -1, 1); 

        let directionLight2 = this.addChild(new Laya.DirectionLight());
        directionLight2.color = new Laya.Vector3(54.0/255.0,175.0/255.0,205.0/255.0);
        directionLight2.direction = new Laya.Vector3(-1, 1,- 1); 
    
        //创建圆柱体模型(参数为：半径、高、圆截面线段数)
        let cylinderMesh = new Laya.CylinderMesh(0.5,2,16);
        //创建模型显示对象
        let cylinder3D = new Laya.MeshSprite3D(cylinderMesh);
        //x轴上移动3米（世界座标 向右）
        cylinder3D.transform.translate(new Laya.Vector3(0,0,0),false);
        //this.addChild(cylinder3D);

        let material = new Laya.StandardMaterial(); 
        material.ambientColor =new Laya.Vector3(54.0/255.0,175.0/255.0,205.0/255.0); 

        cylinder3D.meshRender.material = material;

        cylinder3D.addComponent(BoxControlScript);
        this.addChild(cylinder3D);
    }
}
