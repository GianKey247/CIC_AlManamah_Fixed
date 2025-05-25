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