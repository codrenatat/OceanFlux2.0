document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');

    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const newHotelData = {
            nombreHotel: document.getElementById('hotel').value,
            playa: document.getElementById('playa').value,
            precioxnoche: document.getElementById('precioxnoche').value,
            convenio: document.getElementById('convenio').value.split(',') 
        };

        fetch('http://localhost:3000/hotels', {
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
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    });
});