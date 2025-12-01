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

resize();