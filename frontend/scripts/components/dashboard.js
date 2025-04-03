import { renderProgressBar } from "./progressBar.js";

export const renderDashboard = async () => {
  const section = document.createElement("section");
  section.innerHTML = `<h2>Tableau de bord</h2>`;
  section.appendChild(await renderProgressBar());
  return section;
};