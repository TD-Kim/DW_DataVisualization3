import React, { useEffect } from 'react';
import styles from './CardList.module.scss';
import CardItem from './card-item/CardItem';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../../store/products/productsSlice';
import CardSkeleton from '../card-skeleton/CardSkeleton';
import { getDatasRest } from '../../../api';

function CardList() {
  const dispatch = useDispatch();
  const { products, isLoading } = useSelector((state) => state.productsSlice);
  const category = useSelector((state) => state.categoriesSlice);
  const handleLoad = async () => {
    const queryOptions = {
      conditions: [
        {
          field: 'category',
          operator: category ? 'EQUAL' : 'GREATER_THAN_OR_EQUAL',
          value: category.toLowerCase(),
        },
      ],
    };
    const restResult = await getDatasRest('products', queryOptions);
  };
  useEffect(() => {
    const queryOptions = {
      conditions: [
        {
          field: 'category',
          // operator: category ? '==' : '>=',
          operator: category ? 'EQUAL' : 'GREATER_THAN_OR_EQUAL',
          value: category.toLowerCase(),
        },
      ],
    };
    dispatch(fetchProducts({ collectionName: 'products', queryOptions }));
    // handleLoad();
  }, [category]);

  if (isLoading) return <CardSkeleton />;

  return (
    <ul className={styles.card_list}>
      {products.map((product) => {
        return <CardItem key={product.id} item={product} />;
      })}
    </ul>
  );
}

export default CardList;
