document.createElement("picture");
var toggleMenu = document.querySelector(".main-nav__toggle-menu");
var closeMenu = document.querySelector(".main-nav__close");
var mainNav = document.querySelector(".main-nav__dropdown");

toggleMenu.addEventListener("click", function(evt) {
  evt.preventDefault();
  if (mainNav.classList.contains("main-nav__dropdown--closed")) {
    mainNav.classList.remove("main-nav__dropdown--closed");
    mainNav.classList.add("main-nav__dropdown--opened");
  }
});

closeMenu.addEventListener("click", function(evt) {
  evt.preventDefault();

   if (mainNav.classList.contains("main-nav__dropdown--opened")) {
    mainNav.classList.remove("main-nav__dropdown--opened");
    mainNav.classList.add("main-nav__dropdown--closed");
  }
});
