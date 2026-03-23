const API_URL = "https://thesimpsonsapi.com/api/locations";

const container = document.getElementById("locations-container");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const pageInfo = document.getElementById("page-info");

let currentPage = 1;

async function cargarLocations() {
    try {
        container.innerHTML = "<p>Cargando...</p>";

        const response = await fetch(`${API_URL}?page=${currentPage}`);
        const data = await response.json();

        container.innerHTML = "";

        data.results.forEach(loc => {

             const imageUrl = loc.image_path
                ? `https://cdn.thesimpsonsapi.com/500${loc.image_path}`
                : "https://via.placeholder.com/200";
            const card = document.createElement("div");
            card.classList.add("card");

            card.innerHTML = `
                <img src="${imageUrl}" alt="${loc.name}">
                <h3>${loc.name}</h3>
                <p><strong>Tipo:</strong> ${loc.use || "N/A"}</p>
                <p><strong>Ciudad:</strong> ${loc.town || "Springfield"}</p>
            `;

            container.appendChild(card);
        });

        // PAGINACIÓN
        pageInfo.textContent = `Página ${currentPage}`;
        prevBtn.disabled = currentPage === 1;
        nextBtn.disabled = !data.next;

    } catch (error) {
        console.error(error);
    }
}

/* EVENTOS */

nextBtn.addEventListener("click", () => {
    currentPage++;
    cargarLocations();
});

prevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        cargarLocations();
    }
});

/* INICIO */

cargarLocations();