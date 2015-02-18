require('mapbox.js');
L.mapbox.accessToken = 'pk.eyJ1IjoidHJpc3RlbiIsImEiOiJiUzBYOEJzIn0.VyXs9qNWgTfABLzSI3YcrQ';

var d3 = require('d3');

// Restrict panning to one copy of the world
var southWest = L.latLng(-90, -180),
    northEast = L.latLng(90, 180),
    bounds = L.latLngBounds(southWest, northEast);

var map = L.mapbox.map('map', null, {
  zoomControl: false,
  attributionControl: false,
  maxBounds: bounds
}).setView([34.60,4.39], 2);

new L.Control.Zoom({ position: 'topright' }).addTo(map);
map.scrollWheelZoom.disable();

var layers = [
  { title: '2006', layer: 'enf.8e514fd2', },
  { title: '2007', layer: 'enf.c3e70751', },
  { title: '2008', layer: 'enf.2c15d8a9', },
  { title: '2009', layer: 'enf.5191a4b9', },
  { title: '2010', layer: 'enf.23382699', },
  { title: '2011', layer: 'enf.1e5a6ba8', },
  { title: '2012', layer: 'enf.a10eb892', },
  { title: '2013', layer: 'enf.8989964d', },
  { title: '2014', layer: 'enf.ab651705', },
  { title: '2015', layer: 'enf.c2ce7160'  }
].map(function(l, i) {
  l.layer = L.mapbox.tileLayer(l.layer, {noWrap:true}).addTo(map);
  if (i !== 0) l.layer.getContainer().style.opacity = 0;
  return l;
});

var emblem = d3.select('.js-emblem');
var controls = d3.select('#controls');
var tally = 0;

controls.append('input')
  .attr('class', 'col12')
  .attr('type', 'range')
  .attr('min', 0)
  .attr('value', 0)
  .attr('step', 1)
  .attr('max', layers.length * 100)
  .on('input', function() {
    // Find the current index
    var index = Math.floor(this.value / 100) + 1;
    // Opacity should be the decimal place of this.value/100
    var opacity = (this.value/100 % 1).toFixed(2);

    if (index !== tally) {
      // When the index updates, make sure layer before the 
      // current are set to full opacity and future ones are at 0.
      layers.forEach(function(l, i) {
        if (i > index) layers[i].layer.getContainer().style.opacity = 0;
        if (i < index) layers[i].layer.getContainer().style.opacity = 1;
      });
    }

    if (layers[index]) {
      layers[index].layer.getContainer().style.opacity = opacity;
      emblem.text(layers[index - 1].title);
      tally = index;
    }
  });

// Set title as the first layer.
emblem.text(layers[0].title);

// Location navigation
var locations = [
{
  lat: 48.8539,
  lon: 2.3497,
  z: 13,
  description: 'Paris, France'
}, {
  lat: -37.8307,
  lon: 144.9086,
  z: 12,
  description: 'Melbourne, Australia'
}, {
  lat: 36.0891,
  lon: 136.0822,
  z: 7,
  description: 'Japan'
}, {
  lat: 43.5859,
  lon: 39.7235,
  z: 15,
  description: 'Sochi, Russia'
}, {
  lat: 50.8398,
  lon: 4.3274,
  z: 14,
  description: 'Ayacucho, Peru'
}, {
  lat: 41.3842,
  lon: 2.1564,
  z: 13,
  description: 'Barcelona, Spain'
}, {
  lat: 38.9011,
  lon: -77.0406,
  z: 13,
  description: 'Washington DC, USA'
}, {
  lat: 51.9603,
  lon: 5.1540,
  z: 9,
  description: 'Netherlands'
}];

var locationIndex = 0;
var locationText = d3.select('.js-location-text');
d3.select('.js-next').on('click', function() {
  d3.event.preventDefault();
  d3.event.stopPropagation();
  if (locationIndex === locations.length) locationIndex = 0;
  map.setView([
    locations[locationIndex].lat,
    locations[locationIndex].lon
  ],locations[locationIndex].z);
  locationText.text(locations[locationIndex].description);
  locationIndex++;
});

function windowPopup(url) {
  // Calculate the position of the popup so
  // it’s centered on the screen.
  var width = 500;
  var height = 300;
  var left = (screen) ? (screen.width / 2) - (width / 2) : 20;
  var top = (screen) ? (screen.height / 2) - (height / 2) : 20;

  window.open(
    url,
    '',
    'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,width=' + width + ',height=' + height + ',top=' + top + ',left=' + left
  );
}

// Social sharing links
d3.selectAll('.js-share').on('click', function() {
  d3.event.preventDefault();
  d3.event.stopPropagation();
  windowPopup(this.href);
});
