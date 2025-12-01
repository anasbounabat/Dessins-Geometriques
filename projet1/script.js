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

resize();