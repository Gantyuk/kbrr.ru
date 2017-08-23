/*
 * Date created: 2017-08-01 13:01:22
 */
/*
 * ATTENTION! This file is automatically created from several JavaScript files.
 * Find file path and name in the comments in the beginning of the each code block
 */


/*
 * FILE START: _shared/code/js/front_system.js
 */

if(typeof(DEBUG_BY_IP) == 'undefined'){
    DEBUG_BY_IP = false;
}

function show_picture(script, src, alt, width, height) {
    if(src.indexOf('__gen=1|') > 0){
        if((src.substring(0,7).toLowerCase()) == "http://"  &&  (src.substring(0,8).toLowerCase() == "https://")){
            script = src;
        }else if((script.substring(0,7).toLowerCase()) != "http://"  &&  (script.substring(0,8).toLowerCase() != "https://")){
            script = frontBaseHref + script;
            script = script + '?' + src;
        }else{
            script = script + '?' + src;
        }
    }else{
        script = src;
    }

    if(aMatches = script.match(/\.swf$/i)){
        AMI.UI.MediaBox.open(decodeURIComponent(script), width, height);
    }else{
        AMI.UI.MediaBox.open(decodeURIComponent(script));
    }
    return;
}

function show_details(script) {
    if (  (script.substring(0,7).toLowerCase()) != "http://"  &&  (script.substring(0,8).toLowerCase() != "https://" ) ){
        script = frontBaseHref + script;
    }

    var w_width = 200;
    var w_height = 250;

    if (w_height > window.screen.availHeight)
        w_height = window.screen.availHeight;
    if (w_width > window.screen.availWidth)
        w_width = window.screen.availWidth;

    window.open(script, "pic", "resizable=yes, status=yes, scrollbars=yes, width=" + w_width + ", height=" + w_height);
    //return false;
}


function none(){
    return false;
}

function isEmail(string) {
//    if (string.search(/^(\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+(;|,|$))+$/) != -1)
    if (string.search(/^(\w+[\w.-]*\@[A-Za-z0-9а-яёА-ЯЁ]+((\.|-+)[A-Za-z0-9а-яёА-ЯЁ]+)*\.[\-A-Za-z0-9а-яёА-ЯЁ]+(;|,|$))+$/) != -1)
        return true;
    else
        return false;
}

//
// following functions will be deleted later
//

function collect_link(cform){
    var vlink = '';
    var first = 1;

    for(var i=0; i<cform.length; i++){
        el = cform.elements[i];
        if(el.type == 'hidden'){
            delim = (first)?'':'&';
            vlink = vlink + delim + el.name + '=' + encodeURIComponent(el.value);
            first = 0;
        }
    }
    return vlink;
}

function view_item(id){
    var sform = document.forms[_cms_document_form];
    var link = _cms_script_link;

    sform.elements['sort'].value = '';
    sform.elements['sdim'].value = '';

    return user_click('view', id);
}

function user_click(action, id){
    var sform = document.forms[_cms_document_form];
    var link = _cms_script_link;
    var anchor = '#anchor';

    if(action!='edit') anchor='';
    sform.elements['action'].value = action;
    sform.elements['id'].value = id;
    document.location = link + collect_link(sform) + anchor;

    return false;
}

function _go_page(sform, start, varname) {
    if(typeof(sform.elements[varname]) == 'object') {
        sform.elements[varname].value = start;
    } else {
        sform.elements['offset'].value = start;
    }
}

function go_page(start, varname){
    var sform = document.forms[_cms_document_form];
    var link = _cms_script_link;
    _go_page(sform, start, varname);
    sform.elements['action'].value = 'rsrtme';
    document.location = link + collect_link(sform);
    return false;
}

function go_pageSubmit(start, varname, action){
    var sform = document.forms[_cms_document_form];
    var link = _cms_script_link;

    _go_page(sform, start, varname);
    sform.elements['action'].value = action;
    return CheckFilterForms(sform, true, 0, true);
    /*sform.submit();
     return false;*/
}

function go_pagesize(size){
    var sform = document.forms[_cms_document_form];
    var link = _cms_script_link;

    sform.elements['action'].value = 'rsrtme';
    sform.elements['limit'].value = size;
    if(typeof(sform.elements['enc_limit']) == 'object') {
        sform.elements['enc_limit'].value = size;
    }
    document.location = link + collect_link(sform);

    return false;
}

function resort(ccol,cdim){
    var sform = document.forms[_cms_document_form];
    var link = _cms_script_link;

    sform.elements['action'].value = 'rsrtme';
    sform.elements['sort'].value = ccol;
    sform.elements['sdim'].value = cdim;

    if(typeof(CheckFilterForm) == "function")
        CheckFilterForm(sform, 0, 0);
    else
        document.location = link + collect_link(sform);

    return false;
}

function resortSubmit(ccol,cdim){
    return advResortSubmit(ccol,cdim,"sort","sdim");
}

function advResortSubmit(ccol,cdim,ccolname,cdimname){
    var sform = document.forms[_cms_document_form];
    //var link = _cms_script_link;
    //sform.elements['action'].value = 'rsrtme';
    sform.elements[ccolname].value = ccol;
    sform.elements[cdimname].value = cdim;
    sform.submit();
    return false;
}

function publish(id, act){
    var sform = document.forms[_cms_document_form];
    var link = _cms_script_link;

    sform.action.value = 'publish';
    sform.publish.value = act;
    sform.id.value = id;
    document.location = link + collect_link(sform);

    return false;
}

function _setCookie(sName, sValue, path, oDate, useEncodeURIComponent){
    var pathStr = "";

    if( typeof(path) !="undefined" && path != "") {
        pathStr = "; path="+path;
    }
    delCookie(sName);
    document.cookie = sName + "=" + (useEncodeURIComponent ? encodeURIComponent(sValue) : encodeURIComponent(sValue)) + pathStr + "; expires="+oDate.toGMTString();
}

function setCookie(sName, sValue, path, days, hours, useEncodeURIComponent, minutes){

    var oDate = new Date();
    if (typeof(days) == "undefined" && typeof(hours) == "undefined" && typeof(minutes) == "undefined"){
        days = 30;
    }

    if (typeof(days) != "undefined") oDate.setDate(oDate.getDate() + days);
    if (typeof(hours) != "undefined") oDate.setHours(oDate.getHours() + hours);
    if (typeof(minutes) != "undefined") oDate.setMinutes(oDate.getMinutes() + minutes);

    _setCookie(sName, sValue, path, oDate, useEncodeURIComponent);
}

function delCookie(name, path, domain) {
    if(amiGetCookie(name) != null){
        document.cookie = name + "=" + (path ? ";path=" + path : "") + (domain ? ";domain=" + domain : "") + ";expires=Thu, 01-Jan-1970 00:00:01 GMT";
    }
}

amiCart = {
    prefix: '',
    useAJAX: typeof(use_background_cart) != 'undefined' && use_background_cart == '1',
    resultURL: '',
    isCheckout: false,

    add: function(url, itemId, numPrice, wrongPriceMsg){
        var qty = '1', price = '';

        if(itemId != 0 && document.forms[this.prefix + 'qty_' + itemId + '_' + numPrice]){
            var form = document.forms[this.prefix + 'qty_' + itemId + '_' + numPrice];

            if(form.qty){
                qty = form.qty.value;
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
        this.sendRequest(frontBaseHref, url, '&qty=' + encodeURIComponent(qty) + (price != '' ? '&price=' + encodeURIComponent(price) : ''))
    },

    addProp: function(url, itemId, propId, numPrice){
        if(AMI.Message.hasListeners('ON_BEFORE_ADD_TO_CART') && AMI.Message.send('ON_BEFORE_ADD_TO_CART', actionStatus, {})){
            // Message handled by listener
        }else{
            if(typeof(onBeforeAddToCartMessage) == 'function'){
                onBeforeAddToCartMessage();
            }
        }
        var resultUrl = '&qty=';

        if(itemId != 0 && document.forms[this.prefix + 'qty_' + itemId + '_' + propId + '_' + numPrice] && document.forms[this.prefix + 'qty_' + itemId + '_' + propId + '_' + numPrice].qty){
            resultUrl += document.forms[this.prefix + 'qty_' + itemId + '_' + propId + '_' + numPrice].qty.value;
        }else{
            resultUrl += '1';
        }
        this.prefix = '';
        this.sendRequest(frontBaseHref, url, resultUrl);
    },

    addItems: function(aData){
        if(typeof(aData) == 'undefined'){
            return false;
        }

        var resultUrl = '&action=add';
        var url = document.location.pathname;
        var j = 0;
        for(var i=0; i<aData.length; i++){

            var aItem = aData[i];

            var id = (typeof(aItem['id']) != 'undefined') ? aItem['id'] : false;
            if(!id){
                continue;
            }
            var price = (typeof(aItem['price']) != 'undefined') ? aItem['price'] : '';
            var qty      = (typeof(aItem['qty']) != 'undefined') ? aItem['qty'] : 1;
            var propId   = (typeof(aItem['propId']) != 'undefined') ? aItem['propId'] : 0;

            resultUrl += ('&itemId[' + j + ']=' + id);
            resultUrl += ('&qty[' + j + ']=' + qty);
            resultUrl += ('&num[' + j + ']=' + price);

            if(propId){
                resultUrl += ('&propId[' + j + ']=' + propId);
            }

            j++;
        }
        resultUrl += ('&url=' + url);

        if(AMI.Message.hasListeners('ON_BEFORE_ADD_TO_CART') && AMI.Message.send('ON_BEFORE_ADD_TO_CART', actionStatus, {})){
            // Message handled by listener
        }else{
            if(typeof(onBeforeAddToCartMessage) == 'function'){
                onBeforeAddToCartMessage();
            }
        }

        this.prefix = '';
        this.sendRequest(frontBaseHref, url, resultUrl);

    },

    /**
     * @access private
     */
    sendRequest: function(url, path, args){
        if(typeof(path) != 'undefined' && typeof(args) != 'undefined'){
            args += '&eshop_cart_simple=1';
            this.resultURL = url + path + args;
            AMI.HTTPRequest.getContent('POST', url, 'modlink=' + path.replace(/\?/,'&') + args, this.ajaxCallback);

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
                this.ajaxCallback
            );
        }
        this.isCheckout = !(this.resultURL.indexOf('&eshop_special=') == -1 || this.resultURL.indexOf('&url=') >= 0);
    },

    /**
     * @static
     */
    ajaxCallback: function(status, content){
        if(status == 1 && (cartStatusPos = content.indexOf('cart updated')) >= 0){
            content = content.substr(cartStatusPos);
            amiSession.loadVariables();
            var aVarNames = content.split('|');
            amiCart.updateBlock(aVarNames[1], aVarNames[2]);

            var actionStatus = '';
            for(i = 3; i < aVarNames.length; i++){
                actionStatus += (i > 3 ? '|' : '') + aVarNames[i];
            }
            if(AMI.Message.hasListeners('ON_ADDED_TO_CART') && AMI.Message.send('ON_ADDED_TO_CART', actionStatus, {})){
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
    },

    updateBlock: function(itemCountCookieName, totalCookieName){
        var cartItemCount = amiSession.get(itemCountCookieName);

        if(document.getElementById('idEshopCartIsNotEmpty')){
            document.getElementById('idEshopCartIsNotEmpty').style.display = (cartItemCount == '' || cartItemCount == 0 ? 'none' : 'block');
        }
        if(document.getElementById('idEshopCartIsEmpty')){
            document.getElementById('idEshopCartIsEmpty').style.display = (cartItemCount == '' || cartItemCount == 0 ? 'block' : 'none');
        }
        if(cartItemCount != ''){
            if(document.getElementById(itemCountCookieName)){
                document.getElementById(itemCountCookieName).innerHTML = cartItemCount;
            }
            if(document.getElementById(totalCookieName)){
                document.getElementById(totalCookieName).innerHTML = amiSession.get(totalCookieName);
            }
            if(document.getElementById('eshopCartEmpty')){
                document.getElementById('eshopCartEmpty').style.display = (cartItemCount > 0 ? 'inline' : 'none');
            }
        }
        if(typeof(onUpdateCartBlock) == 'function'){
            // backward compatibility
            onUpdateCartBlock(cartItemCount, amiSession.get(totalCookieName));
        }else if(typeof(this.onUpdateBlock) == 'function'){
            this.onUpdateBlock(cartItemCount, amiSession.get(totalCookieName));
        }
    },

    clear: function(callback){
        AMI.$.post(
            frontBaseHref + 'pages.php',
            {
                mod_link: 'members/cart',
                action: 'empty'
            },
            function(_cb){
                return function(){
                    if(document.getElementById('idEshopCartIsNotEmpty')){
                        document.getElementById('idEshopCartIsNotEmpty').style.display = 'none';
                    }
                    if(document.getElementById('idEshopCartIsEmpty')){
                        document.getElementById('idEshopCartIsEmpty').style.display = 'block';
                    }
                    if(typeof(_cb) == 'function'){
                        _cb();
                    }
                }
            }(callback)
        );
    }
}

amiCartShowItems  = {
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
        var propN = typeof(prop) != 'undefined' ? prop : '0'
        deletelink = url+'?action=del&id=eshop_'+id+'_'+propN+'&num='+num;
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
                //AMI.$(this).parents('form, .eshop-item-small__cart-text').addClass('eshop-add-to-cart__process-delete');
                amiCartShowItems.updateSpecblock();
            }
        });
    },
    updateSpecblock: function() {
        AMI.$.ajax({
            url: frontBaseHref+'/ami_service.php?service=eshop_cart&action=get_items_info',
            type: 'GET',
            dataType: 'json',
            success: function(data) {
                var totalPrice = data.total.price_formatted;
                var countItems = 0;
                $.map(data, function(val){
                    if(val[0] != undefined ) {
                        for(i=0;i<val.length;i++) {
                            countItems += val[i].qty;
                        }
                    }
                });
                AMI.$('.eshop-item-small__cart-text, .eshop-item-detailed__cart-box').removeClass('eshop-add-to-cart__process-remove');
                AMI.$('#eshop_cart_count').text(countItems);
                AMI.$('#eshop_cart_total').text(totalPrice);
            },
            error: function(data) {
                AMI.$('.eshop-item-small__cart-text, .eshop-item-detailed__cart-box').removeClass('eshop-add-to-cart__process-remove');
                AMI.$('.cart-small').removeClass('cart-small_not_empty');
                AMI.$('.cart-small__info').removeClass('cart-small__info_is_empty').show();
                AMI.$('#cart-small__info_not_empty').hide();
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
                        if(priceItems.find('.eshop-item-tooltip').length == 0) {
                            priceItems.children('.eshop-item-small__cart-text, .eshop-item-detailed__cart-text').append('<div class="eshop-item-tooltip tooltip-item__'+cartdata[i][b].itemId+'_'+cartdata[i][b].priceNum+'"><div class="eshop-item-tooltip-area"><span class="eshop-item-tooltip-title">'+added+' '+cartdata[i][b].qty+'</span><div class="eshop-item-tooltip__btn"><span class="eshop-item-tooltip__btn-delete">'+cartdelete+'</span><span class="eshop-item-tooltip__btn-cart">'+carttitle+'</span></div></div></div>');
                            priceItems.find('.eshop-item-tooltip__btn-cart').attr('onclick', 'location.href="'+carturl+'?itemid='+cartdata[i][b].itemId+'"; return false;');
                            priceItems.find('.eshop-item-tooltip__btn-delete').attr('onclick', 'amiCartShowItems.deleteItemsCart("'+carturl+'", "'+cartdata[i][b].itemId+'", "'+cartdata[i][b].priceNum+'"); return false;');
                            priceItems.find('.eshop-item-tooltip').fadeIn(600);
                        } else { // base price, if page is loaded
                            priceItems.find('.eshop-item-tooltip-title').text(added+' '+cartdata[i][b].qty);
                            priceItems.find('.eshop-item-tooltip').fadeIn(600);
                        }
                        if(typeinfo == 'get_items_info') {
                            // ... add custom for get_items_info type
                        }
                    }
                    if(AMI.$('.eshop-item-detailed__price-wrapper').length != 0) {
                        AMI.$('.eshop-item-detailed__price-wrapper').each(function() {
                            if(AMI.$(this).attr('onclick').search('qty_'+cartdata[i][b].itemId+'_'+cartdata[i][b].priceNum) >= 0) {
                                if(AMI.$(this).find('.eshop-item-tooltip').length == 0) {
                                    AMI.$(this).children('.eshop-item-small__cart-text, .eshop-item-detailed__cart-text').append('<div class="eshop-item-tooltip tooltip-item__'+cartdata[i][b].itemId+'_'+cartdata[i][b].priceNum+'"><div class="eshop-item-tooltip-area"><span class="eshop-item-tooltip-title">'+added+' '+cartdata[i][b].qty+'</span><div class="eshop-item-tooltip__btn"><span class="eshop-item-tooltip__btn-delete">'+cartdelete+'</span><span class="eshop-item-tooltip__btn-cart">'+carttitle+'</span></div></div></div>');
                                }
                                AMI.$(this).find('.eshop-item-tooltip-title').text(added+' '+cartdata[i][b].qty);
                                AMI.$(this).find('.eshop-item-tooltip__btn-cart').attr('onclick', 'location.href="'+carturl+'?itemid='+cartdata[i][b].itemId+'"; return false;');
                                AMI.$(this).find('.eshop-item-tooltip__btn-delete').attr('onclick', 'amiCartShowItems.deleteItemsCart("'+carturl+'", "'+cartdata[i][b].itemId+'", "'+cartdata[i][b].priceNum+'"); return false;');
                                AMI.$(this).find('.eshop-item-tooltip').fadeIn(600);
                            }
                        });
                    }
                }
                amiCartShowItems.cancelBubble();
            }
        });
    },
    propertiesItems: function(cartdata, carturl, added, typeinfo, countItems, carttitle, cartdelete) {
        var el = AMI.$('[name *= qty_]');
        if(AMI.$('#properties-items-popup').length == 0) {
            el.children('.eshop-item-small__cart-text, .eshop-item-detailed__cart-text').append('<div class="eshop-item-tooltip eshop-item-tooltip-prop"><div class="eshop-item-tooltip-area"><span class="eshop-item-tooltip-title"></span><span id="properties-items-popup"></span></div>');
            el.find('#properties-items-popup').after('<span class="eshop-item-tooltip__btn-cart">'+carttitle+'</span>');
        }
        AMI.$('#properties-items-popup').html('');
        AMI.$.each(cartdata, function(i) {
            if(cartdata[i].id == 'total') {
                // ... if is total (get_items_info)
            } else {
                countPropItems = 0;
                for(k=0;k<cartdata[i].length;k++) {
                    if(cartdata[i][k].propId != 0) {
                        if(AMI.$('[name *= qty_]').eq(0).attr('name').split('qty_')[1].split('_')[0] == cartdata[i][0].itemId) {
                            countPropItems += cartdata[i][k].qty;
                            for(m=0;m<cartdata[i][k].aPropInfo.length;m++) {
                                AMI.$('#properties-items-popup').append(cartdata[i][k].aPropInfo[m].name+': '+cartdata[i][k].aPropInfo[m].value+' ');
                                if(m == cartdata[i][k].aPropInfo.length-1) {
                                    AMI.$('#properties-items-popup').append('- '+cartdata[i][k].qty+' '+countItems+'<br>');
                                }
                            }
                        }
                    }
                }
                if(countPropItems != 0) {
                    el.find('.eshop-item-tooltip-title').html(added+' <span class="count-prop-items">'+countPropItems+'</span>');
                    el.find('.eshop-item-tooltip__btn-cart').attr('onclick', 'location.href="'+carturl+'?itemid='+cartdata[i][0].itemId+'"; return false;');
                    el.find('.eshop-item-tooltip').fadeIn();
                }
            }
        });
        amiCartShowItems.cancelBubble();
        this.tooltipHtml = el.find('.eshop-item-tooltip-prop').clone();
    },
    itemsData: function(typeinfo, carturl, paramUrl, added, countItems, carttitle, cartdelete) {
        AMI.$.ajax({
            url: frontBaseHref + 'ami_service.php',
            type: 'GET',
            dataType: 'JSON',
            data: paramUrl,
            success: function(cartdata) {
                if(cartdata.length == 0) {
                    return false;
                } else {
                    if(AMI.$('[name *= qty_]').length != 0) {
                        if (AMI.$('[name *= qty_]').attr('onclick') == undefined) {
                            amiCartShowItems.stockItems(cartdata, carturl, added, typeinfo, carttitle, cartdelete);
                        } else if(AMI.$('[name *= qty_]').eq(0).attr('onclick').search('propId') > 0) {
                            amiCartShowItems.propertiesItems(cartdata, carturl, added, typeinfo, countItems, carttitle, cartdelete);
                        } else {
                            amiCartShowItems.stockItems(cartdata, carturl, added, typeinfo, carttitle, cartdelete);
                        }
                    } else if (AMI.$('[data-prop-id]').length != 0) {
                        amiCartShowItems.propertiesItemsRow(cartdata, carturl, added, typeinfo, countItems, carttitle, cartdelete);
                    }
                    AMI.$('.eshop-item-small__cart-text, .eshop-item-detailed__cart-box').removeClass('eshop-add-to-cart__process-add');
                    AMI.$('.cart-small').addClass('cart-small_not_empty');
                    AMI.$('#cart-small__info_is_empty').hide();
                    AMI.$('#cart-small__info_not_empty').show();
                }
            }
        });
    },
    init: function(typeinfo, carturl, added, countItems, carttitle, cartdelete) {
        var init = true;
        if(init) {
            AMI.$('.eshop-item-small__cart-text, .eshop-item-detailed__cart-box').click(function(e) {
                if(AMI.$(e.target).hasClass('eshop-item-small__cart-text') || AMI.$(e.target).hasClass('eshop-item-detailed__cart-box') || AMI.$(e.target).hasClass('eshop-item-detailed__cart-text')) {
                    AMI.$(this).addClass('eshop-add-to-cart__process-add');
                } else if(AMI.$(e.target).hasClass('eshop-item-tooltip__btn-delete')) {
                    AMI.$(this).addClass('eshop-add-to-cart__process-remove');
                }
            });
            init = false;
        }
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
            if(AMI.$('#ami-eshop-properties__wrapper')) {
                setInterval(function() {
                    if(amiCartShowItems.tooltipHtml && AMI.$('#properties-items-popup').length == 0) {
                        AMI.$('.eshop-item-detailed__cart-text').append(amiCartShowItems.tooltipHtml);
                        AMI.$('.eshop-item-detailed__cart-text').find('.eshop-item-tooltip').animate({opacity: 1});
                    }
                }, 1000);
            }
        }
        if(AMI.$('#cart_items').length != 0 && location.href.indexOf('itemid') >= 0) {
            AMI.$('.txt[name*=eshop_'+location.search.split('=')[1].split('&')[0]+']').focus();
            AMI.$('.txt[name*=eshop_'+location.search.split('=')[1].split('&')[0]+']').parent().parent().addClass('cart_items__tr-select');
            setTimeout(function() {AMI.$('.txt[name*=eshop_'+location.search.split('=')[1].split('&')[0]+']').parent().parent().addClass('cart_items__tr')}, 1000);
        }
    }
}

/* backward compatibility { */
// @todo replace AddToCart by amiCart.add and delete this function
function AddToCart(url, itemId, numPrice, wrongPriceMsg){
    return amiCart.add(url, itemId, numPrice, wrongPriceMsg);
}

// @todo replace AddToCartProp by amiCart.addProp and delete this function
function AddToCartProp(url, itemId, propId, numPrice){
    return amiCart.addProp(url, itemId, propId, numPrice);
}
/* } backward compatibility */

/* ADVERTISING BLOCK */

var advCurTmStamp = new Date();
document.usedAdvData = "";
var isInnerHtmlSupported = -1;
var shownAdvPlaces = '';
var shownAdvPlacesCnt = 0;
var advReferrer = ''
var advPlaceCnts = [];
if(document.referrer)
    advReferrer = document.referrer;
function processShownAdvPlaces(shownAdvPlaces){
    counter = 0;
    pos = -1;
    res = "";
    while((pos = shownAdvPlaces.indexOf(';', pos+1)) >= 0){
        if((pos1 = shownAdvPlaces.indexOf(';', pos+1)) < 0)
            pos1 = shownAdvPlaces.length;
        if(pos1-pos-1 > 0){
            curAdvPlace = shownAdvPlaces.substr(pos+1, pos1-pos-1);

            if((cpos = curAdvPlace.indexOf('_')) >= 0){
                counter = curAdvPlace.substr(cpos+1)-1;
                curAdvPlace = curAdvPlace.substr(0, cpos);
            }

            advPlaceCnts[curAdvPlace] = ++counter;
            res += ';'+curAdvPlace+"_"+counter;
        }
    }
    if(res.length > 0)
        res += ';';
    return res;
}
function showAdvPlace(idPlace, viewURL){
    if(isInnerHtmlSupported == -1){
        if(document.body.innerHTML)
            isInnerHtmlSupported = 1;
        else
            isInnerHtmlSupported = 0;
    }
    // After the document is loaded (new scheme)
    if(isInnerHtmlSupported == 1){
        shownAdvPlacesCnt ++;
        document.write('<span id="advp_'+idPlace+'_'+(advPlaceCnts[idPlace] ? advPlaceCnts[idPlace] : shownAdvPlacesCnt)+'"></span>');
        shownAdvPlaces += (shownAdvPlaces == '' ? ';' : '')+idPlace+';';
        // Old scheme - inline method
    }else{
        if (!document.usedAdvData)
            document.usedAdvData = '';
        rndseed = new String(Math.random()); rndseed = rndseed.substring(2,11);
        document.write ("<" + "script language='JavaScript' type='text/javascript' src='"+viewURL+"aproc.php?action=view&rs="+advCurTmStamp.getTime()+rndseed+"&place="+idPlace+"&used="+document.usedAdvData+"&curl="+encodeURIComponent(viewURL)+"&referer="+encodeURIComponent(advReferrer)+"'><"+"/script>");
    }
}

function showAdvBanner(id, content){
    if(document.usedAdvData)
        document.usedAdvData += ','+id+',';
    else
        document.usedAdvData  = ','+id+',';
    document.writeln(content);
}

function aLnkClick(lnkID){
    var aLink = frontBaseHref+"aproc.php?action=lclick&id="+lnkID+"&page_url="+encodeURIComponent(document.location.href);
    advClick(aLink);
}

function advClick(clickURL){
    rndseed = new String(Math.random()); rndseed = rndseed.substring(2,11);
    clickURL+="&rs="+advCurTmStamp.getTime()+rndseed;
    img = new Image();
    img.src = clickURL;
}

var advPlacesContent = [];
var fillAdvPlaceWatcher = [];
function fillAdvPlace(idPlace, idCnt, placeContent){
    if(advPlacesContent[idPlace+'_'+idCnt] == undefined)
        advPlacesContent[idPlace+'_'+idCnt] = placeContent;
    if(fillAdvPlaceWatcher[idPlace+'_'+idCnt] == undefined)
        fillAdvPlaceWatcher[idPlace+'_'+idCnt] = 0;
    if(document.getElementById && document.getElementById('advp_'+idPlace+'_'+idCnt) && document.getElementById('advp_'+idPlace+'_'+idCnt).innerHTML != undefined){
        document.getElementById('advp_'+idPlace+'_'+idCnt).innerHTML = advPlacesContent[idPlace+'_'+idCnt];
    }else{
        fillAdvPlaceWatcher ++;
        if(fillAdvPlaceWatcher < 1000)
            setTimeout("fillAdvPlace('"+idPlace+"', '"+idCnt+"');", 100);
    }
}

/* MODULE ADVERTISEMENT PART [not in use] */
/*
 // String that contains module show data
 var modAdvIdsArr = [];

 // Set item view
 function setView(modName, bodyType, id, idPlace){
 if(isNaN(idPlace))
 idPlace = 0;
 var isFound = 0;
 for(var i = 0; i < modAdvIdsArr.length; i++){
 if(modAdvIdsArr[i][0] == modName){
 modAdvIdsArr[i][1] += '|'+bodyType+id+','+idPlace;
 isFound = 1;
 break;
 }
 }
 if(!isFound)
 modAdvIdsArr[modAdvIdsArr.length] = [modName, bodyType+id+','+idPlace];
 }
 // Process gathered adv IDs
 function processViewAdvIds(){
 var retStr = '';
 for(var i = 0; i < modAdvIdsArr.length; i++)
 retStr += (retStr != '' ? ';' : '')+modAdvIdsArr[i][0]+'='+modAdvIdsArr[i][1];
 alert(retStr);
 return retStr;
 }
 */

// Returns cookie value
function getPlainCookie(name){
    // cookies are separated by semicolons
    var aCookie = document.cookie.split("; ");
    var value = "";
    for (var i=0; i < aCookie.length; i++){
        // a name/value pair (a crumb) is separated by an equal sign
        var aCrumb = aCookie[i].split("=");
        if (name == aCrumb[0]){
            if(aCrumb[1] === undefined) {
                value = null;
            }else{
                value = aCrumb[1];
            }
            return value;
        }
    }

    // a cookie with the requested name does not exist
    return null;
}

function amiGetCookie(name, replaceEncodedSpaces){
    var val = getPlainCookie(name);

    if(val != null){
        if(replaceEncodedSpaces){
            val = decodeURIComponent(val);
            val = val.replace(/\+/g, ' ');
        }else{
            val = decodeURIComponent(val);
        }
    }

    return val;
}

var getCookie = amiGetCookie;
/*
 function updateCookieExpireTime(name, minutes){
 var oDate = new Date();
 if (typeof(minutes) != "undefined") oDate.setMinutes(oDate.getMinutes() + minutes);

 var val = amiGetCookie(name);
 if(val != null){
 _setCookie(name, val, "/", oDate);
 }
 }
 */
// {{{ window.onLoad events queue implementation

var onLoadEvents = [];
var previousOnLoadEvent = null;
var onLoadHandlerSaved = false;

function addOnLoadEvent(event) {
    onLoadEvents[onLoadEvents.length] = event;
}

function runOnLoadEventsQueue() {
    if (previousOnLoadEvent) {
        previousOnLoadEvent();
    }
    for (var i = 0 ; i < onLoadEvents.length; i++) {
        onLoadEvents[i]();
    }
}

function savePreviousOnLoadEvent() {
    if(!onLoadHandlerSaved){
        previousOnLoadEvent = window.onload;
        window.onload = runOnLoadEventsQueue;
        onLoadHandlerSaved = true;
    }
}

// }}}

function setCaptchaMD5Hash(sid)
{
    var cookie = amiGetCookie('captcha_' + sid);
    if (cookie != null && cookie.length) {
        clearInterval(eval("intervalId_" + sid));
        eval("captcha_" + sid + " = cookie;");
        var path    = null;
        var domain  = null;
        if (location) {
            domain = location.host;
            path = frontBaseHref.replace(/^\w+\:\/\/[^\/]+/, '');
        }
        delCookie('captcha_' + sid, path, domain);
    }
}

if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(val, fromIndex) {
        if (typeof(fromIndex) != 'number') {
            fromIndex = 0;
        }
        for (var index = fromIndex,len = this.length; index < len; index++) {
            if (this[index] == val) {
                return index;
            }
        }
        return -1;
    }
}

if (!Array.prototype.splice) {
    Array.prototype._splice = function(start) {
        if (start >= this.length) {
            return;
        }
        return this.slice(start);
    }
    Array.prototype._splice = function(start, deleteCount) {
        if (start >= this.length) {
            return;
        }
        return this.slice(0, start-1).concat(this.slice(start + deleteCount));
    }
}

function cloneArray(source)
{
    var destination = [];
    for (var i = 0 ; i < source.length ; i++) {
        if (!(typeof(source[i]) == 'undefined')) {
            destination[i] = source[i];
        }
    }
    return destination;
}

/* products comparison */

/* Start Ajax Compare */

ajaxAddCompare = {
    init: function() {
        if(typeof ajaxAddCompareLang == 'undefined') return false;
        var thisObj = this;
        var localCmsCompare = getCookie('cms_compare');
        if(AMI.$('.add-to-comparison__el').length > 0) {
            AMI.$('.add-to-comparison__el').click(function() {
                thisObj.checkCompare(AMI.$(this), thisObj);
            });
            AMI.$('.add-to-comparison__el').each(function() {
                if(localCmsCompare != null && localCmsCompare  != '' && localCmsCompare.indexOf(AMI.$(this).attr('data-compare-key')) >= 0) {
                    AMI.$(this).addClass('add-to-comparison__el-selected');
                    AMI.$(this).find('input').attr('checked', 'checked');
                    AMI.$(this).find('span').text(ajaxAddCompareLang.titleBtnDelete);
                }
            });
        }
    },
    checkCompare: function(el, thisObj) {
        var compareLink = el.attr('data-compare');
        var compareKey = el.attr('data-compare-key');
        var compareName = el.attr('data-compare-name');
        var compareURL = el.attr('data-compare-url');
        var compareList = getCookie('cms_compare');
        if(compareList != null && compareList != '' && compareList.indexOf(compareKey) >= 0) {
            thisObj.deleteCompare(thisObj, el, compareName, compareURL, compareLink, compareKey, compareList);
        } else {
            thisObj.addToCompare(thisObj, el, compareName, compareURL, compareLink, compareKey, compareList);
        }
    },
    addToCompare: function(thisObj, el, compareName, compareURL, compareLink, compareKey, compareList) {
        if(AMI.$('.add-to-comparison__el-add-process').length == 0) {
            if(compareList == null || compareList == '') {
                compareList = compareKey;
            } else {
                compareList += ';'+compareKey;
            }
            el.addClass('add-to-comparison__el-add-process');
            el.find('input').attr('checked', 'checked');
            AMI.$('.add-to-comparison__el input').attr('disabled', 'disabled');
            AMI.$.ajax({
                url: compareURL + '?action=compare&products=' + compareKey,
                type: "GET",
                success: function(){
                    AMI.$('.add-to-comparison__el input').removeAttr('disabled');
                    el.removeClass('add-to-comparison__el-add-process');
                    el.addClass('add-to-comparison__el-selected');
                    el.find('span').text(ajaxAddCompareLang.titleBtnDelete);
                    thisObj.updateSpecblock(thisObj, compareList, compareName, compareURL, compareKey, compareLink, 'add');
                    alert(ajaxAddCompareLang.alertItem+'"'+compareName+'"'+ajaxAddCompareLang.alertAdd);
                }
            });
        } else {
            return false;
        }
    },
    deleteAll: function() {
        var thisObj = this;
        AMI.$('.add-to-comparison__el input').attr('disabled', 'disabled');
        AMI.$('.compare_small_body .compare_small_clear_link').addClass('add-to-comparison__el-add-process');
        AMI.$('.compare_small_body a').attr('onclick', 'return false');
        AMI.$.ajax({
            url: frontBaseHref + '?action=compareClear',
            type: "GET",
            success: function(){
                AMI.$('#compare_block_top__informer').removeClass('mobile-head-informer__show');
                AMI.$('.add-to-comparison__el').removeClass('add-to-comparison__el-selected');
                AMI.$('.compare_small_body .compare_small_clear_link').removeClass('add-to-comparison__el-add-process');
                AMI.$('.add-to-comparison__el input').removeAttr('disabled');
                AMI.$('.add-to-comparison__el input').removeAttr('checked');
                AMI.$('.add-to-comparison__el span').text(ajaxAddCompareLang.titleBtnAdd);
                AMI.$('.compare_small_body').html('<span class="empty_comparison_list">'+ajaxAddCompareLang.listEmpty+'</span>');
                alert(ajaxAddCompareLang.listClear);
            }
        });
    },
    deleteCompare: function(thisObj, el, compareName, compareURL, compareLink, compareKey, compareList) {
        if(AMI.$('.add-to-comparison__el-add-process').length == 0) {
            if(compareList.indexOf(compareKey) >= 0) {
                var newCompareList;
                var submitUrl;
                newCompareList = compareList.split(';');
                newCompareList.splice(newCompareList.indexOf(compareKey), 1);
                if(newCompareList.length == 0) {
                    compareList = '';
                    submitUrl = frontBaseHref + '?action=compareClear';
                } else {
                    compareList = newCompareList.join(';');
                    submitUrl = frontBaseHref + compareLink + '?p=' + compareList + '&h=&v=all';
                }
            }
            el.addClass('add-to-comparison__el-add-process');
            el.removeClass('add-to-comparison__el-selected');
            el.find('input').removeAttr('checked');
            AMI.$('.add-to-comparison__el input').attr('disabled', 'disabled');
            AMI.$.ajax({
                url: submitUrl,
                type: "GET",
                success: function(){
                    AMI.$('.add-to-comparison__el input').removeAttr('disabled');
                    el.removeClass('add-to-comparison__el-add-process');
                    el.find('span').text(ajaxAddCompareLang.titleBtnAdd);
                    thisObj.updateSpecblock(thisObj, compareList, compareName, compareURL, compareKey, compareLink, 'delete');
                    alert(ajaxAddCompareLang.alertItem+'"'+compareName+'"'+ajaxAddCompareLang.alertDelete);
                }
            });
        } else {
            return false;
        }
    },
    updateSpecblock: function(thisObj, compareList, compareName, compareURL, compareKey, compareLink, status) {
        if(AMI.$('.compare_small_body').length > 0) {
            var countItems;
            if(compareList == '') {
                countItems = 0;
                AMI.$('#compare_block_top__informer').removeClass('mobile-head-informer__show');
            } else {
                if(compareList.indexOf(';') >= 0) {
                    countItems = compareList.split(';').length;
                } else {
                    countItems = 1;
                }
                AMI.$('#compare_block_top__informer').addClass('mobile-head-informer__show');
            }
            AMI.$('#compare_block_top__informer').text(countItems);

            if(countItems == 0) {
                AMI.$('.compare_small_body').html('<span class="empty_comparison_list">'+ajaxAddCompareLang.listEmpty+'</span>');
                return false;
            }

            if(AMI.$('.compare_small_list_tbl').length == 0) { // compare list is empty
                AMI.$('.empty_comparison_list').css('display', 'none');
                AMI.$('.compare_small_body').append('<div class="compare_small_list_tbl"><div class="compare__selected_items_row-list"><div class="compare__selected_items_row">'+ajaxAddCompareLang.compareSelected+': '+countItems+'</div></div></div>');
                AMI.$('.compare__selected_items_row-list').append('<div class="compare_small_list_tbl__row"><a href="'+compareURL+'">'+compareName+'</a></div>');
                AMI.$('.compare_small_list_tbl').after('\
                    <div class="compare_small_link"><a href="'+frontBaseHref+compareLink+'?p='+compareList+'" class="sz4" target="_blank">'+ajaxAddCompareLang.titleBtnCompare+'</a></div>\
                    <div class="compare_small_clear_link"><a href="#" onclick="ajaxAddCompare.deleteAll(); return false;" class="sz4">'+ajaxAddCompareLang.titleBtnClear+'</a></div>\
                    <div class="compare_small_both"></div>\
                ');
                if(countItems == 1) {
                    AMI.$('.compare_small_body .compare_small_link').css('display', 'none');
                }
            } else { // compare list is not empty
                if(status == 'add') { // compare add action
                    AMI.$('.compare_small_list_tbl .compare__selected_items_row').text(ajaxAddCompareLang.compareSelected+': '+countItems);
                    AMI.$('.compare__selected_items_row-list').append('<div class="compare_small_list_tbl__row"><a href="'+compareURL+'">'+compareName+'</a></div>');
                    AMI.$('.compare_small_body .compare_small_link').html('<a href="'+frontBaseHref+compareLink+'?p='+compareList+'" class="sz4" target="_blank">'+ajaxAddCompareLang.titleBtnCompare+'</a>').css('display', 'block');
                } else { // compare delete action
                    AMI.$('.compare_small_list_tbl__row').each(function() {
                        if(compareURL.indexOf(AMI.$(this).find('a').attr('href')) >= 0) {
                            AMI.$(this).remove();
                        }
                    });
                    AMI.$('.compare_small_list_tbl .compare__selected_items_row').text(ajaxAddCompareLang.compareSelected+': '+countItems);
                    if(countItems == 1) {
                        AMI.$('.compare_small_body .compare_small_link').css('display', 'none');
                    } else {
                        AMI.$('.compare_small_body .compare_small_link').html('<a href="'+frontBaseHref+compareLink+'?p='+compareList+'" class="sz4" target="_blank">'+ajaxAddCompareLang.titleBtnCompare+'</a>').css('display', 'block');
                    }
                }
            }
        }
    }
}

addOnLoadEvent(function(){
    ajaxAddCompare.init();
});

/* End Ajax Compare */

var
    mComparisonList = [],
    mComparisonURL = '';

function compare(key)
{
    if (compareProducts.indexOf(key) >= 0) {
        alert(compareInComparisonAlready);
        return false;
    }
    if (mComparisonList.length && !confirm(compareAddSelected)) {
        return false;
    }
    if (compareProducts.length == compareMaxQuantity) {
        alert(compareMaxMessage);
        return false;
    }
    if (mComparisonList.indexOf(key) < 0) {
        mComparisonList.push(key);
    }

    // check for different datasets
    if (compareDisallowDifferentDatasets && compareProducts.length > 0) {
        var datasetId = compareDatasetId;
        var _mComparisonList = cloneArray(mComparisonList);
        for (var i = 0, qty = _mComparisonList.length ; i < qty ; i++) {
            var p = _mComparisonList[i].split('-'); // p[2] is containing datasetId now
            if (!compareDatasetId) {
                compareDatasetId = p[2];
            }
            if (compareDatasetId != p[2]) {
                if (!confirm(compareConfirmOtherDataset)) {
                    return false;
                }
                break;
            }
        }
    }
    return mSubmitAddToCompare();
}

function compareClear()
{
    if (confirm(compareConfirmListClearing)) {
        document.location = location.pathname + '?action=compareClear';
    }
    return false;
}

function mCompare(oCheckbox)
{
    var key = oCheckbox.value;
    if (oCheckbox.checked) {
        // exclude duplicates
        if (compareProducts.indexOf(key) >= 0) {
            alert(compareInComparisonAlready);
            oCheckbox.checked = false;
            return false;
        }
        // check for max quantity of products to compare
        if (compareProducts.length == compareMaxQuantity) {
            alert(compareMaxMessage);
            oCheckbox.checked = false;
            return false;
        }
        // check for different datasets
        if (compareDisallowDifferentDatasets) {
            var p = key.split('-');
            if ((compareProducts.length + mComparisonList.length) > 0 && p[2] != copmpareLastDatasetId && !confirm(compareConfirmOtherDataset)) {
                oCheckbox.checked = false;
                return false;
            }
            copmpareLastDatasetId = p[2];
            // uncheck checked products having other dataset
            var _mComparisonList = cloneArray(mComparisonList);
            for (var i = 0, qty = _mComparisonList.length ; i < qty ; i++) {
                var p = _mComparisonList[i].split('-');
                if (p[2] != copmpareLastDatasetId) {
                    var o = document.getElementById('cmp_' + _mComparisonList[i]);
                    o.checked = false;
                    mCompare(o);
                }
            }
            // count real number of products to comapere after adding
            var _compareProducts = cloneArray(compareProducts);
            for (var i = 0, qty = compareProducts.length ; i < qty ; i++) {
                var p = compareProducts[i].split('-');
                if (p[2] != copmpareLastDatasetId) {
                    var index = _compareProducts.indexOf(compareProducts[i]);
                    if (Array.prototype.splice) {
                        _compareProducts.splice(index, 1);
                    } else {
                        _compareProducts = mComparisonList._splice(index, 1);
                    }
                }
            }
            // check for max quantity of products to compare after manipulations
            if (_compareProducts.length + mComparisonList.length >= compareMaxQuantity) {
                alert(compareMaxMessage);
                oCheckbox.checked = false;
                return false;
            }
        }
        mComparisonList.push(key);
    } else {
        var index = mComparisonList.indexOf(key);
        if (index > -1) {
            if (Array.prototype.splice) {
                mComparisonList.splice(index, 1);
            } else {
                mComparisonList = mComparisonList._splice(index, 1);
            }
            copmpareLastDatasetId = compareDatasetId;
        }
    }
}

function mSubmitAddToCompare()
{
    var qty = mComparisonList.length;

    if (!qty) {
        alert(compareListIsEmpty);
        return false;
    }

    var _mComparisonList = cloneArray(mComparisonList);

    // check for added already products and exclude its from mComparisonList
    for (var i = 0 ; i < qty ; i++) {
        var index = compareProducts.indexOf(_mComparisonList[i]);
        if (index >= 0) {
            // exclude duplicate product
            if (Array.prototype.splice) {
                mComparisonList.splice(_mComparisonList.indexOf(mComparisonList[i]), 1);
            } else {
                mComparisonList = mComparisonList._splice(_mComparisonList.indexOf(mComparisonList[i]), 1);
            }
        }
    }

    document.location = location.pathname + '?action=compare&products=' + _mComparisonList.join(';');
    return false;
}

function mCompareSelected(url)
{
    if (mComparisonList.length < 2) {
        if (mComparisonList.length < 1 && compareProducts.length > 1) {
            window.open(frontBaseHref + url + '?p=' + compareProducts.join(';') + '&h=&v=all&lay_id=100');
            return false;
        }
        alert(compareListInsufficient);
        return false;
    }
    if (compareProducts.length && !confirm(compareConfirmPreviousClearing)) {
        return false;
    }
    window.open(frontBaseHref + url + '?p=' + mComparisonList.join(';') + '&h=&v=all&lay_id=100');
    return false;
}

/* /products comparison */

function getXPos(elem){
    x = 0;
    do { x += elem.offsetLeft; }
    while((elem = elem.offsetParent) != null);
    return x;
}

function getYPos(elem){
    y = 0;
    do { y += elem.offsetTop; }
    while((elem = elem.offsetParent) != null);
    return y;
}

var calendarBlock;
var calendarDateFieldName;

function insertAfter(newChild, refChild) {
    refChild.parentNode.insertBefore(newChild,refChild.nextSibling);
}

function getCalendar(in_dateField, lang, dateFormat, divIdPrefix){

    var elevPrefix = typeof(divIdPrefix) == 'undefined' ? '' : divIdPrefix;

    calendarTarget = in_dateField;
    calendarBlock = document.getElementById(elevPrefix + "calendar_block");
    if(calendarBlock && (calendarBlock.style.display!="block" || (in_dateField.form.name + in_dateField.name!=calendarDateFieldName))){
        calendarDateFieldName = in_dateField.form.name + in_dateField.name;
        var pos = AMI.Browser.getObjectPosition(calendarTarget, true);
        var cLeft = pos[0];
        var cTop = pos[1];

        var dconfAddon = '';
        if(typeof(dateFormat) != 'undefined' && dateFormat != ''){
            dconfAddon = '&date_format='+dateFormat;
        }

        document.getElementById(elevPrefix + "calendar_block_frm").src = "calendar.php?v=2&lang="+lang+dconfAddon;
        calendarBlock.style.position = 'absolute';
        calendarBlock.style.display="block";

        calendarBlock.parentNode = null;
        insertAfter(calendarBlock, calendarTarget);

        var correctLeft = calendarTarget.offsetWidth + 10;
        var correctTop = calendarTarget.offsetHeight;

        calendarBlock.style.left = (cLeft + correctLeft) + 'px';
        calendarBlock.style.top = (cTop + correctTop) + 'px';

        document.getElementById(elevPrefix + "calendar_block_frm").contentWindow.document.body.focus();
    }else if(calendarBlock){
        calendarBlock.style.display="none";
    }
}

function replaceDateTitle(objId){
    var objObj = document.getElementById(objId);
    if(objObj){
        var curDate = objObj.innerHTML;
        var rxToday = new RegExp(DATE_CONVERTION[2].replace(/\./g, "\\."));
        var rxYesterday = new RegExp(DATE_CONVERTION[3].replace(/\./g, "\\."));
        curDate = curDate.replace(rxToday, DATE_CONVERTION[0]);
        curDate = curDate.replace(rxYesterday, DATE_CONVERTION[1]);
        objObj.innerHTML = curDate;
    }
}

/*
 Пример использования календаря
 <div  id="calendar_block"  style="display:none;position:absolute;background-color:#f8f8f8;width:220px;height:345px;"><table border="0" cellpadding="0" cellspacing="0" width=100% height=100%><tr><td style="padding:0px;"><iframe id="calendar_block_frm" width=100% height=100% src="calendar.php" frameborder=0 scrolling=no></iframe></td></tr></table></div>

 <form name=fltform>
 дата:
 <input type="text" name="testday" value="01.04.2007">
 <a href="javascript:getCalendar(document.fltform.testday, 'ru');">
 <img src="_img/calendar.gif" border=0></a>
 </form>
 */

function saveURLHistory(){
    var uh_prev_mod = amiGetCookie('uh_prev_mod');
    var uh_prev_url = amiGetCookie('uh_prev_url');
    var uh_curr_mod = amiGetCookie('uh_curr_mod');
    var uh_curr_url = amiGetCookie('uh_curr_url');

    delCookie('uh_prev_mod', "/");
    delCookie('uh_prev_url', "/");
    delCookie('uh_curr_mod', "/");
    delCookie('uh_curr_url', "/");

    if(uh_curr_mod == null){
        setCookie('uh_prev_mod', active_module, "/");
        setCookie('uh_prev_url', active_module_link, "/");
        setCookie('uh_curr_mod', active_module, "/");
        setCookie('uh_curr_url', active_module_link, "/");
    }else if(uh_curr_mod != active_module){
        setCookie('uh_prev_mod', uh_curr_mod, "/");
        setCookie('uh_prev_url', uh_curr_url, "/");
        setCookie('uh_curr_mod', active_module, "/");
        setCookie('uh_curr_url', active_module_link, "/");
    }else{
        setCookie('uh_prev_mod', uh_prev_mod, "/");
        setCookie('uh_prev_url', uh_prev_url, "/");
        setCookie('uh_curr_mod', active_module, "/");
        setCookie('uh_curr_url', active_module_link, "/");
    }
}

saveURLHistory();

function amiFrontCommonClass(){
    this.serialize = function(oData){
        var result = '';
        if(typeof(oData) == "object"){
            if(oData instanceof Array){
                result += 'a';
                for(var i = 0; i < oData.length; i++){
                    var item = oData[i].toString();
                    result += item.length.toString() + '.' + item;
                }
            }else{
                result += 'o';
                for(var oKey in oData){
                    result += oKey.length.toString() + '.' + oKey + oData[oKey].length.toString() + '.' + oData[oKey];
                }
            }
        }
        return result;
    }

    this.unserialize = function(oString){
        var oData = null;
        if(oString.charAt(0) == 'a' || oString.charAt(0) == 'o'){
            var isArray = oString.charAt(0) == 'a';
            if(isArray){
                oData = [];
            }else{
                oData = new Object();
            }
            var dataLength = '';
            var isShouldBeKey = isArray ? false : true;
            var keyValue = '';
            for(var i = 1; i < oString.length; i++){
                if(oString.charAt(i).match(/\d/)){
                    dataLength += oString.charAt(i);
                }else if(oString.charAt(i) == '.'){
                    dataLength = parseInt(dataLength);
                    if(isShouldBeKey){
                        keyValue = oString.substr(i + 1, dataLength);
                        isShouldBeKey = false;
                    }else{
                        if(isArray){
                            oData[oData.length] = decodeURIComponent(oString.substr(i + 1, dataLength));
                        }else{
                            oData[keyValue] = decodeURIComponent(oString.substr(i + 1, dataLength));
                            isShouldBeKey = true;
                        }
                        keyValue = '';
                    }
                    i = i + dataLength;
                    dataLength = '';
                }
            }
        }
        return oData;
    }
}
var amiFrontCommon = new amiFrontCommonClass();

function amiSessionClass(cookieName, sessionCookieName, cookieDays, cookieHours){
    this.sessionCookieName = sessionCookieName;
    this.cookieName = cookieName;
    this.cookieDays = cookieDays;
    this.cookieHours = cookieHours;
    this.variables = new Object();

    this.init = function(){
        this.loadVariables();
    }

    this.setCookieName = function(value){
        this.cookieName = value;
    }

    this.setCookieLifetime = function(iDays, iHours){
        this.cookieDays = iDays;
        this.cookieHours = iHours;
    }

    this.set = function(name, value){
        this.variables[name] = value;
        this.storeVariables();
    }

    this.del = function(name){
        delete this.variables[name];
        this.storeVariables();
    }

    this.get = function(name){
        if(typeof(this.variables[name]) != 'undefined'){
            return this.variables[name];
        }
        return '';
    }

    this.storeVariables = function(){
        var sVariables = amiFrontCommon.serialize(this.variables);
        setCookie(this.cookieName, sVariables, '/', this.cookieDays, this.cookieHours, true);
    }

    this.loadVariables = function(){
        var sessionCookie = amiGetCookie(this.sessionCookieName);
        if(sessionCookie != null){
            var sVariables = amiGetCookie(this.cookieName, true);
            this.variables = new Object();
            if(sVariables != null){
                this.variables = amiFrontCommon.unserialize(sVariables);
                if(typeof(this.variables) != 'object'){
                    this.variables = new Object();
                }
            }
        }else{
            delCookie(this.cookieName);
        }
    }

    this.init();
}

var amiSession = new amiSessionClass('user_session', sessionCookieName, 30, 0);
//updateCookieExpireTime('user_session', sessionTimeout);

function amiGetUsername(source){
    var res;
    switch(source){
        case 'nickname':
            res = amiSession.get('nickname_cookie');
            break;
        case 'username':
            res = amiSession.get('username_cookie');
            break;
        default:
            res = amiSession.get('firstname_cookie') + ' ' + amiSession.get('lastname_cookie');
            res = res.replace(/^\s*/, '').replace(/\s*$/, '');
    }
    return res;
}

var ratingForms = {};

function addRatingForm(formName, itemId){
    ratingForms[formName] = itemId;
}

function checkRatingForms(moduleName){
    var ratings = AMI.Browser.Cookie.get('moduleRatings');
    if(ratings){
        var modules = ratings.split(';');
        for(var i=0; i<modules.length; i++){
            var module = modules[i].split(':');
            if((module[0] == moduleName) && (module.length > 1)){
                for(var j=1; j<module.length; j++){
                    for(var formName in ratingForms){
                        if((module[j] == ratingForms[formName]) && document.getElementsByName(formName)){
                            document.getElementsByName(formName)[0].style.display = 'none';
                            if(AMI.find('#rating_value')){
                                AMI.find('#rating_value').style.display = 'none';
                            }
                        }
                    }
                }
            }
        }
    }
}

// User menu functions

function hideAllUserMenues(evt, id){
    var oTarget = AMI.Browser.Event.getTarget(evt);
    if((oTarget && oTarget.className == 'user_menu' ) || (oTarget.parentNode && oTarget.parentNode.className == 'user_menu')){
        AMI.Browser.Event.stopProcessing(evt);
        return;
    }
    var aMenues = AMI.find('.user_menu');
    for (i = 0; i < aMenues.length; i++){
        if(id && (aMenues[i].id == 'user_menu_ul_'+id || aMenues[i].id == 'forum_watching_menu_ul_'+id)){
        }else{
            //aMenues[i].style.visibility = 'hidden';
            AMI.UI.Effects.fadeOut(aMenues[i], 300);
        }
    }

    if(document.getElementById('forum_watching_menu_li_watch') && document.getElementById('forum_watching_menu_li_watch').style.visibility == 'visible'){
        AMI.UI.Effects.fadeOut(document.getElementById('forum_watching_menu_li_watch'), 300);
    }
    if(document.getElementById('forum_watching_menu_li_stop_watching') && document.getElementById('forum_watching_menu_li_stop_watching').style.visibility == 'visible'){
        AMI.UI.Effects.fadeOut(document.getElementById('forum_watching_menu_li_stop_watching'), 300);
    }
}

function showUserMenu(evt, id) {
    var oMenu = AMI.find('#user_menu_ul_' + id);

    if(oMenu.style.visibility == 'visible'){
        //oMenu.style.display = 'none';
        AMI.UI.Effects.fadeOut(oMenu, 300);
    } else {
        hideAllUserMenues(evt, id);
        //oMenu.style.display = 'block';
        AMI.UI.Effects.fadeIn(oMenu, 300);
    }
    AMI.Browser.Event.stopProcessing(evt);
}

function getWatchingStatus(status, content){
    if(status == 1){
        if(content == 'watch'){
            if(document.getElementById('forum_watching_menu_li_watch')){
                document.getElementById('forum_watching_menu_li_watch').style.visibility = 'visible';
                document.getElementById('forum_watching_menu_li_watch').style.display = 'block';
            }
            if(document.getElementById('forum_watching_menu_li_stop_watching')){
                document.getElementById('forum_watching_menu_li_stop_watching').style.visibility = 'hidden';
                document.getElementById('forum_watching_menu_li_stop_watching').style.display = 'none';
            }
        }else if(content == 'stop_watching'){
            if(document.getElementById('forum_watching_menu_li_watch')){
                document.getElementById('forum_watching_menu_li_watch').style.visibility = 'hidden';
                document.getElementById('forum_watching_menu_li_watch').style.display = 'none';
            }
            if(document.getElementById('forum_watching_menu_li_stop_watching')){
                document.getElementById('forum_watching_menu_li_stop_watching').style.visibility = 'visible';
                document.getElementById('forum_watching_menu_li_stop_watching').style.display = 'block';
            }
        }
    }
}

function hideForumWatchingLinks(){
    if(document.getElementById('forum_watching_menu_li_watch')){
        document.getElementById('forum_watching_menu_li_watch').style.visibility = 'hidden';
        document.getElementById('forum_watching_menu_li_watch').style.display = 'none';
    }
    if(document.getElementById('forum_watching_menu_li_stop_watching')){
        document.getElementById('forum_watching_menu_li_stop_watching').style.visibility = 'hidden';
        document.getElementById('forum_watching_menu_li_stop_watching').style.display = 'none';
    }
}

function showForumWatchingMenu(evt, id){
    var oMenu = AMI.find('#forum_watching_menu_ul_' + id);

    if(oMenu.style.visibility == 'visible'){
        AMI.UI.Effects.fadeOut(oMenu, 300);
        AMI.UI.Effects.fadeOut(document.getElementById('forum_watching_menu_li_watch'), 300);
        AMI.UI.Effects.fadeOut(document.getElementById('forum_watching_menu_li_stop_watching'), 300);
    }else{
        hideAllUserMenues(evt, id);
        AMI.UI.Effects.fadeIn(oMenu, 300);
        AMI.HTTPRequest.getContent('GET', frontBaseHref + 'ami_service.php', 'service=forum&action=get_watching_status&id_topic=' + parseInt(id) + '&scname=' + window.sessionCookieName, getWatchingStatus);
    }
    AMI.Browser.Event.stopProcessing(evt);
}

var pageLoaded = false;
addOnLoadEvent(function(){
    window.pageLoaded = true;
    if(AMI.UI._savedAlert && !window.onloadAlerted){
        var oAlertWindow = AMI.find('#status_message');
        if (oAlertWindow){
            var statusText = oAlertWindow.innerHTML.replace(/<script>[^<\/script>]*<\/script>/g, "");
            alert(statusText);
        }
    }
});

savePreviousOnLoadEvent();

function loadMobileVersion(){
    AMI.Cookie.set('forceMobile', '1', 3600, '\\');
    AMI.Cookie.del('forceDesktop');
    window.location.reload();
}
function loadDesktopVersion(){
    if(isMobileDevice()){
        AMI.Cookie.set('forceDesktop', '1', 3600, '\\');
    }else{
        AMI.Cookie.del('forceDesktop');
    }
    AMI.Cookie.del('forceMobile');
    window.location.reload();
}

function isMobileLayout(){
    return (typeof(bMobileLayout)=='undefined')? false : bMobileLayout;
}

function isMobileDevice(){
    return ((screen.width <= 480) || ((document.body != null) && (document.body.clientWidth <= 480)));
}

function checkDeviceAndLoadVersion(){
    var
        forceMobile = AMI.Cookie.get('forceMobile'),
        forceDesktop = AMI.Cookie.get('forceDesktop'),
        bMobileLayout = isMobileLayout(),
        bMobileDevice = isMobileDevice(),
        layId = 'undefined' != typeof(amiMobileLayId) ?  parseInt(amiMobileLayId) : 0;

    layId = isNaN(layId) ? 0 : layId;

    if(layId && (forceMobile == '1') && !bMobileLayout){
        loadMobileVersion();
        return;
    }

    if(
        !layId ||
        (
            (forceDesktop=='1') && bMobileLayout
        )
    ){
        loadDesktopVersion();
        return;
    }

    if(
        layId && bMobileDevice && !bMobileLayout &&
        (forceDesktop == null) && (forceMobile == null)
    ){
        loadMobileVersion();
    }
}


function amiSkinAuthForm(){
    if(AMI.$('#ami-skin-auth-form').length){
        AMI.$('#ami-skin-auth-form').addClass('ami-skin-auth-form__show');
    }else{
        var url = frontBaseHref + 'ami_strict.php?ami_svc=ami_skin_tools&action=auth_form&ami_env=fast&ami_resp_mode=HTML&ami_locale=' + AMI_SessionData.locale + '&ami_browser_cache=1&' + (new Date).getTime();
        AMI.$.get(url, {}, function(html){
            AMI.$('body').prepend(html);
            setTimeout(function(){
                AMI.$('#ami-skin-auth-form').addClass('ami-skin-auth-form__show');
            }, 100);
            document.location.hash = '';
        })
    }
}


addOnLoadEvent(function(){

    if(!amiSession.get('ami_efa')){
        if(document.location.hash == '#ami-login'){
            amiSkinAuthForm();
        }
        $(document).keydown(function(e){
            if((e.which === 65) && (e.altKey)){
                document.location.hash = 'ami-login';
                amiSkinAuthForm();
            }
        });
    }

    if(typeof(amiEshopSettings) != 'undefined'){
        AMI.Eshop = AMI.Eshop || {};
        AMI.Eshop.formatMoney = function(value){
            value = AMI.Eshop.formatNumber(value);
            if(amiEshopSettings.currencyPrefix != ''){
                value = amiEshopSettings.currencyPrefix + ' ' + value;
            }
            if(amiEshopSettings.currencyPostfix != ''){
                value = value + ' ' + amiEshopSettings.currencyPostfix;
            }
            return value;
        };
        AMI.Eshop.formatNumber = function(value){
            var i, j, km, kw, kd;
            i = parseInt(value = (+value || 0).toFixed(amiEshopSettings.numberDecimals)) + "";
            j = ((j = i.length) > 3) ? j % 3 : 0;
            km = (j ? i.substr(0, j) + amiEshopSettings.thousandsSeparator : "");
            kw = i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + amiEshopSettings.thousandsSeparator);
            kd = (amiEshopSettings.numberDecimals ? amiEshopSettings.decimalPoint + Math.abs(value - i).toFixed(amiEshopSettings.numberDecimals).replace(/-/, 0).slice(2) : "");
            return km + kw + kd;
        };
    }
});

/*
 $(document).ready(function(){
 $.each($('form'), function(index, oForm){
 var aFileds = ['_amits', '_amitsh'];

 for(var i = 0, q = aFileds.length; i < q; ++i){
 if('undefined' === typeof(oForm.elements[aFileds[i]]) && parseInt(_amits)){
 $('<input>').attr({
 type:  'hidden',
 name:  aFileds[i],
 value: eval(aFileds[i])
 }).appendTo($(oForm));
 }
 }
 })
 });
 */


/*
 * FILE END: _shared/code/js/front_system.js
 */

/*
 * FILE START: _shared/code/js/front_filter.js
 */

var flagNames = [];
var flagMaps = [];

function _dec_to_rgb(value) {
    var hex_string = "";
    for (var hexpair = 0; hexpair < 3; hexpair++) {
        var onebyte = value & 0xFF;            // get low onebyte
        value >>= 8;                        // drop low onebyte
        var nybble2 = onebyte & 0x0F;          // get low nybble (4 bits)
        var nybble1 = (onebyte >> 4) & 0x0F;   // get high nybble
        hex_string += nybble1.toString(16); // convert nybble to hex
        hex_string += nybble2.toString(16); // convert nybble to hex
    }
    return hex_string.toUpperCase();
}


function flagMapAdd(name, num, isCr){
    if(!isNaN(num)){
        mapID = -1;
        for(i = 0; i < flagNames.length; i++){
            if(flagNames[i] == name){
                mapID = i;
                break;
            }
        }
        if(mapID == -1){
            mapID = flagNames.length;
            flagNames[mapID] = name;
            flagMaps[mapID] = [];
        }
        if(flagMaps[mapID].length < num){
            for(i = 0; i < num; i++)
                if(!flagMaps[mapID][i])
                    flagMaps[mapID][i] = 0;
        }
        if(!isCr)
            flagMaps[mapID][num-1] = 1;
    }
}

function arrToHex(arrIn){
    realValTmp = "";
    realVal = "";
    var tmp = "";
    var isLastProcessed = true;
    for(k = 1; k <= arrIn.length; k++){
        isLastProcessed = false;
        tmp = arrIn[k-1]+tmp;
        if(k % 4 == 0){
            realValTmp += parseInt(tmp, 2).toString(16);
            tmp = "";
            isLastProcessed = true;
        }
    }
    if(!isLastProcessed)
        realValTmp += parseInt(tmp, 2).toString(16);
    hexZeroStart = true;
    for(k = realValTmp.length-1; k >= 0; k--){
        if(realValTmp.substr(k, 1) != "0" || !hexZeroStart){
            realVal += realValTmp.substr(k, 1);
            hexZeroStart = false;
        }
    }
    return realVal;
}

function CheckFilterForms(fform, isSearchForm, isOrder, skipOffestSetting) {
    var forceSubmitUrl;
    var _tmpVarName;
    _tmpVarName = fform.name + "_forceSubmitUrl";

    forceSubmitUrl = eval("if(typeof("+_tmpVarName+") != 'undefined') {"+_tmpVarName+"} else {''}");

    if(isOrder != 1)
        isOrder = 0;

    // special run over checkbox filter fields
    //if()
    for(var i=0; i<fform.length; i++){
        el = fform.elements[i];
        if(el.type == 'checkbox' && el.name.indexOf("[]") <= 0){
            val = (el.checked)?1:0;
            el.value = val;
            cname=el.name;

            if(fform.elements[cname] && (fform.elements[cname].type=='hidden')){
                if(typeof(fform.elements["enc_"+cname])=='object') {
                    fform.elements["enc_"+cname].value = val;
                }
                fform.elements[cname].value = val;
            }
        }
    }

    if(typeof(skipOffestSetting) == 'undefined'){
        if(typeof(fform.elements['offset'])=='object') {
            fform.elements['offset'].value = 0;
        }
        if(typeof(fform.elements['enc_offset'])=='object') {
            fform.elements['enc_offset'].value = 0;
        }
    }

    // Create the submit URL
    flagNames = [];
    flagMaps = [];
    var submitURL = '';
    if(forceSubmitUrl != '') {
        submitURL = forceSubmitUrl;
    }else{
        submitURL = _cms_script_link;
    }
    for(var i=0; i < fform.length; i++){
        el = fform.elements[i];
        if(typeof(el.name) == 'undefined'){
            continue;
        }
        elName = el.name;
        if(el.name.indexOf("prop_") >= 0 && isOrder){
            if((fpos = el.name.lastIndexOf("_x")) >= 0){
                elName = el.name.substr(0, fpos);
            }
            elName += "[]";
        }
        if(el.type == 'checkbox'){
            if(el.checked){
                if((fpos = el.name.indexOf("_flag_")) >= 0){
                    flagMapAdd(el.name.substr(0, fpos), parseInt(el.name.substr(fpos+6)), 0);
                }else if(el.value != ''){
                    submitURL += '&'+elName+'='+encodeURIComponent(el.value);
                }
            }else{
                if((fpos = el.name.indexOf("_flag_")) >= 0){
                    flagMapAdd(el.name.substr(0, fpos), parseInt(el.name.substr(fpos+6)), 1);
                }else{
                    //if(el.name.indexOf("[]") <= 0) /* do not process array items */
                    //   submitURL += '&'+elName+'=';
                }
            }
        }else if(el.type == 'select-one'){
            if((fpos = el.name.indexOf("_flag")) >= 0){
                flagMapAdd(el.name.substr(0, fpos), parseInt(el.value), 0);
            }else if(el.value != ''){
                submitURL += '&'+elName+'='+encodeURIComponent(el.value);
            }
        }else if(el.type == 'select-multiple'){
            fpos = el.name.indexOf("_flag");
            for(k = 0; k < el.length; k++){
                if(el.options[k].selected){
                    if(fpos >= 0){
                        flagMapAdd(el.name.substr(0, fpos), parseInt(el.options[k].value), 0);
                    }else{
                        submitURL += '&'+encodeURIComponent(elName)+'='+encodeURIComponent(el.options[k].value);
                    }
                }
            }
        }else if(el.type == 'radio'){
            if(el.checked){
                if((fpos = el.name.indexOf("_flag")) >= 0){
                    flagMapAdd(el.name.substr(0, fpos), parseInt(el.value), 0);
                }else{
                    submitURL += '&'+elName+'='+encodeURIComponent(el.value);
                }
            }
        }else{
            if(el.name == "action" && ((!isOrder && fform.search_subcats && fform.search_subcats.checked) || isSearchForm)) {
                submitURL += '&action=search';
            } else if(el.value != '' && elName != 'btnFlt_apply' && (!isOrder || el.name != "action" && el.name != "order")) {
                submitURL += '&'+elName+'='+encodeURIComponent(el.value);
            }
        }
    }
    for(i = 0; i < flagMaps.length; i++){
        if(flagNames[i]){
            submitURL += '&'+flagNames[i]+'=0x'+arrToHex(flagMaps[i]);
        }
    }
    if(isOrder)
        submitURL += '&eshop_special=1&action=add';

    document.location.href=submitURL;
    return false;
}

function checkSearchForms(fform, fltFormName) {
    if(typeof(fltFormName) != 'undefined') {
        _cms_document_form = fltFormName;
    } else if(typeof(_cms_document_form) == 'undefined') {
        _cms_document_form = _cms_filter_form;
    }

    var sform = document.forms[_cms_document_form];
    // special run over checkbox filter fields
    for(var i=0; i<fform.length; i++){
        el = fform.elements[i];
        if(el.type == 'text'){
            cname=el.name;

            if(sform.elements[cname] && (sform.elements[cname].type=='hidden')){
                if(typeof(sform.elements["enc_"+cname])=='object') {
                    sform.elements["enc_"+cname].value = el.value;
                }
                sform.elements[cname].value = el.value;
            }
        }
    }
    CheckFilterForms(sform, 1);
    return false;
}


/*
 * FILE END: _shared/code/js/front_filter.js
 */

/*
 * FILE START: _shared/code/js/ami.js
 */

/**
 * @fileOverview File contains AMI container with AMI global functions description.
 */

/**
 * Base container of Amiro JS API classes.
 *
 * @class Base container of Amiro JS API classes.
 */
var AMI = {

    $: function(){
        if(typeof(window.amiNoJqueryAlerted) == 'undefined'){
            alert('jQuery is not installed!');
            window.amiNoJqueryAlerted = true;
        }
    },

    /**
     * Inherit one class from other and creating superclass definition in child.
     *
     * @example <strong>Example of inheriting classes:</strong>
     * parentClass = function(param1, param2){}
     * childClass = function(param1, param2){
    *     AMI.ModuleComponentCustom.superclass.constructor.call(this, param1, param2);
    *     // Child class methods further
    * }
     * AMI.inherit(childClass, parentClass);
     *
     * @param {function} oChildClass Class that should be inherited.
     * @param {function} oParentClass Parent class object.
     * @returns {void}
     */
    inherit: function(oChildClass, oParentClass){
        var oTmp = function(){};
        oTmp.prototype = oParentClass.prototype;
        oChildClass.prototype = new oTmp();
        oChildClass.prototype.constructor = oChildClass;
        oChildClass.superclass = oParentClass.prototype;
    },

    /**
     * Find element in DOM by id, class or tag.
     *
     * @param {string} search Search string in format "#idOfElement" or ".classNameOfElement" or "tagName".
     * @param {DOM object} oParent DOM element where target element will be searched.
     * @returns {mixed} Found element or null in case of search by ID, array of elements in other search cases.
     */
    find: function(search, oParent){
        oParent = oParent || document;
        if(search.lastIndexOf('[') >= 0){
            var parts = search.match(/\[(.*)\]/ig);
            if(typeof(parts[0]) != 'undefined'){
                parts = parts[0].split('=');
                if(parts.length == 2){
                    var attribute = parts[0].substr(1);
                    var value = parts[1].substr(0, parts[1].length-1);
                }
                search = search.substr(0, search.lastIndexOf('['));
            }
        }

        var result = null;
        var singleObject = false;
        if(search.length > 0){
            if(search.substr(0, 1) == '#'){
                result = document.getElementById(search.substr(1));
                singleObject = true;
            }else if(search.substr(0, 1) == '.'){
                search = search.substr(1);
                if(oParent.getElementsByClassName){
                    result = oParent.getElementsByClassName(search);
                }else{
                    var aElements = oParent.getElementsByTagName('*');
                    var aResult = [];
                    for(var i = 0; i < aElements.length; i++){
                        var rx = new RegExp('(^| )' + search + '( |$)', 'i');
                        if(rx.test(aElements[i].className)){
                            aResult.push(aElements[i]);
                        }
                    }
                    result = aResult;
                }
            }else{
                result = oParent.getElementsByTagName(search);
            }
        }else{
            result = oParent.getElementsByTagName('*');
        }

        // Check attributes if needed
        if((result != null) && (typeof(attribute) != 'undefined') && (typeof(value) != 'undefined')){
            var res = null;
            if(!singleObject){
                for(var i=0; i < result.length; i++){
                    var element = result[i];
                    var val = (element.getAttribute && element.getAttribute(attribute)) || null;
                    if( !val ) {
                        var attrs = element.attributes;
                        var length = attrs.length;
                        for(var j = 0; j < length; j++){
                            if(attrs[j].nodeName === attribute){
                                val = attrs[j].nodeValue;
                            }
                        }
                    }
                    if(val == value){
                        if (res == null){
                            res = [];
                        }
                        res.push(element);
                    }
                }
                result = res;
            }else{
                if((typeof(result.attributes[attribute]) == 'undefined') || (result.attributes[attribute] != value)){
                    result = null;
                }
            }
        }
        return result;
    },

    /**
     * Animated scroll to any object on page.
     *
     * @param {DOM object} oElement DOM element to scroll to.
     * @param {number} paddingLeftTop Padding from left and top (equal) that shold be left after scrolling if possible.
     * @returns {void}
     */
    scrollTo: function(oElement, paddingLeftTop){
        /**
         * @private
         */
        this.move = function(){
            this.step++;

            if(this.step == this.numberOfSteps){
                this.currentPosition[0] = this.aMoveTo[0];
                this.currentPosition[1] = this.aMoveTo[1];
            }else{
                this.currentPosition[0] += (this.aMoveTo[0] - this.currentPosition[0]) / (this.numberOfSteps - this.step);
                this.currentPosition[1] += (this.aMoveTo[1] - this.currentPosition[1]) / (this.numberOfSteps - this.step);
            }
            var
                x = Math.ceil(this.currentPosition[0]),
                y = Math.ceil(this.currentPosition[1]);

            if(typeof(window.scrollTo) == 'function'){
                window.scrollTo(x, y);
            }else{
                AMI.Browser.setDocumentLeft(x);
                AMI.Browser.setDocumentTop(y);
            }
            if(this.currentPosition[0] != this.aMoveTo[0] || this.currentPosition[1] != this.aMoveTo[1]){
                setTimeout(function(_this){return function(){_this.move()}}(this), 10);
            }
        }

        this.oElement = oElement;
        this.numberOfSteps = 15;
        this.step = 0;
        if(typeof(this.oElement) == 'object'){
            this.aMoveTo = AMI.Browser.getObjectPosition(this.oElement);
            if(typeof(paddingLeftTop) != 'undefined'){
                this.aMoveTo[0] = Math.max(0, this.aMoveTo[0] - paddingLeftTop);
                this.aMoveTo[1] = Math.max(0, this.aMoveTo[1] - paddingLeftTop);
            }
            this.currentPosition = [AMI.Browser.getDocumentLeft(), AMI.Browser.getDocumentTop()];
            this.move();
        }
    },

    /**
     * Check if element has class 'className'.
     *
     * @param {number} element DOM element
     * @param {string} className class name
     * @returns {bool}
     */
    hasClass: function (element, className){
        return (element.className != undefined) ? element.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)')) : false;
    },

    /**
     * Adds specified class name to the DOM element.
     *
     * @param {number} element DOM element
     * @param {string} className class name
     * @returns {void}
     */
    addClass: function(element, className){
        if(!this.hasClass(element, className)){
            element.className += " " + className;
        }
    },

    /**
     * Removes specified class name out of the DOM element.
     *
     * @param {number} element DOM element
     * @param {string} className class name
     * @returns {void}
     */
    removeClass: function(element, className){
        if(this.hasClass(element, className)){
            var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
            element.className=element.className.replace(reg,' ').replace('\\w+', ' ');
        }
    },

    /**
     * Returns count of object properties.
     *
     * @param   {object} obj  Object
     * @returns {void}
     */
    countProperties: function(obj){
        var count = 0;

        for(var prop in obj){
            if(obj.hasOwnProperty(prop)){
                ++count;
            }
        }

        return count;
    }
};

if(typeof(jQuery) != 'undefined'){
    AMI.$ = jQuery;
}

/*
 * FILE END: _shared/code/js/ami.js
 */

/*
 * FILE START: _shared/code/js/ami.browser.js
 */

AMI.Browser = {
    isIE: document.swapNode,
    isWebKit: /WebKit/.test(navigator.userAgent),
    isOpera: window.opera,
    isIOS: navigator.appVersion.indexOf('iPad;') >= 0 || navigator.appVersion.indexOf('iPhone;') >= 0 || navigator.appVersion.indexOf('iPod;') >= 0,
    isSensor: this.isIOS || navigator.appVersion.indexOf('Android') >= 0 || navigator.appVersion.indexOf('Symbian') >= 0 || navigator.appVersion.indexOf('Windows CE') >= 0,
    isLowResolution: screen.width <= 800 || screen.height <= 480,

    getWindowWidth : function(oWindow){
        if(typeof(oWindow) == 'undefined'){
            oWindow = window;
        }
        return oWindow.document.compatMode == 'CSS1Compat' ? oWindow.document.documentElement.clientWidth : oWindow.document.body.clientWidth;
    },

    getWindowHeight : function(oWindow){
        if(typeof(oWindow) == 'undefined'){
            oWindow = window;
        }
        return oWindow.document.compatMode == 'CSS1Compat' ? oWindow.document.documentElement.clientHeight : oWindow.document.body.clientHeight;
    },

    getDocumentWidth : function(oWindow){
        if(typeof(oWindow) == 'undefined'){
            oWindow = window;
        }
        return Math.max(oWindow.document.compatMode != 'CSS1Compat' ? oWindow.document.body.scrollWidth : oWindow.document.documentElement.scrollWidth, this.getWindowWidth(oWindow));
    },

    getDocumentHeight : function(oWindow){
        if(typeof(oWindow) == 'undefined'){
            oWindow = window;
        }
        return Math.max(oWindow.document.compatMode != 'CSS1Compat' ? oWindow.document.body.scrollHeight : oWindow.document.documentElement.scrollHeight, this.getWindowHeight(oWindow));
    },

    getDocumentLeft: function(oWindow){
        if(typeof(oWindow) == 'undefined'){
            oWindow = window;
            var oDocument = document;
        }else{
            oDocument = oWindow.document;
        }
        return oWindow.pageXOffset || (oDocument.documentElement && oDocument.documentElement.scrollLeft) || (oDocument.body && oDocument.body.scrollLeft);
    },

    getDocumentTop: function(oWindow){
        if(typeof(oWindow) == 'undefined'){
            oWindow = window;
            var oDocument = document;
        }else{
            oDocument = oWindow.document;
        }
        return oWindow.pageYOffset || (oDocument.documentElement && oDocument.documentElement.scrollTop) || (oDocument.body && oDocument.body.scrollTop);
    },

    setDocumentLeft: function(value){
        if(document.documentElement){
            document.documentElement.scrollLeft = value;
        }else if(document.body){
            document.body.scrollLeft = value;
        }
    },

    setDocumentTop: function(value){
        if(document.documentElement){
            document.documentElement.scrollTop = value;
        }else if(document.body){
            document.body.scrollTop = value;
        }
    },

    getPointerPosition : function(oEvent){
        var aData = [0, 0];
        oEvent = AMI.Browser.Event.validate(oEvent);
        if(oEvent.pageX || oEvent.pageY){
            aData[0] = oEvent.pageX;
            aData[1] = oEvent.pageY;
        }else if(oEvent.clientX || oEvent.clientY){
            aData[0] = oEvent.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft) - document.documentElement.clientLeft;
            aData[1] = oEvent.clientY + (document.documentElement.scrollTop || document.body.scrollTop) - document.documentElement.clientTop;
        }
        return aData;
    },

    getObjectPosition : function(oObject, bStopOnRelative){
        if(typeof(bStopOnRelative) == 'undefined'){
            bStopOnRelative = false;
        }
        var aData = [0, 0];
        if(!oObject) return aData;
        do{
            if(bStopOnRelative){
                var positionStyle = AMI.Browser.DOM.getStyle(oObject, 'position');
                if(positionStyle == 'relative' || positionStyle == 'absolute' || positionStyle == 'fixed'){
                    break;
                }
            }
            aData[0] += oObject.offsetLeft;
            aData[1] += oObject.offsetTop;
        }while((oObject = oObject.offsetParent) != null);
        return aData;
    },

    getCaretPosition : function(textObject){
        var result = 0;
        textObject.focus();
        if(textObject.selectionStart){
            result = textObject.selectionStart;
        }else if(document.selection){
            var rangeSelect = document.selection.createRange();
            rangeSelect.collapse(true);
            var rangeObject = textObject.createTextRange();
            if((typeof(rangeObject.inRange) != 'undefined') && rangeObject.inRange(rangeSelect)){
                rangeObject.setEndPoint('EndToEnd', rangeSelect);
                result = rangeObject.text.length
            }

        }
        return result;
    },

    setCaretPosition : function(textObject, position){
        textObject.focus();
        if(textObject.selectionStart){
            textObject.selectionStart = position;
            textObject.selectionEnd = position;
        }else if(document.selection){
            var rangeObject = textObject.createTextRange();
            rangeObject.move('character', position);
            rangeObject.select();
        }
    },

    setOpacity: function(oElement, iOpacity){
        if(typeof(oElement.style.MozOpacity) != "undefined"){
            oElement.style.MozOpacity = iOpacity;
        }else if(typeof(oElement.style.opacity) != "undefined"){
            oElement.style.opacity = iOpacity;
        }else if(typeof(oElement.style.KhtmlOpacity) != "undefined"){
            oElement.style.KhtmlOpacity = iOpacity;
        }else{
            oElement.style.filter = "progid:DXImageTransform.Microsoft.Alpha(opacity=" + (iOpacity * 100) + ");";
        }
    }
}

/*
 * FILE END: _shared/code/js/ami.browser.js
 */

/*
 * FILE START: _shared/code/js/ami.browser.cookie.js
 */

AMI.Browser.Cookie = {
    set : function(sName, sValue, iHours){
        var oDate = new Date();
        if(typeof(iHours) == "undefined"){
            iHours = 1;
        }
        oDate.setHours(oDate.getHours() + iHours);
        this.del(sName);
        document.cookie = sName + "=" + escape(sValue) + "; path=/; expires="+oDate.toGMTString();
    },

    del : function(sName) {
        if(this.get(sName)){
            document.cookie = sName + "=" + "; path=/ ;expires=Thu, 01-Jan-1970 00:00:01 GMT";
        }
    },

    get : function(sName){
        var cookiePairs = document.cookie.split('; ');
        for(var i=0;i<cookiePairs.length;i++){
            var cookieName = cookiePairs[i].substr(0, cookiePairs[i].indexOf('='));
            var cookieValue = cookiePairs[i].substr(cookiePairs[i].indexOf('=') + 1);
            if(cookieName == sName){
                return unescape(cookieValue);
            }
        }
        return null;
    }
}


/*
 * FILE END: _shared/code/js/ami.browser.cookie.js
 */

/*
 * FILE START: _shared/code/js/ami.browser.event.js
 */

AMI.Browser.Event = {

    globalEvent: null,

    validate: function(oEvent){
        return oEvent ? oEvent : window.event;
    },

    getTarget: function(oEvent){
        oEvent = this.validate(oEvent);
        if(oEvent && typeof(oEvent.srcElement) == 'unknown') return null; // IE hack
        return (oEvent) ? (oEvent.srcElement || oEvent.target) : null;
    },

    fire: function(oTarget, sEvent){
        if(document.createEventObject){
            var oEvent = document.createEventObject();
            oTarget.fireEvent('on' + sEvent, oEvent);
        }else if(document.createEvent){
            var oEvent = document.createEvent("HTMLEvents");
            oEvent.initEvent(sEvent, true, true);
            oTarget.dispatchEvent(oEvent);
        }else{
            return false;
        }
        return true;
    },

    addHandler: function(oTarget, sEvent, oHandler){
        if(typeof(oTarget.addEventListener) != 'undefined'){
            if(sEvent == 'mousewheel'){
                // Mozilla hack
                oTarget.addEventListener('DOMMouseScroll', oHandler, false);
            }
            oTarget.addEventListener(sEvent, oHandler, false);
        }else{
            oTarget.attachEvent('on' + sEvent, oHandler);
        }
        return oHandler;
    },

    removeHandler: function(oTarget, sEvent, oHandler){
        if(typeof(oTarget.removeEventListener) != 'undefined'){
            if(sEvent == 'mousewheel'){
                sEvent = 'DOMMouseScroll';
            }
            oTarget.removeEventListener(sEvent, oHandler, false);
        }else if(oTarget.detachEvent){
            oTarget.detachEvent('on' + sEvent, oHandler);
        }
    },

    stopProcessing: function(oEvent){
        oEvent = this.validate(oEvent);
        if(typeof(oEvent.stopPropagation) != 'undefined'){
            oEvent.stopPropagation();
        }else if(typeof(oEvent.cancelBubble) != 'undefined'){
            oEvent.cancelBubble = true;
        }
        if(typeof(oEvent.preventDefault) != 'undefined'){
            oEvent.preventDefault();
        }else{
            oEvent.returnValue = false;
        }
    }
}

AMI.Browser.Event.addHandler(window,'load', function(){
    AMI.Browser.Event.addHandler(document.body,'mousedown', function(e){
        AMI.Browser.Event.globalEvent = (e) ? e :((window.event) ? window.event : null);
    });
});

/*
 * FILE END: _shared/code/js/ami.browser.event.js
 */

/*
 * FILE START: _shared/code/js/ami.browser.dom.js
 */

AMI.Browser.DOM = {
    create: function(sTagName, sId, sClassName, sStyles, oParentNode){
        var oObject = document.createElement(sTagName);
        if(typeof(sId) != 'undefined' && sId != ''){
            oObject.id = sId;
        }
        if(typeof(sClassName) != 'undefined' && sClassName != ''){
            oObject.className = sClassName;
        }
        if(typeof(sStyles) != 'undefined' && sStyles != ''){
            oObject.style.cssText = sStyles;
        }
        return oParentNode == null ? oObject : this.append(oParentNode, oObject);
    },

    append: function(oParentNode, oNode){

        return oParentNode.appendChild(oNode);
    },

    remove: function(oNode){
        oNode.parentNode.removeChild(oNode);
        return this;
    },

    setInnerHTML: function(oNode, HTML){
        var aJavaScripts = [];
        // TODO: get back comments replacement. Commented because amiro-template structure <s cript><!-- --></s cript>
        //HTML = HTML.replace(/<!--[\s\S]*?-->/ig, '').replace(/(<script[\s\S]*?>)([\s\S]*?)(<\/script>)/ig, function(_aJavaScripts){return function(match, tagStart, code, tagEnd){
        HTML = HTML.replace(/(<script[\s\S]*?>)([\s\S]*?)(<\/script>)/ig, function(_aJavaScripts){return function(match, tagStart, code, tagEnd){
            if(tagStart.indexOf('text/javascript') != -1){
                if(tagStart.indexOf('src=') == -1){
                    _aJavaScripts.push(code);
                    replacement = '';
                }else{
                    var
                        oScript = document.createElement('SCRIPT'),
                        reSRC = /src=["']?([^"'>\s]+)/,
                        reComponentId = /data-ami-component-id=["']?([^"'>\s]+)/;
                    oScript.setAttribute('type', 'text/javascript');
                    oScript.setAttribute('onload', "AMI.Message.send('ON_SCRIPT_LOAD', '" + reComponentId.exec(tagStart)[1] + "');");
                    oScript.setAttribute('src', reSRC.exec(tagStart)[1]);
                    AMI.find('head')[0].appendChild(oScript);
                    replacement = '';
                }
            }else{
                replacement = match;
            }
            return replacement;
        }}(aJavaScripts));

        oNode.innerHTML = HTML; //.replace(/<_AMI_SCRIPT/g, '<script').replace(/_AMI_DBL_PRCNT_/g, '%%');
        for(var i = 0; i < aJavaScripts.length; i++){
            if(window.execScript){
                try{
                    window.execScript(aJavaScripts[i]);
                }catch(e){
                    // alert('Error in script: ' + aJavaScripts[i]);
                }
            }else{
                try{
                    eval.call(window, aJavaScripts[i]);
                }catch(e){
                    if('object' === typeof(console)){
                        console.log('JavaScript syntax error: ' + e.stack);
                        console.log('-- code { --\n\n' + aJavaScripts[i] + '\n\n-- } code --');
                    }
                }
            }
        }
    },

    getCSSSelectors: function(){
        var aResult = [];

        if(typeof(document.styleSheets) != 'undefined'){
            var aCSSSheets = document.styleSheets;
            if(aCSSSheets && (typeof(aCSSSheets.length) != 'undefined')){
                for(var i = 0; i < aCSSSheets.length; i++){
                    if(aCSSSheets[i].disabled){
                        continue;
                    }
                    try{
                        var aRules = typeof(aCSSSheets[i].cssRules) != 'undefined' ? aCSSSheets[i].cssRules : aCSSSheets[i].rules;
                        for(var j = 0; j < aRules.length; j++){
                            aResult.push(aRules[j].selectorText);
                        }
                    }catch(e){};
                }
            }
        }

        return aResult;
    },

    findCSSClass: function(classMask){
        var aResult = [];
        var rx = new RegExp('\\.' + classMask + '($|[^a-z\-_])', 'i');

        var aSelectors = this.getCSSSelectors();
        for(var i = 0; i < aSelectors.length; i++){
            if(rx.test(aSelectors[i])){
                aResult.push(aSelectors[i]);
            }
        }

        return aResult;
    },

    getStyle: function(oObject, sStyleName){
        var sResult = '';

        if(window.getComputedStyle){
            var oDeclaration = window.getComputedStyle(oObject, sStyleName);
            sResult = oDeclaration.getPropertyValue(sStyleName);
        }else if(oObject.currentStyle){
            var i;
            while((i = sStyleName.indexOf("-")) != -1){
                sStyleName = sStyleName.substr(0, i) + sStyleName.substr(i+1,1).toUpperCase() + sStyleName.substr(i+2);
            }

            if(oObject.currentStyle[sStyleName]){
                sResult = oObject.currentStyle[sStyleName];
            }
        }

        return sResult;
    },

    allDescendants: function(element) {
        var res = [];
        for (var i = 0; i < element.childNodes.length; i++) {
            var child = element.childNodes[i];
            var children = AMI.allDescendants(child);
            res.push(child);
            if(children.length){
                for(var j = 0; j < children.length; j++){
                    res.push(children[j]);
                }
            }
        }
        return res;
    },

    getMaxZIndex: function(){
        var elements = document.getElementsByTagName("*");
        var res = 0;

        for (var i = 0; i < elements.length - 1; i++) {
            if (parseInt(elements[i].style.zIndex) > res) {
                res = parseInt(elements[i].style.zIndex);
            }
        }
        return res;
    }
}

/*
 * FILE END: _shared/code/js/ami.browser.dom.js
 */

/*
 * FILE START: _shared/code/js/ami.message.js
 */

AMI.Message = {
    oListeners: {},

    addListener: function(sMessage, oCallback, isImportant){
        if(typeof(this.oListeners[sMessage]) == 'undefined'){
            this.oListeners[sMessage] = [];
        }
        if(typeof(isImportant) != 'undefined'){
            this.oListeners[sMessage].unshift(oCallback); // Place callback to the start
        }else{
            this.oListeners[sMessage].push(oCallback); // Place callback to the end
        }
    },

    removeListener: function(sMessage, oCallback){
        if(typeof(sMessage) == 'undefined'){
            this.oListeners = {};
        }else if(typeof(oCallback) == 'undefined'){
            if(typeof(this.oListeners[sMessage]) != 'undefined'){
                this.oListeners[sMessage] = [];
            }
        }else{
            if(typeof(this.oListeners[sMessage]) != 'undefined'){
                var iListenersNumber = this.oListeners[sMessage].length;
                for(var i = 0; i < iListenersNumber; i++){
                    if(this.oListeners[sMessage][i] == oCallback){
                        this.oListeners[sMessage][i] = null;
                    }
                }
            }
        }
    },

    hasListeners: function(sMessage){
        return (typeof(this.oListeners[sMessage]) != 'undefined') && this.oListeners[sMessage].length;
    },

    send: function(sMessage, param1, param2){
        var bResult = true;
        if(typeof(this.oListeners[sMessage]) != 'undefined'){
            /*
             param1 = typeof(param1) == 'undefined' ? null : param1;
             param2 = typeof(param2) == 'undefined' ? null : param2;
             */
            if(typeof(param1) == 'undefined'){
                param1 = null;
            }
            if(typeof(param2) == 'undefined'){
                param2 = null;
            }
            for(var i in this.oListeners[sMessage]){
                if(typeof(this.oListeners[sMessage][i]) == 'function'){
                    bResult = this.oListeners[sMessage][i](param1, param2);
                    if(!bResult){
                        break;
                    }
                }
            }
        }

        return bResult;
    }
}


/*
 * FILE END: _shared/code/js/ami.message.js
 */

/*
 * FILE START: _shared/code/js/ami.template.js
 */

AMI.Template = {
    currentValues : null,
    conditionStrings : [],

    storeConditionStrings : function(match, quote, str, offset, originalString){
        var result = this.conditionStrings.length;
        this.conditionStrings[result] = quote + str + quote;
        return '"' + result + '"';
    },

    restoreConditionStrings : function(match, position, offset, originalString){
        if(typeof(this.conditionStrings[position]) != 'undefined'){
            return this.conditionStrings[position];
        }else{
            return '';
        }
    },

    getCondition : function(construction){
        construction = construction.replace(/\\'/g, "'").replace(/\\\\/g, '\\').replace(/&amp;/g, '&');
        this.conditionStrings = [];
        construction = construction.replace(
            /('|")((?:.|[\r\n])*?)\1/g,
            function(_this){
                return function(match, quote, str, offset, originalString){
                    return _this.storeConditionStrings(match, quote, str, offset, originalString);
                }
            }(this)
        );
        construction = construction.replace(/(^|[^"\'A-Za-z\_0-9\[])([0-9A-Za-z\_]*[A-Za-z_]+[0-9A-Za-z\_]*)([^\]"\'A-Za-z\_0-9\(\[]|$)/g, '$1AMI.Template.getValue("$2")$3');
        construction = construction.replace(
            /"(\d+)"/g,
            function(_this){
                return function(match, position, offset, originalString){
                    return _this.restoreConditionStrings(match, position, offset, originalString);
                }
            }(this)
        );
        return construction;
    },

    replaceSpecial : function(match, construction, offset, originalString){
        var result = '';
        if(matches = construction.match(/^if\((.*?)\)$/)){
            result = "'; if(" + this.getCondition(matches[1]) + "){evalResult += '";
        }else if(matches = construction.match(/^else if\((.*?)\)$/)){
            result = "';} else if(" + this.getCondition(matches[1]) + "){evalResult += '";
        }else if(construction == 'else'){
            result = "';} else { evalResult += '";
        }else if(construction == 'endif'){
            result = "';} evalResult += '";
        }else if(/^[a-zA-Z0-9_\.\-]+$/.test(construction)){
            result = "' + AMI.Template.getValue('" + construction + "') + '";
        }else{
            result = match;
        }
        return result;
    },

    getValue : function(varKey){
        if(typeof(this.currentValues[varKey]) != 'undefined'){
            return this.currentValues[varKey];
        }else{
            return '';
        }
    },

    parse : function(content, aData){
        content = "'" + content.replace(/\\/g, '\\' + '\\').replace(/'/g, "\\'").replace(/\r/g, '').replace(/\n/g, "\\" + "\n") + "';";
        content = content.replace(
            /@@(.*?)@@/g,
            function(_this){
                return function(match, construction, offset, originalString){
                    return _this.replaceSpecial(match, construction, offset, originalString);
                }
            }(this)
        );

        this.currentValues = aData;
        var evalResult = '';
        eval('evalResult = ' + content);

        return evalResult;
    },

    getTemplate: function(elementId){
        var content = '';
        var oElement = AMI.find('#' + elementId);
        if(oElement != null){
            content = oElement.innerHTML;
            content = content.replace(/^\s*<\!--([\s\S]*)-->\s*$/i, '$1');
        }
        return content;
    }
}

AMI.Template.Locale = {
    oDictionary: {},

    init: function(oDictionary){
        this.oDictionary = oDictionary;
    },

    /**
     * Set single caption
     *
     * @param  {string} key
     * @param  {string} caption
     * @return void
     */
    set : function(key, caption){
        this.oDictionary[key] = caption;
    },

    /**
     * Append only new captions to dictionary
     *
     * @param  {object} oDictionary  Object containing properties as keys and its values as captions
     * @return void
     */
    append : function(oDictionary){
        for(var key in oDictionary){
            if(typeof(this.oDictionary[key]) == 'undefined'){
                this.oDictionary[key] = oDictionary[key];
            }
        }
    },

    /**
     * Append new captions, override obsolete
     *
     * @param  {object} oDictionary  Object containing properties as keys and its values as captions
     * @return void
     */
    merge : function(oDictionary){
        for(var key in oDictionary){
            this.oDictionary[key] = oDictionary[key];
        }
    },

    /**
     * Get caption by key
     *
     * @param  {string} key
     * @return {string} | null
     */
    get : function(key, warn){
        if('undefined' === typeof(warn)){
            warn = true;
        }
        if(warn && 'undefined' === typeof(this.oDictionary[key])){
            if(typeof(console) == 'object' && typeof(console.warn) == 'function'){
                // firebug debugging
                console.warn("Undefined dictionary key '" + key + "'");
                // console.trace();
            }
            return null;
        }else{
            return this.oDictionary[key];
        }
    },

    /**
     * Parse caption specified by key using variables
     *
     * @param  {string} key
     * @param  {object} oVariables  Object containing properties as keys and its values as captions
     * @return {string} | null
     */
    parse : function(key, oVariables){
        var caption = this.get(key);
        if(caption){
            for(var variable in oVariables){
                caption = caption.replace('_' + variable + '_', oVariables[variable]);
            }
        }
        return caption;
    }
}

function print_r( array, return_val ) {    // Prints human-readable information about a variable

    var output = "", pad_char = " ", pad_val = 4;

    var formatArray = function (obj, cur_depth, pad_val, pad_char) {
        if(cur_depth > 0)
            cur_depth++;

        var base_pad = repeat_char(pad_val*cur_depth, pad_char);
        var thick_pad = repeat_char(pad_val*(cur_depth+1), pad_char);
        var str = "";

        if(obj instanceof Array || obj instanceof Object) {
            str += "Array\n" + base_pad + "(\n";
            for(var key in obj) {
                if(obj[key] instanceof Array || obj[key] instanceof Object) {
                    str += thick_pad + "["+key+"] => "+formatArray(obj[key], cur_depth+1, pad_val, pad_char);
                } else {
                    str += thick_pad + "["+key+"] => " + obj[key] + "\n";
                }
            }
            str += base_pad + ")\n";
        } else {
            str = obj.toString();
        };

        return str;
    };

    var repeat_char = function (len, char) {
        var str = "";
        for(var i=0; i < len; i++) { str += char; };
        return str;
    };

    output = formatArray(array, 0, pad_val, pad_char);

    if(return_val !== true) {
        document.write("<pre>" + output + "</pre>");
        return true;
    } else {
        return output;
    }
}


/*
 * FILE END: _shared/code/js/ami.template.js
 */

/*
 * FILE START: _shared/code/js/ami.string.js
 */

AMI.String = {
    decodeHTMLSpecialChars : function(content){
        return content.replace(/&(.{2,4});/gi, function(wholeString, match){
            // Remember to change php unhtmlentities when expanding replacements
            var associations = {
                '#039' : "'",
                '#037' : "%",
                '#035' : '#',
                'quot' : '"',
                'lt' : '<',
                'gt' : '>',
                'amp' : '&'
            };
            if(associations[match]){
                return associations[match];
            }else{
                return match;
            }
        });
    },

    decodeJSON: function(data){
        var oResult;
        eval('oResult = ' + data);
        return oResult;
    },

    stripTags: function(str){
        return str.replace(/<\/?[^\s^>]+[^>]*?>/gi, '');
    },

    trim: function(str){
        return str.replace(/^\s+/mg, '').replace(/\s+$/mg, '');
    }
}


/*
 * FILE END: _shared/code/js/ami.string.js
 */

/*
 * FILE START: _shared/code/js/ami.httprequest.js
 */

AMI.HTTPRequest = {

    requests: [],
    variables: {},
    urlHash: '',

    // Init XML HTTP object
    _initObjectRequest: function(requestId){
        try{
            this.requests[requestId]['transport'] = new XMLHttpRequest();
        }catch(exception){
            this.requests[requestId]['transport'] = null;
        }
        if(this.requests[requestId]['transport'] == null){
            for(var i = 0; i < 2; i++){
                activeXName = i == 0 ? 'Msxml2.XMLHTTP' : 'Microsoft.XMLHTTP';
                try{
                    this.requests[requestId]['transport'] = new ActiveXObject(activeXName);
                }catch(exception){
                    this.requests[requestId]['transport'] = null;
                }
                if(this.requests[requestId]['transport'] != null){
                    break;
                }
            }
        }
        return (this.requests[requestId]['transport'] != null);
    },

    // Create query string from variables object
    _getRequestVariables: function(requestId){
        var variables = '';
        for(var key in this.requests[requestId]['variables']){
            variables += variables.length > 0 ? '&' : '';
            variables += encodeURIComponent(key) + '=' + encodeURIComponent(this.requests[requestId]['variables'][key]);
        }
        return variables;
    },

    // Create valid url for request
    _prepeareUrl: function(requestId){
        var url = this.requests[requestId]['url'];
        if(this.requests[requestId]['method'] == 'GET'){
            var variables = this._getRequestVariables(requestId);
            if(variables.length > 0){
                url = url + '?' + variables;
            }
            if(this.requests[requestId]['hash'].length > 0){
                url = url + '#' + encodeURIComponent(this.requests[requestId]['hash']);
            }
            /*}else if(this.requests[requestId]['method'] == 'POST'){
             var variables = this._getRequestVariables(requestId);
             this.requests[requestId]['transport'].send(variables);*/
        }
        return url;
    },

    // Process request for session parameters
    _request: function(requestId){
        if(this._initObjectRequest(requestId)){
            this.requests[requestId]['transport'].open(this.requests[requestId]['method'], this._prepeareUrl(requestId), true);
            if(this.requests[requestId]['method'] == 'GET'){
                this.requests[requestId]['transport'].setRequestHeader('If-Modified-Since', 'Sat, 1 Jan 2000 00:00:00 GMT');
                this.requests[requestId]['transport'].send(null);
            }else{
                this.requests[requestId]['transport'].setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                this.requests[requestId]['transport'].send(this._getRequestVariables(requestId));
            }
            this.resetRequestVariables();
            setTimeout('AMI.HTTPRequest._checkResponse('+requestId+')', 10);
        }else{
            alert('Problem with XML HTTP initialization');
        }
    },

    // Check the response from server and process action
    _checkResponse: function(requestId){
        if(this.requests[requestId]['transport'].readyState == 4){
            if(this.requests[requestId]['transport'].status == 200){
                this.requests[requestId]['status'] = 1;
                this.requests[requestId]['content'] = this.requests[requestId]['transport'].responseText;
            }
            else if(this.requests[requestId]['transport'].status == 401){ // Unauthorized
                this.requests[requestId]['status'] = 3;
            }
            else{
                this.requests[requestId]['status'] = 2;
            }
            if(this.requests[requestId]['callback'] != null){
                this.requests[requestId]['callback'](this.requests[requestId]['status'], this.requests[requestId]['content']);
            }
            this.requests[requestId]['transport'] = null;
            this.requests[requestId] = null;
        }else{
            setTimeout('AMI.HTTPRequest._checkResponse('+requestId+')', 10);
        }
    },

    // Remove all query variables
    resetRequestVariables: function(){
        this.variables = {};
    },

    // Add query variable
    addVariable: function(key, value, bDecode){
        bDecode = bDecode || false;
        if(bDecode){
            value = decodeURIComponent(value);
        }
        this.variables[decodeURIComponent(key)] = value;
    },

    // Set url hash code
    setUrlHash: function(value){
        this.urlHash = decodeURIComponent(value);
    },

    // Parse query string and create variables object
    setVariables: function(mVariables){
        if(mVariables != '')
            this.resetRequestVariables();
        if(typeof(mVariables) == 'object'){
            this.setUrlHash('');

            for(key in mVariables){
                this.addVariable(key, mVariables[key]);
            }
        }else if(mVariables != ''){
            mVariables = mVariables.replace(/^[\s?]*(.*?)[\s]*$/g, '$1');

            var aHash = mVariables.split('#');
            if(typeof(aHash[1]) != 'undefined'){
                mVariables = aHash[0];
                this.setUrlHash(aHash[1]);
            }else{
                this.setUrlHash('');
            }

            var aPairs = mVariables.split('&');
            for(var i = 0; i < aPairs.length; i++){
                aPair = aPairs[i].split('=');
                if(aPair[0] != ''){
                    this.addVariable(aPair[0], aPair[1], true);
                }
            }
        }
    },

    addVariablesFromForm: function(oForm){
        for(var i = 0; i < oForm.elements.length; i++){
            var oField = oForm.elements[i];
            if(!oField.disabled && oField.name != ''){
                if(oField.type == 'checkbox' || oField.type == 'radio'){
                    if(oField.checked){
                        this.addVariable(oField.name, oField.value);
                    }
                }else{
                    this.addVariable(oField.name, oField.value);
                }
            }
        }
    },

    getContent: function(method, url, mVariables, callbackFunction){
        var requestId = this.requests.length;
        this.requests[requestId] = {};
        this.requests[requestId]['status'] = 0;
        this.requests[requestId]['callback'] = typeof(callbackFunction) == 'function' ? callbackFunction : null;
        this.requests[requestId]['transport'] = null;
        this.requests[requestId]['method'] = method.toUpperCase();
        this.requests[requestId]['url'] = url;
        this.setVariables(typeof(mVariables) == 'undefined' ? '' : mVariables);
        this.requests[requestId]['variables'] = this.variables;
        this.requests[requestId]['hash'] = this.urlHash;
        this.requests[requestId]['content'] = '';
        this._request(requestId);
    },

    submitForm: function(method, oForm, mAdditionalVariables, callbackFunction){
        var sURL = oForm.attributes.action.value;

        this.setVariables(typeof(mAdditionalVariables) == 'undefined' ? '' : mAdditionalVariables);
        this.addVariablesFromForm(oForm);

        this.getContent(
            method != '' ? method.toUpperCase() : (oForm.attributes.method && oForm.attributes.method.value.toLowerCase() == 'post' ? 'POST' : 'GET'),
            sURL,
            '',
            callbackFunction
        );
    },

    parseURL: function(url){
        var a = document.createElement('a');

        a.href = url;

        return a;
    },

    parseURLQuery: function(query){
        var oResult = {}, aPairs = query.split('&'), aPair;

        for(var i = 0; i < aPairs.length; i++){
            aPair = aPairs[i].split('=');
            oResult[aPair[0]] = aPair[1];
        }

        return oResult;
    }
}


/*
 * FILE END: _shared/code/js/ami.httprequest.js
 */

/*
 * FILE START: _shared/code/js/ami.cookie.js
 */

/**
 * @fileOverview File contains Cookie implementation.
 */

/**
 * Static object that allows to manipulate by cookies and stores cookie data to server or client (base difference from AMI.Browser.Cookie).
 *
 * @class Static object for page actions and data handling.
 */
AMI.Cookie = {
    /**
     * Default scope for read and set cookie variables. Could be 'client' (regular cookie) or 'server'.
     *
     * @private
     */
    defaultScope: 'server',

    /**
     * Storage for server variables.
     *
     * @private
     */
    serverData: {},

    /**
     * Initial data state
     *
     * @private
     */
    initialData: {},

    /**
     * Storage for server variables that should be set with save() method.
     *
     * @private
     */
    serverDataToSave: {},

    /**
     * Mode for saving variables. If true request will be sent to server for variable storing after set(...) calling. False - only with save() method.
     *
     * @private
     */
    bAutoSave: false,

    /**
     * Autosave timeout
     *
     * @private
     */
    timeout: null,

    /**
     * Cookie data has local changes for save
     */
    hasChanges: false,

    /**
     * Counters
     */
    changeCounter: 0,
    globalCounter: 0,
    changeInterval: 5,  // Save after X seconds after last save
    globalInterval: 30, // Force save every Y seconds

    /**
     * Init variables. There are two methods - from global JS variable serverCookies and with AJAX query to server in case serverCookies = 'load'. If serverCookies is not set empty server data initialized.
     *
     * @returns {void}
     */
    init: function(){
        this.serverData = {};
        if(typeof serverCookies != 'undefined'){
            if(serverCookies == 'load'){
                // Todo
            }else{
                this.serverData = serverCookies;
                this.refreshInitialData();
                this.startAutosave();
            }
        }else{
            this.setDefaultScope('client');
        }
    },

    // Fill initial data with server data values                
    refreshInitialData: function(){
        for(var key in this.serverData){
            this.initialData[key] = this.serverData[key];
        }
    },

    autosave: function(cookies){
        return function(){
            if(cookies.hasChanges){
                cookies.changeCounter++;
                cookies.globalCounter++;
                if((cookies.changeCounter == cookies.changeInterval) || (cookies.globalCounter == cookies.globalInterval)){
                    cookies.save(true);
                }
            }
        }
    },

    startAutosave: function(){
        setInterval(this.autosave(this), 1000);
    },


    /**
     * Set default scope for cookie variables. "server" is default.
     *
     * @param {string} scope Scope that could be "server" or "client".
     * @returns {void}
     */
    setDefaultScope: function(scope){
        this.defaultScope = scope;
    },

    /**
     * Calls _save with a little delay.
     *
     * @param {bool} doDirectSave Set to true if you wish to send request for saving variable directly.
     * @param {bool} saveImg      Save using image.src
     * @returns {void}
     */
    save: function(doDirectSave, saveImg){
        if(doDirectSave){
            var getString = typeof(editorBaseHref) != 'undefined' ? 'ajax.php?action=saveServerCookie&type=cookie' : '?action=saveServerCookie';
            var oData = /* typeof(oData) == 'object' ? oData : */ this.serverDataToSave;
            var hasData = false;
            for(var variableName in oData){
                getString += '&key[]=' + encodeURIComponent(variableName) + '&value[]=' + encodeURIComponent(oData[variableName].value) + '&expire[]=' + encodeURIComponent(oData[variableName].expire) + '&path[]=' + encodeURIComponent(oData[variableName].path);
                hasData = true;
            }

            this.hasChanges = false;
            this.changeCounter = 0;
            this.globalCounter = 0;
            this.serverDataToSave = {};
            this.refreshInitialData();

            if(hasData){
                if(typeof(saveImg) != 'undefned' && saveImg){
                    var rndseed = new String(Math.random());
                    rndseed = rndseed.substring(2,11);
                    getString += ("&response=img&rs=" + rndseed);
                    var img = new Image();
                    img.src = getString;
                }else{
                    AMI.HTTPRequest.getContent('GET', getString);
                }
            }
        }else{
            return;

            // Old delayed save
            if(this.timeout){
                clearTimeout(this.timeout);
            }
            this.timeout = setTimeout(function(cookies){
                return function(){
                    cookies.save(true);
                    cookies.timeout = null;
                }
            }(this), 1000);
        }
    },

    /**
     * Set cookie variable.
     *
     * @param {string} name Variable name.
     * @param {string} value Variable value.
     * @param {int} expireSeconds Number of seconds that variable will be actual (1 hour by default).
     * @param {string} path Cookie path.
     * @param {bool} doDirectSave Not required. Set to true if you wish to send request for saving variable directly.
     * @param {string} scope Not required. Scope in which variable should be stored.
     * @returns {void}
     */
    set: function(name, value, expireSeconds, path, doDirectSave, scope){
        scope = scope || this.defaultScope;
        if(typeof(expireSeconds) == 'undefined'){
            expireSeconds = 3600;
        }
        if(typeof(doDirectSave) == 'undefined'){
            doDirectSave = false;
        }
        if(typeof(path) == 'undefined'){
            path = '';
        }
        if(expireSeconds <= 0){
            this.del(name, doDirectSave, scope);
        }else{
            if(scope == 'server'){
                if((typeof(this.initialData[name]) == 'undefined') || this.initialData[name] != value){
                    this.hasChanges = true;
                    this.changeCounter = 0;
                    this.serverData[name] = value;
                    this.serverDataToSave[name] = {'value' : value, 'expire': expireSeconds, 'path' : path};
                    // Skip save if doDirectSave = null given
                    if(typeof(doDirectSave) != 'undefined' && doDirectSave == null){
                        return;
                    }
                    if(this.bAutoSave || doDirectSave){
                        this.save(true);
                    }
                }else if((typeof(this.initialData[name]) != 'undefined') && this.initialData[name] == value){
                    this.serverData[name] = value;
                    if(typeof(this.serverDataToSave[name]) != 'undefined'){
                        delete this.serverDataToSave[name];
                    }
                }
            }else{
                AMI.Browser.Cookie.set(name, value, Math.ceil(expireSeconds / 3600));
            }
        }
    },

    /**
     * Get cookie variable.
     *
     * @param {string} name Variable name.
     * @param {string} scope Not required. Scope from which variable should be read.
     * @returns {string} Variable value or null if it is not set.
     */
    get: function(name, scope){
        scope = scope || this.defaultScope;

        if(scope == 'server'){
            if(typeof(this.serverData[name]) != 'undefined'){
                return this.serverData[name];
            }else{
                return null;
            }
        }else{
            return AMI.Browser.Cookie.get(name);
        }
    },

    /**
     * Check if variable is set (in required scope).
     *
     * @param {string} name Variable name.
     * @param {string} scope Not required. Scope from which variable should be read.
     * @returns {bool} True if variable was found and false otherwise.
     */
    isset: function(name, scope){
        scope = scope || this.defaultScope;
        return this.get(name, scope) != null;
    },

    /**
     * Delete variable (from required scope).
     *
     * @param {string} name Variable name.
     * @param {string} path Cookie path.
     * @param {bool} doDirectSave Not required. Set to true if you wish to send request for deleting variable directly.
     * @param {string} scope Not required. Scope from which variable should be read.
     * @returns {bool} True if variable was found and false otherwise.
     */
    del: function(name, path, doDirectSave, scope){
        scope = scope || this.defaultScope;
        doDirectSave = typeof(doDirectSave) == 'undefined' ? false : doDirectSave;
        path = typeof(path) == 'undefined' ? '' : path;
        if(scope == 'server'){
            if(typeof this.serverData[name] != 'undefined'){
                delete this.serverData[name];
                this.serverDataToSave[name] = {'value' : '', 'expire': 0, 'path' : path};
                if(this.bAutoSave || doDirectSave){
                    this.save(true);
                }
            }
        }else{
            AMI.Browser.Cookie.del(name);
        }
    },

    getModPath : function(){
        var path = '/50/' + (window.module_name == 'pages' ? 'pmanager' : window.module_name) + '/';
        if(typeof(AMI.Page) != 'undefined'){
            for (var moduleId in AMI.Page.aModules) break;
            if(moduleId){
                if(typeof(module60compatible) != 'undefined'){
                    path = '/PA/'  + moduleId + '/';
                }else{
                    path = '/60/' + moduleId + '/';
                }
            }
        }

        return path;
    }
}
AMI.Cookie.init();


/*
 * FILE END: _shared/code/js/ami.cookie.js
 */

/*
 * FILE START: _shared/code/js/ami.ui.js
 */

AMI.UI = {

    /**
     * Property to save old alert
     */
    _savedAlert: null,

    /**
     * Alert window container
     */
    oAlertWindow: null,

    /**
     * Alert window timer
     */
    alertWindowTimer: null,

    /**
     * Is alert visible?
     */
    alertVisible: false,

    /**
     * Is body onclick handler attached?
     */
    bodyClickHandler: false,

    /**
     * Overload default alert() function with a custom div
     *
     * @param {bool} bState true if overload
     * @returns {void}
     */
    overloadAlert: function(bState){
        window.onloadAlerted = false;
        if(bState){
            this._savedAlert = window.alert;
            window.alert = function(message, type){
                if((window.pageLoaded == undefined) || !window.pageLoaded) return;
                window.onloadAlerted = true;
                if(!message || (message == '')){
                    return false;
                }
                AMI.UI.Alert.show(message, type);
            }
        }else{
            if(typeof(this._savedAlert) == 'function'){
                alert = this._savedAlert;
            }
        }
    },

    center: function(div){
        AMI.UI.centerH(div);
        AMI.UI.centerW(div);
    },

    centerH: function(div){
        var divHeight = div.offsetHeight;
        var scrHeight = AMI.Browser.getWindowHeight();
        div.style.top = parseInt((scrHeight - divHeight) / 2) + 'px';
    },

    centerW: function(div){
        var divWidth = div.offsetWidth;
        var scrWidth = AMI.Browser.getWindowWidth();
        div.style.left = parseInt((scrWidth - divWidth) / 2) + 'px';
    }
}


/*
 * FILE END: _shared/code/js/ami.ui.js
 */

/*
 * FILE START: _shared/code/js/ami.ui.list.js
 */

AMI.UI.List = function(containerId, requestData){
    this.idContainer = containerId;
    this.oProgress = null;
    this.oContainer = null;
    this.oPrevious = null;
    this.oNext = null;
    this.oPlayPause = null;

    this.oDebug = null;

    this.sRowTemplateId = 'itemRowTemplate_' + containerId;
    this.aRequestData = requestData;

    // Refresh data
    this.refreshInterval = typeof(requestData.refreshInterval) == 'undefined' ? 0 : Math.max(1, parseFloat(requestData.refreshInterval));
    this.refreshIntervalInitial = this.refreshInterval;
    this.refreshMultiplier = typeof(requestData.refreshIntervalMultiplier) == 'undefined' ? 0 : Math.max(1, parseFloat(requestData.refreshIntervalMultiplier));
    this.refreshMaximum = typeof(requestData.refreshNumber) == 'undefined' ? 50 : Math.min(50, parseInt(requestData.refreshNumber));
    this.refreshMaximumInitial = this.refreshMaximum;
    this.refreshType = typeof(requestData.refreshType) == 'undefined' ? 'reload' : requestData.refreshType;
    this.refreshTimeout = null;
    this.refreshPaused = false;

    this.lastAction = '';
    this.lastRecordsCount = 0;

    this.scriptName = 'ami_resp';
    this.scriptExt = 'php';

    this.init = function(){
        this.oContainer = document.getElementById('amiContent' + containerId);
        this.oProgress = document.getElementById('amiProgress' + containerId);
        this.oPrevious = document.getElementById('amiNavPreviuos' + containerId);
        this.oNext = document.getElementById('amiNavNext' + containerId);
        this.oPlayPause = document.getElementById('amiNavPlayPause' + containerId);

        if(this.oProgress == null && this.oContainer != null){
            this.oProgress = AMI.Browser.DOM.create('DIV', '', 'amiListProgress', '', this.oContainer.parentNode);
            var oProgressImage = AMI.Browser.DOM.create('IMG', '', '', '', this.oProgress);
            oProgressImage.src = frontBaseHref + '/_img/ami_jsapi/loader.gif';
        }
        if(isNaN(this.refreshMaximum)){
            this.refreshMaximum = 0;
            this.refreshMaximumInitial = 0;
        }
        if(this.oPlayPause && this.refreshInterval > 0 && this.refreshMaximum > 0){
            this.oPlayPause.className = this.oPlayPause.className.replace(/\s*ami_resp_play_pause_disabled/, '');
        }

        AMI.Message.send('ON_AMI_LIST_READY', this.idContainer, this);
    }

    this.showProgress = function(){
        if(this.oProgress != null){
            var oPos = AMI.Browser.getObjectPosition(this.oContainer, true);
            this.oProgress.style.left = oPos[0] + 'px';
            this.oProgress.style.top = oPos[1] + 'px';
            this.oProgress.style.width = this.oContainer.offsetWidth + 'px';
            this.oProgress.style.height = this.oContainer.offsetHeight + 'px';
            this.oProgress.style.display = 'block';
        }
    }

    this.hideProgress = function(){
        if(this.oProgress != null){
            this.oProgress.style.display = 'none';
        }
    }

    this.updatePrevNext = function(iDisableNext){
        if(this.oPrevious != null){
            if(parseInt(this.aRequestData.offset) <= 0 && this.oPrevious.className.indexOf('ami_resp_prev_disabled') == -1){
                AMI.Message.send('ON_AMI_LIST_PREVIOUS_DISABLE', this.idContainer, this.oPrevious);
                this.oPrevious.className = this.oPrevious.className + (this.oPrevious.className.length > 0 ? ' ' : '') + 'ami_resp_prev_disabled';
            }else if(parseInt(this.aRequestData.offset) > 0 && this.oPrevious.className.indexOf('ami_resp_prev_disabled') >= 0){
                AMI.Message.send('ON_AMI_LIST_PREVIOUS_ENABLE', this.idContainer, this.oPrevious);
                this.oPrevious.className = this.oPrevious.className.replace(/\s*ami_resp_prev_disabled/, '');
            }
        }
        if(this.oNext != null && typeof(iDisableNext) != 'undefined'){
            if(iDisableNext && this.oNext.className.indexOf('ami_resp_next_disabled') == -1){
                AMI.Message.send('ON_AMI_LIST_NEXT_DISABLE', this.idContainer, this.oNext);
                this.oNext.className = this.oNext.className + (this.oNext.className.length > 0 ? ' ' : '') + 'ami_resp_next_disabled';
            }else if(!iDisableNext && this.oNext.className.indexOf('ami_resp_next_disabled') >= 0){
                AMI.Message.send('ON_AMI_LIST_NEXT_ENABLE', this.idContainer, this.oNext);
                this.oNext.className = this.oNext.className.replace(/\s*ami_resp_next_disabled/, '');
            }
        }
    }

    this.setDebug = function(aReceivedData){
        if(DEBUG_BY_IP && typeof(aReceivedData.debug) != 'undefined'){
            if(this.oDebug == null){
                this.oDebug = AMI.Browser.DOM.create('div', '', '', '', document.getElementById('ami_resp_outer_' + this.idContainer));
            }
            this.oDebug.innerHTML = '<div style="background: red; height: 1px; margin-bottom: 5px; overflow: hidden;"></div>' + aReceivedData.debug + this.oDebug.innerHTML;
        }
    }

    this.load = function(lastAction){
        if(typeof(lastAction) == 'undefined'){
            this.lastAction = 'load';
        }else{
            this.lastAction = lastAction;
        }

        clearTimeout(this.refreshTimeout);
        if(this.oContainer != null){
            this.showProgress();

            //var url = document.location.protocol + '//' + document.location.host + '/' + this.scriptName + '.' + this.scriptExt + '?';
            var url = frontBaseHref + this.scriptName + '.' + this.scriptExt + '?';
            var cnt = 0;
            for(var name in this.aRequestData){
                if(name != 'refresh' && name != 'refreshMultiplier' && name != 'refreshType'){
                    url = url + (cnt++ > 0 ? '&' : '') + encodeURIComponent(name) + '=' + encodeURIComponent(this.aRequestData[name]);
                }
            }
            AMI.HTTPRequest.getContent(
                'GET',
                url,
                '',
                function(_this){
                    return function(state, content){
                        _this.onContentReceived(state, content);
                    }
                }(this)
            );
        }
    }

    this.onContentReceived = function(state, content){
        if(state == 1){
            this.hideProgress();

            var aReceived = {};

            if(content.indexOf('{') != 0){
                aReceived.debug = 'Unknown data received for block ' + this.idContainer + ': ' + content;
                this.setDebug(aReceived);
                return;
            }

            aReceived = AMI.String.decodeJSON(content);
            var bDisableNext = true;
            if(typeof(aReceived) == 'object'){
                if(typeof(aReceived.code) != 'undefined' && aReceived.code == -1){
                    document.getElementById('ami_resp_outer_' + this.idContainer).style.display = 'none';
                    document.getElementById('ami_resp_forbidden_' + this.idContainer).innerHTML += " '" + aReceived.message + "'";
                    document.getElementById('ami_resp_forbidden_' + this.idContainer).style.display = 'block';
                    return;
                }

                this.setDebug(aReceived);

                if(typeof(aReceived.data) == 'object' && typeof(aReceived.data.list) == 'object'){
                    this.lastRecordsCount = aReceived.data.list.length;
                    if(aReceived.data.list.length == this.aRequestData.limit){
                        bDisableNext = false;
                    }

                    this.setListData(aReceived.data.list);
                    this.playNext();
                }
            }
            if(this.lastAction == 'next' && this.lastRecordsCount == 0){
                this.aRequestData.offset = Math.max(0, parseInt(this.aRequestData.offset) - parseInt(this.aRequestData.limit));
            }
            if(this.refreshType == 'next' && bDisableNext || this.refreshType == 'previous' && parseInt(this.aRequestData.offset) == 0){
                this.playPause('pause');
            }
            this.updatePrevNext(bDisableNext);
        }
    }

    this.setListData = function(aRowsData){
        var sRowTemplate = AMI.Template.getTemplate(this.sRowTemplateId);

        if(aRowsData.length && aRowsData.length > 0){
            var content = '';
            for(var i=0; i<aRowsData.length; i++){
                AMI.Message.send('ON_AMI_LIST_DRAW_ROW', this.idContainer, aRowsData[i]);
                aRowsData[i]['mod_link'] = this.aRequestData.mod_link;
                aRowsData[i]['ROW_NUMBER'] = i;
                content += AMI.Template.parse(sRowTemplate, aRowsData[i]);
            }
            this.fillBlockContent(content);
        }
    }

    this.fillBlockContent = function(content){
        this.oContainer.innerHTML = content;
    }

    this.previousPage = function(bAutoAction){
        if(typeof(bAutoAction) == 'undefined' || !bAutoAction){
            this.playPause('pause');
        }
        if(parseInt(this.aRequestData.offset) > 0){
            this.aRequestData.offset = parseInt(this.aRequestData.offset) - parseInt(this.aRequestData.limit);
            this.load('previous');
        }
        return false;
    }

    this.nextPage = function(bAutoAction){
        if(typeof(bAutoAction) == 'undefined' || !bAutoAction){
            this.playPause('pause');
        }
        if(this.lastRecordsCount && this.lastRecordsCount == this.aRequestData.limit){
            this.aRequestData.offset = parseInt(this.aRequestData.offset) + parseInt(this.aRequestData.limit);
            this.load('next');
        }
        return false;
    }

    this.playPause = function(forceAction){
        if(typeof(forceAction) == 'indefined'){
            forceAction = 'none';
        }
        if(this.refreshPaused && forceAction != 'pause'){
            if(this.refreshType == 'next' && this.lastRecordsCount != this.aRequestData.limit){
                return;
            }
            this.refreshPaused = false;
            if(this.oPlayPause){
                this.oPlayPause.className = this.oPlayPause.className.replace(/\s*ami_resp_pause/, '');
            }
            this.refreshInterval = this.refreshIntervalInitial;
            this.refreshMaximum = this.refreshMaximumInitial;
            this.playNext(true);
        }else if(!this.refreshPaused && forceAction != 'play'){
            this.refreshPaused = true;
            this.playStop();
            if(this.oPlayPause){
                this.oPlayPause.className = this.oPlayPause.className + ' ami_resp_pause';
            }
        }
    }

    this.playNext = function(bImmediately){
        if(!this.refreshPaused && this.refreshInterval > 0 && this.refreshMaximum > 0){
            var callback = null;
            if(this.refreshType == 'next'){
                var callback = function(_this){return function(){_this.nextPage(true)}}(this);
            }else if(this.refreshType == 'previous'){
                var callback = function(_this){return function(){_this.previousPage(true)}}(this);
            }else{
                var callback = function(_this){return function(){_this.load()}}(this);
            }
            if(bImmediately){
                this.refreshTimeout = setTimeout(callback, 200);
            }else{
                this.refreshTimeout = setTimeout(callback, this.refreshInterval * 1000);
            }
            if(this.refreshMultiplier > 0){
                this.refreshInterval *= this.refreshMultiplier;
                this.refreshMaximum--;
            }
        }else if(!this.refreshPaused){
            this.playPause('pause');
        }
    }

    this.playStop = function(){
        clearTimeout(this.refreshTimeout);
    }

    this.init();
}


/*
 * FILE END: _shared/code/js/ami.ui.list.js
 */

/*
 * FILE START: _shared/code/js/ami.ui.slider.js
 */

AMI.UI.Slider = function(oParent, oBackward, oForward, iStep, bHorizontal){
    this.oParent = oParent;
    this.oSlider = null;
    this.oBackward = oBackward;
    this.oForward = oForward;
    this.iStep = iStep;
    this.bHorizontal = bHorizontal == undefined ? true : bHorizontal;

    this.currentPosition = 0;
    this.minPosition = 0;
    this.controlClassDisabled = 'disabled';

    this.hTimeout = null;
    this.bForward = true;
    this.iPeriod = 10; // ms
    this.toPosition = 0;

    this.bWheelAction = false;

    this.init = function(){
        this.oSlider = this.oParent.getElementsByTagName('div')[0];
        this.oBackward.onclick = function(_this){return function(){_this.setMoveParameters(true);_this.move()}}(this);
        this.oForward.onclick = function(_this){return function(){_this.setMoveParameters(false);_this.move()}}(this);
        AMI.Browser.Event.addHandler(this.oSlider, 'mousewheel', function(_this){return function(event){
            if( !_this.bWheelAction ){
                _this.bWheelAction = true;
                var delta = 0;
                if (event.wheelDelta) { /* IE/Opera. */
                    delta = event.wheelDelta/120;
                } else if (event.detail) { /* Mozilla. */
                    delta = -event.detail/3;
                }

                // todo: mousewheel only 1 step
                _this.setMoveParameters(delta > 0);
                _this.move();
            }
            if (event.preventDefault)
                event.preventDefault();

            event.returnValue = false;
        }}(this))
        this.reInit();
    }

    this.reInit = function(step){
        this.oBackward.className = this.oBackward.className + ' ' + this.controlClassDisabled;
        this.minPosition = Math.min(0, (this.bHorizontal ? this.oParent.offsetWidth - this.oSlider.offsetWidth : this.oParent.offsetHeight - this.oSlider.offsetHeight));
        if(typeof(step) != 'undefined'){
            this.iStep =  step;
        }
    }

    this.setMoveParameters = function(bForward){
        if(this.minPosition == 0){
            this.minPosition = Math.min(0, (this.bHorizontal ? this.oParent.offsetWidth - this.oSlider.offsetWidth : this.oParent.offsetHeight - this.oSlider.offsetHeight));
        }
        this.toPosition = Math.max(this.minPosition, Math.min(0, this.toPosition + this.iStep * (bForward ? 1 : -1)));
        this.bForward = bForward;
    }

    this.move = function(iIterationNumber){
        clearTimeout(this.hTimeout);
        if(typeof(iIterationNumber) == 'undefined'){
            iIterationNumber = 1;
        }
        var bContinue = true;
        var iMultiplier = AMI.Browser.isIE ? 5 : 1;
        var iDelta = 10 * iMultiplier;
        var iDiff = Math.abs(this.toPosition - this.currentPosition);
        if(iDiff < 15 || iIterationNumber <= 5 / iMultiplier){
            iDelta = 1 * iMultiplier;
        }else if(iDiff < 25 || iIterationNumber <= 10 / iMultiplier){
            iDelta = 3 * iMultiplier;
        }else if(iDiff < 50 || iIterationNumber <= 20 / iMultiplier){
            iDelta = 5 * iMultiplier;
        }
        iDelta *= this.bForward ? 1 : -1;
        var iPosition = this.currentPosition + iDelta;
        if(iPosition >= 0){
            bContinue = false;
            iPosition = 0;
            this.oBackward.className = this.oBackward.className + ' ' + this.controlClassDisabled;
        }else if(iPosition <= this.minPosition){
            bContinue = false;
            iPosition = this.minPosition;
            this.oForward.className = this.oForward.className + ' ' + this.controlClassDisabled;
        }else if(this.bForward && iPosition >= this.toPosition){
            bContinue = false;
            iPosition = this.toPosition;
        }else if(!this.bForward && iPosition <= this.toPosition){
            bContinue = false;
            iPosition = this.toPosition;
        }else{
            this.oBackward.className = this.oBackward.className.replace(this.controlClassDisabled, '');
            this.oForward.className = this.oForward.className.replace(this.controlClassDisabled, '');
        }

        this.currentPosition = iPosition;
        if(this.bHorizontal){
            this.oSlider.style.left = this.currentPosition + 'px';
        }else{
            this.oSlider.style.top = this.currentPosition + 'px';
        }

        if(bContinue){
            this.hTimeout = setTimeout(function(_this, _iIterationNumber){return function(){_this.move(_iIterationNumber)}}(this, ++iIterationNumber), this.iPeriod);
        }else{
            this.bWheelAction = false;
        }
    }

    this.init();
}


/*
 * FILE END: _shared/code/js/ami.ui.slider.js
 */

/*
 * FILE START: _shared/code/js/ami.ui.mediabox.js
 */

AMI.UI.MediaBox = {
    iImageAnimateTime: 100, //ms
    iImageFadeInTime: 100, //ms

    bOpenEnlarged: false,
    bShowGroupName: true,
    bShowGroupNameIfSingle: false,
    bShowSlider: false,

    bInitialized: false,
    oMediaShadow: null, oMediaBox: null, oLoader: null, oClose: null,
    oGroup: null, oHeader: null, oURL: null, oDescription: null,
    oImageArea: null, oPrevious: null, oNext: null, oImageContainer: null, oImage: null, oImageZoom: null, oImageZoomA: null,
    oSliderPrevious: null, oSliderNext: null, oSlider: null, oSliderCtrl: null, oImageCounter: null,
    sImageType: 'image',
    iImageWidthAddon: 20,
    iImageHeightAddon: 20,
    iImageHeightAddonOriginal: 20,

    hAnimateTimeout: null,
    iAnimateStepTime: null,
    iAnimateStepX: 0,
    iAnimateStepY: 0,
    iAnimateCurrentWidth: 0,
    iAnimateCurrentHeight: 0,
    iAnimateWidthTo: 0,
    iAnimateHeightTo: 0,
    iFadeInStep: 0,
    iFadeAnimationStep: 0,
    isOpening: false,
    isClosing: false,

    _iDocLeft: 0,
    _iDocTop: 0,
    _iWndWidth: 0,
    _iWndHeight: 0,
    _iTimeAnimateStop: 0,

    aGroupImages: [],
    groupCurrentIndex: 0,

    imageSizeCache: {},

    oSkins: {
        __default: {'skin': 'MediaBoxWhite', 'iWidthAddon': 20, 'iHeightAddon': 20}
    },

    addSkin: function(sSkin, aExtensions, iWidthAddon, iHeightAddon){
        if(typeof(aExtensions) == 'object'){
            for(var i = 0; i < aExtensions.length; i++){
                this.oSkins[aExtensions[i]] = {'skin': sSkin, 'iWidthAddon': iWidthAddon || 0, 'iHeightAddon':iHeightAddon || 0};
            }
        }
    },

    setOpenEnlarged: function(bState){
        this.bOpenEnlarged = bState;
    },

    setShowGroupName: function(bState){
        this.bShowGroupName = bState;
    },

    setShowGroupNameIfSingle: function(bState){
        this.bShowGroupNameIfSingle = bState;
    },

    open: function(imageUrl, imageWidth, imageHeight, groupName, header, url, urlCaption, description){
        if(this.isOpening){
            return;
        }
        this.isOpening = true;

        AMI.Browser.Event.addHandler(document, 'keydown', AMI.UI.MediaBox.closeOnEscape);

        imageWidth = imageWidth || 170;
        imageHeight = imageHeight || 150;
        groupName = groupName || '';
        header = header || '';
        url = url || '';
        urlCaption = urlCaption || '';
        description = description || '';

        var self = this;

        if(!this.bInitialized){
            this.oMediaShadow = AMI.Browser.DOM.create('DIV', '', 'MediaBox_shadow', '', document.body);
            this.oMediaBox = AMI.Browser.DOM.create('DIV', 'MediaBox', 'MediaBox', '', document.body);
            AMI.Browser.DOM.create('DIV', '', 'MediaBox_shadowL', '', this.oMediaBox);
            AMI.Browser.DOM.create('DIV', '', 'MediaBox_shadowR', '', this.oMediaBox);
            AMI.Browser.DOM.create('DIV', '', 'MediaBox_shadowT', '', this.oMediaBox);
            AMI.Browser.DOM.create('DIV', '', 'MediaBox_shadowB', '', this.oMediaBox);
            AMI.Browser.DOM.create('DIV', '', 'MediaBox_shadowLT', '', this.oMediaBox);
            AMI.Browser.DOM.create('DIV', '', 'MediaBox_shadowRT', '', this.oMediaBox);
            AMI.Browser.DOM.create('DIV', '', 'MediaBox_shadowLB', '', this.oMediaBox);
            AMI.Browser.DOM.create('DIV', '', 'MediaBox_shadowRB', '', this.oMediaBox);
            AMI.Browser.DOM.create('DIV', '', 'MediaBox_speckLT', '', this.oMediaBox);
            AMI.Browser.DOM.create('DIV', '', 'MediaBox_speckRB', '', this.oMediaBox);
            this.oClose = AMI.Browser.DOM.create('DIV', '', 'MediaBox_close', '', this.oMediaBox);
            this.oLoader = AMI.Browser.DOM.create('DIV', '', 'MediaBox_loader', '', this.oMediaBox);

            this.oGroup = AMI.Browser.DOM.create('DIV', '', 'MediaBox_group', '', this.oMediaBox);
            this.oHeader = AMI.Browser.DOM.create('DIV', '', 'MediaBox_header', '', this.oMediaBox);

            this.oImageArea = AMI.Browser.DOM.create('DIV', 'MediaBox_imageArea', 'MediaBox_imageArea', '', this.oMediaBox);
            this.oPrevious = AMI.Browser.DOM.create('DIV', 'MediaBox_previous', 'MediaBox_previous', '', this.oImageArea);
            this.oNext = AMI.Browser.DOM.create('DIV', 'MediaBox_next', 'MediaBox_next', '', this.oImageArea);
            this.oImageContainer = AMI.Browser.DOM.create('DIV', '', 'MediaBox_container', '', this.oImageArea);
            this.oImageZoom = AMI.Browser.DOM.create('DIV', '', 'MediaBox_zoom', '', this.oMediaBox);
            this.oImageZoomA = AMI.Browser.DOM.create('A', '', 'MediaBox_zoomA', '', this.oImageZoom);
            this.oImageZoomA.href = '';

            this.oDescription = AMI.Browser.DOM.create('DIV', '', 'MediaBox_description', '', this.oMediaBox);
            this.oURL = AMI.Browser.DOM.create('DIV', '', 'MediaBox_url', '', this.oMediaBox);

            this.oSliderPrevious = AMI.Browser.DOM.create('DIV', 'MediaBox_sliderPrevious', '', '', this.oMediaBox);
            this.oSliderNext = AMI.Browser.DOM.create('DIV', 'MediaBox_sliderNext', '', '', this.oMediaBox);
            this.oSlider = AMI.Browser.DOM.create('DIV', '', 'MediaBox_slider', '', this.oMediaBox);
            this.oImageCounter = AMI.Browser.DOM.create('DIV', '', 'MediaBox_counter', '', this.oMediaBox);

            if(AMI.Browser.isIE){
                if (navigator.appVersion.indexOf('MSIE 7.0') >= 0){
                    AMI.find('#MediaBox_previous').style.left = '-38px';
                    header = '<span style="font-size:1px;">&nbsp;</span>';
                    setInterval(
                        function() {
                            var height = AMI.find('#MediaBox').offsetHeight;
                            AMI.find('#MediaBox_previous').style.top = height ? parseInt(height/2-32) + 'px' : '50%';
                            AMI.find('#MediaBox_next').style.top = height ? parseInt(height/2-32) + 'px' : '50%';
                        },
                        100
                    );
                }
            }

            AMI.Browser.Event.addHandler(this.oClose, 'click', function(){self.close()});
            AMI.Browser.Event.addHandler(this.oMediaShadow, 'click', function(){self.close()});
            AMI.Browser.Event.addHandler(this.oPrevious, 'click', function(){self.previous()});
            AMI.Browser.Event.addHandler(this.oNext, 'click', function(){self.next()});

            this.bInitialized = true;
        }
        if(this.bInitialized){
            this.oMediaShadow.style.display = 'block';
            if(AMI.Browser.isIE || AMI.Browser.isIOS){
                this.oMediaShadow.style.width = AMI.Browser.getDocumentWidth() + 'px';
                this.oMediaShadow.style.height = AMI.Browser.getDocumentHeight() + 'px';
                this.oMediaBox.style.position = 'absolute';
            }
            this.startShadowAnimation(0);
            this.fadeInShadow();

            itemExtension = '';
            if(aMatches = imageUrl.match(/\.([a-zA-Z]{3,4})$/)){
                var itemExtension = aMatches[1].toLowerCase();
            }else if(aMatches = imageUrl.match(/\?sname=[^&]*\.([a-zA-Z]{3,4})&/)){
                var itemExtension = aMatches[1].toLowerCase();
            }
            var extension = typeof(this.oSkins[itemExtension]) != 'undefined' ? itemExtension : '__default';

            this.oMediaBox.className = 'MediaBox ' + this.oSkins[extension]['skin'];
            this.iImageWidthAddon = parseInt(this.oSkins[extension]['iWidthAddon']);
            this.iImageHeightAddon = this.iImageHeightAddonOriginal = parseInt(this.oSkins[extension]['iHeightAddon']);

            if(AMI.Browser.isIE || AMI.Browser.isIOS){
                this._iDocLeft = AMI.Browser.getDocumentLeft();
                this._iDocTop = AMI.Browser.getDocumentTop();
            }
            this._iWndWidth = AMI.Browser.getWindowWidth();
            this._iWndHeight = AMI.Browser.getWindowHeight();

            this.getGroupData(groupName, imageUrl);
            this.initSlider();
            this.updatePrevNext(false);
            this.loadImage(imageUrl, imageWidth, imageHeight, groupName, header, url, urlCaption, description);
        }
    },

    loadImage: function(imageUrl, imageWidth, imageHeight, groupName, header, url, urlCaption, description){
        var self = this;

        var bSWF = imageUrl.match(/\.swf$/i);

        this.setGroup(groupName);
        this.setHeader(header);
        this.setDescription(description);
        this.setURL(url, urlCaption);
        this.setZoom(false, [], false);
        this.setCounter(this.groupCurrentIndex + 1);

        if(imageWidth > 0 && imageHeight > 0){
            var ratio = this.getRatio(imageWidth, imageHeight, bSWF);
            imageWidth = Math.floor(imageWidth * ratio);
            imageHeight = Math.floor(imageHeight * ratio);

            this.positionBox(imageWidth + this.iImageWidthAddon, imageHeight + this.iImageHeightAddon);
        }

        if(!bSWF){
            this.sImageType = 'image';
            this.oLoader.style.display = 'block';
            this.oImage = new Image();
            this.oImage.className = 'MediaBox_image';
            this.oImage.onload = function(){self.displayImage();}
            if(this.aGroupImages.length > 1){
                this.oImage.onclick = function(evt){self.onImageClick(evt);}
            }
            this.oImage.src = imageUrl;
        }else{
            this.updatePrevNext();
            this.sImageType = 'FLASH';
            this.oLoader.style.display = 'none';
            this.oImageContainer.style.width = imageWidth + 'px';
            this.oImageContainer.style.height = imageHeight + 'px';

            this.showGroup();
            this.showHeader();
            this.showZoom();
            this.showDescription();
            this.showURL();
            this.showSlider();
            this.showCounter();

            this.oImageContainer.innerHTML = '<object type="application/x-shockwave-flash" data="' + imageUrl + '" width="' + imageWidth + '" height="' + imageHeight + '"><param name="movie" value="' + imageUrl + '"><param name="wmode" value="opaque"></object>';
        }
    },

    openFromObject: function(oElement){
        var image = oElement.getAttribute('data-ami-mbpopup') || '';
        var imageWidth = oElement.getAttribute('data-ami-mbpopup-width') || 0;
        var imageHeight = oElement.getAttribute('data-ami-mbpopup-height') || 0;
        var groupName = oElement.getAttribute('data-ami-mbgrp') || '';
        var header = oElement.getAttribute('data-ami-mbhdr') || '';
        var url = oElement.getAttribute('data-ami-mburl') || '';
        var urlCaption = oElement.getAttribute('data-ami-mburlcapt') || '';
        var description = oElement.getAttribute('data-ami-mbdescr') || '';

        if(AMI.Browser.isIE){
            if (navigator.appVersion.indexOf('MSIE 7.0') >= 0 ){
                if(!header){
                    header = '<span style="font-size:1px;">&nbsp;</span>';
                }
            }
        }

        if(image != ''){
            if(!image.match(/\.swf$/i)){
                imageWidth = 0;
                imageHeight = 0;
            }
            if(this.isOpening){
                this.loadImage(image, imageWidth, imageHeight, groupName, header, url, urlCaption, description);
            }else{
                this.open(image, imageWidth, imageHeight, groupName, header, url, urlCaption, description);
            }
        }
    },

    openByUrl: function(url){
        url = AMI.UI.MediaBox.PageImages.getImageLink(url);
        var aImages = AMI.find('img');
        for(var i = 0; i < aImages.length; i++){
            var popupImage = aImages[i].getAttribute('data-ami-mbpopup');
            if(popupImage != null && popupImage == url){
                this.openFromObject(aImages[i]);
                break;
            }
        }
    },

    openByIndex: function(index){
        if(index >= 0 && index < this.aGroupImages.length){
            this.groupCurrentIndex = index;
            this.openFromObject(this.aGroupImages[this.groupCurrentIndex]);
        }
    },

    closeOnEscape: function(e){
        if (!e) e = window.event; // fix IE
        if (e.keyCode) // IE
        {
            if (e.keyCode == "27") AMI.UI.MediaBox.close();
        }
        else if (e.charCode) // Netscape/Firefox/Opera
        {
            if (e.charCode == "27") AMI.UI.MediaBox.close();
        }
    },

    close: function(){
        if(!this.isClosing){
            this.isClosing = true;
            clearTimeout(this.hAnimateTimeout);

            if(this.oImage){
                this.oImage.onload = null;
                this.oImage = null;
            }
            this.oImageContainer.innerHTML = '';
            this.oMediaBox.style.display = 'none';

            this.startShadowAnimation(3)
            this.fadeOutShadow();
        }
    },

    previous: function(){
        this.openByIndex(this.groupCurrentIndex - 1);
    },

    next: function(){
        this.openByIndex(this.groupCurrentIndex + 1);
    },

    onImageClick: function(evt){
        var aPosition = AMI.Browser.getPointerPosition(evt);
        var aImagePosition = AMI.Browser.getObjectPosition(this.oImage);
        var clickX = aPosition[0] - aImagePosition[0] - AMI.Browser.getDocumentLeft();
        var median = this.oImage.offsetWidth / 2;
        if(clickX <= median){
            this.previous();
        }else{
            this.next();
        }
    },

    getGroupData: function(groupName, currentImageUrl){
        this.aGroupImages = [];
        this.groupCurrentIndex = 0;

        if(groupName != ''){
            var oRequest = {'groupName': groupName};
            var oResponse = {'aGroupImages': []};
            AMI.Message.send('ON_AMI_MEDIABOX_GET_GROUP', oRequest, oResponse);
            this.aGroupImages = oResponse.aGroupImages;
            for(var i = 0; i < this.aGroupImages.length; i++){
                if(this.aGroupImages[i].getAttribute('data-ami-mbpopup') == currentImageUrl){
                    this.groupCurrentIndex = i;
                    break;
                }
            }
        }
    },

    initSlider: function(){
        this.oSlider.innerHTML = '';
        this.oSlider.style.visibility = 'hidden';
        this.oSliderPrevious.style.visibility = 'hidden';
        this.oSliderNext.style.visibility = 'hidden';

        if(!this.bShowSlider || this.aGroupImages.length <= 1){
            this.oSlider.style.display = 'none';
            this.oSliderPrevious.style.display = 'none';
            this.oSliderNext.style.display = 'none';
            return;
        }else{
            this.oSlider.style.display = 'block';
            this.oSliderPrevious.style.display = 'block';
            this.oSliderNext.style.display = 'block';
        }

        var self = this;

        var oSliderContent = AMI.Browser.DOM.create('DIV', '', '', 'position: absolute', this.oSlider);
        for(var i = 0; i < this.aGroupImages.length; i++){
            if(i > 0){
                AMI.Browser.DOM.create('DIV', '', 'MediaBox_sliderDelimeter', '', oSliderContent).innerHTML = '&nbsp;';
            }
            var oSliderImage = AMI.Browser.DOM.create('IMG', '', 'MediaBox_sliderImage', '', oSliderContent);
            oSliderImage.src = this.aGroupImages[i].getAttribute('data-ami-mbpopup');
            AMI.Browser.Event.addHandler(oSliderImage, 'click', function(_this, _i){return function(){_this.openByIndex(_i)}}(this, i));
        }
        this.oSliderCtrl = new AMI.UI.Slider(this.oSlider, this.oSliderPrevious, this.oSliderNext, 50, true);
    },

    updatePrevNext: function(bForceValue){
        if(typeof(bForceValue) != 'undefined'){
            this.oPrevious.style.display = bForceValue ? 'block' : 'none';
            this.oNext.style.display = bForceValue ? 'block' : 'none';
        }else{
            this.oPrevious.style.display = this.aGroupImages.length > 1 && this.groupCurrentIndex > 0 ? 'block' : 'none';
            this.oNext.style.display = this.aGroupImages.length > 1 && this.groupCurrentIndex < this.aGroupImages.length - 1 ? 'block' : 'none';
        }
    },

    setGroup: function(groupName){
        if(!this.bShowGroupName){
            groupName = '';
        }else if(groupName != '' && !this.bShowGroupNameIfSingle){
            var oResponse = {result: 0};
            AMI.Message.send('ON_AMI_MEDIABOX_GROUPS_NUMBER', oResponse);
            if(oResponse.result <= 1){
                groupName = '';
            }
        }

        this.oGroup.style.display = groupName == '' ? 'none' : 'block';
        this.oGroup.style.visibility = 'hidden';
        this.oGroup.innerHTML = groupName;
    },

    showGroup: function(){
        if(this.oGroup.style.display == 'block'){
            this.oGroup.style.visibility = 'visible';
        }
    },

    setHeader: function(header){
        this.oHeader.style.display = header == '' ? 'none' : 'block';
        this.oHeader.style.visibility = 'hidden';
        this.oHeader.innerHTML = header;
    },

    showHeader: function(){
        if(this.oHeader.style.display == 'block'){
            this.oHeader.style.visibility = 'visible';
        }
    },

    setURL: function(url, urlCaption){
        this.oURL.style.display = url == '' ? 'none' : 'block';
        this.oURL.style.visibility = 'hidden';
        this.oURL.innerHTML = '<a href="' + url + '" target="_blank">' + (urlCaption != '' ? urlCaption : url) + '</a>';
    },

    showURL: function(){
        if(this.oURL.style.display == 'block'){
            this.oURL.style.visibility = 'visible';
        }
    },

    setDescription: function(description){
        this.oDescription.style.display = description == '' ? 'none' : 'block';
        this.oDescription.style.visibility = 'hidden';
        this.oDescription.innerHTML = description;
    },

    showDescription: function(){
        if(this.oDescription.style.display == 'block'){
            this.oDescription.style.visibility = 'visible';
        }
    },

    setZoom: function(bZoommed, aSizes, bShow){
        this.oImageZoom.style.display = bShow ? 'block' : 'none';
        this.oImageZoom.style.visibility = 'hidden';
        this.setZoomText(bZoommed, aSizes);
    },

    setZoomText: function(bZoommed, aSizes){
        var zoomText = bZoommed ? AMI.Template.Locale.get('mediaBoxZommed') : AMI.Template.Locale.get('mediaBoxNotZommed');
        zoomText = zoomText.replace('__width__', aSizes[0]).replace('__height__', aSizes[1]);
        this.oImageZoom.innerHTML = zoomText;
    },

    showZoom: function(){
        if(this.oImageZoom.style.display == 'block'){
            this.oImageZoom.style.visibility = 'visible';
        }
    },

    showSlider: function(){
        if(this.oSlider.style.display == 'block'){
            this.oSlider.style.visibility = 'visible';
            this.oSliderPrevious.style.visibility = 'visible';
            this.oSliderNext.style.visibility = 'visible';
            this.oSliderCtrl.reInit(this.oSlider.offsetWidth);
        }
    },

    setCounter: function(currentImage){
        this.oImageCounter.style.display = this.aGroupImages.length > 1 ? 'block' : 'none';
        this.oImageCounter.style.visibility = 'hidden';
        this.oImageCounter.innerHTML = AMI.Template.Locale.get('mediaBoxCounter').replace('__current__', currentImage).replace('__total__', this.aGroupImages.length);
    },

    showCounter: function(){
        if(this.oImageCounter.style.display == 'block'){
            this.oImageCounter.style.visibility = 'visible';
        }
    },

    getRatioIndex: function(iImageWidth, iImageHeight){
        var ratio = 1;
        if(iImageWidth > this._iWndWidth - this.iImageWidthAddon - 30 || iImageHeight > this._iWndHeight - this.iImageHeightAddon - 30){
            var ratioX = (this._iWndWidth - this.iImageWidthAddon - 30) / iImageWidth;
            var ratioY = (this._iWndHeight - this.iImageHeightAddon - 30) / iImageHeight;
            ratio = Math.min(ratioX, ratioY);
        }
        return ratio;
    },

    getRatio: function(imageWidth, imageHeight, bCorrectRation){
        if(typeof(bCorrectRation) == 'undefined'){
            bCorrectRation = true;
        }

        var ratio = this.getRatioIndex(imageWidth, imageHeight);
        if(!bCorrectRation){
            return ratio;
        }

        for(var i = 0; i < 10 /*max iterations*/; i++){
            var addon = 0;
            this.iImageHeightAddon = this.iImageHeightAddonOriginal;
            if(this.oGroup.style.display == 'block'){
                addon += this.getBlockHeight(this.oGroup, Math.floor(imageWidth * ratio));
            }
            if(this.oHeader.style.display == 'block'){
                addon += this.getBlockHeight(this.oHeader, Math.floor(imageWidth * ratio));
            }
            if(this.oImageZoom.style.display == 'block'){
                addon += this.getBlockHeight(this.oImageZoom, Math.floor(imageWidth * ratio));
            }
            if(this.oDescription.style.display == 'block'){
                addon += this.getBlockHeight(this.oDescription, Math.floor(imageWidth * ratio));
            }
            if(this.oURL.style.display == 'block'){
                addon += this.getBlockHeight(this.oURL, Math.floor(imageWidth * ratio));
            }
            if(this.oSlider.style.display == 'block'){
                addon += this.getBlockHeight(this.oSlider, Math.floor(imageWidth * ratio));
            }
            if(this.oImageCounter.style.display == 'block'){
                addon += this.getBlockHeight(this.oImageCounter, Math.floor(imageWidth * ratio));
            }
            if(addon == 0){
                break;
            }else{
                this.iImageHeightAddon += addon;
                newRatio = this.getRatioIndex(imageWidth, imageHeight);
                if(ratio == newRatio){
                    break;
                }else{
                    ratio = newRatio;
                }
            }
        }

        return ratio;
    },

    getBlockHeight: function(oBlock, width){
        var oClone = oBlock.cloneNode(true);
        oClone.style.position = 'static';
        oClone.style.display = 'block';
        oClone.style.visibility = 'visible';

        var oBlock = AMI.Browser.DOM.create('DIV', '', '', 'position: absolute; left: -10000px; top: -10000px; width: ' + (width + this.iImageWidthAddon) + 'px', document.body);
        oClone = oBlock.appendChild(oClone);
        var height = oBlock.offsetHeight;
        oBlock.parentNode.removeChild(oBlock);

        return height;
    },

    positionBox: function(width, height){
        var deltaX = this._iDocLeft;
        var deltaY = this._iDocTop;
        this.oMediaBox.style.width = width + 'px';
        this.oMediaBox.style.height = height + 'px';
        this.oMediaBox.style.left = Math.max(this._iDocLeft + 10, parseInt((this._iWndWidth - ( (width > 320) ? width : 320) ) / 2 + deltaX)) + 'px';
        this.oMediaBox.style.top = Math.max(this._iDocTop + 10, parseInt((this._iWndHeight - height) / 2 + deltaY)) + 'px';
        this.oMediaBox.style.display = 'block';
    },

    displayImage: function(){
        var iNumberOfAnimateIterations = 13;
        if(AMI.Browser.isIE || AMI.Browser.isIOS){
            var iNumberOfAnimateIterations = 3;
        }

        var ratio = this.getRatio(this.oImage.width, this.oImage.height);
        if(ratio < 1){
            this.setZoom(!this.bOpenEnlarged, [this.oImage.width, this.oImage.height], true);
            ratio = this.getRatio(this.oImage.width, this.oImage.height);
        }

        if(this.bOpenEnlarged && ratio < 1){
            this.iAnimateWidthTo = Math.min(this._iWndWidth - this.iImageWidthAddon, this.oImage.width + this.iImageWidthAddon + 16);
            this.iAnimateHeightTo = Math.min(this._iWndHeight - this.iImageHeightAddon, this.oImage.height + this.iImageHeightAddon + 16);
        }else{
            this.iAnimateWidthTo = Math.floor(this.oImage.width * ratio) + this.iImageWidthAddon;
            this.iAnimateHeightTo = Math.floor(this.oImage.height * ratio) + this.iImageHeightAddon;
        }

        if(ratio < 1){
            var iCalculatedWidth = Math.floor(this.oImage.width * ratio);
            var iCalculatedHeight = Math.floor(this.oImage.height * ratio);
            this.oImageZoom.onclick = function(_this, _iImageWidth, _iImageHeight, _iCalculatedWidth, _iCalculatedHeight){return function(){_this.resizeImage(_iImageWidth, _iImageHeight, _iCalculatedWidth, _iCalculatedHeight);return false;}}(this, this.oImage.width, this.oImage.height, iCalculatedWidth, iCalculatedHeight);
            if(this.bOpenEnlarged){
                this.oImage.setAttribute('bOriginalSize', '1');
                /*
                 this.oImage.style.width = this.oImage.style.width + 'px';
                 this.oImage.style.height = this.oImage.style.height + 'px';
                 */
                this.oImageContainer.style.width = this.iAnimateWidthTo - this.iImageWidthAddon + 'px';
                this.oImageContainer.style.height = this.iAnimateHeightTo - this.iImageHeightAddon + 'px';
                this.oImageContainer.style.overflow = 'auto';
            }else{
                this.oImage.setAttribute('bOriginalSize', '0');
                this.oImageContainer.style.overflow = 'hidden';
                this.oImageContainer.style.width = this.oImage.style.width = iCalculatedWidth + 'px';
                this.oImageContainer.style.height = this.oImage.style.height = iCalculatedHeight + 'px';
            }
        }else{
            this.oImageContainer.style.width = this.oImage.width + 'px';
            this.oImageContainer.style.height = this.oImage.height + 'px';
        }

        this.iAnimateStepX = Math.ceil((this.iAnimateWidthTo - parseInt(this.oMediaBox.style.width)) / iNumberOfAnimateIterations),
            this.iAnimateStepY = Math.ceil((this.iAnimateHeightTo - parseInt(this.oMediaBox.style.height)) / iNumberOfAnimateIterations),
            this.iAnimateStepTime = this.iImageAnimateTime / iNumberOfAnimateIterations;

        this.oLoader.style.display = 'none';
        this.oImageContainer.style.display = 'none';

        if(this.iAnimateStepX == 0 || this.iAnimateStepY == 0 || this.iAnimateStepTime == 0){
            this.positionBox(this.iAnimateWidthTo, this.iAnimateHeightTo);

            this.showGroup();
            this.showHeader();
            this.showZoom();
            this.showDescription();
            this.showURL();
            this.showSlider();
            this.showCounter();
            this.updatePrevNext();

            this.oImageContainer.innerHTML = '';
            this.oImageContainer.style.display = 'block';
            this.oImageContainer.appendChild(this.oImage);
            AMI.Browser.setOpacity(this.oImage, 0);
            this.iFadeInStep = 0;
            this.fadeIn();
        }else{
            this._iTimeAnimateStop = (new Date()).getTime() + this.iImageAnimateTime;
            this.animatePosition();
        }
    },

    animatePosition: function(){
        var bFinalStep = (new Date()).getTime() > this._iTimeAnimateStop;
        if(!bFinalStep){
            var width = parseInt(this.oMediaBox.style.width) + this.iAnimateStepX;
            var height = parseInt(this.oMediaBox.style.height) + this.iAnimateStepY;
            if(width >= this.iAnimateWidthTo || height >= this.iAnimateHeightTo){
                width = this.iAnimateWidthTo;
                height = this.iAnimateHeightTo;
                bFinalStep = true;
            }else{
                bFinalStep = false;
                this.positionBox(width, height);
            }
        }
        if(bFinalStep){
            this.positionBox(this.iAnimateWidthTo, this.iAnimateHeightTo);

            this.showGroup();
            this.showHeader();
            this.showZoom();
            this.showDescription();
            this.showURL();
            this.showSlider();
            this.showCounter();
            this.updatePrevNext();

            this.oImageContainer.innerHTML = '';
            this.oImageContainer.style.display = 'block';
            this.oImageContainer.appendChild(this.oImage);
            AMI.Browser.setOpacity(this.oImage, 0);
            this.iFadeInStep = 0;
            this.fadeIn();
        }else{
            var self = this;
            this.hAnimateTimeout = setTimeout(function(){self.animatePosition()}, this.iAnimateStepTime);
        }
    },

    fadeIn: function(){
        if(AMI.Browser.isIE || AMI.Browser.isIOS){
            this.iFadeInStep += 3;
        }else{
            this.iFadeInStep ++;
        }
        AMI.Browser.setOpacity(this.oImage, this.iFadeInStep / 10);
        if(this.iFadeInStep < 10){
            var self = this;
            this.hAnimateTimeout = setTimeout(function(){self.fadeIn()}, 12);
        }else{
            AMI.Browser.setOpacity(this.oImage, 1);
            this.isOpening = true;
        }
    },

    startShadowAnimation: function(iStartOpacity){
        this.iFadeAnimationStep = 0;
        AMI.Browser.setOpacity(this.oMediaShadow, iStartOpacity);
    },


    fadeInShadow: function(){
        AMI.Browser.setOpacity(this.oMediaShadow, ++this.iFadeAnimationStep / 10);
        if(this.iFadeAnimationStep < (AMI.Browser.isIE || AMI.Browser.isIOS ? 2 : 3)){
            var self = this;
            this.hAnimateTimeout = setTimeout(function(){self.fadeInShadow()}, 24);
        }
    },

    fadeOutShadow: function(){
        AMI.Browser.setOpacity(this.oMediaShadow, (3 - ++this.iFadeAnimationStep) / 10);
        if(this.iFadeAnimationStep < (AMI.Browser.isIE || AMI.Browser.isIOS ? 2 : 3)){
            var self = this;
            this.hAnimateTimeout = setTimeout(function(){self.fadeOutShadow()}, 24);
        }else{
            this.oMediaShadow.style.display = 'none';
            this.isOpening = false;
            this.isClosing = false;
        }
    },

    resizeImage :function(iImageWidth, iImageHeight, iCalculatedWidth, iCalculatedHeight){
        var bOriginalSize = this.oImage.getAttribute('bOriginalSize') == 1 ? 0 : 1;
        this.oImage.setAttribute('bOriginalSize', bOriginalSize);
        if(bOriginalSize == 0){
            this.oImage.style.width = iCalculatedWidth + 'px';
            this.oImage.style.height = iCalculatedHeight + 'px';

            var iWndWidth = Math.min(this._iWndWidth - this.iImageWidthAddon, iCalculatedWidth + this.iImageWidthAddon);
            var iWndHeight = Math.min(this._iWndHeight - this.iImageHeightAddonOriginal, iCalculatedHeight + this.iImageHeightAddon);
            this.positionBox(iWndWidth, iWndHeight);

            this.oImageContainer.style.width = iWndWidth - this.iImageWidthAddon + 'px';
            this.oImageContainer.style.height = iWndHeight - this.iImageHeightAddon + 'px';
            this.oImageContainer.style.overflow = 'hidden';

            this.setZoomText(true, [iImageWidth, iImageHeight]);
        }else{
            this.oImage.style.width = iImageWidth + 'px';
            this.oImage.style.height = iImageHeight + 'px';

            var iWndWidth = Math.min(this._iWndWidth - this.iImageWidthAddon, iImageWidth + this.iImageWidthAddon + 16);
            var iWndHeight = Math.min(this._iWndHeight - this.iImageHeightAddonOriginal, iImageHeight + this.iImageHeightAddon + 16);
            this.positionBox(iWndWidth, iWndHeight);

            this.oImageContainer.style.width = iWndWidth - this.iImageWidthAddon + 'px';
            this.oImageContainer.style.height = iWndHeight - this.iImageHeightAddon + 'px';
            this.oImageContainer.style.overflow = 'auto';

            this.setZoomText(false, [iImageWidth, iImageHeight]);
        }
    }
}

AMI.UI.MediaBox.addSkin('MediaBoxBlack', ['swf'], 0, 0);


/*
 * FILE END: _shared/code/js/ami.ui.mediabox.js
 */

/*
 * FILE START: _shared/code/js/ami.ui.overimage.js
 */

AMI.UI.OverImage = {
    oBlock: null,
    hTimeout: null,

    onOver: function(evt){
        this.stopWaiting();
        var oTarget = AMI.Browser.Event.getTarget(evt);
        if(oTarget != null && oTarget.tagName && oTarget.tagName == 'IMG'){
            imageLink = oTarget.getAttribute('data-ami-mbover');
            if(imageLink != null && imageLink != ''){
                if(this.oBlock == null){
                    this.oBlock = AMI.Browser.DOM.create('DIV', '', 'amiOverImage', 'position: absolute', document.body);
                }
                this.oBlock.style.display = 'none';

                this.hTimeout = setTimeout(
                    function(_this, _oTarget, _imageLink){return function(){
                        var oImage = new Image();
                        oImage.onload = function(__this, __oTarget){return function(){__this.showBlock(__oTarget)}}(_this, _oTarget);
                        oImage.src = _imageLink;
                        _this.oBlock.innerHTML = '';
                        _this.oBlock.appendChild(oImage);
                    }}(this, oTarget, imageLink),
                    700
                );
            }
        }
    },

    onOut: function(evt){
        this.stopWaiting();
        var oTarget = AMI.Browser.Event.getTarget(evt);
        if(oTarget != null && oTarget.tagName && oTarget.tagName == 'IMG'){
            imageLink = oTarget.getAttribute('data-ami-mbover');
            if(this.oBlock != null && imageLink != null && imageLink != ''){
                this.oBlock.style.display = 'none';
            }
        }
    },

    stopWaiting: function(evt){
        clearTimeout(this.hTimeout);
    },

    showBlock: function(oParent){
        var aPosition = AMI.Browser.getObjectPosition(oParent);
        this.oBlock.style.display = 'block';
        this.oBlock.style.left = (aPosition[0] + oParent.offsetWidth) + 'px';
        this.oBlock.style.top = aPosition[1] + 'px';
    }
}


/*
 * FILE END: _shared/code/js/ami.ui.overimage.js
 */

/*
 * FILE START: _shared/code/js/ami.ui.suggestion.js
 */

AMI.UI.Suggestion = function (fieldId, aRequestData, itemsSplitter){
    this.aRequestData = aRequestData || {};

    this.minimumFieldTextLength = 3; // Minimum length of text in parent field when suggestion should be shown
    this.fillRowsTimeout = 500; // Time between last key up and new rows load
    this.maxNameLength = 65; // Maximum length befor ... in dropdown list

    this.fieldId = fieldId;
    this.fieldObject = null;
    this.suggestionId = fieldId + '_suggestion';
    this.suggestionObject = null;
    this.suggestionObjectShown = false;
    this.suggestionIframeObject = null;
    this.allowProcessing = true;
    this.showCauseOfArrows = false;

    this.rowObjects = [];
    this.currentRow = -1;
    this.fillTimeout = null;

    this.itemsSplitter = typeof(itemsSplitter) != 'undefined' ? itemsSplitter : '';
    this.lastFieldValueLength = 0;
    this.doStoreFieldValue = true;
    this.isFieldValueModified = false;
    this.storedFieldValue = '';
    this.fieldLeadingSpaces = '';
    this.itemInitialCaretPosition = 0;
    this.itemEndCaretPosition = 0;

    this.scriptName = 'ami_resp';
    this.scriptExt = 'php';

    // Initialize: Attach class events to text field and other actions
    this.init = function(){
        this.fieldObject = document.getElementById(this.fieldId);
        this.storedFieldValue = this.fieldObject.value;
        this.lastFieldValueLength = this.storedFieldValue.length;

        AMI.Browser.Event.addHandler(this.fieldObject, 'mousedown', function(currentObject){return function(currentEvent){currentObject.onFieldMouseDown(currentEvent)}}(this));
        AMI.Browser.Event.addHandler(this.fieldObject, 'keydown', function(currentObject){return function(currentEvent){currentObject.onFieldKeyDown(currentEvent)}}(this));
        AMI.Browser.Event.addHandler(this.fieldObject, 'keyup', function(currentObject){return function(currentEvent){currentObject.onFieldKeyUp(currentEvent)}}(this));
        AMI.Browser.Event.addHandler(this.fieldObject, 'blur', function(currentObject){return function(currentEvent){currentObject.onFieldBlur(currentEvent)}}(this));
        AMI.Browser.Event.addHandler(this.fieldObject, 'focus', function(currentObject){return function(currentEvent){currentObject.showCauseOfArrows = true; currentObject.startShowObject(true)}}(this));
    }

    this.setDebug = function(aReceived){
        if(DEBUG_BY_IP && typeof(aReceived.debug) != 'undefined'){
            var oDebugBlock = document.getElementById('amid');
            if(oDebugBlock != null){
                oDebugBlock.innerHTML = oDebugBlock.innerHTML + aReceived.debug;
            }
        }
    }

    //
    // Event handlers
    //

    this.onFieldMouseDown = function(currentEvent){
        if((this.showCauseOfArrows || this.allowProcessing) && this.suggestionObjectShown && this.itemsSplitter != ''){
            this.hideSuggestionObject();
        }

        return true;
    }

    // Key down is used for arrow and escape processing
    this.onFieldKeyDown = function(currentEvent){
        currentEvent = AMI.Browser.Event.validate(currentEvent);
        if(currentEvent.keyCode == 38 || currentEvent.keyCode == 40){
            AMI.Browser.Event.stopProcessing(currentEvent);
        }

        if(!this.allowProcessing && !this.showCauseOfArrows){
            return true;
        }

        if(this.suggestionObjectShown){
            if(currentEvent.keyCode == 38 || currentEvent.keyCode == 40){
                if(this.doStoreFieldValue){
                    this.storedFieldValue = this.fieldObject.value;
                    this.doStoreFieldValue = false;
                }
                var rowIndex = this.currentRow + (currentEvent.keyCode == 40 ? 1 : -1);
                if(rowIndex > this.rowObjects.length - 1){
                    rowIndex = -1;
                }else if(rowIndex < -1){
                    rowIndex = this.rowObjects.length - 1;
                }
                this.selectRow(rowIndex, true);
            }else if(currentEvent.keyCode == 27){
                this.resetFieldText();
                this.closeSuggestionObject();
                AMI.Browser.setCaretPosition(this.fieldObject, this.itemInitialCaretPosition);
                AMI.Browser.Event.stopProcessing(currentEvent);
            }else if(currentEvent.keyCode == 13){
                var bSubmit = true;
                if(this.currentRow >= 0 && typeof(this.rowObjects[this.currentRow]) != 'undefined'){
                    if(this.rowObjects[this.currentRow].getAttribute('rowType') == 'result'){
                        var resultURL = this.rowObjects[this.currentRow].getAttribute('rowValue');
                        if(resultURL != ''){
                            document.location = resultURL;
                            bSubmit = false;
                        }
                    }
                }
                this.doStoreFieldValue = true;
                this.hideSuggestionObject();
                AMI.Browser.setCaretPosition(this.fieldObject, this.itemEndCaretPosition);
                AMI.Browser.Event.stopProcessing(currentEvent);
                if(bSubmit){
                    this.submitForm();
                }
            }else if(this.itemsSplitter != '' && (currentEvent.keyCode == 35 || currentEvent.keyCode == 36 || currentEvent.keyCode == 37 || currentEvent.keyCode == 39)){
                this.hideSuggestionObject();
            }
        }

        return true;
    }

    // Key up shows/hides suggestion object when user typing
    this.onFieldKeyUp = function(currentEvent){

        currentEvent = AMI.Browser.Event.validate(currentEvent);

        var doInitActionsCauseOfArrows = false;
        if(!this.showCauseOfArrows){
            this.showCauseOfArrows = (!this.suggestionObjectShown && (currentEvent.keyCode == 38 || currentEvent.keyCode == 40));
            doInitActionsCauseOfArrows = this.showCauseOfArrows;
        }

        if(!this.allowProcessing && !this.showCauseOfArrows){
            return true;
        }

        if(currentEvent.keyCode == 27 || currentEvent.keyCode == 13){
            return false;
        }

        this.startShowObject(doInitActionsCauseOfArrows);

        return true;
    }

    this.startShowObject = function(doInitActionsCauseOfArrows){
        if(this.lastFieldValueLength != this.fieldObject.value.length){
            this.doStoreFieldValue = true;
            this.lastFieldValueLength = this.fieldObject.value.length;
        }else if(!doInitActionsCauseOfArrows){
            return false;
        }

        var currentItem = this.getEditedItemText();
        if(currentItem.length >= this.minimumFieldTextLength){
            this.itemInitialCaretPosition = AMI.Browser.getCaretPosition(this.fieldObject);

            // Create content div
            if(this.suggestionObject == null){
                this.createSuggestionObject();
            }

            // Fill rows
            clearTimeout(this.fillTimeout);
            if(doInitActionsCauseOfArrows){
                this.fillRows();
            }else{
                this.fillTimeout = setTimeout(function(currentObject){return function(){currentObject.fillRows()}}(this), this.fillRowsTimeout);
            }
        }else{
            this.hideSuggestionObject();
        }
    }

    this.doNotCloseOnBlur = false;

    // Hide suggestion object upon blur
    this.onFieldBlur = function(currentEvent){
        if(this.doNotCloseOnBlur){
            this.doNotCloseOnBlur = false;
            return true;
        }

        if(!this.allowProcessing && !this.showCauseOfArrows){
            return true;
        }

        this.hideSuggestionObject();
        return true;
    }

    this.onSuggestionObjectClick = function(currentEvent){
        currentEvent = AMI.Browser.Event.validate(currentEvent);
        var currentTarget = AMI.Browser.Event.getTarget(currentEvent);
        if(currentTarget.tagName){
            if(currentTarget.tagName == 'A' && currentTarget.className == 'suggestionClose'){
                this.resetFieldText();
                this.closeSuggestionObject();
                AMI.Browser.setCaretPosition(this.fieldObject, this.itemInitialCaretPosition);
                AMI.Browser.Event.stopProcessing(currentEvent);
            }else if(currentTarget.tagName == 'A'){
                this.fieldObject.focus();
                this.doNotCloseOnBlur = true;
            }else if(currentTarget.tagName == 'DIV'){
                if(currentTarget.className.indexOf('suggestionRow') == 0){
                    currentIndex = currentTarget.getAttribute('rowIndex');
                    this.selectRow(currentIndex, true);
                    this.hideSuggestionObject();
                    this.submitForm();
                }
            }
        }
        return true;
    }

    //
    // Create / show / hide object functions
    //

    this.createSuggestionObject = function(){
        contentDiv = document.createElement('div');
        contentDiv.id = this.suggestionId;
        contentDiv.className = 'suggestionDiv';

        var fieldPosition = AMI.Browser.getObjectPosition(this.fieldObject);
        contentDiv.style.left = fieldPosition[0] + 'px';
        contentDiv.style.top = fieldPosition[1] + this.fieldObject.offsetHeight + 'px';
        contentDiv.style.height = '12px';

        contentDiv.onmousedown = function(currentObject){return function(currentEvent){currentObject.onSuggestionObjectClick(currentEvent)}}(this);

        this.suggestionObject = document.body.appendChild(contentDiv);
    }

    this.showSuggestionObject = function(bHasHistory, bHasResults){
        this.suggestionObject.style.height = ((this.rowObjects.length - (!bHasHistory ? 1 : 0)) * 15 + (bHasResults ? 42 : 2)) + 'px';

        if(!this.suggestionObjectShown && this.suggestionObject != null){
            this.selectRow(-1, false);

            var fieldPosition = AMI.Browser.getObjectPosition(this.fieldObject);
            contentDiv.style.left = fieldPosition[0] + 'px';
            this.suggestionObject.style.display = 'block';

            var iScreenLeft = AMI.Browser.getDocumentLeft();
            var iScreenRight = AMI.Browser.getWindowWidth() + iScreenLeft - 2;
            var iRightPoint = fieldPosition[0] + this.suggestionObject.offsetWidth;
            if(iRightPoint > iScreenRight){
                contentDiv.style.left = fieldPosition[0] - (iRightPoint - iScreenRight) + 'px';
            }

            this.suggestionObjectShown = true;
        }
    }

    this.hideSuggestionObject = function(){
        this.showCauseOfArrows = false;
        clearTimeout(this.fillTimeout);
        if(this.suggestionObjectShown && this.suggestionObject != null){
            this.suggestionObject.style.display = 'none';
            this.suggestionObjectShown = false;
        }
    }

    this.closeSuggestionObject = function(){
        this.allowProcessing = false;
        this.hideSuggestionObject();
    }

    //
    // Manage data in object
    //

    this.fillRows = function(){
        var url = document.location.protocol + '//' + document.location.host + '/' + this.scriptName + '.' + this.scriptExt + '?';

        var cnt = 0;
        this.aRequestData['phrase'] = this.getEditedItemText();
        for(var name in this.aRequestData){
            url = url + (cnt++ > 0 ? '&' : '') + encodeURIComponent(name) + '=' + encodeURIComponent(this.aRequestData[name]);
        }

        AMI.HTTPRequest.getContent(
            'GET',
            url,
            '',
            function(_this){
                return function(state, content){
                    _this.fillRowsCallback(state, content)
                }
            }(this)
        );
    }

    this.fillRowsCallback = function(state, content){
        if(state == 1){
            this.currentRow = -1;
            this.rowObjects = [];
            this.suggestionObject.innerHTML = '';
            var fieldText = this.getEditedItemText();
            var bHasHistory = false;
            var bHasResults = false;

            if(content.length){
                var aReceived = {};

                if(content.indexOf('{') != 0){
                    aReceived.debug = 'Unknown data received for block ' + this.idContainer + ': ' + content;
                    this.setDebug(aReceived);
                    return;
                }

                aReceived = AMI.String.decodeJSON(content);
                var bResultInserted = false;
                if(typeof(aReceived) == 'object' && typeof(aReceived.data) != 'undefined'){

                    this.setDebug(aReceived);

                    for(var i = 0; i < aReceived.data.list.length; i++){
                        if(typeof(aReceived.data.list[i].query) != 'undefined'){
                            var name = this.trimText(aReceived.data.list[i].query);
                            var itemValue = name;
                            var itemType = 'suggestion';
                            var bExact = aReceived.data.list[i].query == fieldText;
                            bHasHistory = true;
                        }else{
                            name = '<a href="' + aReceived.data.list[i].link + '" title="' + document.location.protocol + '//' + document.location.host + '/' + aReceived.data.list[i].link.replace('"', '&quot;') + '">' + this.trimText(aReceived.data.list[i].name) + '</a>';
                            itemValue = aReceived.data.list[i].link;
                            itemType = 'result'
                            bExact = false;
                            bHasResults = true;
                        }

                        if(itemType == 'result' && !bResultInserted){
                            bResultInserted = true;
                            var oResultsDiv = AMI.Browser.DOM.create('div', '', 'suggestionResult' + (i == 0 ? 'First' : ''), '', this.suggestionObject);
                            oResultsDiv.innerHTML = 'Результаты поиска:';
                        }

                        this.appendRow(name, itemValue, itemType, bExact);

                        if(itemType == 'result' && i == aReceived.data.list.length - 1){
                            this.appendResultsRow();
                        }
                    }
                }
            }

            if(bHasHistory || bHasResults){
                var minWidthDiv = AMI.Browser.DOM.create('div', '', 'suggestionMinWidth', '', this.suggestionObject);
                minWidthDiv.style.width = this.fieldObject.offsetWidth - 3 + 'px';

                this.showSuggestionObject(bHasHistory, bHasResults);
            }else{
                this.hideSuggestionObject();
            }
        }
    }

    this.trimText = function(data){
        if(data.length > this.maxNameLength){
            data = data.substr(0, this.maxNameLength) + '...';
        }
        return data;
    }

    this.appendRow = function(itemText, itemValue, itemType, isExact){
        var currentIndex = this.rowObjects.length;
        this.rowObjects[currentIndex] = AMI.Browser.DOM.create('div', this.fieldId + '_suggestionItem_' + currentIndex, 'suggestionRow' + (isExact ? ' suggestionRowExact' : ''), '', this.suggestionObject);
        this.rowObjects[currentIndex].innerHTML = itemText;
        this.rowObjects[currentIndex].setAttribute('rowIndex', currentIndex);
        this.rowObjects[currentIndex].setAttribute('rowValue', itemValue);
        this.rowObjects[currentIndex].setAttribute('rowType', itemType);
        this.rowObjects[currentIndex].setAttribute('rowExact', isExact ? '1' : '0');
        this.rowObjects[currentIndex].onmouseover = function(currentObject, divIndex){return function(){currentObject.selectRow(divIndex, false)}}(this, currentIndex);
    }

    this.appendResultsRow = function(){
        var currentIndex = this.rowObjects.length;
        this.rowObjects[currentIndex] = AMI.Browser.DOM.create('div', this.fieldId + '_suggestionItem_' + currentIndex, 'suggestionRow suggestionRowAllResults', '', this.suggestionObject);
        this.rowObjects[currentIndex].setAttribute('rowIndex', currentIndex);
        this.rowObjects[currentIndex].setAttribute('rowValue', '');
        this.rowObjects[currentIndex].setAttribute('rowType', 'resultAll');
        this.rowObjects[currentIndex].setAttribute('rowExact', '0');
        this.rowObjects[currentIndex].onmouseover = function(currentObject, divIndex){return function(){currentObject.selectRow(divIndex, false)}}(this, currentIndex);

        var oResultsOthersLink = AMI.Browser.DOM.create('a', '', 'suggestionAllResults', '', this.rowObjects[currentIndex]);
        oResultsOthersLink.href = 'javascript:void(0)';
        oResultsOthersLink.innerHTML = 'Все результаты &raquo;';
        oResultsOthersLink.onclick = function(_this){return function(){_this.submitForm()}}(this);
    }

    this.selectRow = function(rowIndex, setRowText){
        if(this.currentRow >= 0){
            this.rowObjects[this.currentRow].className = 'suggestionRow' + (this.rowObjects[this.currentRow].getAttribute('rowExact') == '1' ? ' suggestionRowExact' : '') + (this.rowObjects[this.currentRow].getAttribute('rowType') == 'resultAll' ? ' suggestionRowAllResults' : '');
        }
        if(rowIndex != null && rowIndex >= 0){
            this.rowObjects[rowIndex].className = 'suggestionRowSelected' + (this.rowObjects[rowIndex].getAttribute('rowExact') == '1' ? ' suggestionRowExact' : '') + (this.rowObjects[rowIndex].getAttribute('rowType') == 'resultAll' ? ' suggestionRowAllResults' : '');
        }

        if(setRowText){
            if(rowIndex != null && rowIndex >= 0){
                var rowType = this.rowObjects[rowIndex].getAttribute('rowType');
                if(rowType == 'suggestion'){
                    this.setItemText(this.rowObjects[rowIndex].getAttribute('rowValue'));
                    this.lastFieldValueLength = this.fieldObject.value.length;
                    this.isFieldValueModified = true;
                }else{
                    this.resetFieldText();
                }
            }else{
                this.resetFieldText();
            }
        }

        this.currentRow = rowIndex;
    }

    this.resetFieldText = function(){
        if(this.isFieldValueModified){
            var caretPosition = AMI.Browser.getCaretPosition(this.fieldObject);
            this.fieldObject.value = this.storedFieldValue;
            AMI.Browser.setCaretPosition(this.fieldObject, caretPosition);
            this.lastFieldValueLength = this.fieldObject.value.length;
        }
    }

    this.getEditedItemText = function(){
        var itemText = '';
        if(this.itemsSplitter != ''){
            var splitterLength = this.itemsSplitter.length;
            var caretPosition = AMI.Browser.getCaretPosition(this.fieldObject);
            var items = this.fieldObject.value.split(this.itemsSplitter);
            var currentLength = 0;
            for(var i = 0; i < items.length; i++){
                currentLength += items[i].length + (i > 0 ? splitterLength : 0);
                if(currentLength >= caretPosition){
                    itemText = items[i];
                    break;
                }
            }
        }else{
            itemText = this.fieldObject.value;
        }

        itemText = itemText.replace(/^( *)(.*) *$/, function(currentObject){return function(wholeString, spaces, content){
            currentObject.fieldLeadingSpaces = spaces;
            return content;
        }}(this));
        return itemText;
    }

    this.setItemText = function(textValue){
        if(this.itemsSplitter != ''){
            var splitterLength = this.itemsSplitter.length;
            var caretPosition = AMI.Browser.getCaretPosition(this.fieldObject);
            var items = this.fieldObject.value.split(this.itemsSplitter);
            var currentLength = 0;
            var isReplaced = false;
            var result = '';
            for(var i = 0; i < items.length; i++){
                currentLength += items[i].length + (i > 0 ? splitterLength : 0);
                var itemValue = items[i];
                if(!isReplaced && currentLength >= caretPosition){
                    itemValue = this.fieldLeadingSpaces + AMI.String.decodeHTMLSpecialChars(textValue);
                    isReplaced = true;
                    this.itemEndCaretPosition = currentLength + itemValue.length - items[i].length;
                }
                result += (result != '' ? this.itemsSplitter : '') + itemValue;
            }
            this.fieldObject.value = result;
            AMI.Browser.setCaretPosition(this.fieldObject, caretPosition);
        }else{
            this.fieldObject.value = this.fieldLeadingSpaces + AMI.String.decodeHTMLSpecialChars(textValue);
            this.itemEndCaretPosition = this.fieldObject.value.length;
        }
    }

    this.submitForm = function(){
        if(this.fieldObject != null && typeof(this.fieldObject.form) != 'undefined'){
            this.fieldObject.form.submit();
        }
    }

    // Do initializing
    this.init();
}

/*
 * FILE END: _shared/code/js/ami.ui.suggestion.js
 */

/*
 * FILE START: _shared/code/js/ami.ui.multiselect.js
 */

AMI.UI.Multiselect = function(idField, iWidth, iRowHeight){
    this.oField = document.getElementById(idField);
    this.oControl = null;

    this.lastOptionNumber = -1;
    this.lastOptionSelected = true;
    this.bAllowMoveSelection = false;
    this.hMoveSelectionStop = null;

    this.init = function(){
        if(this.oField != null){
            var width = iWidth || this.oField.offsetWidth;
            var height = this.oField.offsetHeight;
            var rowHeight = 18 || iRowHeight;
            var numRows = this.oField.getAttribute('size');
            if(numRows != null && numRows > 0){
                height = rowHeight * numRows;
            }

            this.oControl = AMI.Browser.DOM.create(
                'DIV',
                '',
                'mSelectFrame',
                'width: ' + width + 'px; height: ' + height + 'px;'
            );
            this.oControl = this.oField.parentNode.insertBefore(this.oControl, this.oField);
            if(typeof(this.oControl.onselectstart) != 'undefined'){
                this.oControl.onselectstart = function(){ return false; };
            }
            if(typeof(this.oControl.style.MozUserSelect) != 'undefined'){
                this.oControl.style.MozUserSelect = 'none';
            }
            this.oField.style.display = 'none';

            for(i = 0; i < this.oField.options.length; i++){
                var oOption = AMI.Browser.DOM.create(
                    'DIV',
                    '',
                    'mSelectOption' + (this.oField.options[i].selected ? 'Selected' : ''),
                    'height: ' + rowHeight + 'px; line-height: ' + rowHeight + 'px;',
                    this.oControl
                );
                oOption.innerHTML = this.oField.options[i].text;
                oOption.setAttribute('optionNumber', i);
                oOption.setAttribute('optionValue', this.oField.options[i].value);
                oOption.onmousedown = function(_this){ return function(evt){_this.selectOption(evt, this)} }(this);
                oOption.onmouseup = function(_this){ return function(){_this.selectOptionStop(true)} }(this);
                oOption.onmouseover = function(_this){ return function(evt){_this.selectOptionOnMove(evt, this)} }(this);
                oOption.onmouseout = function(_this){ return function(){_this.selectOptionStop(false)} }(this);
            }
        }
    };

    this.selectOption = function(evt, oOption){
        var bSelected = oOption.className == 'mSelectOptionSelected';
        var optionNumber = oOption.getAttribute('optionNumber');

        evt = AMI.Browser.Event.validate(evt);

        if(evt.shiftKey && this.lastOptionNumber >= 0 && this.lastOptionNumber != optionNumber){
            var iStartIndex = Math.min(optionNumber, this.lastOptionNumber);
            var iEndIndex = Math.max(optionNumber, this.lastOptionNumber);
            aOptions = this.oControl.getElementsByTagName('DIV');
            for(var i = 0; i < aOptions.length; i++){
                var iIntervalOptionNumber = aOptions[i].getAttribute('optionNumber');
                if(iIntervalOptionNumber != null && iIntervalOptionNumber >= iStartIndex && iIntervalOptionNumber <= iEndIndex){
                    this.doSelectOption(aOptions[i], iIntervalOptionNumber, this.lastOptionSelected);
                }
            }
        }else{
            this.doSelectOption(oOption, optionNumber, !bSelected);
        }

        if(this.lastOptionNumber == -1 || !evt.shiftKey){
            this.lastOptionNumber = optionNumber;
            this.lastOptionSelected = this.oField.options[optionNumber].selected;
        }

        this.bAllowMoveSelection = true;
    }

    this.selectOptionOnMove = function(evt, oOption){
        if(this.bAllowMoveSelection){
            clearTimeout(this.hMoveSelectionStop);
            var optionNumber = oOption.getAttribute('optionNumber');
            this.doSelectOption(oOption, optionNumber, this.lastOptionSelected);
        }
    }

    this.selectOptionStop = function(bImmediate){
        if(bImmediate){
            clearTimeout(this.hMoveSelectionStop);
            this.bAllowMoveSelection = false;
        }else{
            this.hMoveSelectionStop = setTimeout(function(_this){ return function(){_this.bAllowMoveSelection = false;} }(this), 10);
        }

    }

    this.doSelectOption = function(oOption, optionNumber, bSelect){
        if(bSelect){
            oOption.className = 'mSelectOptionSelected';
            this.oField.options[optionNumber].selected = true;
        }else{
            oOption.className = 'mSelectOption';
            this.oField.options[optionNumber].selected = false;
        }
    }

    this.init();
}

/*
 * FILE END: _shared/code/js/ami.ui.multiselect.js
 */

/*
 * FILE START: _shared/code/js/ami.ui.tooltip.js
 */

AMI.UI.ToolTip = function(evt, text, minWidth, maxWidth){
    this.oOwner = AMI.Browser.Event.getTarget(AMI.Browser.Event.validate(evt));
    this.text = text;
    this.oToolTip = null;

    this.bMovable = false;

    this.show = function(evt){
        if(this.oOwner != null){
            if(this.oOwner.getAttribute('isToolTipInstalled') != '1'){
                AMI.Browser.Event.addHandler(
                    this.oOwner,
                    'mouseout',
                    function(_this){return function(){_this.hide()}}(this)
                );
                AMI.Browser.Event.addHandler(
                    this.oOwner,
                    'mousemove',
                    function(_this){return function(evt){_this.move(evt)}}(this)
                );
                this.oOwner.setAttribute('isToolTipInstalled', '1');
            }
            var oPosition = this.getPosition(evt);
            this.oToolTip = AMI.Browser.DOM.create(
                'DIV',
                '',
                'AMIToolTip',
                'left: ' + oPosition[0] + 'px; top: ' + oPosition[1] + 'px;',
                document.body
            );

            minWidth = 0 || minWidth;
            maxWidth = 0 || maxWidth;
            if(minWidth > 0 && maxWidth > 0 && minWidth == maxWidth){
                this.oToolTip.style.width = minWidth + 'px';
            }else{
                if(minWidth > 0){
                    this.oToolTip.style.minWidth = minWidth + 'px';
                }
                if(maxWidth > 0){
                    this.oToolTip.style.maxWidth = maxWidth + 'px';
                }
            }

            this.oToolTip.innerHTML = this.text;
            this.oToolTip.style.display = 'block';
            this.correctPosition();
            this.bMovable = true;
        }
    }

    this.getPosition = function(evt){
        var oPointer = AMI.Browser.getPointerPosition(evt);
        return [parseInt(oPointer[0]) + 11, parseInt(oPointer[1]) + 16];
    }

    this.correctPosition = function(){
        var iLeft = parseInt(this.oToolTip.style.left) + this.oToolTip.offsetWidth;
        var iMinRight = document.body.scrollLeft;
        var iMaxRight = iMinRight + AMI.Browser.getWindowWidth();
        if(iLeft > iMaxRight){
            iLeft = Math.max(iMinRight, iMaxRight - this.oToolTip.offsetWidth);
            this.oToolTip.style.left = iLeft + 'px';
        }
    }

    this.move = function(evt){
        if(this.bMovable){
            var oPosition = this.getPosition(evt);
            this.oToolTip.style.left = oPosition[0] + 'px';
            this.oToolTip.style.top = oPosition[1] + 'px';
            this.correctPosition();
        }
    }

    this.hide = function(){
        if(this.oToolTip && this.oToolTip.parentNode){
            this.oToolTip.parentNode.removeChild(this.oToolTip);
            this.oToolTip.style.display = 'none';
            this.bMovable = false;
            this.oOwner.setAttribute('isToolTipInstalled', '');
        }
    }

    this.show(evt);
}

/*
 * FILE END: _shared/code/js/ami.ui.tooltip.js
 */

/*
 * FILE START: _shared/code/js/ami.ui.showblock.js
 */

AMI.UI.showBlock = function(idLink, idBlock, shownClassName, mReplacement){

    this.oLink = AMI.find('#' + idLink);
    this.oBlock = AMI.find('#' + idBlock);
    this.blockHiddenHeight = 0;
    this.blockFullHeight = 0;
    this.hiddenClassName = this.oLink != null ? this.oLink.className : '';
    this.shownClassName = shownClassName;
    this.replacement = mReplacement || null;
    this.originalLinkContent = this.oLink.innerHTML;

    this.hAnimation = null;
    this.aAnimationInterval = 10;
    this.animationIteration = 0;
    this.currentHeight = 0;
    this.destinationHeight = 0;

    this.init = function(){
        this.blockHiddenHeight = this.oBlock.offsetHeight;
        AMI.Browser.Event.addHandler(this.oLink, 'click', function(_this){return function(evt){_this.onLinkClick(evt); return false;}}(this));
    }

    this.onLinkClick = function(evt){
        clearTimeout(this.hAnimation);
        AMI.Browser.Event.stopProcessing(evt);
        var currentState = this.oBlock.getAttribute('data-showblock-state');
        if(currentState == 'shown'){
            if(this.shownClassName != null){
                this.oLink.className = this.hiddenClassName;
            }
            if(this.replacement != null){
                this.oLink.innerHTML = this.originalLinkContent;
            }
            this.oBlock.setAttribute('data-showblock-state', 'hidden');

            if(this.oBlock.offsetHeight > this.blockHiddenHeight){
                this.startAnimation(this.blockHiddenHeight);
            }
        }else{
            if(this.shownClassName != null){
                this.oLink.className = this.shownClassName;
            }
            if(this.replacement != null){
                this.oLink.innerHTML = typeof(this.replacement) == 'object' ? this.replacement.innerHTML : this.replacement;
            }
            this.oBlock.setAttribute('data-showblock-state', 'shown');

            this.blockFullHeight = this.oBlock.scrollHeight;
            if(this.blockFullHeight > this.blockHiddenHeight){
                this.startAnimation(this.blockFullHeight);
            }
        }
    }

    this.startAnimation = function(destinationHeight){
        this.animationIteration = 0;
        this.currentHeight = this.oBlock.offsetHeight;
        this.destinationHeight = destinationHeight;
        this.move();
    }

    this.move = function(){
        this.animationIteration ++;
        var difference = Math.abs(this.currentHeight - this.destinationHeight);

        var step = 1;
        if(difference < 50){
            step = Math.max(1, difference / 3);
        }else{
            step = Math.min(step + this.animationIteration, 20);
        }

        if(this.currentHeight < this.destinationHeight){
            this.currentHeight += step;
            this.currentHeight = Math.min(this.currentHeight, this.destinationHeight);
        }else if(this.currentHeight > this.destinationHeight){
            step *= -1;
            this.currentHeight += step;
            this.currentHeight = Math.max(this.currentHeight, this.destinationHeight);
        }else{
            step = 0;
        }

        this.oBlock.style.height = this.currentHeight + 'px';

        if(step != 0){
            this.hAnimation = setTimeout(
                function(_this){return function(){_this.move(); return false;}}(this),
                this.aAnimationInterval
            );
        }
    }

    this.init();
}

/*
 * FILE END: _shared/code/js/ami.ui.showblock.js
 */

/*
 * FILE START: _shared/code/js/ami.ui.effects.js
 */

/**
 * @fileOverview File contains AMI.UI.Effects static object required to animate UI elements and AMI.UI.AnimatedObject
 */

/**
 * Static object that manages UI visual effects
 *
 * @class Static object for UI visual effects.
 */
AMI.UI.Effects = {

    /**
     * Smoothly displays an obect, from invisible to visible
     *
     * @param {HTMLElement} oObj Object to manipulate
     * @param {int} time Time interval of the effect
     * @param {function} callback A callback function
     * @returns {void}
     */
    fadeIn: function(oObj, time, callback){
        var delay = 50;
        if(oObj.style.visibility != 'visible'){
            oObj.style.visibility = 'visible';
            AMI.Browser.setOpacity(oObj, 0);
        }
        if(time==null){
            var time = 500;
        }
        if(time > 0){
            time -= delay;
            var opacity = AMI.Browser.DOM.getStyle(oObj, 'opacity');
            var newOpacity = parseFloat(opacity) + (1 - parseFloat(opacity)) / (time / delay);
            AMI.Browser.setOpacity(oObj, newOpacity);

            oObj.style.opacity = parseFloat(oObj.style.opacity) + (1 - parseFloat(oObj.style.opacity)) / (time / delay);
            window.setTimeout(function(_oObj, _time, _callback){return function(){AMI.UI.Effects.fadeIn(_oObj, _time, _callback)}}(oObj, time, callback), delay);
        }else{
            //Callback
            if(typeof(callback) == 'function'){
                callback(oObj);
            }
        }
    },

    /**
     * Smoothly hides an obect, from visible to invisible
     *
     * @param {HTMLElement} oObj Object to manipulate
     * @param {int} time Time interval of the effect
     * @param {function} callback A callback function
     * @returns {void}
     */
    fadeOut: function(oObj, time, callback){
        var delay = 50;
        if(time==null){
            var time = 500;
        }
        if(time > 0){
            time -= delay;
            var opacity = AMI.Browser.DOM.getStyle(oObj, 'opacity');
            var newOpacity = parseFloat(opacity) - ( parseFloat(opacity) / (time / delay) );
            AMI.Browser.setOpacity(oObj, newOpacity);
            window.setTimeout(function(_oObj, _time, _callback){return function(){AMI.UI.Effects.fadeOut(_oObj, _time, _callback)}}(oObj, time, callback), delay);
        }else{
            AMI.Browser.setOpacity(oObj, 1);
            oObj.style.visibility = 'hidden';

            //Callback
            if(typeof(callback) == 'function'){
                callback(oObj);
            }
        }
    },

    /**
     * Move or resize element from start point to end point within specified time
     *
     * @param {HTMLElement} oObj Object to move
     * @param {object} oStart Start point {'top':int, 'left':int, 'height':int, 'width':int}
     * @param {object} oEnd End point {'top':int, 'left':int, 'height':int, 'width':int}
     * @param {int} interval Time interval in mseconds
     * @param {function} callback A callback function
     * @returns {void}
     */
    animate: function(oObj, oStart, oEnd, interval, callback){
        var endTime = new Date().getTime() + interval;
        AMI.UI.Effects._move(oObj, oStart, oEnd, endTime, 0, callback);
    },

    /**
     * Move or resize element from start point to end point within specified time
     *
     * @param {HTMLElement} oObj Object to move
     * @param {object} oStart Start point {'top':int, 'left':int, 'height':int, 'width':int}
     * @param {object} oEnd End point {'top':int, 'left':int, 'height':int, 'width':int}
     * @param {int} endTime Sheduled time to finish the animation task (ms)
     * @param {int} lastTime Last time this was called
     * @param {function} callback A callback function
     * @returns {void}
     * @private
     */
    _move: function(oObj, oStart, oEnd, endTime, lastTime, callback){

        var curTime = new Date().getTime();

        // Extract start point
        var startTop    = (typeof(oStart.top) != 'undefined')   ? Math.round(oStart.top)    : null;
        var startLeft   = (typeof(oStart.left) != 'undefined')  ? Math.round(oStart.left)   : null;
        var startHeight = (typeof(oStart.height) != 'undefined')? Math.round(oStart.height) : null;
        var startWidth  = (typeof(oStart.width) != 'undefined') ? Math.round(oStart.width)  : null;

        // Extract end point
        var endTop      = (typeof(oEnd.top) != 'undefined')     ? Math.round(oEnd.top)      : null;
        var endLeft     = (typeof(oEnd.left) != 'undefined')    ? Math.round(oEnd.left)     : null;
        var endHeight   = (typeof(oEnd.height) != 'undefined')  ? Math.round(oEnd.height)   : null;
        var endWidth    = (typeof(oEnd.width) != 'undefined')   ? Math.round(oEnd.width)    : null;

        var interval = ((endTime - curTime) > 0) ? endTime - curTime : 0;
        var diffTime = (lastTime && (lastTime < curTime)) ? interval / (curTime - lastTime) : interval;

        if (diffTime < 1) diffTime = 1;

        if(interval){

            // Next point
            var oNewStart = {};

            this._moveLeft(oObj, startLeft, endLeft, diffTime, oStart, oNewStart);
            this._moveTop(oObj, startTop, endTop, diffTime, oStart, oNewStart);
            this._resizeHeight(oObj, startHeight, endHeight, diffTime, oStart, oNewStart);
            this._resizeWidth(oObj, startWidth, endWidth, diffTime, oStart, oNewStart);

            // Wait 1 ms and repeat from next point
            window.setTimeout(
                function(_oObj, _oStart, _oEnd, _endTime, _lastTime, _callback){
                    return function(){
                        AMI.UI.Effects._move(_oObj, _oStart, _oEnd, _endTime, _lastTime, _callback);
                    }
                }(oObj, oNewStart, oEnd, endTime, curTime, callback),
                1
            );
        }else{
            // Set final object state
            if((startLeft != null) && (endLeft != null)){
                oObj.style.left = endLeft + 'px';
            }
            if((startTop != null) && (endTop != null)){
                oObj.style.top = endTop + 'px';
            }
            if((startHeight != null) && (endHeight != null)){
                oObj.style.height = endHeight + 'px';
            }
            if((startWidth != null) && (endWidth != null)){
                oObj.style.width = endWidth + 'px';
            }
            //Callback
            if(typeof(callback) == 'function'){
                callback(oObj);
            }
        }
    },

    /**
     * Move object by X axis (one step)
     *
     * @param {HTMLElement} oObj Object to move
     * @param {int} startLeft Left start point
     * @param {int} endLeft Left end point
     * @param {int} diffTime Time interval to move
     * @param {object} oStart Initial start point
     * @param {object} oNewStart New start point
     * @returns {void}
     */
    _moveLeft: function(oObj, startLeft, endLeft, diffTime, oStart, oNewStart){
        if((startLeft != null) && (endLeft != null)){
            var diffLeft = endLeft - startLeft;
            var stepLeft = diffLeft / diffTime;
            oNewStart.left = oStart.left + stepLeft;
            oObj.style.left = oNewStart.left + 'px';
        }
    },

    /**
     * Move object by Y axis (one step)
     *
     * @param {HTMLElement} oObj Object to move
     * @param {int} startTop Top start point
     * @param {int} endTop Top end point
     * @param {int} diffTime Time interval to move
     * @param {object} oStart Initial start point
     * @param {object} oNewStart New start point
     * @returns {void}
     */
    _moveTop: function(oObj, startTop, endTop, diffTime, oStart, oNewStart){
        if((startTop != null) && (endTop != null)){
            var diffTop = endTop - startTop;
            var stepTop = diffTop / diffTime;
            oNewStart.top = oStart.top + stepTop;
            oObj.style.top = oNewStart.top + 'px';
        }
    },

    /**
     * Resize object's height (one step)
     *
     * @param {HTMLElement} oObj Object to move
     * @param {int} startHeight Initial value of object's height
     * @param {int} endHeight Final value of object's height
     * @param {int} diffTime Time interval to move
     * @param {object} oStart Initial start point
     * @param {object} oNewStart New start point
     * @returns {void}
     */
    _resizeHeight: function(oObj, startHeight, endHeight, diffTime, oStart, oNewStart){
        if((startHeight != null) && (endHeight != null)){
            var diffHeight = endHeight - startHeight;
            var stepHeight = diffHeight / diffTime;
            oNewStart.height = oStart.height + stepHeight;
            oObj.style.height = oNewStart.height + 'px';
        }
    },

    /**
     * Resize object's width (one step)
     *
     * @param {HTMLElement} oObj Object to move
     * @param {int} startWidth Initial value of object's width
     * @param {int} endWidth Final value of object's width
     * @param {int} diffTime Time interval to move
     * @param {object} oStart Initial start point
     * @param {object} oNewStart New start point
     * @returns {void}
     */
    _resizeWidth: function(oObj, startWidth, endWidth, diffTime, oStart, oNewStart){
        if((startWidth != null) && (endWidth != null)){
            var diffWidth = endWidth - startWidth;
            var stepWidth = diffWidth / diffTime;
            oNewStart.width = oStart.width + stepWidth;
            oObj.style.width = oNewStart.width + 'px';
        }
    }
}

/**
 * Adds animation methods for an object
 *
 *
 */
AMI.UI.AnimatedObject = function(oNode){
    /**
     * Animation queue
     */
    oNode._amiQueue = [];

    /**
     * Callback to call after animation is finished
     */
    oNode._amiCallback = null;

    /**
     * Adds "move" action to a queue
     */
    oNode.move = function(oStart, oEnd, duration, callback){
        this._amiQueue.push({
            action:  'move',
            start:    oStart,
            end:      oEnd,
            duration: duration,
            callback: callback
        });
        return this;
    };

    /**
     * Adds "wait" action to a queue
     */
    oNode.wait = function(duration, callback){
        this._amiQueue.push({
            action:  'wait',
            duration: duration,
            callback: callback
        });
        return this;
    };

    /**
     * Adds "fadeIn" action to a queue
     */
    oNode.fadeIn = function(duration, callback){
        this._amiQueue.push({
            action:  'fadein',
            duration: duration,
            callback: callback
        });
        return this;
    };

    /**
     * Adds "fadeOut" action to a queue
     */
    oNode.fadeOut = function(duration, callback){
        this._amiQueue.push({
            action:  'fadeout',
            duration: duration,
            callback: callback
        });
        return this;
    };

    /**
     * Starts animation process
     */
    oNode.startAnimation = function(){

        // Perform animation
        if(this._amiQueue.length){
            var ani = this._amiQueue.shift();

            // Set a callback function if specified
            if(typeof(ani.callback) == 'function'){
                this._amiCallback = ani.callback;
            }

            switch(ani.action){
                case 'move':
                    AMI.UI.Effects.animate(this, ani.start, ani.end, ani.duration, function(oObj){
                        if(typeof(oObj._amiCallback) == 'function'){
                            oObj._amiCallback();
                        }
                        oObj.startAnimation();
                    });
                    break;
                case 'wait':
                    setTimeout(function(oObj){
                        return function(){
                            if(typeof(oObj._amiCallback) == 'function'){
                                oObj._amiCallback();
                            }
                        }
                    }(this), ani.duration);
                    break;
                case 'fadein':
                    AMI.UI.Effects.fadeIn(this, ani.duration, function(oObj){
                        if(typeof(oObj._amiCallback) == 'function'){
                            oObj._amiCallback();
                        }
                        oObj.startAnimation();
                    });
                    break;
                case 'fadeout':
                    AMI.UI.Effects.fadeOut(this, ani.duration, function(oObj){
                        if(typeof(oObj._amiCallback) == 'function'){
                            oObj._amiCallback();
                        }
                        oObj.startAnimation();
                    });
                    break;
            }
        }
    }

    return oNode;
}

/*
 * FILE END: _shared/code/js/ami.ui.effects.js
 */

/*
 * FILE START: _shared/code/js/ami.ui.dnd.js
 */

AMI.UI.DnD = {
    initialMouseX: undefined,
    initialMouseY: undefined,
    startX: undefined,
    startY: undefined,
    draggedObject: undefined,
    movedObjects: {},

    initElement: function (windowEl, draggableEl) {
        AMI.UI.DnD.movedObjects[draggableEl.id] = windowEl.id;
        draggableEl.onmousedown = AMI.UI.DnD.startDragMouse;
    },

    startDragMouse: function (e) {
        AMI.UI.DnD.startDrag(this);
        var evt = e || window.event;
        AMI.UI.DnD.initialMouseX = evt.clientX;
        AMI.UI.DnD.initialMouseY = evt.clientY;
        AMI.Browser.Event.addHandler(document,'mousemove',AMI.UI.DnD.dragMouse);
        AMI.Browser.Event.addHandler(document,'mouseup',AMI.UI.DnD.releaseElement);
        AMI.Browser.Event.addHandler(AMI.UI.DnD.draggedObject,'click',AMI.UI.DnD.removeClass);
        return false;
    },

    startDrag: function (obj) {
        if(AMI.UI.DnD.draggedObject){
            AMI.UI.DnD.releaseElement();
        }
        var dragArea = AMI.find('#' + AMI.UI.DnD.movedObjects[obj.id]);

        if(AMI.Browser.isIE || AMI.Browser.isOpera){
            AMI.UI.DnD.startX = typeof(dragArea.style.left) != 'undefined' ? parseInt(dragArea.style.left) : 0;
            AMI.UI.DnD.startY = typeof(dragArea.style.top) != 'undefined' ? parseInt(dragArea.style.top) : 0;
        }else{
            AMI.UI.DnD.startX = dragArea.offsetLeft;
            AMI.UI.DnD.startY = dragArea.offsetTop;
        }
        AMI.UI.DnD.draggedObject = obj;
        AMI.addClass(obj, 'dragged');
    },

    dragMouse: function (e) {
        var evt = e || window.event;
        var dX = evt.clientX - AMI.UI.DnD.initialMouseX;
        var dY = evt.clientY - AMI.UI.DnD.initialMouseY;
        AMI.UI.DnD.setPosition(dX,dY);
        return false;
    },

    setPosition: function (dx,dy) {
        dragArea = AMI.find('#' + AMI.UI.DnD.movedObjects[AMI.UI.DnD.draggedObject.id]);
        dragArea.style.left = parseInt(parseInt(AMI.UI.DnD.startX) + dx) + 'px';
        dragArea.style.top = parseInt(parseInt(AMI.UI.DnD.startY) + dy) + 'px';
    },

    releaseElement: function() {
        AMI.Browser.Event.removeHandler(document,'mousemove',AMI.UI.DnD.dragMouse);
        AMI.Browser.Event.removeHandler(document,'mouseup',AMI.UI.DnD.releaseElement);
        AMI.removeClass(AMI.UI.DnD.draggedObject, 'dragged');
    },

    removeClass: function(e){
        if(typeof(e.target) != 'undefined'){
            var el = e.target;
            if((typeof(el.tagName) != 'undefined') && (el.tagName == 'A')){
                return;
            }
        }
        AMI.Browser.Event.stopProcessing(e);
        AMI.UI.DnD.draggedObject = null;
    }
}


/*
 * FILE END: _shared/code/js/ami.ui.dnd.js
 */

/*
 * FILE START: _shared/code/js/ami.ui.popups.js
 */

/**
 * Popup Manager
 */
AMI.UI.PopupManager = {
    popupCount: 0,
    nextId: 1,
    popups: {},

    add: function(id, obj){
        this.popups[id] = obj;
        this.popupCount++;
        this.nextId++;
    },

    del: function(id){
        this.popups[id] = null;
        this.popupCount--;
    },

    show: function(id){
        this.popups[id].up();
    },

    findParentPopup: function(obj){
        while(obj = obj.parentNode){
            if(obj.popupId != undefined){
                return this.popups[obj.popupId];
            }
        }
        return false;
    }
};

/**
 * content:     [object/string] object to wrap or a text string,
 * params:
 * {
 *      id:                 [string] popup id
 *      width:              [int] popup width
 *      height:             [int] popup height
 *      autoHeight:         [bool]
 *      header:             [string] header string
 *      modal:              [bool] modal or not
 *      disableLayerClick:  [bool] do not close modal window on layer click (default = false)
 *      hasCloseBtn:        [bool] has close button in header or not
 *      movable:            [bool] can be moved by dragging header
 *      dragBy:             [string] header/body
 *      autoshow:           [bool] show on init
 *      autocenter:         [bool] center popup automatically
 *      position:           [string] position: 'fixed', 'absolute'
 *      animated:           [bool] is animated
 *      animation:          [object] {open: none/fadein/resize, close: none/fadeout/resize}
 *      openFrom:           [object] {x: x-position, y: y-position} Start coordinates of opening animation
 *      closeTo:            [object] {x: x-position, y: y-position} End coordinates of closing animation
 *      showAt:             [object] {x: x-position, y: y-position} Coordinates of open popup
 *      onInit:             [function] onInit callback
 *      onShow:             [function] onShow callback
 *      onClose:            [function] ocClose callback
 *      className:          [string] popup window class name, defaul - amiPopup
 *      zIndex:             [int] Exact z-index value of popup window
 * }
 */
AMI.UI.Popup = function(content, params){

    this.params = params;

    this.ieCompat = false;
    if(AMI.Browser.isIE){
        this.ieCompat = (document.documentMode) ? document.documentMode : (document.compatMode && document.compatMode=="CSS1Compat") ? 7 : 5;
    }

    /**
     * Constructor.
     */
    this.init = function(){
        this.popupId = (this.params.id != undefined) ? this.params.id : 'ami_popup_' + AMI.UI.PopupManager.nextId;
        this.content.popupId = this.popupId;
        this.layer = null;
        this.originParent = null;
        this.originNextSibling = null;
        this.popupContent = null;
        this.header = null;
        this.object = null;
        this.className = (this.params.className != undefined) ? params.className : 'amiPopup';
        this.hasCloseBtn = (this.params.hasCloseBtn != undefined) ? this.params.hasCloseBtn : true;
        this.openAnimation = ((this.params.animation != undefined) && (this.params.animation.open != undefined)) ? this.params.animation.open : 'resize';
        this.closeAnimation = ((this.params.animation != undefined) && (this.params.animation.close != undefined)) ? this.params.animation.close : 'resize';
        this.dragBy = (this.params.dragBy != undefined) ? this.params.dragBy : 'header';

        this.params.position = (typeof(this.params.position) != 'undefined') ? this.params.position : 'fixed';
        this.params.autocenter = (typeof(this.params.autocenter) != 'undefined') ? this.params.autocenter : true;

        this.disableLayerClick = (this.params.disableLayerClick != undefined) ? params.disableLayerClick : false;

        var clientWidth = AMI.Browser.getWindowWidth();
        var clientHeight = AMI.Browser.getWindowHeight();

        this.params.width = (this.params.width != undefined) ? this.params.width : 500;
        this.params.height = (this.params.height != undefined) ? this.params.height : 500;

        this.params.autoHeight = (this.params.autoHeight != undefined) ? this.params.autoHeight : false;

        this.params.width = Math.min(this.params.width, clientWidth - 40);
        this.params.height = Math.min(this.params.height, clientHeight - 40);

        this.positionX = Math.max(0, Math.round((clientWidth - this.params.width) / 2));
        this.positionY = Math.max(0, Math.round((clientHeight - this.params.height) / 2));

        var oTarget = AMI.Browser.Event.getTarget(AMI.Browser.Event.globalEvent);
        this.openX = Math.round(AMI.Browser.getWindowWidth()/2);
        this.openY = Math.round(AMI.Browser.getWindowHeight()/2);
        if(oTarget && !AMI.Browser.isOpera){
            var coords = AMI.Browser.getObjectPosition(oTarget);
            if(AMI.UI.PopupManager.findParentPopup(oTarget)){
                // link in a popup
                this.openX = coords[0];
                this.openY = coords[1];
            }else{
                // link on a document body
                this.openX = coords[0] - AMI.Browser.getDocumentLeft();
                this.openY = coords[1] - AMI.Browser.getDocumentTop();
            }
        }
        this.closeX = this.openX;
        this.closeY = this.openY;

        if(this.params.openFrom != undefined){
            this.openX = this.params.openFrom.x;
            this.openY = this.params.openFrom.y;
        }
        if(this.params.closeTo != undefined){
            this.closeX = this.params.closeTo.x;
            this.closeY = this.params.closeTo.y;
        }
        if(this.params.showAt != undefined){
            this.positionX = this.params.showAt.x;
            this.positionY = this.params.showAt.y;
        }

        this.zIndex = (typeof(this.params.zIndex) != 'undefined') ? this.params.zIndex : 100000;

        AMI.UI.PopupManager.add(this.popupId, this);

        if((this.params.modal == undefined) || this.params.modal){
            this._createLayer();
        }
        this._createWindow();
        this.placeContent();

        // Set margin-box box sizing for popup, header and content
        var boxSizing = 'border-box';
        this.content.style.boxSizing = boxSizing;
        this.content.style.MozBoxSizing = boxSizing;
        this.content.style.webkitBoxSizing = boxSizing;
        this.header.style.boxSizing = boxSizing;
        this.header.style.MozBoxSizing = boxSizing;
        this.header.style.webkitBoxSizing = boxSizing;

        var boxSizing = 'content-box';
        this.object.style.boxSizing = boxSizing;
        this.object.style.MozBoxSizing = boxSizing;
        this.object.style.webkitBoxSizing = boxSizing;

        // onInit callback
        if(typeof(params.onInit) == 'function'){
            params.onInit(this);
        }

        // Auto show
        if((typeof(params.autoShow) == 'undefined') || params.autoShow){
            this.show();
        }
    };

    /**
     * Display popup.
     */
    this.show = function(){
        if (this.layer) this.layer.style.display = 'block';
        this.object.style.left = parseInt(this.openX) + 'px';
        this.object.style.top = parseInt(this.openY) + 'px';
        this.object.style.display = 'block';
        this.object.style.position = (this.ieCompat == 5) ? 'absolute' : this.params.position;
        if((this.params.animated == undefined) || this.params.animated){
            switch(this.openAnimation){
                case 'resize':
                    this._openResize();
                    break;
                case 'fadein':
                    this._openFadein();
                    break;
                default:
                    this._openNone();
                    break;
            }
        }else{
            this._openNone();
        }
    };

    /**
     * Place popup content into popup window.
     */
    this.placeContent = function(){

        if(this.origin){
            this.originParent = (this.origin.parentNode != undefined) ? this.origin.parentNode : null;
            this.originNextSibling = (this.origin.nextSibling != undefined) ? this.origin.nextSibling : null;
            this.originParent.removeChild(this.origin);
        }
        this.popupContent.appendChild(this.content);
        var headerH = this.header.offsetHeight;
        this.params.width = Math.max(this.params.width, this.content.offsetWidth);
        this.params.height = Math.max(this.params.height, this.content.offsetHeight + headerH);

        if(this.params.autocenter){
            AMI.UI.center(this.object);
        }
        if(this.ieCompat == 5){
            this.object.style.top = (parseInt(this.object.style.top) + AMI.Browser.getDocumentTop(window)) + 'px';
        }
    };

    /**
     * Set popup size according to its content.
     */
    this.autosize = function(allowShrink){

        var popupHeight = parseInt(this.object.style.height);
        if(this.ieCompat == 5){
            this.contentHeight = this.content.offsetHeight + (this.content.offsetTop * 2);
            this.object.style.height = this.contentHeight + this.header.offsetHeight + 'px';
        }else{
            var doResize = ((allowShrink == undefined) || !allowShrink) ?
                (this.content.offsetHeight > (popupHeight - this.header.offsetHeight)) :
                (this.content.offsetHeight != (popupHeight - this.header.offsetHeight));
            if(doResize){
                this.resize({
                    height: this.content.offsetHeight + this.header.offsetHeight
                });
            }
        }
    }

    /**
     * Resizes popup
     *
     * @param {Object} newSize {height: int, width: int}
     */
    this.resize = function(newSize){
        if(typeof(newSize['height']) != 'undefined'){
            this.object.style.height = parseInt(newSize['height']) + 'px';
            if((typeof(this.params.movable) != 'undefined') && !this.params.movable){
                if(this.params.autocenter){
                    AMI.UI.centerH(this.object);
                }
                this.object.style.top = (parseInt(this.object.style.top) + AMI.Browser.getDocumentTop(window)) + 'px';
            }
        }
        if(typeof(newSize['width']) != 'undefined'){
            this.object.style.width = parseInt(newSize['width']) + 'px';
            if((typeof(this.params.movable) != 'undefined') && !this.params.movable){
                if(this.params.autocenter){
                    AMI.UI.centerW(this.object);
                }
            }
        }
    }

    /**
     * Close the popup.
     */
    this.close = function(){
        if(this.resizeTimer != undefined){
            clearInterval(this.resizeTimer);
        }
        AMI.UI.PopupManager.del(this.popupId);
        if(this.layer && this.layer.parentNode){
            this.layer.parentNode.removeChild(this.layer);
        }
        this.content.popupId = null;
        this.content.style.display = 'none';
        /*if(this.content.parentNode){
         this.content.parentNode.removeChild(this.content);
         }*/

        if((this.params.animated == undefined) || this.params.animated){
            switch(this.closeAnimation){
                case 'resize':
                    this._closeResize();
                    break;
                case 'fadeout':
                    this._closeFadeout();
                    break;
                default:
                    this._closeNone();
                    break;
            }
        }else{
            this._closeNone();
        }
    };

    /**
     * Set content of the popup as raw HTML.
     */
    this.setHTML = function(html){
        this.content.innerHTML = html;
    }

    /**
     * --------------------------------------------------
     *                 Private methods
     * --------------------------------------------------
     */

    /**
     * Open popup with no animation.
     */
    this._openNone = function(){
        this.object.style.left = parseInt(this.positionX) + 'px';
        this.object.style.top = parseInt(this.positionY) + 'px';
        this.object.style.width = this.params.width + 'px';
        this.object.style.height = this.params.autoHeight ? 'auto' : (this.params.height + 'px');
        this.content.style.display = 'block';
        this.object.style.display = 'block';
        this.object.style.visibility = 'visible';

        if(((this.params.height == undefined)||(this.params.width == undefined))||(this.content.offsetHeight > this.params.height)){
            this.autosize();
        }

        AMI.Browser.Event.addHandler(this.content, 'click', function(_this){return function(e){_this.autosize();}}(this));

        // Correct popup top in IE compatibility mode 5
        if(this.ieCompat == 5){
            this.object.style.top = (parseInt(this.object.style.top) + AMI.Browser.getDocumentTop(window)) + 'px';
        }

        // Fix for alerts
        if(this.ieCompat == 5){
            var contentHeight = this.content.offsetHeight + (this.content.offsetTop * 2);
            this.object.style.height = contentHeight + this.header.offsetHeight + 'px';
        }

        // Close popup by layer click
        if(this.layer && !this.disableLayerClick){
            AMI.Browser.Event.addHandler(this.layer, 'click', function(popup){return function(){popup.close();}}(this));
        }
        if(typeof(this.params.onShow) == 'function'){
            this.params.onShow(this);
        }
    },

        /**
         * Open popup with resize animation.
         */
        this._openResize = function(){

            // Do not use effects in compatibility mode
            if(this.ieCompat == 5){
                this._openNone();
                return;
            }

            AMI.UI.Effects.animate(
                this.object,
                {   // initial state
                    left:   this.openX,
                    top:    this.openY,
                    width:  0,
                    height: 0
                },
                {   // final state
                    left:   this.positionX,
                    top:    this.positionY,
                    width:  this.params.width,
                    height: this.params.autoHeight ? 'auto' : this.params.height
                },
                300, // Open in 300 ms.
                function(popup){
                    return function(){
                        popup._openNone();
                    }
                }(this)
            );
        },

        /**
         * Open popup with fade in animation.
         */
        this._openFadein = function(){

            // Do not use effects in compatibility mode
            if(this.ieCompat == 5){
                this._openNone();
                return;
            }

            this.object.style.left = parseInt(this.positionX) + 'px';
            this.object.style.top = parseInt(this.positionY) + 'px';
            this.object.style.width = this.params.width + 'px';
            this.object.style.height = this.params.autoHeight ? 'auto' : (this.params.height + 'px');

            this.object.style.visibility = 'hidden';
            this.object.style.display = 'block';
            if(((this.params.height == undefined)||(this.params.width == undefined))||(this.content.offsetHeight > this.params.height)){
                this.autosize();
            }
            this.content.style.display = 'block';
            AMI.UI.Effects.fadeIn(
                this.object,
                600,
                function(popup){
                    return function(){
                        popup._openNone();
                    }
                }(this)
            );
        },

        /**
         * Close popup with no animation.
         */
        this._closeNone = function(){
            if(this.object.parentNode){
                this.object.parentNode.removeChild(this.object);
            }
            if(this.origin){
                this.originParent.appendChild(this.origin);
            }
            if(typeof(this.params.onClose) == 'function'){
                this.params.onClose(this);
            }
        },

        /**
         * Close popup with resize animation.
         */
        this._closeResize = function(){

            // Do not use effects in compatibility mode
            if(this.ieCompat == 5){
                this._closeNone();
                return;
            }

            AMI.UI.Effects.animate(
                this.object,
                {   // initial state
                    left:   parseInt(this.object.style.left),
                    top:    parseInt(this.object.style.top),
                    width:  this.object.offsetWidth,
                    height: this.object.offsetHeight
                },
                {   // final state
                    left:   this.closeX,
                    top:    this.closeY,
                    width:  0,
                    height: 0
                },
                300, // Open in 300 ms.
                function(popup){
                    return function(){
                        popup._closeNone();
                    }
                }(this)
            );
        },

        /**
         * Close popup with fadeout effect.
         */
        this._closeFadeout = function(){

            // Do not use effects in compatibility mode
            if(this.ieCompat == 5){
                this._closeNone();
                return;
            }

            AMI.UI.Effects.fadeOut(
                this.object,
                500,
                function(popup){
                    return function(){
                        popup._closeNone();
                    }
                }(this)
            );
        },

        this._createLayer = function(){
            var layer = document.createElement('DIV');
            layer.className = 'popupWindowShadow';
            layer.id = this.popupId + '_layer';
            layer.style.zIndex = this.zIndex;
            layer.style.display = 'none';
            if(this.ieCompat == 5){
                layer.style.position = 'absolute';
                layer.style.height = AMI.Browser.getDocumentHeight(window) + 'px';
            }
            document.body.appendChild(layer);
            this.layer = layer;
        }

    this._createWindow = function(){
        // Create popup layout
        var popup = document.createElement('DIV');
        popup.id = this.popupId;
        popup.style.width = 0;
        popup.style.height = 0;
        popup.className = this.className;
        popup.style.display = 'none';
        popup.style.zIndex = this.zIndex + 1;

        var popupHeader = document.createElement('DIV');
        popupHeader.id = this.popupId + '_header';
        popupHeader.className = 'popupHeader';
        popup.appendChild(popupHeader);

        var popupHeaderText = document.createElement('DIV');
        popupHeaderText.className = 'popupHeaderText';
        popupHeaderText.innerHTML = (this.params.header != undefined) ? this.params.header : '&nbsp;';
        popupHeader.appendChild(popupHeaderText);
        if(this.hasCloseBtn){
            var popupClose = document.createElement('DIV');
            popupClose.className = 'popupClose';
            AMI.Browser.Event.addHandler(popupClose,'click', function(popup){return function(){popup.close();}}(this)); // Close by click
            popupHeader.appendChild(popupClose);
        }

        var popupContent = document.createElement('DIV');
        popupContent.className = 'popupContent';
        popup.appendChild(popupContent);

        document.body.appendChild(popup);

        // Increase window z-index if not a modal window
        AMI.Browser.Event.addHandler(popupHeader,'mousedown', function(popup){
            return function(){
                popup.up();
            }
        }(this));

        // Initialize drag'n'drop: move popup by dragging header
        if((this.params.movable == undefined) || this.params.movable){
            AMI.UI.DnD.initElement(popup, (this.dragBy == 'header') ? popupHeader : popup);
        }

        this.header = popupHeader;
        this.popupContent = popupContent;
        this.object = popup;
    }

    this.up = function(){
        if((typeof(this.params.modal) != "undefined") && !this.params.modal){
            var maxZIndex = AMI.Browser.DOM.getMaxZIndex();
            if(maxZIndex > (this.zIndex + 1)){
                this.zIndex = AMI.Browser.DOM.getMaxZIndex() + 10;
                this.object.style.zIndex = this.zIndex + 1;
            }
        }
    }

    if(typeof(content) == 'object'){
        if(content.popupId != undefined){
            AMI.UI.PopupManager.show(content.popupId);
            return;
        }
        this.origin = content;
        this.content = content; //  .cloneNode(true); <- many bad things happen
        this.origin.style.display = 'none';
    }else{
        if((params.id != undefined) && (AMI.UI.PopupManager.popups[params.id] != undefined)){
            AMI.UI.PopupManager.show(params.id);
            return;
        }
        this.origin = null;
        this.content = document.createElement('DIV');
        this.setHTML(content);
    }

    this.init();
}

/**
 * Closes any pupup window found up by the DOM tree.
 */
function closePopup(){
    obj = AMI.Browser.Event.getTarget(AMI.Browser.Event.globalEvent);
    if(popup = AMI.UI.PopupManager.findParentPopup(obj)){
        popup.close();
    }
}

/*
 * FILE END: _shared/code/js/ami.ui.popups.js
 */

/*
 * FILE START: _shared/code/js/ami.ui.alert.js
 */

AMI.UI.Alert = {

    states: ['status_normal', 'status_notice', 'status_error'],
    defaultState: 'status_notice',
    modalStates: ['status_error'],
    alertWindow: null,
    isModal: false,
    alertDivId: 'status_message',
    alertPopupId: 'status_message_popup',

    hide: function(popup){
        return function(){
            popup.close();
        }
    },

    show: function(message, type){
        var obj = AMI.find('#' + this.alertDivId);
        if (!obj){
            if(type == undefined){
                type = this.defaultState;
            }
            obj = AMI.Browser.DOM.create('DIV', this.alertDivId, type, '', document.body);
            obj.innerHTML = message;
        }else{
            if(type == undefined){
                type = this._checkType(obj);
            }
        }
        this.isModal = this._checkModal(type);
        obj.className = type;

        if(this.alertWindow){
            if(this.alertWindow.killTimer){
                clearTimeout(this.alertWindow.killTimer);
            }
            if(this.alertWindow.bodyClickHandler){
                AMI.Browser.Event.removeHandler(window.document.body, 'click', this.alertWindow.bodyClickHandler);
            }
            if(obj.innerHTML != message){
                obj.innerHTML = obj.innerHTML + '<br />' + message;
                this.alertWindow.setHTML(obj.innerHTML);
                this.alertWindow.autosize();
            }
        }else{
            this.alertWindow = new AMI.UI.Popup(AMI.find('#' + AMI.UI.Alert.alertDivId).innerHTML, {
                id: this.alertPopupId,
                width: 350,
                height: 16,
                modal: this.isModal,
                movable: true,
                dragBy: 'body',
                className: 'AlertWindow ' + type,
                animation: {open: 'fadein', close: 'fadeout'},
                autosize: false,
                onShow: function(popup){
                    popup.setHTML(AMI.find('#' + AMI.UI.Alert.alertDivId).innerHTML);
                    if(!AMI.UI.Alert.isModal){
                        if(popup.killTimer){
                            clearTimeout(popup.killTimer);
                        }
                        popup.killTimer = setTimeout(AMI.UI.Alert.hide(popup), 4000);
                        popup.bodyClickHandler = AMI.UI.Alert.hide(popup);
                        AMI.Browser.Event.addHandler(window.document.body, 'click', popup.bodyClickHandler);
                        AMI.Browser.Event.addHandler(popup.object, 'mouseout', function(popupWnd){
                            return function(){
                                if(!popupWnd.killTimer){
                                    popupWnd.killTimer = setTimeout(AMI.UI.Alert.hide(popup), 4000);
                                }
                            }
                        }(popup));
                        AMI.Browser.Event.addHandler(popup.object, 'mouseover', function(popupWnd){
                            return function(){
                                if(popupWnd.killTimer){
                                    clearTimeout(popupWnd.killTimer);
                                    popupWnd.killTimer = null;
                                }
                            }
                        }(popup));
                    }
                },
                onClose: function(popup){
                    AMI.UI.Alert.alertWindow = null;
                    if(popup.killTimer){
                        clearTimeout(popup.killTimer);
                    }
                    if(popup.bodyClickHandler){
                        AMI.Browser.Event.removeHandler(window.document.body, 'click', popup.bodyClickHandler);
                    }
                    var obj = AMI.find('#' + AMI.UI.Alert.alertDivId);
                    if(obj && obj.parentNode){
                        obj.parentNode.removeChild(obj);
                    }
                }
            });
        }
    },

    _checkType: function(obj){
        for(var i=0; i < this.states.length; i++){
            if(AMI.hasClass(obj, this.states[i])){
                return this.states[i];
            }
        }
        return this.defaultState;
    },

    _checkModal: function(type){
        return (this.modalStates.indexOf(type) >= 0);
    }
}



/*
 * FILE END: _shared/code/js/ami.ui.alert.js
 */

/*
 * FILE START: _shared/code/js/ami.form.filter.js
 */

if (!AMI.Form)
    AMI.Form = {};
AMI.Form.Filter = {
    search_method : "action", // name search method (for GET request)
    search_text_name : "search_text", // name of input with text from search line
    submit_script_name : "submit_url", // name of hidden input, its value is: host + default script name
    subcategories_flag_name : "search_subcats", // server logic: if (search_subcats==1) then use current category as top level category for search
    search_from_current_category : true, // by default search is working from current category. can be changed by setSearchMode() method
    category_id_name : 'catid', // name of catid parameter

    mode : "filter", // Default mode. Only current category (and may be its subcategories too) used. Can be changed to "search"

    /**
     * Checks and submit FilterForm
     *
     * Actually, submit will be cancelled, all form fields will be placed in uri
     * @SubmittedForm - form to be parsed and submitted
     * @offset - related to page. If undefined, offset will be dropped.
     */
    submit : function(SubmittedForm, offset)
    {
        var el, val;

        // Create the submit URL
        var submit_url = '';

        // Cycle over all form textfields, checkboxes, radios, etc.
        for ( var i = 0 ; i <= SubmittedForm.length - 1 ; i++ )
        {
            el = SubmittedForm.elements[i];
            elName = el.name;

            if (el.type == 'checkbox') // input type checkbox
            {
                if (el.checked)
                {
                    if ((fpos = el.name.indexOf("_flag_")) >= 0)
                    {
                        flagMapAdd(el.name.substr(0, fpos), parseInt(el.name.substr(fpos+6)), 0);
                    }
                    else if (el.value != '')
                    {
                        submit_url += '&'+elName+'='+encodeURIComponent(el.value);
                    }

                    // subcategories flag
                    if (elName == this.subcategories_flag_name)
                    {
                        this.subcategories_flag_string = '&' + elName + '=1';
                    }
                }
                else // unchecked
                {
                    if ((fpos = el.name.indexOf("_flag_")) >= 0) {
                        flagMapAdd(el.name.substr(0, fpos), parseInt(el.name.substr(fpos+6)), 1);
                    } else {
                        //if (el.name.indexOf("[]") <= 0) /* do not process array items */
                        // submit_url += '&'+elName+'=';
                    }
                }
            }
            if (el.type == 'select-one')
            {
                if ((fpos = el.name.indexOf("_flag")) >= 0)
                {
                    flagMapAdd(el.name.substr(0, fpos), parseInt(el.value), 0);
                }
                else if (el.value != '')
                {
                    submit_url += '&'+elName+'='+encodeURIComponent(el.value);
                }
            }
            if (el.type == 'select-multiple')
            {
                fpos = el.name.indexOf("_flag");
                for (k = 0; k < el.length; k++) {
                    if (el.options[k].selected) {
                        if (fpos >= 0) {
                            flagMapAdd(el.name.substr(0, fpos), parseInt(el.options[k].value), 0);
                        } else {
                            submit_url += '&'+encodeURIComponent(elName)+'='+encodeURIComponent(el.options[k].value);
                        }
                    }
                }
            }
            if (el.type == 'radio')
            {
                if (el.checked)
                {
                    if ((fpos = el.name.indexOf("_flag")) >= 0) {
                        flagMapAdd(el.name.substr(0, fpos), parseInt(el.value), 0);
                    } else {
                        submit_url += '&'+elName+'='+encodeURIComponent(el.value);
                    }
                }
            }
            if ( el.type == 'text' || el.type == 'hidden' )
            {
                var preserve_category_id = !((!this.search_from_current_category) && (el.name == this.category_id_name));
                var this_isnt_reserved_name = (el.name != this.search_method && el.name != this.search_text_name && el.name != this.submit_script_name && el.name != 'offset');
                if ( this_isnt_reserved_name && preserve_category_id && el.value != '' ) // prevent duplicating special fields
                    submit_url += '&' + elName + '=' + encodeURIComponent(el.value);
                if (offset)
                    submit_url += '&offset=' + offset;
            }
        }

        submit_url += '&' + this.search_method + '=' + this.getSearchMethodName( SubmittedForm, this.search_method );

        if (typeof this.subcategories_flag_string != 'undefined')
            submit_url += this.subcategories_flag_string;

        for(i = 0; i < flagMaps.length; i++) {
            if(flagNames[i]) {
                submit_url += '&'+flagNames[i]+'=0x'+arrToHex(flagMaps[i]);
            }
        }

        var search_text_value = this.getSearchText( SubmittedForm, this.search_text_name );
        if (search_text_value != '')
            submit_url += '&' + this.search_text_name + '=' + encodeURIComponent(search_text_value);

        submit_url = this.getScriptName(SubmittedForm) + '?' + submit_url;

        window.location.href = submit_url;
        return false;
    },

    /**
     * Submit form and set to input with name "letter" value @letter
     */
    submitWithLetter : function(letter)
    {
        if (this.main_form_name)
        {
            var forms = document.forms;
            var i = 0;
            // Finding main filter form
            while ( i <= document.forms.length - 1 && document.forms[i].name != this.main_form_name )
            {
                i++;
            }
            // If we find main form and there is an input type hidden with name 'letter'
            if ( document.forms[i] && document.forms[i].letter )
            {
                document.forms[i].letter.value = letter;
                this.submit( document.forms[i] );
            }
        }
    },

    /**
     * @varName - name of form field should be looked (e.g. "action")
     * @returns name of action, i.e. search method name. Not connected with form attr "action"!
     */
    getSearchMethodName : function ( SubmittedForm, varName )
    {
        // only slow search method finding items in all subcategories (fast method include only first level of subcats)
        if (SubmittedForm.search_subcats && SubmittedForm.search_subcats.checked)
        {
            this.setSlowSearchMethod();
            return this.searchMethodName;
        }

        if ( this.searchMethodName )
            return this.searchMethodName;

        this.setSlowSearchMethod(); // Slow method by default - for Enter submit form in IE
        return this.searchMethodName;
    },

    /**
     * Extracts varName from SubmittedForm. Input type text has priority over type hidden. Next input has proiroty over previous.
     *
     * @SubmittedForm - form to be submitted
     * @returns - search text (text from search line of current or previous request)
     */
    getSearchText : function ( SubmittedForm, varName )
    {
        var searchText = '';
        var missHidden = false;

        for ( var i = 0 ; i <= SubmittedForm.length - 1 ; i++ )
        {
            if ( SubmittedForm.elements[i].type == 'text' && SubmittedForm.elements[i].name == varName )
            {
                missHidden = true;
                searchText = SubmittedForm.elements[i].value;
            }
            if ( SubmittedForm.elements[i].type == 'hidden' && SubmittedForm.elements[i].name == varName && SubmittedForm.elements[i].value != '' )
            {
                if ( !missHidden )
                    searchText = SubmittedForm.elements[i].value;
            }
        }

        return searchText;
    },

    /**
     * Set current search method
     */
    setSearchMethodName : function ( name )
    {
        this.searchMethodName = name;
    },

    /**
     * Set "rsrtme" (resort me) method as current.
     *
     * Method "rsrtme" finding items only in current category and first level subcategories.
     */
    setFastSearchMethod : function ()
    {
        this.setSearchMethodName( 'rsrtme' );
    },

    /**
     * Set "search" (resort me) method as current.
     *
     * Method "search" finding items in current category and all subcategories
     */
    setSlowSearchMethod : function ()
    {
        this.setSearchMethodName( 'search' );
    },

    /**
     * Get the submit script name (first part of get request, like action attr of form)
     *
     * There are two ways: 1. Current uri; 2. Default, top level category uri.
     */
    getScriptName : function (SubmittedForm)
    {
        for ( var i = 0 ; i <= SubmittedForm.length - 1 ; i++ )
        {
            if ( SubmittedForm.elements[i].name == this.submit_script_name )
                this.submit_script_value = SubmittedForm.elements[i].value;
        }

        var link_without_get_params = window.location.href.slice( 0, window.location.href.indexOf('\?') );

        if ( link_without_get_params.indexOf(this.submit_script_value) == -1 || !this.search_from_current_category ) // if we are not in catalog or there is flag, indicating to search from top level category
            return this.submit_script_value;
        else // we are somewhere in catalog and there is no need to serach from top level category
            return document.location.pathname;
    },

    /**
     * Setting search mode, when all catalog is used for search (top level category), and slow search method applied
     *
     * @search_from_current_category - bool flag. if true - search is working from current category, if false - from top level category
     */
    setSearchMode : function (search_from_current_category)
    {
        if (typeof search_from_current_category === "boolean")
            this.search_from_current_category = search_from_current_category;
        this.setSlowSearchMethod(); // Slow search method? for subcategories search
        this.subcategories_flag_string = '&' + this.subcategories_flag_name + '=1'; // it is needed for searching in not top level category (bad server logic)
        this.mode = 'search';
    }
}


/*
 * FILE END: _shared/code/js/ami.form.filter.js
 */

/*
 * FILE START: _shared/code/js/ami.eshop.properties.js
 */

if (!AMI.Eshop)
    AMI.Eshop = {};
AMI.Eshop.Properties =	{
    //AMI.Eshop.Properties.aPropData is undefined by default,
    doesnt_matter : 'doesnt matter', // Default values, used if no &#037;&#037;locals&#037;&#037;
    chose_prop : 'chose prop',
    choose_another : 'chose another',

    property_id_name : 'itemD_property_', // Id prefix for fieldsets with eshop-item-properties of current property
    properties_block_classname : 'eshop-item-properties', // css class name for block (fieldset) with all eshop-item-properties of current property

    avail_ids : Array( 'ami-eshop-properties__availability', 'ami-eshop-properties__price-box' ), // id of blocks to be shown when variant is available (hidden when unavail)
    unavail_ids : Array( 'ami-eshop-properties__unavailable' ), // id of blocks to be shown when variant is unavailable (hidden when avail)

    /**
     * Finding key blocks, inserting properties fields
     */
    init : function()
    {
        if (this.aPropData) // global var aPropData, not this.
        {
            if (typeof eshop_properties_view == "undefined") {
                eshop_properties_view = 'radio';
            }
            if(eshop_properties_view == 'table') {
                var tablePropData = '<table class="ami-eshop-properties__wrapper-table" cellspacing="0" cellpadding="0">';
                var propValue = AMI.Eshop.Properties.aPropData;
                AMI.$('#ami-eshop-properties__price-box').css('display', 'none');

                for(i=0;i<propValue.length;i++) {
                    tablePropData += '<tr class="ami-eshop-properties__wrapper-table-tr__'+i+'">';
                    for(k=0;k<propValue[i].length;k++) {
                        if(propValue[i].length-1 == k) {
                            //
                        } else {
                            if(i == 0) {
                                tablePropData += '<th>'+propValue[i][k]+'</th>';
                            } else {
                                tablePropData += '<td>'+propValue[i][k]+'</td>';
                            }
                        }
                    }
                    tablePropData += '</tr>';
                }

                tablePropData += '</table>';
                AMI.$('.eshop-item-detailed__description:eq(0)').before(tablePropData);
            } else {
                this.price_box = document.getElementById('ami-eshop-properties__price-box'); // Block with price
                this.price_choice = document.getElementById('ami-eshop-properties__current-chosen-params-list'); // 
                this.price = this.price_box;
                this.unavail = document.getElementById('ami-eshop-properties__unavailable');

                this.avail_blocks = Array();
                for ( i = 0 ; i <= this.avail_ids.length - 1 ; i++ )
                {
                    var block = document.getElementById(this.avail_ids[i]);
                    if (block)
                        this.avail_blocks.push(block);
                }

                this.unavail_blocks = Array();
                for ( i = 0 ; i <= this.unavail_ids.length - 1 ; i++ )
                {
                    var block = document.getElementById(this.unavail_ids[i]);
                    if (block)
                        this.unavail_blocks.push(block);
                }

                this.prepareProperties();
                this.resetProperties();
                this.setProperty();

                if(eshop_properties_view == 'select') {
                    this.initSelectBox();
                }
            }
        }
    },

    /**
     * Returning true if THIS is IE version or lower
     */
    ie : function(version)
    {
        var rv;
        var ua = navigator.userAgent;
        var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
        if (re.exec(ua) != null)
            rv = parseFloat( RegExp.$1 );
        return (navigator.appName == "Microsoft Internet Explorer") && (rv <= version);
    },

    /**
     * Update all eshop-item-properties, by deleting and inserting all of them
     *
     * @propNum - property number, eshop-item-properties of which will be updated
     * @allowedValues - all allowed eshop-item-properties of propNum property
     * @allValues - all eshop-item-properties of propNum property
     * @clickedPropNum - last clocked property, can be any value
     */
    propertyValuesSet : function(propNum, allowedValues, allValues, clickedPropNum)
    {
        var fieldSet = document.getElementById(this.property_id_name + propNum); // Finding fieldset for property propNum
        var sValue, legend;
        var selectedIndex = -1;
        var i;

        var radios = fieldSet.getElementsByTagName("input"); // All radios in current fieldset
        if (typeof radios != 'undefined' && typeof radios.length === 'number' && radios.length > 0) // There must be at least one radio
        {
            for ( i = 0 ; i <= radios.length - 1 ; i++ )
            {
                if (radios[i].checked)
                {
                    selectedIndex = i;
                    break;
                }
            }

            if (selectedIndex < radios.length && selectedIndex >= 0) // FF3.0 generating error if selectedIndex is "-1"
            {
                if (typeof radios[selectedIndex] != 'undefined' && typeof radios[selectedIndex].value === 'string')
                    sValue = radios[selectedIndex].value;
            }

            // Finding actual index (in allValues array) of checked element
            for ( i = 0 ; i <= allValues.length - 1 ; i++ )
            {
                if (sValue == allValues[i])
                {
                    selectedIndex = i;
                }
            }

            // Deleting all radios
            for ( i = radios.length - 1 ; i >= 0 ; i-- )
                fieldSet.removeChild(radios[i]);
        }
        else // For first execution (for example, when page is loaded)
        {
            for ( i = 0 ; i <= allValues.length - 1 ; i++ )
            {
                if (this.inArray(allowedValues, allValues[i]))
                {
                    selectedIndex = i;
                    break;
                }

            }
            //selectedIndex = i;
        }


        // Deleting all labels and brs...
        labels = fieldSet.getElementsByTagName("label"); // Only one label per radio allowed
        brs = fieldSet.getElementsByTagName("br");

        if (typeof labels != 'undefined')
            for ( i = labels.length - 1 ; i >= 0 ; i-- )
                fieldSet.removeChild(labels[i]);
        if (typeof brs != 'undefined')
            for ( i = brs.length - 1 ; i >= 0 ; i-- )
                fieldSet.removeChild(brs[i]);

        // ... and creating them all over again
        for ( i = 0 ; i < allValues.length ; i++ )
        {
            if ( this.ie(6) )
            {
                var input = document.createElement('<input name=' + fieldSet.id + '>');
            }
            else
            {
                var input = document.createElement('input'); // Creating new radio
                input.name = fieldSet.id; // Uniting radios by parent fieldset id
            }
            label = document.createElement('label'); // Creating label for radio
            input.id = 'fieldset_' + fieldSet.id + '_radio_' + i;
            input.type = "radio";
            input.value = allValues[i];
            input.checked = false;
            input.defaultChecked = false;
            input.setAttribute("class", this.properties_block_classname + "__radio");
            label.setAttribute("class", this.properties_block_classname + "__label");
            if (!this.inArray(allowedValues, allValues[i])) // Blocks element if value not allowed
            {
                input.setAttribute("class", this.properties_block_classname + "__radio " + this.properties_block_classname + "_disabled");
                label.setAttribute("class", this.properties_block_classname + "__label " + this.properties_block_classname + "_disabled");
                if (this.ie(6))
                {
                    //input.disabled = true;
                    label.disabled = true;
                }
                if ( i == selectedIndex ) // Unavailabled value is checked
                {
                    input.checked = true;
                    input.defaultChecked = true;
                    fieldSet.className = this.properties_block_classname + ' ' + this.properties_block_classname + '_notavail';
                    legend = fieldSet.getElementsByTagName("legend")[0];
                }
            }
            else
            {
                if ( i == selectedIndex )
                {
                    input.checked = true;
                    input.defaultChecked = true;
                    fieldSet.className = this.properties_block_classname;
                }
            }
            fieldSet.appendChild(input);

            input.onclick = function(LocalPropNum, Obj) { // Onclick handler
                return function() // Actually onclick handler
                {
                    Obj.setProperty(LocalPropNum, this.value);
                }

            }(propNum, this) // "this" - object-class that has function setProperty()

            if (clickedPropNum === propNum && input.checked)
                label.setAttribute("class", this.properties_block_classname + "__label " + this.properties_block_classname + "__label_visited");
            label.htmlFor = input.id;
            label.innerHTML = input.value;
            if (label.innerHTML === '')
            {
                label.className += " " + this.properties_block_classname + "__label_value_notset";
                label.innerHTML = this.doesnt_matter;
            }

            fieldSet.appendChild(label);
            fieldSet.appendChild(document.createElement('br'));

        }
        return true;
    },

    /**
     * Existance of value in array
     *
     * @aArray - one-dimensional array
     * @sValue - value
     */
    inArray : function(aArray, sValue)
    {
        for ( var i = 0 ; i < aArray.length ; i++ )
        {
            if ( aArray[i] == sValue )
            {
                return true;
            }
        }
        return false;
    },


    /**
     * Allowed eshop-item-properties of property
     *
     * @getPropNum - property number (html dimension)
     * @priorityOrder - Array of priorities. Index is property number, priorityOrder[index] is priority of index property
     */
    getAllowedPropertyValues : function(getPropNum, priorityOrder)
    {
        var aValues = Array();
        var enabled;
        var fieldSet;
        var i, j, k;
        var selectedValue = []; // in priority dimension
        var radios = [];
        var inversePriorityOrder = []; // index is priority, value[index] - property number
        var orderedPropNum; // property number in ierarchy dimension

        // Making inverse priority array
        for ( i = 0 ; i <= priorityOrder.length - 1 ; i++ )
        {
            //while (  ) {j++}
            inversePriorityOrder[ priorityOrder[i] ] = i;
        }

        orderedPropNum = priorityOrder[getPropNum];
        if (getPropNum >= 0 && getPropNum <= priorityOrder.length && typeof priorityOrder[getPropNum] != 'undefined')
        {
            orderedPropNum = priorityOrder[getPropNum];
        }
        else // Impossible, delete that
        {

        }

        // Finding ckecked eshop-item-properties of more important custom fieldss
        for ( i = 0 ; i <= this.aPropData[0].length - 3 ; i++ ) // html dimension
        {
            fieldSet = document.getElementById(this.property_id_name + i); // fieldset for i-property
            if (typeof fieldSet != 'undefined' && fieldSet)
            {
                radios = fieldSet.getElementsByTagName("input"); // All radios in i-fieldset
                if (typeof radios != 'undefined' && radios.length > 0)
                {
                    for ( j = 0 ; j <= radios.length - 1 ; j++ )
                    {
                        if (radios[j].checked)
                        {
                            selectedValue[priorityOrder[i]] = radios[j].value;
                            break;
                        }
                    }
                }
            }
        }

        for ( i = 1 ; i < this.aPropData.length - 1 ; i++ ) // Rules
        {
            enabled = true; // Default state - variant allowed
            for ( j = 0 ; j <= orderedPropNum - 1 ; j++ ) // 'priority' dimension
            {
                if (this.aPropData[i][inversePriorityOrder[j]] != selectedValue[j])
                    enabled = false;
            }

            if (enabled && !this.inArray(aValues, this.aPropData[i][getPropNum]))
                aValues[aValues.length] = this.aPropData[i][getPropNum];
        }

        //return aValues.sort();
        return aValues;
    },

    /**
     * All eshop-item-properties of custom field
     *
     * @colNum - property number
     */
    getAllPropertyValues : function(colNum)
    {
        var allValues = Array();

        for ( var i = 1 ; i < this.aPropData.length - 1 ; i++ )
        {
            if ( !this.inArray(allValues, this.aPropData[i][colNum]) )
            {
                allValues[allValues.length] = this.aPropData[i][colNum];
            }
        }

        //return allValues.sort();
        return allValues;
    },

    /**
     * Makes propNum to highest priority
     *
     * @propNum - property that need to be highest priority
     * @priorityOrder - Array of priorities. Index is property number, priorityOrder[index] is priority of index property
     * @return - Array of priorities with 'highest priority' on 'propNum', or same array if any error occures
     */
    setHighestPriority : function(propNum, priorityOrder)
    {
        var i, temp, hpi;
        for ( i = 0 ; i <= priorityOrder.length - 1 ; i++ )
        {
            priorityOrder[i] = i;
        }
        if (typeof propNum === 'number' && propNum >= 0 && propNum < priorityOrder.length && typeof priorityOrder[propNum] != 'undefined')
        {
            k = 1;
            for ( i = 0 ; i <= priorityOrder.length - 1 ; i++ )
            {
                priorityOrder[i] = i + k;
                if ( i ==  propNum)
                {
                    priorityOrder[i] = 0;
                    k = 0;
                }
            }

        }

        return priorityOrder;
    },

    /**
     * Changes price when clicked in radio
     *
     * First execution takes place on page load
     * @propNum - changed property number
     * @propValue - new variant of property propNum
     */
    setProperty : function(propNum, propValue)
    {
        var allowedValues;
        var allValues;
        var Avail;
        var i, firstExec = false, str, value;

        if ( this.aPropData && ( this.aPropData.length > 1 ) )
        {
            if (typeof propNum == 'undefined')
            {
                propNum = 0; // First property by default
                propValue = this.aPropData[1][propNum]; // Property value from first rule by default
                firstExec = true;
            }

            priorityOrder = this.setHighestPriority(propNum, priorityOrder);

            for ( var j = 0 ; j <= this.aPropData[0].length - 3 ; j++ ) // Properties
            {
                allowedValues = this.getAllowedPropertyValues(j, priorityOrder);
                allValues = this.getAllPropertyValues(j);
                this.propertyValuesSet(j, allowedValues, allValues, propNum); // Rewriting allowed values of property j
            }

            // For first execution we need actual value of (let it be first) property
            if (firstExec)
            {
                var fieldSet = document.getElementById(this.property_id_name + 0); // Let it be first property
                var radios = fieldSet.getElementsByTagName("input");
                if (typeof radios != 'undefined')
                {
                    i = 0;
                    while(typeof radios[i] != 'undefined' && !radios[i].checked) {i++;}
                }
                propNum = i;
                propValue = radios[i].value;
            }

            for ( var i = 1 ; i <= this.aPropData.length - 1 ; i++ ) // Rules
            {
                if ( this.aPropData[i][propNum] == propValue )
                {
                    //propNum = getProperty(); // Extract current properties values from radio (needed for first execution, when propNum undefined)
                    var bFound = true;
                    Avail = true; // Availability of product
                    for ( var j = 0 ; j < this.aPropData[i].length - 2 ; j++ )
                    {
                        var oProperty = document.getElementById(this.property_id_name+j);
                        if (typeof oProperty != 'undefined')
                        {
                            var radios = oProperty.getElementsByTagName("input");
                            if (this.ie(6))
                                var labels = oProperty.getElementsByTagName("label"); // for ie6
                        }
                        if (typeof radios != 'undefined') // if not first execution
                        {
                            for ( var k = 0 ; k <= radios.length - 1 ; k++ )
                            {
                                if ( radios[k].checked )
                                    break;
                            }
                            if (typeof radios[k] != 'undefined' && radios[k].className == this.properties_block_classname + '__radio ' + this.properties_block_classname + '_disabled')
                            {
                                Avail = false;
                            }
                            if (this.ie(6))
                                if (typeof labels[k] != 'undefined' && labels[k].disabled)
                                    Avail = false;
                            if (typeof radios[k] != 'undefined' && typeof radios[k].value == 'string')
                            {
                                if ( radios[k].value != this.aPropData[i][j] )
                                {
                                    bFound = false;
                                }
                            }
                        }
                        else
                            bFound = false;
                    }
                    // Changing current choice
                    str = this.getChoice(this.aPropData[0].length - 2);
                    if (typeof this.price_choice != 'undefined')
                    {
                        pricesAvailability = document.getElementById('prices-avaliability');
                        lastPrice = '';
                        this.price_choice.innerHTML = str;
                    }
                    // Changing price
                    if ( bFound )
                    {
                        if (typeof this.price_box != 'undefined')
                        {
                            pricesAvailability = document.getElementById('prices-avaliability');
                            lastPrice = '';
                            this.price_choice.innerHTML = str;
                            this.price_box.innerHTML = this.aPropData[i][this.aPropData[i].length - 2];
                            if (pricesAvailability)
                            {
                                this.price_box.innerHTML = pricesAvailability.innerHTML + this.price_box.innerHTML;
                                lastPrice = pricesAvailability.innerHTML;
                            }


                            lastPrice += this.aPropData[i][this.aPropData[i].length - 2];

                            // Hiding unavail blocks
                            for ( var m = 0 ; m <= this.unavail_blocks.length - 1 ; m++ )
                            {
                                this.unavail_blocks[m].style.display = 'none';
                                this.unavail_blocks[m].style.opacity = '0.0';
                            }
                            // Showing avail blocks
                            for ( m = 0 ; m <= this.avail_blocks.length - 1 ; m++ )
                            {
                                this.avail_blocks[m].style.display = 'block';
                                this.avail_blocks[m].style.opacity = '1.0';
                            }

                            if (typeof this.price_box != 'undefined')
                            {
                                /*this.price_box.style.visibility = 'visible';
                                 this.price_box.style.opacity = '1.0';
                                 this.unavail.style.visibility = 'hidden';
                                 this.unavail.style.opacity = '0.0';*/
                                if (this.ie(8))
                                {
                                    this.price_box.style.display = 'block';
                                    this.unavail.style.display = 'none';
                                    this.unavail.style.position = 'static';
                                }
                            }
                        }
                        else
                            throw {message: "this.price_box is null"}
                    }
                    if (!Avail)
                    {
                        if (typeof this.price_box != 'undefined')
                        {
                            /*this.price_box.style.visibility = 'hidden';
                             this.price_box.style.opacity = '0.0';
                             this.unavail.style.visibility = 'visible';
                             this.unavail.style.opacity = '1.0';*/
                            // Showing unavail blocks
                            for ( var m = 0 ; m <= this.unavail_blocks.length - 1 ; m++ )
                            {
                                this.unavail_blocks[m].style.display = 'block';
                                this.unavail_blocks[m].style.opacity = '1.0';
                            }
                            // Hiding avail blocks
                            for ( m = 0 ; m <= this.avail_blocks.length - 1 ; m++ )
                            {
                                this.avail_blocks[m].style.display = 'none';
                                this.avail_blocks[m].style.opacity = '0.0';
                            }
                            if (this.ie(8))
                            {
                                this.price_box.style.display = 'none';
                                this.unavail.style.display = 'block';
                                this.unavail.style.position = 'static';
                            }
                        }
                    }
                }
            }
        }
    },

    /**
     * Preparing and returns string of current fieldsets choise
     *
     * @propertiesNum - total number of properties
     */
    getChoice : function(propertiesNum)
    {
        var fieldSet, radios, i, j, str = '<div class="chosen-properties"><div class="chosen-properties__header">' + this.chose_prop + ':</div>', value;

        for ( i = 0 ; i <= propertiesNum - 1 ; i++ )
        {
            fieldSet = document.getElementById(this.property_id_name + i);
            if (typeof fieldSet != 'undefined' && fieldSet)
                radios = fieldSet.getElementsByTagName('input');
            j = 0;
            while (typeof radios[j] != 'undefined' && !radios[j].checked) {j++} // Find checked radio of i-property
            //j--;
            str += '<div class="chosen-properties__property">' + fieldSet.getElementsByTagName('legend')[0].innerHTML + '</div>';
            value = radios[j].value;
            if (value == '')
                value = '<i>' + this.doesnt_matter + '</i>';
            if (this.isDisabled(radios[j]))
                str += '<div class="chosen-properties__value chosen-properties__value_disabled">' + value + '</div>';
            else
                str += '<div class="chosen-properties__value">' + value + '</div>';

        }



        return str + '</div>';
    },

    /**
     * Checks if CSS classes intend to 'disable' element
     */
    isDisabled : function(element)
    {
        return (element.className.indexOf("disabled") != -1);
    },

    /**
     * Writing empty itemD_property_ containers for eshop-item-properties to document
     */
    prepareProperties : function()
    {
        if ( this.aPropData && ( this.aPropData.length > 1 ) ) // Creating properties containers only if we received data from server
        {
            for ( var i = 0 ; i < this.aPropData[0].length - 2 ; i++ )
            {
                var wrapper = document.getElementById(this.wrapperId);
                wrapper.innerHTML += '<fieldset class="' + this.properties_block_classname + '" id="itemD_property_' + i + '" name="property_' + i + '"><legend class="' + this.properties_block_classname + '__header" title="' + this.choose_another + '">' + this.aPropData[0][i] + '</legend></fieldset>';
            }
        }
    },

    /**
     * Reset all radios, emulating page reload
     */
    resetProperties : function()
    {
        // Resetting radios
        var i, j, fieldSet, radios;
        for ( i = 1 ; i <= this.aPropData[0].length - 2 ; i++ )
        {
            fieldSet = document.getElementById(this.property_id_name + i);
            if (typeof fieldSet != 'undefined' && fieldSet)
            {
                radios = fieldSet.getElementsByTagName("input"); // All the radios in current fieldset
                if (typeof radios != 'undefined' && radios && typeof radios.length === 'number' && radios.length > 0)
                {
                    for ( j = 0 ; j <= radios.length - 1 ; j++ )
                    {
                        radios[j].checked = false;
                        radios[j].defaultChecked = false;
                    }
                }
            }
        }

        // Resetting priority order
        priorityOrder = new Array();
        for ( i = 0 ; i <= this.aPropData[0].length - 3 ; i++ )
            priorityOrder[i] = i;
    },
    useSelectbox: function(radiobuttonAreaName, selectboxAreaName) {
        if(AMI.$('#'+selectboxAreaName).length == 0) {
            AMI.$('#'+radiobuttonAreaName).after('<div id="'+selectboxAreaName+'"></div>');
            AMI.$('#'+radiobuttonAreaName).css('display', 'none');
        }
        radiobuttonArea = AMI.$('#'+radiobuttonAreaName);
        selectboxArea = AMI.$('#'+selectboxAreaName);
        selectboxArea.html('');
        radiobuttonArea.find('.eshop-item-properties').each(function(i) {
            if(AMI.$(this).hasClass('eshop-item-properties_notavail')) {
                validSelect = 'class="eshop-item-properties_notavail__select form-control" style="border: 1px solid #ff0000"';
            } else {
                validSelect = 'class="eshop-item-properties__select form-control"';
            }
            selectboxArea.append('<div class="'+selectboxAreaName+'__block form-group"><label class="'+selectboxAreaName+'__title control-label text-uppercase">'+AMI.$(this).find('legend').text()+': </label><select '+validSelect+' onchange="AMI.Eshop.Properties.setSelectBox(this.value)" id="'+selectboxAreaName+'__'+i+'"></select></div>');
            AMI.$(this).find('input').each(function(k) {
                if(AMI.$(this).val() == '') {
                    optionValue = AMI.Eshop.Properties.doesnt_matter;
                } else {
                    optionValue = AMI.$(this).val();
                }
                if(AMI.$(this).hasClass("eshop-item-properties_disabled")) {
                    AMI.$('#'+selectboxAreaName+'__'+i).append('<option class="eshop-item-properties_disabled__option" style="background: #F5F5F5; color: #ccc;" value="'+AMI.$(this).attr('id')+'">'+optionValue+'</option>');
                } else {
                    AMI.$('#'+selectboxAreaName+'__'+i).append('<option class="eshop-item-properties__option" value="'+AMI.$(this).attr('id')+'">'+optionValue+'</option>');
                }
            });
        });
    },
    setSelectBox: function(value) {
        AMI.$('#'+value).attr('checked', 'checked');
        AMI.$('#'+value).click();
        this.initSelectBox();

        AMI.$('#ami-eshop-properties__wrapper input').each(function(i) {
            if(AMI.$(this).attr('checked') == 'checked') {
                AMI.$('#ami-eshop-properties__wrapper-selectbox option[value='+AMI.$(this).attr('id')+']').attr('selected', 'selected');
            }
        });
    },
    initSelectBox: function() {
        var radiobuttonAreaName = 'ami-eshop-properties__wrapper';
        var selectboxAreaName = 'ami-eshop-properties__wrapper-selectbox';
        this.useSelectbox(radiobuttonAreaName, selectboxAreaName);
    }
}

AMI.$(document).ready(function(){ AMI.Eshop.Properties.init(); });

/*
 * FILE END: _shared/code/js/ami.eshop.properties.js
 */

/*
 * FILE START: _shared/code/js/ami.ui.scroller.js
 */

/**
 * This is version 2.0 of AMI.slider.
 * The html structure must be like <wrapper><clipper><container /></clipper><pad /></wrapper>
 * No paddings for slides!
 */
AMI.UI.Scroller = {
    // AMI.UI.Scroller size // 0 means infinity
    DefaultClipperSizeX : 3,
    DefaultClipperSizeY : 0,
    //DefaultContainerSizeX : 0,
    DefaultContainerSizeY : 0,

    // html classnames for key blocks
    ContainerFix : "container",
    ClipperFix : "clipper",
    WrapperFix : "wrapper",

    // Pad classes
    PadClass : "slider-pad", // Blocks, that contain arrows for slider navigation
    LeftArrow : "slider-pad__arrow-left", // we clicking on LeftArrow, slider goes left
    RightArrow : "slider-pad__arrow-right",
    UpArrow : "slider-pad__arrow-up",
    DownArrow : "slider-pad__arrow-down",
    DisabledArrow : "slider-pad__arrow_disabled", // modifier indicating that arrow is disabled and cannot be clicked
    ColsModifierPrefix : "_cols_",

    Wrappers : [],

    // Arrows
    Left : [],
    Right : [],

    exception_class_words : Array( 'splitter' ), // if word is part of className of "slide" - this is not a slide

    /**
     * @returns true if browser is supported
     */
    browserIsSupported : function()
    {
        var rv = 10; // IE version
        if (navigator.appName == 'Microsoft Internet Explorer')
        {
            var ua = navigator.userAgent;
            var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
            if (re.exec(ua) != null)
                rv = parseFloat( RegExp.$1 );
        }

        if (rv <= 6) return false;

        return true;
    },

    /**
     * Initializing all sliders on page. IE6 or lower not supported.
     *
     * Finding all blocks with className this.PadClass. Then finding key-blocks ((wrapper), clipper and container) around each Pad.
     * If container bigger than clipper - than arrows will be created.
     */
    init : function()
    {
        if (this.browserIsSupported() && typeof AMI.find === 'function')
        {
            this.Pads = AMI.$('.' + this.PadClass);

            if (this.Pads)
            {
                this.Clippers = [];
                this.ClippersWidth = [];
                // Getting Clippers width, finding key-blocks
                for ( var j = 0 ; j <= this.Pads.length - 1 ; j++ )
                {
                    this.Clippers[j] = this.findFirstKeyBlock(this.ClipperFix, this.Pads[j].parentNode);
                    if (typeof this.Clippers[j] != 'undefined')
                    {
                        this.Left[j] = AMI.find( '.' + this.LeftArrow, this.Pads[j])[0]; // There must be only one ([0]) element
                        this.Right[j] = AMI.find( '.' + this.RightArrow, this.Pads[j])[0];
                        this.ClippersWidth[j] = Math.max( this.Clippers[j].clientWidth - this.Left[j].offsetWidth - this.Right[j].offsetWidth, 50 );
                        this.Wrappers[j] = this.Pads[j].parentNode;
                    }
                }
                // Setting sizes
                for ( var j = 0 ; j <= this.Pads.length - 1 ; j++ )
                {
                    var Up = AMI.find( '.' + this.UpArrow, this.Pads[j])[0];
                    var Down = AMI.find( '.' + this.DownArrow, this.Pads[j])[0];

                    // Finding all blocks
                    if (typeof this.Clippers[j] != 'undefined')
                    {
                        this.Container = this.findFirstKeyBlock(this.ContainerFix, this.Clippers[j]);
                        if (this.Container)
                        {
                            // Collecting all slides in container to array
                            this.collectSlides();

                            if (this.Slides && this.Slides.length > 0)
                            {
                                // Define sizes of clipper and container from attributes
                                this.defineSizes(j);

                                var we_need_scroller_here = (this.SlideWidth * this.Slides.length > this.ClippersWidth[j]);
                                if (we_need_scroller_here)
                                {
                                    this.Container.style.position = 'absolute'; // AFTER slide width detection

                                    // No attributes in clipper and container tag -> smart logic
                                    if (this.ClipperSizeX == 0 && this.ClipperSizeY == 0 && this.ContainerSizeX == 0 && this.ContainerSizeY == 0)
                                    {
                                        this.defineSizesSmart(j);
                                    }

                                    this.setSizes(j);

                                    this.InitArrows(j, Up, Down);

                                    // px sizes of wrapper
                                    /*this.Wrappers[j].style.width = (parseInt(this.Clippers[j].style.width) + parseInt(this.Clippers[j].style.marginLeft) + parseInt(this.Clippers[j].style.marginRight)) + 'px';
                                     this.Wrappers[j].style.height = (parseInt(this.Clippers[j].style.height) + parseInt(this.Clippers[j].style.marginTop) + parseInt(this.Clippers[j].style.marginBottom)) + 'px';*/
                                }
                            }
                        }
                    } // endif (this.Clippers[j])
                }
            } // endif this.Pads
        }
    },

    /**
     * Collecting all slides in current container to this.Slides array
     */
    collectSlides : function()
    {
        this.Slides = [];
        for (var i = 0 ; i <= this.Container.childNodes.length - 1 ; i++ )
        {
            if (this.Container.childNodes[i].nodeType == 1) // is html tag
            {
                var this_is_slide = true;
                for ( k = 0 ; k <= this.exception_class_words.length - 1 ; k++ )
                    if ( this.Container.childNodes[i].className.indexOf(this.exception_class_words[k]) != -1 )
                        this_is_slide = false;

                if (this_is_slide)
                    this.Slides.push(this.Container.childNodes[i]);
                else
                    this.Container.childNodes[i].parentNode.removeChild(this.Container.childNodes[i]);

            }
        }
    },

    setSizes : function(j)
    {
        // Defining px sizes of container and clipper
        this.Container.style.width = this.ContainerSizeX * this.SlideWidth + 'px';
        this.ClippersWidth[j] = this.ClipperSizeX * this.SlideWidth;
        this.Clippers[j].style.width = this.ClippersWidth[j] + 'px';

        // Set common width to all slides
        for ( var i = 0 ; i <= this.Slides.length - 1 ; i++ )
        {
            var dwidth = 0; // padding of slide
            if (window.getComputedStyle)
            {
                var styles = window.getComputedStyle(this.Slides[i], null);
                dwidth = parseInt(styles.marginLeft) + parseInt(styles.marginRight) + parseInt(styles.paddingLeft) + parseInt(styles.paddingRight);
            }
            this.Slides[i].style.width = (this.SlideWidth - dwidth) + 'px';
        }

        // Geting the maximum height of slides
        var maxheight = 0;
        for ( var i = 0 ; i <= this.Slides.length - 1 ; i++ ) // Get max height
            if (maxheight < this.Slides[i].offsetHeight) maxheight = this.Slides[i].offsetHeight;
        this.SlideHeight = maxheight;
        for ( var i = 0 ; i <= this.Slides.length - 1 ; i++ ) // Set max height to all slides
            this.Slides[i].style.height = this.SlideHeight + 'px';

        this.Container.style.height = this.ContainerSizeY * this.SlideHeight;
        this.Clippers[j].style.height = this.ClipperSizeY * this.SlideHeight + 'px';
    },

    /**
     * smart detection of clipper and container sizes, if no attributes reseived
     */
    defineSizesSmart : function(j)
    {
        this.ContainerSizeX = this.getCols(this.Slides[0]);

        if (this.ContainerSizeX <= 0)
            this.ContainerSizeX = this.Slides.length; // Default one row

        this.ContainerSizeX = Math.min(this.ContainerSizeX, this.Slides.length); // if cols more than slides
        this.ContainerSizeY = Math.ceil( this.Slides.length / this.ContainerSizeX );

        this.ClipperSizeX = this.ContainerSizeX;
        if (this.ClippersWidth[j] + 1 < this.ClipperSizeX * this.SlideWidth) // then clipper width less than container, and we need Left and Right arrows
        {
            this.ClipperSizeX = Math.floor(this.ClippersWidth[j] / this.SlideWidth); // Can be zero, see next "if"
        }
        var horizontal_scroll_imposible = false;
        if (this.ClipperSizeX == 0) // Case when paddings for Left and Right arrows not enters, and only vertical scroll needed
        {
            horizontal_scroll_imposible = true;
        }
        if (horizontal_scroll_imposible) // Exseption when clippers width is too short
        {
            this.ClipperSizeX = 1;
            this.ClipperSizeY = 1; // Number of rows in clipper in case vhen only vertical scroll is possible
            this.ContainerSizeX = 1; // Case when ContainerSizeX may not be equal to cols
            this.ContainerSizeY = this.Slides.length;

            this.Clippers[j].style.marginLeft = '0px'; // Deleting margins for arrows left and right
            this.Clippers[j].style.marginRight = '0px';
            this.ClippersWidth[j] += this.Left[j].offsetWidth + this.Right[j].offsetWidth;
            this.Clippers[j].style.width = this.ClippersWidth[j] + 'px';
        }
        else // Horizontal scroll possible, standart situation
        {
            if (this.DefaultClipperSizeY == 0) // DefaultClipperSizeY == 0 means infinity rows, i.e. no vertical scroll
            {
                this.ClipperSizeY = Math.ceil( this.Slides.length / this.ContainerSizeX );
            }
            else
            {
                this.ClipperSizeY = this.DefaultClipperSizeY;
            }
        }

        this.SlideWidth = Math.floor( this.ClippersWidth[j] / this.ClipperSizeX); // new normalized width in px
    },

    /**
     * defining sizes of clipper in container from attributes
     */
    defineSizes : function(j)
    {
        this.SlideWidth = this.Slides[0].offsetWidth; // slider width as is

        // Define size of clipper and container
        this.ClipperSizeX = this.ClipperSizeY = this.ContainerSizeX = this.ContainerSizeY = 0;

        var cl_x = this.Clippers[j].getAttribute("data-ami-ui-scroller__cols");
        if (cl_x) this.ClipperSizeX = parseInt(cl_x);
        var cl_y = this.Clippers[j].getAttribute("data-ami-ui-scroller__rows");
        if (cl_y) this.ClipperSizeY = parseInt(cl_y);

        var cn_x = this.Container.getAttribute("data-ami-ui-scroller__cols");
        if (cn_x) this.ContainerSizeX = parseInt(cn_x);
        var cn_y = this.Container.getAttribute("data-ami-ui-scroller__rows");
        if (cn_y) this.ContainerSizeY = parseInt(cn_y);

        if (this.ContainerSizeX == 0 && this.ContainerSizeY == 0) // if not defined in attributes
        {
            var scroll_x = this.Container.getAttribute("data-ami-ui-scroller__scroll-x");
            if (scroll_x)
            {
                this.ContainerSizeY = this.ClipperSizeY;
                this.ContainerSizeX = Math.ceil( this.Slides.length / this.ContainerSizeY );
            }
            var scroll_y = this.Container.getAttribute("data-ami-ui-scroller__scroll-y");
            if (scroll_y)
            {
                this.ContainerSizeX = this.ClipperSizeX;
                this.ContainerSizeY = Math.ceil( this.Slides.length / this.ContainerSizeX );
            }
        }

        if (this.ClipperSizeX > 0)
            this.ClippersWidth[j] = this.ClipperSizeX * this.SlideWidth;
    },

    /**
     * Find html block with Word in classname, in Source
     *
     * @returns FIRST element with WordInClassName in css class
     */
    findFirstKeyBlock : function(WordInClassName, Source)
    {
        var node = Source || document;
        var list = node.getElementsByTagName('*');
        var length = list.length;
        for( var i = 0 ; i < length ; i++ )
        {
            if ( list[i].className.indexOf(WordInClassName) >= 0 )
            {
                return list[i];
            }
        }
        return false;
    },

    /**
     * Initializes arrows
     *
     * @j - current Scroller number
     */
    InitArrows : function(j, Up, Down)
    {
        if (this.ClipperSizeX < this.ContainerSizeX)
        {
            this.Container.style.left = '0px'; //this.Left[j].offsetWidth
            if (this.Left[j] && this.Right[j])
            {
                this.Clippers[j].style.marginLeft = this.Left[j].offsetWidth + 'px';
                this.Clippers[j].style.marginRight = this.Right[j].offsetWidth + 'px';
                this.Wrappers[j].style.width = (parseInt(this.Clippers[j].style.width) + this.Left[j].offsetWidth + this.Right[j].offsetWidth) + 'px';

                this.Left[j].style.visibility = 'hidden';
                this.Left[j].style.display = 'block';
                this.Left[j].style.margin = (this.SlideHeight * this.ClipperSizeY / 2 - this.Left[j].offsetHeight / 2) + 'px 0px 0px 0px';
                this.Left[j].style.visibility = 'visible';
                this.DisableArrow(this.Left[j]);
                this.Left[j].onclick = function(Container, SlideWidth, ClipperWidth, Left, Right)
                {
                    return function()
                    {
                        AMI.UI.Scroller.MoveToLeft(Container, SlideWidth, ClipperWidth, Left, Right);
                        return false;
                    }
                }(this.Container, this.SlideWidth, this.ClippersWidth[j], this.Left[j], this.Right[j])

                this.Right[j].style.visibility = 'hidden';
                this.Right[j].style.display = 'block';
                this.Right[j].style.margin = (this.SlideHeight * this.ClipperSizeY / 2 - this.Left[j].offsetHeight / 2) + 'px 0px 0px 0px';
                this.Right[j].style.visibility = 'visible';
                this.Right[j].onclick = function(Container, SlideWidth, ClipperWidth, Left, Right)
                {
                    return function()
                    {
                        AMI.UI.Scroller.MoveToRight(Container, SlideWidth, ClipperWidth, Left, Right);
                        return false;
                    }
                }(this.Container, this.SlideWidth, this.ClippersWidth[j], this.Left[j], this.Right[j])
            }
        }
        if (this.ClipperSizeY < this.ContainerSizeY)
        {
            this.Container.style.top = '0px'; //Up.offsetHeight +

            if (Up && Down)
            {
                this.Clippers[j].style.marginTop = Up.offsetHeight + 'px';
                this.Clippers[j].style.marginBottom = Down.offsetHeight + 'px';
                this.Wrappers[j].style.height = (this.Clippers[j].offsetHeight + Up.offsetHeight + Down.offsetHeight) + 'px';

                Up.style.visibility = 'hidden';
                Up.style.display = 'block';
                Up.style.margin = '0px 0px 0px ' + (this.SlideWidth * this.ClipperSizeX / 2 - Up.offsetWidth / 2) + 'px';
                Up.style.visibility = 'visible';
                this.DisableArrow(Up);
                Up.onclick = function(Container, SlideHeight, ClipperHeight, Up, Down)
                {
                    return function()
                    {
                        AMI.UI.Scroller.MoveToUp(Container, SlideHeight, ClipperHeight, Up, Down);
                        return false;
                    }
                }(this.Container, this.SlideHeight, this.ClipperSizeY * this.SlideHeight, Up, Down)
                Down.style.visibility = 'hidden';
                Down.style.display = 'block';
                Down.style.margin = '0px 0px 0px ' + (this.SlideWidth * this.ClipperSizeX / 2 - Down.offsetWidth / 2) + 'px';
                Down.style.visibility = 'visible';
                Down.onclick = function(Container, SlideHeight, ClipperHeight, Up, Down)
                {
                    return function()
                    {
                        AMI.UI.Scroller.MoveToDown(Container, SlideHeight, ClipperHeight, Up, Down);
                        return false;
                    }
                }(this.Container, this.SlideHeight, this.ClipperSizeY * this.SlideHeight, Up, Down)
            }
        }
    },

    /**
     * Moving slider to the left
     */
    MoveToLeft : function(Container, SlideWidth, ClipperWidth, Left, Right)
    {
        this.EnableArrow(Right);
        if (!this.ArrowIsDisabled(Left))
        {
            var x = parseFloat(Container.style.left);
            var ContainerWidth = Container.offsetWidth; // without padding  - Left.offsetWidth - Right.offsetWidth
            if (typeof x != 'number' || isNaN(x))
                x = 0;//Left.offsetWidth

            var distance = Math.max( ClipperWidth - SlideWidth, SlideWidth );
            distance = Math.min( distance, 0 - x );//Left.offsetWidth
            Container.style.left = (x + distance) + "px";
            if ((Container.style.left === '') || (parseInt(Container.style.left) >= 0))
                this.DisableArrow(Left);
        }
    },

    /**
     * Moving slider to the right
     */
    MoveToRight : function(Container, SlideWidth, ClipperWidth, Left, Right)
    {
        this.EnableArrow(Left);
        var RightArrowIsEnabled = !this.ArrowIsDisabled(Right);
        if (RightArrowIsEnabled)
        {
            var x = parseFloat(Container.style.left);
            var ContainerWidth = Container.offsetWidth; // without padding - Left.offsetWidth - Right.offsetWidth
            if (typeof x != 'number' || isNaN(x))
            {
                x = 0;//Left.offsetWidth
                //Container.style.left = x + 'px';
            }

            var distance = Math.max( ClipperWidth - SlideWidth, SlideWidth );
            distance = Math.min( distance, ContainerWidth + x - ClipperWidth ); //+ Right.offsetWidth
            Container.style.left = (x - distance) + "px";
            if ( ContainerWidth + parseInt(Container.style.left) <= ClipperWidth)
                this.DisableArrow(Right);
        }
    },

    /**
     * Moving slider to the up
     */
    MoveToUp : function(Container, SlideHeight, ClipperHeight, Up, Down)
    {
        this.EnableArrow(Down);
        if (!this.ArrowIsDisabled(Up))
        {
            var x = parseFloat(Container.style.top);
            var ContainerHeight = Container.clientHeight; // without padding - Up.offsetHeight - Down.offsetHeight
            if (typeof x != 'number' || isNaN(x))
                x = 0;//Up.offsetHeight

            var distance = Math.max( ClipperHeight - SlideHeight, SlideHeight );
            distance = Math.min( distance, 0 - x );//Up.offsetHeight
            Container.style.top = (x + distance) + "px";
            if ((Container.style.top === '') || (parseInt(Container.style.top) >= 0))
                this.DisableArrow(Up)
        }
    },

    /**
     * Moving slider to the down
     */
    MoveToDown : function(Container, SlideHeight, ClipperHeight, Up, Down)
    {
        this.EnableArrow(Up);
        if (!this.ArrowIsDisabled(Down))
        {
            var x = parseFloat(Container.style.top);
            var ContainerHeight = Container.clientHeight; // without padding - Up.offsetHeight - Down.offsetHeight
            if (typeof x != 'number' || isNaN(x))
            {
                x = 0;//Down.offsetHeight
                //Container.style.top = x + 'px';
            }

            var distance = Math.max( ClipperHeight - SlideHeight, SlideHeight );
            distance = Math.min( distance, ContainerHeight + x - ClipperHeight );// + Up.offsetHeight
            Container.style.top = (x - distance) + "px";

            if ( ContainerHeight + parseInt(Container.style.top) <= ClipperHeight)
                this.DisableArrow(Down);
        }
    },

    /**
     * return true if arrow is disabled or false if it enabled and can be clicked
     */
    ArrowIsDisabled : function ( Arrow )
    {
        if (Arrow.className != 'undefined')
            return (Arrow.className.indexOf(this.DisabledArrow) >= 0);
        else
            return false;
    },

    /**
     * Adding css modifier DisabledArrow to className, if enabled
     */
    DisableArrow : function( Arrow )
    {
        if (Arrow.className != 'undefined' && !this.ArrowIsDisabled(Arrow))
        {
            Arrow.className += " " + this.DisabledArrow; // pre-space + modifier
        }
    },

    /**
     * Deleting css modifier DisabledArrow from className, if disabled
     */
    EnableArrow : function( Arrow ) {
        if (Arrow.className != 'undefined' && this.ArrowIsDisabled(Arrow)) {
            var pos = Arrow.className.indexOf(this.DisabledArrow);
            var res = Arrow.className.slice(pos - 1, pos + this.DisabledArrow.length); // -1 for pre-space
            Arrow.className = Arrow.className.replace(new RegExp(res,'g'), '');
        }
    },

    /**
     * Getting X size of Clipper by css modifier (_cols_x)
     *
     * @element_defining_cols - element with _cols_x in css classname
     */
    getCols : function( element_defining_cols )
    {
        var ColsPos = element_defining_cols.className.indexOf(this.ColsModifierPrefix); // Position of value of cols modifier
        if (typeof ColsPos != 'undefined' && ColsPos > -1) // ColsPos is set
        {
            ColsPos += this.ColsModifierPrefix.length; // Position of number of cols
            var cols = parseInt(element_defining_cols.className.slice(ColsPos, ColsPos + 2));
            if (typeof cols === 'number' && cols > 0)
                return cols;
        }
        return -1; // default - one row
    }
}


AMI.$(document).ready(function(){ AMI.UI.Scroller.init(); });

/*
 * FILE END: _shared/code/js/ami.ui.scroller.js
 */

/*
 * FILE START: _shared/code/js/ami.final.js
 */

AMI.UI.MediaBox.PageImages = {
    aGroups: {},
    groupsNumber: 0,

    init: function(){
        AMI.Browser.Event.addHandler(window, 'load', function(){AMI.UI.MediaBox.PageImages.onLoadHandler()});
        AMI.Message.addListener('ON_AMI_MEDIABOX_GROUPS_NUMBER', function(oResponse){AMI.UI.MediaBox.PageImages.getGroupsNumber(oResponse)});
        AMI.Message.addListener('ON_AMI_MEDIABOX_GET_GROUP', function(oData, oResponse){AMI.UI.MediaBox.PageImages.getGroup(oData, oResponse)});
    },

    getImageLink: function(imageLink){
        if(!/^https?:\/\//.test(imageLink)){
            imageLink = frontBaseHref + imageLink;
        }
        return imageLink;
    },

    onLoadHandler: function(){
        var aImages = AMI.find('img');
        for(var i = 0; i < aImages.length; i++){
            var popupImage = aImages[i].getAttribute('data-ami-mbpopup');
            if(popupImage != null && popupImage != ''){
                popupImage = this.getImageLink(popupImage);
                aImages[i].setAttribute('data-ami-mbpopup', popupImage);

                /*
                 AMI.Browser.Event.addHandler(aImages[i], 'mouseover', function(evt){AMI.Browser.Event.getTarget(evt).style.cursor = 'pointer'});
                 AMI.Browser.Event.addHandler(aImages[i], 'mouseout', function(evt){AMI.Browser.Event.getTarget(evt).style.cursor = 'default'});
                 */
                AMI.Browser.Event.addHandler(aImages[i], 'click', function(evt){AMI.UI.MediaBox.openFromObject(AMI.Browser.Event.getTarget(evt))});
            }

            var group = aImages[i].getAttribute('data-ami-mbgrp');
            if(group != null && group != '' && popupImage != null && popupImage != ''){
                if(typeof(this.aGroups[group]) == 'undefined'){
                    this.aGroups[group] = [];
                    this.groupsNumber ++;
                }
                this.aGroups[group].push(aImages[i]);
            }

            var overImage = aImages[i].getAttribute('data-ami-mbover');
            if(overImage != null && overImage != ''){
                overImage = this.getImageLink(overImage);
                aImages[i].setAttribute('data-ami-mbover', overImage);
                AMI.Browser.Event.addHandler(aImages[i], 'mouseover', function(evt){AMI.UI.OverImage.onOver(evt)});
                AMI.Browser.Event.addHandler(aImages[i], 'mouseout', function(evt){AMI.UI.OverImage.onOut(evt)});
                AMI.Browser.Event.addHandler(aImages[i], 'click', function(evt){AMI.UI.OverImage.stopWaiting(evt)});
            }
        }
    },

    getGroupsNumber: function(oResponse){
        oResponse.result = this.groupsNumber;
        return true;
    },

    getGroup: function(oData, oResponse){
        var groupName = oData.groupName;
        if(typeof(this.aGroups[groupName]) != 'undefined'){
            oResponse.aGroupImages = this.aGroups[groupName];
        }

        return true;
    }
}
AMI.UI.MediaBox.PageImages.init();

/* Stars Rating Like */

amiRatingLike = {
    checkLikeForm: function() {
        if(AMI.Browser.Cookie.get('moduleRatingsValue') != null && AMI.$('.rating__like-form').length != 0) {
            moduleName = AMI.$('[data-module-name]').eq(0).attr('data-module-name');
            for(i=0;i<AMI.$('[data-ami-rating-id]').length;i++) {
                for(j=0;j<AMI.Browser.Cookie.get('moduleRatingsValue').split('|').length;j++) {
                    if (AMI.Browser.Cookie.get('moduleRatingsValue').split('|')[j].indexOf(moduleName) >= 0) {
                        for(n=0;n<AMI.Browser.Cookie.get('moduleRatingsValue').split('|')[j].split(':')[1].split(';').length;n++) {
                            if(AMI.Browser.Cookie.get('moduleRatingsValue').split('|')[j].split(':')[1].split(';')[n].split(',')[0] == AMI.$('[data-ami-rating-id]').eq(i).attr('data-ami-rating-id')) {
                                AMI.$('[data-ami-rating-id] .rating-like__form-block').eq(i).attr('title', AMI.$('[data-ami-rating-id] .rating-like__form-block').eq(i).attr('data-already-like'));
                                AMI.$('[data-ami-rating-id] .rating-like__form-block').eq(i).removeClass('rating-like__form-block-on');
                                AMI.$('[data-ami-rating-id] .rating-like__form-block').eq(i).addClass('rating-like__form-block-off');
                                AMI.$('[data-ami-rating-id] .rating-like__form-block').eq(i).removeAttr('onclick');
                                if(AMI.Browser.Cookie.get('moduleRatingsValue').split('|')[j].split(':')[1].split(';')[n].split(',')[2] > AMI.$('[data-ami-rating-id]').eq(i).attr('data-rating-votes-count')) {
                                    AMI.$('[data-ami-rating-id] .rating-like__form-block__like-count').eq(i).text(AMI.Browser.Cookie.get('moduleRatingsValue').split('|')[j].split(':')[1].split(';')[n].split(',')[2]);
                                    AMI.$('[data-ami-rating-id] .rating-like__form-block__like-count').eq(i).removeAttr('style');
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    ajaxLikeSubmit: function(id, module_name) {
        AMI.$('#rating-like'+id).css('visibility', 'hidden');
        AMI.$('#rating-like'+id).after('<div class="like__ajax-loader"></div>');
        AMI.HTTPRequest.submitForm('POST', document.forms['rating'+id], {is_ajax: true}, function(status, data){
            if(data){
                var parts = data.split('|');
                var cookieString = parts[0];
                var cookieLifetime = parts[1];
                var ratingBlock = parts[2];
                var votesBlock = parts[3];
                var statusMsg = parts[4];
                var isError = parts[5];

                if(AMI.$('#rating-like'+id+' .rating-like__form-popup').length == 0) {
                    AMI.$('#rating-like'+id).after('<div class="rating-like__form-popup" id="rating-like5__popup" style="display: none;"><div class="rating-like__form-popup__txt"></div><span class="rating-like__form-popup__arrow"></span></div>');
                }

                if(isError == '1') {
                    AMI.$('#rating-like'+id).removeClass('rating-like__form-block-on');
                    AMI.$('#rating-like'+id).addClass('rating-like__form-block-off');
                    AMI.$('#rating-like'+id).removeAttr('onclick');
                    AMI.$('#rating-like'+id).attr('title', AMI.$('#rating-like'+id).attr('data-already-like'));
                    AMI.$('#rating__like-form'+id).find('.rating-like__form-popup__txt').text(AMI.$('#rating-like'+id).attr('data-already-like'));
                } else {
                    AMI.$('#votes_block'+id).replaceWith(votesBlock);
                    AMI.$('#rating-like__count'+id).text(AMI.$('#votes_block'+id).text());
                    AMI.$('#rating-like__count'+id).removeAttr('style');
                    AMI.$('#rating-like'+id).attr('title', AMI.$('#rating-like'+id).attr('data-already-like'));
                    AMI.$('#rating-like'+id).removeClass('rating-like__form-block-on');
                    AMI.$('#rating-like'+id).addClass('rating-like__form-block-off');
                    AMI.$('#rating-like'+id).removeAttr('onclick');
                    AMI.$('#rating__like-form'+id).find('.rating-like__form-popup__txt').text(AMI.$('#rating-like'+id).attr('data-like-thanks'));
                }

                AMI.$('#rating__like-form'+id+' .rating-like__form-popup').css('top', -AMI.$('#rating__like-form'+id+' .rating-like__form-popup').height()-10+'px');
                AMI.$('#rating-like'+id).css('visibility', 'visible');
                AMI.$('#rating__like-form'+id).find('.rating-like__form-popup').fadeIn();
                setTimeout(function() {AMI.$('#rating__like-form'+id).find('.rating-like__form-popup').fadeOut()}, 2000);
                AMI.$('#rating__like-form'+id).find('.like__ajax-loader').fadeOut();

                if(AMI.Browser.Cookie.get('moduleRatingsValue') == null) {
                    AMI.Browser.Cookie.set('moduleRatingsValue', module_name+':'+id+','+AMI.$('#rating_block'+id).text()+','+AMI.$('#votes_block'+id).text(), cookieLifetime);
                } else if(AMI.Browser.Cookie.get('moduleRatingsValue').indexOf(module_name) >= 0) {
                    AMI.Browser.Cookie.set('moduleRatingsValue', AMI.Browser.Cookie.get('moduleRatingsValue').replace(module_name+':', module_name+':'+id+','+AMI.$('#rating_block'+id).text()+','+AMI.$('#votes_block'+id).text()+';'), cookieLifetime);
                } else {
                    AMI.Browser.Cookie.set('moduleRatingsValue', AMI.Browser.Cookie.get('moduleRatingsValue')+'|'+module_name+':'+id+','+AMI.$('#rating_block'+id).text()+','+AMI.$('#votes_block'+id).text(), cookieLifetime);
                }
            }
        });
    },
    ratingLikeSubmit: function(id, confirm_register, module_name) {
        if(confirm_register == 'true'){
            alert(AMI.$('#rating-like'+id).attr('data-like-register'));
            return false;
        }
        document.forms['rating'+id].rating.value = 1;
        if(AMI.$('#votes_block'+id).length == 0) {
            AMI.$('#rating__like-form'+id).after('<span style="display: none;" id="votes_block'+id+'">1</span>');
        }
        amiRatingLike.ajaxLikeSubmit(id, module_name);
    }
}
AMI.$(function() {amiRatingLike.checkLikeForm();});

/* End Rating Like */

/* Start Rating Stars Oneblock */

ratingStarsOneblock = {
    getOffsetLeftStars: function(el){
        var ol = el.offsetLeft;
        while ((el = el.offsetParent) != null) ol += el.offsetLeft;
        return ol;
    },
    onRatingOverStars: function(event){
        if (event.target){
            oElement = event.target;
        }else{
            oElement = event.srcElement;
        }
        var num = parseInt(((event.clientX + document.body.scrollLeft - 3 - ratingStarsOneblock.getOffsetLeftStars(oElement)) / oElement.offsetWidth) * 5) + 1;
        oElement.src="_img/rating/medium_stars/stars"+num+".gif";
    },
    onRatingClearStars: function(event){
        if (event.target){
            oElement = event.target;
        }else{
            oElement = event.srcElement;
        }
        var idRating = AMI.$(oElement).attr('data-ami-img-rating-id');
        if(document.forms['rating'+idRating].rating.value!=''){
            oElement.src="_img/rating/medium_stars/stars"+(parseInt(document.forms['rating'+idRating].rating.value)+1)+".gif";
        }else{
            oElement.src="_img/spacer.gif";
        }
    },
    onRatingSetStars: function(event, confirm_register, module_name){
        if (event.target){
            oElement = event.target;
        }else{
            oElement = event.srcElement;
        }
        var idRating = AMI.$(oElement).attr('data-ami-img-rating-id');
        if(confirm_register == 'true'){
            alert(AMI.$('.rating-stars__form-votes').eq(0).attr('data-stars-register'));
            return false;
        }
        var num = parseInt(((event.clientX  + document.body.scrollLeft - 3 - ratingStarsOneblock.getOffsetLeftStars(oElement)) / oElement.offsetWidth) * 5) + 1;
        oElement.style.cursor = 'default';
        document.forms['rating'+idRating].rating.value = num - 1;

        if(AMI.$('#rating_block'+idRating == false)) {
            AMI.$('#rating__stars-form'+idRating).after('<span style="display: none;" data-ami-rating'+idRating+'="1" id="rating_block'+idRating+'"></span>');
            AMI.$('#rating__stars-form'+idRating).after('<span style="display: none;" id="votes_block'+idRating+'"></span>');
        }
        ratingStarsOneblock.ajaxCheckStars(idRating, module_name);
    },
    checkRatingFormStars: function() {
        if(AMI.Browser.Cookie.get('moduleRatingsValue') != null && AMI.$('.rating__stars-form').length != 0) {
            moduleName = AMI.$('[data-module-name]').eq(0).attr('data-module-name');
            for(i=0;i<AMI.$('[data-ami-rating-id]').length;i++) {
                for(j=0;j<AMI.Browser.Cookie.get('moduleRatingsValue').split('|').length;j++) {
                    if (AMI.Browser.Cookie.get('moduleRatingsValue').split('|')[j].indexOf(moduleName) >= 0) {
                        for(n=0;n<AMI.Browser.Cookie.get('moduleRatingsValue').split('|')[j].split(':')[1].split(';').length;n++) {
                            if(AMI.Browser.Cookie.get('moduleRatingsValue').split('|')[j].split(':')[1].split(';')[n].split(',')[0] == AMI.$('[data-ami-rating-id]').eq(i).attr('data-ami-rating-id')) {
                                AMI.$('[data-ami-rating-id] .rating-stars__form-votes').eq(i).attr('title', AMI.$('[data-ami-rating-id] .rating-stars__form-votes').eq(i).attr('data-already-stars'));
                                AMI.$('[data-ami-rating-id] .rating-stars__form-block').eq(i).css('display', 'none');
                                if(AMI.Browser.Cookie.get('moduleRatingsValue').split('|')[j].split(':')[1].split(';')[n].split(',')[2] > AMI.$('[data-ami-rating-id]').eq(i).attr('data-rating-votes-count')) {
                                    AMI.$('[data-ami-rating-id] .rating-stars__rate-area').eq(i).text(AMI.$('[data-ami-rating-id] .rating-stars__votes-area').eq(i).attr('data-rates-title')+': '+AMI.Browser.Cookie.get('moduleRatingsValue').split('|')[j].split(':')[1].split(';')[n].split(',')[1]);
                                    AMI.$('[data-ami-rating-id] .rating-stars__votes-area').eq(i).text('('+AMI.$('[data-ami-rating-id] .rating-stars__votes-area').eq(i).attr('data-votes-rates-title')+': '+AMI.Browser.Cookie.get('moduleRatingsValue').split('|')[j].split(':')[1].split(';')[n].split(',')[2]+')');
                                    AMI.$('[data-ami-rating-id] .rating-stars__form-votes').eq(i).css('background-image', 'url(_img/rating/medium_stars/stars'+Math.round(AMI.Browser.Cookie.get('moduleRatingsValue').split('|')[j].split(':')[1].split(';')[n].split(',')[1])+'.gif)');
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    ajaxCheckStars: function(idRating, module_name) {
        AMI.HTTPRequest.submitForm('POST', document.forms['rating'+idRating], {is_ajax: true}, function(status, data){
            if(data){
                var parts = data.split('|');
                var cookieString = parts[0];
                var cookieLifetime = parts[1];
                var ratingBlock = parts[2];
                var votesBlock = parts[3];
                var statusMsg = parts[4];
                var isError = parts[5];

                if(isError == '1') {
                    AMI.$('#rating-stars__form-votes'+idRating).attr('title', statusMsg);
                    AMI.$('#rating_value'+idRating).css('display', 'none');
                } else {
                    AMI.$('#rating_block'+idRating).replaceWith(ratingBlock);
                    AMI.$('#votes_block'+idRating).replaceWith(votesBlock);
                    AMI.$('#rating-stars__rate-block-count'+idRating).html(AMI.$('#rating_block'+idRating).text());
                    AMI.$('#rating-stars__rate-block-count-votes'+idRating).html(AMI.$('#votes_block'+idRating).text());
                    AMI.$('#rating-stars__form-votes'+idRating).attr('title', AMI.$('#rating_block'+idRating).text());
                    AMI.$('#rating-stars__rate-block-status'+idRating).html('<span class="rating-stars__rate-on">'+AMI.$('.rating-stars__form-votes').eq(0).attr('data-stars-thanks')+'</span>');
                    AMI.$('#rating-stars__form-votes'+idRating).css('background-image', 'url(_img/rating/medium_stars/stars'+Math.round(AMI.$('#rating_block'+idRating).attr('data-ami-rating'+idRating))+'.gif)');
                    AMI.$('#rating_value'+idRating).css('display', 'none');
                }
                if(AMI.Browser.Cookie.get('moduleRatingsValue') == null) {
                    AMI.Browser.Cookie.set('moduleRatingsValue', module_name+':'+idRating+','+AMI.$('#rating_block'+idRating).attr('data-ami-rating'+idRating)+','+AMI.$('#votes_block'+idRating).attr('data-ami-votes'+idRating), cookieLifetime);
                } else if(AMI.Browser.Cookie.get('moduleRatingsValue').indexOf(module_name) >= 0) {
                    AMI.Browser.Cookie.set('moduleRatingsValue', AMI.Browser.Cookie.get('moduleRatingsValue').replace(module_name+':', module_name+':'+idRating+','+AMI.$('#rating_block'+idRating).attr('data-ami-rating'+idRating)+','+AMI.$('#votes_block'+idRating).attr('data-ami-votes'+idRating)+';'), cookieLifetime);
                } else {
                    AMI.Browser.Cookie.set('moduleRatingsValue', AMI.Browser.Cookie.get('moduleRatingsValue')+'|'+module_name+':'+idRating+','+AMI.$('#rating_block'+idRating).attr('data-ami-rating'+idRating)+','+AMI.$('#votes_block'+idRating).attr('data-ami-votes'+idRating), cookieLifetime);
                }
            }
        });
    }
}
AMI.$(function() {ratingStarsOneblock.checkRatingFormStars();});

/* End Rating Stars Oneblock */

/* Start Photoalbum 6.0 */

if(location.href.indexOf('?fullscreen=on') >= 0) {
    AMI.$('html').css({background: '#000', position: 'absolute', left: '-5000px'});
    AMI.$(document).ready(function(){
        showFullScreenImg();
        AMI.$('html').removeAttr('style');
    });
}

function showFullScreenImg(show) {
    if(AMI.$('#photo-itemd').hasClass('fullscreen-img__off') && show != 'close') {
        AMI.$('#photo-itemd').removeClass('fullscreen-img__off');
        AMI.$('#photo-itemd').addClass('fullscreen-img__on');
        AMI.$('#next-link__img').attr('href', AMI.$('#next-link__img').attr('href')+'?fullscreen=on');
        AMI.$('#prev-link__img').attr('href', AMI.$('#prev-link__img').attr('href')+'?fullscreen=on');
        AMI.$('.photoalbum_item-detail__img').css({top: '50%', marginTop: -AMI.$('.photoalbum_item-detail__img').attr('data-amiphoto-height')/2+'px'});
    } else {
        AMI.$('#photo-itemd').removeClass('fullscreen-img__on');
        AMI.$('#photo-itemd').addClass('fullscreen-img__off');
        AMI.$('#next-link__img').attr('href', AMI.$('#next-link__img').attr('data-link'));
        AMI.$('#prev-link__img').attr('href', AMI.$('#prev-link__img').attr('data-link'));
        AMI.$('.photoalbum_item-detail__img').removeAttr('css');
    }
}

amiPhotoalbum = function(photoBlock, photoRow, photoRowItem, photoRowItemContant, photoRowItemImg) {
    AMI.$('.'+photoRowItemImg).each(function(i){ AMI.$(this).height(AMI.$(this).height()/1.2);});
    photoRowItemOb = AMI.$('.'+photoRowItem);

    photoRowItemOb.each(function(){
        if(AMI.$(this).parent().hasClass(photoBlock)) {
            AMI.$(this).addClass(photoRowItem+parseInt(AMI.$(this).offset().top));
        }
    });

    nameClassRow = '';
    photoRowItemOb.each(function(i){
        offsetTop = parseInt(AMI.$(this).offset().top);
        if(AMI.$(this).next()[0] == undefined) {
            if(nameClassRow == '') {
                nameClassRow += offsetTop;
            } else {
                nameClassRow += ','+offsetTop;
            }
        } else {
            if(offsetTop != parseInt(AMI.$(this).next().offset().top)) {
                if(nameClassRow == '') {
                    nameClassRow += offsetTop;
                } else {
                    nameClassRow += ','+offsetTop;
                }
            }
        }
    });

    for(i=0;i<nameClassRow.split(',').length;i++) {
        AMI.$('.'+photoRowItem+nameClassRow.split(',')[i]).wrapAll('<div class="'+photoRow+'"></div>');
    }

    containerBlock = AMI.$('.'+photoBlock);
    containerRow = AMI.$('.'+photoRow);
    containerRowCount = AMI.$('.'+photoRow).length;
    border = (AMI.$('.'+photoRowItemContant).eq(0).outerWidth()-AMI.$('.'+photoRowItemContant).eq(0).width());

    containerRow.each(function(k){
        if(AMI.$(this).parent().hasClass(photoBlock)) {
            mediumHeight = 0;
            imgWidth = 0;

            countItems = AMI.$(this).children().length;

            AMI.$(this).find('.'+photoRowItemImg).each(function(){
                if(AMI.$(this).height() > mediumHeight) {
                    mediumHeight = AMI.$(this).height();
                } else {
                    minHeight = AMI.$(this).height();
                }
            });

            if(k+1 == containerRowCount) {
                if(AMI.$('.'+photoBlock).hasClass('photoalbum_item-cat-list') == true) {
                    AMI.$(this).find('.'+photoRowItemImg).height(Math.ceil(minHeight));
                    AMI.$(this).find('.'+photoRowItemImg).parent().parent().height(Math.ceil(minHeight));
                    AMI.$(this).find('.'+photoRowItemImg).parent().parent().width(AMI.$(this).find('.'+photoRowItemImg).width());
                } else {
                    if(countItems > 1) {
                        AMI.$(this).find('.'+photoRowItemImg).height(Math.ceil(minHeight));
                        AMI.$(this).find('.'+photoRowItemImg).parent().parent().height(Math.ceil(minHeight));
                    }
                }
            } else {
                AMI.$(this).find('.'+photoRowItemImg).height(minHeight);
                AMI.$(this).find('.'+photoRowItemImg).parent().parent().height(minHeight);
                AMI.$(this).find('.'+photoRowItemImg).each(function(){ imgWidth = imgWidth + AMI.$(this).width() });
                AMI.$(this).find('.'+photoRowItemImg).each(function(){
                    AMI.$(this).height(Math.ceil(AMI.$(this).height()*((containerBlock.width()-border*countItems+2)/imgWidth)));
                    AMI.$(this).parent().parent().height(AMI.$(this).height());
                    AMI.$(this).parent().parent().width(AMI.$(this).width());
                });
            }
        }
    });
}

amiPhotoCatImgRotate = {
    imagesRotateOn: function(col) {
        var currentImage = (AMI.$('.cat-row__images-block__slider:eq('+col+') img.show')?  AMI.$('.cat-row__images-block__slider:eq('+col+') img.show') : AMI.$('.cat-row__images-block__slider:eq('+col+') img:first').next());
        var nextImage = ((currentImage.next().length) ? ((currentImage.next().hasClass('show')) ? AMI.$('.cat-row__images-block__slider:eq('+col+') img:first') :currentImage.next()) : AMI.$('.cat-row__images-block__slider:eq('+col+') img:first').next());

        nextImage.css({opacity: 0.0})
            .addClass('show')
            .css('margin-left', -nextImage.width()/2)
            .animate({opacity: 1.0}, 1000);
        currentImage.animate({opacity: 0.0}, 1000)
            .removeClass('show');
    },
    imagesRotateToFirst: function(col) {
        clearInterval(startRotate);
        var firstImage = AMI.$('.cat-row__images-block__slider:eq('+col+') img:first');
        var currentImage = (AMI.$('.cat-row__images-block__slider:eq('+col+') img.show')?  AMI.$('.cat-row__images-block__slider:eq('+col+') img.show') : AMI.$('.cat-row__images-block__slider:eq('+col+') img:first'));
        if(currentImage.prev().length) {
            currentImage.removeClass('show');
            currentImage.animate({opacity: 0.0}, 1000);
            firstImage.animate({opacity: 1.0}, 1000)
                .addClass('show');
        }
    },
    imagesRotate: function(col) {
        if(AMI.$('.cat-row__images-block__slider:eq('+col+') img').css('opacity') == '1') {
            AMI.$('.cat-row__images-block__slider:eq('+col+') img').css({opacity: 0.0});
            AMI.$('.cat-row__images-block__slider:eq('+col+') img:first').css({opacity: 1.0});
            amiPhotoCatImgRotate.imagesRotateOn(col);
            startRotate = setInterval('amiPhotoCatImgRotate.imagesRotateOn('+col+')', 1500);
        }
    }
}

AMI.$(window).load(
    function() {
        if(AMI.$('.amiphoto-block').length > 0) {
            amiPhotoalbum('amiphoto-block', 'amiphoto-block__row', 'amiphoto-block__row-item', 'amiphoto-block__row-item__contant', 'amiphoto-block__row-item__img');
            AMI.$('.amiphoto-hide').fadeOut();
            if(AMI.$('.cat-row__images-block').length > 0) {
                for(i=0;i<AMI.$('.cat-row__images-block').length;i++) {
                    AMI.$('.cat-row__images-block').eq(i).attr('ami-id-img-block', +i);
                    var catImg = AMI.$('.cat-row__images-block').eq(i).find('.amiphoto-block__row-item__img').eq(0);
                    var catImgWidth = AMI.$('.cat-row__images-block').eq(i).find('.amiphoto-block__row-item__img').eq(0).width();
                    AMI.$('.cat-row__images-block').eq(i).html('');
                    AMI.$('.cat-row__images-block').eq(i).append('<div class="cat-row__images-block__slider"></div>');
                    AMI.$('.cat-row__images-block .cat-row__images-block__slider').eq(i).append("<img style='height: "+catImg.height()+"px; margin-left: -"+catImgWidth/2+"px;' src="+catImg.attr('src')+" class='amiphoto-block__row-item__img show' />");
                    for(k=0;k<AMI.$('.photoalbum_item-cat-row').eq(i).find('.photoalbum_item-list__subitem-list .amiphoto-block__row-item__img').length;k++) {
                        AMI.$('.cat-row__images-block .cat-row__images-block__slider').eq(i).append("<img style='height: "+AMI.$('.cat-row__images-block').eq(i).find('.amiphoto-block__row-item__img').eq(0).height()+"px' src="+AMI.$('.photoalbum_item-list__subitem-list').eq(i).find('.amiphoto-block__row-item__img').eq(k).attr('src')+" class='amiphoto-block__row-item__img' />");
                    }
                    if(AMI.$('.cat-row__images-block').eq(i).find('.cat-row__images-block__slider img').length > 2) {
                        AMI.$('.cat-row__images-block').eq(i).hover(
                            function(){
                                amiPhotoCatImgRotate.imagesRotate(AMI.$(this).attr('ami-id-img-block'));
                            },
                            function(){
                                amiPhotoCatImgRotate.imagesRotateToFirst(AMI.$(this).attr('ami-id-img-block'));
                            });
                    }
                }
            }
            AMI.$('#photoalbum_itemd__img').fadeIn();
            AMI.$(document).keyup(function(e) {
                if (e.keyCode == 27) {
                    showFullScreenImg('close');
                }
            });
            if(AMI.$('.amiphotoalbum .browse-item-list__hide').length > 0) {
                AMI.$('#slider-nav__browse-pad').removeClass('null-width');
                AMI.$('.browse-item-list__hide').fadeOut();
            }
        }
    }
);

/* End Photoalbum 6.0 */

/*
 * FILE END: _shared/code/js/ami.final.js
 */

/*
 * FILE START: _js/common.js
 */

﻿// Cmall functions

var eshop_properties_view = 'select'; // radio, select, table

// user's functions

function isIE5() { return (navigator.userAgent.indexOf("MSIE 5") > -1); }
function isIE6() { return ((navigator.userAgent.indexOf("MSIE 6") > -1) && (navigator.userAgent.indexOf("Opera") == -1)); }
function isIE() { return (isIE5() || isIE6());}

function fixpng()
{
    for (var i = 0; i < document.images.length; i++)
    {
        var img = document.images[i];
        imgSrc = img.src;
        if (imgSrc.substr(imgSrc.length-3).toLowerCase() == "png")
        {
            var w, h;
            w = img.width, h = img.height;
            img.src = "_mod_files/ce_images/spacer.gif";
            img.width = w, img.height = h;
            img.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'" + imgSrc + "\', sizingMethod='scale');";
        }
    }
}

var isIE = isIE();
if (isIE) window.attachEvent("onload", fixpng);






var oAlertWindow;
var oAlertWindowTimer;

function showInitAlert(){
    oAlertWindow = document.getElementById('status_message');
    if (oAlertWindow){
        var oLocalMessage = document.getElementById('status_message_local');
        if(oLocalMessage && (oAlertWindow.className == 'status_error')){
            oLocalMessage.style.display = 'none';
        }
        alert(oAlertWindow.innerHTML);
    }
}


function alert(message){
    if(!message || (message == '')){
        return false;
    }
    oAlertWindow = document.getElementById('status_message');
    if (!oAlertWindow){
        oAlertWindow = AMI.Browser.DOM.create('DIV', 'status_message', 'status_notice', '', document.body);
    }
    if((oAlertWindow.innerHTML != '') && (oAlertWindow.style.visibility == 'visible')){
        if(oAlertWindow.innerHTML != message){
            oAlertWindow.innerHTML += '<br>' + message;
        }
    }else{
        oAlertWindow.innerHTML = message;

        if(!oAlertWindow.onmouseover) oAlertWindow.onmouseover = function(){
            window.clearTimeout(oAlertWindowTimer);
        }
        if(!oAlertWindow.onmouseout) oAlertWindow.onmouseout = function(){
            window.setTimeout(function(oObj){return function(){fadeOut(oObj, 1000)}}(oAlertWindow), 1000);
        }
        if (navigator.userAgent.indexOf("MSIE") >= 0) {
        }
        else {
            oAlertWindow.style.left = parseInt((AMI.Browser.getWindowWidth() - oAlertWindow.offsetWidth) / 2);
        }
        fadeIn(oAlertWindow, 300);
    }
    window.clearTimeout(oAlertWindowTimer);
    oAlertWindowTimer = window.setTimeout(function(oObj){return function(){fadeOut(oObj, 1000)}}(oAlertWindow), 4000);
}

function fadeOut(oObj, time){
    var delay = 50;
    if(time==null){
        var time = 500;
    }
    alert( parseFloat(oObj.style.opacity) + ' - ' + parseFloat(oObj.style.opacity) +' / ' + (time / delay) + ' = ' + parseFloat(oObj.style.opacity) - (parseFloat(oObj.style.opacity) / (time / delay)));
    if(time > 0){
        time -= delay;
        oObj.style.opacity = parseFloat(oObj.style.opacity) - ( parseFloat(oObj.style.opacity) / (time / delay) );
        window.setTimeout(function(_oObj, _time ){return function(){fadeOut(_oObj, _time)}}(oObj, time), delay);
    }else{
        oObj.style.opacity = '1';
        oObj.style.visibility = 'hidden';
    }
}

function fadeIn(oObj, time){
    var delay = 50;
    if(oObj.style.visibility != 'visible'){
        oObj.style.visibility = 'visible';
        oObj.style.opacity = '0';
    }
    if(time==null){
        var time = 500;
    }
    if(time > 0){
        time -= delay;
        oObj.style.opacity = parseFloat(oObj.style.opacity) + (1 - parseFloat(oObj.style.opacity)) / (time / delay);
        window.setTimeout(function(_oObj, _time){return function(){fadeIn(_oObj, _time)}}(oObj, time), delay);
    }
}

// addOnLoadEvent(showInitAlert);
savePreviousOnLoadEvent();

// menu.js

function load(location){
    if(document.images){
        var image = new Image();
        image.src = location;
        return image;
    }
}

function getElementPosition(oElement, oMenu){
    var res = new Array(0, 0);
    // Detect absolute or relative parent offset
    pStopObj = null;
    pObj = oMenu.parentNode;
    while(pObj != null && typeof(pObj.style) != "undefined"){
        if(pObj.style.position == "absolute" || pObj.style.position == "relative"){
            pStopObj = pObj;
            break;
        }
        pObj = pObj.parentNode;
    }
    // Get coordinates
    do{
        if(pStopObj == oElement)
            break;
        res[0] += oElement.offsetLeft;
        res[1] += oElement.offsetTop;
    }while((oElement = oElement.offsetParent) != null);
    return res;
}

function positioningMenu(smNum, relateToParentX, relateToParentY, deltaX, deltaY){
    var menuId = "sub_menu_" + smNum;
    var menuObj = document.getElementById(menuId);
    var parentId = "j" + smNum;
    var parentObj = document.getElementById(parentId);

    var parentPosition = getElementPosition(parentObj, menuObj);

    if(typeof(deltaX) == "undefined")
        deltaX = 0;
    if(relateToParentX == "right" || relateToParentX == "center"){
        parentWidth = parentObj.offsetWidth;
        if(relateToParentX == "center")
            parentWidth = parentWidth/2;
        deltaX += parentWidth;
    }

    if(typeof(deltaY) == "undefined")
        deltaY = 0;
    if(relateToParentY == "bottom" || relateToParentY == "center"){
        parentHeight = parentObj.offsetHeight;
        if(relateToParentY == "center")
            parentHeight = parentHeight/2;
        deltaY += parentHeight;
    }

    menuObj.style.position = 'absolute';
    menuObj.style.left = parentPosition[0] + deltaX + 'px';
    menuObj.style.top = parentPosition[1] + deltaY + 'px';
}

var hTmMenuHide = null;
var hTmSubMenuHide = {"init":0};
var prevImgSrc = Array();
var openedMenusStack = Array();

function showMenu(smNum, parentNum, relateToParentX, relateToParentY, deltaX, deltaY, imgOver){
    var menuObj = document.getElementById("sub_menu_" + smNum);
    if(menuObj != null){
        clearTimeout(hTmMenuHide);
        clearTimeout(hTmSubMenuHide[smNum]);

        hideMenuById(parentNum, true, true);
        positioningMenu(smNum, relateToParentX, relateToParentY, deltaX, deltaY);

        if(document.images['main_menu_img_'+smNum]){
            prevImgSrc[smNum] = document.images['main_menu_img_'+smNum].src;
            document.images['main_menu_img_'+smNum].src = imgOver;
        }

        document.getElementById("sub_menu_" + smNum).style.display = 'block';
        openedMenusStack.push(smNum);
    }
}

function hideMenu(smNum){
    var menuObj = document.getElementById("sub_menu_" + smNum);
    if(menuObj != null){
        menuObj.style.display = 'none';
        images = document.getElementsByTagName("IMG");
        if(document.images && document.images['main_menu_img_'+smNum] && prevImgSrc[smNum] != null){
            document.images['main_menu_img_'+smNum].src = prevImgSrc[smNum];
        }
    }
}

function hideMenuById(smNum, isIdParent, hideAllIfNotFound){
    if(smNum == 0){
        hideMenuAll();
    }else{
        var removeFromPos = -1;
        for(i = 0; i < openedMenusStack.length; i++){
            if(openedMenusStack[i] == 0)
                break;
            if(removeFromPos == -1 && openedMenusStack[i] == smNum){
                removeFromPos = i;
                if(isIdParent){
                    removeFromPos += 1;
                    continue;
                }
            }
            if(removeFromPos > -1){
                hideMenu(openedMenusStack[i]);
            }
        }
        if(hideAllIfNotFound && removeFromPos == -1){
            hideMenuAll();
        }else if(removeFromPos > -1 && removeFromPos < openedMenusStack.length){
            openedMenusStack.splice(removeFromPos, openedMenusStack.length-removeFromPos);
        }
    }
}

function hideMenuAll(){
    for(i = openedMenusStack.length-1; i >= 0; i--){
        hideMenu(openedMenusStack[i]);
    }
    openedMenusStack = new Array();

    // Switch to next block if you have some problems with div hiding caused special custom processing
    /*oDivs = document.getElementsByTagName("DIV");
     for(i = 0; i < oDivs.length; i++){
     if(oDivs[i].id.substr(0, 9) == "sub_menu_"){
     hideMenu(oDivs[i].id.substr(9));
     }
     }*/
}

function hideMenuAllByTimeout(){
    hTmMenuHide = setTimeout('hideMenuAll()', 500);
}
function hideMenuIdByTimeout(smNum){
    hTmSubMenuHide[smNum] = setTimeout('hideMenuById('+smNum+', false, false)', 250);
}

/* HTML handlers */
function mon(smNum, smParentId){
    clearTimeout(hTmMenuHide);
    if(typeof(smNum) != "undefined" && smNum > 0){
        clearTimeout(hTmSubMenuHide[smNum]);
    }
    if(typeof(smParentId) != "undefined" && smParentId > 0){
        clearTimeout(hTmSubMenuHide[smParentId]);
    }
}
function moff(smNum, evt){
    hideMenuAllByTimeout();
    if(typeof(smNum) != "undefined"){
        hideMenuIdByTimeout(smNum);
    }
    if(typeof(evt) != "undefined"){
        if(typeof(evt.cancelBubble) != "undefined"){
            evt.cancelBubble = true;
            if(typeof(evt.stopPropagation) == "function")
                evt.stopPropagation();
        }
    }
}
function submoff(menuId){
    hideMenuIdByTimeout(menuId);
}
function ck(num,state){
}
function smclick(){
    hideMenuAll();
}


function none(){
    return false;
}

function newImage(arg) {
    if (document.images) {
        rslt = new Image();
        rslt.src = arg;
        return rslt;
    }
}

function changeImages() {
    if (document.images && (preloadFlag == true)) {
        for (var i=0; i<changeImages.arguments.length; i+=2) {
            document[changeImages.arguments[i]].src = changeImages.arguments[i+1];
        }
    }
}

var preloadFlag = false;

function preloadImages() {
    if(document.images) {
        if(!preloadFlag) var pImages =new Array();
        var i,j=pImages.length,args=preloadImages.arguments;
        if (args[0].length)
            args = args[0];
        for(i=0; i<args.length; i++)
            if(args[i].indexOf("#")!=0) {
                pImages[j]=new Image;
                pImages[j++].src=args[i];
            }
        preloadFlag = true;
    }
}

if (typeof(arrPreload)!="undefined")
    preloadImages(arrPreload);

function DoPreload(){
}




AMI.UI.overloadAlert(true);



/* Start Rating Stars Oneblock */

function getOffsetLeftStars(el){
    var ol = el.offsetLeft;
    while ((el = el.offsetParent) != null) ol += el.offsetLeft;
    return ol;
}

function onRatingOverStars(event){
    if (event.target){
        idRating = AMI.$(event.target).attr('data-ami-img-rating-id');
        oElement = event.target;
    }else{
        idRating = AMI.$(event.srcElement).attr('data-ami-img-rating-id');
        oElement = event.srcElement;
    }
    if(document.forms['rating'+idRating].rating.value!=''){
        return;
    }
    var num = parseInt(((event.clientX + document.body.scrollLeft - 3 - getOffsetLeftStars(oElement)) / oElement.offsetWidth) * 5) + 1;
    oElement.src="_img/rating/medium_stars/stars"+num+".gif";
}

function onRatingClearStars(event){
    if (event.target){
        idRating = AMI.$(event.target).attr('data-ami-img-rating-id');
        oElement = event.target;
    }else{
        idRating = AMI.$(event.srcElement).attr('data-ami-img-rating-id');
        oElement = event.srcElement;
    }
    if(document.forms['rating'+idRating].rating.value!=''){
        oElement.src="_img/rating/medium_stars/stars"+(parseInt(document.forms['rating'+idRating].rating.value)+1)+".gif";
    }else{
        oElement.src="_img/spacer.gif";
    }
}

function onRatingSetStars(event, confirm_register){
    if (event.target){
        idRating = AMI.$(event.target).attr('data-ami-img-rating-id');
        oElement = event.target;
    }else{
        idRating = AMI.$(event.srcElement).attr('data-ami-img-rating-id');
        oElement = event.srcElement;
    }
    if(confirm_register == 'true'){
        alert('Голосование доступно только зарегестрированным пользователям');
        return false;
    }
    var num = parseInt(((event.clientX  + document.body.scrollLeft - 3 - getOffsetLeftStars(oElement)) / oElement.offsetWidth) * 5) + 1;
    oElement.style.cursor = 'default';
    document.forms['rating'+idRating].rating.value = num - 1;

    if(AMI.$('#rating_block'+idRating == false)) {
        AMI.$('#rating__stars-form'+idRating).after('<span style="display: none;" data-ami-rating'+idRating+'="1" id="rating_block'+idRating+'"Рейтинг: '+idRating +'</span>');
        AMI.$('#rating__stars-form'+idRating).after('<span style="display: none;" id="votes_block'+idRating+'">(голосов: 1)</span>');
    }
    ajaxCheckStars(idRating);
}

function checkRatingFormStars() {
    if(AMI.Browser.Cookie.get('moduleRatingsValue') != null && AMI.$('.rating__stars-form')[0] != undefined) {
        for(i=0;i<AMI.$('[data-ami-rating-id]').length;i++) {
            for(j=0;j<AMI.Browser.Cookie.get('moduleRatingsValue').split(';').length;j++) {
                if (AMI.Browser.Cookie.get('moduleRatingsValue').split(';')[j].split(',')[0] == AMI.$('[data-ami-rating-id]').eq(i).attr('data-ami-rating-id')) {
                    AMI.$('[data-ami-rating-id] .rating-stars__form-votes').eq(i).attr('title', 'Вы уже голосовали за данный материал');
                    AMI.$('[data-ami-rating-id] .rating-stars__form-block').eq(i).css('display', 'none');
                    if(AMI.Browser.Cookie.get('moduleRatingsValue').split(';')[j].split(',')[2] > AMI.$('[data-ami-rating-id]').eq(i).attr('data-rating-votes-count')) {
                        AMI.$('[data-ami-rating-id] .rating-stars__rate-area').eq(i).text('Рейтинг: '+AMI.Browser.Cookie.get('moduleRatingsValue').split(';')[j].split(',')[1]);
                        AMI.$('[data-ami-rating-id] .rating-stars__votes-area').eq(i).text('(голосов: '+AMI.Browser.Cookie.get('moduleRatingsValue').split(';')[j].split(',')[2]);
                        AMI.$('[data-ami-rating-id] .rating-stars__form-votes').eq(i).css('background-image', 'url(_img/rating/medium_stars/stars'+Math.round(AMI.Browser.Cookie.get('moduleRatingsValue').split(';')[j].split(',')[1])+'.gif)');
                    }
                }
            }
        }
    }
}

function ajaxCheckStars(idRating) {
    AMI.HTTPRequest.submitForm('POST', document.forms['rating'+idRating], {is_ajax: true}, function(status, data){
        if(data){
            var parts = data.split('|');
            var cookieString = parts[0];
            var cookieLifetime = parts[1];
            var ratingBlock = parts[2];
            var votesBlock = parts[3];
            var statusMsg = parts[4];
            var isError = parts[5];

            if(isError == '1') {
                AMI.$('#rating-stars__form-votes'+idRating).attr('title', statusMsg);
                AMI.$('#rating_value'+idRating).css('display', 'none');
            } else {
                AMI.$('#rating_block'+idRating).replaceWith(ratingBlock);
                AMI.$('#votes_block'+idRating).replaceWith(votesBlock);
                AMI.$('#rating-stars__rate-block-count'+idRating).html(AMI.$('#rating_block'+idRating).text());
                AMI.$('#rating-stars__rate-block-count-votes'+idRating).html(AMI.$('#votes_block'+idRating).text());
                AMI.$('#rating-stars__form-votes'+idRating).attr('title', AMI.$('#rating_block'+idRating).text());
                AMI.$('#rating-stars__rate-block-status'+idRating).html('<span class="rating-stars__rate-on">Спасибо!</span>');
                AMI.$('#rating-stars__form-votes'+idRating).css('background-image', 'url(_img/rating/medium_stars/stars'+Math.round(AMI.$('#rating_block'+idRating).attr('data-ami-rating'+idRating))+'.gif)');
                AMI.$('#rating_value'+idRating).css('display', 'none');
            }
            if(AMI.Browser.Cookie.get('moduleRatingsValue') == null) {
                AMI.Browser.Cookie.set('moduleRatingsValue', idRating+','+AMI.$('#rating_block'+idRating).attr('data-ami-rating'+idRating)+','+AMI.$('#votes_block'+idRating).attr('data-ami-votes'+idRating), 720);
            } else {
                AMI.Browser.Cookie.set('moduleRatingsValue', AMI.Browser.Cookie.get('moduleRatingsValue')+';'+idRating+','+AMI.$('#rating_block'+idRating).attr('data-ami-rating'+idRating)+','+AMI.$('#votes_block'+idRating).attr('data-ami-votes'+idRating), 720);
            }
        }
    });
}

AMI.$(function() {
    checkRatingFormStars();
});

/* End Rating Stars Oneblock */



/*
 * FILE END: _js/common.js
 */
AMI.Template.Locale.merge({mediaBoxZommed : "Изображение уменьшено, <a href=\"\">показать в оригинальном размере __width__х__height__</a>", mediaBoxNotZommed : "Изображение увеличено, <a href=\"\">уменьшить до размеров окна</a>", mediaBoxCounter : "Изображение __current__ из __total__", mediaBoxPrevious : "Предыдущее изображение", mediaBoxNext : "Следующее изображение"});