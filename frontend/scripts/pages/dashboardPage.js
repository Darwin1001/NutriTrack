import { renderProgressBar } from "../components/progressBar.js";

export const renderDashboardPage = async () => {
  console.log("Dashboard page rendering...");
  const section = document.createElement("section");
  section.innerHTML = `<h2 class="page-title">Tableau de bord</h2>`;
  const progressBar = await renderProgressBar();
  console.log("Progress bar rendered:", progressBar);
  section.appendChild(progressBar);
  return section;
};