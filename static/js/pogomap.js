function initMap() {
    var mapDiv = document.getElementById('map');
    var map = new google.maps.Map(mapDiv, {
	center: {lat: 49.774, lng: 4.722},
	zoom: 16
    });

    var marker = new google.maps.Marker({
	map: map
    });

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
		lat: position.coords.latitude,
		lng: position.coords.longitude
            };

	    marker.setPosition(pos);
	    marker.setDraggable(true);
            map.setCenter(pos);

	    document.getElementById('lat').value= pos["lat"];
	    document.getElementById('lng').value= pos["lng"];
        });
    } else {
	maker.setPosition(map.getCenter());
    }

    google.maps.event.addListener(marker,'dragend',function(event) {
        document.getElementById('lat').value = event.latLng.lat();
        document.getElementById('lng').value = event.latLng.lng();
    });
}
