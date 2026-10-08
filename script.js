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

const canvas = document.getElementById("caustics-bg");
const gl = canvas.getContext("webgl", {
  antialias: true,
  alpha: false
});

if (!gl) {
  console.warn("WebGL is not supported.");
} else {

  const vertexShaderSource = `
    attribute vec2 a_position;

    void main() {
      gl_Position = vec4(a_position, 0.0, 1.0);
    }
  `;

  const fragmentShaderSource = `
    precision highp float;

    uniform vec2 u_resolution;
    uniform float u_time;
    uniform vec2 u_mouse;

    /*
      Caustics background
      -------------------
      Animated light waves
      layered distortion
      mouse interaction
    */

    float wave(vec2 p, float t) {

      float a = sin(p.x * 5.0 + t);
      float b = sin(p.y * 6.0 - t * 1.2);

      float c = sin(
        (p.x + p.y) * 8.0 +
        sin(t * 0.5)
      );

      float d = sin(
        length(p) * 12.0 -
        t * 1.5
      );

      return (a + b + c + d) * 0.25;
    }


    void main() {

      vec2 uv = gl_FragCoord.xy / u_resolution.xy;

      /*
        Correct aspect ratio
      */
      float aspect =
        u_resolution.x /
        u_resolution.y;

      vec2 p = uv;

      p.x *= aspect;


      /*
        Mouse influence
      */
      vec2 mouse = u_mouse;

      mouse.x *= aspect;

      float mouseDistance =
        distance(p, mouse);

      float mouseRipple =
        sin(
          mouseDistance * 18.0 -
          u_time * 1.8
        );

      mouseRipple *=
        exp(-mouseDistance * 3.0);

      p +=
        normalize(p - mouse + 0.0001)
        * mouseRipple
        * 0.025;


      /*
        Main animation
      */
      float t =
        u_time * 0.22;


      float w1 =
        wave(p * 1.2, t);

      float w2 =
        wave(
          p * 1.8 +
          vec2(2.5, -1.5),
          -t * 0.8
        );

      float w3 =
        wave(
          p * 2.8 +
          vec2(-3.0, 2.0),
          t * 0.55
        );


      /*
        Layered caustic pattern
      */
      float caustic =
        w1 * 0.5 +
        w2 * 0.35 +
        w3 * 0.15;


      caustic =
        abs(caustic);


      caustic =
        smoothstep(
          0.12,
          0.75,
          caustic
        );


      /*
        Additional light webs
      */
      float lines1 =
        abs(
          sin(
            (p.x + p.y) * 14.0 +
            t
          )
        );

      float lines2 =
        abs(
          sin(
            (p.x - p.y) * 18.0 -
            t * 1.2
          )
        );

      float lightPattern =
        lines1 *
        lines2;

      lightPattern =
        smoothstep(
          0.65,
          0.95,
          lightPattern
        );


      /*
        Combine
      */
      float light =
        caustic * 0.75 +
        lightPattern * 0.35;


      /*
        Dark premium background
      */
      vec3 baseColor =
        vec3(
          0.005,
          0.025,
          0.035
        );


      /*
        Cool light
      */
     vec3 lightColor = vec3(0.267, 0.890, 0.784);
      


      vec3 finalColor =
        mix(
          baseColor,
          lightColor,
          light
        );


      /*
        Soft center illumination
      */
      float center =
        1.0 -
        distance(
          uv,
          vec2(0.5)
        );

      center =
        smoothstep(
          0.0,
          0.8,
          center
        );

      finalColor +=
        vec3(
          0.01,
          0.06,
          0.08
        ) * center;


      /*
        Vignette
      */
      float vignette =
        distance(
          uv,
          vec2(0.5)
        );

      finalColor *=
        1.0 -
        vignette * 0.45;


      gl_FragColor =
        vec4(
          finalColor,
          1.0
        );
    }
  `;


  function createShader(type, source) {

    const shader =
      gl.createShader(type);

    gl.shaderSource(
      shader,
      source
    );

    gl.compileShader(shader);

    if (
      !gl.getShaderParameter(
        shader,
        gl.COMPILE_STATUS
      )
    ) {

      console.error(
        gl.getShaderInfoLog(shader)
      );

      gl.deleteShader(shader);

      return null;
    }

    return shader;
  }


  const vertexShader =
    createShader(
      gl.VERTEX_SHADER,
      vertexShaderSource
    );


  const fragmentShader =
    createShader(
      gl.FRAGMENT_SHADER,
      fragmentShaderSource
    );


  const program =
    gl.createProgram();


  gl.attachShader(
    program,
    vertexShader
  );

  gl.attachShader(
    program,
    fragmentShader
  );

  gl.linkProgram(program);


  if (
    !gl.getProgramParameter(
      program,
      gl.LINK_STATUS
    )
  ) {

    console.error(
      gl.getProgramInfoLog(program)
    );
  }


  gl.useProgram(program);


  /*
    Full screen rectangle
  */
  const positionBuffer =
    gl.createBuffer();

  gl.bindBuffer(
    gl.ARRAY_BUFFER,
    positionBuffer
  );


  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,

      -1,  1,
       1, -1,
       1,  1
    ]),
    gl.STATIC_DRAW
  );


  const positionLocation =
    gl.getAttribLocation(
      program,
      "a_position"
    );


  gl.enableVertexAttribArray(
    positionLocation
  );


  gl.vertexAttribPointer(
    positionLocation,
    2,
    gl.FLOAT,
    false,
    0,
    0
  );


  const timeLocation =
    gl.getUniformLocation(
      program,
      "u_time"
    );


  const resolutionLocation =
    gl.getUniformLocation(
      program,
      "u_resolution"
    );


  const mouseLocation =
    gl.getUniformLocation(
      program,
      "u_mouse"
    );


  let mouseX = 0.5;
  let mouseY = 0.5;

  let targetMouseX = 0.5;
  let targetMouseY = 0.5;


  /*
    Mouse movement
  */
  window.addEventListener(
    "mousemove",
    (event) => {

      targetMouseX =
        event.clientX /
        window.innerWidth;

      targetMouseY =
        1.0 -
        event.clientY /
        window.innerHeight;
    }
  );


  /*
    Resize
  */
  function resize() {

    const dpr =
      Math.min(
        window.devicePixelRatio || 1,
        2
      );

    canvas.width =
      window.innerWidth * dpr;

    canvas.height =
      window.innerHeight * dpr;

    canvas.style.width =
      window.innerWidth + "px";

    canvas.style.height =
      window.innerHeight + "px";

    gl.viewport(
      0,
      0,
      canvas.width,
      canvas.height
    );
  }


  window.addEventListener(
    "resize",
    resize
  );

  resize();


  /*
    Animation
  */
  let startTime =
    performance.now();


  function render(now) {

    const time =
      (now - startTime) / 1000;


    /*
      Smooth mouse
    */
    mouseX +=
      (targetMouseX - mouseX) *
      0.04;

    mouseY +=
      (targetMouseY - mouseY) *
      0.04;


    gl.useProgram(program);


    gl.uniform1f(
      timeLocation,
      time
    );


    gl.uniform2f(
      resolutionLocation,
      canvas.width,
      canvas.height
    );


    gl.uniform2f(
      mouseLocation,
      mouseX,
      mouseY
    );


    gl.drawArrays(
      gl.TRIANGLES,
      0,
      6
    );


    requestAnimationFrame(render);
  }


  requestAnimationFrame(render);
}