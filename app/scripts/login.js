$(document).ready(function() {
    // Evento de envío de formulario de inicio de sesión
    $("#loginButton").click(function(event) {
        event.preventDefault();
        iniciarSesion();
    });

    // Evento de envío de formulario de registro
    $("#registerForm").submit(function(event) {
        event.preventDefault();
        registrarUsuario();
    });
});


function iniciarSesion() {
    const usuario = $("#usuario").val();
    const contrasenia = $("#password").val();

    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ usuario, contrasenia }),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Inicio de sesión fallido');
            }
            return response.json();
        })
        .then(data => {
            if (data.mensaje) {
                mostrarAlerta("error", data.mensaje);
            } else {
                mostrarAlerta("success", "Inicio de sesión exitoso");
                window.location.href = '../views/index.html'
                cambiarTextoMiCuenta(usuario); // Asegúrate de que esta función y el elemento del DOM existan
            }
        })
        .catch(error => {
            mostrarAlerta("error", "Error en el inicio de sesión");
            console.error("Error al iniciar sesión:", error);
        });
}


function cambiarTextoMiCuenta(nombreUsuario) {
    // Cambiar el texto de "Mi cuenta" al nombre de usuario
    document.getElementById("miCuentaText").innerText = nombreUsuario;
}

function registrarUsuario() {
    console.log("Registro...");
    const nombre = $("#nombre").val();
    const correo = $("#correo").val();
    const contrasenia = $("#newpassword").val();
    const edad = parseInt($("#edad").val(), 10); // Convierte edad a número
    const genero = $("#genero").val();

    if (!nombre || !correo || !contrasenia || isNaN(edad) || !genero) {
        mostrarAlerta("error", "Todos los campos son requeridos y la edad debe ser numérica");
        return;
    }

    console.log("Datos enviados:", { nombre, correo, contrasenia, edad, genero });

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
        .then(response => {
            if (!response.ok) {
                throw new Error('Registro fallido');
            }
            return response.json();
        })
        .then(data => {
            mostrarAlerta("success", "Usuario registrado con éxito");
            // Aquí puedes redirigir al usuario o realizar otras acciones
        })
        .catch(error => {
            mostrarAlerta("error", "Error al registrar usuario");
            console.error("Error al registrar usuario:", error);
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