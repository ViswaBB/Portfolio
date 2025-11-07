// Theme Management - In-Memory State (No localStorage)
let currentTheme = 'dark';

function initTheme() {
  // Check system preference
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  currentTheme = prefersDark ? 'dark' : 'light';
  
  // Apply theme immediately
  applyTheme(currentTheme);
  
  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    currentTheme = e.matches ? 'dark' : 'light';
    applyTheme(currentTheme);
  });
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
}

function toggleTheme() {
  currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
  applyTheme(currentTheme);
  
  // Add rotation animation to toggle button
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.style.transform = 'rotate(360deg)';
    setTimeout(() => {
      themeToggle.style.transform = '';
    }, 300);
  }
}

// Navigation
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');

// Scroll event handler is now consolidated below

function updateActiveNavLink() {
  const sections = document.querySelectorAll('section');
  const scrollPosition = window.scrollY + 100;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

// Mobile Menu Toggle
if (mobileMenuToggle) {
  mobileMenuToggle.addEventListener('click', () => {
    mobileMenuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
  });
  
  // Close menu when clicking on a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenuToggle.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });
}

// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
  themeToggle.addEventListener('click', (e) => {
    e.preventDefault();
    toggleTheme();
  });
  // Add smooth transition to toggle button
  themeToggle.style.transition = 'transform 0.3s ease';
}

// Typing Animation
const typingText = document.getElementById('typingText');
if (typingText) {
  const texts = [
    'ML & Data-Driven Developer',
    'Building AI-powered data solutions',
    'Gemini API Enthusiast',
    'Python, Scikit-learn & ML Expert',
    'Data Analysis Specialist'
  ];
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;
  
  function type() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
      typingText.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typingText.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
      isDeleting = true;
      typingSpeed = 2000;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
    }
    
    setTimeout(type, typingSpeed);
  }
  
  type();
}

// Counter Animation
function animateCounter(element) {
  const target = parseFloat(element.getAttribute('data-target'));
  const duration = 2000;
  const increment = target / (duration / 16);
  let current = 0;
  
  const updateCounter = () => {
    current += increment;
    if (current < target) {
      element.textContent = current.toFixed(target % 1 === 0 ? 0 : 2);
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target.toFixed(target % 1 === 0 ? 0 : 2);
    }
  };
  
  updateCounter();
}

// Skill Progress Animation
function animateSkillProgress(element) {
  const progress = element.getAttribute('data-progress');
  element.style.width = progress + '%';
}

// Intersection Observer for Animations
const observerOptions = {
  threshold: 0.2,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      
      // Animate counters
      if (entry.target.classList.contains('stat-number')) {
        animateCounter(entry.target);
      }
      
      // Animate skill progress bars
      const skillProgress = entry.target.querySelector('.skill-progress');
      if (skillProgress) {
        setTimeout(() => {
          animateSkillProgress(skillProgress);
        }, 200);
      }
      
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe elements
function observeElements() {
  // Add fade-in class to elements
  const elementsToAnimate = document.querySelectorAll(
    '.stat-card, .experience-card, .skill-category, .project-card, ' +
    '.cert-card, .hackathon-card, .contact-item, .timeline-item'
  );
  
  elementsToAnimate.forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
  });
  
  // Observe stat numbers
  const statNumbers = document.querySelectorAll('.stat-number');
  statNumbers.forEach(stat => observer.observe(stat));
  
  // Observe skill categories
  const skillCategories = document.querySelectorAll('.skill-category');
  skillCategories.forEach(category => observer.observe(category));
}

// Particle Background Animation
function createParticleBackground() {
  const particleCanvas = document.getElementById('particleCanvas');
  if (!particleCanvas) return;
  
  const particleCount = 50;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.width = Math.random() * 3 + 1 + 'px';
    particle.style.height = particle.style.width;
    particle.style.background = `rgba(102, 126, 234, ${Math.random() * 0.5})`;
    particle.style.borderRadius = '50%';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.pointerEvents = 'none';
    
    const duration = Math.random() * 20 + 10;
    const delay = Math.random() * 5;
    
    particle.style.animation = `float ${duration}s ${delay}s infinite ease-in-out`;
    
    particleCanvas.appendChild(particle);
  }
}

// Tech Stack Animation
const techOrbs = document.querySelectorAll('.tech-orb');
if (techOrbs.length > 0) {
  techOrbs.forEach((orb, index) => {
    orb.style.animationDelay = `${index * 1.6}s`;
  });
}

// Logo Click Handler - Scroll to Top
const navLogoLink = document.getElementById('navLogoLink');
if (navLogoLink) {
  navLogoLink.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    // Add a spin animation on click
    const logo = navLogoLink.querySelector('.animated-logo');
    if (logo) {
      logo.style.transition = 'transform 0.6s ease';
      logo.style.transform = 'rotate(360deg) scale(1.1)';
      setTimeout(() => {
        logo.style.transform = '';
      }, 600);
    }
  });
}

// Smooth Scroll
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
      const offsetTop = targetSection.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// Scroll Progress Indicator
function updateScrollProgress() {
  const scrollProgress = document.getElementById('scrollProgress');
  if (!scrollProgress) return;
  
  const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (window.scrollY / windowHeight) * 100;
  scrollProgress.style.width = scrolled + '%';
}

// Back to Top Button
function updateBackToTop() {
  const backToTop = document.getElementById('backToTop');
  if (!backToTop) return;
  
  if (window.scrollY > 300) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
}

const backToTop = document.getElementById('backToTop');
if (backToTop) {
  backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Update scroll-based features
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  updateActiveNavLink();
  updateScrollProgress();
  updateBackToTop();
}, { passive: true });

// Enhanced Particle Animation with Mouse Movement
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function createEnhancedParticles() {
  const particleCanvas = document.getElementById('particleCanvas');
  if (!particleCanvas) return;
  
  const particles = particleCanvas.querySelectorAll('div');
  
  particles.forEach((particle) => {
    const rect = particle.getBoundingClientRect();
    const particleX = rect.left + rect.width / 2;
    const particleY = rect.top + rect.height / 2;
    
    const deltaX = mouseX - particleX;
    const deltaY = mouseY - particleY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    
    if (distance < 150) {
      const force = (150 - distance) / 150;
      const moveX = deltaX * force * 0.1;
      const moveY = deltaY * force * 0.1;
      
      particle.style.transform = `translate(${moveX}px, ${moveY}px)`;
    } else {
      particle.style.transform = '';
    }
  });
}

// Smooth scroll reveal for elements
function revealOnScroll() {
  const reveals = document.querySelectorAll('.fade-in');
  
  reveals.forEach(element => {
    const windowHeight = window.innerHeight;
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;
    
    if (elementTop < windowHeight - elementVisible) {
      element.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', revealOnScroll, { passive: true });

// Add smooth transitions to all theme-dependent elements
function addThemeTransitions() {
  const elements = document.querySelectorAll('body, section, .card, .btn, nav, .navbar');
  elements.forEach(el => {
    el.style.transition = 'background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease';
  });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  observeElements();
  createParticleBackground();
  updateActiveNavLink();
  updateScrollProgress();
  updateBackToTop();
  addThemeTransitions();
  revealOnScroll();
  
  // Mouse movement particle effect (throttled)
  let particleAnimationFrame;
  document.addEventListener('mousemove', () => {
    if (particleAnimationFrame) return;
    particleAnimationFrame = requestAnimationFrame(() => {
      createEnhancedParticles();
      particleAnimationFrame = null;
    });
  });
});

// Add CSS for particle animation
const style = document.createElement('style');
style.textContent = `
  @keyframes float {
    0%, 100% {
      transform: translate(0, 0) rotate(0deg);
      opacity: 0.3;
    }
    25% {
      transform: translate(20px, -30px) rotate(90deg);
      opacity: 0.8;
    }
    50% {
      transform: translate(-20px, -60px) rotate(180deg);
      opacity: 0.3;
    }
    75% {
      transform: translate(-40px, -30px) rotate(270deg);
      opacity: 0.8;
    }
  }
`;
document.head.appendChild(style);