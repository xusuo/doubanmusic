
(function ($) {
    $.fn.extend({
        //扩展插件为sliderShowMax；
        sliderShowMax: function (opstions) {
            var opts = opstions;
            opts.father = this || $('body')
            new Swiper(opts);
        }
    })
    //构造工厂
    function Swiper(opts) {
        this.opts = opts || {}
        this.btn = opts.button || [];
        this.wrap = this.opts.father;
        this.init();
    }
    //入口函数
    Swiper.prototype.init = function () {
        this.nowIndex = 0;
        this.dex = 0;
        this.timer = undefined;
        this.len = this.opts.image.length;
        this.itemWidth = this.wrap.width();
        this.itemHeight = this.wrap.height();
        this.image = this.opts.image;
        this.btnW = this.opts.btnSizeW;
        this.btnH = this.opts.btnSizeH;
        this.createDom();
        this.bindEvent();
        this.sliderAuto();
    }
    //构建dom结构
    Swiper.prototype.createDom = function () {
        var self = this;
        var len = self.len;
        var str = " ";
        var listStr = " ";
        var imgBox = $('<ul class = "img-box"></ul>');
        var list = $('<ul class="list"></ul>');
        for (var i = 0; i < len; i++) {
            str += "<li><a><img src=" + self.image[i] + ' alt=""></a></li>';
            listStr += '<li></li>';
        }
        str += "<li><a><img src=" + self.image[0] + ' alt=""></a></li>'
        self.wrap.append(imgBox.html(str)).append(list.append($(listStr)));
        $('li', '.list').eq(0).addClass('active');
        $('.img-box').css('width', (len + 1) * self.itemWidth)
        //按钮插件判断
        if (self.btn[0]) {
            var btnl = '<div class="btn next" ></div>'
            var lstr = 'url(' + self.btn[0] + ')'
            self.wrap.append($(btnl).css('background-image', lstr)
                .css('width', self.btnW)
                .css('height', self.btnH)
                .css('background-size', self.btnW))
            if (self.btn[1]) {
                var btnl = '<div class="btn prev" ></div>'
                var rstr = 'url(' + self.btn[1] + ')'
                self.wrap.append($(btnl).css('background-image', rstr)
                    .css('width', self.btnW)
                    .css('height', self.btnH)
                    .css('background-size', self.btnW))
            }
        }
    }
    //绑定事件
    Swiper.prototype.bindEvent = function () {
        var self = this;
        //绑定事件；
        $('.prev').add('.next').on('click', function () {
            if ($(this).attr('class') == "btn prev") {
                self.nowIndex--;
                self.slider();
            } else if ($(this).attr('class') == "btn next") {
                self.nowIndex++;
                self.slider();
            }
        })
        $('.list li').on('mouseenter', function () {
            self.nowIndex = $(this).index();
            self.slider();
        })
        self.wrap.on('mouseenter', function () {
            $('.btn').show();
            clearInterval(self.timer)
        }).on('mouseleave', function () {
            $('.btn').hide();
            self.sliderAuto();
        })
    }

    //运动赋值函数
    Swiper.prototype.slider = function () {
        var self = this;
        clearInterval(self.timer)
        var itemWidth = self.itemWidth;

        if (self.nowIndex == self.len + 1) {
            $('.img-box').css('left', '0');
            self.nowIndex = 1;
        } else if (self.nowIndex < 0) {
            $('.img-box').css('left', -(itemWidth * self.len) + "px")
            self.nowIndex = self.len - 1;
        }

        self.changeStyle();
        $('.img-box').stop().animate({ left: -(self.nowIndex * itemWidth) }, 300, "linear", function () {
            $('.btn').css('display') === 'block' ? "" : self.sliderAuto();
        })
    }
    //定时器，自动轮播
    Swiper.prototype.sliderAuto = function () {
        var self = this;
        clearInterval(self.timer);
        self.timer = setInterval(function () {
            self.nowIndex++;
            self.slider();
        }, 2000)
    }

    Swiper.prototype.changeStyle = function () {
        var self = this;
        self.dex = self.nowIndex
        if (self.nowIndex == self.len) {
            self.dex = 0;
        }
        $('.active').removeClass('active');
        $('.list li').eq(self.dex).addClass('active');
    }
}($))