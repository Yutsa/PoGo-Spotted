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
}
