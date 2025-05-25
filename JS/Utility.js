function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    const burger = document.querySelector('.burger');

    navLinks.classList.toggle('active');
    burger.classList.toggle('active');

    // Prevent body scroll when menu is open
    if (navLinks.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}
function updateActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    let current = '';
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(`#${current}`)) {
            link.classList.add('active');
        }
    });
}
document.addEventListener('DOMContentLoaded', function() {
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-links a');
    const mobileMenu = document.getElementById('navLinks');
    const burger = document.querySelector('.burger');

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            burger.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const navbar = document.querySelector('.navbar');

        if (!navbar.contains(event.target) && !burger.contains(event.target) && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            burger.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Smooth scrolling for anchor links
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar height

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }

            // Close mobile menu if open
            mobileMenu.classList.remove('active');
            burger.classList.remove('active');
            document.body.style.overflow = '';

            // Update active link
            updateActiveLink();
        });
    });
    let scrollTimeout;
    // Add scroll event listener to update active link
    window.addEventListener('scroll', function() {
        // Throttle scroll events for better performance
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(function() {
                updateActiveLink();
                scrollTimeout = null;
            }, 16); // ~60fps
        }
    });
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

// Update active navigation based on scroll position
function updateActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    let current = '';
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Page loaded animation
function showPageLoaded() {
    document.body.classList.add('page-loaded');
}

// Add scroll-to-top functionality
function addScrollToTop() {
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '↑';
    scrollButton.setAttribute('aria-label', 'Scroll to top');
    scrollButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(45deg, #78b7ff, #4f88d6);
        color: white;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        z-index: 1000;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(120, 183, 255, 0.3);
    `;

    scrollButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Show/hide scroll button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollButton.style.opacity = '1';
            scrollButton.style.visibility = 'visible';
        } else {
            scrollButton.style.opacity = '0';
            scrollButton.style.visibility = 'hidden';
        }
    });

    document.body.appendChild(scrollButton);
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

// Form submission handler (if contact form exists)
function handleFormSubmission(event) {
    event.preventDefault();
    // Add form handling logic here
    showVideoMessage('Message sent successfully!');
}
