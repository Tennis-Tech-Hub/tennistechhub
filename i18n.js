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

/* Any string may contain {year}; it is replaced with the current year at render
   time so the footer copyright never needs a yearly edit. The literal year left
   in the markup is only the no-JS fallback. */
const YEAR = String(new Date().getFullYear());

/* Which languages the picker offers and detection may choose. The pt STRINGS
   block below is complete and kept in place — add 'pt' back here and restore the
   option in index.html to turn Portuguese back on. Anything not listed here is
   ignored by detection and by ?lang=, so a Brazilian visitor gets Spanish. */
const LANGS = ['es', 'en'];

/* Pins the first-visit language for everyone, ignoring detection. null = detect.
   Set this to 'es' | 'en' | 'pt' to hard-launch a single language, e.g. while a
   translation is still being reviewed. ?lang= and the picker still override it. */
const FORCE_LANG = null;

/* The short code shown on the picker, chosen to be the one a speaker of that
   language recognises rather than the ISO 639-3 code (which would be 'spa'). */
const LANG_CODE = { es: 'ESP', en: 'ENG', pt: 'POR' };

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

    'footer.privacy':   'Privacidad',
    'footer.terms':     'Términos',

    /* ---- legal page (legal.html) ---- */
    'legal.eyebrow':    'Legal',
    'legal.updated':    'Última actualización: 4 de septiembre de 2026',
    'legal.privacy.doctitle': 'Política de Privacidad — Tennis Tech Hub',
    'legal.terms.doctitle':   'Términos de Servicio — Tennis Tech Hub',
    'legal.privacy.intro':    'Qué datos personales tratamos cuando visitas este sitio o nos escribes, para qué los usamos y qué puedes hacer al respecto. Es un texto general: si tu caso necesita una respuesta concreta, escríbenos y te la damos por escrito.',
    'legal.terms.intro':      'Las condiciones bajo las que puedes usar este sitio y el alcance de la información que publicamos en él. Es un texto general: si tu consulta se refiere a una compra concreta, escríbenos y te respondemos por escrito.',
    'legal.see.privacy':      'Ver también: Política de Privacidad',
    'legal.see.terms':        'Ver también: Términos de Servicio',
    'legal.back':       'Volver al inicio',

    'legal.privacy.h':  'Política de Privacidad',
    'legal.p1.h':  'Quiénes somos',
    'legal.p1.b':  '<p>Este sitio es operado por Tennis Tech Hub («Tennis Tech Hub», «nosotros»), distribuidor del Acemate Tennis Robot S10 en América Latina. Esta política explica qué datos personales tratamos cuando visitas el sitio o nos escribes, para qué los usamos y qué puedes hacer al respecto.</p><p>Para cualquier consulta sobre privacidad, escríbenos a <a href="mailto:contact@tennistechhub.com">contact@tennistechhub.com</a>.</p>',
    'legal.p2.h':  'Qué datos recopilamos',
    'legal.p2.b':  '<p>Solo tratamos dos tipos de datos:</p><ul><li><strong>Los que nos entregas.</strong> Al completar el formulario de contacto: tu e-mail y/o tu teléfono, el mensaje que escribas y el idioma en que navegabas. No pedimos ningún otro dato, y el único campo imprescindible es una forma de contacto.</li><li><strong>Los que genera tu visita.</strong> Datos técnicos y de uso recogidos por nuestras herramientas de medición: páginas vistas, tiempo en el sitio, tipo de dispositivo y navegador, idioma, país aproximado y la dirección IP desde la que llegas.</li></ul><p>No recopilamos datos sensibles, no solicitamos información de pago en este sitio y no tomamos decisiones automatizadas que te afecten.</p>',
    'legal.p3.h':  'Para qué los usamos',
    'legal.p3.b':  '<ul><li>Responder tus consultas y coordinar demostraciones del producto.</li><li>Enviarte información comercial sobre Acemate y Tennis Tech Hub cuando nos la has pedido.</li><li>Entender cómo se usa el sitio y mejorarlo.</li><li>Cumplir obligaciones legales y prevenir el uso abusivo del formulario.</li></ul><p>No vendemos tus datos personales ni los cedemos a terceros con fines publicitarios.</p>',
    'legal.p4.h':  'Base legal',
    'legal.p4.b':  '<p>Tratamos tus datos con tu consentimiento, que otorgas al enviarnos el formulario, y por nuestro interés legítimo en responder consultas comerciales, mantener el sitio seguro y medir su rendimiento. Puedes retirar tu consentimiento en cualquier momento escribiéndonos; ello no afecta la licitud del tratamiento anterior.</p>',
    'legal.p5.h':  'Cookies y analítica',
    'legal.p5.b':  '<p>Este sitio usa Google Tag Manager y herramientas de medición de Google, que pueden instalar cookies o identificadores similares en tu dispositivo para contar visitas y evaluar el rendimiento de nuestras campañas. También usamos el almacenamiento local de tu navegador para recordar el idioma que elegiste; ese dato no sale de tu dispositivo.</p><p>Puedes bloquear o borrar las cookies desde la configuración de tu navegador. El sitio seguirá funcionando, aunque algunas preferencias dejarán de recordarse.</p>',
    'legal.p6.h':  'Con quién los compartimos',
    'legal.p6.b':  '<p>Compartimos datos únicamente con proveedores que nos prestan un servicio, y solo en la medida necesaria:</p><ul><li>El servicio que procesa y nos entrega los envíos del formulario de contacto.</li><li>Nuestro proveedor de alojamiento y su red de distribución de contenidos.</li><li>Proveedores de analítica y medición.</li><li>El fabricante del producto, cuando tu consulta requiere su intervención técnica o comercial.</li></ul><p>También podemos entregar datos cuando una autoridad competente lo exija conforme a la ley.</p>',
    'legal.p7.h':  'Cuánto tiempo los conservamos',
    'legal.p7.b':  '<p>Conservamos los datos de contacto mientras exista una relación comercial o un interés razonable en retomarla, y después durante el plazo que exijan las obligaciones legales aplicables. Los datos de medición se conservan de forma agregada, según los plazos de retención de la herramienta correspondiente.</p>',
    'legal.p8.h':  'Tus derechos',
    'legal.p8.b':  '<p>Puedes solicitar en cualquier momento el acceso, la rectificación, la actualización, la supresión o la portabilidad de tus datos personales, oponerte a su tratamiento o limitarlo, y dejar de recibir nuestras comunicaciones. Escríbenos a <a href="mailto:contact@tennistechhub.com">contact@tennistechhub.com</a> y responderemos dentro de los plazos que fije la normativa aplicable en tu país. Si consideras que no atendimos bien tu solicitud, puedes reclamar ante la autoridad de protección de datos de tu jurisdicción.</p>',
    'legal.p9.h':  'Seguridad y transferencias internacionales',
    'legal.p9.b':  '<p>Aplicamos medidas técnicas y organizativas razonables para proteger tus datos, incluido el cifrado del tráfico del sitio. Ningún sistema es infalible, de modo que no podemos garantizar una seguridad absoluta.</p><p>Algunos de nuestros proveedores operan servidores fuera de tu país de residencia. Al usar el sitio y enviarnos el formulario aceptas que tus datos puedan tratarse en esas jurisdicciones, con las salvaguardas contractuales correspondientes.</p>',
    'legal.p10.h': 'Menores y cambios en esta política',
    'legal.p10.b': '<p>Este sitio no está dirigido a menores de edad y no recopilamos de forma consciente datos de personas menores de 18 años.</p><p>Podemos actualizar esta política. La versión vigente es siempre la publicada en esta página, con su fecha de última actualización; si el cambio es sustancial, lo señalaremos de forma visible.</p>',

    'legal.terms.h': 'Términos de Servicio',
    'legal.t1.h':  'Aceptación de los términos',
    'legal.t1.b':  '<p>Al acceder a este sitio y utilizarlo aceptas estos Términos de Servicio y nuestra <a href="privacy.html">Política de Privacidad</a>. Si no estás de acuerdo con ellos, te pedimos que no uses el sitio.</p>',
    'legal.t2.h':  'Finalidad del sitio',
    'legal.t2.b':  '<p>Este sitio es informativo y promocional. Su contenido no constituye una oferta vinculante, una cotización ni un contrato de compraventa. Toda operación comercial se formaliza por separado, mediante una propuesta escrita y sus condiciones particulares.</p>',
    'legal.t3.h':  'Información del producto',
    'legal.t3.b':  '<p>Las descripciones, imágenes, videos y especificaciones técnicas del Acemate Tennis Robot S10 provienen del fabricante y se publican de buena fe. Las cifras de rendimiento se obtienen en condiciones de prueba y pueden variar según la superficie, el clima, el nivel del jugador y la configuración del equipo. El fabricante puede modificar especificaciones, disponibilidad y precios sin previo aviso.</p><p>La garantía, el soporte y el servicio postventa se rigen por las condiciones del fabricante y por los derechos que la legislación de consumo de tu país te reconoce.</p>',
    'legal.t4.h':  'Propiedad intelectual',
    'legal.t4.b':  '<p>Las marcas, logotipos, textos, fotografías, videos, diseños y demás contenidos del sitio pertenecen a Tennis Tech Hub, al fabricante o a sus respectivos titulares, y están protegidos por la legislación de propiedad intelectual. Puedes verlos y compartirlos con fines personales y no comerciales. Cualquier reproducción, distribución, modificación o uso comercial requiere autorización previa y por escrito.</p>',
    'legal.t5.h':  'Uso permitido',
    'legal.t5.b':  '<p>Te comprometes a no usar el sitio con fines ilícitos ni de un modo que pueda dañarlo o afectar su disponibilidad. En particular, no está permitido intentar acceder a áreas no públicas, introducir código malicioso, extraer contenido de forma automatizada sin autorización, ni enviar por el formulario información falsa, datos de terceros sin su permiso o comunicaciones no solicitadas.</p>',
    'legal.t6.h':  'Enlaces y servicios de terceros',
    'legal.t6.b':  '<p>El sitio puede enlazar a sitios y servicios operados por terceros, y se apoya en proveedores externos para el formulario, la medición y el alojamiento. No controlamos esos servicios ni respondemos por sus contenidos, sus prácticas o sus políticas de privacidad, que deberás consultar por separado.</p>',
    'legal.t7.h':  'Ausencia de garantías',
    'legal.t7.b':  '<p>El sitio se ofrece «tal cual» y «según disponibilidad». Aunque procuramos que la información esté actualizada y sea correcta, no garantizamos que esté libre de errores ni que el sitio funcione de forma ininterrumpida y segura en todo momento.</p>',
    'legal.t8.h':  'Limitación de responsabilidad',
    'legal.t8.b':  '<p>En la máxima medida que permita la ley, Tennis Tech Hub no responderá por daños indirectos o incidentales ni por lucro cesante derivados del uso o de la imposibilidad de uso del sitio, ni por decisiones tomadas exclusivamente sobre la base de la información publicada aquí. Nada en estos términos excluye la responsabilidad que la ley no permite excluir, incluidos los derechos que te correspondan como consumidor.</p>',
    'legal.t9.h':  'Privacidad y comunicaciones',
    'legal.t9.b':  '<p>El tratamiento de los datos que nos envías se rige por nuestra <a href="privacy.html">Política de Privacidad</a>. Al dejarnos tu e-mail o tu teléfono aceptas que te contactemos por esos medios, incluido WhatsApp, para responder tu consulta. Puedes pedirnos que dejemos de hacerlo en cualquier momento.</p>',
    'legal.t10.h': 'Modificaciones y ley aplicable',
    'legal.t10.b': '<p>Podemos modificar estos términos y el contenido del sitio en cualquier momento; la versión vigente es la publicada en esta página. Estos términos se rigen por la legislación del país donde Tennis Tech Hub tiene su domicilio, sin perjuicio de las normas imperativas de protección al consumidor del país de tu residencia habitual.</p><p>Para cualquier consulta sobre estos términos, escríbenos a <a href="mailto:contact@tennistechhub.com">contact@tennistechhub.com</a>.</p>',

    'footer.rights':    '{year} Tennis Tech Hub. Todos los derechos reservados.'
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

    'footer.privacy':   'Privacy',
    'footer.terms':     'Terms',

    /* ---- legal page (legal.html) ---- */
    'legal.eyebrow':    'Legal',
    'legal.updated':    'Last updated: 4 September 2026',
    'legal.privacy.doctitle': 'Privacy Policy — Tennis Tech Hub',
    'legal.terms.doctitle':   'Terms of Service — Tennis Tech Hub',
    'legal.privacy.intro':    'What personal data we handle when you visit this site or write to us, what we use it for and what you can do about it. It is written in general terms: if your case needs a specific answer, write to us and we will give you one in writing.',
    'legal.terms.intro':      'The conditions under which you may use this site, and the scope of the information we publish on it. It is written in general terms: if your question concerns a specific purchase, write to us and we will answer in writing.',
    'legal.see.privacy':      'See also: Privacy Policy',
    'legal.see.terms':        'See also: Terms of Service',
    'legal.back':       'Back to the site',

    'legal.privacy.h':  'Privacy Policy',
    'legal.p1.h':  'Who we are',
    'legal.p1.b':  '<p>This site is operated by Tennis Tech Hub (“Tennis Tech Hub”, “we”, “us”), distributor of the Acemate Tennis Robot S10 in Latin America. This policy explains what personal data we handle when you visit the site or write to us, what we use it for, and what you can do about it.</p><p>For any privacy question, write to us at <a href="mailto:contact@tennistechhub.com">contact@tennistechhub.com</a>.</p>',
    'legal.p2.h':  'What we collect',
    'legal.p2.b':  '<p>We handle only two kinds of data:</p><ul><li><strong>What you give us.</strong> When you fill in the contact form: your e-mail and/or phone number, the message you write and the language you were browsing in. We ask for nothing else, and the only field we genuinely need is one way to reach you.</li><li><strong>What your visit generates.</strong> Technical and usage data collected by our measurement tools: pages viewed, time on site, device and browser type, language, approximate country and the IP address you arrive from.</li></ul><p>We do not collect sensitive data, we do not ask for payment details on this site, and we do not make automated decisions that affect you.</p>',
    'legal.p3.h':  'What we use it for',
    'legal.p3.b':  '<ul><li>Answering your enquiries and arranging product demonstrations.</li><li>Sending you commercial information about Acemate and Tennis Tech Hub when you have asked for it.</li><li>Understanding how the site is used and improving it.</li><li>Meeting legal obligations and preventing abuse of the form.</li></ul><p>We do not sell your personal data and we do not pass it to third parties for advertising purposes.</p>',
    'legal.p4.h':  'Legal basis',
    'legal.p4.b':  '<p>We process your data with your consent, given when you submit the form, and on our legitimate interest in answering commercial enquiries, keeping the site secure and measuring its performance. You can withdraw your consent at any time by writing to us; doing so does not affect the lawfulness of processing carried out beforehand.</p>',
    'legal.p5.h':  'Cookies and analytics',
    'legal.p5.b':  '<p>This site uses Google Tag Manager and Google measurement tools, which may set cookies or similar identifiers on your device to count visits and assess how our campaigns perform. We also use your browser’s local storage to remember the language you chose; that value never leaves your device.</p><p>You can block or delete cookies in your browser settings. The site will keep working, though some preferences will no longer be remembered.</p>',
    'legal.p6.h':  'Who we share it with',
    'legal.p6.b':  '<p>We share data only with providers who perform a service for us, and only as far as necessary:</p><ul><li>The service that processes and delivers contact-form submissions to us.</li><li>Our hosting provider and its content delivery network.</li><li>Analytics and measurement providers.</li><li>The product manufacturer, where your enquiry requires their technical or commercial input.</li></ul><p>We may also disclose data where a competent authority requires it under the law.</p>',
    'legal.p7.h':  'How long we keep it',
    'legal.p7.b':  '<p>We keep contact details for as long as a commercial relationship exists or there is a reasonable prospect of resuming one, and thereafter for whatever period applicable legal obligations require. Measurement data is retained in aggregate form, in line with the retention periods of the tool concerned.</p>',
    'legal.p8.h':  'Your rights',
    'legal.p8.b':  '<p>You may at any time request access to, correction, updating, deletion or portability of your personal data, object to or restrict its processing, and opt out of our communications. Write to <a href="mailto:contact@tennistechhub.com">contact@tennistechhub.com</a> and we will respond within the time limits set by the rules that apply in your country. If you believe we have not handled your request properly, you may complain to the data protection authority in your jurisdiction.</p>',
    'legal.p9.h':  'Security and international transfers',
    'legal.p9.b':  '<p>We apply reasonable technical and organisational measures to protect your data, including encryption of the site’s traffic. No system is foolproof, so we cannot guarantee absolute security.</p><p>Some of our providers run servers outside your country of residence. By using the site and sending us the form you accept that your data may be processed in those jurisdictions, under the corresponding contractual safeguards.</p>',
    'legal.p10.h': 'Minors and changes to this policy',
    'legal.p10.b': '<p>This site is not directed at minors and we do not knowingly collect data from anyone under 18.</p><p>We may update this policy. The version in force is always the one published on this page, with its last-updated date; where a change is substantial we will flag it clearly.</p>',

    'legal.terms.h': 'Terms of Service',
    'legal.t1.h':  'Acceptance of these terms',
    'legal.t1.b':  '<p>By accessing and using this site you accept these Terms of Service and our <a href="privacy.html">Privacy Policy</a>. If you do not agree with them, please do not use the site.</p>',
    'legal.t2.h':  'Purpose of the site',
    'legal.t2.b':  '<p>This site is informational and promotional. Its content is not a binding offer, a quotation or a contract of sale. Any commercial transaction is agreed separately, through a written proposal and its particular conditions.</p>',
    'legal.t3.h':  'Product information',
    'legal.t3.b':  '<p>The descriptions, images, videos and technical specifications of the Acemate Tennis Robot S10 come from the manufacturer and are published in good faith. Performance figures are obtained under test conditions and may vary with the surface, the weather, the player’s level and how the unit is configured. The manufacturer may change specifications, availability and prices without notice.</p><p>Warranty, support and after-sales service are governed by the manufacturer’s conditions and by the rights consumer law grants you in your country.</p>',
    'legal.t4.h':  'Intellectual property',
    'legal.t4.b':  '<p>The trade marks, logos, text, photographs, videos, designs and other content on the site belong to Tennis Tech Hub, to the manufacturer or to their respective owners, and are protected by intellectual property law. You may view and share the content for personal, non-commercial purposes. Any reproduction, distribution, modification or commercial use requires our prior written permission.</p>',
    'legal.t5.h':  'Acceptable use',
    'legal.t5.b':  '<p>You agree not to use the site for unlawful purposes or in any way that could damage it or affect its availability. In particular, you may not attempt to reach non-public areas, introduce malicious code, extract content by automated means without authorisation, or use the form to send false information, other people’s details without their permission, or unsolicited communications.</p>',
    'legal.t6.h':  'Third-party links and services',
    'legal.t6.b':  '<p>The site may link to sites and services run by third parties, and relies on outside providers for the form, measurement and hosting. We do not control those services and are not responsible for their content, their practices or their privacy policies, which you should review separately.</p>',
    'legal.t7.h':  'No warranties',
    'legal.t7.b':  '<p>The site is provided “as is” and “as available”. Although we work to keep the information current and correct, we do not warrant that it is free of errors, or that the site will run uninterrupted and secure at all times.</p>',
    'legal.t8.h':  'Limitation of liability',
    'legal.t8.b':  '<p>To the fullest extent the law allows, Tennis Tech Hub will not be liable for indirect or incidental damages or loss of profit arising from the use of, or inability to use, the site, nor for decisions taken solely on the basis of the information published here. Nothing in these terms excludes liability that the law does not permit to be excluded, including any rights you have as a consumer.</p>',
    'legal.t9.h':  'Privacy and communications',
    'legal.t9.b':  '<p>The handling of the data you send us is governed by our <a href="privacy.html">Privacy Policy</a>. By leaving us your e-mail or phone number you agree that we may contact you by those means, including WhatsApp, in order to answer your enquiry. You can ask us to stop at any time.</p>',
    'legal.t10.h': 'Changes and governing law',
    'legal.t10.b': '<p>We may change these terms and the content of the site at any time; the version in force is the one published on this page. These terms are governed by the law of the country in which Tennis Tech Hub is established, without prejudice to the mandatory consumer protection rules of your country of habitual residence.</p><p>For any question about these terms, write to us at <a href="mailto:contact@tennistechhub.com">contact@tennistechhub.com</a>.</p>',

    'footer.rights':    '{year} Tennis Tech Hub. All rights reserved.'
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

    'footer.privacy':   'Privacidade',
    'footer.terms':     'Termos',

    /* ---- legal page (legal.html) ---- */
    'legal.eyebrow':    'Legal',
    'legal.updated':    'Última atualização: 4 de setembro de 2026',
    'legal.privacy.doctitle': 'Política de Privacidade — Tennis Tech Hub',
    'legal.terms.doctitle':   'Termos de Serviço — Tennis Tech Hub',
    'legal.privacy.intro':    'Quais dados pessoais tratamos quando você visita este site ou nos escreve, para que os usamos e o que você pode fazer a respeito. É um texto geral: se o seu caso exigir uma resposta específica, escreva para nós e responderemos por escrito.',
    'legal.terms.intro':      'As condições sob as quais você pode usar este site e o alcance das informações que publicamos nele. É um texto geral: se a sua dúvida se referir a uma compra específica, escreva para nós e responderemos por escrito.',
    'legal.see.privacy':      'Ver também: Política de Privacidade',
    'legal.see.terms':        'Ver também: Termos de Serviço',
    'legal.back':       'Voltar ao início',

    'legal.privacy.h':  'Política de Privacidade',
    'legal.p1.h':  'Quem somos',
    'legal.p1.b':  '<p>Este site é operado pela Tennis Tech Hub («Tennis Tech Hub», «nós»), distribuidora do Acemate Tennis Robot S10 na América Latina. Esta política explica quais dados pessoais tratamos quando você visita o site ou nos escreve, para que os usamos e o que você pode fazer a respeito.</p><p>Para qualquer dúvida sobre privacidade, escreva para <a href="mailto:contact@tennistechhub.com">contact@tennistechhub.com</a>.</p>',
    'legal.p2.h':  'Quais dados coletamos',
    'legal.p2.b':  '<p>Tratamos apenas dois tipos de dados:</p><ul><li><strong>Os que você nos fornece.</strong> Ao preencher o formulário de contato: seu e-mail e/ou telefone, a mensagem que escrever e o idioma em que navegava. Não pedimos nenhum outro dado, e o único campo realmente necessário é uma forma de contato.</li><li><strong>Os gerados pela sua visita.</strong> Dados técnicos e de uso coletados pelas nossas ferramentas de medição: páginas vistas, tempo no site, tipo de dispositivo e navegador, idioma, país aproximado e o endereço IP de onde você acessa.</li></ul><p>Não coletamos dados sensíveis, não solicitamos informações de pagamento neste site e não tomamos decisões automatizadas que afetem você.</p>',
    'legal.p3.h':  'Para que os usamos',
    'legal.p3.b':  '<ul><li>Responder às suas dúvidas e agendar demonstrações do produto.</li><li>Enviar informações comerciais sobre a Acemate e a Tennis Tech Hub quando você as solicitou.</li><li>Entender como o site é usado e melhorá-lo.</li><li>Cumprir obrigações legais e prevenir o uso abusivo do formulário.</li></ul><p>Não vendemos os seus dados pessoais nem os cedemos a terceiros para fins publicitários.</p>',
    'legal.p4.h':  'Base legal',
    'legal.p4.b':  '<p>Tratamos os seus dados com o seu consentimento, dado ao enviar o formulário, e com base no nosso legítimo interesse em responder a consultas comerciais, manter o site seguro e medir o seu desempenho. Você pode retirar o consentimento a qualquer momento escrevendo para nós; isso não afeta a licitude do tratamento anterior.</p>',
    'legal.p5.h':  'Cookies e medição',
    'legal.p5.b':  '<p>Este site usa o Google Tag Manager e ferramentas de medição do Google, que podem instalar cookies ou identificadores semelhantes no seu dispositivo para contar visitas e avaliar o desempenho das nossas campanhas. Também usamos o armazenamento local do navegador para lembrar o idioma escolhido; esse dado não sai do seu dispositivo.</p><p>Você pode bloquear ou apagar os cookies nas configurações do navegador. O site continuará funcionando, embora algumas preferências deixem de ser lembradas.</p>',
    'legal.p6.h':  'Com quem os compartilhamos',
    'legal.p6.b':  '<p>Compartilhamos dados apenas com fornecedores que nos prestam um serviço, e somente na medida necessária:</p><ul><li>O serviço que processa e nos entrega os envios do formulário de contato.</li><li>Nosso provedor de hospedagem e sua rede de distribuição de conteúdo.</li><li>Fornecedores de analytics e medição.</li><li>O fabricante do produto, quando a sua dúvida exigir a intervenção técnica ou comercial dele.</li></ul><p>Também podemos fornecer dados quando uma autoridade competente o exigir nos termos da lei.</p>',
    'legal.p7.h':  'Por quanto tempo os guardamos',
    'legal.p7.b':  '<p>Guardamos os dados de contato enquanto existir uma relação comercial ou um interesse razoável em retomá-la, e depois pelo prazo exigido pelas obrigações legais aplicáveis. Os dados de medição são conservados de forma agregada, conforme os prazos de retenção da ferramenta correspondente.</p>',
    'legal.p8.h':  'Os seus direitos',
    'legal.p8.b':  '<p>Você pode solicitar a qualquer momento o acesso, a correção, a atualização, a exclusão ou a portabilidade dos seus dados pessoais, opor-se ao tratamento ou limitá-lo, e deixar de receber as nossas comunicações. Escreva para <a href="mailto:contact@tennistechhub.com">contact@tennistechhub.com</a> e responderemos nos prazos fixados pela legislação aplicável no seu país. Se considerar que a sua solicitação não foi bem atendida, pode reclamar junto à autoridade de proteção de dados da sua jurisdição.</p>',
    'legal.p9.h':  'Segurança e transferências internacionais',
    'legal.p9.b':  '<p>Aplicamos medidas técnicas e organizacionais razoáveis para proteger os seus dados, incluindo a criptografia do tráfego do site. Nenhum sistema é infalível, portanto não podemos garantir segurança absoluta.</p><p>Alguns dos nossos fornecedores operam servidores fora do seu país de residência. Ao usar o site e enviar o formulário, você aceita que os seus dados possam ser tratados nessas jurisdições, com as salvaguardas contratuais correspondentes.</p>',
    'legal.p10.h': 'Menores e alterações nesta política',
    'legal.p10.b': '<p>Este site não se destina a menores de idade e não coletamos conscientemente dados de pessoas com menos de 18 anos.</p><p>Podemos atualizar esta política. A versão em vigor é sempre a publicada nesta página, com a sua data de última atualização; se a alteração for substancial, iremos sinalizá-la de forma visível.</p>',

    'legal.terms.h': 'Termos de Serviço',
    'legal.t1.h':  'Aceitação dos termos',
    'legal.t1.b':  '<p>Ao acessar e usar este site, você aceita estes Termos de Serviço e a nossa <a href="privacy.html">Política de Privacidade</a>. Se não concordar com eles, pedimos que não use o site.</p>',
    'legal.t2.h':  'Finalidade do site',
    'legal.t2.b':  '<p>Este site é informativo e promocional. Seu conteúdo não constitui oferta vinculante, orçamento ou contrato de compra e venda. Qualquer operação comercial é formalizada separadamente, por meio de uma proposta escrita e das suas condições particulares.</p>',
    'legal.t3.h':  'Informações do produto',
    'legal.t3.b':  '<p>As descrições, imagens, vídeos e especificações técnicas do Acemate Tennis Robot S10 vêm do fabricante e são publicadas de boa-fé. Os números de desempenho são obtidos em condições de teste e podem variar conforme a superfície, o clima, o nível do jogador e a configuração do equipamento. O fabricante pode alterar especificações, disponibilidade e preços sem aviso prévio.</p><p>A garantia, o suporte e o serviço pós-venda regem-se pelas condições do fabricante e pelos direitos que a legislação de consumo do seu país lhe reconhece.</p>',
    'legal.t4.h':  'Propriedade intelectual',
    'legal.t4.b':  '<p>As marcas, logotipos, textos, fotografias, vídeos, projetos e demais conteúdos do site pertencem à Tennis Tech Hub, ao fabricante ou aos seus respectivos titulares, e estão protegidos pela legislação de propriedade intelectual. Você pode visualizá-los e compartilhá-los para fins pessoais e não comerciais. Qualquer reprodução, distribuição, modificação ou uso comercial exige autorização prévia e por escrito.</p>',
    'legal.t5.h':  'Uso permitido',
    'legal.t5.b':  '<p>Você se compromete a não usar o site para fins ilícitos nem de modo que possa danificá-lo ou afetar a sua disponibilidade. Em particular, não é permitido tentar acessar áreas não públicas, introduzir código malicioso, extrair conteúdo de forma automatizada sem autorização, nem enviar pelo formulário informações falsas, dados de terceiros sem a permissão deles ou comunicações não solicitadas.</p>',
    'legal.t6.h':  'Links e serviços de terceiros',
    'legal.t6.b':  '<p>O site pode conter links para sites e serviços operados por terceiros e apoia-se em fornecedores externos para o formulário, a medição e a hospedagem. Não controlamos esses serviços nem respondemos pelos seus conteúdos, práticas ou políticas de privacidade, que devem ser consultados separadamente.</p>',
    'legal.t7.h':  'Ausência de garantias',
    'legal.t7.b':  '<p>O site é oferecido «no estado em que se encontra» e «conforme disponibilidade». Embora procuremos manter a informação atualizada e correta, não garantimos que esteja livre de erros nem que o site funcione de forma ininterrupta e segura o tempo todo.</p>',
    'legal.t8.h':  'Limitação de responsabilidade',
    'legal.t8.b':  '<p>Na máxima extensão permitida pela lei, a Tennis Tech Hub não responderá por danos indiretos ou incidentais nem por lucros cessantes decorrentes do uso ou da impossibilidade de uso do site, nem por decisões tomadas exclusivamente com base na informação aqui publicada. Nada nestes termos exclui a responsabilidade que a lei não permite excluir, incluídos os direitos que lhe cabem como consumidor.</p>',
    'legal.t9.h':  'Privacidade e comunicações',
    'legal.t9.b':  '<p>O tratamento dos dados que você nos envia rege-se pela nossa <a href="privacy.html">Política de Privacidade</a>. Ao deixar o seu e-mail ou telefone, você aceita que o contatemos por esses meios, incluindo o WhatsApp, para responder à sua dúvida. Pode nos pedir para parar a qualquer momento.</p>',
    'legal.t10.h': 'Alterações e lei aplicável',
    'legal.t10.b': '<p>Podemos alterar estes termos e o conteúdo do site a qualquer momento; a versão em vigor é a publicada nesta página. Estes termos regem-se pela legislação do país onde a Tennis Tech Hub tem sede, sem prejuízo das normas imperativas de proteção ao consumidor do país da sua residência habitual.</p><p>Para qualquer dúvida sobre estes termos, escreva para <a href="mailto:contact@tennistechhub.com">contact@tennistechhub.com</a>.</p>',

    'footer.rights':    '{year} Tennis Tech Hub. Todos os direitos reservados.'
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

  const str = key => {
    const v = dict[key];
    return v === undefined ? undefined : v.replace('{year}', YEAR);
  };

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const v = str(el.dataset.i18n);
    if (v !== undefined) el.textContent = v;
  });
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const v = str(el.dataset.i18nHtml);
    if (v !== undefined) el.innerHTML = v;
  });
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    const v = str(el.dataset.i18nPh);
    if (v !== undefined) el.placeholder = v;
  });

  const label = document.getElementById('langlabel');
  if (label) label.textContent = LANG_CODE[dict['html.lang']];

  document.querySelectorAll('.langpicker__list [data-lang]').forEach(b => {
    b.setAttribute('aria-selected', String(b.dataset.lang === dict['html.lang']));
  });

  if (persist) localStorage.setItem('tth.lang', dict['html.lang']);
}

window.TTH_I18N = { STRINGS, LANGS, detectLang, applyLang, current: () => document.documentElement.lang };
