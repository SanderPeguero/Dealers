// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD-f__or8A5xFbgfGHCT1PNvuwYbzv3k6M",
  authDomain: "cars-showroom-d3aa2.firebaseapp.com",
  projectId: "cars-showroom-d3aa2",
  storageBucket: "cars-showroom-d3aa2.appspot.com",
  messagingSenderId: "34158924776",
  appId: "1:34158924776:web:bae3706f2cdedb19130a5d",
  measurementId: "G-XCVR37GRDV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getDatabase(app)
const dbFire = getFirestore(app)
const storage = getStorage(app)
const analytics = getAnalytics(app);
export {auth, db, dbFire, storage}