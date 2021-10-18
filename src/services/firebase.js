import firebase from "firebase";
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCuKdBxvbXem2Stbrx_OAYlkU6QbPa0uqE",
    authDomain: "chatapp-b7749.firebaseapp.com",
    projectId: "chatapp-b7749",
    storageBucket: "chatapp-b7749.appspot.com",
    messagingSenderId: "353362347441",
    appId: "1:353362347441:web:3cd3f153a6c50a3676e990"
  };

  firebase.initializeApp(firebaseConfig);

  export default firebase;