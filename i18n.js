/* ============================================================
   i18n — es / en / pt
   Language is resolved in this order:
     1. ?lang= query param        (shareable links)
     2. localStorage              (returning visitor's own choice)
     3. navigator.languages       (what the visitor's browser says they read)
     4. IANA timezone             (only when their browser language is not one
                                   of the three we publish — a signal of where
                                   they are, not of what they read)
     5. "es"                      (fallback)

   Markup contract:
     data-i18n       -> replaces textContent
     data-i18n-html  -> replaces innerHTML (used where copy carries <br>/<em>)
     data-i18n-ph    -> replaces the placeholder attribute

   Measurements live here rather than in the markup because their units are part
   of the translation: Spanish and Portuguese get km/h and a comma decimal
   separator, English keeps mph and a point.
   ============================================================ */

const DEFAULT_LANG = 'es';

/* Which languages the picker offers and detection may choose. The pt STRINGS
   block below is complete and kept in place — add 'pt' back here and restore the
   option in index.html to turn Portuguese back on. Anything not listed here is
   ignored by detection and by ?lang=, so a Brazilian visitor gets Spanish. */
const LANGS = ['es', 'en'];

/* Pins the first-visit language for everyone, ignoring detection. null = detect.
   Set this to 'es' | 'en' | 'pt' to hard-launch a single language, e.g. while a
   translation is still being reviewed. ?lang= and the picker still override it. */
const FORCE_LANG = null;

/* Which flag marks each language in the picker. A language is not a country, so
   these are a judgement call about audience: Spain is the conventional marker
   for Spanish, and this page sells into Brazil and the US rather than Portugal
   and the UK. Swap the values to change the flags; nothing else reads them. */
const LANG_FLAG = { es: 'es', en: 'us', pt: 'br' };

/* Timezone -> language, for the markets this page targets. Used only as a
   backstop: the timezone says where someone IS, which is a poor guess at what
   they READ (an English speaker living in Buenos Aires reads English). It earns
   its place for the visitor whose browser is set to a language we do not
   publish — a French speaker in São Paulo is better served Portuguese than
   Spanish. Browsers expose it without a permission prompt. */
const TZ_LANG = {
  'America/Sao_Paulo': 'pt', 'America/Bahia': 'pt', 'America/Fortaleza': 'pt',
  'America/Recife': 'pt', 'America/Belem': 'pt', 'America/Manaus': 'pt',
  'America/Cuiaba': 'pt', 'America/Campo_Grande': 'pt', 'America/Porto_Velho': 'pt',
  'America/Boa_Vista': 'pt', 'America/Rio_Branco': 'pt', 'America/Noronha': 'pt',
  'America/Maceio': 'pt', 'America/Araguaina': 'pt', 'America/Santarem': 'pt',
  'America/Eirunepe': 'pt', 'Atlantic/Azores': 'pt', 'Europe/Lisbon': 'pt',

  'America/Argentina/Buenos_Aires': 'es', 'America/Argentina/Cordoba': 'es',
  'America/Argentina/Mendoza': 'es', 'America/Argentina/Salta': 'es',
  'America/Argentina/Tucuman': 'es', 'America/Argentina/Ushuaia': 'es',
  'America/Santiago': 'es', 'Pacific/Easter': 'es', 'America/Punta_Arenas': 'es',
  'America/Bogota': 'es', 'America/Lima': 'es', 'America/Caracas': 'es',
  'America/Guayaquil': 'es', 'America/La_Paz': 'es', 'America/Asuncion': 'es',
  'America/Montevideo': 'es', 'America/Mexico_City': 'es', 'America/Monterrey': 'es',
  'America/Tijuana': 'es', 'America/Panama': 'es', 'America/Costa_Rica': 'es',
  'America/Guatemala': 'es', 'America/Managua': 'es', 'America/Tegucigalpa': 'es',
  'America/El_Salvador': 'es', 'America/Santo_Domingo': 'es', 'America/Havana': 'es',
  'Europe/Madrid': 'es', 'Atlantic/Canary': 'es'
};

const STRINGS = {

  /* ------------------------------ ESPAÑOL ------------------------------ */
  es: {
    'html.lang':        'es',
    'nav.acemate':      'Acemate',
    'nav.about':        'Nosotros',
    'nav.contact':      'Contacto',
    'nav.cta':          'Agenda una demo',

    'hero.title':       'El primer robot de<br>tenis del mundo para<br>jugar <em>rallies reales</em>',
    'hero.cta':         'Agenda una demo',
    'hero.stat1':       'Derecha:',
    'hero.stat1v':      '90 km/h',
    'hero.stat2':       'Altura de red:',
    'hero.stat2v':      '1,7 m',

    'acemate.eyebrow':  'Conoce Acemate',
    'acemate.title':    'No es una lanzapelotas. <em>Es tu nuevo</em> compañero de juego.',
    'acemate.p1':       'A diferencia de las cámaras monoculares, la visión binocular 4K del Acemate Tennis Robot S10 captura profundidad y velocidad, al igual que los ojos humanos. Esto permite un seguimiento 3D preciso y un análisis de cada golpe en tiempo real, con precisión a nivel de centímetros.',
    'acemate.p2':       'Acemate S10 se mueve y mantiene rallies como un compañero de entrenamiento real.',
    'acemate.p3':       'Sin wearables. Sin configuraciones complicadas. Solo golpea y juega.',

    'about.eyebrow':    'Tennis Tech Hub',
    'about.title':      'El futuro del tenis<br>ya está aquí.',
    'about.p1':         'Creemos que la tecnología puede transformar la manera en que vivimos el deporte.',
    'about.p2':         'Nuestro propósito es acercar a América Latina las tecnologías más innovadoras del mundo, conectando tecnología, innovación y rendimiento para crear experiencias que hagan de la práctica deportiva algo más inteligente, evolutivo y, sobre todo, placentero.',
    'about.tagline':    'Technology. Performance. Innovation.',
    'about.dist':       'Distribución exclusiva: Argentina, Chile, Colombia y Perú.',

    'card.mecanum.kicker': 'Movimiento, recepción y saque impulsados por',
    'card.mecanum.title':  'Rueda Mecanum y<br>cámara binocular 4K',
    'card.ntrp.kicker':    'Apto para jugadores<br>de nivel',
    'card.ntrp.sub':       'Nivel NTRP',
    'card.speed.kicker':   'Velocidad de bola de hasta',
    'card.speed.value':    '97<span class="cap__unit">km/h</span>',
    'card.movement.kicker':'Hasta',
    'card.movement.sub':   'Velocidad de<br>desplazamiento lateral',
    'card.spin.topspin':   'Liftado',
    'card.spin.flat':      'Plano',
    'card.spin.slice':     'Cortado',
    'card.rally.title':    'Rallies<br>personalizados',
    'card.rally.sub':      'en iPhone, Android y<br>Apple Watch',

    'contact.eyebrow':  'Contacto',
    'contact.title':    '¿Quieres llevar el futuro del tenis a tu cancha?',

    'form.email':       'E-mail',
    'form.phone':       'Teléfono / WhatsApp',
    'form.questions':   '¿Alguna pregunta? (opcional)',
    'form.submit':      'Quiero saber más',
    'form.err':         'Revisa los datos que ingresaste.',
    'form.contact':     'Déjanos tu e-mail o tu teléfono para poder responderte.',
    'form.sending':     'Enviando…',
    'form.ok':          '¡Gracias! Te contactaremos muy pronto.',
    'form.fail':        'No pudimos enviar el formulario. Vuelve a intentarlo en unos minutos.',

    'footer.rights':    '2026 Tennis Tech Hub. Todos los derechos reservados.'
  },

  /* ------------------------------ ENGLISH ------------------------------ */
  en: {
    'html.lang':        'en',
    'nav.acemate':      'Acemate',
    'nav.about':        'About us',
    'nav.contact':      'Contact',
    'nav.cta':          'Book a demo',

    'hero.title':       'The world’s first<br>tennis robot built to<br>play <em>real rallies</em>',
    'hero.cta':         'Book a demo',
    'hero.stat1':       'Forehand:',
    'hero.stat1v':      '56 mph',
    'hero.stat2':       'Net height:',
    'hero.stat2v':      '1.7 m',

    'acemate.eyebrow':  'Meet Acemate',
    'acemate.title':    'Not a ball machine. <em>Your new</em> hitting partner.',
    'acemate.p1':       'Unlike monocular cameras, the Acemate Tennis Robot S10’s 4K binocular vision captures depth and speed the way human eyes do. That means precise 3D tracking and real-time analysis of every shot, accurate to the centimetre.',
    'acemate.p2':       'Acemate S10 moves and sustains rallies like a real training partner.',
    'acemate.p3':       'No wearables. No complicated setup. Just hit and play.',

    'about.eyebrow':    'Tennis Tech Hub',
    'about.title':      'The future of tennis<br>is already here.',
    'about.p1':         'We believe technology can transform the way we experience sport.',
    'about.p2':         'Our purpose is to bring the world’s most innovative technologies to Latin America, connecting technology, innovation and performance to create experiences that make playing sport smarter, more progressive and, above all, more enjoyable.',
    'about.tagline':    'Technology. Performance. Innovation.',
    'about.dist':       'Exclusive distribution: Argentina, Chile, Colombia and Peru.',

    'card.mecanum.kicker': 'Moving, receiving and serving powered by',
    'card.mecanum.title':  'Mecanum wheel &amp;<br>binocular 4K camera',
    'card.ntrp.kicker':    'Suitable for players<br>ranging from',
    'card.ntrp.sub':       'NTRP level',
    'card.speed.kicker':   'Ball speed up to',
    'card.speed.value':    '60<span class="cap__unit">mph</span>',
    'card.movement.kicker':'Up to',
    'card.movement.sub':   'Side-to-side<br>movement speed',
    'card.spin.topspin':   'Topspin',
    'card.spin.flat':      'Flat shot',
    'card.spin.slice':     'Slice',
    'card.rally.title':    'Rally<br>customization',
    'card.rally.sub':      'on iPhone, Android and<br>Apple Watch',

    'contact.eyebrow':  'Contact',
    'contact.title':    'Want to bring the future of tennis to your court?',

    'form.email':       'E-mail',
    'form.phone':       'Phone / WhatsApp',
    'form.questions':   'Any questions? (optional)',
    'form.submit':      'Tell me more',
    'form.err':         'Please check the details you entered.',
    'form.contact':     'Leave us an e-mail or a phone number so we can reply.',
    'form.sending':     'Sending…',
    'form.ok':          'Thank you! We’ll be in touch very soon.',
    'form.fail':        'We could not send the form. Please try again in a few minutes.',

    'footer.rights':    '2026 Tennis Tech Hub. All rights reserved.'
  },

  /* ----------------------------- PORTUGUÊS ----------------------------- */
  pt: {
    'html.lang':        'pt',
    'nav.acemate':      'Acemate',
    'nav.about':        'Sobre nós',
    'nav.contact':      'Contato',
    'nav.cta':          'Agende uma demo',

    'hero.title':       'O primeiro robô de<br>tênis do mundo para<br>jogar <em>rallies reais</em>',
    'hero.cta':         'Agende uma demo',
    'hero.stat1':       'Forehand:',
    'hero.stat1v':      '90 km/h',
    'hero.stat2':       'Altura da rede:',
    'hero.stat2v':      '1,7 m',

    'acemate.eyebrow':  'Conheça a Acemate',
    'acemate.title':    'Não é uma lançadora de bolas. <em>É seu novo</em> parceiro de jogo.',
    'acemate.p1':       'Diferente das câmeras monoculares, a visão binocular 4K do Acemate Tennis Robot S10 captura profundidade e velocidade, assim como os olhos humanos. Isso permite um rastreamento 3D preciso e a análise de cada golpe em tempo real, com precisão de centímetros.',
    'acemate.p2':       'O Acemate S10 se move e sustenta rallies como um parceiro de treino de verdade.',
    'acemate.p3':       'Sem wearables. Sem configurações complicadas. É só bater e jogar.',

    'about.eyebrow':    'Tennis Tech Hub',
    'about.title':      'O futuro do tênis<br>já está aqui.',
    'about.p1':         'Acreditamos que a tecnologia pode transformar a maneira como vivemos o esporte.',
    'about.p2':         'Nosso propósito é aproximar a América Latina das tecnologias mais inovadoras do mundo, conectando tecnologia, inovação e performance para criar experiências que tornem a prática esportiva mais inteligente, evolutiva e, acima de tudo, prazerosa.',
    'about.tagline':    'Technology. Performance. Innovation.',
    'about.dist':       'Distribuição exclusiva: Argentina, Chile, Colômbia e Peru.',

    'card.mecanum.kicker': 'Movimento, recepção e saque movidos por',
    'card.mecanum.title':  'Roda Mecanum e<br>câmera binocular 4K',
    'card.ntrp.kicker':    'Indicado para jogadores<br>de nível',
    'card.ntrp.sub':       'Nível NTRP',
    'card.speed.kicker':   'Velocidade da bola de até',
    'card.speed.value':    '97<span class="cap__unit">km/h</span>',
    'card.movement.kicker':'Até',
    'card.movement.sub':   'Velocidade de<br>deslocamento lateral',
    'card.spin.topspin':   'Topspin',
    'card.spin.flat':      'Bola plana',
    'card.spin.slice':     'Slice',
    'card.rally.title':    'Rallies<br>personalizados',
    'card.rally.sub':      'no iPhone, Android e<br>Apple Watch',

    'contact.eyebrow':  'Contato',
    'contact.title':    'Quer levar o futuro do tênis para a sua quadra?',

    'form.email':       'E-mail',
    'form.phone':       'Telefone / WhatsApp',
    'form.questions':   'Alguma pergunta? (opcional)',
    'form.submit':      'Quero saber mais',
    'form.err':         'Confira os dados informados.',
    'form.contact':     'Deixe seu e-mail ou telefone para podermos responder.',
    'form.sending':     'Enviando…',
    'form.ok':          'Obrigado! Entraremos em contato em breve.',
    'form.fail':        'Não conseguimos enviar o formulário. Tente novamente em alguns minutos.',

    'footer.rights':    '2026 Tennis Tech Hub. Todos os direitos reservados.'
  }
};

function detectLang(){
  const qs = new URLSearchParams(location.search).get('lang');
  if (LANGS.includes(qs)) { localStorage.setItem('tth.lang', qs); return qs; }

  const stored = localStorage.getItem('tth.lang');
  if (LANGS.includes(stored)) return stored;

  if (LANGS.includes(FORCE_LANG)) return FORCE_LANG;

  // What the browser says they read, in the visitor's own order of preference.
  // Region subtags are dropped: pt-BR and pt-PT are both served 'pt'.
  const tags = navigator.languages?.length ? navigator.languages
                                           : [navigator.language || ''];
  for (const tag of tags) {
    const base = String(tag).slice(0, 2).toLowerCase();
    if (LANGS.includes(base)) return base;
  }

  // Their browser is set to a language we do not publish. Guess from where they are.
  // Checked against LANGS too: the timezone map still names languages that may
  // currently be switched off.
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (LANGS.includes(TZ_LANG[tz])) return TZ_LANG[tz];
  } catch (_) { /* Intl unavailable — fall through */ }

  return DEFAULT_LANG;
}

/* persist=true only for a deliberate choice (the picker, or an explicit ?lang=).
   Auto-detected languages are NOT written to storage, so flipping FORCE_LANG to
   null later still reaches visitors who never picked anything themselves. */
function applyLang(lang, persist){
  const dict = STRINGS[LANGS.includes(lang) ? lang : DEFAULT_LANG];

  document.documentElement.lang = dict['html.lang'];

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const v = dict[el.dataset.i18n];
    if (v !== undefined) el.textContent = v;
  });
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const v = dict[el.dataset.i18nHtml];
    if (v !== undefined) el.innerHTML = v;
  });
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    const v = dict[el.dataset.i18nPh];
    if (v !== undefined) el.placeholder = v;
  });

  const label = document.getElementById('langlabel');
  if (label) label.textContent = dict['html.lang'].toUpperCase();

  const flag = document.getElementById('langflag');
  if (flag) flag.src = `assets/flags/${LANG_FLAG[dict['html.lang']]}.png`;

  document.querySelectorAll('.langpicker__list [data-lang]').forEach(b => {
    b.setAttribute('aria-selected', String(b.dataset.lang === dict['html.lang']));
  });

  if (persist) localStorage.setItem('tth.lang', dict['html.lang']);
}

window.TTH_I18N = { STRINGS, LANGS, detectLang, applyLang, current: () => document.documentElement.lang };
