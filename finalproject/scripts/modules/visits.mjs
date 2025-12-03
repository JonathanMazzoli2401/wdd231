export function initVisits() {
    const visitsElement = document.querySelector("#visits-count");
    if (!visitsElement) return;

    let visits = Number(localStorage.getItem("ufp_visits")) || 0;
    visits += 1;

    visitsElement.textContent = visits;
    localStorage.setItem("ufp_visits", visits);
}
