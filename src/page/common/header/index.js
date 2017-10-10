"use strict"

"use strict";
require('./index.css');
var _mm = require('util/mm.js');

// 通用页面头部
var header = {
	init: function(){
		this.bindEvent();
		this.onLoad();
	},

	onLoad : function(){
		var keyword = _mm.getUrlParam('keyword');
		if(keyword){
			$('#search-input').val(keyword);
		}
	},

	bindEvent : function(){
		var _this = this;
		// 点击按钮好，做搜索提交
		$('#search-btn').click(function(){
			_this.searchSubmit();
		});
		// 输入回车后，做搜索提交
		$('#search-input').keyup(function(e){
			if(e.keyCode === 13){
				_this.searchSubmit();
			}
		})
	},
	// 搜索提交
	searchSubmit: function(){
		var keyword = $.trim($('.search-input').val());
		// 如果提交的时候有keyword，正常跳转list页
		if(keyword){
			window.location.href = './list.html?keyword=' + keyword;
		}
		// 失败跳转主页；
		else{
			_mm.goHome();
		}
	}
};

header.init();