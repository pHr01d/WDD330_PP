import { loadHeaderFooter } from "./utils.mjs";
import { initDB, loadStats } from "./dbm.mjs";
//import { login } from "./auth.mjs";

async function initializeApp() {
  loadHeaderFooter();
  await initDB();
  await loadStats();

  // Use Admin login for dev, Guest login for prod
  //login("Admin");
}

initializeApp();
