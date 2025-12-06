// Lingofy - Theme Customization Script

document.addEventListener('DOMContentLoaded', function() {
    // Check admin access
    if (!isAdmin()) {
        window.location.href = 'index.html';
        return;
    }
    
    // Load current theme
    loadCurrentTheme();
    
    // Setup color selection
    setupColorSelection();
    
    // Setup font style change
    const fontStyleSelect = document.getElementById('fontStyleSelect');
    if (fontStyleSelect) {
        fontStyleSelect.addEventListener('change', function() {
            updatePreview();
        });
    }
    
    // Setup button shape change
    const buttonShapes = document.querySelectorAll('input[name="buttonShape"]');
    buttonShapes.forEach(radio => {
        radio.addEventListener('change', function() {
            updatePreview();
        });
    });
});

function setupColorSelection() {
    const colorOptions = document.querySelectorAll('.color-option');
    
    colorOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            // Remove selected class from all options
            colorOptions.forEach(opt => {
                opt.classList.remove('selected');
                opt.querySelector('input[type="radio"]').checked = false;
            });
            
            // Add selected class to clicked option
            this.classList.add('selected');
            const radio = this.querySelector('input[type="radio"]');
            radio.checked = true;
            
            // Update preview immediately
            updatePreview();
        });
    });
}

function loadCurrentTheme() {
    const theme = JSON.parse(localStorage.getItem('lingofy_theme') || '{}');
    
    // Set primary color
    if (theme.primaryColor) {
        const colorOptions = document.querySelectorAll('.color-option');
        const colorOption = document.querySelector(`.color-option[data-color="${theme.primaryColor}"]`);
        if (colorOption) {
            colorOptions.forEach(opt => opt.classList.remove('selected'));
            colorOption.classList.add('selected');
            colorOption.querySelector('input[type="radio"]').checked = true;
        }
    }
    
    // Set font style
    if (theme.fontStyle) {
        const fontSelect = document.getElementById('fontStyleSelect');
        if (fontSelect) {
            fontSelect.value = theme.fontStyle;
        }
    }
    
    // Set button shape
    if (theme.buttonShape) {
        const shapeRadio = document.querySelector(`input[name="buttonShape"][value="${theme.buttonShape}"]`);
        if (shapeRadio) {
            shapeRadio.checked = true;
        }
    }
    
    // Update preview
    updatePreview();
}

function updatePreview() {
    const selectedColor = document.querySelector('.color-option.selected input[type="radio"]')?.value || '#0d6efd';
    const fontStyle = document.getElementById('fontStyleSelect')?.value || 'sans';
    const buttonShape = document.querySelector('input[name="buttonShape"]:checked')?.value || 'rounded';
    
    // Update preview buttons
    const previewButtons = document.querySelectorAll('#themePreview .btn-primary, #themePreview .btn-outline-primary');
    previewButtons.forEach(btn => {
        if (btn.classList.contains('btn-primary')) {
            btn.style.backgroundColor = selectedColor;
            btn.style.borderColor = selectedColor;
        } else if (btn.classList.contains('btn-outline-primary')) {
            btn.style.color = selectedColor;
            btn.style.borderColor = selectedColor;
        }
    });
    
    // Update preview form inputs focus
    const previewInputs = document.querySelectorAll('#themePreview .form-control, #themePreview .form-select');
    previewInputs.forEach(input => {
        const style = document.createElement('style');
        style.textContent = `
            #themePreview .form-control:focus,
            #themePreview .form-select:focus {
                border-color: ${selectedColor} !important;
                box-shadow: 0 0 0 0.25rem ${hexToRgba(selectedColor, 0.25)} !important;
            }
        `;
        if (!document.getElementById('preview-dynamic-style')) {
            style.id = 'preview-dynamic-style';
            document.head.appendChild(style);
        } else {
            document.getElementById('preview-dynamic-style').textContent = style.textContent;
        }
    });
    
    // Update button border radius
    const borderRadiusMap = {
        'rounded': '0.75rem',
        'minimal': '0.25rem',
        'square': '0'
    };
    previewButtons.forEach(btn => {
        btn.style.borderRadius = borderRadiusMap[buttonShape] || '0.75rem';
    });
    
    // Update navbar color in preview (if exists)
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        navbar.style.backgroundColor = selectedColor;
    }
}

function hexToRgba(hex, alpha) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function applyTheme() {
    const selectedColor = document.querySelector('.color-option.selected input[type="radio"]')?.value || '#0d6efd';
    const fontStyle = document.getElementById('fontStyleSelect')?.value || 'sans';
    const buttonShape = document.querySelector('input[name="buttonShape"]:checked')?.value || 'rounded';
    
    // Save theme to localStorage
    const theme = {
        primaryColor: selectedColor,
        fontStyle: fontStyle,
        buttonShape: buttonShape
    };
    
    localStorage.setItem('lingofy_theme', JSON.stringify(theme));
    
    // Apply theme immediately
    applyThemeToPage(theme);
    
    showToast('Theme applied successfully!', 'success');
    
    // Update preview
    updatePreview();
}

function applyThemeToPage(theme) {
    // Apply primary color
    if (theme.primaryColor) {
        document.documentElement.style.setProperty('--primary-color', theme.primaryColor);
        
        // Calculate hover color (darker)
        const hoverColor = adjustBrightness(theme.primaryColor, -10);
        document.documentElement.style.setProperty('--primary-hover', hoverColor);
        
        // Update Bootstrap primary color
        const style = document.createElement('style');
        style.id = 'dynamic-theme-style';
        style.textContent = `
            .btn-primary {
                background-color: ${theme.primaryColor} !important;
                border-color: ${theme.primaryColor} !important;
            }
            .btn-primary:hover {
                background-color: ${hoverColor} !important;
                border-color: ${hoverColor} !important;
            }
            .bg-primary {
                background-color: ${theme.primaryColor} !important;
            }
            .text-primary {
                color: ${theme.primaryColor} !important;
            }
            .navbar.bg-primary {
                background-color: ${theme.primaryColor} !important;
            }
            .form-control:focus,
            .form-select:focus {
                border-color: ${theme.primaryColor} !important;
                box-shadow: 0 0 0 0.25rem ${hexToRgba(theme.primaryColor, 0.25)} !important;
            }
        `;
        
        // Remove old style if exists
        const oldStyle = document.getElementById('dynamic-theme-style');
        if (oldStyle) {
            oldStyle.remove();
        }
        document.head.appendChild(style);
    }
    
    // Apply font style
    if (theme.fontStyle) {
        const fontMap = {
            'sans': '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
            'rounded': '"Comic Sans MS", "Segoe UI", sans-serif',
            'serif': 'Georgia, "Times New Roman", serif'
        };
        document.body.style.fontFamily = fontMap[theme.fontStyle] || fontMap.sans;
    }
    
    // Apply button shape
    if (theme.buttonShape) {
        const shapeMap = {
            'rounded': '0.75rem',
            'minimal': '0.25rem',
            'square': '0'
        };
        const borderRadius = shapeMap[theme.buttonShape] || '0.75rem';
        
        const buttonStyle = document.createElement('style');
        buttonStyle.id = 'dynamic-button-style';
        buttonStyle.textContent = `
            .btn {
                border-radius: ${borderRadius} !important;
            }
        `;
        
        const oldButtonStyle = document.getElementById('dynamic-button-style');
        if (oldButtonStyle) {
            oldButtonStyle.remove();
        }
        document.head.appendChild(buttonStyle);
    }
}

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

// Make applyTheme globally available
window.applyTheme = applyTheme;

// Initialize preview on load
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        updatePreview();
    }, 100);
});

