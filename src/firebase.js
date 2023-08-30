/* eslint-disable */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyBO2GNsHoMw56p0RATY-vJ91dayEbg3HIE',
  authDomain: 'lvivbag.firebaseapp.com',
  projectId: 'lvivbag',
  storageBucket: 'lvivbag.appspot.com',
  messagingSenderId:  '686685728078',
  appId: '1:686685728078:web:9191dca265af9a1a03821f',
  measurementId: 'G-4XZ29R4GJF',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore();


export default { app, analytics, db};
