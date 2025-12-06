// Lingofy - Student Profile Script

document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    if (!isLoggedIn()) {
        window.location.href = 'login.html';
        return;
    }
    
    const user = getCurrentUser();
    
    // Redirect if admin
    if (user.role === 'admin') {
        window.location.href = 'admin-dashboard.html';
        return;
    }
    
    // Load profile data
    loadProfileData();
    setupSettingsForm();
});

function loadProfileData() {
    // Profile data loaded in form
}

function setupSettingsForm() {
    const user = getCurrentUser();
    if (!user) return;
    
    const form = document.getElementById('profileSettingsForm');
    const fullNameInput = document.getElementById('settingsFullName');
    const emailInput = document.getElementById('settingsEmail');
    
    // Populate form
    fullNameInput.value = user.fullName || '';
    emailInput.value = user.email || '';
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const newFullName = fullNameInput.value.trim();
        const newEmail = emailInput.value.trim();
        const currentPassword = document.getElementById('currentPassword').value;
        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        // Validation
        if (!newFullName || !newEmail) {
            showToast('Please fill in all required fields', 'warning');
            return;
        }
        
        // Check if email already exists (for other users)
        const users = JSON.parse(localStorage.getItem('lingofy_users') || '[]');
        const existingUser = users.find(u => u.email === newEmail && u.id !== user.id);
        
        if (existingUser) {
            showToast('This email/username is already taken', 'danger');
            return;
        }
        
        // Update user data
        const userIndex = users.findIndex(u => u.id === user.id);
        
        if (userIndex === -1) {
            showToast('User not found', 'danger');
            return;
        }
        
        // Check password if changing
        if (newPassword) {
            if (!currentPassword) {
                showToast('Please enter your current password', 'warning');
                return;
            }
            
            if (currentPassword !== users[userIndex].password) {
                showToast('Current password is incorrect', 'danger');
                return;
            }
            
            if (newPassword.length < 6) {
                showToast('New password must be at least 6 characters', 'warning');
                return;
            }
            
            if (newPassword !== confirmPassword) {
                showToast('New passwords do not match', 'danger');
                return;
            }
            
            users[userIndex].password = newPassword;
        }
        
        // Update user info
        users[userIndex].fullName = newFullName;
        users[userIndex].email = newEmail;
        
        localStorage.setItem('lingofy_users', JSON.stringify(users));
        
        // Update current user in session
        setCurrentUser(users[userIndex]);
        
        // Update avatar
        loadProfileData();
        
        // Clear password fields
        document.getElementById('currentPassword').value = '';
        document.getElementById('newPassword').value = '';
        document.getElementById('confirmPassword').value = '';
        
        showToast('Profile updated successfully!', 'success');
        
        // Redirect after a short delay
        setTimeout(() => {
            window.location.href = 'student-tests.html';
        }, 1500);
    });
}

