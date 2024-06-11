const firebaseConfig = {
  apiKey: 'AIzaSyBvTXz44Ces9I6If9sAIKjBL26pvA0afMQ',
  authDomain: 'myproject-3ce22.firebaseapp.com',
  projectId: 'myproject-3ce22',
  storageBucket: 'myproject-3ce22.appspot.com',
  messagingSenderId: '593562857913',
  appId: '1:593562857913:web:a079c42f60c07e3f190668',
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

async function getDatas(collectionName) {
    const querySnapshot = await db.collection(collectionName).get();
    return querySnapshot;
}

async function addDatas(collectionName, addObj) {
    const result = await db.collection(collectionName).add(addObj);
    return result;
}

async function deleteDatas(collectionName, docId) {
    try {
        await db.collection(collectionName).doc(docId).delete();
        return true;
    } catch (error) {
        return false;
    }
}

async function updateDatas(collectionName, docId, updateObj) {
    await db.collection(collectionName).doc(docId).update(updateObj);
};