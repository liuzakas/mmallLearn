/**
 * Created by liu_zh on 2017/8/24.
 */
"use strict";

var _mm = require('util/mm.js');

var _payment = {
    getPaymentInfo:function(orderNumber, resolve, reject){
        _mm.request({
            url : _mm.getServerUrl('/order/pay.do'),
            data: {
                orderNo:orderNumber
            },
            success: resolve,
            error: reject
        })
    },
    //获取订单状态；
    getPaymentStatus: function(orderNumber, resolve, reject){
        _mm.request({
            url : _mm.getServerUrl('/order/query_order_pay_status.do'),
            data: {
                orderNo:orderNumber
            },
            success: resolve,
            error: reject
        })
    }
};

module.exports = _payment;