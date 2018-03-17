// RunOnce variables are defined in 'skeleton.js' the general variables file.
function createNewDate(value) {
  var obj = {};
  obj.value = value;
  obj.startyear = 2011;
  obj.startweek = 11;
  obj.endyear = 2018
  obj.endweek = 2;
  obj.range = 356;
  obj.getWeek = function() {
    return ((obj.startweek+(obj.value-2))%52)+1;
  };
  obj.getFullYear = function() {
    return obj.startyear+Math.floor((obj.startweek+(obj.value-2))/52);
  };
  return obj;
}


Date.prototype.getWeek = function()
{
  //Add functionality to the already build in Date object (new method to get the Week)
  var onejan = new Date(this.getFullYear(),0,1);
  return Math.ceil((((this - onejan) / 86400000) + onejan.getDay()+1)/7);
}

var SubSet = function(sourceObject, keys)
{
    var newObject = {};
    keys.forEach(function(key) { newObject[key] = sourceObject[key]; });
    return Object.entries(newObject);
};

function updatelabel()
{
  date_label.text("Y:"+date.getFullYear()+" W:"+date.getWeek()+" Filter: "+filter+"("+filtervalue+")");
}

// highlighting functions specific for each chart.
function clearHighlight(lastSelectedChart)
{
  if(lastSelectedChart != null)
  {
// color transitions
    lastSelectedChart.select(lastSelectedElement)
        .style("fill", function()
        {
          lastSelectedChart.select(lastSelectedElement).style("fill");
        })
        .transition().duration(4000)
        .style("fill", function()
        {
          lastSelectedChart.select(lastSelectedElement).classed("selected", false).style("fill");
        });
        //.style("opacity",null);
  }
}
// chartname should be defined just before the .on('click') block.
// and overwritten in each svg.
function highlightSelected(selectedChart, chartname, i)
{
    clearHighlight(lastSelectedChart);
    selectedChart.select("#"+chartname+"id_"+i).classed("selected", true) ;
    lastSelectedElement = '#'+chartname+'id_'+ i;
    lastSelectedChart = selectedChart; //input for clearHighlight
}
// end block, generalized.
function resetfilter()
{
  clearHighlight(lastSelectedChart);
  filter = "none";
  filtervalue = "";
  datarefresh(lastSelectedTime);
  timerefresh(lastSelectedTime);
}
function timerefresh(timevalue)
{
  //This is the main event handler for sliding the slider and updating the global time variables.
  date.value = timevalue;
  //Set the text of the timerange.
  updatelabel();
  //Refresh the vertical line in the line chart which indicated the current position
  var percent = (date.value)/(356);
  d3.select(".mouse-line")
          .attr("d", "M" + line_width*percent + "," + 0 + " V " + line_height);
  //Set the deaths deaths_label
  d3.csv("AggregatedInfVis.csv", function(error, csv_data)
  {
    parseTime = d3.timeParse("%Y/%W")
    data = csv_data.filter(function (d) {
      if ((d.year == date.getFullYear()) && (d.week == date.getWeek()))
      {
        return d;
      }
    })[0];
    deaths_label.text("Deaths: "+data.deaths);
  });
  /////////////Weekly news coverage:
    d3.select(".mouse-line2")
          .attr("d", "M" + line_width*percent + "," + 0 + " V " + news_line_height);
    d3.csv("News_magnitude.csv", function(error, csv_data)
  {
    parseTime = d3.timeParse("%Y/%W")
    data = csv_data.filter(function (d) {
      if ((d.year == date.getFullYear()) && (d.week == date.getWeek()))
      {
        return d;
      }
    })[0];
    news_label.text("Number of News sources: "+data.NumSources);
  });
}

function datarefresh()
{
  //This is the main event handler for releasing the slider thus changing the time.

  //UPDATING ALL PANELS WHICH COULD CONTAIN 3 FILTERS
  d3.csv("key_"+filter+".csv", function(error, csv_data)
  {
    //FILTER THE DATA FOR ALL ELEMENTS EXCEPT THE FILTERBASE
    data = csv_data.filter(function (d)
    {
      if ((d.year == date.getFullYear()) && (d.week == date.getWeek()) && (d[filter] == filtervalue))
      {
        return d;
      }
    })[0];

    //FILTER THE DATA FOR THE ELEMENT THAT IS BEING FILTERED ON
    data_key = csv_data.filter(function (d)
    {
      if ((d.year == date.getFullYear()) && (d.week == date.getWeek()))
      {
        return d;
      }
    });

    //TRANSFORMING THE DATA IN THE RIGHT FORMAT
    var data_key_array = [];
    for ( i=0 ; i < data_key.length ; i++)
    {
      data_key_array.push([data_key[i][filter],data_key[i].total])
    }

    //UPDATING THE MAP DATA
    if (filter == 'province') {mapdata = data_key_array;} else {
    mapdata = SubSet(data,keys_province); }
    updateMap(mapdata);

    //UPDATING DONUT CHART DATA
    if (filter == 'gender') {don1svgdata = data_key_array;} else {
    don1svgdata = SubSet(data,keys_gender); }
    // RunOnce function for initial draw of donut with data.
    if (don1svgRanOnce == 0)
    {
      don1svgRanOnce = 1;
      createDonut(don1svgdata)
    };
    updateDonut(don1svgdata);

    //UPDATING (Death) BAR CHART DATA
    if (filter == 'deathCause') {bardata = data_key_array;} else {
    bardata = SubSet(data,keys_deathcause); }
    // RunOnce function for initial draw of donut with data.
    if (barRanOnce == 0)
    {
      barRanOnce = 1;
      createBar(bardata);
    };
    updateBar(bardata);

    //UPDATING RIGHT CIVIL DONUT CHART
    if (filter == 'status') {don2svgdata = data_key_array;} else {
    don2svgdata = SubSet(data,keys_status); }
    // RunOnce function for initial draw of donut with data.
    if (don2svgRanOnce == 0)
    {
      don2svgRanOnce = 1;
      createCivilDonut(don2svgdata)
    };
    updateCivilDonut(don2svgdata);

  });

  //UPDATING NEWS BAR CHART DATA
  d3.csv("eventCounts_byType.csv", function(error, csv_data)
  {
    //Parse the DataTime
    news_bardata = csv_data.filter(function (d)
    {
      if ((+d.year == date.getFullYear()) && (+d.week == date.getWeek()))

      {
        return d;
      }
    })[0];
    news_bardata = Object.entries(news_bardata);
    news_bardata.shift();
    news_bardata.shift();
    news_bardata.shift();
    if (news_barRanOnce == 0)
    {
      news_barRanOnce = 1;
      news_createBar(news_bardata);
    };
    news_updateBar(news_bardata);
  });
}

function initialrefresh()
{
  //Main event handler upon first time loading the page.

  //INITIAL DATA REFRESH
  timerefresh(1);
  datarefresh();

  //LOAD STATIC DATA
  //Load Data on Total Weekly Deaths
  d3.csv("AggregatedInfVis.csv", function(error, csv_data)
  {
    data = csv_data.map(function(d)
    {
      d.time = d.year+"/"+d.week;
      d.time = parseTime(d.time);
      d.deaths = +d.deaths;

      return d;
    });

    line_x.domain(d3.extent(data, function(d) { return d.time; }))
    line_y.domain([0, d3.max(data, function(d) { return d.deaths; })]);

    linegraph.append("path")
      .data([data])
      .attr("class", "line")
      .attr("d", line);

      // Add the X Axis
    linegraph.append("g")
        .attr("transform", "translate(0," + line_height + ")")
        .attr("class","xaxis")
        .call(d3.axisBottom(line_x));

    // linegraph.append("g")
    //     .call(d3.axisLeft(line_y));
  });

  ///////////////Loading News Coverage Data

  d3.csv("News_magnitude.csv", function(error, csv_data)
  {
    data = csv_data.map(function(d)
    {
      d.time = d.year+"/"+d.week;
      d.time = parseTime(d.time);
      d.NumSources = +d.NumSources;
      return d;
    });

    news_line_x.domain(d3.extent(data, function(d) { return d.time; }))
    news_line_y.domain([0, d3.max(data, function(d) { return d.NumSources; })]);

    news_linegraph.append("path")
      .data([data])
      .attr("class", "news_line")
      .attr("d", news_line);

      // Add the X Axis
    news_linegraph.append("g")
        .attr("transform", "translate(0," + news_line_height + ")")
        .attr("class","xaxis")
        .call(d3.axisBottom(news_line_x));

  });
}
