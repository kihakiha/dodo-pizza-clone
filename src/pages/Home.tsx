import React from 'react';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import {
  selectFilter,
  setCategoryId,
  setCurrentPage,
  setFilters,
} from '../redux/slices/filterSlice';

import { fetchPizzasRTK } from '../redux/slices/pizzasSlice';

import { Categories } from '../Components/Categories';
import { Sort } from '../Components/Sort';
import { PizzaBlock } from '../Components/PizzaBlock';
import { PizzaSkeleton } from '../Components/PizzaBlock/PizzaBlockSkeleton';
import { Pagination } from '../Components/Pagination';

import { selectPizzasData } from '../redux/slices/pizzasSlice';

import { sortTypes } from '../Components/Sort';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { items, isPizzasFetched } = useSelector(selectPizzasData);
  const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);

  const onClickCategory = (id: number) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const fetchPizzas = async () => {
    const sortBy = sort.sortProperty.replace('-', '');
    const order = sort.sortProperty.includes('-') ? 'desc' : 'asc';
    const category = categoryId !== 0 ? `category=${categoryId}` : '';
    const search = searchValue.replace !== '' ? `${searchValue}` : '';

    dispatch(
      // @ts-ignore
      fetchPizzasRTK({
        sortBy,
        order,
        category,
        search,
        currentPage,
      }),
    );

    window.scrollTo(0, 0);
  };

  // Если был первый рендер, то проверяем URL хеддеры и сохраняем в редаксе
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = sortTypes.find((obj) => obj.sortProperty === params.sortProperty);
      dispatch(setFilters({ ...params, sort }));
      isSearch.current = true;
    }
  }, []);

  React.useEffect(() => {
    fetchPizzas();

    isSearch.current = false;
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  // Если был первый рендер и если изменили хеддеры то подставляй их в url
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, currentPage]);

  const pizzasList = items.map((obj: any, i: number) => <PizzaBlock key={i} {...obj} />);
  const skeleton = [...new Array(4)].map((_, i) => <PizzaSkeleton key={i} />);

  return (
    <div className="container">
      {isPizzasFetched === 'error' ? (
        <div className="content__items--empty">
          <h2>Произошла ошибка 😞</h2>
          <br /> Попробуйте заказать самые вкусные пиццы через минутку <br /> 😉
        </div>
      ) : (
        <>
          <div className="content__top">
            <Categories value={categoryId} onClickCategory={onClickCategory} />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {isPizzasFetched === 'loading' ? skeleton : pizzasList}
          </div>
          <Pagination currentPage={currentPage} onChangePage={onChangePage} />
        </>
      )}
    </div>
  );
};
