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
  copy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></svg>'
};

/* ---------- Logo -------------------------------------------------
   PLACEHOLDER. Approximated from the screenshot so the layout is
   correct. Swap this whole string for your real SVG when you have it.
   ----------------------------------------------------------------- */
const LOGO_SVG = `
<svg viewBox="0 0 200 92" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="OLAR">
  <!-- mark (sits above the wordmark) -->
  <path d="M100 4c10 14 15.5 21.5 15.5 27.5 0 5-3.3 8.5-8.5 11 5 2.6 8 5.8 8 10.2 0 6.1-5 12.2-15 18.3-10-6.1-15-12.2-15-18.3 0-4.4 3-7.6 8-10.2-5.2-2.5-8.5-6-8.5-11 0-6 5.5-13.5 15.5-27.5Z" fill="#E3E3E3"/>
  <path d="M100 18c-4.5 6-6.8 9.8-6.8 12.8 0 3.3 2.7 5.7 6.8 7.8 4.1-2.1 6.8-4.5 6.8-7.8 0-3-2.3-6.8-6.8-12.8Z" fill="#222222"/>
  <!-- wordmark -->
  <text x="106" y="88" text-anchor="middle" fill="#C9C9C9"
        font-family="Quicksand, 'Trebuchet MS', sans-serif"
        font-size="25" font-weight="300" letter-spacing="13">OLAR</text>
</svg>`;

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
  if (cat.cols) el.style.setProperty('--gallery-cols', cat.cols);

  const items = cat.projects.map((p, i) => {
    const note = (cat.divider && i === cat.divider.after)
      ? `<p class="divider-note">${cat.divider.text}</p>` : '';
    const play = p.type === 'video' ? `<div class="play">${ICON.play}</div>` : '';
    const year = p.year ? ` <span class="g-year">${p.year}</span>` : '';
    const caption = `
      <figcaption class="g-caption">
        <h3>${p.title}${year}</h3>
        ${p.description ? `<p>${p.description}</p>` : ''}
      </figcaption>`;
    return note + `
      <figure class="g-item">
        <div class="g-media">
          ${thumb(p.image, p.ratio || 'ratio-16x9', '')}
          ${play}
        </div>
        ${caption}
      </figure>`;
  }).join('');

  el.innerHTML = items;
  renderAlsoLike(cat.id);
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
