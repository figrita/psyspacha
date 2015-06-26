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
        multitime += 300;
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
    if(multitime){
        multishoot = true;
        multitime--;
    } else {
        multishoot = false;
    }
    multiHolder.children.forEach(function(thismulti){
       collideRect(thismulti, player, thismulti.collideHandler, null)
    });
    healthHolder.children.forEach(function(thishealth){
        collideRect(thishealth, player, thishealth.collideHandler, player.collideHealth)
    });
}