var c = document.getElementById('c');

var canvas_width = c.offsetWidth,
    canvas_height = 400;

var sample_coeff = 1 / 0.100303569986;
var sample_sum = 275065462;
var sample_count = 30797;
var color = d3.scale.category20c();

var treemap = d3.layout.treemap()
    .size([canvas_width, canvas_height])
    .sort(function(a, b) {
        return a.value - b.value;
    }).mode('squarify');

var ctx = c.getContext('2d');
c.width = canvas_width;
c.height = canvas_height;

d3.json("js/sampled.json", function(error, root) {

    var data = {
        value:0,
        children: root.map(function(r) {
            return { value: r };
        })
    };

    var map = treemap.nodes(data);
    var n = root.length;
    var limit = 0;
    var limitmax = 1;
    var text_summary = d3.select("#handle").append('div').attr('class', 'summary');

    function draw() {
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, canvas_width, canvas_height);
        function position(d, i) {
          if (d.x / canvas_width < limit || d.x / canvas_width > limitmax) return;
          if (d.children) return;
          total_sum += +d.value;
          total_count++;
          ctx.fillStyle = (d.children) ? '#fff' : color(i);
          ctx.fillRect(~~d.x, ~~d.y,
              ~~Math.max(0, d.dx),
              ~~Math.max(0, d.dy));
        }

        var total_sum = 0;
        var total_count = 0;

        map.forEach(position)
        text_summary.text(
            (100 * total_sum / sample_sum).toFixed(2) + '% of changes are submitted by ' +
            (100 * total_count / sample_count).toFixed(2) + '% of users');
    }


    (function() {
        var width = canvas_width - 100;
        var height = 20;
        var margin = {top: 10, right: 50, bottom: 10, left: 50};

        var x = d3.scale.linear()
            .range([0, width]);

        var y = d3.random.normal(height / 2, height / 8);

        var svg = d3.select("#handle").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
          .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var brush = d3.svg.brush()
            .x(x)
            .extent([0, 1])
            .on("brushstart", brushstart)
            .on("brush", brushmove)
            .on("brushend", brushend);

        var brushg = svg.append("g")
            .attr("class", "brush")
            .call(brush);

        var arc = d3.svg.arc()
            .outerRadius(height / 2)
            .startAngle(0)
            .endAngle(function(d, i) { return i ? -Math.PI : Math.PI; });

        brushg.selectAll(".resize").append("path")
            .attr("transform", "translate(0," +  height / 2 + ")")
            .attr("d", arc);

        brushg.selectAll("rect")
            .attr("height", height);

        brushstart();
        brushmove();

        function brushstart() {
          svg.classed("selecting", true);
        }

        function brushmove() {
          var s = brush.extent();
          limit = s[0];
          limitmax = s[1];
          draw();
        }

        function brushend() {
          svg.classed("selecting", !d3.event.target.empty());
        }
    })();

    draw();
});
