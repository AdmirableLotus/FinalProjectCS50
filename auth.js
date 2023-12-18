document.addEventListener('DOMContentLoaded', () => {
    const authForm = document.getElementById('auth-form');
    const loginBtn = document.getElementById('login-btn');
    const registerBtn = document.getElementById('register-btn');
    const errorMessage = document.getElementById('error-message');

    authForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // Login successful, you can redirect or perform other actions
                console.log('Login successful');
            } else {
                // Display error message to the user
                errorMessage.textContent = data.error || 'Login failed';
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    });

    registerBtn.addEventListener('click', () => {
        // Redirect or show the registration form
        console.log('Redirecting to registration page');
    });
});
