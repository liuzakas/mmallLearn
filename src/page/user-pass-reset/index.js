/**
 * Created by liu_zh on 2017/8/13.
 */
"use strict";

require("./index.css");
require("page/common/nav-simple/index.js");
var _user = require('service/user-service.js');
var _mm = require("util/mm.js");

// 表单里的错误提示
var formError = {
    show : function(errMsg){
        $('.error-item').show().find('.err-msg').text(errMsg);
    },
    hide : function(){
        $('.error-item').hide().find('.err-msg').text('');
    }
};

//page逻辑部分
var page = {
    data:{
        username : '',
        question : '',
        answer   : '',
        token    : ''
    },
    init: function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function(){
        this.loadStepUsername();
    }
    ,
    bindEvent: function(){
        var _this = this;

        // 输入用户名，点击下一步
        $("#submit-username").click(function(){
            var username = $('#username').val();
            //用户名存在
            if(username){
                _user.getQuestion(username, function(res){
                    _this.data.username = username;
                    _this.data.question = res;
                    _this.loadStepQuestion();
                }, function(errMsg){
                    formError.show(errMsg);
                });
            }
            // 用户名不存在
            else{
                formError.show('请输入用户名');
            }
        });

        // 输入密码答案，点击下一步
        $("#submit-question").click(function(){
            var answer = $('#answer').val();
            //用户名存在
            if(answer){
                //检查密码提示问题答案
                _user.checkAnswer({
                    username : _this.data.username,
                    question : _this.data.question,
                    answer   : answer
                }, function(res){
                    _this.data.answer = answer;
                    _this.data.token = res;
                    _this.loadStepPassword();
                }, function(errMsg){
                    formError.show(errMsg);
                });
            }
            // 为空时
            else{
                formError.show('请输入密码提示问题的答案');
            }
        });


        // 输入新密码，点击下一步
        $("#submit-password").click(function(){
            var password = $('#password').val();
            //用户名存在
            if(password && password.length>=6){
                //检查密码提示问题答案
                _user.resetPassword({
                    username      : _this.data.username,
                    passwordNew   : password,
                    forgetToken   : _this.data.token
                }, function(res){
                    window.location.href = './result.html?type=pass-reset';
                }, function(errMsg){
                    formError.show(errMsg);
                });
            }
            // 为空时
            else{
                formError.show('请输入不少于6位的新密码');
            }
        });
        
        // 按下回车提交
        $('.user-content').keyup(function(e){
            if(e.keyCode === 13){
                _this.submit();
            }
        });
    },
    // 加载第一步——输入用户名
    loadStepUsername: function(){
        $('.step-username').show();
    },
    // 加载第二步——输入密码提示问题答案
    loadStepQuestion: function(){
        //清除错误提示
        formError.hide();
        //容器切换
        $('.step-username').hide().siblings('.step-question').show()
                                  .find('.question').text(this.data.question);
    },
    // 加载第三步——重置密码
    loadStepPassword: function(){
        //清除错误提示
        formError.hide();
        //容器切换
        $('.step-question').hide().siblings('.step-password').show()
    },
};

$(function(){
    page.init();
});