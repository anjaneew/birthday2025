// puzzle.js
const imageCount = 10;
let currentImage = 1;

function loadPuzzle(imageNumber) {
  const container = document.getElementById("puzzle-layer");
  container.innerHTML = `<h2>Puzzle ${imageNumber}</h2><div id='puzzle-${imageNumber}' class='puzzle-placeholder'>[Puzzle ${imageNumber} Placeholder]</div>`;

  if (imageNumber === imageCount) {
    const btn = document.createElement("button");
    btn.textContent = "Finish Puzzles";
    btn.onclick = () => showLayer("message-layer");
    container.appendChild(btn);
  } else {
    const btn = document.createElement("button");
    btn.textContent = "Next Puzzle";
    btn.onclick = () => {
      currentImage++;
      loadPuzzle(currentImage);
    };
    container.appendChild(btn);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("puzzle-layer").classList.contains("active")) {
    loadPuzzle(currentImage);
  }
});

//// puzzle.js
const imageCount = 10;
let currentImage = 1;

function loadPuzzle(imageNumber) {
  const container = document.getElementById("puzzle-layer");
  container.innerHTML = `<h2>Puzzle ${imageNumber}</h2>`;

  const img = document.createElement("img");
  img.src = `images/${imageNumber}.jpg`;
  img.alt = `Puzzle ${imageNumber}`;
  img.style.maxWidth = "90%";

  container.appendChild(img);

  if (imageNumber === imageCount) {
    const btn = document.createElement("button");
    btn.textContent = "Finish Puzzles";
    btn.onclick = () => showLayer("message-layer");
    container.appendChild(btn);
  } else {
    const btn = document.createElement("button");
    btn.textContent = "Next Puzzle";
    btn.onclick = () => {
      currentImage++;
      loadPuzzle(currentImage);
    };
    container.appendChild(btn);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("puzzle-layer").classList.contains("active")) {
    loadPuzzle(currentImage);
  }
});
//
const puzzleContainer = document.getElementById('puzzle');
const size = 3;
// const images = [
//   'images/1.jpg', 'images/2.jpg', 'images/3.jpg',
//   'images/4.jpg', 'images/5.jpg', 'images/6.jpg',
//   'images/7.jpg', 'images/8.jpg', 'images/9.jpg'
// ];

const images = [
  'images/1.png', 'images/2.png', 'images/3.png',
  'images/4.png', 'images/5.png', 'images/6.png',
  'images/7.png', 'images/8.png', 'images/9.png'
];

// Shuffle array
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

let shuffledImages = shuffle([...images]);

puzzleContainer.style.display = 'grid';
puzzleContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
puzzleContainer.style.gap = '2px';

shuffledImages.forEach((src, index) => {
  const img = document.createElement('img');
  img.src = src;
  img.dataset.correctIndex = index;
  img.dataset.currentIndex = index;
  img.style.width = '100%';
  img.style.cursor = 'pointer';
  puzzleContainer.appendChild(img);
});

// Drag and drop logic to swap pieces
let dragSrcEl = null;

function handleDragStart(e) {
  dragSrcEl = e.target;
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', e.target.outerHTML);
}

function handleDragOver(e) {
  if (e.preventDefault) e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
  return false;
}

function handleDrop(e) {
  if (e.stopPropagation) e.stopPropagation();
  if (dragSrcEl !== this) {
    const dragSrcIndex = dragSrcEl.dataset.currentIndex;
    const dropTargetIndex = this.dataset.currentIndex;

    // Swap images src
    const tempSrc = dragSrcEl.src;
    dragSrcEl.src = this.src;
    this.src = tempSrc;

    // Swap currentIndex data
    dragSrcEl.dataset.currentIndex = dropTargetIndex;
    this.dataset.currentIndex = dragSrcIndex;

    checkCompletion();
  }
  return false;
}

function handleDragEnd() {
  dragSrcEl = null;
}

function addDnDHandlers(img) {
  img.setAttribute('draggable', 'true');
  img.addEventListener('dragstart', handleDragStart);
  img.addEventListener('dragover', handleDragOver);
  img.addEventListener('drop', handleDrop);
  img.addEventListener('dragend', handleDragEnd);
}

puzzleContainer.querySelectorAll('img').forEach(addDnDHandlers);

function checkCompletion() {
  const imgs = puzzleContainer.querySelectorAll('img');
  for (let i = 0; i < imgs.length; i++) {
    if (imgs[i].dataset.currentIndex !== imgs[i].dataset.correctIndex) return;
  }
  alert('Puzzle completed!');
}

