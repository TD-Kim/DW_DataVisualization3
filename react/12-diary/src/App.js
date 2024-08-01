import { createContext, useEffect, useReducer, useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NewPage from './pages/NewPage';
import { addItem, fetchItems, initialState, reducer } from './api/itemReducer';

export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  // CREATE
  const onCreate = async (values) => {
    const addObj = {
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
      date: new Date(values.date).getTime(),
      content: values.content,
      emotion: values.emotion,
      userEmail: 'kjy.devops@gmail.com',
    };
    await addItem('diary', addObj, dispatch);
  };
  // READ
  // UPDATE
  // DELETE

  useEffect(() => {
    fetchItems(
      'diary',
      {
        conditions: [
          { field: 'userEmail', operator: '==', value: 'kjy.devops@gmail.com' },
        ],
        orderBys: [{ field: 'date', direction: 'desc' }],
      },
      dispatch
    );
  }, []);
  return (
    <DiaryStateContext.Provider value={state.items}>
      <DiaryDispatchContext.Provider value={{ onCreate }}>
        <BrowserRouter>
          <div className='App'>
            <Routes>
              <Route path='/'>
                <Route index element={<HomePage />} />
                <Route path='new' element={<NewPage />} />
                {/* <Route path='edit' element={} /> */}
                {/* <Route path='diary' element={} /> */}
              </Route>
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
