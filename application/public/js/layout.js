// Automatically add `class="current"` to the active tab.
var title = document.title;
document.querySelectorAll("nav a").forEach((e) => {
  if (e.textContent === title) {
    e.classList.add("current");
  }
});
