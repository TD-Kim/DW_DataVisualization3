import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './components/App';
import HelloStyled from './components/01/HelloStyled';
import Nesting from './components/02/Nesting';
import { Practice as Practice1 } from './components/03/Practice';

function Main(props) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route path='01' element={<HelloStyled />} />
          <Route path='02' element={<Nesting />} />
          <Route path='03' element={<Practice1 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Main;
