const cursor = document.getElementById('customCursor');
const scope = cursor.querySelector('.cursor-scope');
let lastX = 0, lastY = 0;
let currentX = 0, currentY = 0;
let velocityX = 0, velocityY = 0;

function updateCursor(e) {
    // Calculate velocity
    velocityX = e.clientX - lastX;
    velocityY = e.clientY - lastY;
    const speed = Math.sqrt(velocityX * velocityX + velocityY * velocityY);
    
    // Update cursor position with centering offset
    currentX = e.clientX - cursor.offsetWidth / 2;
    currentY = e.clientY - cursor.offsetHeight / 2;
    cursor.style.transform = `translate(${currentX}px, ${currentY}px)`;

    // Add "motion blur" effect based on velocity
    const angle = Math.atan2(velocityY, velocityX) * 180 / Math.PI;
    const stretch = Math.min(speed / 10, 2);
    scope.style.transform = `rotate(${angle}deg) scale(${1 + stretch * 0.1}, ${1 - stretch * 0.05})`;
    
    lastX = e.clientX;
    lastY = e.clientY;
}


// Handle interactions
document.addEventListener('mousemove', updateCursor);

document.addEventListener('mousedown', () => {
    cursor.classList.add('clicking');
});

document.addEventListener('mouseup', () => {
    cursor.classList.remove('clicking');
});

// Handle interactive elements
const interactiveElements = document.querySelectorAll('a, button, .pixel-button, .color-btn, input, .headerLink');

interactiveElements.forEach(el => {
    el.addEventListener('mouseover', () => {
        cursor.classList.add('hovering');
    });
    
    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hovering');
    });
});

// Handle cursor hiding/showing
document.addEventListener('mouseleave', () => {
    cursor.style.display = 'none';
});

document.addEventListener('mouseenter', () => {
    cursor.style.display = 'block';
});
