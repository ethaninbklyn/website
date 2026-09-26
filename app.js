/* Site behavior. You shouldn't need to edit this file — content lives in content.js. */
(function () {
  'use strict';

  var SITE = window.SITE || {};
  var LOOKS = ['typewriter', 'editorial', 'terminal', 'swiss'];
  var TYPED_LOOKS = { typewriter: true, terminal: true };
  var body = document.body;
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function $(id) { return document.getElementById(id); }

  function split(text, emphasis) {
    text = text || '';
    var at = emphasis ? text.indexOf(emphasis) : -1;
    if (at < 0) return { pre: text, em: '', post: '' };
    return { pre: text.slice(0, at), em: emphasis, post: text.slice(at + emphasis.length) };
  }

  function questionNode(parts) {
    var frag = document.createDocumentFragment();
    frag.appendChild(document.createTextNode(parts.pre));
    if (parts.em) {
      var em = document.createElement('span');
      em.className = 'q-em';
      em.textContent = parts.em;
      frag.appendChild(em);
    }
    frag.appendChild(document.createTextNode(parts.post));
    return frag;
  }

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  /* ─── Shared: links on any page ─────────────────────── */
  var links = SITE.links || {};
  function fillLink(id, href) {
    var a = $(id);
    if (!a) return;
    if (href) { a.href = href; a.hidden = false; } else { a.hidden = true; }
  }
  fillLink('link-linkedin', links.linkedin);
  var about = $('about-link');
  if (about && SITE.aboutUrl) {
    about.href = SITE.aboutUrl;
    about.hidden = false;
    if (/^https?:/i.test(SITE.aboutUrl)) {
      about.target = '_blank';
      about.rel = 'noopener';
      about.textContent = 'About ↗';
    }
  }
  fillLink('link-email', links.email ? 'mailto:' + links.email : '');
  fillLink('link-resume', links.resume);

  if (!body.classList.contains('page-home')) return;

  /* ─── Home: the question ─────────────────────────────── */
  var parts = split(SITE.question, SITE.emphasis);
  var qEl = $('question');
  var pre = qEl.querySelector('.q-pre');
  var em = qEl.querySelector('.q-em');
  var post = qEl.querySelector('.q-post');
  $('q-full').textContent = SITE.question || '';

  var lookIndex = Math.floor(Math.random() * LOOKS.length);
  var typer = null;
  var rotator = null;
  var reading = false;
  var tmOpen = false;

  function renderTyped(n) {
    var a = parts.pre.length, b = a + parts.em.length;
    pre.textContent = parts.pre.slice(0, n);
    em.textContent = parts.em.slice(0, Math.max(0, n - a));
    post.textContent = parts.post.slice(0, Math.max(0, n - b));
  }

  function setLook(i) {
    lookIndex = i;
    var name = LOOKS[i];
    LOOKS.forEach(function (l) { body.classList.remove('look-' + l); });
    body.classList.add('look-' + name);
    clearInterval(typer);
    var total = parts.pre.length + parts.em.length + parts.post.length;
    if (TYPED_LOOKS[name] && !reduced && !reading) {
      var n = 0;
      renderTyped(0);
      typer = setInterval(function () {
        n += 1;
        renderTyped(n);
        if (n >= total) clearInterval(typer);
      }, 45);
    } else {
      renderTyped(total);
    }
    qEl.classList.remove('enter');
    void qEl.offsetWidth;
    qEl.classList.add('enter');
  }

  function startRotation() {
    clearInterval(rotator);
    if (reduced) return;
    var ms = Math.max(5, Number(SITE.secondsPerLook) || 15) * 1000;
    rotator = setInterval(function () {
      if (reading || tmOpen || document.hidden) return;
      setLook((lookIndex + 1) % LOOKS.length);
    }, ms);
  }

  setLook(lookIndex);
  startRotation();

  /* ─── Why it matters ─────────────────────────────────── */
  var why = $('why');
  if ((SITE.why || []).length) { $('toggle').hidden = false; body.classList.add('has-why'); }
  var btnQ = $('btn-q');
  var btnWhy = $('btn-why');
  $('why-title').appendChild(questionNode(parts));
  var whyBody = $('why-body');
  (SITE.why || []).forEach(function (p) { whyBody.appendChild(el('p', null, p)); });
  $('why-closing').textContent = SITE.closing || '';
  var answer = $('why-answer');
  if (links.email && SITE.answerPrompt) {
    answer.href = 'mailto:' + links.email + '?subject=' + encodeURIComponent(SITE.question || '');
    answer.textContent = SITE.answerPrompt;
    answer.hidden = false;
  }

  function setReading(on) {
    reading = on;
    why.hidden = !on;
    body.classList.toggle('is-reading', on);
    $('stage').setAttribute('aria-hidden', on ? 'true' : 'false');
    btnQ.setAttribute('aria-pressed', on ? 'false' : 'true');
    btnWhy.setAttribute('aria-pressed', on ? 'true' : 'false');
    if (on) {
      clearInterval(typer);
      why.scrollTop = 0;
    } else {
      setLook(lookIndex);
      startRotation();
    }
  }
  btnQ.addEventListener('click', function () { if (reading) setReading(false); });
  btnWhy.addEventListener('click', function () { if (!reading) setReading(true); });

  /* ─── Past questions ─────────────────────────────────── */
  var past = SITE.past || [];
  if (!past.length) return;

  var btnPast = $('btn-past');
  btnPast.hidden = false;

  var history = [{ question: SITE.question, emphasis: SITE.emphasis, look: 'editorial', landed: 'Still working on it.', open: true }].concat(past);
  var total = history.length;
  var sel = 0;
  var tm = $('tm');
  var stack = $('tm-stack');
  var timeline = $('tm-timeline');
  var older = $('tm-older');
  var newer = $('tm-newer');
  var closeBtn = $('tm-close');

  var cards = history.map(function (h, i) {
    var num = total - i;
    var look = LOOKS.indexOf(h.look) >= 0 ? h.look : 'editorial';
    var card = el('button', 'tm-card card-' + look);
    card.type = 'button';
    card.setAttribute('aria-label', 'Question ' + num + (h.open ? ' (open now)' : '') + ': ' + h.question);

    var meta = el('span', 'card-meta');
    meta.appendChild(el('span', null, 'No. ' + num));
    meta.appendChild(el('span', null, h.open ? 'Open now' : 'Closed'));
    var q = el('span', 'card-q');
    q.appendChild(questionNode(split(h.question, h.emphasis)));
    var landed = el('span', 'card-landed');
    landed.appendChild(el('span', 'card-landed-label', h.open ? 'Status' : 'Where I landed'));
    landed.appendChild(el('span', null, h.landed || ''));

    card.appendChild(meta);
    card.appendChild(q);
    card.appendChild(landed);
    card.addEventListener('click', function () {
      if (i === sel && i === 0) closeTM();
      else select(i);
    });
    stack.appendChild(card);
    return card;
  });

  var ticks = history.map(function (h, i) {
    var num = total - i;
    var b = el('button');
    b.type = 'button';
    b.setAttribute('aria-label', 'Question ' + num + (h.open ? ' (open now)' : ''));
    b.appendChild(el('span', 'tl-long', 'No. ' + num + (h.open ? ' · now' : '')));
    b.appendChild(el('span', 'tl-short', String(num)));
    b.appendChild(el('span', 'tick'));
    b.addEventListener('click', function () { select(i); });
    return b;
  });
  ticks.slice().reverse().forEach(function (b) { timeline.appendChild(b); });

  var FADE = [1, 0.78, 0.55, 0.36, 0.2];
  function layout() {
    var phone = window.innerWidth <= 700;
    var step = phone ? 42 : 66;
    var shrink = phone ? 0.07 : 0.085;
    cards.forEach(function (card, i) {
      var d = i - sel;
      var visible = d >= 0 && d < FADE.length;
      if (d < 0) {
        card.style.transform = 'translate(-50%, -50%) translateY(' + (phone ? 140 : 180) + 'px) scale(1.2)';
        card.style.opacity = '0';
        card.style.zIndex = '200';
        card.style.filter = 'none';
      } else {
        card.style.transform = 'translate(-50%, -50%) translateY(' + (-d * step) + 'px) scale(' + (1 - d * shrink).toFixed(3) + ')';
        card.style.opacity = visible ? String(FADE[d]) : '0';
        card.style.zIndex = String(100 - d);
        card.style.filter = 'brightness(' + (1 - d * 0.14).toFixed(2) + ')';
      }
      card.style.pointerEvents = visible ? 'auto' : 'none';
      card.tabIndex = visible ? 0 : -1;
      card.setAttribute('aria-hidden', visible ? 'false' : 'true');
      card.classList.toggle('is-front', d === 0);
    });
    ticks.forEach(function (b, i) {
      b.classList.toggle('is-active', i === sel);
      b.setAttribute('aria-current', i === sel ? 'true' : 'false');
    });
    older.disabled = sel >= total - 1;
    newer.disabled = sel <= 0;
  }

  function select(i) {
    sel = Math.max(0, Math.min(total - 1, i));
    layout();
  }

  function onKey(e) {
    if (e.key === 'Escape') { e.preventDefault(); closeTM(); }
    else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') { e.preventDefault(); select(sel + 1); }
    else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') { e.preventDefault(); select(sel - 1); }
  }

  function openTM() {
    tmOpen = true;
    clearInterval(typer);
    sel = 0;
    tm.hidden = false;
    layout();
    closeBtn.focus();
    document.addEventListener('keydown', onKey);
    window.addEventListener('resize', layout);
  }

  function closeTM() {
    tmOpen = false;
    tm.hidden = true;
    document.removeEventListener('keydown', onKey);
    window.removeEventListener('resize', layout);
    if (!reading) setLook(lookIndex);
    btnPast.focus();
  }

  btnPast.addEventListener('click', openTM);
  closeBtn.addEventListener('click', closeTM);
  older.addEventListener('click', function () { select(sel + 1); });
  newer.addEventListener('click', function () { select(sel - 1); });
})();
