var map;
var mapDiv = document.getElementById('map');
var markers = [];

function initMap() {
    map = new google.maps.Map(mapDiv, {
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

    updateMarkers();
}

function addMarker(location, pkm_ic, enc_date) {
    var marker = new google.maps.Marker({
	position: location,
	map: map,
	icon: pkm_ic
    });

    var infoWindow = new google.maps.InfoWindow({
	content: enc_date
    });

    google.maps.event.addListener(marker, 'click', (function(marker, info) {
	return function() {
	    info.open(map, marker);
	}
    }) (marker, infoWindow));
    
    markers.push(marker);
}

function updateMarkers() {
    console.log("Update markers");
    for (var key in coordinates) {
	var img = "../static/img/sprites/"
	    .concat(coordinates[key]["id"], ".png");

	var enc_date = coordinates[key]["date"];
	var coordObj = coordinates[key];

	addMarker(coordObj, img, enc_date);
    }
}

function clearMarkers() {
  setMapOnAll(null);
}

/* This will be the base for the AJAX request. */
$("#form_ids_to_hide").submit(function(event) {

    /* stop form from submitting normally */
    event.preventDefault();

    var $this = $(this);
    
    /* Send the jQuery AJAX request */
    $.ajax({
	url: '/map/',
	type: 'POST',
	data: $this.serialize(),
	success: function(answer) {
	    console.log("Coordinates before:", coordinates)
	    coordinates = JSON.parse(answer);
	    clearMarkers();
	    updateMarkers();
	    console.log(coordinates);
	}
    });
});
