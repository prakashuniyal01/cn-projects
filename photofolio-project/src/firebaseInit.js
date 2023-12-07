// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyClln7DQvTnZshIjy6cFPdh5rIo4VMxzbw",
  authDomain: "photofolio-1011c.firebaseapp.com",
  projectId: "photofolio-1011c",
  storageBucket: "photofolio-1011c.appspot.com",
  messagingSenderId: "602525153155",
  appId: "1:602525153155:web:39754ddc53daf1fbf7a8b6",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
