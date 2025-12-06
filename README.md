# Lingofy - Multi-Language Quiz Application

A comprehensive multi-language assessment platform built with Bootstrap 5 and vanilla JavaScript. This application provides a complete testing system for students and a powerful admin dashboard for managing tests and questions in multiple languages.

## Features

### Student Features
- **Available Tests Page**: Browse and start available language tests in multiple languages
- **Dynamic Test Taking**: Interactive quiz interface with progress tracking
- **Results Page**: Detailed score breakdown with level indicators and feedback
- **Multi-Language Support**: Tests available in French, English, Spanish, German, Italian, Arabic, Chinese, Japanese, Korean, Portuguese, Russian, Turkish, and more
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

### Admin Features
- **Dashboard**: Overview with statistics (Active Tests, Total Questions, Attempts, Students)
- **Form Builder**: Create and edit tests with multiple question types
- **Language Selection**: Choose the language for each test/quiz (Admin only)
- **Question Types**: Text input, Multiple choice (Radio), Dropdown (Select)
- **Theme Customization**: Customize primary color, font style, and button shapes
- **Forms Management**: View, edit, activate/deactivate, and delete forms

## Pages

1. **Landing Page** (`index.html`) - Hero section with feature cards
2. **Register Page** (`register.html`) - User registration with role selection
3. **Login Page** (`login.html`) - User authentication
4. **Admin Dashboard** (`admin-dashboard.html`) - Admin overview and forms management
5. **Form Builder** (`form-builder.html`) - Create and edit tests
6. **Theme Customization** (`admin-theme.html`) - Customize application theme
7. **Student Tests** (`student-tests.html`) - Available tests listing
8. **Test Taking** (`test-taking.html`) - Dynamic quiz interface
9. **Results** (`results.html`) - Test results with detailed breakdown
10. **404 Page** (`404.html`) - Error page
11. **Empty State** (`empty-state.html`) - No content available page

## Design Principles

- **Color-Blind Friendly**: Never relies on color alone - all status indicators include icons and text
- **Accessibility**: High contrast, focus states, keyboard navigation support
- **Responsive**: Mobile-first design using Bootstrap grid system
- **Modern UI**: Clean, professional interface with smooth animations
- **Blue Theme**: Primary color scheme with color-blind safe alternatives
- **Multi-Language**: Support for 12+ languages with easy language selection for admins

## Component Library

### Buttons
- Primary, Secondary, Outline, Disabled states
- Icon support with text labels
- Hover and focus states

### Form Inputs
- Text, Email, Password, Select, Radio, Checkbox
- Strong focus states
- Icon-based error messages
- Real-time validation

### Badges
- Active/Inactive status with icons
- Success/Danger/Warning/Info variants
- Never color-only (always includes icon + label)

### Cards
- Info cards, test cards, question preview cards
- Hover effects and shadows

### Tables
- Form listing table
- Results table
- Responsive design

### Navigation
- Student navbar
- Admin sticky navbar with tabs

## Getting Started

1. Open `index.html` in a web browser
2. Register a new account (choose Student or Admin role)
3. Login with your credentials
4. Explore the application features

## Technology Stack

- **Bootstrap 5.3.0**: CSS framework
- **Bootstrap Icons**: Icon library
- **Vanilla JavaScript**: No frameworks required
- **LocalStorage**: Client-side data persistence (for demo purposes)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## File Structure

```
lingofy/
├── index.html
├── register.html
├── login.html
├── admin-dashboard.html
├── form-builder.html
├── admin-theme.html
├── student-tests.html
├── test-taking.html
├── results.html
├── 404.html
├── empty-state.html
├── styles/
│   └── main.css
├── scripts/
│   ├── main.js
│   ├── register.js
│   ├── login.js
│   ├── form-builder.js
│   ├── theme-customization.js
│   ├── test-taking.js
│   └── results.js
└── README.md
```

## Notes

- This is a front-end prototype. In a production environment, you would need:
  - Backend API for data persistence
  - User authentication system
  - Database for storing tests, questions, and results
  - Server-side validation

## License

This project is provided as-is for educational and demonstration purposes.

