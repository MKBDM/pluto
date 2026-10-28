(function () {
  var root = document.querySelector('.root');
  if (!root) return;

  /* Тема: тёмная / светлая, запоминается в браузере */
  function applyTheme(t) { root.className = 'root ' + (t === 'light' ? 'lt' : 'dk'); }
  try { var saved = localStorage.getItem('pluto-theme'); if (saved === 'light' || saved === 'dark') applyTheme(saved); } catch (e) {}
  var tbtn = document.querySelector('[data-theme-toggle]');
  if (tbtn) tbtn.addEventListener('click', function () {
    var next = root.classList.contains('lt') ? 'dark' : 'light';
    applyTheme(next);
    try { localStorage.setItem('pluto-theme', next); } catch (e) {}
  });
  window.addEventListener('storage', function (e) {
    if (e.key === 'pluto-theme' && (e.newValue === 'light' || e.newValue === 'dark')) applyTheme(e.newValue);
  });

  /* Страница «Исследования»: вопросы и ответы */
  var qbtns = document.querySelectorAll('[data-q]');
  if (qbtns.length) {
    var qt = document.querySelector('[data-q-title]');
    var qx = document.querySelector('[data-q-text]');
    qbtns.forEach(function (b) {
      b.addEventListener('click', function () {
        qbtns.forEach(function (o) { o.classList.remove('active'); o.setAttribute('aria-selected', 'false'); });
        b.classList.add('active'); b.setAttribute('aria-selected', 'true');
        if (qt) qt.textContent = b.getAttribute('data-title');
        if (qx) qx.textContent = b.getAttribute('data-text');
      });
    });
  }

  /* Страница «Кейсы»: фильтр */
  var chips = document.querySelectorAll('[data-filter]');
  if (chips.length) {
    var groups = document.querySelectorAll('.cgrp');
    chips.forEach(function (c) {
      c.addEventListener('click', function () {
        var f = c.getAttribute('data-filter');
        chips.forEach(function (o) { var on = o === c; o.classList.toggle('on', on); o.setAttribute('aria-pressed', on ? 'true' : 'false'); });
        groups.forEach(function (g) { g.hidden = !(f === 'all' || g.getAttribute('data-f') === f); });
      });
    });
  }

  /* Главная: счётчики в блоке «Цифры» */
  setTimeout(function () {
    var els = document.querySelectorAll('[data-n]');
    if (!els.length || !('IntersectionObserver' in window)) return;
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    function run(el) {
      var n = parseFloat(el.getAttribute('data-n')), suf = el.getAttribute('data-s') || '';
      if (reduce || isNaN(n)) { el.textContent = n + suf; return; }
      var t0 = performance.now(), D = 1600;
      function tick(t) {
        var p = Math.min(1, (t - t0) / D), e = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(n * e) + suf;
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }
    els.forEach(function (el) { el.textContent = '0' + (el.getAttribute('data-s') || ''); });
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (x) { if (x.isIntersecting) { run(x.target); io.unobserve(x.target); } });
    }, { threshold: 0.4 });
    els.forEach(function (el) { io.observe(el); });
  }, 150);
})();
