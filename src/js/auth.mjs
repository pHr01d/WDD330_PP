/* Normally, these functions would point to a server-side component to maintain
   security of user login data and tokens. During development, these objects
   will be maintained in local storage.
*/

import { getLocalStorage, setLocalStorage } from "./utils.mjs";

const userKey = "fml-users";
var rating = "G";

export function login(userID) {
  // get current User List from local storage
  var userList = getLocalStorage(userKey);

  // If the user list doesn't exist, create it
  if (!userList) {
     userList = []; // a list
     let user = {}; // an array
     
     // Create default Admin user w/ attributes
    user = {
      userID: "Admin",
      userPW: "password",
      userMod: true,
      userDel: false,
      userRating: "X"
    }
    userList.push(user);
 
     // Create Guest user w/ attributes
    user = {
      userID: "Guest",
      userPW: "password",
      userMod: false,
      userDel: false,
      userRating: "G"
    }
    userList.push(user);
    
    setLocalStorage(userKey,userList);
  }

  // find index of requested user
  const
    users = userList.map((user) => user.userID),
    index = users.indexOf(userID),
    userExist = (index >= 0); //boolean showing if user exists

  console.log("Users List: ", users);
  console.log("User index: ", index);
  console.log("User exists? ", userExist);

  // getting the userRating is not like pulling from an array, this will
  // need to be requested from the database
  if (userExist) {
    rating = userList[index].userRating;
    console.log("User Rating: ", rating);
  }
}


// export async function login(creds, redirect = "/") {
//   try {
//       // const token = await loginRequest(creds);
//       const token = "someFakeToken"
//       setLocalStorage(tokenKey, token);
//       // because of the default arg provided above...if no redirect is provided send them Home.
//       window.location = redirect;
//   } catch (err) {
//       alert(err.message.message);
//   }
// }



// function isTokenValid(token) {
// //   // check to make sure a token was actually passed in.
// //   if (token) {
// //     // decode the token
// //     const decoded = jwtDecode(token);
// //     // get the current date
// //     let currentDate = new Date();
// //     // JWT exp is in seconds, the time from our current date will be milliseconds.
// //     if (decoded.exp * 1000 < currentDate.getTime()) {
// //     //token expiration has passed
// //     console.log("Token expired.");
// //     return false;
// //     } else {
// //     // token not expired
// //     console.log("Valid token");
// //     return true;
// //     }
// //     //no token...automatically return false.
// // } else return false;
//   console.log(token);
//   return true;
// }


// export function checkLogin(){
//   const token = getLocalStorage(tokenKey);
//   const valid = isTokenValid(token);
//   if (!valid){
//       localStorage.removeItem(tokenKey);
//       const location = window.location;
//       console.log(location);
//       window.location = `/login/index.html?redirect=${location.pathname}`;
//   } else return token; //if they are logged in then just return the token.`
    
// }
