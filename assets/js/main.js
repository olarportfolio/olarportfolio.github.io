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
   ----------------------------------------------------------------- */
const LOGO_SVG = `<img src="assets/img/logo-olar.webp" alt="OLAR" width="700" height="288">`;

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
    </header>`);

  document.body.insertAdjacentHTML('beforeend', `
    <button class="to-top" aria-label="Back to top">${ICON.arrowUp}</button>`);

  const toTop = $('.to-top');
  toTop.addEventListener('click', () =>
    window.scrollTo({ top: 0, behavior: 'smooth' }));
  window.addEventListener('scroll', () =>
    toTop.classList.toggle('is-visible', window.scrollY > 600), { passive: true });
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
      </section>
      <div class="hero-chevron">${ICON.chevron}</div>
    </div>`;

  const hero = $('.hero', wrap);
  const fade = () => {
    const t = Math.min(window.scrollY / (window.innerHeight * 0.7), 1);
    hero.style.opacity = String(1 - t);
    $('.hero-chevron', wrap).style.opacity = String(0.8 * (1 - t));
  };
  window.addEventListener('scroll', fade, { passive: true });
  fade();
}

/* ---------- Work grid: one tile per category ---------- */
function renderWorkGrid() {
  const el = $('#work-grid');
  if (!el) return;
  el.innerHTML = CATEGORIES.map(c => `
    <a class="tile" href="category.html?c=${c.id}">
      ${thumb(c.cover, 'ratio-4x3', c.title + ' - cover')}
      <div class="tile-overlay">
        <h3>${c.title}</h3>
        <span>${c.year}</span>
      </div>
    </a>`).join('');
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

  const note = d => d.image
    ? `<div class="feature">
         <div class="feature-media"><img src="${d.image}" alt="" loading="lazy"></div>
         <p class="feature-text">${d.text}</p>
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

  el.innerHTML = isCarousel
    ? `<div class="track">${html}</div>
       <button class="car-btn car-prev" aria-label="Previous">${ICON.caretLeft}</button>
       <button class="car-btn car-next" aria-label="Next">${ICON.caretRight}</button>`
    : html;

  if (isCarousel) wireCarousel(el);
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
      media.closest('.g-item')?.querySelector('h3')?.textContent || ''
    );
    media.addEventListener('click', open);
    media.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
    });
  });
}

/* ---------- Lightbox ---------- */
function openLightbox(src, caption) {
  let lb = $('#lightbox');
  if (!lb) {
    document.body.insertAdjacentHTML('beforeend', `
      <div class="lightbox" id="lightbox" role="dialog" aria-modal="true" aria-label="Enlarged view">
        <button class="lb-close" aria-label="Close">&times;</button>
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
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') close();
    });
  }
  $('.lb-img', lb).src = src;
  $('.lb-caption', lb).textContent = caption;
  lb.classList.add('is-open');
  document.documentElement.style.overflow = 'hidden';
  $('.lb-close', lb).focus();
}

/* ---------- Carousel ---------- */
function wireCarousel(el) {
  const track = $('.track', el);
  const step = () => {
    const slide = track.querySelector('.g-item');
    return slide ? slide.getBoundingClientRect().width + 24 : track.clientWidth * 0.8;
  };
  $('.car-prev', el).addEventListener('click', () =>
    track.scrollBy({ left: -step(), behavior: 'smooth' }));
  $('.car-next', el).addEventListener('click', () =>
    track.scrollBy({ left: step(), behavior: 'smooth' }));

  const update = () => {
    const max = track.scrollWidth - track.clientWidth - 2;
    $('.car-prev', el).disabled = track.scrollLeft <= 2;
    $('.car-next', el).disabled = track.scrollLeft >= max;
  };
  track.addEventListener('scroll', update, { passive: true });
  update();
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
    <div class="about-grid">
      <div class="about-text">
        <p class="about-intro">${a.intro}</p>
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
