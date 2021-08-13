import firebase from "firebase";

const app = firebase.initializeApp({
  apiKey: "AIzaSyCsB6d3gfTvHNuHX2qbll4x_Axly0KML8k",
  authDomain: "sf-pricing.firebaseapp.com",
  projectId: "sf-pricing",
  storageBucket: "sf-pricing.appspot.com",
  messagingSenderId: "421158529056",
  appId: "1:421158529056:web:f360fd107c4bf8e46f7445"
});

const auth = app.auth();
const storage = app.storage();
const firestore = app.firestore();
const functions = app.functions();

export { auth, storage, firestore, functions };
