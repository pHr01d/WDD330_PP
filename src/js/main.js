import { loadHeaderFooter, loadStats } from "./utils.mjs";
import { initDB } from "./dbm.mjs";
import { login } from "./auth.mjs";

initDB();

loadHeaderFooter();

// Use Admin login for dev, Guest login for prod
login("Admin");

loadStats();