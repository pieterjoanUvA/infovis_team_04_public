//The Botpanel SVG element code (and slider)
var sliderbar = botpanel.select("#slider").style("width","100%");

//The slider selection Reset button in the top.panel.
$('#resetfilter').click(function(e){
  resetfilter();
})
//Interacting with the slider bar
sliderbar.on("mouseup", function()
{
	lastSelectedTime = this.value; // for filter-reset
	datarefresh(this.value);
});

sliderbar.on("input", function()
{
	timerefresh(this.value);
});

//Botpanel SVG Element
var graphsvg = botpanel.append("svg")
								.attr("width","100%")
								.attr("height","37%");

//Draw the static-static parts of the lineChart
var	line_width = graphsvg.node().getBoundingClientRect().width,
    line_height = graphsvg.node().getBoundingClientRect().height-25;

var linegraph = graphsvg.append("g")
									.attr("width",line_width)
									.attr("height",line_height);

var line_x = d3.scaleTime().range([0,line_width]);
var line_y = d3.scaleLinear().range([line_height,0]);

var line = d3.line()
						.x(function(d) { return line_x(d.time); })
						.y(function(d) { return line_y(d.deaths); });

//Line tooltip which has to sync with the sliderbar
var mouseG = graphsvg.append("g")
      .attr("class", "mouse-over-effects");

mouseG.append("path") // this is the white vertical line to follow mouse
      .attr("class", "mouse-line")
      .style("stroke", "white")
      .style("stroke-width", "1px");


///////////News Line Chart

var news_graphsvg = botpanel.append("svg")
								.attr("width","100%")
								.attr("height","37%");

//Draw the static-static parts of the lineChart
var	news_line_width = news_graphsvg.node().getBoundingClientRect().width,
    news_line_height = news_graphsvg.node().getBoundingClientRect().height-25;

var news_linegraph = news_graphsvg.append("g")
									.attr("width",news_line_width)
									.attr("height",news_line_height);

var news_line_x = d3.scaleTime().range([0,news_line_width]);
var news_line_y = d3.scaleLinear().range([news_line_height,0]);

var news_line = d3.line()
						.x(function(d) { return news_line_x(d.time); })
						.y(function(d) { return news_line_y(d.NumSources); });

//Line tooltip which has to sync with the sliderbar
var mouseG2 = news_graphsvg.append("g")
      .attr("class", "mouse-over-effects2");

mouseG2.append("path") // this is the black vertical line to follow mouse
      .attr("class", "mouse-line2")
      .style("stroke", "white")
      .style("stroke-width", "1px");
