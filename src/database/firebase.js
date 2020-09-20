import firebase from 'firebase'
import 'firebase/firestore';

const config = {
  apiKey: "AIzaSyDBV-R83hvCOCQVcZQtRSKjbWPneH45_oo",
  authDomain: "studyfind2020.firebaseapp.com",
  databaseURL: "https://studyfind2020.firebaseio.com",
  projectId: "studyfind2020",
  storageBucket: "studyfind2020.appspot.com",
  messagingSenderId: "663401815135",
  appId: "1:663401815135:web:5f7096c70b14908fef0fea",
  measurementId: "G-GCWMW6X45B"
};

const app = firebase.initializeApp(config);
const auth = app.auth();
const database = app.database();
const firestore = app.firestore();

export { auth, database, firestore }
