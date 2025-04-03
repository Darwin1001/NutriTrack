import { renderDashboardPage } from "./pages/dashboardPage.js";
import { renderMealsPage } from "./pages/mealsPage.js";
import { renderGoalsPage } from "./pages/goalsPage.js";

export const router = async () => {
  const app = document.getElementById("app");
  app.innerHTML = "";

  const hash = window.location.hash;

  if (hash === "#meals") {
    const mealsPage = await renderMealsPage();
    app.appendChild(mealsPage);
  } else if (hash === "#goals") {
    const goalsPage = await renderGoalsPage();
    app.appendChild(goalsPage);
  } else {
    const dashboardPage = await renderDashboardPage();
    app.appendChild(dashboardPage);
  }
};