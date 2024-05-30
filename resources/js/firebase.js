import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js';
import {
  getFirestore,
  getDocs,
  collection,
} from 'https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js';

const firebaseConfig = {
  apiKey: 'AIzaSyBvTXz44Ces9I6If9sAIKjBL26pvA0afMQ',
  authDomain: 'myproject-3ce22.firebaseapp.com',
  projectId: 'myproject-3ce22',
  storageBucket: 'myproject-3ce22.appspot.com',
  messagingSenderId: '593562857913',
  appId: '1:593562857913:web:a079c42f60c07e3f190668',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function getMembers() {
  const collect = await collection(db, 'member');
  const snapshot = await getDocs(collect);

  return snapshot;
}

export { db, getMembers };
