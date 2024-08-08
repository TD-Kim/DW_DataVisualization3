import React from 'react';
import { Link } from 'react-router-dom';
import { BsGithub } from 'react-icons/bs';
import styles from './Footer.module.scss';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className='container'>
        <div className={styles.contacts}>
          <Link
            to={'https://github.com'}
            target='_blank'
            rel='noopener noreferrer'
          >
            <BsGithub />
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
