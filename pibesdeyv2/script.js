function toggleFlame(flameId) {
    const flame = document.getElementById(flameId);
    flame.style.display = flame.style.display === "none" ? "block" : "none";
}


const canvas = document.getElementById('background');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let confetti = [];
let boxes = [];


for (let i = 0; i < 100; i++) {
    confetti.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        width: Math.random() * 10 + 5,
        height: Math.random() * 20 + 10,
        color: `hsl(${Math.random() * 360}, 70%, 60%)`,
        speedX: Math.random() * 2 - 1,
        speedY: Math.random() * 3 + 1,
    });
}


for (let i = 0; i < 20; i++) {
    boxes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 100 + 50,
        color: `linear-gradient(45deg, rgba(${Math.random()*255},${Math.random()*255},${Math.random()*255},0.5), rgba(255,255,255,0))`,
        speedX: Math.random() * 2 - 1,
        speedY: Math.random() * 2 - 1,
    });
}


function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    
    confetti.forEach((c, index) => {
        ctx.fillStyle = c.color;
        ctx.fillRect(c.x, c.y, c.width, c.height);
        c.x += c.speedX;
        c.y += c.speedY;

        
        if (c.y > canvas.height) c.y = -20;
        if (c.x > canvas.width) c.x = -20;
        if (c.x < -20) c.x = canvas.width + 20;
    });

    
    boxes.forEach((b, index) => {
        const gradient = ctx.createLinearGradient(b.x, b.y, b.x + b.size, b.y + b.size);
        gradient.addColorStop(0, `rgba(255, 255, 255, 0.3)`);
        gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);
        ctx.fillStyle = gradient;
        ctx.fillRect(b.x, b.y, b.size, b.size);

        b.x += b.speedX;
        b.y += b.speedY;

        
        if (b.x < 0 || b.x + b.size > canvas.width) b.speedX *= -1;
        if (b.y < 0 || b.y + b.size > canvas.height) b.speedY *= -1;
    });

    requestAnimationFrame(render);
}

render();