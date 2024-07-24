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

      // Create Common Lookup Table
      const
        lookupStore = fml.createObjectStore("lookup",{keyPath:"object"}),
        ndxObject = lookupStore.createIndex("by_object","object",{unique: true});

      // Initial records
      lookupStore.put({
        object: "movieCount",
        value: 3
      });
      lookupStore.put({
        object: "userCount",
        value: 2
      });
      console.log("Common Lookup table created");

      //Create Movie Table
      const
        movieStore = fml.createObjectStore("movies", {keyPath:"title"}),
        ndxTitle =  movieStore.createIndex("by_title", "title", {unique: true}),
        ndxGenre =  movieStore.createIndex("by_genre", "genre"),
        ndxRating = movieStore.createIndex("by_rating", "rating");

      //Initial records
      movieStore.put({
        title: "Fake Movie Title",
        genre: "Family",
        rating: "G",
        runtime: 95,
        location: "A",
        disc: "00",
        type: ["DVD","BD","DIG"],
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
        type: ["DVD","DIG"],
        likable: 3,
        comment: "This is another title created because this is the first time using FML. You can delete this one, too."
      });
      movieStore.put({
        title: "Fake Movie Trilogy Finale",
        genre: "Drama",
        rating: "PG",
        runtime: 185,
        location: "A",
        disc: "02",
        type: ["BD","DIG"],
        likable: 4,
        comment: "This is another title created because this is the first time using FML. You can delete this one, too."
      });
      console.log("Movie table created");

      // Create User Table
      const
        userStore = fml.createObjectStore("users", {keyPath:"userID"}),
        ndxUserID =  userStore.createIndex("by_UID", "userID", {unique: true});

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
      // here to keep eslint from having a hissy-fit
      console.log(ndxObject, ndxTitle, ndxGenre, ndxRating, ndxUserID);
    };

    dbRequest.onsuccess = () => {
      fml = dbRequest.result;
      console.log("Library initialized");
      console.log(fml);
      resolve();
    };

    dbRequest.onerror = () => {
      console.error("DB error");
      reject("DB Error");
    };
  });
}

/* This version of the function reads from the common lookup table
   ex: commonLookup("movieCount"); would return number of movies
       commonLookup("movieCount","update",7) would update number of movies to 7
   key = name of key on which operation will work
   action = get (default), update
   returns value of key when found
*/
export function commonLookup(key, action = "get", newValue) {
  return new Promise((resolve, reject) => {
    const dbRequest = indexedDB.open("fml");
    dbRequest.onsuccess = () => {
      fml = dbRequest.result;

      // might convert this to a switch statement later and
      // add error handling for non-usuable "actions"

      // action = get : retrieve data only
      if (action == "get") {
        fml
          .transaction(["lookup"],"readonly")
          .objectStore("lookup")
          .get(key).onsuccess = (e) => {
            console.log("Common Lookup: ", key, " : ", e.target.result.value);
            resolve(e.target.result.value);
          };
      };

      // action = update : update value @ key
      if (action == "update") {
        const objectStore = fml
          .transaction(["lookup"],"readwrite")
          .objectStore("lookup");
        const req = objectStore.get(key);

        req.onerror = () => {
          console.error("Error updating lookup: ", key);
          reject("Error updating common lookup");
        };
        
        req.onsuccess = (e) => {
          const data = e.target.result;
            console.log("Common Lookup update: ", key, " : From[", data.value,"]>[", newValue,"]");
            data.value = newValue;

            const reqUpdate = objectStore.put(data);
            reqUpdate.onerror = () => {
              reject("Error updating Common Lookup");
            }
            reqUpdate.onsuccess = () => {
              resolve();
            }
          };
      };
    };

    dbRequest.onerror = () => {
      console.error("DB open error @ commonLookup");
      reject("DB open error");
    };
  });
}

function statsTemplateFn(data) {
  return `<p>${data.movieCount} movies listed</p>
  <p>${data.userCount} users registered</p>`;
}

export async function loadStats() {
  const statsEl = qs("#dbstats");
  console.log("Stats Element: ",statsEl);

  try {
    const
      movieCount = await commonLookup("movieCount"),
      userCount = await commonLookup("userCount"),
      statsData = {movieCount,userCount};
    renderWithTemplate(statsTemplateFn, statsEl, statsData);
  } catch (error) {
    console.log("Error loading stats: ", error);
  }
}


function movieListTemplate(data) {
  return `<tr><td>${data.title}</td>
  <td>${data.rating}</td>
  <td>${data.runtime}</td>
  <td>${data.location}.${data.disc}</td>
  <td>${data.genre}</td>
  <td>${data.likable}</td>
  <td>${data.type}</td>
  <td>${data.comment}</td>
  </tr>`;
}


// This function should be able to retrieve a movie record
export function getMovie(table, key, value) {
  console.log("getDBrecord started:", table, key, value);

  return new Promise((resolve, reject) => {
    const dbRequest = indexedDB.open("fml");

    dbRequest.onsuccess = () => {
      fml = dbRequest.result;
      //resolve();
    };

    dbRequest.error = () => {
      console.error("DB error retrieving record");
      reject("DB error retrieving record")
    };

  });
}


