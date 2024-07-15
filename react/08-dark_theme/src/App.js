import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import MainPage from './pages/MainPage';
import AboutPage from './pages/AboutPage';
import { GlobalStyle } from './theme/GlobalStyle';
import { ThemeChangeProvider } from './context/ThemeContext';

function App() {
  return (
    <BrowserRouter>
      <ThemeChangeProvider>
        <GlobalStyle />
        <Routes>
          <Route path='/' element={<Home />}>
            <Route index element={<MainPage />} />
            <Route path='about' element={<AboutPage />} />
          </Route>
        </Routes>
      </ThemeChangeProvider>
    </BrowserRouter>
  );
}

export default App;
