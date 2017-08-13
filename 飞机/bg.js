//背景移动
var bgY = 0;
function drawBg(){
    bgY+=1;
    if(bgY>=cv.height){
        bgY = 0;
    }
    ctx.beginPath();
    ctx.drawImage(bg,0,-cv.height+bgY);
    ctx.drawImage(bg,0,bgY);
}