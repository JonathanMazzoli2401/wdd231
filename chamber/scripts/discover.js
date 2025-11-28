import { places } from "../data/places.mjs";

const container = document.querySelector("#discover-grid");

function renderPlaces() {
    places.forEach(place => {
        const card = document.createElement("article");
        card.classList.add("discover-card");
        card.style.gridArea = "card";

        card.innerHTML = `
            <h2>${place.name}</h2>

            <figure>
                <img src="images/${place.image}" alt="${place.name}" loading="lazy">
            </figure>

            <address>${place.address}</address>

            <p>${place.description}</p>

            <a href="${place.link}" target="_blank" class="discover-btn">
                Learn More
            </a>
        `;

        container.appendChild(card);
    });
}

renderPlaces();


const messageBox = document.querySelector("#visit-message");

function showVisitMessage() {
    const lastVisit = localStorage.getItem("lastVisit");
    const now = Date.now();

    if (!lastVisit) {
        // Primera visita
        messageBox.textContent = "Welcome! Let us know if you have any questions.";
        localStorage.setItem("lastVisit", now);
        return;
    }

    const diff = now - lastVisit;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24)); // conv. milisegundos → días

    if (days < 1) {
        messageBox.textContent = "Back so soon! Awesome!";
    } else if (days === 1) {
        messageBox.textContent = "You last visited 1 day ago.";
    } else {
        messageBox.textContent = `You last visited ${days} days ago.`;
    }

    localStorage.setItem("lastVisit", now);
}

showVisitMessage();