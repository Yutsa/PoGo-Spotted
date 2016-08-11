var map;
var geocoder;
var marker;

function initMap() {
    var mapDiv = document.getElementById('map');
    map = new google.maps.Map(mapDiv, {
	center: {lat: 49.774, lng: 4.722},
	zoom: 16
    });

    geocoder = new google.maps.Geocoder();

    marker = new google.maps.Marker({
	map: map,
	draggable: true
    });

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
		lat: position.coords.latitude,
		lng: position.coords.longitude
            };

	    marker.setPosition(pos);
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

function geocodeAddress(geocoder, resultsMap)  {
    var address = $("#address").val()
    geocoder.geocode({'address': address}, function(results, status) {
	if (status === 'OK') {
	    resultsMap.setCenter(results[0].geometry.location);
	    marker.setPosition(results[0].geometry.location);
	    document.getElementById('lat').value =
		marker.position.lat();
	    document.getElementById('lng').value
		= marker.position.lng();
	    console.log(document.getElementById('lng').value);
	    console.log(document.getElementById('lat').value);
	} else {
	    console.log("Geocode wasn't successful for the following "+
			"reason: " + status);
	}
    });
}

document.getElementById('submit_geocode').addEventListener('click', function(event) {
    event.preventDefault();
    geocodeAddress(geocoder, map);
});
