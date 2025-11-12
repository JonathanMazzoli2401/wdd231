export function setSectionSelection(selectElement, sections) {
  if (!selectElement) return;

  selectElement.innerHTML = "";

  const placeholder = document.createElement("option");
  placeholder.textContent = "--";
  placeholder.disabled = true;
  placeholder.selected = true;
  selectElement.appendChild(placeholder);

  sections.forEach((section) => {
    const option = document.createElement("option");
    option.value = section.sectionNum;
    option.textContent = section.sectionNum;
    selectElement.appendChild(option);
  });
}




