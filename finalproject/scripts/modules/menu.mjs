export function initMenu() {
    const menuToggle = document.querySelector("#menu-toggle");
    const primaryNav = document.querySelector("#primary-nav");

    if (!menuToggle || !primaryNav) return;

    menuToggle.addEventListener("click", () => {
        const isOpen = primaryNav.classList.toggle("open");
        menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
}
