//子弹存放的数组
var bullets = [];

//子弹的构造函数
function Bullet() {
	this.x = 0;
	this.y = 0;
	this.w = 6;
	this.h = 14;
	this.speed = 10;
	this.hurt = 1; //子弹的伤害
	this.img = null; //用于设置吃到道具后,用哪个图片做子弹
}

//子弹的获取位置方法
Bullet.prototype.setXY = function() {
	if(bulletType == 1) { //双排
		this.w = 44;
		this.hurt = 2; //增加伤害
	}
	//子弹的出生位置
	this.x = hero.x + hero.w / 2 - this.w / 2;
	this.y = hero.y - this.h;
}

//子弹的移动方法
Bullet.prototype.move = function() {
	this.y -= this.speed;
}

var bulletTime = 0; //用来控制时间间隔
var bulletNormal = 7; //正常子弹的产生速度
//子弹类型
var bulletType = 0; //0,单排子弹;1,双排子弹;2.增加射速

//创建子弹
function createBullet() {
	bulletTime++;
	if(bulletTime > 140) {
		bulletTime = 1;
	}
	if(bulletTime % bulletNormal == 0) {
		//创建子弹
		var bt = new Bullet();
		if(bulletType == 0) { //单排
			bt.img = imgs[1];
		} else if(bulletType == 1) { //双排
			bt.img = imgs[2];
		}
		bt.setXY();
		bullets.push(bt);
	}
}

//绘制子弹
function drawBullets() {
	createBullet();
	ctx.beginPath();
	for(var i = 0; i < bullets.length; i++) {
		bullets[i].move();
		ctx.drawImage(bullets[i].img, bullets[i].x, bullets[i].y, bullets[i].w, bullets[i].h);
	}
}

//用来统计炸弹数量
var bomNum = 0;
//绘制炸弹
function drawBoms() {
	for(var i = 0; i < bomNum; i++) {
		ctx.beginPath();
		ctx.drawImage(imgs[0], 42 * i, cv.height - 36, 42, 36);
	}
}

//触发炸弹
function bom() {
	bomNum--; //炸弹数量减一
	//遍历所有敌机,并且移除
	if(bomNum>0){
	for(var i = 0; i < enemys.length; i++) {
		if(enemys[i].w == 110) { //计分
			score += 100
		}
		if(enemys[i].w == 46) {
			score += 20
		}
		if(enemys[i].w == 38) {
			score += 10
		}
		enemys.splice(i, 1);
		i--;

	}
	}else{
		bomNum=0;
	}
}