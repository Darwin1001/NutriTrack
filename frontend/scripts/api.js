// Récupérer la liste des repas
export const fetchMeals = async () => {
  console.log("fetchMeals appelé");
  const response = await fetch("/meals");
  if (!response.ok) {
    console.error("Erreur lors de la récupération des repas :", response.statusText);
    throw new Error("Erreur lors de la récupération des repas");
  }
  return response.json();
};

// Ajouter un repas
export const addMeal = async (meal) => {
  console.log("addMeal appelé avec :", meal);
  const response = await fetch("/meals", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(meal),
  });
  if (!response.ok) {
    console.error("Erreur lors de l'ajout du repas :", response.statusText);
    throw new Error("Erreur lors de l'ajout du repas");
  }
  return response.json();
};

// Récupérer la progression par rapport aux objectifs
export const fetchProgress = async () => {
  console.log("fetchProgress appelé");
  const response = await fetch("/progress");
  if (!response.ok) {
    console.error("Erreur lors de la récupération de la progression :", response.statusText);
    throw new Error("Erreur lors de la récupération de la progression");
  }
  return response.json();
};

// Récupérer les objectifs nutritionnels
export const fetchGoals = async () => {
  console.log("fetchGoals appelé");
  const response = await fetch("/goals");
  if (!response.ok) {
    console.error("Erreur lors de la récupération des objectifs :", response.statusText);
    throw new Error("Erreur lors de la récupération des objectifs");
  }
  const data = await response.json();
  console.log("Données des objectifs :", data);
  return data;
};

// Ajouter un objectif nutritionnel
export const addGoal = async (goal) => {
  console.log("addGoal appelé avec :", goal);
  const response = await fetch("/goals", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(goal),
  });
  if (!response.ok) {
    console.error("Erreur lors de la mise à jour des objectifs :", response.statusText);
    throw new Error("Erreur lors de la mise à jour des objectifs");
  }
  return response.json();
};