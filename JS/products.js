document.addEventListener('DOMContentLoaded', function() {
    // Enhanced product card animations and effects
    const productCards = document.querySelectorAll('.product-card');
    
    // Enhanced intersection observer for staggered animations
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay for sequential animation
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                }, index * 150);
            }
        });
    }, observerOptions);
    
    productCards.forEach((card, index) => {
        observer.observe(card);
        
        // Enhanced hover effects with multiple event listeners
        card.addEventListener('mouseenter', function() {
            this.classList.add('hovered');
            // Add subtle parallax effect to image
            const img = this.querySelector('.product-image');
            if (img && img.tagName === 'IMG') {
                img.style.transform = 'scale(1.05) translateY(-5px)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('hovered');
            const img = this.querySelector('.product-image');
            if (img && img.tagName === 'IMG') {
                img.style.transform = '';
            }
        });
        
        // Add click animation effect
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
        
        // Add keyboard accessibility
        card.setAttribute('tabindex', '0');
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });

    // Enhanced video management with performance optimization
    const videos = document.querySelectorAll('video');
    
    videos.forEach(video => {
        // Set initial video properties
        video.muted = true;
        video.loop = true;
        video.playsInline = true;
        
        // Enhanced video observer with performance optimization
        const videoObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        if (video.paused) {
                            video.play().catch(e => {
                                console.warn('Video autoplay failed:', e);
                            });
                        }
                    }, 100);
                } else {
                    video.pause();
                    // Reset video to beginning for better UX
                    video.currentTime = 0;
                }
            });
        }, { 
            threshold: 0.3,
            rootMargin: '50px'
        });
        
        videoObserver.observe(video);
        
        // Add loading state
        video.addEventListener('loadstart', function() {
            this.classList.add('loading');
        });
        
        video.addEventListener('canplay', function() {
            this.classList.remove('loading');
            this.classList.add('loaded');
        });
        
        // Error handling for videos
        video.addEventListener('error', function() {
            this.classList.add('error');
            console.warn('Video failed to load:', this.src);
            
            // Replace video with placeholder
            this.parentElement.innerHTML = '<div class="video-placeholder">Video not available</div>';
        });
        
        // Pause video when tab is not visible (performance optimization)
        document.addEventListener('visibilitychange', function() {
            if (document.hidden) {
                video.pause();
            }
        });
    });
});
