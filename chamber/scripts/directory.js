const membersContainer = document.querySelector("#members");
const gridBtn = document.querySelector("#grid-view");
const listBtn = document.querySelector("#list-view");
const menuToggle = document.querySelector("#menu-toggle");
const primaryNav = document.querySelector("#primary-nav");

menuToggle.addEventListener("click", () => {
  const isOpen = primaryNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
});

gridBtn.addEventListener("click", () => setLayout("grid"));
listBtn.addEventListener("click", () => setLayout("list"));

function setLayout(layout) {
  if (!membersContainer) return;

  if (layout === "grid") {
    membersContainer.classList.add("members-grid");
    membersContainer.classList.remove("members-list");
    gridBtn.classList.add("active");
    listBtn.classList.remove("active");
  } else {
    membersContainer.classList.add("members-list");
    membersContainer.classList.remove("members-grid");
    listBtn.classList.add("active");
    gridBtn.classList.remove("active");
  }
}

async function loadMembers() {
  try {
    const response = await fetch("data/members.json");
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const data = await response.json();
    renderMembers(data.members);
  } catch (error) {
    console.error("Error loading members:", error);
    if (membersContainer) {
      membersContainer.innerHTML = `<p class="error">Unable to load member data at this time.</p>`;
    }
  }
}

function renderMembers(members) {
  if (!membersContainer) return;
  membersContainer.innerHTML = "";

  members.forEach((member) => {
    const card = document.createElement("article");
    card.classList.add("member-card");

    if (member.membershipLevel === 3) {
      card.classList.add("gold");
    } else if (member.membershipLevel === 2) {
      card.classList.add("silver");
    } else {
      card.classList.add("standard");
    }

    const logo = document.createElement("img");
    logo.src = `images/${member.image}`;
    logo.alt = `${member.name} logo`;

    const name = document.createElement("h3");
    name.textContent = member.name;
    name.classList.add("member-name");

    const level = document.createElement("p");
    level.textContent = formatLevel(member.membershipLevel);
    level.classList.add("member-level");

    const details = document.createElement("p");
    details.classList.add("member-details");
    details.innerHTML = `${member.address || ""}<br>${member.phone || ""}`;

    const website = document.createElement("p");
    website.classList.add("member-website");
    website.innerHTML = `
      <a href="${member.website}" target="_blank" rel="noopener">
        ${member.website}
      </a>
    `;

    const description = document.createElement("p");
    description.classList.add("member-description");
    description.textContent = member.description || "";

    const textWrapper = document.createElement("div");
    textWrapper.appendChild(name);
    textWrapper.appendChild(level);
    textWrapper.appendChild(details);
    textWrapper.appendChild(website);
    textWrapper.appendChild(description);

    card.appendChild(logo);
    card.appendChild(textWrapper);
    membersContainer.appendChild(card);
  });

  setLayout("grid");
}

function formatLevel(level) {
  switch (level) {
    case 3:
      return "Gold Member";
    case 2:
      return "Silver Member";
    default:
      return "Member";
  }
}

const yearSpan = document.querySelector("#currentyear");
const modSpan = document.querySelector("#last-modified");

if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

if (modSpan) {
  modSpan.textContent = document.lastModified;
}

loadMembers();
