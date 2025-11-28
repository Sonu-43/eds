import { createOptimizedPicture } from "../../scripts/aem.js";

export default function decorate(block) {
  const rows = [...block.children];
  [...block.children].forEach((row) => {
    if (r == 0) {
      const nextbtn = document.createElement("button");
      nextbtn.classList.add("btn");
      nextbtn.classList.add("btn-next");
      const node = document.createTextNode("row.textContent");
      nextbtn.append(node);
      row.replaceWith(nextbtn);
    } else if (r == rows.length - 1) {
      const prevbtn = document.createElement("button");
      prevbtn.classList.add("btn");
      prevbtn.classList.add("btn-prev");
      const node = document.createTextNode("row.textContent");
      prevbtn.append(node);
      row.replaceWith(prevbtn);
    } else {
      row.claassList.add("slide");
      [...row.children].forEach((col, c) => {
        console.log("===>", row, r, col, c);
        if (c == 1) {
          col.classList.add("slide-texte");
        }
      });
    }
  });
}
const slides = block.querySelectorAll(".slide");
slides.forEach((slide, index) => {
  slide.style.transform = `translateX(${index * 100}%)`;
});

const nextslide = document.querySelector(".btn-next");
let curslide = 0;
let maxslide = slides.length - 1;
