const puzzleContainer = document.getElementById('puzzle');
const completeOverlay = document.getElementById('complete-overlay');
const completeImage = document.getElementById('complete-image');
const messageElement = document.getElementById('message');
const progressElement = document.getElementById('progress');
const successSound = document.getElementById('success-sound');
const music = document.getElementById('music');
const size = 3;




//Editing
const puzzles = [
    {
        folder: 'a',  // Subfolder name
        pieces: Array.from({ length: 9 }, (_, i) => `images/a/${i + 1}.jpg`),
        complete: 'images/a/a.jpg'  // Completed image path
    },
    {
        folder: 'b',
        pieces: Array.from({ length: 9 }, (_, i) => `images/b/${i + 1}.jpg`),
        complete: 'images/b/b.jpg'
    },
        {
        folder: 'c',
        pieces: Array.from({ length: 9 }, (_, i) => `images/c/${i + 1}.jpg`),
        complete: 'images/c/c.jpg'
    },
            {
        folder: 'd',
        pieces: Array.from({ length: 9 }, (_, i) => `images/d/${i + 1}.jpg`),
        complete: 'images/d/d.jpg'
    },
            {
        folder: 'e',
        pieces: Array.from({ length: 9 }, (_, i) => `images/e/${i + 1}.jpg`),
        complete: 'images/e/e.jpg'
    },
            {
        folder: 'f',
        pieces: Array.from({ length: 9 }, (_, i) => `images/f/${i + 1}.jpg`),
        complete: 'images/f/f.jpg'
    },
            {
        folder: 'g',
        pieces: Array.from({ length: 9 }, (_, i) => `images/g/${i + 1}.jpg`),
        complete: 'images/g/g.jpg'
    },
            {
        folder: 'h',
        pieces: Array.from({ length: 9 }, (_, i) => `images/h/${i + 1}.jpg`),
        complete: 'images/h/h.jpg'
    },
            {
        folder: 'i',
        pieces: Array.from({ length: 9 }, (_, i) => `images/i/${i + 1}.jpg`),
        complete: 'images/i/i.jpg'
    },
            {
        folder: 'j',
        pieces: Array.from({ length: 9 }, (_, i) => `images/j/${i + 1}.jpg`),
        complete: 'images/j/j.jpg'
    },
    // Add more sets (c, d, e...) as needed
];

// Birthday messages for each completed puzzle

const messages = [
    "තුන්පත් රෑන",
    "ඔය පොතත් කන්ඩ දෙන්ඩකෝ...",
    "පිගන් දෙකයි, බූරු පැටියයි!",
    "වැඩබලන ඉන්චාර්ජ් දූරය",
    "වලි බේරන කොමසාරිස්",
    "ශේක් ශ්පියර්",
    "ශර්ට් ඩේ!",
    "කැකිරි ගෙඩි 500යි",
    "අපි පස්දෙනා 💖",
    "Happy Birthday! සුබ උපන්දියක් වේවා!🎉🎂"
];

let currentPuzzleIndex = 0;
let isMusicPlaying = false;

// Play background music when user interacts with the page
document.addEventListener('click', () => {
    if (!isMusicPlaying) {
        music.play();
        isMusicPlaying = true;
    }
}, { once: true });

function shuffle(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

function loadPuzzle(index) {
    puzzleContainer.innerHTML = '';
    completeOverlay.classList.add('hidden');
    progressElement.textContent = `Puzzle ${index + 1} of ${puzzles.length}`;
    
    const currentPuzzle = puzzles[index];
    const correctOrder = currentPuzzle.pieces.slice();
    const shuffledPieces = shuffle(currentPuzzle.pieces.slice());

    puzzleContainer.style.display = 'grid';
    puzzleContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    puzzleContainer.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    puzzleContainer.style.gap = '2px';

    shuffledPieces.forEach((src, i) => {
        const piece = document.createElement('div');
        piece.className = 'puzzle-piece';
        
        const img = document.createElement('img');
        img.src = src;
        img.dataset.correct = correctOrder[i];
        img.dataset.current = src;
        img.setAttribute('draggable', 'true');
        
        piece.appendChild(img);
        puzzleContainer.appendChild(piece);
    });

    addDnDHandlers();
}

let dragSrc = null;

function handleDragStart(e) {
    if (e.target.tagName === 'IMG') {
        dragSrc = e.target;
        e.dataTransfer.setData('text/plain', dragSrc.dataset.current);
        e.dataTransfer.effectAllowed = 'move';
    }
}

function handleTouchStart(e) {
    if (e.target.tagName === 'IMG') {
        dragSrc = e.target;
    }
}

function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    
    if (dragSrc && e.target.tagName === 'IMG' && dragSrc !== e.target) {
        // Swap the images
        const tempSrc = dragSrc.src;
        const tempCurrent = dragSrc.dataset.current;

        dragSrc.src = e.target.src;
        dragSrc.dataset.current = e.target.dataset.current;

        e.target.src = tempSrc;
        e.target.dataset.current = tempCurrent;

        checkCompletion();
    }
    
    return false;
}

function handleTouchEnd(e) {
    const touch = e.changedTouches[0];
    const target = document.elementFromPoint(touch.clientX, touch.clientY);
    if (dragSrc && target && target.tagName === 'IMG' && dragSrc !== target) {
        const tempSrc = dragSrc.src;
        const tempCurrent = dragSrc.dataset.current;

        dragSrc.src = target.src;
        dragSrc.dataset.current = target.dataset.current;

        target.src = tempSrc;
        target.dataset.current = tempCurrent;

        checkCompletion();
    }
    dragSrc = null;
}

function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    return false;
}

function addDnDHandlers() {
    const pieces = puzzleContainer.querySelectorAll('img');
    
    pieces.forEach(piece => {
        piece.addEventListener('dragstart', handleDragStart, false);
        piece.addEventListener('dragover', handleDragOver, false);
        piece.addEventListener('drop', handleDrop, false);
        piece.addEventListener('dragend', () => dragSrc = null, false);
        piece.addEventListener('touchstart', handleTouchStart, false);
        piece.addEventListener('touchend', handleTouchEnd, false);

    });
}

function checkCompletion() {
    const pieces = puzzleContainer.querySelectorAll('img');
    for (let piece of pieces) {
        if (piece.dataset.current !== piece.dataset.correct) return;
    }
    showCompletion();
}

function createConfetti() {
    const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800', '#FF5722'];
    
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = `${Math.random() * 100}vw`;
        confetti.style.top = '-10px';
        confetti.style.width = `${Math.random() * 10 + 5}px`;
        confetti.style.height = `${Math.random() * 10 + 5}px`;
        confetti.style.animation = `confetti-fall ${Math.random() * 3 + 2}s linear forwards`;
        
        document.body.appendChild(confetti);
        
        // Remove confetti after animation completes
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
}

function showCompletion() {
    successSound.play();
    createConfetti();
    
    completeImage.src = puzzles[currentPuzzleIndex].complete;
    messageElement.textContent = messages[currentPuzzleIndex];
    completeOverlay.classList.remove('hidden');
    puzzleContainer.classList.add('completed');

    setTimeout(() => {
        currentPuzzleIndex++;
        if (currentPuzzleIndex < puzzles.length) {
            loadPuzzle(currentPuzzleIndex);
        } else {
            // All puzzles completed
            completeImage.src = 'images/final.jpg'; // You can add a final image

            //added oracle here
            
            messageElement.innerHTML = `
                <h1>Happy Birthday!</h1>
                <p>ආදර්ණීය අක්කාට සුබම සුබ උපන්දියකට ආසිරි පත්න්නේ, </p>
                <p>අම්මා, තාත්තා, මල්ලී සහ මමයි.</p>
                <p>                         මීට බාගෙට කොම්පියුටර් දන්න නOගී....</p>
                <p>උපන්දින තෑග්ග මෙන්න <a id="gift" href="./oracle.html">🎁</a></p>
            `;
            completeOverlay.classList.remove('hidden');
            setTimeout(showOracle, 3000);
            
            // Keep the overlay open and don't load another puzzle
            return;
        }
    }, 8000);
}

// Initialize the first puzzle
loadPuzzle(currentPuzzleIndex);