	
cmallCart = {
	cartCountCookie 		: 'eshop_cart_count',
	cartTotalCookie 		: 'eshop_cart_total',
	cartTotalPlainCookie 	: 'eshop_cart_total_plain',
	bigCartContent 			: '.b-cart-body',
	
	costFormat : {
		//кол-во знаков после запятой
		decimalNum 			: (window.amiEshopSettings) ? ((amiEshopSettings.numberDecimals) ? parseInt(amiEshopSettings.numberDecimals) : 2) : 2,
		
		//разделитель целой и дробной частей
		decimalSplitter 	: (window.amiEshopSettings) ? ((amiEshopSettings.decimalPoint) ? amiEshopSettings.decimalPoint : '.') : '.',
		
		//разделитель тысяч
		thousendsSplitter 	: (window.amiEshopSettings) ? ((amiEshopSettings.thousandsSeparator) ? amiEshopSettings.thousandsSeparator : ' ') : ' ',
		
		//префикс (например '$': $120.50)
		prefix 				: (window.amiEshopSettings) ? ((amiEshopSettings.currencyPrefix) ? (amiEshopSettings.currencyPrefix + ' ') : '') : '',
		
		//постфикс (например ' руб.': 120.50 руб.)
		postfix 			: (window.amiEshopSettings) ? ((amiEshopSettings.currencyPostfix) ? (' ' + amiEshopSettings.currencyPostfix) : ' р.') : ' р.'
	},

	formatCost: function(cost){
		if(typeof cost === 'undefined'){
			return '';
		}
		cost = parseFloat(cost);
		if(isNaN(cost)){
			return '';
		}
		if((this.costFormat.decimalNum < 0)||(isNaN(this.costFormat.decimalNum))){
			this.costFormat.decimalNum = 0;
		}
		var z = Math.pow(10,this.costFormat.decimalNum);
		cost = Math.round(cost*z)/z;
		if(this.costFormat.decimalNum > 0){
			var dec = (cost - Math.floor(cost))*z;
			if(dec == 0){
				var decStr = new Array(this.costFormat.decimalNum + 1).join('0');
				decStr = this.costFormat.decimalSplitter + decStr;
			}else{
				var decStr = this.costFormat.decimalSplitter + dec;
			}
		}else{
			var decStr = '';
		}
		
		var _intStr = Math.floor(cost) + '';
		var intStr = '';
		var countDigits = 0;
		for (var i = (_intStr.length - 1); i >= 0; i--){
		  var curDigit = _intStr.substr(i, 1);
		  if (countDigits % 3 == 0 && countDigits != 0 && !isNaN(parseFloat(curDigit))){ 
			intStr = this.costFormat.thousendsSplitter + intStr;
		  }
		  intStr = curDigit + intStr;
		  countDigits++;
		}
		return this.costFormat.prefix + intStr + decStr + this.costFormat.postfix;
	},
	
	getItemsNumber : function(count, words){
		var res, i, j;
		i = count % 100;
		if (i >= 11 && i <= 19) {
			res = count + ' ' + words[2];
		}
		else {
			j = count % 10;
			switch (j){
				case (1): res = count + ' ' + words[0]; break;
				case (2):
				case (3):
				case (4): res = count + ' ' + words[1]; break;
				default: res = count + ' ' + words[2];
			}
		}
	return res;
	},
	
	/**
	*	Получение данных о содержимом корзины
	*/
	getCartContent : function(){
		var self = this;
		var locale = 'ru';
		if (typeof(AMI_SessionData['locale']) != 'undefined'){
			locale = AMI_SessionData['locale'];
		}
		$.getJSON(frontBaseHref + 'cmall_cart_content.php?locale=' + locale, function(cartData){
			cartData = cartData.data;
			//console.log(cartData);
			AMI.Message.send('ON_CART_DATA_UPDATED', cartData, {});
		});
	},
	
	end : ''
}

cmallCart.onAddToCart = {
	
	getPopUpContent : function(cartItemData){
		//console.log(cartItemData);
		var html = '';
		var props = '';
		if(cartItemData.propId){
			if(cartItemData.aPropInfo.length){
				for(var i = 0; i < cartItemData.aPropInfo.length; i++){
					props 	+= 	'<div class="b-cmall-cart-popup__content-property text-left">'
							+		'<span class="b-cmall-cart-popup__content-property-name">' + cartItemData.aPropInfo[i].name + ':</span>'
							+		'<span class="b-cmall-cart-popup__content-property-value">' + cartItemData.aPropInfo[i].value + '</span>'
							+	'</div>';
				}
			}
		}
		var price = parseFloat(cartItemData.price);
		var price_original = parseFloat(cartItemData.price_original);
		/*
		var decBase = Math.pow(10, cmallCart.costFormat.decimalNum);
		price = Math.round(price*decBase)/decBase;
		*/
		var total = price * cartItemData.qty;
		
		html 	+=	'<div class="modal-header b-cmall-eshop-cart-added-modal__header">'
				+		'<button aria-hidden="true" data-dismiss="modal" class="close b-cmall-eshop-cart-added-modal__header-close-button" type="button">×</button>'
				+		'<div id="CmallCartLabel" class="b-cmall-eshop-cart-added-modal__header-title modal-title">Вы добавили в корзину</div>'
				+	'</div>'
				+	'<div class="modal-body b-cmall-eshop-cart-added-modal__body">'
				+		'<div class="row">'
				+			'<div class="col-md-2 col-xs-12 margin-bottom-30">'
			if(cartItemData.ext_img_small){
				html +=				'<img class="img-thumbnail img-responsive" src="' + cartItemData.ext_img_small + '" alt="' + cartItemData.header + '">'
			}else{
				html +=				'<img class="img-thumbnail img-responsive" src="_img/cmall/icon__CmallEmptyImg.png" alt="' + cartItemData.header + '">'
			}
				html +=		'</div>'
				+			'<div class="col-md-8 col-xs-7">'
				+				'<div class="b-cmall-cart-popup__content-title">' + cartItemData.header + '</div>'
				+				'<div class="b-cmall-cart-popup__content-quantity text-left">'
				+					'<span class="b-cmall-cart-popup__content-quantity-name">Количество:</span> '
				+					'<span class="b-cmall-cart-popup__content-quantity-value">'
				+						'<span>' + cartItemData.qty + '</span> шт'
				+					'</span>'
				+					'<div class="b-cmall-cart-popup__content-quantity-count">'
				+						'<div class="b-cmall-cart-popup__content-quantity-count-btn b-cmall-cart-popup__content-quantity-count-btn-left" '
				+						'onclick="cmallCart.onAddToCart.qtyDown(this)">'
				+							'<i></i>'
				+						'</div>'
				+						'<div class="b-cmall-cart-popup__content-quantity-count-field">'
				+							'<div class="b-cmall-cart-popup__content-quantity-count-counter">'
				+								'<input type="text" placeholder="" value="' + cartItemData.qty 
				+								'" class="b-cmall-cart-popup__content-quantity-count-input" '
				+								'onchange="cmallCart.onAddToCart.recalcItem(' 	+ cartItemData.itemId + ', '
																								+ cartItemData.propId + ', '
																								+ cartItemData.priceNum + ', this);">'
				+							'</div>'
				+						'</div>'
				+						'<div class="b-cmall-cart-popup__content-quantity-count-btn b-cmall-cart-popup__content-quantity-count-btn-right" '
				+						'onclick="cmallCart.onAddToCart.qtyUp(this)">'
				+							'<i></i>'
				+						'</div>'
				+					'</div>'
				+				'</div>'
				+				props
				+			'</div>'
				+			'<div class="col-md-2 col-xs-5">'
				+				'<div class="b-cmall-cart-popup__content-price">'
				+					'<div class="b-cmall-cart-popup__content-price-name">Цена</div>'
				+					'<div class="b-cmall-cart-popup__content-price-total">' + cmallCart.formatCost(total) + '</div>';
			if(cartItemData.qty > 1){
				html +=				'<div class="b-cmall-cart-popup__content-price-desc">' + cartItemData.qty + ' x ' + cmallCart.formatCost(price) + '</div>';
			}
			if(price_original != price){
				html +=				'<div class="b-cmall-cart-popup__content-price-old-title">Скидка</div>'
					 +				'<div class="b-cmall-cart-popup__content-price-old">' + cmallCart.formatCost(price_original) + '</div>';
			}
		html +=					'</div>'
				+			'</div>'
				+		'</div>'
				+	'</div>'
				+	'<div class="modal-footer text-center b-cmall-eshop-cart-added-modal__footer">'
				+		'<div class="row">'
				+			'<div class="col-xs-12 col-sm-6 col-md-6">'
				+				'<button data-dismiss="modal" class="btn-u b-cmall-eshop-cart-added-modal__footer-button-continue" type="button">Продолжить покупки</button>'
				+			'</div>'
				+			'<div class="col-xs-12 col-sm-6 col-md-6 b-cmall-eshop-cart-added-modal__footer-button">'
				+				'<button class="btn btn-primary modal-cart-order-btn b-cmall-eshop-cart-added-modal__footer-button-order" type="button">Оформить заказ</button>'
				+			'</div>'
				+		'</div>'
				+	'</div>';
		html = ''
			 +		'<div class="modal-dialog">'
			 +			'<div class="modal-content text-center no-rounded b-cmall-eshop-cart-added-modal">' + html + '</div>'
			 +		'</div>';
		return html;
	},
	
	
	
	showPopUp : function(popUpContent){
		
		if(!$('#CmallCartModal').length){
			$('body').append('<div class="modal fade" id="CmallCartModal" tabindex="-1" role="dialog" aria-labelledby="CmallCartLabel" aria-hidden="true"></div>');
		}
		$('#CmallCartModal').html(popUpContent).modal('show');
		
		this.addPopUpHandlers();
		this.process = false;
		if(this.queue){
			this.init(this.queue.defaultPopUp, this.queue.item, this.queue.actionStatus);
			this.queue = false;
		}
		$('.cmallCart__qtyCover').remove();
		$('.cmallCart__itemInProcess').removeClass('cmallCart__itemInProcess');
	},
	
	closePopup : function(){
		$('#CmallCartModal').modal('hide');
	},
	
	addPopUpHandlers : function(){
		var self = this;
		var popup = $('#CmallCartModal');
		
		// first unbind all handlers that may be set
		popup.off('click', '.modal-cart-order-btn');
		popup.off('click', '.b-cmall-cart-popup__content-quantity-value');
		popup.find('.b-cmall-cart-popup__content-quantity-count').unbind();
		
		
		//button order
		if(cmallCart.orderLink){
			popup.on('click', '.modal-cart-order-btn', function(){
				window.location = frontBaseHref + cmallCart.orderLink;
			});
		}else{
			popup.find('.modal-cart-order-btn').hide();
		}
		
		//close and continue shopping
		//popup.on('click', '.b-cmall-cart-popup__footer-close-link', function(){
		//	cmallCart.onAddToCart.closePopup();
		//});
		
		//qty change
		popup.on('click', '.b-cmall-cart-popup__content-quantity-value', function(event){
			popup.find('.b-cmall-cart-popup__content-quantity-count').fadeIn();
			window.cartPopupQtyCountTimer = setTimeout(function(){
				$('#CmallCartModal').find('.b-cmall-cart-popup__content-quantity-count').fadeOut();
			}, 2000);
			event.stopPropagation();
		});
		popup.find('.b-cmall-cart-popup__content-quantity-count').hover(
			function(){
				clearTimeout(window.cartPopupQtyCountTimer);
				window.cartPopupQtyCountTimer = null;
			},
			function(){
				window.cartPopupQtyCountTimer = setTimeout(function(){
					$('#CmallCartModal').find('.b-cmall-cart-popup__content-quantity-count').fadeOut();
				}, 2000);
			}
		);
		popup.click(function(event){
			if($(event.target).closest('.b-cmall-cart-popup__content-quantity-count').length) return;
			$(this).find('.b-cmall-cart-popup__content-quantity-count').fadeOut();
			event.stopPropagation();
		});
		
		
	},
	
	updatePopup : function(cartItemData){
		var popup = $('#CmallCartModal');
		if(popup.length){
			var price = parseFloat(cartItemData.price);
			var total = price * cartItemData.qty;
			popup.find('.b-cmall-cart-popup__content-quantity-value span').html(cartItemData.qty);
			popup.find('.b-cmall-cart-popup__content-quantity-count-input').val(cartItemData.qty);
			popup.find('.b-cmall-cart-popup__content-price-total').html(cmallCart.formatCost(total));
			if(cartItemData.qty > 1){
				if(popup.find('.b-cmall-cart-popup__content-price-desc').length){
					popup.find('.b-cmall-cart-popup__content-price-desc').html(cartItemData.qty + ' x ' + cmallCart.formatCost(price));
				}else{
					popup.find('.b-cmall-cart-popup__content-price-total').after('<div class="b-cmall-cart-popup__content-price-desc">' + cartItemData.qty + ' x ' + cmallCart.formatCost(price) + '</div>');
				}
			}else{
				popup.find('.b-cmall-cart-popup__content-price-desc').remove();
			}
		}
	},
	
	qtyUp : function(e){
		var q = $(e).siblings('.b-cmall-cart-popup__content-quantity-count-field').find('input');
		this.changeQty(q, 'plus');
	},
	
	qtyDown : function(e){
		var q = $(e).siblings('.b-cmall-cart-popup__content-quantity-count-field').find('input');
		this.changeQty(q, 'minus');
	},
	
	changeQty : function(q, action){
		var delay = 500;
		var qtyMinVal = 1;
		var qtyMaxVal = 0;
		var qtyStep = 1;
		
		if(q.length){
			//var val = parseFloat(q.val());
			var val = parseInt(q.val());
			
			if(isNaN(val) || val == ""){
				val = qtyMinVal;
			}
			
			if(action == 'plus'){
				val += qtyStep;
			}else if(action == 'minus'){
				val -= qtyStep;
			}
			
			if(val < qtyMinVal){
				val = qtyMinVal
			}
			if(qtyMaxVal > 0){
				if(val > qtyMaxVal){
					val = qtyMaxVal
				}
			}
			if(q.val() != val){
				q.val(val);
				if(this.qtyChangeTimeout){
					clearTimeout(this.qtyChangeTimeout);
					this.qtyChangeTimeout = null;
				}
				this.qtyChangeTimeout = setTimeout(function(){
					q.change();
				}, delay);
			}
		}
	},
	
	recalcItem : function(id, id_prop, priceNum, input){
		if(cmallCart.cartLink && cmallCart.cartLink != ''){
			cmallCart.onAddToCart.startUpdatePopup();
			inputName = 'qty[eshop_' + id + '_' + id_prop + '_' + priceNum + ']';
			if(isNaN(parseFloat(input.value))) inputVal = 0; else inputVal = input.value;
			
			if(inputVal <= 0) inputVal = 1;
			
			params = { modlink : cmallCart.cartLink, action : "recalc" };
			params[inputName] = inputVal;
			$.post("/pages.php", params, function(data){
				if(cmallCart.bigCartContent && $(cmallCart.bigCartContent).length){
					var newCart = $(data).find(cmallCart.bigCartContent).html();
					$(cmallCart.bigCartContent).html(newCart);
				}
				
				amiSession.loadVariables();
				amiCart.updateBlock(cmallCart.cartCountCookie, cmallCart.cartTotalCookie);
				
				if($(data).find('#status_message').length){
					alert($(data).find('#status_message').html());
				}
				
				if(parseFloat(amiSession.get(cmallCart.cartCountCookie)) > 0){
					var locale = 'ru';
					if (typeof(AMI_SessionData['locale']) != 'undefined'){
						locale = AMI_SessionData['locale'];
					}
					AMI.$.ajax({
						//url: '/ami_service.php',
						url: '/cmall_cart_content.php?locale=' + locale,
						type: 'GET',
						dataType: 'JSON',
						//data: 'service=eshop_cart&action=get_items_info&scname=' + window.sessionCookieName,
						success: function(cartData){
							if(cartData.length == 0) {
								cmallCart.onAddToCart.closePopup();
							} else {
								cartData = cartData.data;
								if(cartData[id]){
									for(var i = 0; i < cartData[id].length; i++){
										var subItem = cartData[id][i];
										subItem.priceNum = (subItem.priceNum) ? subItem.priceNum : 0;
										subItem.propId = (subItem.propId) ? subItem.propId : 0;
										if(subItem.itemId == id && subItem.priceNum == priceNum && subItem.propId == id_prop){
											cartItemData = subItem;
										}
									}
								}
								
								cmallCart.onAddToCart.updatePopup(cartItemData);
								cmallCart.onAddToCart.endUpdatePopup();
								AMI.Message.send('ON_CART_DATA_UPDATED', cartData, {});
							}
						}
					});
				}else{
					cmallCart.onAddToCart.closePopup();
				}
			});
		}
	},
	
	updateCartData : function(){
		if(parseFloat(amiSession.get(cmallCart.cartCountCookie)) > 0){
			var locale = 'ru';
			if (typeof(AMI_SessionData['locale']) != 'undefined'){
				locale = AMI_SessionData['locale'];
			}
			AMI.$.ajax({
				url: '/cmall_cart_content.php?locale=' + locale,
				type: 'GET',
				dataType: 'JSON',
				success: function(cartData) {
					cartData = cartData.data;
					AMI.Message.send('ON_CART_DATA_UPDATED', cartData, {});
				}
			});
		}
	},
	
	startUpdatePopup : function(){
		var overlay = $('#CmallCartModal .modal-content .b-cmall-cart-popup__content-overlay');
		if(overlay.length){
			overlay.show();
		}else{
			$('#CmallCartModal .modal-content').append('<div class="b-cmall-cart-popup__content-overlay"></div>');
		}
	},
	
	endUpdatePopup : function(){
		var overlay = $('#CmallCartModal .modal-content .b-cmall-cart-popup__content-overlay');
		overlay.hide();
	},
	
	process : false,
	queue : false,
	
	onItemAdd : function(qty){
		if(!amiCart.oneClick){
			if(!$(qty).closest('.cmallCart__qtyWrapper').length){
				$(qty).wrap('<span class="cmallCart__qtyWrapper cmallCart__itemInProcess"></span>');
			}
			$(qty).closest('.cmallCart__qtyWrapper').append('<span class="cmallCart__qtyCover"></span>');
		}
	},
	
	init: function(defaultPopUp, item, actionStatus){
		//item - eshop item object (added to cart) ::
		//	itemId
		//	numPrice
		//	propId

		if(this.process){
			this.queue = {
				defaultPopUp : defaultPopUp,
				item : item,
				actionStatus : actionStatus
			}
		}else{
			this.process = true;
			
			var overRestMarker = 'не добавлен в корзину. ';
			
			var popUpContent = '';
			var cartItemData = false;
			
			var alertMsg = false;
			if(actionStatus.indexOf(overRestMarker) > 0){
				var pos = actionStatus.indexOf(overRestMarker) + overRestMarker.length;
				alertMsg = actionStatus.substring(pos);
			}
			if(parseFloat(amiSession.get(cmallCart.cartCountCookie)) > 0){
				var locale = 'ru';
				if (typeof(AMI_SessionData['locale']) != 'undefined'){
					locale = AMI_SessionData['locale'];
				}
				AMI.$.ajax({
					url: '/cmall_cart_content.php?locale=' + locale,
					type: 'GET',
					dataType: 'JSON',
					success: function(cartData) {
						if(cartData.length == 0) {
							if(defaultPopUp){
								popUpContent = '<div class="b-cmall-cart-popup__default-content">' + defaultPopUp + '</div>';
							}else{
								return false;
							}
						} else {
							cartData = cartData.data;
							//console.log(cartData);
							if(cartData[item.itemId]){
								for(var i = 0; i < cartData[item.itemId].length; i++){
									var subItem = cartData[item.itemId][i];
									subItem.priceNum = (subItem.priceNum) ? subItem.priceNum : 0;
									subItem.propId = (subItem.propId) ? subItem.propId : 0;
									if(subItem.itemId == item.itemId && subItem.priceNum == item.numPrice && subItem.propId == item.propId){
										cartItemData = subItem;
									}
								}
							}
							
							popUpContent = cmallCart.onAddToCart.getPopUpContent(cartItemData);
							cmallCart.onAddToCart.showPopUp(popUpContent);
							if(alertMsg) alert(alertMsg);

							AMI.Message.send('ON_CART_DATA_UPDATED', cartData, {});
						}
					}
				});
			}
		}
	},
	
	

	end : ''
}

cmallCart.smallContent = {
	cartSmallContainer 		: '.cmallCartSmall__content',	//идентификатор контейнера содержимого корзины (в спецблоке)
	imgDummy				: '_img/cmall/icon__CartSpecTooltipEmptyImg.png',	//заглушка при отсутствующей картинке товара (если пусто, то не используется)
	
	/**
	*	Формирование вывода одного товара в блоке состава заказа на странице ОФОРМЛЕНИЕ ЗАКАЗА
	*/
	getOrderContentItemHtml : function(item){
		var html = '';
		if(cmallCart.eshopLink && cmallCart.eshopLink != ''){
			item.link = '/' + cmallCart.eshopLink + '/' + item.catSublink + '/' + item.sublink;
		}else{
			item.link = 'javascript:void(0)';
		}
		var price = item.price;
		var priceOriginal = item.price_original;
		if(priceOriginal == price){
			priceOriginal = false;
		}

		var img = item.ext_img_small;
		if(this.imgDummy){
			if(!img) img = this.imgDummy;
		}
		
		/** ***************************
		*	HTML вывод подвидов товара 
		*	***************************/
		
		item.props = '';
		if(item.aPropInfo){
			if(item.aPropInfo.length){
				item.props = '<div class="b-cart-popup-content__item-name-prop">';
				for(var i in item.aPropInfo){
					if(i > 0) item.props += '; ';
					item.props += item.aPropInfo[i]['name'] + ': ' + item.aPropInfo[i]['value'];
				}
				item.props += '</div>';
			}
		}

		
		/** **************************
		*	HTML вывод товара ********
		*	**************************/
		html += '<tr>';
		html += 	'<td class="b-cart-popup-content__item b-cart-popup-content__item-pic">'
		if(item.ext_img_popup){
		html += 		'<a onclick="AMI.UI.MediaBox.open(\'' + item.ext_img_popup + '\', 100+\'%\', 100+\'%\', \'' + item.header + '\', \'' + item.header + '\'); return false;" class="b-cart-content__item-pic-link" href="javascript:void(0);">';
		html += 			'<img data-ami-mbpopup="' + item.ext_img_popup + '" class="b-cart-content__item-img" src="' 
							+ img + '" title="' + item.header + '" alt="' + item.header + '" data-ami-mbhdr="' + item.header + '">';
		html += 		'</a>';
		}else{
		html +=			'<img class="b-cart-content__item-img" src="' + img + '" title="' + item.header + '" alt="' + item.header + '">';
		}
		html +=		'</td>';
		html +=		'<td class="b-cart-popup-content__item b-cart-popup-content__item-name">';
		html +=			'<a class="b-cart-popup-content__item-name-link" href="' + item.link + '">' + item.header + '</a>';
		html +=			item.props;
		html +=		'</td>';
		html +=		'<td class="b-cart-popup-content__item b-cart-popup-content__item-price">';
		if(priceOriginal)
		html +=			'<div class="b-cart-popup-content__item-price-old">' + cmallCart.formatCost(priceOriginal) + '</div>';
		html +=			cmallCart.formatCost(price);
		html +=		'</td>';
		html +=		'<td class="b-cart-popup-content__item b-cart-popup-content__item-quantity">';
		html +=			'<span onclick="cmallCart.smallContent.changeQty(this, \'minus\')" class="b-cart-popup-content__item-quantity-minus">–</span> ';
		html +=			'<input onchange="cmallCart.smallContent.recalcItem(' + item.itemId + ',' + item.propId + ',' + item.priceNum + ', this)"'
						+ ' class="b-cart-popup-content__item-quantity-input" value="' + item.qty + '" type="text"> ';
		html +=			'<span onclick="cmallCart.smallContent.changeQty(this, \'plus\')" class="b-cart-popup-content__item-quantity-plus">+</span>';
		html +=		'</td>';
		html +=		'<td class="b-cart-popup-content__item b-cart-popup-content__item-amount">';
		html +=			'<span class="b-cart-popup-content__item-amount-val">' + cmallCart.formatCost(item.qty*price) + '</span>';
		html +=		'</td>';
		html +=		'<td class="b-cart-popup-content__item b-cart-popup-content__item-delete">';
		html +=			'<a class="b-cart-popup-content__item-delete-link" onclick="cmallCart.smallContent.delItem(' + item.itemId + ',' + item.propId + ',' + item.priceNum + ')" href="javascript:void(0);">';
		html +=				'<img src="_img/cmall/icon__PopupClose.png">';
		html +=			'</a>';
		html +=		'</td>';
		html +=	'</tr>';

		/** **************************
		*	/ HTML вывод товара ******
		*	**************************/
		
		return html;
	},
	
	/**
	*	Формирование вывода одного товара в блоке отображения содержимого корзины в СПЕЦБЛОКЕ КОРЗИНЫ
	*/
	getCartSmallItemHtml : function(item){
		//console.log(item);
		var html = '';
		if(cmallCart.eshopLink && cmallCart.eshopLink != ''){
			item.link = '/' + cmallCart.eshopLink + '/' + item.catSublink + '/' + item.sublink;
		}else{
			item.link = 'javascript:void(0)';
		}
		var price = item.price;
		var priceOriginal = item.price_original;
		if(priceOriginal == price){
			priceOriginal = false;
		}

		var img = item.ext_img_small;
		if(this.imgDummy){
			if(!img) img = this.imgDummy;
		}
		
		/** ***************************
		*	HTML вывод подвидов товара 
		*	***************************/
		
		item.props = '';
		if(item.aPropInfo){
			if(item.aPropInfo.length){
				item.props = '<div class="b-cmall-cart-spec-tooltip__item-title-prop">';
				for(var i in item.aPropInfo){
					item.props += '<div class="b-cmall-cart-spec-tooltip__item-title-prop-name">' + item.aPropInfo[i]['name'] + ': ' + item.aPropInfo[i]['value'] + '</div>';
				}
				item.props += '</div>';
			}
		}

		
		/** **************************
		*	HTML вывод товара ********
		*	**************************/
		html += '<div class="b-cmall-cart-spec-tooltip__item">';
		html +=		'<div class="text-center b-cmall-cart-spec-tooltip__item-pic">';
		html +=			'<a href="' + item.link + '" class="b-cmall-cart-spec-tooltip__item-pic-link">';
		html +=				'<img class="img-thumbnail img-responsive b-cmall-cart-spec-tooltip__item-pic-img" alt="' + item.header + '" src="' + img + '">';
		html +=			'</a>';
		html +=		'</div>';
		html += 	'<div class="b-cmall-cart-spec-tooltip__item-desc text-left">';
		html += 		'<div class="b-cmall-cart-spec-tooltip__item-title">';
		html += 			'<a class="b-cmall-cart-spec-tooltip__item-title-link" href="' + item.link + '">' + item.header + '</a>';
		html += 		'</div>';
		html += 		item.props;
		html += 		'<div class="b-cmall-cart-spec-tooltip__item-price">';
		html += 			'<div class="b-cmall-cart-spec-tooltip__item-price-total">' + cmallCart.formatCost(item.qty*price) + '</div>';
		if(item.qty && item.qty > 1)
		html +=				'<div class="b-cmall-cart-spec-tooltip__item-price-desc">' + item.qty + ' x ' + cmallCart.formatCost(price) + '</div>';
		if(priceOriginal)
		html += 			'<div class="b-cmall-cart-spec-tooltip__item-price-old">' + cmallCart.formatCost(priceOriginal) + '</div>';
		html += 		'</div>';
		html += 	'</div>';
		html += 	'<div class="b-cmall-cart-spec-tooltip__item-delete" onclick="cmallCart.smallContent.delItem(' + item.itemId + ',' + item.propId + ',' + item.priceNum + ')">';
		html +=			'×';
		html +=		'</div>';
		html += '</div>';

		/** **************************
		*	/ HTML вывод товара ******
		*	**************************/
		
		return html;
	},
	
	/**
	*	Обновление блока отображения содержимого корзины
	*/
	updateCartSmallContent : function(cartContent){
		if(!amiSession.get(cmallCart.cartCountCookie) || amiSession.get(cmallCart.cartCountCookie) == '0'){
			if($('#eshop-ordering__purchase-form').length){
				window.location.reload(true);
			}
		}
		
		var self = this;
		$(this.cartSmallContainer).each(function(){
			var contentHtml = '';
			if($(this).hasClass('b-cmall-cart-spec-tooltip__content')){
				// спецблок корзины в шапке
				for (var i in cartContent) {
					if (cartContent.hasOwnProperty(i) ){
						for(var n = 0; n < cartContent[i].length; n++){
							contentHtml += cmallCart.smallContent.getCartSmallItemHtml(cartContent[i][n]);
						}
					}
				}
				if(!contentHtml){
					contentHtml = '<div class="b-cmall-cart-spec-tooltip__cart-empty text-center">Корзина пока пуста</div>';
					$(this).siblings('.b-cmall-cart-spec-tooltip__header, .b-cmall-cart-spec-tooltip__footer').html('');
				}else{
					var items = parseFloat(amiSession.get(cmallCart.cartCountCookie));
					var words = ['товар', 'товара', 'товаров'];
					var header = ''
							+	'<div class="b-cmall-cart-spec-tooltip__header-title">'
							+		'<span class="b-cmall-cart-spec-tooltip__header-title-qty">' + cmallCart.getItemsNumber(items, words) + '</span> в корзине'
							+	'</div>'
							+	'<div class="b-cmall-cart-spec-tooltip__delete" onclick="cmallCart.smallContent.emptyCart()">×</div>';
					var footer = ''
							+	'<div class="b-cmall-cart-spec-tooltip__footer-total">'
							+		'<div class="b-cmall-cart-spec-tooltip__footer-title">Итого:</div>'
							+		'<div class="b-cmall-cart-spec-tooltip__footer-amount">' + amiSession.get(cmallCart.cartTotalCookie) + '</div>'
							+	'</div>';
					if(cmallCart.orderLink){
						var orderUrl = frontBaseHref + cmallCart.orderLink;
						footer 	+=	'<button class="b-cmall-cart-spec-tooltip__footer-btn btn" onclick="window.location = \'' + orderUrl + '\'">Оформить</button>';
					}
					
					$(this).siblings('.b-cmall-cart-spec-tooltip__header').html(header);
					$(this).siblings('.b-cmall-cart-spec-tooltip__footer').html(footer);
				}
				$(this).html(contentHtml);
				
				cmallCart.smallContent.endUpdate($(this));
				
			}else if($(this).hasClass('b-cart-popup-content__tbl-body')){
				// состав заказа на странице оформления заказа
				for (var i in cartContent) {
					if (cartContent.hasOwnProperty(i) ){
						for(var n = 0; n < cartContent[i].length; n++){
							contentHtml += cmallCart.smallContent.getOrderContentItemHtml(cartContent[i][n]);
						}
					}
				}
				
				$(this).html(contentHtml);
				//var footer = '<div class="b-cart-footer__total">Итого: <span class="b-cart-footer__total-value">' + amiSession.get(cmallCart.cartTotalCookie) + '</span></div>';
				//$(this).closest('.b-cart-content__wrapper').find('.b-cart-footer').html(footer);
				self.getCartSmallOrderTotal();
			}
		});
	},
	
	getCartSmallOrderTotal : function(){
		if(window.AMI && AMI.Eshop && AMI.Eshop.Order){
			//check if order amount is not less then minimal
			var orederSum = parseFloat(amiSession.get(cmallCart.cartTotalPlainCookie));
			if(cmallCart.minOrderSum && orederSum){
				var min = parseFloat(cmallCart.minOrderSum);
				if(orederSum < min) window.location.reload(true);
			}
			
			if(this.orderTotalStr){
				AMI.$('.b-cart-footer').html(this.orderTotalStr);
				this.orderTotalStr = null;
			}else{
				var self = this;
				
				var oOrder = AMI.Eshop.Order;
				this.curAvailShipping = this.getShippingString(oOrder.avail_shipping_methods);
		
				var url = frontBaseHref + 'ami_service.php';
				var data = {
					service: "eshop_cart",
					action: "get_available_shippings"
				};
				$.getJSON(url, data, function(content){
					if (!content) return;
					var newAvailShipping = self.getShippingString(content);
					if(newAvailShipping != self.curAvailShipping) self.updateOrderPage();
					oOrder.avail_shipping_methods = content;
					oOrder.shipping_groups_ids = null;
					oOrder.shipping_methods_ids = null;
					oOrder.defineShippingData();
					oOrder.paymentMethodInitialized = false;
					if (typeof order_shipping_groups_ids !== 'undefined') oOrder.shipping_groups_ids = order_shipping_groups_ids;
					if (typeof order_shipping_methods_ids !== 'undefined')	oOrder.shipping_methods_ids = order_shipping_methods_ids;
					oOrder.prices_ajax_response_array = [];
					
					//oOrder.updatePaymentMethod(select, true);
					var radio = $('input[id^="' + AMI.Eshop.Order.shipping_method_radio_id_prefix + '"]:checked')[0];
					if(radio){
						oOrder.changeShippingMethod(radio);
					}else{
						oOrder.makePricesAjaxRequest();
					}
					
					if(this.minOrderSum){
						if(parseFloat(oOrder.prices_ajax_response.total.price_value) < parseFloat(this.minOrderSum)) window.location.reload(true);
					}
				});
			}
		}
	},
	
	getShippingString : function(availShippingMethods){
		var res = '';
		var allShippingMethods = [];
		for(var n in availShippingMethods) {
			if (!availShippingMethods.hasOwnProperty(n)) continue;
			var set = availShippingMethods[n];

			for(var i = 0; i < set.methods.length - 1; i++){
				if($.inArray(set.methods[i].id, allShippingMethods) === -1) allShippingMethods.push(set.methods[i].id);
			}
		}
		allShippingMethods.sort;
		for(var i = 0; i < allShippingMethods.length; i++){
			res += allShippingMethods[i] + '_';
		}
		return res;
	},
	
	updateOrderPage : function(){
		window.location.reload(true);
	},
	
	emptyCart : function(){
		if(confirm('Все товары будут удалены! Продолжить?')){
			cmallCart.smallContent.startUpdate();
			$.ajax({url: "pages.php", type: "POST", data: {modlink: cmallCart.cartLink, action: "empty"}}).done(function(data){
				amiSession.loadVariables();
				amiCart.updateBlock(cmallCart.cartCountCookie, cmallCart.cartTotalCookie);
				//cmallCart.smallContent.endUpdate();
				cmallCart.getCartContent();
				if(window.cartShowTimer){
					clearTimeout(window.cartShowTimer);
					window.cartShowTimer = null;
				}
				setTimeout(function() { $('.b-cmall-cart').hide(); }, 500);
				if(cmallCart.bigCartContent && $(cmallCart.bigCartContent).length) location.reload();
			});
		}
	},
	
	delItem : function(id, id_prop, priceNum){
		cmallCart.smallContent.startUpdate();
		if(priceNum != 0) 
			var pr = '&num=' + priceNum; 
		else
			var pr = '';
		$.ajax({url : cmallCart.cartLink + '?action=del&id=eshop_' + id + '_' + id_prop + pr}).done(function(data){
			if(cmallCart.bigCartContent && $(cmallCart.bigCartContent).length){
				var newCart = $(data).find(cmallCart.bigCartContent).html();
				$(cmallCart.bigCartContent).html(newCart);
			}
			amiSession.loadVariables();
			amiCart.updateBlock(cmallCart.cartCountCookie, cmallCart.cartTotalCookie);
			cmallCart.getCartContent();
			//cmallCart.smallContent.endUpdate();
		});
	},
	
	recalcItem : function(id, id_prop, priceNum, input){
		if(cmallCart.cartLink && cmallCart.cartLink != ''){
			cmallCart.smallContent.startUpdate();
			inputName = 'qty[eshop_' + id + '_' + id_prop + '_' + priceNum + ']';
			if(isNaN(parseFloat(input.value))) inputVal = 0; else inputVal = input.value;
			params = { modlink : cmallCart.cartLink, action : "recalc" };
			params[inputName] = inputVal;
			$.post("/pages.php", params, function(data){
				if(cmallCart.bigCartContent && $(cmallCart.bigCartContent).length){
					var newCart = $(data).find(cmallCart.bigCartContent).html();
					$(cmallCart.bigCartContent).html(newCart);
				}
				amiSession.loadVariables();
				amiCart.updateBlock(cmallCart.cartCountCookie, cmallCart.cartTotalCookie);
				cmallCart.getCartContent();
				//cmallCart.smallContent.endUpdate();
			});
		}
	},
	
	changeQty : function(e, action){
		var delay = 500;
		var qtyMinVal = 1;
		var qtyMaxVal = 0;
		var qtyStep = 1;
		
		var q = $(e).siblings('input');
		
		if(q.length){
			//var val = parseFloat(q.val());
			var val = parseInt(q.val());
			
			if(isNaN(val) || val == ""){
				val = qtyMinVal;
			}
			
			if(action == 'plus'){
				val += qtyStep;
			}else if(action == 'minus'){
				val -= qtyStep;
			}
			
			if(val < qtyMinVal){
				val = qtyMinVal
			}
			if(qtyMaxVal > 0){
				if(val > qtyMaxVal){
					val = qtyMaxVal
				}
			}
			if(q.val() != val){
				q.val(val);
				if(this.qtyChangeTimeout){
					clearTimeout(this.qtyChangeTimeout);
					this.qtyChangeTimeout = null;
				}
				this.qtyChangeTimeout = setTimeout(function(){
					q.change();
				}, delay);
			}
		}
	},
	
	startUpdate : function(){
		$(cmallCart.smallContent.cartSmallContainer).each(function(){
			if($(this).closest('.cmallOrderContent').length){
				$(this).closest('.cmallOrderContent').append('<div class="b-cmall-cart-content__cover"></div>');
			}else{
				$(this).append('<div class="b-cmall-cart-content__cover"></div>');
			}
		});
	},
	
	endUpdate : function(oCartSmall){
		oCartSmall.find('.b-cmall-cart-content__cover').remove();
	},
	
	end : ''
}

$(function(){
	AMI.Message.addListener('ON_CART_DATA_UPDATED', function(cartData){
		cmallCart.smallContent.updateCartSmallContent(cartData);
		return true;
	});
	
	
	/**
	*	show/hide dropdown cart and compare
	*/
	//show/hide dropdown on click
	$('.cart-small__title').click(function(event){
		event.preventDefault ? event.preventDefault() : (event.returnValue=false);
		$('.b-cmall-cart-spec-tooltip__wrapper').fadeToggle();
	});
	//show/hide dropdown on click
	$('.b-cmall-compare__item').click(function(event){
		event.preventDefault ? event.preventDefault() : (event.returnValue=false);
		$('.compare_small_body').fadeToggle();
	});
	//show/hide dropdown on hover out
	$('.i-cart').hover(
		function(){
			if(window.cartTooltipTimer){
				clearTimeout(window.cartTooltipTimer);
				window.cartTooltipTimer = null;
			}
		},
		function(){
			window.cartTooltipTimer = setTimeout(
				function(){
					$('.b-cmall-cart-spec-tooltip__wrapper').fadeOut();
				}
			, 2000);
		}
	);
	//show/hide dropdown on hover out
	$('.b-cmall-compare__wrapper').hover(
		function(){
			if(window.cartTooltipTimer){
				clearTimeout(window.cartTooltipTimer);
				window.cartTooltipTimer = null;
			}
		},
		function(){
			window.cartTooltipTimer = setTimeout(
				function(){
					$('.compare_small_body').fadeOut();
				}
			, 2000);
		}
	);
	//show/hide dropdown on click outside the More item
	$(document).click(function(event) {
		if ($(event.target).closest(".i-cart").length) return;
		$('.b-cmall-cart-spec-tooltip__wrapper').fadeOut();
		event.stopPropagation();
	});
	//show/hide dropdown on click outside the More item
	$(document).click(function(event) {
		if ($(event.target).closest(".b-cmall-compare__wrapper").length) return;
		$('.compare_small_body').fadeOut();
		event.stopPropagation();
	});

});


/**
*	Monkey patching amiCart methods (sendRequest, add, addProp)
*/
amiCart.sendRequest = function(url, path, args, itemInfo){
	if(typeof(path) != 'undefined' && typeof(args) != 'undefined'){
		args += '&eshop_cart_simple=1';
			this.resultURL = url + path + args;
			AMI.HTTPRequest.getContent('POST', url, 'modlink=' + path.replace(/\?/,'&') + args, 
				// ex ajaxCallback
				function(_itemInfo){
					return function(status, content){
						if(status == 1 && (cartStatusPos = content.indexOf('cart updated')) >= 0){
							content = content.substr(cartStatusPos);
							amiSession.loadVariables();
							var aVarNames = content.split('|');
							amiCart.updateBlock(aVarNames[1], aVarNames[2]);

							var actionStatus = '';
							for(i = 3; i < aVarNames.length; i++){
								actionStatus += (i > 3 ? '|' : '') + aVarNames[i];
							}
							if(AMI.Message.hasListeners('ON_ADDED_TO_CART') && AMI.Message.send('ON_ADDED_TO_CART', actionStatus, _itemInfo)){
								// Message handled by listener
							}else{
								if(typeof(onAddedToCartMessage) == 'function'){
									onAddedToCartMessage(actionStatus);
								}else{
									alert(actionStatus);
								}
							}
							if(amiCart.isCheckout){
								document.location = amiCart.resultURL.replace(/\?.*/, '');
							}else if(!amiCart.useAJAX){
								document.location.reload();
							}
						}
					}
				}(itemInfo)
				//END ex ajaxCallback
			);

	}else{
			this.resultURL = url + '&eshop_cart_simple=1';
			var
				pattern = "^(([^:/\\?#]+):)?(//(([^:/\\?#]*)(?::([^/\\?#]*))?))?([^\\?#]*)(\\?([^#]*))?(#(.*))?$";
				rx = new RegExp(pattern),
				parts = rx.exec(this.resultURL),
				protocol = parts[1] || '',
				hostname = parts[5] || '',
				path = parts[7] || '/';
				args = parts[9] || '';

			AMI.HTTPRequest.getContent(
					'POST',
					protocol + '//' + hostname,
					'modlink=' + path.substr(1) + (args != '' ? '&' + args : ''),
					// ex ajaxCallback
					function(_itemId){
						return function(status, content){
							if(status == 1 && (cartStatusPos = content.indexOf('cart updated')) >= 0){
								content = content.substr(cartStatusPos);
								amiSession.loadVariables();
								var aVarNames = content.split('|');
								amiCart.updateBlock(aVarNames[1], aVarNames[2]);

								var actionStatus = '';
								for(i = 3; i < aVarNames.length; i++){
									actionStatus += (i > 3 ? '|' : '') + aVarNames[i];
								}
								if(AMI.Message.hasListeners('ON_ADDED_TO_CART') && AMI.Message.send('ON_ADDED_TO_CART', actionStatus, _itemId)){
									// Message handled by listener
								}else{
									if(typeof(onAddedToCartMessage) == 'function'){
										onAddedToCartMessage(actionStatus);
									}else{
										alert(actionStatus);
									}
								}
								if(amiCart.isCheckout){
									document.location = amiCart.resultURL.replace(/\?.*/, '');
								}else if(!amiCart.useAJAX){
									document.location.reload();
								}
							}
						}
					}(itemId)
					//END ex ajaxCallback
			);
	}
	this.isCheckout = !(this.resultURL.indexOf('&eshop_special=') == -1 || this.resultURL.indexOf('&url=') >= 0);
}

amiCart.add = function(url, itemId, numPrice, wrongPriceMsg){
	var qty = '1', price = '';

	if(itemId != 0 && document.forms[this.prefix + 'qty_' + itemId + '_' + numPrice]){
		var form = document.forms[this.prefix + 'qty_' + itemId + '_' + numPrice];

		if(form.qty){
			qty = form.qty.value;
			if(window.cmallCart && cmallCart.onAddToCart && typeof(cmallCart.onAddToCart.onItemAdd) == 'function'){
				cmallCart.onAddToCart.onItemAdd(form.qty);
			}
		}
		if(form.price){
			price = form.price.value;
			if(isNaN(price) || price <= 0){
				if(wrongPriceMsg != 'none' && wrongPriceMsg != undefined){
					alert(wrongPriceMsg);
				}
				return;
			}
		}
	}
	if(AMI.Message.hasListeners('ON_BEFORE_ADD_TO_CART') && AMI.Message.send('ON_BEFORE_ADD_TO_CART', actionStatus, {})){
		// Message handled by listener
	}else{
		if(typeof(onBeforeAddToCartMessage) == 'function'){
			onBeforeAddToCartMessage();
		}
	}
	this.prefix = '';
	var itemInfo = {
		itemId: itemId,
		numPrice: numPrice,
		propId: 0
	}
	this.sendRequest(frontBaseHref, url, '&qty=' + encodeURIComponent(qty) + (price != '' ? '&price=' + encodeURIComponent(price) : ''), itemInfo)
}

amiCart.addProp = function(url, itemId, propId, numPrice){
	if(AMI.Message.hasListeners('ON_BEFORE_ADD_TO_CART') && AMI.Message.send('ON_BEFORE_ADD_TO_CART', actionStatus, {})){
		// Message handled by listener
	}else{
		if(typeof(onBeforeAddToCartMessage) == 'function'){
			onBeforeAddToCartMessage();
		}
	}
	var resultUrl = '&qty=';

	if(itemId != 0 && document.forms[this.prefix + 'qty_' + itemId + '_' + propId + '_' + numPrice] && document.forms[this.prefix + 'qty_' + itemId + '_' + propId + '_' + numPrice].qty){
		var qty = document.forms[this.prefix + 'qty_' + itemId + '_' + propId + '_' + numPrice].qty;
		resultUrl += qty.value;
		if(window.cmallCart && cmallCart.onAddToCart && typeof(cmallCart.onAddToCart.onItemAdd) == 'function'){
			cmallCart.onAddToCart.onItemAdd(qty);
		}
	}else{
		resultUrl += '1';
	}
	this.prefix = '';
	var itemInfo = {
		itemId: itemId,
		numPrice: numPrice,
		propId: propId
	}
	this.sendRequest(frontBaseHref, url, resultUrl, itemInfo);
}







var timeout    = 500;
var closetimer = 0;
var ddmenuitem = 0;
 
function jsddm_open() {
    jsddm_canceltimer();
    jsddm_close();
    ddmenuitem = $(this).children('.i-sub-menu').stop(true, true).slideDown(300);
    //.css('visibility', 'visible');
}
 
function jsddm_close() {
    if (ddmenuitem) ddmenuitem.stop(true, true).slideUp(300);
    	//.css('visibility', 'hidden');
}
 
function jsddm_timer() {
    closetimer = window.setTimeout(jsddm_close, timeout);
}
 
function jsddm_canceltimer() {
    if (closetimer) {
        window.clearTimeout(closetimer);
        closetimer = null;
    }
}

$(document).ready(function() {	
	
	/**
	*	Input mask for phone numbers RU
	*/

	if($('.phoneMask')){
		$('.phoneMask').each(function(){
			$(this).append('<span class="phoneMask__prefix">+7</span>');
			initPhoneMask($(this).find('input'));
		});
	}

	
	/**
	*	Input mask for phone numbers UK
	*/
	/**
	if($('.phoneMask')){
		$('.phoneMask').each(function(){
			$(this).append('<span class="phoneMask__prefix">+38</span>');
			initPhoneMask($(this).find('input'));
		});
	}
	*/

	/**
	*	Строка поиска в шапке (блок с примерами поискового запроса)
	*/
	var $esHSearchInp = $('.b-cmall-EshopSearchFormHeader-field-search__input');
	var $esHSearchWords = $('.b-cmall-EshopSpecialSearchWords-small-special-row__item');
	if(!$esHSearchInp.val()) $esHSearchWords.show();
	$esHSearchInp
		.focus(function(){$esHSearchWords.hide();})
		.blur(function(){if(!$(this).val()) $esHSearchWords.show();});
	$esHSearchWords.on('click', 'a', function(event){
		event.preventDefault ? event.preventDefault() : (event.returnValue=false);
		$esHSearchWords.hide();
		$esHSearchInp.val($(this).text()).closest('form').submit();
	});
	
});	

/**
*	Меню каталога товаров (адаптивное меню)
*/
cmallKatalogMenu = {
	
	maxSubCategories : 3,
	
	showAllSubCatsText : 'Посмотреть все',
	subCatClassMask : 'b-sub-menu',
	
	init : function(){
		
		this.katalogMenu = $('.b-katalog-menu .b-menu');
		
		var self = this;

		if(this.katalogMenu.length){

			this.maxSubCategories = parseInt(this.maxSubCategories);
			
			//ограничиваем кол-во подкатегорий и добавляем пункт "Показать все"
			this.limitSubCats();
			//формируем содержимое пункта Еще - переносим в него невходящие пункты
			this.more();
			
			//отменяем переход по ссылке для псевдакатегории "Еще"
			$('.b-katalog-menu').on('click', '.b-menu__item-more>a.b-menu__link', function(event){
				event.preventDefault ? event.preventDefault() : (event.returnValue=false);
			});
			
			//Добавление выделения активной категории первого уровня, когда пользователь находится внутри ее дочерних разделов
			$('.b-katalog-menu .b-menu').find('.b-sub-menu__link-active').closest('.b-menu__item').children('.b-menu__link').addClass('b-menu__link_active');
			
			/*
			//добавление "разделителя" после каждой 6-й подкатегории 2-го уровня (точнее перед каждой 7-й)
			$('.b-sub-menu2').each(function(){
				if($(this).find('.b-sub-menu__item2').length > 6){
					var l = $(this);
					var i = 0;
					var move = false;
					$(this).find('.b-sub-menu__item2').each(function(){
						i++;
						if(i%7 == 0){
							var t = $('<ul class="b-sub-menu2 b-sub-menu2__splitter"></ul>');
							l.after(t);
							l = t;
							move = true;
							i = 1;
						}
						if(move) l.append($(this));
					});
				}
			});
			*/
			
			//оображение/скрытие подменю с задержкой
			this.showHide();
			//обработчик изменения размера страницы
			this.resizeListener();
		}
		
	},
	
	limitSubCats : function(){
		//ограничиваем кол-во подкатегорий и добавляем пункт "Показать все"
		var self = this;
		this.katalogMenu.find('ul[class*=' + this.subCatClassMask + ']').each(function(){
			
			if($(this).children('li.b-sub-menu__item').length > self.maxSubCategories){
				//category level
				var level = '';
				var classes = $(this).attr("class").split(" ");
				for (var i = 0; i < classes.length; i++) {
					if (classes[i].indexOf(self.subCatClassMask) !== -1) {
						level = classes[i].replace(self.subCatClassMask, "");
						break;
					}
				}
				
				// link url
				var showAllLinkUrl = $(this).closest('.b-menu__item, .b-sub-menu__item').children('a').attr('href');
				
				// show all link
				var showAllLink = ''
					+	'<li class="b-sub-menu__item b-sub-menu__show-all' + level + '">'
					+		'<a href="' + showAllLinkUrl + '" class="b-sub-menu__link b-sub-menu__show-all-link' + level + '">'
					+ 			self.showAllSubCatsText
					+ 		'</a>'
					+ 		'<span class="b-sub-menu__show-all-arr' + level + '">></span>'
					+	'</li>';
				$(this).children('li.b-sub-menu__item:gt(' + (self.maxSubCategories - 1) + ')').addClass('b-sub-menu__item_waste');
				$(this).append(showAllLink);
			}
		});
	},
	
	more : function(){
		
		if(!$('#b-cmall-main-menu').find('.btn-navbar').is(':visible')){
		
			var katalogMenuItems = this.katalogMenu.children('.b-menu__item:visible');
			
			//перенос пунктов, не входящих по ширине, в пункт "Еще"
			var itemsSumWidth = 0;
			for(var i = 0; i < katalogMenuItems.length; i++){
				itemsSumWidth += $(katalogMenuItems[i]).outerWidth(true);
			}
			if(itemsSumWidth > this.katalogMenu.width()){
				var iMore = this.katalogMenu.find('.b-menu__item-more');
				if(!iMore.length){
					var itemMore 	= '<li class="b-menu__item b-menu__item-more">'
									+	'<a class="b-menu__link b-menu__link-more-arr b-menu__link-arr" href="#">Еще</a>'
									+		'<div class="i-sub-menu">'
									+			'<ul class="b-sub-menu1"></ul>'
									+		'</div>'
									+	'</li>';

					this.katalogMenu.append(itemMore);
					iMore = this.katalogMenu.find('.b-menu__item-more');
				}
				iMore.show();
				katalogMenuItems = this.katalogMenu.children('.b-menu__item');
				itemsSumWidth = iMore.outerWidth(true);
				for(var i = 0; i < katalogMenuItems.length - 1; i++){
					itemsSumWidth += $(katalogMenuItems[i]).outerWidth(true);
					if(itemsSumWidth > this.katalogMenu.width()){
						iMore.find('.b-sub-menu1').append($(katalogMenuItems[i]));
					}
				}
				iMore.find('.i-sub-menu .i-sub-menu').removeAttr('style');
			}
		}
		this.katalogMenu.removeClass('b-menu__loading');
	},
	
	showHide : function(){
		//оображение/скрытие подменю с задержкой
		this.katalogMenu.on('mouseenter', function(){
			if(window.menuHoverOutTimeout){
				clearTimeout(window.menuHoverOutTimeout);
				window.menuHoverOutTimeout = null;
			}
		});
		this.katalogMenu.on('mouseleave', function(){
			var menu = this;
			window.menuHoverOutTimeout = setTimeout(function(){
				var menuItems = $(menu).find('.b-menu__item').not('.b-menu__item-more .b-menu__item');
				menuItems.removeClass('b-menu__item-hover');
				menuItems.children('.i-sub-menu').stop(true, true).slideUp(300);
			}, 200);
		});
		
		this.katalogMenu.on('mouseenter', '.b-menu__item', function(){
			if(!$(this).parents('.b-menu__item-more').length){
				if(window.menuItemHoverOutTimeout){
					clearTimeout(window.menuItemHoverOutTimeout);
					window.menuItemHoverOutTimeout = null;
				}
				var el = this;
				window.menuItemHoverTimeout = setTimeout(function(){
							$(el).children('.i-sub-menu').stop(true, true).slideDown(300);
							$(el).closest('.b-katalog-menu .b-menu').find('.b-menu__item').removeClass('b-menu__item-hover');
							$(el).addClass('b-menu__item-hover');
							$(el).closest('.b-katalog-menu .b-menu')
								.find('.b-menu__item').not('.b-menu__item-hover').not('.b-menu__item-more .b-menu__item')
								.children('.i-sub-menu').stop(true, true).slideUp(300);
						}, 300);
			}
		});
		this.katalogMenu.on('mouseleave', '.b-menu__item', function(){
			if(!$(this).parents('.b-menu__item-more').length){
				if(window.menuItemHoverTimeout){
					clearTimeout(window.menuItemHoverTimeout);
					window.menuItemHoverTimeout = null;
				}
				var el = this;
				window.menuItemHoverOutTimeout = setTimeout(function(){
							$(el).children('.i-sub-menu').stop(true, true).slideUp(300);
							$(el).removeClass('b-menu__item-hover');
						}, 300);
			}
		});
	},
	
	resizeListener : function(){
		var self = this;
		$(window).resize(function(){
			self.katalogMenu.addClass('b-menu__loading');
			var iMore = self.katalogMenu.find('.b-menu__item-more');
			iMore.hide();
			self.katalogMenu.append(iMore.find('.b-menu__item'));
			self.katalogMenu.append(iMore);
			self.more();
		});
	},
	
	end: ''
}

function cmallSearchFormSubmit(form){
	AMI.Form.Filter.search_from_current_category = $('#Cmall__SearchFromCurrentCat').prop('checked');
	return AMI.Form.Filter.submit(form);
}
	
amiCartShowItems  = {
	useTooltip : false,
    tooltipHtml: '',
    cancelBubble: function() {
        AMI.$('.eshop-item-tooltip').hover(
            function() {
                AMI.$(this).parents('.eshop-item-small__cart-text, .eshop-item-detailed__price-wrapper, .eshop-item-small__additional-price').attr('data-onclick', AMI.$(this).parents('.eshop-item-small__cart-text, .eshop-item-detailed__price-wrapper, .eshop-item-small__additional-price').attr('onclick'));
                AMI.$(this).parents('.eshop-item-small__cart-text, .eshop-item-detailed__price-wrapper, .eshop-item-small__additional-price').removeAttr('onclick');
                AMI.$(this).parents('form').attr('data-onclick', AMI.$(this).parents('form').attr('onclick'));
                AMI.$(this).parents('form').removeAttr('onclick');
            },
            function() {
                AMI.$(this).parents('.eshop-item-small__cart-text, .eshop-item-detailed__price-wrapper, .eshop-item-small__additional-price').attr('onclick', AMI.$(this).parents('.eshop-item-small__cart-text, .eshop-item-detailed__price-wrapper, .eshop-item-small__additional-price').attr('data-onclick'));
                AMI.$(this).parents('form').attr('onclick', AMI.$(this).parents('form').attr('data-onclick'));
            }
        );
    },
    deleteItemsCart: function(url, id, num, prop) {
        deletelink = url+'?action=del&id=eshop_'+id+'_0&num='+num;
        AMI.$.ajax({
            url: deletelink,
            type: 'GET',
            success: function(data) {
                AMI.$('.tooltip-item__'+id+'_'+num).fadeOut(600);
                setTimeout(function() {AMI.$('#tooltip-item__'+id+'_'+num).remove()}, 700);
                if(AMI.$(this).parent('.eshop-item-small__cart-text').attr('data-onclick')) {
                    AMI.$(this).parent('.eshop-item-small__cart-text').attr('onclick', AMI.$(this).parent('.eshop-item-small__cart-text').attr('data-onclick'));
                }
                AMI.$(this).parents('form').attr('onclick', AMI.$(this).parents('form').attr('data-onclick'));
            }
        });
    },
    stockItems: function(cartdata, carturl, added, typeinfo, carttitle, cartdelete) {
        AMI.$.each(cartdata, function(i) {
            if(cartdata[i].id == 'total') {
                // ... if is total (get_items_info)
            } else {
                for(b=0;b<cartdata[i].length;b++) {
                    var priceItems = AMI.$('[name *= qty_'+cartdata[i][b].itemId+'_'+cartdata[i][b].priceNum+']');
                    if(AMI.$('[name *= qty_'+cartdata[i][b].itemId+']')) {
						priceItems.find('input[type=submit],a.b-card__in-cart').each(function(){
							AMI.$(this).addClass('in-cart_click').attr('onclick', 'location.href="'+carturl+'?itemid='+cartdata[i][b].itemId+'"; return false;');
							if(AMI.$(this).is('input')){
								AMI.$(this).val(added);
							}else if(AMI.$(this).is('a')){
								AMI.$(this).text(added);
							}
						});
                        if(typeinfo == 'get_items_info') {
                            // ... add custom for get_items_info type
                        }
                    }
                }
                /*amiCartShowItems.cancelBubble();*/
            }
        });
    },
	updatePropBtn : function(carturl, itemId, added){
		var el = AMI.$('[name *= qty_]').filter('[data-is-prop=1]');
		var d = AMI.$('#ami-eshop-properties__price-box');
		if(d.data('propInCart')){
			el.find('a.b-card__in-cart')
				.addClass('in-cart_click')
				.attr('onclick', 'location.href="' + d.data('cartUrl') + '?itemid=' + d.data('itemId') + '"; return false;')
				.text(d.data('cartAdded'));
		}
	},
    propertiesItems: function(cartdata, carturl, added, typeinfo, countItems, carttitle, cartdelete) {
        var el = AMI.$('[name *= qty_]').filter('[data-is-prop=1]');
		$('form[data-is-prop=1]')
        AMI.$.each(cartdata, function(i) {
            if(cartdata[i].id == 'total') {
                // ... if is total (get_items_info)
            } else {
                countPropItems = 0;
                for(k=0;k<cartdata[i].length;k++) {
                    if(cartdata[i][k].propId != 0) {
                        if(AMI.$('[name *= qty_]').eq(0).attr('name').split('qty_')[1].split('_')[0] == cartdata[i][0].itemId) {
							AMI.$('#ami-eshop-properties__price-box').data({'propInCart': 1, 'cartUrl': carturl, 'cartAdded': added, 'itemId': cartdata[i][0].itemId});
							amiCartShowItems.updatePropBtn();

							setInterval(function() {
								amiCartShowItems.updatePropBtn();
							}, 1000);
                        }
                    }
                }
            }
        });
    },
    itemsData: function(typeinfo, carturl, paramUrl, added, countItems, carttitle, cartdelete) {
		var locale = 'ru';
		if (typeof(AMI_SessionData['locale']) != 'undefined'){
			locale = AMI_SessionData['locale'];
		}
        AMI.$.ajax({
            //url: '/ami_service.php',
            url: '/cmall_cart_content.php?locale=' + locale,
            type: 'GET',
            dataType: 'JSON',
            //data: paramUrl,
            success: function(cartdata) {
                if(cartdata.length == 0) {
                    return false;
                } else {
					cartdata = cartdata.data;
					//console.log(cartdata);
					//cmallCart.cartData = cartdata;
                    if(AMI.$('[name *= qty_]').length != 0) {
						if(AMI.$('[name *= qty_]').data('isProp')){
							amiCartShowItems.propertiesItems(cartdata, carturl, added, typeinfo, countItems, carttitle, cartdelete);
						}else{
							amiCartShowItems.stockItems(cartdata, carturl, added, typeinfo, carttitle, cartdelete);
						}
                    } else if (AMI.$('[data-prop-id]').length != 0) {
                        amiCartShowItems.propertiesItemsRow(cartdata, carturl, added, typeinfo, countItems, carttitle, cartdelete);
                    }
                }
            }
        });
    },
	onCartUpdate: function(cartdata, typeinfo, carturl, added, countItems, carttitle, cartdelete){
		if(cartdata.length == 0) {
			return false;
		} else {
			//console.log(cartdata);
			//cmallCart.cartData = cartdata;
			if(AMI.$('[name *= qty_]').length != 0) {
				if(AMI.$('[name *= qty_]').data('isProp')){
					amiCartShowItems.propertiesItems(cartdata, carturl, added, typeinfo, countItems, carttitle, cartdelete);
				}else{
					amiCartShowItems.stockItems(cartdata, carturl, added, typeinfo, carttitle, cartdelete);
				}
			} else if (AMI.$('[data-prop-id]').length != 0) {
				amiCartShowItems.propertiesItemsRow(cartdata, carturl, added, typeinfo, countItems, carttitle, cartdelete);
			}
		}
	},
    init: function(typeinfo, carturl, added, countItems, carttitle, cartdelete) {
        if(amiSession.get('eshop_cart_count') != 0) {
            if(typeinfo == 'get_items') {
                paramUrl = 'service=eshop_cart&action=get_items&scname=' + window.sessionCookieName;
                amiCartShowItems.itemsData(typeinfo, carturl, paramUrl, added, countItems, carttitle, cartdelete);
            } else if (typeinfo == 'get_items_info') {
                paramUrl = 'service=eshop_cart&action=get_items_info&scname=' + window.sessionCookieName;
                amiCartShowItems.itemsData(typeinfo, carturl, paramUrl, added, countItems, carttitle, cartdelete);
            } else {
                return false;
            }
        }
		//hightlight row in cart
        if(AMI.$('#cart_items').length != 0 && location.href.indexOf('itemid') >= 0) {
            AMI.$('.txt[name*=eshop_'+location.search.split('=')[1].split('&')[0]+']').focus();
            AMI.$('.txt[name*=eshop_'+location.search.split('=')[1].split('&')[0]+']').parent().parent().addClass('cart_items__tr-select');
            setTimeout(function() {AMI.$('.txt[name*=eshop_'+location.search.split('=')[1].split('&')[0]+']').parent().parent().addClass('cart_items__tr')}, 1000);
        }
    }
}


var _0xdd4c=["\x23\x62\x2D\x76\x69\x65\x77\x48\x69\x73\x74\x6F\x72\x79","\x76\x69\x65\x77\x5F\x68\x69\x73\x74\x6F\x72\x79","\x3A\x21\x3A","\x3A\x5F\x3A","\x6C\x65\x6E\x67\x74\x68","\x68\x69\x73\x74\x43\x6F\x6E\x74\x61\x69\x6E\x65\x72","\x63\x49\x74\x65\x6D","\x75\x73\x65\x4C\x6F\x63\x61\x6C\x53\x74\x6F\x72\x61\x67\x65","\x6E\x75\x6D\x62\x65\x72\x4F\x66\x45\x6C\x65\x6D\x65\x6E\x74\x73","\x67\x65\x74\x53\x74\x6F\x72\x61\x67\x65","\x73\x68\x6F\x77\x48\x69\x73\x74\x6F\x72\x79","\x75\x73\x65\x50\x61\x67\x65\x72","\x69\x6E\x69\x74\x50\x61\x67\x65\x72","\x61\x64\x64\x54\x6F\x48\x69\x73\x74\x6F\x72\x79","\x68\x69\x73\x74\x6F\x72\x79","\x65\x6C\x65\x6D\x65\x6E\x74\x73\x50\x65\x72\x50\x61\x67\x65","\x3C\x64\x69\x76\x20\x69\x64\x3D\x22\x62\x2D\x73\x65\x65\x6E\x5F\x5F\x6E\x61\x76\x69\x2D\x6E\x65\x78\x74\x22\x20\x63\x6C\x61\x73\x73\x3D\x22\x62\x2D\x73\x65\x65\x6E\x5F\x5F\x6E\x61\x76\x69\x2D\x6E\x65\x78\x74\x22\x20\x74\x69\x74\x6C\x65\x3D\x22\u0421\u043B\u0435\u0434\u0443\u044E\u0449\u0430\u044F\x20\u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0430\x22\x3E\x3C\x2F\x64\x69\x76\x3E","\x3C\x64\x69\x76\x20\x69\x64\x3D\x22\x62\x2D\x73\x65\x65\x6E\x5F\x5F\x6E\x61\x76\x69\x2D\x70\x72\x65\x76\x22\x20\x63\x6C\x61\x73\x73\x3D\x22\x62\x2D\x73\x65\x65\x6E\x5F\x5F\x6E\x61\x76\x69\x2D\x70\x72\x65\x76\x22\x20\x74\x69\x74\x6C\x65\x3D\x22\u041F\u0440\u0435\u0434\u044B\u0434\u0443\u0449\u0430\u044F\x20\u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0430\x22\x3E\x3C\x2F\x64\x69\x76\x3E","\x68\x74\x6D\x6C","\x2E\x62\x2D\x73\x65\x65\x6E\x20\x2E\x62\x2D\x73\x65\x65\x6E\x5F\x5F\x6E\x61\x76\x69\x2D\x62\x6C\x6F\x63\x6B","\x63\x68\x6F\x6F\x73\x65\x50\x61\x67\x65","\x62\x2D\x73\x65\x65\x6E\x2D\x63\x6F\x6E\x74\x65\x6E\x74\x5F\x5F\x70\x61\x67\x65\x5F\x73\x74\x61\x74\x65\x5F\x61\x63\x74\x69\x76\x65","\x72\x65\x6D\x6F\x76\x65\x43\x6C\x61\x73\x73","\x68\x69\x64\x65","\x20\x2E\x62\x2D\x73\x65\x65\x6E\x2D\x63\x6F\x6E\x74\x65\x6E\x74\x5F\x5F\x70\x61\x67\x65","\x61\x64\x64\x43\x6C\x61\x73\x73","\x66\x61\x64\x65\x49\x6E","\x20\x2E\x62\x2D\x73\x65\x65\x6E\x2D\x63\x6F\x6E\x74\x65\x6E\x74\x5F\x5F\x70\x61\x67\x65\x5B\x64\x61\x74\x61\x2D\x70\x61\x67\x65\x2D\x6E\x75\x6D\x3D\x22","\x22\x5D","\x62\x2D\x73\x65\x65\x6E\x5F\x5F\x6E\x61\x76\x69\x5F\x73\x74\x61\x74\x65\x5F\x64\x69\x73\x61\x62\x6C\x65\x64","\x23\x62\x2D\x73\x65\x65\x6E\x5F\x5F\x6E\x61\x76\x69\x2D\x6E\x65\x78\x74\x2C\x20\x23\x62\x2D\x73\x65\x65\x6E\x5F\x5F\x6E\x61\x76\x69\x2D\x70\x72\x65\x76","\x64\x61\x74\x61\x2D\x70\x61\x67\x65\x2D\x6E\x75\x6D","\x61\x74\x74\x72","\x23\x62\x2D\x73\x65\x65\x6E\x5F\x5F\x6E\x61\x76\x69\x2D\x6E\x65\x78\x74","\x23\x62\x2D\x73\x65\x65\x6E\x5F\x5F\x6E\x61\x76\x69\x2D\x70\x72\x65\x76","\x63\x6C\x69\x63\x6B","\x6F\x66\x66","\x6F\x6E","\x2E\x62\x2D\x73\x65\x65\x6E\x5F\x5F\x6E\x61\x76\x69\x5F\x73\x74\x61\x74\x65\x5F\x64\x69\x73\x61\x62\x6C\x65\x64","\x6E\x6F\x74","","\x3C\x68\x32\x20\x63\x6C\x61\x73\x73\x3D\x22\x62\x2D\x63\x6D\x61\x6C\x6C\x2D\x70\x72\x6F\x64\x75\x63\x74\x2D\x68\x65\x61\x64\x22\x3E\x3C\x73\x70\x61\x6E\x20\x63\x6C\x61\x73\x73\x3D\x22\x62\x2D\x63\x6D\x61\x6C\x6C\x2D\x70\x72\x6F\x64\x75\x63\x74\x2D\x68\x65\x61\x64\x5F\x5F\x74\x69\x74\x6C\x65\x2D\x68\x65\x61\x64\x65\x72\x22\x3E\u0412\u044B\x20\u0441\u043C\u043E\u0442\u0440\u0435\u043B\u0438\x3C\x2F\x73\x70\x61\x6E\x3E\x3C\x2F\x68\x32\x3E","\x3C\x64\x69\x76\x20\x63\x6C\x61\x73\x73\x3D\x22\x72\x6F\x77\x22\x3E","\x3C\x64\x69\x76\x20\x63\x6C\x61\x73\x73\x3D\x22\x63\x6F\x6C\x2D\x78\x73\x2D\x31\x32\x22\x3E","\x3C\x64\x69\x76\x20\x69\x64\x3D\x22\x76\x69\x65\x77\x48\x69\x73\x74\x6F\x72\x79\x49\x74\x65\x6D\x73\x22\x20\x63\x6C\x61\x73\x73\x3D\x22\x62\x2D\x63\x6D\x61\x6C\x6C\x2D\x65\x73\x68\x6F\x70\x2D\x73\x70\x65\x63\x5F\x5F\x6C\x69\x73\x74\x22\x3E","\x3C\x64\x69\x76\x20\x63\x6C\x61\x73\x73\x3D\x22\x62\x2D\x73\x65\x65\x6E\x2D\x63\x6F\x6E\x74\x65\x6E\x74\x5F\x5F\x70\x61\x67\x65\x22\x20\x64\x61\x74\x61\x2D\x70\x61\x67\x65\x2D\x6E\x75\x6D\x3D\x22","\x22\x3E","\x3C\x64\x69\x76\x20\x63\x6C\x61\x73\x73\x3D\x22\x62\x2D\x63\x6D\x61\x6C\x6C\x2D\x65\x73\x68\x6F\x70\x2D\x73\x70\x65\x63\x5F\x5F\x69\x74\x65\x6D\x2D\x77\x72\x61\x70\x70\x65\x72\x22\x3E","\x3C\x64\x69\x76\x20\x63\x6C\x61\x73\x73\x3D\x22\x62\x2D\x63\x6D\x61\x6C\x6C\x2D\x65\x73\x68\x6F\x70\x2D\x73\x70\x65\x63\x5F\x5F\x69\x74\x65\x6D\x22\x3E","\x3C\x64\x69\x76\x20\x63\x6C\x61\x73\x73\x3D\x22\x62\x2D\x63\x6D\x61\x6C\x6C\x2D\x65\x73\x68\x6F\x70\x2D\x73\x70\x65\x63\x5F\x5F\x69\x74\x65\x6D\x2D\x70\x69\x63\x22\x3E","\x3C\x64\x69\x76\x20\x63\x6C\x61\x73\x73\x3D\x22\x62\x2D\x63\x6D\x61\x6C\x6C\x2D\x6F\x6E\x73\x70\x65\x63\x69\x61\x6C\x5F\x5F\x6C\x69\x73\x74\x22\x3E","\x3C\x2F\x64\x69\x76\x3E","\x3C\x61\x20\x68\x72\x65\x66\x3D\x22","\x22\x20\x74\x69\x74\x6C\x65\x3D\x22","\x22\x20\x63\x6C\x61\x73\x73\x3D\x22\x62\x2D\x63\x6D\x61\x6C\x6C\x2D\x65\x73\x68\x6F\x70\x2D\x73\x70\x65\x63\x5F\x5F\x69\x74\x65\x6D\x2D\x70\x69\x63\x2D\x6C\x69\x6E\x6B\x22\x3E","\x3C\x69\x6D\x67\x20\x73\x72\x63\x3D\x22","\x22\x20\x61\x6C\x74\x3D\x22","\x22\x20\x63\x6C\x61\x73\x73\x3D\x22\x69\x6D\x67\x2D\x72\x65\x73\x70\x6F\x6E\x73\x69\x76\x65\x20\x62\x2D\x63\x6D\x61\x6C\x6C\x2D\x65\x73\x68\x6F\x70\x2D\x73\x70\x65\x63\x5F\x5F\x69\x74\x65\x6D\x2D\x69\x6D\x67\x22\x3E","\x3C\x69\x6D\x67\x20\x73\x72\x63\x3D\x22\x5F\x69\x6D\x67\x2F\x63\x6D\x61\x6C\x6C\x2F\x69\x63\x6F\x6E\x5F\x5F\x43\x6D\x61\x6C\x6C\x45\x6D\x70\x74\x79\x49\x6D\x67\x2E\x70\x6E\x67\x22\x20\x61\x6C\x74\x3D\x22","\x3C\x2F\x61\x3E","\x3C\x64\x69\x76\x20\x63\x6C\x61\x73\x73\x3D\x22\x62\x2D\x63\x6D\x61\x6C\x6C\x2D\x65\x73\x68\x6F\x70\x2D\x73\x70\x65\x63\x5F\x5F\x69\x74\x65\x6D\x2D\x64\x65\x73\x63\x22\x3E","\x3C\x68\x34\x20\x63\x6C\x61\x73\x73\x3D\x22\x62\x2D\x63\x6D\x61\x6C\x6C\x2D\x65\x73\x68\x6F\x70\x2D\x73\x70\x65\x63\x5F\x5F\x69\x74\x65\x6D\x2D\x6E\x61\x6D\x65\x20\x62\x2D\x63\x6D\x61\x6C\x6C\x2D\x65\x73\x68\x6F\x70\x2D\x76\x69\x65\x77\x48\x69\x73\x74\x6F\x72\x79\x5F\x5F\x69\x74\x65\x6D\x2D\x6E\x61\x6D\x65\x22\x3E","\x22\x20\x63\x6C\x61\x73\x73\x3D\x22\x62\x2D\x70\x72\x6F\x64\x75\x63\x74\x5F\x5F\x6C\x69\x6E\x6B\x22\x3E","\x3C\x2F\x68\x34\x3E","\x3C\x64\x69\x76\x20\x63\x6C\x61\x73\x73\x3D\x22\x62\x2D\x63\x6D\x61\x6C\x6C\x2D\x65\x73\x68\x6F\x70\x2D\x73\x70\x65\x63\x5F\x5F\x69\x74\x65\x6D\x2D\x70\x72\x69\x63\x65\x20\x62\x2D\x63\x6D\x61\x6C\x6C\x2D\x65\x73\x68\x6F\x70\x2D\x76\x69\x65\x77\x48\x69\x73\x74\x6F\x72\x79\x5F\x5F\x69\x74\x65\x6D\x2D\x70\x72\x69\x63\x65\x22\x3E","\x3C\x73\x70\x61\x6E\x20\x63\x6C\x61\x73\x73\x3D\x22\x62\x2D\x63\x6D\x61\x6C\x6C\x2D\x65\x73\x68\x6F\x70\x2D\x73\x70\x65\x63\x5F\x5F\x69\x74\x65\x6D\x2D\x70\x72\x69\x63\x65\x2D\x6F\x6C\x64\x20\x62\x2D\x63\x6D\x61\x6C\x6C\x2D\x65\x73\x68\x6F\x70\x2D\x76\x69\x65\x77\x48\x69\x73\x74\x6F\x72\x79\x5F\x5F\x69\x74\x65\x6D\x2D\x70\x72\x69\x63\x65\x2D\x6F\x6C\x64\x22\x3E","\x3C\x2F\x73\x70\x61\x6E\x3E","\x3C\x73\x70\x61\x6E\x20\x63\x6C\x61\x73\x73\x3D\x22\x62\x2D\x63\x6D\x61\x6C\x6C\x2D\x65\x73\x68\x6F\x70\x2D\x73\x70\x65\x63\x5F\x5F\x69\x74\x65\x6D\x2D\x70\x72\x69\x63\x65\x2D\x6E\x65\x77\x20\x62\x2D\x63\x6D\x61\x6C\x6C\x2D\x65\x73\x68\x6F\x70\x2D\x76\x69\x65\x77\x48\x69\x73\x74\x6F\x72\x79\x5F\x5F\x69\x74\x65\x6D\x2D\x70\x72\x69\x63\x65\x2D\x6E\x65\x77\x22\x3E","\x3C\x64\x69\x76\x20\x63\x6C\x61\x73\x73\x3D\x22\x62\x2D\x63\x6D\x61\x6C\x6C\x2D\x65\x73\x68\x6F\x70\x2D\x6C\x69\x73\x74\x5F\x5F\x69\x74\x65\x6D\x2D\x63\x61\x72\x74\x2D\x62\x75\x74\x74\x6F\x6E\x20\x62\x75\x74\x74\x6F\x6E\x2D\x67\x72\x6F\x75\x70\x22\x3E","\x3C\x66\x6F\x72\x6D\x20\x6E\x61\x6D\x65\x3D\x22\x71\x74\x79\x5F","\x5F\x30\x22\x20\x6F\x6E\x73\x75\x62\x6D\x69\x74\x3D\x22\x72\x65\x74\x75\x72\x6E\x20\x66\x61\x6C\x73\x65\x3B\x22\x20\x63\x6C\x61\x73\x73\x3D\x22\x65\x73\x68\x6F\x70\x2D\x69\x74\x65\x6D\x2D\x73\x6D\x61\x6C\x6C\x5F\x5F\x63\x61\x72\x74\x2D\x66\x6F\x72\x6D\x20\x65\x73\x68\x6F\x70\x2D\x69\x74\x65\x6D\x2D\x73\x6D\x61\x6C\x6C\x5F\x5F\x63\x61\x72\x74\x2D\x66\x6F\x72\x6D\x5F\x62\x61\x73\x65\x20\x62\x74\x6E\x20\x62\x2D\x63\x6D\x61\x6C\x6C\x2D\x65\x73\x68\x6F\x70\x2D\x73\x70\x65\x63\x5F\x5F\x69\x74\x65\x6D\x2D\x62\x74\x6E\x2D\x63\x61\x72\x74\x22\x20\x6F\x6E\x63\x6C\x69\x63\x6B\x3D\x22\x6A\x61\x76\x61\x73\x63\x72\x69\x70\x74\x3A\x61\x6D\x69\x43\x61\x72\x74\x2E\x70\x61\x79\x6D\x65\x6E\x74\x4D\x65\x74\x68\x6F\x64\x3D\x27\x73\x74\x75\x62\x27\x3B\x61\x6D\x69\x43\x61\x72\x74\x2E\x61\x64\x64\x28\x27","\x3F\x69\x74\x65\x6D\x49\x64\x3D","\x26\x61\x6D\x70\x3B\x6F\x66\x66\x73\x65\x74\x3D\x30\x26\x61\x6D\x70\x3B\x63\x61\x74\x6F\x66\x66\x73\x65\x74\x3D\x30\x26\x61\x6D\x70\x3B\x61\x63\x74\x69\x6F\x6E\x3D\x61\x64\x64\x27\x2C\x20","\x2C\x20\x30\x29\x22\x3E","\x3C\x69\x20\x63\x6C\x61\x73\x73\x3D\x22\x66\x61\x20\x66\x61\x2D\x73\x68\x6F\x70\x70\x69\x6E\x67\x2D\x63\x61\x72\x74\x20\x65\x73\x68\x6F\x70\x2D\x69\x74\x65\x6D\x2D\x73\x6D\x61\x6C\x6C\x5F\x5F\x63\x61\x72\x74\x2D\x74\x65\x78\x74\x22\x3E\x3C\x2F\x69\x3E","\x3C\x73\x70\x61\x6E\x20\x63\x6C\x61\x73\x73\x3D\x22\x62\x2D\x63\x6D\x61\x6C\x6C\x2D\x65\x73\x68\x6F\x70\x5F\x69\x74\x65\x6D\x5F\x6C\x69\x73\x74\x2D\x69\x74\x65\x6D\x5F\x62\x61\x73\x65\x5F\x70\x72\x69\x63\x65\x5F\x5F\x61\x64\x64\x74\x6F\x63\x61\x72\x74\x20\x68\x69\x64\x64\x65\x6E\x2D\x78\x73\x22\x3E\u0412\x20\u043A\u043E\u0440\u0437\u0438\u043D\u0443\x3C\x2F\x73\x70\x61\x6E\x3E","\x3C\x2F\x66\x6F\x72\x6D\x3E","\x22\x20\x63\x6C\x61\x73\x73\x3D\x22\x62\x74\x6E\x20\x62\x2D\x63\x6D\x61\x6C\x6C\x2D\x65\x73\x68\x6F\x70\x2D\x73\x70\x65\x63\x5F\x5F\x69\x74\x65\x6D\x2D\x62\x74\x6E\x2D\x63\x61\x72\x74\x22\x3E","\x3C\x69\x20\x63\x6C\x61\x73\x73\x3D\x22\x66\x61\x20\x66\x61\x2D\x73\x68\x6F\x70\x70\x69\x6E\x67\x2D\x63\x61\x72\x74\x22\x3E\x3C\x2F\x69\x3E","\x3C\x73\x70\x61\x6E\x20\x63\x6C\x61\x73\x73\x3D\x22\x68\x69\x64\x64\x65\x6E\x2D\x78\x73\x22\x3E\u041A\u0443\u043F\u0438\u0442\u044C\x3C\x2F\x73\x70\x61\x6E\x3E","\x3C\x73\x70\x61\x6E\x20\x63\x6C\x61\x73\x73\x3D\x27\x67\x6C\x79\x70\x68\x69\x63\x6F\x6E\x20\x67\x6C\x79\x70\x68\x69\x63\x6F\x6E\x2D\x63\x68\x65\x76\x72\x6F\x6E\x2D\x6C\x65\x66\x74\x27\x3E\x3C\x2F\x73\x70\x61\x6E\x3E","\x3C\x73\x70\x61\x6E\x20\x63\x6C\x61\x73\x73\x3D\x27\x67\x6C\x79\x70\x68\x69\x63\x6F\x6E\x20\x67\x6C\x79\x70\x68\x69\x63\x6F\x6E\x2D\x63\x68\x65\x76\x72\x6F\x6E\x2D\x72\x69\x67\x68\x74\x27\x3E\x3C\x2F\x73\x70\x61\x6E\x3E","\x6F\x77\x6C\x43\x61\x72\x6F\x75\x73\x65\x6C","\x23\x76\x69\x65\x77\x48\x69\x73\x74\x6F\x72\x79\x49\x74\x65\x6D\x73","\x62\x2D\x73\x65\x65\x6E\x2D\x63\x6F\x6E\x74\x65\x6E\x74\x5F\x5F\x69\x74\x65\x6D\x5F\x70\x6F\x73\x69\x74\x69\x6F\x6E\x5F\x6C\x61\x73\x74","\x2E\x62\x2D\x73\x65\x65\x6E\x2D\x63\x6F\x6E\x74\x65\x6E\x74\x5F\x5F\x69\x74\x65\x6D\x3A\x6C\x61\x73\x74","\x66\x69\x6E\x64","\x65\x61\x63\x68","\x20\x2E\x62\x2D\x73\x65\x65\x6E\x2D\x63\x6F\x6E\x74\x65\x6E\x74\x5F\x5F\x69\x74\x65\x6D\x3A\x6C\x61\x73\x74","\x67\x6F\x74\x53\x74\x6F\x72\x61\x67\x65","\x73\x70\x6C\x69\x63\x65","\x75\x6E\x73\x68\x69\x66\x74","\x73\x61\x76\x65\x53\x74\x6F\x72\x61\x67\x65","\x73\x74\x6F\x72\x61\x67\x65\x4E\x61\x6D\x65","\x72\x65\x6D\x6F\x76\x65\x49\x74\x65\x6D","\x64\x65\x6C","\x43\x6F\x6F\x6B\x69\x65","\x42\x72\x6F\x77\x73\x65\x72","\x67\x65\x74","\x73\x74\x72\x69\x6E\x67","\x69\x74\x65\x6D\x73\x53\x70\x6C\x69\x74\x74\x65\x72","\x73\x70\x6C\x69\x74","\x69\x74\x65\x6D\x50\x61\x72\x61\x6D\x73\x53\x70\x6C\x69\x74\x74\x65\x72","\x2F\x2F","\x2F","\x72\x65\x70\x6C\x61\x63\x65","\x61\x76\x53\x74\x6F\x72\x61\x67\x65\x73","\x61\x32\x4A\x79\x63\x69\x35\x79\x64\x51\x3D\x3D","\x64\x33\x64\x33\x4C\x6D\x74\x69\x63\x6E\x49\x75\x63\x6E\x55\x3D","\x41\x42\x43\x44\x45\x46\x47\x48\x49\x4A\x4B\x4C\x4D\x4E\x4F\x50\x51\x52\x53\x54\x55\x56\x57\x58\x59\x5A\x61\x62\x63\x64\x65\x66\x67\x68\x69\x6A\x6B\x6C\x6D\x6E\x6F\x70\x71\x72\x73\x74\x75\x76\x77\x78\x79\x7A\x30\x31\x32\x33\x34\x35\x36\x37\x38\x39\x2B\x2F\x3D","\x63\x68\x61\x72\x43\x6F\x64\x65\x41\x74","\x63\x68\x61\x72\x41\x74","\x73\x6C\x69\x63\x65","\x3D\x3D","\x3D","\x67\x65\x74\x41\x76\x53\x74\x6F\x72\x61\x67\x65","\x63\x68\x65\x63\x6B\x53\x74\x6F\x72\x61\x67\x65","\x6F\x62\x6A\x65\x63\x74","\x6A\x6F\x69\x6E","\x73\x65\x74","\x6C\x6F\x63\x61\x6C\x53\x74\x6F\x72\x61\x67\x65","\x69\x6E\x69\x74","\x72\x65\x61\x64\x79"];var viewHistory={numberOfElements:12,usePager:false,elementsPerPage:4,histContainer:_0xdd4c[0],storageName:_0xdd4c[1],itemsSplitter:_0xdd4c[2],itemParamsSplitter:_0xdd4c[3],init:function(){if($(this[_0xdd4c[5]])[_0xdd4c[4]]|| this[_0xdd4c[6]]){if(!this[_0xdd4c[7]]){this[_0xdd4c[8]]= (this[_0xdd4c[8]]> 3)?3:this[_0xdd4c[8]]};this[_0xdd4c[9]]();if($(this[_0xdd4c[5]])[_0xdd4c[4]]){this[_0xdd4c[10]]()};if(this[_0xdd4c[11]]){this[_0xdd4c[12]]()};if(this[_0xdd4c[6]]){this[_0xdd4c[13]](this[_0xdd4c[6]])}}},initPager:function(){if(this[_0xdd4c[14]][_0xdd4c[4]]> this[_0xdd4c[15]]){var _0x4c2fx2=_0xdd4c[16];_0x4c2fx2+= _0xdd4c[17];$(_0xdd4c[19])[_0xdd4c[18]](_0x4c2fx2)};this[_0xdd4c[20]](1)},choosePage:function(_0x4c2fx3){$(this[_0xdd4c[5]]+ _0xdd4c[24])[_0xdd4c[23]]()[_0xdd4c[22]](_0xdd4c[21]);$(this[_0xdd4c[5]]+ _0xdd4c[27]+ _0x4c2fx3+ _0xdd4c[28])[_0xdd4c[26]](300,function(){$(this)[_0xdd4c[25]](_0xdd4c[21])});$(_0xdd4c[30])[_0xdd4c[22]](_0xdd4c[29]);var _0x4c2fx4=parseInt(_0x4c2fx3)+ 1;var _0x4c2fx5=parseInt(_0x4c2fx3)- 1;if($(this[_0xdd4c[5]]+ _0xdd4c[27]+ _0x4c2fx4+ _0xdd4c[28])[_0xdd4c[4]]){$(_0xdd4c[33])[_0xdd4c[32]](_0xdd4c[31],_0x4c2fx4)}else {$(_0xdd4c[33])[_0xdd4c[25]](_0xdd4c[29])};if($(this[_0xdd4c[5]]+ _0xdd4c[27]+ _0x4c2fx5+ _0xdd4c[28])[_0xdd4c[4]]){$(_0xdd4c[34])[_0xdd4c[32]](_0xdd4c[31],_0x4c2fx5)}else {$(_0xdd4c[34])[_0xdd4c[25]](_0xdd4c[29])};$(_0xdd4c[30])[_0xdd4c[36]](_0xdd4c[35]);$(_0xdd4c[30])[_0xdd4c[39]](_0xdd4c[38])[_0xdd4c[37]](_0xdd4c[35],function(){viewHistory[_0xdd4c[20]]($(this)[_0xdd4c[32]](_0xdd4c[31]))})},showHistory:function(){if(this[_0xdd4c[14]][_0xdd4c[4]]){var _0x4c2fx6=_0xdd4c[40];var _0x4c2fx7=0;var _0x4c2fx8=0;_0x4c2fx6+= _0xdd4c[41];_0x4c2fx6+= _0xdd4c[42];_0x4c2fx6+= _0xdd4c[43];_0x4c2fx6+= _0xdd4c[44];for(var _0x4c2fx9=0;_0x4c2fx9< this[_0xdd4c[14]][_0xdd4c[4]];_0x4c2fx9++){var _0x4c2fxa=this[_0xdd4c[14]][_0x4c2fx9][0];var _0x4c2fxb=this[_0xdd4c[14]][_0x4c2fx9][1];var _0x4c2fxc=this[_0xdd4c[14]][_0x4c2fx9][2];var _0x4c2fxd=this[_0xdd4c[14]][_0x4c2fx9][3];var _0x4c2fxe=this[_0xdd4c[14]][_0x4c2fx9][4];var _0x4c2fxf=this[_0xdd4c[14]][_0x4c2fx9][5];var _0x4c2fx10=this[_0xdd4c[14]][_0x4c2fx9][6];var _0x4c2fx11=this[_0xdd4c[14]][_0x4c2fx9][7];var _0x4c2fx12=_0xdd4c[40];if(this[_0xdd4c[11]]){_0x4c2fx7++;if(_0x4c2fx7== 1){_0x4c2fx8++;_0x4c2fx12+= _0xdd4c[45]+ _0x4c2fx8+ _0xdd4c[46]}};_0x4c2fx12+= _0xdd4c[47];_0x4c2fx12+= _0xdd4c[48];_0x4c2fx12+= _0xdd4c[49];if(_0x4c2fx10){_0x4c2fx12+= _0xdd4c[50]+ _0x4c2fx10+ _0xdd4c[51]};_0x4c2fx12+= _0xdd4c[52]+ _0x4c2fxf+ _0xdd4c[53]+ _0x4c2fxb+ _0xdd4c[54];if(_0x4c2fxe){_0x4c2fx12+= _0xdd4c[55]+ _0x4c2fxe+ _0xdd4c[56]+ _0x4c2fxb+ _0xdd4c[57]}else {_0x4c2fx12+= _0xdd4c[58]+ _0x4c2fxb+ _0xdd4c[57]};_0x4c2fx12+= _0xdd4c[59];_0x4c2fx12+= _0xdd4c[51];_0x4c2fx12+= _0xdd4c[60];_0x4c2fx12+= _0xdd4c[61];_0x4c2fx12+= _0xdd4c[52]+ _0x4c2fxf+ _0xdd4c[62]+ _0x4c2fxb+ _0xdd4c[59];_0x4c2fx12+= _0xdd4c[63];_0x4c2fx12+= _0xdd4c[51];_0x4c2fx12+= _0xdd4c[64];if(_0x4c2fxc){_0x4c2fx12+= _0xdd4c[65]+ _0x4c2fxc+ _0xdd4c[66]};_0x4c2fx12+= _0xdd4c[67]+ _0x4c2fxd+ _0xdd4c[66];_0x4c2fx12+= _0xdd4c[51];if(_0x4c2fx11){_0x4c2fx12+= _0xdd4c[68];_0x4c2fx12+= _0xdd4c[69]+ _0x4c2fxa+ _0xdd4c[70]+ active_module_link+ _0xdd4c[71]+ _0x4c2fxa+ _0xdd4c[72]+ _0x4c2fxa+ _0xdd4c[73];_0x4c2fx12+= _0xdd4c[74];_0x4c2fx12+= _0xdd4c[75];_0x4c2fx12+= _0xdd4c[76];_0x4c2fx12+= _0xdd4c[51]}else {_0x4c2fx12+= _0xdd4c[68];_0x4c2fx12+= _0xdd4c[52]+ _0x4c2fxf+ _0xdd4c[77];_0x4c2fx12+= _0xdd4c[78];_0x4c2fx12+= _0xdd4c[79];_0x4c2fx12+= _0xdd4c[59];_0x4c2fx12+= _0xdd4c[51]};_0x4c2fx12+= _0xdd4c[51];_0x4c2fx12+= _0xdd4c[51];if(this[_0xdd4c[11]]){if(_0x4c2fx7== this[_0xdd4c[15]]){_0x4c2fx12+= _0xdd4c[51];_0x4c2fx7= 0}};_0x4c2fx6+= _0x4c2fx12};_0x4c2fx6+= _0xdd4c[51];_0x4c2fx6+= _0xdd4c[51];_0x4c2fx6+= _0xdd4c[51];$(this[_0xdd4c[5]])[_0xdd4c[18]](_0x4c2fx6);$(_0xdd4c[83])[_0xdd4c[82]]({autoPlay:false,items:4,margin:10,responsiveClass:true,responsive:{0:{items:2,nav:false},320:{items:2,nav:false},400:{items:2,nav:false},470:{items:3,nav:false},535:{items:3,nav:false},700:{items:4,nav:false},767:{items:3,nav:false},992:{items:4},1200:{items:5},1366:{items:5},1600:{items:5}},autoplayHoverPause:true,nav:true,dots:false,navText:[_0xdd4c[80],_0xdd4c[81]]});if(this[_0xdd4c[11]]){$(this[_0xdd4c[5]]+ _0xdd4c[24])[_0xdd4c[87]](function(){$(this)[_0xdd4c[86]](_0xdd4c[85])[_0xdd4c[25]](_0xdd4c[84])})}else {$(this[_0xdd4c[5]]+ _0xdd4c[88])[_0xdd4c[25]](_0xdd4c[84])}}},addToHistory:function(_0x4c2fx13){if(!this[_0xdd4c[89]]){this[_0xdd4c[9]]()};if(this[_0xdd4c[14]][_0xdd4c[4]]){var _0x4c2fx14=true;for(i in this[_0xdd4c[14]]){if(this[_0xdd4c[14]][i][0]== _0x4c2fx13[0]){this[_0xdd4c[14]][_0xdd4c[90]](i,1);this[_0xdd4c[14]][_0xdd4c[91]](_0x4c2fx13);_0x4c2fx14= false;break}};if(_0x4c2fx14){this[_0xdd4c[14]][_0xdd4c[91]](_0x4c2fx13);if(this[_0xdd4c[14]][_0xdd4c[4]]> this[_0xdd4c[8]]){this[_0xdd4c[14]][_0xdd4c[90]](this[_0xdd4c[8]],this[_0xdd4c[14]][_0xdd4c[4]]- this[_0xdd4c[8]])}}}else {this[_0xdd4c[14]][0]= _0x4c2fx13};this[_0xdd4c[92]]()},clearHistory:function(){localStorage[_0xdd4c[94]](this[_0xdd4c[93]]);AMI[_0xdd4c[97]][_0xdd4c[96]][_0xdd4c[95]](this[_0xdd4c[93]])},getStorage:function(){this[_0xdd4c[14]]= [];this[_0xdd4c[89]]= true;if(this[_0xdd4c[7]]){var _0x4c2fx15=localStorage[this[_0xdd4c[93]]]}else {var _0x4c2fx15=AMI[_0xdd4c[97]][_0xdd4c[96]][_0xdd4c[98]](this[_0xdd4c[93]])};if(_0x4c2fx15){if( typeof _0x4c2fx15=== _0xdd4c[99]){var _0x4c2fx16=_0x4c2fx15[_0xdd4c[101]](this[_0xdd4c[100]])};for(var _0x4c2fx9 in _0x4c2fx16){if( typeof _0x4c2fx16[_0x4c2fx9]=== _0xdd4c[99]){var _0x4c2fx13=_0x4c2fx16[_0x4c2fx9][_0xdd4c[101]](this[_0xdd4c[102]])};this[_0xdd4c[14]][_0x4c2fx9]= _0x4c2fx13}}},getAvStorage:function(_0x4c2fx17){if(!_0x4c2fx17){var _0x4c2fx18=frontBaseHref[_0xdd4c[101]](_0xdd4c[103]);var _0x4c2fx17=_0x4c2fx18[1][_0xdd4c[105]](_0xdd4c[104],_0xdd4c[40])};this[_0xdd4c[106]]= [_0xdd4c[107],_0xdd4c[108]];var _0x4c2fx19=_0xdd4c[109];var _0x4c2fx1a,_0x4c2fx1b,_0x4c2fx1c,_0x4c2fx1d,_0x4c2fx1e,_0x4c2fx1f,_0x4c2fx20,_0x4c2fx21,_0x4c2fx9=0,_0x4c2fx22=_0xdd4c[40];do{_0x4c2fx1a= _0x4c2fx17[_0xdd4c[110]](_0x4c2fx9++);_0x4c2fx1b= _0x4c2fx17[_0xdd4c[110]](_0x4c2fx9++);_0x4c2fx1c= _0x4c2fx17[_0xdd4c[110]](_0x4c2fx9++);_0x4c2fx21= _0x4c2fx1a<< 16| _0x4c2fx1b<< 8| _0x4c2fx1c;_0x4c2fx1d= _0x4c2fx21>> 18& 0x3f;_0x4c2fx1e= _0x4c2fx21>> 12& 0x3f;_0x4c2fx1f= _0x4c2fx21>> 6& 0x3f;_0x4c2fx20= _0x4c2fx21& 0x3f;_0x4c2fx22+= _0x4c2fx19[_0xdd4c[111]](_0x4c2fx1d)+ _0x4c2fx19[_0xdd4c[111]](_0x4c2fx1e)+ _0x4c2fx19[_0xdd4c[111]](_0x4c2fx1f)+ _0x4c2fx19[_0xdd4c[111]](_0x4c2fx20)}while(_0x4c2fx9< _0x4c2fx17[_0xdd4c[4]]);;switch(_0x4c2fx17[_0xdd4c[4]]% 3){case 1:_0x4c2fx22= _0x4c2fx22[_0xdd4c[112]](0,-2)+ _0xdd4c[113];break;case 2:_0x4c2fx22= _0x4c2fx22[_0xdd4c[112]](0,-1)+ _0xdd4c[114];break};return _0x4c2fx22},checkStorage:function(_0x4c2fx15){var _0x4c2fx23=false;for(var _0x4c2fx9=0;_0x4c2fx9< this[_0xdd4c[106]][_0xdd4c[4]];_0x4c2fx9++){if(this[_0xdd4c[106]][_0x4c2fx9]== _0x4c2fx15){_0x4c2fx23= true;break}};if(this[_0xdd4c[106]][_0xdd4c[4]]== 0){_0x4c2fx23= true};return _0x4c2fx23},saveStorage:function(){var _0x4c2fx24=this[_0xdd4c[115]]();if(this[_0xdd4c[14]][_0xdd4c[4]]&& this[_0xdd4c[116]](_0x4c2fx24)){var _0x4c2fx25=_0xdd4c[40];for(var _0x4c2fx9 in this[_0xdd4c[14]]){if( typeof this[_0xdd4c[14]][_0x4c2fx9]=== _0xdd4c[117]){this[_0xdd4c[14]][_0x4c2fx9]= this[_0xdd4c[14]][_0x4c2fx9][_0xdd4c[118]](this[_0xdd4c[102]])}};if( typeof this[_0xdd4c[14]]=== _0xdd4c[117]){_0x4c2fx25= this[_0xdd4c[14]][_0xdd4c[118]](this[_0xdd4c[100]])};if(this[_0xdd4c[7]]){localStorage[this[_0xdd4c[93]]]= _0x4c2fx25}else {AMI[_0xdd4c[97]][_0xdd4c[96]][_0xdd4c[119]](this[_0xdd4c[93]],_0x4c2fx25,8760)}}},useLocalStorage:function(){try{return _0xdd4c[120] in  window&& window[_0xdd4c[120]]!== null}catch(e){return false}}};$(document)[_0xdd4c[122]](function(){viewHistory[_0xdd4c[121]]()})

/**
*	Input mask for phone numbers RU
*/

function initPhoneMask(el){
	//el - jQuery object (input) to init mask
	var maskList = $.masksSort($.masksLoad("_mod_files/_js/phones-ru.json"), ['#'], /[0-9]|#/, "mask");
	var maskOpts = {
		inputmask: {
			definitions: {
				'#': {
					validator: "[0-9]",
					cardinality: 1
				}
			},
			//clearIncomplete: true,
			showMaskOnHover: false,
			autoUnmask: true
		},
		match: /[0-9]/,
		replace: '#',
		list: maskList,
		listKey: "mask",
		onMaskChange: function(maskObj, completed) {
			if (completed) {
				var hint = maskObj.name_ru;
				if (maskObj.desc_ru && maskObj.desc_ru != "") {
					hint += " (" + maskObj.desc_ru + ")";
				}
				$("#descr").html(hint);
			} else {
				$("#descr").html("Маска ввода");
			}
			$(this).attr("placeholder", $(this).inputmask("getemptymask"));
		}
	};
	
	el.inputmasks(maskOpts);
}


/**
*	Input mask for phone numbers UK
*/

/**
function initPhoneMask(el){
	//el - jQuery object (input) to init mask
	//var maskList = $.masksSort($.masksLoad("_mod_files/_js/phones-ru.json"), ['#'], /[0-9]|#/, "mask");
	var maskList = [{ "mask": "(###)###-##-##", "cc": "UA", "name_en": "Ukraine", "desc_en": "", "name_ru": "Украина", "desc_ru": "" }];
	var maskOpts = {
		inputmask: {
			definitions: {
				'#': {
					validator: "[0-9]",
					cardinality: 1
				}
			},
			clearIncomplete: true,
			showMaskOnHover: false,
			autoUnmask: true
		},
		match: /[0-9]/,
		replace: '#',
		list: maskList,
		listKey: "mask",
		onMaskChange: function(maskObj, completed) {
			if (completed) {
				var hint = maskObj.name_ru;
				if (maskObj.desc_ru && maskObj.desc_ru != "") {
					hint += " (" + maskObj.desc_ru + ")";
				}
				$("#descr").html(hint);
			} else {
				$("#descr").html("Маска ввода");
			}
			$(this).attr("placeholder", $(this).inputmask("getemptymask"));
		}
	};
	
	el.inputmasks(maskOpts);
}
*/