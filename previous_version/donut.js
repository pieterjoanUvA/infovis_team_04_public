
//source: https://bl.ocks.org/tezzutezzu/c2653d42ffb4ecc01ffe2d6c97b2ee5e
function arcTween(d) {

  var i = d3.interpolate(this._current, d);

  this._current = i(0);

  return function(t) {
    return arc(i(t))
  }

}
//general variables
var width = 360;
var height = 360;
var radius = Math.min(width, height) / 2;
var donutWidth = 75;
var color = d3.scaleOrdinal(d3.schemeCategory20c);
var arc = d3.arc()
.innerRadius(radius - donutWidth)
.outerRadius(radius);
var tooltip = d3.select('#chart')
  .append('div')
  .attr('class', 'tooltip');

function createDonut(dataset){(function(d3) {
    'use strict';



	tooltip.append('div')
		.attr('class', 'label');

	tooltip.append('div')
		.attr('class', 'count');

	tooltip.append('div')
		.attr('class', 'percent');

    /*var dataset =*/



    var svg = d3.select('#chart')
		.append('svg')
		.attr('width', width)
		.attr('height', height)
		.append('g')
		.attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')');





    var pie = d3.pie()
		.value(function(d) { return d.value; })
		.sort(null);

    var legendRectSize = 18;
	  var legendSpacing = 4;

    var path = svg.selectAll('path')
		.data(pie(dataset))
		.enter()
		.append('path')
		.attr('d', arc)
		.attr('fill', function(d, i) {
			return color(d.data.key);
		});

    path.on('mouseover', function(d) {
		var total = d3.sum(dataset.map(function(d) {
			return d.value;
		}));
		var percent = Math.round(1000 * d.data.value / total) / 10;
		tooltip.select('.label').html(d.data.key);
		tooltip.select('.count').html(d.data.value);
		tooltip.select('.percent').html(percent + '%');
		tooltip.style('display', 'block');

    });

    path.on('mousemove', function() {
		tooltip.style("top", d3.event.clientY+2)
		tooltip.style("left", d3.event.clientX +2)
    });

    path.on('mouseout', function() {
		tooltip.style('display', 'none');
    });

    var legend = svg.selectAll('.legend')
		.data(color.domain())
		.enter()
		.append('g')
		.attr('class', 'legend')
		.attr('transform', function(d, i) {
			var height = legendRectSize + legendSpacing;
			var offset =  height * color.domain().length / 2;
			var horz = -2 * legendRectSize;
			var vert = i * height - offset;
			return 'translate(' + horz + ',' + vert + ')';
		});

    legend.append('rect')
		.attr('width', legendRectSize)
		.attr('height', legendRectSize)
		.style('fill', color)
		.style('stroke', color);

    legend.append('text')
		.attr('x', legendRectSize + legendSpacing)
		.attr('y', legendRectSize - legendSpacing)
		.text( d => d );

})(window.d3);}

function updateDonut(dataset){(function(d3) {
	//console.log(dataset)

    var color = d3.scaleOrdinal(d3.schemeCategory20c);


	var pie = d3.pie()
		.value(function(d) { return d.value; })
		.sort(null);

	var arc = d3.arc()
		.innerRadius(radius - donutWidth)
		.outerRadius(radius);

	var svg = d3.selectAll('#chart')

	const paths = svg.selectAll('path')
		.data(pie(dataset));

    // lelijk hier

            paths
            .on('mouseover', function(d) {
        		var total = d3.sum(dataset.map(d => d.value));
        		var percent = Math.round(1000 * d.data.value / total) / 10;
        		tooltip.select('.label').html(d.data.key);
        		tooltip.select('.count').html(d.data.value);
        		tooltip.select('.percent').html(percent + '%');
        		tooltip.style('display', 'block');

            });


    // eind lelijk hier

//console.log(dataset);

	const paths2 = paths.enter()
        .append('path')
		.attr('d', arc)
		.attr('fill', function(d, i) {
			return color(d.data.key);
		})
        .merge(paths);

        paths.transition()
        .duration(1000)
        .attrTween("d", arcTween)
//paths.exit().remove();
    paths2.data(pie(dataset))
    .enter()
    	.append('path')
    	.attr('d', arc)
        .transition()
        .duration(1000);
      //  paths2.exit().remove();
    paths.exit()
        .remove();
      //  paths2.exit().remove();
})(window.d3);}
