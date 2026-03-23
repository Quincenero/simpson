const API_URL = "https://thesimpsonsapi.com/api/characters";
const container = document.getElementById("personajes-container");

async function obtenerPersonajes() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        container.innerHTML = "";

        data.results.forEach(personaje => {

            const imageUrl = `https://cdn.thesimpsonsapi.com/500${personaje.portrait_path}`;

            const card = document.createElement("div");
            card.classList.add("card");

            card.innerHTML = `
                <img src="${imageUrl}" alt="${personaje.name}">
                <h3>${personaje.name}</h3>
                <p>${personaje.occupation || "Sin datos"}</p>
            `;

           
            container.appendChild(card);
        });

    } catch (error) {
        container.innerHTML = "<p>Error al cargar personajes 😢</p>";
        console.error(error);
    }
}

obtenerPersonajes();