import firebase from "firebase";
import firebaseConfig from './firebase-config';

const fbApp = firebase.initializeApp(firebaseConfig);

export default fbApp;
