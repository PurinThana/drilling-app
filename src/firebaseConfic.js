import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword ,signInWithEmailAndPassword,onAuthStateChanged ,signOut} from 'firebase/auth';
import env from "react-dotenv";

// REACT_APP_API_KEY="AIzaSyD6HArJz7n7Xy7TImYrR6dG7mOWwdJo5Mk"
// REACT_APP_AUTH_DOMAIN="drilling"
// REACT_APP_DATABASE_URL="https://drilling-3bcbc-default-rtdb.asia-southeast1.firebasedatabase.app"
// REACT_APP_PROJECT_ID="drilling-3bcbc"
// REACT_APP_STORAGE_BUCKET="drilling-3bcbc.appspot.com"
// REACT_APP_MESSAGING_SENDER_ID="112906329060"
// REACT_APP_APP_ID="1:112906329060:web:65abcf72183c2d288b45f1"
// REACT_APP_MEASUREMENT_ID="G-46GGEK9SGF"


const firebaseConfig = {
  apiKey: "AIzaSyD6HArJz7n7Xy7TImYrR6dG7mOWwdJo5Mk",
  authDomain: "drilling-3bcbc.firebaseapp.com",
  databaseURL: "https://drilling-3bcbc-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "drilling-3bcbc",
  storageBucket: "drilling-3bcbc.appspot.com",
  messagingSenderId: "112906329060",
  appId: "1:112906329060:web:65abcf72183c2d288b45f1",
  measurementId: "G-46GGEK9SGF"
};



const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth, createUserWithEmailAndPassword ,signInWithEmailAndPassword ,onAuthStateChanged,signOut };

