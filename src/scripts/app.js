// Contact form (Web3Forms)
const form = document.getElementById('form');
const result = document.getElementById('result');

const setResult = (text, tone) => {
  if (!result) return;
  result.textContent = text;
  result.className = `text-sm ${tone === 'ok' ? 'text-emerald-700' : tone === 'error' ? 'text-red-600' : 'text-muted'}`;
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

// Footer year
const year = document.getElementById('year');
if (year) year.textContent = String(new Date().getFullYear());
