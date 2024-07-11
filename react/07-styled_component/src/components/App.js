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
      </ul>
      <Outlet />
    </>
  );
}

export default App;
