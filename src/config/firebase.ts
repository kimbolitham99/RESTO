import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA8_qcdXWEJdfxXJv3TXFZMHKfTEVPQqn4",
  authDomain: "lims-f73e1.firebaseapp.com",
  projectId: "lims-f73e1",
  storageBucket: "lims-f73e1.firebasestorage.app",
  messagingSenderId: "398046619260",
  appId: "1:398046619260:web:5b1f3828df37f6ce980bf9",
  measurementId: "G-WJS7M2R8J0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export default app;
