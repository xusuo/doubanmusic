(function ($) {
    $.fn.extend({
        //扩展插件为sliderShowMax；
        tab: function (opstions) {
            var opts = opstions;
            opts.father = this || $('body')
            new Swiper(opts);
        }
    })
    //构造工厂
    function Swiper(opts) {
        this.opts = opts || {}
        this.wrap = this.opts.father;
        this.init();
    }
    //入口函数
    Swiper.prototype.init = function () {
        this.boxWidth = this.wrap.width();   //盒子总宽，高度靠内容撑开；
        this.createHeader();
        this.createTab();
        this.bindEvent();
    }
    //构建头部dom结构
    Swiper.prototype.createHeader = function () {
        var self = this;
        var tab_header = $('<div class="tab-header"></div>') //tab-header盒子
        var tab_classify_len = self.opts.classify.length;
        var tab_header_str = '';
        for (var i = 0; i < tab_classify_len; i++) {        //创建classify部分；
            if (i == tab_classify_len - 1) {
                tab_header_str += '<div class="tab-header-classify">' + self.opts.classify[i] + '</div>'
            } else {
                tab_header_str += '<div class="tab-header-classify">' + self.opts.classify[i] + ' |</div>'
            }
        }
        if (self.opts.end && self.opts.end != "") {           //创建end部分；
            tab_header_str += '<div class="tab-header-end">' + self.opts.end + '</div>';
        }
        tab_header.html(tab_header_str);
        $(self.wrap).append($(tab_header));           //将header部分放入this盒子；
    }
    //构建切换页Tabdom结构
    Swiper.prototype.createTab = function () {
        var self = this;
        var contentArr = [];
        //创建多个tab界面
        for (var i = 0; i < self.opts.content.length; i++) {
            var tab_content = $('<div class="tab-content content1"></div>');    //创建内容区大盒子；
            var content_box_str = '';
            for (var a = 0, conlen = self.opts.content[i].length; a < conlen; a++) {
                var decoration_str = '';
                for (var b = 0, declen = self.opts.content[i][a].decoration.length; b < declen; b++) {
                    decoration_str += self.opts.content[i][a].decoration[b] + '<br>';
                }
                content_box_str += '<div class="tab-box">\
                                             <div class="bg-image">\
                                                 <div class="bg-text"><div class="text">' + decoration_str + '</div></div>\
                                                   <img src="'+ self.opts.content[i][a].img + '" alt="">\
                                                 <div class="tab-radius"><div class="tab-triangle"></div></div>\
                                             </div>\
                                               <a href="">' + self.opts.content[i][a].name + '</a>\
                                              <p> ' + self.opts.content[i][a].classify + ' </p>\
                                           </div>'
            }
            tab_content.html(content_box_str);
            contentArr.push(tab_content);               //依次创建tab的每一页的dom结构并放入数组
        }
        for (var j = 0; j < contentArr.length; j++) {   //最后依次放入页面结构中；
            contentArr[j].appendTo(self.wrap);
        }
    }
    //绑定事件
    Swiper.prototype.bindEvent = function () {
        // 默认第一个显示状态；
        $('.tab-header-classify').eq(0).addClass("classIfy");
        $('.tab-content').eq(0).addClass('tab-active');
        // 绑定点击事件；
        $('.tab-header-classify').on('click', function () {
            $('.classIfy').toggleClass('classIfy')
            $(this).addClass("classIfy");
            var nowindex = $(this).index();    //通过对应title跟context的index达到同步对应状态；
            $('.tab-active').removeClass('tab-active');
            $('.tab-content').eq(nowindex).addClass('tab-active');
        })
        // 绑定onmouseenter事件；
        $('.bg-image').on('mouseenter', function () {
            $(this).children().eq(0).addClass('bg-block')    //寻找该背景图里面的子级eq(0)，更改子级display；
            $('.tab-radius', $(this)).css('background-color', '#ddd');
            $('.tab-triangle', $(this)).css('border-left', '10px solid #222');
        }).on('mouseleave', function () {
            $(this).children().eq(0).removeClass('bg-block');
            $('.tab-radius', $(this)).css('background-color', '#222');
            $('.tab-triangle', $(this)).css('border-left', '10px solid #ddd');
        })
    }
}($))