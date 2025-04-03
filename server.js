const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = 5000;

app.use((req, res, next) => {
  if (req.path.endsWith(".js")) {
    res.setHeader("Content-Type", "application/javascript");
  }
  next();
});

// fichiers front
app.use(express.static(path.join(__dirname, "frontend")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
const fs = require("fs");

const DB_FILE = path.join(__dirname, "db.json");

//lire et écrire dans JSON
const readDB = () => JSON.parse(fs.readFileSync(DB_FILE, "utf-8"));
const writeDB = (data) => fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));

// Récupérer tous les repas
app.get("/meals", (req, res) => {
  const db = readDB();
  res.json(db.meals);
});

// Ajouterun repas
app.post("/meals", (req, res) => {
  const db = readDB();
  const newMeal = { id: Date.now(), ...req.body };
  db.meals.push(newMeal);
  writeDB(db);
  res.status(201).json(newMeal);
});
// Récupérer objet
app.get("/goals", (req, res) => {
    const db = readDB();
    res.json(db.goals);
  });
  
  // Définir objet 
  app.post("/goals", (req, res) => {
    const db = readDB();
    const newGoal = { id: Date.now(), ...req.body };
    db.goals = [newGoal]; 
    writeDB(db);
    res.status(201).json(newGoal);
  });
  const { reduce } = require("ramda");

//  calcule totaux journaliers
const calculateTotals = (meals) => ({
    calories: reduce((acc, meal) => acc + (meal.calories || 0), 0, meals),
    proteins: reduce((acc, meal) => acc + (meal.proteins || 0), 0, meals),
    carbs: reduce((acc, meal) => acc + (meal.carbs || 0), 0, meals),
    fats: reduce((acc, meal) => acc + (meal.fats || 0), 0, meals),
  });

// Route totaux journaliers
app.get("/totals", (req, res) => {
  const db = readDB();
  const totals = calculateTotals(db.meals);
  res.json(totals);
});
const calculateProgress = (totals, goals) => ({
    calories: `${totals.calories} / ${goals.calories} (${((totals.calories / goals.calories) * 100).toFixed(1)}%)`,
    proteins: `${totals.proteins} / ${goals.proteins} (${((totals.proteins / goals.proteins) * 100).toFixed(1)}%)`,
    carbs: `${totals.carbs} / ${goals.carbs} (${((totals.carbs / goals.carbs) * 100).toFixed(1)}%)`,
    fats: `${totals.fats} / ${goals.fats} (${((totals.fats / goals.fats) * 100).toFixed(1)}%)`,
  });
  
  // Route progression
  app.get("/progress", (req, res) => {
    const db = readDB();
    
    if (!db.goals || db.goals.length === 0) {
      return res.status(400).json({ error: "Aucun objectif défini" });
    }
  
    const totals = calculateTotals(db.meals);
    const progress = calculateProgress(totals, db.goals[0]); 
    res.json(progress);
  });



