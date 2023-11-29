document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');

    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const newHotelData = {
            nombreHotel: document.getElementById('nombreHotel').value,
            playa: document.getElementById('playa').value,
            precioxnoche: document.getElementById('precioxnoche').value,
            convenio: document.getElementById('convenio').value.split(',') // Asumiendo que el campo convenio es una lista separada por comas
        };

        fetch('/hotels', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newHotelData),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al registrar el hotel');
                }
                return response.json();
            })
            .then(data => {
                console.log('Hotel registrado:', data);
                // Aquí puedes manejar la respuesta, como mostrar un mensaje de éxito o redirigir
            })
            .catch((error) => {
                console.error('Error:', error);
                // Manejar el error en la interfaz de usuario
            });
    });
});
