/**
 * Created by liu_zh on 2017/8/24.
 */
'use strict';
require('./index.css');

var _mm = require("util/mm.js");
var _payment = require("service/payment-service.js");
var templateIndex = require('./index.string');

var page={
    data:{
        orderNo : _mm.getUrlParam("orderNo")
    },

    init: function(){
        this.onLoad();
    },

    onLoad: function(){
        this.loadPaymentInfo()
    },

    loadPaymentInfo: function(){
        var _this = this,
            paymentHtml = "",
            $content = $(".page-wrap");
        $content.html('<div class="loading"></div>');
        _payment.getPaymentInfo(this.data.orderNo, function(res){
            paymentHtml= _mm.renderHtml(templateIndex,res);
            $content.html(paymentHtml);
            _this.listenOrderStatus();
        }, function(errMsg){
            $content.html('<p class="err-tip">'+errMsg+'</p>');
        })
    },
    // 监听订单状态（轮询）
    listenOrderStatus: function(){
        var _this =this;
        this.paymentTimer = window.setInterval(function(){
            _payment.getPaymentStatus(_this.data.orderNo, function(res){
                if(res == true){
                    window.location.href = './resut.html?type=payment&orderNo=' +_this.data.orderNo;
                }
            }, function(errMsg){
                
            })
        }, 5e3)
    }
};

$(function(){
    page.init();
});