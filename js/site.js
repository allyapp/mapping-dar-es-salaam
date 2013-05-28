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

var beforeLayer = d3.select('#chicago-before').node();

d3.select('.chicagos')
    .on('mousemove', function() {
        var pos = d3.mouse(this);
        d3.timer.flush();
        d3.timer(function() {
            beforeLayer.style.clip = 'rect(0px ' + pos[0] + 'px 9999999px 0px)';
            return true;
        }, 0);
    });
