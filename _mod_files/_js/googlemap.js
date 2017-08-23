/**
*	======================
*	Cmall contacts map
*	======================
*/

$(function() {

	$("#b-cmall-contacts-map-block").height($("#b-cmall-contacts-map-wrapper").height());	// Set map height
	function initialize($) {
		var mapOptions = {	
			zoom: 8,
			center: new google.maps.LatLng(55.753559, 37.609218),
			disableDefaultUI: true
		};
		var map = new google.maps.Map(document.getElementById('b-cmall-contacts-map-block'), mapOptions);
		var marker = new google.maps.Marker({  
			position: new google.maps.LatLng(55.753559, 37.609218),  
			map: map,  
			title: "јдаптивный интернет-магазин",  
			clickable: false 
		});  
	}
	google.maps.event.addDomListener(window, 'load', initialize);

});	

/**
*	======================
*	END Cmall contacts map
*	======================
*/