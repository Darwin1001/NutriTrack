import { renderProgressBar } from "../components/progressBar.js";

export const renderDashboardPage = async () => {
  const section = document.createElement("section");
  section.innerHTML = `<h2 class="page-title">Tableau de bord</h2>`;
  const progressBar = await renderProgressBar();
  section.appendChild(progressBar);
  return section;
};