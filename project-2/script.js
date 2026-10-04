// Alfa Omega Bohir Bisho Security Group – site scripts

// 1) Navbar shadow/size change on scroll
const nav = document.getElementById('mainNav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// 2) Close mobile menu after clicking a link
document.querySelectorAll('#navMenu .nav-link, #navMenu .btn').forEach(link => {
  link.addEventListener('click', () => {
    const menu = document.getElementById('navMenu');
    if (menu.classList.contains('show')) {
      bootstrap.Collapse.getOrCreateInstance(menu).hide();
    }
  });
});

// 3) Highlight the current section in the menu
const sections = document.querySelectorAll('section[id], header[id]');
const links = document.querySelectorAll('#navMenu .nav-link');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + entry.target.id));
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' });
sections.forEach(s => observer.observe(s));

// 4) Contact form validation (front-end only)
const form = document.getElementById('contactForm');
const success = document.getElementById('formSuccess');
form.addEventListener('submit', e => {
  e.preventDefault();
  success.classList.add('d-none');
  if (!form.checkValidity()) {
    form.classList.add('was-validated');
    return;
  }
  // TODO: connect to a backend, Formspree, EmailJS or WhatsApp API to really send the data.
  form.reset();
  form.classList.remove('was-validated');
  success.classList.remove('d-none');
});

// 5) Footer year
document.getElementById('year').textContent = new Date().getFullYear();
