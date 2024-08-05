import { createContext, useEffect, useReducer, useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NewPage from './pages/NewPage';
import {
  addItem,
  deleteItem,
  // fetchItems,
  initialState,
  reducer,
  updateItem,
} from './api/itemReducer';
import DiaryPage from './pages/DiaryPage';
import EditPage from './pages/EditPage';
import Button from './components/Button';
import LoginPage from './pages/LoginPage';
import { getUserAuth } from './api/firebase';
import { userInitialState, userReducer } from './api/userReducer';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useSelector, useDispatch } from 'react-redux';
import { fetchItems } from './store/diarySlice';

export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();

function App() {
  // const [state, dispatch] = useReducer(reducer, initialState);
  const items = useSelector((state) => state.diary.items);
  const dispatch = useDispatch();

  const [userState, loginDispatch] = useReducer(userReducer, userInitialState);
  const auth = getUserAuth();
  const [user] = useAuthState(auth);

  // CREATE
  const onCreate = async (values) => {
    const addObj = {
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
      date: new Date(values.date).getTime(),
      content: values.content,
      emotion: values.emotion,
      userEmail: user.email,
    };
    await addItem('diary', addObj, dispatch);
  };
  // READ
  // UPDATE
  const onUpdate = async (values) => {
    const updateObj = {
      updatedAt: new Date().getTime(),
      date: new Date(values.date).getTime(),
      content: values.content,
      emotion: values.emotion,
    };
    await updateItem('diary', values.docId, updateObj, dispatch);
  };
  // DELETE
  const onDelete = async (docId) => {
    await deleteItem('diary', docId, dispatch);
  };

  useEffect(() => {
    const param = {
      collectionName: 'diary',
      queryOptions: {
        conditions: [
          {
            field: 'userEmail',
            operator: '==',
            value: user ? user.email : 'admin@gmail.com',
          },
        ],
        orderBys: [{ field: 'date', direction: 'desc' }],
      },
    };

    dispatch(fetchItems(param));
  }, [user]);
  return (
    <DiaryStateContext.Provider value={{ diaryList: items, auth }}>
      <DiaryDispatchContext.Provider value={{ onCreate, onUpdate, onDelete }}>
        <BrowserRouter>
          <div className='App'>
            {/* <Button text={'로그인'} className='btn_login' onClick={goLogin} /> */}
            <Routes>
              <Route path='/'>
                <Route index element={<HomePage />} />
                <Route path='new' element={<NewPage />} />
                <Route path='edit/:id' element={<EditPage />} />
                <Route path='diary/:id' element={<DiaryPage />} />
                <Route path='login' element={<LoginPage />} />
              </Route>
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
