import './App.css';
import backgroundImg from '../assets/background.png';
import logoImg from '../assets/logo.png';
import logoTextImg from '../assets/logo-text.png';
import FoodForm from './FoodForm';
import searchImg from '../assets/ic-search.png';
import FoodList from './FoodList';
import { useEffect, useState } from 'react';
import { getDatasOrderByLimit } from '../api/firebase';

function AppSortButton({ children, selected, onClick }) {
  return (
    <button
      className={`AppSortButton ${selected ? 'selected' : ''}`}
      onClick={onClick}
      disabled={selected}
    >
      {children}
    </button>
  );
}

const LIMITS = 5;

function App() {
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState('createdAt');
  const [lq, setLq] = useState();
  const [hasNext, setHasNext] = useState(true);

  const handleLoad = async (options) => {
    const { resultData, lastQuery } = await getDatasOrderByLimit(
      'food',
      options
    );
    if (!options.lq) {
      setItems(resultData);
    } else {
      setItems((prevItems) => [...prevItems, ...resultData]);
    }
    setLq(lastQuery);
    if (!lastQuery) {
      setHasNext(false);
    }
  };
  const handleLoadMore = async () => {
    handleLoad({ fieldName: order, limits: LIMITS, lq: lq });
  };

  const handleNewestClick = () => setOrder('createdAt');
  const handleCalorieClick = () => setOrder('calorie');

  useEffect(() => {
    handleLoad({ fieldName: order, limits: LIMITS, lq: undefined });
  }, [order]);

  return (
    <div className='App' style={{ backgroundImage: `url(${backgroundImg})` }}>
      <div className='App-nav'>
        <img src={logoImg} />
      </div>
      <div className='App-container'>
        <div className='App-FoodForm'>
          <FoodForm />
        </div>
        <div className='App-filter'>
          <form className='App-search'>
            <input className='App-search-input' />
            <button className='App-search-button'>
              <img src={searchImg} />
            </button>
          </form>
          <div className='App-orders'>
            <AppSortButton
              selected={order === 'createdAt'}
              onClick={handleNewestClick}
            >
              최신순
            </AppSortButton>
            <AppSortButton
              selected={order === 'calorie'}
              onClick={handleCalorieClick}
            >
              칼로리순
            </AppSortButton>
          </div>
        </div>
        <FoodList items={items} />
        {hasNext && (
          <button className='App-load-more-button' onClick={handleLoadMore}>
            더 보기
          </button>
        )}
      </div>
      <div className='App-footer'>
        <div className='App-footer-container'>
          <img src={logoTextImg} />
          <select>
            <option>한국어</option>
            <option>English</option>
          </select>
          <div className='App-footer-menu'>
            서비스 이용약관 | 개인정보 처리방침
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
