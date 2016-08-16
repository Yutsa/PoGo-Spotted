var map;
var mapDiv = document.getElementById('map');
var markerPlayer;
var spawnMarkers = [];
var nearbyMarkers = [];
var nearbyCircles = [];
var coordinates;
var geocoder;

function initMap() {
    var pos = {lat: 49.774, lng: 4.722};
    
    map = new google.maps.Map(mapDiv, {
	center: pos,
	zoom: 16
    });

    markerPlayer = new google.maps.Marker({
	map: map,
	icon: "../static/img/blue-dot.png",
	draggable: true
    });

    circle = new google.maps.Circle({
	fillColor: '#6666ff',
	strokeColor: '#FF0000',
	strokeOpacity: 0.8,
	fillOpacity: 0.55,
	map: map,
	center: pos,
	radius: 200
    });

    geocoder = new google.maps.Geocoder();

    markerPlayer.setPosition(pos);
    markerPlayer.bindTo("position", circle, "center");
    
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
		lat: position.coords.latitude,
		lng: position.coords.longitude
            };

	    map.setCenter(pos);
	    markerPlayer.setPosition(pos);
	    circle.setCenter(pos);
        });
    }

    $.ajax({
	type: "GET",
	url: "/getCoord/",
	success: function(answer) {
	    coordinates = JSON.parse(answer);
	    updateMarkers();
	}
    });

    google.maps.event.addListener(map, 'click', function(event) {
	markerPlayer.setPosition(event.latLng);
    });
}

function updateMarkers() {
    for (var key in coordinates) {
	var enc_date = coordinates[key]["date"];
	var coordObj = coordinates[key];

	addMarker(coordObj, enc_date);
    }
}

function addMarker(location, enc_date) {
    var marker = new google.maps.Marker({
	position: location,
	map: map,
	enc_date: enc_date
    });

    addInfoWindow(marker, enc_date);
    spawnMarkers.push(marker);
}

function addInfoWindow(marker, enc_date) {
    var infoWindow = new google.maps.InfoWindow({
	content: enc_date
    });

    google.maps.event.
	addListener(marker, 'click', (function(marker, info) {
	    return function() {
		info.open(map, marker);
	    }
	}) (marker, infoWindow));
}

/* Trace a new yellow circle at the current geolocalisation */
function traceNewCircle() {
     if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
		lat: position.coords.latitude,
		lng: position.coords.longitude
            };
	    var marker = new google.maps.Marker({
		map: map,
		icon: "../static/img/yellow-dot.png",
		draggable: true,
		position: pos
	    });
	    nearbyMarkers.push(marker);

	    var nCircle = new google.maps.Circle({
		fillColor: '#ffff66',
		strokeColor: 'green',
		strokeOpacity: 0.8,
		fillOpacity: 0.35,
		map: map,
		center: pos,
		radius: 200
	    });
	    nearbyCircles.push(nCircle);

	    marker.bindTo("position", nCircle, "center");
        });
    }
}

function clearCircles() {
    for (var i = 0; i < nearbyCircles.length; i++) {
	nearbyCircles[i].setMap(null);
	nearbyMarkers[i].setMap(null);
    }
    nearbyCircles.length = 0;
    nearbyMarkers.length = 0;
    console.log(nearbyMarkers);
    console.log(nearbyCircles);
}

$("#update_pos").click(function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
		lat: position.coords.latitude,
		lng: position.coords.longitude
            };
	    map.setCenter(pos);
	    markerPlayer.setPosition(pos);
        });
    }
});

$("#submit_geocode").click(function() {
    var address = $("#address").val();
    geocoder.geocode({'address': address}, function(results, status) {
	if (status === 'OK') {
	    map.setCenter(results[0].geometry.location);
	    markerPlayer.setPosition(results[0].geometry.location);
	} else {
	    console.log("Geocode wasn't successful for the following "+
			"reason: " + status);
	}
    });
})

$("#trace_circle").click(traceNewCircle);
$("#clear_circles").click(clearCircles);
