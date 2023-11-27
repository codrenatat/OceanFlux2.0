$(document).ready(function() {
    $("#loginButton").click(function() {
        iniciarSesion();
    });

    $("#signupButton").click(function() {
        registrarUsuario();
    });
});

function iniciarSesion() {
    console.log("Iniciando sesión...");
    // Mostrar el spinner de carga
    document.getElementById("loadingSpinner").style.display = "inline-block";

    // Recolectar datos del formulario
    const usuario = document.getElementById("usuario").value;
    const contrasenia = document.getElementById("password").value;

    // Enviar datos al servidor utilizando fetch
    fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            usuario,
            contrasenia,
        }),
    })
        .then(response => response.json())
        .then(data => {
            console.log("Inicio de sesión exitoso:", data);

            // Mostrar alerta de éxito
            if (!data.errors) {
                mostrarAlerta("success", "Inicio de sesión exitoso");

                // Cambiar el texto de "Mi cuenta" al nombre de usuario
                const nombreUsuario = data.nombre; // Asegúrate de que la respuesta del servidor incluya el nombre de usuario
                cambiarTextoMiCuenta(nombreUsuario);
            }
        })
        .catch(error => {
            console.error("Error al iniciar sesión:", error);
            // Mostrar alerta de error
            mostrarAlerta("error", "Error al iniciar sesión");
        })
        .finally(() => {
            document.getElementById("loadingSpinner").style.display = "none";
        });
}

function cambiarTextoMiCuenta(nombreUsuario) {
    // Cambiar el texto de "Mi cuenta" al nombre de usuario
    document.getElementById("miCuentaText").innerText = nombreUsuario;
}

function registrarUsuario() {
    console.log("Registro...");
    document.getElementById("loadingS").style.display = "inline-block";
    const nombre = document.getElementById("nombre").value;
    const correo = document.getElementById("correo").value;
    const contrasenia = document.getElementById("newpassword").value;
    const edad = document.getElementById("edad").value;
    const genero = document.getElementById("genero").value;

    // Enviar datos al servidor utilizando fetch
    fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nombre,
            correo,
            contrasenia,
            edad,
            genero,
        }),
    })
        .then(response => response.json())
        .then(data => {
            console.log("Usuario registrado con éxito:", data);

            // Mostrar alerta de éxito
            if (!data.errors) {
                mostrarAlerta("success", "Usuario registrado con éxito");
            }
        })
        .catch(error => {
            console.error("Error al registrar usuario:", error);
            // Mostrar alerta de error
            mostrarAlerta("error", "Error al registrar usuario");
        })
        .finally(() => {
            document.getElementById("loadingS").style.display = "none";
        });
}

function cerrarSesion() {
    window.location.href = "intro.html";
}



function mostrarAlerta(type, message) {
    const alertContainer = document.getElementById("alertContainer");

    const alertElement = document.createElement("div");
    alertElement.className = `alert alert--${type}`;
    alertElement.innerHTML = `
        <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span> 
        <strong>${type === "success" ? "¡Bien!" : "Error"}</strong> ${message}
    `;

    alertContainer.appendChild(alertElement);
}