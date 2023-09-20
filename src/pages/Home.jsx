import React from 'react';

import Categories from '../Components/Categories';
import Sort from '../Components/Sort';
import PizzaBlock from '../Components/PizzaBlock';
import PizzaSkeleton from '../Components/PizzaBlock/PizzaBlockSkeleton';

const Home = () => {
  const [pizzas, setPizzas] = React.useState([]);
  const [categoryId, setCategoryId] = React.useState(0);
  const [sortType, setSortType] = React.useState({
    name: 'Популярности ⬇️',
    sortProperty: '-rating',
  });

  React.useEffect(() => {
    setIsLoaded(false);

    const sortBy = sortType.sortProperty.replace('-', '');
    const order = sortType.sortProperty.includes('-') ? 'desc' : 'asc';
    const category = categoryId !== 0 ? `category=${categoryId}` : '';

    fetch(
      `https://630118e3e71700618a347338.mockapi.io/Pizzas?${category}&sortBy=${sortBy}&order=${order}`,
    )
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setPizzas(json);
        setIsLoaded(true);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType]);

  const [isLoaded, setIsLoaded] = React.useState(false);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={(i) => setCategoryId(i)} />
        <Sort value={sortType} onClickSortType={(i) => setSortType(i)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {!isLoaded
          ? [...new Array(4)].map((_, i) => <PizzaSkeleton key={i} />)
          : pizzas.map((obj, i) => <PizzaBlock key={i} {...obj} />)}
      </div>
    </div>
  );
};

export default Home;
