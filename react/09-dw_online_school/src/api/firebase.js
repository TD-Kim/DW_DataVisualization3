import { initializeApp } from 'firebase/app';
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';

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

async function getData(collectionName, option) {
  const { field, condition, value } = option;
  const collect = collection(db, collectionName);
  const q = query(collect, where(field, condition, value));
  const snapshot = await getDocs(q);
  // const resultData = snapshot.docs.map(doc => ({
  //   docId: doc.id,
  //   ...doc.data()
  // }))
  const resultData = { ...snapshot.docs[0].data(), docId: snapshot.docs[0].id };
  return resultData;
}

async function getMember(values) {
  const { email, password } = values;

  const collect = collection(db, 'member');
  const q = query(collect, where('email', '==', email));
  const snapshot = await getDocs(q);
  const docs = snapshot.docs;

  let message;
  let memberObj = {};

  if (docs.length == 0) {
    message = '이메일이 올바르지 않습니다.';
  } else {
    const memberData = { ...docs[0].data(), docId: docs[0].id };
    if (password === memberData.password) {
      message = '로그인에 성공했습니다.';
      memberObj = {
        email: memberData.email,
        docId: memberData.docId,
      };
    } else {
      message = '비밀번호가 일치하지 않습니다.';
    }
  }

  return { memberObj, message };
}

async function updateDatas(collectionName, docId, updateObj, option) {
  // 문서의 reference 객체가 필요
  const docRef = doc(db, collectionName, docId);

  try {
    if (!option) {
      await updateDoc(docRef, updateObj);
    } else {
      if (option.type == 'ADD') {
        await updateDoc(docRef, {
          [option.fieldName]: arrayUnion(updateObj),
        });
      } else if (option.type == 'DELETE') {
        await updateDoc(docRef, {
          [option.fieldName]: arrayRemove(updateObj),
        });
      }
    }
    return true;
  } catch (error) {
    return false;
  }
}

export { getDatas, getData, getMember, updateDatas };
