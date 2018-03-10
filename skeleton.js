//GLOBALLY USED VARIABLES

//Define general page structure in D3
var body = d3.select("body");

var toprow = body.select("#toprow");
var botrow = body.select("#botrow");

var leftpanel = toprow.select("#leftpanel").select("div");
var midpanel = toprow.select("#midpanel");
var rightpanel = toprow.select("#rightpanel").select("div");
var botpanel = botrow;

//User setting variables
var timespan = 302400000;
var unix = 1300190400000;
var date = new Date(unix);
var lowerdate = new Date((unix-timespan));
var upperdate = new Date((unix+timespan));

var don1svgRanOnce = 0;
var barRanOnce = 0 ;
var news_barRanOnce = 0;

//Interchanged Elements (important for updating the data-view)
var date_label = midpanel.select("#year");
