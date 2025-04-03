import { addMeal } from "../api.js";
import { renderMealList } from "./mealList.js";

export const renderMealForm = (mealListContainer) => {
  const form = document.createElement("form");
  form.classList.add("meal-form");
  form.innerHTML = `
    <h2>Ajouter un repas</h2>
    <input type="text" id="meal-name" placeholder="Nom du repas" required />
    <input type="number" id="meal-calories" placeholder="Calories" required />
    <input type="number" id="meal-proteins" placeholder="Protéines (g)" required />
    <input type="number" id="meal-carbs" placeholder="Glucides (g)" required />
    <input type="number" id="meal-fats" placeholder="Lipides (g)" required />
    <button type="submit">Ajouter</button>
  `;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const meal = {
      name: document.getElementById("meal-name").value,
      calories: parseInt(document.getElementById("meal-calories").value),
      proteins: parseInt(document.getElementById("meal-proteines").value),
      carbs: parseInt(document.getElementById("meal-carbs").value),
      fats: parseInt(document.getElementById("meal-fats").value),
    };

    try {
      await addMeal(meal);

      //liste des repas
      const updatedMealList = await renderMealList();
      mealListContainer.innerHTML = ""; 
      mealListContainer.appendChild(updatedMealList);

      form.reset(); 
    } catch (error) {
      console.error("Erreur lors de l'ajout du repas :", error);
    }
  });

  return form;
};