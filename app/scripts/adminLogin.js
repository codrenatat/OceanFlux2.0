document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.querySelector('form');
    const usernameInput = document.getElementById('usuario');
    const passwordInput = document.getElementById('password');

    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const username = usernameInput.value;
        const password = passwordInput.value;

        fetch('http://localhost:3000/admin/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nombre: username, contrasenia: password }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    window.location.href = '../views/adminHotelRegister.html'; 
                } else {
                    alert('Invalid username or password');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    });
});