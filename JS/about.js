document.addEventListener('DOMContentLoaded', function() {
    // Parallax Effect for Hero Section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const parallaxSpeed = 0.5;

        if (hero) {
            hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        }
    });

    // Video Controls
    const aboutVideo = document.querySelector('.about-video video');
    if (aboutVideo) {
        // Add click to play/pause functionality
        aboutVideo.addEventListener('click', function() {
            if (this.paused) {
                this.play();
                showVideoMessage('Playing...');
            } else {
                this.pause();
                showVideoMessage('Paused');
            }
        });

        // Video error handling
        aboutVideo.addEventListener('error', function() {
            console.log('Video failed to load');
            this.parentElement.innerHTML = '<div class="video-placeholder">Video not available</div>';
        });
    }

    // Service Box Hover Effects
    const serviceBoxes = document.querySelectorAll('.box');
    serviceBoxes.forEach(box => {
        box.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.05)';
        });

        box.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    window.addEventListener('scroll', function() {
        // Throttle scroll events for better performance
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(function() {
                scrollTimeout = null;
            }, 16); // ~60fps
        }
    });

    // Page loaded animation
    showPageLoaded();

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const navLinks = document.getElementById('navLinks');
            navLinks.classList.remove('active');
        }
    });

    // Form submission handler (if contact form exists)
    const form = document.querySelector('form'); // Adjust the selector as needed
    if (form) {
        form.addEventListener('submit', handleFormSubmission);
    }

    // Performance optimization: Lazy load images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        const images = document.querySelectorAll('img[data-src]');
        images.forEach(img => imageObserver.observe(img));
    }
});

// Show video message
function showVideoMessage(message) {
    const messageEl = document.createElement('div');
    messageEl.textContent = message;
    messageEl.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgba(0,0,0,0.8);
                color: white;
                padding: 10px 20px;
                border-radius: 5px;
                z-index: 9999;
                transition: opacity 0.3s;
            `;

    document.body.appendChild(messageEl);

    setTimeout(() => {
        messageEl.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(messageEl);
        }, 300);
    }, 1500);
}



// Page loaded animation
function showPageLoaded() {
    document.body.classList.add('page-loaded');
}

// Form submission handler (if contact form exists)
function handleFormSubmission(event) {
    event.preventDefault();
    // Add form handling logic here
    showVideoMessage('Message sent successfully!');
}

// Smooth reveal animation for elements
function revealOnScroll() {
    const reveals = document.querySelectorAll('.fade-in-animation');

    reveals.forEach(reveal => {
        const windowHeight = window.innerHeight;
        const elementTop = reveal.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            reveal.classList.add('fade-in-visible');
        }
    });
}

// Throttled scroll event
let scrollTimeout;
function requestTick() {
    if (!ticking) {
        requestAnimationFrame(revealOnScroll);
        ticking = true;
        setTimeout(() => ticking = false, 100);
    }
}

window.addEventListener('scroll', requestTick);
