/**
 * Created by liu_zh on 2017/8/15.
 */
'use strict';
require('./index.css');
require('util/slider/index.js');
var _mm = require("util/mm.js");
var _product = require("service/product-service.js");
var templateIndex = require("./index.string");
var Pagination = require("util/pagination/index.js");

var page = {
    data: {
        listParam : {
            keyword    : _mm.getUrlParam('keyword') || '',
            categoryId : _mm.getUrlParam('categoryId') || '',
            orderBy    : _mm.getUrlParam('orderBy') || 'default',
            pageNum    : _mm.getUrlParam('pageNum') || 1,
            pageSize   : _mm.getUrlParam('orderBy') || 20
        }
    },

    init: function(){
        this.onLoad();
        this.bindEvent();
    },

    onLoad: function(){
        this.loadList();
    },

    bindEvent: function(){
        var _this = this;
        // 排序点击事件
        $('.sort-item').click(function(){
            //当前页设置为1
            _this.data.listParam.pageNum = 1;
            var $this = $(this);
            //点击默认排序
            if($this.data("type") === 'default'){
                if($this.hasClass('active')){
                    return;
                }
                else{
                    $this.addClass('active').siblings('.sort-item').removeClass('active asc desc');
                    _this.data.listParam.orderBy = "default";
                }
            }
            //    点击价格排序
            else if($this.data("type") === 'price'){
                // active class的处理
                $this.addClass("active").siblings('.sort-item').removeClass('active asc desc');
                //升序降序的处理
                if(!$this.hasClass("asc")){
                    $this.addClass("asc").removeClass('desc');
                    _this.data.listParam.orderBy = "price_asc";
                }
                else{
                    $this.addClass("desc").removeClass('asc');
                    _this.data.listParam.orderBy = "price_desc";
                }
            }
            //重新加载列表
            _this.loadList();
        })
    },

    loadList: function(){
        var _this = this,  //暂时理解为page
            listHtml = '',
            listParam = this.data.listParam;
        var $pListCon = $('.p-list-con');
        $pListCon.html('<div class="loading"></div>');
        // 删除不必要的参数
        listParam.categoryId?(delete listParam.keyword) : (delete listParam.categoryId);
        // 请求接口
        _product.getProductList(listParam,
        function(res){
            listHtml = _mm.renderHtml(templateIndex, {
                list: res.list
            });
            $(".p-list-con").html(listHtml);
            _this.loadPagination({
                hasPreviousPage : res.hasPreviousPage,
                prePage         : res.prePage,
                hasNextPage     : res.hasNextPage,
                NextPage        : res.NextPage,
                pageNum         : res.pageNum,
                pages           : res.pages
            });
        },
        function(errMsg){
            _mm.errorTips(errMsg);

        })
    },
    //加载分页信息
    loadPagination: function(pageInfo){
        var _this = this;
        this.pagination? '': ( this.pagination = new Pagination());
        this.pagination.render($.extend({}, pageInfo, {
            container    : $(".pagination"),
            onSelectPage : function(pageNum){
                _this.data.listParam.pageNum = pageNum;
                _this.loadList();
            }
        }))
    }
};

$(function(){
    page.init();
});