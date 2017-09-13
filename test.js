/*何亦辰/api/DcsalarmData/GetPersonPosition   PERSON_POSITION*/
require.config({
	paths:config.modulePaths
})

define(function(require){

    var $ = require('jquery');

$(function(){
    
    var canvas = document.getElementById('canvas'),
        context = canvas.getContext('2d');

    /*视大小而定*/
    var parent = document.getElementById('c1'),

        //自适应宽高度变量
        pW = parent.clientWidth.toFixed(0),
        pH = parent.clientHeight.toFixed(0);

    canvas.width = pW;
    canvas.height = pH;


    var eraseAllButton = document.getElementById('btn'),
        strokeStyleSelect = document.getElementById('select1'),
        guidewireCheckbox = document.getElementById('in1'),
        drawingSurfaceImageData,
        mousedown = {},
        rubberbandRect = {},
        dragging = false,
        guidewires = guidewireCheckbox.checked;

    //Functions
    function drawGrid(color, stepx, stepy) {

    }

    function windowToCanvas(x, y) {
        var bbox = canvas.getBoundingClientRect();
        return {
            x: x - bbox.left * (canvas.width / bbox.width),
            y: y - bbox.top * (canvas.height / bbox.height)
        };
    }

    
    function saveDrawingSurface() {
        drawingSurfaceImageData = context.getImageData(0, 0, canvas.width, cancas.height);
    }

    function restoreDrawingSurface() {
        context.putImageData(drawingSuiface, 0, 0);
    }














})
})























