import React from 'react';

import Categories from '../Components/Categories';
import Sort from '../Components/Sort';
import PizzaBlock from '../Components/PizzaBlock';
import PizzaSkeleton from '../Components/PizzaBlock/PizzaBlockSkeleton';

const Home = () => {
  const [pizzas, setPizzas] = React.useState([]);

  React.useEffect(() => {
    fetch('https://630118e3e71700618a347338.mockapi.io/Pizzas')
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setPizzas(json);
        setIsLoaded(true);
      });
  }, []);

  const [isLoaded, setIsLoaded] = React.useState(false);

  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {!isLoaded
          ? [...new Array(8)].map((_, i) => <PizzaSkeleton key={i} />)
          : pizzas.map((obj, i) => <PizzaBlock key={i} {...obj} />)}
      </div>
    </>
  );
};

export default Home;
