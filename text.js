var style = {
    font : '16px Arial',
    fill : '#FFFFFF'
};
var text = new PIXI.Container();
var scoretext = new PIXI.Text("Score: " + score, style);
scoretext.x = GWIDTH/2;
scoretext.y = GHEIGHT - 32;

text.addChild(scoretext);