var cartogram_image = d3.select('.cartogram-image');

var spriteScale = d3.scale.linear()
    .domain([0, 1])
    .range([0, 32768]);

function bgTween() {
    return function(i) {
        return (-Math.floor(spriteScale(i) / 512) * 512) + 'px 0px';
    };
}

function clickYear() {
    d3.select(this).text();
    cartogram_image
        .transition()
        .duration(10000)
        .ease('linear')
        .styleTween('background-position', bgTween);
}

d3.select('#regions')
    .selectAll('h3')
    .on('click', clickYear);
