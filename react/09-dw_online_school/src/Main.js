import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './components/App';
import HomePage from './pages/HomePage';
import CourseListPage from './pages/CourseListPage';
import QuestionListPage from './pages/QuestionListPage';

function Main(props) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route index element={<HomePage />} />
          <Route path='courses' element={<CourseListPage />} />
          <Route path='questions' element={<QuestionListPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Main;
