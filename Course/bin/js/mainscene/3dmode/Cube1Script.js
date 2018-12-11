
    
export class CubeScript {
     constructor() {
         this.init();
        
     }
     init(){
          var flag = true;
          var angle = -180

     }
     start(){
        var material = this.box.meshRender.material;
        //修改材质的反射率颜色，让模型偏红
        // material.albedo = new Laya.Vector4(1,0,0,1);
        flag = true;
        angle = -180;
        //this.angle = 90;
        var material = this.box.meshRender.material;
        this.box.transform.rotate(new Laya.Vector3(0,0,-180),false,false);

     }
     update(){
        if(flag ==true && angle <-90)
        {
            angle +=1;
            this.box.transform.rotate(new Laya.Vector3(0,0,-1),false,false);
        }
        else if(flag ==false && angle >-180)
        {
                angle -=1;
                this.box.transform.rotate(new Laya.Vector3(0,0,1),false,false);
        }
        if(angle  ==  -180)
        {
            flag = true;
        }
        if(angle  ==  -90)
        {
            flag = false;
        }

     }


}
var Cube1Script = (function(_super){
    var flag = true;
    var angle = -180;
    function BoxControlScript(){
        BoxControlScript.super(this);
    }
    Laya.class(BoxControlScript,"Cube1Script",_super);
    BoxControlScript.prototype._load = function(owner){
        this.box = owner;
    }
    BoxControlScript.prototype._start = function(state){
        var material = this.box.meshRender.material;
        //修改材质的反射率颜色，让模型偏红
       // material.albedo = new Laya.Vector4(1,0,0,1);
        flag = true;
        angle = -180;
        //this.angle = 90;
        var material = this.box.meshRender.material;
        this.box.transform.rotate(new Laya.Vector3(0,0,-180),false,false);
    }
    BoxControlScript.prototype._update = function(state){
        if(flag ==true && angle <-90)
        {
            angle +=1;
            this.box.transform.rotate(new Laya.Vector3(0,0,-1),false,false);
        }
        else if(flag ==false && angle >-180)
        {
                angle -=1;
                this.box.transform.rotate(new Laya.Vector3(0,0,1),false,false);
        }
        if(angle  ==  -180)
        {
            flag = true;
        }
        if(angle  ==  -90)
        {
            flag = false;
        }
        
    }
    return BoxControlScript;
})(Laya.Script);