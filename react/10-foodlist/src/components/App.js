import './App.css';
import backgroundImg from '../assets/background.png';
import logoImg from '../assets/logo.png';
import logoTextImg from '../assets/logo-text.png';
import FoodForm from './FoodForm';
import searchImg from '../assets/ic-search.png';
import FoodList from './FoodList';
import { useEffect, useState } from 'react';
import {
  addDatas,
  deleteDatas,
  getDatasOrderByLimit,
  getSearchDatas,
  updateDatas,
} from '../api/firebase';
import LocaleSelect from './LocaleSelect';
import useAsync from '../hooks/useAsync';

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
  const [search, setSearch] = useState('');
  // const [isLoading, setIsLoading] = useState(false);
  const [isLoading, loadingError, getDatasAsync] =
    useAsync(getDatasOrderByLimit);

  const handleLoad = async (options) => {
    // setIsLoading(true);
    // const { resultData, lastQuery } = await getDatasOrderByLimit(
    //   'food',
    //   options
    // );
    // setIsLoading(false);
    const { resultData, lastQuery } = await getDatasAsync('food', options);
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

  const handleDelete = async (docId, imgUrl) => {
    // items 에서 docId 를 받아온다.
    // db에서 데이터 삭제(스토리지에 있는 사진파일 삭제, database에 있는 데이터 삭제)
    const { result, message } = await deleteDatas('food', docId, imgUrl);
    if (!result) {
      alert(message);
      return;
    }
    // 삭제 성공시 화면에 그 결과를 반영한다.
    setItems((prevItems) =>
      prevItems.filter(function (item) {
        return item.docId !== docId;
      })
    );
  };

  const handleAddSuccess = (resultData) => {
    console.log(resultData);
    setItems((prevItems) => [resultData, ...prevItems]);
  };

  const handleUpdateSuccess = (result) => {
    setItems((prevItems) => {
      // 수정된 item의 index 찾기
      const splitIdx = prevItems.findIndex(function (item) {
        return item.id === result.id;
      });
      const beforeArr = prevItems.slice(0, splitIdx);
      const afterArr = prevItems.slice(splitIdx + 1);
      return [...beforeArr, result, ...afterArr];
      // return [
      //   ...prevItems.slice(0, splitIdx),
      //   result,
      //   ...prevItems.slice(splitIdx + 1)
      // ]
    });
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (search === '') {
      handleLoad({ fieldName: order, limits: LIMITS, lq: undefined });
    } else {
      const resultData = await getSearchDatas('food', {
        limits: LIMITS,
        search: search,
      });
      setItems(resultData);
    }
  };

  useEffect(() => {
    handleLoad({ fieldName: order, limits: LIMITS, lq: undefined });
    // const queryOptions = {
    //   conditions: [
    //     { field: '', operator: '', value: '' },
    //     { field: '', operator: '', value: '' },
    //   ],
    //   orderBys: [
    //     { field: '', direction },
    //     { field: '', direction },
    //   ],
    //   lastQuery: 'querySnapshot 객체',
    //   limits: 10,
    // };
  }, [order]);

  return (
    <div className='App' style={{ backgroundImage: `url(${backgroundImg})` }}>
      <div className='App-nav'>
        <img src={logoImg} />
      </div>
      <div className='App-container'>
        <div className='App-FoodForm'>
          <FoodForm onSubmit={addDatas} onSubmitSuccess={handleAddSuccess} />
        </div>
        <div className='App-filter'>
          <form className='App-search' onSubmit={handleSearchSubmit}>
            <input className='App-search-input' onChange={handleSearchChange} />
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
        <FoodList
          items={items}
          onDelete={handleDelete}
          onUpdate={updateDatas}
          onUpdateSuccess={handleUpdateSuccess}
        />
        {hasNext && (
          <button
            className='App-load-more-button'
            onClick={handleLoadMore}
            disabled={isLoading}
          >
            더 보기
          </button>
        )}
      </div>
      <div className='App-footer'>
        <div className='App-footer-container'>
          <img src={logoTextImg} />
          <LocaleSelect />
          <div className='App-footer-menu'>
            서비스 이용약관 | 개인정보 처리방침
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
