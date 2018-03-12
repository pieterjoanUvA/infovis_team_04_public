// Instance the tour
var tour = new Tour({
  steps: [
  {
    element: "#leftpanel",
    title: "Leftpanel description",
    content: "Content of my step"
  },
  {
    element: "#Rightpanel",
    title: "Rightpanel description",
    content: "Content of my step"
  }
]});

// Initialize the tour
tour.init();

// Start the tour
tour.start();
