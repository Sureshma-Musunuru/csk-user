// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCRZ2ccUkQUagNNPTCBlaDDLpD1lEDGV4w",
  authDomain: "marist-9d1a3.firebaseapp.com",
  projectId: "marist-9d1a3",
  storageBucket: "marist-9d1a3.appspot.com",
  messagingSenderId: "850605687036",
  appId: "1:850605687036:web:5cb5441ef6e8a617701779"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);


export const getFirebaseToken = (setTokenFound) => {
    return getToken(messaging, {vapidKey: 'BEXQiyPwhVac1tnEYQdnUVJiuIlCA9fzXUdATQrAv40z9WTGehduA0Xad3Iva4PTN_c4I7uZ9V1lGvOqKbCnM_w'}).then((currentToken) => {
      if (currentToken) {
        console.log('current token for client: ', currentToken);
        setTokenFound(true);
        localStorage.setItem("firebase_token", currentToken);
        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        console.log('No registration token available. Request permission to generate one.');
        setTokenFound(false);
        localStorage.removeItem("firebase_token");
        // shows on the UI that permission is required 
      }
    }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
      // catch error while creating client token
    });
  }

  