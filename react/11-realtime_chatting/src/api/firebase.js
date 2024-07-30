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
} from 'firebase/firestore';

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

async function addDatas(collectionName, addObj) {
  await addDoc(getCollection(collectionName), addObj);
}

function getRealTimeMessages(collectionName, setData) {
  const collect = collection(db, collectionName);
  const q = query(collect, orderBy('createdAt'), limit(100));

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const resultData = snapshot.docs.map((doc) => doc.data());
    setData(resultData);
  });
  return unsubscribe;
}

function getQuery(collectionName, queryOption) {
  const { conditions = [], orderBys = [], limits } = queryOption;
  const collect = getCollection(collectionName);
  let q = query(collect);

  const condition = [
    { field: 'text', operator: '==', value: 'test' },
    { field: 'uid', operator: '==', value: 'xjdiwjKDJ2jdkxJND2J' },
  ];

  // where 조건
  conditions.forEach((condition) => {
    q = query(q, where(condition.field, condition.operator, condition.value));
  });

  // orderBy 조건
  orderBys.forEach(order => {
    q = query(q, orderBy(order.field, order.direction || "asc"));
  })

  // limit 조건
  q = query(q, limit(limits));

  return q;
}

export { db, getUserAuth, addDatas, getRealTimeMessages, getQuery };
