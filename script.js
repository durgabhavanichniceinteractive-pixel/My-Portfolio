/**
 * BHAVANI — DEVELOPER PORTFOLIO
 * Core JavaScript: Animations, QA Simulator, Custom Cursor, Interactivity
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. PRELOADER SEQUENCE
     ========================================================================== */
  const preloader = document.getElementById('preloader');
  const preloaderBar = document.getElementById('preloader-bar');

  if (preloader && preloaderBar) {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 20) + 15;
      if (progress > 100) progress = 100;
      preloaderBar.style.width = `${progress}%`;

      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          preloader.classList.add('fade-out');
          initHeroAnimations();
        }, 250);
      }
    }, 60);
  } else {
    initHeroAnimations();
  }

  /* ==========================================================================
     2. CUSTOM CURSOR (Desktop only)
     ========================================================================== */
  const customCursor = document.getElementById('custom-cursor');
  const cursorDot = customCursor?.querySelector('.cursor-dot');
  const cursorRing = customCursor?.querySelector('.cursor-ring');
  const cursorLabel = customCursor?.querySelector('.cursor-label');

  if (customCursor && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (cursorDot) {
        cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
      }
    });

    // Smooth trailing ring loop
    const renderCursor = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      if (cursorRing) {
        cursorRing.style.transform = `translate(${ringX}px, ${ringY}px)`;
      }
      requestAnimationFrame(renderCursor);
    };
    renderCursor();

    // Interactive element hover detection
    const interactiveElements = document.querySelectorAll('a, button, [data-cursor], .skill-card, .project-card, .stage-card, .exploring-card');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        customCursor.classList.add('is-hovering');
        const customText = el.getAttribute('data-cursor') || 'VIEW';
        if (cursorLabel) cursorLabel.textContent = customText;
      });
      el.addEventListener('mouseleave', () => {
        customCursor.classList.remove('is-hovering');
        if (cursorLabel) cursorLabel.textContent = '';
      });
    });

    document.addEventListener('mouseleave', () => {
      customCursor.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
      customCursor.style.opacity = '1';
    });
  }

  /* ==========================================================================
     3. STICKY HEADER & ACTIVE NAVIGATION OBSERVER
     ========================================================================== */
  const header = document.getElementById('header');
  const navItems = document.querySelectorAll('.nav-links .nav-item');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }

    // ScrollSpy for Nav Links
    let currentSectionId = '';
    const scrollPosition = window.scrollY + 180;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navItems.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });

  /* ==========================================================================
     4. MOBILE MENU DRAWER
     ========================================================================== */
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-item');

  const mobileClose = document.getElementById('mobile-close');

  if (mobileToggle && mobileMenu) {
    const setMenu = (open) => {
      mobileToggle.classList.toggle('is-open', open);
      mobileMenu.classList.toggle('is-active', open);
      mobileToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      mobileMenu.setAttribute('aria-hidden', open ? 'false' : 'true');
      document.body.style.overflow = open ? 'hidden' : '';
      if (open && mobileClose) mobileClose.focus({ preventScroll: true });
      if (!open && document.activeElement && mobileMenu.contains(document.activeElement)) {
        mobileToggle.focus({ preventScroll: true });
      }
    };
    const isMenuOpen = () => mobileMenu.classList.contains('is-active');

    mobileToggle.addEventListener('click', () => setMenu(!isMenuOpen()));
    if (mobileClose) mobileClose.addEventListener('click', () => setMenu(false));

    // Close on link tap
    mobileNavLinks.forEach((link) => link.addEventListener('click', () => setMenu(false)));

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isMenuOpen()) setMenu(false);
    });

    // Close on tap of empty backdrop area
    mobileMenu.addEventListener('click', (e) => {
      if (e.target === mobileMenu) setMenu(false);
    });

    // Auto-close if screen grows to desktop size (e.g. rotate / resize)
    window.addEventListener('resize', () => {
      if (window.innerWidth > 1180 && isMenuOpen()) setMenu(false);
    }, { passive: true });
  }

  /* ==========================================================================
     5. SKILLS FILTERING
     ========================================================================== */
  const skillTabs = document.querySelectorAll('.skill-tab');
  const skillCards = document.querySelectorAll('.skill-card');

  skillTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      skillTabs.forEach((t) => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      const filter = tab.getAttribute('data-filter');

      skillCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });

  /* ==========================================================================
     6. LIVE QA VIEWPORT SIMULATOR (BEYOND THE PIXELS)
     ========================================================================== */
  const vpButtons = document.querySelectorAll('.vp-btn');
  const simFrame = document.getElementById('sim-frame');
  const liveLabel = document.getElementById('live-viewport-label');

  if (vpButtons.length > 0 && simFrame && liveLabel) {
    vpButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        vpButtons.forEach((b) => {
          b.classList.remove('active');
          b.setAttribute('aria-pressed', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');

        const width = btn.getAttribute('data-width');
        const mode = btn.getAttribute('data-mode');

        simFrame.style.width = width;
        simFrame.setAttribute('data-mode', mode);

        if (mode === 'desktop') {
          liveLabel.textContent = '100% — Full Desktop (1280px)';
        } else if (mode === 'tablet') {
          liveLabel.textContent = '768px — Tablet Viewport (iPad / Tablet)';
        } else if (mode === 'mobile') {
          liveLabel.textContent = '375px — Mobile Viewport (iPhone / Pixel)';
        }
      });
    });
  }

  /* ==========================================================================
     7. PROJECT INSPECTION MODAL / LIGHTBOX
     ========================================================================== */
  const modal = document.getElementById('project-modal');
  const modalContent = document.getElementById('modal-content');
  const modalClose = document.getElementById('modal-close');
  const openModalBtns = document.querySelectorAll('.open-modal-btn');

  // Detailed Project Specs Database
  const projectDetails = {
    '01': {
      title: '01 / Nexa AI Lab',
      tagline: 'Interactive AI-Focused Web Experience & Prompt Playground',
      image: 'assets/projects/Nexa-AI-Lab.png',
      repo: 'https://github.com/durgabhavanichniceinteractive-pixel/Nexa-Ai-Lab',
      overview: 'Nexa AI Lab is a cutting-edge web application created to demonstrate interactive generative AI prompts, telemetry tracking, and architectural parameters. Built with responsive HTML5, modern CSS Grid/Flexbox, and asynchronous JavaScript.',
      qaMetrics: [
        { label: 'Responsive Testing', val: 'Passed (320px to 4K displays)' },
        { label: 'Browser Engine Compatibility', val: 'Chromium, WebKit (Safari), Gecko (Firefox)' },
        { label: 'Performance Audit', val: '98/100 Lighthouse Performance' },
        { label: 'Cumulative Layout Shift (CLS)', val: '0.00 — Zero layout shift on asset load' },
        { label: 'Accessibility (A11y)', val: 'High contrast ratio (AAA standard), keyboard navigable' }
      ],
      features: [
        'Neural Prompt Playground with customizable architectural prompt parameters.',
        'Real-time simulation metrics tracking tokens/sec and sub-millisecond roundtrips.',
        'Modular CSS structure with dark luxury design system and clean typography.',
        'AI-assisted development iteration refined with hands-on manual engineering.'
      ]
    },
    '02': {
      title: '02 / [PROJECT NAME]',
      tagline: '[Editable Project Slot — Replace with your website title]',
      image: 'assets/projects/Human.Exe-img.png',
      repo: 'https://github.com/durgabhavanichniceinteractive-pixel',
      overview: '[EDIT THIS: An interactive web experience focusing on modern typography, fluid grid layouts, and high-performance frontend engineering. Replace this description with your project story and accomplishments.]',
      qaMetrics: [
        { label: 'Responsive Testing', val: '[Passed across all mobile & desktop viewports]' },
        { label: 'Cross-Browser', val: '[Tested on Chrome, Safari, Firefox, Edge]' },
        { label: 'Performance Audit', val: '[Lighthouse 95+ score]' },
        { label: 'Role', val: '[Frontend Developer & QA Tester]' }
      ],
      features: [
        '[EDIT THIS: Feature 1 — Fluid layout using modern CSS Grid and custom variables]',
        '[EDIT THIS: Feature 2 — Smooth interactive states and micro-animations]',
        '[EDIT THIS: Feature 3 — Cross-browser testing and accessibility audits]'
      ]
    },
    '03': {
      title: '03 / [PROJECT NAME]',
      tagline: '[Editable Project Slot — Performance & QA Dashboard / Future Project]',
      image: 'assets/projects/Inside-the-Journey-img.png',
      repo: 'https://github.com/durgabhavanichniceinteractive-pixel',
      overview: '[EDIT THIS: A web application engineered with modular components, telemetry charts, and comprehensive functional test coverage. Replace this with your project details.]',
      qaMetrics: [
        { label: 'Test Coverage', val: '[Functional test cases & boundary checks]' },
        { label: 'Responsive Score', val: '[Mobile-first design with clean touch targets]' },
        { label: 'Performance', val: '[Core Web Vitals optimized]' }
      ],
      features: [
        '[EDIT THIS: Feature 1 — Data visualization telemetry with clean UI]',
        '[EDIT THIS: Feature 2 — Modular test suites and latency audits]',
        '[EDIT THIS: Feature 3 — Mobile and desktop responsive layouts]'
      ]
    }
  };

  if (modal && modalContent && modalClose) {
    const openModal = (id) => {
      const data = projectDetails[id];
      if (!data) return;

      modalContent.innerHTML = `
        <div class="modal-project-header">
          <span class="section-subtitle">${data.tagline}</span>
          <h2 style="font-family: var(--font-display); font-size: 1.8rem; margin: 0.3rem 0 1rem 0; color: #fff;">${data.title}</h2>
        </div>

        <div style="border-radius: var(--radius-md); overflow: hidden; border: 1px solid var(--border-medium); margin-bottom: 1.5rem;">
          <img src="${data.image}" alt="${data.title}" style="width: 100%; aspect-ratio: 16/9; object-fit: cover;">
        </div>

        <p style="color: var(--text-secondary); line-height: 1.7; margin-bottom: 1.5rem;">${data.overview}</p>

        <h3 style="font-family: var(--font-display); font-size: 1.15rem; color: #fff; margin-bottom: 0.75rem;">Quality Assurance & Telemetry Checklist</h3>
        <div style="display: grid; grid-template-columns: 1fr; gap: 0.6rem; margin-bottom: 1.5rem;">
          ${data.qaMetrics.map(m => `
            <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); padding: 0.6rem 0.9rem; border-radius: 6px; display: flex; justify-content: space-between; font-size: 0.85rem;">
              <span style="font-family: var(--font-mono); color: var(--gold);">${m.label}:</span>
              <span style="color: var(--text-light);">${m.val}</span>
            </div>
          `).join('')}
        </div>

        <h3 style="font-family: var(--font-display); font-size: 1.15rem; color: #fff; margin-bottom: 0.75rem;">Key Architecture Highlights</h3>
        <ul style="margin-bottom: 1.75rem; display: flex; flex-direction: column; gap: 0.5rem;">
          ${data.features.map(f => `
            <li style="color: var(--text-secondary); font-size: 0.9rem; position: relative; padding-left: 1.25rem;">
              <span style="position: absolute; left: 0; color: var(--gold);">&#10003;</span>
              ${f}
            </li>
          `).join('')}
        </ul>

        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
          <a href="${data.repo}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
            <span>Visit GitHub Repository</span>
          </a>
        </div>
      `;

      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    };

    openModalBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-project');
        if (id) openModal(id);
      });
    });

    modalClose.addEventListener('click', closeModal);
    modal.querySelector('.modal-backdrop')?.addEventListener('click', closeModal);

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('is-open')) {
        closeModal();
      }
    });
  }

  /* ==========================================================================
     8. TOAST NOTIFICATIONS & COPY EMAIL ACTION
     ========================================================================== */
  const toast = document.getElementById('toast');
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const emailTextElem = document.getElementById('contact-email');

  const showToast = (message) => {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  };

  if (copyEmailBtn && emailTextElem) {
    copyEmailBtn.addEventListener('click', () => {
      const email = emailTextElem.textContent.trim();
      navigator.clipboard.writeText(email)
        .then(() => {
          showToast(`✓ Copied "${email}" to clipboard!`);
        })
        .catch(() => {
          showToast('Email: bhavani.dev@example.com');
        });
    });
  }

  /* ==========================================================================
     9. MAGNETIC BUTTONS (Micro-Interactions)
     ========================================================================== */
  const magnetButtons = document.querySelectorAll('.magnet-btn');
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    magnetButtons.forEach((btn) => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.22}px, ${y * 0.22}px)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0px, 0px)';
      });
    });
  }

  /* ==========================================================================
     10. HERO 3D TILT EFFECT
     ========================================================================== */
  const heroBrowser = document.getElementById('hero-browser');
  if (heroBrowser && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    const parentContainer = heroBrowser.parentElement;
    parentContainer?.addEventListener('mousemove', (e) => {
      const rect = heroBrowser.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      heroBrowser.style.transform = `perspective(1000px) rotateY(${x * 7}deg) rotateX(${-y * 7}deg) translateY(-4px)`;
    });

    parentContainer?.addEventListener('mouseleave', () => {
      heroBrowser.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(0px)';
    });
  }

  /* ==========================================================================
     11. BACK TO TOP
     ========================================================================== */
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /* ==========================================================================
     12. GSAP ENTRANCE ANIMATIONS
     ========================================================================== */
  function initHeroAnimations() {
    if (typeof gsap === 'undefined') return;

    // Fade in Hero Elements
    gsap.from('.reveal-elem', {
      duration: 1,
      y: 35,
      opacity: 0,
      stagger: 0.14,
      ease: 'power3.out'
    });

    // Register ScrollTrigger if available
    if (typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);

      // Section titles
      gsap.utils.toArray('.section-header').forEach((header) => {
        gsap.from(header, {
          scrollTrigger: {
            trigger: header,
            start: 'top 85%',
            toggleActions: 'play none none none'
          },
          duration: 0.9,
          y: 30,
          opacity: 0,
          ease: 'power3.out'
        });
      });

      // Project Cards
      gsap.utils.toArray('.project-card').forEach((card) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            toggleActions: 'play none none none'
          },
          duration: 1,
          y: 40,
          opacity: 0,
          ease: 'power3.out'
        });
      });

      // Timeline Stage Cards
      gsap.utils.toArray('.stage-card').forEach((card, index) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none'
          },
          duration: 0.8,
          y: 30,
          opacity: 0,
          delay: index * 0.1,
          ease: 'power3.out'
        });
      });
    }
  }

});



// animation

const canvas = document.getElementById("particleCanvas");
const ctx = canvas.getContext("2d");

let particles = [];
let mouse = {
  x: -100,
  y: -100
};

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resize();
window.addEventListener("resize", resize);

window.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

for (let i = 0; i < 180; i++) {
  particles.push({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,

    size:
      Math.random() < 0.15
        ? Math.random() * 18 + 8
        : Math.random() * 2.5 + 0.5,

    speed:
      Math.random() * 0.5 + 0.1,

    drift:
      (Math.random() - 0.5) * 0.3,

    opacity:
      Math.random() * 0.6 + 0.15,

    depth:
      Math.random()
  });
}

function animate() {

  ctx.clearRect(
    0,
    0,
    canvas.width,
    canvas.height
  );

  particles.forEach((p) => {

    /* movement */

    p.y -= p.speed;

    p.x += p.drift;

    /* mouse interaction */

    const dx = p.x - mouse.x;
    const dy = p.y - mouse.y;

    const distance =
      Math.sqrt(
        dx * dx + dy * dy
      );

    if (distance < 150) {

      const force =
        (150 - distance) / 150;

      p.x +=
        (dx / (distance || 1)) *
        force *
        2;

      p.y +=
        (dy / (distance || 1)) *
        force *
        2;
    }

    /* reset */

    if (p.y < -30) {
      p.y =
        canvas.height + 30;

      p.x =
        Math.random() *
        canvas.width;
    }

    if (p.x < -30) {
      p.x =
        canvas.width + 30;
    }

    if (p.x > canvas.width + 30) {
      p.x = -30;
    }

    /* bokeh */

    if (p.size > 8) {

      const gradient =
        ctx.createRadialGradient(
          p.x,
          p.y,
          0,
          p.x,
          p.y,
          p.size
        );

      gradient.addColorStop(
        0,
        `rgba(255,255,255,${p.opacity})`
      );

   gradient.addColorStop(
  0.3,
  `rgba(16, 161, 108, ${p.opacity * 0.8})`
);

      gradient.addColorStop(
        1,
        "rgba(120,190,255,0)"
      );

      ctx.fillStyle = gradient;

      ctx.beginPath();

      ctx.arc(
        p.x,
        p.y,
        p.size,
        0,
        Math.PI * 2
      );

      ctx.fill();

    } else {

      /* small dust */

      ctx.beginPath();

      ctx.arc(
        p.x,
        p.y,
        p.size,
        0,
        Math.PI * 2
      );

      ctx.fillStyle = `rgba(16, 161, 108, ${p.opacity})`;

      ctx.fill();

    }

  });

  requestAnimationFrame(animate);
}

animate();