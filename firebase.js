// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBwxp7l7AB_kImkUxNW44qZyMA0_rfaQ4c",
    authDomain: "to-do-bea09.firebaseapp.com",
    projectId: "to-do-bea09",
    storageBucket: "to-do-bea09.firebasestorage.app",
    messagingSenderId: "118173807274",
    appId: "1:118173807274:web:9ff88c2275378a526496d3",
    measurementId: "G-FTXBR3X59M"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
