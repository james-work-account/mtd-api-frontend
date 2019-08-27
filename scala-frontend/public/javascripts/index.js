function toggleNav() {
  console.log("toggle")
}

function toggleApiList() {
  document.querySelector(".api-grouping-toggle ul").classList.toggle("hidden")
}

function toggleGovTest() {
  document.getElementById("icon").classList.toggle("clicked");
  document.getElementById("scenarios").classList.toggle("display")
}

function changeSelectedScenario(param, value) {
  document.getElementById(param).value = value
}

window.onload = function() {
  if (document.getElementById("content").classList.contains("home")) {
    document.querySelector("main").classList.add("full-width")
  }
};
