const fs = require('fs');
let js = fs.readFileSync('main.js', 'utf8');

const jsInject = `
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
`;

const lastIndex = js.lastIndexOf('});');
if (lastIndex !== -1) {
    js = js.substring(0, lastIndex) + jsInject + '\n});';
    fs.writeFileSync('main.js', js);
    console.log('Main.js updated!');
} else {
    console.log('Could not find closing block');
}
