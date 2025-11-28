import { createOptimizedPicture } from "../../scripts/aem.js";

export default function decorate(block) {
  let slides = [...block.children];

  // ❌ Remove >> and << rows (they break the block)
  slides = slides.filter((row) => {
    return (
      !row.textContent.trim().includes(">>") &&
      !row.textContent.trim().includes("<<")
    );
  });

  // Create main carousel container
  const carousel = document.createElement("div");
  carousel.classList.add("carousel-container-inner");

  // Create track
  const track = document.createElement("div");
  track.classList.add("carousel-track");

  // Build slides
  slides.forEach((row) => {
    const slide = document.createElement("div");
    slide.classList.add("carousel-slide");

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

  carousel.append(track);

  // Buttons
  const prevBtn = document.createElement("button");
  prevBtn.className = "carousel-btn prev-btn";
  prevBtn.innerHTML = "&#10094;";

  const nextBtn = document.createElement("button");
  nextBtn.className = "carousel-btn next-btn";
  nextBtn.innerHTML = "&#10095;";

  carousel.append(prevBtn, nextBtn);
  block.replaceChildren(carousel);

  // Sliding Logic
  let index = 0;
  const total = slides.length;

  function updateSlide() {
    track.style.transform = `translateX(-${index * 100}%)`;
  }

  nextBtn.addEventListener("click", () => {
    index = (index + 1) % total;
    updateSlide();
  });

  prevBtn.addEventListener("click", () => {
    index = (index - 1 + total) % total;
    updateSlide();
  });
}
