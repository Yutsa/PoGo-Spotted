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
	pkm_id: pk_id,
	enc_date: enc_date
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

function hidePkmById(ids_to_hide) {
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

function hidePkmByDate(date_start, date_end) {
    for (var i = 0; i < markers.length; i++) {
	pkm_date = new Date(markers[i]["enc_date"]);
	if (!isBetweenDates(pkm_date, date_start, date_end))
	    markers[i].setMap(null);
	else
	    markers[i].setMap(map);
    }
}

function inArray(value, array) {
    if ($.inArray(value, array) == -1)
	return false;
    return true;
}

function isValidDate(dateString)
{

    if (!/^(?:(?:31\/(?:0?[13578]|1[02]))\1|(?:(?:29|30)\/(?:0?[1,3-9]|1[0-2])\/))(?:(?:1[6-9]|[2-9]\d)?\d{2}) ([01][0-9]|2[0-3]):[0-5][0-9]$|^(?:29\/0?2\/(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00)))) ([01][0-9]|2[0-3]):[0-5][0-9]$|^(?:0?[1-9]|1\d|2[0-8])\/(?:(?:0?[1-9])|(?:1[0-2]))\/(?:(?:1[6-9]|[2-9]\d)?\d{2}) ([01][0-9]|2[0-3]):[0-5][0-9]$/.test(dateString))
	return false;
    return true;

};

function checkDateForm() {
    var begin_time = $("#begin_time").val();
    var end_time = $("#end_time").val();

    if (isValidDate(begin_time) && isValidDate(end_time))
	console.log("Input correct");
    else {
	console.log("Input incorrect");
	return false;
    }
    
}

/* Hide pokemons when submitting */
$("#form_ids_to_hide").submit(function(event) {

    /* stop form from submitting normally */
    event.preventDefault();

    var $this = $(this);

    var serialized = $this.serializeArray();
    var ids = [];

    for (var i = 0; i < serialized.length; i++) {
	ids.push(serialized[i]["value"]);
    }

    hidePkmById(ids);
});

function isBetweenDates(date_pkm, date_start, date_end) {
    if (date_pkm >= date_start && date_pkm <= date_end)
	return true;
    return false;
}

/* Filter by date when submitting form */
$("#filter_date").submit(function(event) {

    event.preventDefault();

    var serialized = $(this).serializeArray();

    var start_time = serialized[0]["value"];
    var end_time = serialized[1]["value"];

    start_time = new Date(start_time);
    end_time = new Date(end_time);

    hidePkmByDate(start_time, end_time);
});
