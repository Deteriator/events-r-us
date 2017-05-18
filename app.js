 var map, infowindow;
      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 40.397, lng: -73.644},
          zoom: 14
        });
                map.data.loadGeoJson('https://cdn.rawgit.com/dwillis/nyc-maps/598f08a1/community_districts.geojson');
                infoWindow = new google.maps.InfoWindow;
       // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            infoWindow.open(map);
            map.setCenter(pos);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
      }
      // This event listener calls addMarker() when the map is clicked.
  google.maps.event.addListener(map, 'click', function(e) {
    placeMarker(e.latLng, map);
  });

  function placeMarker(position, map) {
    var marker = new google.maps.Marker({
      position: position,
      map: map
    });  
    map.panTo(position);
  }
      }
