/*
* 存放下一步元素;
*/
// export default class SaveBeforeInfo extends Laya.Sprite{
export default class SaveBeforeInfo{
    //保存是否可见和是否可见用于拖拽
    //pageChild中index对应的元素  和 index
    constructor(tempData,pageChildIndex,pageChildbox){
        // super();
        this.TempData = tempData;
        this.PageChildIndex = pageChildIndex;
        this.pageChildbox = pageChildbox;
    }


}