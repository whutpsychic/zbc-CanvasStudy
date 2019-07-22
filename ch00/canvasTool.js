const canvasTool = {};

canvasTool.windowToCanvas = (x, y) => {
	var bbox = canvas.getBoundingClientRect();

	return {
		x: x - bbox.left * (canvas.width / bbox.width),
		y: y - bbox.top * (canvas.height / bbox.height)
	};
};

canvasTool.drawPoint = (context, x, y, show) => {
	context.save();
	context.beginPath();
	context.arc(x, y, 3, 0, Math.PI * 2);
	context.fillStyle = "red";
	context.fill();
	if (show !== false) {
		context.font = "16px Arial";

		var _outpositionX = x + 180 > context.canvas.width ? -90 : 10;
		var _outpositionY = y + 80 > context.canvas.height ? -25 : 10;

		context.fillText(
			"(" + x + ", " + y + ")",
			x + _outpositionX,
			y + _outpositionY
		);
	}

	context.restore();
};
