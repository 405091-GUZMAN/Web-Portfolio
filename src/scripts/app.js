// Contact form (Web3Forms)
const form = document.getElementById('form');
const result = document.getElementById('result');

const setResult = (text, tone) => {
  if (!result) return;
  result.textContent = text;
  result.className = `text-sm ${tone === 'ok' ? 'text-accent' : tone === 'error' ? 'text-red-400' : 'text-muted'}`;
};

if (form && result) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submit = form.querySelector('button[type="submit"]');
    submit?.setAttribute('disabled', '');
    setResult('Enviando…');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const data = await response.json();
      if (response.ok) {
        setResult('¡Gracias! Tu mensaje fue enviado.', 'ok');
        form.reset();
      } else {
        setResult(`Error: ${data.message}`, 'error');
      }
    } catch {
      setResult('Ocurrió un error inesperado. Probá de nuevo o escribime por email.', 'error');
    } finally {
      submit?.removeAttribute('disabled');
      setTimeout(() => setResult(''), 12000);
    }
  });
}

// Mobile menu
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

const setMenu = (open) => {
  mobileMenu?.classList.toggle('open', open);
  menuToggle?.setAttribute('aria-expanded', String(open));
  menuToggle?.querySelector('i')?.classList.replace(open ? 'fa-bars' : 'fa-xmark', open ? 'fa-xmark' : 'fa-bars');
  document.body.style.overflow = open ? 'hidden' : '';
};

menuToggle?.addEventListener('click', () => setMenu(!mobileMenu?.classList.contains('open')));
mobileMenu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', (e) => e.key === 'Escape' && setMenu(false));

// Reveal on scroll
const blocks = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  blocks.forEach((block) => observer.observe(block));
} else {
  blocks.forEach((block) => block.classList.add('visible'));
}

// Footer year
const year = document.getElementById('year');
if (year) year.textContent = String(new Date().getFullYear());
