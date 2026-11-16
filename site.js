(function () {
  'use strict';

  /* ---------- Portfolio: slideshow cards and lightbox ---------- */
  var cards = Array.prototype.slice.call(document.querySelectorAll('.proj'));
  var lb = document.getElementById('lightbox');
  var active = null; // { card, index }

  function mod(i, n) { return ((i % n) + n) % n; }

  function show(card, i) {
    var frames = card.querySelectorAll('[data-frame]');
    var n = frames.length;
    var cur = mod(i, n);
    card._cur = cur;
    Array.prototype.forEach.call(frames, function (f, j) { f.style.opacity = j === cur ? '1' : '0'; });
    var dots = card.querySelectorAll('[data-dot]');
    Array.prototype.forEach.call(dots, function (d, j) {
      d.style.backgroundImage = 'radial-gradient(' + (j === cur ? '#ffffff' : 'rgba(255,255,255,0.42)') + ' 0 3.5px, transparent 3.5px)';
    });
    var counter = card.querySelector('[data-counter]');
    if (counter) counter.textContent = (cur + 1) + ' / ' + n;
    if (active && active.card === card) renderLightbox();
  }

  cards.forEach(function (card) {
    card._cur = 0;
    card.addEventListener('click', function (e) {
      var t = e.target;
      var act = t.closest && t.closest('[data-act]');
      var dot = t.closest && t.closest('[data-dot]');
      if (act) {
        e.stopPropagation();
        show(card, card._cur + (act.getAttribute('data-act') === 'next' ? 1 : -1));
        return;
      }
      if (dot) {
        e.stopPropagation();
        show(card, parseInt(dot.getAttribute('data-dot'), 10));
        return;
      }
      if (t.closest && t.closest('.proj-media')) openLightbox(card);
    });
  });

  function frameList(card) { return card.querySelectorAll('[data-frame]'); }

  function renderLightbox() {
    if (!active || !lb) return;
    var card = active.card;
    var frames = frameList(card);
    var n = frames.length;
    var cur = mod(card._cur, n);
    var src = frames[cur];
    document.getElementById('lb-title').textContent = card.getAttribute('data-title') || '';
    document.getElementById('lb-kind').textContent = card.getAttribute('data-kind') || '';
    var img = document.getElementById('lb-img');
    img.src = src.getAttribute('src');
    img.alt = src.getAttribute('alt') || '';
    var controls = document.getElementById('lb-controls');
    controls.style.display = n > 1 ? 'flex' : 'none';
    document.getElementById('lb-counter').textContent = (cur + 1) + ' / ' + n;
    var dots = document.getElementById('lb-dots');
    while (dots.firstChild) dots.removeChild(dots.firstChild);
    for (var j = 0; j < n; j++) {
      (function (j) {
        var b = document.createElement('button');
        b.type = 'button';
        b.setAttribute('aria-label', (card.getAttribute('data-title') || '') + ' photo ' + (j + 1));
        b.style.cssText = 'width: 8px; height: 8px; border-radius: 50%; border: 0; padding: 0; cursor: pointer; background: ' + (j === cur ? '#ffffff' : 'rgba(255,255,255,0.4)') + ';';
        b.addEventListener('click', function (e) { e.stopPropagation(); show(card, j); });
        dots.appendChild(b);
      })(j);
    }
  }

  function openLightbox(card) {
    if (!lb) return;
    active = { card: card };
    renderLightbox();
    lb.style.display = 'flex';
  }

  function closeLightbox() {
    if (!lb) return;
    lb.style.display = 'none';
    active = null;
  }

  function step(d) { if (active) show(active.card, active.card._cur + d); }

  if (lb) {
    lb.addEventListener('click', closeLightbox);
    ['lb-stage', 'lb-controls'].forEach(function (id) {
      document.getElementById(id).addEventListener('click', function (e) { e.stopPropagation(); });
    });
    document.getElementById('lb-close').addEventListener('click', function (e) { e.stopPropagation(); closeLightbox(); });
    document.getElementById('lb-prev').addEventListener('click', function (e) { e.stopPropagation(); step(-1); });
    document.getElementById('lb-next').addEventListener('click', function (e) { e.stopPropagation(); step(1); });
    var touchX = null;
    var stage = document.getElementById('lb-stage');
    stage.addEventListener('touchstart', function (e) { touchX = e.touches[0].clientX; }, { passive: true });
    stage.addEventListener('touchend', function (e) {
      if (touchX === null) return;
      var dx = e.changedTouches[0].clientX - touchX;
      touchX = null;
      if (Math.abs(dx) > 45) step(dx < 0 ? 1 : -1);
    });
    window.addEventListener('keydown', function (e) {
      if (!active) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    });
  }


  /* ---------- Floating WhatsApp button: appears after the hero, hides near other contact options ---------- */
  var wa = document.querySelector('.wa-float');
  if (wa) {
    var heroEls = document.querySelectorAll('[data-wa-hero]');
    var hideEls = document.querySelectorAll('[data-wa-hide]');
    if (!('IntersectionObserver' in window)) {
      wa.classList.add('is-on');
    } else {
      var seen = new Map();
      var update = function () {
        var blocked = false;
        seen.forEach(function (v) { if (v) blocked = true; });
        wa.classList.toggle('is-on', !blocked);
      };
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { seen.set(e.target, e.isIntersecting); });
        update();
      });
      Array.prototype.forEach.call(heroEls, function (el) { seen.set(el, true); io.observe(el); });
      Array.prototype.forEach.call(hideEls, function (el) { seen.set(el, false); io.observe(el); });
      update();
    }
  }

  /* ---------- Contact: quote form opens WhatsApp ---------- */
  var send = document.getElementById('send-wa');
  if (send) {
    send.addEventListener('click', function () {
      var root = document.getElementById('quote-form');
      var f = {};
      Array.prototype.forEach.call(root.querySelectorAll('input, select, textarea'), function (el) {
        f[el.name] = (el.value || '').trim();
      });
      var err = document.getElementById('form-error');
      if (!f.name || !f.phone) {
        err.textContent = 'Please add your name and a contact number so we can reply.';
        err.style.display = 'block';
        return;
      }
      err.style.display = 'none';
      var rows = [
        ['Name', f.name], ['Contact', f.phone], ['Email', f.email], ['Service', f.service],
        ['Location', f.location], ['Property', f.property], ['Rooms', f.rooms],
        ['Budget', f.budget], ['Timeline', f.timing]
      ].filter(function (r) { return r[1]; });
      var msg = 'NEW WEBSITE ENQUIRY\nvia fainicaconsultancy.co.za\n\n';
      msg += rows.map(function (r) { return r[0] + ': ' + r[1]; }).join('\n');
      if (f.brief) msg += '\n\nAbout the project:\n' + f.brief;
      window.open('https://wa.me/27817620160?text=' + encodeURIComponent(msg), '_blank', 'noopener');
    });
  }
})();
