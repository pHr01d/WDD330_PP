import { loadHeaderFooter } from "./utils.mjs";
import { initDB, loadStats } from "./dbm.mjs";
//import { login } from "./auth.mjs";

loadHeaderFooter();

initDB();

loadStats();

// Use Admin login for dev, Guest login for prod
//login("Admin");
