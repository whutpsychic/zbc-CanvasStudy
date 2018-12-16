/*******************************************************************************************************/
//
//css接口：
//
//      
//
//
//
//
//
//
//
//
//
//
//
//
//
//js接口：
//      
//
//
//
//
//
//
//
//
//
/*******************************************************************************************************/



; (function (root, factory) {
    if (typeof define == 'function' && define.amd) {
        define(function () {
            return factory();
        })
    }
    else {
        root.pageIn = factory()
    }
}(this, function () {


    //工具函数
    var _handlersHelper = {

        extend: function (x,y) {
            var i = 0, j;
            var _option = x;
      
            for (j in y) {
                _option[j] = y[j];
            }

            return _option;
        },

        bind: function (node, type, fn) {
            node.addEventListener ? node.addEventListener(type, fn) : node.attachEvent('on' + type, fn);
        },

        addClass: function (node, cls) {
            node.className += cls;
        },

        removeClass: function (node, cls) {

            var _temp = node.className;
            node.className = '';
            var __temp__ = node.className.split(' ');

            //console.log(__temp__)

            for (var i = 0; i < __temp__.length; i++) {
                if (__temp__[i] !== cls) {
                    node.className += __temp__[i];
                }
            }
        },


        addLi: function (inn, parent, option, processor, fn) {
            var that = this;

            var li = document.createElement('li');

            li.innerHTML = inn;

            if (inn === 1) { li.className = 'currP' };
            parent.appendChild(li);

            if (fn) {
                that.bind(li, 'click', fn);
            }

            else {
                that.bind(li, 'click', function () {
                    processor.currPage = this.innerHTML;

                    //锁定当前页
                    //for (var j = 0; j < parent.childNodes.length; j++) {
                    //    that.removeClass(parent.childNodes[j], 'currP');

                    //    if (parent.childNodes[j].innerHTML === processor.currPage) {
                    //        parent.childNodes[j].className += 'currP';
                    //    }
                    //}
                    processor.redraw(processor.currPage, option.total);
                });
            }   
        },

        removeChildren: function (parent) {

            while (parent.childNodes.length) {
                parent.removeChild(parent.childNodes[0]);
            }
        }
    };


    //主构造器函数
    var pageIn = function (obj) {

        this.hello = 'papa';
        this.version = '1.0';
        this.editor = 'zbc';

        //占内存的项
        this.container = null;      //容器元素
        this.currPage = 1;          //当前页
        this.total = null;          //最后一页

        var parent = this.container;
        var i = 1;
        var flastP, lastP, ulP, nextP, fnextP;
        var that = this;


        //实际配置
        var option = {};

        //默认配置
        var defOption = {

            //上一页图片(地址)
            //lastP: null,

            //下一页图片(地址)
            //nextP: null,

            //中间之多显示几个页码()最少显示5个
            ps: 5,

            //一共有多少页
            total: 0

        }

        //第一次画
        this.draw = function (x) {
            this.total = x;

            //创建前后各两个()
            flastP = document.createElement('div');
            flastP.className = 'flastP';
            lastP = document.createElement('div');
            lastP.className = 'lastP';
            ulP = document.createElement('ul');
            ulP.className = 'ulP';
            nextP = document.createElement('div');
            nextP.className = 'nextP';
            fnextP = document.createElement('div');
            fnextP.className = 'fnextP';
            this.container.appendChild(flastP);
            this.container.appendChild(lastP);
            this.container.appendChild(ulP);
            this.container.appendChild(nextP);
            this.container.appendChild(fnextP);


            //对一共该显示多少页进行调配
            
            //如果total小于ps
            if (option.total <= option.ps) {
                for (; i < x + 1; i++) {
                    _handlersHelper.addLi(i, ulP, option, this);
                }
            }

            //其他(一般画法)
            else {
                var haf;
                if (!option.ps % 2) {
                    haf = option.ps / 2;
                }
                else {
                    haf = (option.ps - 1) / 2;
                }

                //画前ps-1个页码
                for (; i < option.ps - 1; i++) {
                    _handlersHelper.addLi(i, ulP, option, this);
                }

                //添加一个...
                _handlersHelper.addLi('...', ulP, option, this, function () {
                    that.redraw(that.currPage + haf, that.total);

                });

                //添加最后一页
                _handlersHelper.addLi(this.total, ulP, option, this);

            }
        }

        //再次画
        this.redraw = function (curr, total) {

            //console.log('重画函数')
            _handlersHelper.removeChildren(ulP);

            //
            //if (option.total <= option.ps) {
            //    for(i=1;i<)
            //}











        }

        //配置覆盖default项
        this.config = function () {

            option = defOption;

            option = _handlersHelper.extend(option, obj);

            this.total = option.total;

        }


        /*初始化函数*/
        this.init = function () {

            //配置option
            this.config();

            //注册容器
            this.container = obj.el;

            //画
            this.draw(obj.total);

        }

        
        //设置事件函数
        this.on = function (type, fn) {
            var that = this;
            _handlersHelper.bind(that.container,type,function(){
                fn(that.currPage);
            });

    
        }






















    }



    //消去new 的管理函数
    var manager = {

        fac: function (fn) {
            return this.create(fn);
        },

        create: function (fn) {
            return function (obj) {
                var ret = new fn(obj);
                return ret;
            }
        }
    }

    //return pageIn;
    return manager.fac(pageIn);

}))