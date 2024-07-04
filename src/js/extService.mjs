









/* All that follows are examples pulled from ChatGPT
/*=======================================================================================*/
/* STEP 1: OPEN OR CREATE A DATABASE */
// // Open or create a database
// var request = window.indexedDB.open("myDatabase", 1); // "myDatabase" is the name of the database

// // Handle database opening success
// request.onsuccess = function(event) {
//   var db = event.target.result;
//   console.log("Database opened successfully");
  
//   // Perform operations on the database (like saving data) here
// };

// // Handle database opening error
// request.onerror = function(event) {
//   console.error("Database error:", event.target.errorCode);
// };

// // Setup database schema (if it's a new database)
// request.onupgradeneeded = function(event) {
//   var db = event.target.result;
  
//   // Create an object store (like a table in SQL databases)
//   var objectStore = db.createObjectStore("data", { keyPath: "id", autoIncrement:true });
  
//   // Define indexes if needed
//   // objectStore.createIndex("name", "name", { unique: false });
// };


// /* STEP 2: SAVE JSON DATA TO INDEXEDDB */
// function saveData(data) {
//   var transaction = db.transaction(["data"], "readwrite"); // "data" is the name of the object store
//   var objectStore = transaction.objectStore("data");
  
//   var request2 = objectStore.add(data); // "data" is a JSON object you want to save
  
//   request2.onsuccess = function(event) {
//     console.log("Data saved successfully");
//   };
  
//   request.onerror = function(event) {
//     console.error("Error saving data:", event.target.error);
//   };
// }

// // Example usage
// var jsonData = { id: 1, name: "John Doe", age: 30 };
// saveData(jsonData);


// /* STEP 3: RETRIEVE JSON DATA FROM INDEXEDDB */
// function getData(callback) {
//   var transaction = db.transaction(["data"], "readonly");
//   var objectStore = transaction.objectStore("data");
//   var request = objectStore.openCursor();

//   var results = [];

//   request.onsuccess = function(event) {
//     var cursor = event.target.result;
//     if (cursor) {
//       results.push(cursor.value);
//       cursor.continue();
//     } else {
//       callback(results);
//     }
//   };

//   request.onerror = function(event) {
//     console.error("Error retrieving data:", event.target.error);
//   };
// }

// // Example usage
// getData(function(dataArray) {
//   console.log("Retrieved data:", dataArray);
// });



// /* STEP 4: DELETE DATA FROM INDEXEDDB */
// function deleteData(id) {
//   var transaction = db.transaction(["data"], "readwrite");
//   var objectStore = transaction.objectStore("data");
//   var request3 = objectStore.delete(id);

//   request3.onsuccess = function(event) {
//     console.log("Data deleted successfully");
//   };

//   request3.onerror = function(event) {
//     console.error("Error deleting data:", event.target.error);
//   };
// }

// // Example usage
// var dataIdToDelete = 1;
// deleteData(dataIdToDelete);


// /* STEP 5: CLOSE THE DATABASE CONNECTION */
// // Close the database connection
// db.close();

