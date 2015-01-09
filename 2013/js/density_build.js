var SphericalMercator = require('sphericalmercator');

var places = [
    ['Cameroun',34856,32064,'Yaoundé III, Mfoundi, Centre, 11852'],
    ['Cameroun',34864,32056,'Yaoundé V, Mfoundi, Centre, 215'],
    ['Cameroun',34864,32064,'Yaoundé III, Mfoundi, Centre, 11852'],
    ['Cameroun',34856,32056,'Mfoundi, Centre'],
    ['Martinique',21648,30072,'Fort-de-France'],
    ['France métropolitaine',32656,23608,'Lafon Féline, Le Bouscat, Bordeaux, Gironde, Aquitaine, 33110'],
    ['Brasil',25424,36536,'Mesorregião Central Espírito-Santense, Espírito Santo'],
    ['France métropolitaine',32656,23616,'Centre ville, Bordeaux, Gironde, Aquitaine, 33000'],
    ['Cameroun',34864,32048,'Lekié, Centre'],
    ['France métropolitaine',33184,22536,'Madeleine, 8e Arrondissement, Paris, Île-de-France, 75008']
];

var sph = new SphericalMercator();

function up(x, y) {
    return [14, ~~(Math.pow(2, -2) * x), ~~(Math.pow(2, -2) * y)];
}

console.log(JSON.stringify(places.map(function(d) {
    return {
        name: d[0] + ': ' + d[3],
        ll: sph.ll([d[1] * 256, d[2] * 256], 16),
        tile: up(d[1], d[2]).join('/')
    };
}), null, 2));
