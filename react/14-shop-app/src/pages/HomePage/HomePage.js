import React from 'react';
import FiltersCategory from './filter-category/FiltersCategory';
import CountProducts from './count-products/CountProducts';
import CardList from './card-list/CardList';

function HomePage() {
  return (
    <div className='page'>
      <div className='container'>
        <h1>Products</h1>
        <FiltersCategory />
        <CountProducts />
        <CardList />
      </div>
    </div>
  );
}

export default HomePage;
