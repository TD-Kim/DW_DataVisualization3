import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './components/App';
import HomePage from './pages/HomePage';
import CourseListPage from './pages/CourseListPage';
import QuestionListPage from './pages/QuestionListPage';
import CoursePage from './pages/CoursePage';
import Login from './components/Login';
import WishListPage from './pages/WishListPage';
import Logout from './components/Logout';
import QuestionPage from './pages/QuestionPage';

function Main(props) {
  /** */
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path='/' element={<App />}>
          <Route index element={<HomePage />} />
          <Route path='courses'>
            <Route index element={<CourseListPage />} />
            <Route path=':courseSlug' element={<CoursePage />} />
          </Route>
          <Route path='questions'>
            <Route index element={<QuestionListPage />} />
            <Route path=':questionId' element={<QuestionPage />} />
          </Route>
          <Route path='login' element={<Login />} />
          <Route path='logout' element={<Logout />} />
          <Route path='wishlist' element={<WishListPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Main;
