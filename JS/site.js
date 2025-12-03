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
    const fields = {
        name: form.querySelector("#name"),
        email: form.querySelector("#email"),
        message: form.querySelector("#message"),
    };
    const errors = {
        name: document.querySelector("#name-error"),
        email: document.querySelector("#email-error"),
        message: document.querySelector("#message-error"),
    };

    const validators = {
        name: (value) => {
            const trimmed = value.trim();
            if (!trimmed) return "Please enter your name.";
            if (trimmed.length < 2) return "Name must be at least 2 characters.";
            if (!/^[A-Za-z][A-Za-z\s'-]{1,49}$/.test(trimmed)) {
                return "Name can use letters, spaces, apostrophes, or hyphens.";
            }
            return "";
        },
        email: (value) => {
            const trimmed = value.trim();
            if (!trimmed) return "Please enter your email.";
            if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(trimmed)) {
                return "Enter a valid email address.";
            }
            return "";
        },
        message: (value) => {
            const trimmed = value.trim();
            if (!trimmed) return "Please tell us how we can help.";
            if (trimmed.length < 10) return "Message should be at least 10 characters.";
            return "";
        },
    };

    const clearStatus = () => {
        if (!status) return;
        status.textContent = "";
        status.classList.remove("is-error", "is-success");
    };

    const showError = (key, message) => {
        const errorEl = errors[key];
        const fieldWrapper = fields[key]?.closest(".form-field");
        if (errorEl) {
            errorEl.textContent = message;
        }
        if (fieldWrapper) {
            fieldWrapper.classList.toggle("has-error", Boolean(message));
        }
        return !message;
    };

    const validateField = (key) => showError(key, validators[key](fields[key]?.value ?? ""));

    ["name", "email", "message"].forEach((key) => {
        const input = fields[key];
        if (!input) return;

        input.addEventListener("input", () => {
            validateField(key);
            clearStatus();
        });

        input.addEventListener("blur", () => validateField(key));
    });

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        clearStatus();

        let isValid = true;
        ["name", "email", "message"].forEach((key) => {
            const fieldValid = validateField(key);
            if (!fieldValid) {
                isValid = false;
            }
        });

        if (!isValid) {
            if (status) {
                status.textContent = "Please fix the highlighted fields and try again.";
                status.classList.add("is-error");
            }
            return;
        }

        const submission = {
            name: fields.name?.value.trim() ?? "",
            email: fields.email?.value.trim() ?? "",
            message: fields.message?.value.trim() ?? "",
            submittedAt: new Date().toISOString(),
        };

        try {
            const stored = localStorage.getItem("contactSubmissions");
            const submissions = stored ? JSON.parse(stored) : [];
            submissions.push(submission);
            localStorage.setItem("contactSubmissions", JSON.stringify(submissions));
        } catch (err) {
            if (status) {
                status.textContent = "We couldn't save your message locally. Please try again.";
                status.classList.add("is-error");
            }
            return;
        }

        form.reset();
        Object.values(errors).forEach((errorEl) => {
            if (errorEl) {
                errorEl.textContent = "";
            }
        });
        Object.values(fields).forEach((field) => {
            const wrapper = field?.closest?.(".form-field");
            if (wrapper) {
                wrapper.classList.remove("has-error");
            }
        });

        if (status) {
            status.textContent = "Thanks for reaching out! Your message has been saved locally.";
            status.classList.add("is-success");
        }
    });
})();
