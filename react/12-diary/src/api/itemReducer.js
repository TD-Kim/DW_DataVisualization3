import { addDatas, deleteDatas, getDatas, updateDatas } from './firebase';

// Action types
const FETCH_ITEMS = 'FETCH_ITEMS';
const ADD_ITEM = 'ADD_ITEM';
const UPDATE_ITEM = 'UPDATE_ITEM';
const DELETE_ITEM = 'DELETE_ITEM';
const SET_ERROR = 'SET_ERROR';

// Initial State
export const initialState = {
  items: [],
  error: null,
};

export function reducer(state, action) {
  // state 는 우리가 dispatch 함수를 호출할 때 명시적으로 건네주지 않아도
  // 리듀서가 알아서 관리를 하고 있다.
  // dispatch 함수를 호출할 때 넣어주는 객체가 action 으로 들어온다.
  switch (action.type) {
    case FETCH_ITEMS:
      return { ...state, items: action.payload, error: null };
    case ADD_ITEM:
      return { ...state, items: [...state.items, action.payload], error: null };
    case UPDATE_ITEM:
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
        error: null,
      };
    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter((item) => item.docId !== action.payload),
        error: null,
      };
    case SET_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
}

// Actions(실제 reducer가 state를 변경하기 전에 수행해야 할 작업들)
export const fetchItems = async (collectionName, queryOptions, dispatch) => {
  const resultData = await getDatas(collectionName, queryOptions);
  if (!resultData) {
    dispatch({ type: SET_ERROR, payload: 'FETCH Datas 에러!!!' });
  } else {
    dispatch({ type: FETCH_ITEMS, payload: resultData });
  }
};
export const addItem = async (collectionName, addObj, dispatch) => {
  // dispatch 할 변경된 state 값을 만들어야한다.
  const resultData = await addDatas(collectionName, addObj);
  if (!resultData) {
    dispatch({ type: SET_ERROR, payload: 'ADD Datas 에러!!!' });
  } else {
    // dispatch 실행 시 reducer 함수로 간다.
    dispatch({ type: ADD_ITEM, payload: resultData });
  }
};
export const updateItem = async (
  collectionName,
  docId,
  updateObj,
  dispatch
) => {
  const resultData = await updateDatas(collectionName, docId, updateObj);
  if (!resultData) {
    dispatch({ type: SET_ERROR, payload: 'UPDATE Datas 에러!!!' });
  } else {
    dispatch({ type: UPDATE_ITEM, payload: resultData });
  }
};
export const deleteItem = async (collectionName, docId, dispatch) => {
  const resultData = await deleteDatas(collectionName, docId);
  if (!resultData) {
    dispatch({ type: SET_ERROR, payload: 'DELETE Datas 에러!!!' });
  } else {
    dispatch({ type: DELETE_ITEM, payload: docId });
  }
};
