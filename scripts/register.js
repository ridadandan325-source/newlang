// Lingofy - Registration Script

document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');
    const togglePassword = document.getElementById('togglePassword');
    
    // Toggle password visibility
    if (togglePassword) {
        togglePassword.addEventListener('click', function() {
            const passwordInput = document.getElementById('password');
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
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                fullName: document.getElementById('fullName').value.trim(),
                email: document.getElementById('email').value.trim(),
                password: document.getElementById('password').value,
                role: document.getElementById('role').value
            };
            
            // Validation
            let isValid = true;
            
            if (!formData.fullName) {
                showFieldError('fullName', 'Please enter your full name');
                isValid = false;
            } else {
                clearFieldError('fullName');
            }
            
            if (!formData.email) {
                showFieldError('email', 'Please enter a valid email or username');
                isValid = false;
            } else {
                clearFieldError('email');
            }
            
            if (!formData.password || formData.password.length < 6) {
                showFieldError('password', 'Password must be at least 6 characters');
                isValid = false;
            } else {
                clearFieldError('password');
            }
            
            if (!formData.role) {
                showFieldError('role', 'Please select a role');
                isValid = false;
            } else {
                clearFieldError('role');
            }
            
            if (!isValid) {
                return;
            }
            
            // Check if user already exists
            const users = JSON.parse(localStorage.getItem('lingofy_users') || '[]');
            const existingUser = users.find(u => u.email === formData.email);
            
            if (existingUser) {
                showFieldError('email', 'This email/username is already registered');
                return;
            }
            
            // Create new user
            const newUser = {
                id: Date.now().toString(),
                fullName: formData.fullName,
                email: formData.email,
                password: formData.password, // In production, hash this!
                role: formData.role,
                createdAt: new Date().toISOString()
            };
            
            users.push(newUser);
            localStorage.setItem('lingofy_users', JSON.stringify(users));
            
            // Set current user and redirect
            setCurrentUser(newUser);
            
            showToast('Registration successful! Redirecting...', 'success');
            
            setTimeout(() => {
                if (formData.role === 'admin') {
                    window.location.href = 'admin-dashboard.html';
                } else {
                    window.location.href = 'student-tests.html';
                }
            }, 1000);
        });
    }
});

function showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const feedback = field.closest('.mb-3, .mb-4').querySelector('.invalid-feedback');
    
    if (field) {
        field.classList.add('is-invalid');
    }
    
    if (feedback) {
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

