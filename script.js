// PARTICLES
const canvas = document.getElementById("particleCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

for (let i = 0; i < 120; i++) {
particles.push({
x: Math.random() * canvas.width,
y: Math.random() * canvas.height,
vx: Math.random() - 0.5,
vy: Math.random() - 0.5
});
}

let mouse = {x: 0, y: 0};

window.addEventListener("mousemove", e => {
mouse.x = e.clientX;
mouse.y = e.clientY;
});

function animate() {
ctx.fillStyle = "rgba(0,0,0,0.2)";
ctx.fillRect(0,0,canvas.width,canvas.height);

particles.forEach(p => {

let dx = mouse.x - p.x;
let dy = mouse.y - p.y;
let dist = Math.sqrt(dx*dx + dy*dy);

if(dist < 300){
p.vx += dx * 0.001;
p.vy += dy * 0.001;
}

p.x += p.vx;
p.y += p.vy;

ctx.beginPath();
ctx.arc(p.x, p.y, 2, 0, Math.PI*2);
ctx.fillStyle = "#56ccf2";
ctx.fill();
});

requestAnimationFrame(animate);
}

animate();


// REVEAL
const observer = new IntersectionObserver(entries => {
entries.forEach(entry => {
if(entry.isIntersecting){
entry.target.classList.add('vis');
}
});
},{threshold:0.2});

document.querySelectorAll('[data-reveal]').forEach(el=>{
observer.observe(el);
});


// PANEL INTERACTION
document.querySelectorAll('.panel').forEach(panel => {
panel.addEventListener('mousemove', e => {
const rect = panel.getBoundingClientRect();
const x = ((e.clientX - rect.left) / rect.width) * 100;
const y = ((e.clientY - rect.top) / rect.height) * 100;

panel.style.setProperty('--mx', x + '%');
panel.style.setProperty('--my', y + '%');
});
});
