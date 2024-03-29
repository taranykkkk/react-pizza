import React, { useCallback } from 'react';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { setCategoryId, setPageCount, setFilters } from '../redux/filter/slice';

import { selectFilter } from '../redux/filter/selector';
import { fetchPizzas } from '../redux/pizzas/asyncActions';
import { Pizza, SearchPizzasParams } from '../redux/pizzas/types';
import { selectPizzasData } from '../redux/pizzas/selector';

import Categories from '../components/Categories';
import Sort, { sortList } from '../components/Sort';
import Skeleton from '../components/PizzaBlock/Skeleton';
import PizzaBlock from '../components/PizzaBlock';
import Pagination from '../components/Pagination';
import { useAppDispatch } from '../redux/store';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { items, status } = useSelector(selectPizzasData);

  const { categoryId, currentPage, sort, searchValue } =
    useSelector(selectFilter);

  const getPizzas = async () => {
    const sortBy = sort.sortProperty;
    const searchCategory = categoryId > 0 ? `category=${categoryId}` : '';
    const searchTitle = searchValue ? `title=*${searchValue}` : '';

    dispatch(
      fetchPizzas({
        sortBy,
        searchCategory,
        searchTitle,
        currentPage: String(currentPage),
      }),
    );
  };

  // Якщо змінили параметри і був перший рендер
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });

      navigate(`?${queryString}`);
    }

    isMounted.current = true;
  }, [categoryId, sort, currentPage]);

  // Якщо був перший рендер то перевіряємо URL-параметри і  зберігаємо в Редаксі
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(
        window.location.search.substring(1),
      ) as unknown as SearchPizzasParams;

      const sort = sortList.find((obj) => obj.sortProperty === params.sortBy);

      dispatch(
        setFilters({
          searchValue: params.searchTitle,
          categoryId: Number(params.categoryId),
          currentPage: Number(params.currentPage),
          sort: sort || sortList[0],
        }),
      );
      isSearch.current = true;
    }
  }, []);

  // Якщо був перший рендер то запросимо піци
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (!isSearch.current) {
      getPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sort, searchValue, currentPage]);

  let pizzas: any;
  if (!Array.isArray(items)) {
    pizzas = items.items
      .filter((obj: Pizza) =>
        obj.title.toLowerCase().includes(searchValue.toLowerCase()),
      )
      .map((obj: Pizza) => <PizzaBlock key={obj.id} {...obj} />);
  }

  const skeleton = [...Array(6)].map((_, i) => <Skeleton key={i} />);

  const onClickCategory = useCallback((id: number) => {
    dispatch(setCategoryId(id));
    dispatch(setPageCount(1));
  }, []);

  const onChangePage = (page: number) => {
    dispatch(setPageCount(page));
  };
  console.log(status);
  return (
    <>
      <div className="content__top">
        <Categories categoryId={categoryId} onClickCategory={onClickCategory} />
        <Sort value={sort} />
      </div>
      <h2 className="content__title">Всі піци</h2>
      {status === 'error' ? (
        <div>
          <h2>Виникла помилка</h2>
          <p>Нажаль не вдалось отримати наші смачні піци. Спробуйте пізніше</p>
        </div>
      ) : (
        <div className="content__items">
          {status === 'loading' ? skeleton : pizzas}
        </div>
      )}
      {status !== 'loading' && pizzas.length === 0 && (
        <h2 style={{ textAlign: 'center', padding: '100px auto' }}>
          Нажаль піцу за назвою '{searchValue}' не знайдено
        </h2>
      )}

      {pizzas.length !== 0 && (
        <Pagination items={items} setCurrentPage={onChangePage} />
      )}
    </>
  );
};

export default Home;
