// script.js - full interactive features with dark/light mode toggle
document.addEventListener('DOMContentLoaded', function() {

  // ------------------------
  // Search filter
  // ------------------------
  const searchInput = document.getElementById('searchInput');
  if(searchInput){
    searchInput.addEventListener('input', function(e){
      const q = e.target.value.toLowerCase();
      document.querySelectorAll('.card').forEach(card=>{
        const name = card.querySelector('h3').innerText.toLowerCase();
        const desc = card.querySelector('p').innerText.toLowerCase();
        card.style.display = (name.includes(q) || desc.includes(q)) ? '' : 'none';
      });
    });
  }

  // ------------------------
  // Smooth scroll for anchor links
  // ------------------------
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', function(e){
      e.preventDefault();
      const id = this.getAttribute('href').slice(1);
      const el = document.getElementById(id);
      if(el) el.scrollIntoView({behavior:'smooth', block:'start'});
    });
  });

  // ------------------------
  // IntersectionObserver for reveal
  // ------------------------
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.remove('hide');
        io.unobserve(entry.target);
      }
    });
  }, {threshold: 0.12});
  document.querySelectorAll('.card.hide').forEach(c=>io.observe(c));

  // ------------------------
  // Ripple effect on shop buttons
  // ------------------------
  document.querySelectorAll('.shop-btn').forEach(btn=>{
    btn.addEventListener('click', function(e){
      const rect = btn.getBoundingClientRect();
      const ripple = document.createElement('span');
      const size = Math.max(rect.width, rect.height);
      ripple.style.position = 'absolute';
      ripple.style.left = (e.clientX - rect.left - size/2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size/2) + 'px';
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.borderRadius = '50%';
      ripple.style.background = 'rgba(255,255,255,0.4)';
      ripple.style.transform = 'scale(0)';
      ripple.style.transition = 'transform 400ms, opacity 600ms';
      ripple.style.pointerEvents = 'none';
      btn.style.position = 'relative';
      btn.appendChild(ripple);
      requestAnimationFrame(()=> ripple.style.transform = 'scale(1.6)');
      setTimeout(()=>{ ripple.style.opacity = '0'; }, 250);
      setTimeout(()=> ripple.remove(), 700);

      // Redirect after short delay
      const link = btn.getAttribute('data-link');
      if(link) setTimeout(()=> window.location.href = link, 220);
    });
  });

  // ------------------------
  // Dark mode toggle with sun/moon icon
  // ------------------------
  const toggle = document.getElementById('modeToggle');
  const modeIcon = document.getElementById('modeIcon');
  const darkModeClass = 'dark-mode';

  // Apply saved preference from localStorage
  if(localStorage.getItem('theme') === 'dark'){
    document.documentElement.classList.add(darkModeClass);
    applyDarkVariables();
    modeIcon.textContent = '🌙'; // moon icon
  } else {
    modeIcon.textContent = '🌞'; // sun icon
  }

  // Toggle function
  if(toggle){
    toggle.addEventListener('click', function(){
      document.documentElement.classList.toggle(darkModeClass);
      if(document.documentElement.classList.contains(darkModeClass)){
        localStorage.setItem('theme', 'dark');
        applyDarkVariables();
        modeIcon.textContent = '🌙';
      } else {
        localStorage.setItem('theme', 'light');
        applyLightVariables();
        modeIcon.textContent = '🌞';
      }
    });
  }

  function applyDarkVariables(){
    document.documentElement.style.setProperty('--silk', '#0f1115');
    document.documentElement.style.setProperty('--gold', '#b78f62');
    document.documentElement.style.setProperty('--gold-dark', '#8f684c');
    document.documentElement.style.setProperty('--text', '#eaeaea');
    document.documentElement.style.setProperty('--muted', '#cfcfcf');
  }

  function applyLightVariables(){
    document.documentElement.style.setProperty('--silk', '#fdfcfb');
    document.documentElement.style.setProperty('--gold', '#a87c5b');
    document.documentElement.style.setProperty('--gold-dark', '#8f684c');
    document.documentElement.style.setProperty('--text', '#222');
    document.documentElement.style.setProperty('--muted', '#6b6b6b');
  }

});

// ------------------------
// Hamburger toggle
// ------------------------
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  hamburger.classList.toggle('open');
});

// Optional: close menu when a link is clicked (on mobile)
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    hamburger.classList.remove('open');
  });
});
