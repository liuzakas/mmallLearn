/**
 * Created by liu_zh on 2017/8/14.
 */
'use strict';
require('./index.css');
require("page/common/header/index.js");
require("page/common/nav/index.js");
var navSide = require("page/common/nav-side/index.js");
var _mm = require("util/mm.js");
var _user = require("service/user-service.js");
var templateIndex = require('./index.string');

var page = {
    init: function(){
        this.onLoad();
        this.bindEvent();
    },

    onLoad: function(){
        navSide.init({
            name: 'user-center'
        });
        this.loadUserInfo();
    },
    
    bindEvent: function(){
        var _this = this;
        $(document).on('click',".btn-submit",function(){
            var userInfo = {
                phone     : $.trim($('#phone').val()),
                email     : $.trim($('#email').val()),
                question  : $.trim($('#question').val()),
                answer    : $.trim($('#answer').val())
                },

                validateResult = _this.validateForm(userInfo);
            if(validateResult.status){
                _user.updateUserInfo(userInfo, function(res, msg){
                    _mm.successTips(msg);
                    window.location.href = "./user-center.html";
                }, function(errMsg){
                    _mm.errorTips(errMsg);
                })
            }
            else{
                _mm.errorTips(validateResult.msg);
            }
        });
    },
    
    //加载用户信息
    loadUserInfo: function(){
        _user.getUserInfo(function(res){
            var userHtml = _mm.renderHtml(templateIndex, res);
            $('.panel-body').html(userHtml);
        }, function(errMsg){
            _mm.errorTips(errMsg);
        });
    },

    validateForm: function(formData){
        var result = {
            status : false,
            msg    : ''
        };

        if(!_mm.validate(formData.phone, "phone")){
            result.msg = "电话号码格式错误";
            return result;
        }
        if(!_mm.validate(formData.email, "email")){
            result.msg = "电子邮箱格式错误";
            return result;
        }
        if(!_mm.validate(formData.question, "require")){
            result.msg = "密码提示问题不能为空";
            return result;
        }
        if(!_mm.validate(formData.answer, "require")){
            result.msg = "密码提示问题答案不能为空";
            return result;
        }
        // 通过验证，返回正确提示
        result.status = true;
        result.msg = '验证通过';
        return result;
    }
};

page.init();