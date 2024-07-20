/* These functions initialize a database for use.
   If the database does not exist, it initializes with the tables
   as shown below.
*/

var fml;

export function initDB() {
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


export function getMovieCount() {
  const dbRequest = indexedDB.open("fml");
  dbRequest.onsuccess = () => {
    fml = dbRequest.result;

    const
      tx = fml.transaction(["movies"],"readonly"),
      store = tx.objectStore("movies"),
      ndx = store.index("by_title"),
      countReq = ndx.count();
    
    countReq.onsuccess = function() {
      var count = countReq.result;

      console.log("getMovieCount: ", count);
      return Promise.resolve(count);
    }
  }
}

export function getUserCount() {
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
      return Promise.resolve(count);
    }
  }
}

export function getDBrecord(table, key, value) {

  console.log("getDBrecord", table, key, value);

}




