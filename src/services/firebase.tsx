import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyADQ4RDXIdbu3qTGqXiIqDTtR-s0OwW7nE",
    authDomain: "receitas-web-e7143.firebaseapp.com",
    projectId: "receitas-web-e7143",
    storageBucket: "receitas-web-e7143.appspot.com",
    messagingSenderId: "181186678765",
    appId: "1:181186678765:web:2b29c48a711012dcc661e4",
    measurementId: "G-MFZD3BFQKM"
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default firebase;