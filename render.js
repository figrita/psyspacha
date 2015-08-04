function renderMap(x, y) {
	mapSprite.x = Math.floor(x + GWIDTH/2 - player.width/2 - player.x);
	mapSprite.y = Math.floor(y + GHEIGHT/2 - player.height/2 - player.y);
	gamePort.render(portContainer);
}

function render() {
	mapTexture.clear();
	graphicTexture.clear();
	graphicPortTexture.clear();
	mapTexture.render(bg);
	bbg.tilePosition.x = -player.x * (.5);
	bbg.tilePosition.y = -player.y * (.5);
	mapTexture.render(bbg);
	graphicsC.x = RENDER_MARGIN;
	graphicsC.y = RENDER_MARGIN;
	graphicTexture.render(graphicsCC);
	graphicSprite.x = -RENDER_MARGIN;
	graphicSprite.y = -RENDER_MARGIN;
	graphicPortTexture.render(graphicPort);
	graphicSprite.x = -MWIDTH - RENDER_MARGIN;
	graphicSprite.y = -RENDER_MARGIN;
	graphicPortTexture.render(graphicPort);
	graphicSprite.x = MWIDTH - RENDER_MARGIN;
	graphicSprite.y = -RENDER_MARGIN;
	graphicPortTexture.render(graphicPort);
	graphicSprite.x = .5 * -MWIDTH - RENDER_MARGIN;
	graphicSprite.y = -MHEIGHT - RENDER_MARGIN;
	graphicPortTexture.render(graphicPort);
	graphicSprite.x = .5 * MWIDTH - RENDER_MARGIN;
	graphicSprite.y = -MHEIGHT - RENDER_MARGIN;
	graphicPortTexture.render(graphicPort);
	graphicSprite.x = .5 * -MWIDTH - RENDER_MARGIN;
	graphicSprite.y = MHEIGHT - RENDER_MARGIN;
	graphicPortTexture.render(graphicPort);
	graphicSprite.x = .5 * MWIDTH - RENDER_MARGIN;
	graphicSprite.y = MHEIGHT - RENDER_MARGIN;
	graphicPortTexture.render(graphicPort);
	mapTexture.render(container);

	mapTexture.render(graphicPortSprite);
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
	gameSprite.x = shaker;
	gameSprite.y = -shaker;
	renderer.render(gameSprite);
	renderer.clearBeforeRender = false;
	scoretext.text = "Score: " + score;
	renderer.render(text);
}
