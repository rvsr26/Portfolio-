// --- 1. TYPING EFFECT (Typed.js) ---
var typed = new Typed(".text", {
    strings: ["building scalable web apps" , "backend engineering","solving real-world problems"],
    typeSpeed:100,
    backSpeed:100,
    backDelay:1000,
    loop:true
});


// --- 2. SCROLL-TO-TOP BUTTON ---
const toTop = document.querySelector(".top");
window.addEventListener("scroll",() =>{
    if (window.pageYOffset > 100){
        toTop.classList.add("active");
    }
    else{
        toTop.classList.remove("active");
    }
});


// --- 3. THEME TOGGLE FUNCTIONALITY (CRITICAL FIX APPLIED) ---
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Function to handle the actual theme switch
function toggleTheme() {
    // If the body currently has the 'dark-mode' class, we switch to light mode.
    if (body.classList.contains('dark-mode')) {
        body.classList.remove('dark-mode');
        themeToggle.classList.remove('bx-sun');
        themeToggle.classList.add('bx-moon'); // Show moon icon to indicate option to go dark
        localStorage.setItem('theme', 'light');
    } else {
        // If the body does NOT have 'dark-mode', we switch to dark mode.
        body.classList.add('dark-mode');
        themeToggle.classList.remove('bx-moon');
        themeToggle.classList.add('bx-sun'); // Show sun icon to indicate option to go light
        localStorage.setItem('theme', 'dark');
    }
}

// 1. Event Listener: Toggles the theme on click
themeToggle.addEventListener('click', toggleTheme);

// 2. Initial Check: Apply saved theme on page load
function applySavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    // Check if the OS prefers dark mode if no local preference is found
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Check saved theme from localStorage
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        themeToggle.classList.remove('bx-moon');
        themeToggle.classList.add('bx-sun');
    } 
    // Check OS preference only if no preference is saved
    else if (savedTheme === null && prefersDark) {
        body.classList.add('dark-mode');
        themeToggle.classList.remove('bx-moon');
        themeToggle.classList.add('bx-sun');
    } 
    // Default is light mode (no class added)
    else {
        body.classList.remove('dark-mode');
        themeToggle.classList.remove('bx-sun');
        themeToggle.classList.add('bx-moon');
    }
}

// Run the theme check immediately on page load
document.addEventListener('DOMContentLoaded', applySavedTheme);

// --- 4. CONTACT FORM EMAIL (EmailJS) ---
(function () {
    emailjs.init("IE4ybiaoMlaR8lgSS"); // 🔴 replace
})();

const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    emailjs.sendForm(
        "service_a9i96t6",   // 🔴 replace
        "template_3l19m09",  // 🔴 replace
        this
    ).then(() => {
        formStatus.style.display = "block";
        formStatus.innerHTML = "✅ Message sent successfully!";
        contactForm.reset();

        setTimeout(() => {
            formStatus.style.display = "none";
        }, 4000);
    }).catch(() => {
        formStatus.style.display = "block";
        formStatus.innerHTML = "❌ Message failed. Try again!";
    });
});
