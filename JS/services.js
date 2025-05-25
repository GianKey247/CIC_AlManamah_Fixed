// Navbar background opacity on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    const scrollTop = window.pageYOffset;
    
    if (scrollTop > 50) {
        navbar.style.background = 'rgba(4, 13, 86, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    } else {
        navbar.style.background = 'rgba(4, 13, 86, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Service card animation on scroll
function animateOnScroll() {
    const serviceCards = document.querySelectorAll('.service-card');
    const windowHeight = window.innerHeight;
    
    serviceCards.forEach((card, index) => {
        const cardTop = card.getBoundingClientRect().top;
        
        if (cardTop < windowHeight - 100) {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}

// Initialize cards as hidden for scroll animation
document.addEventListener('DOMContentLoaded', function() {
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
    });
    
    // Trigger animation on load and scroll
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
});

// Contact information click to copy functionality
document.addEventListener('DOMContentLoaded', function() {
    const contactValues = document.querySelectorAll('.contact-value');
    
    contactValues.forEach(contactValue => {
        contactValue.style.cursor = 'pointer';
        contactValue.title = 'Click to copy';
        
        contactValue.addEventListener('click', function() {
            const text = this.textContent.trim();
            
            // Try to use the modern clipboard API
            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(text).then(() => {
                    showCopyFeedback(this);
                }).catch(() => {
                    fallbackCopy(text, this);
                });
            } else {
                fallbackCopy(text, this);
            }
        });
    });
});

// Fallback copy function for older browsers
function fallbackCopy(text, element) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showCopyFeedback(element);
    } catch (err) {
        console.error('Failed to copy text: ', err);
    }
    
    document.body.removeChild(textArea);
}

// Show copy feedback
function showCopyFeedback(element) {
    const originalText = element.textContent;
    element.textContent = 'Copied!';
    element.style.color = '#27ae60';
    
    setTimeout(() => {
        element.textContent = originalText;
        element.style.color = '';
    }, 1500);
}

// Add hover effects to service cards
document.addEventListener('DOMContentLoaded', function() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Resize handler for mobile menu
window.addEventListener('resize', function() {
    const navLinks = document.getElementById('navLinks');
    const burger = document.querySelector('.burger');
    
    if (window.innerWidth > 768) {
        navLinks.classList.remove('active');
        burger.innerHTML = '☰';
        burger.style.transform = 'rotate(0deg)';
    }
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Trigger service cards animation after page load
    setTimeout(() => {
        animateOnScroll();
    }, 300);
});
