import { Link, Outlet } from 'react-router-dom';

function App() {
  return (
    <>
      <h1>Hello, Styled Components!!</h1>
      <ul>
        <Link to="01">
          <li>1. Styled Components Basic</li>
        </Link>
        <Link to="02">
          <li>2. Nesting 문법</li>
        </Link>
        <Link to="03">
          <li>3. 연습1</li>
        </Link>
        <Link to="04">
          <li>4. DynamicStyling</li>
        </Link>
        <Link to="05">
          <li>5. 연습2</li>
        </Link>
        <Link to="06">
          <li>6. 스타일 재사용: 상속</li>
        </Link>
        <Link to="07">
          <li>7. 스타일 재사용: CSS함수</li>
        </Link>
        <Link to="08">
          <li>8. 연습3</li>
        </Link>
        <Link to="09">
          <li>9. 로그인 화면 구현</li>
        </Link>
      </ul>
      <Outlet />
    </>
  );
}

export default App;
