//The Midpanel SVG element code

//Code that runs on initialization
var mapsvg = midpanel.append("svg")
              .attr("width","100%")
              .attr("height","100%");

//Define UpdateMap Function
function updateMap(dataset)
{
  var paths = mapsvg.selectAll('path')
    .data(dataset);
  var priority_order = ["Hasakeh", "Aleppo", "Raqqa", "Sweida", "Damascus", "Daraa", "Deir Ezzor", "Hama", "Homs", "Idlib", "Lattakia", "Quneitra", "Damascus Suburbs", "Tartous"];
  var paths = mapsvg.selectAll('path')
    .data(dataset);
  paths.on('mouseover', function(d)
  {
    maptooltip.select('.count').html(d[1]);
    maptooltip.select('.province').html(d[0]);
    maptooltip.style('display', 'block');
  });
  paths.exit()
    .remove();
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
{
  var province = topojson.feature(data, data.objects["SYR_adm1-1"]).features
  var border = topojson.mesh(data, data.objects["SYR_adm1-1"], function(a, b) { return a !== b; })

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
    .on('mouseover', function(d)
    {
      maptooltip.select('.province').html(d.properties.NAME_1);
      maptooltip.select('.count').html("test count");
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
}
