//The Botpanel SVG element code (and slider)
var sliderbar = botpanel.select("#slider").style("width","100%");

//Interacting with the slider bar
sliderbar.on("mouseup", function()
{
	datarefresh(this.value);
});

sliderbar.on("input", function()
{
	timerefresh(this.value);
});

//Botpanel SVG Element
var graphsvg = botpanel.append("svg")
								.attr("width","100%")
								.attr("height","75%")
								.attr("position","absolute");

//Draw the static-static parts of the lineChart
// var	line_width = graphsvg.attr("width"),
//     line_height = graphsvg.attr("width");
//
// var linegraph = graphsvg.append("g")
// 									.attr("width",line_width)
// 									.attr("height",line_height);
//
// var line_x = d3.scaleTime().range([0,line_width]);
// var line_y = d3.scaleLinear().range([line_height,0]);
//
// var line = d3.line()
// 						.x(function(d) { return line_x(d.time); })
// 						.y(function(d) { return line_y(d.deaths); });
