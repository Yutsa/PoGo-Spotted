function initMap() {
    var mapDiv = document.getElementById('map');
    var map = new google.maps.Map(mapDiv, {
	center: {lat: 49.774, lng: 4.722},
	zoom: 16
    });

    var date = '<div>2016-07-28 17:16:01.180000</div>'
	var infoWindow = new google.maps.InfoWindow({
	    content: date
	});
    
    for (var key in coordinates) {
	var coordObj = coordinates[key];
	var marker = new google.maps.Marker({
	    position: coordObj,
	    map: map,
	});

	google.maps.event.addListener(marker,'click', (function(marker) {
	    return function() {
		infoWindow.open(map, marker);
	    }
	}) (marker));
    }
}
