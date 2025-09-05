
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyD29X8CZ5X-Scp1D-OMNBvJGVb7zoh4Wxo",
  authDomain: "vardaan-ai.firebaseapp.com",
  projectId: "vardaan-ai",
  storageBucket: "vardaan-ai.firebasestorage.app",
  messagingSenderId: "337507807240",
  appId: "1:337507807240:web:47020d87a88a13ba7c61bd",
  measurementId: "G-40WH9144E9"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
   