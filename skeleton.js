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
var date = createNewDate(1);

var filter = "none";
var filtervalue = "";
// for reset function.
var lastSelectedTime = 1;
// for bar, arc and province highlighting
var lastSelectedChart = leftpanel.select("svg").attr("width","100%").attr("height","50%"); // for reset function of added temp css class.
var lastSelectedElement = '#barid_11';

var don1svgRanOnce = 0;
var barRanOnce = 0 ;
var news_barRanOnce = 0;
var don2svgRanOnce = 0;


parseTime = d3.timeParse("%Y/%W")

//Interchanged Elements (important for updating the data-view)
var date_label = midpanel.select("#year");
var deaths_label = botpanel.select("#deaths");
var news_label = botpanel.select("#newsSources");

//Key values for different visualisation elements:
var keys_gender = ['Adult - Female','Adult - Male','Child - Female','Child - Male'];
var keys_deathcause = ['Chemical and toxic gases','Detention - Execution','Detention - Torture','Detention - Torture - Execution','Explosion','Field Execution','Kidnapping - Execution','Kidnapping - Torture','Kidnapping - Torture - Execution','Other','Shelling','Shooting','Siege','Un-allowed to seek Medical help','Unknown','Warplane shelling'];
var keys_death_short = ['Chemical','Det-Exec','Det-Torture','Det-Tort-Ex','Explosion','Field Exec','Kidn-Exec','Kidn-Torture','Kidn-Tor-Ex','Other','Shelling','Shooting','Siege','No Medical','Unknown','Warplane']
var keys_status = ['Civilian','Non-Civilian'];

var keys_eventTypes = ['Protests; such as: Demonstrations, Riots, Boycotting, etc', 'Exhibit Force Posture; such as: Demonstrate military power', 'Coercion; such as: Arrests, Seizing property, Imposing restrictions, etc','Assaults; such as: Torture, Killing, Abduction, Suicide bombing, etc', 'Fight; such as: Use of military force, occupy territory, , aerial strikes, etc', 'Use of Mass Violence; such as: Engaing in mass killings, in ethnic cleansing, or using weapons of mass destruction.'];

var keys_province = ['Aleppo','Damascus','Damascus Suburbs','Daraa','Deir Ezzor','Hama','Hasakeh','Homs','Idlib','Lattakia','Quneitra','Raqqa','Sweida','Tartous'];
