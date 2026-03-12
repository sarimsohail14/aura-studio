/* main.js — Aura Studio */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Navbar scroll behaviour ── */
  const navbar = document.getElementById('navbar');
  const navCta = document.getElementById('nav-cta');

  function handleScroll() {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
      if (navCta) {
        navCta.classList.remove('btn-outline-light');
        navCta.classList.add('btn-dark');
      }
    } else {
      navbar.classList.remove('scrolled');
      if (navCta) {
        navCta.classList.add('btn-outline-light');
        navCta.classList.remove('btn-dark');
      }
    }
  }
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  /* ── Hamburger / Mobile Menu ── */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('active');
    });
  }

  window.closeMobileMenu = function () {
    if (hamburger) hamburger.classList.remove('active');
    if (mobileMenu) mobileMenu.classList.remove('active');
  };

  /* ── Scroll Reveal ── */
  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealEls.forEach((el) => revealObserver.observe(el));

  /* ── Testimonials Slider ── */
  const track = document.getElementById('testimonials-track');
  const dotsContainer = document.getElementById('slider-dots');
  const btnPrev = document.getElementById('slider-prev');
  const btnNext = document.getElementById('slider-next');

  if (!track || !dotsContainer) return;

  const cards = Array.from(track.children);
  let current = 0;

  // How many cards are visible depends on viewport
  function getVisible() {
    if (window.innerWidth >= 900) return 3;
    if (window.innerWidth >= 640) return 2;
    return 1;
  }

  function totalSlides() {
    return Math.max(1, cards.length - getVisible() + 1);
  }

  // Build dots
  function buildDots() {
    dotsContainer.innerHTML = '';
    for (let i = 0; i < totalSlides(); i++) {
      const dot = document.createElement('button');
      dot.className = 'slider-dot' + (i === current ? ' active' : '');
      dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
      dot.addEventListener('click', () => goTo(i));
      dotsContainer.appendChild(dot);
    }
  }

  function goTo(index) {
    current = Math.max(0, Math.min(index, totalSlides() - 1));
    const vis = getVisible();
    const cardWidth = cards[0].getBoundingClientRect().width;
    const gap = 24; // 1.5rem
    track.style.transform = `translateX(-${current * (cardWidth + gap)}px)`;

    dotsContainer.querySelectorAll('.slider-dot').forEach((d, i) => {
      d.classList.toggle('active', i === current);
    });
  }

  btnPrev && btnPrev.addEventListener('click', () => goTo(current - 1));
  btnNext && btnNext.addEventListener('click', () => goTo(current + 1));

  buildDots();
  goTo(0);

  window.addEventListener('resize', () => {
    buildDots();
    goTo(Math.min(current, totalSlides() - 1));
  });

  /* ──/* ======= FORM SUBMISSION ======= */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const btn = contactForm.querySelector('button[type="submit"]');
      const originalText = btn.innerHTML;
      
      // Get form values
      const name = document.getElementById('name').value || 'Not provided';
      const email = document.getElementById('email').value || 'Not provided';
      const phone = document.getElementById('phone').value || 'Not provided';
      
      // Get select element text, not just the value
      const serviceSelect = document.getElementById('service');
      const service = serviceSelect.options[serviceSelect.selectedIndex].text || 'Not specified';
      
      const message = document.getElementById('message').value || 'No brief provided';

      // WhatsApp logic 
      const designerPhone = "919525933783";
      
      const whatsappMsg = `*New Project Inquiry*\n\n` +
                          `*Name:* ${name}\n` +
                          `*Email:* ${email}\n` +
                          `*Phone:* ${phone}\n` +
                          `*Service:* ${service}\n\n` +
                          `*Project Brief:*\n${message}`;
                          
      const whatsappUrl = `https://wa.me/${designerPhone}?text=${encodeURIComponent(whatsappMsg)}`;

      // Show success state on button
      btn.innerHTML = 'Messaging...';
      btn.style.background = '#4CAF50';
      btn.style.color = '#fff';
      btn.style.borderColor = '#4CAF50';
      
      setTimeout(() => {
        // Open WhatsApp in new tab
        window.open(whatsappUrl, '_blank');
        
        // Reset button
        btn.innerHTML = 'Message Sent ✓';
        
        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.style = '';
          contactForm.reset();
        }, 3000);
      }, 600);
    });
  }

});
