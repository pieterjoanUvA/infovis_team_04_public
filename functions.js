// RunOnce variables are defined in 'skeleton.js' the general variables file.

Date.prototype.getWeek = function()
{
  //Add functionality to the already build in Date object (new method to get the Week)
  var onejan = new Date(this.getFullYear(),0,1);
  return Math.ceil((((this - onejan) / 86400000) + onejan.getDay()+1)/7);
}
// a way to create a subset from a larger set, with array_key use
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

function timerefresh(timevalue)
{
  //This is the main event handler for sliding the slider and updating the global time variables.
  date.setTime(timevalue);
  lowerdate.setTime(parseInt(timevalue)-timespan);
  upperdate.setTime(parseInt(timevalue)+timespan);
  //Set the text of the timerange.
  updatelabel();
  //Refresh the vertical line in the line chart which indicated the current position
  var percent = (timevalue-unix)/(1515499200000-unix);
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

  //UPDATING MAP DATA
  updateMap();

  //UPDATING ALL PANELS WHICH COULD CONTAIN 3 FILTERS
  d3.csv("key_"+filter+".csv", function(error, csv_data)
  {
    //FILTER THE DATA
    data = csv_data.filter(function (d)
    {
      if ((d.year == date.getFullYear()) && (d.week == date.getWeek()) && (d[filter] == filtervalue))
      {
        return d;
      }
    })[0];

    //UPDATING DONUT CHART DATA
    don1svgdata = SubSet(data,keys_gender);
    // RunOnce function for initial draw of donut with data.
    if (don1svgRanOnce == 0)
    {
      don1svgRanOnce = 1;
      createDonut(don1svgdata)
    };
    updateDonut(don1svgdata);

    //UPDATING (Death) BAR CHART DATA

    bardata = SubSet(data,keys_deathcause);

    //// fix for empty data when deathcause is selected.
    if ( filter  == 'deathCause'){
          for ( i=0 ; i < bardata.length ; i++){
            if (bardata[i][0] == filtervalue)
            {
              bardata[i][1] = "|F|";
            }
            else
            {
              bardata[i][1] = 0;
            }
          }
        };

    // RunOnce function for initial draw of donut with data.
    if (barRanOnce == 0)
    {
      barRanOnce = 1;
      createBar(bardata);
    };
    updateBar(bardata);

    //UPDATING RIGHT CIVIL DONUT CHART
    don2svgdata = SubSet(data,keys_status);
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
  timerefresh(unix);
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
