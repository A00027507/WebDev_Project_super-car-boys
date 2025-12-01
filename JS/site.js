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
