import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';



const firebaseConfig = {
  apiKey: "AIzaSyDdCtGMTyMBoDFiBwS4tR0a2BgHTow94YE",
  authDomain: "group-chat-17244.firebaseapp.com",
  projectId: "group-chat-17244",
  storageBucket: "group-chat-17244.appspot.com",
  messagingSenderId: "1056739996916",
  appId: "1:1056739996916:web:73bea16a54ec8b76659aa1"
};



// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider }
export default db;
