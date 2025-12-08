const form = document.getElementById('form');
const result = document.getElementById('result');

if (form && result) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = new FormData(form);
    const json = JSON.stringify(Object.fromEntries(formData));

    result.textContent = 'Enviando...';
    result.className = 'text-sm text-center text-gray-300';

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: json,
    })
      .then(async (response) => {
        const data = await response.json();
        if (response.status === 200) {
          result.textContent = 'Mensaje enviado con éxito';
          result.className = 'text-sm text-center text-emerald-400 font-semibold';
        } else {
          result.textContent = `Error: ${data.message}`;
          result.className = 'text-sm text-center text-red-500 font-semibold';
        }
      })
      .catch(() => {
        result.textContent = 'Ocurrió un error inesperado.';
        result.className = 'text-sm text-center text-red-500 font-semibold';
      })
      .finally(() => {
        form.reset();
        setTimeout(() => {
          result.textContent = '';
        }, 12000);
      });
  });
}

document.addEventListener('DOMContentLoaded', function () {
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const closeMenu = document.getElementById('close-menu');

  const toggleMenu = () => {
    mobileMenu.classList.toggle('open');
  };

  menuToggle?.addEventListener('click', toggleMenu);
  closeMenu?.addEventListener('click', toggleMenu);

  const mobileLinks = mobileMenu?.querySelectorAll('a') || [];
  mobileLinks.forEach((link) => link.addEventListener('click', toggleMenu));

  const animatedBlocks = document.querySelectorAll('.fade-up');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  animatedBlocks.forEach((block) => observer.observe(block));
});
