// script.js - interactive features: search filter, scroll animations, smooth nav, ripple button, dark mode
document.addEventListener('DOMContentLoaded', function() {
  // Search filter
  const searchInput = document.getElementById('searchInput');
  if(searchInput){
    searchInput.addEventListener('input', function(e){
      const q = e.target.value.toLowerCase();
      document.querySelectorAll('.card').forEach(card=>{
        const name = card.querySelector('h3').innerText.toLowerCase();
        const desc = card.querySelector('p').innerText.toLowerCase();
        if(name.includes(q) || desc.includes(q)) card.style.display = '';
        else card.style.display = 'none';
      })
    })
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', function(e){
      e.preventDefault();
      const id = this.getAttribute('href').slice(1);
      const el = document.getElementById(id);
      if(el) el.scrollIntoView({behavior:'smooth',block:'start'});
    })
  });

  // IntersectionObserver for reveal
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.remove('hide');
        io.unobserve(entry.target);
      }
    })
  }, {threshold: 0.12});
  document.querySelectorAll('.card.hide').forEach(c=>io.observe(c));

  // Ripple effect on shop buttons and redirect to product page
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
      // redirect after short delay to allow ripple
      const link = btn.getAttribute('data-link');
      if(link) setTimeout(()=> window.location.href = link, 220);
    })
  });

  // Dark mode toggle
  const toggle = document.getElementById('modeToggle');
  if(toggle){
    toggle.addEventListener('click', function(){
      document.documentElement.classList.toggle('dark-mode');
      if(document.documentElement.classList.contains('dark-mode')){
        // apply dark variables
        document.documentElement.style.setProperty('--silk', '#0f1115');
        document.documentElement.style.setProperty('--gold', '#b78f62');
        document.documentElement.style.setProperty('--gold-dark', '#8f684c');
        document.documentElement.style.setProperty('--text', '#eaeaea');
        document.documentElement.style.setProperty('--muted', '#cfcfcf');
      } else {
        // revert
        document.documentElement.style.setProperty('--silk', '#fdfcfb');
        document.documentElement.style.setProperty('--gold', '#a87c5b');
        document.documentElement.style.setProperty('--gold-dark', '#8f684c');
        document.documentElement.style.setProperty('--text', '#222');
        document.documentElement.style.setProperty('--muted', '#6b6b6b');
      }
    })
  }
});
// Hamburger toggle
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