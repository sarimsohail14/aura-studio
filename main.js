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


  // ==========================================
  // PROJECTS FILTER 
  // ==========================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectItems = document.querySelectorAll('.project-item');

  if (filterBtns.length > 0 && projectItems.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Toggle active class
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        projectItems.forEach(item => {
          if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
            item.classList.remove('hidden');
            setTimeout(() => {
              item.classList.remove('fade-out');
            }, 50);
          } else {
            item.classList.add('fade-out');
            setTimeout(() => {
              item.classList.add('hidden');
            }, 400); // Wait for transition
          }
        });
      });
    });
  }

  // ==========================================
  // PROJECTS MODAL 
  // ==========================================
  const modal = document.getElementById('project-modal');
  const modalClose = document.getElementById('project-modal-close');

  if (modal && projectItems.length > 0) {
    const modalMainImg = document.getElementById('project-modal-main-img');
    const modalThumbs = document.getElementById('project-modal-thumbs');
    const modalCat = document.getElementById('project-modal-cat');
    const modalTitle = document.getElementById('project-modal-title');
    const modalLocation = document.getElementById('project-modal-location');
    const modalDesc = document.getElementById('project-modal-desc');

    projectItems.forEach(item => {
      item.addEventListener('click', () => {
        const cat = item.querySelector('.bento-card-cat')?.innerText || '';
        const title = item.querySelector('.bento-card-title')?.innerText || '';
        const loc = item.getAttribute('data-location') || '';
        const desc = item.getAttribute('data-desc') || '';
        const photosStr = item.getAttribute('data-photos') || '';
        const photos = photosStr.split('|');

        if (modalCat) modalCat.innerText = cat;
        if (modalTitle) modalTitle.innerText = title;
        if (modalLocation) modalLocation.innerText = loc;
        if (modalDesc) modalDesc.innerText = desc;

        // Reset and populate gallery
        if (photos.length > 0 && photos[0] && modalMainImg && modalThumbs) {
          modalMainImg.src = photos[0];
          modalThumbs.innerHTML = '';
          photos.forEach((src, idx) => {
            const thumb = document.createElement('div');
            thumb.className = 'modal-thumb' + (idx === 0 ? ' active' : '');
            const img = document.createElement('img');
            img.src = src;
            thumb.appendChild(img);
            
            thumb.addEventListener('click', () => {
               modalMainImg.src = src;
               modalThumbs.querySelectorAll('.modal-thumb').forEach(t => t.classList.remove('active'));
               thumb.classList.add('active');
            });
            modalThumbs.appendChild(thumb);
          });
        }

        modal.classList.add('active');
      });
    });

    if (modalClose) {
      modalClose.addEventListener('click', () => {
        modal.classList.remove('active');
      });
    }

    // Close on background click
    modal.addEventListener('click', (e) => {
      if (e.target.classList.contains('project-modal-bg')) {
        modal.classList.remove('active');
      }
    });
  }

});