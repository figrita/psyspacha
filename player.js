function spawnPlayer(){
    player = PIXI.Sprite.fromImage('playersprite.png');

    container.addChild(player);
    player.anchor.x = 0;
    player.anchor.y = 0;
    player.x = GWIDTH/2 - 16;
    player.y = 50;
    player.vx = 0;
    player.vy = 0;
    player.health = 100;
    player.invincibleCounter = 0;
    player.collideHandler = function() {
        if (player.invincibleCounter <= 0){
            player.health -= 10;
            player.invincibleCounter = 30;
        }
    };
    player.snakeHandler = function() {
        if (player.invincibleCounter <= 0){
            player.health += 10;
            player.invincibleCounter = 30;
        }
    };
    player.getHealth = function(){
        return player.health;
    };
    player.healthtext = new PIXI.Text("Health: " + player.health, style);
    player.healthtext.x = 0;
    player.healthtext.y = 0;
    text.addChild(player.healthtext);
}

function upPlayer() {
    if (keyx * player.vx > 0 && keyy * player.vy > 0 && Math.abs(player.vx) < 4 && Math.abs(player.vy) < 4) {
        player.vx += keyx * .5;
        player.vy += keyy * .5;
    } else if (keyy && Math.abs(player.vy) < 4) {
        player.vy += keyy * .7;
    } else if (keyx && Math.abs(player.vx) < 4) {
        player.vx += keyx * .7;
    }
    if (player.vy < .1 && player.vy > -.1)
        player.vy = 0
    if (player.vx < .1 && player.vx > -.1)
        player.vx = 0
    player.x += player.vx;
    player.y += player.vy;
    if (player.vx < 0)
        player.vx += .1;
    if (player.vx > 0)
        player.vx -= .1;
    if (player.vy < 0)
        player.vy += .1;
    if (player.vy > 0)
        player.vy -= .1;
    hexCorrect(player);
    player.healthtext.text = "Health:" + player.getHealth();

    if (tintd <= 0x000010 || tintd >= 0x0000e0) {
        tinter = -tinter;
    }
    tintd += tinter;
    if (player.invincibleCounter){
        if (player.invincibleCounter % 3 === 0  || player.invincibleCounter % 2 === 0) {
            player.tint = 0xFFFFFF;
        } else {
            player.tint = 0xFF0000;
        }
        player.invincibleCounter--;
    } else {
        player.tint = 0x00ff00 + tintd;
    }
}