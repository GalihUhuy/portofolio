// script.js - Portfolio Interactivity

// Typing Effect
function typeWriter(element, text, speed = 150) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            element.style.borderRight = 'none';
        }
    }
    type();
}

// Navbar Mobile Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth Scrolling & Navbar Active State
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

function updateActiveNav() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Scroll Progress Bar
function updateProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    document.querySelector('.progress').style.width = progress + '%';
}

// Fade In on Scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Contact Links Toggle
function toggleContactLinks() {
    const links = document.querySelector('.contact-links');
    const items = document.querySelectorAll('.contact-item');
    
    links.classList.toggle('active');
    
    if (links.classList.contains('active')) {
        items.forEach((item, index) => {
            item.style.setProperty('--order', index);
        });
    }
}

// Education Timeline Toggle - Multi item support
function toggleEducationContent() {
    const icon = event.target.closest('.timeline-icon');
    const content = icon.nextElementSibling;
    content.classList.toggle('active');
}

// Contact Form Handler
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your message! I\'ll get back to you soon. (Demo)');
    this.reset();
});

// Glow Orb Cursor
let mouseX = 0, mouseY = 0;
const cursor = {
    el: null,
    size: 40,
    create() {
        this.el = document.createElement('div');
        this.el.style.cssText = `
            position: fixed;
            width: ${this.size}px;
            height: ${this.size}px;
            background: radial-gradient(circle, rgba(139,92,246,0.6) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            mix-blend-mode: screen;
            backdrop-filter: blur(10px);
            transition: transform 0.1s ease-out;
            will-change: transform;
        `;
        document.body.appendChild(this.el);
    },
    update(x, y) {
        if (!this.el) return;
        this.el.style.transform = `translate(${x - this.size/2}px, ${y - this.size/2}px)`;
    }
};

// Hero Parallax
function parallaxHero() {
    const hero = document.querySelector('.hero');
    const scrolled = window.scrollY;
    const rate = scrolled * -0.5;
    hero.style.transform = `translateY(${rate}px)`;
}

// Button Ripple Effect
function createRipple(e) {
    const button = e.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${e.clientY - button.offsetTop - radius}px`;
    circle.classList.add('ripple');
    
    const ripple = button.getElementById('ripple');
    if (ripple) ripple.remove();
    circle.id = 'ripple';
    button.appendChild(circle);
}

// Staggered Fade-ins
function staggerFadeIn(container) {
    const items = container.querySelectorAll('.fade-in');
    items.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.1}s`;
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Create glow cursor
    cursor.create();
    
    // Start typing effect
    const typingElement = document.querySelector('.typing-text');
    typeWriter(typingElement, 'Galih Margiantsyah Putra');
    
    staggerFadeIn(document.querySelector('.skills'));
    staggerFadeIn(document.querySelector('.projects-grid'));
    
    // Event listeners
    window.addEventListener('scroll', () => {
        updateActiveNav();
        updateProgress();
        parallaxHero();
    });
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.update(mouseX, mouseY);
    });
    
    // Ripple on buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', createRipple);
    });
    
    // Initial checks
    updateActiveNav();
    updateProgress();
    
    // Navbar active style
    const style = document.createElement('style');
    style.textContent = `
        .nav-link.active {
            color: var(--accent-primary) !important;
        }
        .nav-link.active::after {
            width: 100% !important;
        }
        .hamburger.active span:nth-child(1) { transform: rotate(45deg) translate(6px, 6px); }
        .hamburger.active span:nth-child(2) { opacity: 0; }
        .hamburger.active span:nth-child(3) { transform: rotate(-45deg) translate(6px, -6px); }
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255,255,255,0.6);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Modal Functionality
    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scroll
        }
    }

    function closeModal() {
        const modals = document.querySelectorAll('.modal.active');
        modals.forEach(modal => {
            modal.classList.remove('active');
        });
        document.body.style.overflow = ''; // Restore scroll
    }

    // Modal event listeners
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-trigger')) {
            const modalId = e.target.getAttribute('data-modal');
            openModal(modalId);
        }
        if (e.target.classList.contains('modal-close') || e.target.classList.contains('modal-overlay')) {
            closeModal();
        }
    });

    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
});
