/* ============================================================
   ORENVA — FUTURISTIC MAIN JS
   ============================================================ */
(function () {
  'use strict';

  const modules = [
    { id:"ai-doctor", title:"AI Doctor", eyebrow:"AI consultation", tagline:"Instant triage, intelligent care guidance, fewer physical visits.", description:"A clinically-minded AI consultation layer that helps users assess symptoms, understand next steps, and route into the right care pathway before they even step into a waiting room.", benefits:["Smart symptom triage with unified health context","Faster answers before in-person escalation","Continuous guidance that follows the user journey"], cta:"Explore consultations", accent:"#8f67ff", glow:"#d8c7ff", icon:"🩺", shape:"orb", position:[-3.8,1.8,-1.4], mobilePosition:[-1.7,1.2,-0.8] },
    { id:"pharmacy", title:"Pharmacy", eyebrow:"Medication fulfillment", tagline:"Prescriptions, refills, and pharmacy logistics inside one flow.", description:"orenva connects consultations to pharmacy actions so care plans move directly from recommendation to fulfillment without forcing users into fragmented systems.", benefits:["Integrated prescription and refill workflows","Fast medication discovery and ordering","Reduced friction between doctor, patient, and pharmacy"], cta:"Open pharmacy flow", accent:"#a975ff", glow:"#e4d6ff", icon:"💊", shape:"cube", position:[3.9,1.5,-1.8], mobilePosition:[1.7,1.1,-0.8] },
    { id:"diet-fitness", title:"Diet & Fitness", eyebrow:"Lifestyle intelligence", tagline:"Adaptive routines for nutrition, movement, and prevention.", description:"A dynamic coaching layer that turns health recommendations into everyday plans for meals, recovery, sleep, and movement based on the user's profile.", benefits:["Adaptive meal, movement, and recovery plans","Preventive insights guided by health context","Health goals linked to the broader care system"], cta:"View coaching", accent:"#7ad4ff", glow:"#d8f4ff", icon:"🥗", shape:"ring", position:[-4.3,-1.2,-1], mobilePosition:[-1.9,-0.4,-0.6] },
    { id:"therapy", title:"Therapy & Mental Health", eyebrow:"Emotional support", tagline:"Human-centered support for mood, resilience, and mental wellbeing.", description:"Therapy and wellbeing support sits alongside physical healthcare, helping orenva treat the user as a whole person rather than a list of disconnected issues.", benefits:["Mental wellbeing check-ins within the same platform","Support flows that feel empathetic, not clinical","A continuous bridge between emotional and physical care"], cta:"See support system", accent:"#ff9cc8", glow:"#ffe0ef", icon:"🧠", shape:"capsule", position:[0.1,-2.4,-2.1], mobilePosition:[0,-1.2,-0.8] },
    { id:"insurance", title:"Insurance", eyebrow:"Coverage intelligence", tagline:"Coverage and claims clarity built into the patient journey.", description:"Insurance becomes a readable, actionable layer inside the product so users can understand coverage and next steps without translating medical and administrative complexity on their own.", benefits:["Coverage-aware care recommendations","Reduced uncertainty around cost and claims","A simpler path from diagnosis to covered action"], cta:"Review coverage", accent:"#86b6ff", glow:"#dceaff", icon:"🛡️", shape:"diamond", position:[4.4,-1.4,-1.2], mobilePosition:[1.9,-0.4,-0.6] },
    { id:"store", title:"Supplements & Store", eyebrow:"Marketplace layer", tagline:"Supplements, proteins, and trusted health products in one ecosystem.", description:"The store layer extends the health journey into recommended products and wellness essentials, keeping product discovery aligned with personal health goals.", benefits:["Trusted wellness products alongside care insights","Contextual supplement and protein recommendations","One checkout mindset across care and commerce"], cta:"Enter marketplace", accent:"#ffcb7a", glow:"#fff0d4", icon:"✨", shape:"prism", position:[0.5,2.9,-2.5], mobilePosition:[0,2.1,-1] }
  ];

  /* ── INTRO GLOBE ANIMATION ─────────────────────────────── */
  function runIntro() {
    const introScreen = document.getElementById('intro-screen');
    const introCanvas = document.getElementById('intro-canvas');
    if (!introScreen || !introCanvas) { finishIntro(); return; }

    const W = introCanvas.width = window.innerWidth;
    const H = introCanvas.height = window.innerHeight;
    const ctx = introCanvas.getContext('2d');
    const cx = W / 2, cy = H / 2;
    const R = Math.min(W, H) * 0.22;

    // Health icons to orbit
    const icons = [
      { label:'🩺', angle:0,   orbit:1.0, speed:0.0042 },
      { label:'💊', angle:1.05, orbit:1.0, speed:-0.0038 },
      { label:'🧠', angle:2.09, orbit:1.0, speed:0.0035 },
      { label:'🛡️', angle:3.14, orbit:1.0, speed:-0.0044 },
      { label:'🥗', angle:4.19, orbit:1.0, speed:0.0040 },
      { label:'✨', angle:5.24, orbit:1.0, speed:-0.0036 },
      { label:'💪', angle:0.52, orbit:1.3, speed:0.0028 },
      { label:'🫀', angle:2.62, orbit:1.3, speed:-0.0031 },
      { label:'🌿', angle:4.71, orbit:1.3, speed:0.0029 },
    ];

    let frame = 0;
    let animationId;
    let phase = 'globe'; // globe → converge → logo
    let phaseTime = 0;
    let convergeStart = 300;
    let logoRevealTime = 420;

    const logoRevealEl = document.querySelector('.intro-logo-reveal');

    function drawGlobe(t, convergeFactor) {
      ctx.clearRect(0, 0, W, H);

      // Background
      const bgGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(W, H));
      bgGrad.addColorStop(0, '#1a0a3a');
      bgGrad.addColorStop(1, '#07041a');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, W, H);

      // Star field
      ctx.save();
      for (let i = 0; i < 120; i++) {
        const sx = (Math.sin(i * 31.7 + t * 0.0001) * 0.5 + 0.5) * W;
        const sy = (Math.cos(i * 57.3 + t * 0.00008) * 0.5 + 0.5) * H;
        const alpha = (Math.sin(i * 2.1 + t * 0.002) * 0.5 + 0.5) * 0.6 + 0.1;
        const size = Math.random() < 0.1 ? 2 : 1;
        ctx.beginPath();
        ctx.arc(sx, sy, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200,180,255,${alpha * (1 - convergeFactor * 0.8)})`;
        ctx.fill();
      }
      ctx.restore();

      // Globe glow
      const glowScale = 1 + convergeFactor * 0.4;
      const globeGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 2 * glowScale);
      globeGlow.addColorStop(0, `rgba(168,85,247,${0.24 + convergeFactor * 0.3})`);
      globeGlow.addColorStop(0.5, `rgba(124,58,255,${0.08 + convergeFactor * 0.15})`);
      globeGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = globeGlow;
      ctx.beginPath();
      ctx.arc(cx, cy, R * 2.5 * glowScale, 0, Math.PI * 2);
      ctx.fill();

      // Globe sphere
      const sphereGrad = ctx.createRadialGradient(cx - R * 0.3, cy - R * 0.3, R * 0.1, cx, cy, R);
      sphereGrad.addColorStop(0, `rgba(220, 180, 255, ${0.32 - convergeFactor * 0.25})`);
      sphereGrad.addColorStop(0.5, `rgba(140, 80, 220, ${0.25 - convergeFactor * 0.18})`);
      sphereGrad.addColorStop(1, `rgba(80, 30, 160, ${0.15 - convergeFactor * 0.1})`);
      ctx.fillStyle = sphereGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, R * (1 - convergeFactor * 0.5), 0, Math.PI * 2);
      ctx.fill();

      // Globe latitude lines
      ctx.save();
      ctx.globalAlpha = Math.max(0, 0.22 - convergeFactor * 0.22);
      const rotY = t * 0.008;
      for (let lat = -80; lat <= 80; lat += 30) {
        const latRad = (lat * Math.PI) / 180;
        const r2 = R * Math.cos(latRad);
        const y2 = cy + R * Math.sin(latRad);
        ctx.beginPath();
        ctx.ellipse(cx, y2, r2, r2 * 0.22, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(200,160,255,0.4)`;
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }
      for (let lon = 0; lon < 360; lon += 45) {
        const lonRad = ((lon + rotY * 57.3) * Math.PI) / 180;
        ctx.beginPath();
        const steps = 36;
        for (let i = 0; i <= steps; i++) {
          const phi = (i / steps) * Math.PI - Math.PI / 2;
          const x2 = cx + R * Math.cos(phi) * Math.cos(lonRad);
          const y2 = cy + R * Math.sin(phi);
          i === 0 ? ctx.moveTo(x2, y2) : ctx.lineTo(x2, y2);
        }
        ctx.strokeStyle = `rgba(200,160,255,0.25)`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
      ctx.restore();

      // Orbiting icons
      const iconR = R * 1.7;
      icons.forEach(function (ic) {
        ic.angle += ic.speed;
        const orbitRadius = R * ic.orbit * 1.7;
        const convergeX = cx + (Math.cos(ic.angle) * orbitRadius) * (1 - convergeFactor);
        const convergeY = cy + (Math.sin(ic.angle) * orbitRadius * 0.55) * (1 - convergeFactor);
        const iconAlpha = Math.max(0, 1 - convergeFactor * 2);
        const iconScale = 1 - convergeFactor * 0.6;
        
        if (iconAlpha > 0.01) {
          ctx.save();
          ctx.globalAlpha = iconAlpha;
          ctx.font = `${Math.round(20 * iconScale)}px serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          // Glow behind icon
          ctx.shadowColor = 'rgba(168,85,247,0.8)';
          ctx.shadowBlur = 12;
          ctx.fillText(ic.label, convergeX, convergeY);
          ctx.restore();
        }
      });

      // Center orb pulse (grows as we converge)
      if (convergeFactor > 0) {
        const orbR = R * 0.18 * (1 + convergeFactor * 3);
        const orbGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, orbR * 2.5);
        orbGlow.addColorStop(0, `rgba(220,180,255,${convergeFactor * 0.9})`);
        orbGlow.addColorStop(0.4, `rgba(168,85,247,${convergeFactor * 0.6})`);
        orbGlow.addColorStop(1, 'transparent');
        ctx.fillStyle = orbGlow;
        ctx.beginPath();
        ctx.arc(cx, cy, orbR * 2.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(240,220,255,${convergeFactor * 0.95})`;
        ctx.beginPath();
        ctx.arc(cx, cy, orbR, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function animate() {
      frame++;
      phaseTime++;

      let convergeFactor = 0;
      if (frame > convergeStart) {
        convergeFactor = Math.min(1, (frame - convergeStart) / 90);
      }

      drawGlobe(frame, convergeFactor);

      if (frame === logoRevealTime && logoRevealEl) {
        logoRevealEl.classList.add('visible');
      }

      if (frame < logoRevealTime + 200) {
        animationId = requestAnimationFrame(animate);
      } else {
        // Keep last frame
        cancelAnimationFrame(animationId);
      }
    }

    animate();
  }

  function finishIntro() {
    const introScreen = document.getElementById('intro-screen');
    if (introScreen) {
      introScreen.classList.add('fade-out');
      setTimeout(function () {
        introScreen.style.display = 'none';
        introScreen.remove();
      }, 1000);
    }
    document.body.style.overflow = '';
    initSite();
  }

  // Attach enter button
  const enterBtn = document.getElementById('intro-enter-btn');
  if (enterBtn) {
    enterBtn.addEventListener('click', finishIntro);
  }

  /* Start intro if on home page */
  const introScreen = document.getElementById('intro-screen');
  if (introScreen) {
    document.body.style.overflow = 'hidden';
    runIntro();
  } else {
    initSite();
  }

  /* ── MAIN SITE INIT ───────────────────────────────────── */
  function initSite() {
    setupCursor();
    setupMouseGradient();
    setupThemeToggle();
    setupMenu();
    setupHeaderScroll();
    setupScrollProgress();
    setupReveal();
    setupWaitlistForms();
    setupPanel();
    setupModuleButtons();
    highlightCurrentPage();

    const state = { activated: false, activeModuleId: null };
    const root = document.documentElement;
    const body = document.body;

    const activationStatus = document.getElementById('activationStatus');
    const activationDetail = document.getElementById('activationDetail');
    const currentFocusTitle = document.getElementById('currentFocusTitle');
    const currentFocusText = document.getElementById('currentFocusText');
    const panelBackdrop = document.getElementById('panelBackdrop');
    const panel = document.getElementById('modulePanel');
    const panelClose = document.getElementById('panelClose');
    const panelEyebrow = document.getElementById('panelEyebrow');
    const panelTitle = document.getElementById('panelTitle');
    const panelTagline = document.getElementById('panelTagline');
    const panelGradient = document.getElementById('panelGradient');
    const panelDescription = document.getElementById('panelDescription');
    const panelBenefits = document.getElementById('panelBenefits');
    const panelCta = document.getElementById('panelCta');
    const themeToggles = Array.from(document.querySelectorAll('[data-theme-toggle]'));

    const sceneController = initHeroScene();
    updateUi();

    function getModule(id) { return modules.find(function(m){ return m.id === id; }) || null; }
    function getCurrentTheme() { return root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'; }

    function applyTheme(theme, persist) {
      if (theme === 'dark') { root.setAttribute('data-theme', 'dark'); }
      else { root.removeAttribute('data-theme'); }
      if (persist) { try { localStorage.setItem('orenva-theme', theme); } catch(e){} }
      themeToggles.forEach(function(btn){
        btn.setAttribute('aria-pressed', String(theme === 'dark'));
        const lbl = btn.querySelector('.theme-toggle-text');
        if (lbl) lbl.textContent = theme === 'dark' ? 'Light mode' : 'Dark mode';
      });
      if (sceneController && sceneController.setTheme) sceneController.setTheme(theme);
    }

    function setupThemeToggle() {
      applyTheme(getCurrentTheme(), false);
      themeToggles.forEach(function(btn){
        btn.addEventListener('click', function(){
          applyTheme(getCurrentTheme() === 'dark' ? 'light' : 'dark', true);
        });
      });
    }

    function activateExperience() {
      state.activated = true;
      body.classList.add('body-activated');
      updateUi();
      if (sceneController && sceneController.activate) sceneController.activate();
    }

    function openModule(id) {
      const mod = getModule(id);
      if (!mod || !panel) return;
      state.activeModuleId = id;
      if (panelEyebrow) panelEyebrow.textContent = mod.eyebrow;
      if (panelTitle) panelTitle.textContent = mod.title;
      if (panelTagline) panelTagline.textContent = mod.tagline;
      if (panelGradient) panelGradient.style.background = `linear-gradient(90deg, ${mod.accent}, ${mod.glow}, transparent)`;
      if (panelDescription) panelDescription.textContent = mod.description;
      if (panelBenefits) {
        panelBenefits.innerHTML = '';
        mod.benefits.forEach(function(b){
          const li = document.createElement('li');
          li.textContent = b;
          panelBenefits.appendChild(li);
        });
      }
      if (panelCta) panelCta.textContent = mod.cta;
      panel.classList.add('open');
      panel.setAttribute('aria-hidden', 'false');
      if (panelBackdrop) panelBackdrop.classList.add('open');
      updateUi();
    }

    function closePanel() {
      state.activeModuleId = null;
      if (panel) { panel.classList.remove('open'); panel.setAttribute('aria-hidden', 'true'); }
      if (panelBackdrop) panelBackdrop.classList.remove('open');
      updateUi();
    }

    function updateUi() {
      if (activationStatus) activationStatus.style.background = state.activated ? '#7fffa4' : '';
      if (activationDetail) activationDetail.textContent = state.activated
        ? (state.activeModuleId ? 'Module active' : 'Ecosystem activated — hover a node')
        : 'Click the orb to activate the ecosystem';
      const mod = getModule(state.activeModuleId);
      if (currentFocusTitle) currentFocusTitle.textContent = mod ? mod.title : '';
      if (currentFocusText) currentFocusText.textContent = mod ? mod.tagline : '';
    }

    function setupPanel() {
      if (panelClose) panelClose.addEventListener('click', closePanel);
      if (panelBackdrop) panelBackdrop.addEventListener('click', closePanel);
      document.addEventListener('keydown', function(e){ if (e.key === 'Escape') closePanel(); });
    }

    function setupModuleButtons() {
      const activateButtons = Array.from(document.querySelectorAll('[data-activate]'));
      const moduleButtons = Array.from(document.querySelectorAll('[data-module]'));
      activateButtons.forEach(function(btn){
        btn.addEventListener('click', activateExperience);
      });
      moduleButtons.forEach(function(btn){
        btn.addEventListener('click', function(){
          if (!state.activated) { activateExperience(); return; }
          const id = btn.getAttribute('data-module');
          if (id) openModule(id);
        });
      });
    }

    /* ── THREE.JS SCENE ─────────────────────────────────── */
    function initHeroScene() {
      const canvas = document.getElementById('sceneCanvas');
      if (!canvas || typeof THREE === 'undefined') return null;

      const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setClearColor(0x000000, 0);

      const scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2('#f4ecff', 0.08);

      const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
      camera.position.set(0, 0, 8.2);

      let isMobile = window.matchMedia('(max-width: 820px)').matches;
      const clock = new THREE.Clock();
      const pointer = new THREE.Vector2(3, 3);
      const raycaster = new THREE.Raycaster();
      const desiredCameraPosition = new THREE.Vector3(0, 0, 8.2);
      const desiredLookAt = new THREE.Vector3(0, 0.05, 0);
      const smoothLookAt = new THREE.Vector3(0, 0.05, 0);
      const hoverState = { role: null, moduleId: null };
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const interactiveObjects = [];

      // Lights
      const ambientLight = new THREE.AmbientLight('#ffffff', 1.3);
      scene.add(ambientLight);
      const keyLight = new THREE.DirectionalLight('#fff8ff', 1.9);
      keyLight.position.set(3, 5, 4);
      scene.add(keyLight);
      const fillLight = new THREE.DirectionalLight('#d2bcff', 0.46);
      fillLight.position.set(-4, -2, 2);
      scene.add(fillLight);

      // Central orb
      const orbGroup = new THREE.Group();
      scene.add(orbGroup);

      const orbGeo = new THREE.SphereGeometry(1.12, 64, 64);
      const orbMaterial = new THREE.MeshPhysicalMaterial({
        color: '#eadcff', emissive: '#af84ff', emissiveIntensity: 0.24,
        metalness: 0.1, roughness: 0.18, transmission: 0.45, thickness: 1.2,
        transparent: true, opacity: 0.88
      });
      const orbMesh = new THREE.Mesh(orbGeo, orbMaterial);
      orbMesh.userData.role = 'activate';
      orbGroup.add(orbMesh);
      interactiveObjects.push(orbMesh);

      const orbLight = new THREE.PointLight('#bd8cff', 11, 10);
      orbGroup.add(orbLight);

      // Rings
      const ringMat = new THREE.MeshPhysicalMaterial({ color: '#c8a8ff', emissive: '#9966ff', emissiveIntensity: 0.18, metalness: 0.2, roughness: 0.3, transparent: true, opacity: 0.55 });
      const ringOne = new THREE.Mesh(new THREE.TorusGeometry(1.88, 0.028, 12, 80), ringMat);
      ringOne.rotation.x = 0.88;
      orbGroup.add(ringOne);
      const ringTwo = new THREE.Mesh(new THREE.TorusGeometry(2.4, 0.018, 12, 80), ringMat.clone());
      ringTwo.rotation.x = -0.6;
      ringTwo.rotation.y = 0.4;
      orbGroup.add(ringTwo);

      // Pulse rings
      const pulseGroup = new THREE.Group();
      orbGroup.add(pulseGroup);
      const pulseMaterials = [];
      [0, 1].forEach(function(i){
        const pm = new THREE.MeshBasicMaterial({ color: i === 0 ? '#f8f1ff' : '#b889ff', transparent: true, opacity: 0, side: THREE.DoubleSide });
        pulseMaterials.push(pm);
        const pr = new THREE.Mesh(new THREE.RingGeometry(1.6 + i * 0.2, 1.7 + i * 0.2, 64), pm);
        pulseGroup.add(pr);
      });

      // Particles
      const particleCount = 520;
      const posArray = new Float32Array(particleCount * 3);
      for (let i = 0; i < particleCount * 3; i++) posArray[i] = (Math.random() - 0.5) * 18;
      const particleGeo = new THREE.BufferGeometry();
      particleGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
      const particleMaterial = new THREE.PointsMaterial({ color: '#ffffff', size: 0.04, transparent: true, opacity: 0.72 });
      const particles = new THREE.Points(particleGeo, particleMaterial);
      scene.add(particles);

      // Module nodes
      const moduleObjects = [];
      modules.forEach(function(data){
        const group = new THREE.Group();
        group.position.set(0, 0, 0);
        group.scale.setScalar(0.02);
        scene.add(group);

        const geo = createModuleGeometry(data.shape);
        const mat = new THREE.MeshPhysicalMaterial({
          color: data.accent, emissive: data.accent, emissiveIntensity: 0.22,
          metalness: 0.2, roughness: 0.25, transparent: true, opacity: 0.9
        });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.userData.moduleId = data.id;
        group.add(mesh);
        interactiveObjects.push(mesh);

        const glowMat = new THREE.MeshBasicMaterial({ color: data.glow, transparent: true, opacity: 0.12, side: THREE.BackSide });
        const glowMesh = new THREE.Mesh(geo, glowMat);
        glowMesh.scale.setScalar(1.3);
        group.add(glowMesh);

        const modLight = new THREE.PointLight(data.accent, 2.8, 4);
        group.add(modLight);

        moduleObjects.push({
          data: data, group: group, material: mat, glowMaterial: glowMat,
          light: modLight, phase: Math.random() * Math.PI * 2,
          targetPosition: new THREE.Vector3(),
          targetScale: new THREE.Vector3(0.02, 0.02, 0.02)
        });
      });

      function activateScene() {
        state.activated = true;
      }

      function applySceneTheme(theme) {
        const dark = theme === 'dark';
        scene.fog.color.set(dark ? '#110d1f' : '#f4ecff');
        ambientLight.color.set(dark ? '#e7d9ff' : '#ffffff');
        ambientLight.intensity = dark ? 1.02 : 1.3;
        keyLight.color.set(dark ? '#bb9cff' : '#fff8ff');
        keyLight.intensity = dark ? 1.36 : 1.9;
        fillLight.color.set(dark ? '#765db2' : '#d2bcff');
        fillLight.intensity = dark ? 0.62 : 0.46;
        particleMaterial.color.set(dark ? '#dac8ff' : '#ffffff');
        particleMaterial.opacity = dark ? 0.6 : 0.72;
        orbMaterial.color.set(dark ? '#dac5ff' : '#eadcff');
        orbMaterial.emissive.set(dark ? '#956aff' : '#af84ff');
        orbLight.color.set(dark ? '#a682ff' : '#bd8cff');
        pulseMaterials.forEach(function(m, i){
          m.color.set(i === 0 ? (dark ? '#e9deff' : '#f8f1ff') : (dark ? '#9f79ff' : '#b889ff'));
        });
      }

      function resolvePointer(event) {
        const rect = canvas.getBoundingClientRect();
        pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      }

      canvas.addEventListener('pointermove', resolvePointer);
      canvas.addEventListener('pointerleave', function(){
        pointer.set(3, 3);
        hoverState.role = null;
        hoverState.moduleId = null;
        canvas.style.cursor = 'none';
      });
      canvas.addEventListener('click', function(){
        if (hoverState.role === 'activate') activateExperience();
        if (hoverState.moduleId) openModule(hoverState.moduleId);
      });

      function refreshHover() {
        raycaster.setFromCamera(pointer, camera);
        const hits = raycaster.intersectObjects(interactiveObjects, true);
        hoverState.role = null;
        hoverState.moduleId = null;
        if (hits.length) {
          let target = hits[0].object;
          while (target) {
            if (target.userData.role === 'activate') { hoverState.role = 'activate'; break; }
            if (target.userData.moduleId) { hoverState.role = 'module'; hoverState.moduleId = target.userData.moduleId; break; }
            target = target.parent;
          }
        }
        canvas.style.cursor = hoverState.role ? 'pointer' : 'none';
      }

      function resize() {
        const width = canvas.clientWidth || window.innerWidth;
        const height = canvas.clientHeight || window.innerHeight;
        isMobile = window.matchMedia('(max-width: 820px)').matches;
        camera.fov = isMobile ? 50 : 42;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2));
        renderer.setSize(width, height, false);
      }

      function syncSceneInteractivity() {
        canvas.style.pointerEvents = window.scrollY < window.innerHeight * 0.92 ? 'auto' : 'none';
      }

      function animate() {
        const delta = Math.min(clock.getDelta(), 0.05);
        const elapsed = clock.elapsedTime;

        refreshHover();

        const px = pointer.x === 3 ? 0 : pointer.x;
        const py = pointer.y === 3 ? 0 : pointer.y;
        const pix = px * (isMobile ? 0.22 : 0.48);
        const piy = py * (isMobile ? 0.12 : 0.24);
        const activeMod = getModule(state.activeModuleId);
        const activePos = activeMod ? (isMobile ? activeMod.mobilePosition : activeMod.position) : null;

        if (activePos) {
          desiredCameraPosition.set(activePos[0]*0.42+pix, activePos[1]*0.18-piy+0.12, isMobile ? 5.35 : 6.2);
          desiredLookAt.set(activePos[0]*0.28, activePos[1]*0.08, activePos[2]);
        } else {
          desiredCameraPosition.set(pix, (state.activated ? 0.18 : 0.04) - piy, isMobile ? 6.7 : 8.2);
          desiredLookAt.set(0, 0.05, 0);
        }

        const damp = 1 - Math.exp(-delta * 2.4);
        camera.position.lerp(desiredCameraPosition, damp);
        smoothLookAt.lerp(desiredLookAt, damp);
        camera.lookAt(smoothLookAt);

        const orbScaleTarget = state.activated ? (hoverState.role === 'activate' ? 1.16 : 1.08) : (hoverState.role === 'activate' ? 1.05 : 0.98);
        orbGroup.scale.lerp(new THREE.Vector3(orbScaleTarget, orbScaleTarget, orbScaleTarget), 1 - Math.exp(-delta * 4));
        orbGroup.rotation.y += delta * 0.26;
        orbGroup.position.y = reducedMotion ? 0 : Math.sin(elapsed * 0.85) * 0.14;
        ringOne.rotation.x += delta * 0.24;
        ringOne.rotation.y += delta * 0.38;
        ringTwo.rotation.x -= delta * 0.18;
        ringTwo.rotation.z += delta * 0.26;
        orbMaterial.emissiveIntensity = state.activated ? 0.42 : 0.24;
        orbLight.intensity = state.activated ? 16 : 11;

        pulseGroup.visible = state.activated;
        pulseGroup.children.forEach(function(ring, idx){
          const t2 = (elapsed * 0.55 + idx * 0.22) % 1;
          ring.scale.setScalar(0.84 + t2 * 1.6);
          pulseMaterials[idx].opacity = (1 - t2) * 0.2;
        });

        particles.rotation.y += delta * 0.04;
        particles.rotation.x = reducedMotion ? 0 : Math.sin(elapsed * 0.12) * 0.08;

        moduleObjects.forEach(function(item){
          const anchor = isMobile ? item.data.mobilePosition : item.data.position;
          const hovered = hoverState.moduleId === item.data.id;
          const active = state.activeModuleId === item.data.id;
          const drift = reducedMotion ? 0 : Math.sin(elapsed * 0.9 + item.phase) * 0.22;
          const targetScale = state.activated ? (active ? 1.18 : hovered ? 1.08 : 0.96) : 0.02;
          const targetZ = state.activated ? anchor[2] : 0;

          item.targetPosition.set(anchor[0], anchor[1] + drift, targetZ);
          item.targetScale.setScalar(targetScale);

          const d2 = 1 - Math.exp(-delta * 3.1);
          item.group.position.lerp(item.targetPosition, d2);
          item.group.scale.lerp(item.targetScale, d2);
          item.group.rotation.y += delta * (active ? 0.72 : 0.32);
          item.group.rotation.x = THREE.MathUtils.lerp(item.group.rotation.x, hovered ? 0.18 : 0.06, d2);
          item.material.emissiveIntensity = active ? 0.52 : hovered ? 0.34 : 0.22;
          item.glowMaterial.opacity = active ? 0.24 : hovered ? 0.18 : 0.12;
          item.light.intensity = active ? 6.8 : hovered ? 4.5 : 2.8;
        });

        renderer.render(scene, camera);
        requestAnimationFrame(animate);
      }

      window.addEventListener('resize', resize);
      window.addEventListener('scroll', syncSceneInteractivity, { passive: true });
      resize();
      syncSceneInteractivity();
      applySceneTheme(getCurrentTheme());
      animate();

      return { setTheme: applySceneTheme, activate: activateScene };
    }

    function createModuleGeometry(shape) {
      switch (shape) {
        case 'cube': return new THREE.BoxGeometry(1.26,1.26,1.26,4,4,4);
        case 'diamond': return new THREE.OctahedronGeometry(0.94,0);
        case 'capsule': return typeof THREE.CapsuleGeometry === 'function' ? new THREE.CapsuleGeometry(0.42,0.96,8,16) : new THREE.CylinderGeometry(0.42,0.42,1.5,20);
        case 'ring': return new THREE.TorusGeometry(0.72,0.24,18,72);
        case 'prism': return new THREE.CylinderGeometry(0.65,0.92,1.34,6);
        default: return new THREE.SphereGeometry(0.9,36,36);
      }
    }

    /* ── CURSOR ──────────────────────────────────────────── */
    function setupCursor() {
      if (window.matchMedia('(max-width: 820px)').matches) return;
      const dot = document.createElement('div');
      dot.className = 'cursor-dot';
      const ring = document.createElement('div');
      ring.className = 'cursor-ring';
      document.body.appendChild(dot);
      document.body.appendChild(ring);

      let mx = -100, my = -100;
      let rx = -100, ry = -100;

      document.addEventListener('mousemove', function(e){
        mx = e.clientX; my = e.clientY;
        dot.style.left = mx + 'px';
        dot.style.top = my + 'px';
      });

      function animateCursor() {
        rx += (mx - rx) * 0.14;
        ry += (my - ry) * 0.14;
        ring.style.left = rx + 'px';
        ring.style.top = ry + 'px';
        requestAnimationFrame(animateCursor);
      }
      animateCursor();

      document.querySelectorAll('a, button, [data-activate], [data-module]').forEach(function(el){
        el.addEventListener('mouseenter', function(){ ring.classList.add('hover'); });
        el.addEventListener('mouseleave', function(){ ring.classList.remove('hover'); });
      });
    }

    /* ── MOUSE GRADIENT ─────────────────────────────────── */
    function setupMouseGradient() {
      const overlay = document.querySelector('.mouse-gradient');
      if (!overlay) return;
      document.addEventListener('mousemove', function(e){
        const px = (e.clientX / window.innerWidth * 100).toFixed(1);
        const py = (e.clientY / window.innerHeight * 100).toFixed(1);
        root.style.setProperty('--mx', px + '%');
        root.style.setProperty('--my', py + '%');
      });
    }

    /* ── HEADER SCROLL ──────────────────────────────────── */
    function setupHeaderScroll() {
      const header = document.querySelector('.site-header');
      if (!header) return;
      function onScroll(){
        header.classList.toggle('scrolled', window.scrollY > 20);
      }
      window.addEventListener('scroll', onScroll, { passive: true });
    }

    /* ── SCROLL PROGRESS ────────────────────────────────── */
    function setupScrollProgress() {
      const bar = document.createElement('div');
      bar.className = 'scroll-progress';
      document.body.appendChild(bar);
      window.addEventListener('scroll', function(){
        const pct = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100).toFixed(1);
        root.style.setProperty('--scroll-pct', pct + '%');
      }, { passive: true });
    }

    /* ── MENU ────────────────────────────────────────────── */
    function setupMenu() {
      const toggle = document.querySelector('[data-menu-toggle]');
      if (!toggle) return;
      toggle.addEventListener('click', function(){
        const isOpen = document.body.classList.toggle('menu-open');
        toggle.setAttribute('aria-expanded', String(isOpen));
      });
      document.querySelectorAll('.site-nav a').forEach(function(a){
        a.addEventListener('click', function(){
          document.body.classList.remove('menu-open');
          toggle.setAttribute('aria-expanded', 'false');
        });
      });
    }

    /* ── REVEAL ──────────────────────────────────────────── */
    function setupReveal() {
      const items = Array.from(document.querySelectorAll('[data-reveal]'));
      if (!items.length) return;
      const obs = new IntersectionObserver(function(entries){
        entries.forEach(function(e){
          if (e.isIntersecting) { e.target.classList.add('revealed'); obs.unobserve(e.target); }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
      items.forEach(function(el){ obs.observe(el); });
    }

    /* ── WAITLIST FORMS ─────────────────────────────────── */
    function setupWaitlistForms() {
      document.querySelectorAll('[data-waitlist-form]').forEach(function(form){
        form.addEventListener('submit', function(e){
          e.preventDefault();
          const fb = form.closest('form, section, article, div').querySelector('[data-waitlist-feedback]') ||
                     form.parentElement.querySelector('[data-waitlist-feedback]');
          const input = form.querySelector('input[type="email"]');
          if (fb) fb.textContent = '✓ You\'re on the list. We\'ll be in touch soon.';
          if (input) { input.value = ''; input.blur(); }
        });
      });
    }

    /* ── HIGHLIGHT CURRENT PAGE ─────────────────────────── */
    function highlightCurrentPage() {
      const path = window.location.pathname.split('/').pop() || 'index.html';
      document.querySelectorAll('.site-nav a').forEach(function(a){
        const href = a.getAttribute('href') || '';
        if (href.startsWith(path) || (path === 'index.html' && (href === '#hero' || href.startsWith('index.html')))) {
          a.classList.add('active-link');
        }
      });
    }
  } // end initSite

})();
