var bulx = 0,//input counters
    buly = 0;
var bulvx = 0,
    bulvy = 0;
var bulwait = 0;//timer for next bullet
var cs2 = Math.cos(.2);
var sn2 = Math.sin(.2);
var cs3 = Math.cos(-.2);
var sn3 = Math.sin(-.2);

function fireBullet() {
    if (streamTime) {
        bulwait = 0;
    } else {
        bulwait = 3;
    }
    var bullet = PIXI.Sprite.fromImage('bullet.png');
    bullets.addChild(bullet);
    bullet.anchor.x = 0;
    bullet.anchor.y = 0;
    bullet.x = Math.round(player.x + 13);
    bullet.y = Math.round(player.y + 13);
    bullet.vx = bulvx;
    bullet.vy = bulvy;
    bullet.d = Math.sqrt((bullet.vx * bullet.vx) + (bullet.vy * bullet.vy));
    bullet.trav = 0;
    bullet.max = 400;
    if (multiTime){
        var bullet2 = PIXI.Sprite.fromImage('bullet.png');
        bullets.addChild(bullet2);
        bullet2.anchor.x = 0;
        bullet2.anchor.y = 0;
        bullet2.x = player.x + 13;
        bullet2.y = player.y + 13;
        bullet2.vx =  bulvx * cs2 - bulvy * sn2;
        bullet2.vy = bulvx * sn2 + bulvy * cs2;
        bullet2.d = pythag(bullet2.vx, bullet2.vy);
        bullet2.trav = 0;
        bullet2.max = 400;
        var bullet3 = PIXI.Sprite.fromImage('bullet.png');
        bullets.addChild(bullet3);
        bullet3.anchor.x = 0;
        bullet3.anchor.y = 0;
        bullet3.x = player.x + 13;
        bullet3.y = player.y + 13;
        bullet3.vx =  bulvx * cs3 - bulvy * sn3;
        bullet3.vy = bulvx * sn3 + bulvy * cs3;
        bullet3.d = pythag(bullet3.vx, bullet3.vy);
        bullet3.trav = 0;
        bullet3.max = 400;
    }
}

bullCollideHandler = function(idx) {
    bullets.getChildAt(idx).destroy();
    bullets.removeChildAt(idx);
};

function upBullet() {
    for (var i = bullets.children.length - 1; i >= 0; i--){
        bullets.children[i].trav += bullets.children[i].d;
        bullets.children[i].x += bullets.children[i].vx;
        bullets.children[i].y += bullets.children[i].vy;
        hexCorrect(bullets.children[i]);
        if (bullets.children[i].trav >= bullets.children[i].max) {
            bullets.getChildAt(i).destroy();
            bullets.removeChildAt(i);
        }
    }
    if (buly) {
        if (bulx) {
            bulvy = buly * 7;
            bulvx = bulx * 7;
        }
        else {
            bulvy = buly * 10;
            bulvx = 0;
        }
    }
    else if (bulx) {
        bulvx = bulx * 10;
        bulvy = 0;
    }
    else {
        bulvx = 0;
        bulvy = 0;
    }
    if (bulwait) {
        bulwait--;
    } else if (bulvy || bulvx) {
        fireBullet();
    }
}