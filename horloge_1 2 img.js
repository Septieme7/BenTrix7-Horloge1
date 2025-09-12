const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

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

/* === Faire apparaître les images après le saut du lapin === */
const rabbit = document.querySelector('.rabbit');
rabbit.addEventListener('animationend', () => {
    document.querySelector('.logo-left').classList.add('show');
    document.querySelector('.logo-right').classList.add('show');
});
