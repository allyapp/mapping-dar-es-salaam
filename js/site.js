var $notes = $('.cartogram-notes');
var $frame = $('.cartogram-frame');
$notes.find('p').hide();

function lpad(n, padto) {
    while (('' + n).length < padto) n = '0' + n;
    return n;
}

function findRange(frame) {
    var ranges = [0, 20, 37, 44, 65];
    for (var i = 0; i < ranges.length; i++) {
        if (ranges[i + 1] === undefined || ranges[i + 1] > frame) {
            return i;
        }
    }
}

new Dragdealer('cartogram-slider', {
    horizontal: true,
    vertical: false,
    animationCallback: function(x, y) {
        var fn = Math.round(x * 64 + 1);
        $notes.find('p').hide();
        $notes.find('p').eq(findRange(fn)).show();
        $frame.attr('src', 'frames/' + lpad(fn, 3) + '.ppm.gif');
    }
});
