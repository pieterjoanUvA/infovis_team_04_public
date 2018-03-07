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
function removeProvince(alreadyFiltered){var filtered = alreadyFiltered.filter(function(d){
        if (d.province == "Other Nationalities" || d.province == "Unknown" || d.province == "NA"){
          //console.log(d.province);
          //return d;
        }else{return d;}
      }); return filtered;}

function provinceSortMissing(donutYearMonth){
      // source: https://stackoverflow.com/questions/28958249/how-to-add-missing-items-into-javascript-array
      // MISSING PROVINCE FIXES for map total death.
      // Defines the fixed needed order, then searches for the missing provinces
      // then adds one element to the array, which does result in a count of one,
      // but then the order can be fixed, so a little untrueness exists.
      // Too bad in my opinion (PieterJoan)
      var  province = ["Hasakeh", "Aleppo", "Raqqa", "Sweida", "Damascus", "Daraa", "Deir Ezzor", "Hama", "Homs", "Idlib", "Lattakia", "Quneitra", "Damascus Suburbs", "Tartous"]
      var priority_order = province;
      var mapdatapremissing = donutYearMonth;
      var existingProvince = [];
      for(var i=0;i<mapdatapremissing.length;i++){
          existingProvince[i] = mapdatapremissing[i]['province'];
      }
      // check which day's data is missing; then create a dummy object and push it to the dummyData object
      for(var i=0;i<province.length;i++){
      //  console.log(province[i])
         if(existingProvince.indexOf(province[i]) < 0){
             var dummyObject = {
              "province": province[i],
              "value": 0
             };
             mapdatapremissing.push(dummyObject);
         }
      }
      // SORT in predefined order, after dirty fix of missing province.
      mapdatapremissing = d3.nest().key( d => d.province )
            .sortKeys(function(a,b) { return priority_order.indexOf(a) - priority_order.indexOf(b); })
            .rollup(d=>d.length).entries(mapdatapremissing);
      return mapdatapremissing;
}
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
var mapdatapremissing ;
// BEGIN HUGE D3 CSV function!!!!
var data = d3.csv("VDC_Syria_CASREP.csv", function(error, csv_data) {
  // Parse deathDate to date format for whole csv_data
    csv_data = csv_data.map(function (d) {d.deathDate = parseDate(d.deathDate);return d;});
    csv_data = removeProvince(csv_data);
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
// Source: http://bl.ocks.org/phoebebright/raw/3176159/
// Sorting Nest in custom order:
/* Status, fortuitously, can be sorted in straing ascending order, but Priority requires a custom order. Create an list in the order you want and use indexOf to create the order comparaitor function.

var priority_order = ['MUST', "SHOULD", 'COULD', 'WISH'];
var nested_data = d3.nest()
.key(function(d) { return d.status; }).sortKeys(d3.ascending)
.key(function(d) { return d.priority; }).sortKeys(function(a,b) { return priority_order.indexOf(a) - priority_order.indexOf(b); })
.rollup(function(leaves) { return leaves.length; })
.entries(csv_data);
*/ // end code example, useable for Gender Sorting, if wishable to do so.
// another clear site, usefull for tooltips complete in an array to print:
// http://learnjsdata.com/group_data.html
// and there is an output difference between .map(data) and .entries(data)
// see : http://bl.ocks.org/shancarter/raw/4748131/ for testing purposes.
var donutdata = d3.nest()
    .key(function(d) {return d.gender;}).sortKeys(d3.ascending)
    .rollup(function (d) {return d.length;}).entries(donutYearMonth);
// initial call to createDonut svg
createDonut(donutdata)
var mapdatapremissing =  provinceSortMissing(donutYearMonth);
createMap(mapdatapremissing);
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
mapdatapremissing = provinceSortMissing(donutYearMonth);
// fix missing province and add Value 0 to selection with missing province
//console.log(mapdatapremissing)
// END MISSING AND Sorting
// YOU ARE WELCOME TO IMPROVE THIS.

  //    .rollup( d => d.length).sortKeys(d3.ascending)
    //  .entries(dmapdatapremissing);
  updateMap(mapdatapremissing);
  updateDonut(donutdata);
}
// END HUGE D3 CSV function.
});
