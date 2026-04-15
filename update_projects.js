const fs = require('fs');
let html = fs.readFileSync('projects.html', 'utf8');

const newSection = `    <section class="page-content-wrapper">
      <div class="container">
        <div class="project-filters reveal">
          <button class="filter-btn active" data-filter="all">All</button>
          <button class="filter-btn" data-filter="residential">Residential</button>
          <button class="filter-btn" data-filter="commercial">Commercial</button>
          <button class="filter-btn" data-filter="renovation">Renovation</button>
        </div>

        <div class="bento-grid" id="project-grid">
          <div class="bento-card col-8 reveal project-item" data-category="residential" data-location="London, UK" data-desc="A comprehensive minimalist interior overhaul designed to maximize natural light and highlight the raw architectural details. We focused on neutral tones and bespoke oak finishes." data-photos="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2000&auto=format&fit=crop|https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1400&auto=format&fit=crop">
            <img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2000&auto=format&fit=crop" alt="The Minimalist Residence">
            <div class="bento-card-overlay"></div>
            <div class="bento-card-body">
              <div class="bento-card-meta">
                <div class="bento-card-cat">Residential</div>
                <div class="bento-card-title">The Minimalist Residence</div>
              </div>
            </div>
          </div>

          <div class="bento-card col-4 tall reveal reveal-delay-1 project-item" data-category="commercial" data-location="Lake Como, Italy" data-desc="A boutique hotel lobby featuring striking architectural lines and custom glass partitions, seamlessly blending indoor and outdoor elements." data-photos="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1400&auto=format&fit=crop|https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1400&auto=format&fit=crop">
            <img src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1400&auto=format&fit=crop" alt="Lakeside Villa">
            <div class="bento-card-overlay"></div>
            <div class="bento-card-body">
              <div class="bento-card-meta">
                <div class="bento-card-cat">Commercial</div>
                <div class="bento-card-title">Lakeside Villa</div>
              </div>
            </div>
          </div>

          <div class="bento-card col-4 reveal project-item" data-category="residential" data-location="New York, NY" data-desc="A serene urban retreat providing an escape from the city's hustle. This project utilizes dark woods, indirect soft lighting, and Japanese-inspired minimalism." data-photos="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1400&auto=format&fit=crop|https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1400&auto=format&fit=crop">
            <img src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1400&auto=format&fit=crop" alt="Urban Retreat">
            <div class="bento-card-overlay"></div>
            <div class="bento-card-body">
              <div class="bento-card-meta">
                <div class="bento-card-cat">Residential</div>
                <div class="bento-card-title">Urban Retreat</div>
              </div>
            </div>
          </div>

          <div class="bento-card col-4 reveal reveal-delay-1 project-item" data-category="renovation" data-location="Paris, France" data-desc="A full structural renovation of a historic penthouse into a modern grand living space, preserving the original molding while introducing brutalist accents." data-photos="https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1400&auto=format&fit=crop|https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1400&auto=format&fit=crop">
            <img src="https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1400&auto=format&fit=crop" alt="The Grand Penthouse">
            <div class="bento-card-overlay"></div>
            <div class="bento-card-body">
              <div class="bento-card-meta">
                <div class="bento-card-cat">Renovation</div>
                <div class="bento-card-title">The Grand Penthouse</div>
              </div>
            </div>
          </div>

          <div class="bento-card col-8 reveal reveal-delay-2 project-item" data-category="renovation" data-location="Berlin, Germany" data-desc="Transforming an industrial warehouse into a contemporary loft. Features include exposed brick, raw concrete floors, and custom steel-framed partition walls." data-photos="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1400&auto=format&fit=crop|https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1400&auto=format&fit=crop">
            <img src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1400&auto=format&fit=crop" alt="Contemporary Loft">
            <div class="bento-card-overlay"></div>
            <div class="bento-card-body">
              <div class="bento-card-meta">
                <div class="bento-card-cat">Renovation</div>
                <div class="bento-card-title">Contemporary Loft</div>
              </div>
            </div>
          </div>

          <div class="bento-card col-4 tall reveal project-item" data-category="commercial" data-location="Kyoto, Japan" data-desc="A beautifully integrated artisan studio combining traditional woodwork with contemporary retail layout strategies to maximize both aesthetic and sales flow." data-photos="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1400&auto=format&fit=crop|https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop">
            <img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1400&auto=format&fit=crop" alt="Artisan Studio">
            <div class="bento-card-overlay"></div>
            <div class="bento-card-body">
              <div class="bento-card-meta">
                <div class="bento-card-cat">Commercial</div>
                <div class="bento-card-title">Artisan Studio</div>
              </div>
            </div>
          </div>
          
          <div class="bento-card col-8 reveal reveal-delay-1 project-item" data-category="commercial" data-location="Los Angeles, CA" data-desc="A full-service luxury spa environment. We implemented restorative, earthy tones and used natural stone heavily to evoke a strong sense of serenity." data-photos="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop|https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2000&auto=format&fit=crop">
            <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop" alt="Serenity Spa">
            <div class="bento-card-overlay"></div>
            <div class="bento-card-body">
              <div class="bento-card-meta">
                <div class="bento-card-cat">Commercial</div>
                <div class="bento-card-title">Serenity Spa</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- Project Modal -->
    <div id="project-modal" class="project-modal">
      <div class="project-modal-bg"></div>
      <div class="project-modal-content">
        <button id="project-modal-close" class="project-modal-close" aria-label="Close Project">&times;</button>
        <div class="project-modal-split">
          <div class="project-modal-gallery">
            <img id="project-modal-main-img" src="" alt="Project Photo">
            <div class="project-modal-thumbs" id="project-modal-thumbs">
              <!-- Thumbnails injected via JS -->
            </div>
          </div>
          <div class="project-modal-info">
            <span class="section-label" id="project-modal-cat">Category</span>
            <h2 class="section-heading" id="project-modal-title">Project Title</h2>
            <div class="project-meta">
              <strong>Location:</strong> <span id="project-modal-location">Location</span>
            </div>
            <span class="gold-line"></span>
            <p class="section-body" id="project-modal-desc">
              Description goes here...
            </p>
          </div>
        </div>
      </div>
    </div>`;

const startIdx = html.indexOf('<section class="page-content-wrapper">');
const endIdx = html.indexOf('</main>', startIdx);

html = html.substring(0, startIdx) + newSection + '\n  ' + html.substring(endIdx);
fs.writeFileSync('projects.html', html);
console.log('Updated HTML!');
