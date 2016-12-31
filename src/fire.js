import firebase from "firebase";
import firebaseConfig from './firebase-config';

const fire = firebase.initializeApp(firebaseConfig);

export default fire;
