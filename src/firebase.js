// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage"
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBApyL2nrj811YtOzOQ6rDYgnmuf5zyhKA",
  authDomain: "chat-ea95f.firebaseapp.com",
  projectId: "chat-ea95f",
  storageBucket: "chat-ea95f.appspot.com",
  messagingSenderId: "94201666675",
  appId: "1:94201666675:web:9afbad6a0764c731e91e06"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)
export const storage = getStorage(app);