/*
    物资:w = 39,h = 68
*/

//存放奖励的数组
var props = [];

//物资的构造函数
/*
    x:随机的降落位置
    speed:降落速度
    type:物资类型[0,1,2];
    0:炸弹
    1:双排子弹
    2:增加射速
*/
function Prop(x, speed, type) {
    this.x = x;
    this.speed = speed;
    this.type = type;
    this.y = -68;
    this.h = 68;
    this.w = 39;
    this.img = 7; //作为下标选取物资图片
}

//移动方法
Prop.prototype.move = function () {
    this.y += this.speed;
}

//绘制方法
Prop.prototype.draw = function () {
    this.move();
    ctx.beginPath();
    ctx.drawImage(imgs[this.img], this.w * this.type, 0, this.w, this.h, this.x, this.y, this.w, this.h);
}

//创建物资
function createProps(){
    //控制物资生成的概率
    var num = rand(0,1000);
    if(num <= 10){
        var x = rand(0,cv.width - 39);
        var speed = rand(2,5);
        var type = 0;
        if(num == 3){
            type = 0;//炸弹
        }else if(num == 6){
            type = 1;//双排子弹
        }else if(num == 9){
            type = 2;//增加射速
        }else{
            return;//否则直接返回,不创建物资
        }
        //创建物资
        var prop = new Prop(x,speed,type);
        //装进数组
        props.push(prop);
    }
}

//绘制物资
function drawProps(){
    createProps();
    for(var i=0;i<props.length;i++){
        props[i].draw();
    }
}