// output.mjs
// Muestra el título del curso y las secciones en la tabla.

// Actualiza los encabezados con el nombre y código del curso
export function setTitle(course) {
  const nameEl = document.querySelector("#courseName");
  const codeEl = document.querySelector("#courseCode");

  if (nameEl && course) {
    nameEl.textContent = course.name;
  }

  if (codeEl && course) {
    codeEl.textContent = course.code;
  }
}

// Renderiza las filas de la tabla con la info de cada sección
export function renderSections(sections) {
  const tbody = document.querySelector("#sections"); // <tbody id="sections">
  if (!tbody) return;

  // Borra el contenido actual (incluidas las filas hardcodeadas del HTML)
  tbody.innerHTML = "";

  sections.forEach((section) => {
    const row = document.createElement("tr");

    const sectionCell = document.createElement("td");
    sectionCell.textContent = section.sectionNum;

    const enrolledCell = document.createElement("td");
    enrolledCell.textContent = section.enrolled;

    const instructorCell = document.createElement("td");
    instructorCell.textContent = section.instructor;

    row.appendChild(sectionCell);
    row.appendChild(enrolledCell);
    row.appendChild(instructorCell);

    tbody.appendChild(row);
  });
}



