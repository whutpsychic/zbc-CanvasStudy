


var canvas = document.getElementById('c1'),
    context = canvas.getContext('2d');

/*视大小而定*/
canvas.width = 800;
canvas.height = 400;
/************/

var img = new Image();

function fillCvs(str) {
    var pattern = context.createPattern(img, str);
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = pattern;
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fill();
}

img.src = 'icons/img1.png';
img.onload = function () {
    fillCvs('repeat');
    //fillCvs('repeat-x');
    //fillCvs('repeat-y');
    //fillCvs('no-repeat');
}