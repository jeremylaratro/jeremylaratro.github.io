/* ============================================
   MATRIX RAIN EFFECT
   Digital rain background animation
   ============================================ */

class MatrixRain {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.characters = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        this.fontSize = 14;
        this.columns = 0;
        this.drops = [];
        
        this.init();
        this.animate();
        
        window.addEventListener('resize', () => this.init());
    }
    
    init() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.columns = Math.floor(this.canvas.width / this.fontSize);
        this.drops = Array(this.columns).fill(1);
    }
    
    draw() {
        // Semi-transparent black to create fade effect
        this.ctx.fillStyle = 'rgba(10, 10, 15, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Set text properties
        this.ctx.fillStyle = '#00d4ff';
        this.ctx.font = `${this.fontSize}px monospace`;
        
        for (let i = 0; i < this.drops.length; i++) {
            // Random character
            const char = this.characters[Math.floor(Math.random() * this.characters.length)];
            
            // Draw character
            const x = i * this.fontSize;
            const y = this.drops[i] * this.fontSize;
            
            // Vary the color slightly
            if (Math.random() > 0.98) {
                this.ctx.fillStyle = '#ff0040'; // Occasional red
            } else if (Math.random() > 0.95) {
                this.ctx.fillStyle = '#00ff88'; // Occasional green
            } else {
                this.ctx.fillStyle = '#00d4ff'; // Default blue
            }
            
            this.ctx.fillText(char, x, y);
            
            // Reset drop randomly or when off screen
            if (y > this.canvas.height && Math.random() > 0.975) {
                this.drops[i] = 0;
            }
            
            this.drops[i]++;
        }
    }
    
    animate() {
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    new MatrixRain('matrix-bg');
});
