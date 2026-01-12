/**
 * Vishnu Sathwick - Portfolio Core Script
 * Features: Typing Effect, Theme Sync, Scroll Observer, 
 * Advanced 2-Column Project Preview, and Independent Skills Accordion.
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. TYPING EFFECT (Typed.js) ---
    if (document.querySelector(".text")) {
        new Typed(".text", {
            strings: [
                "building scalable web applications",
                "backend engineering",
                "solving real-world problems",
                "full-stack development"
            ],
            typeSpeed: 70,
            backSpeed: 50,
            backDelay: 1500,
            loop: true
        });
    }

    // --- 2. THEME TOGGLE & PERSISTENCE ---
    const themeToggle = document.getElementById("theme-toggle");
    const body = document.body;

    const updateThemeIcon = (isDark) => {
        if (!themeToggle) return;
        themeToggle.className = isDark ? 'bx bx-sun theme-toggle' : 'bx bx-moon theme-toggle';
    };

    const toggleTheme = () => {
        const isDark = body.classList.toggle("dark-mode");
        localStorage.setItem("theme", isDark ? "dark" : "light");
        updateThemeIcon(isDark);
    };

    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
        body.classList.add("dark-mode");
        updateThemeIcon(true);
    }

    if (themeToggle) themeToggle.addEventListener("click", toggleTheme);

    // --- 3. SCROLL REVEAL (Intersection Observer) ---
    const revealOptions = { 
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px" 
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("reveal-active");
                revealObserver.unobserve(entry.target); 
            }
        });
    }, revealOptions);

    document.querySelectorAll(".about, .sec, .services, .contacts").forEach(el => {
        revealObserver.observe(el);
    });
// --- 3. SCROLL REVEAL & NAV HIGHLIGHTING (Intersection Observer) ---
    const navLinks = document.querySelectorAll('.navbar a');
    const sections = document.querySelectorAll('section');

    const observerOptions = { 
        threshold: 0.5, // Trigger when 50% of the section is visible
        rootMargin: "0px 0px -50px 0px" 
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // A. SCROLL REVEAL LOGIC
            if (entry.isIntersecting) {
                entry.target.classList.add("reveal-active");
            }

            // B. NAV HIGHLIGHT LOGIC
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    // Observe all sections for both revealing and highlighting
    sections.forEach(section => {
        observer.observe(section);
    });
    // --- 4. BACK-TO-TOP BUTTON ---
    const toTop = document.querySelector(".top");
    window.addEventListener("scroll", () => {
        if (toTop) {
            if (window.scrollY > 400) {
                toTop.classList.add("active");
            } else {
                toTop.classList.remove("active");
            }
        }
    });

    // --- 5. CONTACT FORM (EmailJS) ---
    (function () { 
        emailjs.init("IE4ybiaoMlaR8lgSS"); 
    })();

    const contactForm = document.getElementById("contact-form");
    const formStatus = document.getElementById("form-status");

    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const submitBtn = this.querySelector("button");
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerText = "Sending...";
            submitBtn.disabled = true;

            emailjs.sendForm("service_a9i96t6", "template_3l19m09", this)
                .then(() => {
                    formStatus.style.display = "block";
                    formStatus.style.color = "#2ecc71";
                    formStatus.innerHTML = "✅ Message sent successfully!";
                    contactForm.reset();
                })
                .catch((error) => {
                    console.error("EmailJS Error:", error);
                    formStatus.style.display = "block";
                    formStatus.style.color = "#e74c3c";
                    formStatus.innerHTML = "❌ Message failed. Try again!";
                })
                .finally(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    setTimeout(() => { formStatus.style.display = "none"; }, 5000);
                });
        });
    }

    // --- 6. ADVANCED PROJECT PREVIEW ENGINE (Updated for Name/Tools request) ---
    const projectCards = document.querySelectorAll(".project-card");
    const previewBox = document.getElementById("project-preview");

    projectCards.forEach(card => {
        card.addEventListener("click", function(e) {
            if (e.target.closest('.project-link')) return;

            // Extract Data from Card Attributes
            const title = this.getAttribute("data-title");
            const desc = this.getAttribute("data-desc");
            const live = this.getAttribute("data-live");
            const git = this.getAttribute("data-github");
            const imgPath = this.getAttribute("data-image"); // New attribute for project screenshot

            // Extract Tools from the hidden/initial card container
            const langContainer = this.querySelector(".project-languages");
            const langHTML = langContainer ? langContainer.innerHTML : "";

            if (!title) return;

            // Toggle logic
            if (this.classList.contains("active-project")) {
                previewBox.classList.add("hidden");
                this.classList.remove("active-project");
                return;
            }

            projectCards.forEach(c => c.classList.remove("active-project"));
            this.classList.add("active-project");

            // Build Advanced 2-Column Layout Content
            previewBox.innerHTML = `
                <span class="close-preview" id="close-btn" title="Close Preview">&times;</span>
                <div class="project-preview">
                    <div class="preview-media">
                        <img src="${imgPath}" alt="${title}" onerror="this.src='https://via.placeholder.com/600x400?text=Project+Image'">
                    </div>
                    <div class="preview-info">
                        <h3>${title}</h3>
                        <div class="preview-langs">${langHTML}</div>
                        <p>${desc}</p>
                        <div class="preview-links">
                            <a href="${git}" target="_blank" class="btn-box">GitHub</a>
                            ${live !== "#" ? `<a href="${live}" target="_blank" class="btn-box">Live Demo</a>` : ""}
                        </div>
                    </div>
                </div>
            `;

            previewBox.classList.remove("hidden");
            
            // Interaction: Smooth Scroll to Showroom
            setTimeout(() => {
                previewBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);

            // Close Logic
            const closeBtn = document.getElementById("close-btn");
            if (closeBtn) {
                closeBtn.onclick = (event) => {
                    event.stopPropagation();
                    previewBox.classList.add("hidden");
                    this.classList.remove("active-project");
                };
            }
        });
    });

    // --- 7. INDEPENDENT SKILLS ACCORDION ---
    const skillCategories = document.querySelectorAll(".skill-category");
    
    skillCategories.forEach(category => {
        category.addEventListener("click", function() {
            this.classList.toggle("active");
        });
    });
});
