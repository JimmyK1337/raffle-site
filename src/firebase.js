import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDwYWicOe7y6kb_ca3Iq0VnS5alVvN4BzY",
  authDomain: "raffledex-ca9f0.firebaseapp.com",
  projectId: "raffledex-ca9f0",
  storageBucket: "raffledex-ca9f0.firebasestorage.app",
  messagingSenderId: "527961504028",
  appId: "1:527961504028:web:7275ab81607805f751a2d9",
  measurementId: "G-MC3PRWVYFT"
};
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);