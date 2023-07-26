import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAwCKAN6Up_BDdjXD60yZcd8Ig6H1NfaeU",
  authDomain: "todo-app-dd036.firebaseapp.com",
  projectId: "todo-app-dd036",
  storageBucket: "todo-app-dd036.appspot.com",
  messagingSenderId: "634077980429",
  appId: "1:634077980429:web:4f162dc23536d7c616f244"
};

const app = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(app)
const firebaseDb = getFirestore(app)
const GoogleProvider = new GoogleAuthProvider()

export { firebaseAuth, firebaseDb, GoogleProvider }