const themeToggle = document.getElementById('themeToggle');
const themePicker = document.getElementById('themePicker');
const darkModeToggle = document.getElementById('darkMode');

function applyTheme(theme, isDark) {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.classList.toggle('theme_dark', isDark);
    localStorage.setItem('theme', theme);
    localStorage.setItem('darkMode', isDark);
    darkModeToggle.checked = !isDark;
    
    // Update clouds with new theme and opacity
    if (window.cloudGenerator) {
        window.cloudGenerator.updateTheme(theme);
        window.cloudGenerator.updateOpacity(!isDark);
    }
}

// Initialize theme
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'gold';
    const savedMode = localStorage.getItem('darkMode') === 'true';
    applyTheme(savedTheme, savedMode);

    const cloudGen = new CloudGenerator();
    cloudGen.start();
});

// Event listeners
themeToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    themePicker.classList.toggle('active');
});

document.querySelectorAll('.color-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        applyTheme(btn.getAttribute('data-theme'), darkModeToggle.checked);
        themePicker.classList.remove('active');
    });
});

darkModeToggle.addEventListener('change', () => {
    applyTheme(
        document.documentElement.getAttribute('data-theme'),
        !darkModeToggle.checked
    );
});

document.addEventListener('click', (e) => {
    if (!themePicker.contains(e.target) && !themeToggle.contains(e.target)) {
        themePicker.classList.remove('active');
    }
});

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    cloudGen.updateTheme(theme);
}
