'use strict';
require('./index.css');
require('util/slider/index.js');
var _mm = require("util/mm.js");
var templateBanner = require('./banner.string');


$(function() {
    //渲染banner的Html
    var bannerHtml = _mm.renderHtml(templateBanner);
    $('.banner-con').html(bannerHtml);
    //初始化banner
    var $slider = $('.banner').unslider({
        dots: true
    });
    // 前一张和后一张按钮
    $('.banner-con .banner-arrow').click(function(){
        var forward = $(this).hasClass('prev')?'prev':"next";
        $slider.data('unslider')[forward]();
    })
});

