// oracle.js - Updated Version
const oracleFortunes = [
                { image: "images/oracle/1.jpeg", 
                  text: "ප්‍රංශයේ, පැරීසියේ, කොබල්ස්ටෝන් මාවතේ සාප්පු සවාරි\nShopping in cobblestone streets, Paris, France\n" },
            { image: "images/oracle/2.jpeg", 
              text: "ප්‍රංශයේ, පැරීසියේ, කොබල්ස්ටෝන් මාවතේ සාප්පු සවාරි\nShopping in cobblestone streets, Paris, France\n" },
            { image: "images/oracle/3.jpeg", 
              text: "ඇම්ස්ටර්ඩෑම්, නෙදර්ලන්තයේ තේ බොනවා\nAmsterdam, Netherlands\n" },
            { image: "images/oracle/4.jpeg", 
              text: "කොලොසියම්, රෝමය, ඉතාලියේ සOචාරය \nColosseum, Rome, Italy\n" },
            { image: "images/oracle/5.jpeg", 
              text: "ස්පාඤ්ඤයේ, බාර්සලෝනාහි, ගුවෙල් පාර්ක් එකේ අව්ව තපිනවා\nPark Güell in Barcelona, Spain\n" },
            { image: "images/oracle/6.jpeg", 
              text: "චෙක් ජනරජයේ ප්‍රාග් වල, චාල්ස් පාලම, බලන්න යනවා\nCharles Bridge, Prague, Czech Republic\n" },
            { image: "images/oracle/7.jpeg", 
              text: "ප්‍රංශයේ පැරීසියේ, අයිෆල් කුළුණ,   බලන්න ගිහින් හිම කුණාටුවට අහුවෙනවා \nEiffel Tower Lawn, Paris, France\n" },
            { image: "images/oracle/8.jpeg", 
              text: "ප්‍රංශයේ පැරීසියේ, අයිෆල් කුළුණ,   බලන්න ගිහින් හිම කුණාටුවට අහුවෙනවා\nEiffel Tower Lawn, Paris, France\n" },
            { image: "images/oracle/9.jpeg", 
              text: "ඉතාලියේ ෆ්ලොරන්ස්වල, වියා රිකසොලි මාවතේ ඇවිදිනවා\nVia Ricasoli, Florence, Italy\n" },
            { image: "images/oracle/10.jpeg", 
              text: "ජර්මනියේ නොයිශ්වාන්ස්ටයින් මාලිගය, බලන්න යනවා \nNeuschwanstein Castle, Germany\n" },
            { image: "images/oracle/11.jpeg", 
              text: " ඉතාලියේ ෆ්ලොරන්ස්වල, පියාසා දැලා සිග්නෝරියාමාවතේ ඇවිදිනවා\nPiazza della Signoria, Florence, Italy\n" },
            { image: "images/oracle/12.jpeg", 
              text: "ලැට්වියාවේ රිගා පරණ නගරය, බලන්න ගිහින් හිම කුණාටුවට අහුවෙනවා\nRiga Old Town, Latvia\n" },
            { image: "images/oracle/13.jpeg", 
              text: "ස්පාඤ්ඤයේ  බාර්සලෝනාහි සග්රාඩා ෆැමිලියා සOචාරය \nSagrada Família, Barcelona, Spain\n" },
            { image: "images/oracle/14.jpeg", 
              text: " ඕස්ට්‍රියාවේ  වීයානා වලෂෝන්බ්‍රන් මාලිගා උයන, බලන්න යනවා\nSchönbrunn Palace Gardens, Vienna, Austria\n" },
            { image: "images/oracle/15.jpeg", 
              text: "ඉතාලියේ වෙනීස්වල සෙන්ට් මාක්ස් චතුරශ්‍රයේ දවල් කෑම\nSt. Mark's Square, Venice, Italy\n" },
            { image: "images/oracle/16.jpeg", 
              text: "ස්විට්සර්ලන්තයේ සර්මට්වල  ස්විස් ඇල්ප්ස් දුම්රිය ස්ටේශමෙන් ටිකට් ගන්නවා \nSwiss Alps Scenic Train Platform, Zermatt, Switzerland\n" },
            { image: "images/oracle/17.jpeg", 
              text: " ඉතාලියේ වෙනීස්වල, ඇළ පාලමගාව පොටෝ ග්න්නවා\n Venice, Canal Bridge, Italy" },
            { image: "images/oracle/18.jpeg", 
              text: "ඔස්ට්‍රියාවේ වීයානාවල නත්තල් වෙළඳපොළෙන් බඩු ගන්නවා\n Vienna Christmas market, Austria" }
];

// Audio setup
const backgroundMusic = new Audio('audio/magic.mp3');
backgroundMusic.loop = true;
let musicStarted = false;


// DOM Elements
const giftWrap = document.getElementById('gift-wrap');
const globeScreen = document.getElementById('globe');
const fortuneCircle = document.getElementById('fortune-circle');
const currentFortuneImage = document.getElementById('current-fortune-image');
const currentFortuneText = document.getElementById('current-fortune-text');

// State management
let usedFortunes = [];
let fortuneInterval;
let currentFortuneIndex = 0;

// 1. Initialize
function init() {
    resetAllElements();
    giftWrap.addEventListener('click', startUnwrapping);
}

// 2. Main sequence
function startUnwrapping() {
    giftWrap.style.opacity = 0;
    setTimeout(() => {
        giftWrap.classList.add('hidden');
        showGlobeScreen();
        startMusic();
    }, 1000);
}

// Music control function
function startMusic() {
    if (!musicStarted) {
        // This will only work after user interaction
        backgroundMusic.play()
            .then(() => musicStarted = true)
            .catch(error => console.log("Autoplay prevented:", error));
    }
}


function showGlobeScreen() {
    globeScreen.classList.remove('hidden');
    setTimeout(() => {
        globeScreen.style.opacity = 1;
        setTimeout(() => {
            transitionToFortunes();
        }, 10000);
    }, 50);
}

function transitionToFortunes() {
    globeScreen.style.opacity = 0;
    setTimeout(() => {
        globeScreen.classList.add('hidden');
        startFortuneDisplay();
    }, 1000);
}

// 3. Fortune display system
function startFortuneDisplay() {
    prepareFortunes();
    startMusic();
    fortuneCircle.classList.remove('hidden');
    setTimeout(() => {
        fortuneCircle.style.opacity = 1;
        showCurrentFortune();
    }, 50);
}

function prepareFortunes() {
    usedFortunes = [];
    const fortuneCount = 5 + Math.floor(Math.random() * 5); // 3-5 fortunes
    
    while (usedFortunes.length < fortuneCount) {
        const randomIndex = Math.floor(Math.random() * oracleFortunes.length);
        if (!usedFortunes.includes(randomIndex)) {
            usedFortunes.push(randomIndex);
        }
    }
    currentFortuneIndex = 0;
}

function showCurrentFortune() {
    if (currentFortuneIndex >= usedFortunes.length) {
        // All fortunes shown
        return;
    }

    const fortune = oracleFortunes[usedFortunes[currentFortuneIndex]];
    currentFortuneImage.style.opacity = 0;
    currentFortuneImage.src = fortune.image;
    currentFortuneText.textContent = fortune.text;

    setTimeout(() => {
        currentFortuneImage.style.opacity = 1;
        currentFortuneImage.style.animation = 'fadeIn 1s';
        
        fortuneInterval = setTimeout(() => {
            currentFortuneIndex++;
            showCurrentFortune();
        }, 9000);
    }, 100);
}

// 4. Utility functions
function resetAllElements() {
    clearTimeout(fortuneInterval);
    giftWrap.style.opacity = 1;
    giftWrap.classList.remove('hidden');
    globeScreen.style.opacity = 0;
    globeScreen.classList.add('hidden');
    fortuneCircle.style.opacity = 0;
    fortuneCircle.classList.add('hidden');
    currentFortuneImage.style.opacity = 0;
}

// Initialize the app
init();
const muteBtn = document.getElementById('mute-btn');
muteBtn.addEventListener('click', () => {
    backgroundMusic.muted = !backgroundMusic.muted;
    muteBtn.textContent = backgroundMusic.muted ? '🔊' : '🔇';
});