// ==========================================
// Muzahidul Islam - portfolio script
// ==========================================


// ---- footer year ----
document.getElementById("year").textContent = new Date().getFullYear();


// ---- navbar gets a darker background after scrolling a bit ----
const navbar = document.querySelector(".navbar");

function updateNavbar() {
    navbar.classList.toggle("scrolled", window.scrollY > 50);
}

updateNavbar();
window.addEventListener("scroll", updateNavbar, { passive: true });


// ---- highlight the nav link of the section you're reading ----
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

const sectionObserver = new IntersectionObserver(entries => {

    entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        navLinks.forEach(link => {
            link.classList.toggle(
                "active",
                link.getAttribute("href") === "#" + entry.target.id
            );
        });
    });

}, { rootMargin: "-40% 0px -55% 0px" });

sections.forEach(section => sectionObserver.observe(section));


// ---- close the mobile menu after tapping a link ----
const navbarCollapse = document.querySelector(".navbar-collapse");

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        if (navbarCollapse.classList.contains("show")) {
            bootstrap.Collapse.getOrCreateInstance(navbarCollapse).hide();
        }
    });
});


// ---- live clock inside the Digital Clock project card ----
const previewClock = document.getElementById("previewClock");

if (previewClock) {
    const tick = () => {
        previewClock.textContent = new Date().toLocaleTimeString("en-GB", {
            timeZone: "Asia/Dhaka"
        });
    };

    tick();
    setInterval(tick, 1000);
}
