import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// https://firebase.google.com/docs/web/setup#available-libraries
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCa3GRFs6d9iSHr1EJt7S_tavNlRUKqBfQ",
    authDomain: "chatcominity.firebaseapp.com",
    projectId: "chatcominity",
    storageBucket: "chatcominity.appspot.com",
    messagingSenderId: "581424238858",
    appId: "1:581424238858:web:5bdfd050345f94fae5eaf3",
    databaseURL: "https://chatcominity-default-rtdb.europe-west1.firebasedatabase.app/"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db2 = getDatabase(app);
export const db = getFirestore(app);

