let currentImage = 1;
const totalImages = 11;
const imgElement = document.getElementById("slider-img");


setInterval(() => {
  currentImage = currentImage < totalImages ? currentImage + 1 : 1;
  imgElement.src = `images/${currentImage}.jpg`;
}, 3000);

// Falling flower confetti
const flowerContainer = document.querySelector(".flowers");
const flowerImages = [
  "🌸", "🌼", "💐", "🌺", "🌻", "🌷"
];

function createFlower() {
  const flower = document.createElement("div");
  flower.classList.add("flower");

  flower.style.left = Math.random() * 100 + "vw";
  flower.style.animationDuration = (3 + Math.random() * 5) + "s";
  flower.style.fontSize = (16 + Math.random() * 16) + "px";
  flower.textContent = flowerImages[Math.floor(Math.random() * flowerImages.length)];
  
  flowerContainer.appendChild(flower);

  setTimeout(() => {
    flower.remove();
  }, 8000);
}

setInterval(createFlower, 300);
