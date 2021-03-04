import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyCqN7oozPTk8oblXElcUmUtjtMTkLOUJXM",
    authDomain: "clone-bd3a6.firebaseapp.com",
    projectId: "clone-bd3a6",
    storageBucket: "clone-bd3a6.appspot.com",
    messagingSenderId: "550230711341",
    appId: "1:550230711341:web:9cf21f21861fcc07346ca4",
    measurementId: "G-CEWKTF54WZ"
  };
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };