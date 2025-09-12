const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

// Variables pour les sons
let blueSound = document.getElementById('blueSound');
let redSound = document.getElementById('redSound');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();

const text = "LA Plateforme_";
const fontSize = 16;
let columns = canvas.width / fontSize;

const drops = [];
for (let i = 0; i < columns; i++) {
    drops[i] = Math.random() * -100;
}

function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.03)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
        ctx.fillStyle = (i % 10 === 0) ? '#f00' : '#0f0';
        const char = text[Math.floor(Math.random() * text.length)];
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.98) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

setInterval(drawMatrix, 100);

window.addEventListener('resize', () => {
    resizeCanvas();
    columns = canvas.width / fontSize;
    drops.length = 0;
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * -100;
    }
});

function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const centiseconds = String(Math.floor(now.getMilliseconds() / 10)).padStart(2, '0');

    document.getElementById('clock').innerHTML =
        `${hours}:${minutes}:${seconds}<span class="centiseconds">.${centiseconds}</span>`;
}

updateClock();
setInterval(updateClock, 10);

// Animation d'un seul lapin qui se répète
const rabbit = document.querySelector('.rabbit');
rabbit.style.animation = 'jumpRabbit 6s linear infinite';

// Fonctions pour les sons
function playSound(pillType) {
    if (pillType === 'blue') {
        blueSound.currentTime = 0;
        blueSound.play();
    } else if (pillType === 'red') {
        redSound.currentTime = 0;
        redSound.play();
    }
}

function stopSound(pillType) {
    if (pillType === 'blue') {
        blueSound.pause();
        blueSound.currentTime = 0;
    } else if (pillType === 'red') {
        redSound.pause();
        redSound.currentTime = 0;
    }
}

// Compte à rebours jusqu'au 29 mai 2026 17h00
function updateCountdown() {
    const targetDate = new Date('2026-05-29T17:00:00');
    const now = new Date();
    const difference = targetDate - now;

    if (difference <= 0) {
        document.getElementById('countdown').innerHTML = "FORMATION TERMINÉE!";
        return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    document.getElementById('countdown').innerHTML = 
        `${days}j ${hours}h ${minutes}m ${seconds}s`;
}

// Démarrer le compte à rebours
updateCountdown();
setInterval(updateCountdown, 1000);