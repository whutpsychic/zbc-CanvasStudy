
require.config({
	paths:config.modulePaths
})

define(function(require){

    var $ = require('jquery');
    var pageIn = require('pageIn');

$(function(){

    //var kk = pageIn({
    //    el: document.getElementById('div1'),
    //    total:5,
    //    ps:5
    //});
    //kk.init();

    //kk.on('click',function(x){
    //    console.log(x)
    //})

    //var kk2 = pageIn({
    //    el: document.getElementById('div2'),
    //    total: 10,
    //    ps:7
    //});
    //kk2.init();


    //var kk3 = pageIn({
    //    el: document.getElementById('div3'),
    //    total: 10

    //});
    //kk3.init();

    //kk3.on('click',function(x){
    //    console.log(x)
    //})

    var canvas = document.getElementById('c1'),
        context = canvas.getContext('2d'),
        FONT_HEIGHT = 15,
        MARGIN = 35,
        HAND_TRUNKATION = canvas.width / 25,
        HOUR_HAND_TRUNKATION = canvas.width / 10,
        NUMERAL_SPACING = 20,
        RADIUS = canvas.width / 2 - MARGIN,
        HAND_RADIUS = RADIUS + NUMERAL_SPACING;

    canvas.width = 800;
    canvas.height = 400;

    function drawCircle() {
        context.beginPath();
        context.arc(canvas.width / 2, canvas.height / 2, RADIUS, 0, Math.PI * 2, true);
        context.stroke();
    }

    function drawNumerals() {
        var numerals = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            angle = 0,
            numeralWidth = 0;

        numerals.forEach(function (numeral) {
            angle = Math.PI / 6 * (numeral - 3);
            numeralWidth = context.measureText(numeral).width;
            context.fillText(numeral,
                canvas.width / 2 + Math.cos(angle) * (HAND_RADIUS) - numeral.width / 2,
                canvas.height / 2 + Math.sin(angle) * (HAND_RADIUS) + FONT_HEIGHT / 3);
        })
    }

    function drawCenter() {
        context.beginPath();
        context.arc(canvas.width / 2, canvas.height / 2, 5, 0, Math.PI * 2, true);
        context.fill();
    }

    function drawHand(loc, isHour) {
        var angle = (Math.PI * 2) * (loc / 60) - Math.PI / 2,
            handRadius = isHour ? RADIUS - HAND_TRUNKATION - HOUR_HAND_TRUNKATION : RADIUS - HAND_TRUNKATION;

        context.moveTo(canvas.width / 2, canvas.height / 2);
        context.lineTo(canvas.width / 2 + Math.cos(angle) * handRadius,
            canvas.height / 2 + Math.sin(angle) * handRadius);
        context.stroke();
    }

    function drawHands() {
        var date = new Date(),
            hour = date.getHours();

        hour = hour > 12 ? hour - 12 : hour;

        drawHand(hour * 5 + (date.getMinutes() / 60) * 5, true, 0.5);
        drawHand(date.getMinutes(), false, 0.5);
        drawHand(date.getSeconds(), false, 0.2);
    }

    function drawClock() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        drawCircle();
        drawCenter();
        drawHands();
        drawNumerals();
    }


    context.font = FONT_HEIGHT + 'px Arial';;
    loop = setInterval(drawClock, 1000);

















})
})























