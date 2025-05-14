const form = document.getElementById('form');
const result = document.getElementById('result');

form.addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData(form);
    const json = JSON.stringify(Object.fromEntries(formData));

    result.innerHTML = "Enviando...";
    result.className = "text-sm mt-2 text-center text-gray-400";

    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: json
    })
        .then(async (response) => {
            const data = await response.json();
            if (response.status === 200) {
                result.innerHTML = "✅ ¡Mensaje enviado con éxito!";
                result.className = "text-sm mt-2 text-center text-emerald-400";
            } else {
                result.innerHTML = `❌ Error: ${data.message}`;
                result.className = "text-sm mt-2 text-center text-red-500";
            }
        })
        .catch(() => {
            result.innerHTML = "❌ Ocurrió un error inesperado.";
            result.className = "text-sm mt-2 text-center text-red-500";
        })
        .finally(() => {
            form.reset();
            setTimeout(() => {
                result.innerHTML = "";
            }, 14000);
        });
});