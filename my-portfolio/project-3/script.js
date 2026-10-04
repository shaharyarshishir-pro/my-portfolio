document.addEventListener("DOMContentLoaded", () => {
  const nav = document.getElementById("mainNav");

  window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 40);
  });

  // Smooth active navigation
  const sections = document.querySelectorAll("section[id], header[id]");
  const links = document.querySelectorAll(".nav-link");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(link => link.classList.remove("active"));
        const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        if (active) active.classList.add("active");
      }
    });
  }, { rootMargin: "-35% 0px -55% 0px" });

  sections.forEach(section => observer.observe(section));

  // Material filter
  const filterButtons = document.querySelectorAll(".filter-btn");
  const materialItems = document.querySelectorAll(".material-item");

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      filterButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      const filter = button.dataset.filter;
      materialItems.forEach(item => {
        const show = filter === "all" || item.dataset.type === filter;
        item.style.display = show ? "" : "none";
      });
    });
  });

  // Demo quote form
  const form = document.getElementById("quoteForm");
  const toastEl = document.getElementById("demoToast");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    bootstrap.Toast.getOrCreateInstance(toastEl).show();
    form.reset();
  });

  // Current year
  document.getElementById("year").textContent = new Date().getFullYear();
});


