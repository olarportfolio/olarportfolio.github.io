/* ============================================================
   main.js - shared behaviour for every page.
   Reads everything it renders from data.js.
   ============================================================ */

/* ---------- Inline icons (no external requests) ---------- */
const ICON = {
  instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="2.5" width="19" height="19" rx="5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.6" cy="6.4" r="1.1" fill="currentColor" stroke="none"/></svg>',
  mail: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M2 5.4A1.4 1.4 0 0 1 3.4 4h17.2A1.4 1.4 0 0 1 22 5.4v13.2a1.4 1.4 0 0 1-1.4 1.4H3.4A1.4 1.4 0 0 1 2 18.6V5.4Zm2.3.6 7.7 6 7.7-6H4.3Z"/></svg>',
  chevron: '<svg viewBox="0 0 52 30" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3l23 24L49 3"/></svg>',
  play: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 3.6 20.4 12 6 20.4V3.6Z"/></svg>',
  arrowUp: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20V4"/><path d="M5 11l7-7 7 7"/></svg>',
  copy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></svg>',
  caretLeft:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 4 7 12l8 8"/></svg>',
  caretRight: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 4l8 8-8 8"/></svg>'
};

/* ---------- Logo -------------------------------------------------
   The real OLAR lockup, exported white-on-transparent from the
   corporate design files (CD of OLAR / Afg-2-Finale-Logo).

   Two versions: the full lockup, and the mark alone for when the
   header contracts on scroll.
   ----------------------------------------------------------------- */
const LOGO_SVG = `
  <img class="logo-full" src="assets/img/logo-olar.webp" alt="OLAR" width="700" height="288">
  <img class="logo-mark" src="assets/img/logo-mark.webp" alt="" aria-hidden="true" width="320" height="324">`;

/* The three pages, used to build the burger menu contextually. */
const PAGES = [
  { id: 'work',    href: 'index.html',   label: 'Work' },
  { id: 'about',   href: 'about.html',   label: 'About me' },
  { id: 'contact', href: 'contact.html', label: 'Contact' }
];

/* ---------- Helpers ---------- */
const $ = (sel, root = document) => root.querySelector(sel);
const getCategory = (id) => CATEGORIES.find(c => c.id === id);

/* A thumbnail: real image if `image` is set, dummy rectangle if null. */
function thumb(image, ratio, label) {
  const inner = image
    ? `<img src="${image}" alt="${label}" loading="lazy">`
    : `<div class="ph"><span class="ph-label">${label}</span></div>`;
  return `<div class="thumb ${ratio}">${inner}</div>`;
}

/* ---------- Header / footer (single source of truth) ---------- */
function renderChrome() {
  const page = document.body.dataset.page;
  const active = (p) => p === page ? ' class="is-active"' : '';
  const ig = SITE.contact.links.instagram;

  // On phones the three links collapse into the burger, which lists
  // only the pages you are NOT on.
  const elsewhere = PAGES.filter(p => p.id !== page);

  document.body.insertAdjacentHTML('afterbegin', `
    <header class="site-header">
      <nav class="nav-main">
        <a href="index.html"${active('work')}>Work</a>
        <a href="about.html"${active('about')}>About me</a>
        <a href="contact.html"${active('contact')}>Contact</a>
      </nav>
      <a class="logo" href="index.html" aria-label="Home">${LOGO_SVG}</a>
      <div class="nav-social">
        ${ig ? `<a href="${ig}" target="_blank" rel="noopener" aria-label="Instagram">${ICON.instagram}</a>` : ''}
        <a href="contact.html" aria-label="Contact">${ICON.mail}</a>
      </div>
    </header>
    <!-- Outside the header on purpose: the header hides itself as you
         scroll, and the way back to the other pages must not go with it. -->
    <button class="burger" aria-label="Open menu" aria-expanded="false" aria-controls="menu-panel">
      <span></span><span></span><span></span>
    </button>
    <nav class="menu-panel" id="menu-panel" aria-label="Pages">
      ${elsewhere.map(p => `<a href="${p.href}">${p.label}</a>`).join('')}
    </nav>`);

  wireBurger();

  document.body.insertAdjacentHTML('beforeend', `
    <button class="to-top" aria-label="Back to top">${ICON.arrowUp}</button>`);

  const toTop = $('.to-top');
  const header = $('.site-header');
  toTop.addEventListener('click', () =>
    window.scrollTo({ top: 0, behavior: 'smooth' }));

  // The header contracts to just the mark once you leave the top, and
  // expands again at the top or on hover (the hover half is CSS).
  // On phones it goes further: it slides away entirely while you scroll
  // down and comes back the moment you scroll up.
  let lastY = window.scrollY;
  const onScroll = () => {
    const y = window.scrollY;
    toTop.classList.toggle('is-visible', y > 600);
    header.classList.toggle('is-compact', y > 90);

    const down = y > lastY;
    if (y < 60) header.classList.remove('is-hidden');
    else if (Math.abs(y - lastY) > 4) header.classList.toggle('is-hidden', down);
    lastY = y;
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ---------- Burger menu (phones) ---------- */
function wireBurger() {
  const burger = $('.burger');
  const panel  = $('.menu-panel');
  if (!burger || !panel) return;

  const setOpen = (open) => {
    document.body.classList.toggle('menu-open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  };

  burger.addEventListener('click', () =>
    setOpen(!document.body.classList.contains('menu-open')));
  panel.addEventListener('click', e => { if (e.target.tagName === 'A') setOpen(false); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setOpen(false); });
  // leaving phone width should never strand the panel open
  matchMedia('(max-width: 680px)').addEventListener('change', e => { if (!e.matches) setOpen(false); });
}

/* ---------- Hero (fades out as you scroll) ---------- */
function renderHero() {
  const wrap = $('#hero');
  if (!wrap) return;
  const ig = SITE.contact.links.instagram;

  wrap.innerHTML = `
    <div class="hero-wrap">
      <section class="hero">
        <h1>${SITE.heroTitle}</h1>
        <p class="hero-sub">${SITE.heroSubtitle}</p>
        <div class="hero-social">
          ${ig ? `<a href="${ig}" target="_blank" rel="noopener" aria-label="Instagram">${ICON.instagram}</a>` : ''}
          <a href="contact.html" aria-label="Contact">${ICON.mail}</a>
        </div>
        <!-- phones get a chase of three arrows instead of the mail icon -->
        <div class="hero-arrows" aria-hidden="true">
          ${ICON.chevron}${ICON.chevron}${ICON.chevron}
        </div>
      </section>
      <div class="hero-chevron">${ICON.chevron}</div>
    </div>`;

  const hero = $('.hero', wrap);
  const work = $('#work-grid');
  const fade = () => {
    const phone = matchMedia(MOBILE).matches;
    // A phone page is barely taller than its hero, so the handover has
    // to finish inside roughly a third of a screen - over 0.7 it never
    // completes and both halves sit permanently half-faded.
    const span = window.innerHeight * (phone ? 0.32 : 0.7);
    const t = Math.min(window.scrollY / span, 1);
    hero.style.opacity = String(1 - t);
    $('.hero-chevron', wrap).style.opacity = String(0.8 * (1 - t));
    // On phones the categories fade in as the hero fades out, so the
    // two never sit on screen at half strength together.
    if (work) {
      work.style.opacity = phone
        ? String(Math.min(1, Math.max(0, (t - 0.1) * 1.6)))
        : '';
    }
  };
  window.addEventListener('scroll', fade, { passive: true });
  fade();
}

/* ---------- Work grid: one tile per category ----------
   A grid on desktop; on phones the same tiles become a looping,
   swipeable carousel, since a seven-tile column is a long scroll.  */
const MOBILE = '(max-width: 680px)';

const tileHTML = c => `
  <a class="tile" href="category.html?c=${c.id}">
    ${thumb(c.cover, 'ratio-4x3', c.title + ' - cover')}
    <div class="tile-overlay">
      <h3>${c.title}</h3>
      <span>${c.year}</span>
    </div>
  </a>`;

function renderWorkGrid() {
  const el = $('#work-grid');
  if (!el) return;

  const paint = () => {
    const phone = matchMedia(MOBILE).matches;
    const mode  = phone ? 'carousel' : 'grid';
    if (el.dataset.mode === mode) return;        // nothing to rebuild
    el.dataset.mode = mode;

    const tiles = CATEGORIES.map(tileHTML).join('');
    if (phone) {
      el.classList.add('is-carousel');
      el.innerHTML =
        `<div class="track">${tiles}${tiles}${tiles}</div>
         <button class="car-btn car-prev" aria-label="Previous">${ICON.caretLeft}</button>
         <button class="car-btn car-next" aria-label="Next">${ICON.caretRight}</button>
         <p class="work-note">Click to open gallery</p>`;
      wireCarousel(el, CATEGORIES.length, '.tile');
    } else {
      el.classList.remove('is-carousel');
      el.innerHTML = tiles;
    }
  };

  paint();
  let t;
  window.addEventListener('resize', () => { clearTimeout(t); t = setTimeout(paint, 200); });
}

/* ---------- Category page ---------- */
function renderCategory() {
  const el = $('#gallery');
  if (!el) return;

  const id = new URLSearchParams(location.search).get('c');
  const cat = getCategory(id) || CATEGORIES[0];

  document.title = `${cat.title} - ${SITE.name}`;
  $('#category-title').textContent = cat.title;
  $('#category-intro').textContent = cat.intro || '';
  if (cat.cols) el.style.setProperty('--gallery-cols', cat.cols);

  // `dividers` is a list; `divider` (singular) still works for one.
  // A divider carrying an `image` renders as a standalone feature
  // block instead of a plain line of text.
  const dividers = cat.dividers || (cat.divider ? [cat.divider] : []);
  const isCarousel = cat.layout === 'carousel';

  el.classList.toggle('is-carousel', isCarousel);
  el.classList.toggle('is-compact', !!cat.compact);
  // lets the page tighten its heading so a slide fits without scrolling
  document.body.classList.toggle('carousel-page', isCarousel);

  // the set the lightbox can page through
  ZOOMS = cat.projects
    .filter(p => p.image && !p.video)
    .map(p => ({ src: p.image, caption: p.title + (p.year ? ` ${p.year}` : '') }));

  const note = d => d.image
    ? `<div class="feature">
         <p class="feature-text">${d.text}</p>
         <div class="feature-media" data-zoom="${d.image}" data-caption="${d.caption || ''}"
              role="button" tabindex="0" aria-label="View larger">
           <img src="${d.image}" alt="" loading="lazy">
           <span class="zoom-hint">Expand view</span>
         </div>
       </div>`
    : `<p class="divider-note">${d.text}</p>`;

  let html = '';
  cat.projects.forEach((p, i) => {
    const d = dividers.find(x => x.after === i);
    if (d) html += note(d);
    html += galleryItem(p);
  });
  // a divider past the last project sits at the end of the gallery
  dividers.filter(d => d.after >= cat.projects.length).forEach(d => { html += note(d); });

  // The carousel loops, so the strip is tripled and the scroll position
  // is wrapped back to the middle copy - you can turn it forever in
  // either direction and never reach an end.
  el.innerHTML = isCarousel
    ? `<div class="track">${html}${html}${html}</div>
       <button class="car-btn car-prev" aria-label="Previous">${ICON.caretLeft}</button>
       <button class="car-btn car-next" aria-label="Next">${ICON.caretRight}</button>`
    : html;

  if (isCarousel) wireCarousel(el, cat.projects.length);
  wireMedia(el);
  renderAlsoLike(cat.id);
}

/* One gallery tile. */
function galleryItem(p) {
  // The play button appears only once a video is actually linked,
  // so un-linked projects never show a button that does nothing.
  const play = p.video ? `<div class="play">${ICON.play}</div>` : '';
  const hook = p.video
    ? ` data-video="${p.video}" role="button" tabindex="0" aria-label="Play ${p.title}"`
    : p.image
      ? ` data-zoom="${p.image}" role="button" tabindex="0" aria-label="View ${p.title} larger"`
      : '';
  const year = p.year ? ` <span class="g-year">${p.year}</span>` : '';
  return `
    <figure class="g-item">
      <div class="g-media"${hook}>
        ${thumb(p.image, p.ratio || 'ratio-16x9', '')}
        ${play}
        ${!p.video && p.image ? '<span class="zoom-hint">Expand view</span>' : ''}
      </div>
      <figcaption class="g-caption">
        <h3>${p.title}${year}</h3>
        ${p.description ? `<p>${p.description}</p>` : ''}
      </figcaption>
    </figure>`;
}

/* Click a poster to load the player; click a still to enlarge it. */
function wireMedia(root) {
  root.querySelectorAll('[data-video]').forEach(media => {
    const open = () => {
      media.innerHTML =
        `<iframe class="g-embed" src="https://www.youtube-nocookie.com/embed/${media.dataset.video}?autoplay=1&rel=0"
                 title="${media.getAttribute('aria-label') || 'Video'}" loading="lazy"
                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                 allowfullscreen></iframe>`;
      media.removeAttribute('data-video');
    };
    media.addEventListener('click', open);
    media.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
    });
  });

  root.querySelectorAll('[data-zoom]').forEach(media => {
    const open = () => openLightbox(
      media.dataset.zoom,
      media.dataset.caption ||
        media.closest('.g-item')?.querySelector('h3')?.textContent.trim() || ''
    );
    media.addEventListener('click', open);
    media.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
    });
  });
}

/* ---------- Lightbox ----------
   Holds the whole set, so you can move through the work without
   closing it: arrows, the keyboard, or just scrolling.               */
let ZOOMS = [];       // [{src, caption}] for the category on screen
let zoomAt = 0;

function openLightbox(src, caption) {
  let lb = $('#lightbox');
  if (!lb) {
    document.body.insertAdjacentHTML('beforeend', `
      <div class="lightbox" id="lightbox" role="dialog" aria-modal="true" aria-label="Enlarged view">
        <button class="lb-close" aria-label="Close">&times;</button>
        <button class="lb-nav lb-prev" aria-label="Previous">${ICON.caretLeft}</button>
        <button class="lb-nav lb-next" aria-label="Next">${ICON.caretRight}</button>
        <figure class="lb-figure">
          <img class="lb-img" alt="">
          <figcaption class="lb-caption"></figcaption>
        </figure>
      </div>`);
    lb = $('#lightbox');

    const close = () => {
      lb.classList.remove('is-open');
      document.documentElement.style.overflow = '';
    };
    lb.addEventListener('click', e => {
      if (e.target === lb || e.target.closest('.lb-close')) close();
    });
    $('.lb-prev', lb).addEventListener('click', e => { e.stopPropagation(); stepLightbox(-1); });
    $('.lb-next', lb).addEventListener('click', e => { e.stopPropagation(); stepLightbox(1); });

    document.addEventListener('keydown', e => {
      if (!lb.classList.contains('is-open')) return;
      if (e.key === 'Escape')     close();
      if (e.key === 'ArrowLeft')  stepLightbox(-1);
      if (e.key === 'ArrowRight') stepLightbox(1);
    });

    // scrolling inside the enlarged view moves through the set
    let cooling = false;
    lb.addEventListener('wheel', e => {
      e.preventDefault();
      if (cooling || Math.abs(e.deltaY) + Math.abs(e.deltaX) < 12) return;
      cooling = true;
      setTimeout(() => { cooling = false; }, 320);
      stepLightbox((e.deltaY || e.deltaX) > 0 ? 1 : -1);
    }, { passive: false });
  }

  const i = ZOOMS.findIndex(z => z.src === src);
  zoomAt = i;                       // -1 marks a one-off image
  paintLightbox(src, caption);

  const many = ZOOMS.length > 1 && i >= 0;
  $('.lb-prev', lb).hidden = !many;
  $('.lb-next', lb).hidden = !many;

  lb.classList.add('is-open');
  document.documentElement.style.overflow = 'hidden';
  $('.lb-close', lb).focus();
}

function paintLightbox(src, caption) {
  const lb = $('#lightbox');
  $('.lb-img', lb).src = src;
  $('.lb-caption', lb).textContent = caption;
}

function stepLightbox(dir) {
  // a one-off image (a feature block) has no set to page through
  if (!ZOOMS.length || zoomAt < 0) return;
  zoomAt = (zoomAt + dir + ZOOMS.length) % ZOOMS.length;   // wraps around
  paintLightbox(ZOOMS[zoomAt].src, ZOOMS[zoomAt].caption);
}

/* ---------- Carousel ----------
   A rotating coverflow: each slide is turned and pushed back in 3D by
   how far it sits from the centre, so neighbours tuck behind the piece
   in focus and fade out. Driven entirely by scroll position, so the
   wheel, a swipe and the arrows all produce the same motion.          */
function wireCarousel(el, realCount, sel = '.g-item') {
  const track  = $('.track', el);
  const slides = [...track.querySelectorAll(sel)];
  const prev   = $('.car-prev', el);
  const next   = $('.car-next', el);
  if (!slides.length) return;

  // Measured in layout coordinates - getBoundingClientRect() would
  // report the rotated box, which is not the slide's real width.
  const gap  = parseFloat(getComputedStyle(track).columnGap) || 18;
  const step = () => slides[0].offsetWidth + gap;
  const loop = () => realCount * step();          // width of one full turn
  const centreOf = s => (s.offsetLeft - track.offsetLeft) + s.offsetWidth / 2;
  const mid  = () => track.scrollLeft + track.clientWidth / 2;

  let ticking = false;
  const paint = () => {
    ticking = false;
    const centre = mid();
    const unit = step();
    let best = null, bestDist = Infinity;

    slides.forEach(s => {
      const dist = centreOf(s) - centre;
      const d = Math.max(-3, Math.min(3, dist / unit));
      const a = Math.abs(d);
      s.style.transform =
        `translateX(${-d * 52}px) rotateY(${-d * 27}deg) ` +
        `translateZ(${-a * 80}px) scale(${1 - a * 0.12})`;
      s.style.opacity = String(Math.max(0.2, 1 - a * 0.42));
      s.style.zIndex  = String(100 - Math.round(a * 10));
      if (Math.abs(dist) < bestDist) { bestDist = Math.abs(dist); best = s; }
    });
    // exactly one slide is ever active
    slides.forEach(s => s.classList.toggle('is-focus', s === best));
  };

  // Keep the scroll position inside the middle copy. Jumping by exactly
  // one loop lands on an identical slide, so the seam is invisible.
  const wrap = () => {
    const L = loop();
    if (L <= 0) return;
    if (track.scrollLeft < L * 0.5)      track.scrollLeft += L;
    else if (track.scrollLeft > L * 2.5) track.scrollLeft -= L;
  };

  // Settle onto whichever slide ended up nearest the centre, once the
  // scrolling stops. Keeps exactly one slide active and centred.
  let snapT;
  const settle = () => {
    const f = track.querySelector('.is-focus');
    if (!f) return;
    const delta = centreOf(f) - mid();
    if (Math.abs(delta) > 1) track.scrollBy({ left: delta, behavior: 'smooth' });
  };

  const onScroll = () => {
    wrap();
    if (!ticking) { ticking = true; requestAnimationFrame(paint); }
    clearTimeout(snapT);
    snapT = setTimeout(settle, 140);
  };

  prev.addEventListener('click', () => track.scrollBy({ left: -step(), behavior: 'smooth' }));
  next.addEventListener('click', () => track.scrollBy({ left:  step(), behavior: 'smooth' }));
  track.addEventListener('scroll', onScroll, { passive: true });
  track.querySelectorAll('img').forEach(i => i.addEventListener('load', paint));

  // Re-centre on the current slide when the viewport changes size,
  // since the slide width is relative to it.
  let resizeT;
  window.addEventListener('resize', () => {
    clearTimeout(resizeT);
    resizeT = setTimeout(() => {
      const f = track.querySelector('.is-focus');
      if (f) track.scrollLeft += centreOf(f) - mid();
      paint();
    }, 120);
  });

  // Only the centred slide can be opened. Clicking any other one turns
  // the carousel to it instead.
  track.addEventListener('click', e => {
    const item = e.target.closest(sel);
    if (!item || item.classList.contains('is-focus')) return;
    e.preventDefault();
    e.stopPropagation();
    track.scrollBy({ left: centreOf(item) - mid(), behavior: 'smooth' });
  }, true);

  // Start on the first real slide, in the middle copy. Waiting for
  // layout matters: slide width is viewport-relative, so measuring
  // before the stylesheet settles lands on the wrong slide.
  const home = () => {
    const first = slides[realCount];          // first slide of the middle copy
    if (first) track.scrollLeft += centreOf(first) - mid();
    paint();
  };
  requestAnimationFrame(() => requestAnimationFrame(home));
  if (document.readyState !== 'complete') window.addEventListener('load', home, { once: true });
  paint();
}

/* ---------- "You may also like" ---------- */
function renderAlsoLike(currentId) {
  const el = $('#also');
  if (!el) return;
  const others = CATEGORIES.filter(c => c.id !== currentId).slice(0, 5);
  if (!others.length) return;

  el.innerHTML = `
    <h2>You may also like</h2>
    <div class="also-strip">
      ${others.map(c => `
        <a class="tile" href="category.html?c=${c.id}">
          ${thumb(c.cover, 'ratio-1x1', c.title)}
          <div class="tile-overlay"><h3>${c.title}</h3><span>${c.year}</span></div>
        </a>`).join('')}
    </div>`;
}

/* ---------- About ---------- */
function renderAbout() {
  const el = $('#about');
  if (!el) return;
  const a = SITE.about;
  el.innerHTML = `
    <h1>${a.heading}</h1>
    <p class="about-intro">${a.intro}</p>
    <div class="about-grid">
      <div class="about-text">
        ${a.paragraphs.map(p => `<p>${p}</p>`).join('')}
      </div>
      <div class="about-photo">
        ${thumb(a.photo, 'ratio-3x4', 'Portrait')}
      </div>
    </div>`;
}

/* ---------- Contact ---------- */
function renderContact() {
  const el = $('#contact');
  if (!el) return;
  const c = SITE.contact;

  const labels = {
    artstation: 'ArtStation', behance: 'Behance', youtube: 'YouTube',
    vimeo: 'Vimeo', github: 'GitHub', instagram: 'Instagram'
  };
  const links = Object.entries(c.links)
    .filter(([, url]) => url)
    .map(([k, url]) => `<a href="${url}" target="_blank" rel="noopener">${labels[k]}</a>`)
    .join('');

  el.innerHTML = `
    <h1>Contact</h1>
    ${c.availability ? `<p class="contact-availability">${c.availability}</p>` : ''}
    <div class="email-row">
      <a class="email-link" href="mailto:${c.email}">${c.email}</a>
      <button class="copy-btn" aria-label="Copy email address">${ICON.copy}</button>
    </div>
    <span class="copy-toast" role="status"></span>
    ${c.cv ? `<div><a class="cv-btn" href="${c.cv}" download>Download CV</a></div>` : ''}
    ${links ? `<div class="profile-links">${links}</div>` : ''}`;

  $('.copy-btn', el).addEventListener('click', async () => {
    const toast = $('.copy-toast', el);
    try {
      await navigator.clipboard.writeText(c.email);
      toast.textContent = 'Copied to clipboard';
    } catch {
      toast.textContent = 'Press Ctrl+C to copy';
    }
    setTimeout(() => { toast.textContent = ''; }, 2400);
  });
}

/* ---------- Boot ---------- */
document.addEventListener('DOMContentLoaded', () => {
  renderChrome();
  renderHero();
  renderWorkGrid();
  renderCategory();
  renderAbout();
  renderContact();
});
