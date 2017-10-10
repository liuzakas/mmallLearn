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
var templateIndex = require('./index.string');


var page = {
    init: function(){
        this.onLoad();
    },

    onLoad: function(){
        navSide.init({
            name: 'user-center'
        });
        this.loadUserInfo();
    },
    //加载用户信息
    loadUserInfo: function(){
        _user.getUserInfo(function(res){
            var userHtml = _mm.renderHtml(templateIndex, res);
            $('.panel-body').html(userHtml);
        }, function(errMsg){
            _mm.errorTips(errMsg);
            // window.location.href = "./user-login.html";
        });
    }
};

page.init();