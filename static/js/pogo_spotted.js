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

function addMarker(location, pkm_ic, enc_date, pk_id) {
    var marker = new google.maps.Marker({
	position: location,
	map: map,
	icon: pkm_ic,
	pkm_id: pk_id
    });

    addInfoWindow(marker, enc_date);
    markers.push(marker);
}

function addInfoWindow(marker, enc_date) {
    var infoWindow = new google.maps.InfoWindow({
	content: enc_date
    });

    google.maps.event.addListener(marker, 'click', (function(marker, info) {
	return function() {
	    info.open(map, marker);
	}
    }) (marker, infoWindow));
}

// Sets the map on all markers in the array.
function setMapOnAll(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
  setMapOnAll(null);
}

// Shows any markers currently in the array.
function showMarkers() {
  setMapOnAll(map);
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
  clearMarkers();
  markers = [];
}

function updateMarkers() {
    for (var key in coordinates) {
	var img = "../static/img/sprites/"
	    .concat(coordinates[key]["id"], ".png");

	var pk_id = coordinates[key]["id"];
	var enc_date = coordinates[key]["date"];
	var coordObj = coordinates[key];

	addMarker(coordObj, img, enc_date, pk_id);
    }
}

function changeMarkerVisibility(ids_to_hide) {
    console.log(ids_to_hide);
    for (var i = 0; i < markers.length; i++) {
	/* If we need to hide the marker */
	if (inArray(String(markers[i]['pkm_id']), ids_to_hide)) {
	    markers[i].setMap(null);
	    console.log("Hide");
	}
	else {
	    markers[i].setMap(map);
	}
    }
}

function inArray(value, array) {
    if ($.inArray(value, array) == -1)
	return false;
    return true;
}

/* This will be the base for the AJAX request. */
$("#form_ids_to_hide").submit(function(event) {

    /* stop form from submitting normally */
    event.preventDefault();

    var $this = $(this);

    var serialized = $this.serializeArray();
    var ids = [];

    for (var i = 0; i < serialized.length; i++) {
	ids.push(serialized[i]["value"]);
    }

    changeMarkerVisibility(ids);
});
