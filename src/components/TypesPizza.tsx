import React, { useState } from 'react';

import { addItem } from '../redux/cart/slice';
import { CartItem } from '../redux/cart/types';
import { selectCartItemById } from '../redux/cart/selector';
import { useDispatch, useSelector } from 'react-redux';

const typesDough = ['тонке', 'традиційне'];

type PizzaBlockProps = {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  types: number[];
  sizes: number[];
};

const TypesPizza: React.FC<PizzaBlockProps> = ({
  id,
  title,
  price,
  imageUrl,
  types,
  sizes,
}) => {
  const dispatch = useDispatch();
  const cartItem = useSelector(selectCartItemById(id));
  const [pizzaTypes, setPizzaTypes] = useState(0);
  const [pizzaSize, setPizzaSize] = useState(0);

  const addedCount = cartItem ? cartItem.count : 0;

  const onClickAdd = () => {
    const item: CartItem = {
      id,
      title,
      imageUrl,
      price,
      type: typesDough[pizzaTypes],
      size: sizes[pizzaSize],
      count: 0,
    };
    dispatch(addItem(item));
  };

  return (
    <>
      <div className="pizza-block__selector">
        <ul>
          {types.map((type, i) => (
            <li
              key={i}
              className={pizzaTypes === i ? 'active' : ''}
              onClick={() => setPizzaTypes(i)}>
              {typesDough[type]}
            </li>
          ))}
        </ul>
        <ul>
          {sizes.map((size, i) => (
            <li
              key={i}
              className={pizzaSize === i ? 'active' : ''}
              onClick={() => setPizzaSize(i)}>
              {size} см.
            </li>
          ))}
        </ul>
      </div>

      <div className="pizza-block__bottom">
        <div className="pizza-block__price">від {price} ₴</div>
        <div
          className="button button--outline button--add"
          onClick={onClickAdd}>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Додати</span>
          {addedCount > 0 && <i>{addedCount}</i>}
        </div>
      </div>
    </>
  );
};

export default TypesPizza;
