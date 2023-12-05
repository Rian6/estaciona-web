// firebase.js
import { initializeApp, getApps } from "firebase/app";
import 'firebase/database'

const firebaseConfig = {
    apiKey: "AIzaSyBLyW23PzMoK710i2I0-iDOID96x28ka0g",
    authDomain: "app-estacionamento-405800.firebaseapp.com",
    databaseURL: "https://app-estacionamento-405800-default-rtdb.firebaseio.com",
    projectId: "app-estacionamento-405800",
    storageBucket: "app-estacionamento-405800.appspot.com",
    messagingSenderId: "922600555506",
    appId: "1:922600555506:web:27321870cb8d67b772616b",
    measurementId: "G-TNZ8WPX0HV"
};

let fb = null;

try {
    fb = initializeApp(firebaseConfig);
} catch (err) {
    if (!/already exists/.test(err.message)) {
        console.error('Firebase initialization error', err.stack)
    }
}
export default fb