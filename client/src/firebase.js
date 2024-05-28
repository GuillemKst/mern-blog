// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-dcf3e.firebaseapp.com",
  projectId: "mern-blog-dcf3e",
  storageBucket: "mern-blog-dcf3e.appspot.com",
  messagingSenderId: "187615294605",
  appId: "1:187615294605:web:5ba34e96c699eda226dec4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig)