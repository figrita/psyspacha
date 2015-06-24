function fireBullet() {
    bulwait = 10;
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
    bullet.collideHandler = function(){
        bullets.removeChild(bullet);
        bullet.destroy();
    };
    if (multishoot){
        var bullet2 = PIXI.Sprite.fromImage('bullet.png');
        bullets.addChild(bullet2);
        bullet2.anchor.x = 0;
        bullet2.anchor.y = 0;
        bullet2.x = player.x + 13;
        bullet2.y = player.y + 13;
        bullet2.vx =  bulvx * cs2 - bulvy * sn2;
        bullet2.vy = bulvx * sn2 + bulvy * cs2;
        bullet2.d = Math.sqrt((bullet.vx * bullet.vx) + (bullet.vy * bullet.vy));
        bullet2.trav = 0;
        bullet2.max = 400;
        bullet2.collideHandler = function(){
            bullets.removeChild(bullet2);
            bullet2.destroy();
        }
        var bullet3 = PIXI.Sprite.fromImage('bullet.png');
        bullets.addChild(bullet3);
        bullet3.anchor.x = 0;
        bullet3.anchor.y = 0;
        bullet3.x = player.x + 13;
        bullet3.y = player.y + 13;
        bullet3.vx =  bulvx * cs3 - bulvy * sn3;
        bullet3.vy = bulvx * sn3 + bulvy * cs3;
        bullet3.d = Math.sqrt((bullet.vx * bullet.vx) + (bullet.vy * bullet.vy));
        bullet3.trav = 0;
        bullet3.max = 400;
        bullet3.collideHandler = function(){
            bullets.removeChild(bullet3);
            bullet3.destroy();
        }
    }
}

function upBullet() {
    cs2 = Math.cos(.2);
    sn2 = Math.sin(.2);
    cs3 = Math.cos(-.2);
    sn3 = Math.sin(-.2);
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
    bullets.children.forEach(function(thisbullet) {
        thisbullet.trav += thisbullet.d;
        thisbullet.x += thisbullet.vx;
        thisbullet.y += thisbullet.vy;
        hexCorrect(thisbullet);
        if (thisbullet.trav > thisbullet.max) {
            bullets.removeChild(thisbullet);
            thisbullet.destroy();
        }
    });
    if (bulwait) {
        bulwait--;
    }
    else if (bulvy || bulvx) {
        fireBullet();
    }
}