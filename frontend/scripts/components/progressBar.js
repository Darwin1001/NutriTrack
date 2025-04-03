import { fetchProgress } from "../api.js";

export const renderProgressBar = async () => {
  const container = document.createElement("div");
  container.classList.add("progress-container");

  try {
    const progress = await fetchProgress();

    Object.keys(progress).forEach((key) => {
      const progressCard = document.createElement("div");
      progressCard.classList.add("progress-card");

      const percentage = parseFloat(progress[key].split("(")[1].replace("%)", "")); // Extrait le pourcentage

      progressCard.innerHTML = `
        <h3>${key.charAt(0).toUpperCase() + key.slice(1)}</h3>
        <p>${progress[key]}</p>
        <div class="progress-bar">
          <div class="progress" style="width: ${percentage}%;"></div>
        </div>
      `;

      container.appendChild(progressCard);
    });
  } catch (error) {
    console.error("Erreur lors de la récupération de la progression :", error);
    container.innerHTML = "<p>Erreur lors de la récupération de la progression.</p>";
  }

  return container;
};