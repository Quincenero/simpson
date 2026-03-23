const API_URL = "https://thesimpsonsapi.com/api/episodes";

const container = document.getElementById("episodes-container");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const pageInfo = document.getElementById("page-info");

let currentPage = 1;

async function cargarEpisodios() {
    try {
        container.innerHTML = "<p>Cargando...</p>";

        const response = await fetch(`${API_URL}?page=${currentPage}`);
        const data = await response.json();

        container.innerHTML = "";

        data.results.forEach(ep => {

            const imageUrl = ep.image_path
                ? `https://cdn.thesimpsonsapi.com/500${ep.image_path}`
                : "https://via.placeholder.com/200";

            const card = document.createElement("div");
            card.classList.add("card");

            card.innerHTML = `
                <img src="${imageUrl}" alt="${ep.name}">
                <h3>${ep.name}</h3>
                <p><strong>Temporada:</strong> ${ep.season}</p>
                <p><strong>Episodio:</strong> ${ep.episode_number}</p>
                <p><strong>Fecha:</strong> ${ep.airdate}</p>
                <p>${ep.synopsis.substring(0, 600)}...</p>
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
    cargarEpisodios();
});

prevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        cargarEpisodios();
    }
});

/* INICIO */

cargarEpisodios();