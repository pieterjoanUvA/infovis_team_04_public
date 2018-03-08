//The Leftpanel SVG element code

//Code that runs on initialization
var statsvg = leftpanel.append("svg")
                .attr("width","100%")
                .attr("height","100%")
                .style("border","1px solid black");
//Raw dump of previous version

//source: https://bl.ocks.org/tezzutezzu/c2653d42ffb4ecc01ffe2d6c97b2ee5e
function arcTween(d) {

  var i = d3.interpolate(this._current, d);

  this._current = i(0);

  return function(t) {
    return arc(i(t))
  }

}
//general variables
var don1svgwidth = 240;
var don1svgheight = 240;
var don1svgradius = Math.min(don1svgwidth, don1svgheight) / 2;
var don1svgdonutWidth = 42;
var color = d3.scaleOrdinal(d3.schemeCategory20c);
var arc = d3.arc()
.innerRadius(don1svgradius - don1svgdonutWidth)
.outerRadius(don1svgradius);
var don1svgtooltip = leftpanel.append('div')
    .attr('class', 'customtooltip');


function createDonut(data){(function(d3) {
    'use strict';
//console.log(data);
	don1svgtooltip.append('div')
		.attr('class', 'label');

	don1svgtooltip.append('div')
		.attr('class', 'count');

	don1svgtooltip.append('div')
		.attr('class', 'percent');

    /*var dataset =*/
/*    var svg = d3.select('#chart')
		.append('svg')
		.attr('width', width)
		.attr('height', height)
		.append('g')
		.attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')');
    */
    var don1svg = statsvg//.append('svg')
		.append('g')
		.attr('transform', 'translate(' + (don1svgwidth / 2) + ',' + (don1svgheight / 2) + ')');

    var pie = d3.pie()
		.value(function(d) {
      return d[1]; })
		.sort(null);

    var legendRectSize = 18;
	  var legendSpacing = 2;

    var don1svgpath = don1svg.selectAll('path') //.selectAll('path')//statsvg.selectAll('path')
		.data(pie(data))
		.enter()
		.append('path')
		.attr('d', arc)
		.attr('fill', function(d, i) {
			return color(d.data[0]);
		});

    don1svgpath.on('mouseover', function(d) {
		//var percent = Math.round(1000 * d.data.value / d[1]) / 10;
		don1svgtooltip.select('.label').html(d.data[0]);
		don1svgtooltip.select('.count').html(d.data[1]);
		//don1svgtooltip.select('.percent').html(percent + '% needs total');
		don1svgtooltip.style('display', 'block');

    });

    don1svgpath.on('mousemove', function() {
		don1svgtooltip.style("top", d3.event.clientY+ "px")
		don1svgtooltip.style("left", d3.event.clientX+ "px")
    });

    don1svgpath.on('mouseout', function() {
		don1svgtooltip.style('display', 'none');
    });

    var legend = don1svg.selectAll('.legend')
		.data(color.domain())
		.enter()
		.append('g')
		.attr('class', 'legend')
		.attr('transform', function(d, i) {
			var legend_height = legendRectSize + legendSpacing;
			var legend_offset =  legend_height * color.domain().length / 2;
			var horz = -2 * legendRectSize;
			var vert = i * legend_height - legend_offset;
      console.log(horz)
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
		.value(function(d) { return d[1]; })
		.sort(null);

	var arc = d3.arc()
		.innerRadius(don1svgradius - don1svgdonutWidth)
		.outerRadius(don1svgradius);

	const don1svgpaths = statsvg.selectAll('path')
		.data(pie(dataset));

  don1svgpaths
  .on('mouseover', function(d) {
	//var total = d3.sum(dataset.map(d => d.value));
	//var percent = Math.round(1000 * d.data.value / total) / 10;
	don1svgtooltip.select('.label').html(d.data[0]);
	don1svgtooltip.select('.count').html(d.data[1]);
	//don1svgtooltip.select('.percent').html(percent + '%');
	don1svgtooltip.style('display', 'block');

  });

	const don1svgpaths2 = don1svgpaths.enter()
        .append('path')
		.attr('d', arc)
		.attr('fill', function(d, i) {
			return color(d.data[0]);
		})
        .merge(don1svgpaths);

        don1svgpaths.transition()
        .duration(1000)
        .attrTween("d", arcTween)
//paths.exit().remove();
    don1svgpaths2.data(pie(dataset))
    .enter()
    	.append('path')
    	.attr('d', arc)
        .transition()
        .duration(1000);
      //  paths2.exit().remove();
    don1svgpaths.exit()
        .remove();
      //  paths2.exit().remove();
})(window.d3);}
