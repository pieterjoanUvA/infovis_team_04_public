Date.prototype.getWeek = function()
{
  //Add functionality to the already build in Date object (new method to get the Week)
  var onejan = new Date(this.getFullYear(),0,1);
  return Math.ceil((((this - onejan) / 86400000) + onejan.getDay()+1)/7);
}

function timerefresh(timevalue)
{
  //This is the main event handler for sliding the slider and updating the global time variables.
  date.setTime(timevalue);
  lowerdate.setTime(parseInt(timevalue)-timespan);
  upperdate.setTime(parseInt(timevalue)+timespan);
  //Set the text of the timerange.
  date_label.text(lowerdate.toDateString()+" - "+upperdate.toDateString());
}

function datarefresh(timevalue)
{
  //This is the main event handler for releasing the slider thus changing the time.

  //UPDATING MAP DATA
  d3.csv("mapdata.csv", function(error, csv_data)
  {
    //Parse the DataTime
    data = csv_data.filter(function (d) {
      if ((d.year == date.getFullYear()) && (d.week == date.getWeek()))
      {
        return d;
      }
    })[0];
    data = Object.entries(data);
    data.shift();
    data.shift();
    updateMap(data);
  });
  //UPDATING DONUT CHART DATA
  //bla
}

function staticrefresh()
{
  //Non relevant function

  //Load the data aggregated by week
  // d3.csv("VDC_byweek.csv", function(error, csv_data)
  // {
  //   parseTime = d3.timeParse("%Y/%W")
  //   data = csv_data.map(function(d)
  //   {
  //     d.time = d.year+"/"+d.week;
  //     d.time = parseTime(d.time);
  //     d.deaths = +d.deaths;
  //     return d;
  //   });
  //   console.log(d3.max(data, function(d) { return d.deaths; }));
  //   line_x.domain(d3.extent(data, function(d) { return d.time; }))
  //   line_y.domain([0, d3.max(data, function(d) { return d.deaths; })]);
  //
  //   linegraph.append("path")
  //     .data([data])
  //     .attr("class", "line")
  //     .attr("d", line);
  //
  //     // Add the X Axis
  //   linegraph.append("g")
  //       .attr("transform", "translate(0," + line_height + ")")
  //       .call(d3.axisBottom(line_x));
  //
  //   linegraph.append("g")
  //       .call(d3.axisLeft(line_y));
  //});
}
