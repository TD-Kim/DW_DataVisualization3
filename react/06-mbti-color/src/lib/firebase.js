import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  getDocs,
  collection,
  setDoc,
  doc,
  addDoc,
  deleteDoc,
  getDoc,
  updateDoc,
  query,
  orderBy,
  limit,
  startAfter,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyA_dDlIcj9UXVXZQlZWeh10NpN8N5EcHKg',
  authDomain: 'mbti-project-5e256.firebaseapp.com',
  projectId: 'mbti-project-5e256',
  storageBucket: 'mbti-project-5e256.appspot.com',
  messagingSenderId: '664078993371',
  appId: '1:664078993371:web:8db95b3bfcf25a3c69c9fe',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function getAllDatas(collectionName, order) {
  const collect = collection(db, collectionName);
  const q = query(collect, orderBy(order, 'desc')); // desc : 내림차순
  const querySnapshot = await getDocs(q);
  const resultData = querySnapshot.docs.map(doc => ({...doc.data(), docId: doc.id}));
  return resultData;
//   debugger;
}

export { getAllDatas };
