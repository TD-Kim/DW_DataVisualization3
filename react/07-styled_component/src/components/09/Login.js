import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Input from './Input';
import Button from './Button';
import KakaoButton from './KakaoButton';

const Container = styled.div`
  width: 400px;
  margin: 40px auto;

  ${Button} {
    width: 100%;
    margin: 8px 0;
  }

  ${Input} {
    margin-bottom: 16px;
  }
`;

const Logo = styled.h1`
  font-family: Pretendard;
  text-align: center;
  font-size: 40px;
  background-image: linear-gradient(135deg, aqua, purple);
  background-clip: text;
  color: transparent;
`;

const Description = styled.div`
  color: #848187;
  text-align: center;
`;

const Label = styled.label`
  color: #e1c6f7;
`;

function Login(props) {
  return (
    <Container>
      <Logo>DW 온라인스쿨</Logo>
      <Description>
        회원이 아니신가요? <Link>회원가입 하기</Link>
      </Description>
      <form>
        <Label htmlFor='email'>이메일</Label>
        <Input type='email' id='email' placeholder='styled@DW.kr' />
        <Label htmlFor='password'>비밀번호</Label>
        <Input type='password' id='password' placeholder='비밀번호' />
        <Button>로그인 하기</Button>
      </form>
      <KakaoButton>카카오 로그인</KakaoButton>
    </Container>
  );
}

export default Login;
