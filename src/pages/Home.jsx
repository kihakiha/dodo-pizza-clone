import React from 'react';
import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';

import Categories from '../Components/Categories';
import Sort from '../Components/Sort';
import PizzaBlock from '../Components/PizzaBlock';
import PizzaSkeleton from '../Components/PizzaBlock/PizzaBlockSkeleton';
import Pagination from '../Components/Pagination';

import { sortTypes } from '../Components/Sort';

import { SearchContext } from '../App';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { categoryId, sort, currentPage } = useSelector((state) => state.filter);

  const { searchValue } = React.useContext(SearchContext);

  const [pizzas, setPizzas] = React.useState([]);

  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (page) => {
    dispatch(setCurrentPage(page));
  };

  const fetchPizzas = async () => {
    setIsLoaded(false);

    const sortBy = sort.sortProperty.replace('-', '');
    const order = sort.sortProperty.includes('-') ? 'desc' : 'asc';
    const category = categoryId !== 0 ? `category=${categoryId}` : '';
    const search = searchValue.replace !== '' ? `${searchValue}` : '';

    // await axios
    //   .get(
    //     `https://630118e3e71700618a347338.mockapi.io/Pizzas?page=${currentPage}&limit=8&${category}&sortBy=${sortBy}&order=${order}&search=${search}`,
    //   )
    //   .then((response) => {
    //     setPizzas(response.data);
    //     setIsLoaded(true);
    //   });

    try {
      const response = await axios.get(
        `https://630118e3e71700618a347338.mockapi.io/Pizzas?page=${currentPage}&limit=8&${category}&sortBy=${sortBy}&order=${order}&search=${search}`,
      );
      setPizzas(response.data);
    } catch (err) {
      console.log(err);
      alert('Error ' + err.response.status + '\nЧто то пошло не так');
    } finally {
      setIsLoaded(true);
    }
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
    if (!isSearch.current) {
      fetchPizzas();
    }

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

  const [isLoaded, setIsLoaded] = React.useState(false);

  const pizzasList = pizzas.map((obj, i) => <PizzaBlock key={i} {...obj} />);
  const skeleton = [...new Array(4)].map((_, i) => <PizzaSkeleton key={i} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={onClickCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{!isLoaded ? skeleton : pizzasList}</div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
