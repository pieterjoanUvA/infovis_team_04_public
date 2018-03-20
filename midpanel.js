
//Add a selecting window to filter different data
var choice = "Casualties"
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
// define the datarange
    var dataRange = [0, 1878];
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
.domain([dataRange[0],  dataRange[1]]);
var yAxis = d3.axisRight()
.scale(lengendy)
.ticks(10);

legendSvg.append("g")
.attr("class", "maplegend")
.attr("transform", "translate("  +18 + ", 0)")
.call(yAxis)
.attr("id", 'lengendy_ticks')
.attr("font-size", "12px")
.select(".domain").remove();
legendSvg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 55)
      .attr("x",0 - (legendHeight / 1.3))
      .attr("dy", "1em")
      .attr("id", 'lengendy')
      .attr("font-size", "12px")
      .style("text-anchor", "middle")
      .text(choice);

//Define UpdateMap Function
function updateMap(dataset)
{
  d3.json("SYR_adm1.json",function(data)
  {
    var province_update = topojson.feature(data, data.objects["SYR_adm1-1"]).features;

    for (i=0; i<province_update.length;i++)
    { // for each geometry object
      for (j=0; j<dataset.length; j++)
      {
        if ( province_update[i].properties.NAME_1 ==  dataset[j][0])
        {
          province_update[i].properties.count= +dataset[j][1];
        }
      }
    }
    function getDataRange()
    {
      var min = Infinity, max = -Infinity;
      for (i=0; i<province_update.length;i++)
      {
        if (min>province_update[i].properties.count)
        {
          min = province_update[i].properties.count;
        }
        if (max<province_update[i].properties.count)
        {
          max =province_update[i].properties.count;
        }
      }
      return [min, max];
    }
    // get the min/max values from the range of count
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
      .attr('fill', function (d)
      {
      return getColor(d.properties.count, dataRange);  // give them an opacity value based on their current value
    });
/*
      paths.transition().duration(200)
      .styleTween("fill", function()
      {
      return d3.interpolate(d3.select(this).style("fill"),
          function (d)
            {var blaat = getColor(d.properties.count, dataRange);
              console.log(blaat);
            return blaat
              // give them an opacity value based on their current value
          })
      });/// end styleTween().
*/
  // handles all mouseover and mouseout's....
  mapsvg.selectAll(".states").selectAll("path")
    .on("mouseover", handleMouseOver)
    .on("mouseout", handleMouseOut);

  paths.exit()
    .remove();
  });
}
// end updateMAp()
//Mouse over and Mouse out functions.

function handleMouseOver(d){
/*// fast color transition
  var b,c;
  var a =d3.select(this)
      .style("fill", function(){c=d3.select(this).style("fill");}) ;
      console.log(c);// make the body green
    a.transition().duration(400)
      .style("fill", function(){ b = d3.select(this).classed("hover", true).style("fill")}); // then transition to red
   console.log(b);
// end fast color transition*/

//d3.select(this).classed("hover", true) //<== most basic version

// heavy tween function //
  var origfill = d3.select(this).style("fill");
    d3.select(this).transition().duration(200)
    .styleTween("fill", function()
    {
      return d3.interpolate(origfill, d3.select(this).classed("hover", true).style("fill") );
    });
//

    var province_name= d.properties.NAME_1
    var count = d.properties.count
     maptooltip.select('.province').html(province_name);
     maptooltip.select('.count').html( count);
     maptooltip.style('display', 'block');
}

function handleMouseOut(d)
{
  d3.select(this).transition().duration(200).style("fill", null).style("opacity",null);
  d3.select(this).classed("hover", false);
}


var maptooltip = midpanel.append('div')
  .attr('class', 'customtooltip');

d3.queue()
  .defer(d3.json, "SYR_adm1.json")
  .await(ready)

//projection
var projection = d3.geoMercator()
  .translate([-3000, 3550])
  .scale(5000)
//create a geopath to project
var path = d3.geoPath()
  .projection(projection)
// initial draw function
function ready(error, data)
{ if (error) throw error;
  var province = topojson.feature(data, data.objects["SYR_adm1-1"]).features
  var border = topojson.mesh(data, data.objects["SYR_adm1-1"], function(a, b) { return a !== b; });
  for (i=0; i<province.length;i++)
  { // for each geometry object
    province[i].properties.count=0;
  }

    // function loops through all the data values from the current data attribute
    // and returns the min and max values
var dataRange = [0,1878]; // get the min/max values from the range of count
  /////////////////////
function getColor(valueIn, valuesIn)
{
    // create a linear scale
    var color =  d3.scaleLinear()
    .domain([valuesIn[0], valuesIn[1]])  // input uses min and max values
      .range(d3.schemeBlues[9]);
    return color(valueIn);  // return that number to the caller
}

var chartname = 'map'; //For highlighting id creation
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
    .attr("class", "provincearea")
    .attr("id", function(d,i) {return chartname+"id_"+i})
    .attr("fill", function (d) {
            return getColor(d.properties.count, dataRange);  // give them an opacity value based on their current value
        })
    .on('mouseover', function(d)
    {
      //handleMouseOver;

     var province_name= d.properties.NAME_1
     var count = d.properties.count
      maptooltip.select('.province').html(province_name);
      maptooltip.select('.count').html( count);
      maptooltip.style('display', 'block');
    })
    .on('click', function(d, i)
    {
      var selectedChart = mapsvg;
      highlightSelected(selectedChart, chartname, i);
      filter = "province";
      filtervalue = d.properties.NAME_1;
      updatelabel();
      datarefresh();
    });
  mapsvg.on('mousemove', function()
  {
    maptooltip.style("top", d3.event.clientY+ "px");
    maptooltip.style("left", d3.event.clientX+ "px");
  });
  mapsvg.on('mouseout', function()
  {
//handleMouseOut
    d3.select("#customtooltip").remove();
    maptooltip.style('display', 'none');
  });
  mapsvg.append("path")
    .attr("class", "state-borders")
    .attr("d", path(border));

 };
