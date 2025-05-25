document.addEventListener('DOMContentLoaded', function() {
    // Add loading animation for images (unique to home.js)
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        // If image is already loaded
        if (img.complete) {
            img.style.opacity = '1';
        }
    });

    // Add intersection observer for scroll animations (unique to home.js)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate on scroll (unique to home.js)
    const animateElements = document.querySelectorAll('.product-card, .about-text, .services-content');
    animateElements.forEach(el => {
        observer.observe(el);
    });
});
