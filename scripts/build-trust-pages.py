#!/usr/bin/env python3
"""Builds the four trust pages (privacy, terms, support, donations) in English and Spanish.

Edit the CONTENT below, then run:  python3 scripts/build-trust-pages.py
Each page shows the reader's site language (saved by the app as atlas-lang) with a toggle,
an "at a glance" summary, a table of contents and the full text.
"""
import html
import json
import pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
UPDATED = {"en": "November 9, 2026", "es": "9 de noviembre de 2026"}
SITE = "https://eddyarriaga00.github.io/CS-Course-Atlas/"

NAV = [
    ("privacy-policy.html", {"en": "Privacy", "es": "Privacidad"}),
    ("terms-of-use.html", {"en": "Terms", "es": "Términos"}),
    ("contact-support.html", {"en": "Support", "es": "Soporte"}),
    ("donations-refunds.html", {"en": "Donations", "es": "Donaciones"}),
]

UI = {
    "en": {"back": "Back to the courses", "updated": "Last updated", "glance": "At a glance", "contents": "On this page",
           "lang": "Español", "langCode": "es", "foot": "Questions about this page? <a href=\"contact-support.html\">Contact support</a>.",
           "toTop": "Back to top"},
    "es": {"back": "Volver a los cursos", "updated": "Última actualización", "glance": "En resumen", "contents": "En esta página",
           "lang": "English", "langCode": "en", "foot": "¿Preguntas sobre esta página? <a href=\"contact-support.html\">Contacta a soporte</a>.",
           "toTop": "Volver arriba"},
}

# Each page: title, description, intro, glance (list of [icon, strong, text]), sections (id, heading, html body).
PAGES = {
"privacy-policy.html": {
"en": {
"title": "Privacy Policy",
"description": "What CS Course Atlas collects, why, where it is stored and how to delete it. No ads, no tracking, no selling data.",
"intro": "CS Course Atlas is a free learning site. You can use every lesson, example, quiz and challenge without an account, and then nothing about you leaves your device. This page explains what changes when you create an account, in plain language.",
"glance": [
 ["🚫", "No ads, no trackers, no selling.", "There are no analytics scripts, advertising cookies or data brokers. We never sell or rent personal data."],
 ["💻", "Your code stays on your device.", "Python, Java, C++, JavaScript, SQL and the terminal run inside your browser. Code you write is not uploaded."],
 ["🔑", "An account is optional.", "It only exists to save and sync your progress, notes and scores across devices."],
 ["🗑️", "Delete any time.", "Account → Delete account removes your profile, progress and notes immediately."],
],
"sections": [
("without-account", "Using the site without an account", """
<p>Without an account, your progress, notes, quiz scores, preferences (language, theme) and code drafts are saved only in your browser's local storage on that device. We cannot see them. Clearing your browser data removes them. The site also keeps an offline copy of its own pages and course files in your browser so it works without a connection.</p>
"""),
("what-we-collect", "What we collect when you create an account", """
<ul>
<li><b>Account details:</b> your email address and username, and a display name if you set one. Email-and-password accounts store a one-way scrypt hash of the password, never the password itself.</li>
<li><b>Google or GitHub sign-in:</b> if you choose it, that service tells us your verified email address, your name, your profile picture link and an account ID. We never see your Google or GitHub password, and we only ask for read-only access to your email and basic profile.</li>
<li><b>Learning data:</b> the progress, notes, quiz scores, flashcard reviews, solved challenges and preferences you choose to sync.</li>
<li><b>Security data:</b> sign-in sessions (stored as hashes, with a hashed IP address and the browser's user-agent text), hashed one-time recovery codes and email codes, and hashed counters of failed sign-in attempts used to stop password guessing.</li>
<li><b>Support messages:</b> what you write in the support form, plus an email address only if you add one.</li>
</ul>
<p>We do not collect your location, contacts, payment details, or the code you run in the playground.</p>
"""),
("how-we-use", "How we use it", """
<ul>
<li>To sign you in, keep you signed in, and sync your learning data to other devices.</li>
<li>To send account emails only: a code to confirm your email address, password-reset codes you ask for, and codes to confirm an email change. No newsletters or marketing.</li>
<li>To protect accounts: rate limits and temporary lockouts after repeated failed attempts.</li>
<li>To answer support requests and fix reported problems.</li>
</ul>
"""),
("services", "Services that help run the site", """
<p>These companies process data for us, only to provide the parts listed. Each has its own privacy policy.</p>
<table class="trust-table">
<thead><tr><th>Service</th><th>What it does</th><th>What it can see</th></tr></thead>
<tbody>
<tr><td>GitHub Pages</td><td>Hosts the website files</td><td>Standard web request logs (IP address, pages requested)</td></tr>
<tr><td>Render</td><td>Runs the account server</td><td>Requests to the account server</td></tr>
<tr><td>Neon</td><td>Stores the account database</td><td>The account data described above</td></tr>
<tr><td>Google</td><td>Google sign-in; sends account emails through Gmail; serves the site's font (Google Fonts)</td><td>Your Google sign-in; the email address a code is sent to; font requests</td></tr>
<tr><td>GitHub</td><td>GitHub sign-in</td><td>Your GitHub sign-in</td></tr>
<tr><td>jsDelivr, cdnjs, Leaning Technologies</td><td>Deliver the in-browser Python, C++, SQL and Java engines and code highlighting</td><td>Download requests for those files (no code you write)</td></tr>
<tr><td>YouTube</td><td>Lesson videos</td><td>Only if you open a video, which plays on YouTube</td></tr>
</tbody></table>
"""),
("cookies", "Cookies and local storage", """
<p>The account server sets one secure, HTTP-only cookie to keep you signed in, and a short-lived one during Google or GitHub sign-in. The site also stores a sign-in token and your learning data in your browser's local storage. There are no advertising or analytics cookies.</p>
"""),
("retention", "How long we keep it", """
<ul>
<li>Account and learning data: until you delete your account.</li>
<li>Sign-in sessions: up to 30 days, or until you sign out or change your password.</li>
<li>Email and recovery codes: email codes expire after 30 minutes; recovery codes until used or replaced.</li>
<li>Failed-attempt counters: removed automatically after they expire.</li>
<li>Support messages: as long as needed to resolve them. If you delete your account, a message stays but is no longer linked to it.</li>
</ul>
<p>Deleting your account removes it from the live database at once. Our database provider's short-term backups may hold a copy for a few days before they roll over.</p>
"""),
("your-rights", "Your choices and rights", """
<ul>
<li><b>See and download:</b> the Backup link at the bottom of the side menu saves your learning data as a file, and Notes → Download all exports your notes.</li>
<li><b>Correct:</b> change your display name and username on the Account page.</li>
<li><b>Delete:</b> Account → Delete account removes everything at once, for any sign-in method.</li>
<li><b>Ask us:</b> for anything else, including a copy of all data linked to your account, use the support page.</li>
</ul>
<p>Depending on where you live (for example under the GDPR or US state privacy laws), you may have further rights, which we will honor.</p>
"""),
("security", "Security", """
<p>Passwords are hashed with scrypt, sessions and codes are stored only as hashes, all traffic uses HTTPS, and the playground runs code in a sandbox that cannot reach your account. We also limit sign-in attempts. No online service is perfectly secure; if you find a problem, please report it through the support page.</p>
"""),
("children", "Children", """
<p>Anyone can use the lessons without an account. Accounts are for people aged 13 or older. If you believe a child under 13 created an account, contact us and we will delete it.</p>
"""),
("changes", "Changes to this policy", """
<p>When the site changes how it handles data, this page is updated and the date at the top changes. Significant changes will also be noted on the site.</p>
"""),
]},
"es": {
"title": "Política de privacidad",
"description": "Qué recopila CS Course Atlas, por qué, dónde se guarda y cómo borrarlo. Sin anuncios, sin rastreo y sin venta de datos.",
"intro": "CS Course Atlas es un sitio gratuito para aprender. Puedes usar todas las lecciones, ejemplos, cuestionarios y retos sin cuenta, y en ese caso nada sobre ti sale de tu dispositivo. Esta página explica, con palabras sencillas, qué cambia al crear una cuenta.",
"glance": [
 ["🚫", "Sin anuncios, sin rastreadores, sin venta de datos.", "No hay scripts de analítica, cookies publicitarias ni intermediarios de datos. Nunca vendemos ni alquilamos datos personales."],
 ["💻", "Tu código se queda en tu dispositivo.", "Python, Java, C++, JavaScript, SQL y la terminal corren dentro de tu navegador. El código que escribes no se sube."],
 ["🔑", "La cuenta es opcional.", "Solo sirve para guardar y sincronizar tu progreso, notas y resultados entre dispositivos."],
 ["🗑️", "Bórrala cuando quieras.", "Cuenta → Eliminar cuenta borra tu perfil, progreso y notas al instante."],
],
"sections": [
("sin-cuenta", "Usar el sitio sin cuenta", """
<p>Sin cuenta, tu progreso, notas, resultados, preferencias (idioma, tema) y borradores de código se guardan solo en el almacenamiento local de tu navegador en ese dispositivo. No podemos verlos. Si borras los datos del navegador, desaparecen. El sitio también guarda en tu navegador una copia de sus propias páginas y cursos para funcionar sin conexión.</p>
"""),
("que-recopilamos", "Qué recopilamos al crear una cuenta", """
<ul>
<li><b>Datos de la cuenta:</b> tu correo y nombre de usuario, y un nombre visible si lo eliges. Las cuentas con correo y contraseña guardan un hash scrypt de un solo sentido, nunca la contraseña.</li>
<li><b>Inicio con Google o GitHub:</b> si lo eliges, ese servicio nos comparte tu correo verificado, tu nombre, el enlace a tu foto de perfil y un identificador de cuenta. Nunca vemos tu contraseña de Google o GitHub y solo pedimos acceso de lectura a tu correo y perfil básico.</li>
<li><b>Datos de aprendizaje:</b> el progreso, notas, resultados, repasos de tarjetas, retos resueltos y preferencias que decidas sincronizar.</li>
<li><b>Datos de seguridad:</b> sesiones (guardadas como hash, con un hash de la dirección IP y el texto del navegador), códigos de recuperación y de correo en hash, y contadores en hash de intentos fallidos para frenar ataques.</li>
<li><b>Mensajes de soporte:</b> lo que escribes en el formulario, y un correo solo si lo agregas.</li>
</ul>
<p>No recopilamos tu ubicación, contactos, datos de pago ni el código que ejecutas en el editor.</p>
"""),
("como-usamos", "Cómo lo usamos", """
<ul>
<li>Para iniciar tu sesión, mantenerla y sincronizar tus datos de aprendizaje con otros dispositivos.</li>
<li>Para enviar solo correos de la cuenta: un código para confirmar tu correo, los códigos de restablecimiento que pidas y los de cambio de correo. Nada de boletines ni publicidad.</li>
<li>Para proteger las cuentas: límites de intentos y bloqueos temporales tras varios fallos.</li>
<li>Para responder solicitudes de soporte y corregir problemas reportados.</li>
</ul>
"""),
("servicios", "Servicios que ayudan a operar el sitio", """
<p>Estas empresas procesan datos por nosotros solo para lo indicado. Cada una tiene su propia política de privacidad.</p>
<table class="trust-table">
<thead><tr><th>Servicio</th><th>Para qué</th><th>Qué puede ver</th></tr></thead>
<tbody>
<tr><td>GitHub Pages</td><td>Aloja los archivos del sitio</td><td>Registros web estándar (dirección IP, páginas pedidas)</td></tr>
<tr><td>Render</td><td>Ejecuta el servidor de cuentas</td><td>Las solicitudes al servidor de cuentas</td></tr>
<tr><td>Neon</td><td>Guarda la base de datos de cuentas</td><td>Los datos de cuenta descritos arriba</td></tr>
<tr><td>Google</td><td>Inicio con Google; envía los correos de la cuenta con Gmail; sirve la tipografía (Google Fonts)</td><td>Tu inicio con Google; el correo al que se envía un código; las solicitudes de la fuente</td></tr>
<tr><td>GitHub</td><td>Inicio con GitHub</td><td>Tu inicio con GitHub</td></tr>
<tr><td>jsDelivr, cdnjs, Leaning Technologies</td><td>Entregan los motores de Python, C++, SQL y Java del navegador y el resaltado de código</td><td>Las descargas de esos archivos (nada del código que escribes)</td></tr>
<tr><td>YouTube</td><td>Videos de las lecciones</td><td>Solo si abres un video, que se reproduce en YouTube</td></tr>
</tbody></table>
"""),
("cookies", "Cookies y almacenamiento local", """
<p>El servidor de cuentas usa una cookie segura (HTTP-only) para mantener tu sesión y otra de corta duración durante el inicio con Google o GitHub. El sitio también guarda un token de sesión y tus datos de aprendizaje en el almacenamiento local del navegador. No hay cookies de publicidad ni de analítica.</p>
"""),
("conservacion", "Cuánto tiempo lo guardamos", """
<ul>
<li>Datos de cuenta y de aprendizaje: hasta que borres tu cuenta.</li>
<li>Sesiones: hasta 30 días, o hasta que cierres sesión o cambies tu contraseña.</li>
<li>Códigos: los de correo vencen a los 30 minutos; los de recuperación, hasta que se usan o se reemplazan.</li>
<li>Contadores de intentos fallidos: se borran solos al vencer.</li>
<li>Mensajes de soporte: lo necesario para resolverlos. Si borras tu cuenta, el mensaje queda pero ya no está vinculado a ella.</li>
</ul>
<p>Al borrar tu cuenta, desaparece de la base de datos al instante. Las copias de seguridad de corto plazo del proveedor pueden conservar una copia unos días antes de renovarse.</p>
"""),
("tus-derechos", "Tus opciones y derechos", """
<ul>
<li><b>Ver y descargar:</b> el enlace de respaldo al pie del menú lateral guarda tus datos de aprendizaje en un archivo, y Notas → Descargar todo exporta tus notas.</li>
<li><b>Corregir:</b> cambia tu nombre visible y usuario en la página de tu cuenta.</li>
<li><b>Borrar:</b> Cuenta → Eliminar cuenta lo borra todo de una vez, con cualquier forma de inicio de sesión.</li>
<li><b>Pedírnoslo:</b> para cualquier otra cosa, incluida una copia de todos los datos de tu cuenta, usa la página de soporte.</li>
</ul>
<p>Según dónde vivas (por ejemplo, con el RGPD o leyes estatales de EE. UU.), puedes tener más derechos, que respetaremos.</p>
"""),
("seguridad", "Seguridad", """
<p>Las contraseñas se guardan con hash scrypt, las sesiones y códigos solo como hash, todo el tráfico usa HTTPS y el editor ejecuta el código en un entorno aislado que no puede acceder a tu cuenta. También limitamos los intentos de inicio de sesión. Ningún servicio en línea es perfectamente seguro; si encuentras un problema, repórtalo en la página de soporte.</p>
"""),
("menores", "Menores", """
<p>Cualquiera puede usar las lecciones sin cuenta. Las cuentas son para personas de 13 años o más. Si crees que un menor de 13 creó una cuenta, contáctanos y la borraremos.</p>
"""),
("cambios", "Cambios a esta política", """
<p>Cuando el sitio cambie cómo maneja los datos, esta página se actualizará junto con la fecha de arriba. Los cambios importantes también se avisarán en el sitio.</p>
"""),
]}},

"terms-of-use.html": {
"en": {
"title": "Terms of Use",
"description": "The rules for using CS Course Atlas: free educational content, your account, the code playground, and what we are and are not responsible for.",
"intro": "These terms are the agreement between you and CS Course Atlas when you use the site. They are written to be read. By using the site you agree to them; if you do not agree, please do not use it.",
"glance": [
 ["🎓", "Free to learn.", "Lessons, examples, quizzes, challenges and the playground are free. No account is required."],
 ["🤝", "Be fair.", "Don't attack the site, abuse other people, or use it to run harmful code."],
 ["📝", "Your work is yours.", "Notes and code you write stay yours. Course content stays ours, with credit to linked resources."],
 ["⚠️", "Learning tool, as is.", "We work hard on accuracy, but the content is educational and comes without guarantees."],
],
"sections": [
("service", "The service", """
<p>CS Course Atlas offers free computer science courses in English and Spanish: lessons, runnable examples, quizzes, flashcards, auto-graded challenges, a code playground and links to videos. Features may change, be added or be removed as the site grows.</p>
"""),
("accounts", "Your account", """
<ul>
<li>Accounts are optional and for people aged 13 or older.</li>
<li>Give accurate information, keep your password and recovery codes safe, and tell us if you think someone else used your account.</li>
<li>One person per account. You are responsible for activity on your account.</li>
<li>You can delete your account at any time from the Account page.</li>
</ul>
"""),
("acceptable-use", "Acceptable use", """
<p>Please don't:</p>
<ul>
<li>Try to break, overload, scrape at scale, or get around the security of the site or its account server.</li>
<li>Access other people's accounts or data.</li>
<li>Use the playground or shared code links to trick people into running harmful code, to mine cryptocurrency, or to attack other systems.</li>
<li>Submit abusive, illegal, or spam content through the support form.</li>
</ul>
<p>We may limit or close accounts that break these rules.</p>
"""),
("playground", "The code playground", """
<p>Code you run in the playground and challenges runs in your own browser, in a sandbox without access to your account. Runs may be stopped after a time limit. Shared playground links contain the code itself; anyone with the link can see it, so don't put secrets in shared code.</p>
"""),
("content", "Content and ownership", """
<ul>
<li>The site's lessons, examples, challenges, design and code belong to CS Course Atlas. You may use them for your own learning and share links to them. Please don't republish large parts as your own.</li>
<li>Your notes and the code you write are yours.</li>
<li>Linked videos and resources belong to their creators and follow their own terms. A link is not an endorsement.</li>
</ul>
"""),
("accuracy", "Accuracy and no professional advice", """
<p>The content is checked carefully (every example and challenge is run automatically before it is published), but it may still contain mistakes and is not professional, academic, or career advice. Course completion and certificates on this site are personal milestones, not accredited qualifications.</p>
"""),
("disclaimer", "Disclaimer and limitation of liability", """
<p>The site is provided "as is" and "as available", without warranties of any kind, to the fullest extent the law allows. CS Course Atlas is not liable for indirect, incidental or consequential damages, or for loss of data, arising from use of the site. Keep backups of anything important (the Backup link in the side menu).</p>
"""),
("changes", "Changes and termination", """
<p>We may update these terms as the site evolves; the date at the top shows the latest version, and continuing to use the site means you accept the update. You can stop using the site and delete your account at any time.</p>
"""),
("law", "Governing law", """
<p>These terms are governed by the laws of the State of North Carolina and the United States, without regard to conflict-of-law rules, except where the law where you live gives you rights that cannot be waived.</p>
"""),
]},
"es": {
"title": "Términos de uso",
"description": "Las reglas para usar CS Course Atlas: contenido educativo gratuito, tu cuenta, el editor de código y de qué somos y no somos responsables.",
"intro": "Estos términos son el acuerdo entre tú y CS Course Atlas al usar el sitio, escritos para leerse. Al usar el sitio los aceptas; si no estás de acuerdo, por favor no lo uses.",
"glance": [
 ["🎓", "Aprender es gratis.", "Lecciones, ejemplos, cuestionarios, retos y el editor son gratuitos. No necesitas cuenta."],
 ["🤝", "Juega limpio.", "No ataques el sitio, no abuses de otras personas ni lo uses para ejecutar código dañino."],
 ["📝", "Tu trabajo es tuyo.", "Tus notas y tu código son tuyos. El contenido de los cursos es nuestro, con crédito a los recursos enlazados."],
 ["⚠️", "Herramienta educativa, tal cual.", "Cuidamos la exactitud, pero el contenido es educativo y no tiene garantías."],
],
"sections": [
("servicio", "El servicio", """
<p>CS Course Atlas ofrece cursos gratuitos de ciencias de la computación en inglés y español: lecciones, ejemplos ejecutables, cuestionarios, tarjetas, retos con calificación automática, un editor de código y enlaces a videos. Las funciones pueden cambiar, agregarse o quitarse a medida que el sitio crece.</p>
"""),
("cuenta", "Tu cuenta", """
<ul>
<li>Las cuentas son opcionales y para personas de 13 años o más.</li>
<li>Da información correcta, cuida tu contraseña y tus códigos de recuperación, y avísanos si crees que alguien más usó tu cuenta.</li>
<li>Una persona por cuenta. Eres responsable de lo que se haga con tu cuenta.</li>
<li>Puedes borrar tu cuenta en cualquier momento desde la página de tu cuenta.</li>
</ul>
"""),
("uso-aceptable", "Uso aceptable", """
<p>Por favor, no:</p>
<ul>
<li>Intentes romper, sobrecargar, extraer datos a gran escala ni burlar la seguridad del sitio o de su servidor de cuentas.</li>
<li>Accedas a cuentas o datos de otras personas.</li>
<li>Uses el editor o los enlaces de código compartido para engañar a otros y que ejecuten código dañino, para minar criptomonedas o para atacar otros sistemas.</li>
<li>Envíes contenido abusivo, ilegal o spam en el formulario de soporte.</li>
</ul>
<p>Podemos limitar o cerrar cuentas que incumplan estas reglas.</p>
"""),
("editor", "El editor de código", """
<p>El código que ejecutas en el editor y en los retos corre en tu propio navegador, en un entorno aislado sin acceso a tu cuenta. Las ejecuciones pueden detenerse tras un límite de tiempo. Los enlaces compartidos contienen el código; cualquiera con el enlace puede verlo, así que no pongas datos secretos en código compartido.</p>
"""),
("contenido", "Contenido y propiedad", """
<ul>
<li>Las lecciones, ejemplos, retos, diseño y código del sitio pertenecen a CS Course Atlas. Puedes usarlos para tu aprendizaje y compartir enlaces. No vuelvas a publicar grandes partes como si fueran tuyas.</li>
<li>Tus notas y el código que escribes son tuyos.</li>
<li>Los videos y recursos enlazados pertenecen a sus autores y siguen sus propios términos. Un enlace no es un respaldo.</li>
</ul>
"""),
("exactitud", "Exactitud y sin asesoría profesional", """
<p>El contenido se revisa con cuidado (cada ejemplo y reto se ejecuta automáticamente antes de publicarse), pero puede contener errores y no es asesoría profesional, académica ni laboral. Completar cursos y los certificados del sitio son logros personales, no títulos acreditados.</p>
"""),
("descargo", "Descargo y limitación de responsabilidad", """
<p>El sitio se ofrece "tal cual" y "según disponibilidad", sin garantías de ningún tipo, en la medida que la ley lo permita. CS Course Atlas no es responsable de daños indirectos, incidentales o consecuentes, ni de pérdida de datos, por el uso del sitio. Guarda copias de lo importante (el enlace de respaldo del menú lateral).</p>
"""),
("cambios", "Cambios y terminación", """
<p>Podemos actualizar estos términos a medida que el sitio cambia; la fecha de arriba indica la versión vigente, y seguir usando el sitio significa aceptar la actualización. Puedes dejar de usar el sitio y borrar tu cuenta en cualquier momento.</p>
"""),
("ley", "Ley aplicable", """
<p>Estos términos se rigen por las leyes del estado de Carolina del Norte y de los Estados Unidos, sin considerar normas de conflicto de leyes, salvo donde la ley de tu lugar de residencia te dé derechos irrenunciables.</p>
"""),
]}},

"donations-refunds.html": {
"en": {
"title": "Donations and Refunds",
"description": "CS Course Atlas is free. How donations would work if offered, and the refund policy.",
"intro": "Everything on CS Course Atlas is free, and it will stay free to learn. The site does not take payments or donations right now.",
"glance": [
 ["🆓", "Free to learn.", "No paywalls, no subscriptions, no premium tier for the courses."],
 ["💳", "No payments today.", "There is no donation button or checkout on the site at the moment."],
 ["📣", "If that changes,", "this page will name the payment provider and the exact terms before anything goes live."],
],
"sections": [
("now", "Right now", """
<p>CS Course Atlas does not accept payments or donations, and does not collect any payment information. If someone asks you to pay for CS Course Atlas content, it is not us.</p>
"""),
("future", "If donations are added later", """
<ul>
<li>Donations would be optional and would never unlock course content: every lesson stays free.</li>
<li>They would be processed by a named third-party payment provider; this site would never see or store your card details.</li>
<li>A donation would not create a subscription, an ownership interest or any guaranteed service.</li>
</ul>
"""),
("refunds", "Refunds", """
<p>Donations are gifts and generally non-refundable. Duplicate charges, unauthorized charges and processing errors would always be refunded: contact support within 30 days with the date, amount and the provider's receipt number.</p>
"""),
]},
"es": {
"title": "Donaciones y reembolsos",
"description": "CS Course Atlas es gratis. Cómo funcionarían las donaciones si se ofrecen y la política de reembolsos.",
"intro": "Todo en CS Course Atlas es gratis, y aprender seguirá siendo gratis. Por ahora el sitio no recibe pagos ni donaciones.",
"glance": [
 ["🆓", "Aprender es gratis.", "Sin muros de pago, sin suscripciones, sin nivel premium para los cursos."],
 ["💳", "Hoy no hay pagos.", "Por ahora no hay botón de donación ni pago en el sitio."],
 ["📣", "Si eso cambia,", "esta página indicará el proveedor de pagos y los términos exactos antes de activarlo."],
],
"sections": [
("ahora", "Por ahora", """
<p>CS Course Atlas no acepta pagos ni donaciones y no recopila datos de pago. Si alguien te pide pagar por contenido de CS Course Atlas, no somos nosotros.</p>
"""),
("futuro", "Si más adelante se agregan donaciones", """
<ul>
<li>Las donaciones serían opcionales y nunca desbloquearían contenido: todas las lecciones siguen siendo gratis.</li>
<li>Las procesaría un proveedor de pagos externo indicado aquí; este sitio nunca vería ni guardaría los datos de tu tarjeta.</li>
<li>Una donación no crearía una suscripción, una participación ni un servicio garantizado.</li>
</ul>
"""),
("reembolsos", "Reembolsos", """
<p>Las donaciones son regalos y en general no se reembolsan. Los cobros duplicados, no autorizados o por errores de procesamiento siempre se reembolsarían: contacta a soporte dentro de 30 días con la fecha, el monto y el número de recibo del proveedor.</p>
"""),
]}},
}

SUPPORT = {
"en": {
"title": "Contact and Support",
"description": "Report a problem, suggest a fix to a lesson, ask about your account or your data. Usually answered within a few days.",
"intro": "Found a mistake in a lesson, a bug, or need help with your account? Send a message here. It goes straight to the person who builds the site.",
"cards": [
 ["🐞", "Bug or wrong answer", "Say which module, what you did, what you expected and what happened."],
 ["✏️", "Lesson fix or idea", "Corrections, clearer explanations, better videos and course requests are all welcome."],
 ["🔐", "Account and data", "Locked out with no recovery code, a copy of your data, or questions about privacy."],
 ["⏱️", "Response time", "Usually within 2 to 5 days. Add your email if you want a reply."],
],
"email": "Email (optional, only if you want a reply)", "module": "Module (optional)", "general": "General", "topic": "Subject", "topicPh": "Example: Quiz 3 in Linked Lists marks the right answer wrong",
"message": "Message", "messagePh": "What happened, and what did you expect?", "send": "Send message",
"need": "Please write a message.", "sending": "Sending… the server can take up to 30 seconds to wake up.", "sent": "Thanks! Your message was sent.", "reqId": "Reference", "fail": "Could not send right now. Please try again in a minute.",
"note": "Looking for an answer about a topic? Each module has a <a href=\"index.html#glossary\">glossary</a>, a quiz and videos. The <a href=\"index.html#roadmap\">roadmap</a> shows what is coming next.",
},
"es": {
"title": "Contacto y soporte",
"description": "Reporta un problema, sugiere una corrección o pregunta por tu cuenta o tus datos. Normalmente respondemos en pocos días.",
"intro": "¿Encontraste un error en una lección, un fallo o necesitas ayuda con tu cuenta? Escribe aquí. El mensaje llega directo a la persona que construye el sitio.",
"cards": [
 ["🐞", "Fallo o respuesta incorrecta", "Indica el módulo, qué hiciste, qué esperabas y qué pasó."],
 ["✏️", "Corrección o idea", "Correcciones, explicaciones más claras, mejores videos y pedidos de cursos son bienvenidos."],
 ["🔐", "Cuenta y datos", "Sin acceso y sin código de recuperación, una copia de tus datos o dudas de privacidad."],
 ["⏱️", "Tiempo de respuesta", "Normalmente de 2 a 5 días. Agrega tu correo si quieres respuesta."],
],
"email": "Correo (opcional, solo si quieres respuesta)", "module": "Módulo (opcional)", "general": "General", "topic": "Asunto", "topicPh": "Ejemplo: el cuestionario 3 de Listas enlazadas marca mal la respuesta correcta",
"message": "Mensaje", "messagePh": "¿Qué pasó y qué esperabas?", "send": "Enviar mensaje",
"need": "Escribe un mensaje, por favor.", "sending": "Enviando… el servidor puede tardar hasta 30 segundos en activarse.", "sent": "¡Gracias! Tu mensaje se envió.", "reqId": "Referencia", "fail": "No se pudo enviar ahora. Inténtalo de nuevo en un minuto.",
"note": "¿Buscas una respuesta sobre un tema? Cada módulo tiene un <a href=\"index.html#glossary\">glosario</a>, un cuestionario y videos. La <a href=\"index.html#roadmap\">hoja de ruta</a> muestra lo que viene.",
},
}

HEAD_SCRIPT = ("try{var th=JSON.parse(localStorage.getItem('atlas-theme'));if(th==='light'||th==='dark')document.documentElement.dataset.theme=th;"
               "var lg=JSON.parse(localStorage.getItem('atlas-lang'));if(lg!=='es'&&lg!=='en')lg=(navigator.language||'').toLowerCase().indexOf('es')===0?'es':'en';"
               "document.documentElement.lang=lg;document.documentElement.dataset.lang=lg;}catch(e){document.documentElement.dataset.lang='en';}")

LANG_SCRIPT = """
(function(){
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-set-lang]'); if (!b) return;
    var lg = b.getAttribute('data-set-lang');
    document.documentElement.lang = lg; document.documentElement.dataset.lang = lg;
    try { localStorage.setItem('atlas-lang', JSON.stringify(lg)); } catch (err) {}
  });
})();
"""


def esc(s):
    return html.escape(s, quote=True)


def head(file, title, description):
    url = SITE + file
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
<title>{esc(title)} | CS Course Atlas</title>
<meta name="description" content="{esc(description)}">
<meta name="robots" content="index,follow">
<meta name="theme-color" content="#4f46e5">
<link rel="canonical" href="{url}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="CS Course Atlas">
<meta property="og:title" content="{esc(title)} | CS Course Atlas">
<meta property="og:description" content="{esc(description)}">
<meta property="og:url" content="{url}">
<link rel="icon" href="icons/icon-192.png" type="image/png">
<link rel="manifest" href="manifest.webmanifest">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="css/trust-pages.css?v=20261110">
<script>{HEAD_SCRIPT}</script>
</head>
<body>
<a class="trust-skip" href="#main"><span data-l="en">Skip to content</span><span data-l="es">Saltar al contenido</span></a>
"""


def header(active):
    links = "".join(
        f'<a class="trust-nav-link{" is-active" if f == active else ""}" href="{f}"{" aria-current=\"page\"" if f == active else ""}>'
        f'<span data-l="en">{l["en"]}</span><span data-l="es">{l["es"]}</span></a>' for f, l in NAV)
    return f"""<header class="trust-header">
<div class="trust-shell trust-header-inner">
<a class="trust-home-link" href="index.html"><span class="trust-logo" aria-hidden="true">◆</span><span>CS Course Atlas</span></a>
<nav class="trust-nav" aria-label="Policies and support">{links}</nav>
<div class="trust-langs" role="group" aria-label="Language">
<button type="button" data-set-lang="en" class="trust-lang-en">EN</button><button type="button" data-set-lang="es" class="trust-lang-es">ES</button>
</div>
</div>
</header>
"""


def footer():
    links = "".join(f'<a href="{f}"><span data-l="en">{l["en"]}</span><span data-l="es">{l["es"]}</span></a>' for f, l in NAV)
    return f"""<footer class="trust-site-footer"><div class="trust-shell">
<a href="index.html"><span data-l="en">{UI['en']['back']}</span><span data-l="es">{UI['es']['back']}</span></a>
<nav aria-label="Policies">{links}</nav>
</div></footer>
<script>{LANG_SCRIPT}</script>
"""


def glance(items, lang):
    return (f'<section class="trust-glance" aria-labelledby="glance-{lang}"><h2 id="glance-{lang}" class="trust-eyebrow">{UI[lang]["glance"]}</h2><div class="trust-glance-grid">'
            + "".join(f'<div class="trust-glance-item"><span class="trust-glance-ico" aria-hidden="true">{i}</span><p><b>{esc(s)}</b> {esc(t)}</p></div>' for i, s, t in items)
            + "</div></section>")


def article(page, lang):
    c = page[lang]
    toc = "".join(f'<li><a href="#{sid}-{lang}">{esc(h)}</a></li>' for sid, h, _ in c["sections"])
    body = "".join(f'<section id="{sid}-{lang}" class="trust-section"><h2>{esc(h)}</h2>{b.strip()}</section>' for sid, h, b in c["sections"])
    return f"""<div class="trust-doc" data-l="{lang}" lang="{lang}">
<div class="trust-hero">
<p class="trust-meta">{UI[lang]['updated']}: {UPDATED[lang]}</p>
<h1>{esc(c['title'])}</h1>
<p class="trust-lead">{esc(c['intro'])}</p>
</div>
{glance(c['glance'], lang)}
<div class="trust-layout">
<nav class="trust-toc" aria-label="{UI[lang]['contents']}"><p class="trust-eyebrow">{UI[lang]['contents']}</p><ol>{toc}</ol></nav>
<article class="trust-body">{body}
<p class="trust-note">{UI[lang]['foot']}</p>
<p class="trust-top"><a href="#main">↑ {UI[lang]['toTop']}</a></p>
</article>
</div>
</div>
"""


def build_doc(file):
    page = PAGES[file]
    out = head(file, page["en"]["title"], page["en"]["description"]) + header(file)
    out += '<main id="main" class="trust-main trust-shell" tabindex="-1">\n' + article(page, "en") + article(page, "es") + "</main>\n" + footer() + "</body>\n</html>\n"
    (ROOT / file).write_text(out)


def build_support():
    file = "contact-support.html"
    out = head(file, SUPPORT["en"]["title"], SUPPORT["en"]["description"]) + header(file)
    out += '<main id="main" class="trust-main trust-shell" tabindex="-1">\n'
    for lang in ("en", "es"):
        c = SUPPORT[lang]
        cards = "".join(f'<div class="trust-glance-item"><span class="trust-glance-ico" aria-hidden="true">{i}</span><p><b>{esc(s)}</b> {esc(t)}</p></div>' for i, s, t in c["cards"])
        out += f"""<div class="trust-doc" data-l="{lang}" lang="{lang}">
<div class="trust-hero"><h1>{esc(c['title'])}</h1><p class="trust-lead">{esc(c['intro'])}</p></div>
<section class="trust-glance"><div class="trust-glance-grid">{cards}</div></section>
</div>
"""
    # One form, labels switch language with the page.
    L = lambda k: f'<span data-l="en">{esc(SUPPORT["en"][k])}</span><span data-l="es">{esc(SUPPORT["es"][k])}</span>'
    out += f"""<form id="public-support-form" class="support-form" novalidate>
<div class="support-form-grid">
<div class="support-field"><label for="support-email">{L('email')}</label><input id="support-email" name="email" type="email" maxlength="255" autocomplete="email" placeholder="you@example.com"></div>
<div class="support-field"><label for="support-module-id">{L('module')}</label><select id="support-module-id" name="moduleId"><option value="">{esc(SUPPORT['en']['general'])}</option></select></div>
</div>
<div class="support-field"><label for="support-topic">{L('topic')}</label><input id="support-topic" name="topic" type="text" maxlength="200"></div>
<div class="support-field"><label for="support-message">{L('message')}</label><textarea id="support-message" name="message" maxlength="5000" required></textarea></div>
<div class="support-actions"><button id="support-submit" class="support-submit" type="submit">{L('send')}</button><p id="support-status" class="support-status" role="status" aria-live="polite"></p></div>
</form>
<p class="trust-note"><span data-l="en">{SUPPORT['en']['note']}</span><span data-l="es">{SUPPORT['es']['note']}</span></p>
</main>
"""
    out += footer()
    texts = {lang: {k: SUPPORT[lang][k] for k in ("general", "topicPh", "messagePh", "need", "sending", "sent", "reqId", "fail")} for lang in ("en", "es")}
    out += """<script src="js/app-config.js"></script>
<script>
(function () {
  var T = """ + json.dumps(texts, ensure_ascii=False) + """;
  var form = document.getElementById('public-support-form'), submit = document.getElementById('support-submit'), status = document.getElementById('support-status');
  var email = document.getElementById('support-email'), moduleSel = document.getElementById('support-module-id'), topic = document.getElementById('support-topic'), message = document.getElementById('support-message');
  var lang = function () { return document.documentElement.dataset.lang === 'es' ? 'es' : 'en'; };
  var linked = new URLSearchParams(location.search).get('module');
  function texts() {
    var t = T[lang()];
    topic.placeholder = t.topicPh; message.placeholder = t.messagePh;
    if (moduleSel.options[0]) moduleSel.options[0].textContent = t.general;
  }
  // Every course and module, grouped, straight from the site's course index (so the list never goes stale).
  var modulesData = null;
  function fillModules() {
    if (!modulesData) return;
    var keep = moduleSel.value || linked || '';
    while (moduleSel.options.length > 1) moduleSel.remove(1);
    Array.prototype.slice.call(moduleSel.querySelectorAll('optgroup')).forEach(function (g) { g.remove(); });
    modulesData.tracks.filter(function (t) { return t.status === 'available'; }).forEach(function (t) {
      var g = document.createElement('optgroup'); g.label = t.title[lang()] || t.title.en;
      t.units.forEach(function (u) { u.modules.forEach(function (id) {
        var m = modulesData.modules[id]; if (!m) return;
        var o = document.createElement('option'); o.value = id; o.textContent = m.title[lang()] || m.title.en; g.appendChild(o);
      }); });
      moduleSel.appendChild(g);
    });
    if (keep && moduleSel.querySelector('option[value="' + CSS.escape(keep) + '"]')) moduleSel.value = keep;
  }
  fetch('data/atlas-data.json').then(function (r) { return r.json(); }).then(function (d) { modulesData = d; fillModules(); }).catch(function () {});
  texts();
  new MutationObserver(function () { texts(); fillModules(); }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-lang'] });
  function show(kind, text) { status.textContent = text; status.className = 'support-status is-visible ' + kind; }
  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    var t = T[lang()], msg = message.value.trim();
    if (!msg) { show('error', t.need); message.focus(); return; }
    submit.disabled = true; show('pending', t.sending);
    try {
      var api = (window.__APP_CONFIG && window.__APP_CONFIG.apiBaseUrl) || '';
      var r = await fetch(api + '/api/support', { method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: 'omit',
        body: JSON.stringify({ email: email.value.trim() || null, moduleId: moduleSel.value || null, topic: topic.value.trim() || null, message: msg, language: lang() }) });
      var data = await r.json().catch(function () { return {}; });
      if (!r.ok) throw new Error(data.error || t.fail);
      form.reset(); linked = null; fillModules();
      show('success', t.sent + (data && data.requestId ? ' ' + t.reqId + ': ' + data.requestId + '.' : ''));
    } catch (err) { show('error', (err && err.message) || t.fail); } finally { submit.disabled = false; }
  });
})();
</script>
</body>
</html>
"""
    (ROOT / file).write_text(out)


for f in PAGES:
    build_doc(f)
build_support()
print("built", ", ".join(list(PAGES) + ["contact-support.html"]))
