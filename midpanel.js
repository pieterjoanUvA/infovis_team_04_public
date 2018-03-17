//The Midpanel SVG element code
//Code that runs on initialization
var mapsvg = midpanel.append("svg")
              .attr("width","100%")
              .attr("height","100%");

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
          province_update[i].properties.count=dataset[j][1];
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
    var dataRange = getDataRange(); // get the min/max values from the range of count
    /////////////////////
    function getColor(valueIn, valuesIn)
    {
      // create a linear scale
      var color =  d3.scaleLinear()
        .domain([valuesIn[0], valuesIn[1]])  // input uses min and max values
        .range(d3.schemeBlues[9]);   // output for opacity between .3 and 1
      return color(valueIn);  // return that number to the caller
    }
  ///////////////////////////
    var paths = mapsvg.selectAll("path")
      .data(province_update)
      .attr('fill', function (d)
    {
    return getColor(d.properties.count, dataRange);  // give them an opacity value based on their current value
    })

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
    d3.select(this).classed("hover", true);
    var province_name= d.properties.NAME_1
    var count = d.properties.count
     maptooltip.select('.province').html(province_name);
     maptooltip.select('.count').html( count);
     maptooltip.style('display', 'block');
}

function handleMouseOut(d){
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
      .range(d3.schemeBlues[9]);
    return color(valueIn);  // return that number to the caller
}


//var g = mapsvg.append("g")
  //  .attr("class", "key")
  //  .attr("transform", "translate(0,40)");

//g.selectAll("rect")
 // .data(color.range().map(function(d) {
   //   d = color.invertExtent(d);
     // if (d[0] == null) d[0] = x.domain()[0];
     // if (d[1] == null) d[1] = x.domain()[1];
     // return d;
   // }))
var chartname = 'map'; //For highlighting id creation
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
    d3.select(this)
      .attr("class", "states");
    maptooltip.style('display', 'none');
  });
  mapsvg.append("path")
    .attr("class", "state-borders")
    .attr("d", path(border));

 };
