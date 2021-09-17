import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCmB37vF6UAIYJcPpl1Y5t3eYAlHE3Sb3k",
  authDomain: "catch-of-the-day-222cc.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-222cc-default-rtdb.firebaseio.com",
});

const base = Rebase.createClass(firebaseApp.database());

// This is named export
export { firebase };

// This is default export
export default base;