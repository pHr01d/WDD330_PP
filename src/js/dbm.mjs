/* These functions initialize a database for use.
   If the database does not exist, it initializes with the tables
   as shown below.
*/

var fmdb;

export async function initDB() {
  const dbRequest = indexedDB.open("FMDb");

  dbRequest.onupgradeneeded = () => {
    console.log("FMDB create/upgrade required");
    fmdb = dbRequest.result;

    //create "movie" table
    const
      movieStore = fmdb.createObjectStore("movies", {keyPath:"title"}),
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
      comment: "This title was created because this is the first time using FMDb. You can delete this one."
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
      comment: "This is another title created because this is the first time using FMDb. You can delete this one, too."
    });
    console.log("Movie table created");


    const
      userStore = fmdb.createObjectStore("users", {keyPath:"userID"}),
      ndxUserID =  userStore.createIndex("by_UID", "userID", {unique: true});

    //Initial record(s)
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
    fmdb = dbRequest.result;
    console.log(fmdb);
    console.log("Database initialized");
  };

  dbRequest.onerror = () => {
    console.error("DB error");
  };

}


export function getMovieCount() {
  const dbRequest = indexedDB.open("FMDb");
  dbRequest.onsuccess = () => {
    fmdb = dbRequest.result;

    const
      tx = fmdb.transaction(["movies"],"readonly"),
      store = tx.objectStore("movies"),
      ndx = store.index("by_title"),
      countReq = ndx.count();
    
    countReq.onsuccess = function() {
      var count = countReq.result;

      console.log("getMovieCount: ", count);
      return count;
    }
  }
}

export function getUserCount() {
  const dbRequest = indexedDB.open("FMDb");
  dbRequest.onsuccess = () => {
    fmdb = dbRequest.result;

    const
      tx = fmdb.transaction(["users"],"readonly"),
      store = tx.objectStore("users"),
      ndx = store.index("by_UID"),
      countReq = ndx.count();
    
    countReq.onsuccess = async function() {
      const count = await fetch(countReq.result).then();

      console.log("getUserCount: ", count);
      return count;
    }
  }
}

export function getDBrecord(table, key, value) {

  console.log("getDBrecord", table, key, value);

}




