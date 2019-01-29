//declare variables
const track = document.querySelector(".carousel-track");
const slides = Array.from(track.children); //array of li elements from the ul
const rightButton = document.querySelector(".carousel__button--right");
const leftButton = document.querySelector(".carousel__button--left");
const dotNav = document.querySelector(".carousel__nav");
const dot = Array.from(dotNav.children);

//getting the image width
const slideSize = slides[0].getBoundingClientRect().width;
console.log(slideSize);
//function to set the slide position
const setSlidePosition = (slide, index) => {
  slide.style.left = slideSize * index + "px";
};

//utility functions
const moveToSlide = (track, currentSlide, targetSlide) => {
  track.style.transform = "translateX(-" + targetSlide.style.left + ")";
  currentSlide.classList.remove("current-slide");
  targetSlide.classList.add("current-slide");
};

const updateDot = (currentDot, targetDot) => {
  currentDot.classList.remove("current-slide");
  targetDot.classList.add("current-slide");
};

const hideShowArrows = (slides, leftButton, rightButton, targetIndex) => {
  if (targetIndex === 0) {
    leftButton.classList.add("is-hidden");
    rightButton.classList.remove("is-hidden");
  } else if (targetIndex === slides.length - 1) {
    leftButton.classList.remove("is-hidden");
    rightButton.classList.add("is-hidden");
  } else {
    leftButton.classList.remove("is-hidden");
    rightButton.classList.remove("is-hidden");
  }
};
//position slides next to each other
slides.forEach(setSlidePosition);

//go to next slide with right button
rightButton.addEventListener("click", e => {
  //get current slide
  const currentSlide = track.querySelector(".current-slide");
  const nextSlide = currentSlide.nextElementSibling;
  const currentDot = dotNav.querySelector(".current-slide");
  const targetDot = currentDot.nextElementSibling;
  const targetIndex = slides.findIndex(slide => slide === nextSlide);

  //move slide to right
  moveToSlide(track, currentSlide, nextSlide);
  updateDot(currentDot, targetDot);
  hideShowArrows(slides, leftButton, rightButton, targetIndex);
});

//go to previous slide
leftButton.addEventListener("click", e => {
  const currentSlide = track.querySelector(".current-slide");
  const prevSlide = currentSlide.previousElementSibling;
  const currentDot = dotNav.querySelector(".current-slide");
  const targetDot = currentDot.previousElementSibling;
  const targetIndex = slides.findIndex(slide => slide === prevSlide);

  moveToSlide(track, currentSlide, prevSlide);
  updateDot(currentDot, targetDot);
  hideShowArrows(slides, leftButton, rightButton, targetIndex);
});

//move the dots when we click on arrows
dotNav.addEventListener("click", e => {
  const targetDot = e.target.closest("button");
  if (!targetDot) return;

  const currentSlide = track.querySelector(".current-slide");
  const currentDot = dotNav.querySelector(".current-slide");
  const targetIndex = dot.findIndex(dot => dot === targetDot);
  const targetSlide = slides[targetIndex];

  moveToSlide(track, currentSlide, targetSlide);
  updateDot(currentDot, targetDot);
  hideShowArrows(slides, leftButton, rightButton, targetIndex);
});
