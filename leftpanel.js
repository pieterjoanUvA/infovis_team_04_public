//The Leftpanel SVG element code

//Code that runs on initialization
var statsvg = leftpanel.append("svg")
                .attr("width","100%")
                .attr("height","50%");

//source: https://bl.ocks.org/tezzutezzu/c2653d42ffb4ecc01ffe2d6c97b2ee5e
function arcTween(d)
{
  var i = d3.interpolate(this._current, d);
  this._current = i(0);
  return function(t)
  {
    return arc(i(t));
  }
}
//general variables
var don1svgmargin = {top: 10, right: 10, bottom: 10, left: 10};
// testing dynamic size.
//var don1svgwidth = 240;
//var don1svgheight = 240;
//Draw the static-static parts of the lineChart
var	don1svgwidth = Math.min(statsvg.node().getBoundingClientRect().width - don1svgmargin.left - don1svgmargin.right,
          statsvg.node().getBoundingClientRect().height - don1svgmargin.top - don1svgmargin.bottom);
var don1svgheight = don1svgwidth;
// center donut in line_width with margin change.
don1svgmargin.left = don1svgmargin.left + (statsvg.node().getBoundingClientRect().width - don1svgheight - don1svgmargin.left - don1svgmargin.right)/ 2;

var don1svgradius = Math.min(don1svgwidth, don1svgheight) / 2 ;
var don1svgdonutWidth = 42;
var color = d3.scaleOrdinal(d3.schemeCategory20c);
var arc = d3.arc()
  .innerRadius(don1svgradius - don1svgdonutWidth)
  .outerRadius(don1svgradius);
var don1svgtooltip = leftpanel.append('div')
  .attr('class', 'customtooltip');

function createDonut(data)
{(
  function(d3)
  {
    don1svgtooltip.append('div')
      .attr('class', 'label');
    don1svgtooltip.append('div')
      .attr('class', 'count');
    don1svgtooltip.append('div')
      .attr('class', 'percent');
    var don1svg = statsvg
	    .append('g')
      .attr('transform', 'translate(' + ( (don1svgwidth / 2)+don1svgmargin.left ) + ',' + ((don1svgheight / 2)+don1svgmargin.top) + ')');

    var pie = d3.pie()
	    .value(function(d)
      {
        return d[1];
      })
	    .sort(null);

    var legendRectSize = 18;
	  var legendSpacing = 2;

    var chartname = 'gender'; // for id-creation => for highlighting purposes

    var don1svgpath = don1svg.selectAll('path') //.selectAll('path')//statsvg.selectAll('path')
		  .data(pie(data))
		    .enter()
		    .append('path')
		    .attr('d', arc)
        .attr("class", "arc")
        .attr("id", function(d,i) {return chartname+"id_"+i})
		    .attr('fill', function(d, i)
        {
		        return color(d.data[0]);
	      })
        .on('click', function(d, i)
        {
          var selectedChart = don1svg
          highlightSelected(selectedChart, chartname, i);
          filter = "gender";
          filtervalue = d.data[0];
          updatelabel();
          datarefresh();
        });

    don1svgpath.on('mouseover', function(d)
    {
  		//var percent = Math.round(1000 * d.data.value / d[1]) / 10;
  		don1svgtooltip.select('.label').html(d.data[0]);
  		don1svgtooltip.select('.count').html(d.data[1]);
  		//don1svgtooltip.select('.percent').html(percent + '% needs total');
  		don1svgtooltip.style('display', 'block');
    });

    don1svgpath.on('mousemove', function()
    {
  		don1svgtooltip.style("top", d3.event.clientY+ "px");
  		don1svgtooltip.style("left", d3.event.clientX+ "px");
    });

    don1svgpath.on('mouseout', function()
    {
		  don1svgtooltip.style('display', 'none');
    });

    var legend = don1svg.selectAll('.legend')
		.data(color.domain())
		.enter()
		.append('g')
		.attr('class', 'legend')
		.attr('transform', function(d, i)
    {
			var legend_height = legendRectSize + legendSpacing;
			var legend_offset =  legend_height * color.domain().length / 2;
			var horz = -2 * legendRectSize;
			var vert = i * legend_height - legend_offset;
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
  })
  (window.d3);
}

function updateDonut(dataset)
{
  (function(d3)
  {
    var color = d3.scaleOrdinal(d3.schemeCategory20c);
    var pie = d3.pie()
      .value(function(d) { return d[1]; })
  	  .sort(null);
    var arc = d3.arc()
      .innerRadius(don1svgradius - don1svgdonutWidth)
  	  .outerRadius(don1svgradius);
    const don1svgpaths = statsvg.selectAll('path')
  	  .data(pie(dataset));

    don1svgpaths.on('mouseover', function(d)
    {
      don1svgtooltip.select('.label').html(d.data[0]);
      don1svgtooltip.select('.count').html(d.data[1]);
      don1svgtooltip.style('display', 'block');
    });

    const don1svgpaths2 = don1svgpaths.enter()
      .append('path')
  	   .attr('d', arc)
  	   .attr('fill', function(d, i)
       {
  		     return color(d.data[0]);
  	   })
       .merge(don1svgpaths);

    don1svgpaths.transition()
      .duration(1000)
      .attrTween("d", arcTween);
    don1svgpaths2.data(pie(dataset))
      .enter()
    	.append('path')
        .attr('d', arc)
        .transition()
        .duration(1000);

    don1svgpaths.exit()
        .remove();
  })
  (window.d3);
}

///////////// BAR CHART //////////////

var barsvg = leftpanel.append("svg")
                .attr("width","100%")
                .attr("height","50%");

var barmargin = {top: 10, right: 10, bottom: 80, left: 55};
var barwidth = barsvg.node().getBoundingClientRect().width - barmargin.left - barmargin.right ;
var barheight = barsvg.node().getBoundingClientRect().height - barmargin.top - barmargin.bottom  ;


var barx = d3.scaleBand().rangeRound([0, barwidth]).padding(0.1);
// a bit ugly solution for the Short Naming and keeping filter click working
var barxNames = d3.scaleBand().rangeRound([0, barwidth]).padding(0.1);
// end of extra X-axis creation.
var bary = d3.scaleLinear().rangeRound([barheight, 0]);
var gbar = barsvg.append("g")
             .attr("transform", "translate(" + barmargin.left + "," + barmargin.top + ")");


var deathtooltip = leftpanel.append('div').attr('class', 'customtooltip');//.attr('id','bar');



function createBar(bardata){
  var bar_rect =  gbar.selectAll(".bar");
  var bar_text =  gbar.selectAll(".bar_text");
  ////////// barx and bary domain set functions for auto scaling.

  barx.domain(bardata.map(function(d) { return d[0]; }));
  barxNames.domain(keys_death_short.map(function (d){return [d]}));
  bary.domain([d3.min(bardata, function(v) { return +v[1]; }),d3.max(bardata, function(v) { return +v[1]; })]);

  // tooltip functions
  deathtooltip.append('div').attr('class','label');

/// Bar rectangles creation.
  var chartname = 'bar'; // for id-creation => for highlighting purposes
  bar_rect.data(bardata).enter().append("rect")
  .attr("class", "bar")
    .attr("id", function(d,i) {return chartname+"id_"+i})
    .attr("x", function(d) { return barx(d[0]); })
    .attr("height", function(v) { return barheight - bary(+v[1]) ; })
   .attr("y", function(d) { return bary(+d[1]); })
   .attr("width", barx.bandwidth())
   .on('click', function(d,i)
   {
     var selectedChart = barsvg;
     highlightSelected(selectedChart, chartname, i);
     filter = "deathCause";
     filtervalue = d[0];
     updatelabel();
     datarefresh();
   });
   /// text above bars with Counts
  bar_text.data(bardata).enter().append("text")
    .attr("class", "bar_text")
    .attr("text-anchor", "middle")
    .attr("font-size", "11px")
    .attr("fill", "black")
      .attr("x", function(d) { return barx(d[0]) + barx.bandwidth()/2; })
      .attr("y", function(d) { return bary(+d[1]) - 2; })
     .text(function(d) { return d[1]; });
/// x-axis creation plus setting the labels in 65-degrees angle.
/// plus the labels from the data in variable 'barx'
/// with tooltips.
  gbar.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + barheight + ")")
      .call(d3.axisBottom(barxNames)) // barxNames if for the shortnames solution instead of normal barx
          .selectAll("text")
          .style("text-anchor", "end")
          .attr("dx", "-0.6em")
          .attr("dy", "0.7em")
          .attr("y", "0em")
          .attr("font-size", "12px")
          .attr("transform", "rotate(-65)")
          .on('mouseover',function(d,i)
              {
            		deathtooltip.select('.label').html(keys_deathcause[i]);
            		deathtooltip.style('display', 'block');
              })
           .on('mousemove', function()
              {
            		deathtooltip.style("top", d3.event.clientY+ "px");
            		deathtooltip.style("left", d3.event.clientX+ "px");
              })
           .on('mouseout', function()
              {
          		  deathtooltip.style('display', 'none');
              });

/// y-axis create + 90degrees text.
  gbar.append("g")
      .attr("class", "axis axis--y")
   .call(d3.axisLeft(bary).ticks(4, ",.0f"))
      .attr("font-size", "12px")
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -27)
      .attr("dy", "-0.71em")
      .attr("dx", "-0.71em")
      .attr("x", 0)
      .attr("font-size", "14px")
      .attr("text-anchor", "end")
      .attr("fill", "black")
      .text("Casualties");



}

function updateBar(bardata){
// PERFORM SOME DATA stuff
//  bardata = bardata.map(function(d){
//    d.value = Math.round(d.value *10)/10;
//
//    return d ;
//  }

////////// barx and bary domain set functions for auto scaling.

  barx.domain(bardata.map(function(d) { return d[0]; }));
  bary.domain([d3.min(bardata, function(v) { return +v[1]; }),
                d3.max(bardata, function(v) { return +v[1]; })]);
//select all bars on the graph, take them out, and exit the previous data set.
//then you can add/enter the new data set

//Join
var bar_rect =  d3.selectAll(".bar").data(bardata);
var bar_text = gbar.selectAll(".bar_text").data(bardata);
var xbalk = gbar.selectAll(".axis--x").data(bardata);
var ybalk = gbar.selectAll(".axis--y").data(bardata);

bar_rect.exit().remove();
bar_text.exit().remove();
xbalk.exit().remove();
ybalk.exit().remove();

//UPDATE attributes + do transition
bar_rect.transition().duration(400)
.attr("x", function(d) { return barx(d[0]); })
.attr("y", function(d) { return bary(+d[1]); })
.attr("width", barx.bandwidth())
.attr("height", function(v) { return barheight - bary(+v[1]); })

bar_text.transition().duration(400)
.attr("x", function(d) { return barx(d[0]) + barx.bandwidth()/2; })
.attr("y", function(d) { return bary(+d[1]) - 2; })
.text(function(d) { return d[1]; });



ybalk.transition().duration(400)
.call(d3.axisLeft(bary).ticks(4, ".0f"))
.attr("font-size", "12px")

//ENTER
bar_rect.enter().selectAll(".bar")
.attr("x", function(d) { return barx(d[0]); })
.attr("y", function(d) { return bary(+d[1]); })
.attr("width", barx.bandwidth())
.attr("height", function(v) { return barheight - bary(v[1]); })
.on('click', function(d)
{
  filter = "deathCause";
  filtervalue = d[0];
  updatelabel();
  datarefresh();
})

bar_text.enter().append("text")
.attr("class", "bar_text")
.attr("text-anchor", "middle")
//.attr("font-size", "14px")
  .attr("x", function(d) { return barx(d[0]) + barx.bandwidth()/2; })
  .attr("y", function(d) { return bary(+d[1]) - 2; })
.attr("fill", "white")
.text(function(d) { return d[1]; });

gbar.enter().append("g")
     .attr("class", "axis axis--y")
   .call(d3.axisLeft(bary).ticks(4, ",.0f"))
   .attr("font-size", "12px")
   .append("text")
     .attr("transform", "rotate(-90)")
     .attr("y", -25)
     .attr("dy", "-0.71em")
     .attr("dx", "-0.71em")
     .attr("x", 4)
     .attr("text-anchor", "end")
   .attr("fill", "black")
     .text("Casualties");



}
