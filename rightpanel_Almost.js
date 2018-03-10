//The rightpanel SVG element code

//Code that runs on initialization

///////////// BAR CHART //////////////

var news_bardiv = rightpanel.append('div')
    .attr('id', 'news_bar').append("svg")
                .attr("width","100%")
                .attr("height","100%")
                .style("border","1px solid black");
 
var news_barmargin = {top: 10, right: 10, bottom: 170, left: 50};
var news_barsvgwidth = 340;
var news_barsvgheight = 340;

//new method
var news_barsvg = rightpanel.select('#news_bar')
  .select('svg')
  .attr("width", news_barsvgwidth)
  .attr("height", news_barsvgheight);

var news_barwidth = +news_barsvg.attr("width") - news_barmargin.left - news_barmargin.right;
var news_barheight = +news_barsvg.attr("height") - news_barmargin.top - news_barmargin.bottom;
var news_barx = d3.scaleBand().rangeRound([0, news_barwidth]).padding(0.1);
var news_bary = d3.scaleLinear().rangeRound([news_barheight, 0]);
var news_gbar = news_barsvg.append("g")
             .attr("transform", "translate(" + news_barmargin.left + "," + news_barmargin.top + ")");
				

function news_createBar(news_bardata){
  var news_bar_rect =  news_gbar.selectAll(".news_bar")
  var news_bar_text =  news_gbar.selectAll(".news_bar_text")

  ////////// barx and bary domain set functions for auto scaling.

  news_barx.domain(news_bardata.map(function(d) { return d[0]; }));
  news_bary.domain([d3.min(news_bardata, function(v) {return +v[1]; }),d3.max(news_bardata, function(v) { return +v[1]; })]);

//console.log(d3.max(bardata, d => d[1]))

  news_bar_rect.data(news_bardata).enter().append("rect")
  .attr("class", "news_bar")
  .attr("fill", "teal")
    .attr("x", function(d) { return news_barx(d[0]); })
    .attr("height", function(v) {return news_barheight - news_bary(+v[1]); })
   .attr("y", function(d) { return news_bary(+d[1]); })
   .attr("width", news_barx.bandwidth());
   
  news_bar_text.data(news_bardata).enter().append("text")
    .attr("class", "news_bar_text")
    .attr("text-anchor", "middle")
    .attr("font-size", "11px")
    .attr("fill", "black")
      .attr("x", function(d) { return news_barx(d[0]) + news_barx.bandwidth()/2; })
      .attr("y", function(d) { return news_bary(+d[1]) - 2; })
     .text(function(d) { return d[1]; });

  news_gbar.append("g")
      .attr("class", "axis news_axis--x")
      .attr("transform", "translate(0," + news_barheight + ")")
      .call(d3.axisBottom(news_barx))
          .selectAll("text")
          .style("text-anchor", "end")
          .attr("dx", "-0.6em")
          .attr("dy", "0.7em")
          .attr("y", "0em")
          .attr("font-size", "12px")
          .attr("transform", "rotate(-65)");;

  news_gbar.append("g")
      .attr("class", "axis news_axis--y")
   .call(d3.axisLeft(news_bary).ticks(4, ",.0f"))
      .attr("font-size", "12px")
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -25)
      .attr("dy", "-0.71em")
      .attr("dx", "-0.71em")
      .attr("x", 0)
      .attr("font-size", "14px")
      .attr("text-anchor", "end")
      .attr("fill", "black")
      .text("Event Counts");

}

function news_updateBar(news_bardata){
// PERFORM SOME DATA stuff
//  bardata = bardata.map(function(d){
//    d.value = Math.round(d.value *10)/10;
//
//    return d ;
//  }

////////// barx and bary domain set functions for auto scaling.

  news_barx.domain(news_bardata.map(function(d) { return d[0]; }));
  news_bary.domain([d3.min(news_bardata, function(v) { return +v[1]; }),
                d3.max(news_bardata, function(v) { return +v[1]; })]);
console.log(news_bary.domain());
//select all bars on the graph, take them out, and exit the previous data set.
//then you can add/enter the new data set
//console.log(news_bardata.map(function (d){return d[1]}))
//console.log(d3.max(bardata, d => d[1]))
//console.log(news_bardata)
//Join
var news_bar_rect =  d3.selectAll(".news_bar").data(news_bardata);
var news_bar_text = news_gbar.selectAll(".news_bar_text").data(news_bardata);
var news_xbalk = news_gbar.selectAll(".news_axis--x").data(news_bardata);
var news_ybalk = news_gbar.selectAll(".news_axis--y").data(news_bardata);

news_bar_rect.exit().remove();
news_bar_text.exit().remove();
news_xbalk.exit().remove();
news_ybalk.exit().remove();

//UPDATE attributes + do transition
news_bar_rect.transition().duration(400)
.attr("x", function(d) { return news_barx(d[0]); })
.attr("y", function(d) { return news_bary(+d[1]); })
.attr("width", news_barx.bandwidth())
.attr("height", function(v) { return news_barheight - news_bary(+v[1]); })

news_bar_text.transition().duration(400)
.attr("x", function(d) { return news_barx(d[0]) + news_barx.bandwidth()/2; })
.attr("y", function(d) { return news_bary(+d[1]) - 2; })
.text(function(d) { return d[1]; }) ;



news_ybalk.transition().duration(400)
.call(d3.axisLeft(news_bary).ticks(4, ".0f"))
.attr("font-size", "12px")



//ENTER
news_bar_rect.enter().selectAll(".news_bar")
.attr("x", function(d) { return news_barx(d[0]); })
.attr("y", function(d) { return news_bary(+d[1]); })
.attr("width", news_barx.bandwidth())
.attr("height", function(v) { return news_barheight - news_bary(v[1]); })

news_bar_text.enter().append("text")
.attr("class", "news_bar_text")
.attr("text-anchor", "middle")
//.attr("font-size", "14px")
  .attr("x", function(d) { return news_barx(d[0]) + news_barx.bandwidth()/2; })
  .attr("y", function(d) { return news_bary(+d[1]) - 2; })
.attr("fill", "white")
.text(function(d) { return d[1]; });

news_gbar.enter().append("g")
     .attr("class", "axis news_axis--y")
   .call(d3.axisLeft(news_bary).ticks(4, ",.0f"))
   .attr("font-size", "12px")
   .append("text")
     .attr("transform", "rotate(-90)")
     .attr("y", -25)
     .attr("dy", "-0.71em")
     .attr("dx", "-0.71em")
     .attr("x", 4)
     .attr("text-anchor", "end")
   .attr("fill", "black")
     .text("Event Counts");



}