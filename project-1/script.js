// Liberation War Archive - page scripts
// Every page loads this file, so each block first checks that its elements exist.


// ---- footer clock ----
const clock = document.querySelector(".clock");

if (clock) {
    const showTime = () => {
        clock.textContent = "Time: " + new Date().toLocaleTimeString();
    };
    showTime();
    setInterval(showTime, 1000);
}


// ---- documents page: filters + details popup ----
const docList = document.getElementById("documentList");

if (docList) {
    const typeSelect = document.getElementById("filterType");
    const dateSelect = document.getElementById("filterDate");
    const relSelect = document.getElementById("filterRelevance");
    const emptyMsg = document.getElementById("docEmpty");
    const items = docList.querySelectorAll(".doc-item");

    function applyDocFilters() {
        let visible = 0;

        items.forEach(item => {
            const okType = typeSelect.value === "all" || item.dataset.type === typeSelect.value;
            const okDate = dateSelect.value === "all" || item.dataset.year === dateSelect.value;
            const okRel = relSelect.value === "all" || item.dataset.relevance === relSelect.value;

            const show = okType && okDate && okRel;
            item.classList.toggle("d-none", !show);
            if (show) visible++;
        });

        emptyMsg.classList.toggle("d-none", visible > 0);
    }

    [typeSelect, dateSelect, relSelect].forEach(sel =>
        sel.addEventListener("change", applyDocFilters)
    );

    // bootstrap's bundle loads after this file, so wait until the page is ready
    document.addEventListener("DOMContentLoaded", () => {
        const modalEl = document.getElementById("docModal");
        const modal = new bootstrap.Modal(modalEl);

        docList.addEventListener("click", e => {
            const btn = e.target.closest("[data-doc-title]");
            if (!btn) return;

            document.getElementById("docModalTitle").textContent = btn.dataset.docTitle;
            document.getElementById("docModalMeta").innerHTML = btn.dataset.docMeta;
            document.getElementById("docModalText").textContent = btn.dataset.docText;
            modal.show();
        });
    });
}


// ---- photographs page: category buttons ----
const photoGrid = document.getElementById("photoGrid");

if (photoGrid) {
    const buttons = document.querySelectorAll(".category-btn");
    const photos = photoGrid.querySelectorAll(".photo-item");

    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            const filter = btn.dataset.filter;

            buttons.forEach(b => b.classList.toggle("active", b === btn));

            photos.forEach(p => {
                p.classList.toggle("d-none", filter !== "all" && p.dataset.category !== filter);
            });
        });
    });
}


// ---- contact page: front-end validation ----
const contactForm = document.getElementById("contactForm");

if (contactForm) {
    const success = document.getElementById("contactSuccess");

    contactForm.addEventListener("submit", e => {
        e.preventDefault();
        success.classList.add("d-none");

        if (!contactForm.checkValidity()) {
            contactForm.classList.add("was-validated");
            return;
        }

        // demo only - hook this up to a backend or EmailJS/Formspree to really send it
        contactForm.reset();
        contactForm.classList.remove("was-validated");
        success.classList.remove("d-none");
    });
}
