document.createElement("picture");
var toggleMenu = document.querySelector(".page-header__toggle-menu");
var mainNav = document.querySelector(".main-nav");

mainNav.classList.remove("main-nav--nojs");
toggleMenu.classList.remove("page-header__toggle-menu--nojs");

toggleMenu.addEventListener("click", function(evt) {
  evt.preventDefault();
  if (toggleMenu.classList.contains("page-header__toggle-menu--closed")) {
    toggleMenu.classList.remove("page-header__toggle-menu--closed");
    mainNav.classList.remove("main-nav--closed");
    toggleMenu.classList.add("page-header__toggle-menu--opened");
    mainNav.classList.add("main-nav--opened");
  } else {
    toggleMenu.classList.remove("page-header__toggle-menu--opened");
    mainNav.classList.remove("main-nav--opened");
    toggleMenu.classList.add("page-header__toggle-menu--closed");
    mainNav.classList.add("main-nav--closed");
  }
});

var form = document.querySelector(".questionnaire__data");

if (form) {
  var inputs = form.querySelectorAll(".data-input");
  inputs = [].slice.call(inputs);


  inputs.forEach(function (input) {
      var mailIcon = form.querySelector(".questionnaire__icon-mail");
  var phoneIcon = form.querySelector(".questionnaire__icon-phone");
    input.addEventListener("invalid", function (event) {
      input.classList.add("data-input--error");
      mailIcon.classList.add("questionnaire__icon-mail--error");
      phoneIcon.classList.add("questionnaire__icon-phone-error");
    }, false);
  });
}
