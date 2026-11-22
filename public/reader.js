// Qualified Ledes reader tools. Everything is stored in this browser only (localStorage).
(function () {
  'use strict';

  var store = {
    get: function (key, fallback) {
      try {
        var v = localStorage.getItem(key);
        return v === null ? fallback : JSON.parse(v);
      } catch (e) { return fallback; }
    },
    set: function (key, value) {
      try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) {}
    },
    has: function (key) {
      try { return localStorage.getItem(key) !== null; } catch (e) { return false; }
    },
  };
  window.qlStore = store;

  function track(name, params) {
    if (typeof window.gtag === 'function') window.gtag('event', name, params || {});
  }
  window.qlTrack = track;

  var toastTimer;
  function toast(msg) {
    var el = document.querySelector('.toast');
    if (!el) {
      el = document.createElement('div');
      el.className = 'toast';
      el.setAttribute('role', 'status');
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.hidden = true; }, 2200);
  }

  function weekStart() {
    var d = new Date();
    var day = (d.getDay() + 6) % 7; // Monday = 0
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() - day);
    return d.getTime();
  }

  // ----- Saves -----
  function renderSaves() {
    var saved = store.get('ql-saved', []);
    document.querySelectorAll('[data-save]').forEach(function (b) {
      var on = saved.indexOf(b.dataset.save) !== -1;
      b.setAttribute('aria-pressed', String(on));
      var l = b.querySelector('[data-save-label]');
      if (l) l.textContent = on ? 'Saved' : 'Save';
    });
    document.querySelectorAll('[data-saved-count]').forEach(function (el) { el.textContent = String(saved.length); });
    var list = document.querySelector('[data-saved-list]');
    if (list) {
      var shown = 0;
      list.querySelectorAll('.card').forEach(function (c) {
        var on = saved.indexOf(c.dataset.story) !== -1;
        c.hidden = !on;
        if (on) shown++;
      });
      var empty = document.querySelector('[data-saved-empty]');
      if (empty) empty.hidden = shown > 0;
    }
  }

  // ----- Did it -----
  function renderDone() {
    var done = store.get('ql-done', {});
    document.querySelectorAll('[data-done]').forEach(function (b) {
      var on = !!done[b.dataset.done];
      b.setAttribute('aria-pressed', String(on));
      var l = b.querySelector('[data-done-label]');
      if (l) l.textContent = on ? 'Done' : 'I did this';
      var card = b.closest('.card');
      if (card) card.classList.toggle('is-done', on);
    });
    var since = weekStart();
    var week = Object.keys(done).filter(function (k) { return new Date(done[k]).getTime() >= since; }).length;
    document.querySelectorAll('[data-done-week]').forEach(function (el) { el.textContent = String(week); });
  }

  // ----- New since last visit -----
  function markNew() {
    var cards = Array.prototype.slice.call(document.querySelectorAll('.card[data-story]'));
    if (!cards.length) return;
    var ids = cards.map(function (c) { return c.dataset.story; });
    var firstVisit = !store.has('ql-seen');
    var seen = store.get('ql-seen', []);
    var fresh = {};
    if (!firstVisit) {
      cards.forEach(function (c) {
        if (seen.indexOf(c.dataset.story) === -1) {
          fresh[c.dataset.story] = true;
          var badge = c.querySelector('[data-new-badge]');
          if (badge) badge.hidden = false;
        }
      });
    }
    var count = Object.keys(fresh).length;
    document.querySelectorAll('[data-new-count]').forEach(function (el) { el.textContent = String(count); });
    document.querySelectorAll('[data-new-wrap]').forEach(function (el) { el.hidden = firstVisit; });
    var saveSeen = function () {
      var merged = seen.concat(ids.filter(function (id) { return seen.indexOf(id) === -1; }));
      store.set('ql-seen', merged.slice(-1000));
    };
    if (firstVisit) saveSeen();
    document.addEventListener('visibilitychange', function () { if (document.visibilityState === 'hidden') saveSeen(); });
    window.addEventListener('pagehide', saveSeen);
  }

  // ----- Clicks -----
  document.addEventListener('click', function (e) {
    var save = e.target.closest('[data-save]');
    if (save) {
      var saved = store.get('ql-saved', []);
      var id = save.dataset.save;
      var i = saved.indexOf(id);
      if (i === -1) { saved.unshift(id); toast('Saved. Find it under Saved.'); track('save_story', { story_id: id }); }
      else { saved.splice(i, 1); toast('Removed from Saved'); }
      store.set('ql-saved', saved);
      renderSaves();
      return;
    }
    var done = e.target.closest('[data-done]');
    if (done) {
      var map = store.get('ql-done', {});
      var did = done.dataset.done;
      if (map[did]) { delete map[did]; }
      else { map[did] = new Date().toISOString(); toast('Nice. That counts toward this week.'); track('did_it', { story_id: did }); }
      store.set('ql-done', map);
      renderDone();
      return;
    }
    var copy = e.target.closest('[data-copy]');
    if (copy) {
      var url = location.origin + copy.dataset.copy;
      var ok = function () { toast('Link copied'); track('share', { method: 'copy_link', content_id: copy.dataset.copy }); };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(url).then(ok, function () { prompt('Copy this link:', url); });
      else prompt('Copy this link:', url);
      return;
    }
    var li = e.target.closest('[data-share-linkedin]');
    if (li) track('share', { method: 'linkedin', content_id: location.pathname });
    var choice = e.target.closest('[data-consent-choice]');
    if (choice) {
      var v = choice.dataset.consentChoice;
      try { localStorage.setItem('ql-consent', v); } catch (err) {}
      if (typeof window.gtag === 'function') window.gtag('consent', 'update', { analytics_storage: v });
      var bar = document.querySelector('[data-consent]');
      if (bar) bar.hidden = true;
    }
  });

  // ----- Consent bar: only where analytics start off (Europe), only if GA is on -----
  function consentBar() {
    if (typeof window.gtag !== 'function') return;
    var c;
    try { c = localStorage.getItem('ql-consent'); } catch (e) {}
    if (c) return;
    var tz = '';
    try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''; } catch (e) {}
    if (tz.indexOf('Europe/') === 0 || tz === 'Atlantic/Reykjavik') {
      var bar = document.querySelector('[data-consent]');
      if (bar) bar.hidden = false;
    }
  }

  renderSaves();
  renderDone();
  markNew();
  consentBar();
})();
