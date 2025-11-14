const yearSpan = document.querySelector("#current-year");
if (yearSpan) yearSpan.textContent = new Date().getFullYear();

const modSpan = document.querySelector("#last-modified");
if (modSpan) modSpan.textContent = document.lastModified;

const menuToggle = document.querySelector("#menu-toggle");
const primaryNav = document.querySelector("#primary-nav");

if (menuToggle && primaryNav) {
    menuToggle.addEventListener("click", () => {
        const isOpen = primaryNav.classList.toggle("open");
        menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
}