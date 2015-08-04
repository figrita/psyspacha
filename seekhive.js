/**
 * Created by Fig on 6/28/2015.
 */
var seekhivescore = 2500;

function spawnSeekhive() {
    var seekhive = PIXI.Sprite.fromImage('beamer.png');
    seekhives.addChild(seekhive);
    seekhive.spawntime = 20;
    seekhive.health = 12;
    seekhive.hit = false;
    seekhive.scale.x = 1.5;
    seekhive.scale.y = 1.5;
    seekhive.anchor.x = 0;
    seekhive.anchor.y = 0;
    seekhive.tint = 0xFFCC00;
    seekhive.alpha = 1;
    seekhive.seed = Math.random() * PIXI.PI_2;
    seekhive.x = Math.floor(Math.cos(seekhive.seed) * 240) + player.x;
    seekhive.y = Math.floor(Math.sin(seekhive.seed) * 210) + player.y;
    hexCorrect(seekhive);
    seekhive.counter = 1;
    seekhive.shoot = function(){
        seekhive.counter = 1;
        spawnSeekerAt(seekhive.x + seekhive.width/2,seekhive.y + seekhive.height/2);
    };
    seekhive.collideHandler = function(){
        seekhive.health--;
        seekhive.hit = true;
    };
}

function upSeekhive(thisseekhive) {
    thisseekhive.tint = 0xFFCC00;
    if (thisseekhive.hit == true) {
        thisseekhive.tint = 0xFF0000;
        thisseekhive.hit = false;
    }
    if (thisseekhive.spawntime){
        if(thisseekhive.spawntime % 3 == 0){
            thisseekhive.visible = false;
        } else {
            thisseekhive.visible = true;
        }
        thisseekhive.spawntime--;
        return;
    }
    if (thisseekhive.health <= 0) {
        score += seekhivescore;
        seekhives.removeChild(thisseekhive);
        thisseekhive.destroy();
        return 0;
    }

    hexCorrect(thisseekhive);

    if (thisseekhive.counter == 20) {
        thisseekhive.shoot();
    } else {
        thisseekhive.counter++;
    }

    collideRect(thisseekhive, player, null, player.collideHandler);
    for (var i = bullets.children.length - 1; i >= 0; i--) {
        if (thisseekhive.health > 0)
            collideRect(bullets.getChildAt(i), thisseekhive, function(){bullCollideHandler(i)}, thisseekhive.collideHandler);
    };

}