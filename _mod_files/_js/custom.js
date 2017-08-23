/**
*	======================
*	Cmall eshop card popup
*	======================
*/

$(document).ready(function() {


var maxHeight = 0;

$('.tab-content .owl-item').each(function() { jQuery(this).css('height', ''); maxHeight = Math.max(maxHeight, $(this).height()); })
$(".tab-content .owl-carousel").height(maxHeight);
// $(".tab-content .owl-item").height(maxHeight);
	
	$('.b-cmall-eshop-itemD-detail-pic').magnificPopup({
		delegate: 'a', 
		type: 'image',
		gallery: {
			enabled: true
		}
	});
	
	$('.b-cmall-portfolio_item_details-itemD_detail__item-picture-list').magnificPopup({
		delegate: 'a', 
		type: 'image',
		gallery: {
			enabled: true
		}
	});
	
	cmallProductsViewMode.init();
	
	//Slick slider
	var $slickSlider = $('.single-item');
	if($slickSlider.length){
		$slickSlider.on('init', function(){
			$(this).removeClass('slider-loading');
		});
		$slickSlider.slick({
			autoplay: true,
			autoplaySpeed: 4000,
			dots: true,
			infinite: false,
			mobileFirst: true,
			adaptiveHeight: true,
			speed: 500,
			slidesToShow: 1,
			slidesToScroll: 1,
			responsive: [
				{
					breakpoint: 0,
					settings: {
						arrows: false,
						autoplay: false
					}
				},
				{
					breakpoint: 768,
					settings: {
						arrows: true,
						autoplay: true
					}
				}
			]
		});
	}
	
	//разворачивание при нажатии на стрелку
	$('.b-nav__ar, .b-cmall-EshopTreeLeftMenuDropdown__item-link').click(function(){
		var that = $(this).parents('.b-nav__item').children('.b-nav_sub-level2');
		if($.browser.msie && $.browser.version=='7.0')// исправление косяка в ie7
			{
				if (that.is(':visible')){
					that.hide();
				}else {
					that.show();
				}
			}
		else {that.slideToggle(300);
		}
	});

	$('.b-nav__wrap-item_active').parents('.b-nav_sub-level2').show().end().parents('.b-nav__item').siblings().children('.b-nav_sub-level3').hide();
	
	var ordbtn = $('.b-phone__order') ,
		btnreg = $('#btn-reg') ;
	if (ordbtn.length > 0) { 
		ordbtn.fancybox({
			/*height: 420,*/
			width: 300,
			padding: 0,
			scrolling: 'no',
			fitToView: false,
			closeBtn: true,
			helpers:  {
				overlay : { opacity  : 0.31	}
			}
		});
	}
	
});

/**
*	======================
*	END eshop card popup
*	======================
*/

/**
*	======================
*	Cmall tooltip, carousel and eshop card tabs
*	======================
*/

(function($) {

	"use strict";

	// Hedaer tooltip	
	$(".b-cmall-header-links .fa, .tool-tip").tooltip({
	placement: "bottom"
	});
	$(".btn-wishlist, .btn-compare, .display .fa").tooltip('hide');



	$("#owl-product").owlCarousel({
		autoPlay : false, //Set AutoPlay to 3 seconds
		items : 4,
		margin : 10,
		responsiveClass : true,
		responsive : {
			0 : {
				items : 2,
				nav : false,
				},
			320 : {
				items : 2,
				nav : false,
				},
			400 : {
				items : 2,
				nav : false,
				},
			470 : {
				items : 3,
				nav : false,
				},				
			535 : {
				items : 3,
				nav : false,
				},
			700 : {
				items : 4,
				nav : false,
				},
			767 : {
				items : 3,
				nav : false,
				},
			992 : {
				items : 4
				},
			1200 : {
				items : 5
				},
			1366 : {
				items : 5
				},
			1600 : {
				items : 5
				}
		},
		autoplayHoverPause : true,
		nav : true, // Show next and prev buttons
		dots : false,
		navText : ["<span class='glyphicon glyphicon-chevron-left'></span>","<span class='glyphicon glyphicon-chevron-right'></span>"]
	});


	$("#owl-product1").owlCarousel({
		autoPlay : false, //Set AutoPlay to 3 seconds
		items : 4,
		margin : 10,
		responsiveClass : true,
		responsive : {
			0 : {
				items : 2,
				nav : false,
				},
			320 : {
				items : 2,
				nav : false,
				},
			400 : {
				items : 2,
				nav : false,
				},
			470 : {
				items : 3,
				nav : false,
				},				
			535 : {
				items : 3,
				nav : false,
				},
			700 : {
				items : 4,
				nav : false,
				},
			767 : {
				items : 3,
				nav : false,
				},
			992 : {
				items : 4
				},
			1200 : {
				items : 5
				},
			1366 : {
				items : 5
				},
			1600 : {
				items : 5
				}
		},
		autoplayHoverPause : true,
		nav : true, // Show next and prev buttons
		dots : false,
		navText : ["<span class='glyphicon glyphicon-chevron-left'></span>","<span class='glyphicon glyphicon-chevron-right'></span>"]
	});



  $("#owl-product2").owlCarousel({
		autoPlay : false, //Set AutoPlay to 3 seconds
		items : 4,
		margin : 10,
		responsiveClass : true,
		responsive : {
			0 : {
				items : 2,
				nav : false,
				},
			320 : {
				items : 2,
				nav : false,
				},
			400 : {
				items : 2,
				nav : false,
				},
			470 : {
				items : 3,
				nav : false,
				},				
			535 : {
				items : 3,
				nav : false,
				},
			700 : {
				items : 4,
				nav : false,
				},
			767 : {
				items : 3,
				nav : false,
				},
			992 : {
				items : 4
				},
			1200 : {
				items : 5
				},
			1366 : {
				items : 5
				},
			1600 : {
				items : 5
				}
		},
		autoplayHoverPause : true,
		nav : true, // Show next and prev buttons
		dots : false,
		navText : ["<span class='glyphicon glyphicon-chevron-left'></span>","<span class='glyphicon glyphicon-chevron-right'></span>"]
	});
	
	var $owl = $('#owl-product');
	var $owl2 = $('#owl-product1');
	var $owl3 = $('#owl-product2');
	
	$("ul.nav-tabs li:nth-child(1) a").click(function(event) {
		setTimeout(function(){
			var carousel = $('#spec_eshop_special_new .owl-carousel').data('owlCarousel');
			carousel._width = $('#spec_eshop_special_new .owl-carousel').width();
			carousel.invalidate('width');
			carousel.refresh();
			}, 180);
		}
	);
	
	$("ul.nav-tabs li:nth-child(2) a").click(function(event) {
		setTimeout(function(){
			var carousel2 = $('#spec_eshop_special_sales .owl-carousel').data('owlCarousel');
			carousel2._width = $('#spec_eshop_special_sales .owl-carousel').width();
			carousel2.invalidate('width');
			carousel2.refresh();
			}, 180);
		}
	);
	
	$("ul.nav-tabs li:nth-child(3) a").click(function(event) {
		setTimeout(function(){
			var carousel3 = $('#spec_eshop_special_pop .owl-carousel').data('owlCarousel');
			carousel3._width = $('#spec_eshop_special_pop .owl-carousel').width();
			carousel3.invalidate('width');
			carousel3.refresh();
			}, 180);
		}
	);
	
	$(window).bind('resize', function(e) {
		window.resizeEvt;
		$(window).resize(function() {
			clearTimeout(window.resizeEvt);
			window.resizeEvt = setTimeout(function() {
				var maxHeight = 0;
				$('.tab-content .owl-item').each(function() { jQuery(this).css('height', ''); maxHeight = Math.max(maxHeight, $(this).height()); })
				$(".tab-content .owl-carousel").height(maxHeight);
				},  200);
			}
		);
	});
	
	$("#owl-product3").owlCarousel({
		autoPlay : false, //Set AutoPlay to 3 seconds
		items : 4,
		margin : 20,
		responsiveClass : true,
		responsive : {
			0 : {
				items : 2,
				nav : false,
				},
			320 : {
				items : 2,
				nav : false,
				},
			400 : {
				items : 2,
				nav : false,
				}, 
			535 : {
				items : 3,
				nav : false,
				},
			700 : {
				items : 3,
				nav : false,
				},
			767 : {
				items : 4
				},
			992 : {
				items : 5
				},
			1200 : {
				items : 6
				},
			1366 : {
				items : 6
				},
			1600 : {
				items : 6
				}
		},
		autoplayHoverPause : true,
		nav : true, // Show next and prev buttons
		dots : false,
		navText : ["<span class='glyphicon glyphicon-chevron-left'></span>","<span class='glyphicon glyphicon-chevron-right'></span>"]
	});
	
	
	$("#owl-product4").owlCarousel({
		autoPlay : false, //Set AutoPlay to 3 seconds
		items : 4,
		margin : 20,
		responsiveClass : true,
		responsive : {
			0 : {
				items : 2,
				nav : false,
				},
			320 : {
				items : 2,
				nav : false,
				},
			400 : {
				items : 2,
				nav : false,
				}, 
			535 : {
				items : 3,
				nav : false,
				},
			700 : {
				items : 3,
				nav : false,
				},
			767 : {
				items : 4
				},
			992 : {
				items : 5
				},
			1200 : {
				items : 6
				},
			1366 : {
				items : 6
				},
			1600 : {
				items : 6
				}
		},
		autoplayHoverPause : true,
		nav : true, // Show next and prev buttons
		dots : false,
		navText : ["<span class='glyphicon glyphicon-chevron-left'></span>","<span class='glyphicon glyphicon-chevron-right'></span>"]
	});

	$("#owl-product5").owlCarousel({
		autoPlay : false, //Set AutoPlay to 3 seconds
		items : 8,
		margin : 10,
		responsiveClass : true,
		responsive : {
			0 : {
				items : 4,
				nav : false,
				dots : false,
				},
			320 : {
				items : 4,
				nav : false,
				dots : false,
				},
			400 : {
				items : 6,
				nav : false,
				dots : false,
				}, 
			535 : {
				items : 6,
				nav : false,
				dots : false,
				},
			1600 : {
				items : 8,
				nav : false,
				dots : false,
				}
		},
		autoplayHoverPause : true,
		nav : true, // Show next and prev buttons
		dots : false,
		navText : ["<span class='b-cmall-eshop-card-cf__arrow glyphicon glyphicon-chevron-left hidden-xs hidden-sm'></span>","<span class='b-cmall-eshop-card-cf__arrow glyphicon glyphicon-chevron-right hidden-xs hidden-sm'></span>"]
	});

	$("#owl-product6").owlCarousel({
		autoPlay : false, //Set AutoPlay to 3 seconds
		items : 4,
		margin : 10,
		responsiveClass : true,
		responsive : {
			0 : {
				items : 2,
				nav : false,
				},
			320 : {
				items : 2,
				nav : false,
				},
			400 : {
				items : 2,
				nav : false,
				},
			470 : {
				items : 3,
				nav : false,
				},				
			535 : {
				items : 3,
				nav : false,
				},
			700 : {
				items : 4,
				nav : false,
				},
			767 : {
				items : 3,
				nav : false,
				},
			992 : {
				items : 4
				},
			1200 : {
				items : 5
				},
			1366 : {
				items : 5
				},
			1600 : {
				items : 5
				}
		},
		autoplayHoverPause : true,
		nav : true, // Show next and prev buttons
		dots : false,
		navText : ["<span class='glyphicon glyphicon-chevron-left'></span>","<span class='glyphicon glyphicon-chevron-right'></span>"]
	});

	$("#owl-news").owlCarousel({
		autoPlay : false, //Set AutoPlay to 3 seconds
		items : 3,
		margin : 30,
		responsiveClass : true,
		responsive : {
			0 : {
				items : 1,
				nav : false,
				autoHeight : true
				},
			320 : {
				items : 1,
				nav : false,
				autoHeight : true
				},
			400 : {
				items : 1,
				nav : false,
				autoHeight : true
				}, 
			535 : {
				items : 1,
				nav : false,
				autoHeight : true
				},
			700 : {
				items : 2,
				nav : false,
				},
			767 : {
				items : 2,
				nav : false,
				},
			992 : {
				items : 3
				},
			1200 : {
				items : 3
				},
			1366 : {
				items : 3
				},
			1600 : {
				items : 3
				}
		},
		autoplayHoverPause : true,
		nav : true, // Show next and prev buttons
		dots : false,
		navText : ["<span class='glyphicon glyphicon-chevron-left'></span>","<span class='glyphicon glyphicon-chevron-right'></span>"]
	});
	
	// Eshop card tabs
	$('.nav-tabs').on('click', 'a', function (e) {
		e.preventDefault();
		$(this).tab('show');
	});	
	
})(jQuery);

/**
*	======================
*	END Cmall tooltip, carousel and eshop card tabs
*	======================
*/

/**
*	======================
*	Cmall eshop list change view
*	======================
*/


var cmallProductsViewMode = {
	
	viewModeSwitchSelector : '#select_viev_panel',
	
	init : function(){
		this.$viewModeSwitch = $(this.viewModeSwitchSelector);
		if(this.$viewModeSwitch.length){
			var self = this;
			
			this.windowWidthType = this.getWindowWidthType();
			
			if(this.windowWidthType == 'small'){
				this.setListMode();
			}else{
				var eShopViewMode = AMI.Cookie.get('cmall_pvm');
				if(eShopViewMode){
					if(eShopViewMode == 'grid') this.setGridMode();
					else if(eShopViewMode == 'list') this.setListMode();
				}
			}
			
			$('.b-cmall-eshop-item-list-body-items__loading').removeClass('b-cmall-eshop-item-list-body-items__loading');
			
			$('.b-cmall-eshop-list-body-items-sort__item-grid').click(function(){
				self.setGridMode();
			});
			$('.b-cmall-eshop-list-body-items-sort__item-list').click(function(){
				self.setListMode();
			});
			
			$(window).resize(function(){
				var curWindowWidthType = self.getWindowWidthType();
				if(curWindowWidthType == 'small'){
					if(self.windowWidthType == 'normal'){
						self.setListMode();
					}
				}else{
					if(self.windowWidthType == 'small'){
						self.setGridMode();
					}
				}
				self.windowWidthType = curWindowWidthType;
			});
		}
	},
	
	getWindowWidthType : function(){
		return (this.$viewModeSwitch.is(':visible')) ? 'normal' : 'small';
		
	},
	
	setListMode : function(){
		$('.b-cmall-eshop-list-item-row__item-wrapper').removeClass('col-lg-3 col-md-4 col-sm-4');
		$('.b-cmall-eshop-list-item-row__item-wrapper').addClass('col-xs-12');
		$('.b-cmall-eshop-list-item-row__item').addClass('b-cmall-eshop-list-item-row__item-list clearfix');
		$('.b-cmall-eshop-list-item-row__item-pic').addClass('col-lg-2 col-md-1 col-sm-1 col-xs-4 pull-left');
		$('.b-cmall-eshop-list-item-row__item-desc').addClass('col-lg-10 col-md-11 col-sm-11 col-xs-8 pull-left');
		$('.b-cmall-eshop-list-body-items-sort__item-list').removeClass('b-cmall-eshop-list-body-items-sort__item-disabled');
		$('.b-cmall-eshop-list-body-items-sort__item-grid').removeClass('b-cmall-eshop-list-body-items-sort__item-active');
		$('.b-cmall-eshop-list-body-items-sort__item-list').addClass('b-cmall-eshop-list-body-items-sort__item-active');
		$('.b-cmall-eshop-list-body-items-sort__item-grid').addClass('b-cmall-eshop-list-body-items-sort__item-disabled');
		
		$('#eshop-item-list__switcher-1').attr('checked', true);
		$('#eshop-item-list__switcher-2').attr('checked', false);
		AMI.Cookie.set('cmall_pvm', 'list', 3600*24*30);
	},
	
	setGridMode : function(){
		$('.b-cmall-eshop-list-item-row__item-wrapper').removeClass('col-xs-12');
		$('.b-cmall-eshop-list-item-row__item-wrapper').addClass('col-lg-3 col-md-4 col-sm-4');
		$('.b-cmall-eshop-list-item-row__item').removeClass('b-cmall-eshop-list-item-row__item-list clearfix');
		$('.b-cmall-eshop-list-item-row__item-pic').removeClass('col-lg-2 col-md-1 col-sm-1 col-xs-4 pull-left');
		$('.b-cmall-eshop-list-item-row__item-desc').removeClass('col-lg-10 col-md-11 col-sm-11 col-xs-8 pull-left');
		$('.b-cmall-eshop-list-body-items-sort__item-list').removeClass('b-cmall-eshop-list-body-items-sort__item-active');
		$('.b-cmall-eshop-list-body-items-sort__item-grid').removeClass('b-cmall-eshop-list-body-items-sort__item-disabled');
		$('.b-cmall-eshop-list-body-items-sort__item-list').addClass('b-cmall-eshop-list-body-items-sort__item-disabled');
		$('.b-cmall-eshop-list-body-items-sort__item-grid').addClass('b-cmall-eshop-list-body-items-sort__item-active');
		
		$('#eshop-item-list__switcher-1').attr('checked', false);
		$('#eshop-item-list__switcher-2').attr('checked', true);
		AMI.Cookie.set('cmall_pvm', 'grid', 3600*24*30);
	},
	
	end : ''
}


/**
*	======================
*	END Cmall eshop list change view
*	======================
*/


/**
*	======================
*	Cmall eshop card review
*	======================
*/

function reviewsInit(){
	var h = window.location.hash;
	if(h.indexOf('#forumForm') != -1){
		$('.b-card__tabs-item-reviews').click();
		window.location.hash = '';
		window.location.hash = h;
	}
}

/**
*	======================
*	END Cmall eshop card review
*	======================
*/



/**
*	======================
*	Filter price range slider
*	======================
*/

var cmallPriceRangeSlider = {
	
	slidersClass : 'cmallPriceRangeSlider',
	
	init : function(){
		var $sliders = $('.' + this.slidersClass);
		if($sliders.length){
			var self = this;
			$sliders.each(function(){
				self.initSlider($(this));
			});
		}
	},
	
	initSlider : function($sliderBox){
		var $slider = $sliderBox.find('.' + this.slidersClass + '__slider');
		
		var $priceFromField = $sliderBox.find('input[name=price_from]');
		var $priceToField = $sliderBox.find('input[name=price_to]');
		
		var rangeMin = parseFloat($priceFromField.data('rangeMin')) || 0;
		var rangeMax = parseFloat($priceToField.data('rangeMax')) || 0;
		var valueFrom = (!isNaN(parseFloat($priceFromField.val()))) ? parseFloat($priceFromField.val()) : rangeMin;
		var valueTo = (!isNaN(parseFloat($priceToField.val()))) ? parseFloat($priceToField.val()) : rangeMax;
		
		var rangeStep = 1;
		rangeMax = Math.ceil(rangeMax);
		if(rangeMax > 500){
			rangeStep = 1;
		}
		if(rangeMax > 5000){
			rangeStep = 1;
		}
		if(rangeMax > 50000){
			rangeStep = 1;
		}

		var self = this;
		
		$slider.slider({
			range:true,
			min:rangeMin,
			max:rangeMax,
			values:[valueFrom,valueTo],
			step:rangeStep,
			slide:function(event,ui){
				var $sliderBox = $(event.target).closest('.' + self.slidersClass);
				var min = $(this).slider('option', 'min');
				var max = $(this).slider('option', 'max');
				var updField, value;
				if(ui.value == ui.values[0]){
					updField = 'price_from';
					value = (ui.value == min) ? '' : ui.value;
				}else{
					updField = 'price_to';
					value = (ui.value == max) ? '' : ui.value;
				}
				$sliderBox.find('input[name=' + updField + ']').val(ui.value);

			}
		});
		
		$priceFromField.change(function(event){
			var $sliderBox = $(event.target).closest('.' + self.slidersClass);
			var $slider = $sliderBox.find('.' + self.slidersClass + '__slider');
			$slider.slider("values", 0, $(event.target).val());
		});
		$priceToField.change(function(){
			var $sliderBox = $(event.target).closest('.' + self.slidersClass);
			var $slider = $sliderBox.find('.' + self.slidersClass + '__slider');
			$slider.slider("values", 1, $(event.target).val());
		});
		
	},
	
	end : ''
}

$(function(){
	cmallPriceRangeSlider.init();
});

/**
*	======================
*	END Filter price range slider
*	======================
*/


/* ====================== */
/* quantity change */
/* ====================== */
(function($){
$.fn.qtyChange = function(options){
	
	var settings = $.extend({
		classBase : 'qtyChange',

		qtyMinVal : 1, //минимальное значение поля
		qtyMaxVal : 0, //максимальное значение поля, которое можно ввести с использованием кнопок (0 - не ограничено)
		qtyStep : 1, //шаг изменения значения поля

		btnPosition : 'sides', //расположение кнопок. sides - с разных сторон ( - поле + ), left - слева ( +/- поле), right - справа (поле +/-)
		btnPlusText : '+', //текст кнопки +
		btnMinusText : '-', //текст кнопки -
		
		addButtons : true,
		addWrapper : true,
		
		triggerChange : true,
		changeDelay : 0,
		afterChangeVal : false
	}, options);
	
	var init = function(){
		
		if(!$(this).data('qtyChange')){
			
			$(this).addClass(settings.classBase + '__qty');
			
			if(settings.addWrapper){
				if(!$(this).closest('.' + settings.classBase + '__wrapper').length){
					$(this).wrap('<span class="' + settings.classBase + '__wrapper"></span>');
				}
			}
			var wrapper = $(this).closest('.' + settings.classBase + '__wrapper');
			
			if(settings.addButtons){
				if(!wrapper.find('.' + settings.classBase + '__plus').length || !wrapper.find('.' + settings.classBase + '__minus').length){
					var btnPlusHtml = '';
					var btnMinusHtml = '';
					if(!wrapper.find('.' + settings.classBase + '__plus').length)
						btnPlusHtml = '<span class="' + settings.classBase + '__plus">' + settings.btnPlusText + '</span>';
					if(!wrapper.find('.' + settings.classBase + '__minus').length)
						btnMinusHtml = '<span class="' + settings.classBase + '__minus">' + settings.btnMinusText + '</span>';
					
					if(settings.btnPosition == 'left'){
						$(this).before(btnMinusHtml + btnPlusHtml);
					}else if(settings.btnPosition == 'right'){
						$(this).after(btnMinusHtml + btnPlusHtml);
					}else{
						$(this).before(btnMinusHtml);
						$(this).after(btnPlusHtml);
					}
				}
			}
			
			wrapper.find('.' + settings.classBase + '__plus').off('click.' + settings.classBase);
			wrapper.find('.' + settings.classBase + '__minus').off('click.' + settings.classBase);
			wrapper.find('.' + settings.classBase + '__qty').off('change.' + settings.classBase);
			
			wrapper.find('.' + settings.classBase + '__plus').on('click.' + settings.classBase, function(){
					changeQtyVal(this, 'plus');
			});
			wrapper.find('.' + settings.classBase + '__minus').on('click.' + settings.classBase, function(){
					changeQtyVal(this, 'minus');
			});
			wrapper.find('.' + settings.classBase + '__qty').on('change.' + settings.classBase, function(){
					changeQtyVal(this, '');
			});
				
			$(this).data('qtyChange', {});
		}
	};
	
	var changeQtyVal = function(el, action){
		
		var qty = $(el).closest('.' + settings.classBase + '__wrapper').find('.' + settings.classBase + '__qty');
		var originalVal = qty.val();
		var val = parseInt(qty.val());

		if(isNaN(val) || val == ""){
			val = settings.qtyMinVal;
		}

		if(action == 'plus'){
			val += settings.qtyStep;
		}else if(action == 'minus'){
			val -= settings.qtyStep;
		}

		if(val < settings.qtyMinVal){
			val = settings.qtyMinVal
		}
		if(settings.qtyMaxVal != 0){
			if(val > settings.qtyMaxVal){
				val = settings.qtyMaxVal
			}
		}
		
		if(originalVal != val){
			qty.val(val);
			
			if(typeof(settings.afterChangeVal) == 'function'){
				settings.afterChangeVal(qty);
			}
			
			if(settings.triggerChange){
				var changeDelay = parseInt(settings.changeDelay);
				changeDelay = (isNaN(changeDelay)) ? 300 : changeDelay;
				if(changeDelay > 0){
					if(window.qtyChangeTimeout){
						clearTimeout(window.qtyChangeTimeout);
						window.qtyChangeTimeout = null;
					}
					window.qtyChangeTimeout = setTimeout(function(){
						qty.change();
					}, changeDelay);
				}else{
					qty.change();
				}
			}
		}
	}

	return this.each(init);
	
	};
})(jQuery);

$(function(){
	$('.qtyChange__qty').qtyChange({
		addButtons : false,
		addWrapper : false
	});
});