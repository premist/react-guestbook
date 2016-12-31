import firebase from "firebase";
import config from './config';

const fbApp = firebase.initializeApp(config);

export default fbApp;
