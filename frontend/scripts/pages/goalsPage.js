import { renderGoalForm } from "../components/goalForm.js";
import { fetchGoals } from "../api.js";

export const renderGoalsPage = async () => {
  const section = document.createElement("section");
  section.innerHTML = `<h2 class="page-title">Objectifs</h2>`;

  const parentContainer = document.createElement("div");
  parentContainer.classList.add("parent-container");

  const goalContainer = document.createElement("div");
  goalContainer.classList.add("goal-container");

  //  formulaire
  section.appendChild(renderGoalForm(goalContainer));

  try {
    const goals = await fetchGoals();

    if (goals.length > 0) {
      const goal = goals[0]; 

      Object.keys(goal).forEach((key) => {
        if (key !== "id") { 
          const goalCard = document.createElement("div");
          goalCard.classList.add("goal-card");

          goalCard.innerHTML = `
            <h3>${key.charAt(0).toUpperCase() + key.slice(1)}</h3>
            <p>${goal[key]} g</p>
          `;

          goalContainer.appendChild(goalCard);
        }
      });
    } else {
      goalContainer.innerHTML = "<p>Aucun objectif </p>";
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des objectifs :", error);
    goalContainer.innerHTML = "<p>Erreur lors de la récupération des objectifs.</p>";
  }

  parentContainer.appendChild(goalContainer);
  section.appendChild(parentContainer);
  return section;
};