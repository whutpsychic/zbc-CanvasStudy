var canvas = document.getElementById('c1'),
    context = canvas.getContext('2d');

/*视大小而定*/
canvas.width = 800;
canvas.height = 400;
/************/

var gradient = context.createLinearGradient(0, 0, 550, 550);


gradient.addColorStop(0, 'blue');
gradient.addColorStop(0.25, '#fff');
gradient.addColorStop(0.5, 'purple');
gradient.addColorStop(0.75, 'red');
gradient.addColorStop(1, 'yellow');

//背景
context.fillStyle = gradient;
context.fillRect(0, 0, canvas.width, canvas.height);

//文字
context.fillStyle = '#fff';
context.fillText('hello', 600, 100);