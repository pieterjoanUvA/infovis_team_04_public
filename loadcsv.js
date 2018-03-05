//console.log('d3 loadcsv');
// d3 loadcsv
function selectData(csv_data, dataSelector, value){
  var filtered = csv_data.filter(function(d){ return d[dataSelector] == value})
  return filtered;
}
function selectDataTwice(csv_data, dataSelector, value, dataSelector2, value2){
  var filtered = csv_data.filter(function(d){ return d[dataSelector] == value})
                    .filter(function(d){ return d[dataSelector2] == value2});
  return filtered;
}
// for selecting all males or females or children of both sexes,
function selectDataTwoValue(csv_data, dataSelector, value, value2){
  var filtered = csv_data.filter(function(d){
    if ( d[dataSelector] == value || d[dataSelector] == value2 ){
      return d[dataSelector];
      }
  });
  return filtered;
}
// Date selection filtering functions
function selectDataYear(alreadyFiltered,  value){var filtered = alreadyFiltered.filter(function(d){
    if (d.deathDate != null){if (d.deathDate.getFullYear() == value){return d;} }
  }); return filtered;}
function selectDataMonth(alreadyFiltered,  dateMonthSelection){var filtered = alreadyFiltered.filter(function(d){
      if (d.deathDate != null){if (d.deathDate.getMonth() == dateMonthSelection){
        //console.log(d.deathDate.getDate()); //shows single dates in console of selected in month
        return d;} }
    }); return filtered;}
// test variables for testing the selection functions
var value = "Child - Female";
var dataSelector = 'gender';
var value2 = "Daraa";
var dataSelector2 = 'province';
var value3 = "Child - Male";
//var value4 = d3.timeYears(2014, 2018);
var dateYearSelection = 2017;
var dateMonthSelection = 0; // months start counting at 0, so december is 11
var dataSelectorDeath = "deathDate";
// Parse the date format of csv_data
var parseDate = d3.timeParse("%Y-%m-%d");

// BEGIN HUGE D3 CSV function!!!!
var data = d3.csv("VDC_Syria_CASREP.csv", function(error, csv_data) {
  // Parse deathDate to date format for whole csv_data
    csv_data = csv_data.map(function (d) {d.deathDate = parseDate(d.deathDate);return d;});
// "name","status","gender","province","birthPlace","deathDate","deathCause","actor"

  console.log("d3 function ran")


  var year_min = d3.min(csv_data.map(function(d){
    if(d.deathDate != null){
      if(d.deathDate != "NA"){
        return d.deathDate.getFullYear();
      }
    }
  })) ;
var year_max = d3.max(csv_data.map(function(d){
  if(d.deathDate != null){
    if(d.deathDate != "NA"){
      return d.deathDate.getFullYear();
    }
  }
})) ;
//console.log(year_min+ " max year = "+year_max);

var month_max = 11;
var month_min = 0;
var donutYear = 2017;
var donutMonth = 1;
var donutYearMonth = selectDataMonth(selectDataYear(csv_data, donutYear), donutMonth);
// initial donut data with important sortKeys for constant Gender position in legend.

var donutdata = d3.nest()
    .key(function(d) {return d.gender;}).sortKeys(d3.ascending)
    .rollup(function (d) {return d.length;}).entries(donutYearMonth);
// initial call to createDonut svg
createDonut(donutdata)
// the keyboard change functions.
function change(data, donutYear, donutMonth){
		// Allow the arrow keys to change the displayed year.
    d3.select(window).on("keydown", function() {
      switch (d3.event.keyCode) {
        case 37: if(donutYear > year_min){donutYear = +donutYear -1}; break;
        case 39: if(donutYear < year_max){donutYear = +donutYear +1}; break;
        case 40: if(donutMonth > month_min){donutMonth = donutMonth -1}; break;
        case 38: if(donutMonth < month_max){donutMonth = donutMonth +1}; break;
      }
      console.log("year"+donutYear +"month"+ donutMonth);
	  //update(donutYear);
      if(donutYear == 2018){donutMonth = 0};
      updateDonutData(data, donutYear, donutMonth);
    });
};
// change() is called to get key listeners working. could be cleaner see
// https://github.com/marc1404/uva-information-visualisation/blob/master/weather-assignment/index.html
change(data, donutYear, donutMonth);
function updateMapData(data, donutYear, donutMonth){
    var donutYearMonth = selectDataMonth(selectDataYear(csv_data, donutYear), donutMonth);
    var mapdataprovince = d3.nest().key( d => d.province )
        .rollup( d => d.length)
        .entries(donutYearMonth);
//    console.log(mapdataprovince); // to see the created array for data selecting within svg elements.
}
// map data grouped first per province, then in province per gender, in nested array.
// with count_lines(rollup)
function updateMapData2(data, donutYear, donutMonth){
    var donutYearMonth = selectDataMonth(selectDataYear(csv_data, donutYear), donutMonth);
    var mapdataprovince = d3.nest().key( d => d.province ).key( g => g.gender )
        .rollup( d => d.length)
        .entries(donutYearMonth);
//    console.log(mapdataprovince);
    return mapdataprovince;
}
// this function is called when a key is pressed and reselects a new subset of data of year/month
// then calls the updateDonut function to update the values in the svg logic.
// for map data a new call to updateMap(mapdataprovincegender) should be added.
function updateDonutData(data, donutYear, donutMonth){
  var donutYearMonth = selectDataMonth(selectDataYear(csv_data, donutYear), donutMonth);
  var donutdata = d3.nest()
    .key(function(d) {return d.gender;}).sortKeys(d3.ascending)
    .rollup(function (d) {return d.length;}).entries(donutYearMonth);
  updateDonut(donutdata);
}
// END HUGE D3 CSV function.
});
