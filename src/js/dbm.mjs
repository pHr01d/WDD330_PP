/* These functions initialize a database for use and perform operations
   on the database.

   If the database does not exist, it initializes with the tables
   as shown below.
*/

import { qs, renderWithTemplate } from "./utils.mjs";
var fml;

export function initDB() {
  return new Promise((resolve, reject) => {
    const dbRequest = indexedDB.open("fml");

    dbRequest.onupgradeneeded = () => {
      console.log("FML create/upgrade required");
      fml = dbRequest.result;

      // Create "movie" table
      const movieStore = fml.createObjectStore("movies", { keyPath: "title" });
      movieStore.createIndex("by_title", "title", { unique: true });
      movieStore.createIndex("by_genre", "genre");
      movieStore.createIndex("by_rating", "rating");

      // Initial record(s)
      movieStore.put({
        title: "Fake Movie Title",
        genre: "Family",
        rating: "G",
        runtime: 95,
        location: "A",
        disc: "00",
        type: ["DVD", "BD", "DIG"],
        likable: 3,
        comment: "This title was created because this is the first time using FML. You can delete this one."
      });
      movieStore.put({
        title: "Another Fake Movie Title",
        genre: "Action",
        rating: "PG-13",
        runtime: 120,
        location: "A",
        disc: "01",
        type: ["DVD", "DIG"],
        likable: 3,
        comment: "This is another title created because this is the first time using FML. You can delete this one, too."
      });
      console.log("Movie table created");

      const userStore = fml.createObjectStore("users", { keyPath: "userID" });
      userStore.createIndex("by_UID", "userID", { unique: true });

      // Initial user record(s)
      userStore.put({
        userID: "Admin",
        userPW: "password",
        userMod: true,
        userDel: false,
        userRating: "X"
      });
      userStore.put({
        userID: "Guest",
        userPW: "password",
        userMod: false,
        userDel: false,
        userRating: "G"
      });
      console.log("User table created");
      console.log(ndxTitle, ndxGenre, ndxRating, ndxUserID); // here to keep eslint from having a hissy-fit
    };

    dbRequest.onsuccess = () => {
      fml = dbRequest.result;
      console.log("Library initialized");
      console.log(fml);
      resolve();
    };

    dbRequest.onerror = () => {
      console.error("DB error");
      reject("DB error");
    };
  });
}

export function getMovieCount() {
  return new Promise((resolve, reject) => {
    const dbRequest = indexedDB.open("fml");

    dbRequest.onsuccess = () => {
      fml = dbRequest.result;
      const tx = fml.transaction(["movies"], "readonly");
      const store = tx.objectStore("movies");
      const ndx = store.index("by_title");
      const countReq = ndx.count();

      countReq.onsuccess = function () {
        const count = countReq.result;
        console.log("getMovieCount: ", count);
        resolve(count);
      };

      countReq.onerror = function () {
        reject("Error counting movies");
      };
    };

    dbRequest.onerror = () => {
      reject("DB open error");
    };
  });
}

export function getUserCount() {
  return new Promise((resolve, reject) => {
    const dbRequest = indexedDB.open("fml");

    dbRequest.onsuccess = () => {
      fml = dbRequest.result;
      const tx = fml.transaction(["users"], "readonly");
      const store = tx.objectStore("users");
      const ndx = store.index("by_UID");
      const countReq = ndx.count();

      countReq.onsuccess = function () {
        const count = countReq.result;
        console.log("getUserCount: ", count);
        resolve(count);
      };

      countReq.onerror = function () {
        reject("Error counting users");
      };
    };

    dbRequest.onerror = () => {
      reject("DB open error");
    };
  });
}

export async function loadStats() {
  const statsEl = qs("#dbstats");
  console.log("Stats Element: ", statsEl);

  try {
    const movieCount = await getMovieCount();
    console.log("movieCount: ", movieCount);

    const userCount = await getUserCount();
    console.log("userCount: ", userCount);

    const stats = `<p>Number of movies: ${movieCount}</p>
      <p>Number of registered users: ${userCount}</p>`;
    console.log(stats);

    // Uncomment and use renderWithTemplate if needed
    // renderWithTemplate(statsTemplateFn, statsEl);
  } catch (error) {
    console.error("Error loading stats: ", error);
  }
}

export function getDBrecord(table, key, value) {
  console.log("getDBrecord started:", table, key, value);
}