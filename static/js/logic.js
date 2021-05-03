var parks_json2 = JSON.parse(parks_data);
console.log(parks_json2.parks);


// Creating map object
var myMap2 = L.map("map2", {
  center: [35.227085, -80.843124],
  zoom: 11
});

// Adding tile layer to the map
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/satellite-v9",
  accessToken: API_KEY
}).addTo(myMap2);

arrayOfObjects = parks_json2.parks;
arrayOfObjects.map(function(data) {
  console.log(data);

  // Create a new marker cluster group
  var markers2 = L.markerClusterGroup();

  var latitude = data.parklatitude;
  var longitude = data.parklongitude;

    // Add a new marker to the cluster group and bind a pop-up
  markers2.addLayer(L.marker([latitude, longitude]).bindPopup(data.parkname));

  // Add our marker cluster layer to the map
  myMap2.addLayer(markers2);
});
