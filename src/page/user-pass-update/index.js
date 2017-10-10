/**
 * Created by liu_zh on 2017/8/13.
 */
'use strict';
require('./index.css');
require("page/common/header/index.js");
require("page/common/nav/index.js");
var navSide = require("page/common/nav-side/index.js");
var _mm = require("util/mm.js");
var _user = require("service/user-service.js");

var page = {
    init: function(){
        this.onLoad();
        this.bindEvent();
    },

    onLoad: function(){
        navSide.init({
            name: 'user-pass-update'
        });
    },
    
    bindEvent : function() {
        var _this = this;
        $(document).on("click", ".btn-submit", function () {
            var userInfo = {
                    password        : $.trim($('#password').val()),
                    passwordNew     : $.trim($('#password-new').val()),
                    passwordConfirm : $.trim($('#password-confirm').val())
                },

                validateResult = _this.validateForm(userInfo);
            if(validateResult.status){
                 _user.updatePassword({
                     passwordOld : userInfo.password,
                     passwordNew : userInfo.passwordNew
                 }, function(res, msg){
                      _mm.successTips(msg);
                 }, function(errMsg){
                     _mm.errorTips(errMsg);
                 })
            }
            else{
                _mm.errorTips(validateResult.msg);
            }
        })
    },

    validateForm: function(formData){
        var result = {
            status : false,
            msg    : ''
        };

        if(!_mm.validate(formData.password, "require")){
            result.msg = "原密码不能为空";
            return result;
        }
        if(!_mm.validate(formData.passwordNew, "require")){
            result.msg = "新密码不能为空";
            return result;
        }
        if(!_mm.validate(formData.passwordConfirm, "require")){
            result.msg = "确认密码不能为空";
            return result;
        }
        
        if(formData.passwordNew.length < 6){
            result.msg = "密码不得小于6位数";
            return result;
        }
        
        if(formData.passwordConfirm !== formData.passwordNew){
            result.msg = "两次输入的密码不相同，请重新输入";
            $('#passwordNew').val('');
            $('#passwordConfirm').val('');
            return result;
        }
        // 通过验证，返回正确提示
        result.status = true;
        result.msg = '验证通过';
        return result;
    }
};

page.init();