//The Midpanel SVG element code
//Code that runs on initialization
var mapsvg = midpanel.append("svg")
              .attr("width","100%")
              .attr("height","100%");

//Define UpdateMap Function
function updateMap(dataset)
{ var paths = mapsvg.selectAll(".province")
    .data(dataset);

  //var priority_order = ["Hasakeh", "Aleppo", "Raqqa", "Sweida", "Damascus", "Daraa", "Deir Ezzor", "Hama", "Homs", "Idlib", "Lattakia", "Quneitra", "Damascus Suburbs", "Tartous"];
  //var paths = mapsvg.selectAll('path')
    //.data(dataset);
  paths.on('mouseover', function(d)
  {
   maptooltip.select('.count').html(count);
   maptooltip.select('.province').html(province_name);
    maptooltip.style('display', 'block');
  });
  paths.exit()
    .remove();
}

//filter dataset by year week 

var year = date.getFullYear();
var week = date.getWeek();
var maptooltip = midpanel.append('div')
  .attr('class', 'customtooltip');

d3.queue()
  .defer(d3.json, "SYR_adm1.json")
  .defer(data)
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
  var dataset = dataset.filter(function(d)
  { //filter by year and week  
    if(d["year"] == year && d["week"] == week)  {return d}})
  //Get values from csv file
  for (i=0; i<province.length;i++) { // for each geometry object

  for (j=0; j<dataset.length; j++) { if ( province[i].properties.NAME_1 ==  dataset[j].province
  ) {
    province[i].properties.count=dataset[j].count
  }}}

    // function loops through all the data values from the current data attribute
    // and returns the min and max values
  function getDataRange() {
    var min = Infinity, max = -Infinity;
    for (i=0; i<province.length;i++) {if (min>province[i].properties.count){min = province[i].properties.count}
  if (max<province[i].properties.count){max = province[i].properties.count} }
    return [min, max];
}
  var dataRange = getDataRange(); // get the min/max values from the range of count
  /////////////////////
  function getColor(valueIn, valuesIn) {
    // create a linear scale
    var color =  d3.scaleLinear()
    .domain([valuesIn[0], valuesIn[1]])  // input uses min and max values
      .range([.3, 1]);   // output for opacity between .3 and 1 
    return color(valueIn);  // return that number to the caller
}
///////////////////////////
  maptooltip.append('div')
    .attr('class', 'province');
  maptooltip.append('div')
    .attr('class', 'gender');
  maptooltip.append('div')
    .attr('class', 'count');
  maptooltip.append('div')
    .attr('class', 'percent');
  mapsvg.append("g")
    .attr("class", "states")
    .selectAll(".province")
    .data(province)
    .enter().append("path")
    .attr("d", path)
    .attr('fill-opacity', function (d) {
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
