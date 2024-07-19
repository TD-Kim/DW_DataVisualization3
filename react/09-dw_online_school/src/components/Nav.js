import React from 'react';
import Container from './Container';
import { Link, NavLink } from 'react-router-dom';
import styles from './Nav.module.css';
import cn from 'classnames';
import UserMenu from './UserMenu';

function getLinkStyle({ isActive }) {
  // 함수의 파라미터로 isActive, isPending, isTransitioning 이 넘어온다.
  return {
    textDecoration: isActive ? 'underline' : undefined,
  };
}

function Nav({ className }) {
  return (
    <div className={styles.nav}>
      <Container className={styles.container}>
        <Link to='/'>
          <div className={styles.logo}>
            <span>DW</span>
            OS
          </div>
        </Link>
        <ul className={styles.menu}>
          <li>
            <NavLink to='/courses' style={getLinkStyle}>
              카탈로그
            </NavLink>
          </li>
          <li>
            <NavLink to='/questions' style={getLinkStyle}>
              커뮤니티
            </NavLink>
          </li>
          <li>
            <UserMenu />
          </li>
        </ul>
      </Container>
    </div>
  );
}

export default Nav;
