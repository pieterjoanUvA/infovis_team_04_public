//var mapwidth = 1100,
 //   mapheight = 900;
//var svg = d3.select("body").append("svg")
  //  .attr("mapwidth", mapwidth)
   // .attr("mapheight", mapheight);
//(function(){
var maptooltip = d3.select('#map')
  .append('div')
  .attr('class', 'tooltip');

  var mapmargin = { top: 50, left: 50, right: 50, bottom: 50},
  mapheight = 800 - mapmargin.top - mapmargin.bottom;
  mapwidth = 1500 - mapmargin.left -mapmargin.right;

 var svg = d3.select("#map")
          .append("svg")
         .attr("height", mapheight+mapmargin.top+mapmargin.bottom)
          .attr("width", mapwidth+mapmargin.left+mapmargin.right)
          .append("g")
          .attr("transform", "translate(" + mapmargin.left + "," + mapmargin.top+ ")");
d3.queue()
    .defer(d3.json, "SYR_adm1.json")
    .await(ready)
//projection
var projection = d3.geoMercator()
.translate([-3000, 3450])
  .scale(5000)
 //create a geopath to project
var path = d3.geoPath()
    .projection(projection)

// initial draw function
function ready (error, data){
  //  console.log(data)
    var province = topojson.feature(data, data.objects["SYR_adm1-1"]).features
    var border = topojson.mesh(data, data.objects["SYR_adm1-1"], function(a, b) { return a !== b; })
  //  console.log(province)
// add tooltip
  maptooltip.append('div')
    .attr('class', 'province');

	maptooltip.append('div')
		.attr('class', 'gender');

	maptooltip.append('div')
		.attr('class', 'count');

	maptooltip.append('div')
		.attr('class', 'percent');

// end tooltip

   // .attr("title", function(d) { return d.properties.NAME_1; })
   // Create tooltip when mouseover
/*    .on("mouseover", function(d) {
            var xPosition = d3.mouse(this)[0]-10;
            var yPosition = d3.mouse(this)[1]-10;
            svg.append("text")
                .attr("class", "info")
                .attr("id", "tooltip")
                .attr("x", xPosition)
                .attr("y", yPosition)
                .text(d.properties.NAME_1);
            d3.select(this)
                .attr("class", "selected");
        });
        */
// tooltip data adding
svg.append("g")
.attr("class", "states")
.selectAll(".province")
.data(province)
.enter().append("path")
.attr("d", path)

.on('mouseover', function(d) {
//var total = d3.sum(dataset.map(function(d) {
//  return d.value;
//}));
//var percent = Math.round(1000 * d.data.value / total) / 10;
maptooltip.select('.province').html(d.properties.NAME_1);
//maptooltip.select('.gender').html("gender label")//(d.data.key);
maptooltip.select('.count').html("test count")//(d.data.value);
//maptooltip.select('.percent').html("test percent")//(percent + '%');

maptooltip.style('display', 'block');

});

/*
        svg.on("mouseout", function(d) {
            d3.select("#tooltip").remove();
            d3.select(this)
            .transition()
            .attr("class", "states")
            .duration(250)
        });
        */
// mouse move fixed
svg.on('mousemove', function() {
maptooltip.style("top", d3.event.clientY+2)
maptooltip.style("left", d3.event.clientX +2)
});
svg.on('mouseout', function() {
  d3.select("#tooltip").remove();
  d3.select(this)
  .attr("class", "states")
maptooltip.style('display', 'none');
});

   // .on('mouseover', function(d){
   //     var name = d.properties.NAME_1;
   //     d3.select(this)
   //     .append("text")
   //     .text(name)
     //   .attr("class", "h1")
	//	});
  svg.append("path")
      .attr("class", "state-borders")
      .attr("d", path(border));


}

function updateMap(datasetIN){
//console.log(dataset);
//console.log(dataset);
var dataload = d3.json("SYR_adm1.json", function(data){
  var  province = ["Hasakeh", "Aleppo", "Raqqa", "Sweida", "Damascus", "Daraa", "Deir Ezzor", "Hama", "Homs", "Idlib", "Lattakia", "Quneitra", "Damascus Suburbs", "Tartous"]

var priority_order = province;
    //    console.log(province);
        //var province  = provinceraw.properties.NAME_1
//console.log(province)

//var dataset = d3.nest()//.key( g => g.gender )
//    .sortKeys(function(a,b) { return priority_order.indexOf(a) - priority_order.indexOf(b); })
//    .entries(datasetIN);
var dataset = datasetIN;

//console.log(dataset);
          const paths = svg.selectAll('path')
            .data(dataset);

//console.log(dataset)



                paths.on('mouseover', function(d) {
                //var total = d3.sum(dataset.map(function(d) {
                //  return d.value;
                //}));


                //var percent = Math.round(1000 * d.data.value / total) / 10;
                //maptooltip.select('.province').html(d.properties.NAME_1);
                //console.log( province[i] +" test "+ d.key)
                // for function syncs right place for consistent province placing.

                      //  console.log( province[i] +" test "+ d.key)
                      //  maptooltip.select('.gender').html("gender label")//(d.data.key);
                        maptooltip.select('.count').html(d.value)//(d.data.value);
                        //maptooltip.select('.percent').html("test percent" + d.key)//(percent + '%');
                        maptooltip.select('.province').html(d.key)
                        maptooltip.style('display', 'block');


                })

          	const paths2 = paths.enter().append('path').merge(paths)
            paths2.enter()
              .append('path');
          paths.exit()
              .remove();
        //einde json load functie...blergh
        });


//  maptooltip.exit().remove();
}
