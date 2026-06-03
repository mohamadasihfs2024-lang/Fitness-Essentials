/* ============================================================
   FITNESS ESSENTIALS — script.js
   ============================================================ */

'use strict';

// ============================================================
// LOADER
// ============================================================
(function initLoader() {
  const loader = document.getElementById('loader');
  const fill = document.getElementById('loaderFill');
  const pct = document.getElementById('loaderPercent');
  const fe = document.querySelector('.loader-fe');
  const essentials = document.querySelector('.loader-essentials');
  const location = document.querySelector('.loader-location');
  const tagline = document.querySelector('.loader-tagline');

  // Seed particles
  const pContainer = document.getElementById('loaderParticles');
  for (let i = 0; i < 30; i++) {
    const dot = document.createElement('div');
    dot.className = 'lp-dot';
    dot.style.setProperty('--dur', `${3 + Math.random() * 5}s`);
    dot.style.setProperty('--delay', `${Math.random() * 4}s`);
    dot.style.setProperty('--dx', `${(Math.random() - 0.5) * 100}px`);
    dot.style.left = `${Math.random() * 100}%`;
    dot.style.background = Math.random() > 0.5 ? '#00f5ff' : '#0066ff';
    dot.style.width = dot.style.height = `${1 + Math.random() * 3}px`;
    pContainer.appendChild(dot);
  }

  // Animate text
  setTimeout(() => {
    fe.style.transition = 'transform 0.8s cubic-bezier(0.16,1,0.3,1), opacity 0.8s ease';
    fe.style.transform = 'translateY(0)'; fe.style.opacity = '1';
  }, 200);
  setTimeout(() => {
    essentials.style.transition = 'transform 0.8s cubic-bezier(0.16,1,0.3,1), opacity 0.8s ease';
    essentials.style.transform = 'translateY(0)'; essentials.style.opacity = '1';
  }, 500);
  setTimeout(() => {
    location.style.transition = 'opacity 0.8s ease';
    location.style.opacity = '1';
  }, 800);
  setTimeout(() => {
    tagline.style.transition = 'opacity 0.8s ease';
    tagline.style.opacity = '1';
  }, 1000);

  // Progress bar
  let progress = 0;
  const interval = setInterval(() => {
    progress = Math.min(progress + (Math.random() * 4 + 1), 100);
    fill.style.width = progress + '%';
    pct.textContent = Math.floor(progress);
    if (progress >= 100) { clearInterval(interval); finishLoader(); }
  }, 40);

  function finishLoader() {
    setTimeout(() => {
      loader.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      loader.style.opacity = '0';
      loader.style.transform = 'scale(1.05)';
      setTimeout(() => {
        loader.style.display = 'none';
        startHeroAnimations();
      }, 800);
    }, 300);
  }
})();

// ============================================================
// HERO ANIMATIONS (GSAP)
// ============================================================
function startHeroAnimations() {
  if (!window.gsap) return;

  gsap.registerPlugin(ScrollTrigger);

  // Badge
  gsap.to('.hero-badge', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.1 });

  // Headline lines
  gsap.to('.hero-line-1', { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 0.2 });
  gsap.to('.hero-line-2', { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 0.35 });
  gsap.to('.hero-line-3', { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 0.5 });
  gsap.to('.hero-line-4', { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 0.65 });

  // Subheadline, buttons, stats
  gsap.to('.hero-sub', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.9 });
  gsap.to('.hero-buttons', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 1.1 });
  gsap.to('.hero-stats', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 1.3 });

  // Scroll-triggered section animations
  document.querySelectorAll('[data-aos]').forEach(el => el.removeAttribute('data-aos'));

  gsap.utils.toArray('.stat-item').forEach((el, i) => {
    gsap.fromTo(el,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.7, delay: i * 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%', once: true }
      }
    );
  });
}

// ============================================================
// THREE.JS — HERO CANVAS
// ============================================================
(function initThreeScene() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas || !window.THREE) return;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 0, 8);

  // Lighting
  const ambientLight = new THREE.AmbientLight(0x111122, 1.5);
  scene.add(ambientLight);

  const blueLight = new THREE.PointLight(0x0066ff, 8, 20);
  blueLight.position.set(3, 3, 3);
  scene.add(blueLight);

  const cyanLight = new THREE.PointLight(0x00f5ff, 6, 20);
  cyanLight.position.set(-3, -2, 4);
  scene.add(cyanLight);

  const backLight = new THREE.DirectionalLight(0x0033aa, 2);
  backLight.position.set(-5, 5, -5);
  scene.add(backLight);

  // Materials
  const metalMat = new THREE.MeshStandardMaterial({
    color: 0x1a1a2e,
    metalness: 0.95,
    roughness: 0.1,
    envMapIntensity: 1.0,
  });
  const weightMat = new THREE.MeshStandardMaterial({
    color: 0x0a0a1a,
    metalness: 0.9,
    roughness: 0.2,
  });
  const glowMat = new THREE.MeshStandardMaterial({
    color: 0x0066ff,
    emissive: 0x003399,
    emissiveIntensity: 2,
    metalness: 0.5,
    roughness: 0.3,
  });

  // Build dumbbell
  function buildDumbbell(x, y, z, scale = 1) {
    const group = new THREE.Group();
    group.position.set(x, y, z);
    group.scale.setScalar(scale);

    // Bar
    const barGeo = new THREE.CylinderGeometry(0.05, 0.05, 2.4, 12);
    const bar = new THREE.Mesh(barGeo, metalMat);
    bar.rotation.z = Math.PI / 2;
    group.add(bar);

    // Inner rings
    [-0.8, 0.8].forEach(xPos => {
      const ringGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.12, 12);
      const ring = new THREE.Mesh(ringGeo, glowMat);
      ring.rotation.z = Math.PI / 2;
      ring.position.x = xPos;
      group.add(ring);
    });

    // Weights
    [-1.1, 1.1].forEach(xPos => {
      const weightGeo = new THREE.CylinderGeometry(0.38, 0.38, 0.25, 20);
      const weight = new THREE.Mesh(weightGeo, weightMat);
      weight.rotation.z = Math.PI / 2;
      weight.position.x = xPos;
      group.add(weight);

      // Edge ring
      const edgeGeo = new THREE.TorusGeometry(0.38, 0.025, 8, 20);
      const edge = new THREE.Mesh(edgeGeo, glowMat);
      edge.position.x = xPos + 0.13;
      edge.rotation.y = Math.PI / 2;
      group.add(edge);
    });

    return group;
  }

  // Build kettlebell
  function buildKettlebell(x, y, z, scale = 1) {
    const group = new THREE.Group();
    group.position.set(x, y, z);
    group.scale.setScalar(scale);

    // Body (sphere-ish with SphereGeometry)
    const bodyGeo = new THREE.SphereGeometry(0.45, 16, 16);
    const body = new THREE.Mesh(bodyGeo, weightMat);
    group.add(body);

    // Handle (torus)
    const handleGeo = new THREE.TorusGeometry(0.28, 0.06, 8, 16, Math.PI);
    const handle = new THREE.Mesh(handleGeo, metalMat);
    handle.position.y = 0.48;
    handle.rotation.x = Math.PI;
    group.add(handle);

    return group;
  }

  // Main dumbbell (large, center-right)
  const mainDumbbell = buildDumbbell(2.5, 0, 1, 1.2);
  scene.add(mainDumbbell);

  // Floating dumbbells
  const db2 = buildDumbbell(-3, 1.5, -1, 0.7);
  scene.add(db2);
  const db3 = buildDumbbell(1, -2.5, -2, 0.5);
  scene.add(db3);

  // Kettlebells
  const kb1 = buildKettlebell(-2.5, -1.5, 0.5, 0.8);
  scene.add(kb1);
  const kb2 = buildKettlebell(3.5, 2, -1, 0.6);
  scene.add(kb2);
  const kb3 = buildKettlebell(0.5, 2.5, -2, 0.5);
  scene.add(kb3);

  // Floating particles
  const particleCount = 120;
  const particleGeo = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 20;
  }
  particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const particleMat = new THREE.PointsMaterial({
    color: 0x0066ff, size: 0.04, transparent: true, opacity: 0.6
  });
  const particles = new THREE.Points(particleGeo, particleMat);
  scene.add(particles);

  // Energy rings
  function buildRing(radius, color) {
    const geo = new THREE.TorusGeometry(radius, 0.01, 6, 60);
    const mat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.3 });
    return new THREE.Mesh(geo, mat);
  }
  const ring1 = buildRing(1.8, 0x0066ff); ring1.position.set(2.5, 0, 1); scene.add(ring1);
  const ring2 = buildRing(2.2, 0x00f5ff); ring2.position.set(2.5, 0, 1); ring2.rotation.x = Math.PI / 4; scene.add(ring2);

  // Mouse parallax
  let mouseX = 0, mouseY = 0, targetX = 0, targetY = 0;
  document.addEventListener('mousemove', e => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
  });

  // Clock
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    // Smooth mouse
    targetX += (mouseX - targetX) * 0.05;
    targetY += (mouseY - targetY) * 0.05;

    // Main dumbbell: rotate + gentle camera parallax
    mainDumbbell.rotation.y = t * 0.5 + targetX * 0.3;
    mainDumbbell.rotation.x = targetY * 0.2;
    mainDumbbell.position.y = Math.sin(t * 0.8) * 0.2;

    // Floating dumbbells
    db2.rotation.y = -t * 0.3; db2.position.y = 1.5 + Math.sin(t * 0.6 + 1) * 0.3;
    db3.rotation.z = t * 0.4; db3.position.y = -2.5 + Math.cos(t * 0.7 + 2) * 0.25;

    // Kettlebells
    kb1.rotation.y = t * 0.6; kb1.position.y = -1.5 + Math.sin(t * 0.5 + 0.5) * 0.35;
    kb2.rotation.y = -t * 0.4; kb2.position.y = 2 + Math.cos(t * 0.6 + 1.5) * 0.25;
    kb3.rotation.y = t * 0.5; kb3.position.y = 2.5 + Math.sin(t * 0.4) * 0.2;

    // Energy rings
    ring1.rotation.z = t * 0.8; ring1.material.opacity = 0.2 + Math.sin(t * 2) * 0.15;
    ring2.rotation.y = -t * 0.6; ring2.material.opacity = 0.15 + Math.cos(t * 1.5) * 0.1;

    // Particles drift
    particles.rotation.y = t * 0.03;
    particles.rotation.x = t * 0.01;

    // Camera parallax
    camera.position.x += (-targetX * 0.8 - camera.position.x) * 0.04;
    camera.position.y += (targetY * 0.4 - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);

    // Light pulsing
    blueLight.intensity = 8 + Math.sin(t * 2) * 2;
    cyanLight.intensity = 6 + Math.cos(t * 1.5) * 2;

    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
})();

// ============================================================
// HERO PARTICLES (DOM)
// ============================================================
(function initHeroParticles() {
  const container = document.getElementById('heroParticles');
  if (!container) return;
  const colors = ['#0066ff', '#00f5ff', '#ffffff'];
  for (let i = 0; i < 50; i++) {
    const dot = document.createElement('div');
    dot.className = 'hp-dot';
    const size = 1 + Math.random() * 4;
    dot.style.cssText = `
      width:${size}px; height:${size}px;
      left:${Math.random() * 100}%;
      top:${Math.random() * 100}%;
      background:${colors[Math.floor(Math.random() * colors.length)]};
      opacity:${0.1 + Math.random() * 0.5};
      --dur:${5 + Math.random() * 10}s;
      --delay:${Math.random() * 10}s;
      --dx:${(Math.random() - 0.5) * 80}px;
      --dy:${(Math.random() - 0.5) * 80}px;
      --scale:${0.5 + Math.random() * 1.5};
    `;
    container.appendChild(dot);
  }
})();

// ============================================================
// NAVBAR
// ============================================================
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  const links = navLinks.querySelectorAll('a');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
    updateActiveLink();
  }, { passive: true });

  hamburger.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open');
    document.body.style.overflow = open ? 'hidden' : '';
  });

  links.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  function updateActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 100) current = sec.id;
    });
    navLinks.querySelectorAll('.nav-link').forEach(l => {
      l.classList.toggle('active', l.getAttribute('href') === '#' + current);
    });
  }
})();

// ============================================================
// SCROLL PROGRESS BAR
// ============================================================
(function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  window.addEventListener('scroll', () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (window.scrollY / max * 100).toFixed(1) + '%';
  }, { passive: true });
})();

// ============================================================
// CURSOR GLOW
// ============================================================
(function initCursor() {
  const glow = document.getElementById('cursor-glow');
  const dot = document.getElementById('cursor-dot');
  if (!glow || !dot) return;
  let cx = -999, cy = -999;
  document.addEventListener('mousemove', e => {
    cx = e.clientX; cy = e.clientY;
    glow.style.left = cx + 'px'; glow.style.top = cy + 'px';
    dot.style.left = cx + 'px'; dot.style.top = cy + 'px';
  });
})();

// ============================================================
// AOS INIT
// ============================================================
window.addEventListener('load', () => {
  if (window.AOS) {
    AOS.init({
      duration: 700,
      easing: 'cubic-bezier(0.4,0,0.2,1)',
      once: true,
      offset: 80,
    });
  }
});

// ============================================================
// VANILLA TILT
// ============================================================
window.addEventListener('load', () => {
  if (window.VanillaTilt) {
    VanillaTilt.init(document.querySelectorAll('.tilt-card'), {
      max: 8,
      speed: 400,
      glare: true,
      'max-glare': 0.15,
      perspective: 1200,
    });
  }
});

// ============================================================
// COUNT UP ANIMATION
// ============================================================
(function initCountUp() {
  const elements = document.querySelectorAll('.count-up');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseFloat(el.dataset.target);
      const isDecimal = el.dataset.decimal === '1';
      const duration = 1800;
      const startTime = performance.now();

      function update(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = target * eased;
        el.textContent = isDecimal ? value.toFixed(1) : Math.floor(value);
        if (progress < 1) requestAnimationFrame(update);
        else el.textContent = isDecimal ? target.toFixed(1) : target;
      }

      requestAnimationFrame(update);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  elements.forEach(el => observer.observe(el));
})();

// ============================================================
// SWIPER
// ============================================================
window.addEventListener('load', () => {
  if (!window.Swiper) return;
  new Swiper('.testimonialsSwiper', {
    loop: true,
    autoplay: { delay: 4500, disableOnInteraction: false, pauseOnMouseEnter: true },
    speed: 700,
    slidesPerView: 1,
    spaceBetween: 24,
    centeredSlides: true,
    pagination: { el: '.swiper-pagination', clickable: true },
    navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
    breakpoints: {
      640: { slidesPerView: 1.2 },
      900: { slidesPerView: 2.2 },
      1200: { slidesPerView: 3 },
    },
    effect: 'slide',
  });
});

// ============================================================
// SMOOTH SCROLL
// ============================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 80;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ============================================================
// LIGHTBOX
// ============================================================
const galleryLabels = ['Gym Floor', 'Weight Section', 'Cardio Zone', 'Training Session', 'Group Class', 'Equipment'];
function openLightbox(index) {
  const lb = document.getElementById('lightbox');
  const content = document.getElementById('lightboxContent');
  content.innerHTML = `
    <div style="text-align:center">
      <div style="font-size:5rem;margin-bottom:1.5rem;background:linear-gradient(135deg,#0066ff,#00f5ff);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">
        <i class="fas fa-image"></i>
      </div>
      <div style="font-family:'Bebas Neue',sans-serif;font-size:2.5rem;letter-spacing:0.15em;color:#fff;margin-bottom:0.5rem;">
        ${galleryLabels[index] || 'Gallery'}
      </div>
      <div style="font-family:'Orbitron',sans-serif;font-size:0.7rem;letter-spacing:0.3em;color:rgba(255,255,255,0.4);">
        FITNESS ESSENTIALS · T.NAGAR
      </div>
    </div>
  `;
  lb.classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  document.getElementById('lightbox').classList.remove('active');
  document.body.style.overflow = '';
}
window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

// ============================================================
// BACK TO TOP
// ============================================================
const backToTopBtn = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  backToTopBtn?.classList.toggle('visible', window.scrollY > 600);
}, { passive: true });
window.scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

// ============================================================
// CONTACT FORM (WhatsApp integration)
// ============================================================
window.submitForm = function () {
  const name = document.getElementById('cfName')?.value.trim();
  const phone = document.getElementById('cfPhone')?.value.trim();
  const program = document.getElementById('cfProgram')?.value;
  const message = document.getElementById('cfMessage')?.value.trim();

  if (!name || !phone) {
    showFormAlert('Please fill in your name and phone number.', 'error');
    return;
  }

  const msg = encodeURIComponent(
    `Hi Fitness Essentials! 👋\n\n` +
    `*Name:* ${name}\n` +
    `*Phone:* ${phone}\n` +
    `*Program:* ${program || 'Not specified'}\n` +
    `*Message:* ${message || 'I'd like to book a free trial.'}\n\n` +
    `I found you on your website and I'm interested in joining!`
  );
  window.open(`https://wa.me/918608111181?text=${msg}`, '_blank');
};

function showFormAlert(msg, type) {
  const existing = document.querySelector('.form-alert');
  if (existing) existing.remove();
  const alert = document.createElement('div');
  alert.className = 'form-alert';
  alert.style.cssText = `
    padding:0.8rem 1.2rem;
    border-radius:8px;
    font-family:'Rajdhani',sans-serif;
    font-size:0.9rem;
    margin-top:0.5rem;
    background:${type === 'error' ? 'rgba(255,50,50,0.15)' : 'rgba(37,211,102,0.15)'};
    border:1px solid ${type === 'error' ? 'rgba(255,50,50,0.4)' : 'rgba(37,211,102,0.4)'};
    color:${type === 'error' ? '#ff5555' : '#25d366'};
  `;
  alert.textContent = msg;
  document.getElementById('contactForm')?.appendChild(alert);
  setTimeout(() => alert.remove(), 4000);
}

// ============================================================
// GSAP SCROLL TRIGGERS (advanced)
// ============================================================
window.addEventListener('load', () => {
  if (!window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);

  // Section titles
  gsap.utils.toArray('.section-title').forEach(el => {
    gsap.fromTo(el,
      { opacity: 0, y: 60, filter: 'blur(10px)' },
      {
        opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%', once: true }
      }
    );
  });

  // Why cards stagger
  gsap.utils.toArray('.why-card').forEach((el, i) => {
    gsap.fromTo(el,
      { opacity: 0, y: 50, scale: 0.95 },
      {
        opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'power3.out',
        delay: i * 0.07,
        scrollTrigger: { trigger: el, start: 'top 88%', once: true }
      }
    );
  });

  // Program cards stagger
  gsap.utils.toArray('.program-card').forEach((el, i) => {
    gsap.fromTo(el,
      { opacity: 0, y: 40, rotateX: 10 },
      {
        opacity: 1, y: 0, rotateX: 0, duration: 0.65, ease: 'power3.out',
        delay: i * 0.05,
        scrollTrigger: { trigger: el, start: 'top 90%', once: true }
      }
    );
  });

  // Trainer cards
  gsap.utils.toArray('.trainer-card').forEach((el, i) => {
    gsap.fromTo(el,
      { opacity: 0, y: 60 },
      {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        delay: i * 0.15,
        scrollTrigger: { trigger: el, start: 'top 88%', once: true }
      }
    );
  });

  // Transform cards
  gsap.utils.toArray('.transform-card').forEach((el, i) => {
    gsap.fromTo(el,
      { opacity: 0, x: i % 2 === 0 ? -50 : 50 },
      {
        opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
        delay: i * 0.1,
        scrollTrigger: { trigger: el, start: 'top 88%', once: true }
      }
    );
  });

  // Plan cards
  gsap.utils.toArray('.plan-card').forEach((el, i) => {
    gsap.fromTo(el,
      { opacity: 0, y: 60, scale: 0.95 },
      {
        opacity: 1, y: 0, scale: el.classList.contains('plan-featured') ? 1.03 : 1,
        duration: 0.75, ease: 'power3.out',
        delay: i * 0.12,
        scrollTrigger: { trigger: el, start: 'top 88%', once: true }
      }
    );
  });

  // Gallery items
  gsap.utils.toArray('.gallery-item').forEach((el, i) => {
    gsap.fromTo(el,
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1, scale: 1, duration: 0.65, ease: 'power2.out',
        delay: i * 0.06,
        scrollTrigger: { trigger: el, start: 'top 90%', once: true }
      }
    );
  });

  // Stats number glow effect
  gsap.utils.toArray('.stat-num').forEach(el => {
    gsap.fromTo(el,
      { textShadow: 'none' },
      {
        textShadow: '0 0 30px rgba(0,245,255,0.5)',
        duration: 1, yoyo: true, repeat: 2, ease: 'power1.inOut',
        scrollTrigger: { trigger: el, start: 'top 80%', once: true }
      }
    );
  });
});

// ============================================================
// DYNAMIC BACKGROUND GRADIENT ON SCROLL
// ============================================================
(function initDynamicGradient() {
  const sections = [
    { id: 'home', color: 'rgba(0,0,0,0)' },
    { id: 'why', color: 'rgba(0,102,255,0.02)' },
    { id: 'programs', color: 'rgba(0,0,0,0)' },
    { id: 'stats', color: 'rgba(0,102,255,0.04)' },
    { id: 'membership', color: 'rgba(0,245,255,0.02)' },
  ];
  // Simple fade handled by section backgrounds in CSS
})();

// ============================================================
// ACTIVE NAV ON SCROLL
// ============================================================
(function initSmoothActiveNav() {
  const sectionIds = ['home', 'programs', 'trainers', 'membership', 'reviews', 'gallery', 'contact'];
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = sectionIds[0];
    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el && window.scrollY >= el.offsetTop - 120) current = id;
    });
    navLinks.forEach(l => {
      l.classList.toggle('active', l.getAttribute('href') === '#' + current);
    });
  }, { passive: true });
})();

// ============================================================
// LAZY LOADING / PERFORMANCE
// ============================================================
if ('IntersectionObserver' in window) {
  const lazyImages = document.querySelectorAll('img[data-src]');
  const imgObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        obs.unobserve(img);
      }
    });
  });
  lazyImages.forEach(img => imgObserver.observe(img));
}

// ============================================================
// PERFORMANCE: Reduce Three.js on mobile
// ============================================================
(function mobilePerf() {
  if (window.innerWidth < 768) {
    const canvas = document.getElementById('heroCanvas');
    if (canvas) canvas.style.opacity = '0.4';
  }
})();

console.log('%cFitness Essentials T.Nagar', 'color:#00f5ff;font-family:monospace;font-size:1.2rem;font-weight:bold;');
console.log('%c7/40 Ramakrishna Street, T.Nagar · +91 86081 11181', 'color:#0066ff;font-family:monospace;');
console.log('%cDesigned by Mohammed Asif · https://freelance-asif.vercel.app', 'color:#888;font-family:monospace;font-size:0.8rem;');
