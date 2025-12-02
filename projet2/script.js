const canvas = document.getElementById('neonCanvas');
const ctx = canvas.getContext('2d');

let width, height, cx, cy;

// Paramètres Projet 2 (Bleu)
const R = 180; 
const r = 110;  
const O = 90; 
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

    // Style Néon Bleu
    ctx.lineWidth = 2; 
    ctx.shadowBlur = 30;
    ctx.shadowColor = "rgba(0, 150, 255, 0.8)"; 
    ctx.globalCompositeOperation = 'lighter';

    ctx.beginPath();
    
    for (let theta = 0; theta < 200 * Math.PI; theta += resolution) {
        let x = (R - r) * Math.cos(theta) + O * Math.cos(((R - r) / r) * theta);
        let y = (R - r) * Math.sin(theta) - O * Math.sin(((R - r) / r) * theta);

        if (theta === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    }

    ctx.strokeStyle = '#0096FF'; 
    ctx.stroke();
    ctx.restore();
}

// --- TÉLÉCHARGEMENT PNG ---
function downloadPNG() {
    const link = document.createElement('a');
    link.download = 'rosace-bleue.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
}

// --- TÉLÉCHARGEMENT SVG ---
function downloadSVG() {
    // 1. Définir la zone de dessin (ViewBox)
    // Rayon max approximatif = R + O = 270. On prend de la marge.
    const size = (R + O) * 2.5; 
    const center = size / 2;
    
    // 2. Calcul du tracé vectoriel
    let d = "";
    let firstPoint = true;

    for (let theta = 0; theta < 200 * Math.PI; theta += resolution) {
        let x = (R - r) * Math.cos(theta) + O * Math.cos(((R - r) / r) * theta);
        let y = (R - r) * Math.sin(theta) - O * Math.sin(((R - r) / r) * theta);

        // Centrer les points pour le SVG
        const svgX = (center + x).toFixed(2);
        const svgY = (center + y).toFixed(2);

        if (firstPoint) {
            d += `M ${svgX} ${svgY} `;
            firstPoint = false;
        } else {
            d += `L ${svgX} ${svgY} `;
        }
    }

    // 3. Construction du contenu SVG
    // Note : On utilise un filtre "glow" bleu pour imiter le shadowBlur du canvas
    const svgContent = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
            <defs>
                <filter id="blueGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                    <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                </filter>
            </defs>
            <rect width="100%" height="100%" fill="#111" />
            <path d="${d}" stroke="#0096FF" stroke-width="2" fill="none" filter="url(#blueGlow)" />
        </svg>
    `;

    // 4. Création du fichier et déclenchement du téléchargement
    const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'rosace-bleue.svg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

resize();