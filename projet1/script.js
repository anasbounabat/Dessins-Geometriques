const canvas = document.getElementById('neonCanvas');
const ctx = canvas.getContext('2d');

let width, height, cx, cy;

// Paramètres Projet 1
const R = 210; 
const r = 62;  
const O = 130; 
const resolution = 0.02; 

function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    cx = width / 2;
    cy = height / 2;
    drawFinalRosace();
}

window.addEventListener('resize', resize);

function drawFinalRosace() {
    ctx.clearRect(0, 0, width, height);
    ctx.save();
    ctx.translate(cx, cy);

    ctx.lineWidth = 1.5;
    ctx.shadowBlur = 25;
    ctx.shadowColor = "rgba(255, 0, 255, 0.7)"; 
    ctx.globalCompositeOperation = 'lighter';

    ctx.beginPath();
    
    // Boucle de dessin Canvas
    for (let theta = 0; theta < 400 * Math.PI; theta += resolution) {
        let x = (R - r) * Math.cos(theta) + O * Math.cos(((R - r) / r) * theta);
        let y = (R - r) * Math.sin(theta) - O * Math.sin(((R - r) / r) * theta);

        if (theta === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    }

    let gradient = ctx.createLinearGradient(-R*1.5, -R*1.5, R*1.5, R*1.5);
    gradient.addColorStop(0, '#00ffff');
    gradient.addColorStop(0.4, '#ff00ff');
    gradient.addColorStop(0.8, '#ff3300');
    gradient.addColorStop(1, '#00ffff');

    ctx.strokeStyle = gradient;
    ctx.stroke();
    ctx.restore();
}

// --- Fonction de téléchargement PNG ---
function downloadPNG() {
    const link = document.createElement('a');
    link.download = 'rosace-neon.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
}

// --- Fonction de téléchargement SVG ---
function downloadSVG() {
    // 1. Calcul des dimensions (ViewBox) pour que le SVG soit centré
    // On utilise une taille fixe assez grande pour contenir le rayon max
    const size = (R + O) * 2.5; 
    const center = size / 2;
    
    // 2. Construction du chemin (Path) SVG mathématique
    let d = "";
    let firstPoint = true;

    // On utilise la même boucle mathématique que le canvas
    for (let theta = 0; theta < 400 * Math.PI; theta += resolution) {
        let x = (R - r) * Math.cos(theta) + O * Math.cos(((R - r) / r) * theta);
        let y = (R - r) * Math.sin(theta) - O * Math.sin(((R - r) / r) * theta);

        // On ajuste les coordonnées pour le SVG (centre + coordonnée)
        const svgX = (center + x).toFixed(2);
        const svgY = (center + y).toFixed(2);

        if (firstPoint) {
            d += `M ${svgX} ${svgY} `;
            firstPoint = false;
        } else {
            d += `L ${svgX} ${svgY} `;
        }
    }

    // 3. Création du contenu XML du SVG
    // On inclut le dégradé (linearGradient) pour imiter le style du Canvas
    const svgContent = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
            <defs>
                <linearGradient id="neonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#00ffff;stop-opacity:1" />
                    <stop offset="40%" style="stop-color:#ff00ff;stop-opacity:1" />
                    <stop offset="80%" style="stop-color:#ff3300;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#00ffff;stop-opacity:1" />
                </linearGradient>
                <filter id="glow">
                    <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                    <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                </filter>
            </defs>
            <rect width="100%" height="100%" fill="#111" />
            <path d="${d}" stroke="url(#neonGrad)" stroke-width="1.5" fill="none" filter="url(#glow)" />
        </svg>
    `;

    // 4. Création du fichier Blob et téléchargement
    const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'rosace-neon.svg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Lancer le dessin initial
resize();