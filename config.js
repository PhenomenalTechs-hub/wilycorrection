import * as firebase from 'firebase';
require('@firebase/firestore');

var firebaseConfig = {
  apiKey: "AIzaSyCQZAMZ8iFM65I0GLaZifxaNAwKLawNIqs",
  authDomain: "wily-app-e0b21.firebaseapp.com",
  projectId: "wily-app-e0b21",
  storageBucket: "wily-app-e0b21.appspot.com",
  messagingSenderId: "181984683169",
  appId: "1:181984683169:web:24b2a78f83b752df377ce0"
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
export default firebase.firestore();