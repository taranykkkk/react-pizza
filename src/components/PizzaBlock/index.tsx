import React from 'react';
import { Link } from 'react-router-dom';

import TypesPizza from '../TypesPizza';

type PizzaBlockProps = {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  types: number[];
  sizes: number[];
};

const PizzaBlock: React.FC<PizzaBlockProps> = ({
  id,
  title,
  price,
  imageUrl,
  types,
  sizes,
}) => {
  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <Link className="pizza-block--animation" key={id} to={`/pizza/${id}`}>
          <img
            className="pizza-block__image"
            src={require(`../../assets/pizzas/${imageUrl}`)}
            alt="Pizza"
          />
          <h4 className="pizza-block__title">{title}</h4>
        </Link>

        <TypesPizza
          id={id}
          title={title}
          price={price}
          imageUrl={imageUrl}
          types={types}
          sizes={sizes}
        />
      </div>
    </div>
  );
};

export default PizzaBlock;
