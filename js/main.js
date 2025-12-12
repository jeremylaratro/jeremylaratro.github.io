/* ============================================
   MAIN JAVASCRIPT
   Navigation, animations, and utilities
   ============================================ */

// DOM Ready
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initScrollReveal();
    initCurrentYear();
    initSmoothScroll();
    initGlitchEffect();
});

/* ============================================
   NAVIGATION
   ============================================ */
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
        
        // Close menu when clicking a link
        navLinks.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }
    
    // Active link highlighting
    highlightActiveNav();
}

function highlightActiveNav() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        
        if (currentPath.endsWith(href) || 
            (currentPath === '/' && href === 'index.html') ||
            (currentPath.endsWith('/') && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

/* ============================================
   SCROLL REVEAL ANIMATION
   ============================================ */
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal, .section-card, .info-card');
    
    const revealOnScroll = () => {
        reveals.forEach((element, index) => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const revealPoint = 150;
            
            if (elementTop < windowHeight - revealPoint) {
                // Add staggered delay based on index
                setTimeout(() => {
                    element.classList.add('active');
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    };
    
    // Initial check
    revealOnScroll();
    
    // Throttled scroll handler
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                revealOnScroll();
                ticking = false;
            });
            ticking = true;
        }
    });
}

/* ============================================
   UTILITIES
   ============================================ */
function initCurrentYear() {
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/* ============================================
   GLITCH EFFECT ENHANCEMENT
   ============================================ */
function initGlitchEffect() {
    const glitchElements = document.querySelectorAll('.glitch-text');
    
    glitchElements.forEach(element => {
        // Random glitch intensity
        setInterval(() => {
            if (Math.random() > 0.95) {
                element.style.animation = 'none';
                setTimeout(() => {
                    element.style.animation = '';
                }, 100);
            }
        }, 2000);
    });
}

/* ============================================
   TYPING EFFECT
   ============================================ */
class TypeWriter {
    constructor(element, words, wait = 3000) {
        this.element = element;
        this.words = words;
        this.wait = parseInt(wait, 10);
        this.wordIndex = 0;
        this.txt = '';
        this.isDeleting = false;
        this.type();
    }
    
    type() {
        const current = this.wordIndex % this.words.length;
        const fullTxt = this.words[current];
        
        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }
        
        this.element.innerHTML = `<span class="typed">${this.txt}</span>`;
        
        let typeSpeed = 100;
        
        if (this.isDeleting) {
            typeSpeed /= 2;
        }
        
        if (!this.isDeleting && this.txt === fullTxt) {
            typeSpeed = this.wait;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.wordIndex++;
            typeSpeed = 500;
        }
        
        setTimeout(() => this.type(), typeSpeed);
    }
}

// Initialize TypeWriter if element exists
document.addEventListener('DOMContentLoaded', () => {
    const typedElement = document.querySelector('.typed-output');
    if (typedElement) {
        const words = JSON.parse(typedElement.getAttribute('data-words'));
        new TypeWriter(typedElement, words);
    }
});

/* ============================================
   SKILL BARS ANIMATION
   ============================================ */
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar-fill');
    
    skillBars.forEach(bar => {
        const percent = bar.getAttribute('data-percent');
        bar.style.width = '0%';
        
        setTimeout(() => {
            bar.style.width = percent + '%';
        }, 300);
    });
}

// Trigger when skills section is visible
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkillBars();
            skillsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

document.addEventListener('DOMContentLoaded', () => {
    const skillsSection = document.querySelector('.skills-section');
    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }
});

/* ============================================
   CONTACT FORM
   ============================================ */
function initContactForm() {
    const form = document.querySelector('.contact-form');
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Simulate form submission
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'TRANSMITTING...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            submitBtn.textContent = 'MESSAGE SENT ✓';
            submitBtn.classList.add('success');
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.classList.remove('success');
                form.reset();
            }, 3000);
        }, 2000);
    });
}

document.addEventListener('DOMContentLoaded', initContactForm);

/* ============================================
   PARTICLE CURSOR EFFECT (Optional)
   ============================================ */
class ParticleCursor {
    constructor() {
        this.particles = [];
        this.mouseX = 0;
        this.mouseY = 0;
        
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
            this.createParticle();
        });
        
        this.animate();
    }
    
    createParticle() {
        if (this.particles.length > 50) return;
        
        const particle = document.createElement('div');
        particle.className = 'cursor-particle';
        particle.style.cssText = `
            position: fixed;
            left: ${this.mouseX}px;
            top: ${this.mouseY}px;
            width: 4px;
            height: 4px;
            background: var(--accent-blue);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9998;
            opacity: 1;
            transition: opacity 0.5s, transform 0.5s;
        `;
        
        document.body.appendChild(particle);
        this.particles.push({
            element: particle,
            x: this.mouseX,
            y: this.mouseY,
            life: 1
        });
    }
    
    animate() {
        this.particles.forEach((particle, index) => {
            particle.life -= 0.02;
            particle.element.style.opacity = particle.life;
            particle.element.style.transform = `scale(${particle.life})`;
            
            if (particle.life <= 0) {
                particle.element.remove();
                this.particles.splice(index, 1);
            }
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Uncomment to enable particle cursor
// document.addEventListener('DOMContentLoaded', () => new ParticleCursor());

/* ============================================
   CONSOLE EASTER EGG
   ============================================ */
console.log(`
%c╔══════════════════════════════════════╗
║                                      ║
║    🔐 SYSTEM ACCESS GRANTED 🔐      ║
║                                      ║
║    Welcome, fellow hacker.           ║
║    You found the dev console.        ║
║                                      ║
╚══════════════════════════════════════╝
`, 'color: #00d4ff; font-family: monospace;');
