// Automatically add `class="current"` to the active tab.
var title = document.title;
document.querySelectorAll("nav a").forEach((e) => {
  if (e.textContent === title) {
    e.classList.add("current");
  }
});

var profile_image_form = document.getElementById("profile_image_form");

document.querySelector("form#profile_image_form input").onchange = function() {
  profile_image_form.submit();
};