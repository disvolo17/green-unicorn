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

if(dist < 200){
p.vx += dx * 0.0005;
p.vy += dy * 0.0005;
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


// NETWORK
const netCanvas = document.getElementById("networkCanvas");
const netCtx = netCanvas.getContext("2d");

netCanvas.width = window.innerWidth;
netCanvas.height = 400;

let nodes = [];

for(let i=0;i<8;i++){
nodes.push({
x: Math.random()*netCanvas.width,
y: Math.random()*400
});
}

function drawNetwork(){
netCtx.clearRect(0,0,netCanvas.width,400);

nodes.forEach(a=>{
nodes.forEach(b=>{
let dx = a.x - b.x;
let dy = a.y - b.y;
let dist = Math.sqrt(dx*dx+dy*dy);

if(dist < 200){
netCtx.beginPath();
netCtx.moveTo(a.x,a.y);
netCtx.lineTo(b.x,b.y);
netCtx.strokeStyle = "rgba(255,255,255,0.1)";
netCtx.stroke();
}
});
});

nodes.forEach(n=>{
netCtx.beginPath();
netCtx.arc(n.x,n.y,4,0,Math.PI*2);
netCtx.fillStyle = "#a8e6cf";
netCtx.fill();
});
requestAnimationFrame(drawNetwork);
}

drawNetwork();
