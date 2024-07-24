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
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAdHy-PY5GiXz7B73eiyeL8FT0udOmhBkM',
  authDomain: 'moviepedia-c1462.firebaseapp.com',
  projectId: 'moviepedia-c1462',
  storageBucket: 'moviepedia-c1462.appspot.com',
  messagingSenderId: '452125101812',
  appId: '1:452125101812:web:40b9aedb70d1e7e97e98a1',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function getCollection(collectionName) {
  return collection(db, collectionName);
}

function createPath(path) {
  const uuid = crypto.randomUUID();
  return path + uuid;
}

async function addDatas(collectionName, addObj) {
  // 파일 저장 ==> 스토리지의 이미지 url을 addObj의 imgUrl 값으로 변경
  const path = createPath('food/');
  const url = await uploadImage(path, addObj.imgUrl);
  addObj.imgUrl = url;

  // id 생성
  const lastId = (await getLastNum(collectionName, 'id')) + 1;
  addObj.id = lastId;

  // 시간 정보 생성
  const time = new Date().getTime();
  addObj.createdAt = time;
  addObj.updatedAt = time;

  // 컬렉션에 저장
  await addDoc(getCollection(collectionName), addObj);
}

async function uploadImage(path, file) {
  const storage = getStorage();
  const imageRef = ref(storage, path);

  // File 객체를 스토리지에 저장
  await uploadBytes(imageRef, file);

  // 저장한 File의 url을 받는다.
  const url = await getDownloadURL(imageRef);
  return url;
}

async function getLastNum(collectionName, field) {
  const q = query(
    getCollection(collectionName), // collection
    orderBy(field, 'desc'), // 정렬할 필드로 내림차순
    limit(1) // 1개만 가져온다
  );
  const lastDoc = await getDocs(q);
  const lastId = lastDoc.docs[0].data()[field];
  return lastId;
}

async function getDatasOrderByLimit(collectionName, options) {
  const { fieldName, limits } = options;
  let q;
  if (!options.lq) {
    q = query(
      getCollection(collectionName),
      orderBy(fieldName, 'desc'),
      limit(limits)
    );
  } else {
    q = query(
      getCollection(collectionName),
      orderBy(fieldName, 'desc'),
      startAfter(options.lq),
      limit(limits)
    );
  }

  const snapshot = await getDocs(q);
  const docs = snapshot.docs;
  const lastQuery = docs[docs.length - 1];
  console.log(lastQuery);
  const resultData = docs.map(function (doc) {
    return { ...doc.data(), docId: doc.id };
  });
  return { resultData, lastQuery };
}

export { addDatas, getDatasOrderByLimit };
