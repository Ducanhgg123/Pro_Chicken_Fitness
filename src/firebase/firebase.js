// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAq2eepEVDmsmKJMg6BwiG2X1uUU2whNSk",
  authDomain: "prochickenfitness.firebaseapp.com",
  projectId: "prochickenfitness",
  storageBucket: "prochickenfitness.appspot.com",
  messagingSenderId: "683055593829",
  appId: "1:683055593829:web:83f5c825e3849d6b19498c",
  measurementId: "G-J2K62Q9SX6",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
