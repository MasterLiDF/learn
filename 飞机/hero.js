//创建我方飞机

var hero = {
    x: cv.width / 2 - 33,
    y: cv.height - 82,
    w: 66,
    h: 82,
    imgIndex: 0, //用于控制飞机的状态
    maxIndex: 4, //用于控制飞机的状态最大值
    l: false, //用于控制飞行方向
    r: false,
    t: false,
    b: false,
    isBom: false, //记录碰撞状态
    isOver: false, //记录结束状态
    move: function () { //移动函数
        var self = this;
        //键盘事件
        document.onkeydown = function (e) {
            switch (e.keyCode) {
            case 37:
                self.l = true;
                break;
            case 38:
                self.t = true;
                break;
            case 39:
                self.r = true;
                break;
            case 40:
                self.b = true;
                break;
            }
        }
        document.onkeyup = function (e) {
            switch (e.keyCode) {
            case 37:
                self.l = false;
                break;
            case 38:
                self.t = false;
                break;
            case 39:
                self.r = false;
                break;
            case 40:
                self.b = false;
                break;
            case 32: //空格键释放炸弹,为什么要在这里触发炸弹,因为按键按住不抬起会一直释放,避免此种情况发生
                bom();
                break;
            }


        }

        if (self.l) {
            self.x -= 10;
        }
        if (self.r) {
            self.x += 10;
        }
        if (self.t) {
            self.y -= 10;
        }
        if (self.b) {
            self.y += 10;
        }

        //先运算,后判断  能保证飞机永远在画布里面
        if (self.x <= 0) {
            self.x = 0;
        } else if (self.x >= cv.width - self.w) {
            self.x = cv.width - self.w;
        }
        if (self.y <= 0) {
            self.y = 0;
        } else if (self.y >= cv.height - self.h) {
            self.y = cv.height - self.h;
        }
    }
};

//绘制我方飞机的方法
function drawHero() {
    //判断是否发生碰撞
    if (hero.isBom) {
        //变换飞机状态
        hero.imgIndex++;
        if (hero.imgIndex >= hero.maxIndex) {
            hero.isOver = true;
        }
    } else {
        //变换飞机坐标
        hero.move();
    }
    ctx.beginPath();
    var jx = hero.imgIndex * hero.w;
    ctx.drawImage(imgs[6], jx, 0, 66, 82, hero.x, hero.y, hero.w, hero.h);

}