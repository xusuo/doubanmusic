var plug = {
    init: function () {
        this.slider();
        this.tab();
        this.input();
    },
    //；轮播图插件---丝般顺滑满血变态plus版；
    slider: function () {
        $('#sliderShowMax').sliderShowMax({
            image: ['img/banner-2736.jpg', 'img/banner-2732.jpg', 'img/banner-2739.jpg', 'img/banner-2734.jpg', 'img/banner-2738.jpg', 'img/banner-2737.jpg', 'img/banner-2733.jpg', 'img/banner-2723.jpg', 'img/banner-2729.jpg', 'img/banner-2727.jpg'],
            button: ['img/btn_right.png'],
            btnSizeW: "36px",
            btnSizeH: "51px"
        })
    },
    tab: function () {
        // 选项卡插件
        $('#tab').tab({
            classify: ['上升最快音乐人', '本周流行音乐人'],
            end: "by:锁",
            content: [
               
                [
                     {
                        img: './image/003.jpg',
                        name: 'P.K.14',
                        classify: '陈立农',
                        decoration: ['无名', '你和我', '手拿鲜花的女人', '冰的世纪']
                    }, {
                        img: './image/004.jpg',
                        name: 'P.K.14',
                        classify: '鹿晗',
                        decoration: ['无名', '你和我', '手拿鲜花的女人', '冰的世纪']
                    }, {
                        img: './image/005.jpg',
                        name: 'P.K.14',
                        classify: '王俊凯',
                        decoration: ['无名', '你和我', '手拿鲜花的女人', '冰的世纪']
                    },
                    {
                        img: './image/005.jpg',
                        name: 'P.K.14',
                        classify: '王俊凯',
                        decoration: ['无名', '你和我', '手拿鲜花的女人', '冰的世纪']
                    },                    {
                        img: './image/002.jpg',
                        name: 'P.K.14',
                        classify: '易烊千玺',
                        decoration: ['无名', '你和我', '手拿鲜花的女人', '冰的世纪']
                    }, {
                        img: './image/003.jpg',
                        name: 'P.K.14',
                        classify: '陈立农',
                        decoration: ['无名', '你和我', '手拿鲜花的女人', '冰的世纪']
                    }, {
                        img: './image/004.jpg',
                        name: 'P.K.14',
                        classify: '鹿晗',
                        decoration: ['无名', '你和我', '手拿鲜花的女人', '冰的世纪']
                    },{
                        img: './image/002.jpg',
                        name: 'P.K.14',
                        classify: '易烊千玺',
                        decoration: ['无名', '你和我', '手拿鲜花的女人', '冰的世纪']
                    }
                ],
                [
                    {
                        img: './image/003.jpg',
                        name: 'P.K.14',
                        classify: '陈立农',
                        decoration: ['无名', '你和我', '手拿鲜花的女人', '冰的世纪']
                    }, {
                        img: './image/002.jpg',
                        name: 'P.K.14',
                        classify: '易烊千玺',
                        decoration: ['无名', '你和我', '手拿鲜花的女人', '冰的世纪']
                    }, {
                        img: './image/004.jpg',
                        name: 'P.K.14',
                        classify: '鹿晗',
                        decoration: ['无名', '你和我', '手拿鲜花的女人', '冰的世纪']
                    }, {
                        img: './image/005.jpg',
                        name: 'P.K.14',
                        classify: '王俊凯',
                        decoration: ['无名', '你和我', '手拿鲜花的女人', '冰的世纪']
                    },
                    {
                        img: './image/004.jpg',
                        name: 'P.K.14',
                        classify: '鹿晗',
                        decoration: ['无名', '你和我', '手拿鲜花的女人', '冰的世纪']
                    }, {
                        img: './image/002.jpg',
                        name: 'P.K.14',
                        classify: '易烊千玺',
                        decoration: ['无名', '你和我', '手拿鲜花的女人', '冰的世纪']
                    }, {
                        img: './image/003.jpg',
                        name: 'P.K.14',
                        classify: '陈立农',
                        decoration: ['无名', '你和我', '手拿鲜花的女人', '冰的世纪']
                    }, {
                        img: './image/005.jpg',
                        name: 'P.K.14',
                        classify: '王俊凯',
                        decoration: ['无名', '你和我', '手拿鲜花的女人', '冰的世纪']
                    }
                ]
            ]
        })
    },
    // input接口
    input: function () {
        $('#nav-search').search({
            text: '唱片名、表演者、条码、ISRC',                //input的placeholder值，默认显示文字；
            btnValue: "搜索",                                //按钮文字
            type: 'GET',                                     //请求类型；
            url: 'https://api.douban.com/v2/music/search',   //通过官方文档获取接口地址；
            data: 'q=',                                      //官方文档规定 + value；
            dataType: 'jsonp',                               //请求内容的方式
            sucFn: addDom,                                   //请求成功的回调函数；
            count: '&count=7',                               //每次请求数据的条数；
            errFn: function () {                              //请求失败的回调函数；
                console.log('error')
            }
        })

        function addDom(data) {
            var dataArr = data.musics,
                len = dataArr.length,
                str = '';
            var oUl = $('<ul class="input-show"></ul>');
            if (len !== 0) {
                dataArr.forEach(function (ele, index) {
                    if (ele.image !== undefined) {
                        var reg = /https:\/\//g;
                        src = ele.image.replace(reg, 'https://images.weserv.nl/?url=')
                    }
                    str += '<li>\
                                <a href="' + ele.mobile_link + '">\
                                    <img src="' + src + '" alt="">\
                                    <span>\
                                        <p class="fir-txt">' + ele.title + '</p>\
                                        <p class="sec-txt">表演者:' + ele.author[0].name + '</p>\
                                    </span>\
                                </a>\
                            </li>';
                })
                oUl.html(str);
                $('#nav-search').append(oUl);
            } else {
                $('.input-show').css('display', 'none');
            }
        }



    }
}
plug.init();