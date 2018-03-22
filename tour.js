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
    title: "Gender and Age",
    content: "Donut Chart: Shows the percentages of males, females, adults and children that have died.",
    onShow: function (tour) {
      // settySlider(128);
      // timerefresh(128);
      // datarefresh(128);
    }

  },
  {
    onShow: function (tour) {
      // settySlider(128);
      // datarefresh(128);
      // timerefresh(128);
    },
    placement: "right",
    element: "svg:eq(1)",
    title: "Death Cause",
    content: "Bar Chart: Shows the distribution of death causes."

  },
  // {
  //   onShow: function (tour) {
  //     var variable = 128
  //     settySlider(variable);
  //     highlightSelected(barsvg, 'bar', 0);
  //     filter = "deathCause";
  //     filtervalue = "Chemical and toxic gases"
  //     datarefresh(variable);
  //     timerefresh(variable);
  //   },
  //   placement: "right",
  //   element: "rect.bar:first",
  //   title: "BarChart Casualties Filter",
  //   content: "The filter has been clicked and shows |F| for active filter."
  //
  // },
  {
    onShow: function (tour) {
      // var variable = 110;
      // settySlider(variable);
      // resetfilter()
      // datarefresh(variable);
      // timerefresh(variable);
    },
    placement: "right",
    element: "svg:eq(2)",
    title: "Map",
    content: "Map: Shows the casualties per province."
  },
  // {
  //   onShow: function (tour) {
  //     var variable = 128;
  //     settySlider(variable);
  //     highlightSelected(mapsvg, 'map', 12);
  //     filter = "province";
  //     filtervalue = "Damascus Suburbs";
  //     datarefresh(variable);
  //     timerefresh(variable);
  //   },
  //   placement: "bottom",
  //   element: "#toprow",
  //   title: "The Map Panel - Subset Selection",
  //   content: "Damascus Suburbs selection of Chemical Warfare."
  //
  // },
  // {
  //   onShow: function (tour) {
  //     resetfilter()
  //   },
  //   placement: "bottom",
  //   element: "#toprow",
  //   title: "The Map Panel - Resetting Filter",
  //   content: "Animations."
  //
  // },
  {
    onShow: function (tour) {
      // var variable =185;
      // settySlider(variable);
      // resetfilter();
      // datarefresh(variable);
      // timerefresh(variable);
    },
    placement: "left",
    element: "svg:eq(4)",
    title: "Status",
    content: "Donut Chart: Shows the percentages of civilian and non-civilian casualties."

  },
  {
    onShow: function (tour) {},
    placement: "left",
    element: "svg:eq(5)",
    title: "News",
    content: "Bar Chart: Shows the distribution of news topics published in news articles."

  },
  {
    onShow: function (tour) {},
    placement: "top",
    element: "svg:eq(6)",
    title: "Deaths over Time",
    content: "Shows the total amount of deaths over time."
  },
  {
    onShow: function (tour) {},
    placement: "top",
    element: "svg:last",
    title: "Publications over Time",
    content: "Shows the total amount of news publications about Syria over time."

  },
  {
    onShow: function (tour) {},
    placement: "top",
    element: "input#slider",
    title: "Interaction: Time",
    content: "With the slider, a certain week can be selected for filtering."
  },
  {
    onShow: function (tour) {
      var variable =128;
      settySlider(variable);
      resetfilter();
      timerefresh(variable);
      datarefresh();
    },
    placement: "top",
    element: "footer#botrow",
    title: "Example: Peak",
    content: "We see a peak in casualties and align the slider to it."
  },
  {
    onShow: function (tour) {},
    placement: "right",
    element: "svg:eq(2)",
    title: "Map",
    content: "Most casualties around that week happened within the Damascus Suburbs."
  },
  {
    onShow: function (tour) {},
    placement: "right",
    element: "svg:eq(1)",
    title: "Death Cause",
    content: "As we can see, there was an attack with chemical and toxic gases."
  },
  {
    onShow: function (tour) {
      highlightSelected(barsvg, 'bar', 0);
      filter = "deathCause";
      filtervalue = "Chemical and toxic gases";
      updatelabel();
      datarefresh();
    },
    placement: "right",
    element: "svg:eq(1)",
    title: "Extra Filter",
    content: "Let's get more information about that specific group..."
  },
  {
    onShow: function (tour) {},
    placement: "left",
    element: "svg:eq(4)",
    title: "Chemical Deathcause: Status",
    content: "We can see that most people who died from chemical and toxic gases were civilians."
  },
  {
    onShow: function (tour) {
      highlightSelected(civilsvg, 'arc', 0);
      filter = "status";
      filtervalue = "Non-Civilian";
      updatelabel();
      datarefresh();
    },
    placement: "left",
    element: "svg:eq(4)",
    title: "Renew Filter",
    content: "Let's get more information about the non-civilians (soldiers) that died..."
  },
  {
    onShow: function (tour) {},
    placement: "right",
    element: "svg:eq(1)",
    title: "Soldiers: Death Cause",
    content: "We can see that on the other hand, most soldiers died of shooting instead of the attack on chemical gasses."
  },
  {
    placement: "right",
    element: "svg:first",
    title: "Soldiers: Gender and Age",
    content: "We can also see that all those soldiers are Adult-Males.",
    onShow: function (tour) {}
  },
  {
    onShow: function (tour) {
      // settySlider(128);
      // datarefresh(128);
      // timerefresh(128);
    },
    placement: "middle",
    element: "body",
    title: "Final Page",
    content: "You have finished the tour, feel free to browse around by yourself."

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
  {
      duration: 4000,
    placement: "right",
    element: "#midpanel",
    title: "Syria map/province description",
    content: "Casualties per province in tooltips + color banding for global view."
  }
]});
