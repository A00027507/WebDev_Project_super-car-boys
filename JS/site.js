(function () {
    const header = document.querySelector(".site-header");
    if (!header) {
        return;
    }

    const toggle = header.querySelector(".nav-toggle");
    const nav = header.querySelector(".site-nav");

    if (!toggle || !nav) {
        return;
    }

    const closeMenu = () => {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
    };

    toggle.addEventListener("click", () => {
        const isOpen = nav.classList.toggle("open");
        toggle.setAttribute("aria-expanded", String(isOpen));
    });

    nav.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", closeMenu);
    });

    window.addEventListener("resize", () => {
        if (window.matchMedia("(min-width: 721px)").matches) {
            closeMenu();
        }
    });
})();

(function () {
    const form = document.querySelector("#contact-form");
    if (!form) {
        return;
    }

    const status = form.querySelector(".form-status");

    const setStatus = (message, type) => {
        if (!status) return;
        status.textContent = message;
        status.className = "form-status" + (type ? ` ${type}` : "");
    };

    form.addEventListener("input", () => setStatus("", ""));

    form.addEventListener("submit", (event) => {
        if (!form.checkValidity()) {
            event.preventDefault();
            form.reportValidity();
            setStatus("Please complete the required fields.", "is-error");
            return;
        }

        event.preventDefault();
        form.reset();
        setStatus("Thanks for reaching out! We'll get back to you soon.", "is-success");
    });
})();
