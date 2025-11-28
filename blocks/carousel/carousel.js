import { createOptimizedPicture } from "../../scripts/aem.js";

export default function decorate(block) {
  const slides = [...block.children];

  // Create main carousel container
  const carousel = document.createElement("div");
  carousel.classList.add("carousel-container-inner");

  // Create track
  const track = document.createElement("div");
  track.classList.add("carousel-track");

  // Convert rows into slide divs
  slides.forEach((row, index) => {
    const slide = document.createElement("div");
    slide.classList.add("carousel-slide");

    // Move row content into slide
    while (row.firstElementChild) {
      slide.append(row.firstElementChild);
    }

    // Optimize images
    slide.querySelectorAll("picture > img").forEach((img) => {
      img
        .closest("picture")
        .replaceWith(
          createOptimizedPicture(img.src, img.alt, false, [{ width: "750" }])
        );
    });

    track.append(slide);
  });

  // Add track into carousel
  carousel.append(track);

  // Add navigation buttons
  const prevBtn = document.createElement("button");
  prevBtn.className = "carousel-btn prev-btn";
  prevBtn.innerHTML = "&#10094;";

  const nextBtn = document.createElement("button");
  nextBtn.className = "carousel-btn next-btn";
  nextBtn.innerHTML = "&#10095;";

  carousel.append(prevBtn, nextBtn);

  // Replace block with new structure
  block.replaceChildren(carousel);

  // JS Slide Logic
  let index = 0;

  function updateSlide() {
    track.style.transform = `translateX(-${index * 100}%)`;
  }

  nextBtn.addEventListener("click", () => {
    if (index < slides.length - 1) index++;
    updateSlide();
  });

  prevBtn.addEventListener("click", () => {
    if (index > 0) index--;
    updateSlide();
  });
}
