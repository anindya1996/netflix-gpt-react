// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAzsBldKb-D-jKEYpXMfutCHU6gPRh5AX8",
  authDomain: "netfiexgpt.firebaseapp.com",
  projectId: "netfiexgpt",
  storageBucket: "netfiexgpt.appspot.com",
  messagingSenderId: "1048380002511",
  appId: "1:1048380002511:web:c9e4f9de9b07e5e751e7ba",
  measurementId: "G-F602PJZHEL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
