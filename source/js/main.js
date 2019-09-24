document.createElement("picture");

// main nav
var header = document.querySelector(".page-header")
var toggleMenu = header.querySelector(".main-nav__toggle-menu");
var closeMenu = header.querySelector(".main-nav__close");
var mainNav = header.querySelector(".main-nav__dropdown");
var headerContainer = header.querySelector(".container--header");

toggleMenu.addEventListener("click", function(evt) {
  evt.preventDefault();
  if (mainNav.classList.contains("main-nav__dropdown--closed")) {
    mainNav.classList.remove("main-nav__dropdown--closed");
    mainNav.classList.add("main-nav__dropdown--opened");
  }

  if (window.innerWidth >= 768) {
    header.classList.add("page-header--open-menu");
    headerContainer.classList.add("container--static");
  };
});

closeMenu.addEventListener("click", function(evt) {
  evt.preventDefault();

  if (mainNav.classList.contains("main-nav__dropdown--opened")) {
    mainNav.classList.remove("main-nav__dropdown--opened");
    mainNav.classList.add("main-nav__dropdown--closed");
  }

  if (window.innerWidth >= 768) {
    header.classList.remove("page-header--open-menu");
    headerContainer.classList.remove("container--static");
  };
});


//slider

var slideIndex = 0;

// if (window.innerWidth < 768) {
//   showSlides(slideIndex);
// }

var prevSlideButton = document.querySelector(".arrivals__slider-btn-big--prev");
prevSlideButton.addEventListener("click", function(evt){
  evt.preventDefault();
  slideIndex--;
  showSlides(slideIndex);
});

var nextSliderButton = document.querySelector(".arrivals__slider-btn-big--next");
nextSliderButton.addEventListener("click", function(evt) {
  evt.preventDefault();
  slideIndex++;
  showSlides(slideIndex);
});


function showSlides(indexOfSlide) {
  var slides = document.querySelectorAll(".arrivals__slider-item");
  var activeSlide = document.querySelector(".arrivals__slider-item--active");

  if (indexOfSlide > slides.length-1) {
    slideIndex = 0;
  }

  if (indexOfSlide < 0) {
    slideIndex = slides.length-1;
  }

  if (activeSlide.classList.contains("arrivals__slider-item--active")) {
    activeSlide.classList.remove("arrivals__slider-item--active");
    activeSlide.classList.add("arrivals__slider-item--disable");
  }

  if (slides[slideIndex].classList.contains("arrivals__slider-item--disable")) {
    slides[slideIndex].classList.remove("arrivals__slider-item--disable");
    slides[slideIndex].classList.add("arrivals__slider-item--active");
  }
}
