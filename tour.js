// Instance the tour

// API reference http://bootstraptour.com/api/
// for extra options.
var tour = new Tour({
  backdrop: true,
  backdropContainer: 'body',
  backdropPadding: 0,
  steps: [
  {
    placement: "right",
    element: "#leftpanel",
    title: "Leftpanel description",
    content: "Here the donut chart shows differentiation between gender and age groups, below the deathcause is shown."
  },
  {
    placement: "left",
    element: "#rightpanel",
    title: "Rightpanel description",
    content: "News and Civilian / non-Civilian differentiation Donut chart."

  },
  {
    placement: "top",
    element: "#botrow",
    title: "Bottom panel description",
    content: "Linechart with totals."
  },
  {
    placement: "right",
    element: "#midpanel",
    title: "Syria map/province description",
    content: "Casualties per province in tooltips + color banding for global view."
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
