// Instance the tour
// set slider value for firefox
function settySlider(variable){
    var slidervars = document.getElementById('slider');
    slidervars.value = variable;
};

// API reference http://bootstraptour.com/api/
// for extra options.
var tour = new Tour({
  backdrop: true,
  backdropContainer: 'body',
  backdropPadding: 0,
  steps: [
  {
// this is the date of the largest Chemical and Toxic gasses count, probably.

//    onShown: function (tour) {},
    placement: "right",
    element: "svg:first",
    title: "Gender Distribution",
    content: "Here the donut chart shows differentiation between gender and age groups",
    onShow: function (tour) {
      settySlider(128);
      datarefresh(128) ;
      timerefresh(128) ;
  //  $( "#slider" ).slider('refresh');
    }

  },
  {
    onShow: function (tour) {
      settySlider(128);
      datarefresh(128) ;
      timerefresh(128) ;
    },
    placement: "right",
    element: "svg:eq(1)",
    title: "BarChart Casualties",
    content: "Shows the cause of the casualties."

  },
  {
    onShow: function (tour) {
      settySlider(128);
      highlightSelected(barsvg, 'bar', 0);
      filter = "deathCause";
      filtervalue = "Chemical and toxic gases"
      datarefresh(128) ;
      timerefresh(128) ;
    },
    placement: "right",
    element: "rect.bar:first",
    title: "BarChart Casualties Filter",
    content: "The filter has been clicked and shows |F| for active filter."

  },
  {
    onShow: function (tour) {
      settySlider(110);
      filter = "none";
      filtervalue = "";
      datarefresh(110);
      timerefresh(110);
    },
    placement: "right",
    element: "svg:eq(2)",
    title: "The Map Panel",
    content: "News and Civilian / non-Civilian differentiation Donut chart."

  },
  {
    onShow: function (tour) {
      settySlider(128);
      highlightSelected(mapsvg, 'map', 12);
      filter = "province";
      filtervalue = "Damascus Suburbs";
      datarefresh(128);
      timerefresh(128);
    },
    placement: "right",
    element: "#mapid_12",
    title: "The Map Panel - Subset Selection",
    content: "Damascus Suburbs selection of Chemical Warfare."

  },
  {
    onShow: function (tour) {
      settySlider(185);
      filter = "none";
      filtervalue = "";
      datarefresh(185);
      timerefresh(185);
    },
    placement: "left",
    element: "svg:eq(4)",
    title: "Civilian/Non-Civilian Distribution",
    content: "Civilian / non-Civilian differentiation Donut chart."

  },
  {
    onShow: function (tour) {},
    placement: "left",
    element: "svg:eq(5)",
    title: "News Distribution",
    content: "News Count per topic per week."

  },
  {
    onShow: function (tour) {},
    placement: "top",
    element: "input#slider",
    title: "The Time Slider Selector",
    content: "Select a week in the timeline."
  },
  {
    onShow: function (tour) {},
    placement: "top",
    element: "svg:eq(6)",
    title: "Total Casualties Line Graph",
    content: "."
  },
  {
    onShow: function (tour) {},
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
