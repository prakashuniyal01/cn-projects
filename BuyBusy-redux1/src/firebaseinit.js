// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDCeSvmqsoRBVPG1wk0VQM4r0bVjZmghqI",
  authDomain: "buybusy-redux-d0e38.firebaseapp.com",
  projectId: "buybusy-redux-d0e38",
  storageBucket: "buybusy-redux-d0e38.appspot.com",
  messagingSenderId: "489372801198",
  appId: "1:489372801198:web:53bce63c83a9cd9a9a353f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);