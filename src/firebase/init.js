import firebase from 'firebase'
import firestore from 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyBWcPxne3JCzOGj3cmfYJ_TRu_3yYQZdn0",
    authDomain: "rb-smoothies.firebaseapp.com",
    databaseURL: "https://rb-smoothies.firebaseio.com",
    projectId: "rb-smoothies",
    storageBucket: "",
    messagingSenderId: "338429227610",
    appId: "1:338429227610:web:6e9fa84bf7c87a1c"
  };
  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig);

//   firebaseApp.firestore().settings({timestampsInSnapshots: true})

  export default firebaseApp.firestore()