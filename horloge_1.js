// Effet Matrix
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

window.addEventListener('resize', () => {  // Correction ici: ajout de =>
    resizeCanvas();
    columns = canvas.width / fontSize;
    drops.length = 0;
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * -100;
    }
});

// Horloge
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
        if (blueSound) {
            blueSound.currentTime = 0;
            blueSound.play().catch(e => console.log("Erreur lecture son bleu:", e));
        }
    } else if (pillType === 'red') {
        if (redSound) {
            redSound.currentTime = 0;
            redSound.play().catch(e => console.log("Erreur lecture son rouge:", e));
        }
    }
}

function stopSound(pillType) {
    if (pillType === 'blue' && blueSound) {
        blueSound.pause();
        blueSound.currentTime = 0;
    } else if (pillType === 'red' && redSound) {
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

// Favicon animée style Matrix
function createAnimatedFavicon() {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    
    let favicon = document.getElementById('animatedFavicon');
    let characters = '01';
    let drops = [];
    
    // Initialiser les drops
    for (let i = 0; i < 10; i++) {
        drops.push({
            x: Math.random() * 32,
            y: Math.random() * -100,
            speed: 2 + Math.random() * 3
        });
    }
    
    function animateFavicon() {
        // Fond semi-transparent pour effet de traînée
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.fillRect(0, 0, 32, 32);
        
        // Dessiner les caractères qui tombent
        ctx.font = '12px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const char = characters[Math.floor(Math.random() * characters.length)];
            
            // Dégradé de vert
            const greenValue = Math.floor(100 + Math.random() * 155);
            ctx.fillStyle = `rgb(0, ${greenValue}, 0)`;
            
            ctx.fillText(char, drops[i].x, drops[i].y);
            
            // Déplacer le drop
            drops[i].y += drops[i].speed;
            
            // Réinitialiser si hors écran
            if (drops[i].y > 32) {
                drops[i].y = Math.random() * -20;
                drops[i].x = Math.random() * 32;
                drops[i].speed = 2 + Math.random() * 3;
            }
        }
        
        // Quelques pixels verts statiques pour le fond
        for (let i = 0; i < 5; i++) {
            const x = Math.random() * 32;
            const y = Math.random() * 32;
            const greenValue = Math.floor(50 + Math.random() * 50);
            ctx.fillStyle = `rgb(0, ${greenValue}, 0)`;
            ctx.fillRect(x, y, 1, 1);
        }
        
        // Mettre à jour la favicon
        if (favicon) {
            favicon.href = canvas.toDataURL('image/png');
        }
        
        // Continuer l'animation
        requestAnimationFrame(animateFavicon);
    }
    
    // Démarrer l'animation
    animateFavicon();
}

// Démarrer l'animation de la favicon au chargement
window.addEventListener('load', function() {
    // Petit délai pour éviter de surcharger le chargement
    setTimeout(createAnimatedFavicon, 1000);
});

// Gestion des erreurs de chargement des sons
window.addEventListener('load', function() {
    if (!blueSound || !redSound) {
        console.log("Les fichiers audio ne sont pas chargés");
    }
});

// Fonctionnalités plein écran
const fullscreenButton = document.getElementById('fullscreenButton');
        
// Fonction pour activer le mode plein écran
function openFullscreen() {
    const elem = document.documentElement;
    
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
    }
}

// Fonction pour quitter le mode plein écran
function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen();
    }
}

// Événements pour le bouton plein écran
fullscreenButton.addEventListener('click', function() {
    if (!document.fullscreenElement && 
        !document.webkitFullscreenElement && 
        !document.mozFullScreenElement &&
        !document.msFullscreenElement) {
        openFullscreen();
        fullscreenButton.textContent = "⛶";
    } else {
        closeFullscreen();
        fullscreenButton.textContent = "⛶";
    }
});

// Écouter les changements de mode plein écran
document.addEventListener('fullscreenchange', handleFullscreenChange);
document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
document.addEventListener('mozfullscreenchange', handleFullscreenChange);
document.addEventListener('MSFullscreenChange', handleFullscreenChange);

function handleFullscreenChange() {
    if (document.fullscreenElement || 
        document.webkitFullscreenElement || 
        document.mozFullScreenElement ||
        document.msFullscreenElement) {
        console.log("Mode plein écran activé");
        fullscreenButton.textContent = "⛶";
    } else {
        console.log("Mode plein écran désactivé");
        fullscreenButton.textContent = "⛶";
    }
}

// Fonctionnalités de zoom
const zoomInButton = document.getElementById('zoomIn');
const zoomOutButton = document.getElementById('zoomOut');
let currentZoom = 100;

zoomInButton.addEventListener('click', function() {
    if (currentZoom < 150) {
        currentZoom += 10;
        document.body.style.zoom = currentZoom + '%';
    }
});

zoomOutButton.addEventListener('click', function() {
    if (currentZoom > 70) {
        currentZoom -= 10;
        document.body.style.zoom = currentZoom + '%';
    }
});