const fs = require('fs');
const path = require('path');

const indexHtml = fs.readFileSync('index.html', 'utf8');

// Update standard links in navbar
let updatedHtml = indexHtml.replace(/href="#home"/g, 'href="index.html"');
updatedHtml = updatedHtml.replace(/href="#projects"/g, 'href="projects.html"');
updatedHtml = updatedHtml.replace(/href="#services"/g, 'href="services.html"');
updatedHtml = updatedHtml.replace(/href="#testimonials"/g, 'href="about.html"');
updatedHtml = updatedHtml.replace(/href="#contact"/g, 'href="contact.html"');

// Extract Navbar (lines from <nav> to <!-- Mobile Menu --> end)
const navStart = updatedHtml.indexOf('<nav class="navbar" id="navbar">');
const navEnd = updatedHtml.indexOf('<main>') - 1;
const navContent = updatedHtml.substring(navStart, navEnd);

// Extract Header config
const headStartTag = '<head>';
const headEndTag = '</head>';
const headContent = updatedHtml.substring(updatedHtml.indexOf(headStartTag), updatedHtml.indexOf(headEndTag) + headEndTag.length);

// Extract Footer & Chat
const footerStart = updatedHtml.indexOf('<footer class="footer">');
const bodyEnd = updatedHtml.indexOf('</body>');
const footerContent = updatedHtml.substring(footerStart, bodyEnd);


function buildPage(filename, title, content) {
    const html = `<!DOCTYPE html>
<html lang="en">
${headContent.replace('<title>Aura Studio | Luxury Interior Design & Architecture</title>', `<title>${title} | Aura Studio</title>`)}
<body>
  ${navContent}
  
  <main>
    ${content}
  </main>

  ${footerContent}
</body>
</html>`;
    fs.writeFileSync(filename, html);
    console.log(`Created ${filename}`);
}

const projectsContent = `
    <section class="hero page-hero">
      <div class="hero-bg">
        <img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2600&auto=format&fit=crop" alt="Projects Header">
      </div>
      <div class="page-hero-overlay"></div>
      <div class="hero-content container" style="z-index: 2;">
        <h1 class="hero-title reveal">Our Portfolio.</h1>
        <p class="hero-subtitle reveal reveal-delay-1">A curated collection of minimalist, timeless designs.</p>
      </div>
    </section>

    <section class="page-content-wrapper">
      <div class="container">
        <div class="project-filters reveal">
          <button class="filter-btn active">All</button>
          <button class="filter-btn">Residential</button>
          <button class="filter-btn">Commercial</button>
          <button class="filter-btn">Renovation</button>
        </div>

        <div class="bento-grid">
          <div class="bento-card col-8 reveal">
            <img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2000&auto=format&fit=crop" alt="The Minimalist Residence">
            <div class="bento-card-overlay"></div>
            <div class="bento-card-body">
              <div class="bento-card-meta">
                <div class="bento-card-cat">Interior Design</div>
                <div class="bento-card-title">The Minimalist Residence</div>
              </div>
            </div>
          </div>

          <div class="bento-card col-4 tall reveal reveal-delay-1">
            <img src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1400&auto=format&fit=crop" alt="Lakeside Villa">
            <div class="bento-card-overlay"></div>
            <div class="bento-card-body">
              <div class="bento-card-meta">
                <div class="bento-card-cat">Architecture</div>
                <div class="bento-card-title">Lakeside Villa</div>
              </div>
            </div>
          </div>

          <div class="bento-card col-4 reveal">
            <img src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1400&auto=format&fit=crop" alt="Urban Retreat">
            <div class="bento-card-overlay"></div>
            <div class="bento-card-body">
              <div class="bento-card-meta">
                <div class="bento-card-cat">Residential</div>
                <div class="bento-card-title">Urban Retreat</div>
              </div>
            </div>
          </div>

          <div class="bento-card col-4 reveal reveal-delay-1">
            <img src="https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1400&auto=format&fit=crop" alt="The Grand Penthouse">
            <div class="bento-card-overlay"></div>
            <div class="bento-card-body">
              <div class="bento-card-meta">
                <div class="bento-card-cat">Renovation</div>
                <div class="bento-card-title">The Grand Penthouse</div>
              </div>
            </div>
          </div>

          <div class="bento-card col-8 reveal reveal-delay-2">
            <img src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1400&auto=format&fit=crop" alt="Contemporary Loft">
            <div class="bento-card-overlay"></div>
            <div class="bento-card-body">
              <div class="bento-card-meta">
                <div class="bento-card-cat">Interior Design</div>
                <div class="bento-card-title">Contemporary Loft</div>
              </div>
            </div>
          </div>

          <div class="bento-card col-4 tall reveal">
            <img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1400&auto=format&fit=crop" alt="Artisan Studio">
            <div class="bento-card-overlay"></div>
            <div class="bento-card-body">
              <div class="bento-card-meta">
                <div class="bento-card-cat">Commercial</div>
                <div class="bento-card-title">Artisan Studio</div>
              </div>
            </div>
          </div>
          
          <div class="bento-card col-8 reveal reveal-delay-1">
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
`;

const servicesContent = `
    <section class="hero page-hero">
      <div class="hero-bg">
        <img src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2600&auto=format&fit=crop" alt="Services Header">
      </div>
      <div class="page-hero-overlay"></div>
      <div class="hero-content container" style="z-index: 2;">
        <h1 class="hero-title reveal">Our Services.</h1>
        <p class="hero-subtitle reveal reveal-delay-1">Comprehensive design solutions tailored to your unique lifestyle.</p>
      </div>
    </section>

    <section class="page-content-wrapper">
      <div class="container">
        
        <div class="about-grid reveal" style="margin-bottom: 6rem;">
          <div class="about-content">
            <span class="section-label">01. Interior Design</span>
            <h2 class="section-heading">Curated environments.</h2>
            <span class="gold-line"></span>
            <p class="section-body">
              Our interior design service focuses on creating spaces that reflect your personality while ensuring optimal functionality. We source premium materials, curate artwork, and select furnishings that harmonize with the architecture of your home or commercial space. 
            </p>
            <p class="section-body" style="margin-top: 1rem;">
              From conceptual mood boards to final installation, our team manages every detail.
            </p>
          </div>
          <div class="about-image">
             <img src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1000&auto=format&fit=crop" alt="Interior Design">
          </div>
        </div>

        <div class="about-grid reveal" style="margin-bottom: 6rem; direction: rtl;">
          <div class="about-content" style="direction: ltr;">
            <span class="section-label">02. Interior Architecture</span>
            <h2 class="section-heading">Spatial reimagination.</h2>
            <span class="gold-line"></span>
            <p class="section-body">
              We go beyond surface-level decoration to rethink the fundamental flow and structure of your space. Our architectural interventions include spatial planning, custom millwork, lighting schematics, and complete layout transformations.
            </p>
            <p class="section-body" style="margin-top: 1rem;">
              We work closely with contractors to ensure seamless execution.
            </p>
          </div>
          <div class="about-image" style="direction: ltr;">
             <img src="https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1000&auto=format&fit=crop" alt="Interior Architecture">
          </div>
        </div>

        <div class="about-grid reveal" style="margin-bottom: 4rem;">
          <div class="about-content">
            <span class="section-label">03. Custom Furniture</span>
            <h2 class="section-heading">Bespoke craftsmanship.</h2>
            <span class="gold-line"></span>
            <p class="section-body">
              When the perfect piece doesn't exist, we create it. Our in-house designers conceptualize unique, handcrafted furniture tailored explicitly to the dimensions and aesthetic requirements of your project.
            </p>
          </div>
          <div class="about-image">
             <img src="https://images.unsplash.com/photo-1599696848652-f0ff23bc911f?q=80&w=1000&auto=format&fit=crop" alt="Custom Furniture">
          </div>
        </div>

      </div>
    </section>
`;

const aboutContent = `
    <section class="hero page-hero">
      <div class="hero-bg">
        <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2600&auto=format&fit=crop" alt="About Header">
      </div>
      <div class="page-hero-overlay"></div>
      <div class="hero-content container" style="z-index: 2;">
        <h1 class="hero-title reveal">Our Story.</h1>
        <p class="hero-subtitle reveal reveal-delay-1">Redefining luxury through minimalist principles since 2012.</p>
      </div>
    </section>

    <section class="page-content-wrapper">
      <div class="container">
        <div class="about-grid reveal" style="margin-bottom: 6rem;">
          <div class="about-image">
             <img src="https://images.unsplash.com/photo-1497215848143-22872bc11abe?q=80&w=1000&auto=format&fit=crop" alt="Studio Setup">
          </div>
          <div class="about-content">
            <span class="section-label">Our Philosophy</span>
            <h2 class="section-heading">Timeless.<br>Uncompromising.</h2>
            <span class="gold-line"></span>
            <p class="section-body">
              Aura Studio was founded on the belief that meaningful design shapes how we experience life. We specialize in stripping away the unnecessary to reveal the essential beauty of raw materials, light, and proportion.
            </p>
            <p class="section-body" style="margin-top:1rem;">
              With over 12 years of industry excellence and 150+ completed residential and commercial projects worldwide, we remain dedicated to our core ethos: design without compromise.
            </p>
          </div>
        </div>

        <div class="reveal" style="text-align:center; margin-bottom: 3rem;">
          <span class="section-label">Leadership</span>
          <h2 class="section-heading">Meet the Team</h2>
        </div>
        
        <div class="team-grid reveal reveal-delay-1">
          <div class="team-member">
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop" alt="Principal Architect">
            <h3>Alexander Reed</h3>
            <p>Principal Architect</p>
          </div>
          <div class="team-member">
            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600&auto=format&fit=crop" alt="Lead Designer">
            <h3>Sophia Laurent</h3>
            <p>Lead Interior Designer</p>
          </div>
          <div class="team-member">
            <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop" alt="Project Manager">
            <h3>David Chen</h3>
            <p>Head of Projects</p>
          </div>
        </div>
      </div>
    </section>
`;

const contactContent = `
    <section class="hero page-hero">
      <div class="hero-bg">
        <img src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2600&auto=format&fit=crop" alt="Contact Header">
      </div>
      <div class="page-hero-overlay"></div>
      <div class="hero-content container" style="z-index: 2;">
        <h1 class="hero-title reveal">Let's Talk.</h1>
        <p class="hero-subtitle reveal reveal-delay-1">Start your journey toward a refined space.</p>
      </div>
    </section>

    <!-- Extract original contact section content exactly to preserve form functionality -->
    <section id="contact" class="contact-section">
      <div class="container">
        ` + updatedHtml.substring(updatedHtml.indexOf('<div class="contact-layout">'), updatedHtml.indexOf('</section>', updatedHtml.indexOf('<div class="contact-layout">'))) + `
    </section>
`;

buildPage('projects.html', 'Projects', projectsContent);
buildPage('services.html', 'Services', servicesContent);
buildPage('about.html', 'About Us', aboutContent);
buildPage('contact.html', 'Contact', contactContent);

// And finally update the index.html file to replace the old anchor links everywhere
fs.writeFileSync('index.html', updatedHtml);
console.log('Updated index.html nav links');
