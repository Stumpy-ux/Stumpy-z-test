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
