// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./authConfig";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Initialize Firebase

export const app = initializeApp(firebaseConfig);

// Get Firestore instance 
export const db = getFirestore(app);

export const initFirebase =  () => { 
    return app 
}