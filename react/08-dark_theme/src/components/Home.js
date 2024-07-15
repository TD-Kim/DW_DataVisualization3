import React from 'react';
import { Outlet } from 'react-router-dom';
import Nav from './Nav';
import styles from './Home.module.css';
import ThemeToggleButton from './ThemeToggleButton';
import { useTheme } from '../context/ThemeContext';

function Home(props) {
    const [themeMode, toggleTheme] = useTheme();
  return (
    <div>
      <Nav className={styles.nav} />
      <div className={styles.body}>
        <Outlet />
      </div>
      <ThemeToggleButton mode={themeMode} onClick={toggleTheme}/>
    </div>
  );
}

export default Home;
