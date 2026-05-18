// ============================================================
// ABHISHEK PAWAR — Dynamic Portfolio Renderer
// All content is loaded from data.json — edit that file to update!
// ============================================================

let portfolioData = null;

// Fetch data.json and render everything
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

function renderAll() {
  if (!portfolioData) return;
  const p = portfolioData;

  // ---- Hero Section ----
  setText('[data-portfolio="hero-name"]', p.profile.name);
  setText('[data-portfolio="hero-subtitle"]', p.profile.subtitle);
  setAttr('[data-portfolio="hero-image"]', 'style', `background-image:url(${p.profile.heroImage});`);

  // ---- About Section ----
  setText('[data-portfolio="name"]', p.profile.name);
  setText('[data-portfolio="title"]', p.profile.title);
  setText('[data-portfolio="location"]', p.profile.location);
  setText('[data-portfolio="bio"]', p.profile.bio);
  setAttr('[data-portfolio="about-image"]', 'src', p.profile.aboutImage);
  setAttr('[data-portfolio="about-image"]', 'alt', p.profile.name);
  setAttr('[data-portfolio="projects-count"]', 'data-number', p.profile.projectsCount);
  setText('[data-portfolio="projects-count"]', p.profile.projectsCount);

  // About Info List
  const aboutInfoEl = document.getElementById('portfolio-about-info');
  if (aboutInfoEl && p.profile.aboutInfo) {
    aboutInfoEl.innerHTML = p.profile.aboutInfo.map(info =>
      `<li><span class="title-s">${info.label}: </span> <span>${info.value}</span></li>`
    ).join('');
  }

  // ---- Skills ---- (rendered as radar chart image for visual appeal)
  const skillsEl = document.getElementById('portfolio-skills');
  if (skillsEl && p.skills) {
    skillsEl.innerHTML = `
      <img src="images/skills-chart.png" alt="Abhishek Pawar Skills Overview — Radar Chart and Proficiency Levels"
           style="width:100%; border-radius:12px; border:1px solid rgba(255,255,255,0.05);">`;
  }

  // ---- Technologies ----
  const techEl = document.getElementById('portfolio-technologies');
  if (techEl && p.technologies) {
    techEl.innerHTML = p.technologies.map(tech => `
      <div class="tech-card">
        <img src="${tech.icon}" alt="${tech.name}" style="height: 50px; margin-bottom: 15px;">
        <span>${tech.name}</span>
      </div>`
    ).join('');
  }

  // ---- Experience ----
  const expEl = document.getElementById('portfolio-experience');
  if (expEl && p.experience) {
    expEl.innerHTML = p.experience.map(exp => `
      <div class="col-md-6">
        <div class="resume-wrap ftco-animate">
          <span class="date">${exp.date}</span>
          <h2>${exp.role}</h2>
          <span class="position">${exp.company}</span>
          ${exp.tags ? `<div class="experience-tags">${exp.tags.map(tag => `<span class="experience-tag">${tag}</span>`).join('')}</div>` : ''}
          <p class="mt-4">
            <ul>${exp.description.map(item => `<li>${item}</li>`).join('')}</ul>
          </p>
        </div>
      </div>`
    ).join('');
  }

  // ---- Certifications ----
  const certEl = document.getElementById('portfolio-certifications');
  if (certEl && p.certifications) {
    certEl.innerHTML = p.certifications.map(cert => `
      <div class="col-md-6">
        <div class="resume-wrap ftco-animate">
          <span class="date">${cert.date}</span>
          <h2><a href="${cert.link}" target="_blank" rel="noopener noreferrer" style="color:inherit;text-decoration:none;">${cert.name}</a></h2>
          <span class="position">${cert.issuer}</span>
        </div>
      </div>`
    ).join('');
  }

  // ---- Education ----
  const eduEl = document.getElementById('portfolio-education');
  if (eduEl && p.education) {
    eduEl.innerHTML = p.education.map(edu => `
      <div class="col-md-6">
        <div class="resume-wrap ftco-animate">
          <span class="date">${edu.date}</span>
          <h2>${edu.degree}</h2>
          <span class="position">${edu.institution}</span>
          ${edu.detail ? `<p class="mt-4">${edu.detail}</p>` : ''}
        </div>
      </div>`
    ).join('');
  }

  // ---- Projects ----
  renderProjects('all');

  // ---- Counters / Achievements ----
  const counterRow = document.querySelector('#section-counter .row.d-md-flex');
  if (counterRow && p.achievements) {
    counterRow.innerHTML = p.achievements.map(a => `
      <div class="col-md d-flex justify-content-center counter-wrap ftco-animate">
        <div class="block-18">
          <div class="text">
            <strong class="number" data-number="${a.value}">0</strong>
            <span>${a.label}</span>
          </div>
        </div>
      </div>`
    ).join('');
    // Re-init counter animation
    if (typeof initCounters === 'function') initCounters();
  }

  // ---- Social Links ----
  const socialEl = document.getElementById('portfolio-social');
  if (socialEl && p.socialLinks) {
    const findMe = socialEl.querySelector('.normal-txt');
    socialEl.innerHTML = '';
    if (findMe) socialEl.appendChild(findMe);
    else socialEl.innerHTML = '<li class="ftco-animate normal-txt">Find me on</li>';
    p.socialLinks.forEach(link => {
      const li = document.createElement('li');
      li.className = 'ftco-animate';
      li.innerHTML = `<a href="${link.url}" target="_blank" rel="noopener noreferrer"><span class="${link.icon}"></span></a>`;
      socialEl.appendChild(li);
    });
  }

  // ---- Links (LinkedIn, GitHub, Resume, Contact) ----
  setAttr('[data-portfolio="linkedin"]', 'href', p.profile.linkedin);
  setAttr('[data-portfolio="github"]', 'href', p.profile.github);
  setAttr('[data-portfolio="email-link"]', 'href', `mailto:${p.profile.email}`);
  setAttr('[data-portfolio="phone-link"]', 'href', `tel:${p.profile.phone.replace(/\s/g, '')}`);
  setText('[data-portfolio="phone"]', p.profile.phone);
  setAttr('[data-portfolio="resume"]', 'href', p.profile.resumeLink);
  setAttr('[data-portfolio="contact-form"]', 'href', p.profile.contactForm);

  // ---- Typing Animation ----
  initTypingAnimation(p.profile.typingTexts);

  // ---- Project Filters ----
  initProjectFilters();

  // Re-init AOS
  if (typeof AOS !== 'undefined') {
    AOS.refresh();
  }

  // Re-init waypoint animations for dynamically rendered content
  // main.js contentWayPoint() only runs on page load before dynamic content exists,
  // so we need to re-trigger it for new .ftco-animate elements
  reInitAnimations();
}

// ---- Render Projects with Filter ----
function renderProjects(filter) {
  const projEl = document.getElementById('portfolio-projects');
  if (!projEl || !portfolioData) return;

  const projects = filter === 'all'
    ? portfolioData.projects
    : portfolioData.projects.filter(p => p.category === filter);

  projEl.innerHTML = projects.map(proj => `
    <div class="col-md-4 d-flex ftco-animate project-card" data-category="${proj.category}">
      <div class="blog-entry justify-content-end">
        <a href="${proj.link}" class="block-20 zoom-effect" style="background-image: url('${proj.image}');" target="_blank" rel="noopener noreferrer"></a>
        <div class="text mt-3 float-right d-block">
          <h3 class="heading">
            <a href="${proj.link}" target="_blank" rel="noopener noreferrer">${proj.title}</a>
          </h3>
          <p>${proj.description}</p>
          <div class="project-tags">
            ${proj.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
          </div>
          ${proj.github && proj.github !== '#' ? `<a href="${proj.github}" class="btn-github" target="_blank" rel="noopener noreferrer"><span class="icon-github2"></span> View Code</a>` : ''}
        </div>
      </div>
    </div>`
  ).join('');

  // Re-init AOS for new elements
  if (typeof AOS !== 'undefined') AOS.refresh();

  // Re-init waypoint animations for filtered project cards
  reInitAnimations();
}

// ---- Project Filter Buttons ----
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.project-filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      renderProjects(this.dataset.filter);
    });
  });
}

// ---- Typing Animation (uses Typed.js) ----
function initTypingAnimation(texts) {
  const el = document.getElementById('typing-animation');
  if (!el || !texts || !texts.length) return;

  // Remove old CSS-based animation
  el.style.animation = 'none';
  el.style.width = 'auto';
  el.style.overflow = 'visible';
  el.style.whiteSpace = 'normal';

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

// ---- Animate Skill Bars on Scroll ----
function animateSkillBars() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bars = entry.target.querySelectorAll('.progress-bar');
        bars.forEach(bar => {
          const width = bar.style.width;
          bar.style.width = '0%';
          setTimeout(() => { bar.style.width = width; }, 200);
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  const skillSection = document.getElementById('portfolio-skills');
  if (skillSection) observer.observe(skillSection);
}

// ---- Counter Animation ----
function initCounters() {
  const counterEls = document.querySelectorAll('.number[data-number]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.dataset.number);
        animateCounter(entry.target, target);
        observer.unobserve(entry.target);
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
      el.textContent = target;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(current);
    }
  }, 20);
}

// ---- Re-init Waypoint Animations for Dynamic Content ----
function reInitAnimations() {
  // main.js contentWayPoint() sets up jQuery Waypoints on .ftco-animate elements,
  // but it runs BEFORE portfolio.js renders dynamic content, so new elements stay at opacity:0.
  // Solution: Use IntersectionObserver to animate dynamically rendered .ftco-animate elements
  // when they scroll into view.
  const unanimated = document.querySelectorAll('.ftco-animate:not(.ftco-animated)');
  if (unanimated.length === 0) return;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const effect = el.dataset.animateEffect;
          if (effect === 'fadeIn') el.classList.add('fadeIn');
          else if (effect === 'fadeInLeft') el.classList.add('fadeInLeft');
          else if (effect === 'fadeInRight') el.classList.add('fadeInRight');
          else el.classList.add('fadeInUp');
          el.classList.add('ftco-animated');
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.05 });

    unanimated.forEach(el => observer.observe(el));
  } else {
    // Fallback: just show everything immediately
    unanimated.forEach(el => {
      el.classList.add('fadeInUp', 'ftco-animated');
    });
  }
}

// ---- Dark Mode Toggle ----
function initDarkMode() {
  const toggle = document.getElementById('dark-mode-toggle');
  if (!toggle) return;

  const saved = localStorage.getItem('portfolio-light-mode');
  if (saved === 'true') {
    document.body.classList.add('light-mode');
    toggle.querySelector('.toggle-icon').textContent = '🌙';
  }

  toggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    localStorage.setItem('portfolio-light-mode', isLight);
    toggle.querySelector('.toggle-icon').textContent = isLight ? '🌙' : '☀️';
  });
}

// ---- Scroll to Top ----
function initScrollToTop() {
  const btn = document.getElementById('scroll-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ---- Smooth Scroll for Nav Links ----
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// ---- Active Nav Link on Scroll ----
function initActiveNavOnScroll() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.closest('.nav-item').classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.closest('.nav-item').classList.add('active');
      }
    });
  });
}

// ---- Navbar Shrink on Scroll ----
function initNavbarShrink() {
  const navbar = document.getElementById('ftco-navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });
}

// ---- Helpers ----
function setText(selector, text) {
  const el = document.querySelector(selector);
  if (el) el.textContent = text;
}

function setAttr(selector, attr, value) {
  const el = document.querySelector(selector);
  if (el) el.setAttribute(attr, value);
}

// ---- Initialize on DOM Ready ----
document.addEventListener('DOMContentLoaded', () => {
  initPortfolio();
  initDarkMode();
  initScrollToTop();
  initSmoothScroll();
  initActiveNavOnScroll();
  initNavbarShrink();
  initCounters();
});
