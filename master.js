
var Game = {
	size: new Vector2(0, 0),
	gameWrapper: undefined,
	canvas : undefined,
	canvasContext : undefined,
	scale: undefined,
	offset: undefined
};

Game.init = function(canvaName, gameWrapper, width, height) {
	Game.canvas = document.getElementById(canvaName);
	Game.canvasContext = Game.canvas.getContext("2d");
	
	Game.size = new Vector2(width, height);
	Game.gameWrapper = document.getElementById(gameWrapper);
	
	Game.resize();
	
	Game.mainLoop();
}

Game.mainLoop = function() {
	 Game.update();
	 Game.draw();
	 
	 setTimeout(Game.mainLoop, 1000/60);
}

Game.update = function() {
	 Game.scale = Game.getScale();
}

Game.draw = function() {
	 
	Game.drawRect("#fff", new Vector2(0, 0), Game.size.X, Game.size.Y);
	Game.drawRect("#000080", new Vector2(25, 25), 100, 100);
	 
	Game.drawCircle("#FF0000", new Vector2(275, 275), 40, 0, 2 * Math.PI);	
}


Game.resize = function() {
	var widthToHeight = Game.size.X / Game.size.Y;
	var newWidth = window.innerWidth;
	var newHeight = window.innerHeight;
	var newWidthToHeight = newWidth / newHeight;

	if (newWidthToHeight > widthToHeight) newWidth = newHeight * widthToHeight;
	else newHeight = newWidth / widthToHeight;
	
	Game.gameWrapper.style.width = newWidth + 'px';
	Game.gameWrapper.style.height = newHeight + 'px';
	
	Game.gameWrapper.style.marginTop = (window.innerHeight - newHeight) / 2 + 'px';
	Game.gameWrapper.style.marginLeft = (window.innerWidth - newWidth) / 2 + 'px';
	Game.gameWrapper.style.marginBottom = (window.innerHeight - newHeight) / 2 + 'px';
	Game.gameWrapper.style.marginRight = (window.innerWidth - newWidth) / 2 + 'px';
	
	Game.canvas.width = newWidth;
	Game.canvas.height = newHeight;
	
	var gameCanvas = Game.canvas;
	Game.offset = new Vector2(0, 0);
	
	if (gameCanvas.offsetParent) {
		do {
			Game.offset.X += gameCanvas.offsetLeft;
			Game.offset.Y += gameCanvas.offsetTop;
		} while ((gameCanvas = gameCanvas.offsetParent));
	}
}

Game.getScale = function() {
	return new Vector2(Game.canvas.width / Game.size.X, Game.canvas.height / Game.size.Y);
 }


Game.drawRect = function(color, pos, width, height) {	
	Game.canvasContext.save();
		Game.canvasContext.scale(Game.scale.X, Game.scale.Y);
		Game.canvasContext.fillStyle = color;
		Game.canvasContext.fillRect(pos.X, pos.Y, width, height);
	Game.canvasContext.restore();
}

Game.drawCircle = function(color, pos, radius, sAngle, eAngle) {
	Game.canvasContext.save();
		Game.canvasContext.scale(Game.scale.X, Game.scale.Y);
		Game.canvasContext.fillStyle = color;
		Game.canvasContext.beginPath();
		Game.canvasContext.arc(pos.X, pos.Y, radius, sAngle, eAngle);
		Game.canvasContext.fill();
	Game.canvasContext.restore();
}


function Vector2(X, Y) {
	this.X = X || 0;
	this.Y = Y || 0;
}

window.onresize = Game.resize;

window.addEventListener(
	"DOMContentLoaded",
	function() {
		Game.init("myCanvas", "gameWrapper", 1366, 768);
		}
);