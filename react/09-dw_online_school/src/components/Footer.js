import React from 'react';
import Container from './Container';
import facebookIcon from "../assets/facebook.svg";
import instagramIcon from "../assets/instagram.svg";
import twitterIcon from "../assets/twitter.svg";
import styles from "./Footer.module.css";

function Footer(props) {
  return (
    <div className={styles.footer}>
      <Container>
        <ul className={styles.links}>
          <li>DWOS 소개</li>
          <li>개인정보 취급방침</li>
          <li>사용자 이용약관</li>
          <li>자주 묻는 질문</li>
        </ul>
        <ul className={styles.info}>
          <li>(주)DWOS</li>
          <li>대표 | 김진용</li>
          <li>개인정보보호책임자 | 김진용</li>
          <li>대표 번호 | 080-****-****</li>
          <li>사업자번호 | ***-**-*****</li>
          <li>통신판매업 | 제****-대전**-****호</li>
          <li>주소 | 대전광역시 중구 중앙로121번길 20</li>
        </ul>
        <div className={styles.icons}>
          <div className={styles.logo}>
            <span>DW</span> OS
          </div>
          <div className={styles.sns}>
            <img src={facebookIcon}/>
            <img src={instagramIcon}/>
            <img src={twitterIcon}/>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Footer;
