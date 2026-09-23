// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js"; // Admin paneli girişi için

const firebaseConfig = {
  apiKey: "AIzaSyDUlzj5nkgGS51iWoa1Lq8qu2GtaR2D1lw",
  authDomain: "ahmetbas-a910c.firebaseapp.com",
  projectId: "ahmetbas-a910c",
  storageBucket: "ahmetbas-a910c.firebasestorage.app",
  messagingSenderId: "1042820885078",
  appId: "1:1042820885078:web:a9d7c733f10980b80f29f7",
  measurementId: "G-KC6DW5SECH"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
