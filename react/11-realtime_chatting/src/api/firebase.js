import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAUJi9jIZPjM-KEdjDMklAtdiLskWH11fY',
  authDomain: 'chatting-326ef.firebaseapp.com',
  projectId: 'chatting-326ef',
  storageBucket: 'chatting-326ef.appspot.com',
  messagingSenderId: '641366352174',
  appId: '1:641366352174:web:056eb800b27e60253b1abf',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

function getCollection(collectionName) {
  return collection(db, collectionName);
}

function getUserAuth() {
  return auth;
}

export { getUserAuth };
