/**
 * Created by liu_zh on 2017/8/18.
 */
"use strict";

require("./index.css");
var _mm = require("util/mm.js");
var _product = require("service/product-service.js");
var _cart = require("service/cart-service.js");
var templateIndex = require("./index.string");

var page = {
    data: {
        productId  : _mm.getUrlParam('productId') || ''
    },

    init: function(){
        this.onLoad();
        this.bindEvent();
    },

    onLoad: function(){
        if(!this.data.productId){
            _mm.goHome();
        }
        this.loadDetail();
    },

    bindEvent: function(){
        var _this = this;
        // 图片预览
        $(document).on('mouseenter', '.p-img-item', function(){
            var ImageUrl = $(this).find(".p-img").attr('src');
            $(".main-img").attr('src', ImageUrl);
        });

        $(document).on('click', '.p-count-btn', function(){
            var type = $(this).hasClass("plus")? "plus": "minus";
            var  $pCount = $('.p-count'),
                 currentCount = parseInt($pCount.val()),
                 minCount = 1,
                 maxCount = _this.data.detailInfo.stock || 1;

            if(type == 'plus'){
                $pCount.val(currentCount < maxCount?currentCount+1 :maxCount );
            }
            else if(type == "minus"){
                $pCount.val(currentCount > minCount?currentCount-1 :minCount );
            }
        });

        $(document).on('click', '.cart-add', function(){
            if($('.p-count').val() < _this.data.productStock){
                _cart.addToCart({
                    productId : _this.data.productId,
                    count   : $('.p-count').val()
                }, function(){
                    window.location.href = './result.html?type=cart-add';
                }, function(errMsg){
                    _mm.errorTips(errMsg);
                })
            }else{
                _mm.errorTips("很抱歉，库存不足");
            }
        });
    },
    
    //加载商品详情的数据
    loadDetail: function(){
        var _this = this,
            html = '',
            $pageWrap = $('.page-wrap');
        // loading
        $pageWrap.html("<div class='loading'></div>")
        _product.getProductDetail(this.data.productId, function(res){
            _this.data.productStock = res.stock;
            _this.data.detailInfo = res;
            _this.filter(res);
            html = _mm.renderHtml(templateIndex, res);
            $pageWrap.html(html);
        },function(errMsg){
            $pageWrap.html('<p class="err-tip">此商品太淘气，找不到</p>')
        })
    },
    // 数据匹配
    filter: function(data){
        data.subImages = data.subImages.split(',');
    }
};

$(function(){
    page.init();
});