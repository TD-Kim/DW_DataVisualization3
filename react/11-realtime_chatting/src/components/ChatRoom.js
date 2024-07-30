import React, { useEffect, useRef, useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import ChatMessage from './ChatMessage';
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore';
import { addDatas, db, getQuery, getRealTimeMessages } from '../api/firebase';
import { ref } from 'firebase/storage';
import { useCollectionData } from 'react-firebase-hooks/firestore';

function ChatRoom({ auth }) {
  const [inputValue, setInputValue] = useState('');
  // const [messages, setMessages] = useState([]);
  const conditions = [];
  const orderBys = [{ field: 'createdAt', direction: 'asc' }];
  const LIMITS = 100;
  const q = getQuery('messages', { conditions, orderBys, limits: LIMITS });
  const [messages] = useCollectionData(q);
  const dummy = useRef();

  const sendMessage = async (e) => {
    e.preventDefault();
    // 저장할 데이터 객체를 생성한다. (text, createdAt, photoUrl, uid)
    const { uid, photoURL } = auth?.currentUser;
    const addObj = {
      text: inputValue,
      createdAt: serverTimestamp(),
      uid: uid,
      photoURL: photoURL,
    };
    // 데이터베이스에 객체를 저장한다.
    await addDatas('messages', addObj);
    // inputValue 를 빈 문자열로 셋팅한다.
    setInputValue('');
  };

  // useEffect(() => {
  //   const unsubscribe = getRealTimeMessages("messages", setMessages);
  //   return () => {
  //     unsubscribe();
  //   };
  // }, []);

  useEffect(() => {
    // scrollIntoView() 함수는 자신이 호출된 요소가 사용자에게 표시되도록
    // 상위 컨테이너를 스크롤한다.
    dummy.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }, [messages]);

  return (
    <>
      <main>
        {messages?.map((message, idx) => {
          return <ChatMessage key={idx} message={message} auth={auth} />;
        })}
        <span ref={dummy}></span>
      </main>
      <form onSubmit={sendMessage}>
        <input
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
        />
        <button type='submit' disabled={!inputValue}>
          <FaIcons.FaPaperPlane />
        </button>
      </form>
    </>
  );
}

export default ChatRoom;
