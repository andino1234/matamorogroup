/**
 * Valora / Matamoro Group — interacciones del sitio.
 *
 * @author Ariel Geovanny Andino Chinchilla
 * @see    https://github.com/andino1234
 */
// Año dinámico
document.getElementById('year').textContent = new Date().getFullYear();

// Navbar con fondo al hacer scroll
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('is-stuck', window.scrollY > 40);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// Menú móvil
const toggle = document.getElementById('navToggle');
const links = document.getElementById('navLinks');
toggle.addEventListener('click', () => {
  const open = links.classList.toggle('is-open');
  toggle.classList.toggle('is-open', open);
  toggle.setAttribute('aria-expanded', String(open));
});
links.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => {
    links.classList.remove('is-open');
    toggle.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  })
);

// Animación de aparición
const io = new IntersectionObserver(
  entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('is-visible')),
  { threshold: 0.15 }
);
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Contadores
const counters = document.querySelectorAll('.stat__num');
const counterIO = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = Number(el.dataset.count);
    const start = performance.now();
    const step = now => {
      const p = Math.min((now - start) / 1400, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))).toLocaleString('es');
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
    obs.unobserve(el);
  });
}, { threshold: 0.5 });
counters.forEach(c => counterIO.observe(c));

// Validación de formularios (demo: sin envío a servidor)
function wireForm(formId, msgId) {
  const form = document.getElementById(formId);
  const msg = document.getElementById(msgId);
  form.addEventListener('submit', e => {
    e.preventDefault();
    let ok = true;
    form.querySelectorAll('[required]').forEach(field => {
      const valid = field.value.trim() !== '' && (field.type !== 'email' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value));
      field.classList.toggle('is-error', !valid);
      if (!valid) ok = false;
    });
    if (!ok) {
      msg.style.color = '#d34a4a';
      msg.textContent = 'Revise los campos marcados.';
      return;
    }
    msg.style.color = '#1b7a45';
    msg.textContent = 'Solicitud enviada. Le contactaremos en breve.';
    form.reset();
  });
}
wireForm('miniForm', 'miniMsg');
wireForm('mainForm', 'mainMsg');
