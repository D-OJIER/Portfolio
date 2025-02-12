const cloudSets = {
    'gold': 'orange_2',
    'green': 'fiolet_2',
    'blue': 'blue_2',
    'red': 'pink_2'
};

class CloudGenerator {
    constructor() {
        this.container = document.getElementById('backgroundHeader');
        this.currentTheme = document.documentElement.getAttribute('data-theme') || 'blue';
        this.maxClouds = 5; // Reduced from 8 to 5
        this.minDuration = 40; // Increased minimum duration
        this.maxDuration = 80; // Increased maximum duration
        this.cloudInterval = null;
        this.baseCloudSize = 100; // Base size for clouds
        this.updateCloudSizes = this.updateCloudSizes.bind(this);
    }

    getResponsiveSize() {
        const width = window.innerWidth;
        if (width < 768) return this.baseCloudSize * 0.6;
        if (width < 1024) return this.baseCloudSize * 0.8;
        return this.baseCloudSize;
    }

    updateCloudSizes() {
        const clouds = this.container.getElementsByClassName('clouds');
        const size = this.getResponsiveSize();
        Array.from(clouds).forEach(cloud => {
            cloud.style.width = `${size}px`;
        });
    }

    generateRandomCloud() {
        const cloudNumber = Math.floor(Math.random() * 67) + 1;
        const cloudPath = `Images/${cloudSets[this.currentTheme]}/2.${cloudNumber}.png`;
        const duration = Math.random() * (this.maxDuration - this.minDuration) + this.minDuration;
        const yPos = Math.random() * (window.innerHeight * 0.8);
        const direction = Math.random() < 0.5 ? 'floatLeftToRight' : 'floatRightToLeft';
        
        const cloud = document.createElement('img');
        cloud.className = 'clouds';
        cloud.src = cloudPath;
        cloud.alt = '';
        cloud.style.width = `${this.getResponsiveSize()}px`;
        cloud.style.setProperty('--duration', `${duration}s`);
        cloud.style.setProperty('--ypos', `${yPos}px`);
        cloud.style.setProperty('--animation-name', direction);
        
        const isLightMode = !document.documentElement.classList.contains('theme_dark');
        cloud.style.opacity = isLightMode ? 0.4 : 0.2;

        cloud.addEventListener('animationend', () => {
            cloud.remove();
            this.addNewCloud();
        });

        cloud.onerror = () => {
            console.error(`Failed to load cloud image: ${cloudPath}`);
            cloud.remove();
            this.addNewCloud();
        };

        this.container.appendChild(cloud);
    }

    addNewCloud() {
        if (this.container.getElementsByClassName('clouds').length < this.maxClouds) {
            setTimeout(() => this.generateRandomCloud(), Math.random() * 3000);
        }
    }

    updateTheme(newTheme) {
        this.currentTheme = newTheme;
        // Update existing clouds' images while keeping same cloud number
        const existingClouds = this.container.getElementsByClassName('clouds');
        Array.from(existingClouds).forEach(cloud => {
            const currentPath = cloud.src;
            // Extract the cloud number from current path (2.XX.png)
            const cloudNumber = currentPath.match(/2\.(\d+)\.png/)[0];
            cloud.src = `Images/${cloudSets[newTheme]}/${cloudNumber}`;
        });
    }

    updateOpacity(isLightMode) {
        const existingClouds = this.container.getElementsByClassName('clouds');
        const opacity = isLightMode ? 0.7 : 0.2;
        Array.from(existingClouds).forEach(cloud => {
            cloud.style.opacity = opacity;
        });
    }

    start() {
        // Add resize listener for responsiveness
        window.addEventListener('resize', this.updateCloudSizes);
        
        // Generate initial clouds with delay between each
        for (let i = 0; i < this.maxClouds; i++) {
            setTimeout(() => this.generateRandomCloud(), i * 2000);
        }

        // Longer interval between new cloud generation
        this.cloudInterval = setInterval(() => this.addNewCloud(), 4000);
    }

    stop() {
        if (this.cloudInterval) {
            clearInterval(this.cloudInterval);
        }
        window.removeEventListener('resize', this.updateCloudSizes);
    }
}

// Initialize cloud generator immediately
document.addEventListener('DOMContentLoaded', () => {
    window.cloudGenerator = new CloudGenerator();
    window.cloudGenerator.start();
});
