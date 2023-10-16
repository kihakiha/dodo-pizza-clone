import React from 'react';
import axios from 'axios';

import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId } from '../redux/slices/filterSlice';

import Categories from '../Components/Categories';
import Sort from '../Components/Sort';
import PizzaBlock from '../Components/PizzaBlock';
import PizzaSkeleton from '../Components/PizzaBlock/PizzaBlockSkeleton';
import Pagination from '../Components/Pagination';

import { SearchContext } from '../App';
const Home = () => {
  const dispatch = useDispatch();
  const categoryId = useSelector((state) => state.filter.categoryId);
  const sortType = useSelector((state) => state.filter.sort.sortProperty);

  const { searchValue } = React.useContext(SearchContext);

  const [currentPage, setCurrentPage] = React.useState(1);
  const [pizzas, setPizzas] = React.useState([]);

  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  React.useEffect(() => {
    setIsLoaded(false);

    const sortBy = sortType.replace('-', '');
    const order = sortType.includes('-') ? 'desc' : 'asc';
    const category = categoryId !== 0 ? `category=${categoryId}` : '';
    const search = searchValue.replace !== '' ? `${searchValue}` : '';

    axios
      .get(
        `https://630118e3e71700618a347338.mockapi.io/Pizzas?page=${currentPage}&limit=8&${category}&sortBy=${sortBy}&order=${order}&search=${search}`,
      )
      .then((response) => {
        setPizzas(response.data);
        setIsLoaded(true);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);

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
      <Pagination onChangePage={(page) => setCurrentPage(page)} />
    </div>
  );
};

export default Home;
