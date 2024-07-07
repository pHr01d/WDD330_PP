import { loadHeaderFooter, loadStats } from "./utils.mjs";
import { initDB } from "./dbm.mjs";
import { login } from "./auth.mjs";


loadHeaderFooter();

initDB();

// Use Admin login for dev, Guest login for prod
login("Admin");

loadStats();