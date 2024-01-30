// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyCEJ1IE2QuTmBxhplhVDPpWHgHcuL92Sdw",

  authDomain: "harmony-hub-83f61.firebaseapp.com",

  projectId: "harmony-hub-83f61",

  storageBucket: "harmony-hub-83f61.appspot.com",

  messagingSenderId: "943957569696",

  appId: "1:943957569696:web:ea918a0b178502df8299c5"

};


// Initialize Firebase

export const app = initializeApp(firebaseConfig);

export const initFirebase =  () => { 
    return app 
}