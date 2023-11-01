import React from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';

import styles from './FullPizza.module.scss';

export const FullPizza: React.FC = () => {
  const [pizzaData, setPizzaData] = React.useState<{
    title: string;
    imageUrl: string;
    ingredients: [{ name: string; isRemovable: boolean }];
  }>();

  const { pizzaId } = useParams();

  const navigate = useNavigate();
  React.useEffect(() => {
    async function fetchPizzaById() {
      try {
        const { data } = await axios.get(
          `https://630118e3e71700618a347338.mockapi.io/Pizzas/${pizzaId}`,
        );
        setPizzaData(data);
      } catch (error) {
        navigate('/');
      }
    }

    fetchPizzaById();
  }, []);

  if (!pizzaData) {
    return 'загрузка';
  }

  return (
    <div className={styles.pizzaPage}>
      <div className={styles.pizzaInfo}>
        <div className={styles.pizzaInfo__left}>
          <img className={styles.pizzaInfo__left_img} src={pizzaData.imageUrl} alt="Pizza" />
          <h2>{pizzaData.title}</h2>
        </div>
        <div className={styles.pizzaInfo__right}>
          <div className={styles.ingredients}>
            <ul>
              {pizzaData.ingredients.map((ingredient, i) => (
                <li key={ingredient + '_' + i}>{ingredient.name}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <Link to="/" className="button button--black">
        <span>На главную</span>
      </Link>
    </div>
  );
};
