function spawnMulti(){
    var multi = PIXI.Sprite.fromImage('multi.png');
    powerups.addChild(multi);
    multi.anchor.x = 0;
    multi.anchor.y = 0;
    multi.alpha = 1;
    multi.x = getRandomInt(0, MWIDTH);
    multi.y = getRandomInt(0, MHEIGHT);
    multi.collideHandler = function(){
        powerups.removeChild(multi);
        multi.destroy();
    }
}

function upPowerups(){
    if(multitime){
        multishoot = true;
        multitime--;
    } else {
        multishoot = false;
    }
    powerups.children.forEach(function(thispowerup){
       collideRect(thispowerup, player, thispowerup.collideHandler, function(){multitime += 300;})
    });
}