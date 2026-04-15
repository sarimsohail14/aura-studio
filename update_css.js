const fs = require('fs');

const css = `
/* =============================================
   PROJECTS MODAL & FILTERING
   ============================================= */
.project-item { transition: opacity 0.4s ease, transform 0.4s ease; }
.project-item.hidden { display: none !important; }
.project-item.fade-out { opacity: 0; transform: scale(0.95); pointer-events: none; }
.bento-card { cursor: pointer; }

/* Modal */
.project-modal { position: fixed; inset: 0; z-index: 99999; display: flex; align-items: center; justify-content: center; opacity: 0; pointer-events: none; transition: opacity 0.4s var(--ease); }
.project-modal.active { opacity: 1; pointer-events: auto; }
.project-modal-bg { position: absolute; inset: 0; background: rgba(10, 8, 6, 0.85); backdrop-filter: blur(8px); }
.project-modal-content { position: relative; background: var(--color-bg); width: 90%; max-width: 1200px; height: 85vh; border-radius: var(--radius-lg); overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.5); transform: translateY(30px) scale(0.98); transition: transform 0.4s var(--ease); z-index: 100000; display: flex; flex-direction: column; }
.project-modal.active .project-modal-content { transform: translateY(0) scale(1); }
.project-modal-close { position: absolute; top: 1.5rem; right: 1.5rem; background: var(--color-dark); color: var(--color-white); border: none; width: 44px; height: 44px; border-radius: 50%; font-size: 1.5rem; display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 2; transition: background 0.3s ease, transform 0.3s ease; }
.project-modal-close:hover { background: var(--color-gold); transform: scale(1.1); }
.project-modal-split { display: flex; flex-wrap: wrap; width: 100%; height: 100%; }
.project-modal-gallery { flex: 1 1 50%; position: relative; height: 100%; background: var(--color-dark); }
.project-modal-gallery img { width: 100%; height: 100%; object-fit: cover; transition: opacity 0.3s ease; }
.project-modal-thumbs { position: absolute; bottom: 1.5rem; left: 50%; transform: translateX(-50%); display: flex; gap: 0.5rem; padding: 0.5rem; background: rgba(0,0,0,0.4); backdrop-filter: blur(10px); border-radius: var(--radius-pill); }
.modal-thumb { width: 60px; height: 60px; border-radius: 50%; overflow: hidden; border: 2px solid transparent; cursor: pointer; transition: all 0.3s ease; }
.modal-thumb img { width: 100%; height: 100%; object-fit: cover; }
.modal-thumb.active { border-color: var(--color-gold); transform: scale(1.1); }
.modal-thumb:hover { border-color: var(--color-white); }
.project-modal-info { flex: 1 1 35%; padding: clamp(2rem, 5vw, 4rem); overflow-y: auto; display: flex; flex-direction: column; justify-content: center; }
.project-meta { margin-top: 1.5rem; font-size: 0.95rem; color: var(--color-mid); }
.project-meta strong { color: var(--color-dark); }
@media (max-width: 900px) { .project-modal-split { flex-direction: column; } .project-modal-gallery { height: 40%; flex: 0 0 40%; } .project-modal-info { height: 60%; justify-content: flex-start; } }
`;

fs.appendFileSync('style.css', css);
console.log('CSS appended to style.css!');
