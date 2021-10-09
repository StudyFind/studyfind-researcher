import firebase from "firebase";

const app = firebase.initializeApp({
  apiKey: "AIzaSyA2HhlpEPOZzuClQ-svONo3I9quxom1C9w",
  authDomain: "studyfind-development.firebaseapp.com",
  projectId: "studyfind-development",
  storageBucket: "studyfind-development.appspot.com",
  messagingSenderId: "629466210039",
  appId: "1:629466210039:web:a018f233b4e6cd9491bdf2",
});

const auth = app.auth();
const storage = app.storage();
const firestore = app.firestore();
const functions = app.functions();

export { auth, storage, firestore, functions };
