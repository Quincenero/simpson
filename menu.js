const hamburger = document.getElementById("hamburger");
        const navLinks = document.getElementById("nav-links");

        hamburger.addEventListener("click", () => {
            navLinks.classList.toggle("active");

            // cambiar icono
            if (navLinks.classList.contains("active")) {
                hamburger.textContent = "✖";
            } else {
                hamburger.textContent = "☰";
            }
        });