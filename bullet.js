function fireBullet() {
    bulwait = 10;
    var bullet = PIXI.Sprite.fromImage('bullet.png');
    bullets.addChild(bullet);
    bullet.anchor.x = 0;
    bullet.anchor.y = 0;
    bullet.x = player.x + 13;
    bullet.y = player.y + 13;
    bullet.vx = bulvx;
    bullet.vy = bulvy;
    bullet.d = Math.sqrt((bullet.vx * bullet.vx) + (bullet.vy * bullet.vy));
    bullet.trav = 0;
    bullet.max = 500;
    bullet.collideHandler = function(){
        bullets.removeChild(this);
        bullet.destroy();
    }
}

function upBullet(thisbullet) {
    thisbullet.trav += thisbullet.d;
    thisbullet.x += thisbullet.vx;
    thisbullet.y += thisbullet.vy;
    hexCorrect(thisbullet);
    if (thisbullet.trav > thisbullet.max) {
        thisbullet.parent.removeChild(thisbullet);
        thisbullet.destroy();
    }
}