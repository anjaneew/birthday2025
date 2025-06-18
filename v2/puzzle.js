const puzzleContainer = document.getElementById('puzzle');
const completeOverlay = document.getElementById('complete-overlay');
const completeImage = document.getElementById('complete-image');
const size = 3;

// Define sets of puzzles (10 sets, each with 9 ordered images)
const puzzles = Array.from({ length: 10 }, (_, setIndex) => (
  Array.from({ length: 9 }, (_, i) => `images/${setIndex * 9 + i + 1}.jpg`)
));

const completeImages = [
  'images/A.jpg', 'images/B.jpg', 'images/C.jpg', 'images/D.jpg', 'images/E.jpg',
  'images/F.jpg', 'images/G.jpg', 'images/H.jpg', 'images/I.jpg', 'images/J.jpg'
];

let currentPuzzleIndex = 0;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function loadPuzzle(index) {
  puzzleContainer.innerHTML = '';
  completeOverlay.classList.add('hidden');
  let images = puzzles[index].slice();
  let shuffled = shuffle(images.slice());

  puzzleContainer.style.display = 'grid';
  puzzleContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  puzzleContainer.style.gap = '2px';

  shuffled.forEach((src, i) => {
    const img = document.createElement('img');
    img.src = src;
    img.dataset.correct = images[i];
    img.dataset.current = src;
    img.setAttribute('draggable', 'true');
    puzzleContainer.appendChild(img);
  });

  addDnDHandlers();
}

let dragSrc = null;

function handleDragStart(e) {
  dragSrc = e.target;
  e.dataTransfer.setData('text/plain', dragSrc.dataset.current);
}

function handleDrop(e) {
  e.preventDefault();
  if (dragSrc !== e.target) {
    const tempSrc = dragSrc.src;
    const tempCurrent = dragSrc.dataset.current;

    dragSrc.src = e.target.src;
    dragSrc.dataset.current = e.target.dataset.current;

    e.target.src = tempSrc;
    e.target.dataset.current = tempCurrent;

    checkCompletion();
  }
}

function handleDragOver(e) {
  e.preventDefault();
}

function addDnDHandlers() {
  puzzleContainer.querySelectorAll('img').forEach(img => {
    img.addEventListener('dragstart', handleDragStart);
    img.addEventListener('dragover', handleDragOver);
    img.addEventListener('drop', handleDrop);
  });
}

function checkCompletion() {
  const pieces = puzzleContainer.querySelectorAll('img');
  for (let piece of pieces) {
    if (piece.dataset.current !== piece.dataset.correct) return;
  }
  showCompletion();
}

function showCompletion() {
  completeImage.src = completeImages[currentPuzzleIndex];
  completeOverlay.classList.remove('hidden');
  puzzleContainer.classList.add('completed');

  setTimeout(() => {
    currentPuzzleIndex = (currentPuzzleIndex + 1) % puzzles.length;
    loadPuzzle(currentPuzzleIndex);
  }, 3000);
}

loadPuzzle(currentPuzzleIndex);