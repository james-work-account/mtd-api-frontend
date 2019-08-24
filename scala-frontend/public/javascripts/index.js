function toggleNav() {
  console.log("toggle")
}

function toggleApiList() {
  document.querySelector(".api-grouping-toggle ul").classList.toggle("hidden")
}

window.onload = function() {
  if (document.getElementById("content").classList.contains("home")) {
    document.querySelector("main").classList.add("full-width")
  }
}
