function initMap() {
    var mapDiv = document.getElementById('map');
    var map = new google.maps.Map(mapDiv, {
	center: {lat: 49.774, lng: 4.722},
	zoom: 16
    });
    
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
		lat: position.coords.latitude,
		lng: position.coords.longitude
            };
	    
            map.setCenter(pos);

        });
    }
    
    for (var key in coordinates) {
	var coordObj = coordinates[key];
	var marker = new google.maps.Marker({
	    position: coordObj,
	    map: map,
	});

	enc_date = coordinates[key]["date"]
	console.log(coordObj)
	
	var infoWindow = new google.maps.InfoWindow({
	    content: enc_date
	});
	
	google.maps.event.addListener(marker,'click', (function(marker, info) {
	    return function() {
		info.open(map, marker);
	    }
	}) (marker, infoWindow));
    }
}
