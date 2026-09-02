/* ============================================================
   Tennis Tech Hub — page behaviour
   ============================================================ */

/* i18n.js and main.js share one global lexical scope, so nothing here may reuse
   a top-level name it declares (STRINGS, LANGS, ...) — that is a SyntaxError
   that silently kills this whole file. Reach through the namespace instead. */
const i18n = window.TTH_I18N;

/* ---------- language ---------- */

i18n.applyLang(i18n.detectLang());

const picker = document.getElementById('langpicker');
const langBtn = document.getElementById('langbtn');

langBtn.addEventListener('click', e => {
  e.stopPropagation();
  const open = picker.classList.toggle('is-open');
  langBtn.setAttribute('aria-expanded', String(open));
});

picker.querySelectorAll('[data-lang]').forEach(btn => {
  btn.addEventListener('click', () => {
    i18n.applyLang(btn.dataset.lang, true);   // deliberate choice — remember it
    picker.classList.remove('is-open');
    langBtn.setAttribute('aria-expanded', 'false');
  });
});

document.addEventListener('click', e => {
  if (!picker.contains(e.target)) {
    picker.classList.remove('is-open');
    langBtn.setAttribute('aria-expanded', 'false');
  }
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    picker.classList.remove('is-open');
    langBtn.setAttribute('aria-expanded', 'false');
  }
});

/* ---------- mobile nav ---------- */

const burger = document.getElementById('burger');
const menu = document.getElementById('navmenu');

burger.addEventListener('click', () => {
  const open = menu.classList.toggle('is-open');
  burger.setAttribute('aria-expanded', String(open));
});

menu.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', () => {
    menu.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
  });
});

/* ---------- hero video ----------
   Two cuts, landscape and portrait, ~15 MB each — so the src is assigned here
   rather than in the markup and only the matching one is ever fetched. */

const hero = document.getElementById('herovideo');
const portrait = window.matchMedia('(max-aspect-ratio: 1/1)').matches;
const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

hero.poster = portrait ? hero.dataset.posterMobile : hero.dataset.posterDesktop;

if (!calm) {
  hero.src = portrait ? hero.dataset.srcMobile : hero.dataset.srcDesktop;
  hero.load();
  // Some browsers refuse the autoplay attribute but allow a muted programmatic
  // play(); if that is refused too, the poster simply stays up.
  hero.play().catch(() => {});
}

/* ---------- analytics ----------
   Pushes to the GTM dataLayer. Defined defensively: an ad blocker can stop
   gtm.js loading, but the array itself is created by the snippet in <head>, so
   a push never throws and the form keeps working either way. */

function track(event, params) {
  (window.dataLayer = window.dataLayer || []).push({ event, ...params });
}

/* ---------- contact form ----------
   Posted to FormSubmit, which relays to the inbox behind LEAD_ENDPOINT's hash.
   It needs no account and no server, which is what lets this run on GitHub
   Pages — see README.md for how to move to a real backend later. */

const LEAD_ENDPOINT = 'https://formsubmit.co/ajax/3c6305fcee735dbae440d5daeee21d68';

const form = document.getElementById('demoform');
const note = document.getElementById('formnote');
const submitBtn = form.querySelector('button[type="submit"]');

form.addEventListener('submit', async e => {
  e.preventDefault();
  const dict = i18n.STRINGS[document.documentElement.lang] || i18n.STRINGS.es;

  // "e-mail or phone" is not expressible in HTML validation, so it is checked
  // here; the browser still validates the format of whichever they filled.
  const email = form.email.value.trim();
  const phone = form.telefono.value.trim();

  if (!email && !phone) {
    note.textContent = dict['form.contact'];
    note.classList.add('is-error');
    form.email.focus();
    track('form_invalid', { form_id: 'demoform', reason: 'no_contact' });
    return;
  }
  if (!form.checkValidity()) {
    note.textContent = dict['form.err'];
    note.classList.add('is-error');
    form.reportValidity();
    track('form_invalid', { form_id: 'demoform', reason: 'format' });
    return;
  }

  const lang = document.documentElement.lang;
  document.getElementById('form-lang').value = lang;
  submitBtn.disabled = true;
  note.classList.remove('is-error');
  note.textContent = dict['form.sending'];

  try {
    const res = await fetch(LEAD_ENDPOINT, {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: new FormData(form)
    });
    // FormSubmit answers 200 even when it refuses the message (unactivated
    // address, spam trap tripped), so the body is the only real signal.
    const body = await res.json().catch(() => ({}));
    if (!res.ok || body.success !== 'true') throw new Error(body.message || res.status);

    // Segmentation only — no e-mail, phone or message text goes to the dataLayer.
    track('generate_lead', {
      form_id:  'demoform',
      language: lang,
      contact_method: email && phone ? 'both' : email ? 'email' : 'phone',
      has_message: Boolean(form.mensaje.value.trim())
    });

    note.textContent = dict['form.ok'];
    form.reset();
  } catch (err) {
    note.textContent = dict['form.fail'];
    note.classList.add('is-error');
    track('form_error', { form_id: 'demoform', error: String(err.message || err) });
  } finally {
    submitBtn.disabled = false;
  }
});
