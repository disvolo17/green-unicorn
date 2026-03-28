// Particle System for Hero Section
class ParticleSystem {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mousePos = { x: 0, y: 0 };
        
        this.resizeCanvas();
        this.initializeParticles();
        this.setupEventListeners();
        this.animate();
    }
    
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    initializeParticles() {
        this.particles = [];
        const particleCount = Math.floor((this.canvas.width * this.canvas.height) / 5000);
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                size: Math.random() * 3 + 1,
                opacity: Math.random() * 0.5,
                targetOpacity: Math.random() * 0.7 + 0.3,
                hue: Math.random() * 60 + 200,
                life: Math.random() * 100,
            });
        }
    }
    
    setupEventListeners() {
        window.addEventListener('resize', () => this.resizeCanvas());
        window.addEventListener('mousemove', (e) => {
            this.mousePos = { x: e.clientX, y: e.clientY };
        });
    }
    
    animate = () => {
        this.ctx.fillStyle = 'rgba(30, 25, 50, 0.1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach((particle) => {
            // Gradually increase opacity
            particle.targetOpacity = Math.min(particle.targetOpacity + 0.002, 0.8);
            particle.opacity += (particle.targetOpacity - particle.opacity) * 0.05;
            
            // Mouse influence
            const dx = this.mousePos.x - particle.x;
            const dy = this.mousePos.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const maxDistance = 150;
            
            if (distance < maxDistance) {
                const angle = Math.atan2(dy, dx);
                const force = (1 - distance / maxDistance) * 0.3;
                particle.vx += Math.cos(angle) * force;
                particle.vy += Math.sin(angle) * force;
            }
            
            // Apply friction and gravity
            particle.vx *= 0.98;
            particle.vy *= 0.98;
            particle.vy += 0.01;
            
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Wrap around edges
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;
            
            // Draw particle with bioluminescent glow
            particle.life += 1;
            const glowIntensity = Math.sin(particle.life * 0.02) * 0.5 + 0.5;
            
            this.ctx.shadowColor = `hsla(${particle.hue}, 100%, 50%, ${particle.opacity * glowIntensity})`;
            this.ctx.shadowBlur = 15;
            this.ctx.fillStyle = `hsla(${particle.hue}, 100%, 60%, ${particle.opacity})`;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
        });
        
        requestAnimationFrame(this.animate);
    }
}

// Network Visualization for Ecosystem Section
class NetworkVisualization {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.nodes = [];
        
        this.resizeCanvas();
        this.initializeNodes();
        this.animate();
    }
    
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = Math.min(window.innerHeight * 0.8, 600);
    }
    
    initializeNodes() {
        const colors = ['#a8e6cf', '#56ccf2', '#bb6bd9'];
        
        this.nodes = [
            { x: this.canvas.width / 2, y: this.canvas.height / 2, vx: 0, vy: 0, size: 15, label: 'Center', color: '#a8e6cf' },
            { x: this.canvas.width / 3, y: this.canvas.height / 3, vx: 0, vy: 0, size: 10, label: 'Partner 1', color: '#56ccf2' },
            { x: (this.canvas.width * 2) / 3, y: this.canvas.height / 3, vx: 0, vy: 0, size: 10, label: 'Partner 2', color: '#56ccf2' },
            { x: this.canvas.width / 4, y: (this.canvas.height * 2) / 3, vx: 0, vy: 0, size: 10, label: 'Partner 3', color: '#bb6bd9' },
            { x: (this.canvas.width * 3) / 4, y: (this.canvas.height * 2) / 3, vx: 0, vy: 0, size: 10, label: 'Partner 4', color: '#bb6bd9' },
            { x: this.canvas.width / 2, y: this.canvas.height / 6, vx: 0, vy: 0, size: 8, label: 'Project A', color: '#a8e6cf' },
            { x: this.canvas.width / 6, y: this.canvas.height / 2, vx: 0, vy: 0, size: 8, label: 'Project B', color: '#a8e6cf' },
            { x: (this.canvas.width * 5) / 6, y: this.canvas.height / 2, vx: 0, vy: 0, size: 8, label: 'Project C', color: '#a8e6cf' },
        ];
    }
    
    animate = () => {
        // Clear canvas
        this.ctx.fillStyle = 'rgba(30, 25, 50, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Update nodes with force-directed layout
        this.nodes.forEach((node, i) => {
            // Repulsion from other nodes
            this.nodes.forEach((other, j) => {
                if (i !== j) {
                    const dx = node.x - other.x;
                    const dy = node.y - other.y;
                    const distance = Math.sqrt(dx * dx + dy * dy) || 1;
                    const force = 50 / (distance * distance);
                    node.vx += (dx / distance) * force * 0.01;
                    node.vy += (dy / distance) * force * 0.01;
                }
            });
            
            // Attraction to center
            const centerX = this.canvas.width / 2;
            const centerY = this.canvas.height / 2;
            const dx = centerX - node.x;
            const dy = centerY - node.y;
            node.vx += dx * 0.0001;
            node.vy += dy * 0.0001;
            
            // Apply friction
            node.vx *= 0.95;
            node.vy *= 0.95;
            
            // Update position
            node.x += node.vx;
            node.y += node.vy;
            
            // Keep within bounds
            node.x = Math.max(node.size, Math.min(this.canvas.width - node.size, node.x));
            node.y = Math.max(node.size, Math.min(this.canvas.height - node.size, node.y));
        });
        
        // Draw connections
        this.ctx.strokeStyle = 'rgba(168, 230, 207, 0.1)';
        this.ctx.lineWidth = 1;
        this.nodes.forEach((node, i) => {
            this.nodes.forEach((other, j) => {
                if (i < j) {
                    const dx = node.x - other.x;
                    const dy = node.y - other.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < 300) {
                        this.ctx.globalAlpha = 1 - distance / 300;
                        this.ctx.beginPath();
                        this.ctx.moveTo(node.x, node.y);
                        this.ctx.lineTo(other.x, other.y);
                        this.ctx.stroke();
                        this.ctx.globalAlpha = 1;
                    }
                }
            });
        });
        
        // Draw nodes
        this.nodes.forEach((node) => {
            this.ctx.fillStyle = node.color;
            this.ctx.shadowColor = node.color;
            this.ctx.shadowBlur = 10;
            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
            this.ctx.fill();
        });
        
        requestAnimationFrame(this.animate);
    }
}

// Intersection Observer for Scroll Animations
class ScrollAnimations {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '-100px'
        };
        
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                    this.observer.unobserve(entry.target);
                }
            });
        }, this.observerOptions);
        
        this.initializeObserver();
    }
    
    initializeObserver() {
        // Observe all cards and sections
        const elements = document.querySelectorAll(
            '.about-card, .metric-card, .partnership-card, .process-stage, .outcome-item'
        );
        
        elements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            this.observer.observe(el);
        });
    }
    
    animateElement(element) {
        element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    }
}

// Smooth Scroll for Navigation
class SmoothScroll {
    constructor() {
        this.setupLinks();
    }
    
    setupLinks() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }
}

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize particle system
    new ParticleSystem('particleCanvas');
    
    // Initialize network visualization
    new NetworkVisualization('networkCanvas');
    
    // Initialize scroll animations
    new ScrollAnimations();
    
    // Initialize smooth scroll
    new SmoothScroll();
    
    // Add hover effects to buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
});

// Handle window resize for responsive canvas
window.addEventListener('resize', () => {
    // Canvas will handle resize internally
});
