document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("form");
    const mensajeEnviado = document.getElementById("mensaje-enviado");

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        const datos = {
            nombre: form.nombre.value,
            email: form.email.value,
            mensaje: form.mensaje.value,
        };

        console.log("Datos enviados; ", datos);

        form.style.display = "none";
        mensajeEnviado.style.display = "block";
    })
})
