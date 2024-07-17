import { initializeApp } from 'firebase/app';
import { collection, getDocs, getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDysKNGaSgFliRlmIL9e-cP1YbakXZCHQs',
  authDomain: 'dwos-a8465.firebaseapp.com',
  projectId: 'dwos-a8465',
  storageBucket: 'dwos-a8465.appspot.com',
  messagingSenderId: '895188158918',
  appId: '1:895188158918:web:be31f735a2cf21c4f84ac7',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function getDatas(collectionName) {
  const collect = collection(db, collectionName);
  const snapshot = await getDocs(collect);
  const resultData = snapshot.docs.map((doc) => ({
    ...doc.data(),
    docId: doc.id,
  }));

  return resultData;
}

export { getDatas };
