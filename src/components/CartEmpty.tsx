import React from 'react';

import cartEmpty from '../assets/img/empty-cart.png';
import { Link } from 'react-router-dom';

const CartEmpty: React.FC = () => {
  return (
    <div className="cart cart--empty">
      <h2>
        Корзина пуста <span>😕</span>
      </h2>
      <p>
        Скоріше за все ви ще не робили замовлення
        <br />
        Для того, щоб зробити замовлення, перейдіть на головну сторінку
      </p>
      <img src={cartEmpty} alt="Empty cart" />
      <Link to="/" className="button button--black">
        <span>Повернутись назад</span>
      </Link>
    </div>
  );
};

export default CartEmpty;
