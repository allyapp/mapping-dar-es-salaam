var cartogram_image = d3.select('.cartogram-image');

function bgTween(to) {
    return function() {
        var spriteScale = d3.scale.linear()
            .domain([0, 1])
            .range([0, to * 512]);

        return function(i) {
            return (-Math.floor(spriteScale(i) / 512) * 512) + 'px 0px';
        };
    };
}

var yrs = [0, 20, 37, 44, 64];

function clickYear(d, i) {
    var yr = d3.select(this).text();
    cartogram_image
        .transition()
        .duration(1000)
        .ease('linear')
        .styleTween('background-position', bgTween(yrs[i]));
}

d3.select('#regions')
    .selectAll('h3')
    .on('click', clickYear);

d3.selectAll('.cartogram span')
    .on('click', clickYear);

var setChi = function(y) {
    d3.select('#chicago')
        .style('background-position', '0 ' + (100 - (y / 5)) + '%');
};

d3.select('.chicagos')
    .on('click', function() {
        d3.select('#chicago').classed('after',
            !d3.select('#chicago').classed('after'));
        d3.select('#chicago')
            .style('background-image',
                   d3.select('#chicago').classed('after') ?
                   'url(../images/after.png)' :
                   'url(../images/before.png)');
    })
    .on('mousemove', function() {
        var pos = d3.mouse(this);
        setChi(pos[1]);
    });
