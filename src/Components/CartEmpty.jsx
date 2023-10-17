import React from 'react';
import { Link } from 'react-router-dom';

import EmptyCartImg from '../assets/img/empty-cart.png';

export function CartEmpty() {
  return (
    <>
      <div className="cart cart--empty">
        <h2>Корзина пустая😞</h2>
        <p>
          Вероятнее всего, Вы ещё не выбрали пиццу. <br />
          Для того, чтобы заказать пиццу, перейдите на главную страницу!
        </p>
        <img src={EmptyCartImg} alt="Cart Empty Img" />
        <Link to="/" className="button button--black">
          <span>На главную</span>
        </Link>
      </div>
    </>
  );
}
