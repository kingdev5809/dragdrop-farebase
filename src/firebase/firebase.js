import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAwYa46amW8GHmoSb1-9SkWz3yC2EDexmw",
  authDomain: "dropdown-6c293.firebaseapp.com",
  projectId: "dropdown-6c293",
  storageBucket: "dropdown-6c293.appspot.com",
  messagingSenderId: "525407873881",
  appId: "1:525407873881:web:616efb014df3f39ee43a48",
  measurementId: "G-P7HRLGPG7S",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app); // initialize Firebase Storage
export { auth, db, storage };

