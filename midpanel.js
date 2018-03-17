
//Add a selecting window to filter different data
var choice = "total"
//The Midpanel SVG element code
//Code that runs on initialization
var mapsvg = midpanel.append("svg")
              .attr("width","100%")
              .attr("height","100%");

// Define some values for the legend
var legendFullHeight = 400;
var legendFullWidth = 100;
var legendMargin = { top: 80, bottom: 30, left: 0, right: 80 };
 // use same margins as main plot
    var legendWidth = legendFullWidth - legendMargin.left - legendMargin.right;
    var legendHeight = legendFullHeight - legendMargin.top - legendMargin.bottom;

var colorScale = d3.scaleLinear()
    .range(["rgb(151, 215, 185)", "rgb(40, 151, 191)","rgb(32, 57, 144)","#20068f","#3a049a","#5302a3","#6a00a8","#8004a8","#9511a1","#a82296","#b83289"]);

var legendSvg = mapsvg.append('g').attr("class", "legend")
var legendSvg = legendSvg.append('svg')
    .attr('width', legendFullWidth).attr('height', legendFullHeight);
var defs = legendSvg.append("defs");   
var gradient = defs.append("linearGradient")
.attr("id", "mainGradient")
.attr("x1", "0%")
.attr("y1", "0%")
.attr("x2", "0%")
.attr("y2", "100%")
.attr("spreadMethod", "pad")
gradient.selectAll("stop") 
.data( colorScale.range() )                  
.enter().append("stop")
.attr("offset", function(d,i) { return i/(colorScale.range().length-1); })
.attr("stop-color", function(d) { return d; });

legendSvg.append("rect")
.style("fill", "url(#mainGradient)")
.attr('x', legendMargin.left)
.attr('y', legendMargin.top)
.attr('width', legendWidth)
.attr('height', legendHeight);

var lengendy = d3.scaleLinear()
.range([legendMargin.top, legendHeight+legendMargin.top])
.domain([0, 1878]);
var yAxis = d3.axisRight()
.scale(lengendy)
.ticks(10);

legendSvg.append("g")
.attr("class", "maplegend")
.attr("transform", "translate("  +18 + ", 0)")
.call(yAxis)
.select(".domain").remove();
legendSvg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 80)
      .attr("x",0 - (legendHeight / 1.3))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text(choice);     

//Define UpdateMap Function
function updateMap()
{
d3.queue()
.defer(d3.json, "SYR_adm1.json")
.defer(d3.csv, "key_province.csv", )
.await(ready)
function ready(error, data, dataset)
{ if (error) throw error;
  var province_update = topojson.feature(data, data.objects["SYR_adm1-1"]).features
  var dataset_filtered = dataset.filter(function(d)
  { //filter by year and week  
    if(d["year"] == date.getFullYear() && d["week"] == date.getWeek())  {
      return d}})
 for (i=0; i<province_update.length;i++) { // for each geometry object

  for (j=0; j<dataset_filtered.length; j++) { if ( province_update[i].properties.NAME_1 ==  dataset_filtered[j].province
  ) {
    province_update[i].properties.count=dataset_filtered[j][choice]
  }}}
  function getDataRange() {
    var min = Infinity, max = -Infinity;
    for (i=0; i<dataset.length;i++) {if (min > +dataset[i][choice]){min = +dataset[i][choice]}
  if (max < +dataset[i][choice]){max =+dataset[i][choice]} }
    return [min, max];
}
  var dataRange = getDataRange(); // get the min/max values from the range of count
  /////////////////////

  function getColor(valueIn, valuesIn) {
    // create a linear scale
    if (valueIn< (valuesIn[1]-valuesIn[0])/4){
    var color =  d3.scaleSequential(d3.interpolateYlGnBu)
    .domain([-(valuesIn[1]-valuesIn[0])/8, (valuesIn[1]-valuesIn[0])/4])  // input uses min and max values;   // output for opacity between .3 and 1 
    return color(valueIn); } // return that number to the caller
    else{
      var color =  d3.scaleSequential(d3.interpolatePlasma)
      .domain([(valuesIn[1]-valuesIn[0])/4, 2*valuesIn[1]]) 
      return color(valueIn);
    }
}

///////////////////////////
  var paths = mapsvg.selectAll("path")  
          .data(province_update)    
          .attr('fill', function (d) {
  return getColor(d.properties.count, dataRange);  // give them an opacity value based on their current value
})
paths.on('mouseover', function(d)
{
 var province_name= d.properties.NAME_1
 var count = d.properties.count
  maptooltip.select('.province').html(province_name);
  maptooltip.select('.count').html(count);
  maptooltip.style('display', 'block');
});
paths.exit()
  .remove();


}
}


var maptooltip = midpanel.append('div')
  .attr('class', 'customtooltip');

d3.queue()
  .defer(d3.json, "SYR_adm1.json")
  .defer(d3.csv, "key_province.csv")
  .await(ready)

//projection
var projection = d3.geoMercator()
  .translate([-3000, 3550])
  .scale(5000)
//create a geopath to project
var path = d3.geoPath()
  .projection(projection)
// initial draw function
function ready(error, data, dataset)
{ if (error) throw error;
  var province = topojson.feature(data, data.objects["SYR_adm1-1"]).features
  var border = topojson.mesh(data, data.objects["SYR_adm1-1"], function(a, b) { return a !== b; })
  var dataset_filtered = dataset.filter(function(d)
  { //filter by year and week  
    if(d["year"] == date.getFullYear() && d["week"] == date.getWeek())  {
      return d}})
  //Get values from csv file
  for (i=0; i<province.length;i++) { // for each geometry object

  for (j=0; j<13; j++) { if ( province[i].properties.NAME_1 ==  dataset_filtered[j].province
  ) {
    province[i].properties.count=dataset_filtered[j][choice]
  }}}

    // function loops through all the data values from the current data attribute
    // and returns the min and max values
  function getDataRange() {
    var min = Infinity, max = -Infinity;
    for (i=0; i<dataset.length;i++) {
    if (min > +dataset[i][choice]){min = +dataset[i][choice]};
  if (max < +dataset[i][choice]){max = +dataset[i][choice]}};
    return [min, max];
}

  var dataRange = getDataRange(); // get the min/max values from the range of count
  /////////////////////
  function getColor(valueIn, valuesIn) {
    // create a linear scale
    var color =  d3.scaleLinear()
    .domain([valuesIn[0], valuesIn[1]])  // input uses min and max values
      .range(d3.schemeBlues[9]);   
    return color(valueIn);  // return that number to the caller
}
///////////////////////////
  maptooltip.append('div')
    .attr('class', 'province');
  //maptooltip.append('div')
  //  .attr('class', 'gender');
  maptooltip.append('div')
    .attr('class', 'count');
 // maptooltip.append('div')
   // .attr('class', 'percent');
  mapsvg.append("g")
    .attr("class", "states")
    .selectAll(".province")
    .data(province)
    .enter().append("path")
    .attr("d", path)
    .attr("fill", function (d) {
            return getColor(d.properties.count, dataRange);  // give them an opacity value based on their current value
        })
    .on('mouseover', function(d)
    {
     var province_name= d.properties.NAME_1
     var count = d.properties.count
      maptooltip.select('.province').html(province_name);
      maptooltip.select('.count').html( count);
      maptooltip.style('display', 'block');
    });
  mapsvg.on('mousemove', function()
  {
    maptooltip.style("top", d3.event.clientY+ "px");
    maptooltip.style("left", d3.event.clientX+ "px");
  });
  mapsvg.on('mouseout', function()
  {
    d3.select("#customtooltip").remove();
    d3.select(this)
      .attr("class", "states");
    maptooltip.style('display', 'none');
  });
  mapsvg.append("path")
    .attr("class", "state-borders")
    .attr("d", path(border));
 




 };
