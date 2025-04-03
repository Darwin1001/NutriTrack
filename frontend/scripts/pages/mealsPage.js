import { renderMealForm } from "../components/mealForm.js";
import { renderMealList } from "../components/mealList.js";

export const renderMealsPage = async () => {
  const section = document.createElement("section");
  section.innerHTML = `<h2 class="page-title">Repas</h2>`;

  const mealListContainer = document.createElement("div");
  mealListContainer.id = "meal-list-container";

  //  formulaire
  section.appendChild(renderMealForm(mealListContainer));

  // liste des repas
  const mealList = await renderMealList();
  mealListContainer.appendChild(mealList);
  section.appendChild(mealListContainer);

  return section;
};