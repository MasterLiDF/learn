//碰撞函数
function isCrash(a, b) {
    if (a.x + a.w < b.x || a.x > b.x + b.w || a.y + a.h < b.y || a.y > b.y + b.h) {
        //没发生碰撞
        return false;
    } else {
        //发生碰撞
        return true;
    }
}

//判断我方飞机和敌机的碰撞以及子弹与敌机的碰撞
//遍历敌方飞机
function bulletsAndHeroCrashEnemys() {
    for (var i = 0; i < enemys.length; i++) {
		//GAME OVER 
        //判断我方飞机与敌方飞机碰撞
        if (isCrash(enemys[i], hero)) {
            hero.isBom = true;
            enemys[i].isBom = true;
            /*-------------------------以下部分---useless-------------------*/
            //game over 字体
            ctx.beginPath()
            var text='GAME OVER';   
            ctx.font='40px 宋体';
            ctx.textBaseline='top';
            ctx.strokeText(text,45,230)
            
            if(score<5000){
            		 //game over 字体
            ctx.beginPath()
            var text='猪是笨死的~';   
            ctx.font='20px 宋体';
            ctx.textBaseline='top';
            ctx.strokeText(text,100,270)
            }
            if(score>=5000){
            		 //game over 字体
            ctx.beginPath()
            var text='哎呦!好厉害';   
            ctx.font='20px 宋体';
            ctx.textBaseline='top';
            ctx.strokeText(text,100,270)
            }
           /*-------------------------以上部分----------------------*/ 
            clearInterval(timer);
            timer=null;
        }
        //如果我方飞机与敌机相撞,那么久不再判断这个敌机与子弹的位置关系,直接进行下一次判断
        if (enemys[i].isBom) {
            continue;
        }
        //遍历子弹数组,判断每一个子弹与敌方飞机的碰撞
        for (var j = 0; j < bullets.length; j++) {
            if (isCrash(enemys[i], bullets[j])) {
                //一旦碰撞,血量减少
                enemys[i].hp -= bullets[j].hurt;
                if (enemys[i].hp <= 0) {
                    //当血量减少为0,讲碰撞状态改变
                    enemys[i].isBom = true;
                    
                    if(enemys[i].w==110){   //计分
			    			score+=100
			    		}
			    		if(enemys[i].w==46){
			    			score+=20
			    		}
			    		if(enemys[i].w==38){
			    			score+=10
			    		}
//                  console.log(score)
                    
                }
                //每次碰撞都删除子弹
                bullets.splice(j, 1);
                j--;
            }
        }
    }
}



//双排子弹定时器
var dbBulletTimer = null;
//双排子弹时间
var dbBulletTime = 0;
//增加射速定时器
var fastBulletTimer = null;
//增加射速时间
var fastBulletTime = 0;

//判断我方飞机与物资碰撞
function heroAndPropCrash() {
    //遍历物资数组
    for (var i = 0; i < props.length; i++) {
        //判断碰撞
        if (isCrash(props[i], hero)) {
            if (props[i].type == 0) { //炸弹
                bomNum++;
                //控制炸弹数量最多为3
                if (bomNum >= 3) {
                    bomNum = 3;
                }
                bulletType = bulletType;
            } else if (props[i].type == 1) { //双排
                //先清理
                clearInterval(dbBulletTimer);
                dbBulletTimer = null;
                bulletType = 1; //子弹类型
                dbBulletTime += 8;//时间累加
                dbBulletTimer = setInterval(function () {
                    dbBulletTime--;
                    if (dbBulletTime <= 0) {
                        bulletType = 0; //持续时间到,子弹类型恢复
                        clearInterval(dbBulletTimer);
                        dbBulletTimer = null;
                    }
                }, 1000);
            } else if (props[i].type == 2) { //增速
                //先清理
                clearInterval(fastBulletTimer);
                fastBulletTimer = null;
                bulletType = bulletType; //保持子弹类型
                bulletNormal = 1; //改变子弹产生速度
                fastBulletTime += 5;//时间累加
                fastBulletTimer = setInterval(function () {
                    fastBulletTime--;
                    if (fastBulletTime <= 0) {
                        bulletNormal = 7; //持续时间到,恢复子弹产生速度
                        clearInterval(fastBulletTimer);
                        fastBulletTimer = null;
                    }
                }, 1000);
            }
            //吃到道具,从屏幕中移除道具
            props.splice(i, 1);
            i--;
        }
    }
}


//封装判断碰撞的函数 ,在外部,只需要调用下面的函数即可判断碰撞
function crash() {
    bulletsAndHeroCrashEnemys();
    heroAndPropCrash();
}