// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAM53x4wnwNQNJL26NU97BUe7x6wJxfsJU",
  authDomain: "guitarworld-reactjs.firebaseapp.com",
  projectId: "guitarworld-reactjs",
  storageBucket: "guitarworld-reactjs.firebasestorage.app",
  messagingSenderId: "672009575396",
  appId: "1:672009575396:web:b116e9645a2ea1251ac5f1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);