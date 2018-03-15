// RunOnce variables are defined in 'skeleton.js' the general variables file.

Date.prototype.getWeek = function()
{
  //Add functionality to the already build in Date object (new method to get the Week)
  var onejan = new Date(this.getFullYear(),0,1);
  return Math.ceil((((this - onejan) / 86400000) + onejan.getDay()+1)/7);
}

function parse2Array(obj,length)
{
  //Takes an object (retrieved row) as input and transforms it to an array of key-value pairs.
  //Also filters empty data to return an empty array instead
  data = Object.entries(obj);
  data.shift();
  data.shift();
  return data;
}

function timerefresh(timevalue)
{
  //This is the main event handler for sliding the slider and updating the global time variables.
  date.setTime(timevalue);
  lowerdate.setTime(parseInt(timevalue)-timespan);
  upperdate.setTime(parseInt(timevalue)+timespan);
  //Set the text of the timerange.
  date_label.text(lowerdate.toDateString()+" - "+upperdate.toDateString()+" - Filter: "+filter+"("+filtervalue+")");
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

function filterrefresh(filter,value)
{
  //Call this function when you want to apply any additional filter
  filter = filter;
  filtervalue = value;
  //Set the text of the timerange.
  date_label.text(lowerdate.toDateString()+" - "+upperdate.toDateString()+" - Filter: "+filter+"("+filtervalue+")");
}

function datarefresh(timevalue)
{
  //This is the main event handler for releasing the slider thus changing the time.

  //UPDATING MAP DATA
   updateMap();

  //UPDATING DONUT CHART DATA
  d3.csv("genderdata.csv", function(error, csv_data)
  {
    //Parse the DataTime
    don1svgdata = csv_data.filter(function (d) {
      if ((d.year == date.getFullYear()) && (d.week == date.getWeek()))
      {
        return d;
      }
    })[0];
  //  console.log(don1svgdata)
  //  don1svgdata = parse2Array(don1svgdata,4);
  don1svgdata = Object.entries(don1svgdata);
  don1svgdata.shift();
  don1svgdata.shift();
  don1svgdata.shift();
//        console.log(don1svgdata)
    // RunOnce function for initial draw of donut with data.
    if (don1svgRanOnce == 0)
    {
      don1svgRanOnce = 1;
      createDonut(don1svgdata)
    };

    updateDonut(don1svgdata);
  });

  //UPDATING (Death) BAR CHART DATA
  d3.csv("deathcausedata.csv", function(error, csv_data)
  {
    //Parse the DataTime
    bardata = csv_data.filter(function (d) {
      if ((d.year == date.getFullYear()) && (d.week == date.getWeek()))
      {
        return d;
      }
    })[0];
	//console.log(bardata)

    bardata = Object.entries(bardata);
    bardata.shift();
    bardata.shift();
    bardata.shift();

    if (barRanOnce == 0)
    {
      barRanOnce = 1;
      createBar(bardata);
    };
    updateBar(bardata);
  });




  //UPDATING News BAR CHART DATA
  d3.csv("eventCounts_byType.csv", function(error, csv_data)
  {
    //Parse the DataTime
    news_bardata = csv_data.filter(function (d) {
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

  //UPDATING RIGHT CIVIL DONUT CHART
    d3.csv("statusdata.csv", function(error, csv_data)
    {
      //Parse the DataTime
      don2svgdata = csv_data.filter(function (d) {
        if ((d.year == date.getFullYear()) && (d.week == date.getWeek()))
        {
          return d;
        }
      })[0];
    //  console.log(don1svgdata)
    //  don1svgdata = parse2Array(don1svgdata,4);
    don2svgdata = Object.entries(don2svgdata);
    don2svgdata.shift();
    don2svgdata.shift();
    don2svgdata.shift();
    //        console.log(don1svgdata)
      // RunOnce function for initial draw of donut with data.
      if (don2svgRanOnce == 0)
      {
        don2svgRanOnce = 1;
        createCivilDonut(don2svgdata)
      };

      updateCivilDonut(don2svgdata);
    });
}

function initialrefresh()
{
  //Main event handler upon first time loading the page.

  //INITIAL DATA REFRESH
  timerefresh(unix);
  datarefresh(unix);

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
