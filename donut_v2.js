//general variables
var width = 260;
var height = 360;
var radius = Math.min(width, height) / 2;
var donutWidth = 50;
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

  var donutSVG = statsvg;

  var donutG = donutSVG.append('g')
    .attr('transform', 'translate(' + (donutSVG.style("width").replace("px", "") /2) + ',' + (donutSVG.style("height").replace("px", "")/2) + ')');

  var pie = d3.pie()
    .value(function(d) { return d.value; })
    .sort(null);

  var legendRectSize = 18;
  var legendSpacing = 4;

  //ugly code, I know, should be re-done
  var donutData = [{"Child - Male": dataset["Child - Male"]},{"Adult - Male": dataset["Adult - Male"]},{"Child - Female": dataset["Child - Female"]},{"Adult - Female": dataset["Adult - Female"]}]
  var realDonutData = []
  for (var i = 0; i < donutData.length; i++) {
    realDonutData.push({"key":Object.keys(donutData[i])[0], "value":donutData[i][Object.keys(donutData[i])]})
  }
  donutData  = realDonutData

  var path = donutG.selectAll('path')
    .data(pie(donutData))
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

  var legend = donutG.selectAll('.legend')
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

var data = d3.csv("genderdata.csv", function(error, csv_data) {
  week = 1 // apply slider
  year = 2015 // apply slider
  data = csv_data.filter(function (d) {
    if ((d.year == date.getFullYear()) && (d.week == date.getWeek()))
    {
      return d;
    }
  })[0];
  createDonut(data)
})