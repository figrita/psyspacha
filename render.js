function renderMap(x, y) {
	mapSprite.x = x + GWIDTH/2 - player.width/2 - player.x + shaker;
	mapSprite.y = y + GHEIGHT/2 - player.height/2 - player.y - shaker;
	gamePort.render(portContainer);
}

function render() {
	mapTexture.clear();
	mapTexture.render(bg);
	bbg.tilePosition.x = -player.x * (.5);
	bbg.tilePosition.y = -player.y * (.5);
	mapTexture.render(bbg);
	mapTexture.render(container);
	mapTexture.render(graphics);
	graphics.clear();
	gamePort.clear();
	//This tiles the Map on the Sphere.  It is important to render from the bottom right corner,
	// because the sprites overflow on the bottom and right edges. this way the BG does not render over the sprites
	if (player.y > MHEIGHT - 90) {
		renderMap(MWIDTH, 2 * MHEIGHT);
		renderMap(0, 2 * MHEIGHT);
		renderMap(-MWIDTH, 2 * MHEIGHT);
	}

	renderMap(1.5 * MWIDTH, MHEIGHT);
	renderMap(.5 * MWIDTH, MHEIGHT);
	renderMap(-.5 * MWIDTH, MHEIGHT);
	renderMap(-1.5 * MWIDTH, MHEIGHT);

	renderMap(MWIDTH, 0);
	renderMap(0,0);
	renderMap(-MWIDTH, 0);

	renderMap(1.5 * MWIDTH, -MHEIGHT);
	renderMap(.5 * MWIDTH, -MHEIGHT);
	renderMap(-.5 * MWIDTH, -MHEIGHT);
	renderMap(-1.5 * MWIDTH, -MHEIGHT);

	if (player.y < 90) {
		renderMap(MWIDTH, -2 * MHEIGHT);
		renderMap(0, -2 * MHEIGHT);
		renderMap(-MWIDTH, -2 * MHEIGHT);
	}

	renderer.clearBeforeRender = true;
	gameSprite.filters = [bulger];
	renderer.render(gameSprite);
	renderer.clearBeforeRender = false;
	scoretext.text = "Score: " + score;
	renderer.render(text);
}
