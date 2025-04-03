import { fetchMeals } from "../api.js";

export const renderMealList = async () => {
  const mealContainer = document.createElement("div");
  mealContainer.classList.add("meal-container");

  try {
    const meals = await fetchMeals();

    if (meals.length === 0) {
      mealContainer.innerHTML = "<p>Aucun repas enregistré.</p>";
    } else {
      meals.forEach((meal) => {
        const mealCard = document.createElement("div");
        mealCard.classList.add("meal-card");

        mealCard.innerHTML = `
          <h3>${meal.name}</h3>
          <p><strong>Calories :</strong> ${meal.calories} kcal</p>
          <p><strong>Protéines :</strong> ${meal.proteins} g</p>
          <p><strong>Glucides :</strong> ${meal.carbs} g</p>
          <p><strong>Lipides :</strong> ${meal.fats} g</p>
        `;

        mealContainer.appendChild(mealCard);
      });
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des repas :", error);
    mealContainer.innerHTML = "<p>Erreur lors de la récupération des repas.</p>";
  }

  return mealContainer;
};