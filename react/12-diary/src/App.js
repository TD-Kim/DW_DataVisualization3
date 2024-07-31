import { useReducer, useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NewPage from './pages/NewPage';

function App() {
  return (
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
  );
}

export default App;
