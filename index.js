require('mapbox.js');
L.mapbox.accessToken = 'pk.eyJ1IjoidHJpc3RlbiIsImEiOiJiUzBYOEJzIn0.VyXs9qNWgTfABLzSI3YcrQ';

require('d3');
require('./js/keybinding.js');

// Restrict panning to one copy of the world
var southWest = L.latLng(-90, -180),
    northEast = L.latLng(90, 180),
    bounds = L.latLngBounds(southWest, northEast);

var map = L.mapbox.map('map', null, {
  zoomControl: false,
  attributionControl: false,
  noWrap: true,
  minZoom: 2,
  maxBounds: bounds
}).setView([39, 14], 2);

// Base layer
L.mapbox.tileLayer('tristen.5467621e', { noWrap:true }).addTo(map);

//map.on('moveend', function() { console.log(map.getCenter()); });
//map.scrollWheelZoom.disable();
new L.Control.Zoom({ position: 'topright' }).addTo(map);

var layers = [
  { title: '2006', fill: '#0000ff', layer: 'enf.8e514fd2', },
  { title: '2007', fill: '#4400CC', layer: 'enf.c3e70751', },
  { title: '2008', fill: '#880088', layer: 'enf.2c15d8a9', },
  { title: '2009', fill: '#CC0044', layer: 'enf.5191a4b9', },
  { title: '2010', fill: '#ff0000', layer: 'enf.23382699', },
  { title: '2011', fill: '#ff4400', layer: 'enf.1e5a6ba8', },
  { title: '2012', fill: '#ff8800', layer: 'enf.a10eb892', },
  { title: '2013', fill: '#ffCC00', layer: 'enf.8989964d', },
  { title: '2014', fill: '#ffff00', layer: 'enf.ab651705', },
  { title: '2015', fill: '#ffff00', layer: 'enf.c2ce7160'  }
].map(function(l, i) {
  l.layer = L.mapbox.tileLayer(l.layer, {noWrap:true}).addTo(map);
  l.layer.getContainer().style.opacity = 0;
  return l;
});

var tooltip = d3.select('.js-range-tooltip');
var controls = d3.select('#controls');
var tally = 0; // The current index in the layers array we are showing.

// Toggle the tooltip to just show the
// current years layer and hide the others.
/*
tooltip.on('click', function() {
  d3.event.preventDefault();
  d3.event.stopPropagation();
  var el = d3.select(this);
  if (el.classed('active')) {
    el.classed('active', false);
    layers.forEach(function(l, i) {
      if (i > tally) l.layer.getContainer().style.opacity = 0;
      if (i < tally) l.layer.getContainer().style.opacity = 1;
    });
  } else {
    el.classed('active', true);
    layers.forEach(function(l, i) {
      l.layer.getContainer().style.opacity = (i === tally) ? 1 : 0;
    });
  }
});
*/

function rangeControl(el) {
  // Adjust the position of the range
  // input tooltip to follow the thumbtrack.
  var width = el.clientWidth;
  var max = el.getAttribute('max');
  var posPerc = (el.value / max) * 100;
  var pixPos = (posPerc / 100) * width;
  pixPos += el.offsetLeft;

  var bounds = el.getBoundingClientRect();

  // If the tooltip's right position
  // equals the right position of the range slider
  if ((pixPos + 15) > width) {
    // pixPos = width;
    tooltip.style({
      'left': 'auto',
      'right': 0
    });
  } else {
    tooltip.style({
      'right': 'auto',
      'left': pixPos+'px'
    });
  }

  // Find the current index
  var index = Math.floor(el.value / 100) + 1;
  // Opacity should be the decimal place of el.value/100
  var opacity = (el.value/100 % 1).toFixed(2);

  if (layers[index] && index !== tally) {
    // When the index updates, make sure layer before the
    // current are set to full opacity and future ones are at 0.
    layers.forEach(function(l, i) {
      if (i > index) l.layer.getContainer().style.opacity = 0;
      if (i < index) l.layer.getContainer().style.opacity = 1;
    });

    // Update tooltip contents
    tooltip.select('.dot')
      .style('background', layers[index].fill);
    tooltip.select('label')
      .text(layers[index].title);
  }

  if (layers[index]) {
    layers[index].layer.getContainer().style.opacity = opacity;
    tally = index;
  }
}

var range = controls.append('input')
  .attr('class', 'col12')
  .attr('type', 'range')
  .attr('min', 0)
  .attr('step', 1)
  .attr('max', layers.length * 100)
  .attr('value', layers.length * 100)
  .on('input', function() { rangeControl(this); });

// Location navigation
var playback;
var play = d3.select('.js-play');
play.on('click', function() {
  d3.event.preventDefault();
  d3.event.stopPropagation();
  if (playback) window.clearInterval(playback);
  var el = d3.select(this);
  if (el.classed('playback')) {
    el.classed('playback', false).classed('pause', true);
    var r = range.node();
    playback = window.setInterval(function() {
      r.value++;
      if (r.value === r.getAttribute('max')) r.value = 0;
      rangeControl(r);
    }, 10);
  } else {
    el.classed('pause', false).classed('playback', true);
  }
});

var locations = [
{
  lat: 51.5075,
  lon: -0.1306,
  z: 13,
  description: 'London, UK'
}, {
  lat: 48.8539,
  lon: 2.3497,
  z: 13,
  description: 'Paris, France'
}, {
  lat: 41.8802,
  lon: -87.6374,
  z: 13,
  description: 'Chicago, USA'
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
  z: 12,
  description: 'Ayacucho, Peru'
}, {
  lat: 52.5121,
  lon: 13.3865,
  z: 13,
  description: 'Berlin, Germany'
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
  if (playback) window.clearInterval(playback);
  var r = range.node();
      r.value = 0;

  play.classed('playback', false).classed('pause', true);
  playback = window.setInterval(function() {
    r.value++;
    if (r.value === r.getAttribute('max')) r.value = 0;
    rangeControl(r);
  }, 10);
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

// Social sharing links
d3.selectAll('.js-explore').on('click', function() {
  d3.event.preventDefault();
  d3.event.stopPropagation();
  d3.select('.modal').classed('active', false);
  if (playback) window.clearInterval(playback);
  var r = range.node();
      r.value = 0;

  play.classed('playback', false).classed('pause', true);
  playback = window.setInterval(function() {
    r.value++;
    if (r.value === r.getAttribute('max')) r.value = 0;
    rangeControl(r);
  }, 10);
});

// OSM link in top left corner
d3.selectAll('.js-about').on('click', function() {
  d3.event.preventDefault();
  d3.event.stopPropagation();
  d3.select('.modal').classed('active', true);
});

// play/pause control with the spacebar
d3.select('body').call(d3.keybinding()
  .on('space', function() {
    if (playback) window.clearInterval(playback);
    var r = range.node();
    if (play.classed('playback')) {
      play.classed('playback', false).classed('pause', true);
      playback = window.setInterval(function() {
        r.value++;
        if (r.value === r.getAttribute('max')) r.value = 0;
        rangeControl(r);
      }, 10);
    } else {
      play.classed('playback', true).classed('pause', false);
    }
  })
);

// Initialization
(function() {
  // Initial layer to display
  var target = layers[layers.length - 1];

  // Set tooltip as the first layer.
  tooltip.select('label').text(target.title);
  tooltip.select('.dot').style('background', target.fill);

  // Bring layer opacity up and call rangeControl
  target.layer.getContainer().style.opacity = 1;
  rangeControl(range.node());
})();
