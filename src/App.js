import React from 'react';

import './style/scss/app.scss';

import Header from './Components/Header';
import Categories from './Components/Categories';
import Sort from './Components/Sort';
import PizzaBlock from './Components/PizzaBlock';

function App() {
  // https://630118e3e71700618a347338.mockapi.io/Pizzas

  const [pizzas, setPizzas] = React.useState([]);

  React.useEffect(() => {
    fetch('https://630118e3e71700618a347338.mockapi.io/Pizzas')
      .then((res) => {
        return res.json();
      })
      .then((json) => setPizzas(json));
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {pizzas.map((obj, i) => (
              <PizzaBlock key={i} {...obj} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
