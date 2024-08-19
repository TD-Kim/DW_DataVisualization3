import axios from 'axios';
import {
  parseFirestoreFields,
  toFirestoreFields,
} from './utils/firebaseTranslate';

const API_KEY = 'AIzaSyAeVAA1GOql8fn9OuSe2LrhG2pzNLBWdF8';
const AUTH_TOKEN =
  'eyJhbGciOiJSUzI1NiIsImtpZCI6ImQ0MjY5YTE3MzBlNTA3MTllNmIxNjA2ZTQyYzNhYjMyYjEyODA0NDkiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vc2hvcC1hcHAtYzg1MzkiLCJhdWQiOiJzaG9wLWFwcC1jODUzOSIsImF1dGhfdGltZSI6MTcyMzc5NjYwOSwidXNlcl9pZCI6IkxLZHNVUWxUNFRNZ3M5NFlxbEk0am9KamxHSzIiLCJzdWIiOiJMS2RzVVFsVDRUTWdzOTRZcWxJNGpvSmpsR0syIiwiaWF0IjoxNzIzNzk2NjA5LCJleHAiOjE3MjM4MDAyMDksImVtYWlsIjoidGVzdHVzZXIyQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJ0ZXN0dXNlcjJAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.T3jpIYsnXalXhYarjN1D4zWUnIrdpPEU98sjEj6VybIFe95AnuPkDm7oKpQKxrp1kmDC6Rzf2paUehKoF6VodXPIanlm6hPOkITX5WOylzvJ1NmZ0Nb7Gl8N9XEoHiFHkf2Rr59o9HmmJ_qT1VGu0buMFPPGMoG5MSh8rqOpoZdXpnF1s_vdDw0pZP0dJB86WNScC1DSDO9DTp8_dTy30z8q6C06FqaCAxNIMseA1fonuh2CJ5nPvKoBrBwJHW7QYVauenXoXBIEOlyyNoPRkISnAtZIqr9_WSZeLnGs8uRiRG0lw5q02H2QgyMe9n_Fblqb0OWKDZ5Es2TTY9PKdA';

const BASE_URL =
  'https://firestore.googleapis.com/v1/projects/shop-app-c8539/databases/(default)/documents';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' },
});

function getResultData(response) {
  if (response.data.length > 0) {
    const result = response.data.map((data) => {
      return {
        ...parseFirestoreFields(data.document.fields),
        docId: data.document.name.split('/').pop(),
      };
    });
    return result;
  } else {
    return {
      ...parseFirestoreFields(response.data.fields),
      docId: response.data.name.split('/').pop(),
    };
  }
}

export async function getDatasRest(collectionName, queryOptions) {
  const { conditions } = queryOptions;
  const [condition] = conditions;
  const { field, operator, value } = condition;
  try {
    const response = await api.post(':runQuery', {
      structuredQuery: {
        from: [{ collectionId: collectionName }],
        where: {
          fieldFilter: {
            field: { fieldPath: field },
            op: operator,
            value: { stringValue: value },
          },
        },
      },
    });
    return getResultData(response);
  } catch (error) {
    console.error('데이터 가져오기 오류: ', error);
  }
}

export async function getDataRest(url) {
  // /products/productDocId
  const response = await api.get(url);
  return getResultData(response);
}

export async function addDatasRest(url, addObj) {
  try {
    await api.patch(url, { fields: toFirestoreFields(addObj) });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function deleteDatasRest(url) {
  try {
    await api.delete(url);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function deleteDatasRestBatch(url, dataArr) {
  try {
    for (const item of dataArr) {
      const response = await api.delete(`${url}${item.id}`);
    }
    return true;
  } catch (error) {
    console.error(
      'Batch delete error:',
      error.response ? error.response.data : error.message
    );
    return false;
  }
}
