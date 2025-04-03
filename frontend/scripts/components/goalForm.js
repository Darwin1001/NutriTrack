import { addGoal } from "../api.js";
import { fetchGoals } from "../api.js";

export const renderGoalForm = (goalContainer) => {
  const form = document.createElement("form");
  form.classList.add("goal-form");
  form.innerHTML = `
    <h2> objectif</h2>
    <input type="number" id="goal-calories" placeholder="Calories" required />
    <input type="number" id="goal-proteins" placeholder="Protéines (g)" required />
    <input type="number" id="goal-carbs" placeholder="Glucides (g)" required />
    <input type="number" id="goal-fats" placeholder="Lipides (g)" required />
    <button type="submit">Mettre à jour</button>
  `;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const goal = {
      calories: parseInt(document.getElementById("goal-calories").value),
      proteins: parseInt(document.getElementById("goal-proteins").value),
      carbs: parseInt(document.getElementById("goal-carbs").value),
      fats: parseInt(document.getElementById("goal-fats").value),
    };

    try {
      await addGoal(goal);

      // Recharge dynamiquement la liste des objectifs
      const goals = await fetchGoals();
      goalContainer.innerHTML = ""; // Vide l'ancien contenu
      Object.keys(goals[0]).forEach((key) => {
        if (key !== "id") {
          const goalCard = document.createElement("div");
          goalCard.classList.add("goal-card");

          goalCard.innerHTML = `
            <h3>${key.charAt(0).toUpperCase() + key.slice(1)}</h3>
            <p>${goals[0][key]} g</p>
          `;

          goalContainer.appendChild(goalCard);
        }
      });

      form.reset(); // Réinitialise le formulaire
    } catch (error) {
      console.error("Erreur lors de la mise à jour des objectifs :", error);
    }
  });

  return form;
};