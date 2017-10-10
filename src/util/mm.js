/**
 * Created by liu_zh on 2017/8/6.
 */
"use strict";
var Hogan = require("hogan.js");
var conf = {
    serverHost: ''
};
var _mm = {
    request: function(param) {
        var _this = this;
        $.ajax(
            {
                type: param.method || "get",
                url: param.url || "",
                dataType: param.type || 'json',
                data: param.data || '',
                success: function (res) {
                    if(0 === res.status){
                        typeof param.success === 'function' && param.success(res.data, res.msg )
                    }
                    else if(10 === res.status){
                        _this.doLogin();
                    }
                    else if(1 === res.status){
                        typeof param.error === 'function' && param.error(res.msg);
                    }
                },
                error: function (err) {
                    typeof param.error === 'function' && param.error(err.statusText);
                }

            });
    },
    //获取服务器地址
    getServerUrl: function(path){
        return conf.serverHost + path;
    },
    //获取URL参数
    getUrlParam: function(name){
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        var result = window.location.search.substr(1).match(reg);
        return result?decodeURIComponent(result[2]) : null;
    },
    //成功提示
    successTips : function(msg){
        alert(msg || "操作成功");
    },
    //错误提示
    errorTips: function(msg){
        alert(msg || "哪里不对了~");
    },
    //字段的验证，支持是否为空、手机、邮箱的判断
    validate: function(value, type){
        var value = $.trim(value);
        //非空验证
        if('require' === type){
            return !!value;
        }
        //手机号验证
        else if('phone' === type){
            return /^1\d{10}$/.test(value);
        }
        // 邮箱格式验证
        else if('email' === type){
            return /^(\w)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
        }
    },
    //渲染HTML文档
    renderHtml: function(htmlTemplate, data){
        var template = Hogan.compile(htmlTemplate),
            result = template.render(data);
        return result;
    },
    //统一登录处理
    doLogin: function(){
        window.location.href = './user-login.html?' + encodeURIComponent(window.location.href);
    },
    //    跳回主页
    goHome: function(){
        window.location.href = "./index.html";
    }
};

module.exports = _mm;

