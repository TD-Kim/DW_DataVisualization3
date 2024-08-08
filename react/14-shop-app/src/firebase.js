import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
  where,
  getDoc,
  runTransaction,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAeVAA1GOql8fn9OuSe2LrhG2pzNLBWdF8',
  authDomain: 'shop-app-c8539.firebaseapp.com',
  projectId: 'shop-app-c8539',
  storageBucket: 'shop-app-c8539.appspot.com',
  messagingSenderId: '533245681338',
  appId: '1:533245681338:web:43d2e784635de86099ac83',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

function getCollection(collectionName) {
  return collection(db, collectionName);
}

export function getUserAuth() {
  return auth;
}

async function getLastNum(collectionName, field) {
  const q = query(
    collection(db, collectionName),
    orderBy(field, 'desc'),
    limit(1)
  );
  const lastDoc = await getDocs(q);
  if (lastDoc.docs.length === 0) {
    return 0;
  }
  const lastNum = lastDoc.docs[0].data()[field];
  return lastNum;
}

function getQuery(collectionName, queryOption) {
  const { conditions = [], orderBys = [], limits } = queryOption;
  const collect = getCollection(collectionName);
  let q = query(collect);

  // where 조건
  conditions.forEach((condition) => {
    q = query(q, where(condition.field, condition.operator, condition.value));
  });

  // orderBy 조건
  orderBys.forEach((order) => {
    q = query(q, orderBy(order.field, order.direction || 'asc'));
  });

  // limit 조건
  q = query(q, limit(limits));

  return q;
}

export async function getDatas(collectionName, queryOptions) {
  const q = getQuery(collectionName, queryOptions);
  const snapshot = await getDocs(q);
  debugger;
  const docs = snapshot.docs;
  const resultData = docs.map((doc) => ({ ...doc.data(), docId: doc.id }));
  return resultData;
}
