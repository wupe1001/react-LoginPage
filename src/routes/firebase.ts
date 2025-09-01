import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAYYC3J4dTO6jQyhBg-LZWyjej1OjT2-c8",
  authDomain: "practice2-d8f94.firebaseapp.com",
  projectId: "practice2-d8f94",
  storageBucket: "practice2-d8f94.firebasestorage.app",
  messagingSenderId: "970796812516",
  appId: "1:970796812516:web:b0890b552b2ad15a1a44f1",
  measurementId: "G-94XMTQC7ZR",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
