/*何亦辰/api/DcsalarmData/GetPersonPosition   PERSON_POSITION*/
require.config({
    paths: config.modulePaths
})

define(function (require) {

    var drawCanvas = require('drawCanvas');


    /*基础信息库*/
    var Data = [];

    //for (var i = 0; i < 19; i++) {
    //    Data.push('新增内大发大faadfasdfasdfas师傅撒地方的萨芬撒地方容新增内大发大师傅撒地方的萨芬撒地方容' + i);
    //}

    Data = [
        '两行的内容两行的内容两行的内容两行的内容两行的内容两行的内容1',
        '一行的内容2',
        '两行的内容两行的内容两行的内容两行的内容两行的内容两行的内容3',
        '一行的内容4',
        '两行的内容两行的内容两行的内容两行的内容两行的内容两行的内容5',
        '两行的内容两行的内容两行的内容两行的内容两行的内容两行的内容6',
        '两行的内容两行的内容两行的内容两行的内容两行的内容两行的内容7',
        '一行的内容8',
        '师傅撒地方的萨芬撒地方容新增内大发大师傅撒地方的萨芬撒地方容9',
        '一行的内容10',
        '师傅撒地方的萨芬撒地方容新增内大发大师傅撒地方的萨芬撒地方容11',
        '一行的内容12',
        '师傅撒地方的萨芬撒地方容新增内大发大师傅撒地方的萨芬撒地方容13',
        '师傅撒地方的萨芬撒地方容新增内大发大师傅撒地方的萨芬撒地方容14',
        '五行的内容撒地方的萨芬撒地方容新增内大发大师傅撒地方的萨芬撒地方容师傅撒地方的萨芬撒地方容新增内大发大师傅撒地方的萨芬撒地方容师傅撒地方的萨芬撒地方容新增内大发大师傅撒地方的萨芬撒地方容15',
        '师傅撒地方的萨芬撒地方容新增内大发大师傅撒地方的萨芬撒地方容16',
        '师傅撒地方的萨芬撒地方容新增内大发大师傅撒地方的萨芬撒地方容17',
        '师傅撒地方的萨芬撒地方容新增内大发大师傅撒地方的萨芬撒地方容18'
    ]

    for (var i = 0; i < 8; i++) {
        Data.push(' ');
    }

    /*****基本配置*******/
                  //上行速度
    const font = 35;                    //字体行高
    const bei = 1;                      //几倍速度
    

    var speedUp = 1000 * bei
    /*************右侧grid's Functions********************/

    //装填数据
    function loadData(data) {
        var ul = document.getElementById('grid');

        for (var i = 0; i < data.length; i++) {
            var li = document.createElement('li');
            li.innerHTML = data[i];

            //奇偶辨别
            if (!(i % 2)) { ;}
            else {
                li.className = 'even';
            }
            ul.appendChild(li);
        }
    }

    //从上方添加一条并插入
    function add_from_top(str) {

        var ul = document.getElementById('grid'),
            target = ul.children[0],
            h = target.clientHeight;

        var li = document.createElement('li');
        li.innerHTML = str;

        //ul.insertBefore(li, target);
        //动画区
        function add_from_top_animation(node, h) {
            node.style.height = 0;
            ul.insertBefore(li, target);
            var hh = 0,
                backgroundElement = document.getElementById('div8');

            function doit() {
                if (hh >= h) { return; }

                else {
                    hh += h / 3;
                    node.style.height = hh + 'px';
                    setTimeout(doit, 50);
                }
            }
            doit();

            //背景
            var positionY = backgroundElement.style.backgroundPositionY; 

            if (!positionY) {
                backgroundElement.style.backgroundPositionY = '35px';
            }
            else if (typeof positionY === 'string') {

                var number = positionY.slice(0, positionY.length - 2);

                backgroundElement.style.backgroundPositionY = 35 + parseInt(number) + 'px';
            }
        }

        add_from_top_animation(li, h);

    }

    //在上方删除出去
    function delete_from_top() {

        var ul = document.getElementById('grid'),                       //父级ul元素
            target = ul.children[0],                                    //将要删除的项
            backgroundElement = document.getElementById('div8'),        //外容器
            currSpeed = 0,                                              //当前速度
            maxH = target.clientHeight;                                 //目标li的高度

        target.style.transition = (maxH / font)*bei + 's linear';
        currSpeed = (maxH / font) * bei *1000;
        target.style.marginTop = 0 - maxH + 'px';

        //背景
        var positionY = backgroundElement.style.backgroundPositionY;

        if (!positionY) {
            backgroundElement.style.backgroundPositionY = '-35px';
        }
        else if (typeof positionY === 'string') {

            var number = positionY.slice(0, positionY.length - 2);

            backgroundElement.style.backgroundPositionY = -35 + parseInt(number) + 'px';
        }


        function _delete() {
            if (ul.children[0] === target)
            ul.removeChild(target);
        }

        if (currSpeed) {
            setTimeout(_delete, currSpeed);
        }
       
        

    }

    //从下方塞进一条数据
    function add_from_bottom(str) {

        var ul = document.getElementById('grid');
        var oe = ul.children.length;
        var li = document.createElement('li');
        li.innerHTML = str;

        if (!ul.children[oe-1].className) {
            li.className = 'even';
        }

        else {
            ;
        }
        ul.appendChild(li);
        
    }



    /*********************管理函数************************/

    function addMsg(str) {
        add_from_bottom(str);
        delete_from_top();
    }






    /*****************************************************/



    var Go = function () {

        //先画Canvas
        drawCanvas.draw();

        //初次加载数据
        loadData(Data);

        //手工计数器
        var counter = 0;

        function loopIt() {

            if (counter >= Data.length) {
                counter = 0;
            }
            addMsg(Data[counter]);
            counter++;

            setTimeout(loopIt, speedUp/bei);
        }
        
        setTimeout(loopIt, 500);










    }
    Go();
})
