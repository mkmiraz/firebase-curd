import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyCpAk2eL3yXmlAPl2YH8ftFN8gOCtnYwig",
  authDomain: "mern-stack-a57b9.firebaseapp.com",
  projectId: "mern-stack-a57b9",
  storageBucket: "mern-stack-a57b9.appspot.com",
  messagingSenderId: "81734502115",
  appId: "1:81734502115:web:0295326a20be4c111ea7d6",
};

// Initialize Firebase
export const fireapp = initializeApp(firebaseConfig);
export const fileStorage = getStorage(fireapp);
