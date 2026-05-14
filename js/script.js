// NAVBAR SCROLL
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 30) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
});

// HAMBURGER MENU
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const menuClose = document.getElementById('menuClose');
hamburger.addEventListener('click', () => { mobileMenu.classList.toggle('open'); });
menuClose.addEventListener('click', closeMobileMenu);
function closeMobileMenu() { mobileMenu.classList.remove('open'); }

// SCROLL REVEAL
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
reveals.forEach(el => observer.observe(el));

// COUNTER ANIMATION
const counters = document.querySelectorAll('.stat-number[data-target]');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (!e.isIntersecting || e.target.dataset.animated) return;
    e.target.dataset.animated = 'true';
    const target = parseInt(e.target.dataset.target);
    const suffix = e.target.dataset.suffix || (target > 99 ? '+' : '');
    const duration = 1800;
    const start = performance.now();
    const update = (t) => {
      const p = Math.min((t - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      let val = Math.floor(ease * target);
      if (target === 50000) val = Math.floor(ease * 50) + 'K';
      else if (target === 1000000) val = (ease * 1).toFixed(1) + 'M';
      else if (target === 999) val = (ease * 99.9).toFixed(1) + '%';
      else val = val + suffix;
      e.target.textContent = val;
      if (p < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  });
}, { threshold: 0.5 });
counters.forEach(c => counterObserver.observe(c));

// FAQ TOGGLE
function toggleFaq(btn) {
  const item = btn.parentElement;
  const wasOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
  if (!wasOpen) item.classList.add('open');
}

// PRICING TOGGLE
const pricingToggle = document.getElementById('pricingToggle');
let isYearly = false;
const monthlyPrices = ['₹999', '₹2,499', 'Custom'];
const yearlyPrices = ['₹699', '₹1,749', 'Custom'];
const priceEls = document.querySelectorAll('.pricing-amount');
pricingToggle.addEventListener('click', () => {
  isYearly = !isYearly;
  pricingToggle.classList.toggle('yearly', isYearly);
  priceEls.forEach((el, i) => {
    el.style.transform = 'translateY(-8px)';
    el.style.opacity = '0';
    el.style.transition = 'all 0.25s';
    setTimeout(() => {
      el.textContent = isYearly ? yearlyPrices[i] : monthlyPrices[i];
      el.style.transform = 'translateY(0)';
      el.style.opacity = '1';
    }, 250);
  });
});

// SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});

// PARALLAX on hero orbs
window.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 20;
  const y = (e.clientY / window.innerHeight - 0.5) * 20;
  const orb1 = document.querySelector('.hero-bg-orb-1');
  const orb2 = document.querySelector('.hero-bg-orb-2');
  if (orb1) orb1.style.transform = `translate(${x * 0.8}px, ${y * 0.8}px)`;
  if (orb2) orb2.style.transform = `translate(${-x * 0.5}px, ${-y * 0.5}px)`;
});

// Bar chart animation on scroll
const barChart = document.querySelector('.bar-chart');
if (barChart) {
  const barObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      document.querySelectorAll('.bar').forEach((bar, i) => {
        bar.style.height = '0%';
        setTimeout(() => {
          const heights = ['55%','70%','48%','85%','62%','90%','75%'];
          bar.style.transition = 'height 0.8s cubic-bezier(0.16,1,0.3,1)';
          bar.style.height = heights[i];
        }, i * 80);
      });
      barObserver.disconnect();
    }
  }, { threshold: 0.5 });
  barObserver.observe(barChart);
}

// Set bars to 0 initially
document.querySelectorAll('.bar').forEach(b => b.style.height = '0%');