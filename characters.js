const API_URL = "https://thesimpsonsapi.com/api/characters";

const container = document.getElementById("personajes-container");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const pageInfo = document.getElementById("page-info");

const modal = document.getElementById("modal");
const modalBody = document.getElementById("modal-body");
const closeModal = document.getElementById("closeModal");

let currentPage = 1;

async function cargarPersonajes() {
    try {
        container.innerHTML = "<p>Cargando...</p>";

        const response = await fetch(`${API_URL}?page=${currentPage}`);
        const data = await response.json();

        container.innerHTML = "";

        data.results.forEach(personaje => {
            console.log(personaje);
            const imageUrl = personaje.portrait_path
                ? `https://cdn.thesimpsonsapi.com/500${personaje.portrait_path}`
                : "https://via.placeholder.com/200";

            const card = document.createElement("div");
            card.classList.add("card");

            card.innerHTML = `
                <img src="${imageUrl}" alt="${personaje.name}">
                <h3>${personaje.name}</h3>
                <p>${personaje.occupation || "Sin datos"}</p>
            `;
             card.addEventListener("click", () => {
                 mostrarDetalles(personaje);
            });
            container.appendChild(card);
        });

        // INFO DE PÁGINA
        pageInfo.textContent = `Página ${currentPage}`;

        // BOTONES
        prevBtn.disabled = currentPage === 1;
        nextBtn.disabled = data.results.length < 20;

    } catch (error) {
        container.innerHTML = "<p>Error al cargar 😢</p>";
        console.error(error);
    }
}

function mostrarDetalles(personaje) {

    const imageUrl = personaje.portrait_path
        ? `https://cdn.thesimpsonsapi.com/500${personaje.portrait_path}`
        : "https://via.placeholder.com/200";

    modalBody.innerHTML = `
        <img src="${imageUrl}" alt="${personaje.name}" style="width: 200px;">
        <h2>${personaje.name}</h2>
        <p><strong>Ocupación:</strong> ${personaje.occupation || "N/A"}</p>
        <p><strong>Estado:</strong> ${personaje.status || "N/A"}</p>        
        <p><strong>Fecha de nacimiento:</strong> ${personaje.birthdate || "N/A"}</p>        
        <p><strong>Frases célebres:</strong> ${personaje.phrases || "N/A"}</p>
    `;

    modal.style.display = "block";
}

closeModal.addEventListener("click", () => {
    modal.style.display = "none";
});

// cerrar al hacer click afuera
window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});
/* =========================
   EVENTOS DE PAGINACIÓN
========================= */

nextBtn.addEventListener("click", () => {
    currentPage++;
    cargarPersonajes();
});

prevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        cargarPersonajes();
    }
});

/* =========================
   INICIO
========================= */

cargarPersonajes();