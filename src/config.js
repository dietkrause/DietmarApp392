// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

export const firebaseConfig = {
  apiKey: "AIzaSyBNcmnctjzYHOC4DuwPFGp9p5vZns87h44",
  authDomain: "dietmarapp392.firebaseapp.com",
  databaseURL: "https://dietmarapp392-default-rtdb.firebaseio.com",
  projectId: "dietmarapp392",
  storageBucket: "dietmarapp392.appspot.com",
  messagingSenderId: "563075927866",
  appId: "1:563075927866:web:fc3828832bf30b6c900a03"
};

let firebase = null;
if (!getApps().length) {
    firebase = initializeApp(firebaseConfig);
}
export const db = getDatabase(app);
export const firebase = firebase;

