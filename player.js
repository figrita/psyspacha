var player;
var tinter = 0x000005;//value to tint player by
var tintd = 0x000020;//value to change tinter by


function spawnPlayer(){
    player = PIXI.Sprite.fromImage('playersprite.png');

    container.addChild(player);
    player.anchor.x = 0;
    player.anchor.y = 0;
    player.x = GWIDTH/2 - 16;
    player.y = 50;
    player.v = 0;
    player.vx = 0;
    player.vy = 0;
    player.health = 100;
    player.invincibleCounter = 0;
    player.collideHandler = function() {
        if (player.invincibleCounter <= 0){
            player.health -= 10;
            player.invincibleCounter = 50;
        }
    };
    player.collideHealth = function(){
        player.health += 30;
        if (player.health > 100)
            player.health = 100;
    };
    player.healthtext = new PIXI.Text("Health: " + player.health, style);
    player.healthtext.x = 0;
    player.healthtext.y = 0;
    text.addChild(player.healthtext);
}

function upPlayer() {
    player.vy += keyy * .3;
    player.vx += keyx * .3;
    player.v = pythag(player.vx, player.vy);
    if (player.v > 4){
        player.vx = (player.vx/player.v) * 4;
        player.vy = (player.vy/player.v) * 4;
    }
    if (player.vy < .1 && player.vy > -.1)
        player.vy = 0
    if (player.vx < .1 && player.vx > -.1)
        player.vx = 0
    player.x += player.vx;
    player.y += player.vy;
    player.vx = (player.vx/4) * 3.9;
    player.vy = (player.vy/4) * 3.9;

    hexCorrect(player);
    player.healthtext.text = "Health:" + player.health;

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
        if (player.invincibleCounter %2 == 0 && player.invincibleCounter > 40) {
            shaker += 3;
        } else {
            shaker = 0;
        }
        player.invincibleCounter--;
    } else {
        player.tint = 0x00ff00 + tintd;
    }
}