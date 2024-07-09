import './App.css';
import { useEffect, useState } from 'react';
import Cleanup from './Cleanup';
import ToDoList from './ToDoList';
import MovieApp from './MovieApp';

function App() {
  const [count, setCount] = useState(0);
  const [inputValue, setInputValue] = useState('');
  // console.log("App 컴포넌트 렌더링..");
  const handleClick = () => {
    setCount(count + 1);
  };
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };
  useEffect(() => {
    console.log('나는 화면이 최초 렌더링될 때 실행되는 uef야.');
  }, []); // [](디펜던시 리스트) 안에는 react 가 무엇을 지켜볼 지 작성해준다.
  useEffect(() => {
    console.log('나는 count가 변경될 때 실행되는 uef야.');
  }, [count]);
  useEffect(() => {
    console.log('나는 inputValue가 변경될 때 실행되는 uef야.');
  }, [inputValue]);

  return (
    <>
      {/* <input type='text' placeholder='Search here' onChange={handleChange} />
      <h2>입력한 값 : {inputValue}</h2>
      <h1>{count}</h1>
      <button onClick={handleClick}>Click me</button>
      <hr />
      <Cleanup />
      <hr />
      <ToDoList />
      <hr /> */}
      <MovieApp />
    </>
  );
}

export default App;
