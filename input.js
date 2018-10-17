(function ($) {
    $.fn.extend({
        search: function (opstions) {
            var opts = opstions;
            opts.father = this || $('body')
            new getData(opts).init();
        }
    })
    function getData(opts) {
        this.opts = opts || {};
        this.wrap = this.opts.father;
    }
    getData.prototype = {
        init: function () {
            this.createDom();
            this.bindEvent();
        },
        deBounce: function (handle, delay) {    //防抖函数；
            var timer = null;
            var _self = this;        //原本防抖函数这里的this默认需要保存input本身的this，但是这里我特意放到return的函数的外部，是为了保存全局的this以便下方的ajax的函数的使用，否则ajax内的this指向为input，造成拿不到传入的值opts的现象；
            return function () {
                var arg = arguments;
                clearTimeout(timer);
                timer = setTimeout(function () {
                    handle.apply(_self, arg);
                }, delay);
            }
        },
        createDom: function () {                                         //创建input区域跟btn按钮；
            var inpStr = '<input type="text" placeholder=' + this.opts.text + ' class="oInput">\
            <input type="submit" class="inp-btn" value: '+ this.opts.btnValue + '>';
            this.wrap.html(inpStr)
        },
        bindEvent: function () {      //绑定input事件跟逻辑事件；
            var self = this;
            $('.oInput').on('input', this.deBounce(this.getAjax, 350))   //这里的防抖函数必须写在句柄位置，不能放入回调函数里面，否则不会调用里面的定时器(至于为什么自行理解，很简单，不懂可以多问)；另外虽然为input的绑定事件，但是句柄的写法，这里的this还是只想全局，并非input；
            //这里判断特定情况隐藏下拉数据列表；注意这里不能用blur，否则点击不了下拉列表的a标签，吸取经验！！！
            $(document).on('click', function (e) {                       //这里我希望鼠标点击input以及下拉列表以外的区域，能够隐藏下拉列表，用了一个骚操作，仔细看代码；
                if ($(e.target).closest('#nav-search') !== $('#nav-search') || $(e.target).attr('class') === 'inp-btn') {      //closest方法是一个查找父级选择器，从自身开始往上查找第一个有ID为nav-search（也就是包含所有search部分的这个div）元素；
                    $('.input-show').css('display', 'none')                           //这里判断的用户点击的位置是否在input以外的地方，是的话隐藏下拉列表，点击btn的时候也要隐藏；
                }
            })
            $('.inp-btn').on('click', function () {                      //点击btn按钮的时候直接获取value拼接豆瓣的url，打开一个新的页面；
                var _val = $('.oInput').val();                           //这是jQuery的直接获取输入框的value值的方法，一般用于input；
                if (_val != '') {
                    window.open('https://music.douban.com/subject_search?search_text=' + _val + '&cat=1003', '', '', '', '');
                    //这是jQuery的一个属性，可直接在新的页面打开对应链接，因为是在新的页面使用ajax请求，这里根本不用考虑跨域的问题；关于链接怎么获取直接搜索任意内容即可套取拼接格式；
                    //关于window.open()方法的拓展链接：http://www.runoob.com/jsref/met-win-open.html
                }
            });
        },

        getAjax: function (e) {                    //接收防抖函数给我们传参arguments，从而获取value值;
            var value = e.target.value;            //当然不用arguments，也可以直接使用jq的val()方法，我尽量是多用一些方式来做，方便大家巩固知识；
            $.ajax({                               //这里关于JQ的ajax仅仅在jq的预览课有提到，后面就再也没教，当时根本不知道ajax是啥，所以在这里对ajax的这些仅仅是提及方法肯定是不熟悉的，在这里拓展一下，同时谢谢闪电同学提供笔记，拓展链接:
                url: this.opts.url,
                type: this.opts.type,
                data: this.opts.data + value + this.opts.count,
                dataType: this.opts.dataType,
                success: this.opts.sucFn,
                error: this.opts.errFn,
            })
        }
    }
}($))