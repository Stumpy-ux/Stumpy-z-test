// Small prototype interactions (ES6, no frameworks)
const toast = document.querySelector('.toast');
let toastTimer;

const showToast = (msg) => {
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('is-shown');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('is-shown'), 1800);
};

// Anything not built yet tells you so instead of doing nothing
document.querySelectorAll('[data-toast]').forEach((el) => {
  el.addEventListener('click', (e) => {
    e.preventDefault();
    showToast(el.dataset.toast);
  });
});

// Fuel type and distance: one selected per group
document.querySelectorAll('.pills').forEach((group) => {
  const pills = group.querySelectorAll('.pill');
  pills.forEach((pill) => {
    pill.addEventListener('click', () => {
      pills.forEach((p) => p.setAttribute('aria-pressed', 'false'));
      pill.setAttribute('aria-pressed', 'true');
    });
  });
});

// Station services: toggle on/off
document.querySelectorAll('button.svc-chip').forEach((chip) => {
  chip.addEventListener('click', () => {
    const on = chip.getAttribute('aria-pressed') !== 'true';
    chip.setAttribute('aria-pressed', String(on));
    chip.classList.toggle('is-on', on);
  });
});

// Map pins highlight the matching price row
document.querySelectorAll('.map-pin').forEach((pin) => {
  pin.addEventListener('click', () => {
    document.querySelectorAll('.map-pin').forEach((p) => p.classList.remove('is-active'));
    pin.classList.add('is-active');
    const row = document.querySelector(`.price-row[data-station="${pin.dataset.station}"]`);
    if (row) {
      row.scrollIntoView({ behavior: 'smooth', block: 'center' });
      row.animate([{ background: '#eae9f1' }, { background: 'transparent' }], { duration: 1200 });
    } else {
      showToast('Z Station 3 · $2.85 (not in the top 3 list)');
    }
  });
});

// Footer menu: chevron flips (no sub-menus designed yet)
document.querySelectorAll('.footer__menu button').forEach((btn) => {
  btn.addEventListener('click', () => {
    btn.setAttribute('aria-expanded', String(btn.getAttribute('aria-expanded') !== 'true'));
  });
});

// Hamburger menu (Figma: "Mobile menu (hamburger)") — built once here so both pages share it
const menuBtn = document.querySelector('.nav button[aria-label="Menu"]');
const nav = document.querySelector('.nav');

if (menuBtn && nav) {
  const hubLinks = [
    { title: 'Journey Hub', sub: 'Stations, prices and trips', href: 'journey-hub.html' },
    { title: 'Find a Z station', sub: 'Map and list of stations', href: 'journey-hub.html#prices' },
    { title: 'Compare fuel prices', sub: 'Cheapest fuel near you', href: 'journey-hub.html#prices' },
  ];
  const moreLinks = ['At the station', 'Rewards and promotions', 'Z App', 'For business', 'About Z'];

  const menu = document.createElement('nav');
  menu.className = 'menu';
  menu.id = 'site-menu';
  menu.setAttribute('aria-label', 'Main menu');
  menu.hidden = true;
  menu.innerHTML = `
    <p class="menu__label">JOURNEY HUB</p>
    ${hubLinks.map(({ title, sub, href }) => `
      <a class="menu__item" href="${href}">
        <span class="menu__text"><span class="menu__title">${title}</span><span class="menu__sub">${sub}</span></span>
        <img src="assets/menu-chevron.svg" alt="">
      </a>`).join('')}
    <p class="menu__label">MORE FROM Z</p>
    ${moreLinks.map((title) => `
      <button class="menu__item menu__item--more" type="button" data-more="${title}">
        <span class="menu__text"><span class="menu__title">${title}</span></span>
        <img src="assets/menu-chevron-muted.svg" alt="">
      </button>`).join('')}
  `;
  document.body.appendChild(menu);

  // The menu is a prototype screen now, so drop the "not built yet" toast on the icon
  menuBtn.removeAttribute('data-toast');
  menuBtn.replaceWith(menuBtn.cloneNode(true));
  const btn = document.querySelector('.nav button[aria-label="Menu"]');
  btn.setAttribute('aria-controls', 'site-menu');
  btn.setAttribute('aria-expanded', 'false');

  const setOpen = (open) => {
    menu.style.setProperty('--menu-top', `${nav.getBoundingClientRect().bottom}px`);
    menu.hidden = !open;
    btn.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('menu-open', open);
  };

  btn.addEventListener('click', () => setOpen(menu.hidden));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(false); });
  menu.querySelectorAll('a.menu__item').forEach((a) => a.addEventListener('click', () => setOpen(false)));
  menu.querySelectorAll('[data-more]').forEach((b) => {
    b.addEventListener('click', () => showToast(`${b.dataset.more} isn't part of this prototype`));
  });
}
