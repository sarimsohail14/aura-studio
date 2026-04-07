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
      const location = document.getElementById('location').value || 'Not provided';
      
      // Get select element text, not just the value
      const serviceSelect = document.getElementById('service');
      const service = serviceSelect.options[serviceSelect.selectedIndex].text || 'Not specified';
      
      const message = document.getElementById('message').value || 'No brief provided';

      // Get hidden fields
      const contractor_name = document.getElementById('contractor_name')?.value || 'pradeeb mishra';
      const contractor_whatsapp = document.getElementById('contractor_whatsapp')?.value || '+919525933783';
      const business_name = document.getElementById('business_name')?.value || 'Aura Studio';

      // CHANGED: Explicitly mapped form IDs to the expected payload keys specified for n8n.
      // E.g. 'name' field goes to 'lead_name', 'email' field to 'lead_email', etc.
      const payload = {
        contractor_name: contractor_name,
        contractor_whatsapp: contractor_whatsapp,
        business_name: business_name,
        lead_name: name,         // from document.getElementById('name')
        lead_phone: phone,       // from document.getElementById('phone')
        lead_email: email,       // from document.getElementById('email')
        service: service,        // from select dropdown text
        location: location,      // from document.getElementById('location')
        message: message         // from document.getElementById('message')
      };

      // CHANGED: Added temporary console logs for debugging n8n payload mapping
      console.log('--- DEBUGGING N8N SUBMISSION PAYLOAD ---');
      console.table(payload);
      console.log('If fields are blank in n8n, verify that the webhook node is accepting JSON body payload rather than Form-Data.');

      // Show loading state
      btn.innerHTML = 'Sending...';
      btn.style.opacity = '0.7';
      btn.disabled = true;

      fetch('https://sarimsohail14.app.n8n.cloud/webhook/d76e693b-e3de-4c9a-8edd-57d6bc79edc0', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        
        // Success state
        btn.innerHTML = 'Message Sent ✓';
        btn.style.background = '#4CAF50';
        btn.style.color = '#fff';
        btn.style.borderColor = '#4CAF50';
        btn.style.opacity = '1';
        
        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.style = '';
          btn.disabled = false;
          contactForm.reset();
        }, 3000);
      })
      .catch(error => {
        console.error('Error submitting form:', error);
        
        // Error state
        btn.innerHTML = 'Error. Try Again.';
        btn.style.background = '#f44336';
        btn.style.color = '#fff';
        btn.style.borderColor = '#f44336';
        btn.style.opacity = '1';
        
        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.style = '';
          btn.disabled = false;
        }, 3000);
      });
    });
  }

  // ==========================================
  // CHAT WIDGET
  // ==========================================
  const chatToggle = document.getElementById('chat-toggle');
  const chatClose = document.getElementById('chat-close');
  const chatWindow = document.getElementById('chat-window');
  const liveChatForm = document.getElementById('live-chat-form');

  if (chatToggle && chatClose && chatWindow) {
    chatToggle.addEventListener('click', () => {
      chatWindow.classList.add('active');
    });

    chatClose.addEventListener('click', () => {
      chatWindow.classList.remove('active');
    });
  }

  if (liveChatForm) {
    liveChatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const btn = liveChatForm.querySelector('button[type="submit"]');
      const originalText = btn.innerHTML;
      
      const payload = {
        contractor_name: document.getElementById('contractor_name')?.value || "pradeeb mishra",
        contractor_whatsapp: document.getElementById('contractor_whatsapp')?.value || "+919525933783",
        business_name: document.getElementById('business_name')?.value || "Aura Studio",
        lead_name: document.getElementById('chat-name').value,
        lead_phone: document.getElementById('chat-phone').value,
        lead_email: "Not provided via Chat",
        service: "Live Chat Inquiry",
        location: "Not provided via Chat",
        message: document.getElementById('chat-message').value
      };

      btn.innerHTML = 'Sending...';
      btn.style.opacity = '0.7';
      btn.disabled = true;

      fetch('https://sarimsohail14.app.n8n.cloud/webhook/d76e693b-e3de-4c9a-8edd-57d6bc79edc0', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        
        btn.innerHTML = 'Sent ✓';
        btn.style.background = '#4CAF50';
        btn.style.color = '#fff';
        btn.style.borderColor = '#4CAF50';
        btn.style.opacity = '1';
        
        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.style = '';
          btn.disabled = false;
          liveChatForm.reset();
          chatWindow.classList.remove('active');
        }, 3000);
      })
      .catch(error => {
        console.error('Error submitting chat form:', error);
        
        btn.innerHTML = 'Error';
        btn.style.background = '#f44336';
        btn.style.color = '#fff';
        btn.style.borderColor = '#f44336';
        btn.style.opacity = '1';
        
        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.style = '';
          btn.disabled = false;
        }, 3000);
      });
    });
  }

});
