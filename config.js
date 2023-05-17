import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/database";

const firebaseConfig = {
  apiKey: "AIzaSyDStL-JQZsOqoJkrcY__hNQD9VJnm5BMYw",
  authDomain: "treehard-chat.firebaseapp.com",
  projectId: "treehard-chat",
  storageBucket: "treehard-chat.appspot.com",
  messagingSenderId: "286403612869",
  appId: "1:286403612869:web:f755242e1c1c950a3c60ac",
  measurementId: "G-KQM3E9LHJ0",
  databaseURL: "https://treehard-chat-default-rtdb.firebaseio.com/",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const firestore = firebase.firestore();

export { firebase, auth, firestore };
