// ============================================================
// ABHISHEK PAWAR — Dynamic Portfolio Renderer
// All content is loaded from data.json — edit that file to update!
// ============================================================

let portfolioData = null;

// SVG icon templates (no emoji, pure SVG)
const SVG = {
  location: '<svg viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z"/></svg>',
  calendar: '<svg viewBox="0 0 24 24"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19a2 2 0 002 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM9 10H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z"/></svg>',
  company: '<svg viewBox="0 0 24 24"><path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/></svg>',
  linkedin: '<svg viewBox="0 0 24 24"><path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14m-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 011.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 001.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 00-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>',
  github: '<svg viewBox="0 0 24 24"><path d="M12 2A10 10 0 002 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"/></svg>',
  instagram: '<svg viewBox="0 0 24 24"><path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 01-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 017.8 2m-.2 2A3.6 3.6 0 004 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 003.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 011.25 1.25A1.25 1.25 0 0117.25 8 1.25 1.25 0 0116 6.75a1.25 1.25 0 011.25-1.25M12 7a5 5 0 015 5 5 5 0 01-5 5 5 5 0 01-5-5 5 5 0 015-5m0 2a3 3 0 00-3 3 3 3 0 003 3 3 3 0 003-3 3 3 0 00-3-3z"/></svg>',
  email: '<svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>',
  phone: '<svg viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>',
  address: '<svg viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z"/></svg>',
  download: '<svg viewBox="0 0 24 24"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>',
  briefcase: '<svg viewBox="0 0 24 24"><path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/></svg>',
  award: '<svg viewBox="0 0 24 24"><path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z"/></svg>',
  users: '<svg viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>',
  code: '<svg viewBox="0 0 24 24"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>',
  externalLink: '<svg viewBox="0 0 24 24"><path d="M19 19H5V5h7V3H5a2 2 0 00-2 2v14a2 2 0 002 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/></svg>',
  graduation: '<svg viewBox="0 0 24 24"><path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/></svg>',
  cert: '<svg viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>',
  heart: '<svg viewBox="0 0 24 24" style="width:14px;height:14px;fill:#e74c3c;display:inline;vertical-align:middle;"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>'
};

// ============================================================
// FETCH & INIT
// ============================================================
async function initPortfolio() {
  try {
    const response = await fetch('data.json');
    if (!response.ok) throw new Error('Failed to load data.json');
    portfolioData = await response.json();
    renderAll();
  } catch (err) {
    console.error('Portfolio data load error:', err);
  }
}

// ============================================================
// RENDER ALL SECTIONS
// ============================================================
function renderAll() {
  if (!portfolioData) return;
  const p = portfolioData;

  renderHero(p);
  renderAbout(p);
  renderTechnologies(p);
  renderResume(p);
  renderProjects(p);
  renderStats(p);
  renderContact(p);
  renderFooter(p);

  // Init interactions after rendering
  initTypingAnimation(p.profile.typingTexts);
  initProjectFilters();
  reInitAnimations();
}

// ============================================================
// HERO SECTION
// ============================================================
function renderHero(p) {
  // Name
  const nameEl = document.querySelector('[data-portfolio="hero-name"]');
  if (nameEl) nameEl.textContent = p.profile.name;

  // Description
  const descEl = document.querySelector('[data-portfolio="hero-description"]');
  if (descEl) descEl.textContent = p.profile.heroDescription || '';

  // Image
  const imgEl = document.querySelector('[data-portfolio="hero-image"]');
  if (imgEl) imgEl.src = p.profile.heroImage;

  // Buttons
  const btnRow = document.getElementById('portfolio-hero-buttons');
  if (btnRow) {
    btnRow.innerHTML = `
      <a href="${p.profile.linkedin}" target="_blank" rel="noopener noreferrer" class="btn-gradient">
        ${SVG.linkedin} LinkedIn
      </a>
      <a href="${p.profile.github}" target="_blank" rel="noopener noreferrer" class="btn-outline">
        ${SVG.github} GitHub
      </a>
    `;
  }
}

// ============================================================
// ABOUT SECTION
// ============================================================
function renderAbout(p) {
  // LEFT: Profile Card
  const leftEl = document.getElementById('portfolio-about-card');
  if (leftEl) {
    leftEl.innerHTML = `
      <img src="${p.profile.aboutImage}" alt="${p.profile.name}" class="about-img-circle">
      <div class="about-profile-name">${p.profile.name}</div>
      <div class="about-profile-title">${p.profile.title}</div>
      <div class="about-profile-location">
        ${SVG.location} ${p.profile.location}
      </div>
      <img src="images/skills-chart.png" alt="Skills Chart" class="about-skills-chart">
    `;
  }

  // RIGHT: Bio + Info + Badge + Buttons
  const rightEl = document.getElementById('portfolio-about-right');
  if (rightEl) {
    const infoHTML = p.profile.aboutInfo ? p.profile.aboutInfo.map(info => `
      <div class="about-info-item">
        <span class="info-label">${info.label}</span>
        <span class="info-value">${info.value}</span>
      </div>
    `).join('') : '';

    rightEl.innerHTML = `
      <h3>About Me</h3>
      <p class="about-bio">${p.profile.bio}</p>
      <div class="about-info-grid">
        ${infoHTML}
      </div>
      <div class="about-badge-row">
        <div class="projects-badge">${p.profile.projectsCount}+</div>
        <div class="projects-badge-label">
          <strong>Projects Completed</strong>
          ${p.profile.aboutSubtitle || 'Data Analytics & ML Projects'}
        </div>
      </div>
      <div class="about-buttons">
        <a href="${p.profile.linkedin}" target="_blank" rel="noopener noreferrer" class="btn-gradient">
          ${SVG.linkedin} LinkedIn
        </a>
        <a href="${p.profile.github}" target="_blank" rel="noopener noreferrer" class="btn-outline">
          ${SVG.github} GitHub
        </a>
      </div>
    `;
  }
}

// ============================================================
// TECHNOLOGIES SECTION
// ============================================================
function renderTechnologies(p) {
  const techEl = document.getElementById('portfolio-technologies');
  if (!techEl || !p.technologies) return;

  techEl.innerHTML = p.technologies.map(tech => {
    const letter = tech.name.charAt(0).toUpperCase();
    return `
      <div class="tech-card">
        <div class="tech-circle" style="background:${tech.color};">${letter}</div>
        <span class="tech-name">${tech.name}</span>
      </div>
    `;
  }).join('');
}

// ============================================================
// RESUME SECTION
// ============================================================
function renderResume(p) {
  // Resume buttons
  const btnRow = document.getElementById('portfolio-resume-buttons');
  if (btnRow) {
    btnRow.innerHTML = `
      <a href="${p.profile.resumeLink}" target="_blank" rel="noopener noreferrer" class="btn-gradient">
        ${SVG.externalLink} View Resume
      </a>
      <a href="${p.profile.resumeLink}" target="_blank" rel="noopener noreferrer" class="btn-outline" download>
        ${SVG.download} Download CV
      </a>
    `;
  }

  // Experience
  const expEl = document.getElementById('portfolio-experience');
  if (expEl && p.experience) {
    expEl.innerHTML = p.experience.map(exp => `
      <div class="experience-card fade-in-element">
        <div class="experience-header">
          <div class="experience-role">${exp.role}</div>
          <div class="experience-company-badge">
            ${SVG.company} @ ${exp.company}
          </div>
        </div>
        <div class="experience-meta">
          <span>${SVG.calendar} ${exp.date}</span>
          ${exp.location ? `<span>${SVG.location} ${exp.location}</span>` : ''}
        </div>
        <div class="experience-tags">
          ${exp.tags ? exp.tags.map(tag => `<span class="experience-tag">${tag}</span>`).join('') : ''}
        </div>
        <ul class="experience-description">
          ${exp.description.map(item => `<li>${item}</li>`).join('')}
        </ul>
      </div>
    `).join('');
  }

  // Certifications
  const certEl = document.getElementById('portfolio-certifications');
  if (certEl && p.certifications) {
    certEl.innerHTML = p.certifications.map(cert => `
      <a href="${cert.link}" target="_blank" rel="noopener noreferrer" class="cert-card fade-in-element">
        <div class="cert-icon">
          ${SVG.cert}
        </div>
        <div class="cert-title">${cert.name}</div>
        <div class="cert-issuer">${cert.issuer}</div>
        <div class="cert-date">${cert.date}</div>
      </a>
    `).join('');
  }

  // Education
  const eduEl = document.getElementById('portfolio-education');
  if (eduEl && p.education) {
    eduEl.innerHTML = p.education.map(edu => `
      <div class="education-card fade-in-element">
        <div class="education-header">
          <div class="education-icon">
            ${SVG.graduation}
          </div>
          <div>
            <div class="education-period">${edu.date}</div>
            <div class="education-degree">${edu.degree}</div>
            <div class="education-institution">${edu.institution}</div>
            ${edu.detail ? `<div class="education-detail">${edu.detail}</div>` : ''}
          </div>
        </div>
      </div>
    `).join('');
  }
}

// ============================================================
// PROJECTS SECTION
// ============================================================
function renderProjects(p) {
  // Filter buttons
  const filtersEl = document.getElementById('portfolio-project-filters');
  if (filtersEl) {
    const categories = [
      { key: 'all', label: 'All' },
      { key: 'analytics', label: 'Analytics' },
      { key: 'ml', label: 'Machine Learning' },
      { key: 'web', label: 'Web Dev' }
    ];
    filtersEl.innerHTML = categories.map(cat => `
      <button class="project-filter-btn${cat.key === 'all' ? ' active' : ''}" data-filter="${cat.key}">
        ${cat.label}
      </button>
    `).join('');
  }

  // Project cards
  renderProjectCards('all');
}

function renderProjectCards(filter) {
  const projEl = document.getElementById('portfolio-projects');
  if (!projEl || !portfolioData) return;

  const projects = filter === 'all'
    ? portfolioData.projects
    : portfolioData.projects.filter(p => p.category === filter);

  const categoryLabels = {
    analytics: 'Analytics',
    ml: 'ML',
    web: 'Web'
  };

  projEl.innerHTML = projects.map(proj => `
    <div class="project-card fade-in-element">
      <div class="project-image-wrapper">
        <img src="${proj.image}" alt="${proj.title}" loading="lazy">
        <div class="project-image-overlay"></div>
        <div class="project-category-badge">${categoryLabels[proj.category] || proj.category}</div>
      </div>
      <div class="project-content">
        <div class="project-title">${proj.title}</div>
        <div class="project-description">${proj.description}</div>
        <div class="project-tags">
          ${proj.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
        </div>
        <div class="project-links">
          <a href="${proj.github}" target="_blank" rel="noopener noreferrer" class="project-link">
            ${SVG.github} View Code
          </a>
          <a href="${proj.link}" target="_blank" rel="noopener noreferrer" class="project-link">
            ${SVG.externalLink} Live Demo
          </a>
        </div>
      </div>
    </div>
  `).join('');

  // Re-init animations for new elements
  reInitAnimations();
}

// ============================================================
// STATS SECTION
// ============================================================
function renderStats(p) {
  const statsEl = document.getElementById('portfolio-stats');
  if (!statsEl || !p.stats) return;

  const iconMap = {
    briefcase: SVG.briefcase,
    award: SVG.award,
    users: SVG.users,
    code: SVG.code
  };

  statsEl.innerHTML = p.stats.map(stat => `
    <div class="stat-card fade-in-element">
      <div class="stat-icon">
        ${iconMap[stat.icon] || SVG.briefcase}
      </div>
      <div class="stat-number" data-target="${stat.value}">0</div>
      <div class="stat-label">${stat.label}</div>
    </div>
  `).join('');
}

// ============================================================
// CONTACT SECTION
// ============================================================
function renderContact(p) {
  // Contact cards
  const contactEl = document.getElementById('portfolio-contact');
  if (contactEl) {
    contactEl.innerHTML = `
      <div class="contact-card">
        <div class="contact-card-icon">${SVG.address}</div>
        <h4>Address</h4>
        <p>${p.profile.location}</p>
      </div>
      <div class="contact-card">
        <div class="contact-card-icon">${SVG.phone}</div>
        <h4>Phone</h4>
        <p><a href="tel:${p.profile.phone.replace(/\s/g, '')}">${p.profile.phone}</a></p>
      </div>
      <div class="contact-card">
        <div class="contact-card-icon">${SVG.email}</div>
        <h4>Email</h4>
        <p><a href="mailto:${p.profile.email}">${p.profile.email}</a></p>
      </div>
      <div class="contact-card">
        <div class="contact-card-icon">${SVG.download}</div>
        <h4>Resume</h4>
        <p><a href="${p.profile.resumeLink}" target="_blank" rel="noopener noreferrer">Download Resume</a></p>
      </div>
    `;
  }

  // Question
  const questionEl = document.getElementById('portfolio-contact-question');
  if (questionEl) {
    questionEl.innerHTML = `
      <h3>Have a <span>Question?</span>
        <a href="${p.contactForm}" target="_blank" rel="noopener noreferrer" class="btn-gradient" style="margin-left:12px;">
          Click Here
        </a>
      </h3>
    `;
  }

  // Social links
  const socialEl = document.getElementById('portfolio-social-links');
  if (socialEl && p.socialLinks) {
    const iconMap = {
      LinkedIn: SVG.linkedin,
      GitHub: SVG.github,
      Instagram: SVG.instagram
    };
    socialEl.innerHTML = p.socialLinks.map(link => `
      <a href="${link.url}" target="_blank" rel="noopener noreferrer" class="social-link" title="${link.platform}">
        ${iconMap[link.platform] || ''}
      </a>
    `).join('');
  }
}

// ============================================================
// FOOTER
// ============================================================
function renderFooter(p) {
  const footerEl = document.getElementById('portfolio-footer');
  if (footerEl) {
    const year = new Date().getFullYear();
    footerEl.innerHTML = `Copyright &copy; ${year} All rights reserved | Made with ${SVG.heart} by <a href="${p.profile.github}" target="_blank" rel="noopener noreferrer">Abhishek</a>`;
  }
}

// ============================================================
// TYPING ANIMATION (uses Typed.js)
// ============================================================
function initTypingAnimation(texts) {
  const el = document.getElementById('typing-animation');
  if (!el || !texts || !texts.length) return;

  // Clear any existing content
  el.textContent = '';

  if (typeof Typed !== 'undefined') {
    new Typed('#typing-animation', {
      strings: texts,
      typeSpeed: 60,
      backSpeed: 40,
      backDelay: 1500,
      loop: true,
      showCursor: true,
      cursorChar: '|'
    });
  }
}

// ============================================================
// PROJECT FILTER BUTTONS
// ============================================================
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.project-filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      renderProjectCards(this.dataset.filter);
    });
  });
}

// ============================================================
// ANIMATED COUNTERS
// ============================================================
function initCounters() {
  const counterEls = document.querySelectorAll('.stat-number[data-target]');
  if (!counterEls.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target, 10);
        animateCounter(el, target);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counterEls.forEach(el => observer.observe(el));
}

function animateCounter(el, target) {
  let current = 0;
  const increment = target / 60;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      el.textContent = target + '+';
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(current) + '+';
    }
  }, 20);
}

// ============================================================
// DARK MODE TOGGLE
// ============================================================
function initDarkMode() {
  const toggle = document.getElementById('dark-mode-toggle');
  if (!toggle) return;

  const sunIcon = document.getElementById('toggle-icon-sun');
  const moonIcon = document.getElementById('toggle-icon-moon');

  const saved = localStorage.getItem('portfolio-light-mode');
  if (saved === 'true') {
    document.body.classList.add('light-mode');
    if (sunIcon) sunIcon.style.display = 'block';
    if (moonIcon) moonIcon.style.display = 'none';
  }

  toggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    localStorage.setItem('portfolio-light-mode', isLight);
    if (sunIcon) sunIcon.style.display = isLight ? 'block' : 'none';
    if (moonIcon) moonIcon.style.display = isLight ? 'none' : 'block';
  });
}

// ============================================================
// SCROLL TO TOP
// ============================================================
function initScrollToTop() {
  const btn = document.getElementById('scroll-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ============================================================
// SMOOTH SCROLL FOR NAV LINKS
// ============================================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Close mobile nav if open
        const navLinks = document.getElementById('nav-links');
        const navToggle = document.getElementById('nav-toggle');
        if (navLinks) navLinks.classList.remove('open');
        if (navToggle) navToggle.classList.remove('open');
      }
    });
  });
}

// ============================================================
// ACTIVE NAV LINK ON SCROLL
// ============================================================
function initActiveNavOnScroll() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
}

// ============================================================
// NAVBAR SHRINK ON SCROLL
// ============================================================
function initNavbarShrink() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });
}

// ============================================================
// MOBILE NAV TOGGLE
// ============================================================
function initMobileNav() {
  const toggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');
  if (!toggle || !navLinks) return;

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('open');
    navLinks.classList.toggle('open');
  });
}

// ============================================================
// INTERSECTION OBSERVER FADE-IN ANIMATIONS
// ============================================================
function reInitAnimations() {
  const elements = document.querySelectorAll('.fade-in-element:not(.visible)');
  if (!elements.length) return;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    elements.forEach(el => observer.observe(el));
  } else {
    // Fallback: show everything immediately
    elements.forEach(el => el.classList.add('visible'));
  }

  // Also init counters if stat cards exist
  initCounters();
}

// ============================================================
// INITIALIZE ON DOM READY
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  initPortfolio();
  initDarkMode();
  initScrollToTop();
  initSmoothScroll();
  initActiveNavOnScroll();
  initNavbarShrink();
  initMobileNav();
});
