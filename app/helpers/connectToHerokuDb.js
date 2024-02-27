// Ce script permet de se connecter à la base de données Heroku via les scripts npm.
// Ce qui n'est pas possible directement via les scripts npm car les variables d'environnement
// ne sont pas accessibles dans le contexte de NPM de la même manière que dans celui du terminal.

import dotenv from "dotenv";
// spawn est une fonction qui permet de lancer un processus externe plus d'interactivité que exec.
import { spawn } from "child_process";

dotenv.config({ path: "./.env" });

const databaseUrl = process.env.DATABASE_URL;

// On lance un processus psql avec comme argument l'URL de la base de données Heroku depuis .env.
// stdio: "inherit" redirige les Entres/Sorties standard du processus psql vers le terminal.
// Cela permet d'interagir avec le processus psql directement dans le terminal.
const psqlProcess = spawn("psql", [databaseUrl], { stdio: "inherit" });

psqlProcess.on("error", (error) => {
  console.error(`Erreur d'exécution : ${error.message}`);
});

psqlProcess.on("close", (code) => {
  console.log(`Processus psql terminé avec le code ${code}`);
});
