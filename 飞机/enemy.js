//直接在html文件引入,并且调用  drawEnemys()  方法即可

/*
    小飞机:w = 38;h = 34;
    中飞机:w = 46;h = 64;
    大飞机:w = 110;h = 164;

*/

//用来存放敌方飞机
var enemys = [];

//敌方飞机构造函数
function Enemy(x, y, w, h, img, speed, hp, max) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.img = img;
    this.speed = speed;
    //添加血量
    this.hp = hp;
    this.maxIndex = max; //添加一个状态变换的最大值
    this.imgIndex = 0;
    this.isBom = false; //用来记录碰撞情况
    this.isDel = false; //用来记录是否被删除
}

//移动方法
Enemy.prototype.move = function () {
    this.y += this.speed;
}

//绘制方法
Enemy.prototype.draw = function () {
    //如果被碰撞
    if (this.isBom) {
        //图片状态变换
        this.imgIndex++;
        //如果变到最大值
        if (this.imgIndex >= this.maxIndex) {
            this.isDel = true;
            //到达删除标准,直接结束,不需要再绘制
            return;
        }
    } else { //如果没碰撞
        this.move();
    }
    ctx.beginPath();
    var esx = this.imgIndex * this.w;
    ctx.drawImage(this.img, esx, 0, this.w, this.h, this.x, this.y, this.w, this.h);
}

//创建敌方飞机
function createEnemys() {
    var enemyNum = rand(0, 200);
    var x = 0;
    var y = 0;
    var w = 0;
    var h = 0;
    var img = null;
    var speed = 0;
    var hp = 0;
    var maxIndex = 0;
    if (enemyNum <= 8) {
        if (enemyNum == 8) {
            x = rand(0, 320 - 110);
            y = -164;
            w = 110;
            h = 164;
            img = imgs[4];
            speed = rand(2, 4);
            hp = 7;
            maxIndex = 9;
        } else if (enemyNum == 6 || enemyNum == 7) {
            x = rand(0, 320 - 46);
            y = -64;
            w = 46;
            h = 64;
            img = imgs[5];
            speed = rand(3, 7);
            hp = 3;
            maxIndex = 5;
        } else {
            x = rand(0, 320 - 38);
            y = -34;
            w = 38;
            h = 34;
            img = imgs[3];
            speed = rand(3, 10);
            hp = 1;
            maxIndex = 4;
        }
        var enemy = new Enemy(x, y, w, h, img, speed, hp, maxIndex);
        enemys.push(enemy);
    }

}

//绘制敌方飞机
function drawEnemys() {
    createEnemys();
    for (var i = 0; i < enemys.length; i++) {
        enemys[i].draw();
        //如果超出边界或者被击中从屏幕中移除
        if (enemys[i].y >= cv.height + enemys[i].h || enemys[i].isDel == true) {
            enemys.splice(i, 1);
            i--;
        }
    }

}

//随机数
function rand(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
}