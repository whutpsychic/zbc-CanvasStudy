
var canvas = document.getElementById('c1'),
    context = canvas.getContext('2d');

/*视大小而定*/
canvas.width = 800;
canvas.height = 400;
/************/

context.lineJoin = 'round';
context.lineWidth = 30;

context.font = '24px Helvetica';
context.fillText('click anywhere to earase', 75, 50);

context.strokeRect(90, 90, 30, 500);
context.fillRect(325, 100, 100, 150);

context.canvas.onmousedown = function (e) {
    context.clearRect(0, 0, 300, canvas.height);
};





