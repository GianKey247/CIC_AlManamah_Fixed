// Tab functionality
function openTab(tabName) {
    // Hide all tab content
    const tabContents = document.getElementsByClassName('tab-content');
    for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].classList.remove('active');
    }

    // Remove active class from all tab buttons
    const tabButtons = document.getElementsByClassName('tab-button');
    for (let i = 0; i < tabButtons.length; i++) {
        tabButtons[i].classList.remove('active');
    }

    // Show the selected tab content and mark button as active
    document.getElementById(tabName).classList.add('active');
    document.querySelector(`.tab-button[onclick="openTab('${tabName}')"]`).classList.add('active');
}

// Contact form submission
document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    // Show confirmation message
    alert(`Thank you ${name}! Your message has been sent successfully. We'll contact you soon at ${email}.`);

    // Reset the form
    this.reset();
});

// Login form submission
document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // Get login values
    const email = document.getElementById('loginEmail').value;

    // Show confirmation (in a real application, this would verify credentials)
    alert(`Welcome back! You are now logged in as ${email}.`);

    // In a real app, you would redirect to the dashboard here
});