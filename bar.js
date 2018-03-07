var jaarselectie = 2012;
var hasRun = 0;
var data;
var barmargin = {top: 20, right: 20, bottom: 30, left: 40};
var barsvgwidth = 960;
var barsvgheight = 500;

//new method
var barsvg = d3.select('#bar')
  .append('svg')
  .attr("width", barsvgwidth)
  .attr("height", barsvgheight);

var barwidth = +barsvg.attr("width") - barmargin.left - barmargin.right;
var barheight = +barsvg.attr("height") - barmargin.top - barmargin.bottom;

//barwidth = +barsvg.attr("width") - barmargin.left - barmargin.right,
//barheight = +barsvg.attr("height") - barmargin.top - barmargin.bottom;


// oud svg selected
/*
var svg = d3.select("svg"),
    barmargin = {top: 20, right: 20, bottom: 30, left: 40},
    barwidth = +svg.attr("width") - barmargin.left - barmargin.right,
    barheight = +svg.attr("height") - barmargin.top - barmargin.bottom;
*/
var gbar = barsvg.append("g")
             .attr("transform", "translate(" + barmargin.left + "," + barmargin.top + ")");
hasRun = hasRun +1;

//Jaar Range bepalingen
var jaarRange = d3.csv("meteo.csv", function(error, csv_data) {
jaar_min = d3.min(csv_data.map(function(d){return d.year;})) ;
jaar_max = d3.max(csv_data.map(function(d){return d.year;})) ;
});
function change(meteo, x, y, hasRun){
  // Allow the arrow keys to change the displayed year.
  d3.select(window).on("keydown", function() {
    switch (d3.event.keyCode) {
      case 37: if(jaarselectie > jaar_min){jaarselectie = jaarselectie -1}; break;
      case 39: if(jaarselectie < jaar_max){jaarselectie = jaarselectie +1}; break;
    }
  update(jaarselectie, hasRun);
  });
}
function drawOnce(barheight, x,y , jaarselectie, meteo, barmargin, barwidth, barheight, barsvg, hasRun){
var bar_rect =  gbar.selectAll(".bar")
var bar_text =  gbar.selectAll(".bar_text")

bar_rect.data(meteo).enter().append("rect")
.attr("class", "bar")
  .attr("x", function(d) { return x(d.key); })
  .attr("height", function(v) { return barheight - y(v.value); })
 .attr("y", function(d) { return y(d.value); })
 .attr("width", x.bandwidth());
bar_text.data(meteo).enter().append("text")
  .attr("class", "bar_text")
  .attr("text-anchor", "middle")
  .attr("font-size", "14px")
  .attr("fill", "white")
    .attr("x", function(d) { return x(d.key) + x.bandwidth()/2; })
    .attr("y", function(d) { return y(d.value) + 20; })
   .text(function(d) { return d.value; });

gbar.append("g")
    .attr("class", "axis axis--x")
    .attr("transform", "translate(0," + barheight + ")")
    .call(d3.axisBottom(x));

gbar.append("g")
    .attr("class", "axis axis--y")
 .call(d3.axisLeft(y).ticks(10, " "))
  .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", "0.71em")
    .attr("text-anchor", "end")
  .attr("fill", "black")
    .text("℃");

gbar.append("text")
  .attr("class", "jaar")
    .attr("x", 80)
    .attr("y",  46)
    .attr("fill", "black")
  .attr("font-size", "24px")
    .attr("text-anchor", "middle")
.text("Jaar: "+jaarselectie);
}

function update(jaarselectie, hasRun){
var data = d3.csv("meteo.csv", function(error, csv_data) {
  var meteoyear = csv_data.filter(function(d){ return d.year == jaarselectie});

  var meteo = d3.nest()
    .key(function(d) {return d.month;})
  .rollup(function(d) {
     return d3.mean(d, function(g) {
       g.temperature = g.temperature / 10
    return g.temperature;  });
  }).entries(meteoyear);

  meteo = meteo.map(function(d){
    d.value = Math.round(d.value *10)/10;
    switch(d.key){
      case("01"):d.key="January";break;
      case("02"):d.key="February";break;
      case("03"):d.key="March";break;
      case("04"):d.key="April";break;
      case("05"):d.key="May";break;
      case("06"):d.key="June";break;
      case("07"):d.key="July";break;
      case("08"):d.key="August";break;
      case("09"):d.key="September";break;
      case("10"):d.key="October";break;
      case("11"):d.key="November";break;
      case("12"):d.key="December";break;
    }
    return d ;
   });
    redraw( meteo, barsvg, barmargin, barwidth, barheight, hasRun);
 });
 change(jaarselectie, hasRun);
}

function redraw(meteo, barsvg, barmargin, barwidth, barheight, hasRun){

var x = d3.scaleBand().rangeRound([0, barwidth]).padding(0.1),
  y = d3.scaleLinear().rangeRound([barheight, 0]);
x.domain(meteo.map(function(d) { return d.key; }));
y.domain([d3.min(meteo, function(v) {
    if (v.value >= 0){return - 4; }else{ v.value = v.value -4; return v.value -4; } }),
     d3.max(meteo, function(v) { return v.value; })]);

//select all bars on the graph, take them out, and exit the previous data set.
//then you can add/enter the new data set
if(hasRun === 1){
drawOnce(barheight, x,y , jaarselectie, meteo, barmargin, barwidth, barheight, barsvg, hasRun);
hasRun = +hasRun +1;
//  console.log("drawOnce has been run"+hasRun)
}else{
//  console.log("drawOnce has not been run")
}

//Join
var bar_rect =  d3.selectAll(".bar").data(meteo);
var bar_text = gbar.selectAll(".bar_text").data(meteo);
var jaartext = gbar.select(".jaar");
var ybalk = gbar.selectAll(".axis--y").data(meteo);

bar_rect.exit().remove();
bar_text.exit().remove();
jaartext.exit().remove();
ybalk.exit().remove();

//UPDATE attributes + do transition
bar_rect.transition().duration(400)
.attr("x", function(d) { return x(d.key); })
.attr("y", function(d) { return y(d.value); })
.attr("width", x.bandwidth())
.attr("height", function(v) { return barheight - y(v.value); })

bar_text.transition().duration(400)
.attr("x", function(d) { return x(d.key) + x.bandwidth()/2; })
.attr("y", function(d) { return y(d.value) + 20; })
.text(function(d) { return d.value; });

jaartext.text("Jaar: " + jaarselectie);

ybalk.transition().duration(400)
.call(d3.axisLeft(y).ticks(10, " "))

//ENTER
bar_rect.enter().selectAll(".bar")
.attr("x", function(d) { return x(d.key); })
.attr("y", function(d) { return y(d.value); })
.attr("width", x.bandwidth())
.attr("height", function(v) { return barheight - y(v.value); })

bar_text.enter().append("text")
.attr("class", "bar_text")
.attr("text-anchor", "middle")
.attr("font-size", "14px")
  .attr("x", function(d) { return x(d.key) + x.bandwidth()/2; })
  .attr("y", function(d) { return y(d.value) + 20; })
.attr("fill", "white")
.text(function(d) { return d.value; });

gbar.enter().append("g")
     .attr("class", "axis axis--y")
   .call(d3.axisLeft(y).ticks(10, " "))
   .append("text")
     .attr("transform", "rotate(-90)")
     .attr("y", 6)
     .attr("dy", "0.71em")
     .attr("text-anchor", "end")
   .attr("fill", "black")
     .text("℃");

}
update(jaarselectie, hasRun);
