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
function selectDataAfter(alreadyFiltered, dataSelector, value){
  var filtered = alreadyFiltered.filter(function(d){ return d[dataSelector] == value});
  return filtered;
}
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
var data = d3.csv("VDC_Syria_CASREP.csv", function(error, csv_data) {
  // Parse deathDate to date format for whole csv_data
    csv_data = csv_data.map(function (d) {d.deathDate = parseDate(d.deathDate);return d;});
// "name","status","gender","province","birthPlace","deathDate","deathCause","actor"
  //var filter_data = selectData(csv_data, dataSelector, value);
  //var filter2 = selectDataTwice(csv_data, dataSelector, value, dataSelector2, value2);
  //var filter3 = selectDataAfter(filter_data, dataSelector2, value2);
  //var filter4 = selectDataAfter( selectData(csv_data, dataSelector, value), dataSelector2, value2);
  console.log("d3 function ran")
  //console.log(filter_data); // only child females
  //console.log(filter2); // child females in Daraa
  //console.log(filter3); // second filtering on filter_data in province Daraa
  //console.log(filter4); // selectData function on child-females then select province Daraa
  //var filter5 = selectData(csv_data, dataSelector, value3);
  //console.log(filter5); // select all child-males
  var filter6 = selectDataTwoValue(csv_data, dataSelector, value, value3);
  console.log(filter6);  //select both Child Male and Female
  //check working of function by then selecting Female only.
  var filter7 = selectDataAfter(filter6, dataSelector, value);
  console.log(filter7); // now is the same with filter_data
  var filter8 = selectDataYear(filter7, dateYearSelection);
  console.log(filter8);
  var filter9 = selectDataMonth(filter8, dateMonthSelection);
  //console.log(value4);
  //var filter9 = selectDataYears(filter8, "January");
  console.log(filter9);

});
