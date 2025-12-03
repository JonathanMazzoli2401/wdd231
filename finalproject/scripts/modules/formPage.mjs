export function initFormPage() {
    const output = document.querySelector("#form-output");
    if (!output) return;

    const params = new URLSearchParams(window.location.search);

    if (!params.toString()) {
        output.textContent = "No form data received.";
        return;
    }

    const items = [];
    params.forEach((value, key) => {
        items.push(`<li><strong>${key}:</strong> ${value}</li>`);
    });

    output.innerHTML = `<ul>${items.join("")}</ul>`;
}

