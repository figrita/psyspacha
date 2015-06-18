function renderMap(x, y, clearit) {
	if (clearit) {
		renderer.clearBeforeRender = true;
	}
	mapSprite.x = x;
	mapSprite.y = y;
	renderer.render(mapSprite);
	if (clearit) {
		renderer.clearBeforeRender = false;
	}
}

function render() {
	mapTexture.clear();
	mapTexture.render(container);
	mapTexture.render(beamgfx);
	beamgfx.clear();
//  i is rows, even rows are shifted a half-map to the left
//  the clearBeforeRender flag goes off when rendering the topright corner
//  and no other
//  the conditionals remove duplicate renderings.
//	the mapSprite is rendered multiple times per tile for when sprites rest
//	on borders

	for (var i = 0; i < ty; i++) {
		if (i % 2 === 0) {
			for (var j = 0; j < tx; j++) {
				renderMap(j * MWIDTH, i * MHEIGHT, i === 0 && j === 0);
				if (j === 0) {
					renderMap((j - 1) * MWIDTH, i * MHEIGHT, false);
					if (i === 0) {
						renderMap((j - .5) * MWIDTH, (i - 1) * MHEIGHT, false);
					}
				}
				renderMap((j + .5) * MWIDTH, (i - 1) * MHEIGHT, false);
			}
		}
		else {
			for (j = 0; j <= tx; j++) {
				renderMap((j - .5) * MWIDTH, i * MHEIGHT, false);
				if (j === 0) {
					renderMap((j - 1.5) * MWIDTH, i * MHEIGHT, false);
					if (i === 0) {
						renderMap((j - 1) * MWIDTH, (i - 1) * MHEIGHT, false);
					}
				}
				renderMap(j * MWIDTH, (i - 1) * MHEIGHT, false);

			}
		}
	}
	renderer.render(text);
}
