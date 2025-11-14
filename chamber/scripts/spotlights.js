function formatLevel(level) {
  if (level >= 3) return "Gold Member";
  if (level >= 2) return "Silver Member";
  return "Member";
}

async function loadSpotlights() {
  try {
    const res = await fetch("data/members.json");
    if (!res.ok) throw new Error(`Cannot load members.json (${res.status})`);
    const { members } = await res.json();

    const eligible = members.filter(m => m.membershipLevel >= 2);
    const count = Math.floor(Math.random() * 2) + 2; // 2 ó 3
    const shuffled = [...eligible].sort(() => Math.random() - 0.5).slice(0, count);

    const grid = document.getElementById("spot-grid");
    if (!grid) return;
    grid.innerHTML = "";

    shuffled.forEach(m => {
      const card = document.createElement("article");
      card.className = "spot-card";
      card.setAttribute("role", "listitem");

      card.innerHTML = `
        <img src="images/${m.image}" alt="${m.name} logo" width="72" height="72" loading="lazy" />
        <div class="spot-content">
          <h3 class="spot-name">${m.name}</h3>
          <p class="spot-level">${formatLevel(m.membershipLevel)}</p>
          <p class="spot-contact">${m.address ?? ""}<br><a href="tel:${(m.phone ?? "").replace(/[^0-9+]/g,'')}">${m.phone ?? ""}</a></p>
          <p class="spot-web"><a href="${m.website}" target="_blank" rel="noopener">Website</a></p>
          <p class="spot-desc">${m.description ?? ""}</p>
        </div>
      `;
      grid.appendChild(card);
    });
  } catch (err) {
    console.error(err);
    const grid = document.getElementById("spot-grid");
    if (grid) grid.textContent = "Unable to load spotlights.";
  }
}
loadSpotlights();