

define(function(require){

    var ret = {};

    ret.container = document.getElementById('canvas');
    ret.context = ret.container.getContext('2d');

    ret.draw = function () {

        var canvas = ret.container,
            context = ret.context;

        var div1 = document.getElementById('div1'),
            div2 = document.getElementById('div2'),
            div3 = document.getElementById('div3'),
            div4 = document.getElementById('div4'),
            div5 = document.getElementById('div5'),
            div6 = document.getElementById('div6'),
            div7 = document.getElementById('div7'),
            div8 = document.getElementById('div8');

        /*基本信息存储区*/
        var base = {};
        base.width = canvas.clientWidth;
        base.height = canvas.clientHeight;
        base.x = canvas.offsetLeft;
        base.y = canvas.offsetTop;

        var div1Info = {
                width: div1.clientWidth, height: div1.clientHeight, x: div1.offsetLeft - base.x, y: div1.offsetTop - base.y,
                el: div1
            },
            div2Info = {
                width: div2.clientWidth, height: div2.clientHeight, x: div2.offsetLeft - base.x, y: div2.offsetTop - base.y,
                el: div2
            },
            div3Info = {
                width: div3.clientWidth, height: div3.clientHeight, x: div3.offsetLeft - base.x, y: div3.offsetTop - base.y,
                el: div3
            },
            div4Info = {
                width: div4.clientWidth, height: div4.clientHeight, x: div4.offsetLeft - base.x, y: div4.offsetTop - base.y,
                el: div4
            },
            div5Info = {
                width: div5.clientWidth, height: div5.clientHeight, x: div5.offsetLeft - base.x, y: div5.offsetTop - base.y,
                el: div5
            },
            div6Info = {
                width: div6.clientWidth, height: div6.clientHeight, x: div6.offsetLeft - base.x, y: div6.offsetTop - base.y,
                el: div6
            },
            div7Info = {
                width: div7.clientWidth, height: div7.clientHeight, x: div7.offsetLeft - base.x, y: div7.offsetTop - base.y,
                el: div7
            };


        /*基本设置*/
        canvas.width = base.width;
        canvas.height = base.height;


        /******************Functions**********************************************/

        //添加箭头
        //totop, tobottom, toleft, toright
        function addArrow(x, y, type) {

            var parent = document.getElementById('board-content');

            var arrow = document.createElement('div');

            arrow.style.left =  x + 'px';
            arrow.style.top = y + 'px';

            if (type === 'totop') {
                arrow.className = 'arrow totop';
            }
            else if (type === 'tobottom') {
                arrow.className = 'arrow tobottom';
            }
            else if (type === 'toleft') {
                arrow.className = 'arrow toleft';
            }
            else if (type === 'toright') {
                arrow.className = 'arrow toright';
            }

            parent.appendChild(arrow);

        }

        //垂直方向画法(临近一笔)
        //用divInfo说话
        function drawDown(div1, div2, type) {
            context.beginPath();
            context.moveTo(div1.x + div1.width / 2, div1.y + div1.height);
            context.lineTo(div2.x + div2.width / 2, div2.y);
            context.stroke();
            if (type === 'totop') {
                addArrow(div2.x + div2.width / 2 - 6, div2.el.offsetTop+div2.height, 'totop');
            }
            else if (type === 'tobottom') {
                addArrow(div2.x + div2.width / 2 - 6, div2.el.offsetTop - 10, 'tobottom');
            }
        }

        //水平画法(临近一笔)
        function drawHorizontal(ddiv1, ddiv2, type) {
            
            if (type === 'toleft') {
                context.beginPath();
                context.moveTo(ddiv1.x, ddiv1.y + ddiv1.height / 2);
                context.lineTo(ddiv2.x + ddiv2.width, ddiv1.y + ddiv1.height / 2);
                context.stroke();
                addArrow(ddiv2.x + ddiv2.width, ddiv1.el.offsetTop + ddiv1.height / 2 - 6, 'toleft');
            }
            else if (type === 'toright') {
                context.beginPath();
                context.moveTo(ddiv1.x + ddiv1.width, ddiv1.y + ddiv1.height / 2);
                context.lineTo(ddiv2.x, ddiv1.y + ddiv1.height / 2);
                context.stroke();
                addArrow(ddiv2.x - 10, ddiv1.el.offsetTop + ddiv1.height / 2 - 6, 'toright');
            }
        }

        //指定点折线画法
        function drawfoldLine() {

            for (var i = 0; i < arguments.length - 1; i++) {
                
                context.beginPath();
                context.moveTo(arguments[i].x, arguments[i].y);
                context.lineTo(arguments[i + 1].x, arguments[i + 1].y);
                context.stroke();

            }
        }

        /*************************************************************************/
        context.strokeStyle = '#389edc';

        //画一个向下指向 1==>4
        drawDown(div1Info, div4Info, 'tobottom');

        //向下指向 4==>7
        drawDown(div4Info, div7Info, 'tobottom');

        //向下指向 2==>5
        drawDown(div2Info, div5Info, 'tobottom');

        //向下指向 2==>5
        drawDown(div6Info, div3Info, 'totop');

        drawHorizontal(div3Info, div2Info, 'toleft');
        drawHorizontal(div1Info, div2Info, 'toright');
        drawHorizontal(div2Info, div1Info, 'toleft');

        //画那个折线的
        var point1 = { x: div1Info.x + div1Info.width, y: div1Info.y + div1Info.height / 1.2 },
            point2 = { x: point1.x + (div5Info.x - point1.x) / 2, y: point1.y },
            point3 = { x: point2.x, y: div5Info.y + div5Info.height / 2 },
            point4 = { x: div5Info.x, y: point3.y };

        drawfoldLine(point1, point2, point3, point4);
        addArrow(point4.x - 10, div5Info.el.offsetTop + div5Info.height / 2 - 6, 'toright');


        /*规划东区西区*/

        //正中间来条线
        function drawCenterLine() {

            var point1 = { x: base.width / 2, y: 30 },
                point2 = { x: base.width / 2, y: base.height - 30 };

            context.strokeStyle = 'orange';
            context.lineWidth = 2;

            drawfoldLine(point1, point2);
        }

        drawCenterLine();

        //画字东区西区
        
        context.font = '35px Helvetica';

        //画东区
        function drawDongqu(x) {

            var font1 = { x: base.width / 2 - 120, y: 50 },
                font2 = { x: base.width / 2 + 60, y: 50 };

            context.clearRect(font1.x, font1.y, 80, 35);
            if (!x) {
                context.fillStyle = '#fff';
                context.strokeStyle = '#fff';
                
                context.fillText('东区', font1.x, font1.y);
                context.strokeText('东区', font1.x, font1.y);
                //console.log('默认东区')
            }
            else {
                context.fillStyle = 'red';
                context.strokeStyle = 'red';

                context.fillText('东区', font1.x, font1.y);
                context.strokeText('东区', font1.x, font1.y);
                //console.log('hover东区')

            }

        }

        //画西区
        function drawXiqu(x) {

            var font1 = { x: base.width / 2 - 120, y: 50 },
                font2 = { x: base.width / 2 + 60, y: 50 };

            //context.clearRect(base.width / 2+2, 0, base.width / 2, base.height);

            if (!x) {
                context.fillStyle = '#fff';
                context.strokeStyle = '#fff';
                context.fillText('西区', font2.x, font2.y);
                context.strokeText('西区', font2.x, font2.y);
                //console.log('默认西区')
            }
            else {
                context.fillStyle = 'red';
                context.strokeStyle = 'red';

                context.fillText('西区', font2.x, font2.y);
                context.strokeText('西区', font2.x, font2.y);

                //console.log('hover西区')

            }
        }


        drawDongqu();
        drawXiqu();

        //绑定东西区事件
        canvas.style.cursor = 'pointer';

        canvas.onmousemove = function () {

            var _x = event.clientX - document.getElementById('board').offsetLeft,
                _y = event.clientY;


            if (_x < base.width / 2) {
                drawXiqu();
                drawDongqu(1);
            }
            else if (_x >= base.width / 2 ){
                drawXiqu(1);
                drawDongqu();
            }
        }














    }









    return ret;

})



