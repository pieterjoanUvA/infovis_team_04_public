// Instance the tour
//"#slider" // Setter
//var value = mySlider.bootstrapSlider('getValue');
//mysetter =
// For non-getter methods, you can chain together commands
	//mySlider
	//	.bootstrapSlider('setValue', 5)
//$( "#slider" ).slider( {min: 1299585600000, max: 1515499200000, step: 604800000});
// API reference http://bootstraptour.com/api/
// for extra options.
var tour = new Tour({
  backdrop: true,
  backdropContainer: 'body',
  backdropPadding: 0,
  steps: [
  {
// tried to move the slider, but this calls the slider before initialization ????
//    onShown: function (tour) {$("input#slider").bootstrapSlider('setValue',1299585600000)},
    onShown: function (tour) {},
    placement: "right",
    element: "svg:first",
    title: "Gender Distribution",
    content: "Here the donut chart shows differentiation between gender and age groups"
  },
  {
    onShown: function (tour) {},
    placement: "right",
    element: "svg:eq(1)",
    title: "BarChart Casualties",
    content: "Shows the cause of the casualties."

  },
  {
    onShown: function (tour) {},
    placement: "right",
    element: "svg:eq(2)",
    title: "The Map Panel",
    content: "News and Civilian / non-Civilian differentiation Donut chart."

  },
  {
    onShown: function (tour) {},
    placement: "left",
    element: "svg:eq(3)",
    title: "Civilian/Non-Civilian Distribution",
    content: "Civilian / non-Civilian differentiation Donut chart."

  },
  {
    onShown: function (tour) {},
    placement: "left",
    element: "svg:eq(4)",
    title: "News Distribution",
    content: "News Count per topic per week."

  },
  {
    onShown: function (tour) {},
    placement: "top",
    element: "input#slider",
    title: "The Time Slider Selector",
    content: "Select a week in the timeline."
  },
  {
    onShown: function (tour) {},
    placement: "top",
    element: "svg:eq(5)",
    title: "Total Casualties Line Graph",
    content: "."
  },
  {
    onShown: function (tour) {},
    placement: "top",
    element: "svg:last",
    title: "Extra news data on projected on timeline",
    content: "News ...."

}
]});
// Initialize button for nav-menu.
$('#tour').click(function(e){
    // console.log("Been Clicked.")
    tour.restart();
    // it's also good practice to preventDefault on the click event
    // to avoid the click triggering whatever is within href:
    e.preventDefault();
});
// Auto-Tour button jquery in nav-menu
$('#autotour').click(function(e){
    // console.log("Been Clicked.")
    autotour.restart();
    // it's also good practice to preventDefault on the click event
    // to avoid the click triggering whatever is within href:
    e.preventDefault();
});
// Initialize the tour
tour.init();
// Start the tour
tour.start();
// Restart the tour
//tour.restart();
//console.log('tourjs has been Executed')
var autotour = new Tour({

  backdrop: true,
  backdropContainer: 'body',
  backdropPadding: 0,
  steps: [
  {
      duration: 4000,
    placement: "right",
    element: "#leftpanel",
    title: "Leftpanel description",
    content: "Here the donut chart shows differentiation between gender and age groups, below the deathcause is shown."
  },
  {
      duration: 4000,
    placement: "left",
    element: "#rightpanel",
    title: "Rightpanel description",
    content: "News and Civilian / non-Civilian differentiation Donut chart."

  },
  {
      duration: 4000,
    placement: "top",
    element: "#botrow",
    title: "Bottom panel description",
    content: "Linechart with totals."
  },
  {  duration: 4000,
    placement: "right",
    element: "#midpanel",
    title: "Syria map/province description",
    content: "Casualties per province in tooltips + color banding for global view."
  }
]});
