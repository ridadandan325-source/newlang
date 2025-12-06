// Lingofy - Login Script

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const toggleLoginPassword = document.getElementById('toggleLoginPassword');
    
    // Toggle password visibility
    if (toggleLoginPassword) {
        toggleLoginPassword.addEventListener('click', function() {
            const passwordInput = document.getElementById('loginPassword');
            const icon = this.querySelector('i');
            
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                icon.classList.remove('bi-eye');
                icon.classList.add('bi-eye-slash');
            } else {
                passwordInput.type = 'password';
                icon.classList.remove('bi-eye-slash');
                icon.classList.add('bi-eye');
            }
        });
    }
    
    // Form validation and submission
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('loginPassword').value;
            
            // Validation
            let isValid = true;
            
            if (!username) {
                showFieldError('username', 'Please enter your username');
                isValid = false;
            } else {
                clearFieldError('username');
            }
            
            if (!password) {
                showFieldError('loginPassword', 'Please enter your password');
                isValid = false;
            } else {
                clearFieldError('loginPassword');
            }
            
            if (!isValid) {
                return;
            }
            
            // Check credentials
            const users = JSON.parse(localStorage.getItem('lingofy_users') || '[]');
            const user = users.find(u => 
                (u.email === username || u.fullName === username) && 
                u.password === password
            );
            
            if (!user) {
                showToast('Invalid username or password', 'danger');
                showFieldError('username', '');
                showFieldError('loginPassword', '');
                return;
            }
            
            // Set current user and redirect
            setCurrentUser(user);
            
            showToast('Login successful! Redirecting...', 'success');
            
            setTimeout(() => {
                if (user.role === 'admin') {
                    window.location.href = 'admin-dashboard.html';
                } else {
                    window.location.href = 'student-tests.html';
                }
            }, 1000);
        });
    }
    
    // Check if already logged in
    if (isLoggedIn()) {
        const user = getCurrentUser();
        if (user.role === 'admin') {
            window.location.href = 'admin-dashboard.html';
        } else {
            window.location.href = 'student-tests.html';
        }
    }
});

function showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const feedback = field?.closest('.mb-3, .mb-4').querySelector('.invalid-feedback');
    
    if (field) {
        field.classList.add('is-invalid');
    }
    
    if (feedback && message) {
        feedback.textContent = message;
        feedback.classList.remove('d-none');
    }
}

function clearFieldError(fieldId) {
    const field = document.getElementById(fieldId);
    const feedback = field?.closest('.mb-3, .mb-4').querySelector('.invalid-feedback');
    
    if (field) {
        field.classList.remove('is-invalid');
    }
    
    if (feedback) {
        feedback.classList.add('d-none');
    }
}

