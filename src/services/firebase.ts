import firebase from 'firebase/compat/app';

import 'firebase/compat/auth';
import 'firebase/compat/database';

const firebaseConfig = {
  apiKey: "AIzaSyBMNMWthrtvwqE5_KPUy1ofZrftxbsvp_s",
  authDomain: "letmeaskapp-5a1ff.firebaseapp.com",
  databaseURL: "https://letmeaskapp-5a1ff-default-rtdb.firebaseio.com/",
  projectId: "letmeaskapp-5a1ff",
  storageBucket: "letmeaskapp-5a1ff.appspot.com",
  messagingSenderId: "635368788192",
  appId: "1:635368788192:web:93aecc3177a8f576880085"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const database = firebase.database();

export { firebase, auth, database };