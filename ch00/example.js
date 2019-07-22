//需要显示辅助坐标
var needCoordinate = true;
var showCoordinateCheckbox = document.getElementById("showCoordinate");
var coordinate = document.getElementById("coordinate");

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var currImg;

//*************************************
function drawHorizontalLine(y) {
	context.beginPath();
	context.moveTo(0, y + 0.5);
	context.lineTo(context.canvas.width, y + 0.5);
	context.stroke();
}

function drawVerticalLine(x) {
	context.beginPath();
	context.moveTo(x + 0.5, 0);
	context.lineTo(x + 0.5, context.canvas.height);
	context.stroke();
}

function drawGuidewires(x, y) {
	context.save();
	context.strokeStyle = "rgba(0,0,230,0.4)";
	context.lineWidth = 0.5;
	drawVerticalLine(x);
	drawHorizontalLine(y);
	context.restore();
}

function showCoordinate(x, y) {
	x = x.toFixed(0);
	y = y.toFixed(0);
	coordinate.innerHTML = "(" + x + ", " + y + ")";
}

//切换是否显示辅助坐标动作*****************
showCoordinateCheckbox.onchange = function(e) {
	const _checked = e.target.checked;

	if (_checked) {
		needCoordinate = true;
	} else {
		needCoordinate = false;
	}
};

//辅助事件*********************************
canvas.addEventListener("mousemove", e => {
	e.preventDefault();
	if (needCoordinate) {
		if (currImg) context.putImageData(currImg, 0, 0);
		var loc = canvasTool.windowToCanvas(e.clientX, e.clientY);
		drawGuidewires(loc.x, loc.y);
		showCoordinate(loc.x, loc.y);
	} else {
		if (currImg) context.putImageData(currImg, 0, 0);
		showCoordinate(0, 0);
		return;
	}
});

canvas.addEventListener("mouseout", e => {
	e.preventDefault();
	if (currImg) context.putImageData(currImg, 0, 0);
});

context.strokeStyle = "blue";
context.fillStyle = "red";
context.lineWidth = "5"; // line width set to 5 for shapes

// 实践位置.........................................................
justdoit();

//********************************************************************
window.onload = function() {
	currImg = context.getImageData(0, 0, canvas.width, canvas.height);
};

// 实践运行函数.........................................................
function justdoit() {
	(endPoints = [{ x: 130, y: 70 }, { x: 430, y: 270 }]),
		(controlPoints = [{ x: 130, y: 250 }, { x: 450, y: 70 }]);

	function drawBezierCurve() {
		context.strokeStyle = "blue";
		context.fillStyle = "yellow";

		context.beginPath();
		context.moveTo(endPoints[0].x, endPoints[0].y);
		context.bezierCurveTo(
			controlPoints[0].x,
			controlPoints[0].y,
			controlPoints[1].x,
			controlPoints[1].y,
			endPoints[1].x,
			endPoints[1].y
		);
		context.stroke();
	}

	function drawEndPoints() {
		context.strokeStyle = "blue";
		context.fillStyle = "red";

		endPoints.forEach(function(point) {
			context.beginPath();
			context.arc(point.x, point.y, 5, 0, Math.PI * 2, false);
			context.stroke();
			context.fill();
		});
	}

	function drawControlPoints() {
		context.strokeStyle = "yellow";
		context.fillStyle = "blue";

		controlPoints.forEach(function(point) {
			context.beginPath();
			context.arc(point.x, point.y, 5, 0, Math.PI * 2, false);
			context.stroke();
			context.fill();
		});
	}

	// drawControlPoints();
	// drawEndPoints();
	drawBezierCurve();

	//标示******************************************

	// canvasTool.drawPoint(context, points[0].x, points[0].y);
	// canvasTool.drawPoint(context, points[1].x, points[1].y);
	// canvasTool.drawPoint(context, points[2].x, points[2].y);
	// canvasTool.drawPoint(context, points[3].x, points[3].y);
	// canvasTool.drawPoint(context, points[4].x, points[4].y);
	// canvasTool.drawPoint(context, points[5].x, points[5].y);
}
