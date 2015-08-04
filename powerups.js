var multiTime = 0;
var streamTime = 0;

var multiHolder = new PIXI.Container();
var healthHolder = new PIXI.Container();

powerups.addChild(multiHolder);
powerups.addChild(healthHolder);

function spawnMulti(x, y){
    var multi = PIXI.Sprite.fromImage('multi.png');
    multiHolder.addChild(multi);
    multi.anchor.x = 0;
    multi.anchor.y = 0;
    multi.alpha = 1;
    multi.x = x;
    multi.y = y;
    hexCorrect(multi);
    multi.collideHandler = function(){
        multiTime += 300;
        multiHolder.removeChild(multi);
        multi.destroy();
    }
}
function spawnHealth(x, y){
    var health = PIXI.Sprite.fromImage('beamer.png');
    healthHolder.addChild(health);
    health.tint = 0x00FF00;
    health.anchor.x = 0;
    health.anchor.y = 0;
    health.alpha = 1;
    health.x = x;
    health.y = y;
    health.collideHandler = function(){
        healthHolder.removeChild(health);
        health.destroy();
    }
}

function upPowerups(){
    if(multiTime){
        multiTime--;
    }
    for (var i = multiHolder.children.length - 1; i >= 0; i--) {
        collideRect(multiHolder.getChildAt(i), player, multiHolder.getChildAt(i).collideHandler, null);
    };
    for (var i = healthHolder.children.length - 1; i >= 0; i--) {
        collideRect(healthHolder.getChildAt(i), player, healthHolder.getChildAt(i).collideHandler, player.collideHealth);
    };
}