//用作图片资源的加载

//用来装所有加载好的图片资源
var imgs = [];

//用来装加载资源的路径
/*
0:炸弹
1:单排子弹
2:双排子弹
3:敌方飞机 小
4:敌方飞机 大
5:敌方飞机 中
6:我方飞机
7:物资
*/
var imgSrc = ['bomb.png', 'bullet1.png', 'bullet2.png', 'enemy1.png', 'enemy2.png', 'enemy3.png', 'herofly.png', 'prop.png'];

//用来记录图片资源加载数量
var index = 0;

//绘制背景
var bg = new Image();
bg.src = 'img/background.png';
bg.onload = function () {
    ctx.drawImage(bg, 0, 0);
}

//图片资源加载方法
function loadImg(ctx, fun) {

    //做图片的预加载
    for (var i = 0; i < imgSrc.length; i++) {
        imgs[i] = new Image();
        imgs[i].src = 'img/' + imgSrc[i];
        imgs[i].onload = function () {
            index++;
            if (index >= imgSrc.length) {
                //当图片资源加载完成,执行回调函数
                fun();
            }
        }
    }
}