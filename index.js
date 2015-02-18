require('mapbox.js');
L.mapbox.accessToken = 'pk.eyJ1IjoidHJpc3RlbiIsImEiOiJiUzBYOEJzIn0.VyXs9qNWgTfABLzSI3YcrQ';

var d3 = require('d3');
var map = L.mapbox.map('map', null, {
  attributionControl:false
}).setView([34.60,4.39], 2);

map.scrollWheelZoom.disable();

var layers = [
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
  l.layer = L.mapbox.tileLayer(l.layer).addTo(map);
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
