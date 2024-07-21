/* These functions initialize a database for use and perform operations
   on the database.

   If the database does not exist, it initializes with the tables
   as shown below.
*/

import { qs, renderWithTemplate } from "./utils.mjs";
var fml;

export async function initDB() {
  const dbRequest = indexedDB.open("fml");

  dbRequest.onupgradeneeded = () => {
    console.log("FML create/upgrade required");
    fml = dbRequest.result;

    //create "movie" table
    const
      movieStore = fml.createObjectStore("movies", {keyPath:"title"}),
      ndxTitle =  movieStore.createIndex("by_title", "title", {unique: true}),
      ndxGenre =  movieStore.createIndex("by_genre", "genre"),
      ndxRating = movieStore.createIndex("by_rating", "rating");

    //Initial record(s)
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
    console.log("Movie table created");


    const
      userStore = fml.createObjectStore("users", {keyPath:"userID"}),
      ndxUserID =  userStore.createIndex("by_UID", "userID", {unique: true});

    //Initial user record(s)
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
  };

  dbRequest.onerror = () => {
    console.error("DB error");
  };
}


export async function getMovieCount() {
  return new Promise((resolve) => {
    var count = 0;
    const dbRequest = indexedDB.open("fml");
    dbRequest.onsuccess = () => {
      fml = dbRequest.result;

      const
        tx = fml.transaction(["movies"],"readonly"),
        store = tx.objectStore("movies"),
        ndx = store.index("by_title"),
        countReq = ndx.count();
      
      countReq.onsuccess = function() {
        count = countReq.result;
        console.log("getMovieCount: ", count);
      }
    }
    resolve(count);
  });
}

export async function getUserCount() {
  const dbRequest = indexedDB.open("fml");
  dbRequest.onsuccess = () => {
    fml = dbRequest.result;

    const
      tx = fml.transaction(["users"],"readonly"),
      store = tx.objectStore("users"),
      ndx = store.index("by_UID"),
      countReq = ndx.count();
    
    countReq.onsuccess = function() {
      var count = countReq.result;

      console.log("getUserCount: ", count);
      return count;
    }
  }
}

export async function loadStats() {
  const statsEl = qs("#dbstats");
  console.log("Stats Element: ",statsEl);

  const movieCount = await getMovieCount();
  console.log("movieCount: ",movieCount);

  const userCount = await getUserCount();
  console.log("userCount: ",userCount);
  

  const stats = `<p>Number of movies: ${movieCount}</p>
<p>Number of registered users: ${userCount}</p>`;
  console.log(stats);

//  renderWithTemplate(statsTemplateFn, statsEl);
}
















export function getDBrecord(table, key, value) {
  console.log("getDBrecord started:", table, key, value);

}


