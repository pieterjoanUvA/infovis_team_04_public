// Instance the tour
var tour = new Tour({
  steps: [
  {
    element: "#leftpanel",
    title: "Leftpanel description",
    content: "Here the donut chart shows differentiation between gender and age groups, below the deathcause is shown."
  },
  {
    element: "#rightpanel",
    title: "Rightpanel description",
    content: "News and Civilian / non-Civilian differentiation Donut chart."
  },
  {
    element: "#botrow",
    title: "Bottom panel description",
    content: "Linechart with totals."
  },
  {
    element: "#midpanel",
    title: "Cyria map/province description",
    content: "Casualties per province in tooltips + color banding for global view."
  }
]});

// Initialize the tour
tour.init();

// Start the tour
//tour.start();
// Restart the tour
tour.restart();
console.log('tourjs has been Executed')

var tour_adv = new Tour({
  name: "tour",
  steps: [],
  container: "body",
  smartPlacement: true,
  keyboard: true,
  storage: window.localStorage,
  debug: false,
  backdrop: true,
  backdropContainer: 'body',
  backdropPadding: 0,
  redirect: true,
  orphan: false,
  duration: false,
  delay: false,
  basePath: "",
  afterGetState: function (key, value) {},
  afterSetState: function (key, value) {},
  afterRemoveState: function (key, value) {},
  onStart: function (tour) {},
  onEnd: function (tour) {},
  onShow: function (tour) {},
  onShown: function (tour) {},
  onHide: function (tour) {},
  onHidden: function (tour) {},
  onNext: function (tour) {},
  onPrev: function (tour) {},
  onPause: function (tour, duration) {},
  onResume: function (tour, duration) {},
  onRedirectError: function (tour) {}
});
