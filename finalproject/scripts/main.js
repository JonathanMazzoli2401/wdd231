import { initMenu } from "./modules/menu.mjs";
import { initVisits } from "./modules/visits.mjs";
import { initClubsPage } from "./modules/clubsPage.mjs";
import { initFormPage } from "./modules/formPage.mjs";

initMenu();
initVisits();

const page = document.body.dataset.page;

if (page === "clubs") {
    initClubsPage();
}

if (page === "form-action") {
    initFormPage();
}
