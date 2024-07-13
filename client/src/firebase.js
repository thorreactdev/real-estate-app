// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    // apiKey: "AIzaSyAZCxG1T2hWSj-aiEsaO0baRPTPJEl3Its",
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "mern-estate-b38eb.firebaseapp.com",
    projectId: "mern-estate-b38eb",
    storageBucket: "mern-estate-b38eb.appspot.com",
    messagingSenderId: "757480597769",
    appId: "1:757480597769:web:ef9326f62bce08dcea0bd8"
};

console.log(import.meta.env.VITE_FIREBASE_API_KEY);

// Initialize Firebase
export const app = initializeApp(firebaseConfig);