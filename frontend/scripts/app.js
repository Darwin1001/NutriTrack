import { router } from "./router.js";
import { renderDashboardPage } from "./pages/dashboardPage.js";
import { renderMealsPage } from "./pages/mealsPage.js";
import { renderGoalsPage } from "./pages/goalsPage.js";

document.addEventListener("DOMContentLoaded", () => {
  router(); 
  window.addEventListener("hashchange", router); 
});