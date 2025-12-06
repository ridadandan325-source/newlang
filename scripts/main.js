// Lingofy - Main JavaScript File
// Common utilities and functions

// Language support configuration
const LANGUAGES = {
    french: { name: 'French', native: 'Français', flag: '🇫🇷' },
    english: { name: 'English', native: 'English', flag: '🇬🇧' },
    spanish: { name: 'Spanish', native: 'Español', flag: '🇪🇸' },
    german: { name: 'German', native: 'Deutsch', flag: '🇩🇪' },
    italian: { name: 'Italian', native: 'Italiano', flag: '🇮🇹' },
    arabic: { name: 'Arabic', native: 'العربية', flag: '🇸🇦' },
    chinese: { name: 'Chinese', native: '中文', flag: '🇨🇳' },
    japanese: { name: 'Japanese', native: '日本語', flag: '🇯🇵' },
    korean: { name: 'Korean', native: '한국어', flag: '🇰🇷' },
    portuguese: { name: 'Portuguese', native: 'Português', flag: '🇵🇹' },
    russian: { name: 'Russian', native: 'Русский', flag: '🇷🇺' },
    turkish: { name: 'Turkish', native: 'Türkçe', flag: '🇹🇷' }
};

// Get language info
function getLanguageInfo(langCode) {
    return LANGUAGES[langCode] || { name: langCode, native: langCode, flag: '🌐' };
}

// Initialize LocalStorage if not exists
function initLocalStorage() {
    if (!localStorage.getItem('lingofy_users')) {
        localStorage.setItem('lingofy_users', JSON.stringify([]));
    }
    if (!localStorage.getItem('lingofy_forms')) {
        localStorage.setItem('lingofy_forms', JSON.stringify([]));
    }
    if (!localStorage.getItem('lingofy_results')) {
        localStorage.setItem('lingofy_results', JSON.stringify([]));
    }
    if (!localStorage.getItem('lingofy_theme')) {
        localStorage.setItem('lingofy_theme', JSON.stringify({
            primaryColor: '#0d6efd',
            fontStyle: 'sans',
            buttonShape: 'rounded'
        }));
    }
}

// Get current user from session
function getCurrentUser() {
    const userStr = sessionStorage.getItem('lingofy_current_user');
    return userStr ? JSON.parse(userStr) : null;
}

// Set current user in session
function setCurrentUser(user) {
    if (user) {
        sessionStorage.setItem('lingofy_current_user', JSON.stringify(user));
    } else {
        sessionStorage.removeItem('lingofy_current_user');
    }
}

// Check if user is logged in
function isLoggedIn() {
    return getCurrentUser() !== null;
}

// Check if user is admin
function isAdmin() {
    const user = getCurrentUser();
    return user && user.role === 'admin';
}

// Apply theme from localStorage
function applyTheme() {
    const theme = JSON.parse(localStorage.getItem('lingofy_theme') || '{}');
    
    if (theme.primaryColor) {
        document.documentElement.style.setProperty('--primary-color', theme.primaryColor);
        document.documentElement.style.setProperty('--primary-hover', adjustBrightness(theme.primaryColor, -10));
    }
    
    if (theme.fontStyle) {
        const fontMap = {
            'sans': '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
            'rounded': '"Comic Sans MS", "Segoe UI", sans-serif',
            'serif': 'Georgia, "Times New Roman", serif'
        };
        document.body.style.fontFamily = fontMap[theme.fontStyle] || fontMap.sans;
    }
    
    if (theme.buttonShape) {
        const shapeMap = {
            'rounded': '0.75rem',
            'minimal': '0.25rem',
            'square': '0'
        };
        document.documentElement.style.setProperty('--button-radius', shapeMap[theme.buttonShape] || '0.75rem');
    }
}

// Helper function to adjust color brightness
function adjustBrightness(hex, percent) {
    const num = parseInt(hex.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
        (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
        (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
}

// Show toast notification
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    toast.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    toast.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Format date
function formatDate(date) {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initLocalStorage();
    applyTheme();
    
    // Add CSRF token if needed
    const meta = document.createElement('meta');
    meta.name = 'csrf-token';
    meta.content = 'lingofy-' + Date.now();
    document.head.appendChild(meta);
});

