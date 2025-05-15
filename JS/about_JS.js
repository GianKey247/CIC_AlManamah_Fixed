const navLinks = document.getElementById('nav-links')
// // Toggle mobile menu
// document.getElementById('menu-toggle').addEventListener('click', function () {
//     navLinks.classList.toggle('active');
// });

// Apply active class to navbar items on click
const navLinks_a = document.querySelectorAll('.nav-links a');
navLinks_a.forEach(link => {
    link.addEventListener('click', function (e) {
        // Remove active class from all links
        navLinks_a.forEach(item => item.classList.remove('active'));

        // Add active class to clicked link
        this.classList.add('active');

    });
});


// Add animation to boxes on scroll
const boxes = document.querySelectorAll('.box');

function checkBoxes() {
    const triggerBottom = window.innerHeight * 0.8;

    boxes.forEach(box => {
        const boxTop = box.getBoundingClientRect().top;

        if (boxTop < triggerBottom) {
            box.style.opacity = '1';
            box.style.transform = 'translateY(0)';
        } else {
            box.style.opacity = '0';
            box.style.transform = 'translateY(50px)';
        }
    });
}

// Set initial styles for animation
boxes.forEach(box => {
    box.style.opacity = '0';
    box.style.transform = 'translateY(50px)';
    box.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

// Check boxes on load and scroll
window.addEventListener('load', checkBoxes);
window.addEventListener('scroll', checkBoxes);

// Add hover effect to client logos
const clientLogos = document.querySelectorAll('.client-logo');
clientLogos.forEach(logo => {
    logo.addEventListener('mouseover', function () {
        this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
    });

    logo.addEventListener('mouseout', function () {
        this.style.boxShadow = 'none';
    });
});