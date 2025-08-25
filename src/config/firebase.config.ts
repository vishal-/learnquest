import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDe9Z-pFZ0hSzN_kWZWPVibTPKRAvWNqpk",
  authDomain: "learn-quest-482dc.firebaseapp.com",
  projectId: "learn-quest-482dc",
  storageBucket: "learn-quest-482dc.firebasestorage.app",
  messagingSenderId: "351803189827",
  appId: "1:351803189827:web:ba7dac6a04f23a749902f6",
  measurementId: "G-MLFRGPRR8J"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export default app;
