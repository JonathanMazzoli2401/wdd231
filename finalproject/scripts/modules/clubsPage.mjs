let clubsData = [];

export async function initClubsPage() {
    const container = document.querySelector(".club-grid");
    const filterSelect = document.querySelector("#city-filter");
    const dialog = document.querySelector("#club-dialog");
    const dialogTitle = document.querySelector("#dialog-title");
    const dialogBody = document.querySelector("#dialog-body");
    const dialogMeta = document.querySelector("#dialog-meta");
    const closeBtn = document.querySelector(".modal-close");

    if (!container) return;

    try {
        const response = await fetch("data/clubs.json");
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();
        clubsData = data.clubs;

        renderClubs(clubsData, container);

        if (filterSelect) {
            filterSelect.addEventListener("change", () => {
                const value = filterSelect.value;

                const filtered =
                    value === "all"
                        ? clubsData
                        : clubsData.filter((club) =>
                              value === "interior"
                                  ? club.city !== "Montevideo"
                                  : club.city === "Montevideo"
                          );

                renderClubs(filtered, container);
            });
        }

        container.addEventListener("click", (event) => {
            const detailsBtn = event.target.closest(".btn-details");
            const favBtn = event.target.closest(".btn-favorite");

            if (detailsBtn) {
                const id = Number(detailsBtn.dataset.id);
                const club = clubsData.find((c) => c.id === id);
                if (!club || !dialog) return;

                dialogTitle.textContent = club.name;
                dialogBody.textContent = club.description;
                dialogMeta.textContent =
                    `City: ${club.city} • Founded: ${club.founded} • Stadium: ${club.stadium} • League titles: ${club.titles}`;

                dialog.showModal();
            }

            if (favBtn) {
                const id = Number(favBtn.dataset.id);
                toggleFavorite(id, favBtn);
            }
        });

        if (closeBtn && dialog) {
            closeBtn.addEventListener("click", () => dialog.close());
        }

    } catch (error) {
        console.error(error);
        container.innerHTML =
            "<p>There was an error loading club information. Please try again later.</p>";
    }
}

function renderClubs(list, container) {
    const favorites = getFavorites();

    const html = list
        .map(
            (club) => `
            <article class="club-card">
                <img src="${club.image}" 
                     alt="${club.name} club image"
                     loading="lazy"
                     width="400" 
                     height="260">

                <h3>${club.name}</h3>

                <p class="club-meta">
                    City: ${club.city}<br>
                    Founded: ${club.founded}<br>
                    Stadium: ${club.stadium}<br>
                    League titles: ${club.titles}
                </p>

                <div class="card-actions">
                    <button class="btn-details" data-id="${club.id}">Details</button>
                    <button class="btn-favorite" data-id="${club.id}">
                        ${favorites.includes(club.id) ? "★ Favorite" : "☆ Favorite"}
                    </button>
                </div>
            </article>
        `
        )
        .join("");

    container.innerHTML = html;
}

function getFavorites() {
    const stored = localStorage.getItem("ufp_favorites");
    return stored ? JSON.parse(stored) : [];
}

function toggleFavorite(id, button) {
    let favorites = getFavorites();

    if (favorites.includes(id)) {
        favorites = favorites.filter((f) => f !== id);
    } else {
        favorites.push(id);
    }

    localStorage.setItem("ufp_favorites", JSON.stringify(favorites));
    button.textContent = favorites.includes(id) ? "★ Favorite" : "☆ Favorite";
}

